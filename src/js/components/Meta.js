import React from "react";

const Meta = ({ title, artist }) => (
    <div className="meta__wrapper">
        <span className="meta__title">{title}</span>
        <span className="meta__artist">{artist}</span>
    </div>
);

export default Meta;
