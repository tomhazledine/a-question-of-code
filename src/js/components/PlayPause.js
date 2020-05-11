import React from "react";

import Loading from "../icons/Loading";
import Play from "../icons/Play";
import Pause from "../icons/Pause";

const PlayPause = ({ handlePlayPause, status, playStatus }) => (
    <button className="player-trigger" onClick={handlePlayPause}>
        {status === "pending" || status === "loading" ? (
            <Loading className="play-trigger__icon" />
        ) : playStatus === "playing" ? (
            <Pause className="play-trigger__icon" />
        ) : (
            <Play className="play-trigger__icon" />
        )}
        <span className="player-trigger__button-text">play</span>
    </button>
);

export default PlayPause;
