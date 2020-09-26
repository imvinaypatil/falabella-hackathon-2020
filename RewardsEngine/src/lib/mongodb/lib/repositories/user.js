// import { BaseRepository } from "./base";
const BaseRepository = require("./base");

module.exports = class UserRepository extends BaseRepository {
  static get COLLECTION() {
    return "users";
  }
};
