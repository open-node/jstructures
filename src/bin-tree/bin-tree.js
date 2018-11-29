const BinNode = require("./bin-node");

const root = Symbol("root");
const size = Symbol("size");
const updateHeight = Symbol("updateHeight");
const updateHeightAbove = Symbol("updateHeightAbove");

/**
 * BinTree 类(二叉树类)
 * @class
 * @return {BinNode} Instance
 */
class BinTree {
  /** Create a BinTree instance */
  constructor() {
    this[root] = null;
    this[size] = 0;
  }

  /**
   * 树的规模
   * @time O(1)
   * @space O(1)
   *
   * @return {number}
   */
  get size() {
    return this[size];
  }

  /**
   * 树是否为空
   * @time O(1)
   * @space O(1)
   *
   * @return {Boolean}
   */
  // 这里既可以判断是否有根节点，也可以判断 this.size 是否为零
  get empty() {
    return !this[root];
  }

  /**
   * 树根节点
   * @time O(1)
   * @space O(1)
   *
   * @return {BinNode}
   */
  get root() {
    return this[root];
  }

  /**
   * 重置根节点
   * @time O(1)
   * @space O(1)
   *
   * @return {BinNode}
   */
  set root(_root) {
    this[root] = _root;
    _root.parent = null;
    this[size] = _root.size;

    return this[root];
  }

  //  更新节点的高度
  //  @time O(1)
  //  @space O(1)
  //  @param {BinNode} p 要更新的节点
  //
  //  @return {number} 返回更新后的高度
  [updateHeight](p) {
    if (p.isLeaf) {
      p.height = 0;
    } else {
      p.height = 1 + Math.max(p.lc ? p.lc.height : 0, p.rc ? p.rc.height : 0);
    }

    return p.height;
  }

  // 更新节点以及祖先节点的高度
  // @time O(logN)
  // @space O(1)
  // @param {BinNode} p 要更新的节点
  //
  // @return {number} 返回更新后的高度
  [updateHeightAbove](p) {
    while (p) {
      const { height } = p;
      if (height === this[updateHeight](p)) break;
      p = p.parent;
    }
  }

  /**
   * 作为树根节点插入
   * @time O(1)
   * @space O(1)
   * @param {Anyone} e 要插入的数据元素
   *
   * @return {BinNode}
   */
  insertAsRoot(e) {
    this[size] = 1;
    this[root] = new BinNode(e);

    return this[root];
  }

  /**
   * 作为节点的左孩子插入
   * @time O(logN)
   * @space O(1)
   * @param {BinNode} p 要插入的位置
   * @param {Anyone} e 要插入的数据元素
   *
   * @return {BinNode}
   */
  insertAsLC(p, e) {
    this[size] += 1;
    p.insertAsLC(e);
    this[updateHeightAbove](p);

    return p.lc;
  }

  /**
   * 作为节点的右孩子插入
   * @time O(logN)
   * @space O(1)
   * @param {BinNode} p 要插入的位置
   * @param {Anyone} e 要插入的数据元素
   *
   * @return {BinNode}
   */
  insertAsRC(p, e) {
    this[size] += 1;
    p.insertAsRC(e);
    this[updateHeightAbove](p);

    return p.rc;
  }

  /**
   * 作为节点的左孩子接入子树
   * @time O(logN)
   * @space O(1)
   * @param {BinNode} p 要插入的位置
   * @param {BinTree} s 要接入的数
   *
   * @return {BinNode}
   */
  attachAsLC(p, s) {
    // 接入
    p.lc = s.root;
    if (p.lc) p.lc.parent = p;

    // 更新状态值
    this[size] += s.size;
    this[updateHeightAbove](p);

    // 返回节点
    return p;
  }

  /**
   * 作为节点的右孩子接入子树
   * @time O(logN)
   * @space O(1)
   * @param {BinNode} p 要插入的位置
   * @param {BinTree} s 要接入的数
   *
   * @return {BinNode}
   */
  attachAsRC(p, s) {
    // 接入
    p.rc = s.root;
    if (p.rc) p.rc.parent = p;

    // 更新状态值
    this[size] += s.size;
    this[updateHeightAbove](p);

    // 返回节点
    return p;
  }

  /**
   * 删除某个节点作为根的子树
   * @time O(logN)
   * @space O(1)
   * @param {BinNode} p 要删除的根节点
   *
   * @return {number} 返回删除节点的总个数
   */
  remove(p) {
    if (p.isRoot) {
      delete this[root];
      this[root] = null;
      this[size] = 0;
      return p.size;
    }

    // 切断父节点的引用
    const [parent, key] = p.fromParentTo;
    parent[key] = null;

    // 更新父节点高度
    this[updateHeightAbove](p.parent);

    // 更新树的规模
    this[size] -= p.size;

    return p.size;
  }

  /**
   * 分离某个节点作为根的子树
   * @time O(logN)
   * @space O(1)
   * @param {BinNode} p 要删除的根节点
   *
   * @return {BinTree} 返回分离出来的子树
   */
  secede(p) {
    // 切断父节点的引用
    if (p.isRoot) return this;

    const [parent, key] = p.fromParentTo;
    parent[key] = null;

    // 更新父节点高度
    this[updateHeightAbove](p.parent);

    const subTree = new BinTree();
    subTree.root = p;

    // 更新当前树的规模
    this[size] -= subTree.size;

    return subTree;
  }

  /**
   * 树的层次遍历
   * @param {function} 访问函数
   * @return {void}
   */
  travLevel(visit) {
    if (this[root]) BinNode.travLevel(this[root], visit);
  }

  /**
   * 树的前序遍历
   * @param {function} 访问函数
   * @return {void}
   */
  travPre(visit) {
    if (this[root]) BinNode.travPre(this[root], visit);
  }

  /**
   * 树的中序遍历
   * @param {function} 访问函数
   * @return {void}
   */
  travIn(visit) {
    if (this[root]) BinNode.travIn(this[root], visit);
  }

  /**
   * 树的后序遍历
   * @param {function} 访问函数
   * @return {void}
   */
  travPost(visit) {
    if (this[root]) BinNode.travPost(this[root], visit);
  }
}

module.exports = BinTree;
