import React from 'react';
import { Link } from 'react-router-dom';
import NetworkBackground from '../components/NetworkBackground';

export default function AboutPage() {
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
                О проекте
              </span>
            </h1>

            <p className="text-slate-400 font-mono text-sm max-w-2xl mx-auto">
              Информация о платформе и технологиях
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-500 font-mono text-sm">project_info</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 font-mono">О платформе</h3>
                
                <div className="text-slate-300 space-y-4">
                  <p>
                    NetLearn - это современная образовательная платформа для изучения сетевых технологий, 
                    разработанная с использованием передовых веб-технологий.
                  </p>
                  
                  <p>
                    Мы предоставляем интерактивные курсы, виртуальные лаборатории и практические задания 
                    для подготовки сетевых инженеров.
                  </p>

                  <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 font-mono text-sm">
                    <div className="text-emerald-500 mb-2">// Tech Stack:</div>
                    <div className="text-slate-400 space-y-1">
                      <div>• React 18 + TypeScript</div>
                      <div>• Tailwind CSS</div>
                      <div>• Node.js Backend</div>
                      <div>• PostgreSQL Database</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-500 font-mono text-sm">stats</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-6 font-mono">Статистика</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-500 font-mono">500+</div>
                    <div className="text-slate-400 text-sm mt-1">Студентов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-500 font-mono">15+</div>
                    <div className="text-slate-400 text-sm mt-1">Курсов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white font-mono">2K+</div>
                    <div className="text-slate-400 text-sm mt-1">Часов обучения</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500 font-mono">95%</div>
                    <div className="text-slate-400 text-sm mt-1">Успеваемость</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-500 font-mono text-sm">warning_system</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 font-mono">⚠️ Почему Rust - плохой выбор</h3>
                
                <div className="text-slate-300 space-y-4">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-bold mb-2 font-mono">$ complexity_issue</h4>
                    <p className="text-slate-300 text-sm">
                      Слишком сложный синтаксис и концепции (ownership, borrowing) затрудняют 
                      быстрое освоение для новичков.
                    </p>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-bold mb-2 font-mono">$ compile_time</h4>
                    <p className="text-slate-300 text-sm">
                      Очень долгая компиляция даже для небольших проектов, что замедляет разработку.
                    </p>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-bold mb-2 font-mono">$ ecosystem</h4>
                    <p className="text-slate-300 text-sm">
                      Молодая экосистема с ограниченным количеством библиотек по сравнению с Python или JavaScript.
                    </p>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-bold mb-2 font-mono">$ over_engineering</h4>
                    <p className="text-slate-300 text-sm">
                      Избыточная безопасность памяти не всегда нужна для веб-приложений, 
                      но добавляет сложности разработки.
                    </p>
                  </div>

                  <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 font-mono text-sm">
                    <div className="text-cyan-500 mb-2">// Рекомендуемые технологии:</div>
                    <div className="text-slate-400 space-y-1">
                      <div>• TypeScript - для веб-разработки</div>
                      <div>• Python - для ML и автоматизации</div>
                      <div>• Go - для высокопроизводительных сервисов</div>
                      <div>• Java - для enterprise-приложений</div>
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