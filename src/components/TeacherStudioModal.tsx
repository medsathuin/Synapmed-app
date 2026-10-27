import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Radio, 
  PenTool, 
  Eraser, 
  Square, 
  Circle, 
  Type, 
  Trash2, 
  Share2, 
  BarChart2, 
  Users, 
  Pin, 
  MessageSquare, 
  ShieldAlert, 
  Upload, 
  Check, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Volume2,
  FileText
} from 'lucide-react';
import { TeacherProfile } from '../types/roles';
import { INITIAL_LIVE_CHAT_MESSAGES } from '../data/mockLiveClasses';
import { LiveChatMessage } from '../types/liveClass';

interface TeacherStudioModalProps {
  teacher: TeacherProfile;
  batchName: string;
  lectureTitle?: string;
  onClose: () => void;
  onBroadcastAnnouncement?: (msg: string) => void;
  onEndLecture?: () => void;
}

export const TeacherStudioModal: React.FC<TeacherStudioModalProps> = ({
  teacher,
  batchName,
  lectureTitle,
  onClose,
  onBroadcastAnnouncement,
  onEndLecture
}) => {
  // Live Stream Controls
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [viewerCount, setViewerCount] = useState(14820);
  const [activeBoardSlide, setActiveBoardSlide] = useState<'whiteboard' | 'wiggers' | 'sepsis'>('whiteboard');

  // Whiteboard drawing tools
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTool, setActiveTool] = useState<'pen' | 'highlighter' | 'eraser'>('pen');
  const [strokeColor, setStrokeColor] = useState('#EF4444'); // default red medical pen
  const [strokeWidth, setStrokeWidth] = useState(4);

  // Chat moderation
  const [chatList, setChatList] = useState<LiveChatMessage[]>(INITIAL_LIVE_CHAT_MESSAGES);
  const [pinnedMessage, setPinnedMessage] = useState<string>('Welcome students! Solving hemodynamic shock algorithm on the live canvas.');
  const [mutedStudents, setMutedStudents] = useState<string[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');

  // Live Poll Launch tool
  const [pollQuestion, setPollQuestion] = useState('In Septic Shock refractory to fluids, what is the initial drug of choice?');
  const [pollOptions, setPollOptions] = useState(['Dopamine (10 mcg/kg/min)', 'Norepinephrine (titrated)', 'Epinephrine', 'Vasopressin monotherapy']);
  const [isPollLaunched, setIsPollLaunched] = useState(false);
  const [pollTimerSec, setPollTimerSec] = useState(30);
  const [pollResponsesCount, setPollResponsesCount] = useState(0);

  // Upload notes state
  const [isNotesUploaded, setIsNotesUploaded] = useState(false);

  // Canvas Drawing Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill background
    ctx.fillStyle = '#090D16';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw initial sample lecture diagram on canvas
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    // Simple pressure loop or axis
    ctx.moveTo(50, 300);
    ctx.lineTo(650, 300); // X axis
    ctx.moveTo(50, 300);
    ctx.lineTo(50, 50);  // Y axis
    ctx.stroke();

    ctx.fillStyle = '#94A3B8';
    ctx.font = '12px sans-serif';
    ctx.fillText('Ventricular Volume (mL)', 520, 320);
    ctx.fillText('LV Pressure (mmHg)', 20, 40);

    // Pressure curve
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(120, 290);
    ctx.quadraticCurveTo(120, 100, 280, 80);
    ctx.quadraticCurveTo(440, 80, 480, 200);
    ctx.lineTo(480, 290);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = '#EF4444';
    ctx.fillText('Peak Systolic Gradient (120 mmHg)', 230, 70);
  }, [activeBoardSlide]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 'eraser') {
      ctx.strokeStyle = '#090D16';
      ctx.lineWidth = 24;
    } else if (activeTool === 'highlighter') {
      ctx.strokeStyle = strokeColor + '55'; // translucent
      ctx.lineWidth = strokeWidth * 3;
    } else {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#090D16';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleLaunchPoll = () => {
    setIsPollLaunched(true);
    setPollTimerSec(30);
    setPollResponsesCount(0);

    const timer = setInterval(() => {
      setPollTimerSec(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        setPollResponsesCount(c => c + 320);
        return prev - 1;
      });
    }, 1000);
  };

  const handleMuteStudent = (studentName: string) => {
    setMutedStudents(prev => [...prev, studentName]);
    setChatList(prev => prev.filter(c => c.sender !== studentName));
  };

  const handlePinChat = (text: string) => {
    setPinnedMessage(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col text-slate-100 overflow-hidden">
      {/* Teacher Top Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-600 text-white flex items-center gap-1.5 shadow">
              <Radio size={13} />
              LIVE LECTURE STUDIO
            </span>
          </div>

          <div className="hidden sm:block">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>{lectureTitle || 'Live Interactive Clinical Rounds'}</span>
              <span className="text-xs text-indigo-400 font-semibold">• {teacher.name}</span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Batch: <strong className="text-indigo-400">{batchName}</strong> • Real-Time Interactive Classroom
            </p>
          </div>
        </div>

        {/* Live Metrics & Stream Hardware Toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-bold">
            <Users size={14} />
            <span>{viewerCount.toLocaleString()} Doctors Live</span>
          </div>

          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`p-2 rounded-xl border transition cursor-pointer ${isMicOn ? 'bg-slate-800 text-white border-slate-700' : 'bg-rose-950 text-rose-400 border-rose-500'}`}
            title={isMicOn ? 'Mic Live' : 'Mic Muted'}
          >
            {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
          </button>

          <button
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={`p-2 rounded-xl border transition cursor-pointer ${isCameraOn ? 'bg-slate-800 text-white border-slate-700' : 'bg-rose-950 text-rose-400 border-rose-500'}`}
            title={isCameraOn ? 'Camera Live' : 'Camera Off'}
          >
            {isCameraOn ? <Video size={16} /> : <VideoOff size={16} />}
          </button>

          <button
            onClick={() => {
              if (confirm('End live lecture and publish recording? The lecture recording and handwritten notes will automatically be available in the Recorded Classes & Khazana vault!')) {
                setIsLiveStreaming(false);
                if (onEndLecture) {
                  onEndLecture();
                } else {
                  onClose();
                }
              }
            }}
            className="px-4 py-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs rounded-xl shadow-lg transition cursor-pointer"
          >
            End & Publish Recording
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Studio Body: Whiteboard on Left + Moderation & Tools on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
        {/* Interactive Whiteboard Studio */}
        <div className="lg:col-span-8 bg-slate-950 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative">
          {/* Top Whiteboard Toolbar */}
          <div className="bg-slate-900/90 backdrop-blur px-4 py-2.5 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTool('pen')}
                className={`p-2 rounded-lg transition ${activeTool === 'pen' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                title="Pen Tool"
              >
                <PenTool size={16} />
              </button>
              <button
                onClick={() => setActiveTool('highlighter')}
                className={`p-2 rounded-lg transition ${activeTool === 'highlighter' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                title="Highlighter"
              >
                <Sparkles size={16} />
              </button>
              <button
                onClick={() => setActiveTool('eraser')}
                className={`p-2 rounded-lg transition ${activeTool === 'eraser' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                title="Eraser"
              >
                <Eraser size={16} />
              </button>

              <div className="h-5 w-px bg-slate-700 mx-1" />

              {/* Color swatches */}
              {['#EF4444', '#38BDF8', '#10B981', '#F59E0B', '#FFFFFF'].map(c => (
                <button
                  key={c}
                  onClick={() => setStrokeColor(c)}
                  className={`w-6 h-6 rounded-full border-2 transition ${strokeColor === c ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                />
              ))}

              <div className="h-5 w-px bg-slate-700 mx-1" />

              {/* Line Thickness */}
              <input
                type="range"
                min={2}
                max={16}
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="w-20 accent-indigo-500 cursor-pointer"
                title="Stroke Thickness"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearCanvas}
                className="px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-1 text-[11px]"
              >
                <Trash2 size={13} />
                <span>Clear Board</span>
              </button>
            </div>
          </div>

          {/* HTML5 Interactive Drawing Canvas */}
          <div className="flex-1 flex items-center justify-center p-2 relative overflow-hidden bg-slate-950">
            <canvas
              ref={canvasRef}
              width={780}
              height={440}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="border border-slate-800 rounded-xl shadow-2xl cursor-crosshair bg-slate-950 w-full h-full max-h-[460px] object-contain"
            />

            {/* Picture-in-picture Teacher Webcam preview */}
            {isCameraOn && (
              <div className="absolute bottom-4 right-4 w-36 h-28 rounded-xl overflow-hidden border-2 border-indigo-500 shadow-2xl bg-black">
                <img
                  src={teacher.avatarUrl}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-1.5 text-[10px] font-bold text-white bg-slate-900/80 px-1.5 py-0.2 rounded">
                  Faculty Cam
                </div>
              </div>
            )}
          </div>

          {/* Quick Push Live Poll Bar */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <BarChart2 size={15} />
              <span>Interactive Live Poll:</span>
              <span className="text-slate-300 font-normal truncate max-w-sm">"{pollQuestion}"</span>
            </div>

            <button
              onClick={handleLaunchPoll}
              disabled={isPollLaunched && pollTimerSec > 0}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs transition shadow flex items-center gap-1.5 cursor-pointer"
            >
              {isPollLaunched && pollTimerSec > 0 ? `Active (${pollTimerSec}s • ${pollResponsesCount} votes)` : 'Push Poll to Students'}
            </button>
          </div>
        </div>

        {/* Right Panel: Chat Moderation, Doubt Queue, Attendance & Uploads */}
        <div className="lg:col-span-4 bg-slate-900 flex flex-col justify-between overflow-y-auto">
          {/* Moderation Pinned Message */}
          <div className="p-3.5 bg-slate-950/90 border-b border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <Pin size={13} />
                Pinned Message on Student Screens:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={pinnedMessage}
                onChange={(e) => setPinnedMessage(e.target.value)}
                placeholder="Broadcast pinned message to all students..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => alert('Pinned message broadcast to all connected students!')}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow"
              >
                Update
              </button>
            </div>
          </div>

          {/* Live Chat Stream with Faculty Moderation */}
          <div className="p-3 flex-1 overflow-y-auto space-y-2 text-xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 pb-1">
              <span>Live Student Stream ({chatList.length})</span>
              <span>Click student to Mute or Delete</span>
            </div>

            {chatList.map(msg => (
              <div
                key={msg.id}
                className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1 hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{msg.sender}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePinChat(msg.text)}
                      className="text-[10px] text-amber-400 hover:underline"
                    >
                      Pin
                    </button>
                    <button
                      onClick={() => handleMuteStudent(msg.sender)}
                      className="text-[10px] text-rose-400 hover:underline"
                    >
                      Mute
                    </button>
                  </div>
                </div>
                <p className="text-slate-300 leading-snug">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Upload Class Notes & DPP Button strip */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Post-Class Publishing</span>
              {isNotesUploaded && <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><Check size={14} /> Uploaded</span>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsNotesUploaded(true);
                  alert('Handwritten notes PDF compiled from live canvas and shared to students!');
                }}
                className="py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow"
              >
                <Upload size={14} />
                Upload Notes PDF
              </button>

              <button
                onClick={() => alert('DPP #42 question set & answer key linked to this lecture!')}
                className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold flex items-center justify-center gap-1.5"
              >
                <FileText size={14} />
                Publish DPP (15 Qs)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
