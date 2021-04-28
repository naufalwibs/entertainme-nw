import React, { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import CarouselSpecific from "../components/CarouselSpecific";
import Footer from "../components/Footer";
import { useLazyQuery } from "@apollo/client";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import { GET_MOVIES } from "../queries/queries";

function Movies() {
  const [movieFetcher, { data, loading, error }] = useLazyQuery(GET_MOVIES);

  useEffect(() => {
    movieFetcher();
  }, [movieFetcher]);

  if (loading) {
    return (
      <>
        <LoadingPage />
      </>
    );
  }

  if (error) {
    return (
      <>
        <ErrorPage error={error} />
      </>
    );
  }

  return (
    <>
      <section id="movies-page">
        <CarouselSpecific />
        <div className="container pt-4">
          <div className="row">
            <div className="col-lg-2">
              <h3 className="pb-3 text-start">Movies</h3>
            </div>
            {/* <div className="col-lg-2">
              <button className="btn btn-dark">Filter</button>
            </div> */}
          </div>
          <div className="row">
            {data?.movies.map((movie) => {
              return <MovieCard key={movie._id} movie={movie} />;
            })}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Movies;
