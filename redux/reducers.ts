import { createAction, createReducer } from "@reduxjs/toolkit";
import * as actions from "redux/actions";

//
// ────────────────────────────────────────────────────── I ──────────
//   :::::: H E L P E R S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//

function ifElse<B extends boolean, T, K>(c: B, a: T, b: K) {
    return c ? a : b;
}

//
// ──────────────────────────────────────────────────────── II ──────────
//   :::::: R E D U C E R S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────
//

export const path = createReducer("#home", (builder) =>
    builder.addCase(actions.scrollTo, (_, action) => {
        window.location.href = action.payload;
        return action.payload;
    })
);
