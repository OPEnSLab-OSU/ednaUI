import { Link, useLocation } from "react-router-dom";
import tw, { styled } from "twin.macro";
import { ChevronRight, Layout } from "react-feather";

import { titleCase } from "lib";

const StyledLink = styled(Link)<{ disabled?: boolean }>`
    ${tw`text-sm text-primary hover:underline`}
    ${props => props.disabled && tw`pointer-events-none`}
`;

const Home = () => (
    <StyledLink to="/" tw="flex items-center">
        <Layout />
        <div tw="ml-2">EDNA Dashboard</div>
    </StyledLink>
);

const GridContainer = tw.div`grid items-center w-full grid-flow-col auto-cols-max gap-4 px-8`;

export const Breadcrumb = () => {
    const location = useLocation();
    const paths = location.pathname.split("/").filter(Boolean);
    const cookies: { to: string; text: string }[] = paths.map((p, index) => ({
        to: "/" + paths.slice(0, index + 1).join("/"),
        text: p,
    }));

    return (
        <GridContainer>
            <Home />
            <ChevronRight />
            {cookies.map(({ to, text }, index) => (
                <>
                    <StyledLink to={to} disabled={index === paths.length - 1}>
                        {titleCase(text)}
                    </StyledLink>
                    {index < paths.length - 1 && <ChevronRight />}
                </>
            ))}
        </GridContainer>
    );
};
