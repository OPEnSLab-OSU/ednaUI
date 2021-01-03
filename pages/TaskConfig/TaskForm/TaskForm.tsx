import { FormEventHandler, Ref, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "twin.macro";

import { TaskServer } from "root@redux/models";

import { ConfigCard } from "../ConfigCard";
import { FormValues, configFields } from "../data";

import { schema } from "../data";
import { SubmitCard } from "../SubmitCard";
import { Parallax } from "components/units/Parallax";
import { useAppDispatch } from "root@redux/store";
import { getTask } from "root@redux/actions";

/**
 * Convert task schedule to date YYYY-MM-DD format
 * @param schedule UTC in seconds
 */
function toDateString(schedule?: number) {
    const date = new Date((schedule ?? 0) * 1000);
    const components = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    return components.map(c => c.toString().padStart(2, "0")).join("-");
}

/**
 * Convert task schedule to time hh:mm format
 * @param schedule UTC in seconds
 */
function toTimeString(schedule?: number) {
    const date = new Date((schedule ?? 0) * 1000);
    const components = [date.getHours(), date.getMinutes()];
    return components.map(c => c.toString().padStart(2, "0")).join(":");
}

function secondsToTimeComponents(seconds?: number) {
    seconds = seconds ?? 0;
    const day = Math.floor(seconds / (3600 * 24));
    const hour = Math.floor((seconds % (3600 * 24)) / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);
    return { day, hour, minute: min, second: sec } as const;
}

/**
 * This function mutates the inputs
 * @param task
 * @param defaultValues MUTATION
 */
function taskToFormValues(task: TaskServer | undefined, defaultValues: FormValues): FormValues {
    if (!task) {
        return defaultValues;
    }

    return {
        name: task.name,
        date: toDateString(task.schedule),
        time: toTimeString(task.schedule),
        timeBetween: task.timeBetween,
        valves: task.valves.join(","),
        flushTime: task.flushTime,
        flushVolume: task.flushVolume,
        sampleTime: task.sampleTime,
        samplePressure: task.samplePressure,
        sampleVolume: task.sampleVolume,
        dryTime: task.dryTime,
        preserveTime: task.preserveTime,
    };
}

declare function formValuesToTask(formValues: FormValues): TaskServer;

const configSections = Object.values(configFields);

export const TaskForm = ({ highlightSection }: { highlightSection: number }) => {
    const { taskId } = useParams<{ taskId: string }>();
    const collection = useSelector(state => state.taskCollection);
    const task = collection[taskId];

    const [defaultValues] = useState(() =>
        taskToFormValues(task, {
            name: "",
            date: "2020-12-25",
            time: "12:00",
            timeBetween: 0,
            valves: "0",
            flushTime: 0,
            flushVolume: 0,
            sampleTime: 0,
            sampleVolume: 0,
            samplePressure: 0,
            dryTime: 0,
            preserveTime: 0,
        })
    );

    const methods = useForm({
        defaultValues: {},
        resolver: zodResolver(schema),
    });

    const submitHandler: FormEventHandler<HTMLFormElement> = event => {
        methods.handleSubmit(_ => {
            console.log("Submitting");
        })(event);
    };

    return (
        <FormProvider {...methods}>
            <form
                tw="grid gap-8 grid-flow-col w-full"
                css={{ gridTemplateColumns: "minmax(24rem, 30rem) minmax(14rem, 1fr)" }}
                onSubmit={submitHandler}>
                <div tw="grid gap-8">
                    <h1 tw="text-display text-primary">Task Configuration</h1>
                    <div tw="text-overline text-secondary">
                        <span tw="font-bold">{methods.watch("name")}</span>(ID: #{taskId}), Created
                        on: {task?.createdAt ?? "MM/DD/YYYY"}
                    </div>
                    {configSections.map(({ title, fields }, index) => (
                        <Parallax
                            key={title}
                            perspective={400}
                            render={(ref: Ref<HTMLDivElement>) => (
                                <ConfigCard
                                    ref={ref}
                                    title={title}
                                    fields={fields}
                                    highlight={index === highlightSection}
                                />
                            )}
                        />
                    ))}
                </div>

                <SubmitCard />
            </form>
        </FormProvider>
    );
};
