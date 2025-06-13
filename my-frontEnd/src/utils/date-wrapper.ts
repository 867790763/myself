import _ from "lodash-es";

// 使用 DateWrapper
// const date = new DateWrapper(new Date());

// console.log(date.formatDate('YYYY-MM-DD')); // 输出: 当前日期格式化后的字符串，例如: 2025-03-14
// console.log(date.startOfDay().toDate()); // 输出: 当天的开始时间（00:00:00）
// console.log(date.endOfDay().toDate()); // 输出: 当天的结束时间（23:59:59）
// console.log(date.isBefore('2025-03-15')); // 输出: true
// console.log(date.isAfter('2025-03-13')); // 输出: true
// console.log(date.addDays(5).toDate()); // 输出: 5天后的日期对象
// console.log(date.subtractDays(3).toDate()); // 输出: 3天前的日期对象
// console.log(date.getYear()); // 输出: 当前年份，例如: 2025
// console.log(date.getMonth()); // 输出: 当前月份（0-11），例如: 2（表示三月）
// console.log(date.getDate()); // 输出: 当前日，例如: 14

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
  formatDate(format = "YYYY-MM-DD"): string {
    const year = _.padStart(String(this.value.getFullYear()), 4, "0");
    const month = _.padStart(String(this.value.getMonth() + 1), 2, "0");
    const day = _.padStart(String(this.value.getDate()), 2, "0");
    return `${year}-${month}-${day}`;
  }

  /**
   * 设置时间为当天的开始（00:00:00）
   */
  startOfDay(): DateWrapper {
    this.value.setHours(0, 0, 0, 0);
    return this;
  }

  /**
   * 设置时间为当天的结束（23:59:59）
   */
  endOfDay(): DateWrapper {
    this.value.setHours(23, 59, 59, 999);
    return this;
  }

  /**
   * 判断日期是否在另一个日期之前
   */
  isBefore(other: Date | string): boolean {
    const otherDate = typeof other === "string" ? new Date(other) : other;
    return this.value < otherDate;
  }

  /**
   * 判断日期是否在另一个日期之后
   */
  isAfter(other: Date | string): boolean {
    const otherDate = typeof other === "string" ? new Date(other) : other;
    return this.value > otherDate;
  }

  /**
   * 添加天数到日期
   */
  addDays(days: number): DateWrapper {
    this.value.setDate(this.value.getDate() + days);
    return this;
  }

  /**
   * 减去天数从日期
   */
  subtractDays(days: number): DateWrapper {
    this.value.setDate(this.value.getDate() - days);
    return this;
  }

  /**
   * 获取日期的年份
   */
  getYear(): number {
    return this.value.getFullYear();
  }

  /**
   * 获取日期的月份（0-11）
   */
  getMonth(): number {
    return this.value.getMonth();
  }

  /**
   * 获取日期的日
   */
  getDate(): number {
    return this.value.getDate();
  }

  /**
   * 获取最终值
   */
  toDate(): Date {
    return this.value;
  }
}
