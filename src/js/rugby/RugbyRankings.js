import React from "react";
import * as d3 from "d3";

import SimpleLineGraph from "../components/SimpleLineGraph";

import { objectToArray, sortByAlternateKey } from "../helpers/utils";
import { adjustment } from "./helpers";

import { pools } from "../../data/rugby-2019-pools";

const RugbyRankings = ({}) => {
    const adjustedScale = d3.scaleLinear().range([61.01, 89.43]);

    const allTeams = objectToArray({
        ...pools.a,
        ...pools.b,
        ...pools.c,
        ...pools.d
    }).map(team => ({ ...team.value }));
    const sortedTeams = sortByAlternateKey(allTeams, "points", true);
    const points = sortedTeams.map((team, i) => ({
        x: i + 1,
        y: team.points,
        active: true,
        slug: "linear"
    }));

    const power = 5;

    const adjustedPoints = points.map(point => ({
        ...point,
        y: adjustment(point.y)
    }));

    const justThePoints = adjustedPoints.map(point => point.y);
    const minAdjustedPoint = Math.min(...justThePoints);
    const maxAdjustedPoint = Math.max(...justThePoints);
    adjustedScale.domain([minAdjustedPoint, maxAdjustedPoint]);

    const normalizedPoints = adjustedPoints.map(point => ({
        ...point,
        slug: "adjusted",
        y: adjustedScale(point.y)
    }));

    const linearExample = [
        { x: 1, y: 61, slug: "linear--default" },
        { x: 20, y: 89, slug: "linear--default" }
    ];

    const myLine = x => (28 / 19) * x + 61;
    const powerExample = [
        { x: 1, y: myLine(0) },
        { x: 2, y: myLine(1) },
        { x: 3, y: myLine(2) },
        { x: 4, y: myLine(3) },
        { x: 5, y: myLine(4) },
        { x: 6, y: myLine(5) },
        { x: 7, y: myLine(6) },
        { x: 8, y: myLine(7) },
        { x: 9, y: myLine(8) },
        { x: 10, y: myLine(9) },
        { x: 11, y: myLine(10) },
        { x: 12, y: myLine(11) },
        { x: 13, y: myLine(12) },
        { x: 14, y: myLine(13) },
        { x: 15, y: myLine(14) },
        { x: 16, y: myLine(15) },
        { x: 17, y: myLine(16) },
        { x: 18, y: myLine(17) },
        { x: 19, y: myLine(18) },
        { x: 20, y: myLine(19) }
    ]
        .map(point => ({
            ...point,
            y: adjustment(point.y)
        }))
        .map(point => ({
            ...point,
            slug: "adjusted--default",
            y: adjustedScale(point.y)
        }));

    return (
        <div className="rugby-graph__outer">
            <div className="rugby-graph__wrapper">
                <SimpleLineGraph
                    data={[points, normalizedPoints]}
                    className="rugby-rankings"
                />
                <div className="graph__legend">
                    <div className="graph__legend-item">
                        <span className="graph__legend-icon graph__legend-icon--actual" />
                        <span className="graph__legend-text">
                            Actual rankings
                        </span>
                    </div>
                    <div className="graph__legend-item">
                        <span className="graph__legend-icon graph__legend-icon--adjusted" />
                        <span className="graph__legend-text">
                            Adjusted rankings <em>[normalized]</em>
                        </span>
                    </div>
                </div>
                <span className="caption caption--rugby-graph">
                    <em>Linear (n) vs. power (n^5) rankings</em>
                </span>
            </div>
            <div className="rugby-graph__wrapper">
                <SimpleLineGraph
                    data={[linearExample, powerExample]}
                    className="rugby-rankings"
                />
                <div className="graph__legend">
                    <div className="graph__legend-item">
                        <span className="graph__legend-icon graph__legend-icon--actual" />
                        <span className="graph__legend-text">Linear (n)</span>
                    </div>
                    <div className="graph__legend-item">
                        <span className="graph__legend-icon graph__legend-icon--adjusted" />
                        <span className="graph__legend-text">
                            Power (n^5) <em>[normalized]</em>
                        </span>
                    </div>
                </div>
                <span className="caption caption--rugby-graph">
                    <em>Simple linear (n) vs. power (n^5)</em>
                </span>
            </div>
        </div>
    );
};

export default RugbyRankings;
