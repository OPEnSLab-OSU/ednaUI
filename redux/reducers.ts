import { createReducer, isAnyOf } from "@reduxjs/toolkit";
import { StatusInStore, TaskCollectionInStore } from "root@redux/models";
import {
    getStatusUpdate,
    getTaskCollection,
    createTask,
    scheduleTask,
    unscheduleTask,
    setLoadingScreen,
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

export const status = createReducer<StatusInStore>(null, builder =>
    builder.addCase(getStatusUpdate.fulfilled, (_, action) => {
        console.log(action.payload);
        return action.payload;
    })
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

export const loadingScreen = createReducer<"showing" | "hiding">("hiding", builder =>
    builder.addCase(setLoadingScreen, (_, action) => action.payload)
);
