const loyalty = require("./loyalty");
const users = require("./users");

module.exports = async fastify => {
  fastify.register(loyalty, { prefix: "/loyalty" });
  fastify.register(users, { prefix: "/users" });
};
