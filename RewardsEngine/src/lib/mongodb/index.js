const fp = require("fastify-plugin");
const Mongo = require("./Mongo");

/**
 * @callback next
 */

/**
 * Fastify Logistic Window System - MongoDB plugin
 * @conscturctor
 * @param {Object} fastify - fastify server instance
 * @param {Object} opts - options object
 * @param {Object} opts.mongo - Mongo options object
 * @param {Object} opts.mongo.mongodb - mongodb options object
 * @param {Object} opts.mongo.mongodb.uri - mongodb db address
 * @param {Object} opts.mongo.mongodb.dbName - mongodb db name
 * @param {Object} opts.mongo.mongodb.options - {@link http://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html#.connect|MongoClientOptions}
 * @param {next} next - The callback next funcion
 */
function plugin(fastify, opts, next) {
  if (!opts.mongo) {
    return next(new Error("Missing mongodb key in options"));
  }
  const { mongodb } = opts.mongo;
  if (!mongodb) {
    return next(new Error("Missing Mongo.mongodb key in options"));
  }
  let { uri, dbName, options } = mongodb;
  if (!dbName) {
    return next(new Error("Missing Mongo.mongodb.name"));
  }
  Mongo(
    fastify,
    {
      dbName,
      uri: uri || "mongodb://localhost:27017",
      options
    },
    next
  );
}

module.exports = fp(plugin, {
  name: "fastify-mongodb"
});
