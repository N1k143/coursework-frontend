import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import 'highlight.js/styles/vs2015.css';
import NetworkBackground from '../components/NetworkBackground';
import { coursesAPI, sectionsAPI, lessonsAPI, progressAPI, handleApiError } from '../services/api';

import CourseNavigation from '../components/CourseNavigation';
import LessonViewer from '../components/LessonViewer';
import QuizComponent from '../components/QuizComponent';

export default function CoursePlayerPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [lessonsBySection, setLessonsBySection] = useState({});
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [courseProgress, setCourseProgress] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showQuizView, setShowQuizView] = useState(false);

  const loadCourseData = useCallback(async () => {
    if (!courseId) {
      navigate('/courses');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const courseData = await coursesAPI.getById(courseId);
      setCourse(courseData);

      try {
        const progressData = await progressAPI.getByCourse(courseId);
        setCourseProgress(progressData);
      } catch (progressErr) {
        console.log('Прогресс курса не найден, создадим новый');
        setCourseProgress(null);
      }

      const sectionsData = await sectionsAPI.getByCourse(courseId);
      const filteredSections = sectionsData.filter(s => s.courseId === parseInt(courseId));
      const sortedSections = filteredSections.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
      setSections(sortedSections);

      if (sortedSections.length === 0) {
        setLessonsBySection({});
        setLoading(false);
        return;
      }

      const lessonsPromises = sortedSections.map(section => 
        lessonsAPI.getBySection(courseId, section.id)
      );
      const lessonsData = await Promise.all(lessonsPromises);

      const lessonsMap = {};
      let totalLessons = 0;
      sortedSections.forEach((section, index) => {
        const sectionLessons = (lessonsData[index] || [])
          .filter(lesson => lesson.sectionId === section.id)
          .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
        lessonsMap[section.id] = sectionLessons;
        totalLessons += sectionLessons.length;
      });
      setLessonsBySection(lessonsMap);

      let foundLesson = null;
      let foundSectionId = null;

      if (totalLessons > 0) {
        for (const section of sortedSections) {
          const sectionLessons = lessonsMap[section.id] || [];
          for (const lesson of sectionLessons) {
            if (!foundLesson) {
              foundLesson = lesson;
              foundSectionId = section.id;
              break;
            }
          }
          if (foundLesson) break;
        }
      }

      if (foundLesson && foundSectionId) {
        setCurrentSectionId(foundSectionId);
        setCurrentLesson(foundLesson);
      }

    } catch (err) {
      console.error('Error loading course:', err);
      setError(handleApiError(err, 'Не удалось загрузить данные курса'));
    } finally {
      setLoading(false);
    }

  }, [courseId, navigate]);

  useEffect(() => {
    loadCourseData();
  }, [loadCourseData]);

  const handleLessonSelect = async (sectionId, lessonId) => {
    const lesson = lessonsBySection[sectionId]?.find(l => l.id === lessonId);
    if (!lesson) return;

    setCurrentSectionId(sectionId);
    setCurrentLesson(lesson);
    setShowQuizView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkComplete = async (testResults = null) => {
    if (!courseId || !currentSectionId || !currentLesson) return;

    try {
      const progressData = { 
        status: 'completed',
        updatedAt: new Date().toISOString(),
        ...(testResults && { testResults })
      };

      await progressAPI.update(courseId, progressData);

      setCourseProgress(prev => ({
        ...prev,
        ...progressData
      }));

      const nextLesson = getNextLesson();
      if (nextLesson) {
        const nextSectionId = Object.keys(lessonsBySection).find(id =>
          lessonsBySection[id].some(l => l.id === nextLesson.id)
        );
        if (nextSectionId) handleLessonSelect(parseInt(nextSectionId), nextLesson.id);
      }

    } catch (err) {
      console.error('Error marking lesson as complete:', err);
      setError(handleApiError(err, 'Не удалось отметить урок как завершенный'));
    }
  };

  const getNextLesson = () => {
    if (!currentLesson || !currentSectionId) return null;
    const currentLessons = lessonsBySection[currentSectionId] || [];
    const currentIndex = currentLessons.findIndex(l => l.id === currentLesson.id);
    
    if (currentIndex < currentLessons.length - 1) {
      return currentLessons[currentIndex + 1];
    }

    const sectionIndex = sections.findIndex(s => s.id === currentSectionId);
    for (let i = sectionIndex + 1; i < sections.length; i++) {
      const nextLessons = lessonsBySection[sections[i].id] || [];
      if (nextLessons.length) return nextLessons[0];
    }
    
    return null;
  };

  const handleNavigate = (direction) => {
    if (direction === 'next') {
      const nextLesson = getNextLesson();
      if (nextLesson) {
        const nextSectionId = Object.keys(lessonsBySection).find(id =>
          lessonsBySection[id].some(l => l.id === nextLesson.id)
        );
        if (nextSectionId) handleLessonSelect(parseInt(nextSectionId), nextLesson.id);
      }
    } else if (direction === 'prev') {
      const currentLessons = lessonsBySection[currentSectionId] || [];
      const currentIndex = currentLessons.findIndex(l => l.id === currentLesson.id);

      if (currentIndex > 0) {
        handleLessonSelect(currentSectionId, currentLessons[currentIndex - 1].id);
      } else {
        const sectionIndex = sections.findIndex(s => s.id === currentSectionId);
        if (sectionIndex > 0) {
          const prevLessons = lessonsBySection[sections[sectionIndex - 1].id] || [];
          if (prevLessons.length) {
            handleLessonSelect(sections[sectionIndex - 1].id, prevLessons[prevLessons.length - 1].id);
          }
        }
      }
    }
  };

  const handleOpenTest = () => {
    setShowQuizView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseQuiz = () => {
    setShowQuizView(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center overflow-x-hidden">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-emerald-500 font-mono text-lg mt-4">$ loading_course...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-4 lg:px-6 relative overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <NetworkBackground/>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full overflow-x-hidden">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-400 font-mono mb-4">
            <Link to="/courses" className="hover:text-emerald-400 transition-colors">
              $ cd /courses
            </Link>
            <span>/</span>
            <span className="text-emerald-400">{course?.title || 'Курс'}</span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2 break-words">
            <span className="text-emerald-500 font-mono">$ less </span>
            <span className="font-sans bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              {course?.title}
            </span>
          </h1>
          <p className="text-slate-400 font-mono text-sm max-w-3xl break-words">{course?.description}</p>

          {courseProgress && (
            <div className="mt-4 flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-mono border ${
                courseProgress.status === 'completed' 
                  ? 'bg-green-500/20 text-green-500 border-green-500/30'
                  : courseProgress.status === 'in_progress'
                  ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
                  : 'bg-slate-500/20 text-slate-500 border-slate-500/30'
              }`}>
                {courseProgress.status === 'completed' ? 'КУРС ЗАВЕРШЕН' :
                 courseProgress.status === 'in_progress' ? 'В ПРОЦЕССЕ' : 'НЕ НАЧАТ'}
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="text-yellow-400 font-mono text-sm">{error}</div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          
          <div className="lg:col-span-1 sticky top-24 self-start">
            <CourseNavigation
              course={course}
              sections={sections || []}
              lessonsBySection={lessonsBySection || {}}
              currentLessonId={currentLesson?.id}
              onLessonSelect={handleLessonSelect}
              courseProgress={courseProgress || { status: 'not_started' }}
            />
          </div>


          <div className="lg:col-span-3 w-full overflow-x-hidden">
            {showQuizView ? (
              <QuizComponent
                courseId={courseId}
                sectionId={currentSectionId}
                lessonId={currentLesson?.id}
                onComplete={handleMarkComplete}
                onClose={handleCloseQuiz}
              />
            ) : (
              <LessonViewer
                courseId={courseId}
                currentSectionId={currentSectionId}
                currentLesson={currentLesson || {}}
                onMarkComplete={handleMarkComplete}
                onNavigate={handleNavigate}
                onOpenTest={handleOpenTest}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}