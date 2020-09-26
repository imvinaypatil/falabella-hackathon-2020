const fastifyPlugin = require("fastify-plugin");
const fastifyEnv = require("fastify-env");

module.exports = fastifyPlugin((fastify, opts, next) => {
  const configSchema = {
    type: "object",
    properties: {
      NODE_ENV: {
        type: "string",
        default: "development"
      },
      HOST: {
        type: "string",
        default: "127.0.0.1"
      },
      PORT: {
        type: "integer",
        default: 4444
      },
      SERVICE_ROLE: {
        type: "string",
        default: "service"
      },
      SERVICE_USER: {
        type: "string",
        default: "user"
      },
      SERVICE_PASSWORD: {
        type: "string",
        default: "password"
      },
      JWK_SERVICE_URL: {
        type: "string",
        default: "https://www.googleapis.com/service_accounts/v1/jwk"
      },
      JWT_ISSUER: {
        type: "string",
        default: "google"
      }
    }
  };

  fastify.register(fastifyEnv, { schema: configSchema, data: opts });

  next();
});
