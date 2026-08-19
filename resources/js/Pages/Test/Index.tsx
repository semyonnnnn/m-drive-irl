import { useState, useMemo, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
////////////////////////////////////////////
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MockTestItem, MOCK_AVAILABLE_TESTS, MOCK_PASSED_TESTS } from "./Mockups";
import { FlashProps } from "@/types";
import { PopUp } from "@/components/custom/PopUp";

const ITEMS_PER_PAGE = 6;

export default function TestIndexMock() {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<'ВСЕ' | 'В ПРОЦЕССЕ' | 'ЧЕРНОВИК'>('ВСЕ');

    const [availableTests, setAvailableTests] = useState<MockTestItem[]>(MOCK_AVAILABLE_TESTS);
    const [passedTests, setPassedTests] = useState<MockTestItem[]>(MOCK_PASSED_TESTS);

    const [availablePage, setAvailablePage] = useState<number>(1);
    const [passedPage, setPassedPage] = useState<number>(1);

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

        console.log(flash);

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

    const filteredAvailable = useMemo(() => {
        return availableTests.filter(t => {
            const matchesStatus = statusFilter === 'ВСЕ' || t.status === statusFilter;
            const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
            return matchesStatus && matchesSearch;
        });
    }, [availableTests, statusFilter, searchQuery]);

    const filteredPassed = useMemo(() => {
        return passedTests.filter(t => {
            return t.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
        });
    }, [passedTests, searchQuery]);

    const totalAvailablePages = Math.ceil(filteredAvailable.length / ITEMS_PER_PAGE) || 1;
    const paginatedAvailable = useMemo(() => {
        const start = (availablePage - 1) * ITEMS_PER_PAGE;
        return filteredAvailable.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredAvailable, availablePage]);

    const totalPassedPages = Math.ceil(filteredPassed.length / ITEMS_PER_PAGE) || 1;
    const paginatedPassed = useMemo(() => {
        const start = (passedPage - 1) * ITEMS_PER_PAGE;
        return filteredPassed.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredPassed, passedPage]);

    const handleSearchChange = (val: string) => {
        setSearchQuery(val);
        setAvailablePage(1);
        setPassedPage(1);
    };

    const handleStatusFilterChange = (filter: 'ВСЕ' | 'В ПРОЦЕССЕ' | 'ЧЕРНОВИК') => {
        setStatusFilter(filter);
        setAvailablePage(1);
    };

    const handleDeleteAvailable = (id: string) => {
        setAvailableTests(prev => prev.filter(item => item.id !== id));
    };

    const handleDeletePassed = (id: string) => {
        setPassedTests(prev => prev.filter(item => item.id !== id));
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
                <div className="bg-transparent border-b-2 border-white pb-6 flex flex-col md:flex-row md:items-center justify-between gap-96 relative z-20">
                    {/* БЛОК МЕТКИ ПОИСКА И НАВИГАЦИИ */}
                    <div className="flex flex-wrap items-center gap-4 bg-white px-3 py-2">


                        {/* НАВИГАЦИЯ ПО СТРАНИЦЕ */}
                        <div className="flex items-center gap-2 border-l-2 border-zinc-400 pl-4 text-xs font-black">
                            <span className="text-zinc-400">/</span>
                            <a
                                href="#passed-tests"
                                className="text-zinc-700 hover:text-amber-600 transition-colors uppercase tracking-wider"
                            >
                                [ 02_ЗАВЕРШЕННЫЕ ]
                            </a>
                        </div>
                    </div>

                    {/* ПОЛЕ ВВОДА */}
                    <div className="relative w-full md:w-2/3 lg:w-1/2 flex gap-4 flex-1">
                        <div className="flex items-center gap-3 bg-white px-3 py-2">
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

                {/* 1. БЛОК ДОСТУПНЫХ И АКТИВНЫХ ТЕСТОВ */}
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
                                <h1 id="available-tests" className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-wide">
                                    Доступные Тесты
                                </h1>
                                <span className="text-xs text-zinc-700 font-black tracking-wider bg-zinc-200 border-2 border-zinc-400 px-2 py-1 clip-corner">
                                    [{filteredAvailable.length} НАЗНАЧЕНО]
                                </span>
                            </div>
                            <p className="text-zinc-600 text-xs md:text-sm font-bold uppercase tracking-wider">
                                // Активные назначенные протоколы для прохождения и проверки
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                            <div className="flex bg-zinc-200 p-1 border-2 border-zinc-300 clip-corner text-xs font-bold">
                                {(['ВСЕ', 'В ПРОЦЕССЕ', 'ЧЕРНОВИК'] as const).map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => handleStatusFilterChange(filter)}
                                        className={`px-4 py-2 uppercase transition-colors cursor-pointer ${statusFilter === filter
                                            ? 'bg-zinc-950 text-amber-500'
                                            : 'text-zinc-700 hover:text-zinc-950'
                                            }`}
                                    >
                                        {filter === 'ВСЕ' ? 'Все' : filter === 'В ПРОЦЕССЕ' ? 'В процессе' : 'Черновики'}
                                    </button>
                                ))}
                            </div>

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

                    {/* Сетка доступных тестов */}
                    {paginatedAvailable.length === 0 ? (
                        <div className="p-12 text-center border-2 border-dashed border-zinc-300 bg-zinc-100/50 my-4">
                            <span className="text-zinc-500 font-black uppercase tracking-widest text-sm">
                                // Записи не найдены по заданным критериям
                            </span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 items-stretch">
                            {paginatedAvailable.map((test) => (
                                <div
                                    key={test.id}
                                    className="group flex flex-col justify-between bg-zinc-100/80 border-2 border-zinc-300 p-5 clip-corner hover:border-zinc-500 hover:bg-zinc-100 transition-all duration-150 shadow-xs relative"
                                >
                                    <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-zinc-300">
                                        <span className="text-xs text-zinc-500 font-black tracking-widest uppercase">
                                            #ТЕСТ-{test.id.padStart(4, '0')}
                                        </span>
                                        <span className={`text-xs font-black px-2.5 py-1 border-2 clip-corner uppercase tracking-widest ${test.status === 'В ПРОЦЕССЕ'
                                            ? 'bg-emerald-500/10 border-emerald-600 text-emerald-800'
                                            : test.status === 'ЧЕРНОВИК'
                                                ? 'bg-amber-500/10 border-amber-600 text-amber-800'
                                                : 'bg-zinc-200 border-zinc-400 text-zinc-700'
                                            }`}>
                                            [ {test.status} ]
                                        </span>
                                    </div>

                                    <div className="mb-6 flex-1">
                                        <h3 className="text-lg font-black text-zinc-950 group-hover:text-amber-600 transition-colors uppercase tracking-wide mb-3 line-clamp-2">
                                            {test.title}
                                        </h3>
                                        <p className="text-zinc-700 text-sm font-bold line-clamp-3 leading-relaxed mb-6">
                                            {test.description}
                                        </p>

                                        <div className="grid grid-cols-2 gap-3 p-3 bg-zinc-200/70 border-2 border-zinc-300 text-xs font-bold">
                                            <div>
                                                <span className="text-zinc-500 uppercase block text-[10px] font-black">Вопросов:</span>
                                                <span className="text-zinc-900 text-sm">{test.questions_count} ЕД.</span>
                                            </div>
                                            <div>
                                                <span className="text-zinc-500 uppercase block text-[10px] font-black">Таймер:</span>
                                                <span className="text-zinc-900 text-sm">{test.time_limit_minutes} МИН</span>
                                            </div>
                                            <div>
                                                <span className="text-zinc-500 uppercase block text-[10px] font-black">Группа:</span>
                                                <span className="text-zinc-900 text-sm truncate block">{test.target_group}</span>
                                            </div>
                                            <div>
                                                <span className="text-zinc-500 uppercase block text-[10px] font-black">Создан:</span>
                                                <span className="text-zinc-900 text-sm">{test.created_at}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {editMode ? (
                                        <div className="flex gap-3 pt-4 border-t-2 border-zinc-300">
                                            <button
                                                onClick={() => alert(`Редактирование теста ${test.id}`)}
                                                className="flex-1 py-3 bg-zinc-200 border-2 border-zinc-500 text-zinc-900 text-xs font-black uppercase tracking-wider hover:bg-zinc-300 cursor-pointer text-center"
                                            >
                                                [ ПРАВКА ]
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAvailable(test.id)}
                                                className="flex-1 py-3 bg-zinc-950 border-2 border-amber-600 text-amber-500 text-xs font-black uppercase tracking-wider hover:bg-amber-600 hover:text-white cursor-pointer text-center"
                                            >
                                                [ УСТРАНИТЬ ]
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="pt-4 border-t-2 border-zinc-300">
                                            <button
                                                onClick={() => alert(`Запуск прохождения теста #${test.id}`)}
                                                className="w-full block py-3 text-center bg-zinc-950 border-2 border-zinc-800 text-amber-400 text-xs font-black uppercase tracking-widest hover:bg-amber-500 hover:text-zinc-950 hover:border-amber-600 transition-all cursor-pointer clip-corner"
                                            >
                                                // НАЧАТЬ_ТЕСТИРОВАНИЕ →
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Пагинация первого блока */}
                    <div className="mt-8 pt-5 border-t-2 border-zinc-300 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold">
                        <span className="text-zinc-600 uppercase tracking-widest text-sm">
                            ОТОБРАЖЕНО {paginatedAvailable.length} ИЗ {filteredAvailable.length} (МАКС 6 НА СТРАНИЦЕ)
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setAvailablePage(p => Math.max(1, p - 1))}
                                disabled={availablePage === 1}
                                className={`px-4 py-2 border-2 uppercase font-black cursor-pointer ${availablePage === 1
                                    ? 'bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed'
                                    : 'bg-zinc-200 border-zinc-400 text-zinc-800 hover:bg-zinc-300'
                                    }`}
                            >
                                [ ← НАЗАД ]
                            </button>

                            {Array.from({ length: totalAvailablePages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setAvailablePage(page)}
                                    className={`px-4 py-2 border-2 uppercase font-black cursor-pointer ${availablePage === page
                                        ? 'bg-zinc-950 border-amber-600 text-amber-500'
                                        : 'bg-zinc-200 border-zinc-300 text-zinc-800 hover:bg-zinc-300'
                                        }`}
                                >
                                    [ {page} ]
                                </button>
                            ))}

                            <button
                                onClick={() => setAvailablePage(p => Math.min(totalAvailablePages, p + 1))}
                                disabled={availablePage === totalAvailablePages}
                                className={`px-4 py-2 border-2 uppercase font-black cursor-pointer ${availablePage === totalAvailablePages
                                    ? 'bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed'
                                    : 'bg-zinc-200 border-zinc-400 text-zinc-800 hover:bg-zinc-300'
                                    }`}
                            >
                                [ вперёд → ]
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. БЛОК ПРОЙДЕННЫХ ТЕСТОВ */}
                <div className="relative p-6 md:p-8 bg-zinc-100/90 border-2 border-zinc-400/90 overflow-hidden rounded-xs z-10 clip-corner shadow-md">

                    <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none z-0"></div>

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 p-5 bg-zinc-200/80 border-2 border-zinc-300 relative z-10 clip-corner shadow-xs">
                        <div className="relative pl-5 border-l-8 border-zinc-950 py-1">
                            <div className="absolute top-0 left-0 w-3 h-2 bg-emerald-500 -ml-2"></div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 id="passed-tests" className="scroll-mt-40! text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-wide">
                                    Завершенные Тесты
                                </h2>
                                <span className="text-xs text-zinc-700 font-black tracking-wider bg-zinc-300 border-2 border-zinc-400 px-2 py-1 clip-corner">
                                    [{filteredPassed.length} В АРХИВЕ]
                                </span>
                            </div>
                            <p className="text-zinc-600 text-xs md:text-sm font-bold uppercase tracking-wider">
                                // История завершенных попыток и зафиксированные оценки
                            </p>
                        </div>
                    </div>

                    {/* Сетка пройденных тестов */}
                    {paginatedPassed.length === 0 ? (
                        <div className="p-12 text-center border-2 border-dashed border-zinc-300 bg-zinc-200/50 my-4">
                            <span className="text-zinc-500 font-black uppercase tracking-widest text-sm">
                                // Записи не найдены по заданным критериям
                            </span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 items-stretch">
                            {paginatedPassed.map((test) => (
                                <div
                                    key={test.id}
                                    className="group flex flex-col justify-between bg-zinc-50 border-2 border-zinc-300 p-5 clip-corner hover:border-emerald-600 transition-all duration-150 shadow-xs relative"
                                >
                                    <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-zinc-300">
                                        <span className="text-xs text-zinc-500 font-black tracking-widest uppercase">
                                            #АРХИВ-{test.id.padStart(4, '0')}
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
                                                <span className="text-emerald-700 text-base font-black">{test.score}%</span>
                                            </div>
                                            <div>
                                                <span className="text-zinc-500 uppercase block text-[10px] font-black">Дата сдачи:</span>
                                                <span className="text-zinc-900 text-sm">{test.passed_at}</span>
                                            </div>
                                            <div>
                                                <span className="text-zinc-500 uppercase block text-[10px] font-black">Вопросов:</span>
                                                <span className="text-zinc-900 text-sm">{test.questions_count} ЕД.</span>
                                            </div>
                                            <div>
                                                <span className="text-zinc-500 uppercase block text-[10px] font-black">Группа:</span>
                                                <span className="text-zinc-900 text-sm truncate block">{test.target_group}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {editMode ? (
                                        <div className="flex gap-3 pt-4 border-t-2 border-zinc-300">
                                            <button
                                                onClick={() => alert(`Редактирование записи архива ${test.id}`)}
                                                className="flex-1 py-3 bg-zinc-200 border-2 border-zinc-500 text-zinc-900 text-xs font-black uppercase tracking-wider hover:bg-zinc-300 cursor-pointer text-center"
                                            >
                                                [ ПРАВКА ]
                                            </button>
                                            <button
                                                onClick={() => handleDeletePassed(test.id)}
                                                className="flex-1 py-3 bg-zinc-950 border-2 border-amber-600 text-amber-500 text-xs font-black uppercase tracking-wider hover:bg-amber-600 hover:text-white cursor-pointer text-center"
                                            >
                                                [ УСТРАНИТЬ ]
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="pt-4 border-t-2 border-zinc-300">
                                            <button
                                                onClick={() => alert(`Просмотр результатов теста #${test.id}`)}
                                                className="w-full block py-3 text-center bg-zinc-200 border-2 border-zinc-400 text-zinc-900 text-xs font-black uppercase tracking-widest hover:bg-zinc-950 hover:text-amber-500 hover:border-zinc-950 transition-all cursor-pointer clip-corner"
                                            >
                                                // ПРОСМОТР_РЕЗУЛЬТАТОВ →
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Пагинация второго блока */}
                    <div className="mt-8 pt-5 border-t-2 border-zinc-300 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold">
                        <span className="text-zinc-600 uppercase tracking-widest text-sm">
                            ОТОБРАЖЕНО {paginatedPassed.length} ИЗ {filteredPassed.length} (МАКС 6 НА СТРАНИЦЕ)
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPassedPage(p => Math.max(1, p - 1))}
                                disabled={passedPage === 1}
                                className={`px-4 py-2 border-2 uppercase font-black cursor-pointer ${passedPage === 1
                                    ? 'bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed'
                                    : 'bg-zinc-200 border-zinc-400 text-zinc-800 hover:bg-zinc-300'
                                    }`}
                            >
                                [ ← НАЗАД ]
                            </button>

                            {Array.from({ length: totalPassedPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setPassedPage(page)}
                                    className={`px-4 py-2 border-2 uppercase font-black cursor-pointer ${passedPage === page
                                        ? 'bg-zinc-950 border-amber-600 text-amber-500'
                                        : 'bg-zinc-200 border-zinc-300 text-zinc-800 hover:bg-zinc-300'
                                        }`}
                                >
                                    [ {page} ]
                                </button>
                            ))}

                            <button
                                onClick={() => setPassedPage(p => Math.min(totalPassedPages, p + 1))}
                                disabled={passedPage === totalPassedPages}
                                className={`px-4 py-2 border-2 uppercase font-black cursor-pointer ${passedPage === totalPassedPages
                                    ? 'bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed'
                                    : 'bg-zinc-200 border-zinc-400 text-zinc-800 hover:bg-zinc-300'
                                    }`}
                            >
                                [ вперёд → ]
                            </button>
                        </div>
                    </div>
                </div>
                {/* HUD SCROLL TO TOP BUTTON (HIGH VISIBILITY) */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Scroll to top of page"
                    className="fixed bottom-8 right-8 z-50 group flex items-center justify-center p-5 bg-zinc-950 border-3 border-amber-500 hover:border-amber-400 text-amber-500 hover:text-zinc-950 hover:bg-amber-400 transition-all duration-150 cursor-pointer shadow-2xl active:translate-y-1"
                    style={{
                        clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))'
                    }}
                >
                    <div className="flex flex-col items-center gap-1 font-mono font-black text-sm tracking-widest uppercase">
                        <span className="text-2xl font-black leading-none group-hover:-translate-y-1 transition-transform">
                            ▲
                        </span>
                        <span className="text-lg font-black">00</span>
                    </div>
                </button>

            </main>
        </AuthenticatedLayout>
    );
}