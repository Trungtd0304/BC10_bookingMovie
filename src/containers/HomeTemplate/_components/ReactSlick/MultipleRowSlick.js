import React from "react";
import Slider from "react-slick";
import Film from "../Film/Film";
import styleSlick from "./MultipleRowSlick.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../../../../redux/types/QuanLyPhimType";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    ></div>
  );
}

const MultipleRows = (props) => {
  const dispatch = useDispatch();
  const renderFilms = () => {
    return props.arrPhim.map((item, index) => {
      /**.slice(0, 16) cách chỉ show 16 bộ phim */
      return (
        <div className={`${styleSlick["width-item"]}`} key={index}>
          <Film phim={item} />
        </div>
      );
    });
  };

  // css cho button dang chieu va sap chieu
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3.2,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <div className="text-center">
        <button
          className={`${styleSlick[activeClassDC]} btn  mr-1 mb-2`}
          onClick={() => {
            const action = { type: SET_FILM_DANG_CHIEU };
            dispatch(action);
          }}
        >
          PHIM ĐANG CHIẾU
        </button>
        <button
          className={`${styleSlick[activeClassSC]} btn  mb-2`}
          onClick={() => {
            const action = { type: SET_FILM_SAP_CHIEU };
            dispatch(action);
          }}
        >
          PHIM SẮP CHIẾU
        </button>
      </div>
      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
};

export default MultipleRows;
