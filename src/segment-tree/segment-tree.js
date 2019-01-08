const tree = Symbol("tree");
const merger = Symbol("merger");
const elems = Symbol("elems");
const build = Symbol("build");
const query = Symbol("query");
const update = Symbol("update");

/**
 * Segment-tree 线段树(区间树)类
 * @class
 * @param {Array} _elem 初始数组
 * @return {List} Instance
 */
class SegmentTree {
  /** Create a SegmentTree instance */
  constructor(data, mergeFn) {
    this[tree] = Array(4 * data.length);
    this[merger] = mergeFn;
    this[elems] = data.slice();
    this[build](0, 0, data.length - 1);
  }

  /**
   * 获取数据长度/大小
   * @tithis.O(1)
   * @space O(1)
   *
   * @return {number}
   */
  get size() {
    return this[elems].length;
  }

  /**
   * 左节点的索引
   * @tithis.O(1)
   * @space O(1)
   *
   * @return {number}
   */
  leftChild(index) {
    return index * 2 + 1;
  }

  /**
   * 右节点的索引
   * @tithis.O(1)
   * @space O(1)
   *
   * @return {number}
   */
  rightChild(index) {
    return index * 2 + 2;
  }

  /**
   * 构建线段树
   * @tithis.O(logN)
   * @space O(N)
   *
   * @return {void}
   */
  [build](index, left, right) {
    if (left === right) {
      this[tree][index] = this[elems][left];
      return;
    }
    const leftIndex = this.leftChild(index);
    const rightIndex = this.rightChild(index);
    const mi = (left + right) >> 1;

    this[build](leftIndex, left, mi);
    this[build](rightIndex, mi + 1, right);

    this[tree][index] = this[merger](
      this[tree][leftIndex],
      this[tree][rightIndex]
    );
  }

  /**
   * 查询线段树的某一区间
   * @param {Number} qL 查询的区间开始值
   * @param {Number} qR 查询的区间结束值
   * @this.O(LogN)
   * @space O(1)
   *
   * @return {Anyone}
   */
  query(qL, qR) {
    return this[query](0, 0, this.size - 1, qL, qR);
  }

  // 在以 Index 为根的线段树中 [left...right] 的范围内搜索区间 [qL, qR]
  [query](index, left, right, qL, qR) {
    if (left === qL && right === qR) return this[tree][index];

    const mi = (left + right) >> 1;
    const leftIndex = this.leftChild(index);
    const rightIndex = this.rightChild(index);

    if (mi + 1 <= qL) {
      // 忽略左节点
      return this[query](rightIndex, mi + 1, right, qL, qR);
    }
    if (qR <= mi) {
      // 忽略右节点
      return this[query](leftIndex, left, mi, qL, qR);
    }
    const leftRes = this[query](leftIndex, left, mi, qL, mi);
    const rightRes = this[query](rightIndex, mi + 1, right, mi + 1, qR);

    return this[merger](leftRes, rightRes);
  }

  /**
   * 更新某个值
   * @param {Number} index 原数组的索引
   * @param {Anyone} val 修改后的值
   * @this.O(LogN)
   * @space O(1)
   *
   * @return {void}
   */
  update(index, val) {
    this[elems][index] = val;
    return this[update](0, 0, this.size - 1, index, val);
  }

  // 更新以 index 为根的线段树 [left...right] 范围内的 qIndex 的值为 val
  [update](index, left, right, qIndex, val) {
    if (left === right) {
      this[tree][index] = val;
      return;
    }
    const mi = (left + right) >> 1;
    const leftIndex = this.leftChild(index);
    const rightIndex = this.rightChild(index);
    if (mi + 1 <= qIndex) {
      this[update](rightIndex, mi + 1, right, qIndex, val);
    } else {
      this[update](leftIndex, left, mi, qIndex, val);
    }
    this[tree][index] = this[merger](
      this[tree][leftIndex],
      this[tree][rightIndex]
    );
  }
}

module.exports = SegmentTree;
