import { TAlertType } from '@/types/interfaces';
import { faUserPlus, faUserCheck, faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export const  ALERT_TYPE:  {
    REGISTERED: TAlertType,
    LOGGED_IN: TAlertType,
    SIGNED_OUT : TAlertType,
    ERROR: TAlertType,
} = {
    REGISTERED: "registered",
    LOGGED_IN: "loggedIn",
    SIGNED_OUT : "signedOut",
    ERROR: "error",
}

export const  ALERT_MESSAGE = {
    [ALERT_TYPE.REGISTERED]: "Registered successfully!",
    [ALERT_TYPE.LOGGED_IN]: "Welcome back! Logged in.",
    [ALERT_TYPE.SIGNED_OUT]: "Signed out successfully.",
    [ALERT_TYPE.ERROR]: "Server issue. Refresh the page.",
}

export const  ALERT_ICON = {
    [ALERT_TYPE.REGISTERED]: {
        icon: faUserPlus,
        color: '#fff',
    },
    [ALERT_TYPE.LOGGED_IN] : {
        icon: faUserCheck,
        color: '#00bf3b',
    },
    [ALERT_TYPE.SIGNED_OUT] : {
        icon: faCircleCheck,
        color: '#00bf3b',
    },
    [ALERT_TYPE.ERROR] : {
        icon: faCircleExclamation,
        color: '#ff746d',
    },
}