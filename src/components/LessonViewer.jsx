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

  if (!currentLesson || !currentLesson.id) {
    return (
      <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-8 text-center">
        <div className="text-slate-400 font-mono text-lg mb-4">
          // Урок не найден
        </div>
        <div className="text-slate-500 font-mono text-sm">
          Выберите урок из списка слева
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-3 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
        <span className="text-slate-500 font-mono text-xs sm:text-sm">
          lesson_viewer
        </span>
      </div>

      <div className="markdown-content min-h-[300px] sm:min-h-[400px] mb-4 sm:mb-6">
        {currentLesson.contentType === 'text' && currentLesson.textContent ? (
          <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
            <Suspense fallback={<div className="text-slate-400 text-sm sm:text-base">Загрузка контента...</div>}>
              <MarkdownRenderer>
                {currentLesson.textContent}
              </MarkdownRenderer>
            </Suspense>
          </div>
        ) : currentLesson.contentType === 'video' && currentLesson.videoUrl ? (
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <video
              src={currentLesson.videoUrl}
              controls
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="text-center py-12 sm:py-20">
            <div className="text-slate-400 font-mono text-base sm:text-lg mb-4">
              // Контент урока не найден
            </div>
            <div className="text-slate-500 font-mono text-sm">
              Обратитесь к администратору курса
            </div>
          </div>
        )}
      </div>

      {!checkingQuiz && hasQuiz && (
        <div className="mb-4 sm:mb-6">
          <button
            onClick={handleOpenTest}
            className="w-full px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 rounded-lg font-mono text-sm sm:text-base hover:from-emerald-500 hover:to-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/50 flex items-center justify-center gap-2"
          >
            <span className="font-bold">Пройти тест по уроку</span>
          </button>
          <div className="text-center text-slate-500 text-xs font-mono mt-2">
            // Пройдите тест для завершения урока
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-emerald-500/20">
        <button
          onClick={() => onNavigate('prev')}
          className="px-4 py-2.5 sm:px-6 sm:py-3 bg-slate-800 text-slate-300 rounded-lg font-mono text-sm sm:text-base hover:bg-slate-700 transition-all border border-slate-600 hover:border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          ← Предыдущий
        </button>

        <button
          onClick={handleMarkComplete}
          disabled={isMarkingComplete}
          className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 rounded-lg font-mono text-sm sm:text-base hover:from-emerald-500 hover:to-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 order-first sm:order-none"
        >
          {isMarkingComplete ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full"></span>
              Обработка...
            </>
          ) : (
            'Завершить урок'
          )}
        </button>

        <button
          onClick={() => onNavigate('next')}
          className="px-4 py-2.5 sm:px-6 sm:py-3 bg-slate-800 text-slate-300 rounded-lg font-mono text-sm sm:text-base hover:bg-slate-700 transition-all border border-slate-600 hover:border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Следующий →
        </button>
      </div>
    </div>
  );
}