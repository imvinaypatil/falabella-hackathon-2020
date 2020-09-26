// import { BaseRepository } from "./base";
const BaseRepository = require("./base");

module.exports = class LoyaltyRepository extends BaseRepository {
  static get COLLECTION() {
    return "loyalty";
  }
};
