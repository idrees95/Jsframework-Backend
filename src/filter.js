const db = require("./db");

let mongoDB;

(async function () {
  mongoDB = await db.getDb();

  process.on("exit", () => {
    mongoDB.end();
  });
})();

async function getDocs() {
  const res = await mongoDB.collection.find().toArray();
  return res;
}

async function getDocsbyId(item) {
  const result = await mongoDB.collection.findOne(item);
  return result;
}

async function addDoc(newObj) {
  const result = await mongoDB.collection.insertOne(newObj);
  return result;
}

async function upateDoc(item, newObj) {
  const result = await mongoDB.collection.replaceOne(item, newObj);
  return result;
}


async function deleteItem(item) {
  const result = await db.collection.deleteOne(item);
  return result;
}



module.exports = {
  getDocs: getDocs,
  getDocsbyId: getDocsbyId,
  addDoc: addDoc,
  upateDoc: upateDoc,
};
