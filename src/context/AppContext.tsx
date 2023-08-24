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
    const [smallDevices, setSmallDevices] = useState(false);
    const [topArtistEndpoint, setTopArtistEndpoint] = useState('')

    useEffect(() => {
        setScreenSize(window.innerWidth);
        if(window.innerWidth < 1024) {
            setSmallDevices(true)
            setEnabled3dSpline(false)
        }
    }, []);

    const contextValue = {
        ...defaultState,
        // mini3dGame,
        enabledMusic,
        setEnabledMusic,
        enabled3dSpline,
        setEnabled3dSpline,
        screenSize,
        setScreenSize,
        smallDevices,
        topArtistEndpoint,
        setTopArtistEndpoint
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )

}



