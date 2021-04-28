const express = require("express");
const app = express();
const port = 4000 || process.env.PORT;
const router = require("./routes");
const errorHandler = require("../orchestrator-express/middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Orchestrator on port: ${port}`);
});
