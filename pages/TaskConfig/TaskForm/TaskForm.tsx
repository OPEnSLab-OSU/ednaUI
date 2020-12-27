import { FormEventHandler } from "react";
import { useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "twin.macro";

import { ConfigCard } from "../ConfigCard";
import { FormValues, configFields } from "../data";

import { schema } from "../data";
import { SubmitCard } from "../SubmitCard";

export const TaskForm = ({ highlightSection }: { highlightSection: number }) => {
    const { taskname } = useParams<{ taskname: string }>();

    const defaultValues: FormValues & Record<string, unknown> = {
        name: taskname,
        date: "2020-12-25",
        time: "0",
        timeBetween: 0,
        valves: "0",
        flushTime: 0,
        flushVolume: 0,
        sampleTime: 0,
        sampleVolume: 0,
        samplePressure: 0,
        dryTime: 0,
        preserveTime: 0,
    };

    const methods = useForm<FormValues>({
        defaultValues,
        resolver: zodResolver(schema),
    });

    const { handleSubmit, watch } = methods;

    const submitHandler: FormEventHandler<HTMLFormElement> = event => {
        handleSubmit(e => {
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
                        <span tw="font-bold">{watch("name")}</span>(ID: #xxxxxx), Created on:
                        mm/dd/yyyy
                    </div>
                    {Object.values(configFields).map(({ title, fields }, index) => (
                        <ConfigCard
                            key={title}
                            title={title}
                            fields={fields}
                            highlight={index === highlightSection}
                        />
                    ))}
                </div>

                <SubmitCard />
            </form>
        </FormProvider>
    );
};
