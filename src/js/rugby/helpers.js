import { percentage } from "../helpers/maths";
import { sortByAlternateKey } from "../helpers/utils";

export const singleResult = (teamValue, total, threshold = 50) => {
    const chanceOfWinning = percentage(teamValue, total);
    const formattedChanceOfWinning = parseFloat(chanceOfWinning.toFixed(2));
    const result =
        chanceOfWinning > threshold
            ? "win"
            : chanceOfWinning < threshold
            ? "loss"
            : "draw";
    return {
        percentage: formattedChanceOfWinning,
        result
    };
};

export const adjustment = num => Math.pow(num, 5);
// const adjustment = num => Math.sin(num);

export const resultByPoints = teams => {
    // const adjustment = num => num * num;
    // const adjustment = num => Math.log10(num * num);

    const combinedPoints = teams.reduce(
        (points, team) => points + adjustment(team.points),
        0
    );
    const meanChance = percentage(
        combinedPoints / teams.length,
        combinedPoints
    );
    const results = teams.map(team => {
        const result = singleResult(
            adjustment(team.points),
            combinedPoints,
            meanChance
        );
        return {
            ...team,
            ...result
        };
    });

    return sortByAlternateKey(results, "percentage");
};

export const resultByRank = teams => {
    const combinedRank = teams.reduce((rank, team) => rank + team.rank, 0);
    const meanChance = percentage(combinedRank / teams.length, combinedRank);
    const results = teams.map(team => {
        const result = singleResult(
            combinedRank - team.rank,
            combinedRank,
            meanChance
        );
        return {
            ...team,
            ...result
        };
    });

    return sortByAlternateKey(results, "percentage");
};
