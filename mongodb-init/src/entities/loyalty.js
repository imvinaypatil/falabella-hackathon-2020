const createdAt = require("../baseTypes/createdAt");
const lastModified = require("../baseTypes/lastModified");

module.exports = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username"],
      additionalProperties: false,
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Mongo generated uuid"
        },
        username: {
          bsonType: "string"
        },
        loyaltyPoints: {
          bsonType: "number"
        },
        rewardPoints: {
          bsonType: "number"
        },
        cmrPoints: {
          bsonType: "number"
        },
        level: {
          bsonType: "string"
        },
        createdAt: createdAt,
        lastModified: lastModified
      }
    }
  }
};
