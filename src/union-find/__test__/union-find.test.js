const UnionFind = require("../union-find");

describe("UnionFind", () => {
  it("create instance, case1", () => {
    const instance = new UnionFind(10);
    expect(instance.size).toBe(10);

    expect(instance.isConnected(0, 9)).toBe(false);
    expect(instance.isConnected(3, 5)).toBe(false);
    expect(instance.isConnected(3, 4)).toBe(false);
    expect(instance.isConnected(6, 6)).toBe(true);
    expect(instance.isConnected(8, 8)).toBe(true);

    instance.union(3, 5);
    expect(instance.isConnected(3, 5)).toBe(true);
    instance.union(3, 4);
    expect(instance.isConnected(3, 4)).toBe(true);
    expect(instance.isConnected(4, 5)).toBe(true);
    instance.union(6, 9);
    expect(instance.isConnected(6, 9)).toBe(true);
    instance.union(3, 9);
    expect(instance.isConnected(6, 3)).toBe(true);
    expect(instance.isConnected(6, 4)).toBe(true);
    expect(instance.isConnected(6, 5)).toBe(true);
    expect(instance.isConnected(9, 3)).toBe(true);
    expect(instance.isConnected(9, 4)).toBe(true);
    expect(instance.isConnected(9, 5)).toBe(true);

    expect(instance.isConnected(0, 3)).toBe(false);
    expect(instance.isConnected(0, 6)).toBe(false);
    instance.union(0, 0);
    expect(instance.isConnected(0, 3)).toBe(false);
    expect(instance.isConnected(0, 6)).toBe(false);
  });
});
