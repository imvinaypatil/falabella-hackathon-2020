const MockedMongoClient = require("./mongoclient");

module.exports = class Connection {
  constructor(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = this.connect();
  }

  async connect() {
    this.client = await MockedMongoClient.connect(this.url, {
      useNewUrlParser: true
    });
    return this.client;
  }

  async disconnect() {
    return await this.client.close();
  }

  get db() {
    return this.client.db(this.dbName);
  }
};
