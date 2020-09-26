const MockedDb = require("./db");

module.exports = class MockedMongoClient {
  static async connect(uri, options = {}) {
    return new MockedMongoClient(uri, options);
  }

  constructor(uri, options) {
    this.uri = uri;
    this.options = options;
    this.databases = {};
  }

  async connect() {
    return this;
  }

  async close() {
    return;
  }

  db(dbName) {
    if (this.databases[dbName]) {
      return this.databases[dbName];
    }
    const db = new MockedDb(dbName);
    this.databases[dbName] = db;
    return db;
  }
};
