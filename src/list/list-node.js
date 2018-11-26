// ListNode (Lined list)

function ListNode(e) {
  this.data = e;
  this.pred = null;
  this.succ = null;
}

/**
 * 将 元素 e 作为当前节点的直接后继插入
 * @param {Anyone} e
 *
 * @return {ListNode}
 */
// A <--> B  插入 C;   A <--> C <--> B
ListNode.prototype.insertAsSucc = function insertAsSucc(e) {
  const A = this;
  const C = new ListNode(e);
  const B = this.succ;

  A.succ = C;
  C.succ = B;
  B.prev = C;
  C.prev = A;

  return C;
};

/**
 * 将 元素 e 作为当前节点的直接前驱插入
 * @param {Anyone} e
 *
 * @return {ListNode}
 */
// B <--> A  插入 C;   B <--> C <--> A
ListNode.prototype.insertAsPred = function insertAsPred(e) {
  const B = this.prev;
  const C = new ListNode(e);
  const A = this;

  B.succ = C;
  C.succ = A;
  A.prev = C;
  C.prev = B;

  return C;
};

module.exports = ListNode;
