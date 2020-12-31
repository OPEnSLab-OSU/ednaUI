import { useEffect, useState, useRef } from "react";
import { useScrollTracking, notFound } from "hooks";

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

    return [match, pause, setPause, setMatch] as const;
};
