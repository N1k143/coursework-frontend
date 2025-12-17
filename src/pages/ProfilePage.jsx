import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NetworkBackground from '../components/NetworkBackground';
import { authAPI, userAPI, coursesAPI, progressAPI, enrollmentsAPI, handleApiError } from '../services/api';
import { Camera } from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [userData, setUserData] = useState(null);
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [unenrollingCourseId, setUnenrollingCourseId] = useState(null);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    if (!authAPI.isAuthenticated()) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const currentUser = authAPI.getCurrentUser();
      if (!currentUser) throw new Error('Пользователь не найден');

      const user = await userAPI.getById(currentUser.id);

      authAPI.saveAuthData(localStorage.getItem('authToken'), user);

      const allCourses = await coursesAPI.getAll();

      const coursesWithProgressPromises = allCourses.map(async (course) => {
        try {
          const progressData = await progressAPI.getByCourse(course.id);

          let progressPercentage = 0;
          if (progressData.status === 'completed') {
            progressPercentage = 100;
          } else if (progressData.status === 'in_progress') {
            progressPercentage = 50;
          } else {
            progressPercentage = 0;
          }
          
          return { 
            ...course, 
            progress: progressPercentage,
            status: progressData.status 
          };
        } catch (err) {
          return { 
            ...course, 
            progress: 0,
            status: 'not_started' 
          };
        }
      });
      
      const coursesWithProgress = await Promise.all(coursesWithProgressPromises);

      const enrolledCourseIds = user.enrollments?.map(e => e.courseId) || [];

      const userEnrolledCourses = coursesWithProgress.filter(course =>
        enrolledCourseIds.includes(course.id)
      );

      
      const completedCoursesCount = userEnrolledCourses.filter(course => course.progress >= 100).length;
      const activeCoursesCount = userEnrolledCourses.filter(course => course.progress > 0 && course.progress < 100).length;
      
      const totalProgress = userEnrolledCourses.length > 0 
        ? Math.round(userEnrolledCourses.reduce((sum, course) => sum + course.progress, 0) / userEnrolledCourses.length)
        : 0;

      setUserData({
        username: user.username || 'Пользователь',
        email: user.email,
        joinDate: formatJoinDate(user.createdAt),
        level: calculateLevel(totalProgress),
        progress: totalProgress,
        completedCourses: completedCoursesCount,
        activeCourses: activeCoursesCount,
        avatarUrl: user.avatarUrl, 
        id: user.id 
      });

      setUserCourses(userEnrolledCourses);

    } catch (err) {
      console.error('Ошибка загрузки профиля:', err);
      const errorMsg = handleApiError(err, 'Не удалось загрузить данные профиля');
      setError(errorMsg);

      const currentUser = authAPI.getCurrentUser();
      if (currentUser) {
        setUserData({
          username: currentUser.username || 'Пользователь',
          email: currentUser.email,
          joinDate: new Date().toLocaleDateString('ru-RU'),
          level: 'Начинающий',
          progress: 0,
          completedCourses: 0,
          activeCourses: 0,
          avatarUrl: currentUser.avatarUrl, 
          id: currentUser.id 
        });
        setUserCourses([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, выберите изображение');
      return;
    }

    setAvatarLoading(true);
    setError('');

    try {
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const avatarUrl = reader.result;
        
        const currentUser = authAPI.getCurrentUser();
        if (!currentUser) throw new Error('Пользователь не найден');

        await userAPI.update(currentUser.id, { avatarUrl });

        const updatedUser = { ...currentUser, avatarUrl };
        authAPI.saveAuthData(localStorage.getItem('authToken'), updatedUser);

        setUserData(prev => ({ ...prev, avatarUrl }));
        setAvatarLoading(false);
      };
      
      reader.readAsDataURL(file);
      
    } catch (err) {
      console.error('Ошибка загрузки или обновления аватара:', err);
      setError(handleApiError(err, 'Не удалось обновить аватар'));
      setAvatarLoading(false);
    }
  };

  const formatJoinDate = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString('ru-RU');
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const calculateLevel = (progress) => {
    if (progress >= 80) return "Продвинутый";
    if (progress >= 50) return "Средний";
    return "Начинающий";
  };

  const currentCourses = userCourses.filter(course => course.progress < 100);
  const completedCourses = userCourses.filter(course => course.progress >= 100);

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };

  const handleUnenroll = async (courseId) => {
    setUnenrollingCourseId(courseId);
    setError('');

    try {
      const currentUser = authAPI.getCurrentUser();
      if (!currentUser) throw new Error('Пользователь не найден');

      const enrollment = currentUser.enrollments?.find(e => e.courseId === courseId);
      if (!enrollment) throw new Error('Запись на курс не найдена');

      await enrollmentsAPI.unenroll(courseId, enrollment.id);

      await loadProfileData();
      
    } catch (err) {
      console.error('Ошибка отписки от курса:', err);
      setError(handleApiError(err, 'Не удалось отписаться от курса'));
    } finally {
      setUnenrollingCourseId(null);
    }
  };

  const refreshProfile = () => {
    loadProfileData();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-emerald-500 font-mono text-xl mt-4">$ loading_profile...</div>
        </div>
      </main>
    );
  }

  if (error && !userData) {
    return (
      <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 font-mono text-xl mb-4">$ error: {error}</div>
          <button 
            onClick={refreshProfile}
            className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-lg font-mono font-bold hover:bg-emerald-400 transition-all"
          >
            $ retry.sh
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <NetworkBackground/>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8 md:mb-12">            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="text-emerald-500 font-mono text-xl sm:text-3xl lg:text-4xl">$ whoami</span>
              <br/>
              <span className="font-sans bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Профиль пользователя
              </span>
            </h1>
            
            {error && (
              <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg max-w-md mx-auto">
                <div className="text-yellow-400 font-mono text-xs sm:text-sm break-words">
                  <span className="text-yellow-500">⚠</span> {error}
                </div>
              </div>
            )}

            <button 
              onClick={refreshProfile}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg font-mono text-sm hover:bg-slate-700 transition-all border border-slate-600 mb-4"
            >
              $ refresh.sh
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-1">
              <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 sm:p-6 lg:sticky lg:top-32">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-500 font-mono text-sm">user_info</span>
                </div>

                <div className="text-center mb-6">
                  <div className="relative group mx-auto mb-4 w-16 h-16 sm:w-20 sm:h-20">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center overflow-hidden">
                      {userData?.avatarUrl ? (
                        <img 
                          src={userData.avatarUrl} 
                          alt="Аватар"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl sm:text-2xl text-emerald-500 font-mono">
                          {userData?.username?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={avatarLoading}
                      className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      {avatarLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Camera className="w-5 h-5 text-white" />
                      )}
                    </button>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-white font-mono break-words">{userData?.username}</h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1 break-all">{userData?.email}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-mono text-sm">Уровень:</span>
                    <span className="text-emerald-500 font-mono text-sm">{userData?.level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-mono text-sm">В системе:</span>
                    <span className="text-slate-300 font-mono text-sm">{userData?.joinDate}</span>
                  </div>

                </div>

                <div className="mt-6 pt-4 border-t border-emerald-500/20">
                  <div className="flex justify-between text-slate-400 font-mono text-xs mb-2">
                    <span>Общий прогресс</span>
                    <span>{userData?.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${userData?.progress || 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link to="/editprofile">
                    <button className="w-full px-4 py-2 bg-slate-800 text-slate-300 rounded-lg font-mono hover:bg-slate-700 transition-all border border-slate-600 hover:border-emerald-500/50 text-sm">
                      $ edit_profile.sh
                    </button>
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full mt-3 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-mono hover:bg-red-500/30 transition-all border border-red-500/30 text-sm"
                  >
                    $ logout.sh
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-6 lg:space-y-8">
                <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-slate-500 font-mono text-sm">active_courses</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 font-mono">
                    Активные курсы ({currentCourses.length})
                  </h3>
                  
                  {currentCourses.length > 0 ? (
                    <div className="space-y-4">
                      {currentCourses.map(course => (
                        <div key={course.id} className="bg-slate-800 border border-slate-600 rounded-lg p-3 sm:p-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                            <h4 className="text-white font-medium text-sm sm:text-base break-words">{course.title}</h4>
                            <span className="text-slate-400 text-xs sm:text-sm whitespace-nowrap">
                              Прогресс: {course.progress || 0}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                            <div 
                              className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${course.progress || 0}%` }}
                            ></div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Link 
                              to={`/course/${course.id}`}
                              className="flex-1 px-3 sm:px-4 py-2 bg-emerald-500 text-slate-950 rounded-lg font-mono font-bold text-xs sm:text-sm hover:bg-emerald-400 transition-all text-center flex items-center justify-center gap-2"
                            >
                              {course.status === 'completed' ? (
                                <>
                                  <span className="w-2 h-2 bg-slate-950 rounded-full"></span>
                                  {'> '}review_course.sh
                                </>
                              ) : course.status === 'in_progress' ? (
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
                            </Link>
                            <button
                              onClick={() => handleUnenroll(course.id)}
                              disabled={unenrollingCourseId === course.id}
                              className="px-3 sm:px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-mono text-xs sm:text-sm hover:bg-red-500/30 transition-all border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {unenrollingCourseId === course.id ? (
                                <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                '$ unenroll.sh'
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-slate-400 font-mono mb-4 text-sm sm:text-base">Нет активных курсов</div>
                      <Link 
                        to="/courses"
                        className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-emerald-500 text-slate-950 rounded-lg font-mono font-bold text-sm sm:text-base hover:bg-emerald-400 transition-all"
                      >
                        $ browse_courses.sh
                      </Link>
                    </div>
                  )}
                </div>

                <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-slate-500 font-mono text-sm">completed_courses</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 font-mono">
                    Завершенные курсы ({completedCourses.length})
                  </h3>
                  
                  {completedCourses.length > 0 ? (
                    <div className="space-y-3">
                      {completedCourses.map(course => (
                        <div key={course.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-slate-800 border border-slate-600 rounded-lg p-3 sm:p-4">
                          <div>
                            <h4 className="text-white font-medium text-sm sm:text-base break-words">{course.title}</h4>
                          </div>
                          <div className="text-left sm:text-right">
                            <div className="text-emerald-500 font-mono text-base sm:text-lg">
                              {course.progress || 100}%
                            </div>
                            <div className="text-slate-400 text-xs">Результат</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-slate-400 font-mono text-sm sm:text-base">Пока нет завершенных курсов</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}