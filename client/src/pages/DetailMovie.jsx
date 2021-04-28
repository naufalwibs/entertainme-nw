import React, { useEffect } from "react";
import Footer from "../components/Footer";
import { useHistory, useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_MOVIE, GET_MOVIES, DELETE_MOVIE } from "../queries/queries";
import { favoritesMovieVar } from "../config/vars";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function DetailMovie() {
  let history = useHistory();
  const params = useParams();

  const [movieIdFetcher, { data, loading, error }] = useLazyQuery(GET_MOVIE, {
    variables: {
      _id: params.id,
    },
  });

  useEffect(() => {
    movieIdFetcher();
  }, [movieIdFetcher]);

  // const [
  //   deleteMovie,
  //   { data: deleteData, loading: deleteLoading, error: deleteError },
  // ] = useMutation(DELETE_MOVIE);

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
  });

  const addToFavoriteMovie = (event, id) => {
    event.preventDefault();
    const existingFavoritesMovie = favoritesMovieVar();

    let isExist = existingFavoritesMovie.find((movie) => movie._id === id);

    if (!isExist) {
      const newFav = {
        _id: id,
        title: data.movie.title,
        overview: data.movie.overview,
        poster_path: data.movie.poster_path,
        popularity: data.movie.popularity,
        tags: data.movie.tags,
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

  const editMovie = (event, id) => {
    event.preventDefault();
    history.push(`/movies/${id}/edit`);
  };

  const deleteMovieById = (event, id) => {
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
        deleteMovie({
          variables: {
            _id: id,
          },
        });
        history.push("/movies");
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
                    src={data?.movie.poster_path}
                    alt="Detail"
                    className="detail-image"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{data?.movie.title}</h5>
                    <p className="card-text">{data?.movie.overview}</p>
                    <p className="card-text">
                      Popularity: {data?.movie.popularity}
                    </p>
                    <p className="card-text">
                      Genre: {data?.movie.tags.join(", ")}
                    </p>
                  </div>
                  <div className="col-lg d-flex justify-content-start">
                    <button
                      className="btn btn-primary mx-3"
                      onClick={(event) =>
                        addToFavoriteMovie(event, data.movie._id)
                      }
                    >
                      Add to Favorite
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={(event) => editMovie(event, data.movie._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-primary mx-3"
                      onClick={(event) =>
                        deleteMovieById(event, data.movie._id)
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

export default DetailMovie;
