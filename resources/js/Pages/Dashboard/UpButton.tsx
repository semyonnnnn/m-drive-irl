
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export const UpButton = () => {
    return (
        <a href="#" className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary-container text-white shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-transform z-50">
            <FontAwesomeIcon icon={faArrowUp} />
        </a>
    );
}