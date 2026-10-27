import React, { useState } from 'react';
import { 
  X, 
  Radio, 
  Video, 
  Calendar, 
  Clock, 
  FileText, 
  Upload, 
  Sparkles, 
  Check, 
  Users, 
  BookOpen, 
  Play,
  Layers,
  Award
} from 'lucide-react';
import { LiveClassSession } from '../types/liveClass';
import { MEDICAL_SUBJECTS } from '../data/subjects';
import { FOUNDER_INFO } from '../data/mockAdminData';
import { CURRENT_BATCH } from '../data/mockLiveClasses';

interface AddLectureModalProps {
  onClose: () => void;
  onSaveLecture: (lecture: LiveClassSession, startImmediately: boolean) => void;
  defaultFacultyName?: string;
  defaultBatchName?: string;
}

export const AddLectureModal: React.FC<AddLectureModalProps> = ({
  onClose,
  onSaveLecture,
  defaultFacultyName = `Dr. ${FOUNDER_INFO.name} (Founder)`,
  defaultBatchName = CURRENT_BATCH.name
}) => {
  const [title, setTitle] = useState('Cardiology & Critical Care: Acute Coronary Syndromes & RV Infarction Protocol');
  const [subject, setSubject] = useState('General Medicine');
  const [chapter, setChapter] = useState('Cardiovascular & Emergency Care');
  const [faculty, setFaculty] = useState(defaultFacultyName);
  const [batchName, setBatchName] = useState(defaultBatchName);
  const [lectureType, setLectureType] = useState<'live' | 'recorded'>('live');
  const [startTiming, setStartTiming] = useState<'now' | 'scheduled'>('now');
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString().split('T')[0]);
  const [scheduledTime, setScheduledTime] = useState('18:00');
  const [durationMinutes, setDurationMinutes] = useState(120);
  const [guidelineTag, setGuidelineTag] = useState('AHA/ESC & Surviving Sepsis 2026 Guidelines');
  
  // Attachments
  const [includeNotesPdf, setIncludeNotesPdf] = useState(true);
  const [notesPages, setNotesPages] = useState(36);
  const [includeDpp, setIncludeDpp] = useState(true);
  const [dppQuestionsCount, setDppQuestionsCount] = useState(15);
  const [dppTitle, setDppTitle] = useState('DPP: Vasopressors & Inotropic Resuscitation');

  const handleSubmit = (e: React.FormEvent, startImmediately: boolean) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newLecture: LiveClassSession = {
      id: 'lec-' + Date.now(),
      title,
      subject,
      chapter,
      faculty,
      facultyTitle: faculty.includes(FOUNDER_INFO.name) ? FOUNDER_INFO.title : 'Senior Clinical Faculty',
      facultyAvatar: faculty.includes(FOUNDER_INFO.name) ? FOUNDER_INFO.avatar : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
      timing: startImmediately ? 'LIVE NOW (Interactive Lecture in Session)' : `Scheduled for ${scheduledDate} • ${scheduledTime}`,
      dateStr: startImmediately ? 'Today' : scheduledDate,
      status: startImmediately ? 'live' : 'upcoming',
      viewerCount: startImmediately ? 14820 : 0,
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      streamPoster: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
      durationMinutes,
      batchName,
      recentGuidelineTag: guidelineTag,
      classNotesPdfUrl: includeNotesPdf ? `/notes/${subject.toLowerCase()}-live-notes.pdf` : '',
      classNotesPages: includeNotesPdf ? notesPages : 0,
      lectureSlidesPdfUrl: `/slides/${subject.toLowerCase()}-annotated.pdf`,
      modulePdfUrl: `/modules/${subject.toLowerCase()}-standard-module.pdf`,
      modulePdfTitle: `${subject} Comprehensive Clinical Notes`,
      dppId: includeDpp ? 'dpp-' + Date.now() : '',
      dppTitle: includeDpp ? dppTitle : '',
      dppQuestionCount: includeDpp ? dppQuestionsCount : 0,
      dppPdfUrl: `/dpp/dpp-${Date.now()}.pdf`,
      dppVideoSolutionDurationMin: 25,
      isDownloaded: false,
      reminderSet: true
    };

    onSaveLecture(newLecture, startImmediately);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-5 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg">
              <Radio size={20} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Add & Schedule Online Lecture</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase">
                  Live Studio Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Launch an interactive online lecture with live whiteboard, polls, chat, and notes.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={(e) => handleSubmit(e, startTiming === 'now')} className="space-y-4 text-xs">
          {/* Lecture Title */}
          <div>
            <label className="block text-slate-300 font-bold mb-1">
              Lecture Title & Clinical Focus *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., High-Yield Hematology: Leukemia & Lymphoma Flow Cytometry"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Grid: Subject & Chapter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Medical Subject (19 Subjects)
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition"
              >
                {MEDICAL_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.totalHours}h • {s.highYieldWeightage}% Weightage)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Chapter / Topic Vignette
              </label>
              <input
                type="text"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="E.g., Critical Care & Hemodynamics"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Grid: Faculty & Batch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Lead Faculty / Educator
              </label>
              <input
                type="text"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Enrolled Target Batch
              </label>
              <input
                type="text"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Guidelines and Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Recent Guideline / High-Yield Badge
              </label>
              <input
                type="text"
                value={guidelineTag}
                onChange={(e) => setGuidelineTag(e.target.value)}
                placeholder="E.g., Surviving Sepsis 2026 Guidelines"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Duration (Minutes)
              </label>
              <input
                type="number"
                min={30}
                max={300}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Timing Selector */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <label className="block text-slate-300 font-bold">
              Broadcast Mode & Start Schedule
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStartTiming('now')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  startTiming === 'now'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Radio size={14} className={startTiming === 'now' ? 'text-rose-400 animate-pulse' : ''} />
                <span>Go Live Now (Take Online Lecture)</span>
              </button>

              <button
                type="button"
                onClick={() => setStartTiming('scheduled')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  startTiming === 'scheduled'
                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Calendar size={14} />
                <span>Schedule for Later</span>
              </button>
            </div>

            {startTiming === 'scheduled' && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Time</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Attachments: Notes & DPP */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="block text-slate-300 font-bold">Lecture Study Materials & DPP</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNotesPdf}
                  onChange={(e) => setIncludeNotesPdf(e.target.checked)}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-0"
                />
                <FileText size={15} className="text-indigo-400" />
                <span className="text-slate-300 font-medium">Auto-Attach Handwritten PDF Notes</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeDpp}
                  onChange={(e) => setIncludeDpp(e.target.checked)}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-0"
                />
                <Award size={15} className="text-amber-400" />
                <span className="text-slate-300 font-medium">Link Daily Practice Paper (DPP 15 Qs)</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition font-semibold"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmit(e, false)}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2"
            >
              <Calendar size={15} />
              Save & Add to Timetable
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-xl font-black transition shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 animate-pulse cursor-pointer"
            >
              <Radio size={16} />
              <span>Take Online Lecture Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
