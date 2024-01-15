"use client"

import Link from "next/link";
import Tooltip from '@/components/Tooltip';
import classNames from 'classnames';
import "./index.scss";

type Props = {
    route: string,
    children: React.ReactNode,
    tooltipText: string,
    isDisabled?: boolean,
}

const NavigationBtn: React.FC<Props> = ({
    route, 
    children,
    tooltipText,
    isDisabled = false,
}) => {

    return (
        <Tooltip tooltipText={tooltipText}>
            <Link
            className={classNames("NavigationBtn", {
                "NavigationBtn--Disabled": isDisabled,
                })}
                href={route} >
                    {children}
            </Link>
        </Tooltip>
    )
}

export default NavigationBtn;