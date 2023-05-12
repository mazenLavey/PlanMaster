"use client";

import { useState } from "react"

type useToggle= [boolean , ((forceValue?: boolean) => void)];

export const useToggle = ():useToggle => {
    const [isOn, setIsOn] = useState<boolean>(false);

    function handleToggle(forceValue?: boolean): void {
        if(forceValue) {
            setIsOn(forceValue)
        } else {
            setIsOn(prevValue => !prevValue);
        };
    };

    return [isOn, handleToggle];
}