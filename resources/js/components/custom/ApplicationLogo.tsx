export default function ApplicationLogo() {
    return (
        <div className="flex justify-center gap-3 items-center select-none font-mono">
            {/* Logo Image Wrapper - Styled as a high-tech viewport */}
            <div className="relative w-12 h-12 flex items-center justify-center bg-zinc-100 border border-zinc-300 clip-corner shrink-0">
                <img
                    src='/logo.png'
                    className='w-12 h-12 object-contain select-none cursor-pointer filter grayscale contrast-150 mix-blend-multiply'
                    alt="SYS_LOGO"
                />
            </div>

            {/* Brand Matrix Text Node */}
            <div className="hidden md:flex flex-col items-start leading-none">
                <span className="px-1 text-base font-black text-zinc-900 uppercase tracking-widest">
                    наставничество
                </span>
                <span className="px-1 text-[9px] text-zinc-400 font-bold tracking-wider mt-0.5 uppercase">
                    // CORE_SYS_v1.0
                </span>
            </div>
        </div>
    );
}