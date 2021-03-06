/* eslint-disable no-console */
const Service = require("./service");

// const buildError = require("./helpers/error-builder");

const { ApiError } = require("../errors");

module.exports = fastify => {
  const service = Service(fastify);

  const create = async (request, reply) => {
    const {
      username,
      password = "",
      documentNumber = "",
      profilePicture = "",
      email="",
      name=""
    } = request.body;

    const user = await service.create({
      username,
      password,
      documentNumber,
      profilePicture,
      email,
      name
    });

    reply.send(user);
  };

  return {
    create
  };
};
