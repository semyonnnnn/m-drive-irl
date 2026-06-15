import { PageProps, LearningMaterial } from "@/types";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function SingleItem({ material }: PageProps<{ material: LearningMaterial }>) {
    console.log(material.id)

    return (
        <AuthenticatedLayout>
            <iframe
                src={`/storage/${material.file_path}`}
                width="100%"
                height="800px"
                title="PDF Viewer"
            />
        </AuthenticatedLayout>
    );
}