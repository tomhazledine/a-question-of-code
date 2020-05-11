import React from "react";
import ReactDOM from "react-dom";

import Player from "./components/Player";

const mountPoint = document.getElementById("player__wrapper");

if (mountPoint) {
    const audioPath = mountPoint.getAttribute("data-audio");
    const title = mountPoint.getAttribute("data-title");
    const artist = mountPoint.getAttribute("data-artist");
    const rawFeatures = mountPoint.getAttribute("data-features") || "{}";
    const features = JSON.parse(rawFeatures);
    console.log("features", features);

    ReactDOM.render(
        <Player
            url={audioPath}
            title={title}
            artist={artist}
            features={{ ...features, volume: false, mute: false }}
        />,
        mountPoint
    );
}
