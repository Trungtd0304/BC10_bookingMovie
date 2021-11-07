import React, { useState } from "react";
import { Tabs } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";

const { TabPane } = Tabs;

const HomeMenu = (props) => {
  const [state, setState] = useState({
    tabPosition: "left",
  });
  const changeTabPosition = (e) => {
    setState({ tabPosition: e.target.value });
  };

  const { tabPosition } = state;
  const renderHeThongRap = () => {
    return props.heThongRapChieu.map((heThongRap, index) => {
      return (
        <TabPane
          tab={
            <img src={heThongRap.logo} className="rounded-circle" width="50" />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div style={{ width: "300px", display: "flex" }}>
                      <img src={cumRap.hinhAnh} width="50" />
                      <br />
                      <div className="ml-2">
                        {cumRap.tenCumRap}

                        <p className="text-danger text-left">Chi tiết</p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {/* Load phim */}
                  {cumRap.danhSachPhim.slice(0, 4).map((phim, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div className="my-2" style={{ display: "flex" }}>
                          <div style={{ display: "flex" }}>
                            <img
                              src={phim.hinhAnh}
                              width="50"
                              height="50"
                              onError={(e) => {
                                e.target.onError = null;
                                e.target.src = "anh1.png";
                              }}
                            />
                            <div className="ml-2">
                              <h6>
                                <NavLink to={`/detail/${phim.maPhim}`}>
                                  {phim.tenPhim}
                                </NavLink>
                              </h6>
                              <p>{cumRap.diaChi}</p>
                              <p className="row">
                                {phim.lstLichChieuTheoPhim
                                  ?.slice(0, 6)
                                  .map((item, index) => {
                                    return (
                                      <div key={index} className="col-3 mx-1">
                                        <button
                                          className="btn btn-success m-1"
                                          style={{
                                            width: "120px",
                                            padding: "0",
                                          }}
                                        >
                                          <NavLink
                                            to={`/checkout/${item.maLichChieu}`}
                                            className="text-white"
                                          >
                                            {moment(
                                              item.ngayChieuGioChieu
                                            ).format("hh:mm A")}
                                          </NavLink>
                                        </button>
                                      </div>
                                    );
                                  })}
                              </p>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </React.Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  return (
    <div className="mt-5 ">
      <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
    </div>
  );
};
export default HomeMenu;
