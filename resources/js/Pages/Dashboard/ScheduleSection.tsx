// TypeScript interfaces for the deadline item data structure
interface ScheduleItem {
    id: string;
    taskName: string;
    subject: string;
    dueDate: string;
    priorityLabel: string;
    priorityClass: string;
    statusLabel: string;
    statusDotClass: string;
    icon: string;
    iconBgClass: string;
    iconColorClass: string;
}

// Mocked upcoming deadlines data
const DEADLINES_DATA: ScheduleItem[] = [
    {
        id: "d1",
        taskName: "History of AI Exam",
        subject: "Advanced AI",
        dueDate: "Oct 24, 2023",
        priorityLabel: "СРОЧНО",
        priorityClass: "bg-red-50 text-red-600",
        statusLabel: "Не начато",
        statusDotClass: "bg-slate-300",
        icon: "fa-pen-nib",
        iconBgClass: "bg-orange-100",
        iconColorClass: "text-orange-600",
    },
    // You can seamlessly add more objects here to extend the table dynamically
];

const ScheduleSection = () => {
    return (
        <section className="mb-20">
            {/* Header */}
            <div className="select-none flex items-center justify-between mb-6">
                <h2 className="font-headline font-extrabold text-2xl">Расписание</h2>
                <span className="text-primary text-xs font-bold cursor-pointer font-headline uppercase tracking-wider">
                    Посмотреть все
                </span>
            </div>

            {/* Table Wrapper */}
            <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0px_20px_40px_rgba(106,55,212,0.06)]">
                <table className="w-full text-left">
                    <thead>
                        <tr className="select-none bg-surface-container-low">
                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] font-headline">
                                НАЗВАНИЕ ЗАДАЧИ
                            </th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] font-headline">
                                ПРЕДМЕТ
                            </th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] font-headline">
                                СРОК
                            </th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] font-headline">
                                ПРИОРИТЕТ
                            </th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] font-headline">
                                СТАТУС
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                        {DEADLINES_DATA.map((row) => (
                            <tr key={row.id} className="hover:bg-surface-container-low/50 transition-colors">
                                {/* Task Name */}
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg ${row.iconBgClass} ${row.iconColorClass} flex items-center justify-center`}>
                                            <i className={`fa-solid ${row.icon} text-sm`}></i>
                                        </div>
                                        <span className="font-bold text-sm font-headline">{row.taskName}</span>
                                    </div>
                                </td>

                                {/* Subject */}
                                <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                                    {row.subject}
                                </td>

                                {/* Due Date */}
                                <td className="px-8 py-5 text-sm font-bold">
                                    {row.dueDate}
                                </td>

                                {/* Priority Badge */}
                                <td className="px-8 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase font-headline ${row.priorityClass}`}>
                                        {row.priorityLabel}
                                    </span>
                                </td>

                                {/* Status indicator */}
                                <td className="px-8 py-5">
                                    <span className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                        <span className={`w-2 h-2 rounded-full ${row.statusDotClass}`}></span>
                                        {row.statusLabel}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export { ScheduleSection };