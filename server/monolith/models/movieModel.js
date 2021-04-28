const { getDatabase } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const collectionMovie = "movies";

class Movie {
  static find() {
    return getDatabase().collection(collectionMovie).find().toArray();
  }

  static findOne(id) {
    return getDatabase()
      .collection(collectionMovie)
      .findOne({
        _id: ObjectId(id),
      });
  }

  static insertOne(params) {
    // console.log(params);
    const { title, overview, poster_path, popularity, tags } = params;
    return getDatabase().collection(collectionMovie).insertOne({
      title,
      overview,
      poster_path,
      popularity,
      tags,
    });
  }

  static updateOne(params) {
    // console.log(params);
    const { id, title, overview, poster_path, popularity, tags } = params;
    return getDatabase()
      .collection(collectionMovie)
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
    return getDatabase()
      .collection(collectionMovie)
      .deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Movie;
