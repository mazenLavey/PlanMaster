import styles from '@/styles/Popup.module.scss';
import ReactDOM  from 'react-dom'; 

interface Props {
    children: React.ReactNode,
    closePopup: ()=> void
}

const Popup: React.FC<Props> = ({closePopup, children})=>{
    const portal = typeof document !== "undefined" ? document.querySelector<HTMLDivElement>("#popupPortal") : null;

    if (portal) {
        return ReactDOM.createPortal(
            <div className={styles.layer}>
                <div className={styles.box}>
                    <span onClick={closePopup}>close</span>
                    {children}
                </div>
            </div>,
        portal)
    } else { return null };
};

export default Popup;