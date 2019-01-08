const SegmentTree = require("../segment-tree");

describe("Segment-Tree", () => {
  it("create instance, simple query sum", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const segmentTree = new SegmentTree(data, (a, b) => a + b);
    expect(segmentTree.size).toBe(10);

    expect(segmentTree.query(0, 9)).toBe(55);
    expect(segmentTree.query(8, 9)).toBe(19);
    expect(segmentTree.query(1, 9)).toBe(54);
    expect(segmentTree.query(4, 5)).toBe(11);
  });

  it("create instance, simple query max", () => {
    const data = [3, 5, 1, -4, 9, 12, 6, 2, 10, 13];
    const segmentTree = new SegmentTree(data, (a, b) => Math.max(a, b));
    expect(segmentTree.size).toBe(10);

    expect(segmentTree.query(0, 9)).toBe(13);
    expect(segmentTree.query(8, 9)).toBe(13);
    expect(segmentTree.query(1, 9)).toBe(13);
    expect(segmentTree.query(2, 4)).toBe(9);
    expect(segmentTree.query(4, 5)).toBe(12);
  });

  it("create instance, simple query sum, and update", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const segmentTree = new SegmentTree(data, (a, b) => a + b);
    expect(segmentTree.size).toBe(10);

    expect(segmentTree.query(0, 9)).toBe(55);
    expect(segmentTree.query(8, 9)).toBe(19);
    expect(segmentTree.query(1, 9)).toBe(54);
    expect(segmentTree.query(4, 5)).toBe(11);

    segmentTree.update(9, 0);
    expect(segmentTree.query(0, 9)).toBe(45);
    expect(segmentTree.query(4, 5)).toBe(11);
  });

  it("create instance, simple query max and update", () => {
    const data = [3, 5, 1, -4, 9, 12, 6, 2, 10, 13];
    const segmentTree = new SegmentTree(data, (a, b) => Math.max(a, b));
    expect(segmentTree.size).toBe(10);

    expect(segmentTree.query(0, 9)).toBe(13);
    expect(segmentTree.query(8, 9)).toBe(13);
    expect(segmentTree.query(1, 9)).toBe(13);
    expect(segmentTree.query(2, 4)).toBe(9);
    expect(segmentTree.query(4, 5)).toBe(12);

    segmentTree.update(0, 20);
    expect(segmentTree.query(0, 9)).toBe(20);

    segmentTree.update(4, 25);
    expect(segmentTree.query(0, 9)).toBe(25);
    expect(segmentTree.query(4, 5)).toBe(25);
  });
});
