const fp = require("fastify-plugin");
const fastifyEnv = require("fastify-env");
const fastifyMongo = require("../../../lib/mongodb");

module.exports = fp((fastify, opts, next) => {
  fastify.register(fastifyEnv, {
    schema: {
      type: "object",
      properties: {
        MONGODB_CONNECTION: {
          type: "string",
          default: "mongodb://localhost:27017/"
        },
        MONGODB_DATABASE: {
          type: "string",
          default: "test"
        }
      }
    },
    confKey: "mongoconfig",
    data: opts
  });

  fastify.register(
    fp((fastify, opts, done) => {
      const {
        MONGODB_CONNECTION: uri,
        MONGODB_DATABASE: dbName
      } = fastify.mongoconfig;
      const config = {
        mongo: {
          mongodb: {
            uri,
            dbName
          }
        }
      };

      if (process.env.MONGODB_NOCONNECT !== "true") {
        fastify.register(fastifyMongo, config);
      } else {
        fastify.decorate("mongo", {
          repositories: {}
        });
      }

      done();
    })
  );

  next();
});
