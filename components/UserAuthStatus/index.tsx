"use client";

import { usePathname, useRouter } from "next/navigation";
import routes from "@/routes";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Btn from "@/components/Btn";
import Tooltip from "@/components/Tooltip";
import Spinner from "@/components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faCircleCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import useMedia from "@/hooks/useMedia";
import classNames from "classnames";
import "./index.scss";

const tooltipText = "Log in to seamlessly work on them across devices.";

export const TooltipTextNode: React.FC = () => {
    const {isMobileScreen} = useMedia();

    return(
        <div className="TooltipTextNode">
            <FontAwesomeIcon icon={faCircleInfo} size={isMobileScreen ? "lg" : "2x"} color="#FFCC00"/>
            <span className="TooltipTextNode__Text">
                {tooltipText}
            </span>
        </div>
    )
}

const UserAuthStatus: React.FC = () => {
    const { isUserAuth, user, signOutUser, isLoading, showAuthNote, setShowAuthNote } = useContext(AuthContext);
    const route = useRouter();
    const pathname = usePathname();

    const handleLogOut = () => {
        signOutUser();
    };

    const handleLogIn = () => {
        route.push(routes.login)
    };

    useEffect(()=> {
        let disableNote: NodeJS.Timeout;

        if (pathname === routes.dashboard && showAuthNote) {
            disableNote = setTimeout(() => {
                setShowAuthNote(false);
            }, 4000);
        }
    
        return () => {
            clearTimeout(disableNote);
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(isLoading) {
        return <Btn color="white" className="UserAuthStatus__BtnLoading fade-in"><Spinner type="beat" color="lightgray" /></Btn>
    };

    return (
        <>
            {isUserAuth ?
                <Tooltip tooltipText={user?.email} placement="left">
                    <Btn className="UserAuthStatus__Btn fade-in" color="black" onClick={handleLogOut}>
                        <span>Sign&nbsp;out</span>
                        <span className="UserAuthStatus__BtnDivider">|</span>
                        <FontAwesomeIcon icon={faCircleCheck} color="#3ed364"/>
                    </Btn>
                </Tooltip>
                :
                <div className="UserAuthStatus__UnAuth">
                    <div className={classNames("UserAuthStatus__Note", {
                        "UserAuthStatus__Note--Active": pathname === routes.dashboard && showAuthNote,
                    })} >
                        <TooltipTextNode />
                    </div>
                    <Btn className="UserAuthStatus__Btn fade-in" color="white" onClick={handleLogIn}>
                        <span>Log&nbsp;in</span>
                        <span className="UserAuthStatus__BtnDivider">|</span>
                        <FontAwesomeIcon icon={faRightToBracket} />
                    </Btn>
                </div>
            }
        </>
    )
}

export default UserAuthStatus;