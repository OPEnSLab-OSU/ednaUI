import { useEffect, useCallback, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import tw, { styled } from "twin.macro";

import { getTask, getTaskCollection } from "root@redux/actions";
import { useAppDispatch } from "root@redux/store";
import { List } from "components/units/List";

import { notUndefined, titleCase } from "lib";
import { useScrollTrackingWithTargets } from "hooks";

import { TaskForm } from "./TaskForm";
import { configFields } from "./data";
import { ConfigListItem } from "./ConfigListItem";

const sectionHeaders = Object.keys(configFields);
export const TaskConfig = () => {
    const { match, setPause, setMatch } = useScrollTrackingWithTargets("page", sectionHeaders, {
        throttleMs: 100,
        offset: 50,
    });

    // This function when called pause the tracking of section headers for 2 seconds
    const pauseTracking = useCallback(
        (match?: number) => {
            notUndefined(match) && setMatch(match);
            setPause(true);
            setTimeout(() => setPause(false), 2000);
        },
        [setMatch, setPause]
    );

    // Update history based on the match from section
    const history = useHistory();
    useEffect(() => {
        const hash = `#${sectionHeaders[match]}`;
        hash !== history.location.hash && history.replace(hash);
    }, [match]); //eslint-disable-line

    const { taskId } = useParams<{ taskId: string }>();
    const collection = useSelector(state => state.taskCollection);
    const task = collection[taskId];
    const dispatch = useAppDispatch();

    //
    // ─── PLACEHOLDER CONTENT ────────────────────────────────────────────────────────
    //
    // If task doesn't exist in the redux store (maybe we refresh?) then fetch it from the server
    const [errorMessage, setErrorMessage] = useState("Loading...");
    if (!notUndefined(task)) {
        const notConnected = "Cannot connect to server. Please check your network connection";
        const timer = setTimeout(() => setErrorMessage(notConnected), 3000);
        const fetching = dispatch(getTask(taskId));
        fetching.then(action => getTask.fulfilled.match(action) && clearTimeout(timer));
        return (
            <div tw="grid place-content-center w-full h-full">
                <div tw="text-xl animate-bounce">{errorMessage}</div>
            </div>
        );
    }

    //
    // ─── ACTUAL CONTENT ─────────────────────────────────────────────────────────────
    //
    return (
        <div
            tw="grid grid-flow-col gap-8 p-8 w-full max-w-screen-xl mx-auto"
            css={{ gridTemplateColumns: "min-content 1fr", paddingBottom: "100% + 100vh" }}>
            <List
                tw="sticky grid content-start h-64 mt-48 top-24"
                items={sectionHeaders}
                renderItem={(name, i) => (
                    <ConfigListItem
                        key="name"
                        index={i}
                        text={titleCase(name)}
                        onClick={pauseTracking}
                    />
                )}
            />
            <TaskForm highlightSection={match} />
        </div>
    );
};
