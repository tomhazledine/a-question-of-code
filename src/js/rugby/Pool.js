import React from "react";

import Match from "./Match";
import Results from "./Results";

const Pool = ({ name, teams, matches, finals }) => {
    const matchesMarkup = matches.map((match, key) => (
        <Match
            key={`${match}__${key}`}
            date={match[2]}
            results={teams[match[0]][match[1]]}
        />
    ));
    console.log("pool finals", finals);
    return (
        <div className="pool__wrapper">
            <h2 className="pool__header">{name}</h2>
            <div className={`pool pool--wide`}>
                <div className="pool__column pool__column--graphs">
                    <div className="matches">{matchesMarkup}</div>
                </div>
                <div className="pool__column-divider"></div>
                <div className="pool__column">
                    <Results
                        stats={teams}
                        matches={matches}
                        name={name}
                        finals={finals}
                    />
                </div>
            </div>
        </div>
    );
};

export default Pool;
