import React, { useState } from 'react';
import { 
  Radio, 
  Video, 
  Upload, 
  FileText, 
  HelpCircle, 
  Users, 
  BarChart3, 
  Bell, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  Clock, 
  Plus, 
  Play,
  Share2
} from 'lucide-react';
import { TeacherProfile } from '../types/roles';
import { INITIAL_TEACHERS } from '../data/mockAdminData';
import { CURRENT_BATCH } from '../data/mockLiveClasses';
import { TeacherStudioModal } from '../components/TeacherStudioModal';
import { AddLectureModal } from '../components/AddLectureModal';
import { useSync } from '../context/SyncContext';

export const TeacherPortalView: React.FC = () => {
  const { addLiveLecture, endAndPublishLiveLecture } = useSync();
  const [activeTeacher, setActiveTeacher] = useState<TeacherProfile>(INITIAL_TEACHERS[0]);
  const [isLiveStudioOpen, setIsLiveStudioOpen] = useState(false);
  const [isAddLectureOpen, setIsAddLectureOpen] = useState(false);
  const [currentLectureTitle, setCurrentLectureTitle] = useState('Cardiology & Sepsis Resuscitation Masterclass');
  const [currentLectureId, setCurrentLectureId] = useState<string>('live-med-01');
  const [activeTab, setActiveTab] = useState<'batches' | 'doubts' | 'upload_materials' | 'create_test' | 'attendance' | 'announcements'>('batches');

  // Create Test Form state
  const [testTitle, setTestTitle] = useState('Cardiology & Sepsis Weekly Booster Test');
  const [testQuestionsCount, setTestQuestionsCount] = useState(25);
  const [testDurationMins, setTestDurationMins] = useState(30);
  const [testNegativeMarking, setTestNegativeMarking] = useState(true);
  const [isTestCreated, setIsTestCreated] = useState(false);

  // Announcement state
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcastSent, setIsBroadcastSent] = useState(false);

  // Doubts queue
  const [doubtsQueue, setDoubtsQueue] = useState([
    {
      id: 'd-1',
      studentName: 'Dr. Ananya Swaminathan',
      question: 'Sir, in cardiogenic shock with pulmonary edema, do we start Dobutamine before or after Norepinephrine?',
      subject: 'General Medicine',
      status: 'pending',
      time: '25m ago'
    },
    {
      id: 'd-2',
      studentName: 'Dr. Rohan Mehra',
      question: 'Why does Lead V4R ST elevation disappear within 10-12 hours in RVMI while inferior leads persist?',
      subject: 'Cardiology',
      status: 'answered',
      time: '1h ago',
      solutionVideo: 'Uploaded (3m 40s)'
    }
  ]);

  const [answeringDoubtId, setAnsweringDoubtId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    setIsBroadcastSent(true);
    setTimeout(() => {
      setIsBroadcastSent(false);
      setBroadcastMessage('');
    }, 2500);
  };

  const handleResolveDoubt = (id: string) => {
    setDoubtsQueue(prev => prev.map(d => d.id === id ? { ...d, status: 'answered', solutionVideo: 'Video Walkthrough Uploaded' } : d));
    setAnsweringDoubtId(null);
    setReplyText('');
  };

  const handleSaveLecture = (newLecture: any, startImmediately: boolean) => {
    addLiveLecture(newLecture);
    setIsAddLectureOpen(false);
    setCurrentLectureTitle(newLecture.title);
    setCurrentLectureId(newLecture.id);
    if (startImmediately) {
      setIsLiveStudioOpen(true);
    } else {
      alert(`Lecture "${newLecture.title}" successfully scheduled and added to the batch timetable!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Teacher Profile Header Hero */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-xl shrink-0">
              <img src={activeTeacher.avatarUrl} alt={activeTeacher.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Faculty Panel
                </span>
                <span className="text-xs text-amber-400 font-bold">★ {activeTeacher.rating} Rating</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white mt-1">{activeTeacher.name}</h2>
              <p className="text-xs text-slate-300">
                {activeTeacher.qualification} • {activeTeacher.experienceYears} Years Clinical & PG Teaching Experience
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsAddLectureOpen(true)}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 shadow-lg flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus size={15} />
              <span>Add / Schedule Lecture</span>
            </button>

            <button
              onClick={() => {
                setCurrentLectureTitle('Live Clinical Rounds: Sepsis & RV Infarction Protocol');
                setIsLiveStudioOpen(true);
              }}
              className="px-6 py-3.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs rounded-xl shadow-xl shadow-rose-600/30 flex items-center gap-2 transition cursor-pointer whitespace-nowrap animate-pulse"
            >
              <Radio size={16} />
              <span>TAKE ONLINE LECTURE NOW</span>
            </button>
          </div>
        </div>

        {/* Faculty quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <div>
            <div className="text-slate-400">Assigned Batches:</div>
            <div className="text-sm font-bold text-white mt-0.5">{activeTeacher.assignedBatches.length} Batches Active</div>
          </div>
          <div>
            <div className="text-slate-400">Total Live Classes Delivered:</div>
            <div className="text-sm font-bold text-indigo-400 mt-0.5">{activeTeacher.totalClassesTaken} Classes</div>
          </div>
          <div>
            <div className="text-slate-400">Doubts Pending Resolution:</div>
            <div className="text-sm font-bold text-amber-400 mt-0.5">
              {doubtsQueue.filter(d => d.status === 'pending').length} In Queue
            </div>
          </div>
          <div>
            <div className="text-slate-400">Active Batch Enrollees:</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">42,850 Doctors</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'batches', label: 'My Batches' },
          { id: 'doubts', label: `Assigned Doubts (${doubtsQueue.filter(d => d.status === 'pending').length})` },
          { id: 'create_test', label: 'Create Test & DPP' },
          { id: 'upload_materials', label: 'Upload Notes & Slides' },
          { id: 'attendance', label: 'Student Attendance & Analytics' },
          { id: 'announcements', label: 'Batch Announcements' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: MY BATCHES */}
      {activeTab === 'batches' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeTeacher.assignedBatches.map((bName, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  Primary Faculty
                </span>
                <span className="text-xs text-slate-400">Batch Code: SUPER100</span>
              </div>

              <h3 className="text-base font-bold text-white">{bName}</h3>
              <p className="text-xs text-slate-400">
                Live interactive clinical sessions, daily DPP reviews, and weekly grand test walkthroughs.
              </p>

              <div className="grid grid-cols-3 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <div className="text-[10px] text-slate-500">Students</div>
                  <div className="font-bold text-white">42,850</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Completed</div>
                  <div className="font-bold text-emerald-400">168 / 240</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Attendance</div>
                  <div className="font-bold text-indigo-400">92.4%</div>
                </div>
              </div>

              <button
                onClick={() => setIsLiveStudioOpen(true)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow"
              >
                <Radio size={14} />
                <span>Launch Live Class Studio</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: ASSIGNED DOUBTS */}
      {activeTab === 'doubts' && (
        <div className="space-y-3">
          {doubtsQueue.map(dbt => (
            <div key={dbt.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                    {dbt.subject}
                  </span>
                  <span className="text-xs font-bold text-white">{dbt.studentName}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${dbt.status === 'answered' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                  {dbt.status === 'answered' ? 'Resolved' : 'Pending Response'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                "{dbt.question}"
              </p>

              {dbt.status === 'answered' && dbt.solutionVideo && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 size={14} />
                  <span>{dbt.solutionVideo} provided to student profile.</span>
                </div>
              )}

              {dbt.status === 'pending' && (
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  {answeringDoubtId === dbt.id ? (
                    <div className="space-y-2">
                      <textarea
                        rows={3}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type faculty clinical response..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                      />
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => alert('Camera activated: Recording 2-minute clinical video walkthrough...')}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Video size={13} />
                          Record Video Solution
                        </button>
                        <button
                          onClick={() => handleResolveDoubt(dbt.id)}
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                        >
                          Submit Answer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAnsweringDoubtId(dbt.id)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow"
                    >
                      Answer Doubt
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: CREATE TEST & DPP */}
      {activeTab === 'create_test' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl max-w-2xl space-y-5">
          <div className="flex items-center gap-2.5">
            <Award size={20} className="text-indigo-400" />
            <div>
              <h3 className="text-base font-bold text-white">Create Test / Daily Practice Test (DPP)</h3>
              <p className="text-xs text-slate-400">Publish scheduled tests with negative marking and auto-ranking</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Test Title</label>
              <input
                type="text"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Question Count</label>
                <input
                  type="number"
                  value={testQuestionsCount}
                  onChange={(e) => setTestQuestionsCount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  value={testDurationMins}
                  onChange={(e) => setTestDurationMins(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-300 font-medium">NEET-PG Negative Marking (+4 / -1)</span>
              <button
                onClick={() => setTestNegativeMarking(!testNegativeMarking)}
                className={`px-3 py-1 rounded-lg font-bold text-xs ${testNegativeMarking ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                {testNegativeMarking ? 'Enabled (-1)' : 'Disabled'}
              </button>
            </div>

            <button
              onClick={() => {
                setIsTestCreated(true);
                setTimeout(() => setIsTestCreated(false), 3000);
              }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isTestCreated ? <CheckCircle2 size={16} /> : <Plus size={16} />}
              <span>{isTestCreated ? 'Test Published to Batch!' : 'Publish Test to Students'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: UPLOAD MATERIALS */}
      {activeTab === 'upload_materials' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl max-w-2xl space-y-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Upload size={18} className="text-indigo-400" />
            Upload Class Notes & Video Solutions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div
              onClick={() => alert('File picker opened: Select Handwritten Faculty Notes PDF...')}
              className="p-5 rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500 text-center space-y-2 cursor-pointer bg-slate-950/60 transition"
            >
              <FileText size={24} className="mx-auto text-indigo-400" />
              <div className="font-bold text-white">Upload Class Notes PDF</div>
              <p className="text-[11px] text-slate-400">PDF generated from live board</p>
            </div>

            <div
              onClick={() => alert('File picker opened: Select DPP Video Solution MP4...')}
              className="p-5 rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500 text-center space-y-2 cursor-pointer bg-slate-950/60 transition"
            >
              <Video size={24} className="mx-auto text-emerald-400" />
              <div className="font-bold text-white">Upload Video Solution</div>
              <p className="text-[11px] text-slate-400">Video walkthrough for DPP</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: STUDENT ATTENDANCE */}
      {activeTab === 'attendance' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users size={18} className="text-emerald-400" />
              Student Live Attendance Registry
            </h3>
            <span className="text-xs text-indigo-400 font-bold">Class Average: 92.4%</span>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Contact</th>
                  <th className="py-2.5 px-3">Attendance %</th>
                  <th className="py-2.5 px-3">Tests Solved</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-850">
                  <td className="py-2.5 px-3 font-bold text-white">Dr. Rohan Mehra</td>
                  <td className="py-2.5 px-3 text-slate-400">+91 98765 43210</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">96.5% (Present)</td>
                  <td className="py-2.5 px-3 text-slate-300">48 Tests</td>
                  <td className="py-2.5 px-3 text-emerald-400">Active</td>
                </tr>
                <tr className="hover:bg-slate-850">
                  <td className="py-2.5 px-3 font-bold text-white">Dr. Ananya Swaminathan</td>
                  <td className="py-2.5 px-3 text-slate-400">+91 98451 23456</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">94.2% (Present)</td>
                  <td className="py-2.5 px-3 text-slate-300">52 Tests</td>
                  <td className="py-2.5 px-3 text-emerald-400">Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl max-w-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Bell size={18} className="text-amber-400" />
            Broadcast Batch Notification
          </h3>
          <p className="text-xs text-slate-400">
            Sends an instant push notification and Telegram alert to all 42,850 enrolled batch students.
          </p>

          <form onSubmit={handleSendAnnouncement} className="space-y-3 text-xs">
            <textarea
              rows={4}
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="E.g., Tomorrow's Surgery Masterclass starts promptly at 8:00 AM. Bring Bailey & Love chapter 71 notes!"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
            />
            <button
              type="submit"
              disabled={!broadcastMessage.trim()}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-bold flex items-center gap-2 shadow"
            >
              <Send size={14} />
              <span>{isBroadcastSent ? 'Broadcast Sent to All Devices!' : 'Send Push Message'}</span>
            </button>
          </form>
        </div>
      )}

      {/* Add Lecture Modal */}
      {isAddLectureOpen && (
        <AddLectureModal
          defaultFacultyName={activeTeacher.name}
          defaultBatchName={CURRENT_BATCH.name}
          onClose={() => setIsAddLectureOpen(false)}
          onSaveLecture={handleSaveLecture}
        />
      )}

      {/* Interactive Live Studio Modal (Taking Online Lecture) */}
      {isLiveStudioOpen && (
        <TeacherStudioModal
          teacher={activeTeacher}
          batchName={CURRENT_BATCH.name}
          lectureTitle={currentLectureTitle}
          onClose={() => setIsLiveStudioOpen(false)}
          onEndLecture={() => {
            endAndPublishLiveLecture(currentLectureId);
            setIsLiveStudioOpen(false);
            alert(`Live lecture "${currentLectureTitle}" concluded! The full recording, live chat transcript, and handwritten whiteboard notes are now published to all enrolled doctors.`);
          }}
        />
      )}
    </div>
  );
};
