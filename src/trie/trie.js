const size = Symbol("size");
const root = Symbol("root");

function Node() {
  return { children: Array(26), has: false };
}

/**
 * @class
 * @return {Trie} Instance
 */
class Trie {
  /** Create a trie instance */
  constructor() {
    this[size] = 0; // 字典包含单词的数量
    this[root] = new Node();
  }

  /**
   * 获取字典树的大小, 包含单词的数量
   * @time O(1)
   * @space O(1)
   *
   * @return {number}
   */
  get size() {
    return this[size];
  }

  /**
   * 获取字典树的跟节点
   * @time O(1)
   * @space O(1)
   *
   * @return {number}
   */
  get root() {
    return this[root];
  }

  /**
   * 插入 word
   * @time O(N)
   * @space O(0)
   *
   * @param {String} word 要插入的单词
   * @return {void}
   */
  insert(word) {
    let node = this.root;
    word = word.toLowerCase();
    for (let i = 0; i < word.length; i += 1) {
      const index = word[i].charCodeAt() - 97;
      if (!node.children[index]) {
        node.children[index] = new Node();
      }
      node = node.children[index];
    }
    if (!node.has) {
      this[size] += 1;
      node.has = true;
    }
  }

  /**
   * 查找 word
   * @time O(N)
   * @space O(0)
   *
   * @param {String} word 要查找的单词
   * @return {Boolean}
   */
  find(word) {
    let node = this.root;
    word = word.toLowerCase();
    for (let i = 0; i < word.length; i += 1) {
      const index = word[i].charCodeAt() - 97;
      if (!node.children[index]) return false;
      node = node.children[index];
    }
    return node.has;
  }
}

module.exports = Trie;
