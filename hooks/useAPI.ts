import { useState, useEffect, useCallback } from "react";

export type ReturnStatus = "ready" | "loading" | "fail" | "success";
export type ReturnType<T> = [result: { payload: T; status: ReturnStatus }, reload: () => void];
export type Options = {
    timeout: number;
};
export function useAPI(url: string, type: "text", timeout?: number): ReturnType<string>;
export function useAPI(url: string, type: "json", timeout?: number): ReturnType<JSON>;

export function useAPI<T extends JSON | string>(
    url: string,
    type: "text" | "json",
    timeout = 300
): ReturnType<T | null> {
    const [result, setResult] = useState<{ payload: T | null; status: ReturnStatus }>({
        payload: null,
        status: "ready",
    });

    fetch("");

    // useCallback to keep referencial equality between each render. Prevents infinite loop in useEffect. The function is defferent only if url or type changes
    const reload = useCallback(async () => {
        setResult(result => ({ ...result, status: "loading" }));
        const payload = await fetch(url);

        try {
            switch (type) {
                case "text":
                    setResult({ payload: (await payload.text()) as T, status: "success" });
                    break;
                case "json":
                    setResult({ payload: (await payload.json()) as T, status: "success" });
                    break;
            }
        } catch {
            setResult({ payload: null, status: "fail" });
        }
    }, [url, type]);

    useEffect(() => {
        reload();
    }, [reload]);

    return [result, reload];
}
