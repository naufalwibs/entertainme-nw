import React from "react";
import { useHistory } from "react-router-dom";
import { favoritesSeriesVar } from "../config/vars";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function SeriesCard(props) {
  let history = useHistory();

  const toSeriesDetail = (event, id) => {
    event.preventDefault();
    history.push(`/series/${id}`);
  };

  const addToFavoriteSeries = (event, id) => {
    event.preventDefault();
    const existingFavoritesSeries = favoritesSeriesVar();

    let isExist = existingFavoritesSeries.find((series) => series._id === id);

    if (!isExist) {
      const newFav = {
        _id: id,
        title: props.seriesid.title,
        overview: props.seriesid.overview,
        poster_path: props.seriesid.poster_path,
        popularity: props.seriesid.popularity,
        tags: props.seriesid.tags,
      };
      favoritesSeriesVar([newFav, ...existingFavoritesSeries]);
      MySwal.fire({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: "Added to Favorites",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    } else {
      MySwal.fire({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        title: "Already on Favorites",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    }
  };

  return (
    <>
      <div className="col-lg-2 col-md-3 col-sm-6 movie-container img-hover-zoom--quick-zoom mb-4 px-3">
        <div className="card bg-dark text-white">
          <img
            src={props.seriesid.poster_path}
            className="card-img movie-img"
            alt="poster"
          />
          <div className="card-img-overlay detail-card  d-flex flex-column">
            <div className="bottom-align-text">
              <h5 className="card-title font-size-movie">
                {props.seriesid.title}
              </h5>
              <p className="card-text">
                {props.seriesid.overview.substring(0, 15)} ...
              </p>
              <p className="card-text">
                Popularity: {props.seriesid.popularity}
              </p>
              <p
                className="card-text mb-1 pointer-button-card"
                onClick={(event) => toSeriesDetail(event, props.seriesid._id)}
              >
                <i className="fas fa-play"></i> Watch Now
              </p>
              <p
                className="card-text mb-1 pointer-button-card"
                onClick={(event) =>
                  addToFavoriteSeries(event, props.seriesid._id)
                }
              >
                <i className="fas fa-plus"></i> Add to Favorite
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SeriesCard;
