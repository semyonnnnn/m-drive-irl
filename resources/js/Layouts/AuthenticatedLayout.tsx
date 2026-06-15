import ApplicationLogo from '@/components/custom/ApplicationLogo';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { router, Link, usePage } from '@inertiajs/react';
import ResponsiveNavLink from '@/components/custom/ResponsiveNavLink';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    // @ts-ignore
    const { auth } = usePage().props;
    const user = auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen  bg-[#121110]/70 text-zinc-900 font-mono selection:bg-zinc-900 selection:text-zinc-100">
            {/* TopAppBar - Core Tactical Header Chassis */}
            <header className="fixed top-0 w-full z-40 bg-zinc-50 border-b border-zinc-300 h-20 flex justify-between items-center px-4 sm:px-8 select-none">

                {/* Background Blueprint Matrix Grid Pattern for Top Bar */}
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[14px_14px] pointer-events-none z-0"></div>

                <div className="flex items-center gap-6 relative z-10">
                    {/* Logo Area inside Tactical Frame */}
                    <Link href="/" className="flex items-center gap-2 group p-1 border border-transparent hover:border-zinc-400 clip-corner transition-all">
                        <ApplicationLogo />
                    </Link>

                    {/* Desktop Navigation - System Links */}
                    <nav className="hidden lg:flex items-center gap-1">
                        <Link
                            href={route('upload.index')}
                            className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60 transition-colors clip-corner"
                        >
                            [ тесты ]
                        </Link>
                        <Link
                            href={route('upload.index')}
                            className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60 transition-colors clip-corner"
                        >
                            [ материалы ]
                        </Link>
                        <Link
                            href={route('upload.index')}
                            className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60 transition-colors clip-corner"
                        >
                            [ группа ]
                        </Link>
                    </nav>
                </div>

                {/* Actions & Profile Operative Node */}
                <div className="flex items-center gap-4 relative z-10">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none">
                            {/* User Plate Layout with Black Left Boundary Accent Tag */}
                            <div className="group flex items-center gap-3 p-2 bg-zinc-100 border border-zinc-300 hover:bg-zinc-200/80 hover:border-zinc-400 transition-all duration-150 clip-corner cursor-pointer text-left">
                                {/* Avatar Box - Square Tactical Enclosure */}
                                <div className="w-9 h-9 border border-zinc-400 bg-zinc-300 shrink-0 overflow-hidden clip-corner">
                                    <img
                                        src={"https://lh3.googleusercontent.com/aida-public/AB6AXuCjMtRq3WvjElWL0jcAkICvSx71wBX_Yakrq_-bjnTqpa6M6b0U5WM7Hs4d6F9vdeahqHDkByDO5nEEOeo60Azh_EoYbNTRAyzglFQ9u1pApuQq6Dy9AStG7KzDEzb4TTig15nUmKTv5-esspX2ywN5jlyb1qIkmrf7WDyiumoGIli27aBioLPS5jUy-wCrj9N-nlNbuCqEdDDk-EV54n7OLitel_FQ9reMD-vVnMFpw7ZmhBh72NMJeCzPQmawJTqMiKK1d59Kk1pP"}
                                        alt={user.name}
                                        className="select-none w-full h-full object-cover filter grayscale contrast-125"
                                    />
                                </div>
                                <div className="hidden md:block pr-2 border-l-2 border-l-zinc-400 pl-2">
                                    <p className="text-xs font-bold text-zinc-900 uppercase tracking-wide leading-none mb-1">
                                        {user.name}
                                    </p>
                                    <p className="text-[10px] text-zinc-500 font-bold tracking-widest leading-none uppercase">
                                        [{user.roles?.[0] || 'OPERATOR'}]
                                    </p>
                                </div>
                            </div>
                        </DropdownMenuTrigger>

                        {/* Dropdown Menu - Styled as Terminal Box */}
                        <DropdownMenuContent align="end" className="w-56 mt-2 bg-zinc-50 border border-zinc-400 rounded-none clip-corner p-1 shadow-none font-mono">
                            <DropdownMenuItem
                                // @ts-ignore
                                onClick={() => router.post(route('logout'))}
                                className="w-full text-left text-xs font-bold uppercase tracking-widest text-red-700 hover:bg-red-50 focus:bg-red-50 focus:text-red-800 rounded-none p-2.5 cursor-pointer transition-colors border border-transparent focus:border-red-300"
                            >
                                // СБРОС_СЕССИИ (ВЫЙТИ)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile Menu Toggle - Technical Trigger Node */}
                    <button
                        onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                        className="lg:hidden w-9 h-9 flex items-center justify-center bg-zinc-100 border border-zinc-300 text-zinc-800 font-bold hover:bg-zinc-950 hover:text-zinc-100 transition-colors clip-corner cursor-pointer"
                    >
                        <span className="text-sm font-black">
                            {showingNavigationDropdown ? '[X]' : '[=]'}
                        </span>
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Dropdown Framework */}
            <div className={`lg:hidden fixed top-20 w-full z-30 bg-zinc-50 border-b border-zinc-300 transition-all duration-200 font-mono ${showingNavigationDropdown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <div className="p-4 space-y-2 bg-zinc-100/80">
                    <ResponsiveNavLink href="#" active={false}>// ПРОЕКТ</ResponsiveNavLink>
                    <ResponsiveNavLink href="#" active={false}>// ОБУЧЕНИЕ</ResponsiveNavLink>
                    <ResponsiveNavLink href="#" active={true}>// ГРУППА</ResponsiveNavLink>
                </div>
            </div>

            {/* Page Content Chassis */}
            <main className="pt-28 pb-12 relative z-10">
                {header && (
                    <div className="mx-auto px-4 sm:px-8 mb-6">
                        {/* Dynamic Subheader Module Frame */}
                        <div className="p-4 bg-zinc-50 border border-zinc-300 clip-corner relative overflow-hidden">
                            <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[10px_10px] pointer-events-none"></div>
                            <div className="relative z-10 text-zinc-900 font-bold uppercase tracking-wider text-sm">
                                {header}
                            </div>
                        </div>
                    </div>
                )}

                {/* Core Children Slot Injection */}
                <div className="mx-auto px-4 sm:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}