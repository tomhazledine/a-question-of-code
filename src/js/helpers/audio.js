export const formatTime = (seconds) => {
    let hours = Math.floor(seconds / 3600);

    let mins = Math.floor((seconds % 3600) / 60)
        .toFixed(0)
        .toString();

    let secs = Math.floor((seconds % 3600) % 60)
        .toFixed(0)
        .toString();

    // Left-pad seconds string if needed
    secs = secs >= 10 ? secs : `0${secs}`;

    let parsedTime = `${mins}:${secs}`;

    if (hours > 0) {
        // Left-pad minutes string if needed
        mins = mins >= 10 ? mins : `0${mins}`;
        parsedTime = `${hours}:${mins}:${secs}`;
    }

    return parsedTime;
};

export const calculateCurrentPercentage = (current, duration) => {
    if (!current || !duration) return 0;
    const percentage = ((current / duration) * 100).toFixed(2);
    return percentage;
};
export const currentTimeFromPercentage = (duration, percentage) =>
    duration * (percentage / 100);
