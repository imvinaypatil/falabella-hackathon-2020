/* eslint-disable no-console */
const { ApiError } = require("../errors");
const { getCmrPoints } = require("../../lib/rewards-engine");

const levels = {
  beginner: 0,
  fan: 50,
  lover: 5000,
  premium: 15000,
  elite: 9999999
};

const levelIdx = ["beginner", "fan", "lover", "premium", "elite"];

module.exports = fastify => {
  const {
    LoyaltyRepository,
    ShotSharesRepository
  } = fastify.mongo.repositories;

  const service = {};

  service.getPoints = async username => {
    let result = await LoyaltyRepository.findOne({
      username
    });

    if (!result) {
      result = {
        loyaltyPoints: 0,
        rewardPoints: 0,
        cmrPoints: 0,
        level: "beginner"
      };
    }

    const idx = levelIdx.findIndex(lvl => lvl === result.level) + 1;

    const nextLevel = idx !== -1 && levelIdx[Math.min(idx, levelIdx.length-1)]  || "beginner"

    return {
      ...result,
      nextLevel
    };
  };

  service.updateLoyaltyPoints = async loyalty => {
    const result = await LoyaltyRepository.findOneAndReplace(
      {
        username: loyalty.username
      },
      loyalty,
      {
        upsert: true,
        returnOriginal: false,
        returnNewDocument: true
      }
    );

    return result.value ? result.value : {};
  };

  service.getShotShareCount = async ({
    username,
    creator,
    shareLink,
    feed_id
  }) => {
    return (
      await ShotSharesRepository.find({
        username,
        ...(creator && { creator }),
        ...(shareLink && { shareLink }),
        ...(feed_id && { feed_id })
      })
    ).count();
  };

  service.applyRewardPoints = async (username, reward = {}) => {
    let loyaltyRewards = await service.getPoints(username);

    const {
      loyaltyPoints = 0,
      rewardPoints = 0,
      cmrPoints = 0
    } = loyaltyRewards;

    loyaltyRewards = {
      ...loyaltyRewards,
      username,
      loyaltyPoints: loyaltyPoints + (reward.loyaltyPoints || 0),
      rewardPoints: rewardPoints + (reward.rewardPoints || 0),
      cmrPoints: Math.min(cmrPoints + (reward.cmrPoints || 0), getCmrPoints())
    };

    const totalPoints =
      loyaltyRewards.loyaltyPoints +
      loyaltyRewards.rewardPoints +
      loyaltyRewards.cmrPoints;

    loyaltyRewards.level =
      totalPoints >= levels.elite
        ? "elite"
        : totalPoints >= levels.premium
        ? "premium"
        : totalPoints >= levels.lover
        ? "lover"
        : totalPoints >= levels.fan
        ? "fan"
        : "beginner";

    return service.updateLoyaltyPoints(loyaltyRewards);
  };

  service.insertShotShare = async shotShare => {
    return ShotSharesRepository.insertOne(shotShare);
  };

  return service;
};
