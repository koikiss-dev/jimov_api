/*
 * 
 * 
 * 
 * 
 * 
 * 
 */

//Spanish Providers - TypeScript version

/**
 * In most anime websites in the anime information part may be available
 * the year in which the content was published but without specifying the
 * month and day so the year property is not optional, although from the
 * HTML in some cases you can extract the exact month and day of publication,
 * in that case the month and day properties are optional.
 * 
 * @author Zukaritasu
 */
export interface ICalendar {
  year: number;
  month?: number;
  day?: number;
}

/**
 * If the anime was completed it has a start and end date of
 * publication but if it is still on air only the begin property will contain
 * the information of when it was published, the end property is optional.
 * 
 * @author Zukaritasu
 */
export interface IDatePeriod {
  begin: ICalendar;
  end?: ICalendar;
}

/**
 * Specifies the year, month and day in which the anime or other content
 * related to the anime was released in the form of a movie, OVA or ONA.
 * 
 * @author Zukaritasu
 * @extends ICalendar
 */
export class Calendar implements ICalendar {
  year: number;
  month?: number;
  day?: number;

  /**
   * @param year 
   */
  constructor(year: number) {
    this.year = year;
  }

  /**
   * 
   * @param date 
   * @returns 
   */
  static getCalendar(date: string): ICalendar {
    return { year: new Date(date).getFullYear() };
  }
}

/**
 * 
 * 
 * @author Zukaritasu
 * @extends IDatePeriod
 */
export class DatePeriod implements IDatePeriod {
  begin: ICalendar;
  end?: ICalendar;

  constructor(begin: ICalendar, end?: ICalendar) {
    this.begin = begin;
    this.end = end;
  }
}
