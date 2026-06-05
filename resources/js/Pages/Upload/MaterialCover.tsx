import { useState } from "react";
import { CoverProps } from "@/types";


const MaterialCover: React.FC<CoverProps> = ({ item }) => {
    const [imgError, setImgError] = useState(false);
    const hasValidImage = item.img && item.img.length > 0 && !imgError;

    return (
        <div className="w-full aspect-square relative overflow-hidden bg-zinc-200/80 border border-zinc-400/80 clip-corner group shadow-inner">
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-zinc-500 z-10"></div>
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-zinc-500 z-10"></div>
            {hasValidImage ? (
                <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-zinc-900/10 mix-blend-multiply z-10 pointer-events-none"></div>
                    <img
                        src={`http://googleusercontent.com/profile/picture/${item.img}`}
                        alt={`${item.title}`}
                        onError={() => setImgError(true)}
                        className="block w-full h-full object-cover filter contrast-115 brightness-95 sepia-15 group-hover:scale-103 transition-transform duration-700"
                    />
                </div>
            ) : (
                <div className="w-full h-full p-4 flex flex-col justify-between relative overflow-hidden select-none bg-linear-to-b from-zinc-250 to-zinc-300/60">
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[8px_8px] z-0"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-400/20 border-dashed border-t z-0"></div>
                    <div className="absolute -bottom-8 -right-8 text-8xl font-black text-zinc-950/3 transform -rotate-12 transition-transform duration-700 group-hover:scale-105 pointer-events-none z-0">
                        <i className={`fa-solid fa-${item.typeIcon}`}></i>
                    </div>
                    <div className="flex justify-between items-start z-10 w-full font-mono">
                        <span className="text-[8px] tracking-wider text-zinc-500 font-bold">{item.id} // SEC_DATA</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-zinc-800 text-zinc-200 font-bold uppercase tracking-wider clip-corner">
                            {item.type.split(' ')[0]}
                        </span>
                    </div>
                    <div className="z-10 my-auto pt-2">
                        <div className="text-xs font-mono group-hover:text-amber-600 text-zinc-800 font-bold tracking-wide uppercase line-clamp-3 transition-colors duration-150">
                            {item.title}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export { MaterialCover }