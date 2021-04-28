const express = require("express");
const router = express.Router();
const SeriesControllerOc = require("../controllers/seriesControllerOc");

router.post("/series", SeriesControllerOc.addSeriesOc);
router.get("/series", SeriesControllerOc.showAllSeries);
router.get("/series/:id", SeriesControllerOc.showSeriesById);
router.put("/series/:id/edit", SeriesControllerOc.updateSeriesOc);
router.delete("/series/:id/delete", SeriesControllerOc.deleteSeriesOc);

module.exports = router;
