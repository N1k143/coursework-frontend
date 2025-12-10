import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />
  };

  const colors = {
    success: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/50',
      text: 'text-emerald-400',
      icon: 'text-emerald-500',
      glow: 'shadow-emerald-500/20'
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/50',
      text: 'text-red-400',
      icon: 'text-red-500',
      glow: 'shadow-red-500/20'
    },
    info: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/50',
      text: 'text-cyan-400',
      icon: 'text-cyan-500',
      glow: 'shadow-cyan-500/20'
    }
  };

  const style = colors[type] || colors.info;

  return (
    <div 
      className={`flex items-start gap-3 ${style.bg} ${style.border} border backdrop-blur-xl rounded-lg p-4 shadow-2xl ${style.glow} animate-slideIn min-w-[320px] max-w-md group hover:scale-[1.02] transition-transform duration-300`}
    >
      <div className={`${style.icon} mt-0.5 animate-pulse`}>
        {icons[type]}
      </div>

      <div className="flex-1">
        <div className={`font-mono text-xs ${style.text} mb-1 font-bold tracking-wider`}>
          {type === 'success' ? '$ SUCCESS' : type === 'error' ? '$ ERROR' : '$ INFO'}
        </div>
        <div className="text-slate-200 text-sm leading-relaxed">
          {message}
        </div>
      </div>

      <button
        onClick={onClose}
        className={`${style.text} hover:text-white transition-colors duration-200 opacity-70 hover:opacity-100`}
      >
        <X className="w-4 h-4" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/50 rounded-b-lg overflow-hidden">
        <div 
          className={`h-full ${
            type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
            type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-400' :
            'bg-gradient-to-r from-cyan-500 to-cyan-400'
          } animate-shrink`}
        />
      </div>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <>
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-shrink {
          animation: shrink 5s linear;
        }
      `}</style>
    </>
  );
};

export default ToastContainer;