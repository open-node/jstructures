const Stack = require("../stack");

describe("Stack", () => {
  it("new Stack, size should be empty", () => {
    const stack = new Stack();
    expect(stack.size).toBe(0);
    expect(stack.empty).toBe(true);
    expect(stack.top).toBe(undefined);
  });

  it("push 1 items", () => {
    const stack = new Stack();
    expect(stack.size).toBe(0);
    expect(stack.empty).toBe(true);
    expect(stack.top).toBe(undefined);

    expect(stack.push(1)).toBe(undefined);
    expect(stack.size).toBe(1);
    expect(stack.empty).toBe(false);
    expect(stack.top).toBe(1);
    expect(stack.pop()).toBe(1);
    expect(stack.top).toBe(undefined);
  });

  it("push 1 more items", () => {
    const stack = new Stack();
    expect(stack.size).toBe(0);
    expect(stack.empty).toBe(true);
    expect(stack.top).toBe(undefined);

    expect(stack.push(1)).toBe(undefined);
    expect(stack.push(2)).toBe(undefined);
    expect(stack.push(3)).toBe(undefined);
    expect(stack.push(4)).toBe(undefined);
    expect(stack.push(5)).toBe(undefined);
    expect(stack.size).toBe(5);
    expect(stack.empty).toBe(false);
    expect(stack.top).toBe(5);

    expect(stack.pop()).toBe(5);
    expect(stack.top).toBe(4);
    expect(stack.size).toBe(4);
    expect(stack.empty).toBe(false);

    expect(stack.pop()).toBe(4);
    expect(stack.top).toBe(3);
    expect(stack.size).toBe(3);
    expect(stack.empty).toBe(false);

    expect(stack.pop()).toBe(3);
    expect(stack.top).toBe(2);
    expect(stack.size).toBe(2);
    expect(stack.empty).toBe(false);

    expect(stack.pop()).toBe(2);
    expect(stack.top).toBe(1);
    expect(stack.size).toBe(1);
    expect(stack.empty).toBe(false);

    expect(stack.pop()).toBe(1);
    expect(stack.top).toBe(undefined);
    expect(stack.size).toBe(0);
    expect(stack.empty).toBe(true);

    expect(stack.pop()).toBe(undefined);
    expect(stack.top).toBe(undefined);
    expect(stack.size).toBe(0);
    expect(stack.empty).toBe(true);
  });
});
