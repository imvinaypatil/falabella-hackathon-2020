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
        password: {
          bsonType: "string"
        },
        documentNumber: {
          bsonType: "string"
        },
        profilePicture: {
          bsonType: "string"
        },
        createdAt: createdAt,
        lastModified: lastModified
      }
    }
  }
};
