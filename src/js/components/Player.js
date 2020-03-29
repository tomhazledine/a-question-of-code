import React from "react";

const Player = ({ url, className }) => (
    <audio className={className} controls src={url}>
        Your browser does not support the
        <code>audio</code> element.
    </audio>
);

export default Player;
