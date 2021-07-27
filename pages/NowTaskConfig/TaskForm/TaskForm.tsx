import { Ref, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "twin.macro";

import { mapTaskStatusToString, NowTaskServer } from "root@redux/models";
import { Parallax } from "components/units/Parallax";
import { isNullish } from "lib";

import { SubmitCard } from "../SubmitCard";
import { ConfigCard } from "../ConfigCard";
import { FormValues, configFields, FormSchema } from "../data";

/**
 * This function mutates the inputs
 * @param task
 * @param defaultValues MUTATION
 */
function taskToFormValues(task: NowTaskServer | undefined, defaultValues: FormValues): FormValues {
    if (!task) {
        return defaultValues;
    }
    const result = {
        ...defaultValues,
        currentValve: task.currentValve,
    };

    ([
        "flushTime",
        "sampleTime",
        "sampleVolume",
        "samplePressure",
        "dryTime",
        "preserveTime",
        "currentValve",
    ] as const).forEach(f => {
        result[f] = task[f];
    });

    return result;
}

const configSections = Object.values(configFields);

export const TaskForm = ({ highlightSection }: { highlightSection: number }) => {
    const task = useSelector(state => state.nowTaskCollection["0"]);

    const [defaultValues] = useState(() =>
        taskToFormValues(task, {
            flushTime: 0,
            sampleTime: 0,
            sampleVolume: 0,
            samplePressure: 0,
            dryTime: 0,
            preserveTime: 0,
        })
    );

    const methods = useForm({
        defaultValues,
        resolver: zodResolver(FormSchema),
    });

    if (isNullish(task)) {
        return null;
    }

    return (
        <FormProvider {...methods}>
            <form
                tw="grid gap-8 grid-flow-col w-full"
                css={{ gridTemplateColumns: "minmax(24rem, 30rem) minmax(14rem, 1fr)" }}>
                <div tw="grid gap-8">
                    <h1 tw="text-display text-primary">Task Configuration</h1>
                    <div tw="text-overline text-secondary">
                        <span tw="font-bold">{methods.watch("name")}</span>
                        Status: ({mapTaskStatusToString[task.status]})
                    </div>
                    {configSections.map(({ title, fields }, index) => (
                        <Parallax
                            key={title}
                            perspective={1600}
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
