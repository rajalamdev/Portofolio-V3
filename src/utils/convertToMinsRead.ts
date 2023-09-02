function convertToMinsRead(content: string) {
    const averageWordPerMinute = 200;
    const getTotalWordsFromContent = content.split(" ").length

    const convertToMinute = Math.round(getTotalWordsFromContent / averageWordPerMinute)
    return convertToMinute
}

export default convertToMinsRead