import { NavLink, useHistory } from "react-router-dom";
import tw, { styled } from "twin.macro";

import { TaskForm } from "./TaskForm";

import { configFields } from "./data";
import { titleCase } from "lib";
import { useScrollTrackingWithTargets } from "hooks";
import { useEffect, useCallback, useMemo } from "react";

import { debounce } from "lodash";

type MenuHashLinkListItemProps = {
    text: string;
    index: number;
    hash?: string;
    pauseScrolling: (match: number) => void;
};

const MenuHashLinkListItem = ({
    text,
    hash = `#${text.toLowerCase()}`,
    index,
    pauseScrolling,
}: MenuHashLinkListItemProps) => {
    const clickHandler = () => {
        pauseScrolling(index);
        const page = document.querySelector("#page");
        const target = document.querySelector(hash);
        if (page && target) {
            const top = target.getBoundingClientRect().top - 32;
            page.scrollBy({ top, behavior: "smooth" });
        }
    };

    return (
        <li tw="flex">
            <NavLink
                tw="text-right text-secondary py-2 w-full hover:(text-primary cursor-pointer)"
                to={hash}
                activeStyle={tw`text-primary`}
                isActive={(_, loc) => (hash === "#general" && !loc.hash) || loc.hash === hash}
                onClick={clickHandler}>
                {text}
            </NavLink>
        </li>
    );
};

const FloatingList = styled.ul`
    ${tw`sticky grid content-start h-64 mt-48 top-24 `}
`;
const configSections = Object.keys(configFields);

export const TaskConfig = () => {
    const [match, pause, setPause, setMatch] = useScrollTrackingWithTargets(
        "page",
        configSections,
        100
    );
    const history = useHistory();

    const resumeTracking = useMemo(
        () =>
            debounce(() => {
                console.log("Resume tracking");
                setPause(false);
            }, 300),
        [setPause]
    );

    const pauseTracking = useCallback(
        (match: number) => {
            setMatch(match);
            setPause(true);
        },
        [setMatch, setPause]
    );

    useEffect(() => {
        // Poll the resume scrolling function when the user scrolls
        // We check for pause to prevent updating the url
        if (pause) {
            resumeTracking();
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
                        pauseScrolling={pauseTracking}
                    />
                ))}
            </FloatingList>

            <TaskForm highlightSection={match} />
        </div>
    );
};
