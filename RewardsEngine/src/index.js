"use strict";

require("dotenv").config();
require("make-promises-safe");
const Fastify = require("./server");
const routes = require("./api");

function create() {
  //creates the Fastify fastify server instance with defaults
  const fastify = Fastify.createServer();
  //custom routes set up
  fastify.register(routes);

  return fastify;
}

async function start() {
  const fastify = create();
  Fastify.start(fastify);
}

const options = {
  start
};

try {
  // if not in test run either the command or start() if no command specified
  if (process.env.NODE_ENV !== "test") {
    process.argv[2] ? options[process.argv[2]]() : start();
  }
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(
    err,
    `Invalid arg '${process.argv[2]}'. Please supply: 'start' OR 'docs'`
  );
}

module.exports = {
  create,
  start
};
