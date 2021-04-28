import React from "react";
import Loader from "react-loader-spinner";

function LoadingPage() {
  return (
    <>
      <section id="loading-page">
        <div className="container">
          <div className="col-lg d-flex justify-content-center py-5">
            <Loader type="Audio" color="#00BFFF" height={125} width={125} />
          </div>
        </div>
        <div className="container">
          <h3 className="text-center mt-5">Now Loading ...</h3>
        </div>
      </section>
    </>
  );
}

export default LoadingPage;
