import { TileCollection } from "components/modules/TileCollection";
import { Button } from "components/units/Button";
import { ValveStatus } from "./ValveStatus";
import { SensorTile } from "./SensorTile";
import { StateTable } from "./StateTable";

import { ReturnStatus, useMinScreen, useStatusUpdate } from "hooks";
import tw, { TwStyle } from "twin.macro";

const Tiling = ({ columns }: { columns: number }) => (
    <TileCollection columns={columns} title="Sensor Data" tw="p-0">
        <SensorTile title="Presssure" value="10" unit="psi" />
        <SensorTile title="Flow" value="30" unit="mm/s" />
        <SensorTile title="Temperature" value="3" unit="°C" />
        <SensorTile title="Barometeric" value="1" unit="bar" />
        <SensorTile title="Volume" />
        <SensorTile title="Depth" />
    </TileCollection>
);

type ConnectionBadgeProps = {
    status: ReturnStatus;
};

const ConnectionBadge = ({ status }: ConnectionBadgeProps) => {
    const mapStatusToStyles: Record<ReturnStatus & string, { text: string; style: TwStyle }> = {
        ready: { text: "Ready", style: tw`bg-accent` },
        loading: { text: "Loading", style: tw`bg-accent` },
        success: { text: "Success", style: tw`bg-accent` },
        fail: { text: "Failed to connect", style: tw`bg-red-500` },
    };

    // console.log(mapStatusToStyles[status].style);
    return (
        <div tw="flex">
            <span tw="rounded-full h-6 w-6" css={mapStatusToStyles[status].style}>
                asdf
            </span>
            <span>{mapStatusToStyles[status].text}</span>
        </div>
    );
};

export const Monitoring = () => {
    const { min, max } = useMinScreen();
    const { result, pause, setPause } = useStatusUpdate("https://api.kanye.rest/");

    return (
        <div>
            <h1 tw="text-display text-primary p-8 pb-0 mx-auto w-full max-w-screen-xl">
                Montoring
            </h1>

            <div tw="p-8 mx-auto w-full max-w-screen-xl">
                <Button text="Pause" onClick={() => setPause(!pause)} />
                <ConnectionBadge status={result.status} />
            </div>
            <main
                tw="grid w-full max-w-screen-xl gap-8 mx-auto p-8"
                css={
                    min`md`
                        ? "grid-template-columns: 1fr min-content;"
                        : "grid-template-columns: 1fr"
                }>
                <div tw="grid gap-8 content-start">
                    <ValveStatus />
                    {max`md` && <Tiling columns={2} />}
                    <StateTable />
                </div>
                {min`md` && <Tiling columns={min`xl` ? 2 : 1} />}
            </main>
        </div>
    );
};
