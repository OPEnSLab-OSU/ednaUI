import { createReducer, isAnyOf } from "@reduxjs/toolkit";
import { StatusInStore, TaskCollectionInStore } from "root@redux/models";
import {
    getStatusUpdate,
    getTaskCollection,
    createTask,
    scheduleTask,
    unscheduleTask,
} from "root@redux/actions";

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

export const status = createReducer<StatusInStore>(undefined, builder =>
    builder.addCase(getStatusUpdate.fulfilled, (_, action) => action.payload)
);

export const taskCollection = createReducer<TaskCollectionInStore>({}, builder =>
    builder
        .addCase(getTaskCollection.fulfilled, (state, { payload: collection }) => {
            state = collection;
        })
        .addMatcher(
            isAnyOf(createTask.fulfilled, scheduleTask.fulfilled, unscheduleTask.fulfilled),
            (state, { payload: task }) => {
                state[task.id] = task;
            }
        )
);
