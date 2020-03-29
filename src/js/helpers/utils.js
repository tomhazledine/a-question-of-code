// Convert object into map-able array of key/value objects
export const objectToArray = (object, keepKey = true) => {
    let items = [];
    for (let key in object) {
        if (!object.hasOwnProperty(key)) continue;
        if (keepKey) {
            items.push({ key, value: object[key] });
        } else {
            items.push(object[key]);
        }
    }
    return items;
};

export const truncateString = (str, length = 240) =>
    str.length <= length - 2 ? str : `${str.slice(0, length)}...`;

export const uniqueItems = array =>
    array.filter((elem, pos, arr) => arr.indexOf(elem) == pos);

export const uuidv4 = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );

export const ordinal = i => {
    let j = i % 10,
        k = i % 100;
    let ordinal = "th";
    if (j == 1 && k != 11) {
        ordinal = "st";
    }
    if (j == 2 && k != 12) {
        ordinal = "nd";
    }
    if (j == 3 && k != 13) {
        ordinal = "rd";
    }
    return `<span>${i}<sup>${ordinal}</sup></span>`;
};

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
