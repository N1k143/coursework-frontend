import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NetworkBackground from '../components/NetworkBackground';

export default function CoursePlayerPage() {
  const { courseId } = useParams();
  const [currentLesson, setCurrentLesson] = useState(0);

  const courseData = {
    id: 1,
    title: "Введение в сети",
    description: "Основы сетевых технологий, модели OSI и TCP/IP",
    progress: 25,
    modules: [
      {
        id: 1,
        title: "Модуль 1: Основы сетей",
        lessons: [
          {
            id: 1,
            title: "Введение в компьютерные сети",
            type: "lesson",
            duration: "15 мин",
            completed: true,
            content: `
 Введение в компьютерные сети

 Что такое компьютерная сеть?
Компьютерная сеть - это совокупность устройств, соединенных между собой для обмена информацией и ресурсами.

 Основные компоненты:
- Узл (компьютеры, серверы, принтеры)
- Каналы связи (проводные и беспроводные)
- Сетевые устройства (маршрутизаторы, коммутаторы)

 Преимущества сетей:
- Совместное использование ресурсов
- Централизованное управление
- Повышение надежности

`
          },
          {
            id: 2,
            title: "Модель OSI",
            type: "lesson", 
            duration: "20 мин",
            completed: true,
            content: `
# Модель OSI

## 7 уровней модели OSI:
1. **Физический** - передача битов
2. **Канальный** - фреймы, MAC-адреса
3. **Сетевой** - IP-адреса, маршрутизация
4. **Транспортный** - TCP/UDP, порты
5. **Сеансовый** - управление сессиями
6. **Представительный** - кодирование данных
7. **Прикладной** - HTTP, FTP, SMTP
`
          },
          {
            id: 3,
            title: "Стек протоколов TCP/IP",
            type: "lesson",
            duration: "25 мин", 
            completed: false,
            content: `
# Стек протоколов TCP/IP

## Основные протоколы:
- **TCP** - надежная передача данных
- **IP** - адресация и маршрутизация
- **HTTP/HTTPS** - веб-трафик
- **DNS** - преобразование имен

## Отличие от OSI:
TCP/IP - практическая реализация, OSI - теоретическая модель.
`
          },
          {
            id: 4, 
            title: "Тест: Основы сетей",
            type: "test",
            duration: "10 мин",
            completed: false,
            content: "test"
          }
        ]
      },
      {
        id: 2,
        title: "Модуль 2: IP-адресация",
        lessons: [
          {
            id: 5,
            title: "IPv4 адресация",
            type: "lesson",
            duration: "30 мин",
            completed: false,
            content: "Содержание урока IPv4"
          },
          {
            id: 6,
            title: "Подсети и маски",
            type: "lesson", 
            duration: "35 мин",
            completed: false,
            content: "Содержание урока про подсети"
          }
        ]
      }
    ]
  };

  const allLessons = courseData.modules.flatMap(module => module.lessons);

  const currentLessonData = allLessons[currentLesson];

  return (
    <>
      <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <NetworkBackground/>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="text-emerald-500 font-mono">$ cd </span>
              <span className="font-sans bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                {courseData.title}
              </span>
            </h1>
            
            <p className="text-slate-400 font-mono text-sm max-w-2xl mx-auto">
              {courseData.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6 sticky top-32">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-500 font-mono text-sm">course_navigation</span>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {courseData.modules.map((module) => (
                    <div key={module.id} className="border-l-2 border-emerald-500/30 pl-4">
                      <h3 className="text-emerald-500 font-mono text-sm mb-2">{module.title}</h3>
                      <div className="space-y-1">
                        {module.lessons.map((lesson) => {
                          const globalIndex = allLessons.findIndex(l => l.id === lesson.id);
                          
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => setCurrentLesson(globalIndex)}
                              className={`w-full text-left p-2 rounded-lg font-mono text-xs transition-all ${
                                globalIndex === currentLesson
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                                  : lesson.completed
                                  ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'
                                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={
                                  lesson.completed ? 'text-green-500' : 
                                  globalIndex === currentLesson ? 'text-emerald-400' : 'text-slate-500'
                                }>
                                  {lesson.completed ? '✅' : globalIndex === currentLesson ? '🔄' : '📄'}
                                </span>
                                <span className="flex-1 truncate">{lesson.title}</span>
                                <span className="text-slate-500 text-xs">{lesson.duration}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-500/20">
                  <div className="flex justify-between text-slate-400 font-mono text-xs mb-2">
                    <span>Overall Progress</span>
                    <span>{courseData.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${courseData.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-500 font-mono text-sm">
                    {currentLessonData.type === 'lesson' ? 'lesson_viewer' : 'test_console'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white font-mono">
                      {currentLessonData.title}
                    </h2>
                    <p className="text-slate-400 font-mono text-sm mt-1">
                      Duration: {currentLessonData.duration} | Type: {currentLessonData.type}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full font-mono text-xs ${
                    currentLessonData.completed 
                      ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                  }`}>
                    {currentLessonData.completed ? 'COMPLETED' : 'IN PROGRESS'}
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  {currentLessonData.type === 'lesson' ? (
                    <div className="p-2 text-white font-sans leading-relaxed whitespace-pre-wrap">
                      {currentLessonData.content}
                    </div>
                  ) : (
                    <div className="bg-slate-800 border border-emerald-500/20 rounded-lg p-6">
                      <div className="text-center text-slate-400 font-mono">
                        🚧 Test system is under construction 🚧
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t border-emerald-500/20">
                  <button 
                    className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg font-mono hover:bg-slate-700 transition-all border border-slate-600 hover:border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentLesson === 0}
                  >
                    ← Previous
                  </button>
                  
                  <button className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-lg font-mono hover:bg-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/50">
                    {currentLessonData.completed ? 'Next →' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}