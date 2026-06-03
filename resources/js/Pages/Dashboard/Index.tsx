import { GroupSection } from "./GroupSection";
import { TaskCard } from "./TaskCard";

export default function Index() {
    return (
        <main>
            <div className="max-w-350 mx-auto p-8 flex flex-col gap-10">

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
                            icon="code"
                            colorClass="bg-secondary/10 text-secondary"
                            gradientClass="from-secondary to-secondary-fixed"
                        />
                        <TaskCard
                            title="Этичный дизайн ИИ"
                            desc="Submit final case study on algorithmic bias mitigation."
                            progress={42}
                            icon="paintbrush"
                            colorClass="bg-primary/10 text-primary"
                            gradientClass="from-primary to-primary-container"
                        />
                        <TaskCard
                            title="Анализ глобального рынка"
                            desc="Review economic trends in decentralized finance sectors."
                            progress={90}
                            icon="globe"
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
                                    <i className="fa-solid fa-table-cells-large text-sm text-slate-600"></i>
                                </button>
                                <button className="p-2 bg-transparent text-slate-400 rounded-lg hover:bg-surface-container-high transition-colors">
                                    <i className="fa-solid fa-list text-sm"></i>
                                </button>
                            </div>
                            <span className="text-primary text-xs font-bold cursor-pointer font-headline uppercase tracking-wider">Посмотреть все</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                            { title: "Intro to AI Ethics", img: "3", icon: "circle-play", type: "Video Course", typeIcon: "circle-play" },
                            { title: "Quantum Logic v2", img: "4", icon: "file-lines", type: "PDF Document", typeIcon: "file-lines", iconColor: "text-red-500" },
                            { title: "Network Security", img: "5", icon: "terminal", type: "LAB Guide", typeIcon: "code", iconColor: "text-blue-500" },
                            { title: "Calculus IV Recap", img: "6", icon: "circle-play", type: "Video Course", typeIcon: "circle-play" },
                            { title: "Hardware Arch.", img: "7", icon: "file-audio", type: "Podcast", typeIcon: "file-audio", iconColor: "text-purple-500" },
                        ].map((item, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="aspect-square rounded-3xl overflow-hidden mb-3 relative">
                                    <img
                                        src={`http://googleusercontent.com/profile/picture/${item.img}`}
                                        alt="Cover"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm">
                                        <i className={`fa-solid fa-${item.icon} ${item.iconColor || 'text-primary'} text-base`}></i>
                                    </div>
                                </div>
                                <h5 className="text-sm font-bold font-headline truncate">{item.title}</h5>
                                <p className="text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
                                    <i className={`fa-solid fa-${item.typeIcon} text-[10px]`}></i> {item.type}
                                </p>
                            </div>
                        ))}
                        <div className="group cursor-pointer">
                            <div className="aspect-square rounded-3xl overflow-hidden mb-3 relative">
                                <div className="w-full h-full bg-surface-container-high flex flex-col items-center justify-center text-slate-400 group-hover:bg-primary/5 transition-colors">
                                    <i className="fa-solid fa-circle-plus text-4xl mb-2"></i>
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
                                                <i className="fa-solid fa-pen-nib text-sm"></i>
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
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* FAB */}
                <button className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary-container text-white shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-transform z-50">
                    <i className="fa-solid fa-plus text-3xl"></i>
                </button>
            </div>
        </main>
    );
}