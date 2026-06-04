import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export const UpButton = () => {
    return (
        <a
            href="#"
            className="fixed bottom-8 right-8 w-14 h-14 bg-zinc-950 border border-zinc-900 text-zinc-100 flex items-center justify-center hover:bg-zinc-200 hover:text-zinc-950 hover:border-zinc-300 transition-all duration-150 clip-corner shadow-xs z-50 text-xl cursor-pointer select-none font-mono"
            title="[ ВВЕРХ ]"
        >
            <FontAwesomeIcon icon={faArrowUp} className="text-sm tracking-widest" />
        </a>
    );
};