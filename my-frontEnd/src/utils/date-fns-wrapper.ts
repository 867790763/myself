import {
  addDays,
  subDays,
  startOfDay,
  endOfDay,
  isBefore,
  isAfter,
  format,
  getYear,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  getSeconds,
  setYear,
  setMonth,
  setDate,
  setHours,
  setMinutes,
  setSeconds,
  differenceInDays,
  differenceInMonths,
  differenceInYears
} from "date-fns";

// 使用 DateWrapper
// const date = new DateWrapper(new Date());

// console.log(date.formatDate('yyyy-MM-dd')); // 输出: 当前日期格式化后的字符串，例如: 2025-03-14
// console.log(date.startOfDay().toDate()); // 输出: 当天的开始时间（00:00:00）
// console.log(date.endOfDay().toDate()); // 输出: 当天的结束时间（23:59:59.999）
// console.log(date.isBefore('2025-03-15')); // 输出: true
// console.log(date.isAfter('2025-03-13')); // 输出: true
// console.log(date.addDays(5).toDate()); // 输出: 5天后的日期对象
// console.log(date.subtractDays(3).toDate()); // 输出: 3天前的日期对象
// console.log(date.getYear()); // 输出: 当前年份，例如: 2025
// console.log(date.getMonth()); // 输出: 当前月份（0-11），例如: 2（表示三月）
// console.log(date.getDate()); // 输出: 当前日，例如: 14
// console.log(date.getHours()); // 输出: 当前小时，例如: 12
// console.log(date.getMinutes()); // 输出: 当前分钟，例如: 30
// console.log(date.getSeconds()); // 输出: 当前秒，例如: 45
// console.log(date.setYear(2026).toDate()); // 输出: 年份设置为2026的日期对象
// console.log(date.setMonth(5).toDate()); // 输出: 月份设置为6月的日期对象
// console.log(date.setDate(20).toDate()); // 输出: 日设置为20的日期对象
// console.log(date.setHours(15).toDate()); // 输出: 小时设置为15的日期对象
// console.log(date.setMinutes(45).toDate()); // 输出: 分钟设置为45的日期对象
// console.log(date.setSeconds(30).toDate()); // 输出: 秒设置为30的日期对象
// console.log(date.differenceInDays('2025-03-17')); // 输出: 与指定日期相差的天数，例如: 3
// console.log(date.differenceInMonths('2025-01-14')); // 输出: 与指定日期相差的月份数，例如: 2
// console.log(date.differenceInYears('2020-03-14')); // 输出: 与指定日期相差的年数，例如: 5

export class DateWrapper {
  private value: Date;

  constructor(value: Date | string) {
    if (typeof value === "string") {
      this.value = new Date(value);
    } else {
      this.value = value;
    }
  }

  /**
   * 格式化日期
   */
  formatDate(formatStr: string): string {
    return format(this.value, formatStr);
  }

  /**
   * 设置时间为当天的开始（00:00:00）
   */
  startOfDay(): DateWrapper {
    this.value = startOfDay(this.value);
    return this;
  }

  /**
   * 设置时间为当天的结束（23:59:59.999）
   */
  endOfDay(): DateWrapper {
    this.value = endOfDay(this.value);
    return this;
  }

  /**
   * 判断日期是否在另一个日期之前
   */
  isBefore(other: Date | string): boolean {
    const otherDate = typeof other === "string" ? new Date(other) : other;
    return isBefore(this.value, otherDate);
  }

  /**
   * 判断日期是否在另一个日期之后
   */
  isAfter(other: Date | string): boolean {
    const otherDate = typeof other === "string" ? new Date(other) : other;
    return isAfter(this.value, otherDate);
  }

  /**
   * 添加天数到日期
   */
  addDays(days: number): DateWrapper {
    this.value = addDays(this.value, days);
    return this;
  }

  /**
   * 减去天数从日期
   */
  subtractDays(days: number): DateWrapper {
    this.value = subDays(this.value, days);
    return this;
  }

  /**
   * 获取日期的年份
   */
  getYear(): number {
    return getYear(this.value);
  }

  /**
   * 获取日期的月份（0-11）
   */
  getMonth(): number {
    return getMonth(this.value);
  }

  /**
   * 获取日期的日
   */
  getDate(): number {
    return getDate(this.value);
  }

  /**
   * 获取日期的小时
   */
  getHours(): number {
    return getHours(this.value);
  }

  /**
   * 获取日期的分钟
   */
  getMinutes(): number {
    return getMinutes(this.value);
  }

  /**
   * 获取日期的秒
   */
  getSeconds(): number {
    return getSeconds(this.value);
  }

  /**
   * 设置日期的年份
   */
  setYear(year: number): DateWrapper {
    this.value = setYear(this.value, year);
    return this;
  }

  /**
   * 设置日期的月份（0-11）
   */
  setMonth(month: number): DateWrapper {
    this.value = setMonth(this.value, month);
    return this;
  }

  /**
   * 设置日期的日
   */
  setDate(date: number): DateWrapper {
    this.value = setDate(this.value, date);
    return this;
  }

  /**
   * 设置日期的小时
   */
  setHours(hours: number): DateWrapper {
    this.value = setHours(this.value, hours);
    return this;
  }

  /**
   * 设置日期的分钟
   */
  setMinutes(minutes: number): DateWrapper {
    this.value = setMinutes(this.value, minutes);
    return this;
  }

  /**
   * 设置日期的秒
   */
  setSeconds(seconds: number): DateWrapper {
    this.value = setSeconds(this.value, seconds);
    return this;
  }

  /**
   * 计算两个日期之间的天数差
   */
  differenceInDays(other: Date | string): number {
    const otherDate = typeof other === "string" ? new Date(other) : other;
    return differenceInDays(this.value, otherDate);
  }

  /**
   * 计算两个日期之间的月份数差
   */
  differenceInMonths(other: Date | string): number {
    const otherDate = typeof other === "string" ? new Date(other) : other;
    return differenceInMonths(this.value, otherDate);
  }

  /**
   * 计算两个日期之间的年数差
   */
  differenceInYears(other: Date | string): number {
    const otherDate = typeof other === "string" ? new Date(other) : other;
    return differenceInYears(this.value, otherDate);
  }

  /**
   * 获取最终值
   */
  toDate(): Date {
    return this.value;
  }
}
