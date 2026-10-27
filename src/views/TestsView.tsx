import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Clock, 
  Users, 
  Play, 
  BarChart3, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Filter,
  Medal,
  TrendingUp,
  FileText
} from 'lucide-react';
import { TestSeriesItem, TestCategory } from '../types';
import { MOCK_TESTS, MOCK_LEADERBOARD } from '../data/mockTests';
import { useSync } from '../context/SyncContext';

interface TestsViewProps {
  onStartTest: (test: TestSeriesItem, isExamMode: boolean) => void;
}

export const TestsView: React.FC<TestsViewProps> = ({ onStartTest }) => {
  const { testAttempts } = useSync();

  const [activeTab, setActiveTab] = useState<'tests' | 'leaderboard' | 'analytics'>('tests');
  const [selectedCategory, setSelectedCategory] = useState<TestCategory | 'all'>('all');

  const livePanIndiaMock = MOCK_TESTS.find(t => t.id === 'gt-live-pan-india') || MOCK_TESTS[0];

  const filteredTests = MOCK_TESTS.filter(t => {
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Pan-India Mock Hero Live Banner */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-indigo-950/70 border border-amber-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white flex items-center gap-1.5 animate-pulse shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                LIVE PAN-INDIA MOCK
              </span>
              <span className="text-xs text-amber-300 font-semibold">1,24,850+ Registered Doctors</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {livePanIndiaMock.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Experience the exact high-fidelity test engine with 200 questions, 3.5 hour countdown, negative marking (-1), real-time All India Rank (AIR), and State ranking curve.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onStartTest(livePanIndiaMock, true)}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-xl shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Play size={16} fill="currentColor" />
              Start Live Pan-India Mock
            </button>
          </div>
        </div>

        {/* Pan-India Mock Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <div>
            <div className="text-slate-400">Total Duration:</div>
            <div className="text-sm font-bold text-white mt-0.5">3h 30m (210 mins)</div>
          </div>
          <div>
            <div className="text-slate-400">Total Marks:</div>
            <div className="text-sm font-bold text-white mt-0.5">800 Marks (+4 / -1)</div>
          </div>
          <div>
            <div className="text-slate-400">All-India Avg Score:</div>
            <div className="text-sm font-bold text-indigo-400 mt-0.5">432 / 800</div>
          </div>
          <div>
            <div className="text-slate-400">Top Score:</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">748 / 800</div>
          </div>
        </div>
      </div>

      {/* Main Tab Controls: Tests vs Leaderboard vs Analytics */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'tests' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            390+ Tests Library
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'leaderboard' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Pan-India Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            My Performance Analytics ({testAttempts.length})
          </button>
        </div>
      </div>

      {/* TAB 1: 390+ Tests Library */}
      {activeTab === 'tests' && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
            {[
              { id: 'all', label: 'All 390+ Tests' },
              { id: 'Grand Test', label: '130+ Grand Tests (GTs)' },
              { id: 'Subject Test', label: 'Subject Tests (19)' },
              { id: 'Previous Year', label: 'Previous Year Papers' },
              { id: 'Daily Quiz', label: 'Daily Booster Quizzes' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${selectedCategory === cat.id ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Test Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTests.map(testItem => (
              <div
                key={testItem.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition shadow-xl flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {testItem.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {testItem.examFormat}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {testItem.title}
                  </h3>

                  <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div>
                      <div className="text-[10px] uppercase font-semibold text-slate-500">Questions</div>
                      <div className="font-bold text-white mt-0.5">{testItem.questionCount} Qs</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-semibold text-slate-500">Duration</div>
                      <div className="font-bold text-white mt-0.5">{testItem.durationMinutes} mins</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-semibold text-slate-500">Candidates</div>
                      <div className="font-bold text-indigo-400 mt-0.5">{testItem.participantsCount.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onStartTest(testItem, false)}
                    className="px-3.5 py-1.5 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                  >
                    Practice Mode
                  </button>

                  <button
                    onClick={() => onStartTest(testItem, true)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-indigo-600/30 cursor-pointer"
                  >
                    <Play size={13} fill="currentColor" />
                    Start Exam
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Pan-India Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Medal size={18} className="text-amber-400" />
                All India National Rankers - Grand Test 2026
              </h3>
              <p className="text-xs text-slate-400">1,24,850+ participating doctors evaluated across all states</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Live National Standings
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">AIR Rank</th>
                  <th className="py-3 px-4">Doctor Candidate</th>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Percentile</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Speed / Q</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {MOCK_LEADERBOARD.map(ranker => (
                  <tr key={ranker.rank} className="hover:bg-slate-850/50 transition">
                    <td className="py-3 px-4 font-bold">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${ranker.rank === 1 ? 'bg-amber-400 text-slate-950 font-black' : ranker.rank === 2 ? 'bg-slate-300 text-slate-950 font-black' : ranker.rank === 3 ? 'bg-amber-700 text-white font-black' : 'text-slate-400'}`}>
                        #{ranker.rank}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-white">{ranker.name}</td>
                    <td className="py-3 px-4 text-slate-300">{ranker.state}</td>
                    <td className="py-3 px-4 font-black text-emerald-400">{ranker.score} / 800</td>
                    <td className="py-3 px-4 font-bold text-indigo-400">{ranker.percentile}%</td>
                    <td className="py-3 px-4 text-slate-200">{ranker.accuracy}%</td>
                    <td className="py-3 px-4 text-slate-400 font-mono">{ranker.timePerQ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: My Performance Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {testAttempts.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <BarChart3 size={40} className="text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-white">No Test Attempts Logged Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Attempt any Grand Test, Subject Test, or Custom Module to generate your comprehensive percentile curve and weak area spider breakdown.
              </p>
            </div>
          ) : (
            testAttempts.map(attempt => (
              <div
                key={attempt.attemptId}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-400">{attempt.date}</span>
                    <h3 className="text-lg font-bold text-white">{attempt.testTitle}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Percentile</div>
                      <div className="text-xl font-black text-indigo-400">{attempt.percentile}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">All India Rank</div>
                      <div className="text-xl font-black text-amber-400">#{attempt.allIndiaRank.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Subject-wise breakdown bars */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Subject Accuracy Breakdown
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {attempt.subjectWiseBreakdown.map((s, idx) => (
                      <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-white">{s.subject}</span>
                          <span className={`font-bold ${s.accuracy >= 75 ? 'text-emerald-400' : s.accuracy >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                            {s.accuracy}% ({s.correct}/{s.total})
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${s.accuracy >= 75 ? 'bg-emerald-500' : s.accuracy >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${s.accuracy}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
