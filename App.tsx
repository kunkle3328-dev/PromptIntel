
import React, { useState, useEffect } from 'react';
import { View, UserTier, UserState } from './types';
import Dashboard from './components/Dashboard';
import LearningSystem from './components/LearningSystem';
import PromptAnalyzer from './components/PromptAnalyzer';
import Templates from './components/Templates';
import LandingPage from './components/LandingPage';
import { Home, BookOpen, SearchCode, Settings, Zap, Menu, X, Library } from 'lucide-react';

const App: React.FC = () => {
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('prompt_intel_state');
    return saved ? JSON.parse(saved) : {
      tier: UserTier.FREE,
      completedLessons: [],
      analyzerUses: 0,
      savedPrompts: [],
      hasCompletedOnboarding: false
    };
  });

  const [currentView, setCurrentView] = useState<View>(
    userState.hasCompletedOnboarding ? 'dashboard' : 'onboarding'
  );

  useEffect(() => {
    localStorage.setItem('prompt_intel_state', JSON.stringify(userState));
  }, [userState]);

  const completeOnboarding = () => {
    setUserState(prev => ({ ...prev, hasCompletedOnboarding: true, analyzerUses: prev.analyzerUses + 1 }));
    setCurrentView('dashboard');
  };

  const toggleLesson = (id: string) => {
    setUserState(prev => {
      const isCompleted = prev.completedLessons.includes(id);
      return {
        ...prev,
        completedLessons: isCompleted 
          ? prev.completedLessons.filter(l => l !== id)
          : [...prev.completedLessons, id]
      };
    });
  };

  const incrementAnalyzer = () => {
    setUserState(prev => ({ ...prev, analyzerUses: prev.analyzerUses + 1 }));
  };

  const upgradeToPro = () => {
    setUserState(prev => ({ ...prev, tier: UserTier.PRO }));
    alert("Welcome to the Elite Certification Program. PRO access activated.");
  };

  const renderView = () => {
    if (currentView === 'onboarding') {
      return <LandingPage onComplete={completeOnboarding} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard userState={userState} onNavigate={setCurrentView} onUpgrade={upgradeToPro} />;
      case 'learning':
        return <LearningSystem userState={userState} onComplete={toggleLesson} />;
      case 'analyzer':
        return <PromptAnalyzer userState={userState} onAnalyze={incrementAnalyzer} onUpgrade={upgradeToPro} />;
      case 'templates':
        return <Templates userState={userState} onUpgrade={upgradeToPro} />;
      case 'settings':
        return (
          <div className="p-4 md:p-12 fade-in pb-32 md:pb-12">
            <h1 className="text-2xl md:text-4xl font-black mb-6 md:mb-8 tracking-tight uppercase italic">Settings</h1>
            <div className="glass-panel rounded-2xl md:rounded-[2.5rem] p-5 md:p-10 space-y-6 md:space-y-8 max-w-2xl border-white/5 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 md:pb-8 border-b border-white/5">
                <div>
                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-1 md:mb-2">Membership Status</p>
                  <p className="text-xl md:text-3xl font-black flex items-center gap-2 md:gap-3">
                    {userState.tier === UserTier.PRO ? <><Zap className="text-blue-500 fill-current" size={18} /> PRO Architect</> : 'Foundation Tier'}
                  </p>
                </div>
                {userState.tier === UserTier.FREE && (
                  <button onClick={upgradeToPro} className="w-full md:w-auto bg-blue-600 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">Upgrade Now</button>
                )}
              </div>
              <div className="space-y-4 md:space-y-6">
                <div>
                   <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 md:mb-4">Core Telemetry</h4>
                   <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div className="bg-black/40 p-4 rounded-xl border border-white/5 shadow-inner">
                         <p className="text-[8px] text-slate-500 font-black uppercase mb-1 tracking-widest">Daily Limit</p>
                         <p className="text-base md:text-xl font-bold">{userState.tier === UserTier.PRO ? 'Unlimited' : `${3 - userState.analyzerUses} Left`}</p>
                      </div>
                      <div className="bg-black/40 p-4 rounded-xl border border-white/5 shadow-inner">
                         <p className="text-[8px] text-slate-500 font-black uppercase mb-1 tracking-widest">Mastery</p>
                         <p className="text-base md:text-xl font-bold">{userState.completedLessons.length} / 30</p>
                      </div>
                   </div>
                </div>
                <p className="text-slate-500 text-[9px] italic mt-4 opacity-30">"Structure is the backbone of machine intelligence." — v1.0.0</p>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard userState={userState} onNavigate={setCurrentView} onUpgrade={upgradeToPro} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col md:flex-row selection:bg-blue-500/30">
      {/* Mobile Top Bar */}
      {currentView !== 'onboarding' && (
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-black sticky top-0 z-50 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500 fill-current" />
            <span className="font-black text-sm tracking-tighter italic uppercase leading-none">Prompt<br/>Intel</span>
          </div>
          <button onClick={() => setCurrentView('settings')} className="p-1.5 bg-white/5 rounded-lg text-slate-400">
             <Settings size={16} />
          </button>
        </div>
      )}

      {/* Sidebar - Visible only on Desktop and not in Onboarding */}
      {currentView !== 'onboarding' && (
        <div className={`hidden md:flex flex-col bg-[#000000] w-72 border-r border-white/5 min-h-screen sticky top-0`}>
          <div className="p-8 flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-blue-500 fill-current" />
            <span className="font-black text-xl tracking-tighter italic uppercase leading-none">Prompt<br/>Intel</span>
          </div>

          <nav className="px-4 space-y-1 flex-1">
            <NavItem active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} icon={<Home size={20} />} label="Home Portal" />
            <NavItem active={currentView === 'learning'} onClick={() => setCurrentView('learning')} icon={<BookOpen size={20} />} label="Curriculum" />
            <NavItem active={currentView === 'analyzer'} onClick={() => setCurrentView('analyzer')} icon={<SearchCode size={20} />} label="Auditor" />
            <NavItem active={currentView === 'templates'} onClick={() => setCurrentView('templates')} icon={<Library size={20} />} label="Vault" />
            <NavItem active={currentView === 'settings'} onClick={() => setCurrentView('settings')} icon={<Settings size={20} />} label="Account" />
          </nav>

          {userState.tier === UserTier.FREE && (
            <div className="m-6 p-5 bg-gradient-to-br from-blue-600/5 to-purple-600/5 border border-white/5 rounded-2xl relative overflow-hidden group">
              <h4 className="text-[9px] font-black tracking-[0.2em] text-blue-500 mb-1.5 uppercase leading-none">Elevate Access</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-4 font-medium">Unlock the 30-unit path and unlimited audits.</p>
              <button onClick={upgradeToPro} className="w-full py-2.5 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Go Pro</button>
            </div>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto w-full relative bg-[#020617] ${currentView === 'onboarding' ? 'max-w-none' : ''}`}>
        <div className={`${currentView === 'onboarding' ? '' : 'max-w-5xl mx-auto'} min-h-screen`}>
          {renderView()}
        </div>
      </main>

      {/* Mobile Bottom Navigation (MVP Requirement) */}
      {currentView !== 'onboarding' && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/5 flex justify-around items-center py-2 px-1 z-50">
          <MobileNavItem active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} icon={<Home size={18} />} label="Home" />
          <MobileNavItem active={currentView === 'learning'} onClick={() => setCurrentView('learning')} icon={<BookOpen size={18} />} label="Learn" />
          <MobileNavItem active={currentView === 'analyzer'} onClick={() => setCurrentView('analyzer')} icon={<SearchCode size={18} />} label="Analyze" />
          <MobileNavItem active={currentView === 'templates'} onClick={() => setCurrentView('templates')} icon={<Library size={18} />} label="Vault" />
          <MobileNavItem active={currentView === 'settings'} onClick={() => setCurrentView('settings')} icon={<Settings size={18} />} label="Account" />
        </div>
      )}
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
      ${active 
        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'}
    `}
  >
    <div className={`transition-all ${active ? 'scale-105' : 'group-hover:scale-105'}`}>{icon}</div>
    <span className="font-bold text-[13px] tracking-tight">{label}</span>
  </button>
);

const MobileNavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-0.5 transition-all duration-200 ${active ? 'text-blue-500' : 'text-slate-500'} py-1 min-w-[60px]`}>
    <div className={`transition-transform duration-200 ${active ? 'scale-110' : ''}`}>{icon}</div>
    <span className="text-[8px] font-black uppercase tracking-[0.1em]">{label}</span>
  </button>
);

export default App;
