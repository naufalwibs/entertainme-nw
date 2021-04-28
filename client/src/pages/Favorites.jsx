import React from "react";
import Footer from "../components/Footer";
import FavoriteCard from "../components/FavoriteCard";
import { useReactiveVar } from "@apollo/client";
import { favoritesMovieVar, favoritesSeriesVar } from "../config/vars";
import NoSeriesFav from "../components/NoSeriesFav";
import NoMoviesFav from "../components/NoMoviesFav";

function Favorites() {
  const favoritesMovie = useReactiveVar(favoritesMovieVar);
  const favoritesSeries = useReactiveVar(favoritesSeriesVar);

  return (
    <>
      <section id="favorites-page">
        <div className="container pt-5">
          <h2 className="pb-3 text-center">Favorites</h2>
        </div>
        <div className="container pt-4">
          <div className="row">
            <div className="col-lg-2">
              {favoritesMovie.length > 0 ? (
                <h3 className="pb-3 text-start">Movies</h3>
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-2"></div>
          </div>
          <div className="row">
            {favoritesMovie.map((fav) => {
              return <FavoriteCard key={fav._id} fav={fav} />;
            })}
            {favoritesMovie.length > 0 ? "" : <NoMoviesFav />}
          </div>
        </div>

        <div className="container pt-4">
          <div className="row">
            <div className="col-lg-2">
              {favoritesSeries.length > 0 ? (
                <h3 className="pb-3 text-start">Series</h3>
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-2"></div>
          </div>
          <div className="row">
            {favoritesSeries.map((fav) => {
              return <FavoriteCard key={fav._id} fav={fav} />;
            })}
            {favoritesSeries.length > 0 ? "" : <NoSeriesFav />}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Favorites;
