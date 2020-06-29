const moment = require("moment");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = (eleventyConfig) => {
    eleventyConfig.addNunjucksFilter("date", (date) =>
        moment(date, "YYYY-MM-DD").format("Do MMM, Y")
    );

    eleventyConfig.addNunjucksFilter("datefull", (date) =>
        moment(date, "YYYY-MM-DD").format("YYYY-MM-DDTHH:mm[:00Z]")
    );

    let markdownIt = require("markdown-it");
    let markdownItEmoji = require("markdown-it-footnote");
    let markdownItAnchor = require("markdown-it-anchor");
    let options = {
        html: true,
    };
    let markdownLib = markdownIt(options)
        .use(markdownItEmoji)
        .use(markdownItAttrs)
        .use(markdownItAnchor);

    eleventyConfig.setLibrary("md", markdownLib);

    return {
        markdownTemplateEngine: ["njk"],
        dir: {
            input: "src/content/",
            output: "build",
            includes: "../includes/",
            layouts: "../layouts/",
            data: "../data/",
        },
    };
};
