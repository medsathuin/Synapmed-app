import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  ShieldCheck, 
  Box, 
  Download, 
  CheckCircle, 
  Search, 
  Filter, 
  Bookmark, 
  Sparkles,
  Layers
} from 'lucide-react';
import { VideoLecture, VideoType } from '../types';
import { MOCK_VIDEOS } from '../data/mockVideos';
import { MEDICAL_SUBJECTS } from '../data/subjects';
import { useSync } from '../context/SyncContext';

interface VideoSectionViewProps {
  onSelectVideo: (video: VideoLecture) => void;
  onOpen3DLab: (modelType?: string) => void;
}

export const VideoSectionView: React.FC<VideoSectionViewProps> = ({ onSelectVideo, onOpen3DLab }) => {
  const { downloadedVideoIds, toggleVideoDownload, isBookmarked, toggleBookmark } = useSync();

  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<VideoType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyOffline, setOnlyOffline] = useState(false);

  const filteredVideos = MOCK_VIDEOS.filter(vid => {
    if (selectedSubject !== 'all' && vid.subject !== selectedSubject) return false;
    if (selectedType !== 'all' && vid.type !== selectedType) return false;
    if (onlyOffline && !downloadedVideoIds.includes(vid.id)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        vid.title.toLowerCase().includes(q) ||
        vid.subject.toLowerCase().includes(q) ||
        vid.topic.toLowerCase().includes(q) ||
        vid.faculty.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles size={14} />
              800+ Recorded Clinical Hours • 19 Subjects
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Video Lecture Vault & Clinical Vignettes
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Master core concepts with India's premier medical faculty. Includes comprehensive concept lectures, rapid revision (RR) modules, 3D anatomical animations, speed controls (1x-2x), and offline viewing.
            </p>
          </div>

          <button
            onClick={() => onOpen3DLab('circle_of_willis')}
            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-cyan-600/30 flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Box size={16} />
            Launch 3D Anatomy Lab
          </button>
        </div>

        {/* Quick format tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <button
            onClick={() => setSelectedType('concept')}
            className={`p-3 rounded-xl border text-left transition ${selectedType === 'concept' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
          >
            <div className="font-bold">Concept Videos</div>
            <div className="text-[11px] opacity-80 mt-0.5">Deep pathophysiological grounding</div>
          </button>

          <button
            onClick={() => setSelectedType('clinical_case')}
            className={`p-3 rounded-xl border text-left transition ${selectedType === 'clinical_case' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
          >
            <div className="font-bold">Clinical Scenarios</div>
            <div className="text-[11px] opacity-80 mt-0.5">Case-based bedside problem solving</div>
          </button>

          <button
            onClick={() => setSelectedType('revision')}
            className={`p-3 rounded-xl border text-left transition ${selectedType === 'revision' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
          >
            <div className="font-bold">Revision Videos</div>
            <div className="text-[11px] opacity-80 mt-0.5">High-yield exam takeaways</div>
          </button>

          <button
            onClick={() => setSelectedType('rapid_revision')}
            className={`p-3 rounded-xl border text-left transition ${selectedType === 'rapid_revision' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
          >
            <div className="font-bold">Last-Minute RR</div>
            <div className="text-[11px] opacity-80 mt-0.5">Rapid high-yield recap in 30 mins</div>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Subject dropdown / filter */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${selectedSubject === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            All Subjects (19)
          </button>
          {MEDICAL_SUBJECTS.slice(0, 7).map(sub => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${selectedSubject === sub.name ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}`}
            >
              {sub.shortName}
            </button>
          ))}
        </div>

        {/* Offline filter toggle & search */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setOnlyOffline(!onlyOffline)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 whitespace-nowrap ${onlyOffline ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
          >
            <Download size={13} />
            <span>Offline Saved Only ({downloadedVideoIds.length})</span>
          </button>

          <div className="relative flex-1 md:w-48">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lectures..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVideos.map(video => {
          const isDownloaded = downloadedVideoIds.includes(video.id);
          const bookmarked = isBookmarked(video.id);

          return (
            <div
              key={video.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail image with play overlay */}
                <div
                  onClick={() => onSelectVideo(video)}
                  className="relative h-44 bg-slate-950 overflow-hidden cursor-pointer"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Play circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition">
                      <Play size={20} className="translate-x-0.5" />
                    </div>
                  </div>

                  {/* Badges on thumbnail */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/90 backdrop-blur text-white border border-slate-700">
                      {video.subject}
                    </span>
                    {video.has3DModel && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-600/90 text-white flex items-center gap-1 shadow">
                        <Box size={11} /> 3D Model
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-950/90 text-slate-200 flex items-center gap-1">
                    <Clock size={11} />
                    {video.durationMinutes}m
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="uppercase tracking-wider font-semibold text-[10px] text-indigo-400">
                      {video.type.replace('_', ' ')}
                    </span>
                    <span>{video.faculty}</span>
                  </div>

                  <h3
                    onClick={() => onSelectVideo(video)}
                    className="text-sm font-bold text-white hover:text-indigo-400 transition cursor-pointer line-clamp-2 leading-snug"
                  >
                    {video.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {video.clinicalScenario || video.topic}
                  </p>

                  {/* Guidelines update badge */}
                  {video.recentGuidelineUpdate && (
                    <div className="pt-1 flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <ShieldCheck size={13} className="shrink-0" />
                      <span className="truncate">{video.recentGuidelineUpdate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <button
                  onClick={() => toggleVideoDownload(video.id)}
                  className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg font-medium transition ${isDownloaded ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  {isDownloaded ? <CheckCircle size={13} /> : <Download size={13} />}
                  <span>{isDownloaded ? 'Saved Offline' : 'Save'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark({
                      itemType: 'video',
                      itemId: video.id,
                      title: video.title,
                      subject: video.subject,
                      tag: video.type
                    })}
                    className={`p-1.5 rounded-lg border transition ${bookmarked ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                    title="Bookmark Lecture"
                  >
                    <Bookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} />
                  </button>

                  <button
                    onClick={() => onSelectVideo(video)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
                  >
                    Watch Lecture
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
