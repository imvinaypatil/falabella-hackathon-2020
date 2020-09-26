"use strict";

const fp = require("fastify-plugin");
const statusCodes = require("http").STATUS_CODES;

const VALIDATION_ERROR = "001";

module.exports = function create(options = {}) {
  return fp((fastify, opts, next) => {
    fastify.setNotFoundHandler(async (request, reply) => {
      reply.code(404).send({
        errors: [
          {
            status: "404",
            title: options.notFound || "Not Found"
          }
        ]
      });
    });

    fastify.setErrorHandler(async (error, request, reply) => {
      const statusCode =
        Array.isArray(error) && error.length
          ? error[0].status
          : error.status ||
            error.statusCode ||
            reply.statusCode ||
            reply.res.statusCode ||
            "500";

      request.log.error({ error, req: request }, `Error ${statusCode}`);

      if (error.validation) {
        reply.code(400).send({
          errors: [
            {
              code: VALIDATION_ERROR,
              title: options.validationError || "Validation error",
              detail: error,
              status: "400"
            }
          ]
        });
      }

      let errors;

      if (Array.isArray(error)) {
        errors = error.map(err => ({
          id: err.id,
          code: err.code || statusCodes[statusCode + ""],
          status: err.status,
          title: err.title,
          detail: err.detail,
          meta: err.meta
        }));
      } else {
        errors = [
          {
            id: error.id,
            code: error.code || statusCodes[statusCode + ""],
            status: statusCode,
            title: error.title,
            detail: error.detail,
            meta: error.meta
          }
        ];
      }
      reply.code(statusCode).send({ errors });
    });
    next();
  });
};
