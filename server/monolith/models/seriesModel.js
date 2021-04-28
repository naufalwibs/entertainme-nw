const { getDatabase } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const collectionSeries = "series";

class Series {
  static find() {
    return getDatabase().collection(collectionSeries).find().toArray();
  }

  static findOne(id) {
    return getDatabase()
      .collection(collectionSeries)
      .findOne({
        _id: ObjectId(id),
      });
  }

  static insertOne(params) {
    // console.log("Create one");
    const { title, overview, poster_path, popularity, tags } = params;
    return getDatabase().collection(collectionSeries).insertOne({
      title,
      overview,
      poster_path,
      popularity,
      tags,
    });
  }

  static updateOne(params) {
    const { id, title, overview, poster_path, popularity, tags } = params;
    return getDatabase()
      .collection(collectionSeries)
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            title,
            overview,
            poster_path,
            popularity,
            tags,
          },
        }
      );
  }

  static deleteOne(id) {
    // console.log("Delete one");
    return getDatabase()
      .collection(collectionSeries)
      .deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Series;
