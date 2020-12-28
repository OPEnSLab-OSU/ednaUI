import { createAction } from "@reduxjs/toolkit";
import { StatusServer, TaskServer } from "edna@redux/models";

// ────────────────────────────────────────────────────── II ──────────
//   :::::: A C T I O N S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//

function withPayload<K extends unknown[], V>(func: (...args: K) => V) {
    return (...args: K) => ({ payload: func(...args) });
}

export const updateStatus = createAction(
    "status/update",
    withPayload((status: StatusServer) => status)
);

export const updateTask = createAction(
    "task/update",
    withPayload((id: string, data: Partial<TaskServer>) => ({ ...data, id }))
);

export const insertTask = createAction(
    "task/insert",
    withPayload((id: string, data: TaskServer) => ({ ...data, id }))
);

export const replaceTaskCollection = createAction(
    "taskcollection/replace",
    withPayload((collection: Record<string, TaskServer>) => collection)
);
