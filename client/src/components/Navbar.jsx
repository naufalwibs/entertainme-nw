import React from "react";
import NavLogo from "../assets/nav-logo.png";
import { useHistory } from "react-router-dom";

function Navbar() {
  let history = useHistory();

  const toHome = (event) => {
    event.preventDefault();
    history.push("/");
  };

  const toMovies = (event) => {
    event.preventDefault();
    history.push("/movies");
  };

  const toSeries = (event) => {
    event.preventDefault();
    history.push("/series");
  };

  const toFavorites = (event) => {
    event.preventDefault();
    history.push("/favorites");
  };

  const toAddMovie = (event) => {
    event.preventDefault();
    history.push("/movies/add");
  };

  const toAddSeries = (event) => {
    event.preventDefault();
    history.push("/series/add");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark nav-bg">
        <div className="container-fluid px-5">
          <a
            className="navbar-brand"
            href="true"
            onClick={(event) => toHome(event)}
          >
            <img
              src={NavLogo}
              alt="Nav-Logo"
              height="32"
              className="d-inline-block align-text-top"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="true"
                  onClick={(event) => toMovies(event)}
                >
                  Movies
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="true"
                  onClick={(event) => toSeries(event)}
                >
                  Series
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="true"
                  onClick={(event) => toFavorites(event)}
                >
                  Favorites
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle disabled"
                  href="true"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Genre
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="true">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="true">
                      Drama
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="true">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="true"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Editor
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a
                      className="dropdown-item"
                      href="true"
                      onClick={(event) => toAddMovie(event)}
                    >
                      Add Movie
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="true"
                      onClick={(event) => toAddSeries(event)}
                    >
                      Add TV Series
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
