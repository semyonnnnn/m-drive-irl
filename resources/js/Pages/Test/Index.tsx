import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import React from 'react';

export default function CreateDoc() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.post('/doc.create', formData);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Тесты" />
        </AuthenticatedLayout>
    );
}
