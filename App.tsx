import React, { useState } from 'react';
import { MenuGrid } from './components/MenuGrid';
import { DetailView } from './components/DetailView';
import { ItineraryView } from './components/ItineraryView';
import { GearView } from './components/GearView';
import { TransportView } from './components/TransportView';
import { CampingView } from './components/CampingView';
import { FoodView } from './components/FoodView';
import { SafetyView } from './components/SafetyView';
import { EmergencyView } from './components/EmergencyView';
import { AppSection } from './types';
import { Compass } from 'lucide-react';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.HOME);

  // View router
  const renderContent = () => {
    switch (currentSection) {
      case AppSection.HOME:
        return <MenuGrid onNavigate={setCurrentSection} />;
      case AppSection.ITINERARY:
        return <ItineraryView onBack={() => setCurrentSection(AppSection.HOME)} />;
      case AppSection.GEAR:
        return <GearView onBack={() => setCurrentSection(AppSection.HOME)} />;
      case AppSection.TRANSPORT:
        return <TransportView onBack={() => setCurrentSection(AppSection.HOME)} />;
      case AppSection.CAMPING:
        return <CampingView onBack={() => setCurrentSection(AppSection.HOME)} />;
      case AppSection.FOOD:
        return <FoodView onBack={() => setCurrentSection(AppSection.HOME)} />;
      case AppSection.SAFETY:
        return <SafetyView onBack={() => setCurrentSection(AppSection.HOME)} />;
      case AppSection.EMERGENCY:
        return <EmergencyView onBack={() => setCurrentSection(AppSection.HOME)} />;
      default:
        // Fallback for any undefined routes
        return (
          <DetailView 
            section={currentSection} 
            onBack={() => setCurrentSection(AppSection.HOME)} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-slate-200">
      {/* Background Decoration */}
      {currentSection === AppSection.HOME && (
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-teal-500 to-emerald-700 rounded-b-[2.5rem] z-0" />
      )}
      
      {/* Main Layout Layer */}
      <div className="relative z-10 flex flex-col h-full">
        
        {/* Header - Only show on Home */}
        {currentSection === AppSection.HOME && (
          <header className="p-6 pt-12 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                <Compass size={24} className="text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-wide">MacLehose Trail</h1>
                <p className="text-teal-100 text-xs font-medium">香港麦理浩径助手</p>
              </div>
            </div>
          </header>
        )}

        {/* Content Area */}
        <main className={`flex-1 ${currentSection === AppSection.HOME ? '-mt-4' : ''}`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;