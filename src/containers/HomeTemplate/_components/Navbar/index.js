import _ from "lodash";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import { TOKEN, USER_LOGIN } from "../../../../util/setting/config";

export default function Navbar(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button className="btn btn-outline-success mr-1" type="submit">
            <NavLink
              activeClassName="active"
              className="text-success"
              to="/login"
            >
              Sign In
            </NavLink>
          </button>
          <button className="btn btn-outline-success" type="submit">
            <NavLink
              activeClassName="active"
              className="text-success"
              to="/register"
            >
              Sign Up
            </NavLink>
          </button>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <button className="btn btn-outline-success mr-2" type="submit">
          <NavLink
            activeClassName="active"
            className="text-success"
            to="/profile"
          >
            Hello {userLogin.taiKhoan}
          </NavLink>
        </button>
        <button
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push("/");
            window.location.reload();
          }}
          className="btn btn-outline-success"
        >
          Đăng xuất
        </button>
      </Fragment>
    );
  };

  return (
    <div
      style={{ zIndex: 1000, width: "100%", opacity: 0.5 }}
      className="fixed-top  "
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <NavLink className="navbar-brand text-dark ml-4" to="/">
          BC10
          <br />
          <span>Movie</span>
        </NavLink>
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
            <li className="nav-item ">
              <NavLink
                exact
                activeClassName="active"
                className="nav-link"
                to="/"
              >
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/new">
                New
              </NavLink>
            </li>
          </ul>
          <div className="d-flex mr-5 mt-3">{renderLogin()}</div>
        </div>
      </nav>
    </div>
  );
}
