const ProductRepository = require("./lib/repositories/product");
const UserRepository = require("./lib/repositories/user");
const LoyaltyRepository = require("./lib/repositories/loyalty");
const ShotSharesRepository = require("./lib/repositories/shotShares");

module.exports = connection => ({
  ProductRepository: new ProductRepository(connection),
  UserRepository: new UserRepository(connection),
  LoyaltyRepository: new LoyaltyRepository(connection),
  ShotSharesRepository: new ShotSharesRepository(connection)
});
