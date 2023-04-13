"use strict";
/*
 *
 *
 *
 *
 *
 *
 */
exports.__esModule = true;
exports.DatePeriod = exports.Calendar = void 0;
/**
 * Specifies the year, month and day in which the anime or other content
 * related to the anime was released in the form of a movie, OVA or ONA.
 *
 * @author Zukaritasu
 * @extends ICalendar
 */
var Calendar = /** @class */ (function () {
    /**
     * @param year
     */
    function Calendar(year) {
        this.year = year;
    }
    /**
     *
     * @param date
     * @returns
     */
    Calendar.getCalendar = function (date) {
        return { year: new Date(date).getFullYear() };
    };
    return Calendar;
}());
exports.Calendar = Calendar;
/**
 *
 *
 * @author Zukaritasu
 * @extends IDatePeriod
 */
var DatePeriod = /** @class */ (function () {
    function DatePeriod() {
    }
    return DatePeriod;
}());
exports.DatePeriod = DatePeriod;
