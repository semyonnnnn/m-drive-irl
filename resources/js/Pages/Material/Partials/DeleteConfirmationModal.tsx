import { useState, useEffect } from "react";
import { useForm } from '@inertiajs/react';
///////////////////////////////////////////////////
import Modal from "@/components/custom/Modal";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm, itemName }) => {
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
        <Modal show={isOpen} onClose={onClose} maxWidth="md" closeable={true}>
            <div className={`relative block w-full bg-zinc-50 border-2 border-red-500 p-6 shadow-2xl font-mono text-left z-50 ac-scanline overflow-hidden transition-colors duration-200 ${isGlitching ? "animate-signal-glitch border-red-600" : ""}`}>

                <div className="absolute inset-0 pointer-events-none overflow-hidden z-40 opacity-10">
                    <div className="w-full h-1 bg-red-950/20" style={{ animation: 'staticScanline 6s linear infinite' }}></div>
                </div>

                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500 pointer-events-none z-50"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500 pointer-events-none z-50"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-red-600/50 pointer-events-none z-50"></div>

                <div className="flex justify-between items-center border-b border-red-200 pb-3 mb-6 select-none relative z-50">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-600 animate-pulse"></div>
                        <span className="text-xs font-black text-red-900 uppercase tracking-widest">
                            УГРОЗА_УДАЛЕНИЯ // КРИТИЧЕСКИЙ_ЗАПРОС
                        </span>
                    </div>
                </div>

                <div className="mb-8 relative z-50">
                    <p className="text-xs font-bold text-zinc-600 uppercase tracking-wide mb-4">
                        Вы собираетесь инициировать процедуру необратимого устранения следующего системного ресурса:
                    </p>
                    <div className="bg-red-50 border border-red-200 p-4 font-black text-red-950 truncate">
                        {`>> [ЦЕЛЬ]: ${itemName}`}
                    </div>
                    <p className="text-[10px] text-red-700 mt-4 uppercase font-bold tracking-tighter">
                        [!] ВНИМАНИЕ: ОТМЕНА ОПЕРАЦИИ ПОСЛЕ ПОДТВЕРЖДЕНИЯ НЕВОЗМОЖНА
                    </p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-red-200 select-none relative z-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-zinc-300 bg-zinc-200 text-zinc-700 text-xs font-bold uppercase hover:bg-zinc-300 transition-all cursor-pointer"
                    >
                        [ ОТМЕНА ]
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-6 py-2 border border-red-600 bg-red-600 text-white text-xs font-black uppercase hover:bg-red-700 transition-all cursor-pointer shadow-[0_0_10px_rgba(220,38,38,0.4)]"
                    >
                        [ УСТРАНИТЬ_ОБЪЕКТ ]
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export { DeleteConfirmationModal };