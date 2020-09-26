const envSchema = require("env-schema");
const errorHandler = require("./plugins/error-handler");
const errors = require("../api/errors");
const config = require("./plugins/config");
const mongodb = require("./plugins/mongodb");
const _ = require("lodash");

function createServer(options = {}) {
  let reqId = 0;
  const fastify = require("fastify")({
    logger: {
      level: "info",
      messageKey: "message",
      levelKey: "severity",
      useLevelLabels: true,
      ...options.logger
    },
    // use the x-request-id header as id for logging purposes, fall back to fastify standard incrementing id otherwise
    genReqId: req => req.headers["x-request-id"] || reqId++,
    ...options.fastify
  });

  //this is only set to true after listening on port, see start fn
  fastify.decorate("serviceAvailable", false);

  fastify.decorate("coreErrors", errors);

  fastify.register(errorHandler(options.errors));

  fastify.register(config);

  fastify.register(mongodb);

  return fastify;
}

function addSignalListeners(fastify) {
  async function close(fastify) {
    try {
      await stop(fastify);
    } catch (err) {
      fastify.log.error(`Error stopping server: ${err}`);
      process.exit(1);
    }
  }

  const closeOnce = _.once(close);

  const signals = ["SIGTERM", "SIGINT"];
  signals.forEach(signal => {
    process.on(signal, async () => {
      fastify.log.info(`Received ${signal}`);
      await closeOnce(fastify);
    });
  });
}

const stop = async fastify => {
  fastify.log.info("Terminating service...");
  fastify.serviceAvailable = false;
  await fastify.close();
  fastify.log.info("Done.");
};

const start = async (fastify, options = {}) => {
  const schema = {
    type: "object",
    properties: {
      HOST: {
        type: "string",
        default: "127.0.0.1"
      },
      PORT: {
        type: "integer",
        default: 4444
      }
    }
  };
  const config = envSchema({ schema, dotenv: true });

  try {
    await fastify.listen(
      options.port || config.PORT,
      options.host || config.HOST
    );
    fastify.serviceAvailable = true;

    addSignalListeners(fastify);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

module.exports = {
  createServer,
  start,
  stop
};
