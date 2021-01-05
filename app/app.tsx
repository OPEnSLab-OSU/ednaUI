import tw, { theme } from "twin.macro";
import { Route, Redirect, Switch } from "react-router-dom";

import { Monitoring } from "pages/Monitoring";
import { Tasks } from "pages/Tasks";
import { TaskConfig } from "pages/TaskConfig";

import { Sidebar } from "components/modules/Sidebar";
import { Breadcrumb } from "components/modules/Breadcrumb";

import { ScreenProvider } from "hooks";

import { Provider, useSelector } from "react-redux";

import { store as ReduxStore } from "root@redux/store";
import { Test } from "pages/Test";

import { AlertTriangle, BatteryCharging } from "react-feather";

import BUILD from "./build.json";

const AppContainer = tw.div`flex h-full bg-white debug-screens`;
const PageContainer = tw.div`flex flex-col w-full h-screen overflow-y-scroll bg-background`;
const Toolbar = () => {
    const status = useSelector(state => state.status);
    console.log(status);
    console.log(status.lowBattery);
    const lowBattery = status.lowBattery ?? true;
    return (
        <div tw="grid grid-flow-col gap-2 py-4 px-8 justify-end sticky top-0 z-40 grid items-center">
            <span tw="text-subtitle text-primary">{lowBattery && "Check Battery Power"}</span>
            {lowBattery ? <AlertTriangle size={20} /> : <BatteryCharging />}
        </div>
    );
};

const Meta = () => {
    const dirty = BUILD.dirty ? "?" : "";
    const env = BUILD.env[0];
    const meta = `${BUILD.version}-${BUILD.commitNumber}(${BUILD.hash}${dirty}${env})`;
    return (
        <div tw="fixed right-0 bottom-0 p-4 text-sm justify-self-end text-secondary">{`v${meta}`}</div>
    );
};

export const Application = () => (
    <Provider store={ReduxStore}>
        <ScreenProvider screens={theme`screens`}>
            <AppContainer>
                <Sidebar />

                <PageContainer id="page">
                    <Toolbar />
                    <Breadcrumb />

                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/monitoring" />} />
                        <Route exact path="/404" render={() => <div>404 Error</div>} />
                        <Route exact path="/monitoring" render={() => <Monitoring />} />
                        <Route exact path="/tasks" render={() => <Tasks />} />
                        <Route path="/tasks/:taskId" render={() => <TaskConfig />} />
                        {process.env.NODE_ENV === "development" && (
                            <Route path="/test" render={() => <Test />} />
                        )}
                        <Route path="*" render={() => <Redirect to="/404" />} />
                    </Switch>

                    <Meta />
                </PageContainer>
            </AppContainer>
        </ScreenProvider>
    </Provider>
);
