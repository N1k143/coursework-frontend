import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NetworkBackground from "../components/NetworkBackground";
import { authAPI, handleApiError, sanitizeData } from '../services/api';

const TURNSTILE_SITE_KEY = '0x4AAAAAACITMsfMKl-hLohP';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',          
    username: '',         
    password: '',       
    confirmPassword: '' 
  });
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [turnstileToken, setTurnstileToken] = useState(null);

  const navigate = useNavigate();
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    const initTurnstile = () => {
      if (!window.turnstile || widgetIdRef.current !== null) return;

      try {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token) => {
            console.log('Turnstile token получен (регистрация)');
            setTurnstileToken(token);
          },
          'expired-callback': () => {
            console.log('Turnstile token истёк (регистрация)');
            setTurnstileToken(null);
          },
          'error-callback': () => {
            console.error('Ошибка Turnstile (регистрация)');
            setTurnstileToken(null);
            setError('Ошибка проверки капчи. Попробуйте ещё раз.');
          }
        });
      } catch (err) {
        console.error('Ошибка инициализации Turnstile:', err);
      }
    };

    const checkTurnstile = setInterval(() => {
      if (window.turnstile) {
        initTurnstile();
        clearInterval(checkTurnstile);
      }
    }, 100);

    return () => {
      clearInterval(checkTurnstile);
      if (window.turnstile && widgetIdRef.current !== null) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (err) {
          console.error('Ошибка при удалении Turnstile:', err);
        }
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email обязателен для заполнения');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Введите корректный email адрес');
      return false;
    }
    if (formData.username.length < 3) {
      setError('Username должен содержать минимум 3 символа');
      return false;
    }
    if (formData.username.length > 20) {
      setError('Username не должен превышать 20 символов');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Пароль должен содержать минимум 8 символов');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return false;
    }
    if (!turnstileToken) {
      setError('Подтвердите, что вы не робот');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const cleanData = sanitizeData({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        turnstileToken
      });

      console.log('Отправка данных на сервер:', { ...cleanData, password: '***' });
      const result = await authAPI.register(cleanData);
      console.log('Регистрация успешна:', result);
      
      setSuccess('Регистрация прошла успешно! Перенаправляем на страницу входа...');
      setTimeout(() => {
        navigate('/login', {
          state: { 
            message: 'Регистрация прошла успешно! Теперь войдите в систему.',
            email: formData.email 
          }
        });
      }, 2000);
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      const errorMessage = handleApiError(err, 'Произошла ошибка при регистрации. Попробуйте еще раз.');
      setError(errorMessage);

      if (window.turnstile && widgetIdRef.current !== null) {
        try {
          window.turnstile.reset(widgetIdRef.current);
          setTurnstileToken(null);
        } catch (resetErr) {
          console.error('Ошибка сброса Turnstile:', resetErr);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-6">
        <div className="absolute inset-0 opacity-30">
          <NetworkBackground/>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>          
        
        <div className="max-w-md mx-auto relative z-10">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              <span className="text-emerald-500 font-mono">$</span>
              <span className="font-sans"> user_register</span>
            </h1>
            
            <p className="text-slate-400 font-mono text-sm">
              Создайте новую учетную запись для доступа к системе
            </p>
          </div>

          <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-8">            
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-500 ml-2 font-mono text-sm">register_terminal</span>
            </div>

            {success && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                <div className="text-green-400 font-mono text-sm">
                  {success}
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <div className="text-red-400 font-mono text-sm">
                  Error: {error}
                </div>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-emerald-500 font-mono text-sm mb-2">
                  $ email:
                </label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="user@example.com"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-emerald-500 font-mono text-sm mb-2">
                  $ username:
                </label>
                <input 
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Введите ваш username"
                  required
                  disabled={loading}
                  minLength="3" 
                  maxLength="20"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-emerald-500 font-mono text-sm mb-2">
                  $ password:
                </label>
                <input 
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Минимум 8 символов"
                  required
                  disabled={loading}
                  minLength="8"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-emerald-500 font-mono text-sm mb-2">
                  $ confirm_password:
                </label>
                <input 
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Повторите пароль"
                  required
                  disabled={loading}
                  minLength="8"
                />
              </div>

              <div className="flex justify-center pt-2">
                <div ref={turnstileRef}></div>
              </div>

              <button 
                type="submit"
                disabled={loading || !turnstileToken}
                className="w-full bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/50 font-mono py-3 text-sm mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '$ Processing...' : '$ ./create_account.sh'}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-emerald-500/30"></div>
              <span className="px-3 text-slate-500 font-mono text-sm">OR</span>
              <div className="flex-1 h-px bg-emerald-500/30"></div>
            </div>

            <div className="text-center">
              <p className="text-slate-400 font-mono text-sm mb-3">
                Уже есть учетная запись?
              </p>
              <Link 
                to="/login" 
                className="inline-block px-6 py-2 bg-transparent text-emerald-500 rounded-lg font-bold border-2 border-emerald-500/50 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all font-mono text-sm"
              >
                $ ./login.sh
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-slate-900 border border-emerald-500/30 rounded-lg p-4 font-mono text-xs">
              <div className="text-emerald-500 mb-2">Registration Rules:</div>
              <div className="text-slate-400 space-y-1">
                <div>• Email должен быть действительным</div>
                <div>• Username: 3-20 символов</div>
                <div>• Пароль: минимум 8 символов</div>
                <div>• Подтвердите, что вы не робот</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}