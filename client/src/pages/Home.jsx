import React, { useEffect } from "react";
import CarouselHome from "../components/CarouselHome";
import Footer from "../components/Footer";
import SeriesCard from "../components/SeriesCard";
import MovieCard from "../components/MovieCard";
import { useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { GET_ENTERTAINME } from "../queries/queries";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import SkeletonCard from "../components/SkeletonCard";

function Home() {
  const [entertainFetcher, { data, loading, error }] = useLazyQuery(
    GET_ENTERTAINME
  );

  useEffect(() => {
    entertainFetcher();
  }, [entertainFetcher]);

  let history = useHistory();
  const toMovies = (e) => {
    e.preventDefault();
    history.push("/movies");
  };

  const toSeries = (e) => {
    e.preventDefault();
    history.push("/series");
  };

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
      <section id="home-page">
        <CarouselHome />
        <div className="container pt-4 horizontal-scroll">
          <div className="row">
            <div className="col-lg-2">
              <h3 className="pb-3 text-center">Movies</h3>
            </div>
            <div className="col-lg-2 text-center mb-3">
              <button className="btn btn-dark" onClick={toMovies}>
                See More..
              </button>
            </div>
          </div>
          <div className="col-lg horizontal-scroll d-flex flex-row">
            {/* <div className="row"> */}
            {loading ? (
              <div className="row">
                <SkeletonCard />
              </div>
            ) : (
              data?.movies.map((movie, i) => {
                if (i < 10) {
                  return <MovieCard key={movie._id} movie={movie} />;
                } else {
                  return "";
                }
              })
            )}
          </div>
        </div>
        {/* </div> */}
        <div className="container pt-4">
          <div className="row">
            <div className="col-lg-2">
              <h3 className="pb-3 text-center">TV Series</h3>
            </div>
            <div className="col-lg-2 text-center mb-3">
              <button className="btn btn-dark" onClick={toSeries}>
                See More..
              </button>
            </div>
          </div>
          {/* <div className="row"> */}
          <div className="col-lg horizontal-scroll d-flex flex-row">
            {loading ? (
              <div className="row">
                <SkeletonCard />
              </div>
            ) : (
              data?.series.map((seriesid, i) => {
                if (i < 10) {
                  return <SeriesCard key={seriesid._id} seriesid={seriesid} />;
                } else {
                  return "";
                }
              })
            )}
          </div>
          {/* </div> */}
        </div>

        <Footer />
      </section>
    </>
  );
}

export default Home;
