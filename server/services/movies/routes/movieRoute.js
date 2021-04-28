const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movieController");

router.post("/movies", MovieController.addMovie);
router.get("/movies", MovieController.showAllMovies);
router.get("/movies/:id", MovieController.showMovieById);
router.put("/movies/:id/edit", MovieController.updateMovie);
router.delete("/movies/:id/delete", MovieController.deleteMovie);

module.exports = router;
