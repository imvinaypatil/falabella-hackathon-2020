module.exports = class MockedCursor {
  constructor(data) {
    this.data = data;
  }

  async toArray() {
    return this.data;
  }
};
