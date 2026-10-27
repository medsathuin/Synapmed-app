import React, { useState } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  Sliders, 
  Image, 
  Filter, 
  Search, 
  Bookmark, 
  Play, 
  CheckCircle2, 
  Clock, 
  FileText,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { MCQ, TestSeriesItem } from '../types';
import { MOCK_MCQS } from '../data/mockQBank';
import { MEDICAL_SUBJECTS } from '../data/subjects';
import { useSync } from '../context/SyncContext';

interface QBankViewProps {
  onStartTest: (test: TestSeriesItem, isExamMode: boolean) => void;
  onOpenCustomModuleBuilder: () => void;
}

export const QBankView: React.FC<QBankViewProps> = ({ onStartTest, onOpenCustomModuleBuilder }) => {
  const { bookmarks, isBookmarked, toggleBookmark, magicModuleItems } = useSync();

  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [activeFilter, setActiveFilter] = useState<'all' | 'high_yield' | 'clinical' | 'image' | 'pyq' | 'bookmarked'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMCQs = MOCK_MCQS.filter(q => {
    if (selectedSubject !== 'all' && q.subject !== selectedSubject) return false;
    if (activeFilter === 'high_yield' && !q.isHighYield) return false;
    if (activeFilter === 'clinical' && !q.isClinicalVignette) return false;
    if (activeFilter === 'image' && !q.isImageBased) return false;
    if (activeFilter === 'pyq' && !q.examSource) return false;
    if (activeFilter === 'bookmarked' && !isBookmarked(q.id)) return false;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        q.stem.toLowerCase().includes(query) ||
        q.subject.toLowerCase().includes(query) ||
        q.chapter.toLowerCase().includes(query) ||
        q.detailedExplanation.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const handleStartPracticeSet = (mcqs: MCQ[]) => {
    const testItem: TestSeriesItem = {
      id: 'practice-qbank-' + Date.now(),
      title: `QBank Practice Session (${mcqs.length} Questions)`,
      category: 'Custom Module',
      questionCount: mcqs.length,
      durationMinutes: Math.round(mcqs.length * 1.5),
      totalMarks: mcqs.length * 4,
      examFormat: 'NEET-PG',
      participantsCount: 1,
      avgScore: 0,
      topScore: mcqs.length * 4,
      status: 'Available',
      questions: mcqs
    };
    onStartTest(testItem, false); // Regular study mode
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-indigo-950/70 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles size={14} />
              18,500+ MCQs • Clinical Vignette Dominance
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Next-Gen Medical PG Question Bank
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Curated by specialists strictly according to current NEET-PG, INI-CET, and FMGE clinical patterns. Features rich case vignettes, image-based slides, PYQ tags, and peer accuracy metrics.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenCustomModuleBuilder}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Sliders size={16} />
              Build Custom Module
            </button>
          </div>
        </div>

        {/* Feature Filters Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`p-2.5 rounded-xl border text-center transition font-semibold ${activeFilter === 'all' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
          >
            All Questions (18.5k)
          </button>

          <button
            onClick={() => setActiveFilter('high_yield')}
            className={`p-2.5 rounded-xl border text-center transition font-semibold ${activeFilter === 'high_yield' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
          >
            High-Yield MCQs
          </button>

          <button
            onClick={() => setActiveFilter('clinical')}
            className={`p-2.5 rounded-xl border text-center transition font-semibold ${activeFilter === 'clinical' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
          >
            Clinical Vignettes
          </button>

          <button
            onClick={() => setActiveFilter('image')}
            className={`p-2.5 rounded-xl border text-center transition font-semibold ${activeFilter === 'image' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
          >
            Image-Based Questions
          </button>

          <button
            onClick={() => setActiveFilter('pyq')}
            className={`p-2.5 rounded-xl border text-center transition font-semibold ${activeFilter === 'pyq' ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
          >
            Previous Year (PYQ)
          </button>
        </div>
      </div>

      {/* Filter Row & Subject Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${selectedSubject === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            All 19 Subjects
          </button>
          {MEDICAL_SUBJECTS.slice(0, 8).map(sub => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${selectedSubject === sub.name ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}`}
            >
              {sub.shortName}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stem, disease, drugs..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={() => handleStartPracticeSet(filteredMCQs)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow"
          >
            <Play size={13} />
            Solve Set ({filteredMCQs.length})
          </button>
        </div>
      </div>

      {/* MCQs List Cards */}
      <div className="space-y-4">
        {filteredMCQs.map((q, idx) => {
          const bookmarked = isBookmarked(q.id);
          return (
            <div
              key={q.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition shadow-xl space-y-3"
            >
              {/* Question Header & Tags */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {q.subject}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    {q.chapter} • {q.topic}
                  </span>
                  {q.isHighYield && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      High-Yield
                    </span>
                  )}
                  {q.examSource && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      PYQ {q.examSource} {q.examYear}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    Peer Accuracy: <strong className="text-emerald-400">{q.peerAccuracy}%</strong>
                  </span>
                  <button
                    onClick={() => toggleBookmark({
                      itemType: 'question',
                      itemId: q.id,
                      title: q.stem.slice(0, 80) + '...',
                      subject: q.subject,
                      tag: 'QBank'
                    })}
                    className={`p-1.5 rounded-lg border transition ${bookmarked ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                  >
                    <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

              {/* Stem */}
              <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed whitespace-pre-line">
                {q.stem}
              </p>

              {/* Clinical Image Preview */}
              {q.imageUrl && (
                <div className="rounded-xl overflow-hidden border border-slate-800 max-w-sm">
                  <img src={q.imageUrl} alt={q.imageCaption || 'Clinical Case'} className="w-full h-44 object-cover" />
                  {q.imageCaption && (
                    <div className="bg-slate-950 px-3 py-1 text-[11px] text-slate-400 italic">
                      {q.imageCaption}
                    </div>
                  )}
                </div>
              )}

              {/* Footer action bar */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 italic">
                  {q.options.length} Options • Single Best Answer
                </span>

                <button
                  onClick={() => handleStartPracticeSet([q])}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <span>Solve Question</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
