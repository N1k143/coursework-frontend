import React, { useState } from 'react';
import NetworkBackground from '../components/NetworkBackground'; 

export default function AdminPage() {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Введение в сетевые технологии', description: 'Основы сетей, модель OSI, топологии.' },
    { id: 2, title: 'Протоколы TCP/IP', description: 'Глубокое погружение в стек TCP/IP.' },
  ]);
  
  const [lessons, setLessons] = useState([
    { id: 1, courseId: 1, title: 'Модель OSI', content: 'Cодержание урока о 7 уровнях модели OSI...' },
    { id: 2, courseId: 1, title: 'Физический уровень', content: 'Содержание урока о передаче битов...' },
    { id: 3, courseId: 2, title: 'IP-адресация', content: 'Содержание урока о IPv4 и IPv6...' },
  ]);

  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      lessonId: 1, 
      text: 'Сколько уровней в модели OSI?', 
      answers: [
        { id: 1, text: '5', isCorrect: false },
        { id: 2, text: '7', isCorrect: true },
        { id: 3, text: '4', isCorrect: false },
      ] 
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const handleSaveCourse = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const courseData = {
        title: formData.get('title'),
        description: formData.get('description'),
    };

    if (editingItem.data.id) { 
        setCourses(courses.map(c => c.id === editingItem.data.id ? { ...c, ...courseData } : c));
    } else { 
        const newCourse = { id: Date.now(), ...courseData };
        setCourses([...courses, newCourse]);
    }
    setEditingItem(null);
  };
  
  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот курс и все его уроки?')) {
      setCourses(courses.filter(c => c.id !== courseId));
      setLessons(lessons.filter(l => l.courseId !== courseId));
    }
  };

  const handleSaveLesson = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const lessonData = {
        title: formData.get('title'),
        content: formData.get('content'),
    };
    
    if(editingItem.data.id) { 
        setLessons(lessons.map(l => l.id === editingItem.data.id ? { ...l, ...lessonData } : l));
    } else { 
        const newLesson = { id: Date.now(), courseId: selectedCourse.id, ...lessonData };
        setLessons([...lessons, newLesson]);
    }
    setEditingItem(null);
  };

  const handleDeleteLesson = (lessonId) => {
    if(window.confirm('Вы уверены, что хотите удалить этот урок и его тест?')) {
        setLessons(lessons.filter(l => l.id !== lessonId));
        setQuestions(questions.filter(q => q.lessonId !== lessonId));
    }
  };

  const handleSaveQuestion = () => {
    if (editingItem.data.id) { 
        setQuestions(questions.map(q => q.id === editingItem.data.id ? editingItem.data : q));
    } else {
        const newQuestion = { ...editingItem.data, id: Date.now(), lessonId: selectedLesson.id };
        setQuestions([...questions, newQuestion]);
    }
    setEditingItem(null);
  };
  
  const handleDeleteQuestion = (questionId) => {
    if(window.confirm('Вы уверены, что хотите удалить этот вопрос?')) {
        setQuestions(questions.filter(q => q.id !== questionId));
    }
  };
  
  const handleQuestionFormChange = (field, value) => {
      setEditingItem({ ...editingItem, data: { ...editingItem.data, [field]: value } });
  };
  
  const handleAnswerFormChange = (ansId, text) => {
      const updatedAnswers = editingItem.data.answers.map(a => a.id === ansId ? { ...a, text } : a);
      handleQuestionFormChange('answers', updatedAnswers);
  };
  
  const handleCorrectAnswerChange = (ansId) => {
      const updatedAnswers = editingItem.data.answers.map(a => ({ ...a, isCorrect: a.id === ansId }));
      handleQuestionFormChange('answers', updatedAnswers);
  };
  
  const addAnswerToForm = () => {
      const newAnswer = { id: Date.now(), text: '', isCorrect: false };
      handleQuestionFormChange('answers', [...editingItem.data.answers, newAnswer]);
  };
  
  const removeAnswerFromForm = (ansId) => {
      if (editingItem.data.answers.length <= 2) return;
      const updatedAnswers = editingItem.data.answers.filter(a => a.id !== ansId);
      handleQuestionFormChange('answers', updatedAnswers);
  };



  const renderCourseManager = () => (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white font-mono">
          <span className="text-emerald-500">#</span> Управление курсами
        </h2>
        <button
          onClick={() => setEditingItem({ type: 'course', data: { title: '', description: '' }})}
          className="px-5 py-2.5 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-all font-mono text-sm"
        >
          $ add_course.sh
        </button>
      </div>

      {editingItem && editingItem.type === 'course' && (
        <div className="bg-slate-800/50 p-6 rounded-lg mb-8 border border-emerald-500/20">
            <h3 className="text-xl font-bold text-white mb-4 font-mono">{editingItem.data.id ? 'Редактировать курс' : 'Создать новый курс'}</h3>
            <form onSubmit={handleSaveCourse} className="space-y-4">
                <input type="hidden" name="id" defaultValue={editingItem.data.id} />
                <div>
                    <label className="block text-emerald-500 font-mono text-sm mb-2">$ title:</label>
                    <input type="text" name="title" defaultValue={editingItem.data.title} required className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"/>
                </div>
                <div>
                    <label className="block text-emerald-500 font-mono text-sm mb-2">$ description:</label>
                    <textarea name="description" defaultValue={editingItem.data.description} rows="3" required className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none resize-none"></textarea>
                </div>
                <div className="flex gap-4 justify-end pt-2">
                    <button type="button" onClick={() => setEditingItem(null)} className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg font-mono hover:bg-slate-700 transition-all border border-slate-600 text-sm">$ cancel.sh</button>
                    <button type="submit" className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-all font-mono text-sm">$ save.sh</button>
                </div>
            </form>
        </div>
      )}

      <div className="space-y-4">
        {courses.map(course => (
          <div key={course.id} className="group bg-slate-800/50 p-4 rounded-lg border border-transparent hover:border-emerald-500/30 transition-all flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-white font-mono group-hover:text-emerald-400">{course.title}</h3>
              <p className="text-slate-400 text-sm">{course.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedCourse(course)} className="text-sm font-mono text-cyan-400 hover:underline">Уроки</button>
              <button onClick={() => setEditingItem({ type: 'course', data: course })} className="text-sm font-mono text-yellow-400 hover:underline">Изменить</button>
              <button onClick={() => handleDeleteCourse(course.id)} className="text-sm font-mono text-red-500 hover:underline">Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLessonManager = () => (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-8">
        <div className="flex items-center justify-between mb-8">
            <div>
                <button onClick={() => setSelectedCourse(null)} className="text-sm font-mono text-slate-400 hover:text-emerald-400 mb-2">← Вернуться к курсам</button>
                <h2 className="text-2xl font-bold text-white font-mono">
                    <span className="text-emerald-500">#</span> Уроки курса: <span className="text-cyan-400">{selectedCourse.title}</span>
                </h2>
            </div>
            <button onClick={() => setEditingItem({ type: 'lesson', data: { title: '', content: '' }})} className="px-5 py-2.5 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-all font-mono text-sm">
                $ add_lesson.sh
            </button>
        </div>

        {editingItem && editingItem.type === 'lesson' && (
            <div className="bg-slate-800/50 p-6 rounded-lg mb-8 border border-emerald-500/20">
                <h3 className="text-xl font-bold text-white mb-4 font-mono">{editingItem.data.id ? 'Редактировать урок' : 'Создать новый урок'}</h3>
                <form onSubmit={handleSaveLesson} className="space-y-4">
                    <div>
                        <label className="block text-emerald-500 font-mono text-sm mb-2">$ title:</label>
                        <input type="text" name="title" defaultValue={editingItem.data.title} required className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"/>
                    </div>
                    <div>
                        <label className="block text-emerald-500 font-mono text-sm mb-2">$ content (Markdown поддерживается):</label>
                        <textarea name="content" defaultValue={editingItem.data.content} rows="5" required className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none resize-none"></textarea>
                    </div>
                    <div className="flex gap-4 justify-end pt-2">
                        <button type="button" onClick={() => setEditingItem(null)} className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg font-mono hover:bg-slate-700 transition-all border border-slate-600 text-sm">$ cancel.sh</button>
                        <button type="submit" className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-all font-mono text-sm">$ save.sh</button>
                    </div>
                </form>
            </div>
        )}

        <div className="space-y-4">
            {lessons.filter(l => l.courseId === selectedCourse.id).map(lesson => (
                <div key={lesson.id} className="group bg-slate-800/50 p-4 rounded-lg border border-transparent hover:border-emerald-500/30 transition-all flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white font-mono group-hover:text-emerald-400">{lesson.title}</h3>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSelectedLesson(lesson)} className="text-sm font-mono text-cyan-400 hover:underline">Тест</button>
                        <button onClick={() => setEditingItem({ type: 'lesson', data: lesson })} className="text-sm font-mono text-yellow-400 hover:underline">Изменить</button>
                        <button onClick={() => handleDeleteLesson(lesson.id)} className="text-sm font-mono text-red-500 hover:underline">Удалить</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
  
  const renderQuizManager = () => (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-8">
        <div className="flex items-center justify-between mb-8">
            <div>
                <button onClick={() => setSelectedLesson(null)} className="text-sm font-mono text-slate-400 hover:text-emerald-400 mb-2">← Вернуться к урокам</button>
                <h2 className="text-2xl font-bold text-white font-mono">
                    <span className="text-emerald-500">#</span> Тест: <span className="text-cyan-400">{selectedLesson.title}</span>
                </h2>
            </div>
            {!editingItem && (
                <button onClick={() => setEditingItem({ type: 'question', data: { text: '', answers: [{id: 1, text: '', isCorrect: true}, {id: 2, text: '', isCorrect: false}] } })} className="px-5 py-2.5 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-all font-mono text-sm">
                    $ add_question.sh
                </button>
            )}
        </div>

        {editingItem && editingItem.type === 'question' ? (
            <div className="bg-slate-800/50 p-6 rounded-lg mb-8 border border-emerald-500/20 space-y-6">
                <h3 className="text-xl font-bold text-white mb-4 font-mono">{editingItem.data.id ? 'Редактировать вопрос' : 'Создать новый вопрос'}</h3>
                <div>
                    <label className="block text-emerald-500 font-mono text-sm mb-2">$ question_text:</label>
                    <textarea value={editingItem.data.text} onChange={(e) => handleQuestionFormChange('text', e.target.value)} rows="2" required className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none resize-none"></textarea>
                </div>
                <div>
                    <label className="block text-emerald-500 font-mono text-sm mb-2">$ answers (отметьте правильный):</label>
                    <div className="space-y-3">
                        {editingItem.data.answers.map((ans, index) => (
                            <div key={ans.id} className="flex items-center gap-3">
                                <input type="radio" name="correctAnswer" checked={ans.isCorrect} onChange={() => handleCorrectAnswerChange(ans.id)} className="form-radio h-5 w-5 text-emerald-500 bg-slate-700 border-slate-600 focus:ring-emerald-500"/>
                                <input type="text" value={ans.text} onChange={(e) => handleAnswerFormChange(ans.id, e.target.value)} placeholder={`Вариант ответа ${index + 1}`} required className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-2 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"/>
                                <button onClick={() => removeAnswerFromForm(ans.id)} className="text-red-500 hover:text-red-400 font-mono text-xl" disabled={editingItem.data.answers.length <= 2}>×</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={addAnswerToForm} className="mt-4 text-sm font-mono text-emerald-400 hover:underline">+ Добавить вариант</button>
                </div>
                <div className="flex gap-4 justify-end pt-4 border-t border-emerald-500/20">
                    <button onClick={() => setEditingItem(null)} className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg font-mono hover:bg-slate-700 transition-all border border-slate-600 text-sm">$ cancel.sh</button>
                    <button onClick={handleSaveQuestion} className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-all font-mono text-sm">$ save.sh</button>
                </div>
            </div>
        ) : (
            <div className="space-y-4">
                {questions.filter(q => q.lessonId === selectedLesson.id).map(q => (
                    <div key={q.id} className="group bg-slate-800/50 p-4 rounded-lg border border-transparent hover:border-emerald-500/30 transition-all">
                        <div className="flex justify-between items-start">
                           <div>
                            <p className="text-white font-mono">{q.text}</p>
                            <ul className="mt-2 space-y-1 text-sm text-slate-400 list-disc pl-5">
                                {q.answers.map(a => <li key={a.id} className={a.isCorrect ? 'text-emerald-400' : ''}>{a.text} {a.isCorrect && '(✓)'}</li>)}
                            </ul>
                           </div>
                            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                                <button onClick={() => setEditingItem({type: 'question', data: q})} className="text-sm font-mono text-yellow-400 hover:underline">Изменить</button>
                                <button onClick={() => handleDeleteQuestion(q.id)} className="text-sm font-mono text-red-500 hover:underline">Удалить</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );

  // --- ОСНОВНОЙ РЕНДЕР КОМПОНЕНТА ---
  return (
    <>
      <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <NetworkBackground />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="text-emerald-500 font-mono">$ admin_panel</span>
              <br />
              <span className="font-sans bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Панель управления контентом
              </span>
            </h1>
            <p className="text-slate-400 font-mono text-sm max-w-2xl mx-auto">
              Управление курсами, уроками и тестами для обучающей платформы.
            </p>
          </div>

          {selectedCourse && selectedLesson 
             ? renderQuizManager()
             : selectedCourse 
             ? renderLessonManager()
             : renderCourseManager()
          }

        </div>
      </main>
    </>
  );
}