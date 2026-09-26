// ROV-BOT AI Agriculture Network - Seed Data & Agro-Climatic Intelligence

import {
  UserProfile,
  WeatherData,
  SoilHealthData,
  SatelliteFieldData,
  DiseaseDetectionResult,
  RobotDigitalTwin,
  MissionPlan,
  IoTSensorLog,
  RegenerativeFarmMetrics,
  MarketplaceProduct,
  GovernmentStateStats,
  DPIModelRegistryEntry,
  AppNotification
} from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'FARM-IND-2026-8891',
  name: 'Rameshwar Patel',
  phone: '+91 98492 14320',
  email: 'rameshwar.patel@agristack.gov.in',
  role: 'farmer',
  state: 'Telangana',
  district: 'Warangal',
  village: 'Dharmasagar',
  farmName: 'Sri Venkateshwara Organic Farm',
  farmSizeAcres: 4.8,
  primaryCrop: 'Cotton & Paddy Intercrop',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  preferredLanguage: 'te',
  agriStackId: 'IN-TS-WRG-2026-004128'
};

export const INITIAL_WEATHER: WeatherData = {
  temp: 29.4,
  humidity: 62,
  condition: 'Partly Cloudy with High Sunlight',
  rainChance: 18,
  windSpeed: 11.2,
  windDirection: 'SSW',
  uvIndex: 7,
  soilTemp: 24.8,
  forecast7Day: [
    { day: 'Today', date: '26 Sep', tempMax: 32, tempMin: 22, rainMm: 1.2, condition: 'Partly Cloudy', icon: 'Sun', sprayingCondition: 'Optimal' },
    { day: 'Sun', date: '27 Sep', tempMax: 33, tempMin: 23, rainMm: 0.0, condition: 'Sunny & Clear', icon: 'Sun', sprayingCondition: 'Optimal' },
    { day: 'Mon', date: '28 Sep', tempMax: 31, tempMin: 22, rainMm: 4.5, condition: 'Scattered Showers', icon: 'CloudRain', sprayingCondition: 'Caution' },
    { day: 'Tue', date: '29 Sep', tempMax: 28, tempMin: 21, rainMm: 18.0, condition: 'Thunderstorm', icon: 'CloudLightning', sprayingCondition: 'Unfavorable' },
    { day: 'Wed', date: '30 Sep', tempMax: 29, tempMin: 21, rainMm: 6.0, condition: 'Light Rain', icon: 'CloudRain', sprayingCondition: 'Caution' },
    { day: 'Thu', date: '01 Oct', tempMax: 32, tempMin: 22, rainMm: 0.0, condition: 'Clear Sky', icon: 'Sun', sprayingCondition: 'Optimal' },
    { day: 'Fri', date: '02 Oct', tempMax: 33, tempMin: 23, rainMm: 0.0, condition: 'Sunny', icon: 'Sun', sprayingCondition: 'Optimal' }
  ],
  aiAdvisory: {
    spraying: {
      status: 'Optimal',
      reason: 'Wind speed is 11 km/h (below 15 km/h threshold) with no rain expected in next 24 hours. Best spraying window: 07:00 AM – 10:30 AM.'
    },
    irrigation: {
      status: 'Hold',
      reason: 'Soil root zone moisture is healthy at 68%. Heavy rain expected on Tuesday (29 Sep). Avoid over-irrigation to prevent root rot.'
    },
    sowingWindow: {
      status: 'Open',
      window: '28 Sep – 06 Oct 2026',
      reason: 'Soil temperature (24.8°C) and impending monsoon shower create ideal germination environment for Rabi pulses & mustard.'
    }
  }
};

export const INITIAL_SOIL_HEALTH: SoilHealthData = {
  ph: 6.8,
  moisture: 68,
  nitrogenKgHa: 242,
  phosphorusKgHa: 28,
  potassiumKgHa: 310,
  organicCarbonPercent: 0.72,
  fertilityScore: 84,
  waterHoldingCapacity: 74,
  electricalConductivity: 0.45,
  zincPpm: 1.15,
  ironPpm: 5.8,
  boronPpm: 0.62,
  sulphurPpm: 14.2,
  healthGrade: 'Good',
  aiRecommendations: {
    organicCompostKgPerAcre: 450,
    ureaDoseKg: 25,
    dapDoseKg: 40,
    mopDoseKg: 15,
    waterRequirementLiters: 12500,
    actionableTips: [
      'Soil pH is slightly acidic to neutral (6.8), ideal for nutrient absorption in cotton and millets.',
      'Phosphorus is slightly below threshold (28 kg/ha). Apply 40 kg DAP/acre during the upcoming fertigation pass.',
      'Organic carbon is 0.72%. Incorporate green manure (dhaincha or sunhemp) to reach optimal 1.0% target.',
      'Zinc levels are sufficient (1.15 ppm). Avoid excess zinc sulfate application this season.'
    ]
  }
};

export const INITIAL_SATELLITE_FIELD: SatelliteFieldData = {
  fieldId: 'FLD-TS-WRG-01',
  fieldName: 'North Quadrant - Paddy & Cotton Plot',
  areaAcres: 4.8,
  lastUpdated: 'ISRO RISAT & Sentinel-2 Composite (Today, 06:15 IST)',
  ndviAverage: 0.74,
  ndwiAverage: 0.32,
  surfaceTempCelsius: 28.2,
  vigorScore: 88,
  stressZonesCount: 2,
  timelineHistory: [
    { date: '15 Aug', ndvi: 0.42, ndwi: 0.18, vigor: 52 },
    { date: '25 Aug', ndvi: 0.55, ndwi: 0.24, vigor: 67 },
    { date: '05 Sep', ndvi: 0.68, ndwi: 0.29, vigor: 79 },
    { date: '15 Sep', ndvi: 0.71, ndwi: 0.31, vigor: 84 },
    { date: '26 Sep', ndvi: 0.74, ndwi: 0.32, vigor: 88 }
  ],
  polygonCoordinates: [
    [17.9784, 79.5941],
    [17.9815, 79.5975],
    [17.9802, 79.6012],
    [17.9768, 79.5982],
    [17.9784, 79.5941]
  ]
};

export const SAMPLE_DISEASE_SCANS: DiseaseDetectionResult[] = [
  {
    id: 'SCAN-2026-901',
    cropName: 'Tomato',
    diseaseName: 'Early Blight (Alternaria solani)',
    scientificName: 'Alternaria solani',
    confidence: 97.4,
    severity: 'Moderate',
    timestamp: 'Today, 09:12 AM',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?w=500&auto=format&fit=crop&q=80',
    symptoms: [
      'Concentric target-like dark brown rings on lower leaves',
      'Yellow chlorotic halos surrounding lesions',
      'Premature defoliation of lower canopy'
    ],
    organicTreatment: [
      'Foliar spray of Trichoderma harzianum @ 5g/liter',
      'Neem oil 10,000 ppm emulsion @ 3ml/liter at dawn',
      'Prune and safely burn infected bottom foliage'
    ],
    chemicalTreatment: [
      'Mancozeb 75% WP @ 2.5g/liter of water',
      'Or Azoxystrobin 23% SC @ 1ml/liter if infection exceeds 20%'
    ],
    prevention: [
      'Maintain 60cm row spacing for canopy airflow',
      'Avoid overhead sprinkler irrigation on tomato foliage',
      'Use 2-year crop rotation with non-solanaceous crops (e.g. Maize or Millets)'
    ],
    nearbyKvk: {
      name: 'Krishi Vigyan Kendra, Warangal (PJTSAU)',
      distanceKm: 6.4,
      contact: '+91 870 245 9921',
      officer: 'Dr. G. Sudhakar, Senior Plant Pathologist'
    }
  },
  {
    id: 'SCAN-2026-902',
    cropName: 'Cotton',
    diseaseName: 'Cotton Leaf Curl Virus (CLCuV)',
    scientificName: 'Begomovirus / Whitefly vector',
    confidence: 94.8,
    severity: 'High',
    timestamp: 'Yesterday, 04:30 PM',
    imageUrl: 'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?w=500&auto=format&fit=crop&q=80',
    symptoms: [
      'Upward curling and thickening of leaf margins',
      'Enation (leaf-like outgrowths) on underside of main veins',
      'Stunted plant growth and reduced boll formation'
    ],
    organicTreatment: [
      'Install yellow sticky traps (15 traps/acre) to trap Whiteflies',
      'Spray Agniastra / Dashaparni Kashayam organic extract @ 30ml/liter'
    ],
    chemicalTreatment: [
      'Diafenthiuron 50% WP @ 1.2g/liter',
      'Or Pyriproxyfen 10% EC @ 2ml/liter to break whitefly breeding cycle'
    ],
    prevention: [
      'Eradicate weed hosts like Abutilon indicum near bunds',
      'Grow border crop of 2-3 rows of Sorghum or Maize as physical barrier'
    ],
    nearbyKvk: {
      name: 'Central Institute for Cotton Research (CICR) Substation',
      distanceKm: 11.2,
      contact: '+91 870 248 3100',
      officer: 'Dr. K. Srinivas, Entomology Lead'
    }
  },
  {
    id: 'SCAN-2026-903',
    cropName: 'Rice (Paddy)',
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    scientificName: 'Magnaporthe oryzae',
    confidence: 98.2,
    severity: 'Low',
    timestamp: '23 Sep 2026',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=500&auto=format&fit=crop&q=80',
    symptoms: [
      'Spindle-shaped lesions with gray centers and brown borders',
      'Lesions coalescing causing leaf desiccation (Blast appearance)'
    ],
    organicTreatment: [
      'Pseudomonas fluorescens 1% WP @ 10g/kg seed treatment',
      'Spray Cow urine (10%) mixed with Hing extract'
    ],
    chemicalTreatment: [
      'Tricyclazole 75% WP @ 0.6g/liter',
      'Or Isoprothiolane 40% EC @ 1.5ml/liter'
    ],
    prevention: [
      'Avoid excessive split application of Nitrogen fertilizer',
      'Maintain 2-3 cm standing water in field during tillering'
    ],
    nearbyKvk: {
      name: 'Regional Agricultural Research Station (RARS), Warangal',
      distanceKm: 8.7,
      contact: '+91 870 242 1155',
      officer: 'Dr. M. Venkat Rao, Agronomy Head'
    }
  }
];

export const INITIAL_ROBOT: RobotDigitalTwin = {
  id: 'ROV-BOT-TS-01',
  name: 'ROV-BOT Alpha Mark IV',
  model: 'AgriNet Autonomous Field Bot v4.2',
  batteryPercent: 88,
  batteryVoltage: 48.6,
  batteryTempC: 31.4,
  solarChargingWatts: 142,
  solarDailyWh: 780,
  speedKmh: 3.4,
  fieldCoveragePercent: 64,
  activeAttachment: 'sprayer',
  missionStatus: 'running',
  currentMissionType: 'Precision Bio-Fertilizer Spraying',
  gps: {
    lat: 17.9792,
    lng: 79.5964,
    altitudeMeters: 268.4,
    accuracyCm: 2.1
  },
  imu: {
    pitch: 1.2,
    roll: -0.8,
    yaw: 44.5
  },
  lidarObstacleDistanceMeters: 14.8,
  ultrasonicGroundDistanceCm: 22.4,
  motors: {
    frontLeftRpm: 124,
    frontRightRpm: 125,
    rearLeftRpm: 123,
    rearRightRpm: 124,
    motorTempC: 38.2
  },
  nozzlePressurePsi: 38.5,
  seedDispenserRateGpm: 0,
  activeFaults: []
};

export const INITIAL_MISSION_PLAN: MissionPlan = {
  id: 'MSN-2026-088',
  name: 'Quadrant B - Precision Weeding & Bio-Spraying',
  tool: 'sprayer',
  targetAreaAcres: 4.8,
  estimatedDurationMins: 45,
  batteryConsumptionEst: 28,
  rowSpacingMeters: 0.9,
  speedSettingKmh: 3.5,
  waypointsCount: 36,
  pathCoordinates: [
    [17.9785, 79.5945],
    [17.9810, 79.5948],
    [17.9811, 79.5956],
    [17.9786, 79.5954],
    [17.9787, 79.5962],
    [17.9812, 79.5965],
    [17.9813, 79.5973],
    [17.9788, 79.5971],
    [17.9789, 79.5980],
    [17.9814, 79.5983]
  ],
  status: 'in_progress'
};

export const INITIAL_IOT_LOGS: IoTSensorLog[] = [
  { timestamp: '10:00:00', soilMoisture15cm: 68.2, soilMoisture30cm: 72.1, soilTemperature: 24.5, ambientTemperature: 28.6, ambientHumidity: 64, solarIrradianceLux: 68000, batteryVoltage: 49.2, batteryCurrentDraw: 4.2, chassisVibration: 0.12 },
  { timestamp: '10:05:00', soilMoisture15cm: 68.1, soilMoisture30cm: 72.1, soilTemperature: 24.6, ambientTemperature: 28.9, ambientHumidity: 63, solarIrradianceLux: 71000, batteryVoltage: 49.0, batteryCurrentDraw: 4.4, chassisVibration: 0.14 },
  { timestamp: '10:10:00', soilMoisture15cm: 68.0, soilMoisture30cm: 72.0, soilTemperature: 24.7, ambientTemperature: 29.1, ambientHumidity: 63, solarIrradianceLux: 74000, batteryVoltage: 48.8, batteryCurrentDraw: 4.5, chassisVibration: 0.11 },
  { timestamp: '10:15:00', soilMoisture15cm: 67.9, soilMoisture30cm: 72.0, soilTemperature: 24.8, ambientTemperature: 29.4, ambientHumidity: 62, solarIrradianceLux: 76500, batteryVoltage: 48.6, batteryCurrentDraw: 4.3, chassisVibration: 0.13 }
];

export const REGENERATIVE_METRICS: RegenerativeFarmMetrics = {
  sustainabilityScore: 89,
  carbonSequesteredKgPerYear: 3240,
  carbonCreditsEarned: 3.24,
  waterSavedLitersYear: 420000,
  chemicalReductionPercent: 68,
  soilOrganicMatterTrend: [0.45, 0.52, 0.61, 0.68, 0.72],
  recommendedPractices: [
    { title: 'Multi-Species Cover Cropping', category: 'Soil Health', benefit: 'Fixes atmospheric nitrogen & suppresses 85% weeds', adopted: true, carbonReward: 1.2 },
    { title: 'Autonomous Mechanical Laser Weeding', category: 'Zero Chemical', benefit: 'Replaces glyphosate/atrazine herbicide sprays 100%', adopted: true, carbonReward: 0.8 },
    { title: 'Micro-Drip Fertigation Automation', category: 'Water Conservation', benefit: 'Reduces water use by 42% and fertilizer runoff by 50%', adopted: true, carbonReward: 0.75 },
    { title: 'Biochar & Compost Soil Amendment', category: 'Carbon Sink', benefit: 'Permanently locks recalcitrant carbon in subsoil for 50+ years', adopted: false, carbonReward: 1.5 },
    { title: 'Solar Powered Robot Swarm Operation', category: 'Clean Energy', benefit: 'Displaces 320 Liters of diesel tractor consumption/year', adopted: true, carbonReward: 0.85 }
  ]
};

export const MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 'PROD-01',
    name: 'Bio-NPK Consortium (Liquid Biofertilizer)',
    category: 'bio_fertilizers',
    brand: 'IFFCO Kisan Nano Bio',
    priceInr: 340,
    rating: 4.9,
    reviewsCount: 1420,
    imageUrl: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&auto=format&fit=crop&q=80',
    description: 'Government certified Azotobacter + PSB + KMB microbial consortium. Boosts nutrient uptake by 35%.',
    isGovernmentCertified: true,
    subsidyAvailablePercent: 25,
    vendor: {
      name: 'Warangal Rythu Seva Kendra',
      location: 'Subedari, Warangal (6.2 km)',
      distanceKm: 6.2,
      phone: '+91 94401 23456'
    }
  },
  {
    id: 'PROD-02',
    name: 'Telangana Sona (RNR-15048) Certified Foundation Seeds',
    category: 'seeds',
    brand: 'PJTSAU Agri Seed Corp',
    priceInr: 1250,
    rating: 4.8,
    reviewsCount: 960,
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80',
    description: 'Low Glycemic Index (51.5) super-fine paddy seeds. Blast resistant, high market demand across India.',
    isGovernmentCertified: true,
    subsidyAvailablePercent: 30,
    vendor: {
      name: 'Hanamkonda District Seed Depot',
      location: 'Mandi Road, Hanamkonda (8.5 km)',
      distanceKm: 8.5,
      phone: '+91 98480 99887'
    }
  },
  {
    id: 'PROD-03',
    name: 'ROV-BOT Optical Precision Spraying Nozzle Bar (Attachment)',
    category: 'robot_tools',
    brand: 'AgriNet Robotics',
    priceInr: 14500,
    rating: 5.0,
    reviewsCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&auto=format&fit=crop&q=80',
    description: 'Quick-attach 1.8m spray boom with AI pulse width modulation. Delivers targeted droplet size 150-250 microns.',
    isGovernmentCertified: true,
    subsidyAvailablePercent: 40,
    vendor: {
      name: 'AgriNet Robotics Hub Telangana',
      location: 'Kakatiya Innovation Hub, Warangal (4.1 km)',
      distanceKm: 4.1,
      phone: '+91 870 299 4400'
    }
  },
  {
    id: 'PROD-04',
    name: 'LoRaWAN Multi-Depth Soil Moisture & EC Sensor Probe',
    category: 'sensors',
    brand: 'SenseAgro India',
    priceInr: 3200,
    rating: 4.7,
    reviewsCount: 480,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
    description: 'Measures VWC at 15cm & 30cm depth + Electrical Conductivity + Soil Temp. 5-year solar battery life.',
    isGovernmentCertified: true,
    subsidyAvailablePercent: 20,
    vendor: {
      name: 'Smart Agri IoT Solutions',
      location: 'Kazipet Station Road (7.8 km)',
      distanceKm: 7.8,
      phone: '+91 91212 33445'
    }
  },
  {
    id: 'PROD-05',
    name: 'Autonomous Multi-Spectral Drone Scouting Service (Per Acre)',
    category: 'drones',
    brand: 'Garuda Kisan Drones',
    priceInr: 399,
    rating: 4.9,
    reviewsCount: 840,
    imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&auto=format&fit=crop&q=80',
    description: 'High-res 2cm/pixel NDVI & thermal mapping. Same-day orthomosaic upload to AgriNet AI dashboard.',
    isGovernmentCertified: true,
    subsidyAvailablePercent: 50,
    vendor: {
      name: 'Kisan Drone FPO Alliance',
      location: 'Dharmasagar Village Center (1.2 km)',
      distanceKm: 1.2,
      phone: '+91 97000 88123'
    }
  }
];

export const GOVERNMENT_STATE_DATA: GovernmentStateStats[] = [
  { state: 'Telangana', totalFarmers: 248000, activeRobots: 1840, cropAcreageHectares: 485000, avgSoilHealthIndex: 82, droughtVulnerability: 'Low', pestAlertCount: 14, majorCrops: ['Cotton', 'Paddy', 'Chili', 'Maize'], expectedYieldTons: 1420000 },
  { state: 'Punjab', totalFarmers: 310000, activeRobots: 2450, cropAcreageHectares: 790000, avgSoilHealthIndex: 76, droughtVulnerability: 'Moderate', pestAlertCount: 22, majorCrops: ['Wheat', 'Paddy', 'Mustard', 'Sugarcane'], expectedYieldTons: 2850000 },
  { state: 'Tamil Nadu', totalFarmers: 195000, activeRobots: 1420, cropAcreageHectares: 390000, avgSoilHealthIndex: 84, droughtVulnerability: 'Low', pestAlertCount: 9, majorCrops: ['Paddy', 'Banana', 'Groundnut', 'Millets'], expectedYieldTons: 1180000 },
  { state: 'Maharashtra', totalFarmers: 420000, activeRobots: 2100, cropAcreageHectares: 920000, avgSoilHealthIndex: 79, droughtVulnerability: 'High', pestAlertCount: 38, majorCrops: ['Soybean', 'Cotton', 'Sugarcane', 'Onion'], expectedYieldTons: 2450000 },
  { state: 'Karnataka', totalFarmers: 260000, activeRobots: 1680, cropAcreageHectares: 540000, avgSoilHealthIndex: 81, droughtVulnerability: 'Moderate', pestAlertCount: 17, majorCrops: ['Ragi', 'Maize', 'Paddy', 'Coffee', 'Turmeric'], expectedYieldTons: 1620000 },
  { state: 'Uttar Pradesh', totalFarmers: 580000, activeRobots: 3100, cropAcreageHectares: 1250000, avgSoilHealthIndex: 78, droughtVulnerability: 'Moderate', pestAlertCount: 45, majorCrops: ['Wheat', 'Sugarcane', 'Potato', 'Paddy'], expectedYieldTons: 4100000 },
  { state: 'Gujarat', totalFarmers: 215000, activeRobots: 1550, cropAcreageHectares: 490000, avgSoilHealthIndex: 83, droughtVulnerability: 'Moderate', pestAlertCount: 12, majorCrops: ['Groundnut', 'Cotton', 'Castor', 'Cumin'], expectedYieldTons: 1390000 },
  { state: 'Assam', totalFarmers: 145000, activeRobots: 890, cropAcreageHectares: 310000, avgSoilHealthIndex: 87, droughtVulnerability: 'Low', pestAlertCount: 8, majorCrops: ['Tea', 'Paddy', 'Jute', 'Mustard'], expectedYieldTons: 820000 }
];

export const DPI_MODEL_REGISTRY: DPIModelRegistryEntry[] = [
  {
    id: 'DPI-TS-01',
    name: 'Telangana Cotton Bollworm & Pest Vision Model',
    originState: 'Telangana (PJTSAU)',
    domain: 'Pest Detection',
    framework: 'YOLOv11',
    version: 'v2.4.1',
    accuracy: 97.8,
    federatedNodes: ['Maharashtra', 'Gujarat', 'Andhra Pradesh'],
    endpoint: 'https://api.agristack.gov.in/v1/models/ts-pest-vision/predict',
    status: 'active'
  },
  {
    id: 'DPI-PB-02',
    name: 'Punjab Indo-Gangetic Wheat Yield Forecaster',
    originState: 'Punjab (PAU Ludhiana)',
    domain: 'Crop Yield',
    framework: 'XGBoost',
    version: 'v3.1.0',
    accuracy: 96.4,
    federatedNodes: ['Haryana', 'Uttar Pradesh', 'Madhya Pradesh'],
    endpoint: 'https://api.agristack.gov.in/v1/models/pb-wheat-yield/predict',
    status: 'active'
  },
  {
    id: 'DPI-TN-03',
    name: 'Cauvery Delta Soil Salinity & Moisture Inversion',
    originState: 'Tamil Nadu (TNAU)',
    domain: 'Soil Fertility',
    framework: 'Random Forest',
    version: 'v1.9.2',
    accuracy: 95.1,
    federatedNodes: ['Karnataka', 'Kerala', 'Andhra Pradesh'],
    endpoint: 'https://api.agristack.gov.in/v1/models/tn-soil-inversion/predict',
    status: 'active'
  },
  {
    id: 'DPI-KA-04',
    name: 'Deccan Plateau Semi-Arid Drought Vulnerability Index',
    originState: 'Karnataka (UAS Bengaluru)',
    domain: 'Drought Index',
    framework: 'LSTM',
    version: 'v2.0.4',
    accuracy: 94.7,
    federatedNodes: ['Telangana', 'Maharashtra', 'Tamil Nadu'],
    endpoint: 'https://api.agristack.gov.in/v1/models/ka-drought-lstm/predict',
    status: 'active'
  },
  {
    id: 'DPI-AS-05',
    name: 'Brahmaputra Flood Receding Sowing Window AI',
    originState: 'Assam (AAU Jorhat)',
    domain: 'Crop Yield',
    framework: 'U-Net',
    version: 'v1.4.0',
    accuracy: 93.9,
    federatedNodes: ['West Bengal', 'Bihar', 'Odisha'],
    endpoint: 'https://api.agristack.gov.in/v1/models/as-flood-window/predict',
    status: 'active'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'NOTIF-01',
    title: 'Optimal Spraying Window Open',
    message: 'Weather conditions are perfect today until 11:00 AM. ROV-BOT is pre-calibrated for Quadrant B bio-spraying.',
    type: 'weather',
    timestamp: '15 mins ago',
    read: false,
    priority: 'medium'
  },
  {
    id: 'NOTIF-02',
    title: 'Pest Outbreak Alert - Whitefly Warning',
    message: 'Agriculture Office reported whitefly activity in 3 nearby farms within 4 km radius. Inspect traps today.',
    type: 'pest',
    timestamp: '1 hour ago',
    read: false,
    priority: 'high'
  },
  {
    id: 'NOTIF-03',
    title: 'ROV-BOT Mission Milestone',
    message: 'Weeding mission in East Plot completed successfully (100% coverage, 0 collisions, 0.42 kWh solar energy harvested).',
    type: 'robot',
    timestamp: '3 hours ago',
    read: true,
    priority: 'low'
  },
  {
    id: 'NOTIF-04',
    title: 'PM-KISAN & State Bio-Input Subsidy Credited',
    message: 'Direct Benefit Transfer of ₹4,000 for organic compost adoption approved under AgriStack scheme.',
    type: 'scheme',
    timestamp: 'Yesterday',
    read: true,
    priority: 'low'
  }
];

export const MULTILINGUAL_VOCAB: Record<string, Record<string, string>> = {
  appName: {
    en: 'ROV-BOT AgriNet AI',
    te: 'ROV-BOT వ్యవసాయ నెట్‌వర్క్',
    ta: 'ROV-BOT வேளாண்மை AI',
    hi: 'ROV-BOT कृषि नेटवर्क AI',
    kn: 'ROV-BOT ಕೃಷಿ ನೆಟ್‌ವರ್ಕ್ AI',
    mr: 'ROV-BOT कृषी नेटवर्क AI',
    bn: 'ROV-BOT কৃষি নেটওয়ার্ক AI'
  },
  welcome: {
    en: 'Welcome back, Farmer',
    te: 'స్వాగతం, రైతు మిత్రమా',
    ta: 'வணக்கம், விவசாய பெருமக்களே',
    hi: 'स्वागत है, किसान मित्र',
    kn: 'ಸುಸ್ವಾಗತ, ರೈತ ಮಿತ್ರರೇ',
    mr: 'स्वागत आहे, शेतकरी मित्र',
    bn: 'স্বাগতম, কৃষক বন্ধু'
  }
};
