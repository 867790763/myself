import _ from "lodash-es";

// 使用 NumberWrapper
// const num = new NumberWrapper(5.6789);
// console.log(num.clamp(1, 10).round(2).toNumber()); // 输出: 5.68
// console.log(num.add(3).toNumber()); // 输出: 8.68
// console.log(num.subtract(2).toNumber()); // 输出: 6.68
// console.log(num.multiply(2).toNumber()); // 输出: 13.36
// console.log(num.divide(4).toNumber()); // 输出: 3.34
// console.log(num.abs().toNumber()); // 输出: 3.34
// console.log(num.sqrt().toNumber()); // 输出: 1.8275875039059327
// console.log(num.pow(2).toNumber()); // 输出: 10.885984000000002
// console.log(num.isInteger()); // 输出: false

export class NumberWrapper {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  /**
   * 夹紧数值在指定范围内
   */
  clamp(lower: number, upper: number): NumberWrapper {
    this.value = _.clamp(this.value, lower, upper);
    return this;
  }

  /**
   * 四舍五入到指定小数位数
   */
  round(precision: number): NumberWrapper {
    this.value = _.round(this.value, precision);
    return this;
  }

  /**
   * 加法运算
   */
  add(other: number): NumberWrapper {
    this.value = _.add(this.value, other);
    return this;
  }

  /**
   * 减法运算
   */
  subtract(other: number): NumberWrapper {
    this.value = _.subtract(this.value, other);
    return this;
  }

  /**
   * 乘法运算
   */
  multiply(other: number): NumberWrapper {
    this.value = _.multiply(this.value, other);
    return this;
  }

  /**
   * 除法运算
   */
  divide(other: number): NumberWrapper {
    this.value = _.divide(this.value, other);
    return this;
  }

  /**
   * 绝对值
   */
  abs(): NumberWrapper {
    this.value = Math.abs(this.value);
    return this;
  }

  /**
   * 平方根
   */
  sqrt(): NumberWrapper {
    this.value = Math.sqrt(this.value);
    return this;
  }

  /**
   * 幂运算
   */
  pow(exponent: number): NumberWrapper {
    this.value = Math.pow(this.value, exponent);
    return this;
  }

  /**
   * 判断是否为整数
   */
  isInteger(): boolean {
    return Number.isInteger(this.value);
  }

  /**
   * 获取最终值
   */
  toNumber(): number {
    return this.value;
  }
}
