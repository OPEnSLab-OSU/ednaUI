import { TileCollection } from "components/modules/TileCollection";
import { ValveStatus } from "./ValveStatus";
import { SensorTile } from "./SensorTile";
import { StateTable } from "./StateTable";

import { useMinScreen, useScrollTracking } from "hooks";

import tw from "twin.macro";

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

export const Monitoring = () => {
    const { min, max } = useMinScreen();

    return (
        <div>
            <h1 tw="text-display text-primary p-8 pb-0 mx-auto w-full max-w-screen-xl">
                Montoring
            </h1>
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
