const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class MovieControllerOc {
  static async showAllEntertainme(req, res, next) {
    const entertainmeData = await redis.get("entertainme:data");
    if (!entertainmeData) {
      try {
        const { data: moviesData } = await axios.get(
          "http://localhost:4001/movies"
        );
        const { data: seriesData } = await axios.get(
          "http://localhost:4002/series"
        );
        await redis.set("movies:data", JSON.stringify(moviesData, seriesData));
        res.status(200).json({ movies: moviesData, series: seriesData });
      } catch (err) {
        next({ code: 500, message: err.message });
      }
    } else {
      res.status(200).json(JSON.parse(entertainmeData));
    }
  }

  static async showAllMovie(req, res, next) {
    const moviesData = await redis.get("movies:data");
    if (!moviesData) {
      try {
        const { data } = await axios.get("http://localhost:4001/movies");
        await redis.set("movies:data", JSON.stringify(data));
        res.status(200).json(data);
      } catch (err) {
        next({ code: 500, message: err.message });
      }
    } else {
      res.status(200).json(JSON.parse(moviesData));
    }
  }

  static async showMovieById(req, res, next) {
    await redis.del("movie:data");
    const movieData = await redis.get("movie:data");
    if (!movieData) {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/movies/" + req.params.id
        );
        await redis.set("movie:data", JSON.stringify(data));
        res.status(200).json(data);
      } catch (err) {
        next({ code: 500, message: err.message });
      }
    } else {
      res.status(200).json(JSON.parse(movieData));
    }
  }

  static async addMovieOc(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      await redis.del("movies:data");
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:4001/movies",
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        },
      });
      res.status(201).json(data);
    } catch (err) {
      next({ code: 500, message: err.message });
    }
  }

  static async updateMovieOc(req, res, next) {
    try {
      const id = req.params.id;
      const { title, overview, poster_path, popularity, tags } = req.body;
      await redis.del("movies:data");
      const { data } = await axios({
        method: "PUT",
        url: "http://localhost:4001/movies/" + id + "/edit",
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        },
      });
      res.status(201).json(data);
    } catch (err) {
      next({ code: 500, message: err.message });
    }
  }

  static async deleteMovieOc(req, res, next) {
    try {
      const id = req.params.id;
      // console.log(id);
      await redis.del("movies:data");
      const { data } = await axios({
        url: "http://localhost:4001/movies/" + id + "/delete",
        method: "DELETE",
      });
      res.status(200).json({ message: "Deleted" });
    } catch (err) {
      next({ code: 500, message: err.message });
    }
  }
}

module.exports = MovieControllerOc;

/*
    Versi Promise: 
    try {
      const entertainmeData = await redis.get("entertainme:data");
      if (!entertainmeData) {
        axios
          .get("http://localhost:4001/movies")
          .then((response) => {
            redis
              .set("entertainme:data", JSON.stringify(response.data))
              .then((response) => {
                console.log(response, "ini redis set");
              })
              .catch((err) => {
                next({ code: 500, message: err.message });
              });
            res.status(200).json(response.data);
          })
          .catch((err) => {
            next({ code: 500, message: err.message });
          });
      } else {
        console.log("Already Cahced");
        res.status(200).json(JSON.parse(entertainmeData));
      }
    } catch (err) {
      next({ code: 500, message: err.message });
    }

    Versi Promise All :
        // try {
    //   const entertainmeData = await redis.get("entertainme:data");
    //   if (!entertainmeData) {
    //     let requestsArray = [
    //       "http://localhost:4001/movies",
    //       "http://localhost:4002/series",
    //     ];
    //     Promise.all(
    //       requestsArray.map((request) => {
    //         return axios.get(request).then((data) => {
    //           // console.log(data.data);
    //           return data;
    //         });
    //       })
    //     )
    //       .then((values) => {
    //         console.log("values", values[0].data, values[1].data);
    //         redis.set(
    //           "entertainme:data",
    //           JSON.stringify({ movies: values[0].data, series: values[1].data })
    //         );
    //         res
    //           .status(200)
    //           .json({ movies: values[0].data, series: values[1].data });
    //       })
    //       .catch(console.error.bind(console));
    //   } else {
    //     console.log("Already Cahced");
    //     res.status(200).json(JSON.parse(entertainmeData));
    //   }
    // } catch (err) {
    //   next({ code: 500, message: err.message });
    // }

    */
