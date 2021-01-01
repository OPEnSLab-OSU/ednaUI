import tw, { TwStyle } from "twin.macro";
import { useDispatch, useSelector } from "react-redux";

import { TileCollection } from "components/modules/TileCollection";
import { Button } from "components/units/Button";

import { ValveStatus } from "./ValveStatus";
import { SensorTile } from "./SensorTile";
import { StateTable } from "./StateTable";

import { useScreen } from "hooks";
import { pick } from "lodash";
import { StatusInStore, StatusServer, StatusServerSchema } from "root@redux/models";
import { getStatusUpdate } from "root@redux/actions";
import { useEffect } from "react";
import { useAppDispatch } from "root@redux/store";
import { useStatusUpdate } from "hooks";

const Tiling = ({ columns }: { columns: number }) => {
    const status = useSelector(state => state.status);
    return (
        <TileCollection columns={columns} title="Sensor Data" tw="p-0">
            <SensorTile title="Presssure" value={status?.pressure ?? "?"} unit="psi" />
            <SensorTile title="Flow" value={status?.waterFlow ?? "?"} unit="mm/s" />
            <SensorTile title="Temperature" value={status?.temperature ?? "?"} unit="°C" />
            <SensorTile title="Barometeric" value={status?.barometric ?? "?"} unit="bar" />
            <SensorTile title="Volume" value={status?.waterVolume ?? "?"} unit="liter" />
            <SensorTile title="Depth" value={status?.waterDepth ?? "?"} unit="meter" />
        </TileCollection>
    );
};

export const Monitoring = () => {
    const { min, max } = useScreen();
    const { status, reload } = useStatusUpdate();

    return (
        <div>
            <h1 tw="text-display text-primary p-8 pb-0 mx-auto w-full max-w-screen-xl">
                Montoring
            </h1>

            {/* <div tw="p-8 mx-auto w-full max-w-screen-xl">
            <Button text="Pause" onClick={() => setPause(!pause)} />
            <ConnectionBadge status={result.status} />
            </div> */}
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
