import React from "react";

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

const DEADLINES_DATA: ScheduleItem[] = [
    {
        id: "d1",
        taskName: "History of AI Exam",
        subject: "Advanced AI",
        dueDate: "Oct 24, 2023",
        priorityLabel: "СРОЧНО",
        priorityClass: "bg-red-100 text-red-700 border-red-300",
        statusLabel: "Не начато",
        statusDotClass: "bg-zinc-400",
        icon: "fa-pen-nib",
        iconBgClass: "bg-zinc-200",
        iconColorClass: "text-zinc-700",
    },
];

// Programmatic background telemetry configurations matching Gold Standard layout structure
const SCHEDULE_WATERMARK_TEXT = "график";
const SCHEDULE_WATERMARK_POSITIONS = ["left-[15%]", "left-[75%]"];

const ScheduleSection = () => {
    const totalSchedules = DEADLINES_DATA.length;

    return (
        <section className="py-10">
            {/* Core Tactical Terminal Enclosure - Synchronized with Gold Standard Chassis */}
            <div className="relative p-8 bg-zinc-50 border border-zinc-300 overflow-hidden select-none clip-corner">

                {/* Background Blueprint Matrix Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none z-0"></div>

                {/* Programmatically Generated Schedule Matrix Background Watermarks */}
                {SCHEDULE_WATERMARK_POSITIONS.map((position, idx) => (
                    <div
                        key={idx}
                        className={`absolute top-20 ${position} text-9xl font-black text-zinc-900/[0.02] font-mono pointer-events-none transform -rotate-6 z-0 uppercase`}
                    >
                        {SCHEDULE_WATERMARK_TEXT}
                    </div>
                ))}

                {/* Header Module - Wrapped exactly the same layout signature as TaskSection */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 p-4 bg-zinc-100 border border-zinc-300 relative z-10 font-mono clip-corner">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            {/* Matching Plated Layout with Black Left Boundary Accent Tag */}
                            <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-wide border-l-4 border-l-black pl-3 pr-2 py-0.5">
                                Расписание
                            </h2>
                            <span className="text-[10px] text-zinc-500 font-bold tracking-widest ml-1 bg-zinc-200/60 px-1 py-0.5 rounded-xs">
                                [{totalSchedules} ENTRIES_LOADED]
                            </span>
                        </div>
                        <p className="text-zinc-500 text-xs uppercase tracking-wider pl-1">
                            // Мониторинг критических дедлайнов и контрольных точек
                        </p>
                    </div>

                    {/* Tactical Navigation Action Node */}
                    <button className="px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-100 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 hover:text-zinc-950 hover:border-zinc-300 transition-all duration-150 clip-corner shadow-xs shrink-0 cursor-pointer">
                        [ Открыть всё расписание ]
                    </button>
                </div>

                {/* Tactical Table Frame Matrix Deployment */}
                <div className="relative z-10 border border-zinc-300/80 bg-zinc-50/50 clip-corner overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse font-mono">
                            <thead>
                                <tr className="select-none bg-zinc-200/60 border-b border-zinc-300">
                                    <th className="px-6 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                                        // НАЗВАНИЕ ЗАДАЧИ
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                                        // ПРЕДМЕТ
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                                        // СРОК
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                                        // ПРИОРИТЕТ
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                                        // СТАТУС
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200">
                                {DEADLINES_DATA.map((row) => (
                                    <tr key={row.id} className="hover:bg-zinc-200/40 group transition-colors duration-150">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 ${row.iconBgClass} ${row.iconColorClass} border border-zinc-300 flex items-center justify-center rounded-none group-hover:border-zinc-900 transition-colors`}>
                                                    <i className={`fa-solid ${row.icon} text-xs`}></i>
                                                </div>
                                                <span className="font-bold text-sm uppercase text-zinc-800 group-hover:text-zinc-950 transition-colors">
                                                    {row.taskName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-zinc-500 uppercase tracking-wide font-semibold">
                                            {row.subject}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-bold text-zinc-700 uppercase tracking-wider">
                                            {row.dueDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 border text-[9px] font-black uppercase rounded-none tracking-widest ${row.priorityClass}`}>
                                                {row.priorityLabel}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-2 text-xs text-zinc-600 uppercase font-bold">
                                                <span className={`w-2 h-2 rounded-none ${row.statusDotClass} animate-pulse`}></span>
                                                {row.statusLabel}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </section>
    );
};

export { ScheduleSection };