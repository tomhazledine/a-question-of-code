export const hexToRGB = hex =>
    [hex.substring(0, 2), hex.substring(2, 4), hex.substring(4, 6)].map(hex =>
        parseInt(hex, 16)
    );

export const normalize = num => (num > 255 ? 255 : num < 0 ? 0 : num);

// Shift a color by an amount (-255 > 255)
export const shift = (color, amount) => {
    if (color[0] == "#") color = color.slice(1);

    const result = hexToRGB(color)
        .map(num => num + amount)
        .map(num => normalize(num))
        .map(num => num.toString(16))
        .map(hex => ("0" + hex).substring(hex.length - 1))
        .join("");

    return `#${result}`;
};
