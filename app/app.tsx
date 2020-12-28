import "./app.css";
import tw, { theme } from "twin.macro";
import { Route, Redirect, Switch } from "react-router-dom";

import { Monitoring } from "pages/Monitoring";
import { Tasks } from "pages/Tasks";
import { TaskConfig } from "pages/TaskConfig";

import { Sidebar } from "components/modules/Sidebar";
import { Breadcrumb } from "components/modules/Breadcrumb";

import { MinScreenProvider } from "hooks";

import BUILD from "./build.json";
import { Provider } from "react-redux";

import { store as ReduxStore } from "edna@redux/store";

const AppContainer = tw.div`flex h-full bg-white debug-screens`;
const PageContainer = tw.div`flex flex-col w-full h-screen overflow-y-scroll bg-background`;
const Toolbar = tw.div`sticky top-0 z-40 grid items-center`;

const Version = () => {
    const __DIRTY__ = BUILD.dirty ? "?" : "";
    const __APPVERSION__ = `${BUILD.version}-${BUILD.commitNumber}(${BUILD.hash}${__DIRTY__})`;
    return <div tw="p-4 text-sm justify-self-end text-secondary">{`v${__APPVERSION__}`}</div>;
};

export const Application = () => (
    <Provider store={ReduxStore}>
        <MinScreenProvider screens={theme`screens`}>
            <AppContainer>
                <Sidebar />

                <PageContainer id="page">
                    <Toolbar>
                        <Version />
                    </Toolbar>
                    <Breadcrumb />

                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/monitoring" />} />
                        <Route exact path="/404" render={() => <div>404 Error</div>} />
                        <Route exact path="/monitoring" render={() => <Monitoring />} />
                        <Route exact path="/tasks" render={() => <Tasks />} />
                        <Route path="/tasks/:taskname" render={() => <TaskConfig />} />
                        <Route path="*" render={() => <Redirect to="/404" />} />
                    </Switch>
                </PageContainer>
            </AppContainer>
        </MinScreenProvider>
    </Provider>
);
