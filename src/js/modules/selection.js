// CHECK RELATIONSHIP
// Work out if element-1 is a descendant of element-2.
const check_relationship = (parent, child) => {
    let node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};

// GET SELECTED TEXT
// If some text has been selected, get it (using whichever browser
// selection API is available to us). If not, return false.
const get_selection = () => {
    let position = {};
    let text = false;
    if (window.getSelection) {
        const selection = window.getSelection();
        text = selection.toString();
        if (text.length > 0 && text != " ") {
            const range = selection.getRangeAt(0);
            const range_bounding_rect = range.getBoundingClientRect();
            const calculated_to_position =
                window.scrollY + range_bounding_rect.top;

            const center_point =
                (range_bounding_rect.left + range_bounding_rect.right) / 2;

            position.x = Math.round(calculated_to_position);
            position.y = Math.round(center_point);
        }
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }

    return { text, position };
};

// BUILD TWEET URL AND CONTENT
// Trim the text to the appropriate length, then parse the text into
// tweet-friendly format, and add a page-link and my username.
const build_tweet_content = text => {
    // NOTE: use %23 rather than # if adding a hashtag.

    // Which twitter username do we want to mention in the tweet?
    const username = "@thomashazledine";

    // What's the page's URL?
    const link = window.location.href;

    // t.co URL-shortener length
    const tco_length = 22;

    // How many characters can we use in a tweet?
    const max_length = 280;

    // How many characters is our username?
    const username_length = username.length + 1; // "1" accounts for a space.

    // Calculate how many characters we have left over for text.
    const max_tweet_length = max_length - username_length - tco_length;

    // Crop our text to fit the remaining character-count.
    if (text.length > max_tweet_length) {
        var trimmed_text = text.substring(0, max_tweet_length - 3);
        // Remove start/end spaces.
        trimmed_text = trimmed_text.replace(/^\s+|\s+$/g, "");
        // Add an ellipsis if the text has been cropped.
        trimmed_text = trimmed_text + "…";
    } else {
        // Remove start/end spaces.
        var trimmed_text = text.replace(/^\s+|\s+$/g, "");
    }

    // Replace spaces with "+" (so the sharing-link works).
    const parsed_text = trimmed_text.replace(/ /gi, "+");

    // Build the full tweet link.
    const tweet_href = `https://twitter.com/intent/tweet?source=webclient&amp;text=${parsed_text}+${link}+${username}`;

    return tweet_href;
};

// ON-SELECTION TRIGGER
// Initialise this function whenever some text is selected.
const selection_handler = (event, tweet_widget) => {
    const click_target = event.target;
    const selectable_wrapper = document.getElementsByClassName(
        "selectable-area"
    );

    const is_child = [...selectable_wrapper].map(wrapper =>
        check_relationship(wrapper, click_target)
    );

    const is_any_child = is_child.reduce((acc, c) => (c ? c : acc));

    // Only run the selection-code if the click
    // happens inside a `.selectable-area` element.
    if (is_any_child) {
        // Get the selected text
        const selection = get_selection();

        // If there is a selection & the selection
        // is more than 15 characters long...
        if (selection.text && selection.text.length > 15) {
            // Turn selection into "tweet" object.
            var tweet_url = build_tweet_content(selection.text);

            // Set the link for the widget.
            tweet_widget.setAttribute("href", tweet_url);

            // Make the widget visible.
            tweet_widget.style.display = "block";

            // Set the position for the tweet widget (using the
            // global vars set by the get_selection function).
            tweet_widget.style.top = selection.position.x + "px";
            tweet_widget.style.left = selection.position.y + "px";
        } else {
            // Hide the widget if there's no content to display.
            tweet_widget.style.display = "none";
        }
    } else {
        // Hide the widget if there's no content to display.
        tweet_widget.style.display = "none";
    }
};

// ON-SELECTION EVENT LISTENER
// There is no direct listener for selection events, so we need
// to check for events if the mouse or a key has been pressed.
export const setupTweetSelection = () => {
    // We'll always want to use the same element as a wrapper
    // for our widget. This is it.
    const tweet_widget = document.getElementById("tweet-widget");

    if (tweet_widget) {
        document.addEventListener(
            "keyup",
            e => selection_handler(e, tweet_widget),
            false
        );
        document.addEventListener(
            "mouseup",
            e => selection_handler(e, tweet_widget),
            false
        );
    }
};
