const express = require("express");
const router = express.Router();
const SeriesRoute = require("./seriesRoute");

router.use(SeriesRoute);

module.exports = router;
