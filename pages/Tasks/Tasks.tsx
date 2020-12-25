import { Card } from "components/modules/Card";
import { Link } from "react-router-dom";

import tw, { styled } from "twin.macro";

const StyledLink = styled(Link)<{ isActive: boolean }>`
    ${tw`relative flex flex-col w-64 p-8 mr-4 transition transform bg-white shadow cursor-pointer hover:-translate-y-2 rounded-lg text-primary`}
    ${props => !props.isActive && tw`text-secondary`}
`;

type TaskTileProps = {
    name?: string;
    active?: boolean;
};

const TaskTile = ({ name = "Untitled", active = false }: TaskTileProps) => {
    return (
        <StyledLink to={`/tasks/${name}`} isActive={active}>
            {active && (
                <span tw="flex h-3 w-3 -right-1.5 absolute -top-1.5">
                    <span tw="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-accent opacity-75"></span>
                    <span tw="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
            )}
            <div tw="mr-1 text-sm font-bold leading-none">{name}</div>
            <div tw="mt-2 text-sm text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, debitis.
            </div>
        </StyledLink>
    );
};

type TaskSectionProps = {
    title?: string;
    tasks?: TaskTileProps[];
};

const TaskSection = ({ title, tasks }: TaskSectionProps) => {
    return (
        <Card title={title}>
            <div tw="flex flex-wrap">
                {tasks && tasks.map(t => <TaskTile name={t.name} key={t.name} active={t.active} />)}
            </div>
        </Card>
    );
};

export const Tasks = () => {
    const activeTasks = [
        { name: "Task 1", active: true },
        { name: "Task 2", active: true },
    ];
    const inactiveTasks = [{ name: "Task 3" }, { name: "Task 4" }];
    return (
        <div tw="w-full max-w-screen-xl mx-auto">
            <TaskSection title="Active Task" tasks={activeTasks} />
            <TaskSection title="Inactive Task" tasks={inactiveTasks} />
        </div>
    );
};
