const { MongoClient } = require("mongodb");

module.exports = class Connection {
  constructor(uri, dbName, options = {}) {
    this.uri = uri;
    this.dbName = dbName;
    this.options = { useNewUrlParser: true, ...options };
  }

  async connect() {
    this.client = await MongoClient.connect(this.uri, this.options);
    return this.client;
  }

  async disconnect(force) {
    return await this.client.close(force);
  }

  get db() {
    return this.client.db(this.dbName);
  }
};
