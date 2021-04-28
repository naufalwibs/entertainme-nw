import React from "react";
import { useHistory } from "react-router-dom";
import { favoritesMovieVar } from "../config/vars";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function MovieCard(props) {
  let history = useHistory();

  const toDetailMovie = (event, id) => {
    event.preventDefault();
    history.push(`/movies/${id}`);
  };

  const addToFavoriteMovie = (event, id) => {
    event.preventDefault();
    const existingFavoritesMovie = favoritesMovieVar();

    let isExist = existingFavoritesMovie.find((movie) => movie._id === id);

    if (!isExist) {
      const newFav = {
        _id: id,
        title: props.movie.title,
        overview: props.movie.overview,
        poster_path: props.movie.poster_path,
        popularity: props.movie.popularity,
        tags: props.movie.tags,
      };
      favoritesMovieVar([newFav, ...existingFavoritesMovie]);
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
            src={props.movie.poster_path}
            className="card-img movie-img"
            alt="poster"
          />
          <div className="card-img-overlay detail-card d-flex flex-column">
            <div className="bottom-align-text">
              <h5 className="card-title font-size-movie">
                {props.movie.title}
              </h5>
              <p className="card-text">
                {props.movie.overview.substring(0, 15)} ...
              </p>
              <p className="card-text">Popularity: {props.movie.popularity}</p>
              <p
                className="card-text mb-1 pointer-button-card"
                onClick={(event) => toDetailMovie(event, props.movie._id)}
              >
                <i className="fas fa-play"></i> Watch Now
              </p>
              <p
                className="card-text mb-1 pointer-button-card"
                onClick={(event) => addToFavoriteMovie(event, props.movie._id)}
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

export default MovieCard;
