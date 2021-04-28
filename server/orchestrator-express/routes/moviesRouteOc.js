const express = require("express");
const router = express.Router();
const MovieControllerOc = require("../controllers/movieControllerOc");

router.get("/entertainme", MovieControllerOc.showAllEntertainme);
router.post("/movies", MovieControllerOc.addMovieOc);
router.get("/movies", MovieControllerOc.showAllMovie);
router.get("/movies/:id", MovieControllerOc.showMovieById);
router.put("/movies/:id/edit", MovieControllerOc.updateMovieOc);
router.delete("/movies/:id/delete", MovieControllerOc.deleteMovieOc);

module.exports = router;
