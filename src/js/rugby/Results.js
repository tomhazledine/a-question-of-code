import React from "react";

import { sortByAlternateKey, uniqueItems } from "../helpers/utils";

const Results = ({ stats, matches, finals }) => {
    const teams = uniqueItems(
        matches.reduce((teams, match) => [...teams, match[0], match[1]], [])
    );

    const teamResults = teams.map(team =>
        teams
            .filter(opponent => opponent !== team)
            .reduce(
                (results, opponent) => {
                    const match = stats[team][opponent];
                    const teamResult = match.find(m => m.slug === team);
                    const teamWon = teamResult.percentage > 50 ? 1 : 0;
                    const points =
                        teamResult.percentage > 80
                            ? 5
                            : teamResult.percentage > 50
                            ? 4
                            : teamResult.percentage === 50
                            ? 2
                            : teamResult.percentage > 40
                            ? 1
                            : 0;
                    return {
                        slug: teamResult.slug,
                        name: teamResult.name,
                        wins: results.wins + teamWon,
                        points: results.points + points
                    };
                },
                {
                    slug: "",
                    name: "",
                    wins: 0,
                    points: 0
                }
            )
    );

    const sortedResults = sortByAlternateKey(teamResults, "points");
    console.log("finals", finals);

    const resultsMarkup = sortedResults.map((team, key) => (
        <li className={`pool-result result__${key}`} key={`result__${key}`}>
            <span className="result__number">{key + 1}</span>
            <span className="result__name">{team.name}</span>
            <span className="result__wins">{team.wins}</span>
            <span className="result__points">{team.points}</span>
            {key === 0 || key === 1 ? (
                <span className="result__final">{finals[key]}</span>
            ) : null}
        </li>
    ));

    return (
        <div className="results__wrapper">
            <ol className="pool-results">
                <li className="result result__heading">
                    <span className="result__number">#</span>
                    <span className="result__name">Team</span>
                    <span className="result__wins">Wins</span>
                    <span className="result__points">Points</span>
                </li>
                {resultsMarkup}
            </ol>
        </div>
    );
};

export default Results;
