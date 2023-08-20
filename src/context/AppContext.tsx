"use client"

import Mini3dGame from "@/app/components/mini3dGame/Mini3dGame";
import { createContext, useContext, ReactNode, useMemo, useState, useRef, useEffect } from "react"


interface DefaultContext {
    theme: string;
    [x: string]: any;
}

const defaultState = {
    theme: "#011627",
};

const AppContext = createContext<DefaultContext>(defaultState);

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ( { children }: { children: ReactNode } ) => {
    // const mini3dGame = useMemo(() => <Mini3dGame />, [])
    const [enabledMusic, setEnabledMusic] = useState(false);
    const [enabled3dSpline, setEnabled3dSpline] = useState(true);
    const [screenSize, setScreenSize] = useState(0);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenSize(window.innerWidth);
        });
    }, [screenSize]);

    const contextValue = {
        ...defaultState,
        // mini3dGame,
        enabledMusic,
        setEnabledMusic,
        enabled3dSpline,
        setEnabled3dSpline,
        screenSize,
        setScreenSize
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )

}



