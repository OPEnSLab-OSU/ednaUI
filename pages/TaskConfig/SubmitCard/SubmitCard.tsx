import tw from "twin.macro";
import { useFormContext } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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
    merged.valves = values.valves.split(",").map(v => Number(v));

    ([
        "flushTime",
        "flushVolume",
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

export const SubmitCard = () => {
    // Get Task from store then merge with data in the form
    const { taskId } = useParams<{ taskId: string }>();
    const task = useSelector(state => state.taskCollection[taskId]);
    const { formState, reset, handleSubmit } = useFormContext<FormValues>();
    const history = useHistory();

    const dispatch = useAppDispatch();

    // Task is guarantee to exist from parent node but...
    // ...it's easier to work this way since there is no need to check for null
    if (isNullish(task)) {
        return null;
    }

    const saveHandler = handleSubmit(values => {
        const merged = mergeWithFormValues(task, values);
        dispatch(updateTask(merged))
            .then(action => updateTask.fulfilled.match(action) && window.location.reload())
            .catch(e => {
                console.log(e);
            });
    });

    const scheduleHandler = handleSubmit(() => {
        dispatch(scheduleTask(task.id)).then(
            action => scheduleTask.fulfilled.match(action) && window.location.reload()
        );
    });

    const unscheduleHandler = () => {
        dispatch(unscheduleTask(task.id)).then(
            action => unscheduleTask.fulfilled.match(action) && window.location.reload()
        );
    };

    const deleteHandler = () => {
        dispatch(deleteTask(task.id)).then(
            action => deleteTask.fulfilled.match(action) && history.replace("/tasks")
        );
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
