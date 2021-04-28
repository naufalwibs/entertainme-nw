import React, { useState } from "react";
import Footer from "../components/Footer";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ADD_SERIES, GET_SERIES } from "../queries/queries";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Add() {
  let history = useHistory();
  const [addTitle, setAddTitle] = useState("");
  const [addOverview, setAddOverview] = useState("");
  const [addPoster, setAddPoster] = useState("");
  const [addPopularity, setAddPopularity] = useState("");
  const [addGenreTags, setAddGenreTags] = useState([]);

  const [addSeries, { loading, error }] = useMutation(ADD_SERIES, {
    refetchQueries: [{ query: GET_SERIES }],
  });

  const titleSetter = (event) => {
    setAddTitle(event.target.value);
  };

  const overviewSetter = (event) => {
    setAddOverview(event.target.value);
  };

  const posterSetter = (event) => {
    setAddPoster(event.target.value);
  };

  const popularitySetter = (event) => {
    setAddPopularity(event.target.value);
  };

  const genreTagsSetter = (event) => {
    setAddGenreTags(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!addTitle) {
      MySwal.fire({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        title: "Title can't be empty",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    } else if (!addOverview) {
      MySwal.fire({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        title: "Overview can't be empty",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    } else if (!addPoster) {
      MySwal.fire({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        title: "Poster can't be empty",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    } else if (!addPopularity || +addPopularity > 10 || +addPopularity < 0) {
      MySwal.fire({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        title: "Popularity can't be empty or Insert Valid Number",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    } else if (!addGenreTags) {
      MySwal.fire({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        title: "Genre can't be empty",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    } else {
      addSeries({
        variables: {
          newSeries: {
            title: addTitle,
            overview: addOverview,
            poster_path: addPoster,
            popularity: +addPopularity,
            tags: addGenreTags,
          },
        },
      });
      setAddTitle("");
      setAddOverview("");
      setAddPoster("");
      setAddPopularity("");
      setAddGenreTags([]);
      MySwal.fire({
        icon: "success",
        title: "Movie Added Succesfully.",
        text: "Enjoy the Entertainment",
        footer: "<a>Discover More.</a>",
      });
      history.push("/series");
    }
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
      <section id="add-page">
        <div className="container pt-5">
          <div className="col-lg">
            <h2 className="text-center">Add Series</h2>
          </div>
        </div>
        <div className="container container-width">
          <div className="col-lg">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Series Title e.g: Wanda Virtue 3"
                  onChange={(event) => titleSetter(event)}
                  value={addTitle}
                />
              </div>
              {/* <div className="mb-3">
                <label className="form-label">Overview</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Series Overview"
                />
              </div> */}
              <label className="form-label">Overview</label>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Series Overview eg: Next chapter of prequel"
                  id="floatingTextarea2"
                  onChange={(event) => overviewSetter(event)}
                  value={addOverview}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Poster</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Series Poster Path eg: https://amazon.img/chipoleti"
                  onChange={(event) => posterSetter(event)}
                  value={addPoster}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Popularity</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Series Popularity Rating eg: 9,2"
                  onChange={(event) => popularitySetter(event)}
                  value={addPopularity}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Genre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Series Tags Genre eg: Action,Drama,Crime"
                  onChange={(event) => genreTagsSetter(event)}
                  value={addGenreTags}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Series
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Add;
