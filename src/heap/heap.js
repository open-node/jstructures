/**
 * Heap 堆
 * @class
 * @return {Heap} Instance
 */
function Heap(elems = [], length = 0) {
  const data = length ? elems.slice(0, length) : []; // 堆的实际物理存储，一个边长数组
  const that = {};

  Object.defineProperty(that, "size", {
    /**
     * 获取堆的大小
     * @time O(1)
     * @space O(0)
     * @memberof Heap
     * @name size
     * @instance
     *
     * @return {number}
     */
    get: function size() {
      return data.length;
    }
  });

  const swap = (i, j) => {
    const t = data[i];
    data[i] = data[j];
    data[j] = t;
  };

  /**
   * 得到父子三者（最多三个) 中的最大值
   */
  const properParent = (n, i) => {
    const lIndex = 1 + (i << 1);
    const rIndex = (1 + i) << 1;
    if (rIndex < n && data[rIndex] > data[lIndex] && data[rIndex] > data[i])
      return rIndex;
    if (lIndex < n && data[lIndex] > data[i]) return lIndex;
    return i;
  };

  /**
   * 元素上滤操作
   * @time O(LogN)
   * @space O(1)
   * @memberof Heap
   * @instance
   *
   * @param {Number} i 上滤的元素索引
   * @return {Number} 上滤的终止位置
   */
  const percolateUp = i => {
    while (0 < i) {
      const j = (i - 1) >> 1; // 计算父节点索引值
      if (data[i] < data[j]) break; // 一旦当前父子不再逆序上滤完成
      swap(i, j); // 否则交换父子
      i = j;
    }
    return i; // 返回上滤最终抵达的位置
  };

  /**
   * 元素下滤操作
   * @time O(LogN)
   * @space O(1)
   * @memberof Heap
   * @instance
   *
   * @param {Number} i 下滤的元素索引
   * @return {Number} 下滤的终止位置
   */
  const percolateDown = i => {
    let j;
    while (i !== (j = properParent(data.length, i))) {
      swap(i, j);
      i = j;
    }
    return i; // 返回下滤滴答的位置
  };

  /**
   * e 元素插入
   * @time O(LogN)
   * @space O(1)
   * @memberof Heap
   * @instance
   *
   * @param {Anyone} e
   * @return {void}
   */
  that.insert = function insert(e) {
    // 首先将元素插入末尾，之后执行上滤
    data.push(e);

    percolateUp(that.size - 1);
  };

  /**
   * 返回堆的最大元素
   * @time O(1)
   * @space O(1)
   * @memberof Heap
   * @instance
   *
   * @return {Anyone}
   */
  that.getMax = function getMax() {
    return data[0];
  };

  /**
   * 删除堆的最大元素
   * @time O(LogN)
   * @space O(1)
   * @memberof Heap
   * @instance
   *
   * @param {Anyone} e
   * @return {void}
   */
  that.delMax = function delMax() {
    const maxElem = data[0]; // 删除第一个元素代之以最后一个元素
    data[0] = data[data.length - 1];
    data.length -= 1;

    percolateDown(0);
    return maxElem;
  };

  // 批量建堆
  const heapify = n => {
    for (let i = (n - 2) >> 1; 0 <= i && i < n; i -= 1) {
      // 自底而上，依次下滤内部各节点
      percolateDown(i);
    }
  };

  if (0 < length) heapify(length);

  return that;
}

module.exports = Heap;
