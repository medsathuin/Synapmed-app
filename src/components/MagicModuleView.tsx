import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Calendar, 
  Play, 
  Filter, 
  Trash2, 
  Check, 
  Flame,
  Award
} from 'lucide-react';
import { useSync } from '../context/SyncContext';
import { MOCK_MCQS } from '../data/mockQBank';
import { MCQ, TestSeriesItem } from '../types';

interface MagicModuleViewProps {
  onStartRevisionTest: (test: TestSeriesItem) => void;
}

export const MagicModuleView: React.FC<MagicModuleViewProps> = ({ onStartRevisionTest }) => {
  const { magicModuleItems, clearMasteredMistakes, recordQuestionAttempt } = useSync();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [activeBoxFilter, setActiveBoxFilter] = useState<number | 'all'>('all');

  const filteredItems = magicModuleItems.filter(item => {
    if (selectedSubject !== 'all' && item.subject !== selectedSubject) return false;
    if (activeBoxFilter !== 'all' && item.box !== activeBoxFilter) return false;
    return true;
  });

  const uniqueSubjects = Array.from(new Set(magicModuleItems.map(m => m.subject)));
  const masteredCount = magicModuleItems.filter(m => m.isMastered).length;
  const activeMistakesCount = magicModuleItems.filter(m => !m.isMastered).length;

  const handleLaunchRevisionSession = () => {
    const wrongQuestionIds = filteredItems.map(m => m.questionId);
    let matchedMCQs = MOCK_MCQS.filter(q => wrongQuestionIds.includes(q.id));
    if (matchedMCQs.length === 0) {
      matchedMCQs = MOCK_MCQS.slice(0, 5);
    }

    const revisionTest: TestSeriesItem = {
      id: 'magic-rev-' + Date.now(),
      title: `Magic Module: Spaced Repetition Retest (${matchedMCQs.length} Questions)`,
      category: 'Custom Module',
      questionCount: matchedMCQs.length,
      durationMinutes: Math.round(matchedMCQs.length * 1.5),
      totalMarks: matchedMCQs.length * 4,
      examFormat: 'NEET-PG',
      participantsCount: 1,
      avgScore: 0,
      topScore: matchedMCQs.length * 4,
      status: 'Available',
      questions: matchedMCQs
    };

    onStartRevisionTest(revisionTest);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-rose-950/70 via-slate-900 to-indigo-950/70 border border-rose-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Sparkles size={14} />
              Spaced Repetition Error Bank
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Magic Module: Automated Mistake Binder
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Every incorrect answer from Grand Tests, Subject Tests, and QBank is automatically captured here. Re-attempt them through Leitner spaced repetition boxes until you achieve 2 consecutive correct answers to mark them <span className="text-emerald-400 font-bold">Mastered</span>.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleLaunchRevisionSession}
              disabled={filteredItems.length === 0}
              className="px-5 py-3 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Play size={15} />
              Re-Test Filtered Mistakes ({filteredItems.length})
            </button>
          </div>
        </div>

        {/* Stats counter strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400">Active Mistakes:</div>
            <div className="text-xl font-bold text-rose-400 mt-0.5">{activeMistakesCount} Qs</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400">Mastered Questions:</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5">{masteredCount} Qs</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400">Due for Revision Today:</div>
            <div className="text-xl font-bold text-amber-400 mt-0.5">
              {magicModuleItems.filter(m => m.box === 1).length} Qs
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-slate-400">Cleanup:</div>
              <button
                onClick={clearMasteredMistakes}
                className="text-xs text-slate-300 hover:text-white font-semibold underline mt-1"
              >
                Clear Mastered
              </button>
            </div>
            <CheckCircle2 size={20} className="text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Spaced Repetition Box Filter Tabs (Box 1 to 5) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveBoxFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${activeBoxFilter === 'all' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
        >
          All Boxes ({magicModuleItems.length})
        </button>
        {[
          { box: 1, name: 'Box 1: Daily (1d)', color: 'text-rose-400' },
          { box: 2, name: 'Box 2: 3 Days', color: 'text-amber-400' },
          { box: 3, name: 'Box 3: 7 Days', color: 'text-yellow-400' },
          { box: 4, name: 'Box 4: 21 Days', color: 'text-blue-400' },
          { box: 5, name: 'Box 5: 60 Days', color: 'text-emerald-400' }
        ].map(b => (
          <button
            key={b.box}
            onClick={() => setActiveBoxFilter(b.box)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 whitespace-nowrap ${activeBoxFilter === b.box ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
          >
            <span>{b.name}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-950 text-[10px] text-slate-300">
              {magicModuleItems.filter(m => m.box === b.box).length}
            </span>
          </button>
        ))}
      </div>

      {/* Subject Filter pills */}
      {uniqueSubjects.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
          <span className="text-slate-400 font-semibold mr-1">Filter Subject:</span>
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-3 py-1 rounded-lg transition ${selectedSubject === 'all' ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
          >
            All Subjects
          </button>
          {uniqueSubjects.map(sub => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1 rounded-lg transition whitespace-nowrap ${selectedSubject === sub ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Mistake Items Grid */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <CheckCircle2 size={40} className="text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white">No Incorrect Questions Pending!</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Your mistake queue is clear. As you solve Grand Tests and QBank questions, any wrong answers will automatically stream here.
            </p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div
              key={item.questionId}
              className={`p-4 rounded-2xl border transition shadow-lg ${item.isMastered ? 'bg-slate-900/40 border-emerald-500/30' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.subject}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    {item.topic}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${item.box === 1 ? 'bg-rose-500/20 text-rose-300' : item.box === 2 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    Box {item.box} (Leitner)
                  </span>
                  {item.isMastered && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <Award size={12} />
                      Mastered (2x Correct)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>Wrong: <strong className="text-rose-400">{item.timesWrong} times</strong></span>
                  <span>Streak: <strong className="text-emerald-400">{item.correctStreak} / 2</strong></span>
                  {item.reasonForMistake && (
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                      Reason: {item.reasonForMistake}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {item.stem}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={13} />
                  <span>Next review: <strong className="text-indigo-400">{item.nextReviewDate}</strong></span>
                </div>

                <button
                  onClick={() => {
                    // Quick retest of this specific question
                    const match = MOCK_MCQS.find(q => q.id === item.questionId) || MOCK_MCQS[0];
                    onStartRevisionTest({
                      id: 'single-rev-' + item.questionId,
                      title: `Review Question: ${item.subject}`,
                      category: 'Custom Module',
                      questionCount: 1,
                      durationMinutes: 3,
                      totalMarks: 4,
                      examFormat: 'NEET-PG',
                      participantsCount: 1,
                      avgScore: 0,
                      topScore: 4,
                      status: 'Available',
                      questions: [match]
                    });
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw size={13} />
                  Re-Solve Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
