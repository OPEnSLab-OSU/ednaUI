import { useEffect, useCallback, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import tw from "twin.macro";
import { capitalize } from "lodash";

import { getNowTask } from "root@redux/actions";
import { useAppDispatch } from "root@redux/store";
import { List } from "components/units/List";

import { notNullish, isNullish } from "lib";
import { useScrollTrackingWithTargets } from "hooks";

import { ConfigListItem } from "./ConfigListItem";
import { configFields } from "./data";
import { TaskForm } from "./TaskForm";

const sectionHeaders = Object.keys(configFields);
export const NowTaskConfig = () => {
    const { match, setPause, setMatch } = useScrollTrackingWithTargets("page", sectionHeaders, {
        throttleMs: 100,
        offset: 50,
    });

    // This function, when called, pauses the tracking of section headers for 2 seconds
    const pauseTracking = useCallback(
        (match?: number) => {
            notNullish(match) && setMatch(match);
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

    const collection = useSelector(state => state.nowTaskCollection);
    const task = collection["0"];
    const dispatch = useAppDispatch();

    //
    // ─── PLACEHOLDER CONTENT ────────────────────────────────────────────────────────
    //
    // If task doesn't exist in the redux store (maybe we refresh?) then fetch it from the server
    const [errorMessage, setErrorMessage] = useState("Loading...");
    if (isNullish(task)) {
        //It's running this, so the task isn't being retrieved correctly. Also hinted at because the get API isn't called.
        const notConnected = "Cannot connect to server. Please check your network connection";
        const timer = setTimeout(() => setErrorMessage(notConnected), 3000);
        const fetching = dispatch(getNowTask());
        fetching.then(action => getNowTask.fulfilled.match(action) && clearTimeout(timer));
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
                        text={capitalize(name)}
                        onClick={pauseTracking}
                    />
                )}
            />
            <TaskForm highlightSection={match} />
        </div>
    );
};
