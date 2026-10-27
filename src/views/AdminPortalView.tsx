import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  CreditCard, 
  Layers, 
  Tag, 
  Server, 
  Activity, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  FileSpreadsheet, 
  Lock, 
  Radio, 
  Sparkles, 
  Download, 
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  X,
  Play,
  Calendar
} from 'lucide-react';
import { 
  FOUNDER_INFO, 
  INITIAL_BATCHES, 
  INITIAL_TEACHERS, 
  INITIAL_STUDENTS, 
  INITIAL_COUPONS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_DEVELOPER_SETTINGS 
} from '../data/mockAdminData';
import { BatchItem, TeacherProfile, StudentEnrollment, CouponCode, TransactionRecord, AppDeveloperSettings } from '../types/roles';
import { useSync } from '../context/SyncContext';
import { AddLectureModal } from '../components/AddLectureModal';
import { TeacherStudioModal } from '../components/TeacherStudioModal';

export const AdminPortalView: React.FC = () => {
  const { liveClasses, addLiveLecture, endAndPublishLiveLecture, showToast } = useSync();
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'lectures' | 'batches' | 'teachers' | 'students' | 'coupons' | 'transactions' | 'developer'>('overview');

  // State data
  const [batches, setBatches] = useState<BatchItem[]>(INITIAL_BATCHES);
  const [teachers, setTeachers] = useState<TeacherProfile[]>(INITIAL_TEACHERS);
  const [students, setStudents] = useState<StudentEnrollment[]>(INITIAL_STUDENTS);
  const [coupons, setCoupons] = useState<CouponCode[]>(INITIAL_COUPONS);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(INITIAL_TRANSACTIONS);
  const [devSettings, setDevSettings] = useState<AppDeveloperSettings>(INITIAL_DEVELOPER_SETTINGS);

  // Online Lecture & Live Studio Modals
  const [isAddLectureOpen, setIsAddLectureOpen] = useState(false);
  const [isLiveStudioOpen, setIsLiveStudioOpen] = useState(false);
  const [studioLectureTitle, setStudioLectureTitle] = useState('Founder Grand Rounds: Clinical Cardiology Masterclass');
  const [studioLectureId, setStudioLectureId] = useState<string>('live-med-01');

  // Founder Teacher Profile for Live Studio
  const founderTeacherProfile: TeacherProfile = {
    id: 'founder-rathod',
    name: `Dr. ${FOUNDER_INFO.name} (Founder)`,
    email: FOUNDER_INFO.email,
    subject: 'Clinical Medicine, Cardiology & Medical PG Strategy',
    qualification: FOUNDER_INFO.qualification,
    experienceYears: 16,
    avatarUrl: FOUNDER_INFO.avatar,
    assignedBatches: batches.map(b => b.name),
    totalClassesTaken: 460,
    rating: 4.99,
    status: 'active'
  };

  // New Batch Form Modal
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);
  const [newBatchName, setNewBatchName] = useState('');
  const [newBatchPrice, setNewBatchPrice] = useState(7999);
  const [newBatchExam, setNewBatchExam] = useState<'NEET-PG' | 'INI-CET' | 'FMGE'>('NEET-PG');
  const [newBatchCode, setNewBatchCode] = useState('');

  // New Coupon Form Modal
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(20);

  // Bulk QBank Excel state
  const [isExcelUploading, setIsExcelUploading] = useState(false);

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchName.trim()) return;

    const newB: BatchItem = {
      id: 'batch-' + Date.now(),
      name: newBatchName,
      targetExam: newBatchExam,
      price: newBatchPrice,
      originalPrice: newBatchPrice * 2.5,
      startDate: new Date().toISOString().split('T')[0],
      validityDate: '2027-04-30',
      posterUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      assignedTeachers: ['Dr. Amitav Sen'],
      enrolledStudentsCount: 0,
      totalLectures: 180,
      completedLectures: 0,
      status: 'active',
      batchCode: newBatchCode || 'BATCH' + Math.floor(Math.random() * 900)
    };

    setBatches(prev => [newB, ...prev]);
    setIsAddBatchOpen(false);
    setNewBatchName('');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const newC: CouponCode = {
      id: 'cpn-' + Date.now(),
      code: newCouponCode.toUpperCase(),
      discountType: 'percentage',
      discountValue: newCouponDiscount,
      validTill: '2026-12-31',
      usedCount: 0,
      maxUsage: 25000,
      status: 'active'
    };

    setCoupons(prev => [newC, ...prev]);
    setIsAddCouponOpen(false);
    setNewCouponCode('');
  };

  const handleRefund = (txId: string) => {
    if (confirm('Process full automated refund for this transaction?')) {
      setTransactions(prev => prev.map(t => t.id === txId ? { ...t, status: 'refunded' } : t));
    }
  };

  const handleToggleStudentBan = (id: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'banned' ? 'active' : 'banned' } : s));
  };

  const handleSimulateExcelUpload = () => {
    setIsExcelUploading(true);
    setTimeout(() => {
      setIsExcelUploading(false);
      showToast('Success! 500 High-Yield Clinical MCQs parsed from Excel sheet and merged into live QBank!');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Super Admin & Founder Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border border-amber-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl shrink-0">
              <img src={FOUNDER_INFO.avatar} alt={FOUNDER_INFO.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-black bg-amber-500 text-slate-950 uppercase">
                  SUPER ADMIN & FOUNDER PORTAL
                </span>
                <span className="text-xs text-amber-300 font-bold">Platform Command Center</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Founder: {FOUNDER_INFO.name}
              </h2>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed mt-0.5">
                "{FOUNDER_INFO.mission}"
              </p>
              <div className="flex items-center gap-3 mt-2 text-[11px] text-amber-300/80 font-semibold">
                <span>📧 {FOUNDER_INFO.email}</span>
                <span>•</span>
                <span>{FOUNDER_INFO.qualification}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => {
                setStudioLectureTitle(`Clinical Cardiology Grand Rounds • Conducted by Dr. ${FOUNDER_INFO.name}`);
                setIsLiveStudioOpen(true);
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs rounded-xl shadow-lg shadow-rose-600/30 transition flex items-center gap-1.5 cursor-pointer animate-pulse whitespace-nowrap"
            >
              <Radio size={15} />
              <span>Take Online Lecture Now</span>
            </button>

            <button
              onClick={() => setIsAddLectureOpen(true)}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 shadow transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={15} />
              <span>Add Lecture</span>
            </button>

            <button
              onClick={() => setIsAddBatchOpen(true)}
              className="px-3.5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={15} />
              <span>New Batch</span>
            </button>

            <button
              onClick={() => setIsAddCouponOpen(true)}
              className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
            >
              <Tag size={15} />
              <span>Coupon</span>
            </button>
          </div>
        </div>

        {/* Global Executive KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400">Course Fees Collected:</div>
            <div className="text-xl font-black text-emerald-400 mt-0.5">
              ₹ {transactions.filter(t => t.status === "successful").reduce((acc, t) => acc + t.amount, 0).toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
              <ArrowUpRight size={12} /> 100% Self-Funded & Direct
            </span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400">Doctors Mentored:</div>
            <div className="text-xl font-black text-indigo-400 mt-0.5">
              {batches.reduce((sum, b) => sum + b.enrolledStudentsCount, 0)} Aspirants
            </div>
            <span className="text-[10px] text-indigo-300">Across NEET-PG & INI-CET</span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400">Clinical Lectures Delivered:</div>
            <div className="text-xl font-black text-amber-400 mt-0.5">
              {batches.reduce((sum, b) => sum + b.completedLectures, 0)} Lectures
            </div>
            <span className="text-[10px] text-amber-300">100% Dr. Rathod Sathyapal</span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400">Platform Video Architecture:</div>
            <div className="text-xl font-black text-cyan-400 mt-0.5">Native In-App</div>
            <span className="text-[10px] text-cyan-300">Direct CDN • Zero YouTube</span>
          </div>
        </div>
      </div>

      {/* Admin Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'overview', label: 'Executive Dashboard' },
          { id: 'lectures', label: `Live & Scheduled Lectures (${liveClasses.length})` },
          { id: 'batches', label: `Batches Manager (${batches.length})` },
          { id: 'teachers', label: `Teacher Staffing (${teachers.length})` },
          { id: 'students', label: `Student Registry (${students.length})` },
          { id: 'coupons', label: `Coupons (${coupons.length})` },
          { id: 'transactions', label: `Payment Gateway & Refunds (${transactions.length})` },
          { id: 'developer', label: 'Developer & DRM Options' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveAdminTab(t.id as any)}
            className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${activeAdminTab === t.id ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB: LIVE & SCHEDULED LECTURES (FOUNDER CONTROL) */}
      {activeAdminTab === 'lectures' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Radio size={18} className="text-rose-400 animate-pulse" />
                Live Broadcasts & Scheduled Lectures
              </h3>
              <p className="text-xs text-slate-400">
                Manage all online lectures delivered by Dr. {FOUNDER_INFO.name} and clinical faculty.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddLectureOpen(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition cursor-pointer"
              >
                <Plus size={14} />
                Add New Lecture
              </button>
              <button
                onClick={() => {
                  setStudioLectureTitle(`Live Clinical Rounds • Dr. ${FOUNDER_INFO.name}`);
                  setIsLiveStudioOpen(true);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition cursor-pointer animate-pulse"
              >
                <Radio size={14} />
                Go Live Now
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveClasses.map((lecture) => (
              <div
                key={lecture.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3.5 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase flex items-center gap-1 ${
                        lecture.status === 'live' 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse' 
                          : lecture.status === 'upcoming'
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {lecture.status === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />}
                        {lecture.status === 'live' ? 'LIVE NOW' : lecture.status === 'upcoming' ? 'SCHEDULED' : 'RECORDED'}
                      </span>
                      <span className="text-[11px] text-slate-400">{lecture.subject}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">{lecture.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Faculty: <strong className="text-slate-200">{lecture.faculty}</strong> • Batch: <span className="text-indigo-400">{lecture.batchName}</span>
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Timing:</span>
                    <span className="text-slate-300 font-semibold">{lecture.timing}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Active Attendance:</span>
                    <span className="text-emerald-400 font-bold">{lecture.viewerCount > 0 ? `${lecture.viewerCount.toLocaleString()} Doctors` : '0 Attended'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
                  <span className="text-[11px] text-slate-400">
                    {lecture.classNotesPages > 0 ? `📄 ${lecture.classNotesPages}p Notes` : 'Notes pending'} • {lecture.dppQuestionCount > 0 ? `🎯 DPP (${lecture.dppQuestionCount} Qs)` : 'No DPP'}
                  </span>

                  <div className="flex items-center gap-2">
                    {lecture.status === 'live' ? (
                      <button
                        onClick={() => {
                          setStudioLectureTitle(lecture.title);
                          setStudioLectureId(lecture.id);
                          setIsLiveStudioOpen(true);
                        }}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow cursor-pointer"
                      >
                        <Radio size={13} />
                        Take Live Lecture
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setStudioLectureTitle(lecture.title);
                          setStudioLectureId(lecture.id);
                          setIsLiveStudioOpen(true);
                        }}
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                      >
                        <Play size={13} />
                        Launch Studio
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 1: OVERVIEW & BULK ACTIONS */}
      {activeAdminTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Bulk Excel QBank Upload Tool */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={20} className="text-emerald-400" />
                <h3 className="text-base font-bold text-white">Bulk QBank Excel / CSV Uploader</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                Test Engine Tool
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload spreadsheets formatted with question stem, 4 choices, correct answer, clinical vignette flag, and detailed explanations to instantly ingest 1,000+ MCQs.
            </p>

            <div
              onClick={handleSimulateExcelUpload}
              className="p-6 rounded-xl border-2 border-dashed border-slate-800 hover:border-emerald-500 bg-slate-950/60 text-center space-y-2 cursor-pointer transition"
            >
              <FileSpreadsheet size={32} className="mx-auto text-emerald-400" />
              <div className="text-xs font-bold text-white">
                {isExcelUploading ? 'Ingesting Excel Data...' : 'Drop Question Bank Excel File here or Browse'}
              </div>
              <p className="text-[11px] text-slate-500">Supports .xlsx, .csv (Schema v2)</p>
            </div>
          </div>

          {/* Live Notification Force Broadcast */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio size={20} className="text-rose-400" />
                <h3 className="text-base font-bold text-white">Global Push Alert to All Devices</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">
                1.28M Devices
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Send immediate breaking clinical updates or emergency live class alerts to both mobile app and web clients via Firebase Cloud Messaging.
            </p>

            <div className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="Alert Title (e.g., Live Class Starting in 5 Minutes!)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
              <button
                onClick={() => showToast('Push notification broadcast to 1,284,500 active devices!')}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold shadow transition cursor-pointer"
              >
                Broadcast Push Notification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BATCHES MANAGER */}
      {activeAdminTab === 'batches' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">All Platform Batches ({batches.length})</h3>
            <button
              onClick={() => setIsAddBatchOpen(true)}
              className="px-3.5 py-1.5 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold"
            >
              + Add Batch
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {batches.map(b => (
              <div key={b.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                    {b.targetExam}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">₹ {b.price.toLocaleString()}</span>
                </div>

                <h4 className="text-sm font-bold text-white line-clamp-1">{b.name}</h4>
                <div className="text-xs text-slate-400">Batch Code: <strong className="text-white">{b.batchCode}</strong></div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div>
                    <div className="text-[10px] text-slate-500">Enrolled</div>
                    <div className="font-bold text-white">{b.enrolledStudentsCount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">Lectures</div>
                    <div className="font-bold text-indigo-400">{b.completedLectures}/{b.totalLectures}</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  Teachers: {b.assignedTeachers.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TEACHERS STAFFING */}
      {activeAdminTab === 'teachers' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Assigned Faculty Staff ({teachers.length})</h3>
            <button
              onClick={() => showToast('Add faculty form: Enter name, subject, qualification, and assign to batch.')}
              className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
            >
              + Onboard Teacher
            </button>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Faculty Member</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Qualification</th>
                  <th className="py-3 px-4">Classes Taken</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {teachers.map(t => (
                  <tr key={t.id} className="hover:bg-slate-850">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <img src={t.avatarUrl} alt={t.name} className="w-7 h-7 rounded-full object-cover" />
                      <span>{t.name}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{t.subject}</td>
                    <td className="py-3 px-4 text-slate-400">{t.qualification}</td>
                    <td className="py-3 px-4 font-bold text-indigo-400">{t.totalClassesTaken}</td>
                    <td className="py-3 px-4 font-bold text-amber-400">★ {t.rating}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => showToast(`Reassigning ${t.name} to batches...`)}
                        className="text-xs text-indigo-400 hover:underline mr-2"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: STUDENTS REGISTRY */}
      {activeAdminTab === 'students' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Enrolled Students & Device Inspection</h3>
            <span className="text-xs text-slate-400">1.28M Total Students</span>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Doctor Student</th>
                  <th className="py-3 px-4">Phone / Email</th>
                  <th className="py-3 px-4">Target</th>
                  <th className="py-3 px-4">Attendance</th>
                  <th className="py-3 px-4">Active Devices</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {students.map(s => (
                  <tr key={s.id} className="hover:bg-slate-850">
                    <td className="py-3 px-4 font-bold text-white">{s.name}</td>
                    <td className="py-3 px-4 text-slate-400">{s.phone}</td>
                    <td className="py-3 px-4 text-slate-300">{s.targetExam}</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">{s.attendancePercent}%</td>
                    <td className="py-3 px-4 text-slate-400">{s.activeDevices.join(', ')}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                        {s.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStudentBan(s.id)}
                        className={`text-xs font-semibold ${s.status === 'banned' ? 'text-emerald-400' : 'text-rose-400 hover:underline'}`}
                      >
                        {s.status === 'banned' ? 'Unban' : 'Ban User'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: COUPONS */}
      {activeAdminTab === 'coupons' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Promotional Discount Coupons</h3>
            <button
              onClick={() => setIsAddCouponOpen(true)}
              className="px-3.5 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
            >
              + Create Coupon
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {coupons.map(cpn => (
              <div key={cpn.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-sm text-amber-400">{cpn.code}</span>
                  <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    {cpn.status}
                  </span>
                </div>
                <div className="text-white font-bold">
                  {cpn.discountType === 'percentage' ? `${cpn.discountValue}% OFF` : `₹${cpn.discountValue} FLAT OFF`}
                </div>
                <div className="text-slate-400 text-[11px]">
                  Redeemed: {cpn.usedCount.toLocaleString()} / {cpn.maxUsage.toLocaleString()} times
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: TRANSACTIONS & REFUNDS */}
      {activeAdminTab === 'transactions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Payment Gateway Ledger & Instant Refunds</h3>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Doctor Candidate</th>
                  <th className="py-3 px-4">Batch</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Gateway</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-850">
                    <td className="py-3 px-4 font-mono text-slate-400">{tx.id}</td>
                    <td className="py-3 px-4 font-bold text-white">{tx.studentName}</td>
                    <td className="py-3 px-4 text-slate-300">{tx.batchName}</td>
                    <td className="py-3 px-4 font-black text-emerald-400">₹ {tx.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-400">{tx.paymentGateway}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tx.status === 'successful' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                        {tx.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {tx.status === 'successful' && (
                        <button
                          onClick={() => handleRefund(tx.id)}
                          className="text-xs text-rose-400 hover:underline font-semibold"
                        >
                          Process Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: DEVELOPER & DRM */}
      {activeAdminTab === 'developer' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl max-w-2xl space-y-4 text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Server size={18} className="text-cyan-400" />
            Platform Developer Options & DRM Security
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">App Version Release Control</div>
                <div className="text-[11px] text-slate-400">Current Production Build: {devSettings.appVersion}</div>
              </div>
              <button
                onClick={() => showToast('New release v4.3.1 deployed to App Store & Google Play!')}
                className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-bold"
              >
                Push Update
              </button>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Widevine / FairPlay DRM Video Encryption</div>
                <div className="text-[11px] text-slate-400">Prevents screen recording and unauthorized downloading</div>
              </div>
              <button
                onClick={() => setDevSettings(prev => ({ ...prev, drmVideoEncryption: !prev.drmVideoEncryption }))}
                className={`px-3 py-1 rounded-lg font-bold ${devSettings.drmVideoEncryption ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                {devSettings.drmVideoEncryption ? 'DRM Active' : 'DRM Disabled'}
              </button>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">CDN Cloud Storage Utilization</span>
                <span className="text-cyan-400 font-bold">{devSettings.cdnStorageUsedGb} GB / {devSettings.cdnStorageTotalGb} GB</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400"
                  style={{ width: `${(devSettings.cdnStorageUsedGb / devSettings.cdnStorageTotalGb) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Batch Modal */}
      {isAddBatchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateBatch} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Create New Batch</h3>
              <button onClick={() => setIsAddBatchOpen(false)} className="text-slate-400 hover:text-white"><X size={16} /></button>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Batch Name</label>
              <input
                type="text"
                required
                value={newBatchName}
                onChange={(e) => setNewBatchName(e.target.value)}
                placeholder="E.g., Super 100 Clinical Batch 2027"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Target Exam</label>
                <select
                  value={newBatchExam}
                  onChange={(e) => setNewBatchExam(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  <option value="NEET-PG">NEET-PG</option>
                  <option value="INI-CET">INI-CET</option>
                  <option value="FMGE">FMGE</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={newBatchPrice}
                  onChange={(e) => setNewBatchPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow"
            >
              Publish Batch to App
            </button>
          </form>
        </div>
      )}

      {/* Add Coupon Modal */}
      {isAddCouponOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateCoupon} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Generate Discount Coupon</h3>
              <button onClick={() => setIsAddCouponOpen(false)} className="text-slate-400 hover:text-white"><X size={16} /></button>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Coupon Code</label>
              <input
                type="text"
                required
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value)}
                placeholder="E.g., SATHYAPAL or RATHOD50"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white uppercase font-mono"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Discount %</label>
              <input
                type="number"
                value={newCouponDiscount}
                onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow"
            >
              Save & Activate Coupon
            </button>
          </form>
        </div>
      )}
      {/* Add Lecture Modal */}
      {isAddLectureOpen && (
        <AddLectureModal
          defaultFacultyName={`Dr. ${FOUNDER_INFO.name} (Founder)`}
          defaultBatchName={batches[0]?.name || 'Super 100 Live Clinical PG Batch'}
          onClose={() => setIsAddLectureOpen(false)}
          onSaveLecture={(newLecture, startImmediately) => {
            addLiveLecture(newLecture);
            setIsAddLectureOpen(false);
            setStudioLectureTitle(newLecture.title);
            setStudioLectureId(newLecture.id);
            if (startImmediately) {
              setIsLiveStudioOpen(true);
            } else {
              showToast(`Lecture "${newLecture.title}" successfully scheduled by Founder Dr. ${FOUNDER_INFO.name} and added to batch calendar!`);
            }
          }}
        />
      )}

      {/* Live Studio Modal (Taking Online Lecture as Founder) */}
      {isLiveStudioOpen && (
        <TeacherStudioModal
          teacher={founderTeacherProfile}
          batchName={batches[0]?.name || 'Super 100 Live Clinical PG Batch'}
          lectureTitle={studioLectureTitle}
          onClose={() => setIsLiveStudioOpen(false)}
          onEndLecture={() => {
            endAndPublishLiveLecture(studioLectureId);
            setIsLiveStudioOpen(false);
            showToast(`Founder Lecture "${studioLectureTitle}" finished and automatically published to the Recorded Classes & Khazana repository for all students!`);
          }}
        />
      )}
    </div>
  );
};
