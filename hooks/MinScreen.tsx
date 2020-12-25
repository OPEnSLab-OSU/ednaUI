/**
 * Screen provider and hook for Twin
 * Author: Ben Rogerson
 * See: https://gist.github.com/ben-rogerson/b4b406dffcc18ae02f8a6c8c97bb58a8
 */

import { useState, useEffect, createContext, useContext, ReactNode } from "react";

type TScreen = {
    name: string;
    media: string;
};
const defaultValue: Record<string, boolean> = {};
const ScreensContext = createContext(defaultValue);
const MinScreenProvider = ({ children, screens }: { children: ReactNode; screens: TScreen[] }) => {
    const [queryMatch, setQueryMatch] = useState({});

    useEffect(() => {
        const mediaQueryLists: Record<string, MediaQueryList> = {};
        let isAttached = false;

        const mediaData = Object.entries(screens).map(([name, media]) => [
            name,
            `(min-width: ${media})`,
        ]);

        const handleQueryListener = () => {
            const updatedMatches = mediaData.reduce(
                (acc, [name]) => ({
                    ...acc,
                    [name]: Boolean(mediaQueryLists[name] && mediaQueryLists[name].matches),
                }),
                {}
            );
            setQueryMatch(updatedMatches);
        };

        if (window && window.matchMedia) {
            const matches: Record<string, boolean> = {};

            mediaData.forEach(([name, media]) => {
                if (typeof media !== "string") {
                    matches[name] = false;
                    return;
                }

                mediaQueryLists[name] = window.matchMedia(media);
                matches[name] = mediaQueryLists[name].matches;
            });

            setQueryMatch(matches);
            isAttached = true;

            mediaData.forEach(([name, media]) => {
                if (typeof media !== "string") return;
                mediaQueryLists[name].onchange = handleQueryListener;
            });
        }

        return () => {
            if (!isAttached) return;
            mediaData.forEach(([name, media]) => {
                if (typeof media !== "string") return;
                mediaQueryLists[name].onchange = null;
            });
        };
    }, [screens]);

    return <ScreensContext.Provider value={queryMatch}>{children}</ScreensContext.Provider>;
};

const useMinScreen = () => {
    const context = useContext(ScreensContext);
    if (context === defaultValue) {
        throw new Error("useMinScreen must be used within a MinScreenProvider");
    }

    const min = (size: TemplateStringsArray | string) =>
        typeof size === "string" ? context[size] : context[size[0]];

    return {
        min,
        max: (size: TemplateStringsArray | string) => !min(size),
    };
};

export { useMinScreen, MinScreenProvider };
