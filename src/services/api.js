const API_BASE_URL = 'http://localhost:3000/api';

async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }

    console.log(`API Request: ${config.method || 'GET'} ${url}`, config.body ? { body: config.body } : '');

    try {
        const response = await fetch(url, config);

        let data;
        try {
            data = await response.json();
        } catch (e) {
            throw new Error(`Invalid JSON response from server: ${response.status} ${response.statusText}`);
        }

        if (!response.ok) {
            const errorMessage = data.message || data.error || `HTTP Error: ${response.status}`;
            throw new Error(errorMessage);
        }

        console.log(`API Response: ${url}`, data);
        return data;

    } catch (error) {
        console.error(`API Error: ${url}`, error);

        let userMessage = error.message;
        
        if (error.message.includes('Failed to fetch') || 
            error.message.includes('NetworkError') ||
            error.message.includes('Network Error')) {
            userMessage = 'Не удалось подключиться к серверу. Проверьте интернет-соединение.';
        } 
        else if (error.message.includes('timeout')) {
            userMessage = 'Сервер не отвечает. Попробуйте позже.';
        }
        else if (error.message.includes('Invalid JSON')) {
            userMessage = 'Некорректный ответ сервера.';
        }

        throw new Error(userMessage);
    }
}

// ============ АУТЕНТИФИКАЦИЯ ============
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
        console.log('Auth data saved:', { user });
    },

    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        console.log('User logged out');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('userData');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    }
};

// ============ ПОЛЬЗОВАТЕЛИ ============
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
    })
};

// ============ КУРСЫ ============
export const coursesAPI = {
    getAll: () => apiRequest('/courses'),

    getById: (id) => apiRequest(`/courses/${id}`),
};

// ============ ЗАПИСИ НА КУРСЫ ============
export const enrollmentsAPI = {
  enroll: (courseId, userId) => apiRequest(`/courses/${courseId}/enrollments`, {
    method: 'POST',
    body: { userId }
  }),

  getEnrolledCourseByUserId: (userId) => apiRequest(`/users/${userId}/enrollment`),
  
  unenroll: (courseId, userId) => apiRequest(`/courses/${courseId}/enrollments`, {
    method: 'DELETE',
    body: { userId }
  })
};



// ============ РАЗДЕЛЫ КУРСОВ ============
export const sectionsAPI = {
    getByCourse: (courseId) => apiRequest(`/courses/${courseId}/sections`),

    getById: (courseId, sectionId) => apiRequest(`/courses/${courseId}/sections/${sectionId}`),
};

// ============ УРОКИ ============
export const lessonsAPI = {
    getBySection: (courseId, sectionId) => apiRequest(`/courses/${courseId}/sections/${sectionId}/lessons`),

    getById: (courseId, sectionId, lessonId) => apiRequest(`/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`),
};

// ============ ПРОГРЕСС КУРСОВ ============
export const progressAPI = {
  getByCourse: (courseId) => apiRequest(`/courses/${courseId}/progress`),

  update: (courseId, progressData) => apiRequest(`/courses/${courseId}/progress`, {
    method: 'PUT',
    body: progressData 
  })
};

// ============ ВИКТОРИНЫ ============
export const quizzesAPI = {
    getByLesson: (courseId, sectionId, lessonId) => 
        apiRequest(`/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/quizzes`),

    getById: (courseId, sectionId, lessonId, quizId) => 
        apiRequest(`/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/quizzes/${quizId}`),

    getQuestions: (courseId, sectionId, lessonId, quizId) => 
        apiRequest(`/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/quizzes/${quizId}/questions`),

    getAnswers: (courseId, sectionId, lessonId, quizId, questionId) => 
        apiRequest(`/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/quizzes/${quizId}/questions/${questionId}/answers`),

    submitResults: (courseId, sectionId, lessonId, quizId, results) => 
        apiRequest(`/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/quizzes/${quizId}/submit`, {
            method: 'POST',
            body: results
        })
};

// ============ СОКРАЩАТЕЛЬ ССЫЛОК ============
export const shortenerAPI = {
    getInfo: (short) => apiRequest(`/shorten/${short}`)
};

// ============ УТИЛИТЫ ============
export const handleApiError = (error, defaultMessage = 'Произошла ошибка') => {
    console.error('API Error Handling:', error);

    const message = error.message || defaultMessage;

    if (message.includes('401') || message.includes('Unauthorized')) {
        authAPI.logout();
        return 'Сессия истекла. Пожалуйста, войдите снова.';
    }
    if (message.includes('403') || message.includes('Forbidden')) {
        return 'Недостаточно прав для выполнения этого действия.';
    }
    if (message.includes('404') || message.includes('Not Found')) {
        return 'Запрашиваемый ресурс не найден.';
    }
    if (message.includes('409') || message.includes('Conflict')) {
        return 'Ресурс уже существует или возник конфликт данных.';
    }
    if (message.includes('422') || message.includes('Validation')) {
        return 'Некорректные данные. Проверьте введенную информацию.';
    }
    if (message.includes('500') || message.includes('Server Error')) {
        return 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.';
    }

    return message;
};

export const sanitizeData = (data) => {
    const cleaned = {};

    Object.keys(data).forEach(key => {
        let value = data[key];

        if (typeof value === 'string') {
            value = value.trim();
            
            if (key === 'email' && !value.includes('@')) {
                throw new Error('Некорректный email адрес');
            }
        }

        if (value !== '' && value !== null && value !== undefined) {
            cleaned[key] = value;
        }
    });

    return cleaned;
};

// Хелпер для построения URL с параметрами
export const buildUrl = (baseUrl, params = {}) => {
    const url = new URL(baseUrl, window.location.origin);
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });
    return url.pathname + url.search;
};

// Получение заголовков авторизации
export const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
    };
};


export default apiRequest;