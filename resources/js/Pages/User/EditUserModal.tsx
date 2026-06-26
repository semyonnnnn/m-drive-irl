import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/components/custom/Modal";

interface Role {
    id: number;
    name: string;
}

interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        id: number;
        name: string;
        email: string;
        roles?: Role[];
    };
    roles: Role[];
    roleLabels: Record<string, string>;
    relatedUsers?: any[];
    ours?: any[];
}

const EditUserModal: React.FC<EditUserModalProps> = ({
    isOpen,
    onClose,
    user,
    roles,
    roleLabels,
    relatedUsers = [],
    ours = [],
}) => {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name ?? "",
        email: user.email ?? "",
        role: user.roles?.[0]?.name ?? "",
    });

    useEffect(() => {
        setData({
            name: user.name ?? "",
            email: user.email ?? "",
            role: user.roles?.[0]?.name ?? "",
        });
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("user.update", user.id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Modal show={isOpen} onClose={onClose} closeable={!processing} maxWidth="3xl">
            <form
                onSubmit={handleSubmit}
                className="relative block w-full bg-zinc-100 border-2 border-zinc-400 p-6 shadow-2xl clip-corner font-mono text-left z-50 ac-scanline overflow-hidden text-zinc-800"
            >
                {/* Элементы статического шума и сетки терминала */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-40 opacity-20">
                    <div
                        className="w-full h-1 bg-zinc-950/20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        style={{ animation: 'staticScanline 8s linear infinite' }}
                    ></div>
                </div>

                {/* Угловые тактические маркеры */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-500 pointer-events-none z-50"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-zinc-500 pointer-events-none z-50"></div>
                <div className="absolute top-0 left-0 right-0 h-0.75 bg-amber-500/80 pointer-events-none z-50"></div>

                {/* Хедер телеметрии */}
                <div className="flex justify-between items-center border-b border-zinc-300 pb-3 mb-6 select-none relative z-50">
                    <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${processing ? "bg-red-500" : "bg-amber-500"}`}></div>
                        <span className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
                            МАТРИЦА_КОНФИГУРАЦИИ // SYS_ID.{user.id}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={processing}
                        className="text-zinc-500 hover:text-zinc-950 text-xs transition-colors cursor-pointer"
                    >
                        [ ПРЕРВАТЬ_ESC ]
                    </button>
                </div>

                {/* Основной двухколоночный грид */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-50 mb-6">

                    {/* Левая секция: Ввод параметров */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Идентификатор Субъекта */}
                        <div>
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                                // НАИМЕНОВАНИЕ_СУБЪЕКТА_ИДЕНТИФИКАТОР
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                disabled={processing}
                                className={`w-full bg-zinc-200 border border-zinc-400 p-2.5 text-sm font-mono text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors clip-corner disabled:bg-zinc-200/50 disabled:text-zinc-400 ${errors.name && "border-red-500!"}`}
                                placeholder="ВВЕДИТЕ_ИМЯ..."
                            />
                            {errors.name && (
                                <div className="text-red-900 text-xs mt-2 bg-red-500/10 p-1 border-l border-red-500 uppercase tracking-tight text-[10px]">
                                    &gt;&gt; ОШИБКА_ВАЛИДАЦИИ: {errors.name}
                                </div>
                            )}
                        </div>

                        {/* Канал Связи */}
                        <div>
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                                // КАНАЛ_СВЯЗИ_МАТРИЦЫ_АДРЕС_ПОЧТЫ
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                disabled={processing}
                                className={`w-full bg-zinc-200 border border-zinc-400 p-2.5 text-sm font-mono text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors clip-corner disabled:bg-zinc-200/50 disabled:text-zinc-400 ${errors.email && "border-red-500!"}`}
                                placeholder="ВВЕДИТЕ_EMAIL..."
                            />
                            {errors.email && (
                                <div className="text-red-900 text-xs mt-2 bg-red-500/10 p-1 border-l border-red-500 uppercase tracking-tight text-[10px]">
                                    &gt;&gt; ОШИБКА_ВАЛИДАЦИИ: {errors.email}
                                </div>
                            )}
                        </div>

                        {/* Инъекция Роли */}
                        <div>
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                                // ИНЪЕКЦИЯ_УРОВНЯ_ДОСТУПА_РОЛЬ
                            </label>
                            <div className="relative">
                                <select
                                    value={data.role}
                                    onChange={(e) => setData("role", e.target.value)}
                                    disabled={processing}
                                    className={`w-full bg-zinc-200 border border-zinc-400 p-2.5 text-sm font-mono text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors clip-corner disabled:bg-zinc-200/50 disabled:text-zinc-400 appearance-none ${errors.role && "border-red-500!"}`}
                                >
                                    <option value="" className="bg-zinc-100 text-zinc-500">{user.roles[0] ?? '---'}</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.name} className="bg-zinc-100 text-zinc-900">
                                            {roleLabels[role.name]?.toUpperCase() || role.name.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.role && (
                                <div className="text-red-900 text-xs mt-2 bg-red-500/10 p-1 border-l border-red-500 uppercase tracking-tight text-[10px]">
                                    &gt;&gt; ОШИБКА_ВАЛИДАЦИИ: {errors.role}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Правая секция: Аналитика структуры связанных узлов */}
                    <div className="lg:col-span-1 bg-zinc-200/50 border border-zinc-300 p-4 flex flex-col justify-between clip-corner">
                        <div className="space-y-4">
                            {/* Связанные узлы */}
                            <div>
                                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-300 pb-1.5 mb-2 flex justify-between items-center">
                                    <span>// СВЯЗАННЫЕ_УЗЛЫ</span>
                                    <span className="text-amber-600">[{relatedUsers.length}]</span>
                                </div>
                                {relatedUsers.length > 0 ? (
                                    <div className="max-h-24 overflow-y-auto space-y-1 text-[10px] text-zinc-600 scrollbar-thin scrollbar-thumb-zinc-300 pr-1">
                                        {relatedUsers.map((rel: any, idx: number) => (
                                            <div key={idx} className="truncate bg-zinc-100/60 p-1.5 border border-zinc-300 hover:border-zinc-400 text-zinc-700">
                                                &gt; {rel.name ?? rel.email}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest p-2 bg-zinc-100/40 border border-zinc-300/40 text-center">
                                        СВЯЗИ_ОТСУТСТВУЮТ
                                    </div>
                                )}
                            </div>

                            {/* Базовые матрицы */}
                            <div>
                                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-300 pb-1.5 mb-2 flex justify-between items-center">
                                    <span>// БАЗОВЫЕ_МАТРИЦЫ</span>
                                    <span className="text-amber-600">[{ours.length}]</span>
                                </div>
                                {ours.length > 0 ? (
                                    <div className="max-h-24 overflow-y-auto space-y-1 text-[10px] text-zinc-600 scrollbar-thin scrollbar-thumb-zinc-300 pr-1">
                                        {ours.map((item: any, idx: number) => (
                                            <div key={idx} className="truncate bg-zinc-100/60 p-1.5 border border-zinc-300 hover:border-zinc-400 text-zinc-700">
                                                # {item.title ?? `MATRIX_BLOCK_${idx}`}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest p-2 bg-zinc-100/40 border border-zinc-300/40 text-center">
                                        СТРУКТУРА_ПУСТА
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Техническая системная сводка */}
                        <div className="mt-4 pt-3 border-t border-zinc-300 hidden lg:block text-[8px] text-zinc-500 space-y-0.5 uppercase tracking-tight">
                            <div>MEM_ALLOC // 0x4F3A_889F</div>
                            <div>KERNEL_LINK // ACTIVE</div>
                            <div className="text-zinc-600">SYS_OVERLAY // LOADED</div>
                        </div>
                    </div>
                </div>

                {/* Нижняя операционная панель управления */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-zinc-300 pt-4 gap-4 relative z-10 select-none">
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                        // ПОДТВЕРЖДЕНИЕ_ОПЕРАЦИИ_ИЗМЕНЕНИЯ_ЯДРА
                    </span>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={processing}
                            className="w-full sm:w-auto px-4 py-1.5 border border-zinc-300 bg-zinc-200/60 text-zinc-600 text-xs font-bold uppercase hover:bg-zinc-300 hover:text-zinc-900 transition-colors clip-corner cursor-pointer disabled:opacity-40"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className={`px-5 py-1.5 text-xs font-bold uppercase tracking-widest clip-corner transition-all duration-150 border ${processing
                                ? "bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed"
                                : "bg-amber-500 text-zinc-950 border-amber-600 hover:bg-amber-600 shadow-xs cursor-pointer"
                                }`}
                        >
                            {processing ? "ЗАПИСЬ..." : "Зафиксировать изменения"}
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export { EditUserModal };