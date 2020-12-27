export * from "./MinScreen";

import {
    useContext,
    createContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
    useRef,
} from "react";
import { throttle, debounce } from "lodash";
import { RefObject } from "preact";

/**
 * A helper to create a Context and Provider with no upfront default value, and
 * without having to check for undefined all the time.
 */
export function createDefaultContext<A extends unknown | null>() {
    const context = createContext<A | undefined>(undefined);
    function useDefaultContext() {
        const c = useContext(context);
        if (c === undefined)
            throw new Error("useDefaultContext must be inside a Provider with a value");
        return c;
    }
    return [useDefaultContext, context.Provider] as const; // 'as const' makes TypeScript infer a tuple
}

function notFound<TValue>(id: TValue | null | undefined): id is TValue {
    if (id !== null && id !== undefined) return true;
    throw new Error(`DOM with id ${id} doesn't exist`);
}

export function useScrollTracking(targetId: string, throttleMs = 100) {
    // Useref here to avoid rerendering;
    const ref = useRef<HTMLElement | null>();
    const [data, setData] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    });
    // Get the target after DOM has painted
    useEffect(() => {
        console.log("Setting target to track", ref.current);
        ref.current = document.getElementById(targetId);
        notFound(ref.current);
    }, [targetId]);

    // At this point on we are free to assume target.current exist in useEffect
    useEffect(() => {
        const target = ref.current;
        if (!target) return;

        const track = throttle(() => {
            setData({
                left: target.scrollLeft,
                top: target.scrollTop,
                width: target.scrollWidth,
                height: target.scrollHeight,
            });
        }, throttleMs);

        target.addEventListener("scroll", track);
        return () => {
            target.removeEventListener("scroll", track);
        };
    }, [throttleMs]);

    return data;
}

export const useScrollTrackingWithTargets = (
    scroller: string,
    targetIds: string[],
    throttleMs = 200,
    detectHeight = 300
) => {
    const [match, setMatch] = useState(0);
    const [pause, setPause] = useState(false);
    const scrollData = useScrollTracking(scroller, throttleMs);
    const refs = useRef<HTMLElement[]>([]);

    // Get references to all target doms
    useEffect(() => {
        refs.current = targetIds.map(id => document.getElementById(id)).filter(notFound);
    }, [targetIds]);

    useEffect(() => {
        const bottomEdge = scrollData.top + window.innerHeight === scrollData.height;
        if (pause || bottomEdge) {
            return;
        }

        if (scrollData.top === 0) {
            setMatch(0);
            return;
        }

        const targets = refs.current;
        for (let target = 0; target < targets.length; target++) {
            const top = targets[target].getBoundingClientRect().top;

            if (top >= 0 && top <= detectHeight) {
                setMatch(target);
                break;
            }
        }
    }, [scrollData, pause, detectHeight]);

    return [match, pause, setPause] as const;
};
