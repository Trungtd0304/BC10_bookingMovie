import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MultipleRows from "../../_components/ReactSlick/MultipleRowSlick";
//react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { layDanhSachPhimAction } from "../../../../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../../../../redux/actions/QuanLyRapAction";
import HomeMenu from "../HomeMenu/HomeMenu";

export default function Home(props) {
  const { arrPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    //dispatch tu thunk
    dispatch(layDanhSachHeThongRapAction());
  }, []);

  return (
    <>
      <div className="mt-3 container">
        <MultipleRows arrPhim={arrPhim} />
        {/* <div className="card-group">{renderFilms()}</div> */}
      </div>
      <div className="container">
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </>
  );
}
