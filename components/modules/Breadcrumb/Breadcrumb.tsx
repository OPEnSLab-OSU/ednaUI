import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import tw from "twin.macro";

function titleCase(str: string) {
    return str
        .toLowerCase()
        .split(" ")
        .filter(word => word)
        .map(word => word.replace(word[0], word[0].toUpperCase()))
        .join(" ");
}

const Seperator = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M15.713 12L9.70202 5.99001L8.28802 7.40401L12.888 12.004L8.28802 16.597L9.70202 18.011L15.713 12Z"
            fill="#2E3A59"
        />
    </svg>
);

const GridContainer = tw.div`grid items-center flex-shrink-0 w-full h-20 grid-flow-col gap-4 px-8 auto-cols-max`;

export const Breadcrumb: FC = () => {
    const location = useLocation();
    const paths = location.pathname.split("/").slice(1);
    return (
        <GridContainer>
            <div tw="flex items-center text-sm text-primary">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M19 19H13V13H19V19ZM11 19H5V13H11V19ZM19 11H13V5H19V11ZM11 11H5V5H11V11Z"
                        fill="#2E3A59"
                    />
                </svg>
                <div tw="ml-1">EDNA Dashboard</div>
            </div>
            <Seperator />
            {paths.map((p, index) => (
                <>
                    <Link
                        to={"/" + paths.slice(0, index + 1).join("/")}
                        tw="text-sm text-primary hover:underline">
                        {titleCase(p)}
                    </Link>
                    {index < paths.length - 1 && <Seperator />}
                </>
            ))}
        </GridContainer>
    );
};
