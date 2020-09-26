const loyalty = require("./src/entities/loyalty");
const shot_shares = require("./src/entities/shot_shares");
const users = require("./src/entities/users");

const { MongoClient } = require("mongodb");

const run = async (mongo_url, mongo_database) => {
  const connection = await MongoClient.connect(mongo_url, {
    useNewUrlParser: true
  });

  const db = connection.db(mongo_database);

  console.log("START create collections");

  // Create collections
  await db.createCollection("loyalty", loyalty);
  await db.createCollection("shot_shares", shot_shares);
  await db.createCollection("users", users);
  await db.createIndex(
    "loyalty",
    { username: 1 }
  );
  await db.createIndex("shot_shares", { username: 1, creator: 1 });
  await db.createIndex(
    "users",
    { username: 1 }
  );

  console.log("END create collections");
};

run(process.env.MONGO_URL, process.env.DATABASE);