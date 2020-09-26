const MockedCollection = require("./collection");

module.exports = class MockedDb {
  constructor(name) {
    this.name = name;
    this.collections = {};
  }

  collection(name) {
    if (this.collections[name]) {
      return this.collections[name];
    }
    const collection = new MockedCollection(name);
    this.collections[name] = collection;
    return collection;
  }
};
