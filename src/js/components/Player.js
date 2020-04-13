import React, { useState, useEffect } from "react";

import {
    formatTime,
    calculateCurrentPercentage,
    currentTimeFromPercentage,
} from "../helpers/audio";

import Loading from "../icons/Loading";
import Play from "../icons/Play";
import Pause from "../icons/Pause";

const Player = ({ url, title, artist, theme = "skeleton" }) => {
    url = "https://audio.tomhazledine.com/files/lostThatEasy.mp3";

    const [audio, setAudio] = useState(() => new Audio(url));

    const [status, setStatus] = useState("pending"); // pending | loading | seeking | error | ready
    const [playStatus, setPlayStatus] = useState("paused"); // playing | paused
    const [times, setTimes] = useState({
        duration: 0,
        current: 0,
    });
    const [volume, setVolume] = useState(() => ({
        value: 100, // range: 0-100
        muted: false,
    }));

    const setupAudioListeners = () => {
        setStatus("loading");
        // audio.addEventListener("progress", handleProgress, false);
        // audio.addEventListener("error", handleError, false);

        // audio.addEventListener("abort", handleAbort, false);
        // audio.addEventListener("audioprocess", handleAudioprocess, false);
        audio.addEventListener("canplay", handleCanplay, false);
        audio.addEventListener("canplaythrough", handleCanplaythrough, false);
        // audio.addEventListener("complete", handleComplete, false);
        audio.addEventListener("durationchange", handleDurationchange, false);
        // audio.addEventListener("emptied", handleEmptied, false);
        // audio.addEventListener("ended", handleEnded, false);
        // audio.addEventListener("loadeddata", handleLoadeddata, false);
        // audio.addEventListener("loadedmetadata", handleLoadedmetadata, false);
        audio.addEventListener("pause", handlePause, false);
        audio.addEventListener("play", handlePlay, false);
        audio.addEventListener("playing", handlePlaying, false);
        // audio.addEventListener("ratechange", handleRatechange, false);
        // audio.addEventListener("seeked", handleSeeked, false);
        // audio.addEventListener("seeking", handleSeeking, false);
        // audio.addEventListener("stalled", handleStalled, false);
        // audio.addEventListener("suspend", handleSuspend, false);
        audio.addEventListener("timeupdate", handleTimeupdate, false);
        // audio.addEventListener("volumechange", handleVolumechange, false);
        // audio.addEventListener("waiting", handleWaiting, false);
    };

    // const handleAbort = (e) => {
    //     console.log("handleAbort", e);
    // };
    // const handleAudioprocess = (e) => {
    //     console.log("handleAudioprocess", e);
    // };
    const handleCanplay = (e) => {
        if (status === "pending" || status === "loading") {
            setStatus("ready");
        }
    };
    const handleCanplaythrough = (e) => {
        if (status === "pending" || status === "loading") {
            setStatus("ready");
        }
    };
    // const handleComplete = (e) => {
    //     console.log("handleComplete", e);
    // };
    const handleDurationchange = (e) => {
        console.log("handleDurationchange", e);
        setTimes((times) => ({ ...times, duration: audio.duration }));
    };
    // const handleEmptied = (e) => {
    //     console.log("handleEmptied", e);
    // };
    // const handleEnded = (e) => {
    //     console.log("handleEnded", e);
    // };
    // const handleError = (e) => {
    //     console.log("***");
    //     console.log("handleError", e);
    // };
    // const handleLoadedmetadata = (e) => {
    //     console.log("handleLoadedmetadata", e);
    // };
    // const handleLoadeddata = (e) => {
    //     console.log("handleLoadeddata", e);
    // };
    const handleLoadstart = (e) => {
        setupAudioListeners();
    };
    const handlePause = (e) => {
        setPlayStatus("paused");
    };
    const handlePlay = (e) => {
        setPlayStatus("playing");
    };
    const handlePlaying = (e) => {
        setPlayStatus("playing");
    };
    // const handleProgress = (e) => {
    //     console.log("***");
    //     console.log("handleProgress", e);
    // };
    // const handleRatechange = (e) => {
    //     console.log("handleRatechange", e);
    // };
    // const handleSeeked = (e) => {
    //     console.log("handleSeeked", e);
    // };
    // const handleSeeking = (e) => {
    //     setStatus("loading");
    //     console.log("handleSeeking", e);
    // };
    // const handleStalled = (e) => {
    //     console.log("handleStalled", e);
    // };
    // const handleSuspend = (e) => {
    //     console.log("handleSuspend", e);
    // };
    const handleTimeupdate = (e) => {
        setTimes((times) => ({ ...times, current: audio.currentTime }));
    };
    // const handleVolumechange = (e) => {
    //     console.log("handleVolumechange", e);
    // };
    // const handleWaiting = (e) => {
    //     console.log("handleWaiting", e);
    // };

    const handlePlayPause = () => {
        if (status === "pending" && audio) {
            setupAudioListeners();
        }
        if (playStatus === "paused") {
            audio.play();
        } else {
            audio.pause();
        }
    };

    const handleScrub = (e) => {
        const updatedTime = currentTimeFromPercentage(
            times.duration,
            e.target.value
        );
        audio.currentTime = updatedTime;
    };

    const handleVolumeScrub = (e) => {
        setVolume({
            muted: false,
            value: parseInt(e.target.value, 10),
        });
    };

    const handleMute = () => {
        setVolume((old) => ({
            ...old,
            muted: !old.muted,
        }));
    };

    useEffect(() => {
        setAudio(new Audio(url));
    }, []);

    useEffect(() => {
        if (audio && status === "pending") {
            audio.addEventListener("loadstart", handleLoadstart, false);
        }
    }, [audio]);

    useEffect(() => {
        if (volume.muted) {
            audio.volume = 0;
        } else {
            audio.volume = volume.value / 100;
        }
    }, [volume]);

    const percentDone = calculateCurrentPercentage(
        times.current,
        times.duration
    );

    return (
        <div className={`${status} picobel__player ${theme}`}>
            <div className="loader"></div>
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
            <div className="meta__wrapper">
                <span className="meta__title">{title}</span>
                <span className="meta__artist">{artist}</span>
            </div>
            <div className="timings__wrapper">
                {status === "pending" && (
                    <span className="timings__status">Pending</span>
                )}
                {status !== "pending" && (
                    <React.Fragment>
                        <span className="timings__timer">
                            {formatTime(times.current)}
                        </span>
                        <div className="progress-slider__wrapper">
                            <div className="progress-slider__background"></div>
                            <div
                                className="progress-slider__indicator"
                                style={{ width: `${percentDone}%` }}
                                // style={{ width: `20%` }}
                            ></div>
                            <div
                                className="progress-slider__playhead"
                                style={{ left: `${percentDone}%` }}
                            ></div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                className="progress-slider__range"
                                value={percentDone}
                                onChange={handleScrub}
                            />
                        </div>
                        <span className="timings__duration">
                            {formatTime(times.duration)}
                        </span>
                    </React.Fragment>
                )}
            </div>
            <div className="volume__wrapper">
                <button
                    className={`volume__mute ${volume.muted ? "muted" : ""}`}
                    onClick={handleMute}
                >
                    Mute
                </button>
                <div className="volume__label-wrapper">
                    <span className="volume__label">Volume</span>
                    <span className="volume__value">{volume.value}</span>
                </div>
                <div className="volume-slider__wrapper">
                    <div className="pseudoVolumeBackground"></div>
                    <div
                        className="volume-slider__progress-indicator"
                        style={{ width: `${volume.value}%` }}
                    ></div>
                    <div
                        className="volume-slider__playhead"
                        style={{ left: `${volume.value}%` }}
                    ></div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        className="volume-slider__range"
                        value={volume.muted ? 0 : parseInt(volume.value, 10)}
                        onChange={handleVolumeScrub}
                    />
                </div>
            </div>
        </div>
    );
};

export default Player;
