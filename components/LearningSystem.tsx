
import React, { useState } from 'react';
import { UserState, Lesson, UserTier } from '../types';
import { MODULES } from '../constants';
import { ChevronRight, Lock, CheckCircle, ArrowLeft, Info, AlertCircle, Sparkles } from 'lucide-react';

interface Props {
  userState: UserState;
  onComplete: (id: string) => void;
}

const LearningSystem: React.FC<Props> = ({ userState, onComplete }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  if (selectedLesson) {
    const isLocked = selectedLesson.tier === UserTier.PRO && userState.tier === UserTier.FREE;

    return (
      <div className="p-4 md:p-12 max-w-5xl mx-auto space-y-6 md:space-y-12 fade-in pb-24 md:pb-12">
        <button 
          onClick={() => setSelectedLesson(null)}
          className="flex items-center gap-2 text-slate-500 font-black text-[9px] uppercase tracking-widest hover:text-white transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Path
        </button>

        <header>
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <span className="text-[8px] md:text-[9px] font-black tracking-[0.3em] text-blue-500 uppercase">{selectedLesson.moduleId.replace('-', ' ')}</span>
            {selectedLesson.tier === UserTier.PRO && (
              <span className="bg-purple-500/10 text-purple-400 text-[8px] px-1.5 py-0.5 rounded border border-purple-500/20 font-black tracking-widest">PRO</span>
            )}
          </div>
          <h1 className="text-2xl md:text-5xl font-black tracking-tighter leading-tight">{selectedLesson.title}</h1>
          <p className="text-slate-500 text-sm md:text-xl font-medium mt-2 md:mt-4">{selectedLesson.description}</p>
        </header>

        {isLocked ? (
          <div className="glass-panel p-8 md:p-20 rounded-2xl md:rounded-[3rem] text-center space-y-6 bg-black/60 shadow-xl border-purple-500/10">
            <div className="w-16 md:w-24 h-16 md:h-24 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
              <Lock className="text-purple-400" size={24} md:size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg md:text-3xl font-black tracking-tight">Locked Unit</h2>
              <p className="text-slate-400 text-xs md:text-lg max-w-md mx-auto leading-relaxed">
                Advanced architectural units require PRO membership.
              </p>
            </div>
            <button className="w-full md:w-auto bg-white text-black px-8 py-3.5 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all shadow-lg active:scale-95">
              Unlock All
            </button>
          </div>
        ) : (
          <div className="space-y-10 md:space-y-16">
            <section className="prose prose-invert max-w-none">
              <div className="bg-white/[0.02] p-5 md:p-10 rounded-xl md:rounded-[2.5rem] border border-white/5 leading-relaxed text-slate-300 text-xs md:text-lg shadow-inner">
                {selectedLesson.content}
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="bg-red-500/[0.02] border border-red-500/10 rounded-xl md:rounded-[2.5rem] p-5 md:p-10 shadow-md">
                <h4 className="flex items-center gap-1.5 text-red-400 font-black uppercase text-[9px] md:text-[10px] tracking-widest mb-3 md:mb-6">
                  <AlertCircle size={14} md:size={16} /> Negative
                </h4>
                <div className="bg-black p-4 rounded-lg font-mono text-[10px] md:text-sm mb-3 md:mb-6 border border-white/5 text-slate-400 shadow-inner">
                  "{selectedLesson.examples.bad}"
                </div>
                <p className="text-[9px] md:text-[10px] text-slate-500 font-medium italic">High ambiguity synthesis.</p>
              </div>

              <div className="bg-green-500/[0.02] border border-green-500/10 rounded-xl md:rounded-[2.5rem] p-5 md:p-10 shadow-md">
                <h4 className="flex items-center gap-1.5 text-green-400 font-black uppercase text-[9px] md:text-[10px] tracking-widest mb-3 md:mb-6">
                  <Sparkles size={14} md:size={16} /> Professional
                </h4>
                <div className="bg-black p-4 rounded-lg font-mono text-[10px] md:text-sm mb-3 md:mb-6 border border-white/5 text-slate-300 shadow-inner">
                  "{selectedLesson.examples.good}"
                </div>
                <p className="text-[9px] md:text-[10px] text-slate-500 font-medium italic">Expert alignment.</p>
              </div>
            </section>

            <div className="glass-panel p-5 md:p-10 rounded-xl md:rounded-[2.5rem] bg-blue-500/[0.01] border-blue-500/10">
              <h4 className="flex items-center gap-1.5 text-blue-400 font-black uppercase text-[9px] md:text-[10px] tracking-widest mb-2.5 md:mb-4">
                <Info size={14} md:size={16} /> Logic
              </h4>
              <p className="text-slate-400 text-xs md:text-lg leading-relaxed font-medium italic">
                {selectedLesson.examples.reasoning}
              </p>
            </div>

            <button 
              onClick={() => {
                onComplete(selectedLesson.id);
                setSelectedLesson(null);
              }}
              className={`
                w-full py-4 md:py-6 rounded-xl md:rounded-[2rem] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] flex items-center justify-center gap-2 md:gap-4 transition-all
                ${userState.completedLessons.includes(selectedLesson.id) 
                  ? 'bg-slate-900 text-slate-500 border border-white/5' 
                  : 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl active:scale-95'}
              `}
            >
              {userState.completedLessons.includes(selectedLesson.id) ? 'Unit Completed' : 'Finalize Unit'}
              <CheckCircle size={18} md:size={24} />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-12 space-y-6 md:space-y-12 fade-in pb-24 md:pb-12">
      <header>
        <div className="flex items-center gap-2 text-blue-500 mb-1.5 md:mb-3">
           <div className="w-6 md:w-10 h-[1px] bg-blue-500/40" />
           <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">Index</span>
        </div>
        <h1 className="text-2xl md:text-5xl font-black tracking-tighter mb-1.5 md:mb-4 uppercase italic leading-none">Intelligence Path</h1>
        <p className="text-slate-500 font-medium text-xs md:text-lg">Structural linguistics and LLM logic architecture.</p>
      </header>

      <div className="space-y-8 md:space-y-16">
        {MODULES.map((module, idx) => (
          <div key={module.id} className="space-y-4 md:space-y-8">
            <div className="flex items-center gap-3 md:gap-6 group">
              <span className="text-3xl md:text-6xl font-black text-white/5 transition-colors group-hover:text-white/10">0{idx + 1}</span>
              <div>
                <h2 className="text-base md:text-3xl font-black text-white tracking-tight leading-none mb-0.5 md:mb-2">{module.title}</h2>
                <p className="text-slate-500 text-[10px] md:text-base font-medium">{module.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 md:gap-4">
              {module.lessons.map((lesson, lessonIdx) => {
                const isCompleted = userState.completedLessons.includes(lesson.id);
                const isLocked = lesson.tier === UserTier.PRO && userState.tier === UserTier.FREE;

                return (
                  <button 
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`
                      group w-full glass-panel p-3.5 md:p-6 rounded-xl md:rounded-3xl flex items-center justify-between text-left transition-all hover:bg-white/[0.04] shadow-md border-white/5
                      ${isCompleted ? 'border-green-500/20 bg-green-500/[0.01]' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3 md:gap-6">
                      <div className={`
                        w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-2xl flex items-center justify-center border font-black text-xs md:text-lg transition-all
                        ${isCompleted 
                          ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                          : 'bg-black border-white/10 text-slate-600 group-hover:border-blue-500/30 group-hover:text-blue-400'}
                      `}>
                        {isCompleted ? <CheckCircle size={18} md:size={28} /> : <span>{lessonIdx + 1}</span>}
                      </div>
                      <div>
                        <h4 className="text-sm md:text-xl font-black text-slate-200 group-hover:text-white transition-colors tracking-tight">{lesson.title}</h4>
                        <p className="text-[9px] md:text-sm text-slate-500 font-medium">{lesson.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-6">
                      {isLocked && <Lock size={12} md:size={18} className="text-slate-700" />}
                      <div className="p-1 md:p-2 bg-white/5 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ChevronRight size={16} md:size={24} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningSystem;
