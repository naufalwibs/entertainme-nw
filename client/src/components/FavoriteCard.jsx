import React from "react";
import { useHistory } from "react-router-dom";

function FavoriteCard(props) {
  let history = useHistory();

  const toDetailMovie = (event, id) => {
    event.preventDefault();
    history.push(`/movies/${id}`);
  };

  return (
    <>
      <div className="col-lg-2 col-md-3 col-sm-6 movie-container img-hover-zoom--quick-zoom mb-4 px-3">
        <div className="card bg-dark text-white">
          <img
            src={props.fav.poster_path}
            className="card-img movie-img"
            alt="poster"
          />
          <div className="card-img-overlay detail-card  d-flex flex-column">
            <div className="bottom-align-text">
              <h5 className="card-title">{props.fav.title}</h5>
              <p className="card-text">
                {props.fav.overview.substring(0, 20)} ...
              </p>
              <p className="card-text">Popularity: {props.fav.popularity}</p>
              <p
                className="card-text mb-1 pointer-button-card "
                onClick={(event) => toDetailMovie(event, props.fav._id)}
              >
                <i className="fas fa-play"></i> Watch Now
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FavoriteCard;
