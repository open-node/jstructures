const Queue = require("../queue");

describe("Queue", () => {
  it("new Queue, size should be empty", () => {
    const queue = new Queue();
    expect(queue.size).toBe(0);
    expect(queue.empty).toBe(true);
    expect(queue.front).toBe(undefined);
  });

  it("enqueue 1 items", () => {
    const queue = new Queue();
    expect(queue.size).toBe(0);
    expect(queue.empty).toBe(true);
    expect(queue.front).toBe(undefined);

    expect(queue.enqueue(1)).toBe(undefined);
    expect(queue.size).toBe(1);
    expect(queue.empty).toBe(false);
    expect(queue.front).toBe(1);
    expect(queue.dequeue()).toBe(1);
    expect(queue.front).toBe(undefined);
  });

  it("enqueue 1 more items", () => {
    const queue = new Queue();
    expect(queue.size).toBe(0);
    expect(queue.empty).toBe(true);
    expect(queue.front).toBe(undefined);

    expect(queue.enqueue(1)).toBe(undefined);
    expect(queue.enqueue(2)).toBe(undefined);
    expect(queue.enqueue(3)).toBe(undefined);
    expect(queue.enqueue(4)).toBe(undefined);
    expect(queue.enqueue(5)).toBe(undefined);
    expect(queue.size).toBe(5);
    expect(queue.empty).toBe(false);
    expect(queue.front).toBe(1);

    expect(queue.dequeue()).toBe(1);
    expect(queue.front).toBe(2);
    expect(queue.size).toBe(4);
    expect(queue.empty).toBe(false);

    expect(queue.dequeue()).toBe(2);
    expect(queue.front).toBe(3);
    expect(queue.size).toBe(3);
    expect(queue.empty).toBe(false);

    expect(queue.dequeue()).toBe(3);
    expect(queue.front).toBe(4);
    expect(queue.size).toBe(2);
    expect(queue.empty).toBe(false);

    expect(queue.dequeue()).toBe(4);
    expect(queue.front).toBe(5);
    expect(queue.size).toBe(1);
    expect(queue.empty).toBe(false);

    expect(queue.dequeue()).toBe(5);
    expect(queue.front).toBe(undefined);
    expect(queue.size).toBe(0);
    expect(queue.empty).toBe(true);

    expect(queue.dequeue()).toBe(undefined);
    expect(queue.front).toBe(undefined);
    expect(queue.size).toBe(0);
    expect(queue.empty).toBe(true);
  });
});
