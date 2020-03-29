import React from "react";

import Match from "./Match";

const Finals = ({ name, teams, matches }) => {
    const matchesMarkup = matches.map((match, key) => (
        <Match
            key={`${match}__${key}`}
            date={match[2]}
            results={teams[match[0]][match[1]]}
        />
    ));
    return (
        <div className="finals__wrapper">
            <h2 className="finals__header">{name}</h2>
            <div className={`finals finals--wide`}>
                <div className="finals__column finals__column--graphs">
                    <div className="matches">{matchesMarkup}</div>
                </div>
            </div>
        </div>
    );
};

export default Finals;
