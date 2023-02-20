function formatDate(date: string) {
    return `${date.split('.')[0]}.${date.split('.')[1]}.${date.split('.')[2]}`;
}

export default formatDate;
