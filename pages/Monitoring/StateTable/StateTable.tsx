import tw, { css } from "twin.macro";

import { Card } from "components/modules/Card";

import { StateTableBody } from "../StateBody";

const HeaderCell = tw.th`pb-2 text-left text-overline text-primary`;

export const StateTable = () => {
    return (
        <Card tw="p-0">
            <table tw="min-w-full border-separate" css={{ borderSpacing: "0 8px" }}>
                <colgroup>
                    <col span={1} css={{ width: "60%" }} />
                    <col span={1} css={{ width: "15%" }} />
                    <col span={1} css={{ width: "25%" }} />
                </colgroup>

                <thead>
                    <tr>
                        <HeaderCell scope="col" tw="font-bold normal-case text-title">
                            State Information
                        </HeaderCell>
                        <HeaderCell scope="col" tw="text-center text-secondary">
                            Status
                        </HeaderCell>
                        <HeaderCell scope="col" tw="pr-4 text-right text-secondary">
                            Time Elapsed
                        </HeaderCell>
                    </tr>
                </thead>
                <StateTableBody />
            </table>
        </Card>
    );
};
