// pages/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import NetworkBackground from "../components/NetworkBackground";

export default function LoginPage() {
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
              <span className="font-sans"> user_login</span>
            </h1>
            
            <p className="text-slate-400 font-mono text-sm">
              Войдите в свою учетную запись для доступа к системе
            </p>
          </div>

          <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-500 ml-2 font-mono text-sm">login_terminal</span>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-emerald-500 font-mono text-sm mb-2">
                  $ username:
                </label>
                <input 
                  type="text"
                  className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Введите ваш username"
                />
              </div>
              <div>
                <label className="block text-emerald-500 font-mono text-sm mb-2">
                  $ password:
                </label>
                <input 
                  type="password"
                  className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Введите ваш пароль"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/50 font-mono py-3 text-sm"
              >
                $ ./login.sh
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-emerald-500/30"></div>
              <span className="px-3 text-slate-500 font-mono text-sm">OR</span>
              <div className="flex-1 h-px bg-emerald-500/30"></div>
            </div>

            <div className="text-center">
              <p className="text-slate-400 font-mono text-sm mb-3">
                Нет учетной записи?
              </p>
              <Link 
                to="/register" 
                className="inline-block px-6 py-2 bg-transparent text-emerald-500 rounded-lg font-bold border-2 border-emerald-500/50 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all font-mono text-sm"
              >
                $ ./register.sh
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-slate-900 border border-emerald-500/30 rounded-lg p-4 font-mono text-xs">
              <div className="text-emerald-500 mb-2">System Info:</div>
              <div className="text-slate-400 space-y-1">
                <div>• Используйте ваши учетные данные</div>
                <div>• Пароль защищен шифрованием</div>
                <div>• Сессия активна 24 часа</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}