const errorResponse = {
  type: "object",
  properties: {
    errors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description:
              "unique identifier for this particular occurrence of the problem"
          },
          code: {
            type: "string",
            description: "A service-specific error code"
          },
          status: {
            type: "string",
            description: "the HTTP status code applicable to this problem"
          },
          title: {
            type: "string",
            description: "a short, human-readable summary of the problem"
          },
          detail: {
            type: "string",
            description: "a human-readable explanation"
          }
        },
        required: ["status"]
      }
    }
  },
  required: ["errors"]
};

const user = {
  type: "object",
  description: "user",
  properties: {
    username: {
      type: "string",
      description: "user id"
    },
    additionalProperties: true
  }
};

const create = {
  title: "create user",
  description: "create new user",
  body: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "unique user name"
      },
      password: {
        type: "string",
        description: "user password"
      },
      documentNumber: {
        type: "string",
        description: "dni/rut id"
      },
      profilePicture: {
        type: "string",
        description: "profile display picture"
      }
    },
    required: ["username"]
  },
  response: {
    200: user,
    "4xx": errorResponse,
    "5xx": errorResponse
  }
};

module.exports = {
  create
};
