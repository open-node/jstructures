// List (Lined list)
const ListNode = require("./list-node");

/**
 * @param {Array} _elem 初始数组
 * @return {Vector} Instance
 */
function List() {
  const me = {};

  const header = new ListNode(); // 头哨兵节点
  const tailer = new ListNode(); // 尾哨兵节点

  header.succ = tailer;
  tailer.pred = header;

  let _size = 0; // 列表长度/大小

  /**
   * 获取列表长度/大小
   * @time O(1)
   * @space O(1)
   *
   * @return {number}
   */
  me.size = function size() {
    return _size;
  };

  /**
   * 获取列表首节点
   * @time O(1)
   * @space O(1)
   *
   * @return {ListNode}
   */
  me.first = function first() {
    if (_size === 0) return null;
    return header.succ;
  };

  /**
   * 获取列表末节点
   * @time O(1)
   * @space O(1)
   *
   * @return {ListNode}
   */
  me.last = function last() {
    if (_size === 0) return null;
    return tailer.pred;
  };

  /**
   * 将 e 作为首节点插入列表
   * @time O(1)
   * @space O(1)
   * @param {Anyone} e
   *
   * @return {ListNode}
   */
  me.insertAsFirst = function insertAsFirst(e) {
    _size += 1;
    header.insertAsSucc(e);
  };

  /**
   * 将 e 作为末节点插入列表
   * @time O(1)
   * @space O(1)
   * @param {Anyone} e
   *
   * @return {ListNode}
   */
  me.insertAsLast = function insertAsLast(e) {
    _size += 1;
    tailer.insertAsPred(e);
  };

  /**
   * e 作为节点 p 的直接后继插入
   * @time O(N)
   * @space O(1)
   *
   * @param {Anyone} e
   * @return {number}
   */
  me.insertA = function insertA(p, e) {
    _size += 1;
    return p.insertAsSucc(e);
  };

  /**
   * e 作为节点 p 的直接前驱插入
   * @time O(N)
   * @space O(1)
   *
   * @param {Anyone} e
   * @return {number}
   */
  me.insertB = function insertB(p, e) {
    _size += 1;
    return p.insertAsPred(e);
  };

  /**
   * 删除指定节点 p
   * @time O(1)
   * @space O(1)
   *
   * @param {number} r 要删除元素的秩 0 <= r <= size
   * @return {Anyone} e 删除的元素
   */
  me.remove = function remove(p) {
    const e = p.data;
    p.pred.succ = p.succ; // 前驱的后继等于自己的后继
    p.succ.pred = p.pred; // 后继的前驱等于自己的前驱

    _size -= 1;
    return e;
  };

  /**
   * 返回列表中相邻元素逆序对总数, 当返回为0则代表列表有序
   * @time O(N)
   * @space O(1)
   *
   * @return {Number}
   */
  me.disordered = function disordered() {
    let count = 0;
    let node = header.succ;
    while (tailer !== node) {
      if (node.succ.data < node.data) count += 1;
      node = node.succ;
    }
    return count;
  };

  /**
   * 从节点p往前查找目标元素 e 所在最后节点, 最多查询 n 个
   * @time O(N)
   * @space O(1)
   *
   * @param {Anyone} e 要搜索的元素
   * @param {number} n 最大搜索次数
   * @param {ListNode} p 从p节点往前查找, 默认为 tailer，查找全部
   *
   * @return {ListNode} 等于 e 的元素最后的节点
   */
  me.findElem = function findElem(e, n = _size, p = tailer) {
    while (header !== (p = p.pred) && 0 < n--) {
      if (e === p.data) return p;
      p = p.pred;
    }
    return null;
  };

  /**
   * 从节点p的n的真前驱中查找不大于 e 的最后者
   * @time O(N)
   * @space O(1)
   *
   * @param {Anyone} e 要搜索的元素
   * @param {number} n 最大搜索次数
   * @param {ListNode} p 从p节点往前查找, 默认为 tailer，查找全部
   *
   * @return {ListNode} 等于 e 的元素最后的节点
   */
  me.search = function search(e, n = _size, p = tailer) {
    while (0 < n--) {
      if ((p = p.pred).data <= e) return p;
    }
    return p;
  };

  /**
   * 剔除重复元素，保证每个元素都是唯一的
   * @time O(N²)
   * @space O(1)
   *
   * @return {number} 被删除的元素个数
   */
  me.deduplicate = function deduplicate() {
    if (_size < 2) return 0; // 退化平凡情况
    const length = _size;
    let p = header;
    while (tailer !== (p = p.succ)) {
      const q = me.find(p.data, p);
      if (q) me.remove(q);
    }

    return length - _size;
  };

  /**
   * 有序列表剔除重复元素，保证每个元素都是唯一的
   * @time O(N)
   * @space O(1)
   *
   * @return {number} 被删除的元素个数
   */
  me.uniquify = function uniquify() {
    if (_size < 2) return 0; // 退化平凡情况
    const length = _size;
    let p = header.succ;
    let q;
    while (tailer !== (q = p.succ)) {
      if (p.data !== q.data) p = q;
      else me.remove(q);
    }

    return _size - length;
  };

  /**
   * 向量的遍历
   * @time O(N)
   * @space O(1);
   * @param {function} visit 访问函数
   *
   * @return void
   */
  me.traverse = function traverse(visit) {
    let node = header;
    while (tailer !== (node = node.succ)) {
      visit(node.data);
    }
  };

  /**
   * 判断节点是否合法，存在，且不是首尾哨兵
   * @time O(1)
   * @space O(0)
   * @param {ListNode} p
   *
   * @return {boolean}
   */
  me.valid = function valid(p) {
    return p && header !== p && tailer !== p;
  };

  /**
   * 从起始位置 p 的n个元素中找到最大者, 相同大小后者优先
   * @time O(N²)
   * @space O(1)
   * @param {ListNode} p 排序起始节点
   * @param {number} n
   *
   * @return void
   */
  me.selectMax = function selectMax(p = header.succ, n = _size) {
    let max = p;
    while (0 < n--) {
      if (p.data > max.data) max = p;
      p = p.succ;
    }
    return max;
  };

  /**
   * 列表的插入排序, 对起始位置为 p 的 n 的元素进行排序
   * @time O(N²)
   * @space O(1)
   * @param {ListNode} p 排序起始节点
   * @param {number} n
   *
   * @return void
   */
  me.insertionSort = function insertionSort(p = header.succ, n = _size) {
    for (let i = 0; i < n; i += 1) {
      // 逐各操作各点
      me.insertA(me.search(p.data, i, p), p.data); // 查找到不大于当前值的位置
      p = p.succ;
      me.remove(p.pred);
    }
  };

  /**
   * 列表的选择排序, 对起始位置为 p 的 n 的元素进行排序
   * @time O(N²)
   * @space O(1)
   * @param {ListNode} p 排序起始节点
   * @param {number} n
   *
   * @return void
   */
  me.selectionSort = function selectionSort(p = header.succ, n = _size) {
    // 定义好初始待排序区间 head -> tail
    const head = p.pred;
    let tail = p;
    for (let i = 0; i < n; i += 1) tail = tail.succ;

    while (1 < n) {
      me.insertB(tail, me.remove(me.selectMax(head.succ, n)));
      tail = tail.pred;
      n -= 1;
    }
  };

  /**
   * 列表的归并排序之归并, 对起始位置为 p 的 n 的元素进行排序
   * @time O(N²)
   * @space O(1)
   * @param {ListNode} p 合并起始节点
   * @param {number} n
   * @param {List} list 要合并的另外一个列表
   * @param {ListNode} q 合并的另外一个列表起始节点
   * @param {number} m 要合并的另外一个列表的节点数
   *
   * @return void
   */
  me.merge = function merge(
    p = header.succ,
    n = _size,
    list,
    q,
    m = list.size()
  ) {
    while (0 < m) {
      if (0 < n && p.data <= q.data) {
        if (q === (p = p.succ)) break;
        n -= 1;
      } else {
        me.insertB(p, list.remove((q = q.succ).pred));
        m -= 1;
      }
    }
  };

  /**
   * 列表的归并排序, 对起始位置为 p 的 n 的元素进行排序
   * @time O(N²)
   * @space O(1)
   * @param {ListNode} p 排序起始节点
   * @param {number} n
   *
   * @return void
   */
  me.mergeSort = function mergeSort(p = header.succ, n = _size) {
    if (n < 2) return;
    const m = n >> 1;

    let q = p;
    for (let i = 0; i < m; i += 1) q = q.succ;

    me.mergeSort(p, m);
    me.mergeSort(q, n - m);
    me.merge(p, m, this, q, n - m);
  };

  return me;
}

module.exports = List;
