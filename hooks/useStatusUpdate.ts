import { useEffect, useState } from "react";
import { useAPI } from "hooks";

export function useStatusUpdate(url: string) {
    const [result, reload] = useAPI(url, "json");
    const [pause, setPause] = useState(false);

    useEffect(() => {
        const fetchStatus = () => {
            // Don't send another request if we are already sending one
            if (result.status === "loading") {
                console.log("Still loading");
                return;
            }

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
    }, [reload, pause, result.status]);

    return { result, pause, setPause };
}
