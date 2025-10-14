import React from 'react';

export default function FeaturesSection({ sectionRef }) {
  const features = [
    {
      icon: "Иконка",
      title: "Virtual Labs",
      desc: "Cisco, Juniper, MikroTik эмуляторы для реальной практики",
      tech: "GNS3 | EVE-NG",
      status: "active"
    },
    {
      icon: "Иконка",
      title: "Protocol Analysis",
      desc: "Изучение работы TCP/IP, OSPF, BGP, MPLS на практике",
      tech: "Wireshark | tcpdump",
      status: "active"
    },
    {
      icon: "Иконка",
      title: "Network Security",
      desc: "Настройка firewall, VPN, IDS/IPS систем",
      tech: "pfSense | Snort",
      status: "active"
    },
    {
      icon: "Иконка",
      title: "Automation",
      desc: "Автоматизация сетевых задач через Python, Ansible",
      tech: "Python | Ansible",
      status: "beta"
    },
    {
      icon: "Иконка",
      title: "Monitoring",
      desc: "Системы мониторинга и анализа сетевого трафика",
      tech: "Zabbix | Grafana",
      status: "active"
    },
    {
      icon: "Иконка",
      title: "Cloud Networks",
      desc: "Проектирование сетей в AWS, Azure, Google Cloud",
      tech: "AWS VPC | Azure",
      status: "beta"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-slate-900 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg mb-6 font-mono text-sm text-emerald-500">
            {'// FEATURES_MODULE.init()'}
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Инструменты профессионала
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-mono text-sm">
            Всё необходимое для изучения и практики сетевых технологий
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="group bg-slate-800 border border-emerald-500/20 rounded-xl p-6 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{feature.icon}</div>
                <span className={`px-2 py-1 rounded text-xs font-mono ${
                  feature.status === 'active' 
                    ? 'bg-emerald-500/20 text-emerald-500' 
                    : 'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {feature.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-mono">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {feature.desc}
              </p>
              <div className="pt-4 border-t border-emerald-500/20">
                <div className="text-xs font-mono text-emerald-500">
                  {'> '}{feature.tech}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}