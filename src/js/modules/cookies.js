import { docCookies } from "../vendor/cookies";

export const setNewsletterCookie = () => {
    var days = 2592000; // This is 30 days in seconds

    var page_load_count = docCookies.getItem("page_load_count");

    if (page_load_count) {
        page_load_count++;
        docCookies.setItem("page_load_count", page_load_count, days, "/");
    } else {
        docCookies.setItem("page_load_count", 1, days, "/");
    }

    if (page_load_count > 4) {
        // console.log('looks like you\'ve been here a few times');
    }
};
