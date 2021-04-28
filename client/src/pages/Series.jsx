import React, { useEffect } from "react";
import SeriesCard from "../components/SeriesCard";
import CarouselSpecific from "../components/CarouselSpecific";
import Footer from "../components/Footer";
import { useLazyQuery } from "@apollo/client";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import { GET_SERIES } from "../queries/queries";

function Series() {
  const [seriesFetcher, { data, loading, error }] = useLazyQuery(GET_SERIES);

  useEffect(() => {
    seriesFetcher();
  }, [seriesFetcher]);

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
              <h3 className="pb-3 text-start">Series</h3>
            </div>
            {/* <div className="col-lg-2">
              <button className="btn btn-dark">Filter</button>
            </div> */}
          </div>
          <div className="row">
            {data?.series.map((seriesid) => {
              return <SeriesCard key={seriesid._id} seriesid={seriesid} />;
            })}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Series;
