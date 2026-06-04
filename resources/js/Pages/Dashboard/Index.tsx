import { GroupSection } from "./GroupSection";
import { TaskSection } from "./TaskSection";
import { StudyMaterialsSection } from "./StudyMaterialsSection";
import { ScheduleSection } from "./ScheduleSection";
import { UpButton } from "./UpButton";

export default function Index() {
    return (
        <main className="max-w-350 mx-auto p-8 flex flex-col gap-10">
            <GroupSection />
            <TaskSection />
            <StudyMaterialsSection />
            <ScheduleSection />
            <UpButton />
        </main>
    );
}