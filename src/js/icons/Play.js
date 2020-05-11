import React from "react";

const Play = ({ className }) => (
    <svg
        className={`icon icon--play ${className}`}
        viewBox="0 0 75 100"
        preserveAspectRatio="xMaxYMax meet"
    >
        <path d="M 0 0 L 75 50 L 0 100 z" />
    </svg>
);

export default Play;
