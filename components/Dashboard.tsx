
import React from 'react';
import { UserState, View, UserTier } from '../types';
import { MODULES, ANALYZER_FREE_LIMIT } from '../constants';
import { Trophy, ArrowRight, Zap, Play, Target, Gauge, Sparkles } from 'lucide-react';

interface Props {
  userState: UserState;
  onNavigate: (view: View) => void;
  onUpgrade: () => void;
}

const Dashboard: React.FC<Props> = ({ userState, onNavigate, onUpgrade }) => {
  const totalLessons = MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = userState.completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const avgScore = userState.analyzerUses > 0 ? 84 : 0; 

  return (
    <div className="p-4 md:p-12 space-y-6 md:space-y-10 fade-in pb-24 md:pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1.5 md:mb-3">
             <div className="w-6 md:w-8 h-[1px] bg-blue-500/40" />
             <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">Operational Metrics</span>
          </div>
          <h1 className="text-2xl md:text-5xl font-black tracking-tighter mb-1 md:mb-2 leading-none uppercase italic">Portal</h1>
          <p className="text-slate-500 font-medium text-xs md:text-lg">Structural prompt performance monitoring.</p>
        </div>
      </header>

      {/* KPI Card */}
      <div className="glass-panel p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-black shadow-xl border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:border-blue-500/20">
        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
           <div className="relative w-14 h-14 md:w-20 md:h-20 shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" md:cx="40" md:cy="40" md:r="36" md:strokeWidth="5" />
                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={`${2 * Math.PI * 24}`} strokeDashoffset={`${2 * Math.PI * 24 * (1 - avgScore / 100)}`} className="text-blue-500" strokeLinecap="round" md:cx="40" md:cy="40" md:r="36" md:strokeWidth="5" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-base md:text-xl font-black text-white tabular-nums">{avgScore}%</span>
              </div>
           </div>
           <div>
             <h3 className="text-base md:text-xl font-black text-white tracking-tight leading-none mb-1">Quality Score</h3>
             <p className="text-slate-500 text-[10px] md:text-sm font-medium">Average across recent audits.</p>
           </div>
        </div>
        <button 
          onClick={() => onNavigate('analyzer')}
          className="w-full md:w-auto px-6 py-3 bg-white text-black font-black rounded-xl text-[9px] md:text-[11px] uppercase tracking-[0.2em] shadow-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles size={14} /> Analyze Prompt
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="glass-panel p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] flex flex-col justify-between shadow-xl transition-all">
          <div>
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h3 className="text-lg md:text-2xl font-black flex items-center gap-3">
                <div className="p-2 md:p-3 bg-blue-500/10 rounded-xl md:rounded-2xl border border-blue-500/20">
                  <Gauge className="text-blue-500" size={18} md:size={24} />
                </div>
                Mastery
              </h3>
              <span className="text-slate-400 font-black text-[9px] md:text-xs bg-black/40 px-2.5 py-1 rounded-lg border border-white/5 tracking-widest">{completedCount}/{totalLessons}</span>
            </div>
            <div className="w-full bg-slate-900/50 rounded-full h-2 mb-4 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[10px] md:text-sm text-slate-500 font-semibold tracking-wide flex items-center gap-2">
              <Target size={12} className="text-blue-400" />
              <span className="text-blue-400 font-black uppercase">Architect Apprentice</span>
            </p>
          </div>
          <button 
            onClick={() => onNavigate('learning')}
            className="mt-6 md:mt-10 flex items-center gap-2 text-white font-black text-[9px] md:text-xs uppercase tracking-[0.2em] hover:gap-3 transition-all group"
          >
            Deploy Lessons <ArrowRight size={14} md:size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="glass-panel p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] flex flex-col justify-between shadow-xl bg-black">
          <div>
            <h3 className="text-lg md:text-2xl font-black mb-4 md:mb-6 tracking-tight">Audit Quota</h3>
            <div className="text-4xl md:text-7xl font-black mb-1 text-white tabular-nums">
              {userState.tier === UserTier.PRO ? '∞' : `${ANALYZER_FREE_LIMIT - userState.analyzerUses}`}
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 opacity-60">Daily credits remaining</p>
          </div>
          <button 
            onClick={() => onNavigate('analyzer')}
            className="mt-6 md:mt-10 py-3 w-full bg-slate-900 hover:bg-slate-800 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-white/10"
          >
            Launch Auditor
          </button>
        </div>
      </div>

      <section>
        <div className="flex justify-between items-center mb-4 md:mb-8">
           <h2 className="text-lg md:text-2xl font-black flex items-center gap-2 md:gap-4 text-slate-200 uppercase tracking-tighter">
             <div className="p-1.5 md:p-2 bg-blue-600/20 rounded-lg">
                <Play size={14} md:size={20} className="text-blue-500 fill-current" />
             </div>
             Queue
           </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          {MODULES.flatMap(m => m.lessons)
            .filter(l => !userState.completedLessons.includes(l.id))
            .slice(0, 2)
            .map(lesson => (
              <div key={lesson.id} className="glass-panel p-5 md:p-8 rounded-2xl md:rounded-[2rem] hover:bg-white/[0.04] transition-all cursor-pointer group border-white/5 shadow-lg" onClick={() => onNavigate('learning')}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase text-blue-500 mb-1.5 md:mb-2 block">
                      {lesson.moduleId.toUpperCase()}
                    </span>
                    <h4 className="font-black text-base md:text-2xl mb-1.5 md:mb-2 group-hover:text-blue-400 transition-colors tracking-tight">{lesson.title}</h4>
                    <p className="text-slate-500 line-clamp-2 text-[11px] md:text-base font-medium leading-relaxed">{lesson.description}</p>
                  </div>
                  {lesson.tier === UserTier.PRO && (
                    <span className="bg-purple-500/10 text-purple-400 text-[8px] px-2 py-1 rounded-lg font-black uppercase border border-purple-500/20 ml-3 tracking-widest">Pro</span>
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>

      {userState.tier === UserTier.FREE && (
        <div className="relative overflow-hidden bg-gradient-to-br from-black to-slate-900 rounded-2xl md:rounded-[3rem] p-8 md:p-12 border border-blue-500/10 shadow-xl group transition-all">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 md:gap-4 text-blue-500 mb-4 md:mb-6">
              <Zap size={24} md:size={32} className="fill-current drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="font-black tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[11px] uppercase">Elite Program</span>
            </div>
            <h2 className="text-xl md:text-4xl font-black mb-4 md:mb-6 leading-tight tracking-tighter">Unlock Unlimited Capacity.</h2>
            <p className="text-slate-400 font-medium mb-6 md:mb-10 leading-relaxed text-sm md:text-xl max-w-lg">Access 30 units, Template Vault, and unlimited Structural Audits.</p>
            <button 
              onClick={onUpgrade}
              className="w-full md:w-auto px-8 py-3.5 bg-blue-600 text-white font-black rounded-xl md:rounded-2xl shadow-xl hover:bg-blue-500 transition-all text-[9px] md:text-xs uppercase tracking-[0.3em]"
            >
              Get PRO Access — $19/mo
            </button>
          </div>
          <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-600/5 rounded-full blur-[80px] md:blur-[120px] -mr-[100px] -mt-[100px] md:-mr-[200px] md:-mt-[200px] pointer-events-none group-hover:bg-blue-600/10 transition-all duration-700"></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
