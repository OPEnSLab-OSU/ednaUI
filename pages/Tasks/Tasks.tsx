import { Card } from "components/modules/Card";
import { Link } from "react-router-dom";

import tw, { styled } from "twin.macro";

import { PlusSquare } from "react-feather";
import { Button } from "components/units/Button";
import { useState } from "react";
import { NewTaskInput } from "./NewTaskInput";

const StyledLink = styled(Link)<{ isActive: boolean }>`
    ${tw`relative flex flex-col w-64 p-8 mr-4 transition transform bg-white shadow cursor-pointer hover:-translate-y-2 rounded-lg text-primary`}
    ${props => !props.isActive && tw`text-secondary`}
`;

type TaskTileProps = {
    name?: string;
    description?: string;
    active?: boolean;
};

const TaskTile = ({ name = "Untitled", description, active = false }: TaskTileProps) => {
    return (
        <StyledLink to={`/tasks/${name}`} isActive={active}>
            {active && (
                <span tw="flex h-3 w-3 -right-1.5 absolute -top-1.5">
                    <span tw="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-accent opacity-75"></span>
                    <span tw="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
            )}
            <div tw="mr-1 text-sm font-bold leading-none">{name}</div>
            <div tw="mt-2 text-sm text-secondary">{description}</div>
        </StyledLink>
    );
};

type TaskSectionProps = {
    title?: string;
    tasks?: TaskTileProps[];
};

const TaskSection = ({ title, tasks }: TaskSectionProps) => {
    return (
        <Card tw="p-0" title={title}>
            <div tw="flex flex-wrap">
                {tasks && tasks.map(t => <TaskTile key={t.name} {...t} />)}
            </div>
        </Card>
    );
};

export const Tasks = () => {
    const [showCreateTask, setShowCreateTask] = useState(true);
    const activeTasks: TaskTileProps[] = [
        {
            name: "Task 1",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, debitis",
            active: true,
        },
        { name: "Task 2", active: true },
    ];
    const inactiveTasks: TaskTileProps[] = [{ name: "Task 3" }, { name: "Task 4" }];
    const submitNewTaskHandler = () => {
        alert("Submit task name to server with new id");
        setShowCreateTask(false);
    };

    return (
        <div tw="grid gap-8 p-8 w-full max-w-screen-xl mx-auto">
            <div tw="grid gap-8 grid-flow-col auto-cols-max items-center">
                <h1 tw="text-display text-primary">Tasks</h1>
                <Button
                    tw="justify-self-end text-overline"
                    icon={<PlusSquare />}
                    text="New Task"
                    onClick={() => setShowCreateTask(value => !value)}
                />
                {showCreateTask && (
                    <NewTaskInput
                        onCancel={() => setShowCreateTask(false)}
                        onSubmit={submitNewTaskHandler}
                    />
                )}
            </div>

            <TaskSection title="Active Task" tasks={activeTasks} />
            <TaskSection title="Inactive Task" tasks={inactiveTasks} />
        </div>
    );
};
