/* eslint-disable no-console */
const Service = require("./service");
const {
  getSharePoints,
  getQuizPoints,
  getCmrPoints
} = require("../../lib/rewards-engine");

const { ApiError } = require("../errors");

module.exports = fastify => {
  const service = Service(fastify);

  const getPoints = async (request, reply) => {
    const { username } = request.params;

    const rewards = await service.getPoints(username);

    reply.send(rewards);
  };

  const shotsShare = async (request, reply) => {
    const { username } = request.params;
    const { feed_id, creator } = request.query;
    const { shareLink } = request.body;

    if (!(feed_id || shareLink))
      throw new ApiError({
        status: 400,
        title: "feed_id or shareLink is required"
      });

    const count = await service.getShotShareCount({
      username,
      feed_id,
      creator,
      shareLink
    });

    if (count >= 1)
      throw new ApiError({
        status: 400,
        title: "Invalid Request",
        detail: "User has already earned rewards for this task"
      });

    const totalShares = await service.getShotShareCount({ username });
    const rewardPoints = await getSharePoints(totalShares);

    await Promise.all([
      await service.applyRewardPoints(username, {
        loyaltyPoints: rewardPoints
      }), // apply points on user/customers
      await service.insertShotShare({
        username,
        feed_id,
        creator,
        shareLink
      }) //add shotShare into repo
    ]);

    // apply points on creator
    try {
      await service.applyRewardPoints(username, {
        loyaltyPoints: rewardPoints
      });
    } catch (e) {
      fastify.error("Couldn't apply rewards to creator", e);
    }

    reply.send({
      success: true,
      rewardsEarned: rewardPoints
    });
  };

  const quiz = async (request, reply) => {
    const { username } = request.params;
    const { feed_id } = request.query;
    const { answer } = request.body;

    //validate answer

    // const totalShares = await service.getShotShareCount({ username });
    const rewardPoints = await getQuizPoints();

    // apply points on user/customers
    await service.applyRewardPoints(username, {
      rewardPoints
    });

    reply.send({
      success: true,
      rewardsEarned: rewardPoints
    });
  };

  const subscribeToCmr = async (request, reply) => {
    const { username } = request.params;

    const rewardPoints = await getCmrPoints();

    await service.applyRewardPoints(username, { cmrPoints: rewardPoints });

    reply.send({
      success: true,
      rewardsEarned: rewardPoints
    });
  };

  return {
    getPoints,
    shotsShare,
    quiz,
    subscribeToCmr
  };
};
