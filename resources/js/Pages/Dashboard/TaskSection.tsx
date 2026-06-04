import { TaskCard } from "./TaskCard";

// Фейковые данные для списка задач
const TASKS_DATA = [
    {
        id: 1,
        title: "Основы квантовых вычислений",
        desc: "Module 4: Superposition states and entanglement principles.",
        progress: 75,
        icon: "code",
        colorClass: "bg-secondary/10 text-secondary",
        gradientClass: "from-secondary to-secondary-fixed",
    },
    {
        id: 2,
        title: "Этичный дизайн ИИ",
        desc: "Submit final case study on algorithmic bias mitigation.",
        progress: 42,
        icon: "paintbrush",
        colorClass: "bg-primary/10 text-primary",
        gradientClass: "from-primary to-primary-container",
    },
    {
        id: 3,
        title: "Анализ глобального рынка",
        desc: "Review economic trends in decentralized finance sectors.",
        progress: 90,
        icon: "globe",
        colorClass: "bg-tertiary/10 text-tertiary",
        gradientClass: "from-tertiary to-tertiary-fixed",
    },
];

const TaskSection = () => {
    const totalTasks = TASKS_DATA.length;

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline font-extrabold text-2xl select-none">Текущие задачи</h2>
                <div className="select-none flex items-center gap-4">
                    <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase font-headline">
                        {totalTasks} в процессе
                    </span>
                    <span className="text-primary text-xs font-bold cursor-pointer font-headline uppercase tracking-wider">
                        Посмотреть все
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TASKS_DATA.map((task) => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        desc={task.desc}
                        progress={task.progress}
                        icon={task.icon}
                        colorClass={task.colorClass}
                        gradientClass={task.gradientClass}
                    />
                ))}
            </div>
        </section>
    );
};

export { TaskSection };