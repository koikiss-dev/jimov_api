"use strict";
/*
 *
 *
 *
 *
 *
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePeriod = exports.Calendar = void 0;
/**
 * Specifies the year, month and day in which the anime or other content
 * related to the anime was released in the form of a movie, OVA or ONA.
 *
 * @author Zukaritasu
 * @extends ICalendar
 */
class Calendar {
    /**
     * @param year
     */
    constructor(year) {
        this.year = year;
    }
    /**
     *
     * @param date
     * @returns
     */
    static getCalendar(date) {
        return { year: new Date(date).getFullYear() };
    }
}
exports.Calendar = Calendar;
/**
 *
 *
 * @author Zukaritasu
 * @extends IDatePeriod
 */
class DatePeriod {
}
exports.DatePeriod = DatePeriod;
//# sourceMappingURL=date.js.map