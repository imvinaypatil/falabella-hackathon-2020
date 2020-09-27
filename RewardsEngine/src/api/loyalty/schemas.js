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

const rewardsEarned = {
  type: "object",
  properties: {
    success: {
      type: "boolean"
    },
    rewardsEarned: {
      type: "number"
    }
  },
  additionalProperties: true,
  required: []
};

const getPoints = {
  title: "Get Loyalty points",
  description: "get loyalty/reward points",
  params: {
    type: "object",
    properties: {
      username: {
        type: "string"
      }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        loyaltyPoints: {
          type: "number",
          description: "loyaltyPoints",
          default: 0
        },
        rewardPoints: {
          type: "number",
          description: "Reward points",
          default: 0
        },
        cmrPoints: {
          type: "number",
          description: "cmr points",
          default: 0
        },
        level: {
          type: "enum",
          items: ["beginner", "fan", "lover", "premium", "elite"]
        },
        nextLevel: {
          type: "string"
        },
        meta: {
          type: "objects",
          properties: {
            levels: {
              type: "object",
              properties: {
                beginner: {
                  type: "number",
                  default: 0
                },
                fan: {
                  type: "number",
                  default: 50
                },
                lover: {
                  type: "number",
                  default: 5000
                },
                premium: {
                  type: "number",
                  default: 15000
                },
                elite: {
                  type: "number",
                  default: 9999999
                }
              }
            }
          }
        }
      },
      additionalProperties: true,
      required: []
    },
    "4xx": errorResponse,
    "5xx": errorResponse
  }
};

const shotsShare = {
  title: "Get Loyalty points on sharing",
  description: "Reward user on unique shares based on combination of feed/user",
  params: {
    type: "object",
    properties: {
      username: {
        type: "string"
      }
    }
  },
  query: {
    type: "object",
    properties: {
      feed_id: {
        type: "string"
      },
      creator: {
        type: "string",
        description: "creator username"
      }
    }
  },
  body: {
    type: "object",
    properties: {
      shareLink: {
        type: "string"
      }
    },
    required: ["shareLink"]
  },
  response: {
    200: rewardsEarned,
    "4xx": errorResponse,
    "5xx": errorResponse
  }
};

const quiz = {
  title: "Reward on quiz answers",
  description: "Reward user on unique quiz answer",
  params: {
    type: "object",
    properties: {
      username: {
        type: "string"
      }
    }
  },
  query: {
    type: "object",
    properties: {
      feed_id: {
        type: "string"
      }
    }
  },
  body: {
    type: "object",
    properties: {
      answer: {
        type: "string",
        description: "answer for the quiz"
      }
    }
  },
  response: {
    200: rewardsEarned,
    "4xx": errorResponse,
    "5xx": errorResponse
  }
};

const subscribeToCmr = {
  title: "Reward on cmr",
  description: "Reward user on subscribing to cmr",
  params: {
    type: "object",
    properties: {
      username: {
        type: "string"
      }
    }
  },
  response: {
    200: rewardsEarned,
    "4xx": errorResponse,
    "5xx": errorResponse
  }
};

module.exports = {
  getPoints,
  shotsShare,
  quiz,
  subscribeToCmr
};
