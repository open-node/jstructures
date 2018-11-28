const ListNode = require("./list-node");

const header = Symbol("header");
const tailer = Symbol("tailer");
const size = Symbol("size");

/**
 * Linked-list 类
 * @class
 * @param {Array} _elem 初始数组
 * @return {List} Instance
 */
class List {
  /** Create a list instance */
  constructor() {
    this[header] = new ListNode(); // 头哨兵节点
    this[tailer] = new ListNode(); // 尾哨兵节点

    this[header].succ = this[tailer];
    this[tailer].pred = this[header];

    this[size] = 0; // 列表长度/大小
  }

  /**
   * 获取列表长度/大小
   * @tithis.O(1)
   * @space O(1)
   *
   * @return {number}
   */
  get size() {
    return this[size];
  }

  /**
   * 获取列表首节点
   * @tithis.O(1)
   * @space O(1)
   *
   * @return {ListNode}
   */
  get first() {
    if (this[size] === 0) return null;
    return this[header].succ;
  }

  /**
   * 获取列表末节点
   * @tithis.O(1)
   * @space O(1)
   *
   * @return {ListNode}
   */
  get last() {
    if (this[size] === 0) return null;
    return this[tailer].pred;
  }

  /**
   * 将 e 作为首节点插入列表
   * @tithis.O(1)
   * @space O(1)
   * @param {Anyone} e
   *
   * @return {ListNode}
   */
  insertAsFirst(e) {
    this[size] += 1;
    return this[header].insertAsSucc(e);
  }

  /**
   * 将 e 作为末节点插入列表
   * @tithis.O(1)
   * @space O(1)
   * @param {Anyone} e
   *
   * @return {ListNode}
   */
  insertAsLast(e) {
    this[size] += 1;
    return this[tailer].insertAsPred(e);
  }

  /**
   * e 作为节点 p 的直接后继插入
   * @tithis.O(N)
   * @space O(1)
   *
   * @param {Anyone} e
   * @return {number}
   */
  insertA(p, e) {
    this[size] += 1;
    return p.insertAsSucc(e);
  }

  /**
   * e 作为节点 p 的直接前驱插入
   * @tithis.O(N)
   * @space O(1)
   *
   * @param {Anyone} e
   * @return {number}
   */
  insertB(p, e) {
    this[size] += 1;
    return p.insertAsPred(e);
  }

  /**
   * 删除指定节点 p
   * @tithis.O(1)
   * @space O(1)
   *
   * @param {number} p 要删除元素
   * @return {Anyone} e 删除的元素
   */
  remove(p) {
    const e = p.data;
    p.pred.succ = p.succ; // 前驱的后继等于自己的后继
    p.succ.pred = p.pred; // 后继的前驱等于自己的前驱

    this[size] -= 1;
    return e;
  }

  /**
   * 返回列表中相邻元素逆序对总数, 当返回为0则代表列表有序
   * @tithis.O(N)
   * @space O(1)
   *
   * @return {Number}
   */
  disordered() {
    let count = 0;
    let node = this[header].succ;
    while (this[tailer] !== node) {
      if (node.succ.data < node.data) count += 1;
      node = node.succ;
    }
    return count;
  }

  /**
   * 从节点p往前查找目标元素 e 所在最后节点, 最多查询 n 个
   * @tithis.O(N)
   * @space O(1)
   *
   * @param {Anyone} e 要搜索的元素
   * @param {number} n 最大搜索次数
   * @param {ListNode} p 从p节点往前查找, 默认为 tailer，查找全部
   *
   * @return {ListNode} 等于 e 的元素最后的节点
   */
  findElem(e, n = this[size], p = this[tailer]) {
    while (this[header] !== (p = p.pred) && 0 < n--) {
      if (e === p.data) return p;
    }
    return null;
  }

  /**
   * 从节点p的n的真前驱中查找不大于 e 的最后者
   * @tithis.O(N)
   * @space O(1)
   *
   * @param {Anyone} e 要搜索的元素
   * @param {number} n 最大搜索次数
   * @param {ListNode} p 从p节点往前查找, 默认为 tailer，查找全部
   *
   * @return {ListNode} 等于 e 的元素最后的节点
   */
  search(e, n = this[size], p = this[tailer]) {
    while (0 <= n--) {
      if ((p = p.pred).data <= e) return p;
    }
    return p;
  }

  /**
   * 剔除重复元素，保证每个元素都是唯一的
   * @tithis.O(N²)
   * @space O(1)
   *
   * @return {number} 被删除的元素个数
   */
  deduplicate() {
    if (this[size] < 2) return 0; // 退化平凡情况
    const length = this[size];
    let p = this[header];
    let rank = 0;
    while (this[tailer] !== (p = p.succ)) {
      const q = this.findElem(p.data, rank, p);
      if (q) this.remove(q);
      else rank += 1;
    }

    return length - this[size];
  }

  /**
   * 有序列表剔除重复元素，保证每个元素都是唯一的
   * @tithis.O(N)
   * @space O(1)
   *
   * @return {number} 被删除的元素个数
   */
  uniquify() {
    if (this[size] < 2) return 0; // 退化平凡情况
    const length = this[size];
    let p = this[header].succ;
    let q;
    while (this[tailer] !== (q = p.succ)) {
      if (p.data !== q.data) p = q;
      else this.remove(q);
    }

    return length - this[size];
  }

  /**
   * 向量的遍历
   * @tithis.O(N)
   * @space O(1);
   * @param {function} visit 访问函数
   *
   * @return void
   */
  traverse(visit) {
    let node = this[header];
    while (this[tailer] !== (node = node.succ)) {
      visit(node.data);
    }
  }

  /**
   * 判断节点是否合法，存在，且不是首尾哨兵
   * @tithis.O(1)
   * @space O(0)
   * @param {ListNode} p
   *
   * @return {boolean}
   */
  valid(p) {
    return p && this[header] !== p && this[tailer] !== p;
  }

  /**
   * 从起始位置 p 的n个元素中找到最大者, 相同大小后者优先
   * @tithis.O(N²)
   * @space O(1)
   * @param {ListNode} p 排序起始节点
   * @param {number} n
   *
   * @return {ListNode}
   */
  selectMax(p = this[header].succ, n = this[size]) {
    let max = p;
    while (0 < n--) {
      if (p.data > max.data) max = p;
      p = p.succ;
    }

    return max;
  }

  /**
   * 列表的插入排序, 对起始位置为 p 的 n 的元素进行排序
   * @tithis.O(N²)
   * @space O(1)
   * @param {ListNode} p 排序起始节点
   * @param {number} n
   *
   * @return {ListNode} 排序后的起始节点
   */
  insertionSort(p = this[header].succ, n = this[size]) {
    const head = p.pred;

    for (let i = 0; i < n; i += 1) {
      // 逐各操作各点
      this.insertA(this.search(p.data, i, p), p.data); // 查找到不大于当前值的位置
      p = p.succ;
      this.remove(p.pred);
    }

    return head.succ;
  }

  /**
   * 列表的选择排序, 对起始位置为 p 的 n 的元素进行排序
   * @tithis.O(N²)
   * @space O(1)
   * @param {ListNode} p 排序起始节点
   * @param {number} n
   *
   * @return {ListNode} 排序后的起始节点
   */
  selectionSort(p = this[header].succ, n = this[size]) {
    // 定义好初始待排序区间 head -> tail
    const head = p.pred;
    let tail = p;
    for (let i = 0; i < n; i += 1) tail = tail.succ;

    while (1 < n) {
      this.insertB(tail, this.remove(this.selectMax(head.succ, n)));
      tail = tail.pred;
      n -= 1;
    }

    return head.succ;
  }

  /**
   * 列表的归并排序之归并, 对起始位置为 p 的 n 的元素进行排序
   * @tithis.O(N²)
   * @space O(1)
   * @param {ListNode} p 合并起始节点
   * @param {number} n
   * @param {List} he 要合并的另外一个列表
   * @param {ListNode} q 合并的另外一个列表起始节点
   * @param {number} m 要合并的另外一个列表的节点数
   *
   * @return {ListNode} 归并后的起始节点
   */
  merge(p, n, he, q, m) {
    const head = p.pred;
    while (0 < m) {
      if (0 < n && p.data <= q.data) {
        if (q === (p = p.succ)) break;
        n -= 1;
      } else {
        this.insertB(p, he.remove((q = q.succ).pred));
        m -= 1;
      }
    }

    return head.succ;
  }

  /**
   * 列表的归并排序, 对起始位置为 p 的 n 的元素进行排序
   * @tithis.O(N²)
   * @space O(1)
   * @param {ListNode} p 排序起始节点
   * @param {number} n
   *
   * @return {ListNode} 排序后的起始节点
   */
  mergeSort(p = this[header].succ, n = this[size]) {
    if (n < 2) return p;
    const m = n >> 1;

    let q = p;
    for (let i = 0; i < m; i += 1) q = q.succ;

    p = this.mergeSort(p, m);
    q = this.mergeSort(q, n - m);
    p = this.merge(p, m, this, q, n - m);

    return p;
  }
}

module.exports = List;
