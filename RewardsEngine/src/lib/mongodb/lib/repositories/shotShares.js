// import { BaseRepository } from "./base";
const BaseRepository = require("./base");

module.exports = class ShotShares extends BaseRepository {
  static get COLLECTION() {
    return "shot_shares";
  }
};
