import React from 'react';
import { Link } from 'react-router-dom';
import NetworkBackground from '../components/NetworkBackground';

export default function PrivacyPolicy() {
  return (
    <>
      <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <NetworkBackground/>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="text-emerald-500 font-mono">$ cat</span>
              <br/>
              <span className="font-sans bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Политика конфиденциальности
              </span>
            </h1>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-3xl space-y-8">
              <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-500 font-mono text-sm">privacy_policy.md</span>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 font-mono flex items-center gap-2">
                    <span className="text-emerald-500">#</span> Введение
                  </h3>
                  <div className="text-slate-300 space-y-4">
                    <p>
                      NetCourse ценит вашу конфиденциальность. 
                      Эта политика объясняет, как мы собираем, используем и защищаем 
                      вашу личную информацию при использовании нашей образовательной платформы.
                    </p>
                    <p>
                      Используя NetCourse, вы соглашаетесь с условиями этой политики.
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 font-mono flex items-center gap-2">
                    <span className="text-emerald-500">#</span> Собираемая информация
                  </h3>
                  <div className="text-slate-300 space-y-4">
                    <p>Мы собираем следующую информацию:</p>
                    
                    <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4">
                      <div className="text-emerald-500 mb-2">// Данные пользователя:</div>
                      <div className="text-slate-400 space-y-1">
                        <div>• Имя и фамилия</div>
                        <div>• Адрес электронной почты</div>
                        <div>• Учебный прогресс и результаты</div>
                        <div>• Данные о выполнении заданий</div>
                        <div>• Время, проведенное на платформе</div>
                      </div>
                    </div>

                    <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 mt-4">
                      <div className="text-emerald-500 mb-2">// Технические данные:</div>
                      <div className="text-slate-400 space-y-1">
                        <div>• IP-адрес и данные браузера</div>
                        <div>• Тип устройства и операционная система</div>
                        <div>• Время доступа и страницы просмотра</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 font-mono flex items-center gap-2">
                    <span className="text-emerald-500">#</span> Использование информации
                  </h3>
                  <div className="text-slate-300 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500 font-mono mt-1">→</span>
                      <span>Предоставление доступа к образовательным материалам</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500 font-mono mt-1">→</span>
                      <span>Отслеживание учебного прогресса и успеваемости</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500 font-mono mt-1">→</span>
                      <span>Улучшение качества образовательного контента</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500 font-mono mt-1">→</span>
                      <span>Техническая поддержка и устранение неполадок</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500 font-mono mt-1">→</span>
                      <span>Отправка уведомлений о новых курсах и обновлениях</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 font-mono flex items-center gap-2">
                    <span className="text-emerald-500">#</span> Защита данных
                  </h3>
                  <div className="text-slate-300 space-y-4">
                    <p>
                      Мы применяем современные меры безопасности для защиты ваших данных:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 border border-emerald-500/20 rounded-lg p-4">
                        <div className="text-emerald-400 font-medium mb-2">Шифрование</div>
                        <div className="text-slate-400 text-sm">
                          Все данные передаются по HTTPS с TLS-шифрованием
                        </div>
                      </div>
                      <div className="bg-slate-800/50 border border-emerald-500/20 rounded-lg p-4">
                        <div className="text-emerald-400 font-medium mb-2">Доступ</div>
                        <div className="text-slate-400 text-sm">
                          Ограниченный доступ к данным только для уполномоченного персонала
                        </div>
                      </div>
                      <div className="bg-slate-800/50 border border-emerald-500/20 rounded-lg p-4">
                        <div className="text-emerald-400 font-medium mb-2">Резервное копирование</div>
                        <div className="text-slate-400 text-sm">
                          Регулярное резервное копирование данных в защищенном хранилище
                        </div>
                      </div>
                      <div className="bg-slate-800/50 border border-emerald-500/20 rounded-lg p-4">
                        <div className="text-emerald-400 font-medium mb-2">Аудит</div>
                        <div className="text-slate-400 text-sm">
                          Регулярные проверки системы безопасности и аудиты
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 font-mono flex items-center gap-2">
                    <span className="text-emerald-500">#</span> Ваши права
                  </h3>
                  <div className="text-slate-300 space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <div className="text-emerald-500 font-mono">→</div>
                      <span>Право на доступ к вашим данным</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <div className="text-emerald-500 font-mono">→</div>
                      <span>Право на исправление неточной информации</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <div className="text-emerald-500 font-mono">→</div>
                      <span>Право на удаление ваших данных</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <div className="text-emerald-500 font-mono">→</div>
                      <span>Право на отзыв согласия</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <div className="text-emerald-500 font-mono">→</div>
                      <span>Право на получение копии данных</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 font-mono flex items-center gap-2">
                    <span className="text-emerald-500">#</span> Контакты
                  </h3>
                  <div className="text-slate-300 space-y-4">
                    <p>
                      По вопросам, связанным с политикой конфиденциальности, обращайтесь:
                    </p>
                    
                    <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4">
                      <div className="text-emerald-500 mb-2">// Контактная информация:</div>
                      <div className="text-slate-400 space-y-2">
                        <div>• Email: <span className="text-emerald-400">kosoklaz@gmail.com</span></div>
                        <div>• Время ответа: 1-3 рабочих дня</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-500 pt-4">
                      Эта политика может обновляться. Рекомендуем периодически проверять эту страницу.
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 font-mono"
                  onClick={() => window.history.back()}
                >
                  ← Вернуться назад
                </button>
                <p className="text-slate-500 text-sm mt-3">
                  Используя платформу, вы подтверждаете согласие с политикой
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}