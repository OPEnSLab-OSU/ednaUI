import tw, { css } from "twin.macro";
import { useFormContext } from "react-hook-form";

import { InputField, InputFieldProps } from "components/units/InputField";

import { FormValues, FieldProps } from "../data";

export type ConfigCardProps = {
    title: string;
    className?: string;
    fields: FieldProps[];
};

export const ConfigCard = ({ title, className, fields }: ConfigCardProps) => {
    const { register, errors } = useFormContext<FormValues>();
    return (
        <div
            id={title.toLowerCase()}
            tw="p-8 grid gap-8 bg-white shadow-lg rounded-xl"
            className={className}>
            <h3 tw="text-title text-primary">{title}</h3>
            {fields.map(props => (
                <InputField
                    key={props.name}
                    ref={register}
                    error={errors[props.name]?.message}
                    {...props}
                />
            ))}
        </div>
    );
};
