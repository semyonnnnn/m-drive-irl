import ApplicationLogo from '@/components/custom/ApplicationLogo';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { router, Link, usePage } from '@inertiajs/react';
import NavLink from '@/components/custom/NavLink';
import ResponsiveNavLink from '@/components/custom/ResponsiveNavLink';
import { PropsWithChildren, ReactNode, useState } from 'react';
// import { ToggleDarkMode } from '@/components/custom/ToggleDarkMode';

export default function Authenticated({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-[#f5f7f9] dark:bg-slate-950 font-body">
            {/* TopAppBar - Integrated Ethereal Design */}
            <header className="fixed top-0 w-full z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl flex justify-between items-center px-4 sm:px-8 h-20 shadow-[0px_20px_40px_rgba(106,55,212,0.06)] border-b border-white/20">

                <div className="flex items-center gap-4 sm:gap-8">
                    {/* Logo Area */}
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <ApplicationLogo />

                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-2">
                        <UnderLink href="#" active={false}>тесты</UnderLink>
                        <UnderLink href="#" active={false}>материалы</UnderLink>
                        <UnderLink href="#" active={false}>группа</UnderLink>
                    </nav>
                </div>

                {/* Actions & Profile */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="hidden sm:flex items-center gap-2">
                        {/* <ToggleDarkMode /> */}
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none">
                            <div className="group flex items-center gap-4 p-1 rounded-tl-4xl rounded-bl-4xl rounded-tr-md rounded-br-md   hover:bg-primary cursor-pointer pr-8 transition-colors border border-transparent hover:border-white/40">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container shadow-sm">
                                    <img
                                        src={"https://lh3.googleusercontent.com/aida-public/AB6AXuCjMtRq3WvjElWL0jcAkICvSx71wBX_Yakrq_-bjnTqpa6M6b0U5WM7Hs4d6F9vdeahqHDkByDO5nEEOeo60Azh_EoYbNTRAyzglFQ9u1pApuQq6Dy9AStG7KzDEzb4TTig15nUmKTv5-esspX2ywN5jlyb1qIkmrf7WDyiumoGIli27aBioLPS5jUy-wCrj9N-nlNbuCqEdDDk-EV54n7OLitel_FQ9reMD-vVnMFpw7ZmhBh72NMJeCzPQmawJTqMiKK1d59Kk1pP"}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="group-hover:text-white text-xs font-black font-headline capitalize tracking-tighter text-on-surface leading-none mb-1">
                                        {user.name}
                                    </p>
                                    <p className="group-hover:text-yellow-400 text-[0.875rem] font-bold text-slate-400 lowercase tracking-widest leading-none">
                                        {user.roles[0]}
                                    </p>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 mt-4 rounded-2xl border-white/20 shadow-2xl">
                            <DropdownMenuItem
                                onClick={() => router.post(route('logout'))}
                                className="font-headline hover:bg-primary bg-white hover:text-white rounded-xl font-bold text-md lowercase p-3 cursor-pointer text-error"
                            >
                                Выйти
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile Menu Toggle */}
                    {/* <button
                        onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                        className="lg:hidden p-2 text-slate-500"
                    >
                        <span className="material-symbols-outlined">
                            {showingNavigationDropdown ? 'close' : 'menu'}
                        </span>
                    </button> */}
                </div>
            </header>

            {/* Mobile Navigation Dropdown */}
            <div className={`lg:hidden fixed top-20 w-full z-30 bg-white/90 backdrop-blur-xl transition-all duration-300 border-b ${showingNavigationDropdown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <div className="p-4 space-y-2">
                    <ResponsiveNavLink href="#" active={false}>Проект</ResponsiveNavLink>
                    <ResponsiveNavLink href="#" active={false}>Обучение</ResponsiveNavLink>
                    <ResponsiveNavLink href="#" active={true}>Группа</ResponsiveNavLink>
                </div>
            </div>

            {/* Page Content */}
            <main className="pt-24 pb-12">
                {header && (
                    <div className="max-w-[1400px] mx-auto px-8 mb-8">
                        {header}
                    </div>
                )}
                <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

interface UnderLinkProps {
    children: string;
    href: string;
    active: boolean;
}

const UnderLink = ({ children, href, active }: UnderLinkProps) => {
    return <NavLink
        href={href}
        active={active}
        className="
        relative text-primary px-3 py-1 text-sm font-semibold
        transition-colors
        after:absolute after:left-1/2 after:bottom-0
        after:h-[2px] after:w-full 
        

        after:bg-gradient-to-r 
        after:from-primary 
        after:to-primary-container

        after:-translate-x-1/2 after:scale-x-0
        after:origin-center
        after:transition-transform after:duration-300
        hover:after:scale-x-100"
    >
        {children}
    </NavLink>
}