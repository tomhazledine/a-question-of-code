/**
 * FOOTNOTES TO SIDENOTES
 *
 * Turn the footnotes-markup (outputed by Jetpack)
 * into the markup needed for sidenotes. The reason
 * for doing this is to preserve the accessibility
 * of our posts (the footnotes markup works fine
 * without any CSS or JS, and shows up as-expected
 * in RSS feeds) but allow the full site to have
 * elegant footnotes.
 */

export const convert_footnotes_to_sidenotes = () => {
    // First things first, let's get all the footnotes
    // on the page. We'll need to pair the in-text links
    // (we'll need them when we want to position the
    // sidenotes) with the footnotes.
    const footnotes_wrapper = document.querySelector(".footnotes");

    // Only try to create our sidenotes if we actually
    // have some footnotes...
    if (footnotes_wrapper) {
        const footnotes = footnotes_wrapper.getElementsByTagName("li");

        // Loop through the footnotes and get their IDs
        // (which we can use to find the in-text links)
        // and their content.
        const sidenotes = [...footnotes].map(footnote => {
            const footnoteLink = footnote.querySelector(".footnote-backref");
            footnoteLink.remove();
            const content = footnote.innerHTML;
            return { id: footnote.id, content: content.trim() };
        });

        footnotes_wrapper.remove();

        // Loop through the sidenotes. Build the sidenote
        // markup, then swap it with the link markup.
        sidenotes.map(sidenote => {
            // Get the link element.
            const sidenote_link = document.querySelectorAll(
                "a[href='#" + sidenote.id + "']"
            );

            // Create a new element to hold our sidenote.
            var sidenote_markup = document.createElement("span");
            // Give it a class.
            sidenote_markup.className = "sidenote";
            // Add the content.
            sidenote_markup.innerHTML =
                '<span class="sidenote-bracket"> (</span>' +
                sidenote.content +
                '<span class="sidenote-bracket">)</span>';

            // Swap the link with the new markup.
            var sidenote_link_parent = sidenote_link[0].parentNode;
            sidenote_link_parent.parentNode.replaceChild(
                sidenote_markup,
                sidenote_link_parent
            );
        });

        // Add has_sidenotes class to entry-content.
        var entry_content_wrapper = document.querySelector(".entry-content");
        entry_content_wrapper.className += " has-sidenotes";
    }
};
