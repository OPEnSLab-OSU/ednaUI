import { createAsyncThunk } from "@reduxjs/toolkit";
import { StatusServer, TaskServer } from "root@redux/models";
import { get, post } from "app/http";
import { arrayToObject } from "lib";
import { create } from "lodash";

// ────────────────────────────────────────────────────── II ──────────
//   :::::: A C T I O N S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//

// function withPayload<K extends unknown[], V>(func: (...args: K) => V) {
//     return (...args: K) => ({ payload: func(...args) });
// }

/**
 * To be used with Redux's dispatch function. Retrive status update from server then notify the redux for further handling.
 */
export const getStatusUpdate = createAsyncThunk("status/get", async function () {
    const { error, data } = await get("api/status/get").send<StatusServer>();
    if (error) throw new Error(error);
    return data;
});

/**
 * To be used with Redux's dispatch function. Retrieve all tasks from server then notify the redux store for further handling.
 */
export const getTaskCollection = createAsyncThunk("taskCollection/get", async () => {
    const { error, data } = await get("api/tasks").send<TaskServer[]>();
    if (error) throw new Error(error);
    return arrayToObject(data as TaskServer[], "id");
});

export const createTask = createAsyncThunk("task/create", async (name: string) => {
    const { error, data } = await post("api/task/create").withJson({ name }).send<TaskServer>();
    if (error) throw new Error(error);
    return data as TaskServer;
});

export const updateTask = createAsyncThunk(
    "task/update",
    async function (task: TaskServer, { dispatch }) {
        const { error } = await post("api/task/update").withJson(task).send();
        if (error) throw new Error(error);
        dispatch(getTaskCollection());
    }
);

export const deleteTask = createAsyncThunk("task/delete", async (id: string, { dispatch }) => {
    const { error } = await post("api/task/delete").withJson({ id }).send();
    if (error) throw new Error(error);
    dispatch(getTaskCollection());
});

export const scheduleTask = createAsyncThunk("task/schedule", async (id: string) => {
    const { error, data } = await post("api/task/schedule").withJson({ id }).send<TaskServer>();
    if (error) throw new Error(error);
    return data as TaskServer;
});

export const unscheduleTask = createAsyncThunk("task/unschedule", async (id: string) => {
    const { error, data } = await post("api/task/unschedule").withJson({ id }).send<TaskServer>();
    if (error) throw new Error(error);
    return data as TaskServer;
});
