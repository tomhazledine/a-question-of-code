export const sortByAlternateKey = (results, sortKey, reverse = false) =>
    results.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) {
            return reverse ? -1 : 1;
        }
        if (a[sortKey] > b[sortKey]) {
            return reverse ? 1 : -1;
        }
        return 0;
    });

export const mean = numbers => {
    let sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
};

export const median = numbers => {
    let median = 0;
    let sorted = sortNumbers(numbers);
    if (sorted.length % 2 === 0) {
        // An even length needs to return an average of the middle 2 numbers.
        median =
            (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
    } else {
        // An odd length can return the middle value.
        median = sorted[(sorted.length - 1) / 2];
    }
    return median;
};

export const sortNumbers = numbers =>
    [].concat(numbers).sort((a, b) =>
        a.toString().localeCompare(b.toString(), undefined, {
            numeric: true,
            sensitivity: "base"
        })
    );

export const invert = numbers => numbers.map(number => -Math.abs(number));

export const quartile = (numbers, percent) => {
    const sorted = sortNumbers(numbers);
    const position = (sorted.length - 1) * percent;

    if (position % 1 === 0) {
        return sorted[position];
    } else {
        const base = Math.floor(position);
        const rest = position - base;

        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    }
};

export const mode = numbers => {
    // as result can be bimodal or multi-modal,
    // the returned result is provided as an array

    let modes = [];

    let counts = numbers.reduce(
        (acc, number) => {
            acc.numbers[number] = (acc.numbers[number] || 0) + 1;
            if (acc.numbers[number] > acc.max) {
                acc.max = acc.numbers[number];
            }

            return acc;
        },
        { max: 0, numbers: {} }
    );

    for (let key in counts.numbers) {
        if (counts.numbers[key] === counts.max) {
            modes.push(key);
        }
    }

    return modes;
};

export const spread = numbers => {
    const result = {
        min: Math.min(...numbers),
        quartile25: quartile(numbers, 0.25),
        median: median(numbers),
        quartile75: quartile(numbers, 0.75),
        max: Math.max(...numbers)
    };
    return result;
};
