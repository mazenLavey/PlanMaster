"use client"

import { useState } from 'react';
import { useFloating, useFocus, useHover, useInteractions, offset } from '@floating-ui/react';
import classNames from 'classnames';
import "./index.scss"

type Props = {
    tooltipText: string,
    className?: string,
    children: React.ReactNode,
}

const Tooltip: React.FC<Props> = ({tooltipText, children, className }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {refs, floatingStyles, context} = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "top",
        middleware: [offset(10)],
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

        {isOpen && (
            <div className='Tooltip' ref={refs.setFloating} style={floatingStyles}>
                {tooltipText}
            </div>
        )}
        </>

    )
}


export default Tooltip;