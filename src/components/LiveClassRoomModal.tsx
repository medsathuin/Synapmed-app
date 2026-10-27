import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  Hand, 
  HelpCircle, 
  FileText, 
  Download, 
  Send, 
  Headphones, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Users, 
  Flame, 
  Sparkles, 
  BarChart2, 
  Share2, 
  Moon, 
  Sun,
  Radio,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LiveClassSession, LiveChatMessage, LiveDoubt, LivePoll } from '../types/liveClass';
import { INITIAL_LIVE_CHAT_MESSAGES, INITIAL_LIVE_DOUBTS } from '../data/mockLiveClasses';
import { useSync } from '../context/SyncContext';

interface LiveClassRoomModalProps {
  session: LiveClassSession;
  onClose: () => void;
  onLaunchDppTest?: (dppId: string) => void;
  onTogglePip?: (session: LiveClassSession) => void;
  isPipMode?: boolean;
}

export const LiveClassRoomModal: React.FC<LiveClassRoomModalProps> = ({
  session,
  onClose,
  onLaunchDppTest,
  onTogglePip,
  isPipMode = false
}) => {
  const { userName, recordClassAttendance, saveNote, downloadedLiveClasses, downloadLiveClass } = useSync();

  // Classroom States
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isAudioOnly, setIsAudioOnly] = useState(false);
  const [isDarkModePdf, setIsDarkModePdf] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'doubts' | 'poll' | 'materials' | 'notes'>('chat');
  
  // Live Chat
  const [chatMessages, setChatMessages] = useState<LiveChatMessage[]>(INITIAL_LIVE_CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState('');
  const [chatFilter, setChatFilter] = useState<'all' | 'doubts'>('all');

  // Live Doubts & Hand Raise
  const [doubtsList, setDoubtsList] = useState<LiveDoubt[]>(INITIAL_LIVE_DOUBTS);
  const [myDoubtText, setMyDoubtText] = useState('');
  const [hasRaisedHand, setHasRaisedHand] = useState(false);
  const [handRaiseQueuePosition, setHandRaiseQueuePosition] = useState<number | null>(null);

  // Live Poll State
  const [poll, setPoll] = useState<LivePoll | undefined>(session.activePoll);
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);
  const [pollCountdown, setPollCountdown] = useState<number>(session.activePoll?.timeSecondsLeft || 30);
  const [hasSubmittedPoll, setHasSubmittedPoll] = useState(false);

  // Attendance ticker
  useEffect(() => {
    const timer = setInterval(() => {
      recordClassAttendance(session.id, 1);
    }, 60000); // Record 1 min attendance per minute
    return () => clearInterval(timer);
  }, [session.id]);

  // Live Poll Countdown
  useEffect(() => {
    if (!poll || hasSubmittedPoll || pollCountdown <= 0) return;
    const interval = setInterval(() => {
      setPollCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setHasSubmittedPoll(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [poll, hasSubmittedPoll, pollCountdown]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: LiveChatMessage = {
      id: 'chat-' + Date.now(),
      sender: userName,
      role: 'student',
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDoubt: chatInput.includes('?') || chatInput.toLowerCase().includes('doubt')
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');
  };

  const handleRaiseHand = () => {
    if (!hasRaisedHand) {
      setHasRaisedHand(true);
      setHandRaiseQueuePosition(3);
      const newDoubt: LiveDoubt = {
        id: 'doubt-' + Date.now(),
        studentName: userName,
        question: 'Audio Question: Requesting mic access to ask doubt directly to faculty.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isHandRaised: true,
        status: 'pending'
      };
      setDoubtsList(prev => [newDoubt, ...prev]);
    } else {
      setHasRaisedHand(false);
      setHandRaiseQueuePosition(null);
    }
  };

  const handlePostDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!myDoubtText.trim()) return;

    const newDoubt: LiveDoubt = {
      id: 'doubt-' + Date.now(),
      studentName: userName,
      question: myDoubtText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isHandRaised: false,
      status: 'pending'
    };
    setDoubtsList(prev => [newDoubt, ...prev]);
    setMyDoubtText('');
  };

  const handleVotePoll = (index: number) => {
    if (hasSubmittedPoll) return;
    setSelectedPollOption(index);
    setHasSubmittedPoll(true);
    if (poll) {
      setPoll(prev => prev ? {
        ...prev,
        totalVotes: prev.totalVotes + 1,
        userVotedOption: index
      } : undefined);
    }

    if (index === poll?.correctOption) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    }
  };

  const speedOptions = [1.0, 1.25, 1.5, 1.75, 2.0, 2.5];
  const isDownloaded = !!downloadedLiveClasses[session.id];

  return (
    <div className={`fixed z-50 transition-all ${isPipMode ? 'bottom-4 right-4 w-96 h-64 rounded-2xl shadow-2xl border-2 border-indigo-500 overflow-hidden bg-slate-950' : 'inset-0 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4'}`}>
      <div className={`bg-slate-900 border border-slate-800 rounded-2xl w-full h-full flex flex-col shadow-2xl overflow-hidden ${isPipMode ? 'border-none' : 'max-w-7xl max-h-[96vh]'}`}>
        
        {/* Top Header Bar */}
        <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 truncate">
            {session.status === 'live' ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white flex items-center gap-1.5 shadow-md shadow-rose-500/30 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white" />
                LIVE
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                RECORDED CLASS
              </span>
            )}

            <div className="truncate">
              <h2 className="text-xs sm:text-sm font-bold text-white truncate">
                {session.title}
              </h2>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate">
                {session.faculty} • {session.subject} • {session.batchName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Viewers counter */}
            {session.status === 'live' && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
                <Users size={13} className="text-emerald-400" />
                <span>{session.viewerCount.toLocaleString()} watching</span>
              </div>
            )}

            {/* Audio-only Mode Toggle */}
            <button
              onClick={() => setIsAudioOnly(!isAudioOnly)}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 ${isAudioOnly ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
              title="Audio-only mode (Save data & battery)"
            >
              <Headphones size={13} />
              <span className="hidden md:inline">{isAudioOnly ? 'Podcast Audio ON' : 'Audio Mode'}</span>
            </button>

            {/* Picture-in-picture Toggle */}
            {onTogglePip && (
              <button
                onClick={() => onTogglePip(session)}
                className="p-1.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title={isPipMode ? 'Restore full classroom' : 'Picture-in-Picture window'}
              >
                {isPipMode ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Classroom Center: Video Screen + Interactive Right Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Main Stage: Video / Whiteboard Stream / Audio-Only Screen */}
          <div className="lg:col-span-8 bg-black flex flex-col justify-between relative overflow-hidden">
            {isAudioOnly ? (
              /* Podcast Audio-Only Mode View */
              <div className="flex-1 bg-gradient-to-b from-slate-950 via-indigo-950/30 to-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-cyan-500/10 border-2 border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-2xl animate-pulse">
                  <Headphones size={36} />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Audio Podcast Mode (Data Saver)
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">{session.title}</h3>
                  <p className="text-xs text-slate-400">{session.faculty} • {session.subject}</p>
                </div>

                {/* Animated Audio Equalizer Bars */}
                <div className="flex items-center gap-1.5 h-8">
                  {[40, 75, 95, 60, 85, 100, 70, 50, 90, 65, 45, 80, 55].map((h, i) => (
                    <span
                      key={i}
                      className="w-1.5 bg-cyan-400 rounded-full animate-bounce"
                      style={{ height: `${isPlaying ? h : 15}%`, animationDelay: `${i * 80}ms` }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Full High-Def Video / Board Stream */
              <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={session.streamPoster}
                  alt={session.title}
                  className="w-full h-full object-cover opacity-80 filter contrast-125"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 flex flex-col justify-between p-4 sm:p-6">
                  {/* Pinned Live Faculty Watermark */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-full border border-slate-800 text-xs text-white">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-semibold">{session.faculty} (Live Board)</span>
                    </div>

                    {session.recentGuidelineTag && (
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur">
                        <ShieldCheck size={13} />
                        {session.recentGuidelineTag}
                      </span>
                    )}
                  </div>

                  {/* Play / Pause Center Overlay */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="self-center p-4 rounded-full bg-indigo-600/90 text-white shadow-2xl hover:scale-110 hover:bg-indigo-500 transition cursor-pointer"
                  >
                    {isPlaying ? <Pause size={28} /> : <Play size={28} className="translate-x-0.5" />}
                  </button>

                  {/* Lower Title bar */}
                  <div>
                    <h3 className="text-white text-base sm:text-lg font-bold drop-shadow">
                      {session.title}
                    </h3>
                    <p className="text-xs text-slate-300 drop-shadow line-clamp-1">
                      {session.chapter} • High-Yield Live Interaction
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Stream Controls Bar */}
            <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-indigo-400 transition"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>

                {/* Variable Speed: 1x to 2.5x */}
                <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400 mr-1">Speed:</span>
                  {speedOptions.map(spd => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition ${playbackSpeed === spd ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Raise Hand Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRaiseHand}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md ${hasRaisedHand ? 'bg-amber-500 text-slate-950 shadow-amber-500/30' : 'bg-slate-800 text-amber-300 border border-amber-500/30 hover:bg-slate-700'}`}
                >
                  <Hand size={15} />
                  <span>{hasRaisedHand ? `Hand Raised (Queue #${handRaiseQueuePosition})` : 'Raise Hand to Ask Doubt'}</span>
                </button>

                {/* Download Lecture */}
                <button
                  onClick={() => downloadLiveClass(session.id, '720p')}
                  className={`p-1.5 rounded-xl border transition ${isDownloaded ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'border-slate-800 text-slate-400 hover:text-white'}`}
                  title={isDownloaded ? 'Saved in Offline Vault' : 'Download for offline viewing'}
                >
                  {isDownloaded ? <CheckCircle2 size={16} /> : <Download size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Tabbed Classroom Panel (Chat, Doubts, Live Poll, Materials, Personal Notes) */}
          <div className="lg:col-span-4 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between overflow-hidden">
            {/* Tab navigation */}
            <div className="flex items-center border-b border-slate-800 bg-slate-950/80 p-1 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2 px-2 rounded-lg transition whitespace-nowrap ${activeTab === 'chat' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Live Chat
              </button>

              <button
                onClick={() => setActiveTab('doubts')}
                className={`flex-1 py-2 px-2 rounded-lg transition relative whitespace-nowrap ${activeTab === 'doubts' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Doubts ({doubtsList.length})
                {doubtsList.some(d => d.status === 'answering_live') && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('poll')}
                className={`flex-1 py-2 px-2 rounded-lg transition whitespace-nowrap flex items-center justify-center gap-1 ${activeTab === 'poll' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-amber-400 hover:text-amber-300'}`}
              >
                <BarChart2 size={13} />
                Live Poll
              </button>

              <button
                onClick={() => setActiveTab('materials')}
                className={`flex-1 py-2 px-2 rounded-lg transition whitespace-nowrap ${activeTab === 'materials' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Materials & DPP
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* TAB 1: LIVE CHAT */}
              {activeTab === 'chat' && (
                <div className="flex flex-col h-full justify-between space-y-3">
                  {/* Filter toggle */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setChatFilter('all')}
                        className={`font-semibold ${chatFilter === 'all' ? 'text-indigo-400' : 'hover:text-white'}`}
                      >
                        All Messages
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => setChatFilter('doubts')}
                        className={`font-semibold ${chatFilter === 'doubts' ? 'text-amber-400' : 'hover:text-white'}`}
                      >
                        Doubts Only
                      </button>
                    </div>
                    <span>{chatMessages.length} Messages</span>
                  </div>

                  {/* Messages Stream */}
                  <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                    {chatMessages
                      .filter(m => chatFilter === 'all' || m.isDoubt)
                      .map(msg => (
                        <div
                          key={msg.id}
                          className={`p-2.5 rounded-xl border text-xs leading-relaxed ${msg.isPinned ? 'bg-amber-950/40 border-amber-500/50 text-amber-200' : msg.role === 'faculty' ? 'bg-indigo-950/50 border-indigo-500/40 text-indigo-100' : msg.isDoubt ? 'bg-rose-950/30 border-rose-500/30 text-rose-100' : 'bg-slate-950/60 border-slate-800 text-slate-200'}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold flex items-center gap-1">
                              {msg.sender}
                              {msg.role === 'faculty' && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-indigo-600 text-white uppercase">
                                  Faculty
                                </span>
                              )}
                            </span>
                            <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                          </div>
                          <p>{msg.text}</p>
                        </div>
                      ))}
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSendMessage} className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask faculty in live chat... (Type ? for doubt)"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim()}
                      className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition shadow"
                    >
                      <Send size={15} />
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 2: LIVE DOUBTS & HAND RAISE */}
              {activeTab === 'doubts' && (
                <div className="space-y-4">
                  {/* Hand raise banner */}
                  <div className="bg-gradient-to-r from-amber-950/60 to-slate-950 border border-amber-500/40 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <Hand size={14} />
                        Live 2-Way Audio Doubt Privilege
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Faculty unmutes queued students during doubt breaks
                      </p>
                    </div>

                    <button
                      onClick={handleRaiseHand}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${hasRaisedHand ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-amber-300 border border-amber-500/30'}`}
                    >
                      {hasRaisedHand ? 'Withdraw Hand' : 'Raise Hand'}
                    </button>
                  </div>

                  {/* Post a text doubt */}
                  <form onSubmit={handlePostDoubt} className="space-y-2">
                    <textarea
                      rows={2}
                      value={myDoubtText}
                      onChange={(e) => setMyDoubtText(e.target.value)}
                      placeholder="Submit a specific clinical doubt for Dr. Sen to address on the board..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!myDoubtText.trim()}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold disabled:opacity-50 shadow"
                      >
                        Submit Doubt
                      </button>
                    </div>
                  </form>

                  {/* Doubt list */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Live In-Class Doubt Queue ({doubtsList.length})
                    </h5>

                    {doubtsList.map(dbt => (
                      <div
                        key={dbt.id}
                        className={`p-3 rounded-xl border text-xs space-y-1.5 ${dbt.status === 'answering_live' ? 'bg-rose-950/40 border-rose-500 text-rose-100 shadow-md' : 'bg-slate-950/60 border-slate-800 text-slate-200'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold flex items-center gap-1">
                            {dbt.studentName}
                            {dbt.isHandRaised && <Hand size={12} className="text-amber-400" />}
                          </span>
                          <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${dbt.status === 'answering_live' ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
                            {dbt.status === 'answering_live' ? 'Answering on Live Board' : 'In Queue'}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed">{dbt.question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: LIVE POLL & MCQ QUIZ */}
              {activeTab === 'poll' && (
                <div className="space-y-4">
                  {poll ? (
                    <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-4 space-y-4 shadow-xl">
                      {/* Timer & Poll header */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                        <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                          <BarChart2 size={16} />
                          <span>Live In-Lecture Quiz Poll</span>
                        </div>
                        <div className="flex items-center gap-1 font-mono text-xs font-bold text-rose-400">
                          <Clock size={13} />
                          <span>{pollCountdown}s Left</span>
                        </div>
                      </div>

                      {/* Question */}
                      <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                        {poll.question}
                      </p>

                      {/* Options */}
                      <div className="space-y-2">
                        {poll.options.map((option, idx) => {
                          const isSelected = selectedPollOption === idx;
                          const showResults = hasSubmittedPoll || pollCountdown === 0;
                          const isCorrect = idx === poll.correctOption;
                          const percentage = poll.votesDistribution[idx] || 0;

                          return (
                            <div
                              key={idx}
                              onClick={() => handleVotePoll(idx)}
                              className={`p-3 rounded-xl border text-xs transition cursor-pointer relative overflow-hidden ${showResults ? (isCorrect ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200' : isSelected ? 'border-rose-500 bg-rose-950/40 text-rose-200' : 'border-slate-800 bg-slate-900 text-slate-300') : (isSelected ? 'border-indigo-500 bg-indigo-950/60 text-white font-bold' : 'border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-200')}`}
                            >
                              {/* Background distribution percentage bar */}
                              {showResults && (
                                <div
                                  className={`absolute left-0 top-0 bottom-0 opacity-25 ${isCorrect ? 'bg-emerald-500' : 'bg-slate-500'}`}
                                  style={{ width: `${percentage}%` }}
                                />
                              )}

                              <div className="relative flex items-center justify-between z-10">
                                <span className="font-medium mr-2">
                                  {String.fromCharCode(65 + idx)}. {option}
                                </span>
                                {showResults && (
                                  <span className="font-mono font-bold shrink-0">{percentage}%</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation box after submit */}
                      {(hasSubmittedPoll || pollCountdown === 0) && (
                        <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs space-y-1">
                          <div className="text-indigo-300 font-bold flex items-center gap-1">
                            <Sparkles size={13} />
                            Faculty Rationale:
                          </div>
                          <p className="text-slate-300 leading-relaxed">{poll.explanation}</p>
                          <div className="text-[10px] text-slate-400 pt-1">
                            Total Live Responses: {poll.totalVotes.toLocaleString()} Doctors
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-500 text-xs">
                      No active poll at this moment. Faculty will launch an interactive MCQ shortly.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: MATERIALS, HANDWRITTEN NOTES & DPP */}
              {activeTab === 'materials' && (
                <div className="space-y-4">
                  {/* Dark Mode PDF Reader Switch */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Moon size={14} className="text-indigo-400" />
                      PDF Eye-Care Night Mode
                    </span>
                    <button
                      onClick={() => setIsDarkModePdf(!isDarkModePdf)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${isDarkModePdf ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      {isDarkModePdf ? 'Dark Mode ON' : 'Light Mode'}
                    </button>
                  </div>

                  {/* 1. Class Notes (Handwritten Faculty Notes) */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-indigo-400" />
                        <div>
                          <h5 className="text-xs font-bold text-white">Faculty Handwritten Notes PDF</h5>
                          <span className="text-[10px] text-slate-400">{session.classNotesPages} Pages • Uploaded right after class</span>
                        </div>
                      </div>
                      <a
                        href={session.classNotesPdfUrl}
                        download
                        onClick={(e) => { e.preventDefault(); alert('Downloading handwritten faculty notes PDF (high-resolution color annotated)...'); }}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow cursor-pointer"
                      >
                        <Download size={13} />
                        Download PDF
                      </a>
                    </div>
                  </div>

                  {/* 2. Lecture Slides Annotation PDF */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-cyan-400" />
                        <div>
                          <h5 className="text-xs font-bold text-white">Lecture Presentation Slides PDF</h5>
                          <span className="text-[10px] text-slate-400">Board annotations & live diagrams included</span>
                        </div>
                      </div>
                      <a
                        href={session.lectureSlidesPdfUrl}
                        download
                        onClick={(e) => { e.preventDefault(); alert('Downloading live presentation slides PDF...'); }}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Download size={13} />
                        Save Slides
                      </a>
                    </div>
                  </div>

                  {/* 3. DPP (Daily Practice Paper) + Video Solutions */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-950 border border-emerald-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 uppercase">
                        Daily Practice Paper (DPP)
                      </span>
                      <span className="text-xs font-semibold text-emerald-400">
                        {session.dppQuestionCount} High-Yield MCQs
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-white">{session.dppTitle}</h5>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Solve the Daily Practice Test for this lecture to solidify concepts. Includes separate video solution walkthrough ({session.dppVideoSolutionDurationMin} mins).
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          if (onLaunchDppTest) onLaunchDppTest(session.dppId);
                        }}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 cursor-pointer"
                      >
                        <Play size={13} fill="currentColor" />
                        Start Daily Practice Test
                      </button>

                      <a
                        href={session.dppPdfUrl}
                        download
                        onClick={(e) => { e.preventDefault(); alert('Downloading DPP question sheet + printed answer key PDF...'); }}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Download size={13} />
                        PDF
                      </a>
                    </div>
                  </div>

                  {/* 4. Full Subject Module PDF */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-white">Full Subject Digital Module</h5>
                        <p className="text-[11px] text-slate-400">{session.modulePdfTitle}</p>
                      </div>
                      <button
                        onClick={() => alert(`Opening ${session.modulePdfTitle} in ${isDarkModePdf ? 'Dark Eye-Care Mode' : 'Standard View'}...`)}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold"
                      >
                        Read Module
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Info */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Radio size={13} className="text-emerald-400" />
                <span>Attendance Logged • 100% Sync</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">2-Way Encrypted Stream</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
