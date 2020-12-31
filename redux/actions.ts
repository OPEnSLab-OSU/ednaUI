import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { StatusServer, TaskServer } from "root@redux/models";
import { base, get, post } from "app/http";
import { arrayToObject } from "lib";

// ────────────────────────────────────────────────────── II ──────────
//   :::::: A C T I O N S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//

function withPayload<K extends unknown[], V>(action: (...args: K) => V) {
    return (...args: K) => ({ payload: action(...args) });
}

/**
 * To be used with Redux's dispatch function. Retrive status update from server then notify the redux for further handling.
 */
export const getStatusUpdate = createAsyncThunk("status/get", async function () {
    const timer = setTimeout(() => {
        throw new Error("Timeout");
    }, 2000);

    const response = await fetch(new URL("api/status", base).toString());
    const payload = (await response.json()) as StatusServer;
    clearTimeout(timer);
    return payload;
});

//
// ──────────────────────────────────────────────────────────────── I ──────────
//   :::::: T A S K   A C T I O N S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────
//

/**
 * Redux Thunk. Retrieve all tasks from server then notify the redux store for further handling.
 */
export const getTaskCollection = createAsyncThunk("taskCollection/get", async () => {
    const response = await fetch(new URL("api/tasks", base).toString());
    const payload = (await response.json()) as TaskServer[];
    return arrayToObject(payload, "id");
});

/**
 * Redux Thunk. Request server to create a new task with given name
 */
export const createTask = createAsyncThunk("task/create", async (name: string) => {
    const { error, payload } = await post("api/task/create").withJson({ name }).send<TaskServer>();
    if (error) throw new Error(error);
    return payload as TaskServer;
});

/**
 * Redux Thunk. Send updated task information to server. Then refresh the task collection.
 */
export const updateTask = createAsyncThunk(
    "task/update",
    async function (task: TaskServer, { dispatch }) {
        const { error } = await post("api/task/update").withJson(task).send();
        if (error) throw new Error(error);
        dispatch(getTaskCollection());
    }
);

/**
 * Redux thunk. Delete task on server
 * @param id Id of the task to be deleted
 */
export const deleteTask = createAsyncThunk("task/delete", async (id: string, { dispatch }) => {
    const { error } = await post("api/task/delete").withJson({ id }).send();
    if (error) throw new Error(error);
    dispatch(getTaskCollection());
});

export const scheduleTask = createAsyncThunk("task/schedule", async (id: string) => {
    const { error, payload } = await post("api/task/schedule").withJson({ id }).send<TaskServer>();
    if (error) throw new Error(error);
    return payload as TaskServer;
});

export const unscheduleTask = createAsyncThunk("task/unschedule", async (id: string) => {
    const { error, payload } = await post("api/task/unschedule")
        .withJson({ id })
        .send<TaskServer>();
    if (error) throw new Error(error);
    return payload as TaskServer;
});

export const setLoadingScreen = createAction(
    "loadingScreen/set",
    withPayload((value: "showing" | "hiding") => value)
);
