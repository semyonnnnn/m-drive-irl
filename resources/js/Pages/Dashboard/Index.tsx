import { GroupSection } from "./GroupSection";
import { TaskSection } from "./TaskSection";
import { StudyMaterialsSection } from "./StudyMaterialsSection";
import { ScheduleSection } from "./ScheduleSection";
import { UpButton } from "./UpButton";

export default function Index() {
    return (
        <main className="mx-auto bg-linear-to-r from-gray-100 via-gray-100/50 to-gray-500/20 p-8 flex flex-col gap-14">
            <GroupSection />
            <TaskSection />
            <StudyMaterialsSection />
            <ScheduleSection />
            <UpButton />
        </main>
    );
}