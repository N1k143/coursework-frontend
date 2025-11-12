

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

export default apiRequest;