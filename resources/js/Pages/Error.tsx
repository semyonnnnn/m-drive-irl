import React from 'react';
import { usePage, Link } from '@inertiajs/react';

interface ErrorProps {
    code?: string | number;
    rawMessage?: string;
    operation?: string;
    target?: string;
    status?: string;
    message?: string;
    telemetry?: string[];
    location?: string;
}

export default function Error() {
    const {
        code = '500',
        rawMessage = 'INTERNAL_SERVER_ERROR',
        operation = 'UNKNOWN_QUERY',
        target = 'NULL_PTR',
        status = 'СБОЙ_СИСТЕМЫ',
        message = 'ЦЕЛЬ НЕ ОБНАРУЖЕНА // ПРОВЕРЬТЕ КООРДИНАТЫ',
        telemetry,
        location = 'NULL'
    } = usePage().props as unknown as ErrorProps;

    const defaultTelemetry = [
        '???',
        '???',
        `ИНДЕКС_СБОЯ: ${code}`,
        'РЕКОМЕНДАЦИЯ: ВЕРНУТЬСЯ НА БАЗУ'
    ];

    const telemetryItems = telemetry ?? defaultTelemetry;

    return (
        <div className="h-full min-h-screen bg-[#0a0a0f] flex items-stretch font-mono p-2 antialiased text-[#ef4444] selection:bg-[#7f1d1d]/50 selection:text-red-200">
            <style>{`
                @keyframes staticScanline { 0% { transform: translateY(0); } 100% { transform: translateY(100vh); } }
                @keyframes flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.9; } 25%, 75% { opacity: 1; } }
                @keyframes glow { 0%, 100% { text-shadow: 0 0 5px #ef4444, 0 0 10px #ef4444; } 50% { text-shadow: 0 0 10px #ef4444, 0 0 20px #ef4444; } }
            `}</style>

            {/* Внешний контейнер рамки */}
            <div className="w-full p-2 bg-[#3f3f46] border border-[#52525b] rounded-lg shadow-[0_12px_35px_rgba(0,0,0,0.2)] relative flex flex-col">

                {/* Угловые маркеры */}
                <div className="absolute -top-px -left-px w-2.5 h-2.5 border-t-2 border-l-2 border-[#dc2626] pointer-events-none" />
                <div className="absolute -bottom-px -right-px w-2.5 h-2.5 border-b-2 border-r-2 border-[#dc2626] pointer-events-none" />

                {/* Главный фон терминала — жёстко #09090b */}
                <div className="relative flex flex-col flex-1 bg-[#09090b] text-[#ef4444] border border-[#3f0a0a] p-7.5 overflow-hidden select-none">

                    {/* Сканирующая линия */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-40 opacity-12 mix-blend-overlay">
                        <div className="w-full h-0.5 bg-[#ef4444] animate-[staticScanline_10s_linear_infinite]" />
                    </div>

                    {/* Сетка матрицы */}
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
                        style={{
                            backgroundImage: 'linear-gradient(to right, #ef4444 1px, transparent 1px), linear-gradient(to bottom, #ef4444 1px, transparent 1px)',
                            backgroundSize: '8px 8px'
                        }}
                    />

                    {/* ШАПКА */}
                    <div className="flex justify-between items-center border-b border-[#3f0a0a] pb-3 mb-5 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f87171] opacity-75" />
                                <span className="relative inline-flex rounded-[2px] h-2.5 w-2.5 bg-[#ef4444] shadow-[0_0_10px_#ef4444]" />
                            </div>
                            <span className="text-sm font-black uppercase tracking-[0.15em] text-[#e4e4e7]">
                                [ СИСТ_ОШИБКА // КОД: {code} ]
                            </span>
                        </div>
                        <Link
                            href="/"
                            className="text-[10px] text-[#a1a1aa] font-bold bg-[#18181b] border border-[#27272a] px-3 py-1.5 tracking-widest uppercase transition-all duration-200 hover:border-[#ef4444] hover:text-[#f87171] hover:bg-[#2a0808]"
                        >
                            [ ВОЗВРАТ_НА_БАЗУ ]
                        </Link>
                    </div>

                    {/* БЛОК КРУПНОГО КОДА ОШИБКИ */}
                    <div className="flex flex-col md:flex-row justify-center items-center my-3.75 mx-0 mb-5 p-3.75 bg-[#140505] border border-[#dc2626]/30 rounded-lg relative z-10">
                        <span
                            className="text-[72px] font-black text-[#ef4444] tracking-[10px] leading-none"
                            style={{ animation: 'glow 2s ease-in-out infinite, flicker 3s ease-in-out infinite' }}
                        >
                            {code}
                        </span>
                        <span className="w-4/5 md:w-0.5 h-0.5 md:h-12.5 bg-[#dc2626]/30 my-1 md:my-0 md:mx-5" />
                        <span className="text-base text-white font-bold tracking-[3px] ml-0 md:ml-3.75 inline-block word-break break-all white-space-normal uppercase text-center md:text-left">
                            {rawMessage}
                        </span>
                    </div>

                    {/* СЕТКА ИНТЕРФЕЙСА */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-7.5 relative z-10 flex-1 items-start">

                        {/* ЛЕВАЯ КАРТОЧКА ИНФО */}
                        <div className="md:col-span-1 flex flex-col">
                            <div className="bg-[#18181b]/60 border border-[#27272a] p-4 text-sm text-[#a1a1aa]">
                                <div className="font-black border-b border-[#27272a] pb-1 mb-1.5 text-[#ef4444] tracking-widest uppercase">
                                    // ОТЧЁТ_ПОТЕРИ
                                </div>
                                <div className="flex justify-between py-0.5">
                                    <span>ОПЕРАЦИЯ:</span>
                                    <span className="font-bold text-[#e4e4e7]">{operation}</span>
                                </div>
                                <div className="flex justify-between py-0.5">
                                    <span>ЦЕЛЕВОЙ_ОБЪЕКТ:</span>
                                    <span className="font-bold text-[#f87171]">[{target}]</span>
                                </div>
                                <div className="flex justify-between py-0.5">
                                    <span>СТАТУС:</span>
                                    <span className="font-bold text-[#f87171]">{status}</span>
                                </div>
                                <div className="flex justify-between py-0.5">
                                    <span>КОД_ОШИБКИ:</span>
                                    <span className="font-bold text-[#f87171]">{code}</span>
                                </div>
                            </div>
                            <div className="text-[10px] text-[#dc2626] font-bold tracking-widest pl-1 mt-2 animate-pulse">
                                &gt;&gt; ИЗОЛИРОВАНО_ДЛЯ_АНАЛИЗА
                            </div>
                        </div>

                        {/* ПРАВАЯ ТЕЛЕМЕТРИЯ */}
                        <div className="md:col-span-2 flex flex-col gap-2">
                            <div className="bg-[#2a0808]/40 border-l-2 border-[#dc2626] p-4 text-base font-bold uppercase tracking-[0.05em] text-[#fecaca] flex items-start gap-3">
                                <span className="text-[#ef4444] font-black text-[18px] leading-none mt-0.5">⚠</span>
                                <span>{message}</span>
                            </div>

                            <div className="mt-2">
                                <span className="block text-[10px] font-black text-[#71717a] uppercase tracking-widest">
                                    // ТЕЛЕМЕТРИЯ_ОТКЛОНЕНИЙ:
                                </span>
                                <div className="max-h-50 overflow-y-auto bg-black border border-[#18181b] p-3.5 text-sm text-[#d4d4d8]">
                                    {telemetryItems.map((item, index) => (
                                        <div key={index} className="flex gap-2.5 py-0.5 px-1 rounded hover:bg-[#2a0808]/40 transition-colors duration-150">
                                            <span className="text-[#7f1d1d] font-black select-none">
                                                [{String(index + 1).padStart(2, '0')}]
                                            </span>
                                            <span className="tracking-[0.025em] font-medium text-[#d4d4d8]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ПОДВАЛ */}
                    <div className="flex justify-between items-center mt-5 pt-3 border-t border-[#18181b] text-[10px] text-[#52525b] font-bold uppercase tracking-widest">
                        <span>STATUS // NAVIGATION_CORE_ISOLATION_ACTIVE</span>
                        <span className="text-[#71717a]">
                            ERR-{code} // ПОЗИЦИЯ: [{location}]
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
}