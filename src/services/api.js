const API_BASE_URL = 'http://46.101.144.175:3000/api';

async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    const token = localStorage.getItem('authToken');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    if(config.body && typeof config.body === 'object'){
        config.body = JSON.stringify(config.body);
    }
    console.log(`Отправляем запрос: ${config.method || 'GET'} ${url}`, config.body);

    try{
        const response = await fetch(url, config);
        const data = await response.json();
        if(!response.ok){
            throw new Error(data.message || `Ошибка сервера: ${response.status}`);
        }
        console.log(`Запрос успешен: ${url}`, data);
        return data;
    } catch (error){
        console.error(`Ошибка запроса: ${url}`, error);
        let userMessage = error.message;
        if(error.message.includes('Failed to fetch') || error.message.includes('Network Error')) {
            userMessage = 'Не удалось подключиться к серверу. Проверьте интернет соединение.';
        }
        else if (error.message.includes('timeout')){
            userMessage = 'Сервер не отвечает. Попробуйте позже.';
        }

        throw new Error(userMessage);
    }
}

// АУТЕНТИФИКАЦИЯ
export const authAPI = {
    register: (userData) => apiRequest('/auth/register', {
        method: 'POST',
        body: userData
    }),
    login: (credentials) => apiRequest('/auth/login', {
        method: 'POST',
        body: credentials
    }),
    saveAuthData: (token, user) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(user));
        console.log('Данные авторизации сохранены');
    },
    logout:() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        console.log('Пользователь вышел из системы');
    },
    getCurrentUser:() => {
        const userStr = localStorage.getItem('userData');
        return userStr ? JSON.parse(userStr) : null;
    },
    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    }
};

// ПОЛЬЗОВАТЕЛИ
export const userAPI = {
    getAll: () => apiRequest('/users'),
    getById: (id) => apiRequest(`/users/${id}`),
    create: (userData) => apiRequest('/users', {
        method: 'POST',
        body: userData
    }),
    update: (id, userData) => apiRequest(`/users/${id}`, {
        method: 'PUT',
        body: userData
    }),
    delete: (id) => apiRequest(`/users/${id}`, {
        method: 'DELETE'
    }),

    // Дополнительные методы для профиля
    updateAvatar: (avatarUrl) => {
        const user = authAPI.getCurrentUser();
        if (user) {
            return userAPI.update(user.id, { avatarUrl });
        }
        throw new Error('Пользователь не найден');
    },

    updateProfile: (userData) => {
        const user = authAPI.getCurrentUser();
        if (user) {
            return userAPI.update(user.id, userData);
        }
        throw new Error('Пользователь не найден');
    }
};

//КУРСЫ
export const coursesAPI ={
    getAll: () => apiRequest('/courses'),
    getById: (id) => apiRequest(`/courses/${id}`),
    create: (courseData) => apiRequest('/courses', {
        method: 'POST',
        body: courseData
    }),
    update: (id, courseData) => apiRequest(`/courses/${id}`, {
        method: 'PUT',
        body: courseData
    }),
    delete: (id) => apiRequest(`/courses/${id}`, {
        method: 'DELETE'
    }),

    // Дополнительные методы
    getUserCourses: async () => {
        // Получаем все курсы и фильтруем по записям пользователя
        const allCourses = await coursesAPI.getAll();
        const userEnrollments = await enrollmentsAPI.getUserEnrollments();
        const enrolledCourseIds = userEnrollments.map(enrollment => enrollment.courseId);
        
        return allCourses.filter(course => enrolledCourseIds.includes(course.id));
    },

    getCourseProgress: (courseId) => progressAPI.getCourseProgress(courseId)
};

//ЗАПИСИ НА КУРСЫ
export const enrollmentsAPI = {
    getByCourse: (courseId) => apiRequest(`/courses/${courseId}/enrollments`),
    
    enroll: (courseId) => {
        const user = authAPI.getCurrentUser();
        return apiRequest(`/courses/${courseId}/enrollments`, {
            method: 'POST',
            body: { userId: user?.id }
        });
    },
    
    unenroll: (courseId, enrollmentId) => apiRequest(`/courses/${courseId}/enrollments/${enrollmentId}`, {
        method: 'DELETE'
    }),

    // Получить все записи пользователя
    getUserEnrollments: async () => {
        const allCourses = await coursesAPI.getAll();
        const enrollmentsPromises = allCourses.map(course => 
            enrollmentsAPI.getByCourse(course.id).catch(() => [])
        );
        
        const enrollmentsArrays = await Promise.all(enrollmentsPromises);
        const currentUser = authAPI.getCurrentUser();
        
        // Фильтруем записи текущего пользователя
        return enrollmentsArrays.flat().filter(enrollment => 
            enrollment.userId === currentUser?.id
        );
    },

    // Проверить записан ли пользователь на курс
    checkEnrollment: async (courseId) => {
        const enrollments = await enrollmentsAPI.getByCourse(courseId);
        const currentUser = authAPI.getCurrentUser();
        return enrollments.some(enrollment => enrollment.userId === currentUser?.id);
    }
};

//РАЗДЕЛЫ КУРСОВ
export const sectionAPI = {
    getByCourse: (courseId) => apiRequest(`/courses/${courseId}/sections`),
    getById: (courseId, sectionId) => apiRequest(`/courses/${courseId}/sections/${sectionId}`),
    create: (courseId, sectionData) => apiRequest(`/courses/${courseId}/sections`, {
        method: 'POST',
        body: sectionData
    }),
    update: (courseId, sectionId, sectionData) => apiRequest(`/courses/${courseId}/sections/${sectionId}`, {
        method: 'PUT',
        body: sectionData
    }),
    delete: (courseId, sectionId) => apiRequest(`/courses/${courseId}/sections/${sectionId}`, {
        method: 'DELETE'
    })
}

//УРОКИ
export const lessonsAPI = {
    getBySection: (courseId, sectionId) => apiRequest(`/courses/${courseId}/sections/${sectionId}/lessons`),
    getById: (courseId, sectionId, lessonId) => apiRequest(`/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`),
    create: (courseId, sectionId, lessonData) => apiRequest(`/courses/${courseId}/sections/${sectionId}/lessons`, {
        method: 'POST',
        body: lessonData
    }),
    update: (courseId, sectionId, lessonId, lessonData) => apiRequest(`/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`, {
        method: 'PUT',
        body: lessonData
    }),
    delete: (courseId, sectionId, lessonId) => apiRequest(`/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`, {
        method: 'DELETE'
    }),

    // Дополнительные методы
    completeLesson: (courseId, sectionId, lessonId) => 
        progressAPI.updateLessonProgress(courseId, sectionId, lessonId, { completed: true }),

    getLessonWithProgress: async (courseId, sectionId, lessonId) => {
        const [lesson, progress] = await Promise.all([
            lessonsAPI.getById(courseId, sectionId, lessonId),
            progressAPI.getLessonProgress(courseId, sectionId, lessonId).catch(() => ({ completed: false }))
        ]);
        
        return {
            ...lesson,
            completed: progress.completed || false
        };
    }
};

//ПРОГРЕСС 
export const progressAPI = {
    getLessonProgress: (courseId, sectionId, lessonId) => apiRequest(`/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/progress`),
    
    updateLessonProgress: (courseId, sectionId, lessonId, progressData) => apiRequest(`/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/progress`, {
        method: 'PUT',
        body: progressData
    }),
    
    getCourseProgress: (courseId) => apiRequest(`/courses/${courseId}/progress`),

    // Получить общий прогресс пользователя
    getUserProgress: async () => {
        const userCourses = await coursesAPI.getUserCourses();
        let totalProgress = 0;
        let completedCourses = 0;
        let totalStudyTime = 0;

        // Получаем прогресс по каждому курсу
        const progressPromises = userCourses.map(async (course) => {
            try {
                const courseProgress = await progressAPI.getCourseProgress(course.id);
                totalProgress += courseProgress.progress || 0;
                if (courseProgress.progress >= 100) completedCourses++;
                totalStudyTime += courseProgress.studyTime || 0;
                return { ...course, progress: courseProgress.progress || 0 };
            } catch {
                return { ...course, progress: 0 };
            }
        });

        const coursesWithProgress = await Promise.all(progressPromises);
        const averageProgress = userCourses.length > 0 ? Math.round(totalProgress / userCourses.length) : 0;

        return {
            progress: averageProgress,
            completedCourses,
            activeCourses: userCourses.length - completedCourses,
            totalStudyHours: Math.round(totalStudyTime / 60), // конвертируем минуты в часы
            courses: coursesWithProgress
        };
    },

    // Получить статистику пользователя
    getStats: async () => {
        const userCourses = await coursesAPI.getUserCourses();
        let completedLessons = 0;
        let totalScore = 0;
        let scoredLessons = 0;

        // Считаем статистику по всем курсам
        for (const course of userCourses) {
            try {
                const sections = await sectionAPI.getByCourse(course.id);
                for (const section of sections) {
                    const lessons = await lessonsAPI.getBySection(course.id, section.id);
                    for (const lesson of lessons) {
                        try {
                            const progress = await progressAPI.getLessonProgress(course.id, section.id, lesson.id);
                            if (progress.completed) completedLessons++;
                            if (progress.score) {
                                totalScore += progress.score;
                                scoredLessons++;
                            }
                        } catch {
                            // Пропускаем уроки без прогресса
                        }
                    }
                }
            } catch {
                // Пропускаем курсы без разделов
            }
        }

        return {
            completedLessons,
            averageScore: scoredLessons > 0 ? Math.round(totalScore / scoredLessons) : 0,
            streakDays: 0, // Пока не реализовано
            totalCourses: userCourses.length
        };
    }
};

// УТИЛИТЫ ДЛЯ РАБОТЫ С АПИ
export const handleApiError = (error, defaultMessage = 'Произошла ошибка') => {
    console.error('Обработка ошибки API:', error);

    const message = error.message || defaultMessage;

    if(message.includes('401') || message.includes('Unauthorized')){
        authAPI.logout();
        return 'Сессия истекла. Пожалуйста, войдите снова.';
    }
    if(message.includes('403') || message.includes('Forbidden')){
        return 'Недостаточно прав для выполнения этого действия.';
    }
    if (message.includes('404') || message.includes('Not Found')) {
        return 'Запрашиваемый ресурс не найден.';
    }
    if (message.includes('500') || message.includes('Server Error')) {
        return 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.';
    }
    return message;
}

export const sanitizeData = (data) => {
    const cleaned = {};

    Object.keys(data).forEach(key => {
        const value = data[key];

        if(typeof value === 'string'){
            cleaned[key] = value.trim();
        }else {
            cleaned[key] = value;
        }
        if(cleaned[key] === '' || cleaned[key] === null || cleaned[key] === undefined){
            delete cleaned[key];
        }
    });
    return cleaned;
};

// Вспомогательные функции
export const apiHelpers = {
    // Обработка загрузки файлов
    uploadFile: async (file, onProgress = null) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.onprogress = onProgress;
            reader.readAsDataURL(file);
        });
    },

    // Повтор запроса с экспоненциальной задержкой
    retry: async (fn, retries = 3, delay = 1000) => {
        try {
            return await fn();
        } catch (error) {
            if (retries === 0) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
            return apiHelpers.retry(fn, retries - 1, delay * 2);
        }
    },

    // Проверка доступности сервера
    checkServerHealth: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            return response.ok;
        } catch {
            return false;
        }
    }
};

export default apiRequest;