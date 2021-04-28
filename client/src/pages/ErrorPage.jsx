import React from "react";
import Loader from "react-loader-spinner";

function ErrorPage(props) {
  return (
    <>
      <section id="error-page">
        <div className="container">
          <div className="col-lg d-flex justify-content-center py-5">
            <Loader type="Puff" color="#00BFFF" height={125} width={125} />
          </div>
        </div>
        <div className="container">
          <h3 className="text-center mt-5">
            An Error Has Occured {props.error?.message}
          </h3>
        </div>
      </section>
    </>
  );
}

export default ErrorPage;
