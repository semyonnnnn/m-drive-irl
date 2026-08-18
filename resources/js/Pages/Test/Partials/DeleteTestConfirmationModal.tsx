import React, { useState, useEffect } from "react";
import Modal from "@/components/custom/Modal";

export interface DeleteTestConfirmationModalProps {
    show?: boolean;
    isOpen?: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
}

const DeleteTestConfirmationModal: React.FC<DeleteTestConfirmationModalProps> = ({
    show,
    isOpen,
    onClose,
    onConfirm,
    itemName = "ВЫБРАННЫЕ ЭЛЕМЕНТЫ",
}) => {
    const modalVisible = show ?? isOpen ?? false;
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

        if (modalVisible) triggerRandomGlitch();
        else setIsGlitching(false);

        return () => {
            clearTimeout(glitchTimer);
            clearTimeout(recoveryTimer);
        };
    }, [modalVisible]);

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal show={modalVisible} onClose={onClose} maxWidth="md" closeable={true}>
            <div
                className={`relative block w-full bg-zinc-50 border-2 border-red-500 p-6 shadow-2xl font-mono text-left z-50 ac-scanline overflow-hidden transition-colors duration-200 ${isGlitching ? "animate-signal-glitch border-red-600" : ""
                    }`}
            >
                {/* SCANLINE OVERLAY */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-40 opacity-10">
                    <div
                        className="w-full h-1 bg-red-950/20"
                        style={{ animation: 'staticScanline 6s linear infinite' }}
                    />
                </div>

                {/* HUD CORNER BRACKETS */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500 pointer-events-none z-50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500 pointer-events-none z-50" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-red-600/50 pointer-events-none z-50" />

                {/* MODAL HEADER */}
                <div className="flex justify-between items-center border-b border-red-200 pb-3 mb-6 select-none relative z-50">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-600 animate-pulse" />
                        <span className="text-xs font-black text-red-900 uppercase tracking-widest">
                            // ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ
                        </span>
                    </div>
                    <span className="text-[10px] text-red-600 font-bold tracking-wider">
                        [ВНИМАНИЕ]
                    </span>
                </div>

                {/* MODAL BODY */}
                <div className="mb-6 relative z-50">
                    <p className="text-xs text-zinc-800 font-bold uppercase tracking-wide mb-2">
                        ВЫ УВЕРЕНЫ, ЧТО ХОТИТЕ УДАЛИТЬ:
                    </p>
                    <div className="p-3 bg-red-950/5 border border-red-300 text-red-900 text-xs font-black clip-corner uppercase tracking-wider break-all">
                        {itemName}
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-3 uppercase tracking-wider">
                        ДАННОЕ ДЕЙСТВИЕ НЕ МОЖЕТ БЫТЬ ОТМЕНЕНО.
                    </p>
                </div>

                {/* MODAL ACTIONS */}
                <div className="flex justify-end gap-3 relative z-50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-zinc-200 border border-zinc-400 text-zinc-800 text-xs font-black uppercase tracking-wider hover:bg-zinc-300 transition-colors clip-corner cursor-pointer"
                    >
                        [ ОТМЕНА ]
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-red-600 border border-red-700 text-white text-xs font-black uppercase tracking-wider hover:bg-red-700 transition-colors clip-corner cursor-pointer shadow-md"
                    >
                        УДАЛИТЬ
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteTestConfirmationModal;