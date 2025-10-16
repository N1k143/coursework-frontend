import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold font-mono">РастХерня</span>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-md font-mono text-sm">
              Современная платформа для изучения сетевых технологий. 
              Практические курсы, симуляторы и тесты для эффективного обучения.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" className="w-5 h-5"/>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors">
                <img src="https://img.icons8.com/?size=1200&id=yoQabS8l0qpr&format=png" className="w-5 h-5"/>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors">
                <img src="https://cdn.worldvectorlogo.com/logos/telegram.svg" className="w-5 h-5"/>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-mono">{'<navigation/>'}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-300 hover:text-emerald-400 transition-colors font-mono text-sm">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/courses"href="#" className="text-slate-300 hover:text-emerald-400 transition-colors font-mono text-sm">
                  Курсы
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors font-mono text-sm">
                  О нас
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-mono">{'<contacts/>'}</h3>
            <ul className="space-y-3 text-slate-300 font-mono text-sm">
              <li className="flex items-center">
                <span className="w-5 h-5 bg-emerald-500 rounded-full mr-3 flex items-center justify-center text-xs">📧</span>
                info@netlearn.com
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-emerald-500 rounded-full mr-3 flex items-center justify-center text-xs">📱</span>
                +7 708 864 96 30
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-emerald-500 rounded-full mr-3 flex items-center justify-center text-xs">📍</span>
                Астана, Казахстан
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-4 font-mono">{'// subscribe_updates'}</h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Ваш email"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors font-mono text-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 rounded-lg font-semibold hover:from-emerald-400 hover:to-emerald-500 transition-all shadow-lg hover:shadow-xl font-mono">
                {'$ subscribe'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm font-mono">
            © 2025 РастХерня | Status: <span className="text-emerald-500">Online</span>
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm font-mono">
              privacy_policy
            </a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm font-mono">
              terms_of_use
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}