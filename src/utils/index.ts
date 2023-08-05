export function unixTimestampToRelativeTime(unixTimestamp: number) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const timeDifference = currentTimestamp - unixTimestamp;

    if (timeDifference < 60) {
        return `${timeDifference} seconds ago`;
    } else if (timeDifference < 3600) {
        return `${Math.floor(timeDifference / 60)}m`;
    } else if (timeDifference < 86400) {
        return `${Math.floor(timeDifference / 3600)}h`;
    } else {
        return `${Math.floor(timeDifference / 86400)}d`;
    }
}
