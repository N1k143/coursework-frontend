import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
     <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/65 backdrop-blur-md border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 border-2 border-emerald-500 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></div>
            </div>
            <span className="text-xl font-bold text-emerald-500 font-mono">Раст<span className="text-white">Херня</span></span>
          </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/courses" className="text-slate-400 hover:text-emerald-500 transition-colors font-mono text-sm">{'<Курсы/>'}</Link>
            <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors font-mono text-sm">{'<Лаборатории/>'}</a>
            <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors font-mono text-sm">{'<Документация/>'}</a>
            <Link to="/login" className="px-5 py-2 bg-emerald-500 text-slate-950 rounded-lg font-semibold hover:bg-emerald-400 transition-colors font-mono text-sm">
              $ login
            </Link>
          </div>
        </div>
      </nav>
  );
}