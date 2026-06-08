import { GroupSection } from "./GroupSection";
import { TaskSection } from "./TaskSection"
import { StudyMaterialsSection } from "./StudyMaterialsSection";
import { ScheduleSection } from "./ScheduleSection";
import { UpButton } from "./UpButton";

export default function Index() {
    return (
        <main
            className="relative min-h-screen w-full p-8 flex flex-col gap-10 font-mono text-zinc-900 bg-zinc-300"
            style={{
                backgroundImage: `
                    /* X-AXIS: Messy vertical noise with random gaps */
                    linear-gradient(90deg, rgba(24,24,27,0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(24,24,27,0.1) 1px, transparent 1px),
                    /* Y-AXIS: Messy horizontal noise with random gaps */
                    linear-gradient(0deg, rgba(24,24,27,0.08) 1px, transparent 1px),
                    linear-gradient(0deg, rgba(24,24,27,0.12) 1px, transparent 1px),
                    linear-gradient(0deg, rgba(24,24,27,0.05) 1px, transparent 1px),
                    /* Accidental "Signal Loss" (The 2 gaps on the page) */
                    linear-gradient(90deg, transparent 45%, #d4d4d8 45%, #d4d4d8 46%, transparent 46%),
                    linear-gradient(0deg, transparent 72%, #d4d4d8 72%, #d4d4d8 73%, transparent 73%)
                `,
                /* Primes and uneven sizes to ensure patterns never align cleanly */
                backgroundSize: '137px 100%, 43px 100%, 100% 97px, 100% 53px, 100% 19px, 100% 100%, 100% 100%',
                backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0'
            }}
        >
            <GroupSection />
            <TaskSection />
            <StudyMaterialsSection />
            <ScheduleSection />

            <div className="mt-auto self-end">
                <UpButton />
            </div>
        </main>
    );
}