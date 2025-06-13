import _ from "lodash-es";

// 使用 ObjectWrapper
// const obj = new ObjectWrapper({ a: 1, b: { c: 2 }, d: 3 });
// console.log(obj.deepClone().toObject()); // 输出: { a: 1, b: { c: 2 }, d: 3 }
// console.log(obj.merge({ e: 4 }).toObject()); // 输出: { a: 1, b: { c: 2 }, d: 3, e: 4 }
// console.log(obj.keys()); // 输出: ['a', 'b', 'd', 'e']
// console.log(obj.values()); // 输出: [1, { c: 2 }, 3, 4]
// console.log(obj.entries()); // 输出: [['a', 1], ['b', { c: 2 }], ['d', 3], ['e', 4]]
// console.log(obj.pick(['a', 'b']).toObject()); // 输出: { a: 1, b: { c: 2 } }
// console.log(obj.omit(['d']).toObject()); // 输出: { a: 1, b: { c: 2 }, e: 4 }
// console.log(obj.mapValues(v => v * 2).toObject()); // 输出: { a: 2, b: { c: 4 }, d: 6, e: 8 }
// console.log(obj.pickBy((v, k) => typeof v === 'number').toObject()); // 输出: { a: 2, d: 6, e: 8 }
// console.log(obj.get('b.c')); // 输出: 4
// console.log(obj.set('f', 5).toObject()); // 输出: { a: 2, b: { c: 4 }, d: 6, e: 8, f: 5 }
// console.log(obj.unset('e').toObject()); // 输出: { a: 2, b: { c: 4 }, d: 6, f: 5 }
// console.log(obj.has('b.c')); // 输出: true
// console.log(obj.isEmpty()); // 输出: false
// console.log(obj.size()); // 输出: 4
// console.log(obj.mapToArray((v, k) => `${k}: ${v}`)); // 输出: ['a: 2', 'b: [object Object]', 'd: 6', 'f: 5']
// console.log(obj.toJSON()); // 输出: '{"a":2,"b":{"c":4},"d":6,"f":5}'

export class ObjectWrapper {
  private value: object;

  constructor(value: object) {
    this.value = value;
  }

  /**
   * 深拷贝对象
   */
  deepClone(): ObjectWrapper {
    this.value = _.cloneDeep(this.value);
    return this;
  }

  /**
   * 合并对象
   */
  merge(...objects: object[]): ObjectWrapper {
    this.value = _.merge({}, this.value, ...objects);
    return this;
  }

  /**
   * 获取对象的所有键
   */
  keys(): string[] {
    return _.keys(this.value);
  }

  /**
   * 获取对象的所有值
   */
  values(): any[] {
    return _.values(this.value);
  }

  /**
   * 获取对象的所有键值对
   */
  entries(): [string, any][] {
    return _.entries(this.value);
  }

  /**
   * 从对象中选择指定的属性
   */
  pick(props: string[]): ObjectWrapper {
    this.value = _.pick(this.value, props);
    return this;
  }

  /**
   * 省略对象中指定的属性
   */
  omit(props: string[]): ObjectWrapper {
    this.value = _.omit(this.value, props);
    return this;
  }

  /**
   * 映射对象的每个值
   */
  mapValues(iteratee: (value: any, key: string) => any): ObjectWrapper {
    this.value = _.mapValues(this.value, iteratee);
    return this;
  }

  /**
   * 过滤对象的每个值
   */
  pickBy(predicate: (value: any, key: string) => boolean): ObjectWrapper {
    this.value = _.pickBy(this.value, predicate);
    return this;
  }

  /**
   * 按照路径获取值
   */
  get(path: string | string[], defaultValue?: any): any {
    return _.get(this.value, path, defaultValue);
  }

  /**
   * 设置按照路径的值
   */
  set(path: string | string[], value: any): ObjectWrapper {
    this.value = _.set(_.cloneDeep(this.value), path, value);
    return this;
  }

  /**
   * 删除按照路径的值
   */
  unset(path: string | string[]): ObjectWrapper {
    this.value = _.unset(_.cloneDeep(this.value), path);
    return this;
  }

  /**
   * 检查对象是否有指定的路径
   */
  has(path: string | string[]): boolean {
    return _.has(this.value, path);
  }

  /**
   * 检查对象是否为空
   */
  isEmpty(): boolean {
    return _.isEmpty(this.value);
  }

  /**
   * 获取对象的大小（键的数量）
   */
  size(): number {
    return _.size(this.value);
  }

  /**
   * 对象映射到数组
   */
  mapToArray(iteratee: (value: any, key: string) => any): any[] {
    return _.map(this.value, iteratee);
  }

  /**
   * 对象转换为 JSON 字符串
   */
  toJSON(): string {
    return JSON.stringify(this.value);
  }

  /**
   * 获取最终值
   */
  toObject(): object {
    return this.value;
  }
}
