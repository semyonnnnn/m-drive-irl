import React from 'react';
import { Test } from '@/types';

interface MainTestCardProps {
    test: Test;
    editMode: boolean;
    onDelete: (id: number) => void;
    onStart: (id: number) => void;
    onEdit: (id: number) => void;
}

const MainTestCard: React.FC<MainTestCardProps> = ({ test, editMode, onDelete, onStart, onEdit }) => {
    return (
        <div className="group flex flex-col justify-between bg-zinc-100/80 border-2 border-zinc-300 p-5 clip-corner hover:border-zinc-500 hover:bg-zinc-100 transition-all duration-150 shadow-xs relative">
            <div className="flex justify-between items-center mb-4 pb-[0.1rem] border-b-2 border-zinc-300">
                <span className="text-xs text-zinc-500 font-black tracking-widest uppercase">
                    #ТЕСТ-{test.id.toString().padStart(4, '0')}
                </span>
            </div>

            <div className="mb-6 flex-1 flex flex-col justify-between">
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
                        <span className="text-zinc-500 uppercase block text-[10px] font-black">Создан:</span>
                        <span className="text-zinc-900 text-sm">{test.created_at}</span>
                    </div>
                </div>
            </div>

            {editMode ? (
                <div className="flex gap-3 pt-4 border-t-2 border-zinc-300">
                    <button
                        onClick={() => onEdit(test.id)}
                        className="flex-1 py-3 bg-zinc-200 border-2 border-zinc-500 text-zinc-900 text-xs font-black uppercase tracking-wider hover:bg-zinc-300 cursor-pointer text-center"
                    >
                        [ ПРАВКА ]
                    </button>
                    <button
                        onClick={() => onDelete(test.id)}
                        className="flex-1 py-3 bg-zinc-950 border-2 border-amber-600 text-amber-500 text-xs font-black uppercase tracking-wider hover:bg-amber-600 hover:text-white cursor-pointer text-center"
                    >
                        [ УСТРАНИТЬ ]
                    </button>
                </div>
            ) : (
                <div className="pt-4 border-t-2 border-zinc-300">
                    <button
                        onClick={() => onStart(test.id)}
                        className="w-full block py-3 text-center bg-zinc-950 border-2 border-zinc-800 text-amber-400 text-xs font-black uppercase tracking-widest hover:bg-amber-500 hover:text-zinc-950 hover:border-amber-600 transition-all cursor-pointer clip-corner"
                    >
                        // НАЧАТЬ_ТЕСТИРОВАНИЕ →
                    </button>
                </div>
            )}
        </div>
    );
};

export default MainTestCard;