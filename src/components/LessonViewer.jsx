import React, { useState, Suspense } from 'react';
const MarkdownRenderer = React.lazy(() => import('./MarkdownRenderer'));

export default function LessonViewer({
  courseId,
  currentSectionId,
  currentLesson,
  onMarkComplete,
  onNavigate
}) {
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [testCompleted, setTestCompleted] = useState(false);

  const handleMarkComplete = async () => {
    if (!courseId || !currentSectionId || !currentLesson) return;

    setIsMarkingComplete(true);
    try {
      await onMarkComplete();
    } finally {
      setIsMarkingComplete(false);
    }
  };

  const handleTestComplete = async (results) => {
    setTestResults(results);
    setTestCompleted(true);

    if (results.passed) {
      setTimeout(() => {
        handleMarkComplete();
      }, 1500);
    }
  };

  const handleRetryTest = () => {
    setTestResults(null);
    setTestCompleted(false);
    setShowTest(false);
    setTimeout(() => setShowTest(true), 100);
  };

  const hasTest = currentLesson?.quizzes && currentLesson.quizzes.length > 0;

  if (!currentLesson) {
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
    <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-slate-500 font-mono text-sm">
          lesson_viewer
        </span>
      </div>

      <div className="markdown-content min-h-[400px]">
        {currentLesson.contentType === 'text' && currentLesson.textContent ? (
          <div className="prose prose-invert max-w-none">
            <Suspense fallback={<div className="text-slate-400">Загрузка контента...</div>}>
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
          <div className="text-center py-20">
            <div className="text-slate-400 font-mono text-lg mb-4">
              // Контент урока не найден
            </div>
            <div className="text-slate-500 font-mono text-sm">
              Обратитесь к администратору курса
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-emerald-500/20">
        <button
          onClick={() => onNavigate('prev')}
          className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg font-mono hover:bg-slate-700 transition-all border border-slate-600 hover:border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          ← Предыдущий урок
        </button>

        {(!hasTest || testResults?.passed) && (
          <button
            onClick={handleMarkComplete}
            disabled={isMarkingComplete}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 rounded-lg font-mono hover:from-emerald-500 hover:to-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isMarkingComplete ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full"></span>
                Обработка...
              </>
            ) : (
              'Отметить как завершенный'
            )}
          </button>
        )}

        {hasTest && testCompleted && !testResults?.passed && (
          <button
            onClick={() => setShowTest(true)}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 rounded-lg font-mono hover:from-emerald-500 hover:to-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/50 flex items-center gap-2"
          >
            📝 Пройти тест
          </button>
        )}

        <button
          onClick={() => onNavigate('next')}
          className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg font-mono hover:bg-slate-700 transition-all border border-slate-600 hover:border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Следующий урок →
        </button>
      </div>
    </div>
  );
}