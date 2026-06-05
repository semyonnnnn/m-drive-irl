import React, { useState } from "react";
import { Link } from '@inertiajs/react';

// Types for the materials data structure
interface LearningMaterial {
    id: string;
    title: string;
    img?: string; // Optional to handle fallback generation
    icon: string;
    type: string;
    typeIcon: string;
    iconColor?: string;
}

// Mocked learning materials data
const MATERIALS_DATA: LearningMaterial[] = [
    { id: "m1", title: "Intro to AI Ethics", img: "3", icon: "circle-play", type: "Video Course", typeIcon: "circle-play" },
    { id: "m2", title: "Quantum Logic v2", icon: "file-lines", type: "PDF Document", typeIcon: "file-lines", iconColor: "text-red-500" },
    { id: "m3", title: "Network Security", img: "5", icon: "terminal", type: "LAB Guide", typeIcon: "code", iconColor: "text-amber-500" },
    { id: "m4", title: "Calculus IV Recap", icon: "circle-play", type: "Video Course", typeIcon: "circle-play" },
    { id: "m5", title: "Hardware Arch.", img: "7", icon: "file-audio", type: "Podcast", typeIcon: "file-audio", iconColor: "text-purple-500" },
];

interface CoverProps {
    item: LearningMaterial;
}

// Sub-component managing cover layout, image errors, and high-tech placeholders
const MaterialCover: React.FC<CoverProps> = ({ item }) => {
    const [imgError, setImgError] = useState(false);
    const hasValidImage = item.img && item.img.length > 2 && !imgError;

    return (
        <div className="w-full h-full aspect-square relative overflow-hidden bg-zinc-200 border border-zinc-300 clip-corner group">
            {/* Core Cover Render (Image or Blueprint Fallback Stack) */}
            {hasValidImage ? (
                <img
                    src={item.img?.startsWith('http') ? item.img : `http://googleusercontent.com/profile/picture/${item.img}`}
                    alt={`${item.title} cover`}
                    onError={() => setImgError(true)}
                    className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            ) : (
                /* High-tech fallback system layout wrapper */
                <div className="w-full h-full p-4 flex flex-col justify-between relative overflow-hidden select-none">

                    {/* Layer 1: Independent Absolute Color Backdrop */}
                    <div className="absolute -inset-8 bg-linear-to-r from-40% from-zinc-200 to-zinc-300 outline-1 outline-white -outline-offset-1 z-0 pointer-events-none"></div>

                    {/* Layer 2: Structural Background Grid lines (Sibling to color layer) */}
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:10px_10px] z-0"></div>

                    {/* Layer 3: Giant technical accent icon watermark */}
                    <div className=" absolute -bottom-6 -right-6 text-7xl font-black text-zinc-900/[0.04] transform -rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-0 pointer-events-none z-0">
                        <i className={`fa-solid fa-${item.typeIcon}`}></i>
                    </div>

                    {/* Foreground Content Layout */}
                    <div className="flex justify-between items-start z-10 w-full font-mono">
                        <span className="text-[9px] tracking-widest text-zinc-500 uppercase">{item.id} // SYS</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-zinc-900 text-white font-bold uppercase tracking-wider clip-corner">
                            {item.type.split(' ')[0]}
                        </span>
                    </div>

                    {/* Mid-card Abstract Tech Stamp */}
                    <div className="z-10 my-auto pt-2">
                        <div className="text-sm font-mono group-hover:text-amber-600 text-zinc-900 font-black tracking-wide uppercase line-clamp-3">
                            {item.title}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Programmatic background telemetry configurations matching the Gold Standard layout structure
const MATERIAL_WATERMARK_TEXT = "материалы";
const MATERIAL_WATERMARK_POSITIONS = ["left-[5%]", "left-[65%]"];

const StudyMaterialsSection = () => {
    const totalMaterials = MATERIALS_DATA.length;

    return (
        <section className="py-10">
            {/* Core Tactical Terminal Enclosure - Synchronized with Gold Standard Chassis */}
            <div className="relative p-8 bg-zinc-50 border border-zinc-300 overflow-hidden select-none clip-corner">

                {/* Background Blueprint Matrix Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none z-0"></div>

                {/* Programmatically Generated Material Matrix Background Watermarks */}
                {MATERIAL_WATERMARK_POSITIONS.map((position, idx) => (
                    <div
                        key={idx}
                        className={`absolute top-20 ${position} text-9xl font-black text-zinc-900/[0.02] font-mono pointer-events-none transform -rotate-6 z-0 uppercase`}
                    >
                        {MATERIAL_WATERMARK_TEXT}
                    </div>
                ))}

                {/* Header Module - Wrapped exactly the same layout signature as Gold Standard */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 p-4 bg-zinc-100 border border-zinc-300 relative z-10 font-mono clip-corner">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            {/* Plated Layout with Black Left Boundary Accent Tag */}
                            <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-wide border-l-4 border-l-black pl-3 pr-2 py-0.5">
                                Материалы
                            </h2>
                            <span className="text-[10px] text-zinc-500 font-bold tracking-widest ml-1 bg-zinc-200/60 px-1 py-0.5 rounded-xs">
                                [{totalMaterials} UNITS_INDEXED]
                            </span>
                        </div>
                        <p className="text-zinc-500 text-xs uppercase tracking-wider pl-1">
                            // Доступные информационные ресурсы и спецификации
                        </p>
                    </div>

                    {/* Tactical Navigation Action Node */}
                    <Link
                        href={route('upload.index')}
                        className="px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-100 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 hover:text-zinc-950 hover:border-zinc-300 transition-all duration-150 clip-corner shadow-xs shrink-0 cursor-pointer">
                        [ Посмотреть все ]
                    </Link>
                </div>

                {/* Grid Layout Framework Deployment */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 relative z-10 items-start">
                    {/* Dynamically Mapped Items */}
                    {MATERIALS_DATA.map((item) => (
                        <div key={item.id} className="group cursor-pointer flex flex-col">
                            <div className="w-full mb-3">
                                <MaterialCover item={item} />
                            </div>
                            <div className="px-1">
                                {/* Retained original hover effects and typography styles, adapted to tech-palette */}
                                <h5 className="text-sm font-bold font-mono truncate text-zinc-900 transition-all duration-150 underline underline-offset-4 decoration-2 decoration-transparent group-hover:text-amber-600 group-hover:decoration-amber-400">
                                    {item.title}
                                </h5>
                                <p className="text-xs text-zinc-500 flex items-center gap-0 font-semibold mt-1 font-mono uppercase tracking-wider">
                                    <i className={`fa-solid fa-${item.typeIcon} ${item.iconColor || 'text-zinc-400'} text-[10px]`}></i>
                                    {item.type}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { StudyMaterialsSection };