import React, { useState } from 'react';
import { SyncProvider } from './context/SyncContext';
import { Navbar } from './components/Navbar';
import { Sidebar, MainTabType } from './components/Sidebar';
import { VideoSectionView } from './views/VideoSectionView';
import { QBankView } from './views/QBankView';
import { TestsView } from './views/TestsView';
import { MagicModuleView } from './components/MagicModuleView';
import { Anatomy3DLab } from './components/Anatomy3DLab';
import { TreasuresView } from './views/TreasuresView';
import { PearlsView } from './views/PearlsView';
import { SchemasView } from './views/SchemasView';
import { StudyPlannerView } from './components/StudyPlannerView';
import { NotesBinderView } from './views/NotesBinderView';
import { LiveClassesView } from './views/LiveClassesView';
import { TeacherPortalView } from './views/TeacherPortalView';
import { AdminPortalView } from './views/AdminPortalView';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { TestEngineModal } from './components/TestEngineModal';
import { CustomModuleBuilderModal } from './components/CustomModuleBuilderModal';
import { LiveClassRoomModal } from './components/LiveClassRoomModal';
import { VideoLecture, TestSeriesItem, MCQ } from './types';
import { LiveClassSession } from './types/liveClass';
import { AppUserRole } from './types/roles';
import { MOCK_VIDEOS } from './data/mockVideos';
import { MOCK_MCQS } from './data/mockQBank';
import { MOCK_LIVE_CLASSES } from './data/mockLiveClasses';

function MainApp() {
  // Role segregation: student | teacher | admin
  const [currentRole, setCurrentRole] = useState<AppUserRole>('student');
  const [activeTab, setActiveTab] = useState<MainTabType>('live_classes');
  
  // Modals state
  const [activeVideo, setActiveVideo] = useState<VideoLecture | null>(null);
  const [activeTest, setActiveTest] = useState<{ test: TestSeriesItem; isExamMode: boolean } | null>(null);
  const [isCustomModuleBuilderOpen, setIsCustomModuleBuilderOpen] = useState(false);
  const [labInitialModel, setLabInitialModel] = useState<any>('circle_of_willis');

  // Live Class Room & PiP Floating Window state
  const [activeLiveSession, setActiveLiveSession] = useState<LiveClassSession | null>(null);
  const [isLivePipMode, setIsLivePipMode] = useState(false);

  const handleStartTest = (test: TestSeriesItem, isExamMode: boolean) => {
    setActiveTest({ test, isExamMode });
  };

  const handleOpen3DLabWithModel = (modelType?: string) => {
    if (modelType) {
      setLabInitialModel(modelType);
    }
    setActiveTab('3d_anatomy');
  };

  const handleOpenQuestionOfTheDay = () => {
    const qotd = MOCK_MCQS[0];
    const singleQTest: TestSeriesItem = {
      id: 'qotd-' + Date.now(),
      title: 'Question of the Day: Clinical Scenario',
      category: 'Daily Quiz',
      questionCount: 1,
      durationMinutes: 3,
      totalMarks: 4,
      examFormat: 'NEET-PG',
      participantsCount: 54000,
      avgScore: 3,
      topScore: 4,
      status: 'Live',
      questions: [qotd]
    };
    handleStartTest(singleQTest, false);
  };

  const handleLaunchDppTest = (dppId: string) => {
    // Generate DPP test from QBank
    const dppQuestions = MOCK_MCQS.slice(0, 5);
    const dppTestItem: TestSeriesItem = {
      id: dppId || 'dpp-session-' + Date.now(),
      title: 'Daily Practice Paper (DPP) • Live Lecture Assessment',
      category: 'Subject Test',
      questionCount: dppQuestions.length,
      durationMinutes: 15,
      totalMarks: dppQuestions.length * 4,
      examFormat: 'NEET-PG',
      participantsCount: 12400,
      avgScore: 14,
      topScore: 20,
      status: 'Live',
      questions: dppQuestions
    };
    setActiveTest({ test: dppTestItem, isExamMode: true });
  };

  const handleNavigateToItem = (itemType: string, itemId: string) => {
    if (itemType === 'video') {
      const vid = MOCK_VIDEOS.find(v => v.id === itemId);
      if (vid) setActiveVideo(vid);
    } else if (itemType === 'question') {
      const q = MOCK_MCQS.find(m => m.id === itemId) || MOCK_MCQS[0];
      handleStartTest({
        id: 'nav-test-' + Date.now(),
        title: `Bookmarked MCQ: ${q.subject}`,
        category: 'Custom Module',
        questionCount: 1,
        durationMinutes: 3,
        totalMarks: 4,
        examFormat: 'NEET-PG',
        participantsCount: 1,
        avgScore: 0,
        topScore: 4,
        status: 'Available',
        questions: [q]
      }, false);
    } else if (itemType === 'pearl') {
      setActiveTab('pearls');
    } else if (itemType === 'treasure') {
      setActiveTab('treasures');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar with 3-Role Switcher */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={(role) => setCurrentRole(role)}
        onOpenQuestionOfTheDay={handleOpenQuestionOfTheDay}
      />

      {/* RENDER ROLE-SPECIFIC APPLICATION VIEW */}
      {currentRole === 'teacher' ? (
        // TEACHER SIDE: Live Studio, Batch assignments, DPPs, Doubts, Attendance
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <TeacherPortalView />
          </div>
        </main>
      ) : currentRole === 'admin' ? (
        // OWNER / FOUNDER / DEVELOPER / ADMIN PANEL (Rathod Sathyapal)
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <AdminPortalView />
          </div>
        </main>
      ) : (
        // STUDENT SIDE: Live Classes, 19 Subjects, 800+ Hrs Videos, QBank, Tests, Magic Module, etc.
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Navigation Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenCustomModuleBuilder={() => setIsCustomModuleBuilderOpen(true)}
            currentRole={currentRole}
          />

          {/* Viewport Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950">
            <div className="max-w-7xl mx-auto">
              {activeTab === 'live_classes' && (
                <LiveClassesView
                  onEnterLiveClass={(session) => {
                    setActiveLiveSession(session);
                    setIsLivePipMode(false);
                  }}
                  onLaunchDppTest={handleLaunchDppTest}
                />
              )}

              {activeTab === 'videos' && (
                <VideoSectionView
                  onSelectVideo={(video) => setActiveVideo(video)}
                  onOpen3DLab={handleOpen3DLabWithModel}
                />
              )}

              {activeTab === 'qbank' && (
                <QBankView
                  onStartTest={handleStartTest}
                  onOpenCustomModuleBuilder={() => setIsCustomModuleBuilderOpen(true)}
                />
              )}

              {activeTab === 'tests' && (
                <TestsView
                  onStartTest={handleStartTest}
                />
              )}

              {activeTab === 'magic_module' && (
                <MagicModuleView
                  onStartRevisionTest={(test) => handleStartTest(test, false)}
                />
              )}

              {activeTab === '3d_anatomy' && (
                <div className="h-[750px]">
                  <Anatomy3DLab initialModel={labInitialModel} />
                </div>
              )}

              {activeTab === 'treasures' && (
                <TreasuresView />
              )}

              {activeTab === 'pearls' && (
                <PearlsView />
              )}

              {activeTab === 'schemas' && (
                <SchemasView />
              )}

              {activeTab === 'planner' && (
                <StudyPlannerView />
              )}

              {activeTab === 'notes_binder' && (
                <NotesBinderView
                  onNavigateToItem={handleNavigateToItem}
                />
              )}
            </div>
          </main>
        </div>
      )}

      {/* Video Player Modal (Recorded Lectures) */}
      {activeVideo && (
        <VideoPlayerModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
          onOpen3DLab={handleOpen3DLabWithModel}
        />
      )}

      {/* Live Classroom Modal (Full View or Picture-in-Picture) */}
      {activeLiveSession && (
        <LiveClassRoomModal
          session={activeLiveSession}
          isPipMode={isLivePipMode}
          onClose={() => {
            setActiveLiveSession(null);
            setIsLivePipMode(false);
          }}
          onTogglePip={() => setIsLivePipMode(prev => !prev)}
          onLaunchDppTest={handleLaunchDppTest}
        />
      )}

      {/* Test Engine Modal */}
      {activeTest && (
        <TestEngineModal
          test={activeTest.test}
          isExamMode={activeTest.isExamMode}
          onClose={() => setActiveTest(null)}
        />
      )}

      {/* Custom Module Builder Modal */}
      {isCustomModuleBuilderOpen && (
        <CustomModuleBuilderModal
          onClose={() => setIsCustomModuleBuilderOpen(false)}
          onStartCustomTest={(test, isExamMode) => {
            setIsCustomModuleBuilderOpen(false);
            handleStartTest(test, isExamMode);
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <SyncProvider>
      <MainApp />
    </SyncProvider>
  );
}

