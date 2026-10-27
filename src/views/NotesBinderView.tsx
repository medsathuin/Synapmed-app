import React, { useState } from 'react';
import { Bookmark, FileText, Trash2, Search, Video, HelpCircle, ExternalLink } from 'lucide-react';
import { useSync } from '../context/SyncContext';

interface NotesBinderViewProps {
  onNavigateToItem: (itemType: string, itemId: string) => void;
}

export const NotesBinderView: React.FC<NotesBinderViewProps> = ({ onNavigateToItem }) => {
  const { notes, bookmarks, deleteNote, toggleBookmark } = useSync();
  const [activeTab, setActiveTab] = useState<'notes' | 'bookmarks'>('notes');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(n => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        n.content.toLowerCase().includes(q) ||
        n.targetTitle.toLowerCase().includes(q) ||
        n.subject.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredBookmarks = bookmarks.filter(b => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.subject.toLowerCase().includes(q) ||
        b.itemType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white">
              Personal Study Binder & Cross-Device Cloud Sync
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              All your custom notes written under questions and lectures, plus your bookmarked high-yield pearls, treasures, and MCQs.
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition ${activeTab === 'notes' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              My Notes ({notes.length})
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition ${activeTab === 'bookmarks' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Bookmarks ({bookmarks.length})
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in your notes or bookmarks..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Tab 1: Notes List */}
      {activeTab === 'notes' && (
        <div className="space-y-3">
          {filteredNotes.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-400">
              No notes found. You can add personal notes while watching video lectures or answering QBank questions.
            </div>
          ) : (
            filteredNotes.map(note => (
              <div
                key={note.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {note.subject}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">
                      {note.targetType === 'video' ? 'Video Lecture' : 'Question Note'}
                    </span>
                    {note.videoTimestampSec !== undefined && (
                      <span className="text-[11px] font-mono text-indigo-400">
                        @{Math.floor(note.videoTimestampSec / 60)}:{(note.videoTimestampSec % 60) < 10 ? '0' : ''}{note.videoTimestampSec % 60}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                    title="Delete Note"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-white">
                  Target: {note.targetTitle}
                </h4>

                <p className="text-xs text-slate-200 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed whitespace-pre-line">
                  {note.content}
                </p>

                <div className="text-[11px] text-slate-500">
                  Last updated: {new Date(note.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Bookmarks List */}
      {activeTab === 'bookmarks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBookmarks.length === 0 ? (
            <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-400">
              No bookmarks saved yet. Click the bookmark icon on any MCQ, pearl, video, or treasure to save here.
            </div>
          ) : (
            filteredBookmarks.map(bm => (
              <div
                key={bm.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-between hover:border-slate-700 transition"
              >
                <div className="space-y-1 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                      {bm.itemType.toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{bm.subject}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{bm.title}</h4>
                  <div className="text-[10px] text-slate-500">Saved: {new Date(bm.savedAt).toLocaleDateString()}</div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleBookmark(bm)}
                    className="p-1.5 rounded-lg border border-slate-800 text-amber-400 hover:bg-slate-800"
                    title="Remove Bookmark"
                  >
                    <Bookmark size={15} fill="currentColor" />
                  </button>
                  <button
                    onClick={() => onNavigateToItem(bm.itemType, bm.itemId)}
                    className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition"
                    title="Open Resource"
                  >
                    <ExternalLink size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
