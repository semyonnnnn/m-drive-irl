import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export interface TestFormData {
    title: string;
    department: string;
    description: string;
    timeLimit: number;
    questionCount: number;
    questions: Array<{ id: string; text: string }>;
}

export default function Create({ auth }: PageProps) {
    const [formData, setFormData] = useState<TestFormData>({
        title: '',
        department: '',
        description: '',
        timeLimit: 30,
        questionCount: 10,
        questions: [],
    });

    const [newQuestionText, setNewQuestionText] = useState('');

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'timeLimit' || name === 'questionCount' ? Number(value) : value,
        }));
    };

    const handleAddQuestion = () => {
        if (!newQuestionText.trim()) return;
        setFormData((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                { id: `q_${Date.now()}`, text: newQuestionText.trim() },
            ],
        }));
        setNewQuestionText('');
    };

    const handleRemoveQuestion = (id: string) => {
        setFormData((prev) => ({
            ...prev,
            questions: prev.questions.filter((q) => q.id !== id),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('tests.store'), formData);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-mono font-black text-xl text-zinc-900 uppercase tracking-widest">
                    // СОЗДАНИЕ_ТЕСТА
                </h2>
            }
        >
            <Head title="Создание теста" />

            <div className="py-8 max-w-5xl mx-auto sm:px-6 lg:px-8">
                <div className="w-full bg-zinc-200/60 p-6 clip-corner border-2 border-amber-500/40 font-mono shadow-xs">
                    {/* HEADER METADATA */}
                    <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-zinc-400">
                        <div className="flex items-center gap-2">
                            <span className="text-amber-600 font-black">//</span>
                            <h3 className="text-base font-black text-zinc-900 uppercase tracking-widest">
                                КОНСТРУКТОР НОВОГО ПРОТОКОЛА
                            </h3>
                        </div>
                        <span className="text-[10px] font-black bg-amber-500 text-zinc-950 px-2 py-0.5 clip-corner">
                            СТАТУС: ЧЕРНОВИК
                        </span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* CONFIGURATION FIELDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-[10px] font-black text-zinc-600 uppercase mb-1">
                                    Наименование Теста
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="ВВЕДИТЕ НАЗВАНИЕ..."
                                    required
                                    className="w-full bg-zinc-100 text-zinc-950 placeholder-zinc-500 text-xs px-3 py-2.5 font-bold border-2 border-zinc-400 outline-hidden focus:border-amber-600 uppercase tracking-wider clip-corner"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-zinc-600 uppercase mb-1">
                                    Целевая Группа / Подразделение
                                </label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    placeholder="НАПР. ОТДЕЛ СТАТИСТИКИ..."
                                    className="w-full bg-zinc-100 text-zinc-950 placeholder-zinc-500 text-xs px-3 py-2.5 font-bold border-2 border-zinc-400 outline-hidden focus:border-amber-600 uppercase tracking-wider clip-corner"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-[10px] font-black text-zinc-600 uppercase mb-1">
                                Описание и Инструкции
                            </label>
                            <textarea
                                rows={2}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="УКАЖИТЕ ОСНОВНЫЕ ТРЕБОВАНИЯ И ВВОДНЫЕ..."
                                className="w-full bg-zinc-100 text-zinc-950 placeholder-zinc-500 text-xs p-3 font-bold border-2 border-zinc-400 outline-hidden focus:border-amber-600 uppercase tracking-wider clip-corner resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div>
                                <label className="block text-[10px] font-black text-zinc-600 uppercase mb-1">
                                    Лимит Времени (Мин)
                                </label>
                                <input
                                    type="number"
                                    name="timeLimit"
                                    value={formData.timeLimit}
                                    onChange={handleInputChange}
                                    className="w-full bg-zinc-100 text-zinc-950 text-xs px-3 py-2 font-bold border-2 border-zinc-400 outline-hidden focus:border-amber-600 clip-corner"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-zinc-600 uppercase mb-1">
                                    Количество Вопросов
                                </label>
                                <input
                                    type="number"
                                    name="questionCount"
                                    value={formData.questionCount}
                                    onChange={handleInputChange}
                                    className="w-full bg-zinc-100 text-zinc-950 text-xs px-3 py-2 font-bold border-2 border-zinc-400 outline-hidden focus:border-amber-600 clip-corner"
                                />
                            </div>
                        </div>

                        {/* DYNAMIC QUESTION INGESTION */}
                        <div className="mb-6 pt-4 border-t-2 border-zinc-300">
                            <label className="block text-[10px] font-black text-zinc-600 uppercase mb-2">
                                // ИНИЦИАЛИЗАЦИЯ ВОПРОСОВ ({formData.questions.length})
                            </label>

                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={newQuestionText}
                                    onChange={(e) => setNewQuestionText(e.target.value)}
                                    placeholder="ДОБАВИТЬ ВОПРОС К ПРОТОКОЛУ..."
                                    className="flex-1 bg-zinc-100 text-zinc-950 placeholder-zinc-500 text-xs px-3 py-2 font-bold border-2 border-zinc-400 outline-hidden focus:border-amber-600 uppercase tracking-wider clip-corner"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddQuestion}
                                    className="px-4 py-2 bg-zinc-950 border-2 border-amber-500 text-amber-500 text-xs font-black uppercase tracking-wider hover:bg-amber-500 hover:text-zinc-950 transition-colors clip-corner cursor-pointer"
                                >
                                    + ДОБАВИТЬ
                                </button>
                            </div>

                            {formData.questions.length > 0 && (
                                <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                    {formData.questions.map((q, idx) => (
                                        <li
                                            key={q.id}
                                            className="flex items-center justify-between bg-zinc-100 p-2 border-2 border-zinc-300 text-xs font-bold clip-corner"
                                        >
                                            <span className="truncate pr-2">
                                                <strong className="text-amber-600 mr-2">[{idx + 1}]</strong>
                                                {q.text}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveQuestion(q.id)}
                                                className="text-red-600 hover:text-red-800 font-black text-xs px-2 py-0.5 border border-red-500/40 clip-corner cursor-pointer"
                                            >
                                                [ УДАЛИТЬ ]
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* FORM CONTROLS */}
                        <div className="flex gap-4 justify-end pt-4 border-t-2 border-zinc-300">
                            <button
                                type="button"
                                onClick={() => router.visit(route('tests.index'))}
                                className="px-5 py-2.5 bg-zinc-300 border-2 border-zinc-500 text-zinc-800 text-xs font-black uppercase tracking-wider hover:bg-zinc-400 cursor-pointer clip-corner"
                            >
                                [ ОТМЕНА ]
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-zinc-950 border-2 border-amber-500 text-amber-500 text-xs font-black uppercase tracking-wider hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer clip-corner"
                            >
                                // СОХРАНИТЬ_ПРОТОКОЛ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}