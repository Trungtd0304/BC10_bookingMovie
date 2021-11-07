import React from "react";
import "./Film.css";
import { NavLink } from "react-router-dom";

export default function Film(props) {
  const { phim } = props;

  return (
    <div className="game">
      <div className="front">
        <div
          style={{
            backgroundImage: `url(${phim.hinhAnh}), url(anh1.png)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <img
            className="img-film"
            src={phim.hinhAnh}
            alt={phim.tenPhim}
            style={{ width: 300, height: 300, opacity: 0 }}
          />
        </div>
      </div>
      <div className="back">
        <div className="film-content">
          <h3 className="film-h3">{phim.tenPhim}</h3>
          <div>
            <p>
              {phim.moTa.length > 100 ? (
                <span>{phim.moTa.slice(0, 80)} ...</span>
              ) : (
                <span>{phim.moTa}</span>
              )}
            </p>
          </div>
        </div>
        <div className="film-button">
          {/* <div className="rounded-circlel" style={{ cursor: "pointer" }}>
            <PlayCircleOutlined style={{ fontSize: "50px" }} />{" "}
          </div> */}
          <div className="row">
            <NavLink
              to={`/detail/${phim.maPhim}`}
              className="btn btn-success mt-1 mb-2 container col-5 mr-1"
            >
              CHI TIẾT
            </NavLink>
            <NavLink
              to={`/detail/${phim.maPhim}`}
              className="btn btn-success mt-1 mb-2 container col-5 ml-1"
            >
              ĐẶT VÉ
            </NavLink>
          </div>
        </div>
      </div>
      <div className="background">&nbsp;</div>
    </div>
  );
}
