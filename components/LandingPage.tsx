
import React, { useState } from 'react';
import { Zap, ShieldCheck, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { analyzeUserPrompt } from '../services/geminiService';
import { AnalysisResult } from '../types';

interface Props {
  onComplete: () => void;
}

const LandingPage: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleInitialAnalyze = async () => {
    if (!prompt.trim()) return;
    setIsAnalyzing(true);
    try {
      const data = await analyzeUserPrompt(prompt);
      setResult(data);
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("System recalibrating. Try a different prompt.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-8 fade-in">
        <div className="flex items-center gap-3 text-blue-500 mb-2">
          <Zap size={32} className="fill-current" />
          <span className="font-black text-2xl tracking-tighter uppercase italic">Prompt Intel</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight uppercase italic">
          Stop Guessing.<br/><span className="text-blue-500">Start Executing.</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-xl max-w-lg mx-auto font-medium">
          Prompt Intelligence turns vague instructions into professional-grade code that actually works.
        </p>
        
        <div className="w-full max-w-xl space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Paste your weakest prompt here to see the difference..."
            className="w-full h-32 bg-black border border-white/10 rounded-2xl p-4 text-sm font-mono focus:border-blue-500 outline-none transition-all shadow-inner"
          />
          <button
            onClick={handleInitialAnalyze}
            disabled={isAnalyzing || !prompt.trim()}
            className="w-full py-4 bg-blue-600 text-white font-black rounded-xl text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3"
          >
            {isAnalyzing ? <Loader2 className="animate-spin" size={18} /> : <>Analyze Your First Prompt <ArrowRight size={16} /></>}
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen p-6 md:p-12 space-y-8 fade-in flex flex-col">
        <header className="text-center space-y-2 shrink-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-[10px] font-black uppercase tracking-widest">
            Structural Audit Complete
          </div>
          <h2 className="text-3xl font-black tracking-tighter italic uppercase">The Instant Win</h2>
        </header>

        <div className="glass-panel p-6 rounded-2xl bg-black border-white/5 space-y-6 shrink-0">
          <div className="flex items-baseline justify-between">
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Logic Score</span>
            <span className="text-4xl font-black text-white">{result?.overallScore}<span className="text-slate-600 text-sm">/100</span></span>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
              "Your prompt was missing critical role-definitions and task-constraints. We've refactored the structural logic for execution."
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-purple-500/20 bg-purple-500/[0.02] space-y-4 flex-1 flex flex-col min-h-0">
           <h3 className="text-purple-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 shrink-0">
             <Sparkles size={16} /> Rewritten Master Prompt
           </h3>
           <div className="bg-black p-4 rounded-xl border border-white/5 overflow-y-auto flex-1 scrollbar-thin">
             <pre className="text-[10px] md:text-xs font-mono text-slate-400 whitespace-pre-wrap leading-relaxed md:leading-7">
               {result?.optimizedPrompt}
             </pre>
           </div>
        </div>

        <div className="space-y-4 shrink-0">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-black tracking-tight">Want unlimited analysis and full lessons?</h3>
            <p className="text-slate-500 text-xs font-medium">Join 5,000+ engineers building production AI apps.</p>
          </div>
          <button
            onClick={() => setStep(3)}
            className="w-full py-4 bg-white text-black font-black rounded-xl text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-3"
          >
            Create Free Account <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-8 fade-in">
      <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] w-full max-w-md bg-black border-white/5 space-y-8 text-center shadow-3xl">
        <div className="space-y-3">
          <h2 className="text-3xl font-black tracking-tighter italic uppercase leading-none">Initialize<br/>Access</h2>
          <p className="text-slate-500 text-sm font-medium">Step into the professional execution layer.</p>
        </div>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onComplete(); }}>
          <div className="space-y-1.5 text-left">
            <label className="text-[9px] font-black uppercase text-slate-500 ml-4 tracking-widest">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="architect@system.io" 
              className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
            />
          </div>
          <div className="space-y-1.5 text-left">
            <label className="text-[9px] font-black uppercase text-slate-500 ml-4 tracking-widest">Secure Key</label>
            <input 
              required
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white font-black rounded-xl text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-blue-500 transition-all mt-4"
          >
            Claim Blueprint & Enter
          </button>
        </form>
        
        <p className="text-[9px] text-slate-600 font-medium">By initializing, you agree to our System Terms and Logic Protocol.</p>
      </div>
    </div>
  );
};

export default LandingPage;
