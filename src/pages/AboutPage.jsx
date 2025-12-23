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

          <div className="flex justify-center">
            <div className="w-full max-w-3xl space-y-8"> 
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
                    NetLearn — это современная образовательная платформа для изучения сетевых технологий,
                    программирования и основ кибербезопасности, разработанная с использованием
                    передовых веб-технологий.
                  </p>

                  <p>
                    Платформа предоставляет структурированные курсы и тестовые задания,
                    позволяющие закреплять теорию и проверять уровень полученных знаний.
                  </p>



                  <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
                    <div className="text-emerald-500 mb-2">// Tech Stack:</div>
                    <div className="text-slate-400 space-y-1">
                      <div>• React 18 + JavaScript</div>
                      <div>• Tailwind CSS</div>
                      <div>• Express.js Backend</div>
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
          </div>
        </div>
      </main>
    </>
  );
}