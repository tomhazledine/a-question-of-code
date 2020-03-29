import * as utils from "../src/js/helpers/utils";

describe("Utilities", () => {
    // objectToArray
    it("converts an object into a mapable array of key/value objects", () => {
        const testObject = {
            thing: "something",
            number: 1234,
            bool: false
        };
        const testArray = utils.objectToArray(testObject);
        // Returns an iterable array
        expect(Array.isArray(testArray)).toBe(true);
        expect(testArray.length).toEqual(3);
        // Turns the object-key into a value with a key of "key"
        expect(testArray[0].key).toEqual("thing");
        // Turns the object-value into a value with a key of "value"
        expect(testArray[0].value).toEqual("something");
        // Handles numbers
        expect(testArray[1].value).toEqual(1234);
        // Handles booleans
        expect(testArray[2].value).toBe(false);

        // Works without keys
        const testArrayWithoutKeys = utils.objectToArray(testObject, false);
        expect(Array.isArray(testArrayWithoutKeys)).toBe(true);
        expect(testArrayWithoutKeys.length).toEqual(3);
        expect(testArrayWithoutKeys[0]).toEqual("something");
        expect(testArrayWithoutKeys[1]).toEqual(1234);
        expect(testArrayWithoutKeys[2]).toEqual(false);
    });

    // truncateString
    it("truncates a string", () => {
        const sampleString = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt officia accusamus aut error provident
            inventore mollitia earum suscipit iure illo cupiditate, officiis cum sint architecto nostrum quisquam
            sunt ea aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque labore beatae,
            facilis architecto repellendus deleniti quo porro fugit praesentium unde vero libero maxime temporibus
            saepe dolorum nam quis iure assumenda!`;
        const defaultTruncation = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt officia accusamus aut error provident
            inventore mollitia earum suscipit iure illo cupiditate, officiis cum sint architecto nostrum quisquam
            sunt ea a...`;
        const midTruncation = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt officia accusamus aut error provi...`;
        const shortTruncation = `Lorem ipsu...`;
        expect(utils.truncateString(sampleString)).toEqual(defaultTruncation);
        expect(utils.truncateString(sampleString, 500)).toEqual(sampleString);
        expect(utils.truncateString(sampleString, 100)).toEqual(midTruncation);
        expect(utils.truncateString(sampleString, 10)).toEqual(shortTruncation);
    });

    // uniqueItems
    it("returns only unique array items", () => {
        const busyNumbers = [1, 1, 2, 3, 3, 4, 4, 4, 4, 5, 6, 7, 7];
        const uniqueNumbers = [1, 2, 3, 4, 5, 6, 7];
        expect(utils.uniqueItems(busyNumbers.sort())).toEqual(
            uniqueNumbers.sort()
        );

        const busyUnsortedNumbers = [4, 3, 1, 2, 1, 3, 3, 4, 4, 5, 6, 7, 7];
        const uniqueUnsortedNumbers = [1, 2, 3, 4, 5, 6, 7];
        expect(utils.uniqueItems(busyUnsortedNumbers.sort())).toEqual(
            uniqueUnsortedNumbers.sort()
        );

        const busyStrings = [
            "thing",
            "another",
            "thing",
            "to test",
            "thing",
            "set of",
            "set of",
            "to test",
            "thing",
            "another",
            "another",
            "another",
            "things",
            "to test"
        ];
        const uniqueStrings = [
            "thing",
            "another",
            "set of",
            "things",
            "to test"
        ];
        expect(utils.uniqueItems(busyStrings.sort())).toEqual(
            uniqueStrings.sort()
        );
    });
});
