export const DistortionLine = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
            <div className="absolute top-0 bottom-0 animate-crt-slow-vertical-drift">
                <div
                    className="h-full w-[0.5px] bg-white/10 shadow-[0_0_2px_rgba(255,255,255,0.4)] mix-blend-soft-light animate-crt-tracking-glitch"
                />
            </div>
        </div>
    );
};