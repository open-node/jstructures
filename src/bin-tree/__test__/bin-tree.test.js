const BinTree = require("../bin-tree");

describe("Bin-tree", () => {
  it("construtor", () => {
    const tree = new BinTree();
    expect(tree.size).toBe(0);
    expect(tree.empty).toBe(true);
  });

  it("insertAsRoot", () => {
    const tree = new BinTree();
    expect(tree.size).toBe(0);
    expect(tree.empty).toBe(true);

    tree.insertAsRoot(1);
    expect(tree.size).toBe(1);
    expect(tree.empty).toBe(false);

    expect(tree.root.data).toBe(1);
    expect(tree.root.parent).toBe(null);
  });

  it("insertAsLC, insertAsRC, etc...", () => {
    const tree = new BinTree();
    tree.insertAsRoot(1);
    expect(tree.size).toBe(1);
    expect(tree.empty).toBe(false);
    expect(tree.root.data).toBe(1);
    expect(tree.root.parent).toBe(null);

    tree.insertAsLC(tree.root, 2);
    expect(tree.size).toBe(2);
    expect(tree.empty).toBe(false);
    expect(tree.root.lc.data).toBe(2);
    expect(tree.root.height).toBe(1);

    tree.insertAsRC(tree.root, 3);
    expect(tree.size).toBe(3);
    expect(tree.empty).toBe(false);
    expect(tree.root.rc.data).toBe(3);
    expect(tree.root.height).toBe(1);
  });

  it("traversle", () => {
    const tree = new BinTree();
    const p = tree.insertAsRoot(1);
    const p1 = tree.insertAsLC(tree.root, 2);
    expect(p1.height).toBe(0);
    expect(p.height).toBe(1);

    const p11 = tree.insertAsLC(p1, 4);
    const p12 = tree.insertAsRC(p1, 5);
    expect(p11.height).toBe(0);
    expect(p12.height).toBe(0);
    expect(p1.height).toBe(1);
    expect(p.height).toBe(2);

    const p2 = tree.insertAsRC(p, 3);
    const p21 = tree.insertAsLC(p2, 6);
    const p22 = tree.insertAsRC(p2, 7);

    const p222 = tree.insertAsRC(p22, 8);

    expect(p11.height).toBe(0);
    expect(p12.height).toBe(0);
    expect(p1.height).toBe(1);
    expect(p.height).toBe(3);

    expect(p2.height).toBe(2);
    expect(p21.height).toBe(0);
    expect(p22.height).toBe(1);
    expect(p222.height).toBe(0);

    const preOrder = [];
    tree.travPre(d => preOrder.push(d));
    expect(preOrder).toEqual([1, 2, 4, 5, 3, 6, 7, 8]);

    const inOrder = [];
    tree.travIn(d => inOrder.push(d));
    expect(inOrder).toEqual([4, 2, 5, 1, 6, 3, 7, 8]);

    const postOrder = [];
    tree.travPost(d => postOrder.push(d));
    expect(postOrder).toEqual([4, 5, 2, 6, 8, 7, 3, 1]);

    const levelOrder = [];
    tree.travLevel(d => levelOrder.push(d));
    expect(levelOrder).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("remove", () => {
    const tree = new BinTree();
    const p = tree.insertAsRoot(1);
    const p1 = tree.insertAsLC(tree.root, 2);

    const p11 = tree.insertAsLC(p1, 4);
    const p12 = tree.insertAsRC(p1, 5);

    const p2 = tree.insertAsRC(p, 3);
    const p21 = tree.insertAsLC(p2, 6);
    const p22 = tree.insertAsRC(p2, 7);

    const p222 = tree.insertAsRC(p22, 8);
    expect(tree.size).toBe(8);

    tree.remove(p222);
    expect(p.size).toBe(7);
    expect(tree.size).toBe(7);
    expect(p22.rc).toBe(null);
    expect(p.height).toBe(2);
    expect(p1.height).toBe(1);
    expect(p11.height).toBe(0);
    expect(p12.height).toBe(0);
    expect(p2.height).toBe(1);
    expect(p21.height).toBe(0);
    expect(p22.height).toBe(0);

    expect(tree.remove(p1)).toBe(3);
    expect(p.size).toBe(4);
    expect(tree.size).toBe(4);
    expect(p22.rc).toBe(null);
    expect(p.height).toBe(2);
    expect(p2.height).toBe(1);
    expect(p21.height).toBe(0);
    expect(p22.height).toBe(0);

    expect(tree.remove(p2)).toBe(3);
    expect(p.size).toBe(1);
    expect(tree.size).toBe(1);
    expect(p.height).toBe(0);
  });

  it("remove, case2", () => {
    const tree = new BinTree();
    const p = tree.insertAsRoot(1);
    const p1 = tree.insertAsLC(tree.root, 2);

    expect(tree.remove(p)).toBe(2);
    // JavaScript 的特性所致，remove并不能真正意义上的删除节点
    // gc 由语言层面自行调配
    expect(p1.data).toBe(2);
  });

  it("secede", () => {
    const tree = new BinTree();
    const p = tree.insertAsRoot(1);
    const p1 = tree.insertAsLC(tree.root, 2);

    const p11 = tree.insertAsLC(p1, 4);
    const p12 = tree.insertAsRC(p1, 5);

    const p2 = tree.insertAsRC(p, 3);
    const p21 = tree.insertAsLC(p2, 6);
    const p22 = tree.insertAsRC(p2, 7);

    const p222 = tree.insertAsRC(p22, 8);
    expect(tree.size).toBe(8);

    const subTree = tree.secede(p2);
    expect(p.size).toBe(4);
    expect(tree.size).toBe(4);
    expect(p.height).toBe(2);
    expect(p1.height).toBe(1);
    expect(p11.height).toBe(0);
    expect(p12.height).toBe(0);

    expect(p2.size).toBe(4);
    expect(subTree.size).toBe(4);
    expect(p2.height).toBe(2);
    expect(p21.height).toBe(0);
    expect(p22.height).toBe(1);
    expect(p222.height).toBe(0);
  });

  it("secede, case2", () => {
    const tree = new BinTree();
    const p = tree.insertAsRoot(1);
    tree.insertAsLC(p, 2);

    expect(tree.secede(p)).toBe(tree);
  });

  it("attachAsLC, attachAsRC", () => {
    const tree1 = new BinTree();
    const p = tree1.insertAsRoot(1);
    const p1 = tree1.insertAsLC(p, 2);
    tree1.insertAsLC(p1, 4);
    tree1.insertAsRC(p1, 5);

    const tree2 = new BinTree();
    const p2 = tree2.insertAsRoot(3);
    tree1.insertAsLC(p2, 6);
    const p22 = tree1.insertAsRC(p2, 7);
    tree1.insertAsRC(p22, 8);

    tree1.attachAsRC(p, tree2);
    expect(tree1.size).toBe(8);
    expect(p.size).toBe(8);
    expect(p.height).toBe(3);

    const subTree = tree1.secede(p1);
    expect(tree1.size).toBe(5);
    expect(p.size).toBe(5);
    expect(p.height).toBe(3);

    tree1.attachAsLC(p, subTree);
    expect(tree1.size).toBe(8);
    expect(p.size).toBe(8);
    expect(p.height).toBe(3);
  });

  it("special traversle", () => {
    const tree = new BinTree();
    tree.travLevel(() => expect(true).toBe(false));
    tree.travPre(() => expect(true).toBe(false));
    tree.travIn(() => expect(true).toBe(false));
    tree.travPost(() => expect(true).toBe(false));
  });

  it("special attach", () => {
    const tree1 = new BinTree();
    tree1.insertAsRoot(1);
    expect(tree1.size).toBe(1);

    const tree2 = new BinTree();
    expect(tree2.size).toBe(0);

    tree1.attachAsLC(tree1.root, tree2);
    expect(tree1.size).toBe(1);
    expect(tree1.root.height).toBe(0);

    tree1.attachAsRC(tree1.root, tree2);
    expect(tree1.size).toBe(1);
    expect(tree1.root.height).toBe(0);
  });
});
