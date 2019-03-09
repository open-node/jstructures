const Trie = require("../trie");

describe("Trie", () => {
  it("new Trie, size should be empty", () => {
    const trie = new Trie();
    expect(trie.size).toBe(0);
    expect(trie.find("hello")).toBe(false);
  });

  it("insert, find", () => {
    const trie = new Trie();
    expect(trie.size).toBe(0);
    expect(trie.find("hello")).toBe(false);

    trie.insert("hello");
    expect(trie.find("hello")).toBe(true);
    expect(trie.size).toBe(1);
    trie.insert("hello");
    trie.insert("hello");
    expect(trie.size).toBe(1);
    expect(trie.find("hello")).toBe(true);
    expect(trie.find("world")).toBe(false);
    trie.insert("world");
    trie.insert("world");
    expect(trie.find("world")).toBe(true);
    expect(trie.size).toBe(2);
  });
});
