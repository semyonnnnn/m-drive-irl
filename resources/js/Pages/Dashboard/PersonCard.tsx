import { PersonCardProps } from "@/types";

const PersonCard = ({ url, name, alt, info }: PersonCardProps) => {
    return (<div className="flex items-center gap-6 p-6 rounded-3xl bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-lg transition-all group">
        <div className="relative">
            <img
                src={url}
                alt={alt}
                className="w-24 h-24 rounded-full object-cover relative z-10 border-4 border-white shadow-md"
            />
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-slate-300 border-4 border-white rounded-full z-20"></div>
        </div>
        <div className="flex-1">
            <p className="text-xl font-extrabold mb-1 font-headline">{name}</p>
            <p className="text-sm text-slate-500 mb-3 font-medium">{info}</p>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-surface-container text-on-surface-variant rounded-xl text-xs font-bold transition-all hover:bg-surface-container-high font-headline">
                <i className="fa-solid fa-comment text-sm"></i>
                кнопка
            </button>
        </div>
    </div>);
}

const Extra = () => {
    return (
        <div className="flex items-center justify-center p-6 rounded-3xl border-2 border-dashed border-surface-container-highest bg-white/20 hover:bg-white/40 transition-colors cursor-pointer">
            <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-2">
                    <i className="fa-solid fa-plus text-primary"></i>
                </div>
                <p className="text-sm font-bold font-headline">Пригласить коллегу</p>
                <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest font-headline">3 СВОБОДНЫХ МЕСТА</p>
            </div>
        </div>);
}

export {
    PersonCard,
    Extra
};