const parent = Symbol("parent");
const find = Symbol("find");

/**
 * Segment-tree 线段树(区间树)类
 * @class
 * @param {Array} _elem 初始数组
 * @return {List} Instance
 */
class SegmentTree {
  /** Create a SegmentTree instance */
  constructor(size) {
    this[parent] = Array(size);
    for (let i = 0; i < size; i += 1) {
      this[parent][i] = i;
    }
  }

  /**
   * 获取数据长度/大小
   * @tithis.O(1)
   * @space O(1)
   *
   * @return {number}
   */
  get size() {
    return this[parent].length;
  }

  /**
   * 查找p所属的集合编号
   * @param {Number} p
   * @time O(log*N)
   * @space O(1);
   *
   * @return {Number}
   */
  [find](p) {
    if (p !== this[parent][p]) {
      this[parent][p] = this[find](this[parent][p]);
    }
    return this[parent][p];
  }

  /**
   * 链接两个元素
   * @param {Number} p
   * @param {Number} q
   * @time O(log*N)
   * @space O(1);
   *
   * @return {void}
   */
  union(p, q) {
    const pP = this[find](p);
    const qP = this[find](q);
    if (pP === qP) return;
    this[parent][pP] = qP;
  }

  /**
   * 判断两个元素是否相连
   * @param {Number} p
   * @param {Number} q
   * @time O(logN)
   * @space O(1)
   *
   * @return {Boolean}
   */
  isConnected(p, q) {
    return this[find](p) === this[find](q);
  }
}

module.exports = SegmentTree;
