import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import tw, { styled } from "twin.macro";

interface SVGButtonProps {
    width?: number;
    height?: number;
    text?: string;
    to: string;
}

const StyledNavLink = styled(NavLink)`
    ${tw`flex items-center px-8 text-sm tracking-wide text-secondary lg:px-12 hover:bg-background`}
`;

const SVGNavLink: FC<SVGButtonProps> = ({ width = 24, height = 24, text, to, children }) => {
    return (
        <StyledNavLink to={to} activeStyle={tw`border-r-4 border-accent text-primary`}>
            <div tw="flex items-center">
                <svg
                    tw="fill-current lg:mr-4"
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    xmlns="http://www.w3.org/2000/svg">
                    {children}
                </svg>
                <div tw="hidden lg:block">{text}</div>
            </div>
        </StyledNavLink>
    );
};

const SidebarContainer = styled.div``;

export const Sidebar = () => {
    return (
        <div
            tw="grid flex-shrink-0 h-screen overflow-y-scroll z-10 shadow-xl"
            css={"grid-template-rows: 88px 64px; grid-auto-rows: 100px;"}>
            <div
                tw="hidden grid-flow-col gap-4 text-xl lg:grid items-center justify-center mt-8"
                css={{ letterSpacing: "1rem" }}>
                <span tw="px-2 py-2 tracking-normal text-white rounded-md bg-accent">E</span>
                <span tw="">DNA</span>
            </div>
            <div tw="flex items-center w-full text-3xl text-white bg-accent justify-center lg:hidden">
                E
            </div>
            <div />
            <SVGNavLink text="Documentation" to="/documentation">
                <path d="M18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2H13C13.0109 2.00047 13.0217 2.00249 13.032 2.006C13.0418 2.00902 13.0518 2.01103 13.062 2.012C13.1502 2.01765 13.2373 2.0348 13.321 2.063L13.349 2.072C13.3717 2.07968 13.3937 2.08904 13.415 2.1C13.5239 2.14842 13.6232 2.21618 13.708 2.3L19.708 8.3C19.7918 8.38479 19.8596 8.48406 19.908 8.593C19.918 8.615 19.925 8.638 19.933 8.661L19.942 8.687C19.9699 8.77039 19.9864 8.85718 19.991 8.945C19.9926 8.95418 19.9949 8.96322 19.998 8.972C19.9998 8.98122 20.0004 8.99062 20.0001 9V20C20.0001 21.1046 19.1046 22 18 22ZM6 4V20H18V10H13C12.4477 10 12 9.55228 12 9V4H6ZM14 5.414V8H16.586L14 5.414Z" />
            </SVGNavLink>
            <SVGNavLink text="Monitoring" to="/monitoring">
                <path d="M21 21.125H4C3.44772 21.125 3 20.6773 3 20.125V3.125H5V19.125H21V21.125ZM8.373 16.125L7 14.781L11.856 10.025C12.2383 9.65348 12.8467 9.65348 13.229 10.025L15.456 12.206L19.627 8.125L21 9.469L16.144 14.225C15.7617 14.5965 15.1533 14.5965 14.771 14.225L12.543 12.043L8.374 16.125H8.373Z" />
            </SVGNavLink>
            <SVGNavLink text="Tasks" to="/tasks">
                <path d="M16 22.875H4C2.89543 22.875 2 21.9796 2 20.875V8.875H4V20.875H16V22.875ZM20 18.875H8C6.89543 18.875 6 17.9796 6 16.875V4.875C6 3.77043 6.89543 2.875 8 2.875H20C21.1046 2.875 22 3.77043 22 4.875V16.875C22 17.9796 21.1046 18.875 20 18.875ZM8 4.875V16.875H20V4.875H8ZM15 14.875H13V11.875H10V9.875H13V6.875H15V9.875H18V11.875H15V14.875Z" />
            </SVGNavLink>
            <SVGNavLink text="Utilities" to="/utilities">
                <path d="M12 23.625L2.5 18.125V7.125L12 1.625L21.5 7.125V18.125L12 23.625ZM12 3.937L4.5 8.278V16.972L12 21.314L19.5 16.972V8.278L12 3.936V3.937ZM12 16.625C10.9395 16.622 9.92294 16.2009 9.171 15.453C8.02724 14.3089 7.68525 12.5885 8.30448 11.0939C8.92371 9.59936 10.3822 8.625 12 8.625C13.0603 8.62784 14.0765 9.04902 14.828 9.797C16.3895 11.359 16.3895 13.891 14.828 15.453C14.0764 16.2007 13.0602 16.6218 12 16.625ZM12 10.625C11.0458 10.6248 10.2244 11.2986 10.0381 12.2344C9.85175 13.1702 10.3524 14.1073 11.2339 14.4726C12.1153 14.8379 13.1321 14.5297 13.6623 13.7364C14.1926 12.9432 14.0886 11.8858 13.414 11.211C13.0398 10.8348 12.5307 10.6238 12 10.625Z" />
            </SVGNavLink>
        </div>
    );
};
