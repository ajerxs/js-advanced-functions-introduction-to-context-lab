function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(array) {
    return array.map(e => createEmployeeRecord(e));
};

function createTimeInEvent(record, dateTime) {
    const punchArray = dateTime.split(" ");
    record.timeInEvents.push({
        type: "TimeIn",
        date: punchArray[0],
        hour: parseInt(punchArray[1], 10)
    })
    return record
};

function createTimeOutEvent(record, dateTime) {
    const punchArray = dateTime.split(" ");
    record.timeOutEvents.push({
        type: "TimeOut",
        date: punchArray[0],
        hour: parseInt(punchArray[1], 10)
    })
    return record
};

function hoursWorkedOnDate(record, date) {
    const dateIn = record.timeInEvents.find(e => e.date === date);
    const dateOut = record.timeOutEvents.find(e => e.date === date);
    return (dateOut.hour - dateIn.hour)/100;
};

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
};

function allWagesFor(record) {
    let totalWages = 0;
    for (let i = 0; i < record.timeInEvents.length; i++) {
        let date = record.timeInEvents[i].date;
        let wage = wagesEarnedOnDate(record, date);
        totalWages += wage;
    };
    return totalWages;
};

function calculatePayroll(employees) {
    let wagesArray = employees.map(e => allWagesFor(e));
    return wagesArray.reduce((x, e) => x + e);
};

function findEmployeeByFirstName(array, name) {
    return array.find(e => e.firstName === name);
};