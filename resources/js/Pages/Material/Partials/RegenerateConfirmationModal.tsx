import React, { useState, useEffect } from "react";
import Modal from "@/components/custom/Modal";

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
                {/* Tech aesthetics */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-red-600 pointer-events-none"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-red-600 pointer-events-none"></div>

                {/* Header Terminal Frame */}
                <div className="flex justify-between items-center border-b border-red-500 pb-2 mb-4">
                    <span className="text-xs font-black text-red-600 tracking-widest uppercase">
                        [ ВНИМАНИЕ // КРИТИЧЕСКАЯ_ПЕРЕЗАПИСЬ ]
                    </span>
                    <span className="text-[9px] text-zinc-500 font-bold bg-zinc-200 border border-zinc-300 px-1.5 py-0.5">
                        WARN.SYS_0X9F
                    </span>
                </div>

                {/* Main Content Info */}
                <div className="space-y-3 mb-6">
                    <div className="text-[11px] font-bold text-zinc-800 uppercase tracking-wide leading-relaxed">
                        Запущена директива полной регенерации. Текущие временные ключи доступа всех незащищенных субъектов будут принудительно аннулированы и перезаписаны в ядре БД.
                    </div>
                    <div className="bg-red-100/60 border border-red-300 p-2.5 text-[9px] text-red-700 font-bold tracking-wide uppercase">
                        // ВНИМАНИЕ: Предыдущие матрицы доступов станут невалидны. Данное действие необратимо.
                    </div>
                </div>

                {/* Toolbar Trigger Execution Footer */}
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

export default RegenerateConfirmationModal;