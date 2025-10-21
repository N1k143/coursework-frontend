import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NetworkBackground from '../components/NetworkBackground';

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    username: "network_admin",
    email: "admin@netlearn.ru",
    fullName: "Алексей Петров",
    bio: "Сетевой инженер с опытом работы с Cisco, Juniper",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Сохранение профиля:', formData);
  };

  return (
    <>
      <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <NetworkBackground/>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="text-emerald-500 font-mono">$ edit</span>
              <br/>
              <span className="font-sans bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Редактирование профиля
              </span>
            </h1>

            <p className="text-slate-400 font-mono text-sm max-w-2xl mx-auto">
              Измените данные вашего профиля
            </p>
          </div>

          <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-500 font-mono text-sm">profile_editor</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-2 font-mono">Основная информация</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-emerald-500 font-mono text-sm mb-2">
                      $ username:
                    </label>
                    <input 
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="Введите имя пользователя"
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-500 font-mono text-sm mb-2">
                      $ email:
                    </label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="user@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-emerald-500 font-mono text-sm mb-2">
                    $ full_name:
                  </label>
                  <input 
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="Ваше полное имя"
                  />
                </div>

                <div>
                  <label className="block text-emerald-500 font-mono text-sm mb-2">
                    $ bio:
                  </label>
                  <textarea 
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                    placeholder="Расскажите о себе..."
                  />
                </div>
              </div>

              <div className="border-t border-emerald-500/20 pt-8">
                <h3 className="text-xl font-bold text-white mb-6 font-mono">Смена пароля</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-emerald-500 font-mono text-sm mb-2">
                      $ current_password:
                    </label>
                    <input 
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="Текущий пароль"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-emerald-500 font-mono text-sm mb-2">
                        $ new_password:
                      </label>
                      <input 
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="Новый пароль"
                      />
                    </div>

                    <div>
                      <label className="block text-emerald-500 font-mono text-sm mb-2">
                        $ confirm_password:
                      </label>
                      <input 
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="Подтвердите пароль"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-end pt-6 border-t border-emerald-500/20">
                <Link 
                  to="/profile" 
                  className="px-6 py-5 bg-slate-800 text-slate-300 rounded-lg font-mono hover:bg-slate-700 transition-all border border-slate-600 hover:border-emerald-500/50 text-sm"
                >
                  $ cancel.sh
                </Link>
                
                <button 
                  type="submit"
                  className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/50 font-mono text-sm"
                >
                  $ save_profile.sh
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}