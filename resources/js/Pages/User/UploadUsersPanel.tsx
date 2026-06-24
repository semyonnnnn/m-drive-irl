import { useState, useRef } from "react";
import { useForm } from '@inertiajs/react';
import * as XLSX from 'xlsx';

interface ExcelUserData {
    [key: string]: number | string;
}

// Atomic UI descriptor state interface
interface FileSessionState {
    file: File | null;
    error: string | null;
}

const UploadUsersPanel = () => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [parsedData, setParsedData] = useState<ExcelUserData[] | null>(null);
    const [isGlitching, setIsGlitching] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    // 1. SINGLE ATOMIC STATE FOR FILE TRACKING
    const [fileSession, setFileSession] = useState<FileSessionState>({
        file: null,
        error: null
    });

    // 2. INERTIA FORM: Keeps one single property for pure JSON transmission
    const { data, setData, post, reset, errors: serverErrors, clearErrors } = useForm<{
        payloadData: string;
    }>({
        payloadData: '',
    });

    const processExcelFile = (file: File) => {
        clearErrors();

        // EXTENSION GUARD MATRIX: Allow xlsx, xls, csv, txt
        if (!file.name.match(/\.(xlsx|xls|csv|txt)$/i)) {
            setFileSession({
                file: null,
                error: 'ОШИБКА ФОРМАТА: Допустимы только .XLSX, .XLS, .CSV, .TXT'
            });
            setParsedData(null);
            return;
        }

        setFileSession({ file, error: null });

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const dataBuffer = e.target?.result;
                // SheetJS handles binary data string input for all selected formats
                const workbook = XLSX.read(dataBuffer, { type: 'binary' });

                const firstSheetName = workbook.SheetNames[0];
                if (!firstSheetName) {
                    throw new Error("EMPTY_MATRIX_STRUCTURE");
                }

                const worksheet = workbook.Sheets[firstSheetName];

                // For CSV and plain text formats, SheetJS raw configuration avoids structural breakdown
                const jsonRows: ExcelUserData[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

                if (jsonRows.length === 0) {
                    throw new Error("NO_DATA_ROWS");
                }

                setParsedData(jsonRows);
                setData('payloadData', JSON.stringify(jsonRows));
            } catch (err) {
                setFileSession({
                    file: null,
                    error: 'СБОЙ СТРУКТУРЫ: Ошибка парсинга внутренней матрицы данных'
                });
                setParsedData(null);
                console.error(err);
            }
        };

        reader.readAsBinaryString(file);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!parsedData || parsedData.length === 0) {
            setFileSession(prev => ({ ...prev, error: 'ОШИБКА АГРЕГАЦИИ: Массив пуст или не инициализирован' }));
            return;
        }

        post(route('user.upload'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setFileSession({ file: null, error: null });
                setParsedData(null);
                if (fileRef.current) {
                    fileRef.current.value = "";
                }
                setTimeout(() => {
                    const telemetryElement = document.getElementById('ErrorTelemetry');

                    if (telemetryElement) {
                        telemetryElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 0);
            },
        });
    };

    const clearSelectedFile = (e: React.MouseEvent) => {
        e.preventDefault();
        setFileSession({ file: null, error: null });
        setParsedData(null);
        reset();
        clearErrors();
        if (fileRef.current) fileRef.current.value = "";
    };

    // Combine local validation errors or any Laravel framework response errors seamlessly
    const activeError = fileSession.error || Object.values(serverErrors)[0];

    return (
        <div className="w-full max-w-4xl p-1 bg-zinc-300 border border-zinc-400 rounded-xs shadow-[0_10px_30px_rgba(0,0,0,0.15)] relative">
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-zinc-600 pointer-events-none"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-zinc-600 pointer-events-none"></div>

            <form
                onSubmit={handleFormSubmit}
                className="relative block w-full bg-zinc-100 border border-zinc-400 p-5 font-mono text-left overflow-hidden transition-all duration-200 select-none"
            >
                {/* Overlays */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-40 opacity-[0.15] mix-blend-overlay">
                    <div className="w-full h-0.5 bg-zinc-950" style={{ animation: 'staticScanline 8s linear infinite' }}></div>
                </div>
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[10px_10px] pointer-events-none z-0"></div>

                {/* Header */}
                <div className="flex justify-between items-center border-b border-zinc-950 pb-2.5 mb-5 relative z-10">
                    <div className="flex items-center gap-2.5">
                        <div className={`w-2 h-2 rounded-xs transition-colors duration-300 ${fileSession.file && !activeError ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-amber-500 animate-pulse"}`}></div>
                        <span className="text-xs font-black text-zinc-900 uppercase tracking-widest">
                            [ МОДУЛЬ_ЗАГРУЗКИ_РЕЕСТРА // {fileSession.file && !activeError ? "МАССИВ_ГОТОВ" : "ОЖИДАНИЕ_ПАКЕТА"} ]
                        </span>
                    </div>
                    <div className="text-[9px] text-zinc-500 font-bold bg-zinc-200 border border-zinc-300 px-2 py-0.5 tracking-wider">
                        SYS.LOC // UPLOAD_PANEL_01
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 items-start">
                    {/* Left Column */}
                    <div className="md:col-span-1 flex flex-col gap-4">
                        <div className="bg-zinc-200/50 border border-zinc-300 p-2 text-[10px] space-y-1 text-zinc-600">
                            <div className="font-bold border-b border-zinc-300 pb-1 mb-1 text-zinc-800 uppercase tracking-wider">// ТЕЛЕМЕТРИЯ_СТАТУСА</div>
                            <div className="flex justify-between"><span>МАТРИЦА:</span> <span className="font-bold text-zinc-900">{parsedData ? "PARSED_OK" : "READY"}</span></div>
                            <div className="flex justify-between"><span>СУБЪЕКТЫ:</span> <span className="font-bold text-zinc-900">{parsedData ? parsedData.length : "0"} UNIT</span></div>
                            <div className="flex justify-between"><span>АЛГОРИТМ:</span> <span className="font-bold text-zinc-900">CLIENT_PARSE_INJECT</span></div>
                        </div>
                        <div className={`${fileSession.file && !activeError ? 'text-green-500' : 'text-amber-500'} text-xs font-bold`}>
                            &gt;&gt;&gt; {fileSession.file && !activeError ? "МАССИВ_ИЗВЛЕЧЁН" : "ОЖИДАНИЕ_ПАКЕТА"}
                        </div>
                    </div>

                    {/* Right Column Drop Zone */}
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">
                            // Пакет_Исходных_Данных
                        </label>
                        <label
                            htmlFor="fileInput"
                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsDragOver(false);
                                if (e.dataTransfer.files?.[0]) {
                                    processExcelFile(e.dataTransfer.files[0]);
                                    if (fileRef.current) fileRef.current.files = e.dataTransfer.files;
                                }
                            }}
                            className={`border border-dashed p-6 min-h-28.75 flex flex-col items-center justify-center text-center transition-all duration-150 relative cursor-pointer ${isDragOver
                                ? "border-amber-500 bg-amber-500/5 shadow-[inset_0_0_15px_rgba(245,158,11,0.05)]"
                                : "border-zinc-300 bg-zinc-200/40 hover:border-zinc-400 hover:bg-zinc-200/70"
                                } ${activeError ? "border-red-400 bg-red-50" : ""}`}
                        >
                            <input
                                ref={fileRef}
                                type="file"
                                id="fileInput"
                                className="hidden"
                                accept=".xlsx,.xls,.csv,.txt"
                                onChange={(e) => {
                                    console.log('tried to upload');
                                    if (e.target.files?.[0]) {
                                        processExcelFile(e.target.files[0]);
                                    }
                                }}
                            />

                            {fileSession.file && !activeError ? (
                                <div className="w-full flex flex-col items-center gap-1">
                                    <div className="w-fit px-1 h-7 flex items-center justify-center bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-bold">
                                        МАССИВ_ИЗВЛЕЧЁН
                                    </div>
                                    <p className="text-xs font-black text-zinc-800 truncate max-w-sm uppercase tracking-wide">
                                        [{fileSession.file.name}]
                                    </p>
                                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-tight">
                                        {parsedData ? `${parsedData.length} СТРОК(И)` : "ВЕРИФИКАЦИЯ..."} // СТАТУС: АГРЕГИРОВАН
                                    </p>
                                </div>
                            ) : (
                                <div className="text-xs text-zinc-600 font-bold uppercase tracking-wider space-y-1.5 pointer-events-none">
                                    <div className="text-zinc-400 text-[10px]">// ПЕРЕТАЩИТЕ ЦЕЛЕВОЙ ФАЙЛ СЮДА</div>
                                    <div className="inline-block bg-zinc-800 text-zinc-100 text-[9px] px-2 py-0.5 tracking-widest font-black">
                                        ИЛИ НАЖМИТЕ ДЛЯ ОБЗОРНОГО ПОИСКА
                                    </div>
                                    <div className="text-[9px] text-amber-700/80 font-medium tracking-normal pt-1">
                                        ДОПУСТИМЫЕ ФОРМАТЫ: .XLSX, .XLS, .CSV, .TXT
                                    </div>
                                </div>
                            )}
                        </label>
                        {activeError && (
                            <div className="text-red-700 font-bold text-[9px] mt-1 px-1.5 py-0.5 bg-red-100 border-l-2 border-red-600 uppercase tracking-wide">
                                {activeError}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-5 pt-3.5 border-t border-zinc-300">
                    <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">
                        // СИНХРОНИЗАЦИЯ: {fileSession.file && !activeError ? "ГОТОВА К ИНЪЕКЦИИ" : "ОЖИДАНИЕ СИСТЕМНОГО ПАКЕТА"}
                    </span>
                    <div className="flex gap-2 justify-end">
                        {fileSession.file && !activeError && (
                            <button
                                type="button"
                                onClick={clearSelectedFile}
                                className="px-3 py-1.5 border border-red-300 bg-red-100/60 text-red-700 text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-colors duration-150 cursor-pointer"
                            >
                                СБРОСИТЬ ПАКЕТ
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={!fileSession.file || !parsedData || !!activeError}
                            className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] border transition-all duration-150 ${fileSession.file && !activeError && parsedData
                                ? "bg-amber-500 text-zinc-950 border-amber-600 hover:bg-amber-400 active:scale-[0.99] shadow-sm cursor-pointer"
                                : "bg-zinc-200 text-zinc-400 border-zinc-300 cursor-not-allowed"
                                }`}
                        >
                            ВЫПОЛНИТЬ ИНЪЕКЦИЮ ДАННЫХ
                        </button>
                    </div>
                </div>
            </form >
        </div >
    );
};

export { UploadUsersPanel };