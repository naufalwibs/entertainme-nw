const express = require("express");
const app = express();
const port = process.env.PORT || 4002;
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const { connectMongodb } = require("./config/mongodb");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectMongodb((connected) => {
  if (connected) console.log("Connect mongodb: success");
  else console.log("connect mongodb: error!");
});

app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Series Listening on port: ${port}`);
});
