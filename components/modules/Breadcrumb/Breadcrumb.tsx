import { Link, useLocation } from "react-router-dom";

import tw from "twin.macro";

import { titleCase } from "lib";

import { ChevronRight, Layout } from "react-feather";

const Home = () => (
    <Link to="/" tw="flex items-center text-sm text-primary">
        <Layout />
        <div tw="ml-1">EDNA Dashboard</div>
    </Link>
);

const GridContainer = tw.div`grid items-center w-full grid-flow-col auto-cols-max gap-4 px-8`;

export const Breadcrumb = () => {
    const location = useLocation();
    const paths: { to: string; text: string }[] = location.pathname
        .split("/")
        .slice(1)
        .map((p, index) => ({ to: "/" + paths.slice(0, index + 1).join("/"), text: p }));

    return (
        <GridContainer>
            <Home />
            <ChevronRight />
            {paths.map(({ to, text }, index) => (
                <>
                    <Link to={to} tw="text-sm text-primary hover:underline">
                        {titleCase(text)}
                    </Link>
                    {index < paths.length - 1 && <ChevronRight />}
                </>
            ))}
        </GridContainer>
    );
};
