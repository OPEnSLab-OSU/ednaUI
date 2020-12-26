import { NavLink } from "react-router-dom";
import tw, { styled } from "twin.macro";

import { TaskForm } from "./TaskForm";

const FloatingList = styled.ul`
    ${tw`sticky grid gap-4 content-start h-64 mt-48 top-24 `}
    & > li {
        ${tw`text-right text-secondary`}
    }
    & > li:hover {
        ${tw`text-primary cursor-pointer`}
    }
`;

type MenuHashLinkListItemProps = {
    text: string;
    hash?: string;
};

const MenuHashLinkListItem = ({
    text,
    hash = `#${text.toLowerCase()}`,
}: MenuHashLinkListItemProps) => {
    return (
        <li>
            <NavLink
                to={hash}
                activeStyle={tw`text-primary`}
                isActive={(_, loc) => {
                    return (hash === "#general" && loc.hash === "") || loc.hash === hash;
                }}
                onClick={() => {
                    const page = document.querySelector("#page");
                    const target = document.querySelector(hash);
                    if (page && target) {
                        const top = target.getBoundingClientRect().top - 32;
                        page.scrollBy({ top, behavior: "smooth" });
                    }
                }}>
                {text}
            </NavLink>
        </li>
    );
};

export const TaskConfig = () => {
    return (
        <div
            tw="grid grid-flow-col gap-8 p-8 pb-96 w-full max-w-screen-xl mx-auto"
            css={{ gridTemplateColumns: "min-content 1fr" }}>
            <FloatingList>
                <MenuHashLinkListItem text="General" />
                <MenuHashLinkListItem text="Flush" />
                <MenuHashLinkListItem text="Sample" />
                <MenuHashLinkListItem text="Dry" />
                <MenuHashLinkListItem text="Preserve" />
            </FloatingList>

            <TaskForm />
        </div>
    );
};
