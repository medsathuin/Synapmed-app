import React, { useState } from 'react';
import { Image, Sparkles, Search, Bookmark, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { Treasure } from '../types';
import { MOCK_TREASURES } from '../data/mockTreasures';
import { useSync } from '../context/SyncContext';

export const TreasuresView: React.FC = () => {
  const { isBookmarked, toggleBookmark } = useSync();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTreasure, setActiveTreasure] = useState<Treasure | null>(null);

  const filteredTreasures = MOCK_TREASURES.filter(t => {
    if (selectedType !== 'all' && t.imageType !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.buzzword.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Sparkles size={14} />
            Visual Image Atlas • Rapid Recall
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            High-Yield Treasures & Buzzword Atlas
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Essential radiological signs, classic histopathology buzzwords, and diagnostic spotters frequently tested in NEET-PG and INI-CET clinical pattern exams.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800/80 overflow-x-auto text-xs pb-1">
          {['all', 'Radiology', 'Histopathology', 'Clinical Sign'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${selectedType === type ? 'bg-cyan-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}`}
            >
              {type === 'all' ? 'All Visual Treasures' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Treasures */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTreasures.map(treasure => {
          const bookmarked = isBookmarked(treasure.id);
          return (
            <div
              key={treasure.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div
                  onClick={() => setActiveTreasure(treasure)}
                  className="relative h-48 bg-slate-950 overflow-hidden cursor-pointer group"
                >
                  <img
                    src={treasure.imageUrl}
                    alt={treasure.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/90 text-cyan-300 border border-slate-700">
                    {treasure.imageType}
                  </span>

                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-950/90 text-white border border-slate-800">
                    {treasure.buzzword}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2.5">
                  <h3
                    onClick={() => setActiveTreasure(treasure)}
                    className="text-sm font-bold text-white hover:text-cyan-400 transition cursor-pointer"
                  >
                    {treasure.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {treasure.description}
                  </p>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Classic Associations:</span>
                    <ul className="text-xs text-slate-300 list-disc list-inside space-y-0.5">
                      {treasure.classicAssociations.slice(0, 2).map((a, i) => (
                        <li key={i} className="truncate">{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => toggleBookmark({
                    itemType: 'treasure',
                    itemId: treasure.id,
                    title: treasure.title,
                    subject: treasure.subject,
                    tag: treasure.imageType
                  })}
                  className={`p-1.5 rounded-lg border transition ${bookmarked ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                >
                  <Bookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} />
                </button>

                <button
                  onClick={() => setActiveTreasure(treasure)}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition flex items-center gap-1 cursor-pointer"
                >
                  <Eye size={13} />
                  <span>Inspect Card</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Modal view */}
      {activeTreasure && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-cyan-500/20 text-cyan-300">
                {activeTreasure.imageType} • {activeTreasure.subject}
              </span>
              <button
                onClick={() => setActiveTreasure(null)}
                className="text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <h3 className="text-lg font-bold text-white">{activeTreasure.title}</h3>

            <div className="rounded-xl overflow-hidden border border-slate-800 max-h-72">
              <img src={activeTreasure.imageUrl} alt={activeTreasure.title} className="w-full h-auto object-cover" />
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong className="block text-cyan-400 font-bold mb-1">Buzzword Description:</strong>
              {activeTreasure.description}
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-amber-400 uppercase tracking-wider">High-Yield Exam Points:</span>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                {activeTreasure.examPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
