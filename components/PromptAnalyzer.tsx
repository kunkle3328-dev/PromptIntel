
import React, { useState } from 'react';
import { UserState, AnalysisResult, UserTier } from '../types';
import { ANALYZER_FREE_LIMIT } from '../constants';
import { analyzeUserPrompt } from '../services/geminiService';
import { Sparkles, AlertTriangle, CheckCircle, Loader2, Copy, Trash2, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  userState: UserState;
  onAnalyze: () => void;
  onUpgrade: () => void;
}

const PromptAnalyzer: React.FC<Props> = ({ userState, onAnalyze, onUpgrade }) => {
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canUse = userState.tier !== UserTier.FREE || userState.analyzerUses < ANALYZER_FREE_LIMIT;

  const handleAnalyze = async () => {
    if (!prompt.trim() || !canUse) return;

    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await analyzeUserPrompt(prompt);
      setResult(data);
      onAnalyze();
    } catch (err) {
      setError("Audit failure. System recalibrating.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'Professional': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Advanced': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
  };

  return (
    <div className="p-4 md:p-12 space-y-6 md:space-y-12 fade-in pb-24 md:pb-12">
      <header className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-6">
        <div>
          <div className="flex items-center gap-3 md:gap-4 mb-1.5 md:mb-3">
            <div className="p-2 md:p-3 bg-blue-600/10 rounded-xl md:rounded-2xl border border-blue-600/20">
              <ShieldCheck className="text-blue-500" size={24} md:size={32} />
            </div>
            <h1 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Auditor</h1>
          </div>
          <p className="text-slate-400 font-semibold text-xs md:text-lg max-w-lg leading-relaxed">Structural instruction validation.</p>
        </div>
      </header>

      <div className="space-y-4 md:space-y-8">
        <div className="relative group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Paste raw prompt logic for architectural audit..."
            className="w-full h-40 md:h-56 bg-[#000000] border border-white/5 rounded-xl md:rounded-[2.5rem] p-4 md:p-10 text-slate-200 placeholder:text-slate-800 focus:border-blue-500/30 outline-none font-mono text-[11px] md:text-sm transition-all shadow-inner leading-relaxed"
          />
          <div className="absolute top-4 md:top-10 right-4 md:right-10">
             {prompt && (
               <button onClick={() => setPrompt('')} className="p-1.5 md:p-3 bg-white/5 rounded-lg md:rounded-2xl hover:bg-red-500/20 hover:text-red-400 transition-all border border-white/5">
                  <Trash2 size={16} md:size={20} />
               </button>
             )}
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !prompt.trim() || !canUse}
          className={`
            w-full py-4 md:py-6 rounded-xl md:rounded-[2rem] font-black tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] uppercase flex items-center justify-center gap-2 md:gap-4 transition-all
            ${canUse && prompt.trim() 
              ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl active:scale-[0.98]' 
              : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-white/5'}
          `}
        >
          {isAnalyzing ? <><Loader2 className="animate-spin" size={16} md:size={20} /> Auditing...</> : <><Zap size={16} md:size={20} className="fill-current" /> Initialize Audit</>}
        </button>

        {!canUse && (
          <div onClick={onUpgrade} className="glass-panel p-3 md:p-6 rounded-xl md:rounded-3xl border-blue-500/30 bg-blue-500/5 cursor-pointer text-center transition-all hover:bg-blue-500/10">
            <p className="text-blue-300 text-[9px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em]">Daily Limit Reached. Unlock PRO.</p>
          </div>
        )}
      </div>

      {result && (
        <div className="space-y-10 md:space-y-16 fade-in pt-4 md:pt-10">
          <div className="glass-panel p-6 md:p-12 rounded-2xl md:rounded-[3.5rem] relative overflow-hidden bg-[#000000] shadow-xl border-white/[0.03]">
            <div className="absolute top-5 md:top-10 right-5 md:right-12">
               <span className={`px-3 md:px-6 py-1 md:py-2.5 rounded-lg md:rounded-2xl text-[8px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] border ${getGradeColor(result.grade)}`}>
                 {result.grade}
               </span>
            </div>
            
            <div className="mb-8 md:mb-16">
              <span className="text-slate-500 font-black text-[8px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] block mb-1 md:mb-3 opacity-60">Integrity Score</span>
              <div className="flex items-baseline gap-1 md:gap-3">
                <span className="text-5xl md:text-9xl font-black text-white tabular-nums tracking-tighter leading-none">{result.overallScore}</span>
                <span className="text-slate-600 text-xl md:text-4xl font-black">/ 100</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 md:gap-x-16 gap-y-4 md:gap-y-10">
              {(Object.entries(result.scores) as [string, number][]).map(([key, value]) => (
                <div key={key} className="space-y-2 md:space-y-3">
                  <div className="flex justify-between text-[8px] md:text-[10px] font-black uppercase text-slate-500 tracking-[0.1em] md:tracking-[0.2em] mb-0.5 md:mb-1">
                    <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className={value >= 8 ? 'text-blue-400' : 'text-slate-500'}>{value}</span>
                  </div>
                  <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={`h-full rounded-full transition-all duration-[2s] ease-out ${value >= 8 ? 'bg-blue-500' : 'bg-slate-700'}`}
                      style={{ width: `${(value / 15) * 100}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <MetricCard title="Strengths" color="text-green-400" items={result.strengths} icon={<CheckCircle size={16}/>} />
            <MetricCard title="Deficits" color="text-red-400" items={result.weaknesses} icon={<AlertTriangle size={16}/>} />
          </div>

          <div className="glass-panel p-6 md:p-12 rounded-2xl md:rounded-[3.5rem] border-purple-500/10 bg-purple-500/[0.01] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 md:w-80 md:h-80 bg-purple-500/5 blur-[80px] md:blur-[100px] pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-10">
              <div>
                <h3 className="text-xl md:text-3xl font-black text-purple-400 flex items-center gap-3 md:gap-4 tracking-tighter uppercase italic leading-none">
                  <Sparkles size={20} md:size={28} className="fill-current" /> Master Prompt
                </h3>
                <p className="text-slate-400 text-xs md:text-lg font-medium mt-1.5 md:mt-2 leading-tight">Optimized architectural blueprint.</p>
              </div>
              <button 
                onClick={() => { navigator.clipboard.writeText(result.optimizedPrompt); alert("Blueprint Copied!"); }}
                className="w-full md:w-auto bg-white text-black px-6 py-2.5 rounded-xl md:rounded-2xl hover:bg-slate-200 transition-all shadow-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Copy size={14} md:size={16} /> Copy Refactor
              </button>
            </div>
            
            <div className="bg-black p-5 md:p-10 rounded-xl md:rounded-[2.5rem] border border-white/[0.03] shadow-inner relative group">
               <pre className="font-mono text-[10px] md:text-sm text-slate-400 whitespace-pre-wrap leading-relaxed md:leading-8 overflow-y-auto max-h-[500px] scrollbar-thin">
                {result.optimizedPrompt}
              </pre>
            </div>
            
            <div className="mt-6 md:mt-10 p-5 md:p-8 bg-white/[0.03] rounded-xl md:rounded-3xl border border-white/5">
              <p className="text-[11px] md:text-sm text-slate-500 font-medium leading-relaxed italic">
                 <span className="text-purple-400 font-black uppercase not-italic mr-2 md:mr-3 text-[9px] md:text-[11px] tracking-widest leading-none">Commentary:</span>
                 {result.rewriteExplanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MetricCard: React.FC<{title: string, color: string, items: string[], icon: React.ReactNode}> = ({title, color, items, icon}) => (
  <div className="glass-panel p-6 md:p-10 rounded-xl md:rounded-[3rem] bg-slate-950/40 shadow-xl border-white/[0.02] transition-all">
    <h4 className={`flex items-center gap-2 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-4 md:mb-8 ${color}`}>
      {icon} {title}
    </h4>
    <ul className="space-y-3 md:space-y-5">
      {items.map((item, i) => (
        <li key={i} className="text-[11px] md:text-base text-slate-400 font-medium flex items-start gap-3 md:gap-5 leading-relaxed">
          <div className={`w-1 md:w-2 h-1 md:h-2 rounded-full mt-1.5 shrink-0 ${color.replace('text', 'bg')}`} />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default PromptAnalyzer;
