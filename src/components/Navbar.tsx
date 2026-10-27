import React, { useState } from 'react';
import { 
  Cloud, 
  CloudOff, 
  RefreshCw, 
  Flame, 
  Clock, 
  Search, 
  Bell, 
  User, 
  Sparkles, 
  ShieldCheck, 
  LogOut, 
  LogIn, 
  Check, 
  X,
  Smartphone,
  Laptop,
  GraduationCap,
  Tv,
  Crown
} from 'lucide-react';
import { useSync } from '../context/SyncContext';
import { TargetExam } from '../types';
import { AppUserRole } from '../types/roles';

interface NavbarProps {
  currentRole: AppUserRole;
  onRoleChange: (role: AppUserRole) => void;
  onSearchSelect?: (query: string) => void;
  onOpenQuestionOfTheDay?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentRole, 
  onRoleChange, 
  onSearchSelect, 
  onOpenQuestionOfTheDay 
}) => {
  const { 
    currentUser, 
    syncStatus, 
    targetExam, 
    setTargetExam, 
    userName, 
    streakCount, 
    studyMinutesToday, 
    loginWithGoogle, 
    logout, 
    triggerDemoSync 
  } = useSync();

  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const targetExams: TargetExam[] = ['NEET-PG', 'INI-CET', 'FMGE'];

  return (
    <>
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        {/* Brand & Target Exam Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  Synapse<span className="text-indigo-400">Med</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  ALL-IN-ONE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-none hidden sm:block">
                800+ Hrs • Live Classes • 18.5k MCQs • GTs • Multi-Device
              </p>
            </div>
          </div>

          {/* Target Exam Switcher (Student Mode) */}
          {currentRole === 'student' && (
            <div className="hidden lg:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {targetExams.map(exam => (
                <button
                  key={exam}
                  onClick={() => setTargetExam(exam)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${targetExam === exam ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {exam}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3-Role Switcher Panel (Primary requested segregation) */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner">
          <button
            onClick={() => onRoleChange('student')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              currentRole === 'student'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <GraduationCap size={15} className={currentRole === 'student' ? 'text-cyan-300' : 'text-slate-400'} />
            <span>Student Portal</span>
          </button>

          <button
            onClick={() => onRoleChange('teacher')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              currentRole === 'teacher'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Tv size={15} className={currentRole === 'teacher' ? 'text-emerald-200' : 'text-slate-400'} />
            <span>Teacher Studio</span>
          </button>

          <button
            onClick={() => onRoleChange('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              currentRole === 'admin'
                ? 'bg-gradient-to-r from-amber-600 to-rose-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Crown size={15} className={currentRole === 'admin' ? 'text-amber-200' : 'text-amber-400/70'} />
            <span>Founder & Admin (Rathod Sathyapal)</span>
          </button>
        </div>

        {/* Right Action Badges & Cloud Sync */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Role Status Badge */}
          {currentRole === 'admin' && (
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-semibold">
              <ShieldCheck size={14} className="text-amber-400" />
              <span>Founder: Rathod Sathyapal</span>
            </div>
          )}

          {currentRole === 'teacher' && (
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Faculty: Dr. Rathod Sathyapal</span>
            </div>
          )}

          {/* Daily Streak (Student mode) */}
          {currentRole === 'student' && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-bold">
              <Flame size={14} className="text-amber-400 animate-pulse" />
              <span>{streakCount}d</span>
            </div>
          )}

          {/* Daily push notification Question of the Day */}
          <button
            onClick={() => setShowNotificationModal(true)}
            className="relative p-2 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Question of the Day & Live Alerts"
          >
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
          </button>

          {/* Device Sync Status Badge */}
          <button
            onClick={() => setShowSyncModal(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              syncStatus === 'synced' 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40' 
                : syncStatus === 'syncing' 
                ? 'bg-indigo-950/40 border-indigo-500/40 text-indigo-300' 
                : 'bg-slate-800 text-slate-400'
            }`}
            title="Cross-device sync details"
          >
            {syncStatus === 'syncing' ? (
              <RefreshCw size={13} className="animate-spin text-indigo-400" />
            ) : syncStatus === 'synced' ? (
              <Cloud size={13} className="text-emerald-400" />
            ) : (
              <CloudOff size={13} className="text-slate-400" />
            )}
            <span className="hidden md:inline">
              {syncStatus === 'syncing' ? 'Syncing...' : syncStatus === 'synced' ? 'Synced (Web+App)' : 'Offline'}
            </span>
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => setShowSyncModal(true)}
            className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center border transition ${
              currentRole === 'admin' 
                ? 'bg-gradient-to-tr from-amber-500 to-rose-600 text-white border-amber-400/40 shadow' 
                : currentRole === 'teacher'
                ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white border-emerald-400/40'
                : 'bg-indigo-600 text-white border-indigo-400/30'
            }`}
            title={currentRole === 'admin' ? 'Rathod Sathyapal (Founder & Director)' : currentRole === 'teacher' ? 'Dr. Rathod Sathyapal' : userName}
          >
            {currentRole === 'admin' ? 'RS' : currentRole === 'teacher' ? 'RS' : (currentUser?.displayName?.[0] || 'D')}
          </button>
        </div>
      </header>

      {/* Cloud Sync & Account Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Cloud size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Cross-Device Cloud Sync</h3>
                  <p className="text-xs text-slate-400">Continuity between Web & Mobile App</p>
                </div>
              </div>
              <button
                onClick={() => setShowSyncModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sync Features Status */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <Laptop size={15} className="text-indigo-400" />
                  <span>Web App & Desktop</span>
                </div>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check size={14} /> Active
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <Smartphone size={15} className="text-indigo-400" />
                  <span>Android & iOS Companion</span>
                </div>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check size={14} /> Synchronized
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-slate-300">
                <div className="font-semibold text-white">Synced Datasets:</div>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-400">
                  <div>• Video Notes & Timecodes</div>
                  <div>• Magic Module Mistakes</div>
                  <div>• Bookmarked MCQs & Pearls</div>
                  <div>• Grand Test Percentiles</div>
                  <div>• Daily Streak & Habits</div>
                  <div>• 19-Subject Study Plan</div>
                </div>
              </div>
            </div>

            {/* Auth Controls */}
            <div className="pt-2">
              {currentUser ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs">
                    <div className="text-slate-400">Authenticated as:</div>
                    <div className="font-bold text-white mt-0.5">{currentUser.displayName || currentUser.email}</div>
                    <div className="text-[11px] text-emerald-400 mt-1">Firebase Firestore Live Connection</div>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-semibold hover:bg-rose-500/20 transition flex items-center justify-center gap-2"
                  >
                    <LogOut size={14} />
                    Sign Out Account
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Sign in with Google to bind your learning progress, test ranks, and notes to your permanent cloud profile.
                  </p>
                  <button
                    onClick={loginWithGoogle}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogIn size={14} />
                    Sign In with Google Account
                  </button>
                  <button
                    onClick={triggerDemoSync}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition"
                  >
                    Force Re-Sync Local Cache
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Daily Notification & Question of the Day Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Bell size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Question of the Day & Daily Pearls</h3>
                  <p className="text-xs text-slate-400">Push notification alert simulation</p>
                </div>
              </div>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Daily Case Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                  Today Question of the Day
                </span>
                <span className="text-[11px] text-slate-400">General Medicine</span>
              </div>
              <h4 className="text-xs font-bold text-white">
                Right Ventricular Infarction: Preload sensitivity & Hemodynamics
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Why is sublingual nitroglycerin strictly contraindicated in acute inferior wall STEMI with ST-elevation in lead V4R? Solve today case to keep your streak!
              </p>
              <button
                onClick={() => {
                  setShowNotificationModal(false);
                  if (onOpenQuestionOfTheDay) onOpenQuestionOfTheDay();
                }}
                className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
              >
                Solve Today Question of the Day (+10 XP)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
