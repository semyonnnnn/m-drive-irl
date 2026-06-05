import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { PropsWithChildren } from 'react';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => { },
}: PropsWithChildren<{
    show: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    closeable?: boolean;
    onClose: CallableFunction;
}>) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <Transition show={show}>
            {/* CRITICAL: Changed z-50 to z-[100] to explicitly slice above your 
              AuthenticatedLayout and primary container cards. Added item centering mechanics.
            */}
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 transition-all sm:p-0 backdrop-blur-xs"
                onClose={close}
            >
                {/* Backdrop Layer Fade */}
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-zinc-950/60 transition-opacity"
                        onClick={close}
                    />
                </TransitionChild>

                {/* Content Frame Elevation */}
                <TransitionChild
                    enter="ease-out duration-200"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    {/* Wipe the background/borders here dynamically so your custom 
                      armored chassis layout inside the children handles the layout edge
                    */}
                    <DialogPanel
                        className={`w-full transform transition-all sm:mx-auto bg-transparent shadow-none border-none overflow-visible ${maxWidthClass}`}
                    >
                        {children}
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}