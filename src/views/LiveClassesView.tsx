import React, { useState } from 'react';
import { 
  Radio, 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  Play, 
  Download, 
  CheckCircle2, 
  FileText, 
  Upload, 
  HelpCircle, 
  Archive, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Send, 
  Camera, 
  ExternalLink, 
  HardDrive, 
  Trash2, 
  ShieldCheck, 
  Bell, 
  Bookmark,
  Check,
  ChevronRight,
  Bot,
  Plus
} from 'lucide-react';
import { LiveClassSession } from '../types/liveClass';
import { CURRENT_BATCH, MOCK_LIVE_CLASSES } from '../data/mockLiveClasses';
import { FOUNDER_INFO } from '../data/mockAdminData';
import { TeacherProfile } from '../types/roles';
import { AddLectureModal } from '../components/AddLectureModal';
import { TeacherStudioModal } from '../components/TeacherStudioModal';
import { useSync } from '../context/SyncContext';

interface LiveClassesViewProps {
  onEnterLiveClass: (session: LiveClassSession) => void;
  onLaunchDppTest: (dppId: string) => void;
}

export const LiveClassesView: React.FC<LiveClassesViewProps> = ({
  onEnterLiveClass,
  onLaunchDppTest
}) => {
  const { 
    liveClasses, 
    addLiveLecture,
    endAndPublishLiveLecture,
    toggleLiveClassReminder, 
    downloadedLiveClasses, 
    downloadLiveClass, 
    deleteLiveClassDownload, 
    uploadedUserNotes, 
    addUploadedNote, 
    deleteUploadedNote, 
    doubtTickets, 
    submitDoubtTicket, 
    activeDevices, 
    currentDevice, 
    switchDevice 
  } = useSync();

  const [activeTab, setActiveTab] = useState<'live_schedule' | 'recorded' | 'khazana' | 'doubts' | 'materials' | 'storage_devices'>('live_schedule');
  const [isAddLectureOpen, setIsAddLectureOpen] = useState(false);
  const [isTakingLectureOpen, setIsTakingLectureOpen] = useState(false);
  const [liveStudioTitle, setLiveStudioTitle] = useState('Interactive Live Lecture • Clinical Rounds');
  const [liveStudioId, setLiveStudioId] = useState<string>('live-med-01');

  const founderTeacher: TeacherProfile = {
    id: 'founder-rathod',
    name: `Dr. ${FOUNDER_INFO.name} (Founder)`,
    email: FOUNDER_INFO.email,
    subject: 'Clinical Medicine, Cardiology & Medical PG Strategy',
    qualification: FOUNDER_INFO.qualification,
    experienceYears: 16,
    avatarUrl: FOUNDER_INFO.avatar,
    assignedBatches: [CURRENT_BATCH.name],
    totalClassesTaken: 460,
    rating: 4.99,
    status: 'active'
  };
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  // Doubt Engine Form
  const [doubtQuestion, setDoubtQuestion] = useState('');
  const [doubtSubject, setDoubtSubject] = useState('General Medicine');
  const [doubtTopic, setDoubtTopic] = useState('Cardiology / ECG');
  const [isPhotoAttached, setIsPhotoAttached] = useState(false);

  // Upload Note Form
  const [uploadNoteTitle, setUploadNoteTitle] = useState('');
  const [uploadNoteSubject, setUploadNoteSubject] = useState('General Medicine');
  const [isUploadingNote, setIsUploadingNote] = useState(false);

  const liveNowClass = liveClasses.find(c => c.status === 'live') || liveClasses[0];

  const handlePostDoubtTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtQuestion.trim()) return;

    await submitDoubtTicket(
      doubtSubject,
      doubtTopic,
      doubtQuestion.trim(),
      isPhotoAttached ? 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80' : undefined
    );
    setDoubtQuestion('');
    setIsPhotoAttached(false);
  };

  const handleUploadUserNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadNoteTitle.trim()) return;

    setIsUploadingNote(true);
    await addUploadedNote(uploadNoteTitle.trim(), uploadNoteSubject, 18, 5.4);
    setUploadNoteTitle('');
    setIsUploadingNote(false);
  };

  return (
    <div className="space-y-6">
      {/* Batch Header Bar */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {CURRENT_BATCH.targetExam}
              </span>
              <span className="text-xs text-slate-300 font-semibold">{CURRENT_BATCH.enrolledStudentsCount.toLocaleString()} Enrolled Doctors</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {CURRENT_BATCH.name}
            </h2>
            <p className="text-xs text-slate-300">
              Lead Faculty: <strong className="text-white">{CURRENT_BATCH.facultyLead}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => {
                setLiveStudioTitle(`Live Interactive Clinical Lecture • Dr. ${FOUNDER_INFO.name}`);
                setIsTakingLectureOpen(true);
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-lg shadow-rose-600/30 cursor-pointer animate-pulse whitespace-nowrap"
            >
              <Radio size={14} />
              <span>Take Online Lecture</span>
            </button>

            <button
              onClick={() => setIsAddLectureOpen(true)}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 shadow cursor-pointer whitespace-nowrap"
            >
              <Plus size={14} />
              <span>Add Lecture</span>
            </button>

            <a
              href={CURRENT_BATCH.telegramLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => { e.preventDefault(); alert(`Opening Official Telegram Channel (${CURRENT_BATCH.telegramLink}) for PDF notes, instant doubt drops & daily polls!`); }}
              className="px-3.5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow cursor-pointer whitespace-nowrap"
            >
              <Send size={14} />
              <span>Telegram</span>
            </a>
          </div>
        </div>

        {/* Attendance & Progress tracker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <div>
            <div className="text-slate-400">My Live Attendance Rate:</div>
            <div className="text-base font-bold text-emerald-400 mt-0.5">{CURRENT_BATCH.attendancePercentage}% Logged</div>
            <span className="text-[10px] text-slate-500">Regular Doctor Badge</span>
          </div>
          <div>
            <div className="text-slate-400">Batch Lectures Done:</div>
            <div className="text-base font-bold text-white mt-0.5">{CURRENT_BATCH.completedClasses} / {CURRENT_BATCH.totalClasses}</div>
            <span className="text-[10px] text-indigo-400">70% Syllabus Covered</span>
          </div>
          <div>
            <div className="text-slate-400">Daily Class Times:</div>
            <div className="text-base font-bold text-white mt-0.5">6:00 PM & 9:00 PM</div>
            <span className="text-[10px] text-slate-500">2 Daily Live Sessions</span>
          </div>
          <div>
            <div className="text-slate-400">Khazana Archive:</div>
            <div className="text-base font-bold text-amber-400 mt-0.5">Free Unlocked</div>
            <span className="text-[10px] text-amber-300">2025 & 2024 Batches</span>
          </div>
        </div>
      </div>

      {/* Live Now Featured Card */}
      {liveNowClass && liveNowClass.status === 'live' && (
        <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-indigo-950/80 border-2 border-rose-500/50 rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-slate-700 shadow-xl">
              <img src={liveNowClass.thumbnail} alt={liveNowClass.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                <Play size={24} className="text-white fill-white translate-x-0.5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  LIVE NOW IN SESSION
                </span>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <Users size={13} /> {liveNowClass.viewerCount.toLocaleString()} Doctors inside
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {liveNowClass.title}
              </h3>
              <p className="text-xs text-slate-300">
                {liveNowClass.faculty} • {liveNowClass.subject} • {liveNowClass.timing}
              </p>
            </div>
          </div>

          <button
            onClick={() => onEnterLiveClass(liveNowClass)}
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs rounded-xl shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2 transition cursor-pointer whitespace-nowrap"
          >
            <Radio size={16} />
            <span>Join Live Classroom & Chat</span>
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'live_schedule', label: 'Live Schedule & Timetable' },
          { id: 'recorded', label: 'Recorded Classes Vault (1x-2.5x)' },
          { id: 'khazana', label: 'Khazana (Previous Batches Archive)' },
          { id: 'doubts', label: `Doubt Engine & Saarthi AI (${doubtTickets.length})` },
          { id: 'materials', label: 'Notes PDF, DPP & My Notes' },
          { id: 'storage_devices', label: 'Offline Storage & Active Devices' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: LIVE SCHEDULE & TIMETABLE */}
      {activeTab === 'live_schedule' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Weekly Batch Timetable • Daily 2-Way Interactive Sessions</span>
            <span className="text-indigo-400 font-semibold">Processed to Recorded within 1-2 Hours</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveClasses.map(session => (
              <div
                key={session.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition shadow-xl space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                      {session.subject}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{session.timing}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-2">{session.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <img src={session.facultyAvatar} alt={session.faculty} className="w-5 h-5 rounded-full object-cover" />
                    <span>{session.faculty} ({session.facultyTitle})</span>
                  </div>

                  {session.recentGuidelineTag && (
                    <div className="text-[11px] text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                      <ShieldCheck size={13} />
                      <span>{session.recentGuidelineTag}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleLiveClassReminder(session.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${session.reminderSet ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
                  >
                    <Bell size={13} />
                    <span>{session.reminderSet ? 'Reminder Set' : 'Set Reminder'}</span>
                  </button>

                  <button
                    onClick={() => onEnterLiveClass(session)}
                    className={`px-4 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 shadow ${session.status === 'live' ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                  >
                    <Play size={13} fill="currentColor" />
                    <span>{session.status === 'live' ? 'Join Live Class' : 'Watch Class'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: RECORDED CLASSES (1x to 2.5x speed) */}
      {activeTab === 'recorded' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>All Live Classes Converted to Recorded within 1-2 Hours • Unlimited Rewatches (1x to 2.5x)</span>
            <span className="text-emerald-400 font-semibold">High-Definition 1080p & 720p</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveClasses.map(session => (
              <div
                key={session.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div>
                  <div className="relative h-40 bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onEnterLiveClass(session)}>
                    <img src={session.thumbnail} alt={session.title} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/90 text-white">
                      {session.durationMinutes} mins
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase">{session.subject}</span>
                    <h4 onClick={() => onEnterLiveClass(session)} className="text-xs sm:text-sm font-bold text-white hover:text-indigo-400 transition cursor-pointer line-clamp-2">
                      {session.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">{session.faculty}</p>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">{session.dateStr}</span>
                  <button
                    onClick={() => onEnterLiveClass(session)}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold"
                  >
                    Play (1x-2.5x)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: KHAZANA (ARCHIVE OF PREVIOUS 2-3 YEARS RECORDED BATCHES) */}
      {activeTab === 'khazana' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-amber-950/50 via-slate-900 to-indigo-950/50 border border-amber-500/30 rounded-2xl p-5 shadow-xl space-y-2">
            <div className="flex items-center gap-2">
              <Archive size={20} className="text-amber-400" />
              <h3 className="text-base font-bold text-white">Khazana: Full Batch Archive (Free with this batch)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unlimited access to previous years' complete recordings (2025 and 2024 batches) plus Fast-Track Rapid Revision courses, all included free within your subscription.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                Khazana Batch 2025
              </span>
              <h4 className="text-sm font-bold text-white">Super 100 Live Clinical PG (2025 Edition)</h4>
              <p className="text-xs text-slate-400">Complete 240 lectures across all 19 subjects with faculty PDFs.</p>
              <button
                onClick={() => alert('Accessing 2025 batch archive playlist (240 lectures)...')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold transition"
              >
                Explore 2025 Lectures
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                Khazana Batch 2024
              </span>
              <h4 className="text-sm font-bold text-white">NEET-PG Diamond Clinical Batch (2024 Edition)</h4>
              <p className="text-xs text-slate-400">Full syllabus recordings with image-based masterclasses.</p>
              <button
                onClick={() => alert('Accessing 2024 batch archive playlist (220 lectures)...')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold transition"
              >
                Explore 2024 Lectures
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                Fast-Track Revision
              </span>
              <h4 className="text-sm font-bold text-white">Last-Minute Rapid Revision 3.0</h4>
              <p className="text-xs text-slate-400">Ultra high-yield 80-hour summary covering all 19 subjects.</p>
              <button
                onClick={() => alert('Accessing Rapid Revision 3.0 playlist (80 hours)...')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold transition"
              >
                Explore Fast-Track
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DOUBTS ENGINE & SAARTHI AI */}
      {activeTab === 'doubts' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Ask Doubt Form */}
          <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-indigo-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Saarthi AI & Faculty Doubt Desk</h3>
                <p className="text-[11px] text-slate-400">Instant AI step-by-step answer + Faculty video response</p>
              </div>
            </div>

            <form onSubmit={handlePostDoubtTicket} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Subject</label>
                <select
                  value={doubtSubject}
                  onChange={(e) => setDoubtSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  <option value="General Medicine">General Medicine</option>
                  <option value="General Surgery">General Surgery</option>
                  <option value="Pathology">Pathology</option>
                  <option value="Pharmacology">Pharmacology</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Ask Question / Describe Doubt</label>
                <textarea
                  rows={4}
                  required
                  value={doubtQuestion}
                  onChange={(e) => setDoubtQuestion(e.target.value)}
                  placeholder="Type your medical doubt or question in detail..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              {/* Photo upload toggle */}
              <button
                type="button"
                onClick={() => setIsPhotoAttached(!isPhotoAttached)}
                className={`w-full py-2 rounded-xl border flex items-center justify-center gap-1.5 transition ${isPhotoAttached ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'}`}
              >
                <Camera size={14} />
                <span>{isPhotoAttached ? 'Photo Attached (ECG / Question image)' : 'Click Photo / Upload Image of Doubt'}</span>
              </button>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow transition cursor-pointer"
              >
                Submit Doubt to Saarthi AI & Faculty
              </button>
            </form>
          </div>

          {/* Doubts Tickets stream */}
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              My Doubts & Faculty Video Solutions ({doubtTickets.length})
            </h4>

            {doubtTickets.map(ticket => (
              <div key={ticket.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                    {ticket.subject} • {ticket.topic}
                  </span>
                  <span className="text-[11px] text-slate-400">{ticket.createdAt}</span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-white">
                  "{ticket.questionText}"
                </p>

                {ticket.imageUrl && (
                  <div className="rounded-xl overflow-hidden border border-slate-800 max-h-36">
                    <img src={ticket.imageUrl} alt="Doubt Photo" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* AI Saarthi answer */}
                <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs space-y-1">
                  <div className="text-indigo-300 font-bold flex items-center gap-1">
                    <Bot size={13} />
                    <span>Instant Solution:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{ticket.aiAnswer}</p>
                </div>

                {/* Faculty Video Solution */}
                {ticket.facultyVideoSolutionUrl && (
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Video size={14} />
                      Faculty Video Response: {ticket.facultyName}
                    </span>
                    <button
                      onClick={() => alert(`Playing video explanation from ${ticket.facultyName}...`)}
                      className="text-xs text-indigo-400 hover:underline font-bold"
                    >
                      Watch Video Solution
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MATERIALS, DPP & UPLOAD MY NOTES */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          {/* Upload Own Notes Modal Trigger Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Upload size={18} className="text-indigo-400" />
                Upload Your Own Handwritten Notes
              </h3>
              <p className="text-xs text-slate-400">
                Upload your medical summary PDFs to synchronize across your phone, tablet, and laptop for seamless revision.
              </p>
            </div>

            <form onSubmit={handleUploadUserNoteSubmit} className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                required
                value={uploadNoteTitle}
                onChange={(e) => setUploadNoteTitle(e.target.value)}
                placeholder="Note title (e.g., My Robbins Pathology summary)..."
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={isUploadingNote || !uploadNoteTitle.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow whitespace-nowrap cursor-pointer"
              >
                Upload PDF
              </button>
            </form>
          </div>

          {/* Uploaded notes list */}
          {uploadedUserNotes.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                My Uploaded Revision Notes ({uploadedUserNotes.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {uploadedUserNotes.map(n => (
                  <div key={n.id} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white line-clamp-1">{n.title}</div>
                      <div className="text-[11px] text-slate-400">{n.subject} • {n.pageCount} Pages • {n.fileSizeMb} MB</div>
                    </div>
                    <button
                      onClick={() => deleteUploadedNote(n.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DPP & Faculty Notes list */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Batch Lecture Notes & Daily Practice Papers (DPPs)
            </h4>

            {liveClasses.map(session => (
              <div key={session.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                      {session.subject}
                    </span>
                    <span className="text-white font-bold">{session.title}</span>
                  </div>
                  <div className="text-slate-400 mt-1">
                    {session.dppTitle} ({session.dppQuestionCount} Qs) • {session.classNotesPages} Pages Faculty Notes
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onLaunchDppTest(session.dppId)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-1 shadow"
                  >
                    <Play size={13} fill="currentColor" />
                    Attempt DPP Test
                  </button>

                  <a
                    href={session.classNotesPdfUrl}
                    download
                    onClick={(e) => { e.preventDefault(); alert('Downloading handwritten faculty notes PDF...'); }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold flex items-center gap-1"
                  >
                    <Download size={13} />
                    Notes PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: OFFLINE STORAGE & ACTIVE DEVICES */}
      {activeTab === 'storage_devices' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Storage manager */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <HardDrive size={18} className="text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Offline Video Storage Manager</h3>
            </div>
            <p className="text-slate-400">
              Manage downloaded lecture packets. Downloaded lectures play without internet in 360p, 720p, or 1080p.
            </p>

            <div className="space-y-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex justify-between font-bold">
                <span className="text-white">Offline Storage Used</span>
                <span className="text-cyan-400">1.1 GB / 64 GB</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400" style={{ width: '4%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Downloaded Recorded Classes:</div>
              {Object.keys(downloadedLiveClasses).map(classId => (
                <div key={classId} className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-white font-medium">{classId} ({downloadedLiveClasses[classId].quality})</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">{downloadedLiveClasses[classId].sizeMb} MB</span>
                    <button
                      onClick={() => deleteLiveClassDownload(classId)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Devices */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Smartphone size={18} className="text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Active Synced Devices (Mobile / Tablet / Laptop)</h3>
            </div>
            <p className="text-slate-400">
              Your single subscription synchronizes progress across your devices seamlessly.
            </p>

            <div className="space-y-2">
              {activeDevices.map(dev => (
                <div key={dev} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-medium">
                    {dev.includes('MacBook') || dev.includes('Laptop') ? <Laptop size={15} className="text-indigo-400" /> : dev.includes('iPad') ? <Tablet size={15} className="text-indigo-400" /> : <Smartphone size={15} className="text-indigo-400" />}
                    <span>{dev}</span>
                  </div>
                  <button
                    onClick={() => switchDevice(dev)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${currentDevice === dev ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                  >
                    {currentDevice === dev ? 'Active Current' : 'Switch Device'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Add Lecture Modal */}
      {isAddLectureOpen && (
        <AddLectureModal
          defaultFacultyName={`Dr. ${FOUNDER_INFO.name} (Founder)`}
          defaultBatchName={CURRENT_BATCH.name}
          onClose={() => setIsAddLectureOpen(false)}
          onSaveLecture={(newLecture, startImmediately) => {
            addLiveLecture(newLecture);
            setIsAddLectureOpen(false);
            setLiveStudioTitle(newLecture.title);
            setLiveStudioId(newLecture.id);
            if (startImmediately) {
              setIsTakingLectureOpen(true);
            } else {
              alert(`Lecture "${newLecture.title}" added to the batch live timetable!`);
            }
          }}
        />
      )}

      {/* Online Lecture Studio Modal (Taking Online Lecture) */}
      {isTakingLectureOpen && (
        <TeacherStudioModal
          teacher={founderTeacher}
          batchName={CURRENT_BATCH.name}
          lectureTitle={liveStudioTitle}
          onClose={() => setIsTakingLectureOpen(false)}
          onEndLecture={() => {
            endAndPublishLiveLecture(liveStudioId);
            setIsTakingLectureOpen(false);
            alert(`Live online lecture "${liveStudioTitle}" ended! The recording and handwritten PDF notes are now published to all enrolled doctors.`);
          }}
        />
      )}
    </div>
  );
};
