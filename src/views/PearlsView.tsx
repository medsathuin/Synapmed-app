import React, { useState } from 'react';
import { FileText, Sparkles, Search, Bookmark, Copy, Check } from 'lucide-react';
import { Pearl } from '../types';
import { MOCK_PEARLS } from '../data/mockPearls';
import { useSync } from '../context/SyncContext';

export const PearlsView: React.FC = () => {
  const { isBookmarked, toggleBookmark } = useSync();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPearls = MOCK_PEARLS.filter(p => {
    if (selectedSubject !== 'all' && p.subject !== selectedSubject) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.subject.toLowerCase().includes(q) ||
        p.keyPoints.some(pt => pt.toLowerCase().includes(q)) ||
        p.buzzwords.some(b => b.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleCopy = (pearl: Pearl) => {
    navigator.clipboard.writeText(`${pearl.title}\n\n` + pearl.keyPoints.join('\n'));
    setCopiedId(pearl.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border border-purple-500/30 rounded-2xl p-6 shadow-2xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Sparkles size={14} />
            Ultra-Concise High-Yield Text Notes
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Clinical Pearls & Memory Booster Mnemonics
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Numbered, bite-sized high-yield cards distilling the most volatile facts, contraindications, and exam-tested tables across all 19 medical subjects.
          </p>
        </div>

        {/* Search */}
        <div className="mt-5 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pearls, mnemonics, syndromes, drugs..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Pearls Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPearls.map(pearl => {
          const bookmarked = isBookmarked(pearl.id);
          return (
            <div
              key={pearl.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition shadow-xl space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Pearl #{pearl.pearlNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-300">
                      {pearl.subject} • {pearl.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(pearl)}
                      className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="Copy Pearl Notes"
                    >
                      {copiedId === pearl.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                    <button
                      onClick={() => toggleBookmark({
                        itemType: 'pearl',
                        itemId: pearl.id,
                        title: pearl.title,
                        subject: pearl.subject,
                        tag: 'Pearl'
                      })}
                      className={`p-1.5 rounded-lg border transition ${bookmarked ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                    >
                      <Bookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {pearl.title}
                </h3>

                {/* Key Points */}
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside leading-relaxed">
                  {pearl.keyPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>

                {/* Mnemonic Box */}
                {pearl.mnemonic && (
                  <div className="bg-purple-950/40 border border-purple-500/30 rounded-xl p-3 text-xs text-purple-200">
                    <strong className="block text-purple-400 font-bold mb-0.5">Mnemonic Aid:</strong>
                    {pearl.mnemonic}
                  </div>
                )}
              </div>

              {/* Buzzwords tag bar */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1 overflow-x-auto">
                  {pearl.buzzwords.map((bw, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 whitespace-nowrap">
                      #{bw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
