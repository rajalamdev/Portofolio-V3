"use client"

import Mini3dGame from "@/app/components/mini3dGame/Mini3dGame";
import { createContext, useContext, ReactNode, useMemo } from "react"


interface DefaultContext {
    theme: string;
}

const defaultState = {
    theme: "#011627",
};

const AppContext = createContext<DefaultContext>(defaultState);

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ( { children }: { children: ReactNode } ) => {
    const mini3dGame = useMemo(() => <Mini3dGame />, [])

    const contextValue = {
        ...defaultState,
        mini3dGame
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )

}



