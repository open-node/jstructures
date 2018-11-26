const List = require("../list");

describe("Linked-list", () => {
  it("new List, size should be empty", () => {
    const list = new List();
    expect(list.size()).toBe(0);
    expect(list.first()).toBe(null);
    expect(list.last()).toBe(null);
  });

  it("list.insertAsFirst", () => {
    const list = new List();
    expect(list.insertAsFirst(1).data).toBe(1);
    expect(list.size()).toBe(1);
    expect(list.first().data).toBe(1);
    expect(list.last().data).toBe(1);

    expect(list.insertAsFirst(2).data).toBe(2);
    expect(list.size()).toBe(2);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(1);
  });

  it("list.insertAsLast", () => {
    const list = new List();
    expect(list.insertAsLast(1).data).toBe(1);
    expect(list.size()).toBe(1);
    expect(list.first().data).toBe(1);
    expect(list.last().data).toBe(1);

    expect(list.insertAsLast(2).data).toBe(2);
    expect(list.size()).toBe(2);
    expect(list.first().data).toBe(1);
    expect(list.last().data).toBe(2);
  });

  it("list.insertA", () => {
    const list = new List();
    const node = list.insertAsLast(1);
    list.insertA(node, 2);

    expect(list.size()).toBe(2);
    expect(list.first().data).toBe(1);
    expect(list.last().data).toBe(2);
  });

  it("list.insertB", () => {
    const list = new List();
    const node = list.insertAsFirst(1);
    list.insertB(node, 2);

    expect(list.size()).toBe(2);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(1);
  });

  it("list.remove", () => {
    const list = new List();
    const node = list.insertAsFirst(1);
    list.remove(node);

    expect(list.size()).toBe(0);
    expect(list.first()).toBe(null);
    expect(list.last()).toBe(null);
  });

  it("list.disordered", () => {
    const list = new List();
    list.insertAsFirst(1);
    list.insertAsFirst(2);
    list.insertAsFirst(3);

    expect(list.size()).toBe(3);
    expect(list.disordered()).toBe(2);
  });

  it("list.findElem", () => {
    const list = new List();
    const node = list.insertAsFirst(1);
    list.insertAsFirst(2);
    list.insertAsFirst(3);

    expect(list.findElem(2, 0, node)).toBe(null);
    expect(list.findElem(2, 1, node).data).toBe(2);
    expect(list.findElem(2, 2, node).data).toBe(2);
    expect(list.findElem(2).data).toBe(2);
  });

  it("list.search", () => {
    const list = new List();
    const node = list.insertAsFirst(3);
    list.insertAsFirst(2);
    list.insertAsFirst(1);

    expect(list.search(2, 0, node).data).toBe(2);
    expect(list.search(2, 1, node).data).toBe(2);
    expect(list.search(2, 2, node).data).toBe(2);
    expect(list.search(2).data).toBe(2);
    expect(list.search(4).data).toBe(3);
    expect(list.search(0).data).toBe(undefined);
  });

  it("list.deduplicate, case1", () => {
    const list = new List();
    list.insertAsFirst(3);
    list.insertAsFirst(2);
    list.insertAsFirst(3);

    expect(list.size()).toBe(3);
    expect(list.first().data).toBe(3);
    expect(list.last().data).toBe(3);

    expect(list.deduplicate()).toBe(1);
    expect(list.size()).toBe(2);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(3);
  });

  it("list.deduplicate, case2", () => {
    const list = new List();
    list.insertAsFirst(3);
    list.insertAsFirst(2);
    list.insertAsFirst(3);
    list.insertAsFirst(2);

    expect(list.size()).toBe(4);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(3);

    expect(list.deduplicate()).toBe(2);
    expect(list.size()).toBe(2);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(3);
  });

  it("list.deduplicate, case3", () => {
    const list = new List();
    list.insertAsFirst(3);
    list.insertAsFirst(3);
    list.insertAsFirst(3);
    list.insertAsFirst(3);

    expect(list.size()).toBe(4);
    expect(list.first().data).toBe(3);
    expect(list.last().data).toBe(3);

    expect(list.deduplicate()).toBe(3);
    expect(list.size()).toBe(1);
    expect(list.first().data).toBe(3);
    expect(list.last().data).toBe(3);
  });

  it("list.deduplicate, case4", () => {
    const list = new List();
    list.insertAsFirst(3);

    expect(list.size()).toBe(1);
    expect(list.first().data).toBe(3);
    expect(list.last().data).toBe(3);

    expect(list.deduplicate()).toBe(0);
    expect(list.size()).toBe(1);
    expect(list.first().data).toBe(3);
    expect(list.last().data).toBe(3);
  });

  it("list.uniquify, case1", () => {
    const list = new List();
    list.insertAsFirst(3);
    list.insertAsFirst(2);
    list.insertAsFirst(2);
    list.insertAsFirst(1);

    expect(list.size()).toBe(4);
    expect(list.first().data).toBe(1);
    expect(list.last().data).toBe(3);

    expect(list.uniquify()).toBe(1);
    expect(list.size()).toBe(3);
    expect(list.first().data).toBe(1);
    expect(list.last().data).toBe(3);
  });

  it("list.uniquify, case2", () => {
    const list = new List();
    list.insertAsFirst(2);
    list.insertAsFirst(2);
    list.insertAsFirst(2);
    list.insertAsFirst(1);

    expect(list.size()).toBe(4);
    expect(list.first().data).toBe(1);
    expect(list.last().data).toBe(2);

    expect(list.uniquify()).toBe(2);
    expect(list.size()).toBe(2);
    expect(list.first().data).toBe(1);
    expect(list.last().data).toBe(2);
  });

  it("list.uniquify, case3", () => {
    const list = new List();
    list.insertAsFirst(2);
    list.insertAsFirst(2);
    list.insertAsFirst(2);
    list.insertAsFirst(1);
    list.insertAsFirst(1);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(1);
    expect(list.last().data).toBe(2);

    expect(list.uniquify()).toBe(3);
    expect(list.size()).toBe(2);
    expect(list.first().data).toBe(1);
    expect(list.last().data).toBe(2);
  });

  it("list.uniquify, case4", () => {
    const list = new List();
    list.insertAsFirst(2);
    list.insertAsFirst(2);
    list.insertAsFirst(2);
    list.insertAsFirst(2);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(2);

    expect(list.uniquify()).toBe(4);
    expect(list.size()).toBe(1);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(2);
  });

  it("list.uniquify, case5", () => {
    const list = new List();
    list.insertAsFirst(3);

    expect(list.size()).toBe(1);
    expect(list.first().data).toBe(3);
    expect(list.last().data).toBe(3);

    expect(list.uniquify()).toBe(0);
    expect(list.size()).toBe(1);
    expect(list.first().data).toBe(3);
    expect(list.last().data).toBe(3);
  });

  it("list.traverse", () => {
    const list = new List();
    list.insertAsFirst(5);
    list.insertAsFirst(4);
    list.insertAsFirst(3);
    list.insertAsFirst(2);
    list.insertAsFirst(1);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(1);
    expect(list.last().data).toBe(5);

    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([1, 2, 3, 4, 5]);
  });

  it("list.valid", () => {
    const list = new List();
    expect(list.valid(list.insertAsFirst(5))).toBe(true);
    expect(list.valid(list.insertAsFirst(4))).toBe(true);
    expect(list.valid(list.insertAsFirst(3))).toBe(true);
    expect(list.valid(list.insertAsFirst(2))).toBe(true);
    expect(list.valid(list.insertAsFirst(1))).toBe(true);
    expect(list.valid(list.search(0))).toBe(false);
    expect(list.valid(list.search(6))).toBe(true);
    expect(list.search(6).data).toBe(5);
  });

  it("list.selectMax", () => {
    const list = new List();
    list.insertAsFirst(5);
    list.insertAsFirst(4);
    list.insertAsFirst(3);
    list.insertAsFirst(2);
    const node = list.insertAsFirst(1);

    expect(list.selectMax().data).toBe(5);
    expect(list.selectMax(node, 2).data).toBe(2);
    expect(list.selectMax(node, 3).data).toBe(3);
    expect(list.selectMax(node, 4).data).toBe(4);
    expect(list.selectMax(list.selectMax(node, 4), 1).data).toBe(4);
    expect(list.selectMax(list.selectMax(node, 4), 2).data).toBe(5);
  });

  it("list.insertionSort, case1 default argument", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.insertionSort();
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([1, 2, 3, 4, 5]);
  });

  it("list.insertionSort, case2 undefault argument", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.insertionSort(list.first(), 5);
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([1, 2, 3, 4, 5]);
  });

  it("list.insertionSort, case3 undefault argument, only before part", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.insertionSort(list.first(), 2);
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([1, 2, 3, 5, 4]);
  });

  it("list.insertionSort, case4 undefault argument, only after part", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    const node = list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.insertionSort(node, 3);
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([2, 1, 3, 4, 5]);
  });

  it("list.insertionSort, case5 undefault argument, all elements", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.insertionSort(list.first(), list.size());
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([1, 2, 3, 4, 5]);
  });

  it("list.selectionSort, case1 default argument", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.selectionSort();
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([1, 2, 3, 4, 5]);
  });

  it("list.selectionSort, case2 undefault argument", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.selectionSort(list.first(), 5);
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([1, 2, 3, 4, 5]);
  });

  it("list.selectionSort, case3 undefault argument, only before part", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.selectionSort(list.first(), 2);
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([1, 2, 3, 5, 4]);
  });

  it("list.selectionSort, case4 undefault argument, only after part", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    const node = list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.selectionSort(node, 3);
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([2, 1, 3, 4, 5]);
  });

  it("list.selectionSort, case5 undefault argument, all elements", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.selectionSort(list.first(), list.size());
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([1, 2, 3, 4, 5]);
  });

  it("list.merge, case1", () => {
    const me = new List();
    me.insertAsFirst(2);
    me.insertAsFirst(1);
    me.insertAsFirst(0);

    const he = new List();
    he.insertAsFirst(5);
    he.insertAsFirst(4);
    he.insertAsFirst(3);

    me.merge(me.first(), 3, he, he.first(), 3);

    expect(me.size()).toBe(6);
    const _elem = [];
    me.traverse(e => _elem.push(e));
    expect(_elem).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("list.merge, case2", () => {
    const me = new List();
    me.insertAsFirst(5);
    me.insertAsFirst(4);
    const node = me.insertAsFirst(3);

    me.insertAsFirst(2);
    me.insertAsFirst(1);
    me.insertAsFirst(0);

    me.merge(me.first(), 3, me, node, 3);

    expect(me.size()).toBe(6);
    const _elem = [];
    me.traverse(e => _elem.push(e));
    expect(_elem).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("list.merge, case3", () => {
    const me = new List();
    me.insertAsFirst(2);
    me.insertAsFirst(1);
    const node = me.insertAsFirst(0);

    me.insertAsFirst(5);
    me.insertAsFirst(4);
    me.insertAsFirst(3);

    me.merge(me.first(), 3, me, node, 3);

    expect(me.size()).toBe(6);
    const _elem = [];
    me.traverse(e => _elem.push(e));
    expect(_elem).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("list.merge, case4", () => {
    const me = new List();
    me.insertAsFirst(5);
    me.insertAsFirst(4);
    me.insertAsFirst(3);

    const he = new List();
    he.insertAsFirst(2);
    he.insertAsFirst(1);
    he.insertAsFirst(0);

    me.merge(me.first(), 3, he, he.first(), 3);

    expect(me.size()).toBe(6);
    const _elem = [];
    me.traverse(e => _elem.push(e));
    expect(_elem).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("list.mergeSort, case1 default argument", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.mergeSort();
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([1, 2, 3, 4, 5]);
  });

  it("list.mergeSort, case2 undefault argument", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.mergeSort(list.first(), 5);
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([1, 2, 3, 4, 5]);
  });

  it("list.selectionSort, case3 undefault argument, only before part", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.mergeSort(list.first(), 2);
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([1, 2, 3, 5, 4]);
  });

  it("list.mergeSort, case4 undefault argument, only after part", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    const node = list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.selectionSort(node, 3);
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([2, 1, 3, 4, 5]);
  });

  it("list.mergeSort, case5 undefault argument, all elements", () => {
    const list = new List();
    list.insertAsFirst(4);
    list.insertAsFirst(5);
    list.insertAsFirst(3);
    list.insertAsFirst(1);
    list.insertAsFirst(2);

    expect(list.size()).toBe(5);
    expect(list.first().data).toBe(2);
    expect(list.last().data).toBe(4);

    list.selectionSort(list.first(), list.size());
    const _elem = [];
    list.traverse(e => _elem.push(e));
    expect(_elem).toEqual([1, 2, 3, 4, 5]);
  });
});
