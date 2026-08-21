import { useState, useMemo, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
////////////////////////////////////////////
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FlashProps } from "@/types";
import { PopUp } from "@/components/custom/PopUp";
import { PaginatedTest } from "@/types";
import MainTestCard from "./Partials/MainTestCard";
import { Pagination } from "@/components/custom/Pagination";

type TabType = 'available' | 'passed' | 'my';

export default function Index(
    { available_tests, passed_tests, my_tests }:
        { available_tests: PaginatedTest; passed_tests: PaginatedTest; my_tests: PaginatedTest }
) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeTab, setActiveTab] = useState<TabType>('available');

    const [message, setMessage] = useState<FlashProps>({
        success: null,
        error: {
            summary: null,
            details: null,
        }
    });

    const flash = (usePage().props as any).flash as FlashProps;

    useEffect(() => {
        const isSuccessEmpty = flash.success === null;
        const isErrorEmpty = !flash?.error?.summary && !flash?.error?.details;

        if (isSuccessEmpty && isErrorEmpty) return;

        setMessage(prev => ({
            success: flash.success,
            error: isErrorEmpty ? prev.error : {
                summary: flash.error.summary,
                details: flash.error.details
            }
        }));

        if (flash.success) {
            const timer = setTimeout(() => {
                setMessage(prev => ({
                    ...prev,
                    success: null,
                }));
            }, 7000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const REPLICATED_WATERMARK_TEXT = "ТЕСТИРОВАНИЕ";
    const WATERMARK_LAYOUT_MAP = ["left-[2%]", "left-[55%]"];

    const handleSearchChange = (val: string) => {
        setSearchQuery(val);
    };

    const handleDeleteAvailable = (id: number) => {
        // Implement delete action or rely on router reload
    };

    const handleDeletePassed = (id: string | number) => {
        // Implement delete action or rely on router reload
    };

    return (
        <AuthenticatedLayout>
            {message.success && <PopUp message={message.success} handleClick={() => {
                setMessage({
                    success: null,
                    error: {
                        summary: null,
                        details: null,
                    }
                });
            }} />}
            <main className="min-h-screen bg-linear-to-r from-zinc-200/70 via-zinc-200/40 to-zinc-300/30 p-4 md:p-8 flex flex-col gap-8 relative select-none font-mono">

                {/* ГЛОБАЛЬНАЯ ПАНЕЛЬ ПОИСКА И НАВИГАЦИЯ */}
                <div className="bg-transparent border-b-2 border-white pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-20">
                    {/* БЛОК МЕТКИ ПОИСКА И НАВИГАЦИИ */}
                    <div className="flex flex-wrap items-center gap-4 bg-white px-3 py-2 border-2 border-zinc-300">
                        <span className="text-amber-500 font-black">//</span>
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-900">
                            ТЕРМИНАЛ УПРАВЛЕНИЯ ПРОТОКОЛАМИ
                        </span>
                    </div>

                    {/* ПОЛЕ ВВОДА */}
                    <div className="relative w-full md:w-2/3 lg:w-1/2 flex gap-4 flex-1">
                        <div className="flex items-center gap-3 bg-white px-3 py-2 border-2 border-zinc-300">
                            <span className="text-amber-500 font-black text-lg">//</span>
                            <h2 className="text-zinc-900 font-black uppercase text-sm md:text-base tracking-widest whitespace-nowrap">
                                ПОИСК ПО БАЗЕ
                            </h2>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Введите наименование протокола для фильтрации..."
                            className="w-full bg-zinc-200/90 text-zinc-950 placeholder-zinc-600 text-xs md:text-sm px-4 py-3 font-bold border-none outline-hidden focus:ring-0 uppercase tracking-wider clip-corner"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => handleSearchChange('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-amber-600 font-black text-xs cursor-pointer px-2 py-1"
                            >
                                [ СБРОС ]
                            </button>
                        )}
                    </div>
                </div>

                {/* 1. БЛОК ДОСТУПНЫХ ТЕСТОВ */}
                {activeTab === 'available' && (
                    <div className="relative p-6 md:p-8 bg-zinc-50 border-2 border-zinc-400/90 overflow-hidden rounded-xs z-10 clip-corner shadow-md">
                        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none z-0"></div>

                        {WATERMARK_LAYOUT_MAP.map((position, idx) => (
                            <div
                                key={idx}
                                className={`absolute top-36 ${position} text-9xl font-black text-zinc-950/2 pointer-events-none transform -rotate-3 z-0 uppercase tracking-widest`}
                            >
                                {REPLICATED_WATERMARK_TEXT}
                            </div>
                        ))}

                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 p-5 bg-zinc-100 border-2 border-zinc-300 relative z-10 clip-corner shadow-xs">
                            <div className="relative pl-5 border-l-8 border-zinc-950 py-1">
                                <div className="absolute top-0 left-0 w-3 h-2 bg-amber-500 -ml-2"></div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-wide">
                                        Доступные Тесты
                                    </h1>
                                    <span className="text-lg text-zinc-700 font-black tracking-wider bg-zinc-200 border-2 border-zinc-400 px-2 py-1 clip-corner">
                                        [{available_tests.total} доступно]
                                    </span>
                                </div>
                                <p className="text-zinc-600 text-xs md:text-sm font-bold uppercase tracking-wider">
                                    // Активные назначенные протоколы для прохождения и проверки
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setEditMode(!editMode)}
                                        className={`group relative px-6 py-3 border-2 text-sm font-black uppercase tracking-[0.15em] transition-all duration-200 cursor-pointer clip-corner shadow-xs ${editMode
                                                ? 'border-amber-600 bg-[repeating-linear-gradient(45deg,#f59e0b,#f59e0b_15px,#52525b_15px,#52525b_30px)] text-white'
                                                : 'bg-zinc-950 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-zinc-950'
                                            }`}
                                    >
                                        <span className={editMode ? 'bg-zinc-950/90 px-3 py-1 text-amber-400 border border-amber-500 block' : ''}>
                                            [ {editMode ? '01_ВЫЙТИ_ИЗ_УПРАВЛЕНИЯ' : '01_РЕЖИМ_УПРАВЛЕНИЯ'} ]
                                        </span>
                                    </button>

                                    <Link
                                        href={route('tests.create')}
                                        className="group relative px-6 py-3 bg-amber-500/10 border-2 border-amber-500 text-black hover:bg-amber-500 hover:text-zinc-950 text-sm font-black uppercase tracking-[0.15em] transition-all duration-200 clip-corner cursor-pointer shadow-xs"
                                    >
                                        [ 02_СОЗДАТЬ_ТЕСТ ]
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {available_tests.data.length === 0 ? (
                            <div className="p-12 text-center border-2 border-dashed border-zinc-300 bg-zinc-100/50 my-4">
                                <span className="text-zinc-500 font-black uppercase tracking-widest text-sm">
                                    // Записи не найдены по заданным критериям
                                </span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 items-stretch">
                                {available_tests.data.map((test) => (
                                    <MainTestCard
                                        key={test.id}
                                        test={test}
                                        editMode={editMode}
                                        onDelete={handleDeleteAvailable}
                                        onStart={(id) => alert(`Запуск прохождения теста #${id}`)}
                                        onEdit={(id) => alert(`Редактирование теста ${id}`)}
                                    />
                                ))}
                            </div>
                        )}

                        <Pagination
                            links={available_tests.links}
                            current_page={available_tests.current_page}
                            last_page={available_tests.last_page}
                            total={available_tests.total}
                        />
                    </div>
                )}

                {/* 2. БЛОК ЗАВЕРШЕННЫХ ТЕСТОВ */}
                {activeTab === 'passed' && (
                    <div className="relative p-6 md:p-8 bg-zinc-100/90 border-2 border-zinc-400/90 overflow-hidden rounded-xs z-10 clip-corner shadow-md">
                        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none z-0"></div>

                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 p-5 bg-zinc-200/80 border-2 border-zinc-300 relative z-10 clip-corner shadow-xs">
                            <div className="relative pl-5 border-l-8 border-zinc-950 py-1">
                                <div className="absolute top-0 left-0 w-3 h-2 bg-emerald-500 -ml-2"></div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-wide">
                                        Завершенные Тесты
                                    </h2>
                                    <span className="text-xs text-zinc-700 font-black tracking-wider bg-zinc-300 border-2 border-zinc-400 px-2 py-1 clip-corner">
                                        [{passed_tests.total} В АРХИВЕ]
                                    </span>
                                </div>
                                <p className="text-zinc-600 text-xs md:text-sm font-bold uppercase tracking-wider">
                                    // История завершенных попыток и зафиксированные оценки
                                </p>
                            </div>
                        </div>

                        {passed_tests.data.length === 0 ? (
                            <div className="p-12 text-center border-2 border-dashed border-zinc-300 bg-zinc-200/50 my-4">
                                <span className="text-zinc-500 font-black uppercase tracking-widest text-sm">
                                    // Записи не найдены по заданным критериям
                                </span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 items-stretch">
                                {passed_tests.data.map((test: any) => (
                                    <div
                                        key={test.id}
                                        className="group flex flex-col justify-between bg-zinc-50 border-2 border-zinc-300 p-5 clip-corner hover:border-emerald-600 transition-all duration-150 shadow-xs relative"
                                    >
                                        <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-zinc-300">
                                            <span className="text-xs text-zinc-500 font-black tracking-widest uppercase">
                                                #АРХИВ-{String(test.id).padStart(4, '0')}
                                            </span>
                                            <span className="text-xs font-black px-2.5 py-1 border-2 border-emerald-600 bg-emerald-500/10 text-emerald-800 clip-corner uppercase tracking-widest">
                                                [ ЗАВЕРШЕНО ]
                                            </span>
                                        </div>

                                        <div className="mb-6 flex-1">
                                            <h3 className="text-lg font-black text-zinc-900 uppercase tracking-wide mb-3 line-clamp-2">
                                                {test.title}
                                            </h3>
                                            <p className="text-zinc-600 text-sm font-bold line-clamp-3 leading-relaxed mb-6">
                                                {test.description}
                                            </p>

                                            <div className="grid grid-cols-2 gap-3 p-3 bg-zinc-200/60 border-2 border-zinc-300 text-xs font-bold">
                                                <div>
                                                    <span className="text-zinc-500 uppercase block text-[10px] font-black">Результат:</span>
                                                    <span className="text-emerald-700 text-base font-black">{test.score ?? '100'}%</span>
                                                </div>
                                                <div>
                                                    <span className="text-zinc-500 uppercase block text-[10px] font-black">Дата сдачи:</span>
                                                    <span className="text-zinc-900 text-sm">{test.created_at}</span>
                                                </div>
                                                <div>
                                                    <span className="text-zinc-500 uppercase block text-[10px] font-black">Вопросов:</span>
                                                    <span className="text-zinc-900 text-sm">{test.questions_count} ЕД.</span>
                                                </div>
                                                <div>
                                                    <span className="text-zinc-500 uppercase block text-[10px] font-black">Статус:</span>
                                                    <span className="text-zinc-900 text-sm truncate block">Пройдено</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t-2 border-zinc-300">
                                            <button
                                                onClick={() => alert(`Просмотр результатов теста #${test.id}`)}
                                                className="w-full block py-3 text-center bg-zinc-200 border-2 border-zinc-400 text-zinc-900 text-xs font-black uppercase tracking-widest hover:bg-zinc-950 hover:text-amber-500 hover:border-zinc-950 transition-all cursor-pointer clip-corner"
                                            >
                                                // ПРОСМОТР_РЕЗУЛЬТАТОВ →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Pagination
                            links={passed_tests.links}
                            current_page={passed_tests.current_page}
                            last_page={passed_tests.last_page}
                            total={passed_tests.total}
                        />
                    </div>
                )}

                {/* 3. БЛОК МОИХ ТЕСТОВ */}
                {activeTab === 'my' && (
                    <div className="relative p-6 md:p-8 bg-zinc-50 border-2 border-zinc-400/90 overflow-hidden rounded-xs z-10 clip-corner shadow-md">
                        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none z-0"></div>

                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 p-5 bg-zinc-100 border-2 border-zinc-300 relative z-10 clip-corner shadow-xs">
                            <div className="relative pl-5 border-l-8 border-zinc-950 py-1">
                                <div className="absolute top-0 left-0 w-3 h-2 bg-blue-500 -ml-2"></div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-wide">
                                        Мои Тесты
                                    </h2>
                                    <span className="text-lg text-zinc-700 font-black tracking-wider bg-zinc-200 border-2 border-zinc-400 px-2 py-1 clip-corner">
                                        [{my_tests.total} создано]
                                    </span>
                                </div>
                                <p className="text-zinc-600 text-xs md:text-sm font-bold uppercase tracking-wider">
                                    // Управление собственными созданными протоколами
                                </p>
                            </div>
                        </div>

                        {my_tests.data.length === 0 ? (
                            <div className="p-12 text-center border-2 border-dashed border-zinc-300 bg-zinc-100/50 my-4">
                                <span className="text-zinc-500 font-black uppercase tracking-widest text-sm">
                                    // Вы еще не создали ни одного теста
                                </span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 items-stretch">
                                {my_tests.data.map((test) => (
                                    <MainTestCard
                                        key={test.id}
                                        test={test}
                                        editMode={true}
                                        onDelete={handleDeleteAvailable}
                                        onStart={(id) => alert(`Предпросмотр теста #${id}`)}
                                        onEdit={(id) => alert(`Редактирование теста ${id}`)}
                                    />
                                ))}
                            </div>
                        )}

                        <Pagination
                            links={my_tests.links}
                            current_page={my_tests.current_page}
                            last_page={my_tests.last_page}
                            total={my_tests.total}
                        />
                    </div>
                )}

                {/* HUD SWITCHER BUTTONS (REPLACING THE SCROLL BUTTON POSITION) */}
                <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2">
                    <button
                        onClick={() => setActiveTab('available')}
                        className={`px-4 py-3 font-mono font-black text-xs uppercase tracking-widest border-2 transition-all cursor-pointer clip-corner shadow-2xl ${activeTab === 'available'
                                ? 'bg-amber-500 border-zinc-950 text-zinc-950'
                                : 'bg-zinc-950 border-amber-500 text-amber-500 hover:bg-zinc-900'
                            }`}
                    >
                        [ 01_ДОСТУПНЫЕ ]
                    </button>
                    <button
                        onClick={() => setActiveTab('passed')}
                        className={`px-4 py-3 font-mono font-black text-xs uppercase tracking-widest border-2 transition-all cursor-pointer clip-corner shadow-2xl ${activeTab === 'passed'
                                ? 'bg-emerald-500 border-zinc-950 text-zinc-950'
                                : 'bg-zinc-950 border-emerald-500 text-emerald-500 hover:bg-zinc-900'
                            }`}
                    >
                        [ 02_ЗАВЕРШЕННЫЕ ]
                    </button>
                    <button
                        onClick={() => setActiveTab('my')}
                        className={`px-4 py-3 font-mono font-black text-xs uppercase tracking-widest border-2 transition-all cursor-pointer clip-corner shadow-2xl ${activeTab === 'my'
                                ? 'bg-blue-500 border-zinc-950 text-zinc-950'
                                : 'bg-zinc-950 border-blue-500 text-blue-500 hover:bg-zinc-900'
                            }`}
                    >
                        [ 03_МОИ ]
                    </button>
                </div>

                {/* 
                // SCROLL TO TOP BUTTON COMMENTED OUT AS REQUESTED
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    ...
                >
                </button> 
                */}

            </main>
        </AuthenticatedLayout>
    );
}