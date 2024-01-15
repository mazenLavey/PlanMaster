"use client";

import { useState, useEffect } from "react";

const useMedia= () => {
    const [isMobileScreen, setIsMobileScreen] = useState(false);
    const [isTabletScreen, setIsTabletScreen] = useState(false);
    const [isDesktopScreen, setIsDesktopScreen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    const getMediaSize = () => {
        if (window.matchMedia("(max-width: 575px)").matches) {
            setIsMobileScreen(true);
            setIsTabletScreen(false);
            setIsDesktopScreen(false);
            setIsLargeScreen(false);
            return
        } else if (window.matchMedia("(min-width: 576px)").matches && window.matchMedia("(max-width: 991px)").matches) {
            setIsMobileScreen(false);
            setIsTabletScreen(true);
            setIsDesktopScreen(false);
            setIsLargeScreen(false);
            return
        } else if (window.matchMedia("(min-width: 992px)").matches && window.matchMedia("(max-width: 1199px)").matches) {
            setIsMobileScreen(false);
            setIsTabletScreen(false);
            setIsDesktopScreen(true);
            setIsLargeScreen(false);
            return
        } else if (window.matchMedia("(min-width: 1200px)").matches) {
            setIsMobileScreen(false);
            setIsTabletScreen(false);
            setIsDesktopScreen(false);
            setIsLargeScreen(true);
            return
        }
    }

    useEffect(()=>{
        getMediaSize();
        window.addEventListener('resize', getMediaSize);
        return ()=>{
            window.removeEventListener('resize', getMediaSize);
        }
    }, []);

    return {isMobileScreen, isTabletScreen, isDesktopScreen, isLargeScreen}
}

export default useMedia;