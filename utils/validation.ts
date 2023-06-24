import {ElectionProperties} from "~/utils/interfaces";
import {PropertyCalculator} from "~/utils/deadlines";
import {FORBIDDEN_DATES} from "~/utils/forbidden-dates";

const getDateRange = (start: Date, end: Date) => {
    const days = [];
    const current = new Date(start);
    while (current <= end) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }
    return days;
}

const getDateRangeString = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const range = getDateRange(startDate, endDate);
    const rangeString = [];
    for (let day of range) {
        rangeString.push(day.toISOString().substring(0, 10));
    }
    return rangeString;
}

// Last day comes after first day
export const checkLastElectionDayAfterFirstElectionDay = (prop: ElectionProperties, calc: PropertyCalculator) => {
    if (calc.checkPlenum && prop.plenum) {
        return true;
    }
    if (prop.dateStart && prop.dateEnd) {
        const first = new Date(prop.dateStart);
        const last = new Date(prop.dateEnd);
        return first < last;
    }
    return true;
}
// At least 3 days and at most 5 days
export const checkThreeToFiveDays = (prop: ElectionProperties, calc: PropertyCalculator) => {
    if (calc.checkPlenum && prop.plenum) {
        return true;
    }
    if (prop.dateStart && prop.dateEnd) {
        const first = new Date(prop.dateStart);
        const last = new Date(prop.dateEnd);
        const diff = (last - first) / (1000 * 60 * 60 * 24);
        return 2 <= diff && diff <= 4;
    }
    return true;
}
// first day is mon-wed
export const checkFirstDayIsMonTueWed = (prop: ElectionProperties, calc: PropertyCalculator) => {
    if (prop.dateStart) {
        const first = new Date(prop.dateStart);
        if (calc.checkPlenum && prop.plenum) {
            return 0 < first.getDay() && first.getDay() < 6;
        }
        return 0 < first.getDay() && first.getDay() < 4;
    }
    return true;
}
// last day is wed-fri
export const checkLastDayIsWedThuFri = (prop: ElectionProperties, calc: PropertyCalculator) => {
    if (calc.checkPlenum && prop.plenum) {
        return true;
    }
    if (prop.dateEnd) {
        const last = new Date(prop.dateEnd);
        return 2 < last.getDay() && last.getDay() < 6;
    }
    return true;
}
// Main Deadline on days 10-13 before first election day § 13 (5)
export const checkMainDeadline = (prop: ElectionProperties) => {
    if (prop.dateStart && prop.mainDeadline) {
        const first = new Date(prop.dateStart);
        const mainDeadline = new Date(prop.mainDeadline);
        const diff = (first - mainDeadline) / (1000 * 60 * 60 * 24);
        return 10 <= diff && diff <= 13;
    }
    return true;
}
// There is a polling station for each election day
export const checkPollingStationExistsForEachDay = (prop: ElectionProperties) => {
    if (prop.dateStart && prop.dateEnd && prop.pollingPlaces.length > 0) {
        const first = new Date(prop.dateStart);
        const last = new Date(prop.dateEnd);
        if (first < last) {
            const range = getDateRange(first, last);
            const dateStrings = new Set(range.map(r => r.toISOString()));
            for (let item of prop.pollingPlaces) {
                if (item.date) {
                    const itemDateString = new Date(item.date).toISOString();
                    dateStrings.delete(itemDateString);
                }
            }
            return dateStrings.size === 0;
        }
    }
    return true;
}
// Polling stations are on election days
export const checkPollingStationsOnElectionDays = (prop: ElectionProperties, calc: PropertyCalculator) => {
    if (calc.checkPlenum && prop.plenum) {
        if (prop.dateStart) {
            const first = new Date(prop.dateStart);
            for (let item of prop.pollingPlaces) {
                if (item.date) {
                    const itemDate = new Date(item.date);
                    if (itemDate < first || itemDate > first) {
                        return false;
                    }
                }
            }
        }
    } else {
        if (prop.dateStart && prop.dateEnd) {
            const first = new Date(prop.dateStart);
            const last = new Date(prop.dateEnd);
            for (let item of prop.pollingPlaces) {
                if (item.date) {
                    const itemDate = new Date(item.date);
                    if (itemDate < first || itemDate > last) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}
// There are at least 3 days for checking the electoral register
export const checkAtLeastThreeElectoralRegisterDates = (prop: ElectionProperties) => {
    if (prop.electoralRegisterPlaces.length === 0) {
        return true;
    }
    const dates = new Set();
    for (let item of prop.electoralRegisterPlaces) {
        if (item.date) {
            dates.add(item.date);
        }
    }
    return dates.size >= 3;
}
// The electoral register can only be checked on workdays (Mon-Fri)
export const checkElectoralRegisterDatesAreWorkdays = (prop: ElectionProperties) => {
    for (let item of prop.electoralRegisterPlaces) {
        if (item.date) {
            const itemDate = new Date(item.date);
            if (itemDate.getDay() === 0 || itemDate.getDay() === 6) {
                return false;
            }
        }
    }
    return true;
}
// All days for checking the electoral register are before the main deadline
export const checkElectoralRegisterDatesBeforeMainDeadline = (prop: ElectionProperties) => {
    if (prop.mainDeadline) {
        const mainDeadline = new Date(prop.mainDeadline);
        for (let item of prop.electoralRegisterPlaces) {
            if (item.date) {
                const itemDate = new Date(item.date);
                if (itemDate > mainDeadline) {
                    return false;
                }
            }
        }
    }
    return true;
}
// the counting is on or after the last election day
export const checkCountingAfterElectionEnd = (prop: ElectionProperties, calc: PropertyCalculator) => {
    if (calc.checkPlenum && prop.plenum) {
        return true;
    }
    if (prop.dateEnd && prop.countingDateTime) {
        const last = new Date(prop.dateEnd);
        const counting = new Date(prop.countingDateTime);
        return counting > last;
    }
    return true;
}
// the constitutive assembly takes place on days 5-14 after the last election day
export const checkConstitutiveAssemblyDate = (prop: ElectionProperties, calc: PropertyCalculator) => {
    if (calc.checkPlenum && prop.plenum) {
        return true;
    }
    if (prop.dateEnd && prop.constituentAssemblyDateTime) {
        const last = new Date(prop.dateEnd);
        const constitutiveAssembly = new Date(prop.constituentAssemblyDateTime);
        constitutiveAssembly.setUTCHours(0, 0, 0, 0);
        const diff = (constitutiveAssembly - last) / (1000 * 60 * 60 * 24);
        return 5 <= diff && diff <= 14;
    }
    return true;
}

const getForbiddenDateTitle = (date: string) => {
    for (let forbiddendate of FORBIDDEN_DATES) {
        if (forbiddendate.start <= date && forbiddendate.end >= date) {
            return forbiddendate.title;
        }
    }
    return null;
}
export const checkForbiddenDates = (prop: ElectionProperties) => {
    const messages = [];
    // check if election days overlap with forbidden days
    if (prop.plenum) {
        if (prop.dateStart) {
            const title = getForbiddenDateTitle(prop.dateStart);
            if (title) {
                messages.push(`${prop.dateStart} kann kein Wahltag sein: ${title}`);
            }
        }
    } else {
        if (prop.dateStart && prop.dateEnd) {
            const range = getDateRangeString(prop.dateStart, prop.dateEnd);
            for (let day of range) {
                const title = getForbiddenDateTitle(day);
                if (title) {
                    messages.push(`${day} kann kein Wahltag sein: ${title}`);
                }
            }
        }
    }

    // check if main deadline is a forbidden day
    if (prop.mainDeadline) {
        const title = getForbiddenDateTitle(prop.mainDeadline);
        if (title) {
            messages.push(`Die gemeinsame Frist zur Einreichung von Kandidaturen, zur Einreichung von Briefwahlanträgen,
             und zur Einreichung von Einsprüchen gegen das Wählendenverzeichnis kann nicht auf den ${prop.mainDeadline}
              gelegt werden: ${title}`);
        }
    }
    return messages;
}
