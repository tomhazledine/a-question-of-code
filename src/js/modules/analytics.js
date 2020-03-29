var intro_note_link = document.getElementsByClassName("intro-note-link");

for (var i = intro_note_link.length - 1; i >= 0; i--) {
    intro_note_link[i].addEventListener("click", track_intro_note_click);
}

function track_intro_note_click(e) {
    e.preventDefault();
    var target_url = e.target.href;
    ga("send", "event", "Intro Note Link", "click", target_url);
    window.location = target_url;
}

const tweet_widget_link = document.getElementById("tweet-widget");
if (tweet_widget_link) {
    tweet_widget_link.addEventListener("click", track_tweet_widget_click);
}

function track_tweet_widget_click(e) {
    e.preventDefault();
    var target_url = e.target.href;
    ga("send", "event", "Tweet Selection Link", "click", target_url);
    window.location = target_url;
}
