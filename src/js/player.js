import React from "react";
import ReactDOM from "react-dom";

import Player from "./components/Player";

const mountPoint = document.getElementById("player__wrapper");

if (mountPoint) {
    const audioPath = mountPoint.getAttribute("data-audio");

    ReactDOM.render(<Player url={audioPath} />, mountPoint);
}
