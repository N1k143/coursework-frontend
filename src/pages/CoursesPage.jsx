import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function CoursesPage() {
    const courses = [
        {
      id: 1,
      title: "Введение в сети",
      description: "Основы сетевых технологий, модели OSI и TCP/IP, базовые понятия и терминология",
      duration: "12 часов",
      progress: 25,
      level: "Начальный",
      icon: "🌐"
    },
    {
      id: 2,
      title: "TCP/IP протоколы",
      description: "Глубокое изучение стека протоколов TCP/IP, IP-адресация, маршрутизация",
      duration: "24 часа",
      progress: 0,
      level: "Средний",
      icon: "📡"
    },
    {
      id: 3,
      title: "Беспроводные сети",
      description: "Wi-Fi технологии, безопасность беспроводных сетей, настройка точек доступа",
      duration: "18 часов",
      progress: 75,
      level: "Средний",
      icon: "📶"
    },
    {
      id: 4,
      title: "Сетевая безопасность",
      description: "Firewall, VPN, шифрование, обнаружение вторжений и защита сетей",
      duration: "30 часов",
      progress: 10,
      level: "Продвинутый",
      icon: "🔒"
    },
    {
      id: 5,
      title: "Cisco Networking",
      description: "Настройка оборудования Cisco, CLI, VLAN, маршрутизаторы и коммутаторы",
      duration: "40 часов",
      progress: 0,
      level: "Продвинутый",
      icon: "💻"
    },
    {
      id: 6,
      title: "Облачные сети",
      description: "AWS VPC, Azure Networking, облачные сетевые архитектуры и security groups",
      duration: "20 часов",
      progress: 50,
      level: "Средний",
      icon: "☁️"
    }
  ];
    

  return (
    <>
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-100 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Каталог курсов
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Выберите курс для изучения сетевых технологий. От основ до продвинутых тем.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center mb-12">
                    <button className="px-6 py-2 bg-[#2CB6D9] text-white rounded-full font-semibold hover:bg-[#27A5C7] transition-colors">
                        Все курсы
                    </button>
                    <button className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors">
                        Начальный
                    </button>
                    <button className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors">
                        Средний
                    </button>
                    <button className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors">
                        Продвинутый
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course.id}
                        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-200 hover:border-cyan-200 cursor-pointer group flex flex-col min-h-[400px]">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-[#2CB6D9] to-[#27D3FF] rounded-lg flex items-center justify-center mb-2">
                                    <span className="text-white font-bold text-xl">
                                        {course.icon}
                                    </span>
                                </div>

                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    course.level === 'Начальный' ? 'bg-green-100 text-green-800' :
                                    course.level === 'Средний' ? 'bg-yellow-100 text-yellow-800':
                                    'bg-red-100 text-red-800' 
                                }`}>
                                    {course.level}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {course.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                                {course.description}
                            </p>

                            <div className="flex items-center text-gray-500 mb-4">
                                <span className="text-sm">⏱️ {course.duration}</span>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-500 mb-2">
                                    <span>Прогресс</span>
                                    <span>{course.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-gradient-to-r  from-[#2CB6D9] to-[#27D3FF] h-2 rounded-full transition-all duration-500" 
                                    style={{ width: `${course.progress}%`}}></div>
                                </div>
                            </div>

                            <button className="w-full bg-gradient-to-r from-[#2CB6D9] to-[#27D3FF] text-white rounded-lg font-semibold hover:from-[#27A5C7] hover:to-[#1FB8E6] transition-all py-3 duration-300 shadow-lg hover:shadow-xl">
                                {course.progress > 0 ? 'Продолжить' : "Начать Обучение"}
                            </button>
                        </div>

                    ))}
                </div>
            </div>
        </main>
        <Footer/>
    </>
  )
}