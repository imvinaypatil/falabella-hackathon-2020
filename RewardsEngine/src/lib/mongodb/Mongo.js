const Connection = require("./lib/mongodb/connection");
const Repositories = require("./repositories");
const { ObjectId } = require("mongodb");

module.exports = async function(fastify, opts, next) {
  const { uri, dbName, options } = opts;

  const connection = new Connection(uri, dbName, options);
  const repositories = Repositories(connection);
  await connection.connect();

  fastify.addHook("onClose", () => connection.disconnect(true));

  fastify.decorate("mongo", {
    ObjectId,
    client: connection.client,
    db: connection.db,
    repositories
  });

  next();
};
