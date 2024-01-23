import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TAlertType } from '@/types/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ALERT_ICON, ALERT_MESSAGE } from '@/constants/alert';
import './index.scss';

const options: ToastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    pauseOnFocusLoss: false,
    theme: "dark",
}

type CustomToastProps = {
    alertType: TAlertType,
    message: string,
}

const CustomToast: React.FC<CustomToastProps> = ({ alertType, message }) => {
    return (
        <div className="CustomToast">
            <FontAwesomeIcon icon={ALERT_ICON[alertType].icon} color={ALERT_ICON[alertType].color} width="25" />
            <p className="CustomToast__Text" >{message}</p>
        </div>
    )
}

export const notify = {
    error: (message: string) => toast(<CustomToast alertType="error" message={message} />, { ...options }),
    loggedIn: () => toast(<CustomToast alertType="loggedIn" message={ALERT_MESSAGE["loggedIn"]} />, { ...options }),
    registered: () => toast(<CustomToast alertType="registered" message={ALERT_MESSAGE["registered"]} />, { ...options }),
    signedOut: () => toast(<CustomToast alertType="signedOut" message={ALERT_MESSAGE["signedOut"]} />, { ...options }),
};

const Snackbar: React.FC = () => {
    return (
        <ToastContainer 
            toastClassName="CustomToast__Body"
            newestOnTop 
        />
    );
};

export default Snackbar;