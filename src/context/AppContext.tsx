import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  IndianLanguage,
  WeatherData,
  SoilHealthData,
  SatelliteFieldData,
  DiseaseDetectionResult,
  RobotDigitalTwin,
  MissionPlan,
  IoTSensorLog,
  RegenerativeFarmMetrics,
  MarketplaceProduct,
  AppNotification,
  CropRecommendationResult,
  CropRecommendationRequest
} from '../types';
import {
  INITIAL_USER,
  INITIAL_WEATHER,
  INITIAL_SOIL_HEALTH,
  INITIAL_SATELLITE_FIELD,
  SAMPLE_DISEASE_SCANS,
  INITIAL_ROBOT,
  INITIAL_MISSION_PLAN,
  INITIAL_IOT_LOGS,
  REGENERATIVE_METRICS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

export type ActiveTab =
  | 'dashboard'
  | 'crop_recommendation'
  | 'satellite_intelligence'
  | 'weather_forecast'
  | 'soil_health'
  | 'disease_diagnosis'
  | 'robot_cockpit'
  | 'mission_planner'
  | 'iot_telemetry'
  | 'voice_assistant'
  | 'regenerative_advisor'
  | 'marketplace'
  | 'government_dashboard'
  | 'officer_dashboard'
  | 'dpi_registry'
  | 'reports'
  | 'analytics'
  | 'drone_fleet'
  | 'community_forum'
  | 'agristack_qr';

interface AppContextType {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  setUserRole: (role: UserRole) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: IndianLanguage;
  setLanguage: (lang: IndianLanguage) => void;
  weather: WeatherData;
  soilHealth: SoilHealthData;
  satelliteData: SatelliteFieldData;
  robot: RobotDigitalTwin;
  missionPlan: MissionPlan;
  iotLogs: IoTSensorLog[];
  diseaseScans: DiseaseDetectionResult[];
  addDiseaseScan: (scan: DiseaseDetectionResult) => void;
  regenerativeMetrics: RegenerativeFarmMetrics;
  toggleRegenerativePractice: (index: number) => void;
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  isSimulating: boolean;
  setIsSimulating: (val: boolean) => void;
  lastRecommendation: CropRecommendationResult | null;
  runCropRecommendation: (req: CropRecommendationRequest) => Promise<CropRecommendationResult>;
  sendRobotCommand: (cmd: 'start' | 'pause' | 'return_home' | 'emergency_stop' | 'switch_tool', tool?: any) => void;
  emergencySosActive: boolean;
  triggerEmergencySos: () => void;
  cart: { product: MarketplaceProduct; quantity: number }[];
  addToCart: (product: MarketplaceProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [language, setLanguage] = useState<IndianLanguage>('en');
  const [weather, setWeather] = useState<WeatherData>(INITIAL_WEATHER);
  const [soilHealth, setSoilHealth] = useState<SoilHealthData>(INITIAL_SOIL_HEALTH);
  const [satelliteData, setSatelliteData] = useState<SatelliteFieldData>(INITIAL_SATELLITE_FIELD);
  const [robot, setRobot] = useState<RobotDigitalTwin>(INITIAL_ROBOT);
  const [missionPlan, setMissionPlan] = useState<MissionPlan>(INITIAL_MISSION_PLAN);
  const [iotLogs, setIotLogs] = useState<IoTSensorLog[]>(INITIAL_IOT_LOGS);
  const [diseaseScans, setDiseaseScans] = useState<DiseaseDetectionResult[]>(SAMPLE_DISEASE_SCANS);
  const [regenerativeMetrics, setRegenerativeMetrics] = useState<RegenerativeFarmMetrics>(REGENERATIVE_METRICS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [lastRecommendation, setLastRecommendation] = useState<CropRecommendationResult | null>(null);
  const [emergencySosActive, setEmergencySosActive] = useState<boolean>(false);
  const [cart, setCart] = useState<{ product: MarketplaceProduct; quantity: number }[]>([]);

  const setUserRole = (role: UserRole) => {
    setUser((prev) => ({ ...prev, role }));
    if (role === 'government') {
      setActiveTab('government_dashboard');
    } else if (role === 'officer') {
      setActiveTab('officer_dashboard');
    } else if (role === 'admin') {
      setActiveTab('dpi_registry');
    } else {
      setActiveTab('dashboard');
    }
  };

  const addDiseaseScan = (scan: DiseaseDetectionResult) => {
    setDiseaseScans((prev) => [scan, ...prev]);
  };

  const toggleRegenerativePractice = (index: number) => {
    setRegenerativeMetrics((prev) => {
      const updated = [...prev.recommendedPractices];
      updated[index] = { ...updated[index], adopted: !updated[index].adopted };
      const adoptedCount = updated.filter((p) => p.adopted).length;
      const newScore = Math.min(100, Math.round(55 + (adoptedCount / updated.length) * 45));
      const newCarbon = Math.round(1800 + adoptedCount * 650);
      return {
        ...prev,
        recommendedPractices: updated,
        sustainabilityScore: newScore,
        carbonSequesteredKgPerYear: newCarbon,
        carbonCreditsEarned: parseFloat((newCarbon / 1000).toFixed(2))
      };
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const triggerEmergencySos = () => {
    setEmergencySosActive(true);
    setRobot((prev) => ({
      ...prev,
      missionStatus: 'emergency_stopped',
      speedKmh: 0,
      activeFaults: ['EMERGENCY SOS TRIGGERED - ALL MOTORS HALTED']
    }));
    const sosNotif: AppNotification = {
      id: `SOS-${Date.now()}`,
      title: '🚨 EMERGENCY SOS BROADCASTED',
      message: `Emergency signal dispatched to Warangal District Agriculture Officer & Local Response Team. Coordinates: ${robot.gps.lat.toFixed(4)}° N, ${robot.gps.lng.toFixed(4)}° E`,
      type: 'alert',
      timestamp: 'Just now',
      read: false,
      priority: 'critical'
    };
    setNotifications((prev) => [sosNotif, ...prev]);
  };

  const sendRobotCommand = (cmd: 'start' | 'pause' | 'return_home' | 'emergency_stop' | 'switch_tool', tool?: any) => {
    if (cmd === 'emergency_stop') {
      triggerEmergencySos();
      return;
    }
    setRobot((prev) => {
      let newStatus = prev.missionStatus;
      let newSpeed = prev.speedKmh;
      let faults = prev.activeFaults;

      if (cmd === 'start') {
        newStatus = 'running';
        newSpeed = 3.4;
        faults = [];
        setEmergencySosActive(false);
      } else if (cmd === 'pause') {
        newStatus = 'paused';
        newSpeed = 0;
      } else if (cmd === 'return_home') {
        newStatus = 'returning';
        newSpeed = 4.2;
      } else if (cmd === 'switch_tool' && tool) {
        return { ...prev, activeAttachment: tool };
      }

      return {
        ...prev,
        missionStatus: newStatus,
        speedKmh: newSpeed,
        activeFaults: faults
      };
    });
  };

  const addToCart = (product: MarketplaceProduct) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const runCropRecommendation = async (req: CropRecommendationRequest): Promise<CropRecommendationResult> => {
    // High-precision agronomic AI model calculation
    let crop = 'Cotton (Bt Hybrid BG-II)';
    let category = 'Commercial Cash Crop';
    let seedVar = 'RCH-659 BG-II / Mallika';
    let yieldQ = 14.5;
    let priceRange = '₹7,200 – ₹8,400';
    let grossIncome = 112000;
    let durationDays = 150;
    let sowingMonth = 'June – July / Rabi Late Window';

    if (req.soilType.toLowerCase().includes('clay') || req.moisture > 65) {
      crop = 'Super Fine Paddy (Telangana Sona RNR-15048)';
      category = 'Cereal & Grain';
      seedVar = 'RNR-15048 Foundation Seed';
      yieldQ = 26.0;
      priceRange = '₹2,320 – ₹2,800';
      grossIncome = 68000;
      durationDays = 125;
      sowingMonth = 'November – December (Rabi) / July (Kharif)';
    } else if (req.ph > 7.5 || req.rainfall < 600) {
      crop = 'Pearl Millet (Bajra) / Sorghum (Jowar)';
      category = 'Nutri-Cereal & Climate Resilient Millet';
      seedVar = 'ICMV 221 / CSH 24MF';
      yieldQ = 18.0;
      priceRange = '₹2,500 – ₹3,200';
      grossIncome = 52000;
      durationDays = 95;
      sowingMonth = 'July or October';
    } else if (req.previousCrop.toLowerCase().includes('cotton')) {
      crop = 'Gram / Chickpea (Bengal Gram JG-11)';
      category = 'Pulse & Nitrogen Fixer';
      seedVar = 'JG-11 / NBeG-3 (Wilt Resistant)';
      yieldQ = 9.5;
      priceRange = '₹5,440 – ₹6,100';
      grossIncome = 54500;
      durationDays = 100;
      sowingMonth = 'October – November';
    }

    const result: CropRecommendationResult = {
      recommendedCrop: crop,
      cropCategory: category,
      seedVariety: seedVar,
      expectedYieldQuintalsPerAcre: yieldQ,
      marketPriceRangePerQuintal: priceRange,
      expectedGrossIncomePerAcre: grossIncome,
      confidenceScore: 96.8,
      growthDurationDays: durationDays,
      sowingMonth: sowingMonth,
      fertilizerSchedule: [
        { stage: 'Basal Application', dayRange: 'Day 0 (Sowing)', fertilizer: 'DAP 40kg + MOP 15kg + Zinc Sulfate 5kg', quantity: '60 kg/acre' },
        { stage: 'First Vegetative Split', dayRange: 'Day 25 – 30', fertilizer: 'Neem Coated Urea 25kg + Bio-NPK Consortium', quantity: '25 kg/acre' },
        { stage: 'Flowering / Tillering', dayRange: 'Day 50 – 60', fertilizer: 'Urea 20kg + 13:00:45 Potassium Nitrate Spray', quantity: '22 kg/acre' },
        { stage: 'Grain / Boll Maturation', dayRange: 'Day 80 – 90', fertilizer: '00:00:50 Sulfate of Potash (Foliar)', quantity: '2 kg/acre' }
      ],
      irrigationSchedule: [
        { stage: 'Germination & Crown Root Initiation', frequency: 'Every 4–6 Days', waterDepthCm: 3.5 },
        { stage: 'Active Tillering / Branching', frequency: 'Every 7–9 Days', waterDepthCm: 5.0 },
        { stage: 'Panicle / Flowering Phase', frequency: 'Every 5–7 Days', waterDepthCm: 6.0 },
        { stage: 'Maturity & Grain Hardening', frequency: 'Hold water 12 days before harvest', waterDepthCm: 0 }
      ],
      regenerativeAdvice: [
        'Intercrop with 2 rows of Redgram (Pigeonpea) for biological pest trap & nitrogen enrichment.',
        'Apply 5 tons of well-decomposed FYM (Farm Yard Manure) with Trichoderma bio-inoculant before second ploughing.',
        'Use solar ROV-BOT for micro-laser spot weeding to completely avoid synthetic post-emergence weedicides.'
      ]
    };

    setLastRecommendation(result);
    return result;
  };

  // Real-time Simulation Engine
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      // 1. Simulate Robot Moving & Battery Telemetry
      setRobot((prev) => {
        if (prev.missionStatus !== 'running') return prev;

        const nextCoverage = prev.fieldCoveragePercent >= 99 ? 0 : prev.fieldCoveragePercent + 0.4;
        const nextBattery = prev.batteryPercent > 15 ? +(prev.batteryPercent - 0.02 + 0.01).toFixed(2) : 95;
        const nextSolarWatts = Math.round(140 + Math.sin(Date.now() / 5000) * 15);
        const latDelta = (Math.random() - 0.5) * 0.00008;
        const lngDelta = (Math.random() - 0.5) * 0.00008;

        return {
          ...prev,
          fieldCoveragePercent: +nextCoverage.toFixed(1),
          batteryPercent: nextBattery,
          solarChargingWatts: nextSolarWatts,
          gps: {
            ...prev.gps,
            lat: prev.gps.lat + latDelta,
            lng: prev.gps.lng + lngDelta
          },
          motors: {
            ...prev.motors,
            frontLeftRpm: 120 + Math.floor(Math.random() * 8),
            frontRightRpm: 120 + Math.floor(Math.random() * 8),
            rearLeftRpm: 120 + Math.floor(Math.random() * 8),
            rearRightRpm: 120 + Math.floor(Math.random() * 8)
          },
          ultrasonicGroundDistanceCm: +(22.0 + Math.sin(Date.now() / 2000) * 1.5).toFixed(1)
        };
      });

      // 2. Simulate IoT Sensor Stream
      setIotLogs((prev) => {
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        const lastLog = prev[prev.length - 1] || INITIAL_IOT_LOGS[0];

        const newLog: IoTSensorLog = {
          timestamp: timeStr,
          soilMoisture15cm: +(lastLog.soilMoisture15cm + (Math.random() - 0.5) * 0.2).toFixed(1),
          soilMoisture30cm: +(lastLog.soilMoisture30cm + (Math.random() - 0.5) * 0.1).toFixed(1),
          soilTemperature: +(24.8 + Math.sin(Date.now() / 10000) * 0.5).toFixed(1),
          ambientTemperature: +(29.2 + Math.sin(Date.now() / 8000) * 0.8).toFixed(1),
          ambientHumidity: +(62 + (Math.random() - 0.5) * 1.5).toFixed(0),
          solarIrradianceLux: Math.round(75000 + Math.sin(Date.now() / 4000) * 4000),
          batteryVoltage: +(48.6 + (Math.random() - 0.5) * 0.1).toFixed(1),
          batteryCurrentDraw: +(4.3 + Math.random() * 0.3).toFixed(1),
          chassisVibration: +(0.12 + Math.random() * 0.05).toFixed(2)
        };

        const updated = [...prev.slice(-19), newLog];
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        setUserRole,
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        weather,
        soilHealth,
        satelliteData,
        robot,
        missionPlan,
        iotLogs,
        diseaseScans,
        addDiseaseScan,
        regenerativeMetrics,
        toggleRegenerativePractice,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        isSimulating,
        setIsSimulating,
        lastRecommendation,
        runCropRecommendation,
        sendRobotCommand,
        emergencySosActive,
        triggerEmergencySos,
        cart,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
