import { Ref, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw, { styled } from "twin.macro";
import { PlusSquare } from "react-feather";
import { partition, transform } from "lodash";

import { Button } from "components/units/Button";
import { mapTaskStatusToString, TaskServer } from "root@redux/models";
import { useAppDispatch } from "root@redux/store";
import { createTask, getTaskCollection } from "root@redux/actions";
import { Parallax } from "components/units/Parallax";

import { NewTaskInput } from "./NewTaskInput";
import { TaskTile, TaskTileProps } from "./TaskTile";

const mocking = true;
const mock = [
    {
        id: "203942342",
        createdAt: Date.now(),
        name: "DEMO",
        notes: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, debitis",
        status: 1,
    },
] as const;

//
// ────────────────────────────────────────────────────── I ──────────
//   :::::: S E C T I O N : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//

const Section = styled.div`
    ${tw`grid gap-8`};
    grid-template-columns: repeat(auto-fit, 14rem);
`;

type TaskSectionProps = {
    title?: string;
    tasks: TaskServer[];
};

const TaskSection = ({ title, tasks }: TaskSectionProps) => {
    return (
        <Section>
            <h3 tw="col-span-full text-subtitle uppercase text-secondary">{title}</h3>
            {tasks.map(t => (
                <Parallax
                    key={t.name}
                    perspective={200}
                    render={(ref: Ref<HTMLDivElement>) => (
                        <div ref={ref} css="transition: transform 0.5s; will-change: transform">
                            <TaskTile
                                {...t}
                                createdAt={new Date(t.createdAt).toLocaleDateString("en-US")}
                            />
                        </div>
                    )}
                />
            ))}
        </Section>
    );
};

//
// ──────────────────────────────────────────────── I ──────────
//   :::::: P A G E : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────
//
const Header = tw.div`grid gap-8 items-center grid-flow-col auto-cols-max`;

export const Tasks = () => {
    const dispatch = useAppDispatch();
    const tasks = useSelector(state => state.taskCollection);

    // Partition active tasks and inactive tasks
    const filterActiveTasks = (t: TaskServer) => mapTaskStatusToString[t.status] === "active";
    const [activeTasks, inactiveTasks] = partition(
        Object.values(mocking ? mock : tasks),
        filterActiveTasks
    );

    // Create new task input controls
    const [inputHiding, setInputHiding] = useState(true);
    const hideInput = () => setInputHiding(true);
    const showInput = () => setInputHiding(false);

    const submitHandler = (name: string) => {
        console.log(name);
        dispatch(createTask(name));
        hideInput();
    };

    useEffect(() => {
        dispatch(getTaskCollection());
    }, [dispatch]);

    return (
        <div tw="grid gap-8 p-8 w-full max-w-screen-xl mx-auto">
            <Header>
                <h1 tw="text-display text-primary">Tasks</h1>
                <Button
                    tw="text-overline"
                    icon={<PlusSquare size={20} />}
                    text="New Task"
                    onClick={showInput}
                />
            </Header>

            <TaskSection title="Active Task" tasks={activeTasks} />
            <TaskSection title="Inactive Task" tasks={inactiveTasks} />
            <NewTaskInput hide={inputHiding} onCancel={hideInput} onSubmit={submitHandler} />
        </div>
    );
};
