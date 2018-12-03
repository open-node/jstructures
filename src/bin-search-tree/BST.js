const BinNode = require("../bin-tree/bin-node");
const BinTree = require("../bin-tree/bin-tree");

/**
 * BST 类(二叉搜索树类, 继承自 BinTree)
 * @class
 * @return {BST} Instance
 */
class BST extends BinTree {
  /**
   * 查找元素 e 所在的节点
   * @time O(logN), Ω(N)
   * @space O(1)
   *
   * @param {Anyone} e 要搜索的元素
   *
   * @return {[BinNode]} 返回两项，第一项是搜索命中的节点，第二项是命中节点的父节点
   */
  search(e) {
    return BST.searchIn(this.root, e, null);
  }

  /**
   * 插入元素
   * @time O(logN), Ω(N)
   * @space O(1)
   * @param {Anyone} e 要插入的数据元素
   *
   * @return {BinNode}
   */
  insert(e) {
    const [x, p] = this.search(e);
    if (x) return x; // 已存在
    if (!p) return this.insertAsRoot(e); // 作为根插入
    if (e < p.data) return this.insertAsLC(p, e); // 作为左孩子插入
    return this.insertAsRC(p, e); // 作为右孩子插入
  }

  /**
   * 删除元素, 注意是删除节点，非节点为根的子树
   * @time O(logN), Ω(N)
   * @space O(1)
   * @param {Anyone} e 要插入的数据元素
   *
   * @return {Boolean} 是否成功删除
   */
  remove(e) {
    const [x, p] = this.search(e);
    if (!x) return false; // 不存在
    const succ = BST.removeAt(x, p);
    this.size -= 1;
    this.updateHeightAbove(succ);
    return true;
  }

  /**
   * 删除某个节点
   * @time O(1)
   * @space O(1)
   * @param {BinNode} x 要删除的节点
   *
   * @return {BinNode} 返回接替者
   */
  static removeAt(x) {
    let succ;
    const [parent, key] = x.fromParentTo;
    if (!x.hasLChild) {
      // 左孩子不存在, 右孩子也可能不存在
      parent[key] = x.rc;
      succ = x.rc;
    } else if (!x.hasRChild) {
      // 左孩子存在，右孩子不存在
      parent[key] = x.lc;
      succ = x.lc;
    } else {
      // 左右孩子都存在
      const w = x.succ;
      const u = w.parent;
      BinNode.swap(x, w); // 交换当前节点和后继节点的数据
      u[u === x ? "rc" : "lc"] = w.rc; // 隔离节点
      succ = w.rc;
    }

    if (succ) succ.parent = parent; // 将删除节点的接替者跟parent连接

    return succ;
  }

  /**
   * 以 v 为根节点查找元素 e 所在的节点
   * @time O(logN)
   * @space O(1)
   *
   * @param {BinNode} v 要搜索的树的根节点
   * @param {Anyone} e 要搜索的元素
   * @param {BinNode} p 当前搜索节点的父节点
   *
   * @return {[BinNode]} 返回两项，第一项是搜索命中的节点，第二项是命中节点的父节点
   */
  static searchIn(v, e, parent) {
    if (!v || e === v.data) return [v, parent];
    return BST.searchIn(e < v.data ? v.lc : v.rc, e, v);
  }
}

module.exports = BST;
