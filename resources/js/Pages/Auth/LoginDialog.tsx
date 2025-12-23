import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import TextInput from '@/components/custom/TextInput';
import InputError from '@/components/custom/InputError';
import { Checkbox } from '@/components/ui/checkbox';


export function LoginDialog() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });
    const [loginProps, setLoginProps] = useState<{ status?: string; canResetPassword: boolean; } | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(
            route('login'), {
            onFinish: () => reset('password'),
        }
        );
    };
    return (
        // <div onClick={(e) => e.stopPropagation()}>
        <Dialog>
            <DialogTrigger asChild onClick={async () => {
                const res = await fetch('/login');
                const data = await res.json();
                setLoginProps(data);
            }}>
                <div className="dark:hover:bg-white/20 dark:hover:text-inherit relative flex cursor-default select-none items-center gap-2 px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">Войти</div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-106.25 dark:bg-gray-800 dark:text-white">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Вход</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="email-1">Почта</Label>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password-1">Пароль</Label>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="mt-4 block">
                            <label className="flex items-center">
                                <Checkbox
                                    checked={data.remember}
                                    onCheckedChange={(checked) =>
                                        setData('remember', Boolean(checked))
                                    }
                                />

                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                            {loginProps?.canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <Button type="submit" className="ms-4" disabled={processing} variant="default">
                                Войти
                            </Button>
                        </div>
                        {/* <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save</Button> */}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        // </div>
    )
}
