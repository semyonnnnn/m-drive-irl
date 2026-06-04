import { faFolder } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ApplicationLogo() {
    return (
        <div className="flex justify-center gap-2 items-center">
            <img src='/logo.png' className='w-[4rem] select-none cursor-pointer' />
            <span className="select-none hidden px-1 md:block text-xl font-black bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-cyan-500 font-headline tracking-tighter">
                наставничество
            </span>
        </div>
    );
}
