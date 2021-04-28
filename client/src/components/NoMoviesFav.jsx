import React from "react";
import Loader from "react-loader-spinner";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function NoMoviesFav() {
  let history = useHistory();

  const toMovies = (e) => {
    e.preventDefault();
    history.push("/movies");
  };

  return (
    <>
      <div className="container justify-content-center d-flex">
        <Loader type="Hearts" color="#00BFFF" height={100} width={100} />
      </div>
      <div className="container pt-5">
        <h4 className="text-center">There's No Movies on the list</h4>
      </div>
      <div className="container d-flex justify-content-center">
        <Button onClick={toMovies} variant="contained" color="primary">
          Check Movies
        </Button>
      </div>
    </>
  );
}

export default NoMoviesFav;
