import React from "react";

import Pool from "./Pool";
import Finals from "./Finals";
import AllFinals from "./AllFinals";

import { stats } from "../../data/rugby-stats";

const Rugby = ({}) => {
    return (
        <React.Fragment>
            <div className="rugby--v2 wrapper--rugby-wide">
                <Pool
                    name="Pool A"
                    teams={stats}
                    matches={[
                        ["jap", "rus", "2019-09-20T11:45"],
                        ["ire", "sco", "2019-09-22T08:45"],
                        ["rus", "sam", "2019-09-24T11:15"],
                        ["jap", "ire", "2019-09-28T08:15"],
                        ["sco", "sam", "2019-09-30T11:15"],
                        ["ire", "rus", "2019-10-03T11:45"],
                        ["jap", "sam", "2019-10-05T11:35"],
                        ["sco", "rus", "2019-10-09T08:15"],
                        ["ire", "sam", "2019-10-12T11:45"],
                        ["jap", "sco", "2019-10-13T11:45"]
                    ]}
                    finals={["QF4", "QF2"]}
                />
                <Pool
                    name="Pool B"
                    teams={stats}
                    matches={[
                        ["nzl", "rsa", "2019-09-21T10:45"],
                        ["ita", "nam", "2019-09-22T06:15"],
                        ["ita", "can", "2019-09-26T08:45"],
                        ["rsa", "nam", "2019-09-28T10:45"],
                        ["nzl", "can", "2019-10-02T11:15"],
                        ["rsa", "ita", "2019-10-04T10:45"],
                        ["nzl", "nam", "2019-10-06T05:45"],
                        ["rsa", "can", "2019-10-08T11:15"],
                        ["nzl", "ita", "2019-10-12T05:45"],
                        ["nam", "can", "2019-10-13T04:15"]
                    ]}
                    finals={["QF2", "QF4"]}
                />
                <Pool
                    name="Pool C"
                    teams={stats}
                    matches={[
                        ["fra", "arg", "2019-09-21T06:15"],
                        ["eng", "ton", "2019-09-22T11:15"],
                        ["eng", "usa", "2019-09-26T11:15"],
                        ["arg", "ton", "2019-09-28T05:45"],
                        ["fra", "usa", "2019-10-02T08:15"],
                        ["eng", "arg", "2019-10-05T09:00"],
                        ["fra", "ton", "2019-10-06T08:45"],
                        ["arg", "usa", "2019-10-09T05:45"],
                        ["eng", "fra", "2019-10-12T09:15"],
                        ["usa", "ton", "2019-10-13T06:45"]
                    ]}
                    finals={["QF1", "QF3"]}
                />
                <Pool
                    name="Pool D"
                    teams={stats}
                    matches={[
                        ["aus", "fij", "2019-09-21T05:45"],
                        ["wal", "geo", "2019-09-23T11:15"],
                        ["fij", "uru", "2019-09-25T06:15"],
                        ["geo", "uru", "2019-09-29T06:15"],
                        ["aus", "wal", "2019-09-29T08:45"],
                        ["geo", "fij", "2019-10-03T06:15"],
                        ["aus", "uru", "2019-10-05T06:15"],
                        ["wal", "fij", "2019-10-09T10:45"],
                        ["aus", "geo", "2019-10-11T11:15"],
                        ["wal", "uru", "2019-10-13T09:15"]
                    ]}
                    finals={["QF3", "QF1"]}
                />
            </div>
            <hr />
            <div className="wrapper--rugby">
                <AllFinals
                    teams={stats}
                    matches={{
                        quarters: [
                            ["eng", "wal", "2019-10-19T08:15"],
                            ["nzl", "sco", "2019-10-19T11:15"],
                            ["aus", "fra", "2019-10-20T08:15"],
                            ["ire", "rsa", "2019-10-20T11:15"]
                        ],
                        semis: [
                            ["eng", "nzl", "2019-10-26T09:00"],
                            ["aus", "rsa", "2019-10-27T09:00"]
                        ],
                        third: ["eng", "aus", "2019-11-01T09:00"],
                        final: ["nzl", "rsa", "2019-11-02T09:00"]
                    }}
                />
            </div>
        </React.Fragment>
    );
};

export default Rugby;
