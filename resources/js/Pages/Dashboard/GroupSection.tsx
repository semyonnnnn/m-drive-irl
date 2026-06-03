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

const GroupSection = () => (
    <section>
        <div className="p-8 rounded-[2.5rem] bg-linear-to-br from-[#eef1f3] via-white to-[#eef1f3] shadow-[0px_40px_80px_rgba(106,55,212,0.08)] border border-white relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

            <div className="flex justify-between items-center mb-10 relative z-10">
                <div>
                    <h2 className="font-headline font-extrabold text-3xl text-on-surface mb-1">Команда совместной работы</h2>
                    <p className="text-slate-500 text-sm font-semibold">Активные участники вашей когнитивной сети</p>
                </div>
                <button className="px-6 py-2 bg-white border border-surface-container-high rounded-full text-primary text-xs font-bold hover:shadow-lg transition-all font-headline">
                    Карта сети
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {/* Secondary Member */}
                {culprits.map((person, index) => (
                    <PersonCard
                        key={index}
                        url={person.url}
                        name={person.name}
                        alt={person.alt}
                        info={person.info}
                    />
                ))}
                <Extra />
            </div>
        </div>
    </section>
);

export {
    GroupSection
}