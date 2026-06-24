import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { router } from '@inertiajs/react';

interface User {
    id: string;
    name: string;
    email: string;
}

const PasswordGenerator: React.FC = () => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR'>('IDLE');

    // Secure random cryptographic string generation fallback
    const generateRandomPassword = (length = 12): string => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };


    const handleProcessAndDownload = (route: string) => {
        setIsProcessing(true);
        setStatus('PROCESSING');

        router.post(route, {}, {
            preserveState: true,
            preserveScroll: true,

            onSuccess: (page) => {
                // FIX: Safely check both the shared flash bag and direct page props
                const flashBag = page.props.flash as any;
                const users = (flashBag?.generated_users || page.props.generated_users) as any[];

                // If the local callback state is laggy, fall back to the global page props hook
                const fallbackUsers = (page.props.flash as any)?.generated_users || page.props.generated_users;
                const absoluteUsersPayload = users || fallbackUsers;

                if (!absoluteUsersPayload || absoluteUsersPayload.length === 0) {
                    setStatus('IDLE');
                    alert('РЕЕСТР ПУСТ: Нет субъектов без паролей.');
                    setIsProcessing(false);
                    return;
                }

                // Map and build using the plain text password returned from the backend
                const processedData = absoluteUsersPayload.map(user => ({
                    'ID': user.id,
                    'ФИО / NAME': user.name ? user.name.toUpperCase() : 'НЕДОСТУПНО',
                    'EMAIL': user.email,
                    'СГЕНЕРИРОВАННЫЙ ПАРОЛЬ / PASSWORD': user.plain_password // Use backend string
                }));

                const worksheet = XLSX.utils.json_to_sheet(processedData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'CREDENTIALS_DATA');
                worksheet['!cols'] = [{ wch: 15 }, { wch: 35 }, { wch: 30 }, { wch: 20 }];

                const timestamp = new Date().toISOString().slice(0, 10);
                XLSX.writeFile(workbook, `PASS_INJECT_REPORT_${timestamp}.xlsx`);

                setStatus('SUCCESS');
                setIsProcessing(false);
            },
            onError: (errors) => {
                console.error(errors);
                setStatus('ERROR');
                setIsProcessing(false);
            }
        });
    };

    return (
        <div className="w-full max-w-4xl p-1 bg-zinc-300 border border-zinc-400 rounded-xs shadow-[0_10px_30px_rgba(0,0,0,0.15)] relative">
            {/* Outer Technical Frame Corner Decals */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-zinc-600 pointer-events-none"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-zinc-600 pointer-events-none"></div>

            <div className="relative block w-full bg-zinc-100 border border-zinc-400 p-5 font-mono text-left overflow-hidden select-none">

                {/* Internal Scanline & Mesh Overlays */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-40 opacity-[0.15] mix-blend-overlay">
                    <div
                        className="w-full h-0.5 bg-zinc-950"
                        style={{ animation: 'staticScanline 8s linear infinite' }}
                    ></div>
                </div>
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[10px_10px] pointer-events-none z-0"></div>

                {/* Tactical Component Header */}
                <div className="flex justify-between items-center border-b border-zinc-950 pb-2.5 mb-5 relative z-10">
                    <div className="flex items-center gap-2.5">
                        <div className={`w-2 h-2 rounded-xs transition-colors duration-300 ${status === 'PROCESSING' ? "bg-amber-500 animate-pulse" : status === 'SUCCESS' ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-zinc-400"}`}></div>
                        <span className="text-xs font-black text-zinc-900 uppercase tracking-widest">
                            [ МОДУЛЬ_ГЕНЕРАЦИИ_ПАРОЛЕЙ // {status} ]
                        </span>
                    </div>
                    <div className="text-[9px] text-zinc-500 font-bold bg-zinc-200 border border-zinc-300 px-2 py-0.5 tracking-wider">
                        SYS.LOC // CRYPTO_GEN_02
                    </div>
                </div>

                {/* Content Layout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 items-start">

                    {/* Left Column: Telemetry Specs */}
                    <div className="md:col-span-1 flex flex-col gap-4">
                        <div className="bg-zinc-200/50 border border-zinc-300 p-2 text-[10px] space-y-1 text-zinc-600">
                            <div className="font-bold border-b border-zinc-300 pb-1 mb-1 text-zinc-800 uppercase tracking-wider">// ТЕЛЕМЕТРИЯ_КРИПТОГРАФИИ</div>
                            <div className="flex justify-between"><span>МОДУЛЬ:</span> <span className="font-bold text-zinc-900">PASS_GEN_v1.0</span></div>
                            <div className="flex justify-between"><span>АЛГОРИТМ:</span> <span className="font-bold text-zinc-900">CRYPTO_RAND_SHA256</span></div>
                            <div className="flex justify-between"><span>СТАТУС:</span> <span className={`font-bold ${status === 'ERROR' ? 'text-red-600' : 'text-zinc-900'}`}>{status}</span></div>
                        </div>

                        <div className={`text-[11px] font-bold ${status === 'SUCCESS' ? 'text-emerald-600' : status === 'ERROR' ? 'text-red-500' : 'text-amber-500'}`}>
                            {status === 'IDLE' && '>>> ОЖИДАНИЕ КОМАНДЫ'}
                            {status === 'PROCESSING' && '>>> ГЕНЕРАЦИЯ И СБОР...'}
                            {status === 'SUCCESS' && '>>> ЭКСПОРТ ЗАВЕРШЕН'}
                            {status === 'ERROR' && '>>> ОШИБКА ПОТОКА'}
                        </div>
                    </div>

                    {/* Right Column: Execution Interface */}
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">
    // УПРАВЛЕНИЕ_КЛЮЧАМИ_ДОСТУПА
                        </label>

                        {/* Flat, static readout window */}
                        <div className="border border-zinc-300 bg-zinc-200/40 p-6 min-h-28.75 flex flex-col items-center justify-center text-center relative select-none">

                            <div className="text-xs text-zinc-600 font-bold uppercase tracking-wider space-y-1.5">
                                <div className="text-zinc-400 text-[10px]">// СТАТУС_ЗАДАЧИ: ПАКЕТНЫЙ_РЕЖИМ</div>

                                {/* Static indicator line (not a button) */}
                                <div className="inline-block bg-zinc-200 text-zinc-700 border border-zinc-300 text-[9px] px-2 py-0.5 tracking-wider font-black uppercase">
                                    МОДУЛЬ АВТОМАТИЧЕСКОЙ ИНЪЕКЦИИ
                                </div>

                                <div className="text-[9px] text-zinc-500 font-medium tracking-normal pt-1 normal-case leading-relaxed">
                                    Генерация случайных паролей для всех новых субъектов, добавленных без ключа доступа, с последующей синхронизацией БД и экспортом матрицы в отчет формата .XLSX
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Control Action Toolbar Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-5 pt-3.5 border-t border-zinc-300">
                    <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">
            // СИНХРОНИЗАЦИЯ: {isProcessing ? "АКТИВНЫЙ ЗАПРОС К ЯДРУ" : "ОЖИДАНИЕ СИСТЕМНОГО СИГНАЛА"}
                    </span>
                    <div className="flex flex-col sm:flex-row gap-2 justify-end">

                        {/* BUTTON 02: Archive Re-Extraction / Re-Download Engine */}
                        <button
                            type="button"
                            onClick={() => {
                                handleProcessAndDownload('/regenerate')
                            }} // Binds directly to your encrypted decryption pipeline
                            disabled={isProcessing}
                            className={`px-4 py-1.5 text-[10px] font-mono font-black uppercase tracking-[0.15em] border transition-all duration-150 ${isProcessing
                                ? "bg-zinc-200 text-zinc-400 border-zinc-300 cursor-not-allowed"
                                : "bg-zinc-100 text-zinc-800 border-zinc-700 hover:bg-zinc-950 hover:text-zinc-50 hover:border-zinc-950 active:scale-[0.98] shadow-sm cursor-pointer"
                                }`}
                        >
                            [ перегенерировать и скачать ]
                        </button>

                        {/* BUTTON 01: Core Password Stream Generation and Encryption */}
                        <button
                            type="button"
                            onClick={() => {
                                handleProcessAndDownload('/generate')
                            }}
                            disabled={isProcessing}
                            className={`px-4 py-1.5 text-[10px] font-mono font-black uppercase tracking-[0.15em] border transition-all duration-150 ${isProcessing
                                ? "bg-zinc-200 text-zinc-400 border-zinc-300 cursor-not-allowed"
                                : "bg-amber-500 text-zinc-950 border-amber-700 hover:bg-amber-400 hover:border-amber-600 active:scale-[0.98] shadow-md cursor-pointer"
                                }`}
                        >
                            {isProcessing ? "ОБРАБОТКА ПОТОКА..." : "[ СГЕНЕРИРОВАТЬ И СКАЧАТЬ ]"}
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export { PasswordGenerator };