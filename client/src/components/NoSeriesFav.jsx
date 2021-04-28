import React from "react";
import Loader from "react-loader-spinner";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function NoSeriesFav() {
  let history = useHistory();

  const toSeries = (e) => {
    e.preventDefault();
    history.push("/series");
  };

  return (
    <>
      <div className="container justify-content-center d-flex">
        <Loader type="Hearts" color="#00BFFF" height={100} width={100} />
      </div>
      <div className="container pt-5">
        <h4 className="text-center">There's No Series on the list</h4>
      </div>
      <div className="container d-flex justify-content-center">
        <Button onClick={toSeries} variant="contained" color="primary">
          Check Series
        </Button>
      </div>
    </>
  );
}

export default NoSeriesFav;
