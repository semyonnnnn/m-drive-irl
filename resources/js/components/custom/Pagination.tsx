import { Link } from "@inertiajs/react";

interface PaginationProps {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    current_page: number;
    last_page: number;
    total: number;
}

export const Pagination = ({ links, current_page, last_page, total }: PaginationProps) => {
    // Hide component entirely if there are no pages to navigate
    if (!links || links.length <= 3) return null;

    const randomDigit = Math.floor(Math.random() * 10);

    console.log(links);

    return (
        <div className="mt-8 p-3 bg-zinc-100 border border-zinc-300/80 flex justify-between items-center font-mono text-xs clip-corner relative z-10 shadow-xs">
            <div className="text-zinc-500 uppercase text-[9px] font-bold">
                // Сектор: {current_page} из {last_page} [Всего: {total}]
            </div>
            <div className="flex gap-1">
                {links.map((link, idx) => {
                    // Strip down default arrows into uniform industrial bracket tags
                    const cleanLabel = link.label
                        .replace('&laquo; Previous', '[ ПРЕД ]')
                        .replace('Next &raquo;', '[ СЛЕД ]');

                    if (!link.url) {
                        return (
                            <span
                                key={idx}
                                className="px-2 py-1 text-zinc-400 border border-zinc-200 bg-zinc-200/30 cursor-not-allowed clip-corner text-[10px]"
                            >
                                {cleanLabel}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={idx}
                            href={link.url}
                            preserveScroll
                            preserveState
                            className={`px-3 py-1.5 border text-[10px] font-mono font-black uppercase tracking-widest select-none cursor-pointer transition-all duration-75 active:scale-98 ${link.active
                                ? "bg-orange-700 border-orange-950 text-orange-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] translate-y-0.5"
                                : `bg-zinc-800 border-zinc-950 text-zinc-400 hover:text-orange-500 hover:border-orange-900 shadow-[0_2px_0_#09090b] hover:shadow-none hover:translate-y-0.5 ${Math.random() < 0.3 && 'animate-core-malfunction'}`
                                }`}
                        >
                            <span className="ac-text block">
                                {cleanLabel}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};