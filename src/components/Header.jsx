import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/65 backdrop-blur-md border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" onClick={closeMobileMenu}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 border-2 border-emerald-500 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-emerald-500 font-mono">
                Раст<span className="text-white">Херня</span>
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/courses" className="text-slate-400 hover:text-emerald-500 transition-colors font-mono text-sm">{'<Курсы/>'}</Link>
            <Link to="/about" className="text-slate-400 hover:text-emerald-500 transition-colors font-mono text-sm">{'<О нас/>'}</Link>
            <Link to="/login" className="px-5 py-2 bg-emerald-500 text-slate-950 rounded-lg font-semibold hover:bg-emerald-400 transition-colors font-mono text-sm">
              $ login
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
            onClick={toggleMobileMenu}
            aria-label="Открыть меню"
          >
            <span
              className="block w-6 h-0.5 bg-emerald-500 transition-transform duration-300"
            ></span>
            <span
              className="block w-6 h-0.5 bg-emerald-500 transition-opacity duration-300"
            ></span>
            <span
              className="block w-6 h-0.5 bg-emerald-500 transition-transform duration-300"
            ></span>
          </button>
        </div>

        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-md border-b border-emerald-500/20 transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="px-4 py-6 space-y-6">
            <Link
              to="/courses"
              className="block text-slate-400 hover:text-emerald-500 transition-colors font-mono text-lg text-center"
              onClick={closeMobileMenu}
            >
              {'<Курсы/>'}
            </Link>
            <Link
              to="/about"
              className="block text-slate-400 hover:text-emerald-500 transition-colors font-mono text-lg text-center"
              onClick={closeMobileMenu}
            >
              {'<О нас/>'}
            </Link>
            <div className="flex justify-center pt-4">
              <Link
                to="/login"
                className="px-8 py-3 bg-emerald-500 text-slate-950 rounded-lg font-semibold hover:bg-emerald-400 transition-colors font-mono text-lg"
                onClick={closeMobileMenu}
              >
                $ login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
