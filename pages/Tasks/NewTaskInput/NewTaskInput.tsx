import { MouseEventHandler } from "react";
import "twin.macro";

import { Button } from "components/units/Button";

export type NewTaskInputProps = {
    onCancel: MouseEventHandler<HTMLButtonElement>;
    onSubmit: MouseEventHandler<HTMLButtonElement>;
};

export const NewTaskInput = ({ onCancel, onSubmit }: NewTaskInputProps) => {
    return (
        <label tw="grid grid-flow-col gap-4 items-center">
            <span tw="text-subtitle">Enter new task name</span>
            <input type="text" tw="form-input bg-transparent border border-secondary rounded" />
            <Button tw="text-overline" text="Cancel" onClick={onCancel} />
            <Button tw="text-overline bg-accent text-white" text="Create" onClick={onSubmit} />
        </label>
    );
};
