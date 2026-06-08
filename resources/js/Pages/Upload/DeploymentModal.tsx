import { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import { useForm, usePage } from '@inertiajs/react';
///////////////////////////////////////////////////
import Modal from "@/components/custom/Modal";

interface DeploymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isGlitching, setIsGlitching] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, errors, reset } = useForm<{ uploadedFile: File | null }>({
        uploadedFile: null,
    });

    useEffect(() => {
        let glitchTimer: ReturnType<typeof setTimeout> | undefined = undefined;
        let recoveryTimer: ReturnType<typeof setTimeout> | undefined = undefined;

        const triggerRandomGlitch = () => {
            const nextGlitchDelay = Math.random() * 10000 + 5000;

            glitchTimer = setTimeout(() => {
                setIsGlitching(true);

                recoveryTimer = setTimeout(() => {
                    setIsGlitching(false);
                    triggerRandomGlitch();
                }, 700);

            }, nextGlitchDelay);
        };

        if (isOpen) {
            triggerRandomGlitch();
        } else {
            setIsGlitching(false);
        }

        return () => {
            if (glitchTimer) clearTimeout(glitchTimer);
            if (recoveryTimer) clearTimeout(recoveryTimer);
        };
    }, [isOpen]);

    return (
        <Modal
            show={isOpen}
            onClose={onClose}
            maxWidth="xl"
            closeable={true}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route('upload.post'), {
                        forceFormData: true,
                    })
                }}
                className={`relative block w-full bg-zinc-100 border-2 border-zinc-400 p-6 shadow-2xl clip-corner font-mono text-left z-50 ac-scanline overflow-hidden transition-colors duration-200 ${isGlitching ? "animate-signal-glitch" : ""}`}>

                <div className="absolute inset-0 pointer-events-none overflow-hidden z-40 opacity-20">
                    <div
                        className="w-full h-1 bg-zinc-950/20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        style={{ animation: 'staticScanline 6s linear infinite' }}
                    ></div>
                </div>

                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-500 pointer-events-none z-50"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-zinc-500 pointer-events-none z-50"></div>
                <div className="absolute top-0 left-0 right-0 h-0.75 bg-amber-500/80 pointer-events-none z-50"></div>

                <div className="flex justify-between items-center border-b border-zinc-300 pb-3 mb-6 select-none relative z-50">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-amber-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
                            СИСТ_УЗЕЛ_ВВОДА_01 // {"**"}{selectedFile ? "ГОТОВ" : "ОЖИДАНИЕ_ПАКЕТА"}
                        </span>
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onClose();
                        }}
                        className="text-zinc-500 hover:text-zinc-950 text-xs transition-colors cursor-pointer"
                    >
                        [ ПРЕРВАТЬ_ESC ]
                    </button>
                </div>

                <label
                    htmlFor="fileInput"
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDragOver(false);
                        if (e.dataTransfer.files?.[0]) {
                            setSelectedFile(e.dataTransfer.files[0]);
                            setData('uploadedFile', e.dataTransfer.files[0]);
                            if (fileRef.current) fileRef.current.files = e.dataTransfer.files;
                        }
                    }}
                    className={`border-2 border-dashed pt-10 px-10 pb-7 flex flex-col items-center justify-center text-center transition-all duration-150 clip-corner relative z-50 cursor-pointer ${isDragOver ? "border-amber-500 bg-amber-500/10" : "border-zinc-300 bg-zinc-200/50 hover:border-zinc-400"}`}
                >
                    <input
                        ref={fileRef}
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setSelectedFile(e.target.files[0])
                                setData('uploadedFile', e.target.files[0]);
                            }
                        }}
                    />

                    <div className="absolute top-2 right-2 text-[8px] text-zinc-400 tracking-wider select-none">
                        МАКС_ОБЪЕМ // 64MB
                    </div>

                    <i className={`fa-solid ${selectedFile ? 'fa-file-zipper text-amber-600 animate-bounce' : 'fa-network-wired text-zinc-400'} text-3xl mb-4`}></i>

                    {selectedFile ? (
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-zinc-900 truncate max-w-xs uppercase">[{selectedFile.name}]</p>
                            <p className="text-[10px] text-zinc-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB // СТАТУС: ГОТОВ</p>
                        </div>
                    ) : (
                        <div className="text-xs text-zinc-600 font-bold uppercase tracking-wider max-w-xs leading-relaxed select-none">
                            <ul className="list-none flex flex-col gap-2">
                                <li>[&gt] ПЕРЕТАЩИТЕ ДАННЫЕ В УЗЕЛ</li>
                                <li className="w-full flex justify-center py-1">
                                    <span className="bg-[rgb(75,75,75)] text-white px-3 py-0.5 text-[10px]">ИЛИ НАЖМИТЕ</span>
                                </li>
                                <li className="border-t border-zinc-300 pt-2 mt-1 text-[10px] tracking-[0.2em] text-amber-700">
                                    ФОРМАТЫ: .XLSX | .PDF | .DOCX
                                </li>
                            </ul>
                        </div>
                    )}
                </label>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-300 select-none relative z-50">
                    <span className="text-[9px] text-zinc-400 uppercase tracking-tight">
                        // СТАТУС_МАТРИЦЫ: {selectedFile ? "ГОТОВ" : "ОЖИДАНИЕ_ПАКЕТА"}
                    </span>
                    <div className="flex gap-3">
                        {selectedFile && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    setSelectedFile(null);
                                    setData('uploadedFile', null);
                                    if (fileRef.current) fileRef.current.value = "";
                                }}
                                className="px-4 py-1.5 border border-red-500 bg-red-500/10 text-red-600 text-xs font-bold uppercase hover:bg-red-500 hover:text-white transition-colors clip-corner cursor-pointer"
                            >
                                Сброс
                            </button>
                        )}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onClose()
                            }}
                            className="px-4 py-1.5 border border-zinc-300 bg-zinc-200/60 text-zinc-600 text-xs font-bold uppercase hover:bg-zinc-300 hover:text-zinc-900 transition-colors clip-corner cursor-pointer"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            disabled={!selectedFile}

                            className={`px-5 py-1.5 text-xs font-bold uppercase tracking-widest clip-corner transition-all duration-150 ${selectedFile
                                ? "bg-amber-500 text-zinc-950 hover:bg-amber-600 shadow-xs cursor-pointer border border-amber-600"
                                : "bg-zinc-200 text-zinc-400 cursor-not-allowed border border-zinc-300"
                                }`}
                        >
                            Выполнить инъекцию
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export { DeploymentModal };