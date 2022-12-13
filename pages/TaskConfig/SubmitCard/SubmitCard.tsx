import tw from "twin.macro";
import { useFormContext } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { unwrapResult } from "@reduxjs/toolkit";

import { Card } from "components/modules/Card";
import { Button } from "components/units/Button";
import { mapTaskStatusToString, TaskServer } from "root@redux/models";
import { isNullish } from "lib";
import { useAppDispatch } from "root@redux/store";
import { deleteTask, scheduleTask, unscheduleTask, updateTask } from "root@redux/actions";

import { FormValues } from "../data";

const mergeWithFormValues = (base: TaskServer, values: FormValues): TaskServer => {
    const merged: TaskServer = { ...base };
    merged.name = values.name;
    merged.notes = values.notes ?? "";

    const { date, time } = values;
    const schedule = new Date(`${date}T${time}:00`);
    merged.schedule = Math.floor(schedule.getTime() / 1000);

    merged.timeBetween = values.timeBetween;
    merged.valves = getValves(values.valves);

    ([
        "flushTime",
        "sampleTime",
        "samplePressure",
        "sampleVolume",
        "dryTime",
        "preserveTime",
    ] as const).forEach(f => {
        merged[f] = values[f];
    });

    return merged;
};

function getValves(valves: string) {
    const regexp = /(\d+-\d+)|\d+/g;
    const matches = [...valves.matchAll(regexp)];
    console.log(matches);
    let values: number[] = [];
    const distinctValues = new Set();
    matches.forEach(function (match) {
        const matchString = match.toString();
        if (matchString.indexOf("-")) {
            const firstBound = parseInt(matchString.slice(0, matchString.indexOf("-")), 10);
            const secondBound = parseInt(matchString.slice(matchString.indexOf("-") + 1), 10);
            for (let i = firstBound; i < secondBound + 1; i++) {
                values.push(i);
            }
        } else {
            values.push(parseInt(matchString, 10));
        }
    });

    values.forEach(function (value) {
        distinctValues.add(value);
    });
    values = [];
    for (const distinctValue of distinctValues) {
        values.push(Number(distinctValue));
    }
    return values;
}

export const SubmitCard = () => {
    // Get Task from store then merge with data in the form
    const { taskId } = useParams<{ taskId: string }>();
    const task = useSelector(state => state.taskCollection[taskId]);
    const { formState, reset, handleSubmit } = useFormContext<FormValues>();
    const dispatch = useAppDispatch();

    // Task is guarantee to exist from parent node but...
    // ...it's easier to work this way since there is no need to check for null
    if (isNullish(task)) {
        return null;
    }

    const saveHandler = handleSubmit(values => {
        const merged = mergeWithFormValues(task, values);
        console.log(merged);
        dispatch(updateTask(merged))
            .then(unwrapResult)
            .then(() => window.location.reload())
            .catch(alert);
    });

    const scheduleHandler = handleSubmit(() => {
        dispatch(scheduleTask(task.id))
            .then(unwrapResult)
            .then(() => window.location.reload())
            .catch(alert);
    });

    const unscheduleHandler = () => {
        dispatch(unscheduleTask(task.id))
            .then(unwrapResult)
            .then(() => window.location.reload())
            .catch(alert);
    };

    const deleteHandler = () => {
        dispatch(deleteTask(task.id))
            .then(unwrapResult)
            .then(() => window.location.reload())
            .catch(alert);
    };

    const TwentyFourHrTestPrefillHandler = () => {
        const inputs = document.querySelectorAll("input");
        inputs.forEach(function (input) {
            switch (input.getAttribute("name")) {
                case "timeBetween":
                    input.value = "3600";
                    break;
                case "valves":
                    input.value = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23";
                    break;
                case "flushTime":
                    input.value = "30";
                    break;
                case "sampleTime":
                    input.value = "120";
                    break;
                case "sampleVolume":
                    input.value = "1";
                    break;
                case "samplePressure":
                    input.value = "35";
                    break;
                case "dryTime":
                    input.value = "30";
                    break;
                case "preserveTime":
                    input.value = "30";
                    break;
            }
        });
    };

    const TwoWeekTestPrefillHandler = () => {
        const inputs = document.querySelectorAll("input");
        inputs.forEach(function (input) {
            switch (input.getAttribute("name")) {
                case "timeBetween":
                    input.value = "50400";
                    break;
                case "valves":
                    input.value = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23";
                    break;
                case "flushTime":
                    input.value = "30";
                    break;
                case "sampleTime":
                    input.value = "300";
                    break;
                case "sampleVolume":
                    input.value = "1";
                    break;
                case "samplePressure":
                    input.value = "35";
                    break;
                case "dryTime":
                    input.value = "30";
                    break;
                case "preserveTime":
                    input.value = "30";
                    break;
            }
        });
    };

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
                    text={taskStatus === "active" ? "Unschedule" : "Schedule"}
                    onClick={taskStatus === "active" ? unscheduleHandler : scheduleHandler}
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

                        <div tw="text-subtitle text-secondary whitespace-normal">
                            {"Task value prefills"}
                        </div>
                        <Button
                            tw="bg-transparent border-accent border text-accent shadow-none
                            hover:(shadow-none font-bold)"
                            text="24hr Pressure Test"
                            onClick={TwentyFourHrTestPrefillHandler}
                        />

                        <Button
                            tw="bg-transparent border-accent border text-accent shadow-none
                            hover:(shadow-none font-bold)"
                            text="2w Pressure Test"
                            onClick={TwoWeekTestPrefillHandler}
                        />

                        <div tw="text-subtitle text-secondary justify-self-end">
                            <span>Click here to </span>
                            <button
                                tw="text-red-500 opacity-75 hover:(opacity-100)"
                                type="button"
                                onClick={deleteHandler}>
                                delete
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
};
