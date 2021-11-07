import React from "react";

export default function Navbar(props) {
  return (
    <div style={{ zIndex: 1000, width: "100%" }} className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand ml-4" href="#">
          BC10
          <br />
          <span>Movie</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className="navbar-nav m-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ maxHeight: 100 }}
          >
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                ListMovie
              </a>
            </li>
          </ul>
          <form className="d-flex mr-5">
            <button className="btn btn-outline-success" type="submit">
              Sign in
            </button>
            <button className="btn btn-outline-success" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}
