var tweet_form = document.getElementById("tweet-form");

if (tweet_form) {
    var tweet_form_submit = document.getElementById("tweet-form-submit");

    tweet_form.addEventListener("submit", tweet_form_submission, false);
}

function tweet_form_submission(e) {
    e.preventDefault();
    var raw_tweet_text = this.elements["tweet-content"].value;
    var tweet_url =
        "https://twitter.com/intent/tweet?source=webclient&amp;text=";
    var parsed_tweet_text = raw_tweet_text.replace(" ", "+");
    var tweet_destination = tweet_url + parsed_tweet_text;
    ga("send", "event", "Tweet", "click", parsed_tweet_text);
    window.open(tweet_destination);
}
