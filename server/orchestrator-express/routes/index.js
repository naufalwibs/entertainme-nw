const express = require("express");
const router = express.Router();
const MoviesRouteOc = require("./moviesRouteOc");
const SeriesRouteOc = require("./seriesRouteOc");

router.use(MoviesRouteOc);
router.use(SeriesRouteOc);

module.exports = router;
