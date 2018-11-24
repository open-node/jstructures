const Vector = require("../vector");

describe("Vector", () => {
  it("should create empty vector", () => {
    const vector = new Vector();
    expect(vector.length).toBe(0);
    expect(vector[0]).toBe(undefined);
  });
});
