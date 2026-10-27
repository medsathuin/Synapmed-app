import React, { useState } from 'react';
import { X, ThumbsUp, Send, Bot, MessageSquare, Sparkles, UserCheck } from 'lucide-react';
import { MCQ, QuestionComment } from '../types';
import { useSync } from '../context/SyncContext';

interface QuestionDiscussionModalProps {
  question: MCQ;
  onClose: () => void;
}

export const QuestionDiscussionModal: React.FC<QuestionDiscussionModalProps> = ({ question, onClose }) => {
  const { comments, postComment, upvoteComment, userName } = useSync();
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questionComments = comments[question.id] || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setIsSubmitting(true);
    await postComment(question.id, commentText.trim(), 'Student');
    setCommentText('');
    setIsSubmitting(false);
  };

  const handleAskAIMentor = async () => {
    const prompt = `Why is option ${question.options.find(o => o.id === question.correctOptionId)?.text.slice(0, 30)}... the correct clinical choice, and what is the typical trap in this question?`;
    await postComment(question.id, prompt, 'Student');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <MessageSquare size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Clinical Doubt & Discussion Forum
              </h3>
              <p className="text-xs text-slate-400">
                {question.subject} • {question.chapter}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Stem summary preview */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800/80">
          <p className="text-xs text-slate-300 font-medium line-clamp-2 italic">
            "{question.stem}"
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-emerald-400 font-semibold">
              Correct Answer: {question.options.find(o => o.id === question.correctOptionId)?.text}
            </span>
            <button
              onClick={handleAskAIMentor}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
            >
              <Sparkles size={13} />
              Ask AI Mentor why
            </button>
          </div>
        </div>

        {/* Comment Thread */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3.5">
          {questionComments.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <MessageSquare className="mx-auto text-slate-600" size={32} />
              <p className="text-xs text-slate-400 font-medium">No doubts posted yet. Be the first to start the discussion!</p>
            </div>
          ) : (
            questionComments.map(comment => (
              <div
                key={comment.id}
                className={`p-3.5 rounded-xl border transition ${comment.isAiResponse ? 'bg-indigo-950/30 border-indigo-500/40' : 'bg-slate-950/50 border-slate-800/80'}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    {comment.isAiResponse ? (
                      <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow">
                        <Bot size={14} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center">
                        {comment.authorName[0]}
                      </div>
                    )}
                    <span className="text-xs font-bold text-white">
                      {comment.authorName}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${comment.authorRole === 'AI Medical Mentor' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : comment.authorRole === 'Faculty' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                      {comment.authorRole}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{comment.createdAt}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pl-8">
                  {comment.text}
                </p>

                <div className="mt-2.5 pl-8 flex items-center gap-4 text-xs text-slate-400">
                  <button
                    onClick={() => upvoteComment(question.id, comment.id)}
                    className="flex items-center gap-1 hover:text-indigo-400 transition"
                  >
                    <ThumbsUp size={13} />
                    <span>{comment.upvotes} Helpful</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Reply input */}
        <form onSubmit={handleSubmit} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Post your clinical doubt or insight... (AI Mentor answers automatically)"
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!commentText.trim() || isSubmitting}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow"
          >
            <Send size={13} />
            <span>Post</span>
          </button>
        </form>
      </div>
    </div>
  );
};
