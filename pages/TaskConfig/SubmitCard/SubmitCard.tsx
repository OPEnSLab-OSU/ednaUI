import "twin.macro";

import { Card } from "components/modules/Card";
import { Button } from "components/units/Button";
import { useFormContext } from "react-hook-form";

import { FormValues } from "../data";

export const SubmitCard = () => {
    const { formState, reset } = useFormContext<FormValues>();
    return (
        <Card
            tw="p-0 h-72 sticky self-start whitespace-nowrap w-full max-w-xs"
            title="Submit Task"
            css={{
                top: "48px",
                marginTop: "120px",
            }}>
            <div tw="grid gap-4">
                <div tw="text-subtitle text-secondary flex whitespace-normal">
                    Task will be sent to the server for verification. If successful, it will be
                    scheduled immediately.
                </div>
                <Button tw="text-white bg-accent w-full" text="SUBMIT" type="submit" />
                <div tw="text-subtitle text-secondary">Not ready yet?</div>
                <div
                    tw="grid gap-4"
                    css={{ gridTemplateColumns: "repeat(auto-fit, minmax(8rem, 1fr))" }}>
                    <Button
                        tw="bg-transparent border border-accent text-accent shadow-none
                hover:(shadow-none font-bold)"
                        text="CANCEL"
                        disabled={!formState.isDirty}
                        onClick={() => {
                            reset({});
                        }}
                    />
                    <Button
                        tw="bg-transparent border-accent border text-accent shadow-none
                hover:(shadow-none font-bold)"
                        text="SAVE DRAFT"
                        disabled={!formState.isDirty}
                    />
                </div>
            </div>
        </Card>
    );
};
