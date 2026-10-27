import React, { useState } from 'react';
import { X, Sliders, CheckSquare, Sparkles, Filter, Play, Check } from 'lucide-react';
import { MEDICAL_SUBJECTS } from '../data/subjects';
import { MOCK_MCQS } from '../data/mockQBank';
import { MCQ, TestSeriesItem } from '../types';
import { useSync } from '../context/SyncContext';

interface CustomModuleBuilderModalProps {
  onClose: () => void;
  onStartCustomTest: (test: TestSeriesItem, isExamMode: boolean) => void;
}

export const CustomModuleBuilderModal: React.FC<CustomModuleBuilderModalProps> = ({
  onClose,
  onStartCustomTest
}) => {
  const { bookmarks, magicModuleItems } = useSync();

  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>(['medicine', 'surgery', 'pathology']);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [questionStatus, setQuestionStatus] = useState<'all' | 'unattempted' | 'incorrect' | 'bookmarked'>('all');
  const [mode, setMode] = useState<'regular' | 'exam'>('regular');
  const [filters, setFilters] = useState<{
    highYieldOnly: boolean;
    clinicalVignettesOnly: boolean;
    imageBasedOnly: boolean;
    pyqsOnly: boolean;
  }>({
    highYieldOnly: true,
    clinicalVignettesOnly: false,
    imageBasedOnly: false,
    pyqsOnly: false
  });

  const toggleSubject = (subId: string) => {
    setSelectedSubjectIds(prev => 
      prev.includes(subId) ? (prev.length > 1 ? prev.filter(id => id !== subId) : prev) : [...prev, subId]
    );
  };

  const selectAllSubjects = () => {
    setSelectedSubjectIds(MEDICAL_SUBJECTS.map(s => s.id));
  };

  const clearSubjects = () => {
    setSelectedSubjectIds(['medicine']);
  };

  const handleBuildAndStart = () => {
    const selectedSubjectsNames = MEDICAL_SUBJECTS
      .filter(s => selectedSubjectIds.includes(s.id))
      .map(s => s.name);

    let eligible = MOCK_MCQS.filter(q => selectedSubjectsNames.includes(q.subject));

    if (filters.highYieldOnly) eligible = eligible.filter(q => q.isHighYield);
    if (filters.clinicalVignettesOnly) eligible = eligible.filter(q => q.isClinicalVignette);
    if (filters.imageBasedOnly) eligible = eligible.filter(q => q.isImageBased);
    if (filters.pyqsOnly) eligible = eligible.filter(q => !!q.examSource);

    if (questionStatus === 'bookmarked') {
      const bookmarkedIds = bookmarks.filter(b => b.itemType === 'question').map(b => b.itemId);
      eligible = eligible.filter(q => bookmarkedIds.includes(q.id));
    } else if (questionStatus === 'incorrect') {
      const wrongIds = magicModuleItems.map(m => m.questionId);
      eligible = eligible.filter(q => wrongIds.includes(q.id));
    }

    // Fallback if filter is too tight
    const finalQuestions = eligible.length >= 3 ? eligible.slice(0, questionCount) : MOCK_MCQS.slice(0, questionCount);

    const customTest: TestSeriesItem = {
      id: 'custom-' + Date.now(),
      title: `Custom Test: ${selectedSubjectsNames.slice(0, 2).join(' + ')}${selectedSubjectsNames.length > 2 ? ` + ${selectedSubjectsNames.length - 2} more` : ''}`,
      category: 'Custom Module',
      questionCount: finalQuestions.length,
      durationMinutes: Math.round(finalQuestions.length * 1.2),
      totalMarks: finalQuestions.length * 4,
      examFormat: 'NEET-PG',
      participantsCount: 1,
      avgScore: 0,
      topScore: finalQuestions.length * 4,
      status: 'Available',
      questions: finalQuestions
    };

    onStartCustomTest(customTest, mode === 'exam');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Sliders size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Custom Module Generator</h3>
              <p className="text-xs text-slate-400">Tailor an adaptive test from any subject, difficulty, or mistake category</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* 1. Subjects Selection */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. Select Subject(s) ({selectedSubjectIds.length} chosen)
              </label>
              <div className="flex items-center gap-2 text-xs">
                <button onClick={selectAllSubjects} className="text-indigo-400 hover:underline">Select All</button>
                <span className="text-slate-600">•</span>
                <button onClick={clearSubjects} className="text-slate-400 hover:underline">Reset</button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {MEDICAL_SUBJECTS.map(sub => {
                const isSelected = selectedSubjectIds.includes(sub.id);
                return (
                  <button
                    key={sub.id}
                    onClick={() => toggleSubject(sub.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition flex items-center justify-between ${isSelected ? 'bg-indigo-950/60 border-indigo-500/60 text-white shadow-sm' : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/50'}`}
                  >
                    <span className="font-semibold truncate mr-1">{sub.shortName} - {sub.name}</span>
                    {isSelected && <Check size={14} className="text-indigo-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Question Count & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                2. Number of Questions
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[5, 10, 20, 30, 50].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => setQuestionCount(cnt)}
                    className={`py-2 rounded-xl border text-xs font-bold transition ${questionCount === cnt ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
                  >
                    {cnt} Qs
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                3. Question Pool Status
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setQuestionStatus('all')}
                  className={`p-2 rounded-xl border font-medium text-left ${questionStatus === 'all' ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300' : 'bg-slate-950/40 border-slate-800 text-slate-400'}`}
                >
                  All Questions
                </button>
                <button
                  onClick={() => setQuestionStatus('unattempted')}
                  className={`p-2 rounded-xl border font-medium text-left ${questionStatus === 'unattempted' ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300' : 'bg-slate-950/40 border-slate-800 text-slate-400'}`}
                >
                  Unattempted Only
                </button>
                <button
                  onClick={() => setQuestionStatus('incorrect')}
                  className={`p-2 rounded-xl border font-medium text-left ${questionStatus === 'incorrect' ? 'bg-rose-950/60 border-rose-500 text-rose-300' : 'bg-slate-950/40 border-slate-800 text-slate-400'}`}
                >
                  Incorrect (Magic Module)
                </button>
                <button
                  onClick={() => setQuestionStatus('bookmarked')}
                  className={`p-2 rounded-xl border font-medium text-left ${questionStatus === 'bookmarked' ? 'bg-amber-950/60 border-amber-500 text-amber-300' : 'bg-slate-950/40 border-slate-800 text-slate-400'}`}
                >
                  Bookmarked Only
                </button>
              </div>
            </div>
          </div>

          {/* 3. Filter Tags */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              4. High-Yield Question Filters
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setFilters(f => ({ ...f, highYieldOnly: !f.highYieldOnly }))}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition ${filters.highYieldOnly ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-950/40 border-slate-800 text-slate-400'}`}
              >
                <span>High-Yield Only</span>
                {filters.highYieldOnly && <Check size={14} />}
              </button>
              <button
                onClick={() => setFilters(f => ({ ...f, clinicalVignettesOnly: !f.clinicalVignettesOnly }))}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition ${filters.clinicalVignettesOnly ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-950/40 border-slate-800 text-slate-400'}`}
              >
                <span>Clinical Vignettes</span>
                {filters.clinicalVignettesOnly && <Check size={14} />}
              </button>
              <button
                onClick={() => setFilters(f => ({ ...f, imageBasedOnly: !f.imageBasedOnly }))}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition ${filters.imageBasedOnly ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-950/40 border-slate-800 text-slate-400'}`}
              >
                <span>Image-Based MCQs</span>
                {filters.imageBasedOnly && <Check size={14} />}
              </button>
              <button
                onClick={() => setFilters(f => ({ ...f, pyqsOnly: !f.pyqsOnly }))}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition ${filters.pyqsOnly ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-950/40 border-slate-800 text-slate-400'}`}
              >
                <span>PYQs (NEET/INI/FMGE)</span>
                {filters.pyqsOnly && <Check size={14} />}
              </button>
            </div>
          </div>

          {/* 4. Mode Selection (Exam vs Regular) */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              5. Test Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setMode('regular')}
                className={`p-3.5 rounded-xl border cursor-pointer transition ${mode === 'regular' ? 'bg-indigo-950/50 border-indigo-500 text-white' : 'bg-slate-950/40 border-slate-800 text-slate-400'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300">Regular / Study Mode</span>
                  {mode === 'regular' && <Check size={16} className="text-indigo-400" />}
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Immediate answer reveals, comprehensive clinical explanations, and discussion threads after every question.
                </p>
              </div>

              <div
                onClick={() => setMode('exam')}
                className={`p-3.5 rounded-xl border cursor-pointer transition ${mode === 'exam' ? 'bg-indigo-950/50 border-indigo-500 text-white' : 'bg-slate-950/40 border-slate-800 text-slate-400'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Exam Mode (Real Simulation)</span>
                  {mode === 'exam' && <Check size={16} className="text-emerald-400" />}
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Strict countdown timer, no answers revealed during test, detailed scorecard & percentile at the end.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Selected: <span className="text-white font-semibold">{questionCount} Questions</span> ({mode === 'exam' ? 'Exam Mode' : 'Regular Study Mode'})
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-800 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleBuildAndStart}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              <Play size={14} />
              Start Custom Module
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
