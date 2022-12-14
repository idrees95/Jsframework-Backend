const mongo = require("mongodb").MongoClient;
const config = require("./config.json");
const collectionName = "document";

require('dotenv').config()

async function getDb() {

  let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.mo0rsfu.mongodb.net/${config.database}?retryWrites=true&w=majority`;
  
  if (process.env.NODE_ENV === "test") {
    dsn = "mongodb://localhost:27017/editor";
  }
  const client = await mongo.connect(dsn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db();
  const collection = await db.collection(collectionName);
  return {
    collection: collection,
    client: client,
  };
}

module.exports = {
  getDb: getDb,
};
