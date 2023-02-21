function formatDate(date: string) {
    let modifiedDate = `${date.split('.')[0]}.${date.split('.')[1]}.${date.split('.')[2]}`;
    modifiedDate = modifiedDate.replaceAll('.', '-');
    return modifiedDate;
}

export default formatDate;
