import _ from "lodash-es";

// 使用 StringWrapper
// const str = new StringWrapper(" hello_world ");
// console.log(str.capitalize().trim().toCamelCase().toString()); // 输出: HelloWorld
// console.log(str.toLower().toString()); // 输出: hello_world
// console.log(str.toUpper().toString()); // 输出: HELLO_WORLD
// console.log(str.padStart(20, '-').toString()); // 输出: ------------hello_world
// console.log(str.padEnd(20, '-').toString()); // 输出: hello_world-----------
// console.log(str.slice(1, 5).toString()); // 输出: ello
// console.log(str.replace('world', 'universe').toString()); // 输出: hello_universe
// console.log(str.startsWith('he')); // 输出: true

export class StringWrapper {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  /**
   * 首字母大写
   */
  capitalize(): StringWrapper {
    this.value = _.capitalize(this.value);
    return this;
  }

  /**
   * 去除空格
   */
  trim(): StringWrapper {
    this.value = _.trim(this.value);
    return this;
  }

  /**
   * 转换为驼峰命名法
   */
  toCamelCase(): StringWrapper {
    this.value = this.value.replace(/[-_\s]+(.)?/g, (_, c) =>
      c ? c.toUpperCase() : ""
    );
    return this;
  }

  /**
   * 转换为小写
   */
  toLower(): StringWrapper {
    this.value = _.toLower(this.value);
    return this;
  }

  /**
   * 转换为大写
   */
  toUpper(): StringWrapper {
    this.value = _.toUpper(this.value);
    return this;
  }

  /**
   * 左侧填充字符到指定长度
   */
  padStart(length: number, chars?: string): StringWrapper {
    this.value = _.padStart(this.value, length, chars);
    return this;
  }

  /**
   * 右侧填充字符到指定长度
   */
  padEnd(length: number, chars?: string): StringWrapper {
    this.value = _.padEnd(this.value, length, chars);
    return this;
  }

  /**
   * 截取字符串的一部分
   */
  slice(start: number, end?: number): StringWrapper {
    this.value = _.slice(this.value, start, end);
    return this;
  }

  /**
   * 替换字符串中的子字符串
   */
  replace(pattern: RegExp | string, replacement: string): StringWrapper {
    this.value = _.replace(this.value, pattern, replacement);
    return this;
  }

  /**
   * 检查字符串是否以指定的前缀开头
   */
  startsWith(prefix: string): boolean {
    return _.startsWith(this.value, prefix);
  }

  /**
   * 获取最终值
   */
  toString(): string {
    return this.value;
  }
}
