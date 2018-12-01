const BST = require("../BST");
const Vector = require("../../vector/vector");

describe("Binary-search-tree", () => {
  it("construtor", () => {
    const tree = new BST();
    expect(tree.size).toBe(0);
    expect(tree.empty).toBe(true);
  });

  it("insert, one element", () => {
    const tree = new BST();
    tree.insert(2);
    expect(tree.size).toBe(1);
    expect(tree.empty).toBe(false);
    expect(tree.root.data).toBe(2);
  });

  it("insert, two element", () => {
    const tree = new BST();
    tree.insert(2);
    expect(tree.size).toBe(1);
    expect(tree.empty).toBe(false);
    expect(tree.root.data).toBe(2);

    tree.insert(1);
    expect(tree.size).toBe(2);
    expect(tree.empty).toBe(false);
    expect(tree.root.data).toBe(2);
    expect(tree.root.lc.data).toBe(1);
  });

  it("insert, three element", () => {
    const tree = new BST();
    tree.insert(2);
    expect(tree.size).toBe(1);
    expect(tree.empty).toBe(false);
    expect(tree.root.data).toBe(2);

    tree.insert(1);
    expect(tree.size).toBe(2);
    expect(tree.empty).toBe(false);
    expect(tree.root.data).toBe(2);
    expect(tree.root.lc.data).toBe(1);

    tree.insert(3);
    expect(tree.size).toBe(3);
    expect(tree.empty).toBe(false);
    expect(tree.root.data).toBe(2);
    expect(tree.root.lc.data).toBe(1);
    expect(tree.root.rc.data).toBe(3);
  });

  it("insert, multi element", () => {
    const list = new Vector();

    const tree = new BST();
    for (let i = 0; i < 1000; i += 1) {
      const num = (Math.random() * 10000) | 0;
      list.insert(list.size, num);
      tree.insert(num);
    }
    Vector.mergeSort(list);
    list.uniquify();

    expect(tree.size).toBe(list.size);
    expect(tree.empty).toBe(false);

    const inOrder = [];
    tree.travIn(v => inOrder.push(v));
    expect(inOrder).toEqual(list.slice());
  });

  it("search", () => {
    const tree = new BST();
    tree.insert(2);
    tree.insert(1);
    tree.insert(3);

    const [node1, node1parent] = tree.search(1);
    const [node2, node2parent] = tree.search(2);
    const [node3, node3parent] = tree.search(3);
    expect(node2).toBe(tree.root);
    expect(node2parent).toBe(null);
    expect(node1).toBe(node2.lc);
    expect(node1parent).toBe(node2);
    expect(node3).toBe(node2.rc);
    expect(node3parent).toBe(node2);
  });

  it("remove", () => {
    const tree = new BST();
    const elem = [10, 4, 12, 11, 13, 3, 6];
    for (const n of elem) tree.insert(n);

    // 删除根，11 会上提到根
    tree.remove(10);
    expect(tree.size).toBe(6);
    expect(tree.root.data).toBe(11);
    const inOrder = [];
    tree.travIn(v => inOrder.push(v));
    expect(inOrder).toEqual([3, 4, 6, 11, 12, 13]);

    // 删除叶子，无须任何操作
    tree.remove(3);
    expect(tree.size).toBe(5);
    expect(tree.root.data).toBe(11);
    inOrder.length = 0;
    tree.travIn(v => inOrder.push(v));
    expect(inOrder).toEqual([4, 6, 11, 12, 13]);

    // 删除12, 13提升
    tree.insert(11.5);
    expect(tree.remove(12)).toBe(true);
    expect(tree.size).toBe(5);
    expect(tree.root.data).toBe(11);
    inOrder.length = 0;
    tree.travIn(v => inOrder.push(v));
    expect(inOrder).toEqual([4, 6, 11, 11.5, 13]);

    // 此时 13 是根的右孩子，13的左孩子为 11.5，右孩子为null
    const [node13, node13parent] = tree.search(13);
    expect(tree.root.rc).toBe(node13);
    expect(tree.root).toBe(node13parent);
    expect(node13.lc.data).toBe(11.5);
    expect(node13.rc).toBe(null);

    // 删除不存在的节点，返回false, 此时元素不会有任何变动
    expect(tree.remove(30)).toBe(false);
    expect(tree.size).toBe(5);
    inOrder.length = 0;
    tree.travIn(v => inOrder.push(v));
    expect(inOrder).toEqual([4, 6, 11, 11.5, 13]);

    // 删除13
    expect(tree.remove(13)).toBe(true);
    expect(tree.size).toBe(4);
    expect(tree.root.data).toBe(11);
    inOrder.length = 0;
    tree.travIn(v => inOrder.push(v));
    expect(inOrder).toEqual([4, 6, 11, 11.5]);
  });
});
