import { TaskCardProps } from "@/types"

const TaskCard = ({ title, desc, progress, icon, colorClass, gradientClass }: TaskCardProps) => (
    <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-[0px_10px_30px_rgba(0,0,0,0.02)] group hover:shadow-xl hover:shadow-primary/5 transition-all border border-transparent hover:border-primary/5">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-2xl ${colorClass} flex items-center justify-center`}>
                <i className={`fa-solid fa-${icon} text-lg`}></i>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
        </div>
        <h4 className="font-extrabold font-headline text-lg mb-1">{title}</h4>
        <p className="text-sm text-slate-500 mb-6 font-medium">{desc}</p>
        <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-black uppercase text-slate-700 font-headline">
                <span>Прогресс</span>
                <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div
                    className={`h-full bg-linear-to-r ${gradientClass} rounded-full relative`}
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute right-0 top-0 h-full w-2 bg-white/30 blur-sm"></div>
                </div>
            </div>
        </div>
    </div>
);

export { TaskCard }