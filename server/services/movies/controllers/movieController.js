const Movie = require("../models/movieModel");

class MovieController {
  static showAllMovies(req, res, next) {
    Movie.find()
      .then((movies) => {
        // console.log(movies);
        res.status(200).json(movies);
      })
      .catch((err) => {
        next(err);
      });
  }

  static showMovieById(req, res, next) {
    let movieId = req.params.id;
    Movie.findOne(movieId)
      .then((movie) => {
        // console.log(movie);
        res.status(200).json(movie);
      })
      .catch((err) => {
        next(err);
      });
  }

  static addMovie(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    // const { title, overview, poster_path } = req.body;
    // const popularity = +req.body.popularity;
    // const tags = req.body.tags.split(",");
    Movie.insertOne({ title, overview, poster_path, popularity, tags })
      .then((movie) => {
        // console.log(movie.ops);
        res
          .status(201)
          .json({ movie: movie.ops, message: "Movie added succesfully!" });
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateMovie(req, res, next) {
    const id = req.params.id;
    const { title, overview, poster_path, popularity, tags } = req.body;
    // console.log(req.body);

    // Untuk Body body form url encoded
    // const popularity = +req.body.popularity;
    // const tags = req.body.tags.split(",");
    // tags.pop();

    Movie.updateOne({ id, title, overview, poster_path, popularity, tags })
      .then((movie) => {
        console.log(movie);
        res.status(200).json({ _id: id, message: movie.result });
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteMovie(req, res, next) {
    let id = req.params.id;
    Movie.deleteOne(id)
      .then((movie) => {
        // console.log(movie);
        // console.log(id);
        res.status(200).json({ _id: id, message: "Movie deleted" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = MovieController;
