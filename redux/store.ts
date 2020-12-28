import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";

import {} from "edna@redux/actions";
import * as reducers from "edna@redux/reducers";

const logger: Middleware = _ => next => action => {
    console.log("Activated: ", action.type);
    next(action);
};

const rootReducer = combineReducers(reducers);
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof rootReducer>;
