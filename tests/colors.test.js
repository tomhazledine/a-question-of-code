import * as colors from "../src/js/helpers/colors";

describe("Colors", () => {
    // hexToRGB
    it("converts a hex code into an RGB value", () => {
        expect(colors.hexToRGB("ff00ee")).toEqual([255, 0, 238]);
        expect(colors.hexToRGB("000000")).toEqual([0, 0, 0]);
        expect(colors.hexToRGB("ffffff")).toEqual([255, 255, 255]);
    });

    // normalize
    it("normalizes values to within 0 and 255", () => {
        expect(colors.normalize(-24)).toEqual(0);
        expect(colors.normalize(24)).toEqual(24);
        expect(colors.normalize(260)).toEqual(255);
        expect(colors.normalize(1)).toEqual(1);
        expect(colors.normalize(255)).toEqual(255);
    });

    // shift
    it("shifts a color by a given amount", () => {
        expect(colors.shift("aaaaaa", 10)).toEqual("#b4b4b4");
        expect(colors.shift("#aabbcc", 10)).toEqual("#b4c5d6");
        expect(colors.shift("#aabbcc", 255)).toEqual("#ffffff");
        expect(colors.shift("aabbcc", -255)).toEqual("#000000");
    });
});
