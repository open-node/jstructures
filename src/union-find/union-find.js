const parent = Symbol("parent");

/**
 * UnionFind 并查集类
 * @class
 * @param {Number} size 集合规模
 * @return {UnionFind} Instance
 */
class UnionFind {
  /** Create a UnionFind instance */
  constructor(size) {
    this[parent] = Array(size);
    for (let i = 0; i < size; i += 1) {
      this[parent][i] = i;
    }
    this.size = size;
  }

  /**
   * 查找p所属的集合编号
   * @param {Number} p
   * @time O(log*N)
   * @space O(1);
   *
   * @return {Number}
   */
  find(p) {
    if (p !== this[parent][p]) {
      this[parent][p] = this.find(this[parent][p]);
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
    const pP = this.find(p);
    const qP = this.find(q);
    if (pP === qP) return;
    this[parent][pP] = qP;
    this.size -= 1;
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
    return this.find(p) === this.find(q);
  }

  /**
   * 用来返回内部集合的情况
   *
   * @return {String}
   */
  toString() {
    const map = new Map();
    for (let id = 0; id < this[parent].length; id += 1) {
      const p = this.find(id);
      map.set(p, (map.get(p) || new Set()).add(id));
    }
    const strs = [];
    for (const [id, ids] of map) {
      strs.push(`Set: ${id}, included: ${Array.from(ids).join(", ")}`);
    }

    return strs.join("\n");
  }
}

module.exports = UnionFind;
