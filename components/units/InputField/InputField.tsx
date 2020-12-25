import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import tw from "twin.macro";

export type InputFieldProps = ComponentPropsWithoutRef<"input"> & {
    name: string;
    label: string;
    sublabel?: string;
    helperText?: string;
    error?: string;
    mapChildren?: (items: ReactNode[]) => ReactNode[];
};

const LabelSpan = tw.span`flex justify-between items-center`;
const HelperSpan = tw.span`flex justify-start text-xs text-gray-500`;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
    const { name, label, sublabel, helperText, mapChildren, error, ...inputProps } = props;

    const defaultItemList: ReactNode[] = [
        <LabelSpan key="label">
            <span tw="text-sm" className="label">
                {label + (props.required ? " *" : "")}
            </span>
            <span tw="text-xs text-secondary" className="sublabel">
                {sublabel}
            </span>
        </LabelSpan>,
        <input
            key="input"
            tw="form-input text-sm bg-transparent border border-primary rounded"
            name={name}
            ref={ref}
            {...inputProps}
        />,
        helperText && (
            <HelperSpan key="helper" className="helperText">
                {helperText}
            </HelperSpan>
        ),
        error && <p tw="text-sm text-red-700 bg-red-200 p-2 rounded">{error}</p>,
    ].filter(Boolean);

    const itemList = mapChildren ? mapChildren(defaultItemList) : defaultItemList;
    return <label tw="grid gap-2">{itemList}</label>;
});

InputField.displayName = "InputField";
