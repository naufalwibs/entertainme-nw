const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

// const seriesURL = "http://34.238.115.76:4001/series";
const seriesURL = "http://localhost:4001/series";

const SeriesResolver = {
  Query: {
    // GET SERIES
    series: async () => {
      const seriesData = await redis.get("series:data");
      if (!seriesData) {
        try {
          const { data } = await axios.get(seriesURL);
          await redis.set("series:data", JSON.stringify(data));
          return data;
        } catch (err) {
          return err;
        }
      } else {
        return JSON.parse(seriesData);
      }
    },

    seriesId: async (_, args) => {
      await redis.del("seriesid:data");
      const seriesidData = await redis.get("seriesid:data");
      try {
        const { _id } = args;
        const { data } = await axios.get(seriesURL + "/" + _id);
        await redis.set("seriesid:data", JSON.stringify(data));
        return data;
      } catch (err) {
        return err;
      }
    },
  },

  Mutation: {
    // ADD, UPDATE, DELETE SERIES
    addSeries: async (_, args) => {
      try {
        const {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        } = args.newSeries;
        await redis.del("series:data");
        const { data } = await axios({
          method: "POST",
          url: seriesURL,
          data: {
            title,
            overview,
            poster_path,
            popularity,
            tags,
          },
        });
        return data.series[0];
      } catch (err) {
        return err;
      }
    },

    updateSeries: async (_, args) => {
      try {
        const {
          _id,
          title,
          overview,
          poster_path,
          popularity,
          tags,
        } = args.newSeriesData;
        await redis.del("series:data");
        const { data } = await axios({
          method: "PUT",
          url: seriesURL + "/" + _id + "/edit",
          data: {
            title,
            overview,
            poster_path,
            popularity,
            tags,
          },
        });
        return data;
      } catch (err) {
        return err;
      }
    },

    deleteSeries: async (_, args) => {
      try {
        const { _id } = args;
        await redis.del("series:data");
        const { data } = await axios({
          method: "DELETE",
          url: seriesURL + "/" + _id + "/delete",
        });
        return data;
      } catch (err) {
        return err;
      }
    },
  },
};

module.exports = SeriesResolver;
