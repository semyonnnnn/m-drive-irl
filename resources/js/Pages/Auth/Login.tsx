import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/custom/InputError';
import InputLabel from '@/components/custom/InputLabel';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/custom/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { AtSign, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string
    canResetPassword: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-zinc-100 text-zinc-900 font-mono flex flex-col items-center justify-center overflow-hidden relative select-none">
            <Head title="Авторизация // SYS_AUTH" />

            {/* Background Blueprint Matrix Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[14px_14px] pointer-events-none z-0"></div>

            {/* Giant Background Watermarks */}
            <div className="absolute top-10 left-[5%] text-9xl font-black text-zinc-900/1 pointer-events-none transform -rotate-6 z-0 uppercase select-none">
                вход
            </div>
            <div className="absolute bottom-10 right-[5%] text-9xl font-black text-zinc-900/1 pointer-events-none transform -rotate-6 z-0 uppercase select-none">
                auth
            </div>

            <main className="relative z-10 w-full max-w-md px-4">
                {/* Brand Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-black text-zinc-900 uppercase tracking-widest">
                        наставничество
                    </h1>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">
                        // тесты и материалы
                    </p>
                </div>

                {/* Login Card - Core Tactical Terminal Chassis */}
                <div className="relative p-8 bg-zinc-50 border border-zinc-300 clip-corner shadow-xs">

                    {/* Inner Content Module */}
                    <div className="space-y-8">
                        <div className="space-y-1 p-3 bg-zinc-100 border border-zinc-300 clip-corner">
                            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider border-l-4 border-l-black pl-2 py-0.5">
                                с возвращением
                            </h2>
                            {/* <p className="text-zinc-500 text-xs uppercase tracking-wide pl-3">
                                [ тесты и материалы ]
                            </p> */}
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-4">
                                {/* Email Field */}
                                <div className="space-y-1.5">
                                    <InputLabel
                                        htmlFor="email"
                                        value="[ email_address ]"
                                        className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1"
                                    />
                                    <div className="relative group">
                                        <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="w-full pl-11 pr-4 py-3.5 bg-zinc-100 border border-zinc-300 rounded-none clip-corner focus:bg-zinc-200/50 focus:border-zinc-500 transition-all placeholder:text-zinc-400 outline-none text-xs font-bold font-mono tracking-wide text-zinc-800"
                                            placeholder="00.фамилияио@rosstat.gov.ru"
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.email} className="mt-1 text-[10px] font-bold uppercase tracking-wider text-red-600" />
                                </div>

                                {/* Password Field */}
                                <div className="space-y-1.5">
                                    <InputLabel
                                        htmlFor="password"
                                        value="[ password_key ]"
                                        className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1"
                                    />
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                                        <TextInput
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={data.password}
                                            className="w-full pl-11 pr-11 py-3.5 bg-zinc-100 border border-zinc-300 rounded-none clip-corner focus:bg-zinc-200/50 focus:border-zinc-500 transition-all placeholder:text-zinc-400 outline-none text-xs font-bold font-mono tracking-widest text-zinc-800"
                                            placeholder="••••••••"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />

                                        {/* Password Toggle Button */}
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer p-1"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} className="mt-1 text-[10px] font-bold uppercase tracking-wider text-red-600" />
                                </div>
                            </div>

                            {/* Submit Tactical Action Node */}
                            <button
                                disabled={processing}
                                className="w-full py-3.5 bg-zinc-950 border border-zinc-900 text-zinc-100 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 hover:text-zinc-950 hover:border-zinc-300 transition-all duration-150 clip-corner shadow-xs flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                            >
                                <span>{processing ? '[ СИНХРОНИЗАЦИЯ... ]' : 'Войти'}</span>
                                {!processing && (
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                )}
                            </button>
                        </form>

                        {/* Footer Matrix Stamp */}
                        <div className="flex items-center justify-center gap-4 pt-2">
                            <div className="h-px flex-1 bg-zinc-300"></div>
                            <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest whitespace-nowrap">
                                портал наставничество
                            </span>
                            <div className="h-px flex-1 bg-zinc-300"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}