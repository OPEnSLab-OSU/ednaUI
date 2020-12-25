import tw from "twin.macro";
import { ReactNode } from "react";
import { CSSProp } from "styled-components";

type TCardProps = {
    title?: string;
    titleStyles?: CSSProp;
    className?: string;
    children?: ReactNode;
};

const Title = tw.div`pb-4 text-title font-bold tracking-tight text-primary`;
export const Card = ({ title, titleStyles, className, children }: TCardProps) => {
    return (
        <div tw="p-8 rounded-lg" className={className}>
            {title && <Title css={titleStyles}>{title}</Title>}
            <div>{children}</div>
        </div>
    );
};
