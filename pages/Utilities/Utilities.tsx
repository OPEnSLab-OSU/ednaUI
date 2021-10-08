import tw, { styled } from "twin.macro";
import { Ref } from "react";

import { Wrench } from "phosphor-react";

import { options } from "preact/src/index.js";

import { number } from "zod";

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

type UtilityProps = {
    name: string;
    description: string;
    onClick: () => void;
};
function Utility({ name, description, onClick }: UtilityProps) {
    return (
        <Parallax
            perspective={800}
            render={(ref: Ref<HTMLDivElement>) => (
                <Tile className="group" ref={ref} onClick={onClick}>
                    <p tw="col-span-full">Tool</p>
                    <div tw="text-title text-primary group-hover:(text-accent)">{name}</div>
                    <p tw="mt-4">{description}</p>
                    <Wrench tw="self-end justify-self-end group-hover:(text-accent)" size={24} />
                </Tile>
            )}
        />
    );
}

const HyperFlush = () => (
    <Utility
        name="HyperFlush"
        description={
            "Begin a HyperFlushing sequence. HyperFlush has four stages that runs in thisorder: flush, preload, stop, and idle. The flush stage get rid of excesswater left in the main system. Then the preload stage fills water at the valve connector in order to minimize contemination"
        }
        onClick={() => {
            const valve = Number(prompt("Enter valve to hyperflush or -1 for all", "-1"));
            if (!isNaN(valve) && -1 <= valve && valve <= 23) {
                const payload = { VALVE: valve };
                post("api/preload").withJson(payload).send();
            }
        }}
    />
);

const UpdateRTC = () => (
    <Utility
        name={"Update RTC"}
        description={
            "This utility update the onboard RTC (Real-time-clock) on the eDNA server.This is highly recommended if you move between timezones or when daylightsaving occurs."
        }
        onClick={() => {
            const payload = {
                utc: Math.floor(Date.now() / 1000),
                timezoneOffset: new Date().getTimezoneOffset(),
            };

            post("api/rtc/update").withJson(payload).send();
        }}
    />
);

const ResetValves = () => (
    <Utility
        name={"Reset Valves"}
        description={
            "This utility all valves to its default configuration from the config.js file inthe sdcard"
        }
        onClick={() => {
            const message = "Do you want to reset all the valves to their default configurations";
            window.confirm(message) && get("/api/valves/reset").send();
        }}
    />
);

const BubblePurge = () => (
    <Utility
        name={"Purge Air Bubbles"}
        description={
            "This utility runs alcohol through the system so that there is no more bubbles in the alcohol bag. It turns the pump on and sets the alcohol valve to high."
        }
        onClick={() => {
            get("api/alcohol-debubbler")
                .withTimeout(1000)
                .send()
                .then(() => {
                    alert("Bubble Purge started");
                });
        }}
    />
);

export function Utilities() {
    return (
        <PageContainer>
            <h1 tw="text-display text-primary col-span-full ">Utilities</h1>
            <HyperFlush />
            <BubblePurge />
            <UpdateRTC />
            <ResetValves />
        </PageContainer>
    );
}
