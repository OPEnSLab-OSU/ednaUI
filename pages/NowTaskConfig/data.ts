import z, { string, number, object } from "zod";

export const FormSchema = object({
/*     name: string().max(24),
    date: string().refine(str => str.match(/\d{4}-\d{2}-\d{2}/), {
        message: "Date doesn't match the required form at: yyyy-mm-dd",
    }),
    time: string().refine(str => str.match(/\d{1,2}:\d{1,2}/), {
        message: "Time doesn't match the required format: hh:mm (24hr)",
    }),
    valves: string()
        .nonempty()
        .refine(s => s.split(",").every(n => !isNaN(Number(n))), {
            message: "Input contains non-numeric character or doesn't follow the format",
        })
        .refine(s => s.split(",").every(n => ValveSchema.safeParse(Number(n)).success), {
            message: "Valve number must be >= 0 and <= 23",
        }),
    timeBetween: number().min(0),
    notes: string().optional(), */
    flushTime: number().min(0),
    sampleTime: number().min(0),
    sampleVolume: number().min(0),
    samplePressure: number().min(0),
    dryTime: number().min(0),
    preserveTime: number().min(0),
});

export type FormValues = z.infer<typeof FormSchema>;

export type FieldProps = {
    name: keyof FormValues;
    label: string;
    type?: "string" | "number" | "button";
    sublabel?: string;
    helperText?: string;
};



export const flushFields: FieldProps[] = [
    { name: "flushTime", type: "number", label: "Flush Time", helperText: "Unit: second" },
    // { name: "flushVolume", type: "number", label: "Flush Volume" },
];

export const sampleFields: FieldProps[] = [
    { name: "sampleTime", type: "number", label: "Sample Time", helperText: "Unit: second" },
    { name: "sampleVolume", type: "number", label: "Sample Volume", helperText: "Unit: liter" },
    { name: "samplePressure", type: "number", label: "Sample Pressure", helperText: "Unit: psi" },
];

export const dryFields: FieldProps[] = [
    { name: "dryTime", type: "number", label: "Dry Time", helperText: "Unit: second" },
];
export const preserveFields: FieldProps[] = [
    { name: "preserveTime", type: "number", label: "Preserve Time", helperText: "Unit: second" },
];

export type ConfigSectionName = "flush" | "sample" | "dry" | "preserve";
export const configFields: Record<ConfigSectionName, { title: string; fields: FieldProps[] }> = {
    flush: { title: "Flush", fields: flushFields },
    sample: { title: "Sample", fields: sampleFields },
    dry: { title: "Dry", fields: dryFields },
    preserve: { title: "Preserve", fields: preserveFields },
};
