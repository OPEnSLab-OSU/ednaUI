import tw, { styled } from "twin.macro";
import { useFormContext } from "react-hook-form";

import { Card } from "components/modules/Card";
import { InputField } from "components/units/InputField";

import { FormValues, FieldProps } from "../data";

const StyledCard = styled(Card)`
    & > div {
        ${tw`grid gap-8`}
    }

    & > div:first-child {
        ${tw`pb-8`}
    }
`;

export type ConfigCardProps = {
    title: string;
    className?: string;
    fields: FieldProps[];
};

export const ConfigCard = ({ title, className, fields }: ConfigCardProps) => {
    const { register, errors } = useFormContext<FormValues>();
    return (
        <StyledCard title={title} tw="bg-white shadow-lg" className={className}>
            {fields.map(props => (
                <InputField
                    key={props.name}
                    ref={register}
                    error={errors[props.name]?.message}
                    {...props}
                />
            ))}
        </StyledCard>
    );
};
