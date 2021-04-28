import React, { useEffect } from "react";
import Footer from "../components/Footer";
import { useHistory, useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_SERIES, GET_SERIESID, GET_SERIES } from "../queries/queries";
import { favoritesSeriesVar } from "../config/vars";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function DetailSeries() {
  let history = useHistory();
  const params = useParams();

  const [fetcherSeriesId, { data, loading, error }] = useLazyQuery(
    GET_SERIESID,
    {
      variables: {
        _id: params.id,
      },
    }
  );

  useEffect(() => {
    fetcherSeriesId();
  }, [fetcherSeriesId]);

  const [deleteSeries] = useMutation(DELETE_SERIES, {
    refetchQueries: [{ query: GET_SERIES }],
  });

  const addToFavoriteSeries = (event, id) => {
    event.preventDefault();
    const existingFavoritesSeries = favoritesSeriesVar();

    let isExist = existingFavoritesSeries.find((series) => series._id === id);

    if (!isExist) {
      const newFav = {
        _id: id,
        title: data.seriesId.title,
        overview: data.seriesId.overview,
        poster_path: data.seriesId.poster_path,
        popularity: data.seriesId.popularity,
        tags: data.seriesId.tags,
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

  const editSeries = (event, id) => {
    event.preventDefault();
    history.push(`/series/${id}/edit`);
  };

  const deleteSeriesId = (event, id) => {
    event.preventDefault();

    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        deleteSeries({
          variables: {
            _id: id,
          },
        });
        history.push("/series");
      }
    });
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
      <section id="movie-detail" className="pt-5">
        <div className="container">
          <div className="col-lg">
            <div className="card mb-3 detail-background">
              <div className="row g-0">
                <div className="col-md-4 d-flex justify-content-center">
                  <img
                    src={data?.seriesId.poster_path}
                    alt="Detail"
                    className="detail-image"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{data?.seriesId.title}</h5>
                    <p className="card-text">{data?.seriesId.overview}</p>
                    <p className="card-text">
                      Popularity: {data?.seriesId.popularity}
                    </p>
                    <p className="card-text">
                      Genre: {data?.seriesId.tags.join(", ")}
                    </p>
                  </div>
                  <div className="col-lg d-flex justify-content-start">
                    <button
                      className="btn btn-primary mx-3"
                      onClick={(event) =>
                        addToFavoriteSeries(event, data.seriesId._id)
                      }
                    >
                      Add to Favorite
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={(event) => editSeries(event, data.seriesId._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-primary mx-3"
                      onClick={(event) =>
                        deleteSeriesId(event, data.seriesId._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default DetailSeries;
