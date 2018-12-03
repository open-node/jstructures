const BST = require("../bin-search-tree/BST");

/**
 * AVL 类(AVL 树, 继承自 BST)
 * @class
 * @return {AVL} Instance
 */
class AVL extends BST {
  /**
   * 插入元素
   * @time O(logN), Ω(N)
   * @space O(1)
   * @param {Anyone} e 要插入的数据元素
   *
   * @return {BinNode}
   */
  insert() {}

  /**
   * 删除元素, 注意是删除节点，非节点为根的子树
   * @time O(logN), Ω(N)
   * @space O(1)
   * @param {Anyone} e 要插入的数据元素
   *
   * @return {Boolean} 是否成功删除
   */
  remove() {}

  /**
   * 判断某个节点是否理想平衡即：左右高度相等
   * @time O(1)
   * @space O(1)
   *
   * @param {BinNode} 要判断的节点
   * @return {Boolean}
   */
  static balanced(x) {
    return AVL.height(x.lc) === AVL.height(x.rc);
  }

  /**
   * 判断某个节点是否AVL平衡即：-2<左高度-右高度<2
   * @time O(1)
   * @space O(1)
   *
   * @param {BinNode} 要判断的节点
   * @return {Boolean}
   */
  static AVLBalanced(x) {
    return Math.abs(AVL.balFac(x)) < 2;
  }

  /**
   * 获取节点的平衡因子 x.lc.height - x.rc.height;
   * @time O(1)
   * @space O(1)
   *
   * @param {BinNode} 要判断的节点
   * @return {number} 左子树高度和右子树高度的差值
   */
  static balFac(x) {
    return AVL.height(x.lc) - AVL.height(x.rc);
  }

  /**
   * 获取节点的高度
   * @time O(1)
   * @space O(1)
   *
   * @param {BinNode} 要判断的节点
   * @return {number} 节点高度，空树高 -1， 叶子高 0
   */
  static height(x) {
    if (!x) return -1;
    return x.height;
  }
}

module.exports = AVL;
