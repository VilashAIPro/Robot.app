// ROV-BOT AI Agriculture Network Type Definitions

export type UserRole = 'farmer' | 'officer' | 'government' | 'admin';

export type IndianLanguage = 'en' | 'te' | 'ta' | 'hi' | 'kn' | 'mr' | 'bn';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  state: string;
  district: string;
  village: string;
  farmName: string;
  farmSizeAcres: number;
  primaryCrop: string;
  avatarUrl: string;
  preferredLanguage: IndianLanguage;
  agriStackId: string;
}

export interface WeatherData {
  temp: number;
  humidity: number;
  condition: string;
  rainChance: number;
  windSpeed: number;
  windDirection: string;
  uvIndex: number;
  soilTemp: number;
  forecast7Day: {
    day: string;
    date: string;
    tempMax: number;
    tempMin: number;
    rainMm: number;
    condition: string;
    icon: string;
    sprayingCondition: 'Optimal' | 'Caution' | 'Unfavorable';
  }[];
  aiAdvisory: {
    spraying: { status: 'Optimal' | 'Delay' | 'Avoid'; reason: string };
    irrigation: { status: 'Hold' | 'Irrigate Now' | 'Minimal'; reason: string };
    sowingWindow: { status: 'Open' | 'Closed' | 'Upcoming'; window: string; reason: string };
  };
}

export interface SoilHealthData {
  ph: number;
  moisture: number;
  nitrogenKgHa: number;
  phosphorusKgHa: number;
  potassiumKgHa: number;
  organicCarbonPercent: number;
  fertilityScore: number;
  waterHoldingCapacity: number;
  electricalConductivity: number;
  zincPpm: number;
  ironPpm: number;
  boronPpm: number;
  sulphurPpm: number;
  healthGrade: 'Optimal' | 'Good' | 'Moderate' | 'Deficient';
  aiRecommendations: {
    organicCompostKgPerAcre: number;
    ureaDoseKg: number;
    dapDoseKg: number;
    mopDoseKg: number;
    waterRequirementLiters: number;
    actionableTips: string[];
  };
}

export interface CropRecommendationRequest {
  state: string;
  district: string;
  village: string;
  soilType: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicCarbon: number;
  moisture: number;
  temperature: number;
  rainfall: number;
  previousCrop: string;
}

export interface CropRecommendationResult {
  recommendedCrop: string;
  cropCategory: string;
  seedVariety: string;
  expectedYieldQuintalsPerAcre: number;
  marketPriceRangePerQuintal: string;
  expectedGrossIncomePerAcre: number;
  confidenceScore: number;
  growthDurationDays: number;
  fertilizerSchedule: {
    stage: string;
    dayRange: string;
    fertilizer: string;
    quantity: string;
  }[];
  irrigationSchedule: {
    stage: string;
    frequency: string;
    waterDepthCm: number;
  }[];
  regenerativeAdvice: string[];
  sowingMonth: string;
}

export interface SatelliteLayer {
  id: 'ndvi' | 'ndwi' | 'thermal' | 'vigor' | 'moisture';
  name: string;
  description: string;
  unit: string;
  colorScale: string[];
}

export interface SatelliteFieldData {
  fieldId: string;
  fieldName: string;
  areaAcres: number;
  lastUpdated: string;
  ndviAverage: number;
  ndwiAverage: number;
  surfaceTempCelsius: number;
  vigorScore: number;
  stressZonesCount: number;
  timelineHistory: {
    date: string;
    ndvi: number;
    ndwi: number;
    vigor: number;
  }[];
  polygonCoordinates: [number, number][];
}

export interface DiseaseDetectionResult {
  id: string;
  cropName: string;
  diseaseName: string;
  scientificName: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Severe';
  timestamp: string;
  imageUrl: string;
  symptoms: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  prevention: string[];
  nearbyKvk: {
    name: string;
    distanceKm: number;
    contact: string;
    officer: string;
  };
}

export type RobotToolAttachment = 'seeder' | 'weeder' | 'sprayer' | 'plough' | 'multispectral';
export type RobotMissionStatus = 'idle' | 'running' | 'paused' | 'returning' | 'charging' | 'emergency_stopped';

export interface RobotDigitalTwin {
  id: string;
  name: string;
  model: string;
  batteryPercent: number;
  batteryVoltage: number;
  batteryTempC: number;
  solarChargingWatts: number;
  solarDailyWh: number;
  speedKmh: number;
  fieldCoveragePercent: number;
  activeAttachment: RobotToolAttachment;
  missionStatus: RobotMissionStatus;
  currentMissionType: string;
  gps: {
    lat: number;
    lng: number;
    altitudeMeters: number;
    accuracyCm: number;
  };
  imu: {
    pitch: number;
    roll: number;
    yaw: number;
  };
  lidarObstacleDistanceMeters: number;
  ultrasonicGroundDistanceCm: number;
  motors: {
    frontLeftRpm: number;
    frontRightRpm: number;
    rearLeftRpm: number;
    rearRightRpm: number;
    motorTempC: number;
  };
  nozzlePressurePsi?: number;
  seedDispenserRateGpm?: number;
  activeFaults: string[];
}

export interface MissionPlan {
  id: string;
  name: string;
  tool: RobotToolAttachment;
  targetAreaAcres: number;
  estimatedDurationMins: number;
  batteryConsumptionEst: number;
  rowSpacingMeters: number;
  speedSettingKmh: number;
  waypointsCount: number;
  pathCoordinates: [number, number][];
  status: 'planned' | 'in_progress' | 'completed';
}

export interface IoTSensorLog {
  timestamp: string;
  soilMoisture15cm: number;
  soilMoisture30cm: number;
  soilTemperature: number;
  ambientTemperature: number;
  ambientHumidity: number;
  solarIrradianceLux: number;
  batteryVoltage: number;
  batteryCurrentDraw: number;
  chassisVibration: number;
}

export interface VoiceChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  translatedText?: string;
  language: IndianLanguage;
  timestamp: string;
  actionCards?: {
    title: string;
    description: string;
    actionLabel?: string;
    route?: string;
  }[];
}

export interface RegenerativeFarmMetrics {
  sustainabilityScore: number;
  carbonSequesteredKgPerYear: number;
  carbonCreditsEarned: number;
  waterSavedLitersYear: number;
  chemicalReductionPercent: number;
  soilOrganicMatterTrend: number[];
  recommendedPractices: {
    title: string;
    category: string;
    benefit: string;
    adopted: boolean;
    carbonReward: number;
  }[];
}

export interface MarketplaceProduct {
  id: string;
  name: string;
  category: 'seeds' | 'bio_fertilizers' | 'robot_tools' | 'sensors' | 'drones';
  brand: string;
  priceInr: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  description: string;
  isGovernmentCertified: boolean;
  subsidyAvailablePercent?: number;
  vendor: {
    name: string;
    location: string;
    distanceKm: number;
    phone: string;
  };
}

export interface GovernmentStateStats {
  state: string;
  totalFarmers: number;
  activeRobots: number;
  cropAcreageHectares: number;
  avgSoilHealthIndex: number;
  droughtVulnerability: 'Low' | 'Moderate' | 'High';
  pestAlertCount: number;
  majorCrops: string[];
  expectedYieldTons: number;
}

export interface DPIModelRegistryEntry {
  id: string;
  name: string;
  originState: string;
  domain: 'Crop Yield' | 'Pest Detection' | 'Soil Fertility' | 'Drought Index' | 'Price Forecaster';
  framework: 'XGBoost' | 'YOLOv11' | 'Random Forest' | 'LSTM' | 'U-Net';
  version: string;
  accuracy: number;
  federatedNodes: string[];
  endpoint: string;
  status: 'active' | 'updating';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'weather' | 'pest' | 'robot' | 'soil' | 'scheme' | 'alert';
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}
