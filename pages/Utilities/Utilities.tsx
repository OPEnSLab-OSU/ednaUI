import tw, { styled } from "twin.macro";
import { Ref } from "react";

import { Tool } from "react-feather";

import { Parallax } from "components/units/Parallax";
import { get, post } from "app/http";

const Tile = styled.div`
    ${tw`relative grid h-56 p-4 rounded-md bg-white text-subtitle text-secondary shadow-2xl hover:(cursor-pointer bg-gray-800)`}
    grid-template-rows: min-content min-content 1fr;
`;

const PageContainer = styled.main`
    ${tw`mx-auto max-w-screen-xl grid gap-8 p-8 w-full`}
    grid-template-columns: repeat(auto-fit, minmax(240px, 60ch));
`;

function HyperFlush() {
    const clickHandler = () => {
        get("api/preload")
            .withTimeout(1000)
            .send()
            .then(() => {
                alert("HyperFlush started");
            });
    };
    return (
        <Parallax
            perspective={800}
            render={(ref: Ref<HTMLDivElement>) => (
                <Tile className="group" ref={ref} onClick={clickHandler}>
                    <p tw="col-span-full">Tool</p>
                    <div tw="text-title text-primary group-hover:(text-accent)">HyperFlush</div>
                    <p tw="mt-4">
                        Begin a HyperFlushing sequence. HyperFlush has four stages that runs in this
                        order: flush, preload, stop, and idle. The flush stage get rid of excess
                        water left in the main system. Then the preload stage fills water at the
                        valve connector in order to minimize contemination
                    </p>
                    <Tool tw="self-end justify-self-end" />
                </Tile>
            )}
        />
    );
}

function UpdateRTC() {
    const clickHandler = () => {
        const payload = {
            utc: Math.floor(Date.now() / 1000),
            timezoneOffset: new Date().getTimezoneOffset(),
        };

        // dispatch(setDisplayLoadingScreen(true));
        post("api/rtc/update").withJson(payload).send();
        // dispatch(setDisplayLoadingScreen(false));
    };

    return (
        <Parallax
            perspective={800}
            render={(ref: Ref<HTMLDivElement>) => (
                <Tile className="group" ref={ref} onClick={clickHandler}>
                    <p tw="col-span-full">Tool</p>
                    <div tw="text-title text-primary group-hover:(text-accent)">Update RTC</div>
                    <p tw="mt-4">
                        This utility update the onboard RTC (Real-time-clock) on the eDNA server.
                        This is highly recommended if you move between timezones or when daylight
                        saving occurs.
                    </p>
                    <Tool tw="self-end justify-self-end" />
                </Tile>
            )}
        />
    );
}

export function Utilities() {
    return (
        <PageContainer>
            <h1 tw="text-display text-primary">Utilities</h1>
            <HyperFlush />
            <UpdateRTC />
        </PageContainer>
    );
}
