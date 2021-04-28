const express = require("express");
const router = express.Router();
const MovieRoute = require("./movieRoute");
const SeriesRoute = require("./seriesRoute");

router.use(MovieRoute);
router.use(SeriesRoute);

module.exports = router;
