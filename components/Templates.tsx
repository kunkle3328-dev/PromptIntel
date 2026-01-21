
import React from 'react';
import { TEMPLATES } from '../constants';
import { UserState, UserTier } from '../types';
import { Copy, Lock, Layout, Search, Sparkles } from 'lucide-react';

interface Props {
  userState: UserState;
  onUpgrade: () => void;
}

const Templates: React.FC<Props> = ({ userState, onUpgrade }) => {
  const isPro = userState.tier !== UserTier.FREE;

  return (
    <div className="p-4 md:p-12 space-y-8 md:space-y-12 fade-in pb-32">
      <header>
        <div className="flex items-center gap-3 text-blue-500 mb-2 md:mb-3">
           <div className="w-8 md:w-10 h-[1px] bg-blue-500/40" />
           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">Asset Repository</span>
        </div>
        <h1 className="text-3xl md:text-6xl font-black tracking-tighter mb-2 md:mb-4 uppercase italic leading-none">Template Vault</h1>
        <p className="text-slate-500 font-medium text-sm md:text-lg">Battle-tested structural blue-prints for enterprise AI deployment.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {TEMPLATES.map(template => {
          const locked = template.tier !== UserTier.FREE && !isPro;
          return (
            <div key={template.id} className="glass-panel p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-between group relative overflow-hidden transition-all hover:bg-white/[0.02] border-white/5 shadow-2xl">
              {locked && (
                <div className="absolute inset-0 bg-[#000000]/85 backdrop-blur-[4px] z-10 flex flex-col items-center justify-center p-6 md:p-10 text-center animate-in fade-in">
                  <div className="p-4 md:p-5 bg-purple-600/10 rounded-full border border-purple-500/20 mb-4 md:mb-6 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                    <Lock className="text-purple-400" size={24} md:size={36} />
                  </div>
                  <h4 className="text-xl md:text-2xl font-black mb-2 md:mb-3 tracking-tight">PRO Vector Required</h4>
                  <p className="text-xs md:text-sm text-slate-500 mb-6 md:mb-8 max-w-[200px] leading-relaxed font-medium">Unlock the full enterprise repository for your workflow.</p>
                  <button onClick={onUpgrade} className="bg-white text-black px-8 py-3 md:px-10 md:py-4 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all shadow-xl active:scale-95">Elevate Account</button>
                </div>
              )}
              
              <div>
                <div className="flex justify-between items-start mb-6 md:mb-8">
                   <div className="bg-blue-600/10 p-3 md:p-4 rounded-xl md:rounded-2xl text-blue-500 border border-blue-600/20 shadow-lg">
                     {template.category === 'App Builder' ? <Layout size={20} md:size={24} /> : <Search size={20} md:size={24} />}
                   </div>
                   <div className="flex flex-col items-end gap-1.5 md:gap-2">
                     <span className="text-[8px] md:text-[9px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-slate-500 opacity-60">{template.category}</span>
                     {template.tier === UserTier.PRO && <span className="bg-purple-600/10 text-purple-400 text-[8px] px-2 py-0.5 rounded-lg border border-purple-500/20 font-black tracking-widest uppercase leading-none">Elite</span>}
                   </div>
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-2 md:mb-4 tracking-tight group-hover:text-blue-400 transition-colors leading-tight">{template.title}</h3>
                <p className="text-sm md:text-base text-slate-500 mb-8 md:mb-10 leading-relaxed font-medium">{template.description}</p>
              </div>

              <div className="space-y-4">
                <button 
                  disabled={locked}
                  onClick={() => { navigator.clipboard.writeText(template.content); alert("Template Blueprint Copied!"); }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 rounded-xl md:rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all active:scale-[0.98] shadow-lg group"
                >
                  <Sparkles size={16} className="text-blue-500 group-hover:scale-110 transition-transform" /> Sync Blueprint
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-panel p-8 rounded-[2rem] bg-black border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
          <div className="p-3 bg-white/5 rounded-full">
            <Layout size={24} className="text-slate-600" />
          </div>
          <div>
            <h4 className="font-black text-slate-500 uppercase tracking-widest text-[10px]">Repository Expansion</h4>
            <p className="text-slate-600 text-[10px] font-medium max-w-xs mx-auto">New architectural frameworks arriving weekly for Pro members.</p>
          </div>
      </div>
    </div>
  );
};

export default Templates;
