import React from "react";

function CarouselSpecific() {
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active carousel-height-img">
            <img
              src="./assets/specific-banner-4.jpg"
              className="d-block w-100"
              alt="banner-specific"
            />
          </div>
          <div className="carousel-item carousel-height-img">
            <img
              src="./assets/specific-banner-2.png"
              className="d-block w-100"
              alt="banner-specific"
            />
          </div>
          <div className="carousel-item carousel-height-img">
            <img
              src="./assets/specific-banner-3.png"
              className="d-block w-100"
              alt="banner-specific"
            />
          </div>
          <div className="carousel-item carousel-height-img">
            <img
              src="./assets/specific-banner-1.png"
              className="d-block w-100"
              alt="banner-specific"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default CarouselSpecific;
