import { NavLink, useHistory, useLocation } from "react-router-dom";
import tw, { styled } from "twin.macro";

import { TaskForm } from "./TaskForm";

import { configFields } from "./data";
import { titleCase } from "lib";
import { useScrollTracking, useScrollTrackingWithTargets } from "hooks";
import { useState, useEffect, useCallback, useRef } from "react";

import { debounce, throttle } from "lodash";

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
    index: number;
    hash?: string;
    disableScrolling: () => void;
};

const MenuHashLinkListItem = ({
    text,
    hash = `#${text.toLowerCase()}`,
    disableScrolling,
}: MenuHashLinkListItemProps) => {
    const clickHandler = () => {
        disableScrolling();
        const page = document.querySelector("#page");
        const target = document.querySelector(hash);
        if (page && target) {
            const top = target.getBoundingClientRect().top - 32;
            page.scrollBy({ top, behavior: "smooth" });
        }
    };

    return (
        <li>
            <NavLink
                to={hash}
                activeStyle={tw`text-primary`}
                isActive={(_, loc) => (hash === "#general" && !loc.hash) || loc.hash === hash}
                onClick={clickHandler}>
                {text}
            </NavLink>
        </li>
    );
};

const configSections = Object.keys(configFields);

export const TaskConfig = () => {
    const [match, pause, setPause] = useScrollTrackingWithTargets("page", configSections, 100);
    const history = useHistory();

    const resumeTracking = useRef(
        debounce(() => {
            console.log("Resume tracking");
            setPause(false);
        }, 300)
    );

    useEffect(() => {
        // Poll the resume scrolling function when the user scrolls
        // We check for pause to prevent updating the url
        if (pause) {
            resumeTracking.current();
            return;
        }

        (function updateHashHistory() {
            // Push new hash to url if match is not the same as current hash
            const hash = `#${configSections[match]}`;
            if (history.location.hash != hash) {
                history.push(hash);
            }
        })();

        //eslint-disable-next-line
    }, [match, pause]);

    console.log(match);

    return (
        <div
            tw="grid grid-flow-col gap-8 p-8 w-full max-w-screen-xl mx-auto"
            css={{ gridTemplateColumns: "min-content 1fr", paddingBottom: "100% + 100vh" }}>
            <FloatingList>
                {Object.keys(configFields).map((name, i) => (
                    <MenuHashLinkListItem
                        key="name"
                        index={i}
                        text={titleCase(name)}
                        disableScrolling={() => setPause(true)}
                    />
                ))}
            </FloatingList>

            <TaskForm highlightSection={match} />
        </div>
    );
};
