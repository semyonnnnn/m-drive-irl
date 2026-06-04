import { TaskCard } from "./TaskCard";

const TASKS_DATA = [
    {
        id: 1,
        title: "Основы квантовых вычислений",
        desc: "Module 4: Superposition states and entanglement principles.",
        progress: 75,
        icon: "code",
    },
    {
        id: 2,
        title: "Этичный дизайн ИИ",
        desc: "Submit final case study on algorithmic bias mitigation.",
        progress: 42,
        icon: "paintbrush",
    },
    {
        id: 3,
        title: "Анализ глобального рынка",
        desc: "Review economic trends in decentralized finance sectors.",
        progress: 90,
        icon: "globe",
    },
];

// Programmatic background telemetry configurations matching GroupSection layout structure
const TASK_WATERMARK_TEXT = "задачи";
const TASK_WATERMARK_POSITIONS = ["left-[10%]", "left-[70%]"];

const TaskSection = () => {
    const totalTasks = TASKS_DATA.length;

    return (
        <section className="py-10">
            {/* Core Tactical Terminal Enclosure - Synchronized with GroupSection Chassis */}
            <div className="relative p-8 bg-zinc-50 border border-zinc-300 overflow-hidden select-none clip-corner">

                {/* Background Blueprint Matrix Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none z-0"></div>

                {/* Programmatically Generated Task Matrix Background Watermarks */}
                {TASK_WATERMARK_POSITIONS.map((position, idx) => (
                    <div
                        key={idx}
                        className={`absolute top-20 ${position} text-9xl font-black text-zinc-900/[0.02] font-mono pointer-events-none transform -rotate-6 z-0 uppercase`}
                    >
                        {TASK_WATERMARK_TEXT}
                    </div>
                ))}

                {/* Header Module - Wrapped exactly the same layout signature as GroupSection */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 p-4 bg-zinc-100 border border-zinc-300 relative z-10 font-mono clip-corner">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            {/* Matching Plated Layout with Black Left Boundary Accent Tag */}
                            <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-wide border-l-4 border-l-black pl-3 pr-2 py-0.5">
                                Текущие задачи
                            </h2>
                            <span className="text-[10px] text-zinc-500 font-bold tracking-widest ml-1 bg-zinc-200/60 px-1 py-0.5 rounded-xs">
                                [{totalTasks} задачи_всего]
                            </span>
                        </div>
                        <p className="text-zinc-500 text-xs uppercase tracking-wider pl-1">
                            // Назначенные системные операционные директивы
                        </p>
                    </div>

                    {/* Tactical Navigation Action Node */}
                    <button className="px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-100 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 hover:text-zinc-950 hover:border-zinc-300 transition-all duration-150 clip-corner shadow-xs shrink-0 cursor-pointer">
                        [ Посмотреть все ]
                    </button>
                </div>

                {/* Grid Array Deployment Frame */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {TASKS_DATA.map((task) => (
                        <TaskCard
                            id={String(task.id)}
                            key={task.id}
                            title={task.title}
                            desc={task.desc}
                            progress={task.progress}
                            icon={task.icon} colorClass={""} gradientClass={""} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export { TaskSection };