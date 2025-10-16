import React from 'react';
import Header from '../components/Header';
import NetworkBackground from "../components/NetworkBackground";

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: "Введение в сети",
      description: "Основы сетевых технологий, модели OSI и TCP/IP, базовые понятия и терминология",
      duration: "12 часов",
      progress: 25,
      level: "Начальный",
      icon: "🌐",
      status: "active",
      commands: ["net_basics", "osi_model", "tcp_ip_stack"]
    },
    {
      id: 2,
      title: "TCP/IP протоколы",
      description: "Глубокое изучение стека протоколов TCP/IP, IP-адресация, маршрутизация",
      duration: "24 часа",
      progress: 0,
      level: "Средний",
      icon: "📡",
      status: "active",
      commands: ["ip_addressing", "routing", "subnetting"]
    },
    {
      id: 3,
      title: "Беспроводные сети",
      description: "Wi-Fi технологии, безопасность беспроводных сетей, настройка точек доступа",
      duration: "18 часов",
      progress: 75,
      level: "Средний",
      icon: "📶",
      status: "active",
      commands: ["wifi_config", "security", "access_points"]
    },
    {
      id: 4,
      title: "Сетевая безопасность",
      description: "Firewall, VPN, шифрование, обнаружение вторжений и защита сетей",
      duration: "30 часов",
      progress: 10,
      level: "Продвинутый",
      icon: "🔒",
      status: "active",
      commands: ["firewall", "vpn_setup", "encryption"]
    },
    {
      id: 5,
      title: "Cisco Networking",
      description: "Настройка оборудования Cisco, CLI, VLAN, маршрутизаторы и коммутаторы",
      duration: "40 часов",
      progress: 0,
      level: "Продвинутый",
      icon: "💻",
      status: "beta",
      commands: ["cisco_cli", "vlan_config", "routing_protocols"]
    },
    {
      id: 6,
      title: "Облачные сети",
      description: "AWS VPC, Azure Networking, облачные сетевые архитектуры и security groups",
      duration: "20 часов",
      progress: 50,
      level: "Средний",
      icon: "☁️",
      status: "active",
      commands: ["aws_vpc", "azure_net", "cloud_sec"]
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden">
         <div className="absolute inset-0 opacity-30">
            <NetworkBackground/>
         </div>
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>       
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg mb-6 font-mono group hover:border-emerald-500/50 transition-all duration-300">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm text-emerald-400">$ ./load_courses.sh</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="text-emerald-500 font-mono">root@courses:~#</span>
              <br/>
              <span className="font-sans bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Каталог курсов
              </span>
            </h1>
            
            <div className="bg-slate-900 border border-emerald-500/30 rounded-lg p-4 max-w-2xl mx-auto font-mono text-sm">
              <div className="text-emerald-500 mb-2">// Available modules: {courses.length}</div>
              <div className="text-slate-400"> Выберите курс для загрузки в систему обучения</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button className="group cursor-pointer px-5 py-2.5 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 font-mono text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-950 rounded-full animate-pulse"></span>
              $ ls -la courses/
            </button>
            <button className="group cursor-pointer px-5 py-2.5 bg-slate-900 text-slate-300 border border-emerald-500/30 rounded-lg font-bold hover:border-emerald-500 hover:bg-slate-800/80 transition-all duration-300 font-mono text-sm flex items-center gap-2">
              <span>└──</span>
              beginner
            </button>
            <button className="group cursor-pointer px-5 py-2.5 bg-slate-900 text-slate-300 border border-emerald-500/30 rounded-lg font-bold hover:border-emerald-500 hover:bg-slate-800/80 transition-all duration-300 font-mono text-sm flex items-center gap-2">
              <span>└──</span>
              intermediate
            </button>
            <button className="group cursor-pointer px-5 py-2.5 bg-slate-900 text-slate-300 border border-emerald-500/30 rounded-lg font-bold hover:border-emerald-500 hover:bg-slate-800/80 transition-all duration-300 font-mono text-sm flex items-center gap-2">
              <span>└──</span>
              advanced
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="group relative bg-slate-900 border border-emerald-500/20 rounded-xl p-6 hover:border-emerald-500 hover:bg-slate-900/90 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 flex flex-col min-h-[420px] overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-500/50 rounded-tr-xl group-hover:border-emerald-500 transition-all duration-300"></div>
                
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {course.icon}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-mono border ${
                      course.level === 'Начальный' ? 'bg-green-500/10 text-green-500 border-green-500/30' :
                      course.level === 'Средний' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' :
                      'bg-red-500/10 text-red-500 border-red-500/30'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 font-mono group-hover:text-emerald-400 transition-colors duration-300">
                  {course.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {course.description}
                </p>

                <div className="mb-4">
                  <div className="text-xs text-emerald-500 font-mono mb-2">Available commands:</div>
                  <div className="flex flex-wrap gap-1">
                    {course.commands.map((cmd, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs font-mono border border-slate-700 hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-300 cursor-help"
                        title={`Execute: ${cmd}`}
                      >
                        {cmd}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 mt-auto">
                  <div className="flex items-center justify-between text-slate-500 font-mono text-sm">
                    <span>⏱️ {course.duration}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        course.progress > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'
                      }`}></div>
                      <span>{course.progress}% loaded</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 h-1.5 rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="w-full px-4 py-3 bg-gradient-to-r bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 font-mono text-sm group/btn relative overflow-hidden">
                    <span className="relative z-10 flex cursor-pointer items-center justify-center gap-2">
                      {course.progress > 0 ? (
                        <>
                          <span className="w-2 h-2 bg-slate-950 rounded-full animate-pulse"></span>
                           {'> '}continue_learning.sh
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 bg-slate-950 rounded-full"></span>
                           {'> '}./start_course.sh
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-300 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-grid grid-cols-3 gap-8 bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 font-mono text-sm">
              <div>
                <div className="text-2xl font-bold text-emerald-500">{courses.length}</div>
                <div className="text-slate-400">COURSES</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-500">
                  {courses.filter(c => c.progress > 0).length}
                </div>
                <div className="text-slate-400">ACTIVE</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">
                  {courses.filter(c => c.status === 'active').length}
                </div>
                <div className="text-slate-400">READY</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}