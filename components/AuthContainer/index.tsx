"use client";

import { PropsWithChildren, useContext, useLayoutEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import routes from "@/routes";
import { redirect, usePathname } from "next/navigation";
import Spinner from "@/components/Spinner";
import "./index.scss";

const AuthContainer: React.FC<PropsWithChildren> = ({ children }) => {
    const {isUserAuth, isLoading} = useContext(AuthContext);
    const pathname = usePathname();

    useLayoutEffect(() => {
        if(isUserAuth){
            redirect(routes.dashboard)
        }
    }, [isUserAuth]);

    if(isLoading) {
        return <Spinner />
    }

    return(
        <div className="AuthContainer">
            <div className="AuthContainer__Inner">
                {children}
                {
                    pathname === routes.login ?
                    <p className="AuthContainer__Rediracte">Don&apos;t have an account? <Link className="AuthContainer__RediracteLink" href={routes.register}> Create an account</Link></p>
                    :
                    <p className="AuthContainer__Rediracte">Already member? <Link className="AuthContainer__RediracteLink" href={routes.login}> Log in</Link></p>
                }
            </div>
        </div>
    );
};

export default AuthContainer;