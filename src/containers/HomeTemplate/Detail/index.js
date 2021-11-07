import React, { useEffect } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { layThongTinChiTietPhim } from "../../../redux/actions/QuanLyRapAction";
import moment from "moment";
import { Rate } from "antd";
import { NavLink } from "react-router-dom";
import Navbar from "../_components/Navbar";

export default function Detail(props) {
  const filmDetail = useSelector((state) => state.QuanLyRapReducer.filmDetail);
 
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    //lay thong tin param tu url
    let { id } = props.match.params;

    dispatch(layThongTinChiTietPhim(id));
  }, []);

  const { TabPane } = Tabs;
  const percentage = filmDetail.danhGia;
  return (
    <React.Fragment>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${filmDetail.hinhAnh}), url(../anh1.png)`,
          backgroundSize: "100%",
          backgroundPosition: "center",
        }}
      >
        {/* thong tin */}
        <CustomCard
          style={{ paddingTop: 100, minHeight: "100vh" }}
          effectColor="#656a6d" // required
          color="#14AEFF" // default color is white
          blur={60} // default blur value is 10px
          borderRadius={0} // default border radius value is 10px
        >
          <div className="row mt-4">
            <div className="col-2"></div>
            <div className="col-6">
              <div className="row">
                <div
                  className="col-5"
                  // style={{
                  //   backgroundImage: `url(${filmDetail.hinhAnh}), url(https:picsum.photos/1000/202)`,
                  //   backgroundSize: "100%",
                  //   backgroundPosition: "center",
                  // }}
                >
                  <img
                    src={filmDetail.hinhAnh}
                    style={{ width: 200, height: 300 }}
                    onError={(e) => {
                      e.target.onError = null;
                      e.target.src = "../anh1.png";
                    }}
                  />
                </div>
                <div className="col-6 ml-2 my-auto text-light ml-3">
                  <p>
                    Ngày chiếu:{" "}
                    {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
                  </p>
                  <p style={{ fontSize: 40 }}>{filmDetail.tenPhim}</p>
                </div>
              </div>
            </div>
            <div className="col-4 ">
              <div style={{ width: 150, height: 150 }} className="text-center">
                <h2 style={{ color: "#3e98c7" }}>Đánh giá</h2>
                <h2>
                  <Rate
                    allowHalf
                    value={filmDetail.danhGia / 2}
                    style={{ color: "#3e98c7" }}
                  />
                </h2>
                <CircularProgressbar
                  value={percentage}
                  maxValue={10}
                  text={`${percentage}`}
                />
              </div>
            </div>
            <div className="col-1"></div>
          </div>

          {/* table lich chieu ... */}
          <div className="mt-5 container ">
            <Tabs
              defaultActiveKey="1"
              centered
              className="text-white"
              style={{ fontWeight: "bold", minHeight: 300 }}
            >
              <TabPane
                tab="Lịch chiếu"
                key="1"
                style={{ fontWeight: "normal" }}
              >
                {/* tab he thong rap va lich chieu */}
                <Tabs tabPosition={"left"}>
                  {filmDetail.heThongRapChieu?.map((item, index) => {
                    return (
                      <TabPane
                        tab={
                          <div>
                            <img
                              src={item.logo}
                              width={30}
                              height={30}
                              alt={item.logo}
                            />
                          </div>
                        }
                        key={index}
                      >
                        {/* load ht rap */}
                        {item.cumRapChieu?.map((cumRap, index) => {
                          return (
                            <div key={index}>
                              <div
                                className="my-2 row text-white"
                                stype={{ display: "flex" }}
                              >
                                <img
                                  className="col-1"
                                  src={cumRap.hinhAnh}
                                  style={{ width: "40px", height: "40px" }}
                                />
                                <div className="col-3">
                                  <p
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {cumRap.tenCumRap}
                                  </p>
                                  <p style={{ fontSize: "10px" }}>
                                    {cumRap.diaChi}
                                  </p>
                                </div>
                                <div className="col-8">
                                  {/* load rap chiếu */}
                                  <div className="row">
                                    {cumRap.lichChieuPhim
                                      ?.slice(0, 6)
                                      .map((lichChieu, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="col-3 mx-1"
                                          >
                                            <button
                                              className="btn btn-success m-1 "
                                              style={{
                                                width: "150px",
                                                padding: "0",
                                              }}
                                            >
                                              <NavLink
                                                to={`/checkout/${lichChieu.maLichChieu}`}
                                                className="text-white"
                                              >
                                                {moment(
                                                  lichChieu.ngayChieuGioChieu
                                                ).format("DD/MM/YY hh:mm A")}
                                              </NavLink>
                                            </button>
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </TabPane>
              <TabPane tab="Thông tin" key="2">
                <div className="container ">
                  <h2 className="text-white">Tên phim: </h2>
                  <h2 className="text-white">{filmDetail.tenPhim}</h2>
                  <p>Mô tả:</p>
                  <p> {filmDetail.moTa}</p>
                </div>
              </TabPane>
              <TabPane tab="Đánh giá" key="3">
                Đánh giá
              </TabPane>
            </Tabs>
          </div>
        </CustomCard>
      </div>
    </React.Fragment>
  );
}
