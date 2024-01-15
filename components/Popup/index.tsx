import ReactDOM  from 'react-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

interface Props {
    children: React.ReactNode,
    closePopup: ()=> void
}

const Popup: React.FC<Props> = ({closePopup, children})=>{
    const portal = typeof document !== "undefined" ? document.querySelector<HTMLDivElement>("#popupPortal") : null;

    if (portal) {
        return ReactDOM.createPortal(
            <div className="Popup fade-in">
                <div className="Popup__Inner">
                    <button className="Popup__CloseBtn" onClick={closePopup}>
                        <FontAwesomeIcon icon={faCircleXmark} width={20}/>
                    </button>
                    {children}
                </div>
            </div>,
        portal)
    } else { return null };
};

export default Popup;