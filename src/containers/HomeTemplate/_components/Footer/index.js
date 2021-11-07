import React from "react";
import { useSelector } from "react-redux";

export default function HomeFooter() {
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

  return (
    <div className="container-fluid bg-secondary">
      <div className="col-xs-12 py-4 container ">
        <div className="row">
          <div className="col-sm-4 col-xs-12">
            <a className="text-dark" href="#a">
              BC10
              <br />
              <span>Movie</span>
            </a>
          </div>
          <div className="col-sm-4 col-xs-12">
            <div className="row">
              {heThongRapChieu.map((item, index) => {
                return (
                  <div key={index} className="col-4">
                    <img
                      src={item.logo}
                      className="rounded-circle "
                      width="50"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-sm-4 col-xs-12 text-center">
            <p className="title">MOBILE APP</p>
            <a target="_blank" href="#" title="Apple App">
              <img className="iconApp" src="apple-logo.png" width="20" />
            </a>
            <a target="_blank" href="#" title="Android App">
              <img className="iconApp" src="android-logo.png" width="20" />
            </a>
          </div>
        </div>
        <hr />
        <div>
          <span>©2021 All rights reserved</span>
        </div>
      </div>
    </div>
  );
}
