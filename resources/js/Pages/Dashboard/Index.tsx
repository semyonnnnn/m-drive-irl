import React from 'react';

const GroupSection = () => (
    <section>
        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#eef1f3] via-white to-[#eef1f3] shadow-[0px_40px_80px_rgba(106,55,212,0.08)] border border-white relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

            <div className="flex justify-between items-center mb-10 relative z-10">
                <div>
                    <h2 className="font-headline font-extrabold text-3xl text-on-surface mb-1">Команда совместной работы</h2>
                    <p className="text-slate-500 text-sm font-semibold">Активные участники вашей когнитивной сети</p>
                </div>
                <button className="px-6 py-2 bg-white border border-surface-container-high rounded-full text-primary text-xs font-bold hover:shadow-lg transition-all font-headline">
                    Карта сети
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {/* Lead Member */}
                <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-xl transition-all group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:scale-110 transition-transform"></div>
                        <img
                            src="/storage/app/public/mockup/woman.png"
                            alt="Sarah"
                            className="w-24 h-24 rounded-full object-cover relative z-10 border-4 border-white shadow-md"
                        />
                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full z-20"></div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase rounded font-headline">ЛИДЕР</span>
                            <p className="text-xl font-extrabold font-headline">Сара Чен</p>
                        </div>
                        <p className="text-sm text-slate-500 mb-3 font-medium">Изучает логику и этику</p>
                        <button className="flex items-center gap-2 px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 font-headline">
                            <span className="material-symbols-outlined text-sm">chat_bubble</span>
                            Direct Message
                        </button>
                    </div>
                </div>

                {/* Secondary Member */}
                <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-lg transition-all group">
                    <div className="relative">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl-zUVdW4rdNJGMq14uM6Vm-qMJ9hDlO0CyOjekbuAertXoH6rFnZKoCXOSFlLi5ZZPOyD-fZEjaXJaTrEFM7_3ElKTkwbk989oGjJ9XxL9_fxuja3dmuALnO4JTYdGoIQm3VDmpLA55L20hoLuXtP9QOZgTdZXbVlC5r4vEb8bdHq0VkPI-BGu4Sm74Qc4AUNyg6C_6QvSvbgAZ6YNIgUXZ_XMmxZc5pVB1bUKPUyRELFm6NRexXmkYdGM8uGh6wYDwyHrPoVsl5L"
                            alt="Marcus"
                            className="w-20 h-20 rounded-full object-cover relative z-10 border-4 border-white shadow-sm"
                        />
                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-slate-300 border-4 border-white rounded-full z-20"></div>
                    </div>
                    <div className="flex-1">
                        <p className="text-xl font-extrabold mb-1 font-headline">Маркус В.</p>
                        <p className="text-sm text-slate-500 mb-3 font-medium">Был(а) в сети 2 часа назад</p>
                        <button className="flex items-center gap-2 px-4 py-1.5 bg-surface-container text-on-surface-variant rounded-xl text-xs font-bold transition-all hover:bg-surface-container-high font-headline">
                            <span className="material-symbols-outlined text-sm">chat_bubble</span>
                            Leave Note
                        </button>
                    </div>
                </div>

                {/* Extra Slot */}
                <div className="flex items-center justify-center p-6 rounded-3xl border-2 border-dashed border-surface-container-highest bg-white/20 hover:bg-white/40 transition-colors cursor-pointer">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-2">
                            <span className="material-symbols-outlined text-primary">add</span>
                        </div>
                        <p className="text-sm font-bold font-headline">Приглашить коллегу</p>
                        <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest font-headline">3 СВОБОДНЫХ МЕСТА</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const TaskCard = ({ title, desc, progress, icon, colorClass, gradientClass }) => (
    <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-[0px_10px_30px_rgba(0,0,0,0.02)] group hover:shadow-xl hover:shadow-primary/5 transition-all border border-transparent hover:border-primary/5">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-2xl ${colorClass} flex items-center justify-center`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
        </div>
        <h4 className="font-extrabold font-headline text-lg mb-1">{title}</h4>
        <p className="text-sm text-slate-500 mb-6 font-medium">{desc}</p>
        <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-black uppercase text-slate-700 font-headline">
                <span>Прогресс</span>
                <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r ${gradientClass} rounded-full relative`}
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute right-0 top-0 h-full w-2 bg-white/30 blur-sm"></div>
                </div>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <main>
            <div className="max-w-[1400px] mx-auto p-8 flex flex-col gap-10">

                <GroupSection />

                {/* Current Tasks */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-headline font-extrabold text-2xl">Текущие задачи</h2>
                        <div className="flex items-center gap-4">
                            <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase font-headline">3 в процессе</span>
                            <span className="text-primary text-xs font-bold cursor-pointer font-headline uppercase tracking-wider">Посмотреть все</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <TaskCard
                            title="Основы квантовых вычислений"
                            desc="Module 4: Superposition states and entanglement principles."
                            progress={75}
                            icon="data_object"
                            colorClass="bg-secondary/10 text-secondary"
                            gradientClass="from-secondary to-secondary-fixed"
                        />
                        <TaskCard
                            title="Этичный дизайн ИИ"
                            desc="Submit final case study on algorithmic bias mitigation."
                            progress={42}
                            icon="brush"
                            colorClass="bg-primary/10 text-primary"
                            gradientClass="from-primary to-primary-container"
                        />
                        <TaskCard
                            title="Анализ глобального рынка"
                            desc="Review economic trends in decentralized finance sectors."
                            progress={90}
                            icon="public"
                            colorClass="bg-tertiary/10 text-tertiary"
                            gradientClass="from-tertiary to-tertiary-fixed"
                        />
                    </div>
                </section>

                {/* Learning Materials */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-headline font-extrabold text-2xl">Учебные материалы</h2>
                        <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                                <button className="p-2 bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors">
                                    <span className="material-symbols-outlined text-sm">grid_view</span>
                                </button>
                                <button className="p-2 bg-transparent text-slate-400 rounded-lg hover:bg-surface-container-high transition-colors">
                                    <span className="material-symbols-outlined text-sm">view_list</span>
                                </button>
                            </div>
                            <span className="text-primary text-xs font-bold cursor-pointer font-headline uppercase tracking-wider">Посмотреть все</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                            { title: "Intro to AI Ethics", img: "3", icon: "play_circle", type: "Video Course", typeIcon: "video_library" },
                            { title: "Quantum Logic v2", img: "4", icon: "description", type: "PDF Document", typeIcon: "picture_as_pdf", iconColor: "text-red-500" },
                            { title: "Network Security", img: "5", icon: "terminal", type: "LAB Guide", typeIcon: "code", iconColor: "text-blue-500" },
                            { title: "Calculus IV Recap", img: "6", icon: "play_circle", type: "Video Course", typeIcon: "video_library" },
                            { title: "Hardware Arch.", img: "7", icon: "audio_file", type: "Podcast", typeIcon: "audio_file", iconColor: "text-purple-500" },
                        ].map((item, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="aspect-square rounded-3xl overflow-hidden mb-3 relative">
                                    <img
                                        src={`http://googleusercontent.com/profile/picture/${item.img}`}
                                        alt="Cover"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm">
                                        <span className={`material-symbols-outlined ${item.iconColor || 'text-primary'} text-lg`}>{item.icon}</span>
                                    </div>
                                </div>
                                <h5 className="text-sm font-bold font-headline truncate">{item.title}</h5>
                                <p className="text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
                                    <span className="material-symbols-outlined text-[12px]">{item.typeIcon}</span> {item.type}
                                </p>
                            </div>
                        ))}
                        <div className="group cursor-pointer">
                            <div className="aspect-square rounded-3xl overflow-hidden mb-3 relative">
                                <div className="w-full h-full bg-surface-container-high flex flex-col items-center justify-center text-slate-400 group-hover:bg-primary/5 transition-colors">
                                    <span className="material-symbols-outlined text-4xl mb-2">add_circle</span>
                                    <span className="text-[9px] font-black uppercase tracking-widest font-headline">Библиотека</span>
                                </div>
                            </div>
                            <h5 className="text-sm font-bold font-headline truncate">Больше ресурсов</h5>
                            <p className="text-[10px] text-slate-500 font-semibold">Explore Catalog</p>
                        </div>
                    </div>
                </section>

                {/* Deadlines Table */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-headline font-extrabold text-2xl">Ближайшие дедлайны</h2>
                        <span className="text-primary text-xs font-bold cursor-pointer font-headline uppercase tracking-wider">Посмотреть все</span>
                    </div>
                    <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0px_20px_40px_rgba(106,55,212,0.06)]">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-surface-container-low">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] font-headline">НАЗВАНИЕ ЗАДАЧИ</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] font-headline">ПРЕДМЕТ</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] font-headline">СРОК</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] font-headline">ПРИОРИТЕТ</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] font-headline">СТАТУС</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-container">
                                <tr className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-sm">history_edu</span>
                                            </div>
                                            <span className="font-bold text-sm font-headline">History of AI Exam</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-slate-500 font-medium">Advanced AI</td>
                                    <td className="px-8 py-5 text-sm font-bold">Oct 24, 2023</td>
                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-[9px] font-black uppercase font-headline">СРОЧНО</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="flex items-center gap-2 text-sm text-slate-500 font-medium"><span className="w-2 h-2 rounded-full bg-slate-300"></span> Не начато</span>
                                    </td>
                                </tr>
                                {/* ... Add other rows similarly */}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* FAB */}
                <button className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-container text-white shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-transform z-50">
                    <span className="material-symbols-outlined text-3xl">add</span>
                </button>
            </div>
        </main>
    );
}

export { Dashboard };