import React, { useState, useEffect } from "react";

import { formatTime } from "../helpers/audio";

import Meta from "./Meta";
import PlayPause from "./PlayPause";
import Range from "./Range";

const Player = ({
    url,
    title,
    artist,
    theme = "aqoc-player",
    features = {},
}) => {
    const includedFeatures = {
        volume: true,
        mute: true,
        title: true,
        ...features,
    };
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
    const handleDurationchange = () => {
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

    const handleProgressUpdate = (newTime) => (audio.currentTime = newTime);

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

    return (
        <div className={`${status} picobel__player ${theme}`}>
            <PlayPause
                handlePlayPause={handlePlayPause}
                status={status}
                playStatus={playStatus}
            />
            <div className="player__body">
                {includedFeatures.title && (
                    <Meta title={title} artist={artist} />
                )}
                <div className="timings__wrapper">
                    <span className="timings__timer">
                        {formatTime(times.current)}
                    </span>
                    <span className="timings__duration">
                        {formatTime(times.duration)}
                    </span>
                    {status === "pending" ? (
                        <span className="timings__status">Pending</span>
                    ) : (
                        <Range
                            className={"progress-slider"}
                            max={times.duration}
                            current={times.current}
                            update={handleProgressUpdate}
                        />
                    )}
                </div>
            </div>
            {includedFeatures.volume || includedFeatures.mute ? (
                <div className="volume__wrapper">
                    {includedFeatures.mute && (
                        <button
                            className={`volume__mute ${
                                volume.muted ? "muted" : ""
                            }`}
                            onClick={handleMute}
                        >
                            Mute
                        </button>
                    )}
                    {includedFeatures.volume && (
                        <React.Fragment>
                            <div className="volume__label-wrapper">
                                <span className="volume__label">Volume</span>
                                <span className="volume__value">
                                    {volume.value}
                                </span>
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
                                    value={
                                        volume.muted
                                            ? 0
                                            : parseInt(volume.value, 10)
                                    }
                                    onChange={handleVolumeScrub}
                                />
                            </div>
                        </React.Fragment>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default Player;
