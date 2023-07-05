const createDaySchedule = (startTime, endTime) => {
    const timesArr = [
        '12:00 AM',
        "12:30 AM",
        "1:00 AM",
        "1:30 AM",
        "2:00 AM",
        "2:30 AM",
        "3:00 AM",
        "3:30 AM",
        "4:00 AM",
        "4:30 AM",
        "5:00 AM",
        "5:30 AM",
        "6:00 AM",
        "6:30 AM",
        "7:00 AM",
        "7:30 AM",
        "8:00 AM",
        "8:30 AM",
        "9:00 AM",
        "9:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
        "1:00 PM",
        "1:30 PM",
        "2:00 PM",
        "2:30 PM",
        "3:00 PM",
        "3:30 PM",
        "4:00 PM",
        "4:30 PM",
        "5:00 PM",
        "5:30 PM",
        "6:00 PM",
        "6:30 PM",
        "7:00 PM",
        "7:30 PM",
        "8:00 PM",
        "8:30 PM",
        "9:00 PM",
        "9:30 PM",
        "10:00 PM",
        "10:30 PM",
        "11:00 PM",
        "11:30 PM"
    ];

    const startIdx = timesArr.indexOf(startTime);
    const endIdx = timesArr.indexOf(endTime);
    const scheduleKeys = timesArr.slice(startIdx, endIdx);
    const dailySchedule = {};
    for (const time of scheduleKeys) {
        dailySchedule[time] = false;
    }

    return dailySchedule;
};

exports.updateDaySchedule = (oldDaySchedule, newStartTime, newEndTime) => {
    const newDaySchedule = createDaySchedule(newStartTime, newEndTime);

    for (const time of Object.keys(newDaySchedule)) {
        if (oldDaySchedule[time]) newDaySchedule[time] = oldDaySchedule[time];
    }

    return newDaySchedule;
}

exports.createEmptySchedule = (datesArr, startTime, endTime) => {
// const createEmptySchedule = (datesArr, startTime, endTime) => {
    let emptySchedule = {};

    for (const date of datesArr) {
        console.log(date);
        emptySchedule[date] = createDaySchedule(startTime, endTime);
    }

    return emptySchedule;
}

// console.log(createEmptySchedule([
//     "2023-05-14",
//     "2023-05-16",
//     "2023-05-18",
//     "2023-05-19"
// ], '11:00 AM', '3:00 PM'))