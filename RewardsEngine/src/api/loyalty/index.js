const schemas = require("./schemas");

module.exports = async fastify => {
  const controller = require("./controller")(fastify);

  fastify.get("/:username/points", schemas.getPoints, controller.getPoints);

  fastify.post(
    "/:username/shots/share",
    schemas.shotsShare,
    controller.shotsShare
  );

  // fastify.get("/:username/shots/like", schemas., controller.);

  fastify.post("/:username/quiz/answer", schemas.quiz, controller.quiz);

  fastify.get(
    "/:username/cmr/subscribe",
    schemas.subscribeToCmr,
    controller.subscribeToCmr
  );
};
