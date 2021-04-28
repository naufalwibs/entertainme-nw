import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useHistory, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SERIESID, GET_SERIES, UPDATE_SERIES } from "../queries/queries";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function EditSeries() {
  const params = useParams();
  let history = useHistory();

  const { data, loading, error } = useQuery(GET_SERIESID, {
    variables: {
      _id: params.id,
    },
  });

  const [editTitle, setEditTitle] = useState("");
  const [editOverview, setEditOverview] = useState("");
  const [editPoster, setEditPoster] = useState("");
  const [editPopularity, setEditPopularity] = useState("");
  const [editTags, setEditTags] = useState([]);
  const [updateSeries] = useMutation(UPDATE_SERIES, {
    refetchQueries: [{ query: GET_SERIES }],
  });

  useEffect(() => {
    setEditTitle(data?.seriesId?.title);
    setEditOverview(data?.seriesId?.overview);
    setEditPoster(data?.seriesId?.poster_path);
    setEditPopularity(data?.seriesId?.popularity);
    setEditTags(data?.seriesId?.tags);
  }, [data]);

  const editTitleSetter = (event) => {
    event.preventDefault();
    setEditTitle(event.target.value);
  };

  const editOverviewSetter = (event) => {
    event.preventDefault();
    setEditOverview(event.target.value);
  };

  const editPosterSetter = (event) => {
    event.preventDefault();
    setEditPoster(event.target.value);
  };

  const editPopularitySetter = (event) => {
    event.preventDefault();
    setEditPopularity(event.target.value);
  };

  const editTagsSetter = (event) => {
    event.preventDefault();
    setEditTags(event.target.value);
  };

  const onSubmitEdit = (event) => {
    event.preventDefault();

    if (!editTitle) {
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
    } else if (!editOverview) {
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
    } else if (!editPoster) {
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
    } else if (!editPopularity) {
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
    } else if (!editTags) {
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
      updateSeries({
        variables: {
          newSeriesData: {
            _id: params.id,
            title: editTitle,
            overview: editOverview,
            poster_path: editPoster,
            popularity: +editPopularity,
            tags: editTags,
          },
        },
      });
      MySwal.fire({
        icon: "success",
        title: "Movie Updated Succesfully.",
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
      <section id="edit-page">
        <div className="container pt-5">
          <div className="col-lg">
            <h2 className="text-center">Edit Series</h2>
          </div>
        </div>
        <div className="container container-width">
          <div className="col-lg">
            <form onSubmit={onSubmitEdit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Series Title"
                  value={editTitle}
                  onChange={editTitleSetter}
                />
              </div>
              {/* <div className="mb-3">
                <label className="form-label">Overview</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Series Overview"
                  defaultValue={data.seriesId.overview}
                />
              </div> */}
              <label className="form-label">Overview</label>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Movie Overview eg: Next chapter of prequel"
                  id="floatingTextarea2"
                  value={editOverview}
                  onChange={editOverviewSetter}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Poster</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Series Poster Path"
                  value={editPoster}
                  onChange={editPosterSetter}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Popularity</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Series Popularity Rating"
                  value={editPopularity}
                  onChange={editPopularitySetter}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Genre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Series Tags Genre"
                  value={editTags}
                  onChange={editTagsSetter}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Edit Series
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default EditSeries;
