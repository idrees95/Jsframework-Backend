const { ObjectId } = require("bson");
var express = require("express");
var router = express.Router();
const urlencodedParser = express.urlencoded({ extended: true });
const bodyParser = require('body-parser')
const filter = require("../src/filter");

const jsonParser = bodyParser.json()

router.get("/items", async function (req, res) {
  const ress = await filter.getDocs("");
  res.status(200).send(ress);
});

// Route to get Docuemnt by its Id
router.get("/item/:id", getAnItem, async function (req, res) {
  res.send(res.item);
});

// Route to Add new a Docuemnt
router.post("/add", urlencodedParser, jsonParser, async function (req, res) {
  var obj = {
    name: req.body.name,
    value: req.body.value,
  };
  const result = await filter.addDoc(obj);
  res.status(201).send(result);
  console.log(req.body);
});

// Route to Update Document by Id
router.patch("/update/:id", getAnItem, jsonParser, async function (req, res) {
  newObj = { name: req.body.name, value: req.body.value };
  
  const result = await filter.upateDoc(res.item, newObj);
  res.send(result)
});


// Route to get the Document ID
async function getAnItem(req, res, next) {
  let item;
  theId = ObjectId(req.params.id);
  item = await filter.getDocsbyId({ _id: theId });
  if (theId == null) {
    return res.status(404).json({ message: "cannot find item" });
  }
  res.item = item;
  next();
}
module.exports = router;

