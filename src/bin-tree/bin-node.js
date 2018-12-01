const Queue = require("../queue/queue");

/**
 * BinNode 类(二叉树节点类)
 * @class
 * @param {Anyone} e
 * @param {BinNode} parent 父节点
 * @param {BinNode} lc 左子节点
 * @param {BinNode} rc 右子节点
 * @param {Anyone} e
 * @return {BinNode} Instance
 */
class BinNode {
  /** Create a BinNode instance */
  constructor(e = null, parent = null, lc = null, rc = null) {
    /** 节点存储数据 */
    this.data = e;

    /** 父节点 */
    this.parent = parent;

    /** 左子节点 */
    this.lc = lc;

    /** 右子节点 */
    this.rc = rc;

    /** 以该节点为根的树高度 */
    this.height = 0;
  }

  /**
   * 节点为根的子树规模
   * @time O(N)
   * @space O(1)
   *
   * @return {Boolean}
   */
  get size() {
    return 1 + (this.lc ? this.lc.size : 0) + (this.rc ? this.rc.size : 0);
  }

  /**
   * 判断是否是根节点
   * @time O(1)
   * @space O(0)
   *
   * @return {Boolean}
   */
  get isRoot() {
    return !this.parent;
  }

  /**
   * 判断是否是左子节点
   * @time O(1)
   * @space O(0)
   *
   * @return {Boolean}
   */
  get isLChild() {
    return !this.isRoot && this === this.parent.lc;
  }

  /**
   * 判断是否是右子节点
   * @time O(1)
   * @space O(0)
   *
   * @return {Boolean}
   */
  get isRChild() {
    return !this.isRoot && this === this.parent.rc;
  }

  /**
   * 判断是否有父节点
   * @time O(1)
   * @space O(0)
   *
   * @return {Boolean}
   */
  get hasParent() {
    return !this.isRoot;
  }

  /**
   * 判断是有左子节点
   * @time O(1)
   * @space O(0)
   *
   * @return {Boolean}
   */
  get hasLChild() {
    return !!this.lc;
  }

  /**
   * 判断是有左子节点
   * @time O(1)
   * @space O(0)
   *
   * @return {Boolean}
   */
  get hasRChild() {
    return !!this.rc;
  }

  /**
   * 判断是有子节点
   * @time O(1)
   * @space O(0)
   *
   * @return {Boolean}
   */
  get hasChild() {
    return !!this.lc || !!this.rc;
  }

  /**
   * 判断是有完整子节点 (即左右子节点都有)
   * @time O(1)
   * @space O(0)
   *
   * @return {Boolean}
   */
  get hasBothChild() {
    return !!this.lc && !!this.rc;
  }

  /**
   * 判断是否是叶子节点(没有子节点)
   * @time O(1)
   * @space O(0)
   *
   * @return {Boolean}
   */
  get isLeaf() {
    return !this.hasChild;
  }

  /**
   * 兄弟节点
   * @time O(1)
   * @space O(0)
   *
   * @return {BinNode}
   */
  get sibling() {
    return this.isLChild ? this.parent.rc : this.parent.lc;
  }

  /**
   * 叔叔节点(即父节点的兄弟节点)
   * @time O(1)
   * @space O(0)
   *
   * @return {BinNode}
   */
  get uncle() {
    return this.parent.sibling;
  }

  /**
   * 获取来自父节点的引用
   * @time O(1)
   * @space O(1)
   *
   * @return {Array} [object, key]
   */
  get fromParentTo() {
    return [this.parent, this.isLChild ? "lc" : "rc"];
  }

  /**
   * 获取中序遍历下的直接前驱
   * @time O(N)
   * @space O(1)
   *
   * @return {BinNode} 返回前驱节点，不存在则返回 null
   */
  get pred() {
    let t = this; // 记录后继的临时变量
    // 如果当前节点存在左子树，则后继节点为左子树中最右节点
    if (this.lc) {
      t = this.lc;
      while (t.hasRChild) t = t.rc;
    } else {
      while (t.isLChild) t = t.parent;
      t = t.parent;
    }
    return t;
  }

  /**
   * 获取中序遍历下的直接后继
   * @time O(N)
   * @space O(1)
   *
   * @return {BinNode} 返回后继节点，不存在则返回 null
   */
  get succ() {
    let t = this; // 记录后继的临时变量
    // 如果当前节点存在右子树，则后继节点为右子树中最左节点
    if (this.rc) {
      t = this.rc;
      while (t.hasLChild) t = t.lc;
    } else {
      while (t.isRChild) t = t.parent;
      t = t.parent;
    }
    return t;
  }

  /**
   * 将元素作为左子节点插入
   * @time O(1)
   * @space O(1)
   *
   * @param {Anyone} e
   * @return {BinNode} 返回插入额节点
   */
  insertAsLC(e) {
    this.lc = new BinNode(e, this);
    return this.lc;
  }

  /**
   * 将元素作为右子节点插入
   * @time O(1)
   * @space O(1)
   *
   * @param {Anyone} e
   * @return {BinNode} 返回插入额节点
   */
  insertAsRC(e) {
    this.rc = new BinNode(e, this);
    return this.rc;
  }

  /**
   * 当前节点作为根节点的子树层次遍历 BFS
   * @time O(N)
   * @space O(1)
   *
   * @param {function} 访问函数
   * @return {void}
   */
  static travLevel(p, visit) {
    if (!p) return;
    const q = new Queue();
    q.enqueue(p);
    while (!q.empty) {
      const node = q.dequeue();
      visit(node.data);
      if (node.hasLChild) q.enqueue(node.lc);
      if (node.hasRChild) q.enqueue(node.rc);
    }
  }

  /**
   * 当前节点作为根节点的子树前序遍历 DFS
   * @time O(N)
   * @space O(1)
   *
   * @param {BinNode} p 遍历的节点
   * @param {function} 访问函数
   * @return {void}
   */
  static travPre(p, visit) {
    if (!p) return;
    visit(p.data);
    BinNode.travPre(p.lc, visit);
    BinNode.travPre(p.rc, visit);
  }

  /**
   * 当前节点作为根节点的子树中序遍历 DFS
   * @time O(N)
   * @space O(1)
   *
   * @param {BinNode} p 遍历的节点
   * @param {function} 访问函数
   * @return {void}
   */
  static travIn(p, visit) {
    if (!p) return;
    BinNode.travIn(p.lc, visit);
    visit(p.data);
    BinNode.travIn(p.rc, visit);
  }

  /**
   * 当前节点作为根节点的子树后序遍历 DFS
   * @time O(N)
   * @space O(1)
   *
   * @param {BinNode} p 遍历的节点
   * @param {function} 访问函数
   * @return {void}
   */
  static travPost(p, visit) {
    if (!p) return;
    BinNode.travPost(p.lc, visit);
    BinNode.travPost(p.rc, visit);
    visit(p.data);
  }

  /**
   * 交换量几个节点的数据
   * @time O(1)
   * @space O(1)
   *
   * @param {BinNode} node1 要交换的节点1
   * @param {BinNode} node2 要交换的节点2
   * @return {void}
   */
  static swap(node1, node2) {
    const t = node1.data;
    node1.data = node2.data;
    node2.data = t;
  }
}

module.exports = BinNode;
