import React from 'react';
import { 
  Video, 
  HelpCircle, 
  Award, 
  Sparkles, 
  Box, 
  Image, 
  FileText, 
  GitBranch, 
  Calendar, 
  Bookmark, 
  Sliders,
  ChevronRight,
  Radio,
  Tv,
  GraduationCap
} from 'lucide-react';
import { useSync } from '../context/SyncContext';
import { AppUserRole } from '../types/roles';

export type MainTabType = 
  | 'live_classes'
  | 'videos' 
  | 'qbank' 
  | 'tests' 
  | 'magic_module' 
  | '3d_anatomy' 
  | 'treasures' 
  | 'pearls' 
  | 'schemas' 
  | 'planner' 
  | 'notes_binder';

interface SidebarProps {
  activeTab: MainTabType;
  setActiveTab: (tab: MainTabType) => void;
  onOpenCustomModuleBuilder: () => void;
  currentRole?: AppUserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCustomModuleBuilder,
  currentRole = 'student'
}) => {
  const { magicModuleItems, bookmarks, liveClasses } = useSync();

  const activeMistakesCount = magicModuleItems.filter(m => !m.isMastered).length;
  const ongoingLiveCount = liveClasses.filter(c => c.status === 'live').length;

  const navItems: { id: MainTabType; label: string; icon: React.ReactNode; badge?: string | number; badgeColor?: string }[] = [
    { 
      id: 'live_classes', 
      label: 'Live Classes & Batches', 
      icon: <Radio size={17} className="text-rose-400 animate-pulse" />, 
      badge: ongoingLiveCount > 0 ? `${ongoingLiveCount} LIVE` : 'DAILY', 
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse' 
    },
    { id: 'videos', label: 'Video Lectures', icon: <Video size={17} />, badge: '800h', badgeColor: 'bg-indigo-500/20 text-indigo-300' },
    { id: 'qbank', label: 'QBank (18.5k+ MCQs)', icon: <HelpCircle size={17} />, badge: '18.5k', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
    { id: 'tests', label: 'Tests & Grand Tests', icon: <Award size={17} />, badge: '130+ GTs', badgeColor: 'bg-amber-500/20 text-amber-300' },
    { 
      id: 'magic_module', 
      label: 'Magic Module', 
      icon: <Sparkles size={17} />, 
      badge: activeMistakesCount > 0 ? activeMistakesCount : undefined, 
      badgeColor: 'bg-rose-500 text-white' 
    },
    { id: '3d_anatomy', label: '3D Anatomy Lab', icon: <Box size={17} />, badge: '3D', badgeColor: 'bg-cyan-500/20 text-cyan-300' },
    { id: 'treasures', label: 'Treasures (Atlas)', icon: <Image size={17} /> },
    { id: 'pearls', label: 'Pearls Notes', icon: <FileText size={17} /> },
    { id: 'schemas', label: 'Schemas (Flowcharts)', icon: <GitBranch size={17} /> },
    { id: 'planner', label: 'Study Planner & Habit', icon: <Calendar size={17} /> },
    { 
      id: 'notes_binder', 
      label: 'My Notes & Uploads', 
      icon: <Bookmark size={17} />,
      badge: bookmarks.length > 0 ? bookmarks.length : undefined,
      badgeColor: 'bg-slate-800 text-slate-300'
    }
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 p-3 sm:p-4">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
          <span>Student Modules</span>
          <span className="text-[10px] text-indigo-400 font-semibold">19 Subjects</span>
        </div>

        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'}`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom Module Quick Builder Card */}
      <div className="mt-4 pt-4 border-t border-slate-800/80">
        <div className="bg-gradient-to-br from-indigo-950/70 to-slate-950 border border-indigo-500/30 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
            <Sliders size={14} />
            <span>Custom Module Builder</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Generate an adaptive test from any subject, difficulty, or previous mistake tag.
          </p>
          <button
            onClick={onOpenCustomModuleBuilder}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 shadow"
          >
            <span>Create Test</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};
