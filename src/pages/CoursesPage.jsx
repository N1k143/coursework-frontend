import React, { useState, useEffect } from 'react';
import NetworkBackground from "../components/NetworkBackground";
import { Link, useNavigate } from 'react-router-dom';
import { coursesAPI, enrollmentsAPI, authAPI, userAPI, progressAPI, handleApiError } from '../services/api';
import { Network, ShieldCheck, Code2 } from 'lucide-react';
import ToastContainer from '../components/Toast';

export default function CoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    loadCoursesWithEnrollment();
  }, []);

  const loadCoursesWithEnrollment = async () => {
    setLoading(true);
    setError('');
    
    try {
      const allCourses = await coursesAPI.getAll();

      const currentUser = authAPI.getCurrentUser();
      let userEnrolledIds = [];
      let coursesWithProgress = [];

      if (currentUser) {
        try {
          const user = await userAPI.getById(currentUser.id);
          userEnrolledIds = user.enrollments?.map(e => e.courseId) || [];
          setEnrolledCourseIds(userEnrolledIds);

          const coursesWithProgressPromises = allCourses.map(async (course) => {
            const isEnrolled = userEnrolledIds.includes(course.id);
            
            if (isEnrolled) {
              try {
                const progressData = await progressAPI.getByCourse(course.id);
                return {
                  ...course,
                  isEnrolled: true,
                  progress: progressData.status,
                  progressPercentage: progressData.status === 'completed' ? 100 : 
                                     progressData.status === 'in_progress' ? 50 : 0
                };
              } catch (err) {
                return {
                  ...course,
                  isEnrolled: true,
                  progress: 'not_started',
                  progressPercentage: 0
                };
              }
            } else {
              return {
                ...course,
                isEnrolled: false,
                progress: 'not_started',
                progressPercentage: 0
              };
            }
          });

          coursesWithProgress = await Promise.all(coursesWithProgressPromises);
        } catch (err) {
          console.error('Ошибка загрузки данных пользователя:', err);
          coursesWithProgress = allCourses.map(course => ({
            ...course,
            isEnrolled: false,
            progress: 'not_started',
            progressPercentage: 0
          }));
        }
      } else {
        coursesWithProgress = allCourses.map(course => ({
          ...course,
          isEnrolled: false,
          progress: 'not_started',
          progressPercentage: 0
        }));
      }

      const formattedCourses = coursesWithProgress.map(course => ({
        id: course.id || course._id,
        title: course.title || 'Без названия',
        description: course.description || 'Описание отсутствует',
        progress: course.progress,
        progressPercentage: course.progressPercentage,
        isEnrolled: course.isEnrolled,
        icon: getIconByCategory(course.category),
        category: course.category || 'other'
      }));
      
      setCourses(formattedCourses);
    } catch (err) {
      console.error('Error loading courses:', err);
      const errorMessage = handleApiError(err, 'Не удалось загрузить курсы. Попробуйте позже.');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getLevel = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return 'Начальный';
      case 'intermediate': return 'Средний';
      case 'advanced': return 'Продвинутый';
      default: return 'Начальный';
    }
  };

  const getCategoryName = (category) => {
    switch(category) {
      case 'programming': return 'programming';
      case 'networking': return 'networking';
      case 'cybersecurity': return 'cybersecurity';
      default: return 'Другое';
    }
  };

  const handleEnroll = async (courseId) => {
    const user = authAPI.getCurrentUser();
    if (!user) {
      addToast('Пожалуйста, войдите в систему, чтобы записаться на курс.', 'error');
      navigate('/login');
      return;
    }

    setEnrollingCourseId(courseId);

     try {
      await enrollmentsAPI.enroll(courseId, String(user.id));
      addToast('Вы успешно записаны на курс!', 'success');
      await loadCoursesWithEnrollment();
    } catch (err) {
      addToast(handleApiError(err, 'Не удалось записаться на курс.'), 'error');
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const handleCourseAction = async (course) => {
    if (!course.isEnrolled) {
      await handleEnroll(course.id);
    } else {
      if (course.progress === 'not_started') {
        try {
          await progressAPI.update(course.id, {
            status: 'in_progress',
            completedLessons: []
          });
          await loadCoursesWithEnrollment();
        } catch (err) {
          console.error('Ошибка обновления прогресса:', err);
        }
      }
      navigate(`/course/${course.id}`);
    }
  };

  const getIconByCategory = (category) => {
    const icons = {
      programming: <Code2 className="w-8 h-8 text-emerald-500" />,
      networking: <Network className="w-8 h-8 text-cyan-500" />,
      cybersecurity: <ShieldCheck className="w-8 h-8 text-red-500" />,
      default: <Code2 className="w-8 h-8 text-slate-500" />
    };
    return icons[category] || icons.default;
  };

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    return course.category === filter;
  });

  const stats = {
    total: courses.length,
    enrolled: courses.filter(c => c.isEnrolled).length,
    completed: courses.filter(c => c.progress === 'completed').length,
    inProgress: courses.filter(c => c.progress === 'in_progress').length,
    programming: courses.filter(c => c.category === 'programming').length,
    networking: courses.filter(c => c.category === 'networking').length,
    cybersecurity: courses.filter(c => c.category === 'cybersecurity').length
  };

  const mapProgressValue = (status) => {
    switch (status) {
      case 'completed':
        return 100;
      case 'in_progress':
        return 50;
      case 'not_started':
      default:
        return 0;
    }
  };

  return (
    <>
      <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <NetworkBackground/>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>       
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg mb-6 font-mono group hover:border-emerald-500/50 transition-all duration-300">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm text-emerald-400">$ ./load_courses.sh</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="text-emerald-500 font-mono">root@courses:~#</span>
              <br/>
              <span className="font-sans bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Каталог курсов
              </span>
            </h1>
            
            <div className="bg-slate-900 border border-emerald-500/30 rounded-lg p-4 max-w-2xl mx-auto font-mono text-sm">
              {loading ? (
                <div className="text-emerald-500">// Загрузка данных с сервера...</div>
              ) : error ? (
                <div className="text-red-500">// Ошибка: {error}</div>
              ) : (
                <>
                  <div className="text-emerald-500 mb-2">// Available modules: {stats.total}</div>
                  <div className="text-slate-400">Выберите курс для загрузки в систему обучения</div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button 
              onClick={() => setFilter('all')}
              className={`group cursor-pointer px-5 py-2.5 rounded-lg font-bold transition-all duration-300 font-mono text-sm flex items-center gap-2 ${
                filter === 'all' 
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/50' 
                  : 'bg-slate-900 text-slate-300 border border-emerald-500/30 hover:border-emerald-500 hover:bg-slate-800/80'
              }`}
            >
              <span className="w-2 h-2 bg-current rounded-full animate-pulse"></span>
              $ ls -la courses/
            </button>
            <button 
              onClick={() => setFilter('programming')}
              className={`group cursor-pointer px-5 py-2.5 rounded-lg font-bold transition-all duration-300 font-mono text-sm flex items-center gap-2 ${
                filter === 'programming' 
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/50' 
                  : 'bg-slate-900 text-slate-300 border border-emerald-500/30 hover:border-emerald-500 hover:bg-slate-800/80'
              }`}
            >
              <Code2 className="w-4 h-4" />
              programming ({stats.programming})
            </button>
            <button 
              onClick={() => setFilter('networking')}
              className={`group cursor-pointer px-5 py-2.5 rounded-lg font-bold transition-all duration-300 font-mono text-sm flex items-center gap-2 ${
                filter === 'networking' 
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/50' 
                  : 'bg-slate-900 text-slate-300 border border-emerald-500/30 hover:border-emerald-500 hover:bg-slate-800/80'
              }`}
            >
              <Network className="w-4 h-4" />
              networking ({stats.networking})
            </button>
            <button 
              onClick={() => setFilter('cybersecurity')}
              className={`group cursor-pointer px-5 py-2.5 rounded-lg font-bold transition-all duration-300 font-mono text-sm flex items-center gap-2 ${
                filter === 'cybersecurity' 
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/50' 
                  : 'bg-slate-900 text-slate-300 border border-emerald-500/30 hover:border-emerald-500 hover:bg-slate-800/80'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              cybersecurity ({stats.cybersecurity})
            </button>
          </div>

          {loading ? (
            <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="text-emerald-500 font-mono text-xl mt-4">$ loading_courses...</div>
              </div>
            </main>
          ) : error && courses.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-red-500 font-mono text-lg mb-4">Ошибка загрузки</div>
              <div className="text-slate-300 font-mono mb-6">{error}</div>
              <button 
                onClick={loadCoursesWithEnrollment}
                className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-all font-mono"
              >
                $ ./retry.sh
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div 
                    key={course.id}
                    className="group relative bg-slate-900 border border-emerald-500/20 rounded-xl p-5 hover:border-emerald-500 hover:bg-slate-900/90 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 flex flex-col"
                  >
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-500/50 rounded-tr-xl group-hover:border-emerald-500 transition-all duration-300"></div>
                    
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">
                        {course.icon}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 font-mono group-hover:text-emerald-400 transition-colors duration-300">
                      {course.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                      {course.description}
                    </p>

                    {course.isEnrolled && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              course.progress === 'completed' ? 'bg-green-500 animate-pulse' :
                              course.progress === 'in_progress' ? 'bg-emerald-500 animate-pulse' :
                              'bg-slate-600'
                            }`}></div>

                            <span className={`text-xs font-mono font-bold ${
                              course.progress === 'completed' ? 'text-green-500' :
                              course.progress === 'in_progress' ? 'text-emerald-400' :
                              'text-slate-400'
                            }`}>
                              {course.progress === 'completed' ? 'COMPLETED' :
                              course.progress === 'in_progress' ? 'IN PROGRESS' :
                              'NOT STARTED'}
                            </span>
                          </div>
                        </div>

                        <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                          <div 
                            className={`h-1 rounded-full transition-all duration-1000 ease-out ${
                              course.progress === 'completed'
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                : course.progress === 'in_progress'
                                ? 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500'
                                : 'bg-gradient-to-r from-slate-600 to-slate-500'
                            } group-hover:animate-pulse`}
                            style={{ width: `${mapProgressValue(course.progress)}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-1">
                          <span>NOT STARTED</span>
                          <span>IN PROGRESS</span>
                          <span>COMPLETED</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4 text-xs text-slate-500 font-mono">
                      <div className={`px-2 py-1 rounded border ${
                        course.category === 'programming' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                        course.category === 'networking' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' :
                        course.category === 'cybersecurity' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                        'bg-purple-500/10 text-purple-400 border-purple-500/30'
                      }`}>
                        {getCategoryName(course.category)}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCourseAction(course)}
                      disabled={loading || enrollingCourseId === course.id}
                      className={`w-full px-4 py-2.5 rounded-lg font-bold transition-all duration-300 hover:shadow-lg font-mono text-sm group/btn relative overflow-hidden ${
                        course.isEnrolled
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-emerald-500/30'
                          : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/30'
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {enrollingCourseId === course.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            Загрузка...
                          </>
                        ) : course.isEnrolled ? (
                          <>
                            {course.progress === 'completed' ? (
                              <>
                                <span className="w-2 h-2 bg-slate-950 rounded-full"></span>
                                {'> '}review_course.sh
                              </>
                            ) : course.progress === 'in_progress' ? (
                              <>
                                <span className="w-2 h-2 bg-slate-950 rounded-full animate-pulse"></span>
                                {'> '}continue.sh
                              </>
                            ) : (
                              <>
                                <span className="w-2 h-2 bg-slate-950 rounded-full"></span>
                                {'> '}start.sh
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            {'> '}enroll.sh
                          </>
                        )}
                      </span>
                      <div className={`absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ${
                        course.isEnrolled
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-300'
                          : 'bg-gradient-to-r from-blue-500 to-blue-300'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
              {filteredCourses.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-slate-400 font-mono text-lg mb-4">// No courses found</div>
                </div>
              )}

              <div className="mt-16 text-center">
                <div className="inline-grid grid-cols-4 gap-4 sm:gap-8 bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 font-mono text-sm">
                  <div>
                    <div className="text-2xl font-bold text-emerald-500">{stats.total}</div>
                    <div className="text-slate-400">TOTAL</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
                    <div className="text-slate-400">PASSED</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-500">{stats.inProgress}</div>
                    <div className="text-slate-400">IN PROGRESS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-500">{stats.enrolled}</div>
                    <div className="text-slate-400">ENROLLED</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}