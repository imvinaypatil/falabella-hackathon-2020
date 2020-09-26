// import { BaseRepository } from "./base";
const BaseRepository = require("./base");

module.exports = class ProductRepository extends BaseRepository {
  static get COLLECTION() {
    return "products";
  }
};
