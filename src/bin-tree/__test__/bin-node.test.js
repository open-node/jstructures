const BinNode = require("../bin-node");

describe("Bin-node", () => {
  it("store data, parent is null", () => {
    const node = new BinNode(123);
    expect(node.size).toBe(1);
    expect(node.isRoot).toBe(true);
    expect(node.height).toBe(0);
    expect(node.data).toBe(123);
  });

  it("store object data , parent is null", () => {
    const d = {};
    const node = new BinNode(d);
    expect(node.size).toBe(1);
    expect(node.isRoot).toBe(true);
    expect(node.height).toBe(0);
    expect(node.data).toBe(d);
  });

  it("store object data , parent isnt null", () => {
    const d = {};
    const p = new BinNode(d);
    expect(p.size).toBe(1);
    expect(p.isRoot).toBe(true);
    expect(p.height).toBe(0);
    expect(p.data).toBe(d);

    const node = new BinNode(123, p);
    p.lc = node;
    expect(node.size).toBe(1);
    expect(node.isRoot).toBe(false);
    expect(node.height).toBe(0);
    expect(node.data).toBe(123);
    expect(node.parent).toBe(p);
  });

  it("method whole test", () => {
    const d = 0;
    const p = new BinNode(d);
    expect(p.size).toBe(1);
    expect(p.isRoot).toBe(true);
    expect(p.height).toBe(0);
    expect(p.data).toBe(d);

    const node = new BinNode(123, p);
    p.lc = node;
    expect(node.size).toBe(1);
    expect(node.isRoot).toBe(false);
    expect(node.height).toBe(0);
    expect(node.data).toBe(123);
    expect(node.parent).toBe(p);

    expect(p.isLChild).toBe(false);
    expect(node.isLChild).toBe(true);

    expect(p.isRChild).toBe(false);
    expect(node.isRChild).toBe(false);

    expect(p.hasParent).toBe(false);
    expect(node.hasParent).toBe(true);

    expect(p.hasLChild).toBe(true);
    expect(node.hasLChild).toBe(false);

    expect(p.hasRChild).toBe(false);
    expect(node.hasRChild).toBe(false);

    expect(p.hasChild).toBe(true);
    expect(node.hasChild).toBe(false);

    expect(p.hasBothChild).toBe(false);
    expect(node.hasBothChild).toBe(false);

    const node2 = p.insertAsRC(456);
    expect(node2.data).toBe(456);
    expect(node2.isRChild).toBe(true);
    expect(node2.isLChild).toBe(false);

    expect(p.hasBothChild).toBe(true);
    expect(p.isLeaf).toBe(false);
    expect(node.isLeaf).toBe(true);
    expect(node2.isLeaf).toBe(true);

    expect(node.sibling).toBe(node2);
    expect(node2.sibling).toBe(node);

    const node3 = node.insertAsLC(789);
    expect(node3.data).toBe(789);

    expect(node3.uncle).toBe(node2);

    let [parent, key] = node3.fromParentTo;
    expect(parent).toBe(node);
    expect(key).toBe("lc");

    [parent, key] = node.fromParentTo;
    expect(parent).toBe(p);
    expect(key).toBe("lc");

    [parent, key] = node2.fromParentTo;
    expect(parent).toBe(p);
    expect(key).toBe("rc");
  });

  it("static method test traverse", () => {
    const p = new BinNode(1);
    const p1 = p.insertAsLC(2);
    const p11 = p1.insertAsLC(4);
    const p12 = p1.insertAsRC(5);

    const p2 = p.insertAsRC(3);
    const p21 = p2.insertAsLC(6);
    const p22 = p2.insertAsRC(7);

    const p222 = p22.insertAsRC(8);

    const preOrder = [];
    BinNode.travPre(p, d => preOrder.push(d));
    expect(preOrder).toEqual([1, 2, 4, 5, 3, 6, 7, 8]);

    const inOrder = [];
    BinNode.travIn(p, d => inOrder.push(d));
    expect(inOrder).toEqual([4, 2, 5, 1, 6, 3, 7, 8]);

    const postOrder = [];
    BinNode.travPost(p, d => postOrder.push(d));
    expect(postOrder).toEqual([4, 5, 2, 6, 8, 7, 3, 1]);

    const levelOrder = [];
    BinNode.travLevel(p, d => levelOrder.push(d));
    expect(levelOrder).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

    expect(p22.succ).toBe(p222);
    expect(p222.pred).toBe(p22);
    expect(p1.succ).toBe(p12);
    expect(p12.pred).toBe(p1);

    expect(p11.succ).toBe(p1);
    expect(p11.pred).toBe(null);
    expect(p1.pred).toBe(p11);
    expect(p12.succ).toBe(p);
    expect(p.pred).toBe(p12);

    expect(p21.succ).toBe(p2);
    expect(p2.pred).toBe(p21);
    expect(p2.succ).toBe(p22);
    expect(p22.pred).toBe(p2);
    expect(p222.succ).toBe(null);

    expect(p.succ).toBe(p21);
    expect(p21.pred).toBe(p);
    expect(p.size).toBe(8);
  });

  it("Boundary conditions", () => {
    const p = new BinNode();
    expect(p.data).toBe(null);
    expect(p.size).toBe(1);
    expect(p.height).toBe(0);

    BinNode.travLevel(null, () => expect(true).toBe(false));
  });
});
