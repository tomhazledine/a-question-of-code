import React from "react";

const Range = ({ max, current, update, className }) => {
    const getPercentage = (current, duration) => {
        if (!current || !duration) return 0;
        const percentage = ((current / duration) * 100).toFixed(2);
        return percentage;
    };
    const getValue = (duration, percentage) => duration * (percentage / 100);

    const handleScrub = (e) => {
        const updatedTime = getValue(max, e.target.value);
        update(updatedTime);
    };

    const percentDone = getPercentage(current, max);

    return (
        <div className={`${className}__wrapper`}>
            <div className={`${className}__background`}></div>
            <div
                className={`${className}__indicator`}
                style={{ width: `${percentDone}%` }}
            ></div>
            <div
                className={`${className}__playhead`}
                style={{ left: `${percentDone}%` }}
            ></div>
            <input
                type="range"
                min="0"
                max="100"
                className={`${className}__range`}
                value={percentDone}
                onChange={handleScrub}
            />
        </div>
    );
};

export default Range;
