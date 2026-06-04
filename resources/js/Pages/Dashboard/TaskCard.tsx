import { TaskCardProps } from "@/types";
import { Link } from "@inertiajs/react";

const TaskCard = ({ id, title, desc, progress, icon }: TaskCardProps & { id: string }) => {
    const totalBlocks = 20;
    const filledBlocks = Math.round((progress / 100) * totalBlocks);

    return (
        <Link
            href={`/tasks/${id}`}
            // Добавлено h-full, чтобы ссылка растягивалась на всю высоту ячейки Grid
            className="block group select-none h-full"
        >
            {/* Добавлены классы: 
               - h-full (занимать всю высоту ссылки)
               - flex flex-col (управление внутренними блоками по вертикали)
            */}
            <div className="relative p-5 h-full w-full bg-zinc-50 border border-zinc-300 outline-1 outline-transparent -outline-offset-1 transition-all duration-200 group-hover:border-blue-600 group-hover:bg-blue-50/30 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.1)] clip-corner flex flex-col">

                {/* Visual Intercept Overlay Corner Marks */}
                <div className="absolute top-0 right-0 w-4 h-[2px] bg-zinc-400 group-hover:bg-blue-600 transition-colors"></div>
                <div className="absolute top-0 right-0 h-4 w-[2px] bg-zinc-400 group-hover:bg-blue-600 transition-colors"></div>

                {/* Upper Telemetry Block / Status Stream */}
                <div className="flex justify-between items-center mb-5 z-10 relative font-mono">
                    <div className="flex items-center gap-2 text-zinc-500 group-hover:text-blue-700 transition-colors">
                        <span className="text-xs font-bold tracking-widest uppercase">
                            здн // 0{id}
                        </span>
                        <span className="text-zinc-300 text-[9px] font-bold">//</span>
                        <i className={`fa-solid fa-${icon} text-xs`}></i>
                    </div>
                    <span className="text-[8px] px-1 py-0.5 bg-zinc-200 border border-zinc-300 text-zinc-600 uppercase tracking-widest font-bold group-hover:border-blue-300 group-hover:text-blue-800 transition-colors">
                        sys_task
                    </span>
                </div>

                {/* Core Text Matrix Information Fields 
                   Добавлен класс: flex-grow (заставит этот блок занять все свободное место, 
                   тем самым вытолкнув прогресс-бар вниз)
                */}
                <div className="mb-6 z-10 relative flex-grow">
                    <h4 className="text-md font-bold font-mono uppercase tracking-wide truncate text-zinc-900 group-hover:text-blue-700 transition-colors">
                        {title}
                    </h4>
                    <p className="text-xs font-mono text-zinc-500 group-hover:text-zinc-700 transition-colors uppercase tracking-normal leading-tight mt-1.5 line-clamp-2">
                        {desc}
                    </p>
                </div>

                {/* Heavy High-Density Matrix Progress Telemetry */}
                {/* mt-auto — дополнительная страховка, чтобы блок всегда был внизу */}
                <div className="space-y-2 z-10 relative font-mono mt-auto">
                    <div className="flex justify-between text-[10px] font-black tracking-widest uppercase text-zinc-400">
                        <span>процент_прогресса</span>
                        <span className="text-zinc-700 group-hover:text-blue-600 transition-colors font-bold">
                            {progress}.00%
                        </span>
                    </div>

                    {/* Stepped hardware segment matrix block stream */}
                    <div className="text-[9px] tracking-tight font-black select-none flex items-center leading-none">
                        <span className="text-zinc-800 group-hover:text-blue-600 transition-colors">
                            {"■".repeat(filledBlocks) + "|"}
                        </span>
                        <span className="text-zinc-200">
                            {"■".repeat(totalBlocks - filledBlocks)}
                        </span>
                        <span className="text-[9px] text-zinc-400 ml-2 tracking-widest font-bold uppercase shrink-0">
                            [ лог_вып ]
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export { TaskCard };