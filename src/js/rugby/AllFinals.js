import React from "react";

import Match from "./Match";

const AllFinals = ({ teams, matches }) => {
    return (
        <div className="finals__wrapper">
            <div className="finals__column finals__column--left">
                <h2 className="finals__header">QF1</h2>
                <Match
                    date={matches.quarters[0][2]}
                    results={
                        teams[matches.quarters[0][0]][matches.quarters[0][1]]
                    }
                />
                <h2 className="finals__header">SF1</h2>
                <Match
                    date={matches.semis[0][2]}
                    results={teams[matches.semis[0][0]][matches.semis[0][1]]}
                />
                <h2 className="finals__header">QF2</h2>
                <Match
                    date={matches.quarters[1][2]}
                    results={
                        teams[matches.quarters[1][0]][matches.quarters[1][1]]
                    }
                />
            </div>

            <div className="finals__column finals__column--center">
                <h2 className="finals__header">Final</h2>
                <Match
                    date={matches.final[2]}
                    results={teams[matches.final[0]][matches.final[1]]}
                />
                <h2 className="finals__header">3rd place</h2>
                <Match
                    date={matches.third[2]}
                    results={teams[matches.third[0]][matches.third[1]]}
                />
            </div>

            <div className="finals__column finals__column--right">
                <h2 className="finals__header">QF3</h2>
                <Match
                    date={matches.quarters[2][2]}
                    results={
                        teams[matches.quarters[2][0]][matches.quarters[2][1]]
                    }
                />
                <h2 className="finals__header">SF2</h2>
                <Match
                    date={matches.semis[1][2]}
                    results={teams[matches.semis[1][0]][matches.semis[1][1]]}
                />
                <h2 className="finals__header">QF4</h2>
                <Match
                    date={matches.quarters[3][2]}
                    results={
                        teams[matches.quarters[3][0]][matches.quarters[3][1]]
                    }
                />
            </div>
        </div>
    );
};

export default AllFinals;
