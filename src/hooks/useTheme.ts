import { atom, useAtom } from "jotai";
import { useEffect } from "react";

export type Theme = 'light' | 'dark';

const browser = typeof window !== 'undefined';
const localValue = (browser ? localStorage.getItem('theme') : 'light') as Theme;
const systemTheme: Theme = browser && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const themeAtom = atom<Theme>(localValue || systemTheme);

export const useTheme = () => {
    const [theme, setTheme] = useAtom(themeAtom);

    useEffect(() => {
        if (!browser) return;

        localStorage.setItem('theme', theme);
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
    }, [theme])

    return [theme, setTheme] as const;
}