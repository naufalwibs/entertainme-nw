const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class SeriesController {
  static async showAllSeries(req, res, next) {
    const seriesData = await redis.get("series:data");
    if (!seriesData) {
      try {
        const { data } = await axios.get("http://localhost:4002/series");
        await redis.set("series:data", JSON.stringify(data));
        res.status(200).json(data);
      } catch (err) {
        next({ code: 500, message: err.message });
      }
    } else {
      res.status(200).json(JSON.parse(seriesData));
    }
  }

  static async showSeriesById(req, res, next) {
    await redis.del("series:data");
    const seriesData = await redis.get("series:data");
    if (!seriesData) {
      try {
        const { data } = await axios.get(
          "http://localhost:4002/series/" + req.params.id
        );
        await redis.set("series:data", JSON.stringify(data));
        res.status(200).json(data);
      } catch (err) {
        next({ code: 500, message: err.message });
      }
    } else {
      res.status(200).json(JSON.parse(seriesData));
    }
  }

  static async addSeriesOc(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      await redis.del("series:data");
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:4002/series",
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

  static async updateSeriesOc(req, res, next) {
    try {
      const id = req.params.id;
      const { title, overview, poster_path, popularity, tags } = req.body;
      await redis.del("series:data");
      const { data } = await axios({
        method: "PUT",
        url: "http://localhost:4002/series/" + id + "/edit",
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

  static async deleteSeriesOc(req, res, next) {
    try {
      const id = req.params.id;
      await redis.del("series:data");
      const { data } = await axios({
        url: "http://localhost:4002/series/" + id + "/delete",
        method: "DELETE",
      });
      res.status(200).json({ message: "Deleted" });
    } catch (err) {
      next({ code: 500, message: err.message });
    }
  }
}

module.exports = SeriesController;
