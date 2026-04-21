import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/custom/InputError';
import InputLabel from '@/components/custom/InputLabel';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/custom/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
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
        <div className="ethereal-bg font-body text-on-surface min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
            <Head title="Log in" />

            {/* Ambient Glow Decorations */}
            <div className="fixed top-1/4 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-1/4 -right-64 w-96 h-96 bg-secondary-container/10 rounded-full blur-[120px] pointer-events-none"></div>

            <main className="relative z-10 w-full max-w-md px-6">
                {/* Brand Header */}
                <div className="mb-12 text-center">
                    <h1 className="font-headline text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary-container bg-clip-text text-transparent">
                        наставничество
                    </h1>
                </div>

                {/* Login Card */}
                <div className="glass-card rounded-[2.5rem] p-10 shadow-[0px_20px_60px_rgba(106,55,212,0.08)] relative overflow-hidden border border-white/20">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>

                    <div className="space-y-8">
                        <div className="space-y-2">
                            <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight">с возвращением</h2>
                            <p className="text-on-surface-variant/80 text-sm leading-relaxed">ваши тесты вас заждались</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-4">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <InputLabel
                                        htmlFor="email"
                                        value="email"
                                        className="font-label text-lg font-bold lowercase tracking-[0.15em] text-primary ml-1"
                                    />
                                    <div className="relative group">
                                        <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50 transition-colors group-focus-within:text-primary" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="w-full pl-12 pr-4 py-4 bg-surface-container-low/50 border-none rounded-2xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/40 outline-none text-sm font-medium"
                                            placeholder="00.фамилияио@rosstat.gov.ru"
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <InputLabel
                                        htmlFor="password"
                                        value="пароль"
                                        className="font-label text-lg font-bold lowercase tracking-[0.15em] text-primary ml-1"
                                    />
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50 transition-colors group-focus-within:text-primary" />

                                        <TextInput
                                            id="password"
                                            // 2. Change type dynamically
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={data.password}
                                            className="w-full pl-12 pr-12 py-4 bg-surface-container-low/50 border-none rounded-2xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/40 outline-none text-sm font-medium"
                                            placeholder="••••••••"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />

                                        {/* 3. Toggle Button */}
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-primary transition-colors cursor-pointer p-1"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5 animate-in fade-in zoom-in duration-200" />
                                            ) : (
                                                <Eye className="w-5 h-5 animate-in fade-in zoom-in duration-200" />
                                            )}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                            </div>



                            <button
                                disabled={processing}
                                className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold text-base rounded-2xl shadow-[0px_10px_20px_rgba(106,55,212,0.2)] hover:shadow-[0px_15px_35px_rgba(106,55,212,0.3)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                            >
                                <span>{processing ? 'Загрузка...' : 'Войти'}</span>
                                {!processing && (
                                    <ArrowRight className="w-5 h-5" />
                                )}
                            </button>
                        </form>

                        <div className="flex items-center justify-center gap-4 pt-4">
                            <div className="h-[1px] flex-1 bg-surface-container-high/50"></div>
                            <span className="font-label text-[9px] text-on-surface-variant/40 font-bold uppercase tracking-[0.2em] whitespace-nowrap">портал `наставничество</span>
                            <div className="h-[1px] flex-1 bg-surface-container-high/50"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}