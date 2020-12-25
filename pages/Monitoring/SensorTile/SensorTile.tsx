import "twin.macro";

type TileProps = {
    title: string;
    value?: string;
    unit?: string;
    className?: string;
};

export const SensorTile = ({ title, value = "------", unit = "--", className }: TileProps) => {
    return (
        <div tw="grid items-center gap-2 p-8 bg-white rounded-lg shadow" className={className}>
            <div>
                <span tw="mr-1 text-xl font-bold text-primary">{value}</span>
                <span tw="text-sm text-secondary">{unit}</span>
            </div>
            <div tw="text-sm text-secondary">{title}</div>
        </div>
    );
};
