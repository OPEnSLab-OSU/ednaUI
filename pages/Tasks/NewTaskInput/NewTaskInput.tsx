import { MouseEventHandler, RefObject, useEffect, useRef, useState } from "react";
import "twin.macro";

import { Button } from "components/units/Button";
import { Check, Crosshair, X } from "react-feather";

export type NewTaskInputProps = {
    onSubmit: MouseEventHandler<HTMLButtonElement>;
    onCancel: MouseEventHandler<HTMLButtonElement>;
};

export const NewTaskInput = ({ onSubmit, onCancel }: NewTaskInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <>
            <div
                tw="fixed grid place-content-center bg-black top-0 left-0 h-screen w-screen z-50"
                css={"opacity: 85%"}
            />

            <div tw="fixed grid place-items-center top-0 left-0 h-screen w-screen z-50 p-10">
                <div
                    tw="bg-trueGray-100 grid place-items-center h-full shadow-xl rounded"
                    css={"width: calc(100vw - 100px); grid-template-rows: 1fr min-content;"}>
                    <label tw="grid gap-4 max-w-screen-md w-full">
                        <span tw="text-title font-normal text-primary whitespace-nowrap self-center">
                            Enter new task name
                        </span>
                        <input
                            tw="form-input text-xl bg-transparent border border-secondary rounded flex-1"
                            ref={inputRef}
                            type="text"
                        />

                        <div tw="grid grid-flow-col gap-4 justify-start items-center">
                            <Button
                                tw="uppercase p-3 bg-teal-500 text-white flex-shrink justify-self-start"
                                text="OK"
                                icon={<Check size={20} />}
                                iconRight
                                onClick={onSubmit}
                            />
                            <span>
                                or press <span tw="text-sm font-bold">Enter ⏎</span>
                            </span>
                        </div>
                    </label>
                    <Button
                        tw="uppercase bg-transparent shadow-none mb-10 hover:(shadow-none text-accent)"
                        text="close"
                        icon={<X />}
                        onClick={onCancel}
                    />
                </div>
            </div>
        </>
    );
};
