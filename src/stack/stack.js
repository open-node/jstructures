const List = require("../list/list");

const list = Symbol("list");

/**
 * Stack 类
 * @class
 * @return {Stack} Instance
 */
class Stack {
  /** Create a stack instance */
  constructor() {
    this[list] = new List();
  }

  /**
   * e 作为压入栈顶
   * @time O(1)
   * @space O(0)
   * @memberof Stack
   * @instance
   *
   * @param {Anyone} e
   * @return {void}
   */
  push(e) {
    this[list].insertAsFirst(e);
  }

  /**
   * 将栈顶出栈
   * @time O(1)
   * @space O(0)
   * @memberof Stack
   * @instance
   *
   * @return {Anyone} e 之前压入的元素
   */
  pop() {
    if (this.empty) return undefined;
    return this[list].remove(this[list].first);
  }

  /**
   * 指向栈顶元素，并不出栈
   * @time O(1)
   * @space O(0)
   * @memberof Stack
   * @instance
   *
   * @return {Anyone} e 之前压入的元素
   */
  get top() {
    if (this.empty) return undefined;
    return this[list].first.data;
  }

  /**
   * 判断栈是否为空
   * @tithis.O(1)
   * @space O(0)
   *
   * @return {Boolean}
   */
  get empty() {
    return this[list].size === 0;
  }

  /**
   * 当前栈高度(规模)
   * @tithis.O(1)
   * @space O(0)
   *
   * @return {Number}
   */
  get size() {
    return this[list].size;
  }
}

module.exports = Stack;
