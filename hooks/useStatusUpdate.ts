import { update } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStatusUpdate } from "root@redux/actions";
import { useAppDispatch } from "root@redux/store";

type StatusText = "success" | "pending" | "rejected";
export function useStatusUpdate() {
    const dispatch = useAppDispatch();
    const status = useSelector(state => state.status);
    const reload = useCallback(() => dispatch(getStatusUpdate(1000)), [dispatch]);

    useEffect(() => {
        if (status.retries >= 3) {
            return;
        }

        async function updateStatus() {
            if (getStatusUpdate.fulfilled.match(await reload())) {
                updateStatus();
            }
        }

        updateStatus();
    }, [reload, status.retries]);

    return { status, reload };
}
