/* eslint-disable no-console */
const { ApiError } = require("../errors");

module.exports = fastify => {
  const { UserRepository } = fastify.mongo.repositories;

  const service = {};

  /**
   * Just for the sake of simplicity this method either creates a new user or return existing ones'
   * caution: It doesn't incorporate proper auth mechanism or user creation flows hence using this in prod is discouraged. :P
   */
  service.create = async ({
    username,
    password,
    documentNumber,
    profilePicture,
    email,
    name
  }) => {
    const { value } = await UserRepository.findOneAndReplace(
      { username },
      {
        username,
        password,
        documentNumber,
        profilePicture,
        email,
        name
      },
      {
        upsert: true,
        returnOriginal: false,
        returnNewDocument: true
      }
    );
    return value;
  };

  return service;
};
