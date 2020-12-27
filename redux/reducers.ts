import { createReducer } from "@reduxjs/toolkit";
import { StatusServer, TaskServer } from "redux/models";
import * as actions from "redux/actions";

//
// ────────────────────────────────────────────────────── I ──────────
//   :::::: H E L P E R S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//

//
// ──────────────────────────────────────────────────────── II ──────────
//   :::::: R E D U C E R S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────
//

export const status = createReducer<StatusServer | undefined>(undefined, builder =>
    builder.addCase(actions.updateStatus, (_, action) => action.payload)
);

export const taskCollection = createReducer<Map<string, TaskServer>>(new Map(), builder =>
    builder
        .addCase(actions.replaceTaskCollection, (_, action) => {
            const newCollection = new Map();
            Object.keys(action.payload).forEach(taskId => {
                newCollection.set(taskId, action.payload[taskId]);
            });

            return newCollection;
        })
        .addCase(actions.insertTask, (map, { payload: task }) => {
            if (map.has(task.id)) {
                throw new Error(`Task with id (${task.id}) already exist`);
            }
            map.set(task.id, task);
        })
        .addCase(actions.updateTask, (map, { payload: task }) => {
            const taskInMap = map.get(task.id);
            if (!taskInMap) {
                throw new Error(`Task with id (${task.id}) doesn't exist`);
            }

            map.set(task.id, { ...taskInMap, ...task });
        })
);
