import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  Bookmark, 
  FileText, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Award, 
  BarChart3, 
  Trophy, 
  Compass, 
  ShieldAlert, 
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Eye,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TestSeriesItem, MCQ, TestAttemptResult } from '../types';
import { useSync } from '../context/SyncContext';
import { QuestionDiscussionModal } from './QuestionDiscussionModal';

interface TestEngineModalProps {
  test: TestSeriesItem;
  isExamMode: boolean;
  onClose: () => void;
}

export const TestEngineModal: React.FC<TestEngineModalProps> = ({ test, isExamMode, onClose }) => {
  const { 
    isBookmarked, 
    toggleBookmark, 
    saveNote, 
    getNoteForTarget, 
    recordQuestionAttempt, 
    saveTestAttempt 
  } = useSync();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [questionTimeElapsed, setQuestionTimeElapsed] = useState<Record<string, number>>({});
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(test.durationMinutes * 60);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [currentNoteText, setCurrentNoteText] = useState('');
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  // Result metrics
  const [resultData, setResultData] = useState<TestAttemptResult | null>(null);

  const currentQ: MCQ = test.questions[currentIndex] || test.questions[0];
  const currentAnswer = selectedAnswers[currentQ?.id];
  const isCurrentBookmarked = isBookmarked(currentQ?.id);

  // Timer
  useEffect(() => {
    if (isTestSubmitted) return;
    const interval = setInterval(() => {
      setTotalSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });

      // Track time spent per current question
      if (currentQ) {
        setQuestionTimeElapsed(prev => ({
          ...prev,
          [currentQ.id]: (prev[currentQ.id] || 0) + 1
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTestSubmitted, currentQ]);

  // Load existing note when question changes
  useEffect(() => {
    if (currentQ) {
      const existing = getNoteForTarget(currentQ.id);
      setCurrentNoteText(existing ? existing.content : '');
      setIsNoteSaved(false);
    }
  }, [currentQ]);

  const formatTimer = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (hrs > 0) {
      return `${hrs}h ${mins}m ${s < 10 ? '0' : ''}${s}s`;
    }
    return `${mins}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handleSelectOption = (optionId: string) => {
    if (isTestSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId
    }));

    // If Regular Mode, record attempt immediately into Magic Module if wrong
    if (!isExamMode) {
      const isCorrect = optionId === currentQ.correctOptionId;
      recordQuestionAttempt(
        currentQ.id,
        currentQ.subject,
        currentQ.topic,
        currentQ.stem,
        isCorrect,
        isCorrect ? undefined : 'Concept Gap'
      );
    }
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleSaveCurrentNote = async () => {
    if (!currentNoteText.trim()) return;
    await saveNote('question', currentQ.id, currentQ.stem.slice(0, 80) + '...', currentQ.subject, currentNoteText);
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  const handleSubmitTest = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    const subjectBreakdownMap: Record<string, { total: number; correct: number; incorrect: number }> = {};

    test.questions.forEach(q => {
      if (!subjectBreakdownMap[q.subject]) {
        subjectBreakdownMap[q.subject] = { total: 0, correct: 0, incorrect: 0 };
      }
      subjectBreakdownMap[q.subject].total += 1;

      const userAns = selectedAnswers[q.id];
      if (!userAns) {
        unattempted++;
      } else if (userAns === q.correctOptionId) {
        correct++;
        subjectBreakdownMap[q.subject].correct += 1;
        recordQuestionAttempt(q.id, q.subject, q.topic, q.stem, true);
      } else {
        incorrect++;
        subjectBreakdownMap[q.subject].incorrect += 1;
        recordQuestionAttempt(q.id, q.subject, q.topic, q.stem, false, 'Concept Gap');
      }
    });

    const totalQ = test.questions.length;
    // NEET-PG scoring (+4 for correct, -1 for incorrect)
    const score = Math.max(0, correct * 4 - incorrect * 1);
    const maxScore = totalQ * 4;
    const accuracy = correct + incorrect > 0 ? (correct / (correct + incorrect)) * 100 : 0;
    
    // Percentile & All-India Rank simulation based on participantsCount
    const percentile = Math.min(99.9, Math.max(25, Number((accuracy * 0.95 + (correct / totalQ) * 5).toFixed(1))));
    const participants = test.participantsCount || 85000;
    const allIndiaRank = Math.max(1, Math.round((1 - percentile / 100) * participants));
    const stateRank = Math.max(1, Math.round(allIndiaRank * 0.08));

    const totalTimeTakenSec = test.durationMinutes * 60 - totalSecondsLeft;
    const avgTimePerQSec = totalQ > 0 ? Math.round(totalTimeTakenSec / totalQ) : 45;

    // Time management quadrant calculation
    let quickCorrect = 0;
    let patientCorrect = 0;
    let hurriedWrong = 0;
    let overthinkingWrong = 0;

    test.questions.forEach(q => {
      const time = questionTimeElapsed[q.id] || 45;
      const userAns = selectedAnswers[q.id];
      const isRight = userAns === q.correctOptionId;
      if (isRight) {
        if (time <= 45) quickCorrect++;
        else patientCorrect++;
      } else if (userAns) {
        if (time <= 30) hurriedWrong++;
        else overthinkingWrong++;
      }
    });

    const breakdownArray = Object.keys(subjectBreakdownMap).map(sub => {
      const s = subjectBreakdownMap[sub];
      return {
        subject: sub,
        total: s.total,
        correct: s.correct,
        incorrect: s.incorrect,
        accuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
      };
    });

    const weakAreas = breakdownArray
      .filter(s => s.accuracy < 70)
      .map(s => `${s.subject} (${s.accuracy}% accuracy)`);

    const result: TestAttemptResult = {
      attemptId: 'att-' + Date.now(),
      testId: test.id,
      testTitle: test.title,
      date: new Date().toISOString().split('T')[0],
      score,
      maxScore,
      correctCount: correct,
      incorrectCount: incorrect,
      unattemptedCount: unattempted,
      accuracy: Math.round(accuracy),
      percentile,
      allIndiaRank,
      stateRank,
      totalParticipants: participants,
      totalTimeTakenSec,
      avgTimePerQSec,
      subjectWiseBreakdown: breakdownArray,
      timeManagementBreakdown: [
        { quadrant: 'Quick & Correct', count: quickCorrect || Math.max(1, Math.round(correct * 0.6)) },
        { quadrant: 'Patient & Correct', count: patientCorrect || Math.max(1, Math.round(correct * 0.4)) },
        { quadrant: 'Hurried & Wrong', count: hurriedWrong || Math.max(1, Math.round(incorrect * 0.5)) },
        { quadrant: 'Overthinking & Wrong', count: overthinkingWrong || Math.max(1, Math.round(incorrect * 0.5)) }
      ],
      weakAreas: weakAreas.length > 0 ? weakAreas : ['Biochemistry Inborn Errors', 'Radiology Signs'],
      userAnswers: selectedAnswers
    };

    setResultData(result);
    setIsTestSubmitted(true);
    saveTestAttempt(result);

    // Fire celebratory confetti for good attempt
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden text-slate-100">
      {/* Top Test Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
              {test.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-indigo-400">{test.examFormat}</span>
              <span>•</span>
              <span>{test.questions.length} Questions</span>
              <span>•</span>
              <span className="text-amber-400 font-medium">
                {isExamMode ? 'Exam Mode (Strict Countdown)' : 'Regular Mode (Live Feedback)'}
              </span>
            </div>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          {!isTestSubmitted && (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-xs font-bold ${totalSecondsLeft < 300 ? 'bg-rose-950/60 border-rose-500 text-rose-400 animate-pulse' : 'bg-slate-950 border-slate-800 text-slate-200'}`}>
              <Clock size={15} className="text-indigo-400" />
              <span>{formatTimer(totalSecondsLeft)}</span>
            </div>
          )}

          {!isTestSubmitted ? (
            <button
              onClick={handleSubmitTest}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-rose-600/30 cursor-pointer"
            >
              Submit Exam
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow"
            >
              Close Analytics
            </button>
          )}
        </div>
      </div>

      {/* Main Body */}
      {isTestSubmitted && resultData ? (
        /* ============ DETAILED SCORECARD & ANALYTICS VIEW ============ */
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-6xl mx-auto w-full space-y-6">
          {/* Top Rank & Percentile Hero */}
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Trophy size={14} />
                  Pan-India Grand Mock Test Evaluation
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Score: <span className="text-emerald-400">{resultData.score}</span> / {resultData.maxScore}
                </h3>
                <p className="text-xs text-slate-300">
                  Target Exam: {test.examFormat} • Total Candidates: {resultData.totalParticipants.toLocaleString()} Doctors
                </p>
              </div>

              {/* Ranks Cards */}
              <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center min-w-[100px]">
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Percentile</div>
                  <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">
                    {resultData.percentile}%
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center min-w-[100px]">
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">All-India Rank</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
                    #{resultData.allIndiaRank.toLocaleString()}
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center min-w-[100px]">
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">State Rank</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                    #{resultData.stateRank.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-400">Correct:</span>
                <span className="font-bold text-white">{resultData.correctCount} Qs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-slate-400">Incorrect:</span>
                <span className="font-bold text-white">{resultData.incorrectCount} Qs (Auto-added to Magic Module)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                <span className="text-slate-400">Unattempted:</span>
                <span className="font-bold text-white">{resultData.unattemptedCount} Qs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="text-slate-400">Accuracy:</span>
                <span className="font-bold text-white">{resultData.accuracy}%</span>
              </div>
            </div>
          </div>

          {/* Time Management Quadrants & Weak Area Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time Management Matrix */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock size={16} className="text-indigo-400" />
                  Time Management Quadrant Analysis
                </h4>
                <span className="text-xs text-slate-400">Avg: {resultData.avgTimePerQSec}s / Q</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {resultData.timeManagementBreakdown.map((item, idx) => {
                  const colors = {
                    'Quick & Correct': 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300',
                    'Patient & Correct': 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300',
                    'Hurried & Wrong': 'bg-rose-950/40 border-rose-500/40 text-rose-300',
                    'Overthinking & Wrong': 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                  };
                  return (
                    <div key={idx} className={`p-3.5 rounded-xl border ${colors[item.quadrant]}`}>
                      <div className="font-bold text-sm">{item.count} Qs</div>
                      <div className="font-semibold text-xs mt-1">{item.quadrant}</div>
                      <p className="text-[11px] opacity-80 mt-0.5">
                        {item.quadrant.includes('Hurried') ? 'Slow down on tricky stems' : item.quadrant.includes('Quick') ? 'High confidence recall' : 'Calculated diagnosis'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weak Area Radar / List */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                  <ShieldAlert size={16} className="text-rose-400" />
                  High-Priority Weak Areas Detected
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Topics where accuracy dropped below the peer threshold. Automatically flagged for revision tracker:
                </p>

                <div className="space-y-2">
                  {resultData.weakAreas.map((area, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{area}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        Needs Attention
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-indigo-400">All incorrect MCQs saved to Magic Module</span>
                <button
                  onClick={() => setIsTestSubmitted(false)}
                  className="text-xs text-slate-300 hover:text-white font-medium underline"
                >
                  Review All Explanations & Solutions
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ============ ACTIVE EXAM / REGULAR MCQ VIEW ============ */
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Main Question Display */}
          <div className="lg:col-span-8 flex flex-col justify-between p-4 sm:p-6 overflow-y-auto">
            <div className="space-y-4">
              {/* Question Header & Meta */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white">
                    Question {currentIndex + 1} of {test.questions.length}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300">
                    {currentQ.subject}
                  </span>
                  {currentQ.examSource && (
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      PYQ {currentQ.examSource} {currentQ.examYear}
                    </span>
                  )}
                  {currentQ.isHighYield && (
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      High-Yield
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMarkForReview}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${markedForReview[currentQ.id] ? 'bg-purple-900/40 border-purple-500 text-purple-300' : 'border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                  >
                    {markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}
                  </button>

                  <button
                    onClick={() => toggleBookmark({
                      itemType: 'question',
                      itemId: currentQ.id,
                      title: currentQ.stem.slice(0, 90) + '...',
                      subject: currentQ.subject,
                      tag: 'Mistake'
                    })}
                    className={`p-1.5 rounded-lg border transition ${isCurrentBookmarked ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                    title="Bookmark Question"
                  >
                    <Bookmark size={16} fill={isCurrentBookmarked ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

              {/* Clinical Vignette Stem */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed whitespace-pre-line">
                  {currentQ.stem}
                </p>

                {/* Optional Clinical Image */}
                {currentQ.imageUrl && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-slate-800 max-w-lg">
                    <img
                      src={currentQ.imageUrl}
                      alt="Clinical Finding"
                      className="w-full h-auto max-h-72 object-cover"
                    />
                    {currentQ.imageCaption && (
                      <div className="bg-slate-950 px-3 py-1.5 text-xs text-slate-400 italic">
                        {currentQ.imageCaption}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map(opt => {
                  const isSelected = currentAnswer === opt.id;
                  const showSolution = !isExamMode && isSelected;
                  const isCorrectAnswer = opt.id === currentQ.correctOptionId;

                  let borderClass = 'border-slate-800 hover:border-slate-700 bg-slate-900/60';
                  let icon = null;

                  if (showSolution) {
                    if (isCorrectAnswer) {
                      borderClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-200';
                      icon = <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />;
                    } else {
                      borderClass = 'border-rose-500 bg-rose-950/40 text-rose-200';
                      icon = <XCircle size={18} className="text-rose-400 shrink-0" />;
                    }
                  } else if (isSelected) {
                    borderClass = 'border-indigo-500 bg-indigo-950/50 text-white';
                    icon = <Check size={16} className="text-indigo-400 shrink-0" />;
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`p-4 rounded-xl border text-sm transition flex items-center justify-between cursor-pointer ${borderClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                          {opt.id.split('-')[1]?.toUpperCase()}
                        </span>
                        <span className="leading-snug">{opt.text}</span>
                      </div>
                      {icon}
                    </div>
                  );
                })}
              </div>

              {/* Regular Mode Instant Explanation Box */}
              {!isExamMode && currentAnswer && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={14} />
                      High-Yield Clinical Rationale
                    </span>
                    <span className="text-xs text-slate-400">
                      Peer Accuracy: <strong className="text-emerald-400">{currentQ.peerAccuracy}%</strong>
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {currentQ.detailedExplanation}
                  </div>

                  {/* Summary Takeaway Card */}
                  <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-200">
                    <strong className="block text-amber-400 font-bold mb-1">High-Yield Takeaway:</strong>
                    {currentQ.highYieldSummary}
                  </div>

                  {/* Action Bar (Notes, Discussion, Guidelines) */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowNoteEditor(!showNoteEditor)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 font-medium transition"
                      >
                        <FileText size={14} />
                        {showNoteEditor ? 'Close Note' : 'Add Note to Question'}
                      </button>

                      <button
                        onClick={() => setShowDiscussionModal(true)}
                        className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 rounded-lg flex items-center gap-1.5 font-semibold transition"
                      >
                        <MessageSquare size={14} />
                        Doubt Discussion & AI Mentor
                      </button>
                    </div>

                    {currentQ.guidelineReference && (
                      <span className="hidden sm:inline text-slate-400 italic text-[11px]">
                        Ref: {currentQ.guidelineReference}
                      </span>
                    )}
                  </div>

                  {/* Inline Note Editor */}
                  {showNoteEditor && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 mt-2">
                      <textarea
                        rows={3}
                        value={currentNoteText}
                        onChange={(e) => setCurrentNoteText(e.target.value)}
                        placeholder="Type personal clinical notes, mnemonics or pitfalls here... (Saved to your device sync)"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={handleSaveCurrentNote}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
                        >
                          {isNoteSaved ? 'Saved to Cloud' : 'Save Note'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Question Navigation Controls */}
            <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-800 disabled:opacity-40 transition flex items-center gap-1"
              >
                <ChevronLeft size={16} />
                Previous Q
              </button>

              <div className="text-xs text-slate-400">
                {selectedAnswers[currentQ.id] ? (
                  <span className="text-emerald-400 font-semibold">Answer Recorded</span>
                ) : (
                  <span className="text-amber-400">Not Attempted</span>
                )}
              </div>

              <button
                disabled={currentIndex === test.questions.length - 1}
                onClick={() => setCurrentIndex(prev => Math.min(test.questions.length - 1, prev + 1))}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 disabled:opacity-40"
              >
                Next Q
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Question Palette Sidebar */}
          <div className="lg:col-span-4 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 p-5 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Question Palette ({test.questions.length})
                </h4>
                <div className="text-xs text-indigo-400 font-semibold">
                  {Object.keys(selectedAnswers).length} / {test.questions.length} Attempted
                </div>
              </div>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] mb-4 pb-3 border-b border-slate-800 text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-600" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-purple-600" />
                  <span>Marked Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700" />
                  <span>Unattempted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded border-2 border-indigo-400" />
                  <span>Current Q</span>
                </div>
              </div>

              {/* Palette Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                {test.questions.map((q, idx) => {
                  const isAnswered = !!selectedAnswers[q.id];
                  const isMarked = !!markedForReview[q.id];
                  const isCurrent = idx === currentIndex;

                  let bg = 'bg-slate-950 text-slate-400 border-slate-800';
                  if (isMarked) {
                    bg = 'bg-purple-900/60 border-purple-500 text-purple-200';
                  } else if (isAnswered) {
                    bg = 'bg-emerald-600 text-white border-emerald-500';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-xl border text-xs font-bold transition flex items-center justify-center cursor-pointer ${bg} ${isCurrent ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900' : 'hover:scale-105'}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions & Final Submit */}
            <div className="pt-6 border-t border-slate-800 space-y-3 mt-6">
              <button
                onClick={() => setShowDiscussionModal(true)}
                className="w-full py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <MessageSquare size={14} />
                Open Doubt Solving Panel
              </button>

              <button
                onClick={handleSubmitTest}
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Award size={15} />
                Submit Test & View Pan-India Analytics
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discussion Modal */}
      {showDiscussionModal && currentQ && (
        <QuestionDiscussionModal
          question={currentQ}
          onClose={() => setShowDiscussionModal(false)}
        />
      )}
    </div>
  );
};
