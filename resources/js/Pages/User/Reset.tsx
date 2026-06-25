import InputError from '@/components/custom/InputError';
import InputLabel from '@/components/custom/InputLabel';
import TextInput from '@/components/custom/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { ShieldAlert, KeyRound, Save, Eye, EyeOff, LogOut } from 'lucide-react';

interface UserResource {
    id: number;
    name: string;
    email: string;
}

export default function Reset({ user }: { user: UserResource }) {
    const [showPassword, setShowPassword] = useState(false);

    // Main config setup for updating the forced key sequence
    const { data, setData, put, processing, errors, reset } = useForm({
        password: '',
        password_confirmation: '',
    });

    // Secondary execution node to clear current user context entirely
    const { post: logoutPost, processing: logoutProcessing } = useForm();

    const handleFormSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handleTerminalExit = (e: React.MouseEvent) => {
        e.preventDefault();
        logoutPost(route('logout'));
    };

    // Aggregate any errors appearing on the schema tracking grid
    const activeError = Object.values(errors)[0];

    return (
        <div className="min-h-screen bg-zinc-100 text-zinc-900 font-mono flex flex-col items-center justify-center overflow-hidden relative select-none p-4">
            <Head title="КРИТИЧЕСКИЙ_СБРОС // SYS_RESET" />

            {/* Background Blueprint Matrix Grid Pattern (Visible everywhere now) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[14px_14px] pointer-events-none z-0"></div>

            {/* Giant Background Watermarks */}
            <div className="absolute top-10 right-[5%] text-9xl font-black text-zinc-900/5 pointer-events-none transform rotate-6 z-0 uppercase select-none">
                пароль
            </div>
            <div className="absolute bottom-10 left-[5%] text-9xl font-black text-zinc-900/5 pointer-events-none transform rotate-6 z-0 uppercase select-none">
                пароль
            </div>

            {/* Tactical Chassis Container Outer Frame - Set to transparent wrapper */}
            <div className="w-full max-w-md p-1 bg-transparent border-none relative z-10">

                {/* Chassis Main Shell Body - Reverted back to exact Upload Panel tone with scanning lines */}
                <div className="relative block w-full bg-zinc-100 border border-zinc-400 p-6 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-zinc-600 pointer-events-none"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-zinc-600 pointer-events-none"></div>

                    {/* Overlays: Ambient CRT Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-40 opacity-[0.15] mix-blend-overlay">
                        <div className="w-full h-0.5 bg-zinc-950" style={{ animation: 'staticScanline 8s linear infinite' }}></div>
                    </div>
                    <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[10px_10px] pointer-events-none z-0"></div>

                    {/* Header Terminal Band */}
                    <div className="flex justify-between items-center border-b border-zinc-950 pb-2.5 mb-5 relative z-10">
                        <div className="flex items-center gap-2.5">
                            <div className={`w-2 h-2 rounded-xs transition-colors duration-300 ${activeError ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : "bg-amber-500 animate-pulse"}`}></div>
                            <span className="text-xs font-black text-zinc-900 uppercase tracking-widest">
                                [ ИНИЦИАЛИЗАЦИЯ_БЕЗОПАСНОСТИ // {activeError ? "СБОЙ_МАТРИЦЫ" : "ПЕРЕЗАПИСЬ_КЛЮЧА"} ]
                            </span>
                        </div>
                        <div className="text-[9px] text-zinc-500 font-bold bg-zinc-200 border border-zinc-300 px-2 py-0.5 tracking-wider">
                            SYS.SEC // RESET_WALL
                        </div>
                    </div>

                    {/* Telemetry Matrix Grid */}
                    <div className="bg-zinc-200 border border-zinc-300 p-3 text-[10px] space-y-1 text-zinc-600 mb-5 relative z-10">
                        <div className="font-bold border-b border-zinc-300 pb-1 mb-1 text-zinc-800 uppercase tracking-wider">// ТЕЛЕМЕТРИЯ_ТЕКУЩЕЙ_СЕССИИ</div>
                        <div className="flex justify-between"><span>СУБЪЕКТ СЕТИ:</span> <span className="font-bold text-zinc-900">{user?.email}</span></div>
                        <div className="flex justify-between"><span>СТАТУС КЛЮЧА:</span> <span className="font-bold text-amber-600 animate-pulse">BP_TEMP_PASSWORD_ACTIVE</span></div>
                        <div className="flex justify-between"><span>ПРАВА ДОСТУПА:</span> <span className="font-bold text-zinc-900">ОГРАНИЧЕНЫ // ТРЕБУЕТСЯ СБРОС</span></div>
                    </div>

                    {/* Live Form Module */}
                    <form onSubmit={handleFormSubmit} className="space-y-5 relative z-10">
                        <div className="space-y-4">

                            {/* New Password Input Node */}
                            <div className="space-y-1.5">
                                <InputLabel
                                    htmlFor="password"
                                    value="[ новый_матричный_пароль ]"
                                    className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1"
                                />
                                <div className="relative group">
                                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                                    <TextInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        className="w-full pl-11 pr-11 py-3.5 bg-zinc-200/60 border border-zinc-300 rounded-none focus:bg-zinc-200 focus:border-zinc-500 transition-all placeholder:text-zinc-400 outline-none text-xs font-bold font-mono tracking-widest text-zinc-800"
                                        placeholder="••••••••"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer p-1"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-1 text-[10px] font-bold uppercase tracking-wider text-red-600" />
                            </div>

                            {/* Password Confirmation Input Node */}
                            <div className="space-y-1.5">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="[ подтверждение_структуры_ключа ]"
                                    className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1"
                                />
                                <div className="relative group">
                                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                                    <TextInput
                                        id="password_confirmation"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="w-full pl-11 pr-4 py-3.5 bg-zinc-200/60 border border-zinc-300 rounded-none focus:bg-zinc-200 focus:border-zinc-500 transition-all placeholder:text-zinc-400 outline-none text-xs font-bold font-mono tracking-widest text-zinc-800"
                                        placeholder="••••••••"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.password_confirmation} className="mt-1 text-[10px] font-bold uppercase tracking-wider text-red-600" />
                            </div>
                        </div>

                        {/* Action Control Module Footer Row */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-zinc-300 items-stretch sm:items-center justify-between">

                            {/* Exit Session Action - Direct POST to route logout */}
                            <button
                                type="button"
                                onClick={handleTerminalExit}
                                disabled={logoutProcessing || processing}
                                className="px-3 py-1.5 border border-red-300 bg-red-100/60 text-red-700 text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all duration-150 cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1.5"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                ПРЕРВАТЬ СЕССИЮ
                            </button>

                            {/* Commit Configurations Target */}
                            <button
                                type="submit"
                                disabled={processing || logoutProcessing}
                                className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border transition-all duration-150 flex items-center justify-center gap-1.5 ${processing
                                    ? "bg-zinc-200 text-zinc-400 border-zinc-300 cursor-not-allowed"
                                    : "bg-amber-500 text-zinc-950 border-amber-600 hover:bg-amber-400 active:scale-[0.99] shadow-sm cursor-pointer"
                                    }`}
                            >
                                <span>{processing ? '[ ПЕРЕЗАПИСЬ... ]' : 'ПРИМЕНИТЬ КОНФИГУРАЦИЮ'}</span>
                                {!processing && <Save className="w-3.5 h-3.5" />}
                            </button>
                        </div>
                    </form>

                    {/* Footer Layout Identification Branding */}
                    <div className="flex items-center justify-center gap-4 pt-4 mt-4 border-t border-zinc-300 relative z-10">
                        <div className="h-px flex-1 bg-zinc-300"></div>
                        <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest whitespace-nowrap">
                            дежурный режим // терминал принудительной конфигурации
                        </span>
                        <div className="h-px flex-1 bg-zinc-300"></div>
                    </div>

                </div>
            </div>
        </div>
    );
}