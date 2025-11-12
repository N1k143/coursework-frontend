import React, { useRef } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function HomePage() {
  const aboutSectionRef = useRef(null);
  const isAuthenticated = authAPI.isAuthenticated();
  const currentUser = authAPI.getCurrentUser();
  
  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <main className="bg-slate-950">
      <HeroSection scrollToAbout={scrollToAbout} />
      <FeaturesSection sectionRef={aboutSectionRef} />

      {/* 🎯 УМНЫЙ СЕКЦИЯ CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          {isAuthenticated ? (
            // 👤 ДЛЯ АВТОРИЗОВАННЫХ ПОЛЬЗОВАТЕЛЕЙ
            <>
              <h2 className="text-4xl font-bold text-white mb-6 font-mono">
                {'> WELCOME BACK, ' + (currentUser?.username || 'USER') + '!'}
              </h2>
              <p className="text-emerald-50 mb-8 font-mono text-sm">
                Продолжайте обучение и развивайте свои навыки
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/courses" className="px-8 py-4 bg-slate-950 text-emerald-500 rounded-lg font-bold hover:bg-slate-900 transition-all hover:shadow-2xl font-mono">
                  {'$ ls courses/'}
                </Link>
                <Link to="/profile" className="px-8 py-4 bg-transparent text-white rounded-lg font-bold border-2 border-white hover:bg-white hover:text-emerald-600 transition-all font-mono">
                  {'$ cd ~/profile'}
                </Link>
              </div>
            </>
          ) : (
            // 🔐 ДЛЯ НЕАВТОРИЗОВАННЫХ ПОЛЬЗОВАТЕЛЕЙ
            <>
              <h2 className="text-4xl font-bold text-white mb-6 font-mono">
                {'> READY TO CONNECT?'}
              </h2>
              <p className="text-emerald-50 mb-8 font-mono text-sm">
                Присоединяйтесь к сообществу сетевых инженеров
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="px-8 py-4 bg-slate-950 text-emerald-500 rounded-lg font-bold hover:bg-slate-900 transition-all hover:shadow-2xl font-mono">
                  {'$ ./register.sh'}
                </Link>
                <button className="px-8 py-4 bg-transparent text-white rounded-lg font-bold border-2 border-white hover:bg-white hover:text-emerald-600 transition-all font-mono">
                  {'$ man netlearn'}
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}