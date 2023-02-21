import format from 'date-fns/format';

function dateDifference(a: Date): string {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const b = new Date(format(new Date(), 'yyyy-MM-dd'));
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    const difference = Math.floor((utc2 - utc1) / _MS_PER_DAY);

    if (Math.floor(difference / 30) >= 1) {
        return `${Math.floor(difference / 30)} month ago`;
    } else if (Math.floor(difference / 364) >= 1) {
        return `${Math.floor(difference / 364)} year ago`;
    } else if (difference === 0) {
        return 'today';
    } else {
        return `${difference} days ago`;
    }
}

export default dateDifference;
