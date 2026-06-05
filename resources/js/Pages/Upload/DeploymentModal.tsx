import { useState, useEffect } from "react";
import Modal from "@/components/custom/Modal";

interface DeploymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        // Dynamically look up the environment's exact setTimeout return type
        let glitchTimer: ReturnType<typeof setTimeout> | undefined = undefined;
        let recoveryTimer: ReturnType<typeof setTimeout> | undefined = undefined;

        const triggerRandomGlitch = () => {
            const nextGlitchDelay = Math.random() * 4000 + 3000;

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

        // Safely parse variables during cleanup phase
        return () => {
            if (glitchTimer) clearTimeout(glitchTimer);
            if (recoveryTimer) clearTimeout(recoveryTimer);
        };
    }, [isOpen]);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <Modal
            show={isOpen}
            onClose={onClose}
            maxWidth="xl"
            closeable={true}
        >
            {/* ARMORED CHASSIS 
                Dynamically applies .animate-signal-glitch. 
                Uses overflow-hidden so clip-path calculations don't bleed out of bounds.
            */}
            <div className={`relative block w-full bg-zinc-100 border-2 border-zinc-400 p-6 shadow-2xl clip-corner font-mono text-left z-50 ac-scanline overflow-hidden transition-colors duration-200 ${isGlitching ? "animate-signal-glitch" : ""
                }`}>

                {/* Rolling tracking line artifact inside the monitor matrix */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-40 opacity-20">
                    <div
                        className="w-full h-1 bg-zinc-950/20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        style={{ animation: 'staticScanline 6s linear infinite' }}
                    ></div>
                </div>

                {/* Hardware structural brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-500 pointer-events-none z-50"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-zinc-500 pointer-events-none z-50"></div>
                <div className="absolute top-0 left-0 right-0 h-0.75 bg-amber-500/80 pointer-events-none z-50"></div>

                {/* Header Protocol Console */}
                <div className="flex justify-between items-center border-b border-zinc-300 pb-3 mb-6 select-none relative z-50">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-amber-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
                            ПРОТОКОЛ_ЗАГРУЗКИ // ИНИЦИАЛИЗАЦИЯ
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-zinc-500 hover:text-zinc-950 text-xs transition-colors cursor-pointer"
                    >
                        [ ПРЕРВАТЬ_ESC ]
                    </button>
                </div>

                {/* Drop Zone Actuator */}
                <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed p-10 flex flex-col items-center justify-center text-center transition-all duration-150 clip-corner relative z-50 ${isDragOver ? "border-amber-500 bg-amber-500/2" : "border-zinc-300 bg-zinc-200/50"
                        }`}
                >
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
                        <p className="text-xs text-zinc-600 font-bold uppercase tracking-wider max-w-xs leading-relaxed select-none">
                            Перетащите данные или <button className="text-amber-600 underline decoration-amber-500 decoration-2 cursor-pointer hover:text-amber-500">подключите локальный узел</button> (.XLSX, .PDF, .DOCX)
                        </p>
                    )}
                </div>

                {/* Footer Command Section */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-300 select-none relative z-50">
                    <span className="text-[9px] text-zinc-400 uppercase tracking-tight">
                        // СТАТУС_МАТРИЦЫ: ОЖИДАНИЕ_ПАКЕТА
                    </span>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-1.5 border border-zinc-300 bg-zinc-200/60 text-zinc-600 text-xs font-bold uppercase hover:bg-zinc-300 hover:text-zinc-900 transition-colors clip-corner cursor-pointer"
                        >
                            Отмена
                        </button>
                        <button
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
            </div>
        </Modal>
    );
};

export { DeploymentModal };