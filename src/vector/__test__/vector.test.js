const Vector = require("../vector");

describe("Vector", () => {
  it("should create empty vector", () => {
    const vector = new Vector();
    expect(vector.length).toBe(0);
    expect(vector.size()).toBe(0);
    expect(vector[0]).toBe(undefined);
  });

  it("vector default elem", () => {
    const vector = new Vector([0, 1, 2]);
    expect(vector[0]).toBe(0);
    expect(vector[1]).toBe(1);
    expect(vector[2]).toBe(2);
    expect(vector.size()).toBe(3);
  });

  it("vector insert", () => {
    const vector = new Vector();
    vector.insert(0, 0);
    vector.insert(0, 1);
    vector.insert(0, 2);
    expect(vector[0]).toBe(2);
    expect(vector[1]).toBe(1);
    expect(vector[2]).toBe(0);

    vector.insert(1, 4);
    expect(vector[3]).toBe(0);
    expect(vector[1]).toBe(4);

    vector.insert(4, 6);
    expect(vector[4]).toBe(6);
    expect(vector.length).toBe(5);
    expect(vector.size()).toBe(5);
  });

  it("vector remove", () => {
    const vector = new Vector([1, 3, 5, 7, 8, 10, 12]);
    expect(vector.size()).toBe(7);
    expect(vector.remove(0)).toBe(1);
    expect(vector.size()).toBe(6);

    expect(vector.remove(5)).toBe(12);
    expect(vector.size()).toBe(5);
  });

  it("vector removeRange", () => {
    const vector = new Vector([1, 3, 5, 7, 8, 10, 12]);
    expect(vector.size()).toBe(7);
    expect(vector.removeRange(0, 3)).toBe(3);
    expect(vector.size()).toBe(4);

    expect(vector[0]).toBe(7);
    expect(vector[3]).toBe(12);
  });

  it("vector disordered", () => {
    const vector = new Vector([2, 1, 3, 5, 4]);
    expect(vector.size()).toBe(5);
    expect(vector.disordered()).toBe(2);
  });

  it("vector findElem", () => {
    const vector = new Vector([2, 1, 3, 3, 3, 5, 4]);
    expect(vector.size()).toBe(7);
    expect(vector.findElem(3)).toBe(4);

    expect(vector.findElem(8)).toBe(-1);
  });

  it("vector search, unique case1", () => {
    const vector = new Vector([1, 2, 3, 4, 5, 6]);
    expect(vector.size()).toBe(6);
    expect(vector.search(3)).toBe(2);
    expect(vector.search(7)).toBe(5);
    expect(vector.search(0)).toBe(-1);
  });

  it("vector search, no unique case2", () => {
    const vector = new Vector([1, 2, 3, 3, 3, 4, 5, 6]);
    expect(vector.size()).toBe(8);
    expect(vector.search(3)).toBe(4);
    expect(vector.search(3)).toBe(4);
    expect(vector.search(7)).toBe(7);
    expect(vector.search(0)).toBe(-1);
  });

  it("unsorted vector deduplicate, case1", () => {
    const vector = new Vector([1, 8, 3, 0, 7, 6]);
    expect(vector.size()).toBe(6);
    expect(vector.deduplicate()).toBe(0);
    expect(vector.size()).toBe(6);
  });

  it("unsorted vector deduplicate, case2", () => {
    const vector = new Vector([0, 2, 3, 9, 3, 4, 3, 6]);
    expect(vector.size()).toBe(8);
    expect(vector.deduplicate()).toBe(2);
    expect(vector.size()).toBe(6);
  });

  it("sorted vector uniquify, case1", () => {
    const vector = new Vector([1, 2, 3, 4, 5, 6]);
    expect(vector.size()).toBe(6);
    expect(vector.uniquify()).toBe(0);
    expect(vector.size()).toBe(6);
  });

  it("sorted vector uniquify, case2", () => {
    const vector = new Vector([1, 2, 3, 3, 3, 4, 5, 6]);
    expect(vector.size()).toBe(8);
    expect(vector.uniquify()).toBe(2);
    expect(vector.size()).toBe(6);
  });

  it("vector traverse", () => {
    const vector = new Vector([1, 2, 3, 3, 3, 4, 5, 6]);
    expect(vector.size()).toBe(8);
    const list = [];
    vector.traverse(e => list.push(e));
    expect(list).toEqual([1, 2, 3, 3, 3, 4, 5, 6]);
  });

  it("vector sort, bubbleSort", () => {
    const vector = new Vector([1, 2, 3, 8, 3, 7, 5, 0]);
    expect(vector.size()).toBe(8);
    let list = [];
    vector.traverse(e => list.push(e));
    expect(list).toEqual([1, 2, 3, 8, 3, 7, 5, 0]);

    Vector.bubbleSort(vector);
    expect(vector.size()).toBe(8);
    list = [];
    vector.traverse(e => list.push(e));
    expect(list).toEqual([0, 1, 2, 3, 3, 5, 7, 8]);
  });

  it("vector merge case1", () => {
    const nums = [1, 2, 3, 0, 4, 5];
    Vector.merge(nums, 0, 3, 6);
    expect(nums).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("vector merge case2", () => {
    const nums = [1, 8, 9, 0, 2, 3, 4];
    Vector.merge(nums, 0, 3, 7);
    expect(nums).toEqual([0, 1, 2, 3, 4, 8, 9]);
  });

  it("vector merge case3", () => {
    const nums = [1, 8, 9, 0, 2, 3, 4];
    Vector.merge(nums, 0, 3, 7);
    Vector.merge(nums, 0, 3, 7);
    expect(nums).toEqual([0, 1, 2, 3, 4, 8, 9]);
  });

  it("vector merge case3", () => {
    const nums = [1, 1, 2, 0, 2, 3, 4];
    Vector.merge(nums, 0, 3, 7);
    expect(nums).toEqual([0, 1, 1, 2, 2, 3, 4]);
  });

  it("vector sort, mergeSort", () => {
    const vector = new Vector([1, 2, 3, 8, 3, 7, 5, 0]);
    expect(vector.size()).toBe(8);
    let list = [];
    vector.traverse(e => list.push(e));
    expect(list).toEqual([1, 2, 3, 8, 3, 7, 5, 0]);

    Vector.mergeSort(vector);
    expect(vector.size()).toBe(8);
    list = [];
    vector.traverse(e => list.push(e));
    expect(list).toEqual([0, 1, 2, 3, 3, 5, 7, 8]);
  });

  it("vector sort, mergeSort case2", () => {
    const vector = new Vector([2, 1, 4, 3, 9, 8, 7, 0, 10]);
    expect(vector.size()).toBe(9);
    let list = [];
    vector.traverse(e => list.push(e));
    expect(list).toEqual([2, 1, 4, 3, 9, 8, 7, 0, 10]);

    Vector.mergeSort(vector);
    expect(vector.size()).toBe(9);
    list = [];
    vector.traverse(e => list.push(e));
    expect(list).toEqual([0, 1, 2, 3, 4, 7, 8, 9, 10]);
  });
});
