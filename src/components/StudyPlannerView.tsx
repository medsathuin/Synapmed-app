import React, { useState } from 'react';
import { 
  Calendar, 
  Flame, 
  Clock, 
  Target, 
  CheckCircle2, 
  Circle, 
  TrendingUp, 
  Sparkles, 
  BookOpen, 
  Bell, 
  ChevronRight,
  Award
} from 'lucide-react';
import { useSync } from '../context/SyncContext';
import { MEDICAL_SUBJECTS } from '../data/subjects';

export const StudyPlannerView: React.FC = () => {
  const { streakCount, studyMinutesToday, totalQuestionsSolved, targetExam } = useSync();

  const [dailyGoalHours, setDailyGoalHours] = useState(6);
  const [examTargetDate, setExamTargetDate] = useState('2027-03-05');
  const [activePhase, setActivePhase] = useState<'phase1' | 'phase2' | 'phase3'>('phase1');
  const [completedSubjectIds, setCompletedSubjectIds] = useState<string[]>(['anatomy', 'physiology', 'pathology']);

  // Calculate days remaining
  const daysRemaining = Math.max(0, Math.ceil((new Date(examTargetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  const toggleSubjectComplete = (subId: string) => {
    setCompletedSubjectIds(prev => 
      prev.includes(subId) ? prev.filter(id => id !== subId) : [...prev, subId]
    );
  };

  // Calendar streak heatmap simulation (last 14 days)
  const daysList = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return {
      dayStr: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      isCompleted: true, // 14-day streak active
      minutes: 180 + Math.floor(Math.sin(i) * 50)
    };
  });

  return (
    <div className="space-y-6">
      {/* Target Exam Countdown & Habit Tracker Strip */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Target size={14} />
              {targetExam} Target Countdown
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {daysRemaining} Days to Exam Day
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Exam Target Date: <strong className="text-white">{examTargetDate}</strong> • Comprehensive 19 Subjects Master Plan
            </p>
          </div>

          {/* Daily Streak & Daily Goal Metrics */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-xs uppercase">
                <Flame size={16} className="animate-bounce" />
                Streak
              </div>
              <div className="text-2xl font-black text-white mt-1">
                {streakCount} Days
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">Active Streak</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-indigo-400 font-bold text-xs uppercase">
                <Clock size={16} />
                Today Study
              </div>
              <div className="text-2xl font-black text-white mt-1">
                {(studyMinutesToday / 60).toFixed(1)} hrs
              </div>
              <span className="text-[10px] text-slate-400">Goal: {dailyGoalHours} hrs/day</span>
            </div>
          </div>
        </div>

        {/* 14-Day Streak Heatmap */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-300">
            <span className="font-semibold flex items-center gap-1.5">
              <Flame size={14} className="text-amber-400" />
              14-Day Consistent Study Streak
            </span>
            <span className="text-slate-400">100% On-Track</span>
          </div>

          <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
            {daysList.map((day, i) => (
              <div
                key={i}
                className="bg-slate-950/70 border border-emerald-500/30 rounded-xl p-2 text-center"
              >
                <div className="text-[10px] text-slate-400 font-medium">{day.dayStr}</div>
                <div className="text-xs font-bold text-white mt-0.5">{day.dateNum}</div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mx-auto mt-1.5 shadow-sm shadow-emerald-500/50" />
                <div className="text-[9px] text-slate-400 mt-1">{Math.round(day.minutes / 60)}h</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3-Phase Comprehensive Study Roadmap */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen size={18} className="text-indigo-400" />
            19 Subjects Master Preparation Timeline
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Standard medical PG curriculum partitioned into 3 sequential mastery phases:
          </p>
        </div>

        {/* Phase selector tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            onClick={() => setActivePhase('phase1')}
            className={`p-4 rounded-xl border cursor-pointer transition ${activePhase === 'phase1' ? 'bg-indigo-950/60 border-indigo-500 text-white shadow' : 'bg-slate-950/50 border-slate-800 text-slate-400'}`}
          >
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Phase 1 (Month 1-4)</div>
            <div className="text-sm font-bold text-white mt-1">First Reading & Video Concepts</div>
            <p className="text-xs text-slate-400 mt-1">Complete 800+ hours video lectures and QBank modules for all 19 subjects.</p>
          </div>

          <div
            onClick={() => setActivePhase('phase2')}
            className={`p-4 rounded-xl border cursor-pointer transition ${activePhase === 'phase2' ? 'bg-indigo-950/60 border-indigo-500 text-white shadow' : 'bg-slate-950/50 border-slate-800 text-slate-400'}`}
          >
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Phase 2 (Month 5-6)</div>
            <div className="text-sm font-bold text-white mt-1">Revision 1 & Magic Module Retest</div>
            <p className="text-xs text-slate-400 mt-1">Re-solve all incorrect MCQs, memorize Pearls and high-yield Schemas.</p>
          </div>

          <div
            onClick={() => setActivePhase('phase3')}
            className={`p-4 rounded-xl border cursor-pointer transition ${activePhase === 'phase3' ? 'bg-indigo-950/60 border-indigo-500 text-white shadow' : 'bg-slate-950/50 border-slate-800 text-slate-400'}`}
          >
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Phase 3 (Month 7-8)</div>
            <div className="text-sm font-bold text-white mt-1">Rapid Revision & Grand Tests</div>
            <p className="text-xs text-slate-400 mt-1">Weekly Pan-India Grand Tests, Treasures image atlas, and last-minute RR videos.</p>
          </div>
        </div>

        {/* Subject completion checklist for current phase */}
        <div>
          <div className="flex items-center justify-between mb-3 text-xs text-slate-300">
            <span className="font-bold uppercase tracking-wider text-slate-400">
              Subject Tracking Checklist ({completedSubjectIds.length} / 19 Completed)
            </span>
            <span className="text-indigo-400 font-semibold">
              {Math.round((completedSubjectIds.length / 19) * 100)}% Syllabus Covered
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800 mb-4">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${(completedSubjectIds.length / 19) * 100}%` }}
            />
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MEDICAL_SUBJECTS.map(sub => {
              const isCompleted = completedSubjectIds.includes(sub.id);
              return (
                <div
                  key={sub.id}
                  onClick={() => toggleSubjectComplete(sub.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${isCompleted ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' : 'bg-slate-950/50 border-slate-800/80 text-slate-300 hover:border-slate-700'}`}
                >
                  <div className="flex items-center gap-2.5">
                    {isCompleted ? (
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    ) : (
                      <Circle size={18} className="text-slate-600 shrink-0" />
                    )}
                    <div>
                      <div className="text-xs font-bold text-white">{sub.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {sub.totalHours} hrs video • {sub.totalMCQs} MCQs • Weight: {sub.highYieldWeightage}%
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">{sub.shortName}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
