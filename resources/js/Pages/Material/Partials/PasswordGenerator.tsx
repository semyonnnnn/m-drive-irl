import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { useForm } from '@inertiajs/react';
import Modal from "@/components/custom/Modal";

interface GeneratedUser {
    name: string | null;
    email: string;
    temp_password: string;
}

interface FlashProps {
    generated_users?: GeneratedUser[];
    success?: string | null;
    error?: string | null;
    [key: string]: any;
}

// ==========================================
// SUB-COMPONENT: TACTICAL CONFIRMATION OVERLAY
// ==========================================
interface RegenerateConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    processing: boolean;
}

const RegenerateConfirmationModal: React.FC<RegenerateConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    processing
}) => {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        let glitchTimer: ReturnType<typeof setTimeout>;
        let recoveryTimer: ReturnType<typeof setTimeout>;

        const triggerRandomGlitch = () => {
            const nextGlitchDelay = Math.random() * 8000 + 3000;
            glitchTimer = setTimeout(() => {
                setIsGlitching(true);
                recoveryTimer = setTimeout(() => {
                    setIsGlitching(false);
                    triggerRandomGlitch();
                }, 500);
            }, nextGlitchDelay);
        };

        if (isOpen) triggerRandomGlitch();
        else setIsGlitching(false);

        return () => {
            clearTimeout(glitchTimer);
            clearTimeout(recoveryTimer);
        };
    }, [isOpen]);

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="md" closeable={!processing}>
            <div className={`relative block w-full bg-zinc-100 border-2 border-red-500 p-6 font-mono text-left select-none overflow-hidden transition-colors duration-200 ${isGlitching ? "animate-signal-glitch border-amber-600 bg-zinc-200" : ""
                }`}>
                {/* Visual hardware brackets */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-red-600 pointer-events-none"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-red-600 pointer-events-none"></div>

                {/* Header Terminal */}
                <div className="flex justify-between items-center border-b border-red-500 pb-2 mb-4">
                    <span className="text-xs font-black text-red-600 tracking-widest uppercase">
                        [ ВНИМАНИЕ // КРИТИЧЕСКАЯ_ПЕРЕЗАПИСЬ ]
                    </span>
                    <span className="text-[9px] text-zinc-500 font-bold bg-zinc-200 border border-zinc-300 px-1.5 py-0.5">
                        WARN.SYS_0X9F
                    </span>
                </div>

                {/* Warning Telemetry Body */}
                <div className="space-y-3 mb-6">
                    <div className="text-[11px] font-bold text-zinc-800 uppercase tracking-wide leading-relaxed">
                        Запущена директива полной регенерации. Текущие временные ключи доступа всех незащищенных субъектов будут принудительно аннулированы и перезаписаны в ядре БД.
                    </div>
                    <div className="bg-red-100/60 border border-red-300 p-2.5 text-[9px] text-red-700 font-bold tracking-wide uppercase">
                        // ВНИМАНИЕ: Предыдущие матрицы доступов станут невалидны. Данное действие необратимо.
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 border-t border-zinc-300 pt-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={processing}
                        className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider border border-zinc-400 bg-zinc-200 text-zinc-700 hover:bg-zinc-300 active:scale-[0.98] cursor-pointer disabled:opacity-50"
                    >
                        [ отмена ]
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={processing}
                        className="px-4 py-1.5 text-[10px] font-black uppercase tracking-wider border border-red-700 bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] shadow-md cursor-pointer disabled:bg-zinc-400 disabled:border-zinc-500 disabled:cursor-not-allowed"
                    >
                        {processing ? "ПЕРЕЗАПИСЬ..." : "[ ПОДТВЕРДИТЬ ]"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

// ==========================================
// CORE COMPONENT MODULE: PASSWORD GENERATOR
// ==========================================
const PasswordGenerator: React.FC = () => {
    const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [localSuccess, setLocalSuccess] = useState<string | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

    // Initialize Inertia Form handling independently
    const { post, processing, errors: serverErrors, clearErrors } = useForm<{ err_message?: string }>({});

    const handleProcessAndDownload = (endpointRoute: string) => {
        clearErrors();
        setLocalSuccess(null);
        setStatus('PROCESSING');

        post(route(endpointRoute), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const flashBag = page.props.flash as FlashProps;
                const users = flashBag?.generated_users;

                if (flashBag?.success && (!users || users.length === 0)) {
                    setLocalSuccess(flashBag.success);
                    setStatus('SUCCESS');
                    setIsConfirmOpen(false);
                    return;
                }

                if (!users || users.length === 0) {
                    setStatus('ERROR');
                    setIsConfirmOpen(false);
                    return;
                }

                // Compile database stream matrix directly into XLSX layout vectors
                const processedData = users.map(user => ({
                    'ИМЯ': user?.name?.toUpperCase() ?? '',
                    'ПОЧТА': user.email ?? '',
                    'ВРЕМЕННЫЙ ПАРОЛЬ': user.temp_password ?? '',
                }));

                const worksheet = XLSX.utils.json_to_sheet(processedData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'SECURITY_CREDENTIALS');

                worksheet['!cols'] = [{ wch: 12 }, { wch: 35 }, { wch: 30 }, { wch: 25 }];

                const timestamp = new Date().toISOString().slice(0, 10);
                XLSX.writeFile(workbook, `SYS_KEY_INJECT_${timestamp}.xlsx`);

                setLocalSuccess(flashBag?.success || 'МАССИВ УСПЕШНО СГЕНЕРИРОВАН');
                setStatus('SUCCESS');
                setIsConfirmOpen(false);
            },
            onError: () => {
                setStatus('ERROR');
                setIsConfirmOpen(false);
            }
        });
    };

    const activeError = serverErrors.err_message || Object.values(serverErrors)[0];
    const activeSuccess = localSuccess;

    return (
        <div className="w-full max-w-4xl p-1 bg-zinc-300 border border-zinc-400 rounded-xs shadow-[0_10px_30px_rgba(0,0,0,0.15)] relative">
            {/* Outer Technical Frame Corner Decals */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-zinc-600 pointer-events-none"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-zinc-600 pointer-events-none"></div>

            <div className="relative block w-full bg-zinc-100 border border-zinc-400 p-5 font-mono text-left overflow-hidden select-none">

                {/* Internal Scanline & Mesh Overlays */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-40 opacity-[0.15] mix-blend-overlay">
                    <div className="w-full h-0.5 bg-zinc-950" style={{ animation: 'staticScanline 8s linear infinite' }}></div>
                </div>
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[10px_10px] pointer-events-none z-0"></div>

                {/* Tactical Component Header */}
                <div className="flex justify-between items-center border-b border-zinc-950 pb-2.5 mb-5 relative z-10">
                    <div className="flex items-center gap-2.5">
                        <div className={`w-2 h-2 rounded-xs transition-colors duration-300 ${processing ? "bg-amber-500 animate-pulse" :
                            status === 'SUCCESS' || activeSuccess ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" :
                                status === 'ERROR' || activeError ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : "bg-zinc-400"
                            }`}></div>
                        <span className="text-xs font-black text-zinc-900 uppercase tracking-widest">
                            [ МОДУЛЬ_ГЕНЕРАЦИИ_ПАРОЛЕЙ // {processing ? 'ЗАПУСК' : activeError ? 'СБОЙ' : activeSuccess ? 'ГОТОВ' : status} ]
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
                            <div className="flex justify-between">
                                <span>СТАТУС:</span>
                                <span className={`font-bold ${activeError ? 'text-red-600' : activeSuccess ? 'text-emerald-600' : 'text-zinc-900'}`}>
                                    {processing ? 'ЗАПУСК' : activeError ? 'СБОЙ' : activeSuccess ? 'ГОТОВ' : status}
                                </span>
                            </div>
                        </div>

                        {/* Telemetry Output Log */}
                        <div className={`text-[11px] font-bold tracking-wider uppercase ${activeSuccess || status === 'SUCCESS' ? 'text-emerald-600' :
                            activeError || status === 'ERROR' ? 'text-red-600' :
                                processing ? 'text-amber-500 animate-pulse' : 'text-zinc-500'
                            }`}>
                            {processing && '>>> ЗАПРОС К ЯДРУ СИСТЕМЫ...'}
                            {!processing && !activeError && !activeSuccess && status === 'IDLE' && '>>> ОЖИДАНИЕ КОМАНДЫ ДЕЙСТВИЯ'}
                            {!processing && activeSuccess && `>>> ЭКСПОРТ ЗАВЕРШЕН // ${activeSuccess}`}
                            {!processing && activeError && `>>> ОШИБКА СИСТЕМЫ // ${activeError}`}
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

                                <div className="inline-block bg-zinc-200 text-zinc-700 border border-zinc-300 text-[9px] px-2 py-0.5 tracking-wider font-black uppercase">
                                    МОДУЛЬ АВТОМАТИЧЕСКОЙ ИНЪЕКЦИИ
                                </div>

                                <div className="text-[9px] text-zinc-500 font-medium tracking-normal pt-1 normal-case leading-relaxed max-w-sm">
                                    Генерация случайных паролей для всех новых субъектов, добавленных без ключа доступа, с последующей синхронизацией БД и экспортом матрицы в отчет формата .XLSX
                                </div>
                            </div>
                        </div>

                        {/* Inline Error Telemetry output log */}
                        {activeError && (
                            <div className="text-red-700 font-bold text-[9px] mt-2 px-1.5 py-0.5 bg-red-100 border-l-2 border-red-600 uppercase tracking-wide">
                                СБОЙ ПОТОКА ИНЪЕКЦИИ: {activeError}
                            </div>
                        )}

                        {/* Inline Success Telemetry log output banner */}
                        {activeSuccess && (
                            <div className="text-emerald-700 font-bold text-[9px] mt-2 px-1.5 py-0.5 bg-emerald-100 border-l-2 border-emerald-600 uppercase tracking-wide">
                                СИСТЕМА ОБНОВЛЕНА: {activeSuccess}
                            </div>
                        )}
                    </div>
                </div>

                {/* Control Action Toolbar Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-5 pt-3.5 border-t border-zinc-300">
                    <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">
                        // СИНХРОНИЗАЦИЯ: {processing ? "АКТИВНЫЙ ЗАПРОС К ЯДРУ" : "ОЖИДАНИЕ КОМАНДЫ ДЕЙСТВИЯ"}
                    </span>
                    <div className="flex flex-col sm:flex-row gap-2 justify-end">

                        {/* BUTTON 02: Remapped to trigger secure modal sequence */}
                        <button
                            type="button"
                            onClick={() => setIsConfirmOpen(true)}
                            disabled={processing}
                            className={`text-nowrap px-4 py-1.5 text-[10px] font-mono font-black uppercase tracking-[0.15em] border transition-all duration-150 ${processing
                                ? "bg-zinc-200 text-zinc-400 border-zinc-300 cursor-not-allowed"
                                : "bg-zinc-100 text-zinc-800 border-zinc-700 hover:bg-zinc-950 hover:text-zinc-50 hover:border-zinc-950 active:scale-[0.98] shadow-sm cursor-pointer"
                                }`}
                        >
                            [ перегенерировать и скачать ]
                        </button>

                        {/* BUTTON 01: Core Password Stream Generation */}
                        <button
                            type="button"
                            onClick={() => handleProcessAndDownload('passwords.download')}
                            disabled={processing}
                            className={`text-nowrap px-4 py-1.5 text-[10px] font-mono font-black uppercase tracking-[0.15em] border transition-all duration-150 ${processing
                                ? "bg-zinc-200 text-zinc-400 border-zinc-300 cursor-not-allowed"
                                : "bg-amber-500 text-zinc-950 border-amber-700 hover:bg-amber-400 hover:border-amber-600 active:scale-[0.98] shadow-md cursor-pointer"
                                }`}
                        >
                            {processing ? "ОБРАБОТКА ПОТОКА..." : "[ СКАЧАТЬ ]"}
                        </button>

                    </div>
                </div>

            </div>

            {/* Tactical confirmation overlay portal instance */}
            <RegenerateConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={() => handleProcessAndDownload('passwords.regenerate')}
                processing={processing}
            />
        </div>
    );
};

export { PasswordGenerator };