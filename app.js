"use strict";
const express = require("express");
const app = express();
const port = process.env.PORT || 1337;
const morgan = require("morgan");
const cors = require("cors");

const middleWare = require("./middleware/errorhandel");
const hello = require("./routes/hello");
const items = require("./routes/documents");

app.use(cors());

app.use(middleWare.middleWare);
app.use("/hello", hello);
app.use("/", items);

app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(middleWare.notFoundError), app.use(middleWare.errorResult);

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

app.listen(port, () => console.log(`Example API listning on port ${port}!`));
