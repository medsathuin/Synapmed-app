import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Bookmark, 
  Download, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  FileText, 
  Maximize2, 
  Volume2, 
  ListOrdered, 
  Check, 
  Plus, 
  ShieldCheck, 
  RotateCcw, 
  Share2,
  Box
} from 'lucide-react';
import { VideoLecture } from '../types';
import { useSync } from '../context/SyncContext';
import { Anatomy3DLab } from './Anatomy3DLab';

interface VideoPlayerModalProps {
  video: VideoLecture;
  onClose: () => void;
  onOpen3DLab?: (modelType: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose, onOpen3DLab }) => {
  const { 
    isBookmarked, 
    toggleBookmark, 
    notes, 
    saveNote, 
    downloadedVideoIds, 
    toggleVideoDownload 
  } = useSync();

  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [currentSeconds, setCurrentSeconds] = useState(120);
  const [activeTab, setActiveTab] = useState<'chapters' | 'notes' | 'vignette' | '3d'>('chapters');
  const [noteContent, setNoteContent] = useState('');
  const [isNoteSaved, setIsNoteSaved] = useState(false);
  const [embedded3DActive, setEmbedded3DActive] = useState(false);

  const isDownloaded = downloadedVideoIds.includes(video.id);
  const bookmarked = isBookmarked(video.id);

  // Load existing note for this video
  useEffect(() => {
    const existing = notes.find(n => n.targetId === video.id);
    if (existing) {
      setNoteContent(existing.content);
    }
  }, [video.id, notes]);

  // Video playback timer ticker
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSeconds(prev => {
          if (prev >= video.durationMinutes * 60) return 0;
          return prev + Math.round(playbackSpeed);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, video.durationMinutes]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSaveNote = async () => {
    if (!noteContent.trim()) return;
    await saveNote('video', video.id, video.title, video.subject, noteContent, currentSeconds);
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  const speedOptions = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-6xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {video.subject}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 uppercase">
              {video.type.replace('_', ' ')}
            </span>
            {video.recentGuidelineUpdate && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck size={12} />
                {video.recentGuidelineUpdate}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Download for offline toggle */}
            <button
              onClick={() => toggleVideoDownload(video.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${isDownloaded ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
              title="Download for offline access"
            >
              {isDownloaded ? <CheckCircle size={14} /> : <Download size={14} />}
              <span>{isDownloaded ? 'Offline Saved' : 'Download Video'}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => toggleBookmark({
                itemType: 'video',
                itemId: video.id,
                title: video.title,
                subject: video.subject,
                tag: video.type
              })}
              className={`p-1.5 rounded-lg border transition ${bookmarked ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'border-slate-800 text-slate-400 hover:bg-slate-800'}`}
              title="Bookmark video"
            >
              <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Video Player + Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Main Video Screen */}
          <div className="lg:col-span-8 bg-black flex flex-col justify-between relative group">
            {embedded3DActive && video.has3DModel ? (
              <div className="h-[420px] p-2 bg-slate-950 overflow-y-auto">
                <Anatomy3DLab initialModel={video.modelType || 'circle_of_willis'} />
              </div>
            ) : (
              <div className="relative h-[320px] sm:h-[420px] bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-60 filter contrast-125"
                />

                {/* Video Overlay Canvas Graphics */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-between p-6">
                  {/* Watermark / Faculty Banner */}
                  <div className="flex items-center justify-between">
                    <div className="bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full text-xs text-slate-200 border border-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      <span>{video.faculty}</span>
                    </div>

                    {video.has3DModel && (
                      <button
                        onClick={() => setEmbedded3DActive(!embedded3DActive)}
                        className="bg-indigo-600/90 hover:bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/40 transition"
                      >
                        <Box size={14} />
                        Launch 3D Anatomy Model
                      </button>
                    )}
                  </div>

                  {/* Play Center Indicator */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="self-center p-4 rounded-full bg-indigo-600/90 text-white shadow-2xl hover:scale-110 hover:bg-indigo-500 transition cursor-pointer"
                  >
                    {isPlaying ? <Pause size={28} /> : <Play size={28} className="translate-x-0.5" />}
                  </button>

                  {/* Lecture Title overlay */}
                  <div>
                    <h3 className="text-white text-base sm:text-lg font-bold drop-shadow-md">
                      {video.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                      {video.chapter} • {video.topic}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Video Control Bar */}
            <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex flex-col gap-2">
              {/* Progress Scrubber */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">{formatTime(currentSeconds)}</span>
                <input
                  type="range"
                  min={0}
                  max={video.durationMinutes * 60}
                  value={currentSeconds}
                  onChange={(e) => setCurrentSeconds(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <span className="text-xs font-mono text-slate-400">{formatTime(video.durationMinutes * 60)}</span>
              </div>

              {/* Lower Controls */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-indigo-400 transition"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button
                    onClick={() => setCurrentSeconds(prev => Math.max(0, prev - 10))}
                    className="text-slate-400 hover:text-white transition flex items-center gap-1"
                    title="Rewind 10s"
                  >
                    <RotateCcw size={14} />
                    <span>-10s</span>
                  </button>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Volume2 size={16} />
                  </div>
                </div>

                {/* Speed Controls: 1x to 2x */}
                <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[11px] mr-1">Speed:</span>
                  {speedOptions.map(spd => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${playbackSpeed === spd ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Tabbed Panel (Chapters, Clinical Vignette, Notes, 3D) */}
          <div className="lg:col-span-4 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between overflow-y-auto max-h-[500px] lg:max-h-full">
            {/* Tab navigation */}
            <div className="flex items-center border-b border-slate-800 bg-slate-950/60 p-1">
              <button
                onClick={() => setActiveTab('chapters')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${activeTab === 'chapters' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-300'}`}
              >
                Chapters ({video.chaptersList.length})
              </button>
              <button
                onClick={() => setActiveTab('vignette')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${activeTab === 'vignette' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-300'}`}
              >
                Clinical Case
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${activeTab === 'notes' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-300'}`}
              >
                Notes
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4 flex-1 overflow-y-auto">
              {activeTab === 'chapters' && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
                    <span>Jump to Section</span>
                    <span>{video.chaptersList.length} Chapters</span>
                  </div>
                  {video.chaptersList.map((chap, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentSeconds(chap.timeSec);
                        setIsPlaying(true);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-center justify-between ${currentSeconds >= chap.timeSec && (idx === video.chaptersList.length - 1 || currentSeconds < video.chaptersList[idx + 1].timeSec) ? 'bg-indigo-950/60 border-indigo-500/50 text-indigo-300' : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'}`}
                    >
                      <span className="font-medium truncate mr-2">{idx + 1}. {chap.title}</span>
                      <span className="font-mono text-slate-400 shrink-0">{formatTime(chap.timeSec)}</span>
                    </button>
                  ))}

                  {/* High Yield Takeaways card */}
                  <div className="mt-4 bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                    <h5 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                      <Sparkles size={13} />
                      Exam High-Yield Takeaways
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                      {video.highYieldPoints.map((pt, i) => (
                        <li key={i} className="leading-relaxed">{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'vignette' && (
                <div className="space-y-3">
                  <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-3.5">
                    <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                      Clinical Presentation Scenario
                    </span>
                    <p className="text-xs text-indigo-100 mt-2 leading-relaxed">
                      {video.clinicalScenario || 'A standard clinical scenario will be provided by the mentor during this module.'}
                    </p>
                  </div>

                  {video.recentGuidelineUpdate && (
                    <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3.5">
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck size={14} />
                        Recent Guidelines Reference
                      </span>
                      <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                        {video.recentGuidelineUpdate}
                      </p>
                    </div>
                  )}

                  {video.has3DModel && (
                    <button
                      onClick={() => setEmbedded3DActive(!embedded3DActive)}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition"
                    >
                      <Box size={16} />
                      {embedded3DActive ? 'Switch Back to Video Lecture' : 'Inspect 3D Anatomical Lesion'}
                    </button>
                  )}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Personal Notes on this Lecture</span>
                    <span className="font-mono text-indigo-400">@{formatTime(currentSeconds)}</span>
                  </div>

                  <textarea
                    rows={8}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Write your clinical pearls, mnemonics, or faculty tips here. Automatically syncs across your devices..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                  />

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setNoteContent(prev => prev + `\n[Timestamp: ${formatTime(currentSeconds)}] `)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <Plus size={13} />
                      Insert Current Timestamp
                    </button>

                    <button
                      onClick={handleSaveNote}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow transition"
                    >
                      {isNoteSaved ? <Check size={14} /> : <FileText size={14} />}
                      {isNoteSaved ? 'Saved to Cloud' : 'Save Note'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Faculty Footer */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>{video.faculty}</span>
              <span className="text-emerald-400 font-medium">Updated 2026/2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
