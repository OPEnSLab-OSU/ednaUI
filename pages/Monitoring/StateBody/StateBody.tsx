import tw, { styled } from "twin.macro";
import { Badge } from "components/units/Badge";

const TableCell = styled.td`
    ${tw`px-4 py-4 bg-white text-subtitle text-primary whitespace-nowrap`}
`;

const ActiveBadge = styled(Badge)<{ inactive: boolean }>`
    ${tw`px-4 py-2 text-xs font-bold rounded-full`}
    ${props => (props.inactive ? tw`bg-background text-secondary` : tw`text-teal-700 bg-teal-100`)}
`;

const RowContainer = styled.tr`
    ${tw`border-b rounded-lg shadow`}
    ${TableCell}:first-child {
        ${tw`rounded-l-lg`}
    }
    ${TableCell}:last-child {
        ${tw`rounded-r-lg`}
    }
`;

interface TableRowProps {
    status: string;
    name: string;
    timeElapsed: number;
}

const TableRow = ({ status, name, timeElapsed }: TableRowProps) => {
    const inactive = status.toLowerCase() === "inactive";
    return (
        <RowContainer>
            <TableCell tw="font-bold text-subtitle">{name}</TableCell>
            <TableCell>
                <div tw="flex justify-center">
                    <ActiveBadge text={status} inactive={inactive} />
                </div>
            </TableCell>
            <TableCell tw="pr-4 text-right">{`${timeElapsed} seconds ago`}</TableCell>
        </RowContainer>
    );
};

export const StateTableBody = () => {
    const stateNames = ["Idle", "Flushing", "Sampling", "Decontamination", "Stop"];
    const states: TableRowProps[] = Array.from({ length: 5 }, (_, id) => ({
        name: stateNames[id],
        status: id === 2 ? "Active" : "Inactive",
        timeElapsed: (id - 2) * 5,
    }));

    return (
        <tbody>
            {states.map(s => (
                <TableRow key={s.name} {...s} />
            ))}
        </tbody>
    );
};
