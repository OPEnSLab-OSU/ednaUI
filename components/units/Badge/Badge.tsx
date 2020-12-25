import { forwardRef } from "react";

interface Props {
    text?: string;
    className?: string;
}

export const Badge = forwardRef<HTMLDivElement, Props>((props, ref) => {
    return (
        <div tw="flex justify-center round-full" className={props.className} ref={ref}>
            {props.text}
        </div>
    );
});
