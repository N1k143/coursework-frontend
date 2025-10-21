import React from 'react';
import { Link } from 'react-router-dom';
import NetworkBackground from '../components/NetworkBackground';

export default function ProfilePage() {
  const userData = {
    username: "network_admin",
    email: "admin@netlearn.ru",
    joinDate: "15.01.2024",
    level: "Продвинутый",
    progress: 68,
    completedCourses: 3,
    activeCourses: 2,
    totalStudyTime: "45 часов"
  };

  const currentCourses = [
    {
      id: 1,
      title: "Сетевая безопасность",
      progress: 45,
      lastActivity: "2 дня назад"
    },
    {
      id: 2, 
      title: "Cisco Networking",
      progress: 15,
      lastActivity: "1 неделю назад"
    }
  ];

  const completedCourses = [
    {
      id: 1,
      title: "Введение в сети",
      completedDate: "10.02.2024",
      score: 92
    },
    {
      id: 2,
      title: "TCP/IP протоколы", 
      completedDate: "28.02.2024",
      score: 87
    },
    {
      id: 3,
      title: "Беспроводные сети",
      completedDate: "15.03.2024", 
      score: 95
    }
  ];

  return (
    <>
      <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <NetworkBackground/>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="text-emerald-500 font-mono">$ whoami</span>
              <br/>
              <span className="font-sans bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Профиль пользователя
              </span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6 sticky top-32">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-500 font-mono text-sm">user_info</span>
                </div>

                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-emerald-500 font-mono">NA</span>
                  </div>
                  <h2 className="text-xl font-bold text-white font-mono">{userData.username}</h2>
                  <p className="text-slate-400 text-sm mt-1">{userData.email}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-mono text-sm">Уровень:</span>
                    <span className="text-emerald-500 font-mono text-sm">{userData.level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-mono text-sm">В системе:</span>
                    <span className="text-slate-300 font-mono text-sm">{userData.joinDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-mono text-sm">Обучение:</span>
                    <span className="text-slate-300 font-mono text-sm">{userData.totalStudyTime}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-500/20">
                  <div className="flex justify-between text-slate-400 font-mono text-xs mb-2">
                    <span>Общий прогресс</span>
                    <span>{userData.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${userData.progress}%` }}
                    ></div>
                  </div>
                </div>

                <Link to="/editprofile">
                <button className="w-full mt-6 px-4 py-2 bg-slate-800 cursor-pointer text-slate-300 rounded-lg font-mono hover:bg-slate-700 transition-all border border-slate-600 hover:border-emerald-500/50 text-sm">
                  $ edit_profile.sh
                </button></Link>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-slate-500 font-mono text-sm">active_courses</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 font-mono">Активные курсы ({currentCourses.length})</h3>
                  
                  <div className="space-y-4">
                    {currentCourses.map(course => (
                      <div key={course.id} className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-white font-medium">{course.title}</h4>
                          <span className="text-slate-400 text-sm">{course.lastActivity}</span>
                        </div>
                        <div className="flex justify-between text-slate-400 text-xs mb-2">
                          <span>Прогресс</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                          <Link 
                            to={`/courses/${course.id}/learn`}
                            className="inline-block mt-3 w-full sm:w-auto px-4 py-2 bg-emerald-500 text-slate-950 rounded-lg font-mono font-bold text-sm hover:bg-emerald-400 transition-all border border-emerald-500/50 hover:shadow-md hover:shadow-emerald-500/40 active:scale-95"
                          >
                            $ continue.sh
                          </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-slate-500 font-mono text-sm">completed_courses</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 font-mono">Завершенные курсы ({completedCourses.length})</h3>
                  
                  <div className="space-y-3">
                    {completedCourses.map(course => (
                      <div key={course.id} className="flex justify-between items-center bg-slate-800 border border-slate-600 rounded-lg p-4">
                        <div>
                          <h4 className="text-white font-medium">{course.title}</h4>
                          <p className="text-slate-400 text-sm">Завершен: {course.completedDate}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-500 font-mono text-lg">{course.score}%</div>
                          <div className="text-slate-400 text-xs">Оценка</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-slate-500 font-mono text-sm">learning_stats</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-6 font-mono">Статистика обучения</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-500 font-mono">{userData.completedCourses}</div>
                      <div className="text-slate-400 text-sm mt-1">Завершено курсов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-500 font-mono">{userData.activeCourses}</div>
                      <div className="text-slate-400 text-sm mt-1">Активных курсов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white font-mono">{userData.totalStudyTime}</div>
                      <div className="text-slate-400 text-sm mt-1">Часов обучения</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-500 font-mono">{userData.progress}%</div>
                      <div className="text-slate-400 text-sm mt-1">Общий прогресс</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}