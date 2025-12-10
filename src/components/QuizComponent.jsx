import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react';
import { quizzesAPI } from '../services/api';

export default function QuizComponent({ 
  courseId, 
  sectionId, 
  lessonId, 
  onComplete,
  onClose 
}) {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [allAnswers, setAllAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (courseId && sectionId && lessonId) {
      loadQuizzes();
    }
  }, [courseId, sectionId, lessonId]);

  const loadQuizzes = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await quizzesAPI.getByLesson(courseId, sectionId, lessonId);
      
      if (!data || data.length === 0) {
        setQuizzes([]);
        setCurrentQuiz(null);
      } else {
        setQuizzes(data);
        selectQuiz(data[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectQuiz = async (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setResults(null);
    await loadQuestions(quiz.id);
  };

  const loadQuestions = async (quizId) => {
    setLoading(true);
    try {
      const questionsData = await quizzesAPI.getQuestions(courseId, sectionId, lessonId, quizId);
      setQuestions(questionsData);

      const answersMap = {};
      questionsData.forEach(question => {
        if (question.answers && Array.isArray(question.answers)) {
          answersMap[question.id] = question.answers;
        } else {
          answersMap[question.id] = [];
        }
      });
      
      setAllAnswers(answersMap);
    } catch (err) {
      console.error('Error loading questions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answerId, questionType) => {
    setUserAnswers(prev => {
      if (questionType === 'multiple') {
        const current = prev[questionId] || [];
        const isSelected = current.includes(answerId);
        return {
          ...prev,
          [questionId]: isSelected 
            ? current.filter(id => id !== answerId)
            : [...current, answerId]
        };
      } else {
        return {
          ...prev,
          [questionId]: [answerId]
        };
      }
    });
  };

  const handleTextAnswer = (questionId, text) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: text
    }));
  };

  const calculateResults = () => {
    let correct = 0;
    let total = questions.length;
    const detailedResults = [];

    questions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      const correctAnswers = allAnswers[question.id]?.filter(a => a.isCorrect).map(a => a.id) || [];
      let isCorrect = false;

      if (question.questionType === 'text') {
        isCorrect = userAnswer && userAnswer.trim().length > 0;
      } else if (question.questionType === 'multiple') {
        const userAnswerArray = userAnswer || [];
        isCorrect = 
          userAnswerArray.length === correctAnswers.length &&
          userAnswerArray.every(id => correctAnswers.includes(id));
      } else {
        const userAnswerId = userAnswer?.[0];
        isCorrect = correctAnswers.includes(userAnswerId);
      }

      if (isCorrect) correct++;

      detailedResults.push({
        question: question.questionText,
        questionType: question.questionType,
        userAnswer: userAnswer,
        correctAnswers: correctAnswers,
        allAnswers: allAnswers[question.id] || [],
        isCorrect: isCorrect
      });
    });

    const percentage = (correct / total) * 100;
    const passed = percentage >= 70;

    return {
      correct,
      total,
      percentage: Math.round(percentage),
      passed,
      details: detailedResults
    };
  };

  const handleSubmit = async () => {
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setShowResults(true);
  };

  const handleRetry = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setResults(null);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-emerald-500 font-mono text-xl mt-4">$ loading_quiz...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 border border-red-500/30 rounded-xl p-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <div className="text-red-400 font-mono text-lg mb-4">Ошибка загрузки</div>
          <div className="text-slate-400 text-sm mb-6">{error}</div>
          <button
            onClick={loadQuizzes}
            className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-lg font-mono hover:bg-emerald-400 transition-all"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-8">
        <div className="text-center">
          <div className="text-slate-400 font-mono text-lg mb-4">
            // Тест не найден
          </div>
          <div className="text-slate-500 font-mono text-sm mb-6">
            Для этого урока нет теста
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-lg font-mono hover:bg-emerald-400 transition-all"
          >
            Вернуться к уроку
          </button>
        </div>
      </div>
    );
  }

  if (showResults && results) {
    return (
      <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-slate-500 font-mono text-sm">test_results</span>
        </div>

        <div className="text-center mb-8">
          {results.passed ? (
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          ) : (
            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          )}
          
          <h2 className="text-3xl font-bold text-white mb-2">
            {results.passed ? 'Тест пройден!' : 'Тест не пройден'}
          </h2>
          
          <p className="text-slate-400 font-mono mb-6">
            {results.passed 
              ? 'Поздравляем! Вы успешно прошли тест.'
              : 'К сожалению, вы не набрали минимальный балл.'}
          </p>

          <div className="bg-slate-800 rounded-xl p-6 mb-6 max-w-md mx-auto">
            <div className="text-5xl font-bold mb-2">
              <span className={results.passed ? 'text-green-500' : 'text-red-500'}>
                {results.percentage}%
              </span>
            </div>
            <div className="text-slate-400 font-mono text-sm mb-2">
              Правильных ответов: {results.correct} из {results.total}
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-4 overflow-hidden">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  results.passed 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : 'bg-gradient-to-r from-red-500 to-orange-500'
                }`}
                style={{ width: `${results.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8 max-h-96 overflow-y-auto pr-2">
          {results.details.map((detail, index) => (
            <div 
              key={index}
              className={`bg-slate-800 rounded-lg p-4 border-2 ${
                detail.isCorrect 
                  ? 'border-green-500/30' 
                  : 'border-red-500/30'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                {detail.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-emerald-400 font-mono text-sm font-bold">
                      Вопрос {index + 1}:
                    </span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                      detail.isCorrect 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {detail.isCorrect ? 'Верно' : 'Неверно'}
                    </span>
                  </div>
                  <p className="text-white text-sm mb-3">{detail.question}</p>
                  
                  {detail.questionType === 'text' ? (
                    <div className="space-y-2">
                      <div className="text-slate-400 text-xs font-mono">Ваш ответ:</div>
                      <div className="bg-slate-900 rounded p-2 text-slate-300 text-sm font-mono">
                        {detail.userAnswer || '(нет ответа)'}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {detail.allAnswers.map((answer) => {
                        const isUserAnswer = detail.questionType === 'multiple'
                          ? (detail.userAnswer || []).includes(answer.id)
                          : (detail.userAnswer || [])[0] === answer.id;
                        const isCorrectAnswer = answer.isCorrect;

                        return (
                          <div
                            key={answer.id}
                            className={`p-2 rounded text-sm font-mono ${
                              isCorrectAnswer && isUserAnswer
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : isCorrectAnswer
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : isUserAnswer
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : 'bg-slate-900 text-slate-500'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {isCorrectAnswer && <CheckCircle className="w-4 h-4" />}
                              {isUserAnswer && !isCorrectAnswer && <XCircle className="w-4 h-4" />}
                              <span>{answer.answerText}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          {!results.passed && (
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg font-mono hover:bg-slate-700 transition-all border border-slate-600 hover:border-emerald-500/50 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Пройти снова
            </button>
          )}
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 rounded-lg font-mono hover:from-emerald-500 hover:to-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/50"
          >
            Вернуться к уроку
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswers = currentQuestion ? (allAnswers[currentQuestion.id] || []) : [];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-slate-500 font-mono text-sm">quiz_test</span>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-white">
            {currentQuiz?.title}
          </h2>
          <span className="text-emerald-400 font-mono text-sm">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div 
            className="h-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {currentQuestion && (
        <div className="mb-8">
          <div className="bg-slate-800 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-emerald-400 font-mono text-lg font-bold">
                Q{currentQuestionIndex + 1}:
              </span>
              <p className="text-white text-lg flex-1">
                {currentQuestion.questionText}
              </p>
            </div>
            
            {currentQuestion.questionType !== 'text' && (
              <div className="text-xs text-slate-500 font-mono">
                {currentQuestion.questionType === 'multiple' 
                  ? '// Можно выбрать несколько вариантов'
                  : '// Выберите один вариант'}
              </div>
            )}
          </div>

          <div className="space-y-3">
            {currentQuestion.questionType === 'text' ? (
              <textarea
                value={userAnswers[currentQuestion.id] || ''}
                onChange={(e) => handleTextAnswer(currentQuestion.id, e.target.value)}
                placeholder="Введите ваш ответ..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white font-mono focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                rows={4}
              />
            ) : (
              currentAnswers.map((answer, index) => {
                const isSelected = currentQuestion.questionType === 'multiple'
                  ? (userAnswers[currentQuestion.id] || []).includes(answer.id)
                  : (userAnswers[currentQuestion.id] || [])[0] === answer.id;

                return (
                  <button
                    key={answer.id}
                    onClick={() => handleAnswerSelect(currentQuestion.id, answer.id, currentQuestion.questionType)}
                    className={`w-full text-left p-4 rounded-lg font-mono transition-all border-2 ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                        isSelected 
                          ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                          : 'border-slate-600'
                      }`}>
                        {isSelected ? '✓' : String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{answer.answerText}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-6 border-t border-slate-800">
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg font-mono hover:bg-slate-700 transition-all border border-slate-600 hover:border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Назад
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(userAnswers).length !== questions.length}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 rounded-lg font-mono hover:from-emerald-500 hover:to-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Завершить тест
            <CheckCircle className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
            className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-lg font-mono hover:bg-emerald-400 transition-all flex items-center gap-2"
          >
            Далее
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}