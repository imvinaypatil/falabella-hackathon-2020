const createdAt = require("../baseTypes/createdAt");
const lastModified = require("../baseTypes/lastModified");

module.exports = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      additionalProperties: false,
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Mongo generated uuid"
        },
        username: {
          bsonType: "string"
        },
        creator: {
          bsonType: "string"
        },
        shareLink: {
          bsonType: "string"
        },
        feed_id: {
          bsonType: "string"
        },
        createdAt: createdAt,
        lastModified: lastModified
      }
    }
  }
};
