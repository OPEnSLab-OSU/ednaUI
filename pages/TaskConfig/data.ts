import * as z from "zod";

export const schema = z.object({
    name: z.string().max(24),
    date: z.string().refine(str => str.match(/\d{4}-\d{2}-\d{2}/), {
        message: "Date doesn't match the required form at: yyyy-mm-dd",
    }),
    time: z.string().refine(str => str.match(/\d{1,2}:\d{1,2}/), {
        message: "Time doesn't match the required format: hh:mm (24hr)",
    }),
    valves: z.string(),
    timeBetween: z.number().positive(),
    notes: z.string().optional(),
    flushTime: z.number().positive(),
    flushVolume: z.number().positive(),
    sampleTime: z.number().positive(),
    sampleVolume: z.number().positive(),
    samplePressure: z.number().positive(),
    dryTime: z.number().positive(),
    preserveTime: z.number().positive(),
});

export type FormValues = z.infer<typeof schema>;

export type FieldProps = {
    name: keyof FormValues;
    label: string;
    type?: "string" | "number" | "date" | "time";
    sublabel?: string;
    helperText?: string;
};

export const generalFields: FieldProps[] = [
    { name: "name", label: "Task Name", sublabel: "Name unique to this task" },
    {
        name: "date",
        type: "date",
        label: "Schedule Date",
        sublabel: "Date when to execute this task",
        helperText: "Format: yyyy/mm/dd",
    },
    {
        name: "time",
        type: "time",
        label: "Schedule Time",
        sublabel: "Time of the day to execute this task",
        helperText: "Format: hh:mm (pm|am)",
    },
    {
        name: "valves",
        label: "Valves",
        sublabel: "Valves asigned to this task",
        helperText: "Comma-separated valve numbers: eg. 1,2,3,4",
    },
    {
        name: "timeBetween",
        label: "Time Between",
        sublabel: "Time until next valve",
    },
    {
        name: "notes",
        label: "Notes",
        sublabel: "Optional note to remember this task",
    },
];

export const flushFields: FieldProps[] = [
    { name: "flushTime", type: "number", label: "Flush Time" },
    { name: "flushVolume", type: "number", label: "Flush Volume" },
];

export const sampleFields: FieldProps[] = [
    { name: "sampleTime", type: "number", label: "Sample Time" },
    { name: "sampleVolume", type: "number", label: "Sample Volume" },
    { name: "samplePressure", type: "number", label: "Sample Pressure" },
];

export const dryFields: FieldProps[] = [{ name: "dryTime", type: "number", label: "Dry Time" }];
export const preserveFields: FieldProps[] = [
    { name: "preserveTime", type: "number", label: "Preserve Time" },
];

export const configFields = {
    general: { title: "General", fields: generalFields },
    flush: { title: "Flush", fields: flushFields },
    sample: { title: "Sample", fields: sampleFields },
    dry: { title: "Dry", fields: dryFields },
    preserve: { title: "Preserve", fields: preserveFields },
};
