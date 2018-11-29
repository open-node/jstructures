const List = require("../list/list");

const list = Symbol("list");

/**
 * Queue 类
 * @class
 * @return {Queue} Instance
 */
class Queue {
  /** Create a Queue instance */
  constructor() {
    this[list] = new List();
  }

  /**
   * e 加入队列尾部(排队)
   * @time O(1)
   * @space O(0)
   * @memberof Queue
   * @instance
   *
   * @param {Anyone} e
   * @return {void}
   */
  enqueue(e) {
    this[list].insertAsLast(e);
  }

  /**
   * 将队首出队
   * @time O(1)
   * @space O(0)
   * @memberof Queue
   * @instance
   *
   * @return {Anyone} e 之前压入的元素
   */
  dequeue() {
    if (this.empty) return undefined;
    return this[list].remove(this[list].first);
  }

  /**
   * 指向队首元素
   * @time O(1)
   * @space O(0)
   * @memberof Queue
   * @instance
   *
   * @return {Anyone} e 之前压入的元素
   */
  get front() {
    if (this.empty) return undefined;
    return this[list].first.data;
  }

  /**
   * 判断队列是否为空
   * @tithis.O(1)
   * @space O(0)
   *
   * @return {Boolean}
   */
  get empty() {
    return this[list].size === 0;
  }

  /**
   * 当前队列列长度(规模)
   * @tithis.O(1)
   * @space O(0)
   *
   * @return {number}
   */
  get size() {
    return this[list].size;
  }
}

module.exports = Queue;
