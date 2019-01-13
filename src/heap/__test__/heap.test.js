const Heap = require("../heap");

describe("Heap", () => {
  it("create instance, case1, init empty", () => {
    const instance = new Heap();
    expect(instance.size).toBe(0);

    expect(instance.getMax()).toBe(undefined);
    expect(instance.insert(5)).toBe(undefined);
    expect(instance.insert(10)).toBe(undefined);
    expect(instance.insert(3)).toBe(undefined);
    expect(instance.getMax()).toBe(10);
    expect(instance.delMax()).toBe(10);
    expect(instance.getMax()).toBe(5);
    expect(instance.delMax()).toBe(5);
    expect(instance.getMax()).toBe(3);
    expect(instance.delMax()).toBe(3);
    expect(instance.getMax()).toBe(undefined);
    expect(instance.getMax()).toBe(undefined);

    expect(instance.insert(10)).toBe(undefined);
    expect(instance.insert(3)).toBe(undefined);
    expect(instance.insert(5)).toBe(undefined);
    expect(instance.getMax()).toBe(10);
    expect(instance.delMax()).toBe(10);
    expect(instance.getMax()).toBe(5);
    expect(instance.delMax()).toBe(5);
    expect(instance.getMax()).toBe(3);
    expect(instance.delMax()).toBe(3);
    expect(instance.getMax()).toBe(undefined);
    expect(instance.getMax()).toBe(undefined);
  });

  it("create instance, case2, init non-empty", () => {
    const instance = new Heap([5, 10, 3], 3);
    expect(instance.size).toBe(3);

    expect(instance.getMax()).toBe(10);
    expect(instance.delMax()).toBe(10);
    expect(instance.getMax()).toBe(5);
    expect(instance.delMax()).toBe(5);
    expect(instance.getMax()).toBe(3);
    expect(instance.delMax()).toBe(3);
    expect(instance.getMax()).toBe(undefined);
    expect(instance.getMax()).toBe(undefined);
    expect(instance.size).toBe(0);

    expect(instance.insert(10)).toBe(undefined);
    expect(instance.insert(3)).toBe(undefined);
    expect(instance.insert(5)).toBe(undefined);
    expect(instance.size).toBe(3);
    expect(instance.getMax()).toBe(10);
    expect(instance.delMax()).toBe(10);
    expect(instance.getMax()).toBe(5);
    expect(instance.delMax()).toBe(5);
    expect(instance.getMax()).toBe(3);
    expect(instance.delMax()).toBe(3);
    expect(instance.getMax()).toBe(undefined);
    expect(instance.getMax()).toBe(undefined);
    expect(instance.size).toBe(0);
  });

  it("create instance, case3, increment test coverage rate", () => {
    const instance = new Heap([5, 10, 3, 20, 17, -3, 8, 15, 1], 9);
    expect(instance.size).toBe(9);

    expect(instance.delMax()).toBe(20);
    expect(instance.delMax()).toBe(17);
    expect(instance.delMax()).toBe(15);
    expect(instance.delMax()).toBe(10);
    expect(instance.delMax()).toBe(8);
    expect(instance.delMax()).toBe(5);
    expect(instance.delMax()).toBe(3);
    expect(instance.delMax()).toBe(1);
    expect(instance.delMax()).toBe(-3);
    expect(instance.size).toBe(0);
  });
});
