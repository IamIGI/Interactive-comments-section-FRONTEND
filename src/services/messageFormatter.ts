function formatMessage(message: string) {
    const regex = /@\w+\s?/g; // Matches any word starting with "@" followed by optional whitespace
    return message.replace(regex, '');
}

export default formatMessage;
