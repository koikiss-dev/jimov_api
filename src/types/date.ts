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
  /** 
   * The year of publication. This property is not optional 
   * because in many anime pages they only say the year of publication but
   * not the month and day. */
  year: number | string;
  month?: number | string;
  day?: number | string;
}

/**
 * If the anime was completed it has a start and end date of
 * publication but if it is still on air only the begin property will contain
 * the information of when it was published, the end property is optional.
 * 
 * @author Zukaritasu
 */
export interface IDatePeriod {
  /** The exact date on which it was published the anime */
  begin: ICalendar;
  /** 
   * The exact date the anime ended. Ownership is optional because it
   * may not be finished yet. */
  end?: ICalendar;
}

/**
 * Specifies the year, month and day in which the anime or other content
 * related to the anime was released in the form of a movie, OVA or ONA.
 * Implementation of the {@link ICalendar} interface
 * 
 * @author Zukaritasu
 * @extends ICalendar
 */
export class Calendar implements ICalendar {
  /** @inheritdoc */
  year: number;
  /** @inheritdoc */
  month?: number;
  /** @inheritdoc */
  day?: number;

  constructor(year: number) {
    this.year = year;
  }

  /**
   * Returns an instance of the ICalendar interface. The
   * function takes as parameter the date in a string; the format
   * must be compatible with the constructor of the Date class.
   * @example
   * Calendar.getCalendar("01/05/2022")
   * 
   * @param date 
   * @returns ICalendar
   */
  static getCalendar(date: string): ICalendar {
    const obj = new Date(date);
    return { year: obj.getFullYear(), day: obj.getDay(), month: obj.getMonth() };
  }
}

/**
 * Implementation of the {@link IDatePeriod} interface
 * 
 * @author Zukaritasu
 * @extends IDatePeriod
 */
export class DatePeriod implements IDatePeriod {
  /** @inheritdoc */
  begin: ICalendar;
  /** @inheritdoc */
  end?: ICalendar;

  constructor(begin: ICalendar, end?: ICalendar) {
    this.begin = begin;
    this.end = end;
  }
}
