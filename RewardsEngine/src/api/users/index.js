const schemas = require("./schemas");

module.exports = async fastify => {
  const controller = require("./controller")(fastify);

  fastify.post("/", schemas.create, controller.create);
};
