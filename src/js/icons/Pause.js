import React from "react";

const Pause = ({ className }) => (
    <svg
        className={`icon icon--pause ${className}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMaxYMax meet"
    >
        <path d="M 0 0 L 40 0 L 40 100 L 0 100 z" />
        <path d="M 60 0 L 100 0 L 100 100 L 60 100 z" />
    </svg>
);

export default Pause;
