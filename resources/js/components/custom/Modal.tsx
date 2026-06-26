import { DistortionLine } from '@/Pages/Material/DistortionLine';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { PropsWithChildren } from 'react';

export default function Modal({
    children,
    show = false,
    maxWidth = 'xl',
    closeable = true,
    onClose = () => { },
    className
}: PropsWithChildren<{
    show: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'auto' | 'px' | 'full' | 'screen' | 'fit';
    closeable?: boolean;
    onClose: CallableFunction;
    className?: string;
}>) {

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
        '5xl': 'sm:max-w-5xl',
        '6xl': 'sm:max-w-6xl',
        '7xl': 'sm:max-w-7xl',
        'auto': 'sm:max-w-auto',
        'px': 'sm:max-w-px',
        'full': 'sm:max-w-full',
        'screen': 'sm:max-w-screen',
        'fit': 'sm:max-w-fit'
    }[maxWidth];

    return (
        <Transition show={show}>
            <Dialog
                as="div"
                className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden p-4 backdrop-blur-xs"
                onClose={() => closeable && onClose()}
            >
                <DistortionLine />

                {/* Instant exit: duration-0, no animation classes on leave */}
                <TransitionChild
                    enter="duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-0"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-zinc-950/80"
                        onClick={() => closeable && onClose()}
                    />
                </TransitionChild>

                {/* Mechanical entry, Instant exit */}
                <TransitionChild
                    enter="duration-[400ms] transition-all ease-out"
                    enterFrom="opacity-0 scale-y-90 [clip-path:inset(0%_50%_0%_50%)]"
                    enterTo="opacity-100 scale-y-100 [clip-path:inset(0%_0%_0%_0%)]"
                    leave="duration-0"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <DialogPanel className={`w-full relative transform transition-all sm:mx-auto bg-transparent shadow-none border-none overflow-visible glitch-layer ${maxWidthClass}`}>
                        {children}
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}