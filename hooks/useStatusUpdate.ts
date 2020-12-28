import { useEffect, useState } from "react";
import { useAPI } from "hooks";

export function useStatusUpdate(url: string) {
    const [result, reload] = useAPI(url, "json");
    const [pause, setPause] = useState(false);

    useEffect(() => {
        // Don't send another request if we are already sending one
        // if (result.status === "loading") {
        //     console.log("Still loading");
        //     return;
        // }

        if (result.status === "fail") {
            console.log("Status Failed: retrying in 3 seconds");
            setPause(true);
            setTimeout(() => setPause(false), 3000);
        }
    }, [result.status]);

    useEffect(() => {
        const fetchStatus = () => {
            // Don't send if we are pausing
            if (pause) {
                console.log("Pausing");
            } else reload();
        };

        const timerId = setInterval(fetchStatus, 1000);
        return () => {
            console.log("Cleared timer");
            clearTimeout(timerId);
        };
    }, [reload, pause]);

    return { result, pause, setPause };
}
