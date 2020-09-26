const Connection = require("../connection");
const { MongoClient } = require("mongodb");

jest.mock("mongodb", () => {
  const close = jest.fn(async () => true);
  const db = jest.fn(async () => ({
    collection: {}
  }));
  const connect = jest.fn(async () => ({ close, db }));
  const ObjectId = require("bson").ObjectId;

  return {
    // ObjectID,
    ObjectId,
    MongoClient: {
      connect
    }
  };
});

describe("DbConnection", () => {
  const uri = "mongodb://localhost:27001";
  const dbName = "test";

  afterAll(() => {
    jest.clearAllMocks();
  });
  describe("constructor", () => {
    it(`Should set property uri as ${uri}`, async () => {
      const connection = new Connection(uri, dbName);
      expect(connection.uri).toBe(uri);
    });
    it(`Should set property dbName as ${dbName}`, async () => {
      const connection = new Connection(uri, dbName);
      expect(connection.dbName).toBe(dbName);
    });
    it("Should set value for client", async () => {
      const connection = new Connection(uri, dbName);
      await connection.connect();
      expect(connection.client).toBeDefined();
    });
  });
  describe("connect", () => {
    it(`Should call MongoClient.connect with ${uri} and { useNewUrlParser: true }`, async () => {
      const connection = new Connection(uri, dbName);
      connection.connect();
      expect(MongoClient.connect).toHaveBeenCalledWith(uri, {
        useNewUrlParser: true
      });
    });
    it("Should set value for client", async () => {
      const connection = new Connection(uri, dbName);
      connection.client = undefined;
      await connection.connect();
      expect(connection.client).toBeDefined();
    });
  });
  describe("disconnect", () => {
    it("Should call connection.client.close", async () => {
      const connection = new Connection(uri, dbName);
      const client = await connection.connect();
      await connection.disconnect();
      expect(client.close).toHaveBeenCalled();
    });
  });
  describe("db", () => {
    it(`this.client.db with ${dbName}`, async () => {
      const connection = new Connection(uri, dbName);
      await connection.connect();
      connection.db;
      expect(connection.client.db).toHaveBeenCalled();
    });
  });
});
