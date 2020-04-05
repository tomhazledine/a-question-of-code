import React, { useState } from "react";

import { formatTime } from "../helpers/audio";

const Player = ({ url, title, artist, theme = "skeleton" }) => {
    console.log("url", url);

    const [status, setStatus] = useState("loading"); // loading | playing | paused | error
    const [times, setTimes] = useState({
        duration: 0,
        current: 0,
    });

    return (
        <div className={`${status} customAudioPlayer customPlayer ${theme}`}>
            <div className="loader"></div>
            <button className="playerTrigger">
                <span className="buttonText">play</span>
            </button>
            <div className="metaWrapper">
                <span className="titleDisplay">{title}</span>
                <span className="artistDisplay">{artist}</span>
            </div>
            <div className="timingsWrapper">
                <span className="songPlayTimer">
                    {formatTime(times.current)}
                </span>
                <div className="songProgressSliderWrapper">
                    <div className="pseudoProgressBackground"></div>
                    <div className="pseudoProgressIndicator"></div>
                    <div className="pseudoProgressPlayhead"></div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        className="songProgressSlider"
                    />
                </div>
                <span className="songDuration">
                    {formatTime(times.duration)}
                </span>
            </div>
            <div className="songVolume">
                <button className="songMuteButton">Mute</button>
                <div className="songVolumeLabelWrapper">
                    <span className="songVolumeLabel">Volume</span>
                    <span className="songVolumeValue">10</span>
                </div>
                <div className="songVolumeSliderWrapper">
                    <div className="pseudoVolumeBackground"></div>
                    <div className="pseudoVolumeIndicator"></div>
                    <div className="pseudoVolumePlayhead"></div>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        className="songVolumeSlider"
                    />
                </div>
            </div>
        </div>
    );
};

export default Player;
