"use client"

import { useRef, useState } from 'react';
import { useFloating, useFocus, useHover, useInteractions, offset, FloatingArrow, arrow, Placement } from '@floating-ui/react';
import classNames from 'classnames';
import useMedia from '@/hooks/useMedia';
import "./index.scss"

type Props = {
    tooltipText: string | null | undefined | React.ReactNode,
    className?: string,
    tooltipClassName?: string,
    children: React.ReactNode,
    placement?: Placement,
}

const Tooltip: React.FC<Props> = ({
    tooltipText, 
    children, 
    className, 
    tooltipClassName, 
    placement = "top" 
}) => {
    const { isMobileScreen, isTabletScreen } = useMedia();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const arrowRef = useRef(null);

    const {refs, floatingStyles, context} = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: placement,
        middleware: [
            arrow({
                element: arrowRef,
            }),
            offset(10)
        ],
    });

    const hover = useHover(context);
    const focus = useFocus(context);
    
    const {getReferenceProps, getFloatingProps} = useInteractions([
        hover,
        focus,
    ]);

    return(
        <>
        <span className={classNames("Tooltip__Wrapper", className)} ref={refs.setReference}>
            {children}
        </span>

        {isOpen && tooltipText && (
            <div 
                className={classNames(['Tooltip', tooltipClassName], {
                    "Tooltip--Disabled": isMobileScreen || isTabletScreen,
                })} 
                ref={refs.setFloating} 
                style={floatingStyles} >
                {tooltipText}
                <FloatingArrow className='Tooltip__Arrow' ref={arrowRef} context={context} tipRadius={1} />
            </div>
        )}
        </>

    )
}


export default Tooltip;