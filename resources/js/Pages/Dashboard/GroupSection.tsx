import { PersonCard, Extra } from "./PersonCard";
import { PersonCardProps } from "@/types";

const culprits: PersonCardProps[] = [
    {
        url: "/storage/mockup/man.png",
        name: "Артём Иванов",
        alt: "Фото Артёма Иванова",
        info: "Системный администратор. Ответственен за конфигурацию сетевых IP-адресов."
    },
    {
        url: "/storage/mockup/woman.png",
        name: "Елена Петрова",
        alt: "Фото Елены Петровой",
        info: "Главный бухгалтер. Управляет финансовой отчетностью департамента логистики."
    }
];

// Programmatic background telemetry configurations
const WATERMARK_TEXT = "одобрено";
const WATERMARK_POSITIONS = ["left-[10%]", "left-[70%]"];

const GroupSection = () => (
    <section className="py-10">
        {/* Core Tactical Terminal Enclosure */}
        <div className="relative p-8 bg-zinc-50 border border-zinc-300 overflow-hidden select-none clip-corner">

            {/* Structural Background Blueprint Matrix Grid */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none z-0"></div>

            {/* Programmatically Generated Tactical System Watermarks */}
            {WATERMARK_POSITIONS.map((position, idx) => (
                <div
                    key={idx}
                    className={`absolute top-20 ${position} text-9xl font-black text-zinc-900/[0.02] font-mono pointer-events-none transform -rotate-6 z-0 uppercase`}
                >
                    {WATERMARK_TEXT}
                </div>
            ))}

            {/* INVERTED: Stark White-Plated Wrapped Header & Control Interface */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 p-4 bg-zinc-100 border border-zinc-300 relative z-10 font-mono clip-corner">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        {/* High-Contrast Plated Heading Styling */}
                        <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-wide border-l-4 border-l-black pl-3 pr-2 py-0.5">
                            ваша команда
                        </h2>
                    </div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider pl-1">
                        // Активные участники вашей команды
                    </p>
                </div>

                {/* Network Map Terminal Trigger - Swapped to Dark Matrix Accent */}
                <button className="px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-100 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 hover:text-zinc-950 hover:border-zinc-300 transition-all duration-150 clip-corner shadow-xs shrink-0 cursor-pointer">
                    [ показать всю команду ]
                </button>
            </div>

            {/* Node Deployment Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 items-start">
                {culprits.map((person, index) => (
                    <PersonCard
                        key={index}
                        url={person.url}
                        name={person.name}
                        alt={person.alt}
                        info={person.info}
                    />
                ))}

                {/* Isolated footprint content wrapper node */}
                <div className="w-full lg:w-auto">
                    <Extra />
                </div>
            </div>
        </div>
    </section>
);

export { GroupSection };