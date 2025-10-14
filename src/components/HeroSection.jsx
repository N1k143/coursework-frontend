import React from "react";

export default function HeroSection({ scrollToAbout }){
    return(
        <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <line x1="120" y1="180" x2="280" y2="250" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="280" y1="250" x2="450" y2="320" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="450" y1="320" x2="620" y2="280" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="620" y1="280" x2="780" y2="350" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="120" y1="180" x2="180" y2="420" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="180" y1="420" x2="350" y2="550" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="350" y1="550" x2="520" y2="640" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="520" y1="640" x2="690" y2="720" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="690" y1="720" x2="850" y2="680" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="280" y1="250" x2="350" y2="550" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="450" y1="320" x2="520" y2="640" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="620" y1="280" x2="690" y2="720" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="250" y1="800" x2="450" y2="870" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="450" y1="870" x2="650" y2="820" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="350" y1="550" x2="450" y2="870" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="520" y1="640" x2="650" y2="820" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            
            <circle cx="120" cy="180" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '0s' }} />
            <circle cx="280" cy="250" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="450" cy="320" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <circle cx="620" cy="280" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
            <circle cx="780" cy="350" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '2s' }} />
            <circle cx="180" cy="420" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '2.5s' }} />
            <circle cx="350" cy="550" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '3s' }} />
            <circle cx="520" cy="640" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '3.5s' }} />
            <circle cx="690" cy="720" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '4s' }} />
            <circle cx="850" cy="680" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '4.5s' }} />
            <circle cx="250" cy="800" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
            <circle cx="450" cy="870" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '1.3s' }} />
            <circle cx="650" cy="820" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '1.8s' }} />
            </svg>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

        <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg mb-6 font-mono">
                        <span className="text-emerald-500">●</span>
                        <span className="text-sm text-emerald-400">System: Online | Status: Active</span>
                    </div>
                     <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        <span className="text-emerald-500 font-mono">root@netlearn:~$</span>
                        <br/>
                        <span className="font-sans">Мастер сетевых технологий</span>
                     </h1>

                     <div className="bg-slate-900 border border-emerald-500/30 rounded-lg p-6 mb-8 font-mono text-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-slate-500 ml-2">terminal</span>
                        </div>
                        <div className="space-y-2 text-slate-300">
                            <div><span className="text-emerald-500">$</span> learn network protocols...</div>
                            <div><span className="text-emerald-500">$</span> configure virtual labs...</div>
                            <div><span className="text-emerald-500">$</span> master cisco, juniper & more...</div>
                            <div className="flex items-center gap-2">
                                <span className="text-emerald-500">$</span> 
                                <span className="text-white">./start_career.sh</span>
                                <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse"></span>
                            </div>
                        </div>
                     </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <button className="px-8 py-4 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/50 font-mono">
                            {'> НАЧАТЬ ОБУЧЕНИЕ'}
                        </button>
                        <button 
                            onClick={scrollToAbout}
                            className="px-8 py-4 bg-transparent text-emerald-500 rounded-lg font-bold border-2 border-emerald-500/50 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all font-mono">
                            {'> EXPLORE'}
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-900 border border-emerald-500/30 rounded-lg p-4">
                            <div className="text-2xl font-bold text-emerald-500 font-mono">127+</div>
                            <div className="text-xs text-slate-400 font-mono">PROTOCOLS</div>
                        </div>
                        <div className="bg-slate-900 border border-emerald-500/30 rounded-lg p-4">
                            <div className="text-2xl font-bold text-emerald-500 font-mono">24/7</div>
                            <div className="text-xs text-slate-400 font-mono">UPTIME</div>
                        </div>
                        <div className="bg-slate-900 border border-emerald-500/30 rounded-lg p-4">
                            <div className="text-2xl font-bold text-emerald-500 font-mono">10K+</div>
                            <div className="text-xs text-slate-400 font-mono">NODES</div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="relative bg-state-900 border-2 border-emerald-500/30 rounded-2xl p-8 shadow-2xl shadow-emerald-500/20">
                        <div className="absolute top-4 right-4 text-xs text-emerald-500 font-mono">
                            ROUTER_01
                        </div>
                        <div className="space-y-6">
                            <div className="flex justify-center items-center gap-8">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 rounded-lg flex items-center justify-center">
                                        <div className="w-8 h-8 bg-emerald-500 rounded"></div>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="h-0.5 w-20 bg-emerald-500"></div>
                                    <div className="h-0.5 w-20 bg-emerald-500"></div>
                                    <div className="h-0.5 w-20 bg-emerald-500"></div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div key={item} className="w-12 h-12 bg-slate-800 border border-emerald-500/50 rounded flex items-center justify-center">
                                            <div className="w-6 h-6 bg-emerald-500/50 rounded-full"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-slate-800 border border-emerald-500/30 rounded-lg p-4 font-mono text-xs">
                                <div className="text-emerald-500 mb-2">ACTIVE PROTOCOLS:</div>
                                <div className="space-y-1 text-slate-400">
                                    <div className="flex justify-between"><span>TCP/IP</span><span className="text-emerald-500">✓</span></div>
                                    <div className="flex justify-between"><span>OSPF</span><span className="text-emerald-500">✓</span></div>
                                    <div className="flex justify-between"><span>BGP</span><span className="text-emerald-500">✓</span></div>
                                    <div className="flex justify-between"><span>VLAN</span><span className="text-emerald-500">✓</span></div>
                                </div>
                            </div>
                            <div className="bg-slate-800 border border-emerald-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    Packet Flow: Active
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-gradient-to-r from-emerald-500 to-cyan-500 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    )
}