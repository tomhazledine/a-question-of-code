import React from "react";
import moment from "moment";

const Match = ({ date, results }) => {
    const dateObject = moment(date, "YYYY-MM-DDTHH:mm");
    const bars = results.map((team, i) => {
        const isWinner = team.percentage > 50 ? "win" : "loss";
        return (
            <div
                key={`${i}_${team.percentage}`}
                className={`
                    bar__inner
                    bar__inner--${i}
                    bar__inner--${isWinner}`}
                style={{ width: `${team.percentage}%` }}
            >
                <span className="bar__value">{team.percentage}%</span>
            </div>
        );
    });

    return (
        <div className="match">
            <span className="match__date">
                {dateObject.format("MMM.DD HH:mm")}
            </span>
            <span className="match__team">
                {/* <span className="match__team-ranking">{results[0].rank}</span> */}
                {results[0].slug}
            </span>
            <div className="match__bar">
                {bars}
                <span className="match__bar-divider" />
            </div>
            <span className="match__team match__team--last">
                {results[1].slug}
                {/* <span className="match__team-ranking">{results[1].rank}</span> */}
            </span>
        </div>
    );
};

export default Match;
