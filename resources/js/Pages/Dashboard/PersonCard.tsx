import { PersonCardProps } from "@/types";
import { Link } from "@inertiajs/react";

const PersonCard = ({ url, name, alt, info }: PersonCardProps) => {
    return (
        <Link
            href={`/tasks/`}
            className="block group select-none"
        >
            {/* Core Tactical Chassis - Light Armor Edition */}
            <div className="relative p-5 w-fit bg-zinc-50 border border-zinc-300 outline-1 outline-transparent -outline-offset-1 transition-all duration-200 group-hover:border-amber-600 group-hover:bg-amber-50/30 group-hover:shadow-[0_0_12px_rgba(8,145,178,0.1)] clip-corner">

                {/* Visual Intercept Overlay Corner Marks */}
                <div className="absolute top-0 right-0 w-4 h-[2px] bg-zinc-400 group-hover:bg-amber-600 transition-colors"></div>
                <div className="absolute top-0 right-0 h-4 w-[2px] bg-zinc-400 group-hover:bg-amber-600 transition-colors"></div>

                <div className="flex items-center gap-5 relative z-10">
                    {/* COMMS / PILOT ID IMAGE MODULE */}
                    <div className="relative shrink-0">
                        <div className="w-20 h-20 bg-zinc-200 border-2 border-zinc-400 p-1 group-hover:border-amber-600 transition-colors">
                            <img
                                src={url}
                                alt={alt}
                                className="w-full h-full object-cover filter sepia contrast-115 group-hover:sepia-0 transition-all duration-300"
                            />
                        </div>
                        {/* FCS Lock / Node Status Indicator */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-zinc-100 border-2 border-zinc-50 group-hover:bg-amber-600 transition-colors flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-zinc-400 group-hover:bg-white rounded-none animate-pulse"></div>
                        </div>
                    </div>

                    {/* HUD DATA DISPLAY */}
                    <div className="flex-1 min-w-0 font-mono">
                        <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="text-md font-bold uppercase tracking-wider text-zinc-900 group-hover:text-amber-700 transition-colors truncate">
                                {name}
                            </p>
                            <span className="text-[9px] text-zinc-400 group-hover:text-amber-600 font-black tracking-widest uppercase shrink-0">
                                [ {alt} ]
                            </span>
                        </div>
                        <p className="text-sm text-zinc-500 group-hover:text-zinc-700 transition-colors line-clamp-2 uppercase tracking-wide leading-tight">
                            {info}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

const Extra = () => {
    return (
        /* Reduced horizontal footprint using max-w-xs and w-fit */
        <div className="select-none font-mono relative p-4 w-fit max-w-xs flex flex-col justify-between bg-zinc-100/60 border border-dashed border-zinc-300 hover:border-amber-600 hover:bg-amber-50/20 transition-all duration-200 cursor-pointer group clip-corner">

            {/* Background Structural Matrix Grid */}
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none"></div>

            <div className="flex items-start justify-between gap-6 w-full relative z-10 mb-3">
                <div className="flex items-center gap-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-700 group-hover:text-amber-600 transition-colors whitespace-nowrap">
                        Пригласить коллегу
                    </p>
                </div>
                <span className="text-[8px] px-1 py-0.5 bg-zinc-200 border border-zinc-300 text-zinc-500 uppercase tracking-widest">
                    доб_уч
                </span>
            </div>

            {/* Tactical Load / Slots Metrics */}
            <div className="border-t border-zinc-200 pt-2 flex items-center justify-between gap-4 relative z-10">
                <p className="text-[9px] text-amber-600 font-black uppercase tracking-widest group-hover:text-amber-700">
                    // 3 СВОБОДНЫХ МЕСТА
                </p>
                {/* Small UI micro-pips simulating hardware nodes */}
                <div className="flex gap-1 shrink-0">
                    <div className="w-2 h-1 bg-amber-600/30 group-hover:bg-amber-600 transition-colors"></div>
                    <div className="w-2 h-1 bg-amber-600/30 group-hover:bg-amber-600 transition-colors"></div>
                    <div className="w-2 h-1 bg-amber-600/30 group-hover:bg-amber-600 transition-colors"></div>
                </div>
            </div>
        </div>
    );
}

export {
    PersonCard,
    Extra
};