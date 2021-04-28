const Series = require("../models/seriesModel");

class SeriesController {
  static showAllSeries(req, res, next) {
    Series.find()
      .then((series) => {
        // console.log(series);
        res.status(200).json(series);
      })
      .catch((err) => {
        next(err);
      });
  }

  static showSeriesById(req, res, next) {
    let seriesId = req.params.id;
    Series.findOne(seriesId)
      .then((series) => {
        // console.log(series);
        res.status(200).json(series);
      })
      .catch((err) => {
        next(err);
      });
  }

  static addSeries(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    // console.log(req.body);
    // const { title, overview, poster_path } = req.body;
    // const popularity = +req.body.popularity;
    // const tags = req.body.tags.split(",");
    Series.insertOne({ title, overview, poster_path, popularity, tags })
      .then((series) => {
        console.log(series.ops);
        res.status(201).json({ series: series.ops, message: "Series Added" });
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateSeries(req, res, next) {
    const id = req.params.id;
    const { title, overview, poster_path, popularity, tags } = req.body;
    // console.log(req.body);

    // Untuk Body body form url encoded
    // const popularity = +req.body.popularity;
    // const tags = req.body.tags.split(",");
    // tags.pop();

    Series.updateOne({ id, title, overview, poster_path, popularity, tags })
      .then((series) => {
        res.status(200).json({ _id: id, message: "Series Updated" });
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteSeries(req, res, next) {
    // res.send("Masuk");
    let id = req.params.id;
    Series.deleteOne(id)
      .then((series) => {
        // console.log(series);
        res.status(200).json({ _id: id, message: "Series Deleted" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = SeriesController;
