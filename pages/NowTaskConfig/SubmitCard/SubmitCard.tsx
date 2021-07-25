import tw from "twin.macro";
import { useFormContext } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { unwrapResult } from "@reduxjs/toolkit";

import { Card } from "components/modules/Card";
import { Button } from "components/units/Button";
import { mapTaskStatusToString, NowTaskServer } from "root@redux/models";
import { isNullish } from "lib";
import { useAppDispatch } from "root@redux/store";
import { updateNowTask } from "root@redux/actions";

import { FormValues } from "../data";

const mergeWithFormValues = (base: NowTaskServer, values: FormValues): NowTaskServer => {
    const merged: NowTaskServer = { ...base };

    ([
        "flushTime",
        "sampleTime",
        "samplePressure",
        "sampleVolume",
        "dryTime",
        "preserveTime"
    ] as const).forEach(f => {
        merged[f] = values[f];
    });

    return merged;
};

export const SubmitCard = () => {
    // Get Task from store then merge with data in the form
    const task = useSelector(state => state.nowTaskCollection["0"]);
    const { formState, reset, handleSubmit } = useFormContext<FormValues>();
    const dispatch = useAppDispatch();

    // Task is guarantee to exist from parent node but...
    // ...it's easier to work this way since there is no need to check for null
    if (isNullish(task)) {
        return null;
    }

    const saveHandler = handleSubmit(values => {
        const merged = mergeWithFormValues(task, values);
        window.alert("SAVING");
        console.log(merged);
        dispatch(updateNowTask(merged))
            .then(unwrapResult)
            .then(() => window.location.reload())
            .catch(alert);
    });



    const taskStatus = mapTaskStatusToString[task.status];

    return (
        <Card
            tw="p-0 h-72 sticky self-start whitespace-nowrap w-full max-w-xs"
            title={taskStatus === "active" ? "Unschedule Task" : "Schedule Task"}
            css={{
                top: "48px",
                marginTop: "120px",
            }}>
            <div tw="grid gap-4 content-start">
                <div tw="text-subtitle text-secondary flex whitespace-normal">
                    {taskStatus === "active"
                        ? "Task is currently active. Please unschedule the task to make modifications"
                        : "Server will begin task verification process. If successful, it will be scheduled immediately."}
                </div>
                <Button
                    css={
                        taskStatus === "active"
                            ? tw`text-white bg-red-400 w-full`
                            : tw`text-white bg-accent w-full`
                    }
                    disabled={formState.isDirty}
                />

                {taskStatus !== "active" && (
                    <>
                        <div tw="text-subtitle text-secondary whitespace-normal">
                            {formState.isDirty
                                ? "You can unsaved changes. Please save before schedule your task"
                                : "Task is ready to be schedule"}
                        </div>
                        <div
                            tw="grid gap-4"
                            css={{ gridTemplateColumns: "repeat(auto-fit, minmax(8rem, 1fr))" }}>
                            <Button
                                tw="bg-transparent border border-accent text-accent shadow-none
                hover:(shadow-none font-bold)"
                                text="CANCEL"
                                disabled={!formState.isDirty}
                                onClick={() => {
                                    reset();
                                }}
                            />
                            <Button
                                tw="bg-transparent border-accent border text-accent shadow-none
                hover:(shadow-none font-bold)"
                                text="SAVE"
                                disabled={!formState.isDirty}
                                onClick={saveHandler}
                            />
                        </div>

                    </>
                )}
            </div>
        </Card>
    );
};
