import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';

// Module Components
import { FarmerDashboard } from './components/modules/FarmerDashboard';
import { CropRecommendationEngine } from './components/modules/CropRecommendationEngine';
import { SatelliteIntelligence } from './components/modules/SatelliteIntelligence';
import { WeatherForecastAI } from './components/modules/WeatherForecastAI';
import { SoilHealthAnalytics } from './components/modules/SoilHealthAnalytics';
import { CropDiseaseDiagnosis } from './components/modules/CropDiseaseDiagnosis';
import { RobotControlCenter } from './components/modules/RobotControlCenter';
import { MissionPlanner } from './components/modules/MissionPlanner';
import { IoTSensorMonitoring } from './components/modules/IoTSensorMonitoring';
import { MultilingualVoiceAssistant } from './components/modules/MultilingualVoiceAssistant';
import { RegenerativeAdvisor } from './components/modules/RegenerativeAdvisor';
import { AgriMarketplace } from './components/modules/AgriMarketplace';
import { GovernmentDashboard } from './components/modules/GovernmentDashboard';
import { AgricultureOfficerDashboard } from './components/modules/AgricultureOfficerDashboard';
import { DPIArchitecture } from './components/modules/DPIArchitecture';
import { NotificationCenter } from './components/modules/NotificationCenter';
import { ReportsGenerator } from './components/modules/ReportsGenerator';
import { AdvancedAnalytics } from './components/modules/AdvancedAnalytics';
import { DroneFleetAndExtra } from './components/modules/DroneFleetAndExtra';

export const App: React.FC = () => {
  const { activeTab, emergencySosActive } = useApp();

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'dashboard':
        return <FarmerDashboard />;
      case 'crop_recommendation':
        return <CropRecommendationEngine />;
      case 'satellite_intelligence':
        return <SatelliteIntelligence />;
      case 'weather_forecast':
        return <WeatherForecastAI />;
      case 'soil_health':
        return <SoilHealthAnalytics />;
      case 'disease_diagnosis':
        return <CropDiseaseDiagnosis />;
      case 'robot_cockpit':
        return <RobotControlCenter />;
      case 'mission_planner':
        return <MissionPlanner />;
      case 'iot_telemetry':
        return <IoTSensorMonitoring />;
      case 'voice_assistant':
        return <MultilingualVoiceAssistant />;
      case 'regenerative_advisor':
        return <RegenerativeAdvisor />;
      case 'marketplace':
        return <AgriMarketplace />;
      case 'government_dashboard':
        return <GovernmentDashboard />;
      case 'officer_dashboard':
        return <AgricultureOfficerDashboard />;
      case 'dpi_registry':
        return <DPIArchitecture />;
      case 'reports':
        return <ReportsGenerator />;
      case 'analytics':
        return <AdvancedAnalytics />;
      case 'drone_fleet':
      case 'community_forum':
      case 'agristack_qr':
        return <DroneFleetAndExtra />;
      default:
        return <FarmerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Emergency SOS Banner (Visible when SOS triggered) */}
      {emergencySosActive && (
        <div className="bg-rose-600 text-white px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 animate-pulse shadow-lg z-50">
          <span>🚨 EMERGENCY SOS BROADCASTED TO KVK & POLICE. ALL AUTONOMOUS ROBOTS HALTED.</span>
        </div>
      )}

      {/* Main Body with Sidebar + Active Content View */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {renderActiveModule()}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 glass-panel py-6 px-4 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-bold text-slate-300">ROV-BOT AI Agriculture Network (AgriNet AI)</span>
            <span className="text-slate-600">|</span>
            <span>Hall of Community Hackathon 2.0</span>
          </div>

          <div className="text-[11px] text-slate-400">
            Powered by India Digital Public Infrastructure (DPI) • ICAR • PAU • TNAU • PJTSAU
          </div>
        </div>
      </footer>
    </div>
  );
};
