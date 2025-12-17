import React, { useState, useEffect, Suspense } from 'react';
import { quizzesAPI } from '../services/api';
const MarkdownRenderer = React.lazy(() => import('./MarkdownRenderer'));

export default function LessonViewer({
  courseId,
  currentSectionId,
  currentLesson,
  onMarkComplete,
  onNavigate,
  onOpenTest
}) {
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [hasQuiz, setHasQuiz] = useState(false);
  const [checkingQuiz, setCheckingQuiz] = useState(true);

  useEffect(() => {
    checkForQuiz();
  }, [courseId, currentSectionId, currentLesson]);

  const checkForQuiz = async () => {
    if (!courseId || !currentSectionId || !currentLesson?.id) {
      setHasQuiz(false);
      setCheckingQuiz(false);
      return;
    }

    setCheckingQuiz(true);
    try {
      const quizzes = await quizzesAPI.getByLesson(courseId, currentSectionId, currentLesson.id);
      setHasQuiz(quizzes && quizzes.length > 0);
    } catch (err) {
      console.error('Ошибка проверки наличия тестов:', err);
      setHasQuiz(false);
    } finally {
      setCheckingQuiz(false);
    }
  };

  const handleMarkComplete = async () => {
    if (!courseId || !currentSectionId || !currentLesson) return;

    setIsMarkingComplete(true);
    try {
      await onMarkComplete();
    } finally {
      setIsMarkingComplete(false);
    }
  };

  const handleOpenTest = () => {
    if (onOpenTest) {
      onOpenTest();
    }
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;

    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
      /(?:youtube\.com\/embed\/)([^&\s]+)/,
      /(?:youtu\.be\/)([^&\s]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  };

  if (!currentLesson || !currentLesson.id) {
    return (
      <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 text-center">
        <div className="text-slate-400 font-mono text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-4">
          // Урок не найден
        </div>
        <div className="text-slate-500 font-mono text-[10px] sm:text-xs md:text-sm">
          Выберите урок из списка слева
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 sm:p-6 w-full overflow-hidden">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
        <span className="text-slate-500 font-mono text-xs sm:text-sm">
          lesson_viewer
        </span>
      </div>

      <div className="markdown-content min-h-[300px] sm:min-h-[400px] mb-6 w-full overflow-hidden">
        {currentLesson.contentType === 'text' && currentLesson.textContent ? (
          <div className="prose prose-invert prose-sm max-w-none w-full overflow-hidden">
            <Suspense fallback={
              <div className="text-slate-400 text-sm">
                Загрузка контента...
              </div>
            }>
              <MarkdownRenderer>
                {currentLesson.textContent}
              </MarkdownRenderer>
            </Suspense>
          </div>
        ) : currentLesson.contentType === 'video' && currentLesson.videoUrl ? (
          <div className="w-full">
            <div className="aspect-video bg-black rounded-lg overflow-hidden w-full">
              {(() => {
                const youtubeId = getYouTubeVideoId(currentLesson.videoUrl);
                
                if (youtubeId) {
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title="YouTube видео урока"
                    />
                  );
                } else {
                  return (
                    <video
                      src={currentLesson.videoUrl}
                      controls
                      className="w-full h-full"
                      preload="metadata"
                    >
                      Ошибка воспроизведения видео
                    </video>
                  );
                }
              })()}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 sm:py-8 md:py-12 lg:py-20">
            <div className="text-slate-400 font-mono text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4">
              // Контент урока не найден
            </div>
            <div className="text-slate-500 font-mono text-[10px] sm:text-xs md:text-sm">
              Обратитесь к администратору курса
            </div>
          </div>
        )}
      </div>

      {!checkingQuiz && hasQuiz && (
        <div className="mb-6">
          <button
            onClick={handleOpenTest}
            className="w-full px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 rounded-lg font-mono text-sm hover:from-emerald-500 hover:to-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/50 flex items-center justify-center gap-2 relative overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-slate-950 rounded-full animate-pulse"></span>
              {'> '}start_test.sh
            </span>
            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-emerald-500 to-emerald-300"></div>
          </button>
          <div className="text-center text-slate-500 text-xs font-mono mt-2">
            // Complete the test to finish the lesson
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-8 pt-6 border-t border-emerald-500/20">
        <button
          onClick={() => onNavigate('prev')}
          className="px-4 py-2.5 sm:px-6 sm:py-3 bg-slate-800 text-slate-300 rounded-lg font-mono text-sm hover:bg-slate-700 transition-all border border-slate-600 hover:border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group/btn"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-slate-300 rounded-full"></span>
            {'> '}prev_lesson.sh
          </span>
          <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 bg-slate-700"></div>
        </button>

        <button
          onClick={handleMarkComplete}
          disabled={isMarkingComplete}
          className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 rounded-lg font-mono text-sm hover:from-emerald-500 hover:to-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed order-first sm:order-none relative overflow-hidden group/btn"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isMarkingComplete ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                processing...
              </>
            ) : (
              <>
                <span className="w-2 h-2 bg-slate-950 rounded-full animate-pulse"></span>
                {'> '}complete_lesson.sh
              </>
            )}
          </span>
          <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-emerald-500 to-emerald-300"></div>
        </button>

        <button
          onClick={() => onNavigate('next')}
          className="px-4 py-2.5 sm:px-6 sm:py-3 bg-slate-800 text-slate-300 rounded-lg font-mono text-sm hover:bg-slate-700 transition-all border border-slate-600 hover:border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group/btn"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-slate-300 rounded-full"></span>
            {'> '}next_lesson.sh
          </span>
          <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 bg-slate-700"></div>
        </button>
      </div>
    </div>
  );
}