import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { scrollAtom } from "src/store";

type HandleScroll = () => void;

export const useScroll = () => {
    const [scroll, setScroll] = useAtom(scrollAtom);

    // buat handle warning useEffect pas pengecekan
    const handleScroll: HandleScroll = useAtomCallback(
        useCallback(() => {
            const position = window.pageYOffset;
            setScroll(position);
        }, [setScroll])
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    return [scroll, setScroll] as const;
};