// Vector

/**
 * @param {Array} _elem 初始数组
 * @return {Vector} Instance
 */
function Vector(_elem = [], defaultValue) {
  /**
   * 获取向量大小
   * @time O(1)
   * @space O(0)
   *
   * @return {number}
   */
  _elem.size = function size() {
    return _elem.length;
  };

  /**
   * e 作为秩为 r 的元素插入，原后继元素依次后移
   * @time O(N)
   * @space O(0)
   *
   * @param {number} r 插入新元素的秩 0 <= r <= size
   * @param {Anyone} e
   * @return {number}
   */
  _elem.insert = function insert(r, e) {
    for (let i = _elem.length; i > r; i -= 1) _elem[i] = _elem[i - 1];
    _elem[r] = e;

    return r;
  };

  /**
   * 删除指定区间的元素, 原后继元素依次前移[lo, hi)
   * @time O(N)
   * @space O(0)
   *
   * @param {number} lo 要删除元素起始的秩 0 <= r <= size
   * @param {number} lo 要删除元素结束的秩 0 <= r <= size
   * @return {number}  删除的元素数量
   */
  _elem.removeRange = function removeRange(lo, hi) {
    if (hi - lo <= 0) return 0;
    while (hi < _elem.length) _elem[lo++] = _elem[hi++];
    _elem.length = lo;

    return hi - lo;
  };

  /**
   * 删除指定秩的元素, 原后继元素依次前移
   * @time O(N)
   * @space O(0)
   *
   * @param {number} r 要删除元素的秩 0 <= r <= size
   * @return {Anyone} e 删除的元素
   */
  _elem.remove = function remove(r) {
    const e = _elem[r];
    _elem.removeRange(r, r + 1);

    return e;
  };

  /**
   * 返回向量中相邻元素逆序对总数, 当返回为0则代表向量有序
   * @time O(N)
   * @space O(1)
   *
   * @return {Number}
   */
  _elem.disordered = function disordered() {
    let count = 0;
    for (let i = 1; i < _elem.length; i += 1)
      if (_elem[i - 1] > _elem[i]) count += 1;
    return count;
  };

  /**
   * 在向量的区间 [lo, hi)查找元素等于 e 的最大秩
   * @time O(N)
   * @space O(1)
   *
   * @param {Anyone} e 要搜索的元素
   * @param {number} lo 要查找的起始秩
   * @param {number} hi 要查找的结束秩
   * @return {number} 等于 e 的元素最大的秩
   */
  _elem.findElem = function findElem(e, lo, hi) {
    while (lo < hi-- && _elem[hi] !== e) {}
    return hi;
  };

  /**
   * 在有序向量的区间[lo, hi)查找元素e 所在的秩, 0 <= lo <= hi <= size
   * @time O(logN)
   * @space O(1)
   *
   * @param {Anyone} e 要搜索的元素
   * @param {number} lo 要查找的起始秩
   * @param {number} hi 要查找的结束秩
   * @return {number} 不大于 e 的元素最大的秩
   */
  _elem.search = function binSearch(e, lo, hi) {
    return Vector.binSearch(_elem, e, lo, hi);
  };

  /**
   * 剔除重复元素，保证每个元素都是唯一的
   * @time O(N²)
   * @space O(1)
   *
   * @return {number} 被删除的元素个数
   */
  _elem.deduplicate = function deduplicate() {
    const { length } = _elem;
    let i = 1;
    while (i < _elem.length) {
      // 在前缀中寻找相似者
      if (_elem.findElem(_elem[i], 0, i) < 0) i += 1;
      else _elem.remove(i);
    }

    return length - _elem.length;
  };

  /**
   * 有序向量剔除重复元素，保证每个元素都是唯一的
   * @time O(N)
   * @space O(1)
   *
   * @return {number} 被删除的元素个数
   */
  _elem.deduplicate = function uniquify() {
    const { length } = _elem;
    let i = 0;
    let j = 0;
    while ((j += 1) < length) {
      if (_elem[i] !== _elem[j]) _elem[(i += 1)] = _elem[j];
    }
    _elem.length = i + 1;

    return length - _elem.length;
  };

  /**
   * 向量的遍历
   * @time O(N)
   * @space O(1);
   * @param {function} visit 访问函数
   *
   * @return void
   */
  _elem.traverse = function traverse(visit) {
    for (let i = 0; i < _elem.length; i += 1) visit(_elem[i]);
  };

  return _elem;
}

/**
 * 在有序向量的区间[lo, hi)查找元素不大于 e 的元素的最大秩, 0 <= lo <= hi <= size
 * @time O(logN)
 * @space O(1)
 *
 * @param {Vector} _elem 要搜索的有序向量或有序数组
 * @param {Anyone} e 要搜索的元素
 * @param {number} lo 要查找的起始秩
 * @param {number} hi 要查找的结束秩
 * @return {number} 不大于 e 的元素最大的秩
 */
Vector.binSearch = function binSearch(_elem, e, lo = 0, hi = _elem.length) {
  while (lo < hi) {
    const mi = (lo + hi) >> 1; // 寻找中点
    // 经比较后确认深入 [lo, mi) 或 [mi + 1, hi)
    e < _elem[mi] ? (hi = mi) : (lo = mi + 1);
  }
  // 查找成功不能提前终止

  // 循环结束时， lo 为大于e的元素的最小的秩，故 lo - 1即不大于 e de元素的最大秩
  return lo - 1;
};

/** 排序算法 起泡排序, 具有稳定性
 * @time O(N²)
 * @space O(1)
 *
 * @param {Vector} _elem 要排序的向量或数据
 * @param {number} lo 要查找的起始秩
 * @param {number} hi 要查找的结束秩
 * @return {void}
 */
Vector.bubbleSort = function bubbleSort(_elem, lo = 0, hi = _elem.length) {
  let _lo = lo;
  let sorted = true;
  while ((lo += 1) < hi) {
    if (_elem[lo - 1] > _elem[lo]) {
      sorted = false;
      const tmp = _elem[lo - 1];
      _elem[lo - 1] = _elem[lo];
      _elem[lo] = tmp;
    }
  }
  if (!sorted) Vector.bubbleSort(_elem, _lo, (hi -= 1));
};

/** 排序算法 归并排序之合并
 * @time O(N)
 * @space O(logN)
 *
 * @param {Vector} _elem 要排序的向量或数据
 * @param {number} lo 要查找的起始秩
 * @param {number} hi 要查找的结束秩
 * @return {void}
 */
Vector.merge = function merge(_elem, lo, mi, hi) {
  let l = lo;
  let r = mi;
  while (l < mi && r < hi) {
    // 左边的头元素更小，则无须任何操作，l向后滑动一个
    if (_elem[r] > _elem[r]) {
      const tmp = _elem[r];
      _elem[r] = _elem[l];
      _elem[l] = tmp;
      mi += 1;
      r += 1;
    }
    l += 1;
  }
};

/** 排序算法 归并排序
 * @time O(NlogN)
 * @space O(logN)
 *
 * @param {Vector} _elem 要排序的向量或数据
 * @param {number} lo 要查找的起始秩
 * @param {number} hi 要查找的结束秩
 * @return {void}
 */
Vector.mergeSort = function bubbleSort(_elem, lo = 0, hi = _elem.length) {
  if (hi - lo < 2) return; // 单个元素自然是有序的
  const mi = (lo + hi) >> 1; // 找到中点
  Vector.mergeSort(lo, mi); // 分治思想, 左半段
  Vector.mergeSort(mi, hi); // 分治思想，右半段
  Vector.merge(_elem, lo, mi, hi);
};

module.exports = Vector;
