import {Dispatch, PropsWithChildren, useState} from 'react';
import { createContext, useContext } from 'react';

type Props = {
    xp: number;
    setXp: Dispatch<number>
}

export const ExpContext = createContext<Props>({} as never);

export function ExpProvider({children}: PropsWithChildren) {
    const [xp, setXp] = useState<number>(() => {
        const savedAchievements = JSON.parse(localStorage.getItem("portfolioAchievements") || '[]').reduce((a: number, {unlocked = 0}) => a + (unlocked ? 1 : 0), 0);
        return savedAchievements;
    });

    return <ExpContext.Provider value={{xp, setXp}}>{children}</ExpContext.Provider>;
}

export function useExp() {
    return useContext(ExpContext);
}
