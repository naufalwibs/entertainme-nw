const express = require("express");
const router = express.Router();
const SeriesController = require("../controllers/seriesController");

router.post("/series", SeriesController.addSeries);
router.get("/series", SeriesController.showAllSeries);
router.get("/series/:id", SeriesController.showSeriesById);
router.put("/series/:id/edit", SeriesController.updateSeries);
router.delete("/series/:id/delete", SeriesController.deleteSeries);

module.exports = router;
