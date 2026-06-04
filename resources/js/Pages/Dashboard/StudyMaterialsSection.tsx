import React from "react";

// Types for the materials data structure
interface LearningMaterial {
    id: string;
    title: string;
    img: string;
    icon: string;
    type: string;
    typeIcon: string;
    iconColor?: string;
}

// Mocked learning materials data
const MATERIALS_DATA: LearningMaterial[] = [
    {
        id: "m1",
        title: "Intro to AI Ethics",
        img: "3",
        icon: "circle-play",
        type: "Video Course",
        typeIcon: "circle-play"
    },
    {
        id: "m2",
        title: "Quantum Logic v2",
        img: "4",
        icon: "file-lines",
        type: "PDF Document",
        typeIcon: "file-lines",
        iconColor: "text-red-500"
    },
    {
        id: "m3",
        title: "Network Security",
        img: "5",
        icon: "terminal",
        type: "LAB Guide",
        typeIcon: "code",
        iconColor: "text-blue-500"
    },
    {
        id: "m4",
        title: "Calculus IV Recap",
        img: "6",
        icon: "circle-play",
        type: "Video Course",
        typeIcon: "circle-play"
    },
    {
        id: "m5",
        title: "Hardware Arch.",
        img: "7",
        icon: "file-audio",
        type: "Podcast",
        typeIcon: "file-audio",
        iconColor: "text-purple-500"
    },
];

const StudyMaterialsSection = () => {
    return (
        <section>
            {/* Header Area */}
            <div className="select-none flex items-center justify-between mb-6">
                <h2 className="font-headline font-extrabold text-2xl">Учебные материалы</h2>

                <div className="flex items-center gap-4">
                    {/* View Toggles */}
                    <div className="flex gap-2">
                        <button className="p-2 bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors">
                            <i className="fa-solid fa-table-cells-large text-sm text-slate-600"></i>
                        </button>
                        <button className="p-2 bg-transparent text-slate-400 rounded-lg hover:bg-surface-container-high transition-colors">
                            <i className="fa-solid fa-list text-sm"></i>
                        </button>
                    </div>

                    <span className="text-primary text-xs font-bold cursor-pointer font-headline uppercase tracking-wider">
                        Посмотреть все
                    </span>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="select-none grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {/* Dynamically Mapped Items */}
                {MATERIALS_DATA.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                        <div className="aspect-square rounded-3xl overflow-hidden mb-3 relative">
                            <img
                                src={`http://googleusercontent.com/profile/picture/${item.img}`}
                                alt={`${item.title} cover`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm">
                                <i className={`fa-solid fa-${item.icon} ${item.iconColor || "text-primary"} text-base`}></i>
                            </div>
                        </div>
                        <h5 className="text-sm font-bold font-headline truncate">{item.title}</h5>
                        <p className="text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
                            <i className={`fa-solid fa-${item.typeIcon} text-[10px]`}></i> {item.type}
                        </p>
                    </div>
                ))}

                {/* Static "Explore More" Library Card */}
                <div className="group cursor-pointer">
                    <div className="aspect-square rounded-3xl overflow-hidden mb-3 relative">
                        <div className="w-full h-full bg-surface-container-high flex flex-col items-center justify-center text-slate-400 group-hover:bg-primary/5 transition-colors">
                            <i className="fa-solid fa-circle-plus text-4xl mb-2"></i>
                            <span className="text-[9px] font-black uppercase tracking-widest font-headline">Библиотека</span>
                        </div>
                    </div>
                    <h5 className="text-sm font-bold font-headline truncate">Больше ресурсов</h5>
                    <p className="text-[10px] text-slate-500 font-semibold">Explore Catalog</p>
                </div>
            </div>
        </section>
    );
};

export { StudyMaterialsSection };