function beforeAfterTenYears(curYear) {
    const year = Number(curYear);
    const yearRange = [];
    for (let i=-10; i<10; i++) {
        yearRange.push(year+i);
    }
    return yearRange;
}

function getTimeStamp(year, month) {
    const realMonth = Number(month) + 1 > 9 ? (Number(month) + 1).toString() : "0" + (Number(month) + 1);
    const realYear = year.toString();
    const realTime = realYear + "-" + realMonth + "-01 08:00:00";
    return new Date(realTime).getTime();
}

export {
    beforeAfterTenYears,
    getTimeStamp
}