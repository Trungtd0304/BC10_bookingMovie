import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  datGheAction,
  datVeAction,
  layChiTietPhongVeAction,
} from "../../../redux/actions/QuanLyDatVeAction";
import { CloseOutlined, UserOutlined, SmileOutlined } from "@ant-design/icons";
import "./checkout.css";
import "./ghe.css";
import _ from "lodash";
import moment from "moment";

import { Fragment } from "react";
import {
  CHANGE_TAB_ACTIVE,
  DAT_GHE,
} from "../../../redux/types/QuanLyDatVeType";
import { ThongTinDatVe } from "../../../_core/models/ThongTinDatVe";
import { Tabs } from "antd";
import { layThongTinNguoiDungAction } from "../../../redux/actions/QuanLyNguoiDungAction";
import { connection } from "../../../index";
import { history } from "../../../App";
import { TOKEN, USER_LOGIN } from "../../../util/setting/config";

//tạo hàm component đặt vé
function Checkout(props) {
  //Gọi dữ liệu từ redux
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.QuanLyDatVeReducer);

  //Gọi hàm dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    //Gọi hàm tạo ra 1 async function
    const action = layChiTietPhongVeAction(props.match.params.id);
    //Dispatch function này đi
    dispatch(action);

    //Có 1 client nào thực hiện việc đặt vé thành công mình sẽ load lại danh sách phòng vé của lịch chiếu đó
    connection.on("datVeThanhCong", () => {
      dispatch(action);
    });

    //Vừa vào trang load tất cả ghế của các người khác đang đặt
    connection.invoke("loadDanhSachGhe", props.match.params.id);

    //load danh sach ghe dang dat ve (lắng nghe tín hiệu từ server trả về)

    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      //Bước 1: Loại mình ra khỏi danh sách
      dsGheKhachDat = dsGheKhachDat.filter(
        (item) => item.taiKhoan !== userLogin.taiKhoan
      );
      //Bước 2 gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);

        return [...result, ...arrGhe];
      }, []);

      //Đưa dữ liệu ghế khách đặt cập nhật redux
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");

      //Đưa dữ liệu ghế khách đặt về redux
      dispatch({
        type: DAT_GHE,
        arrGheKhachDat,
      });
    });

    //Cài đặt sự kiện khi reload trang
    window.addEventListener("beforeunload", clearGhe);

    //return sự kiện huỷ đặt vé
    return () => {
      clearGhe();
      window.removeEventListener("beforeunload", clearGhe);
    };
  }, []);

  //tao sự kiện clear ghe (huỷ đặt) (f5)
  const clearGhe = function (event) {
    connection.invoke("huyDat", userLogin.taiKhoan, props.match.params.id);
  };

  //tạo biến để lưu thông tin đặt vé
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
  //tạo hàm render ghế
  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      //đặt biến lấy điều kiện css
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      let indexGheDangDat = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      let classGheDaDatByUser = "";

      //kiểm tra từng ghế render có phải ghế khách đặt hay ko
      let classGheKhachDat = "";
      let indexGheKD = danhSachGheKhachDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );
      if (indexGheKD !== -1) {
        classGheKhachDat = "gheKhachDat";
      }

      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDatByUser = "gheDaDuocDat";
      }
      if (indexGheDangDat !== -1) {
        classGheDangDat = "gheDangDat";
      }
      //return ghế và css
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              const action = datGheAction(ghe, props.match.params.id);

              dispatch(action);
            }}
            disabled={ghe.daDat || classGheKhachDat !== ""}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDatByUser} ${classGheKhachDat}`}
          >
            {ghe.daDat ? (
              classGheDaDatByUser !== "" ? (
                <UserOutlined />
              ) : (
                <CloseOutlined />
              )
            ) : classGheKhachDat !== "" ? (
              <SmileOutlined />
            ) : (
              ghe.stt
            )}
          </button>
          {/* tính số ghế 1 dòng */}
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  //tạo hàm render thông tin phòng vé
  return (
    <div className="container-fluid">
      <div className="row">
        {/* bên trái dùng làm mà hình và render ghế */}
        <div className="col-md-8">
          <div className="flex justify-center ">
            {/* màn hình */}
            <div className="screen"></div>
            <div className="trapezoid">
              <h3 className="text-center mt-2">Màn hình</h3>
            </div>
            {/* render ghế */}
            <div className="text-center">{renderSeats()}</div>
          </div>
        </div>
        {/* bên phải tạo thông tin về phim và đặt vé */}
        <div className="col-md-4 min-vh-100">
          {/* <h3 className="text-success text-center">
            {danhSachGheDangDat
              .reduce((tongTien, ghe, index) => {
                return (tongTien += ghe.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            đ
          </h3> */}
          <hr />
          {/* tên phim và thông tin phòng vé  */}
          <h3>{thongTinPhim.tenPhim}</h3>
          <p>Địa điểm: {thongTinPhim.tenCumRap}</p>
          <p>
            Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}-{" "}
            {thongTinPhim.tenRap}
          </p>
          <hr />
          {/* thông tin vé đặt và giá tiền  */}
          <div className="row my-2" style={{ fontSize: "30px" }}>
            <div className="col-md-6">
              <span className="text-danger">Ghế:</span>
            </div>
            <div className="col-md-6 text-right">
              <span className="text-success">
                {danhSachGheDangDat
                  .reduce((tongTien, ghe, index) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}{" "}
                đ
              </span>
            </div>
            <div className="ml-3">
              {_.sortBy(danhSachGheDangDat, ["stt"]).map((ghe, index) => {
                return (
                  <span key={index} className="text-success mx-2">
                    {ghe.stt}
                    {(index + 1) % 10 === 0 ? <br /> : ""}
                  </span>
                );
              })}
            </div>
          </div>
          <hr />
          <div>
            <i>E-mail</i>
            <br />
            <span>{userLogin.email}</span>
          </div>
          <hr />
          <div>
            <i>Phone</i>
            <br />
            <span>{userLogin.soDT}</span>
          </div>
          <hr />
          <div>
            {/* thông tin và màu ghế */}
            <p>
              Ghế chưa đặt
              <button
                className="ghe text-center"
                style={{ width: "15px", height: "15px", margin: "0 15px" }}
              ></button>
            </p>
            <p>
              Ghế đang đặt
              <button
                className="ghe gheDangDat text-center"
                style={{ width: "15px", height: "15px", margin: "0 15px" }}
              ></button>
            </p>
            <p>
              Ghế vip
              <button
                className="ghe gheVip text-center"
                style={{ width: "15px", height: "15px", margin: "0 15px" }}
              ></button>
            </p>
            <p>
              Ghế đã đặt{" "}
              <button
                className="ghe text-center gheDaDat"
                style={{ width: "15px", height: "15px", margin: "0 15px" }}
              ></button>
            </p>
            <p>
              Ghế mình đặt{" "}
              <button
                className="ghe text-center gheDaDuocDat"
                style={{ width: "15px", height: "15px", margin: "0 15px" }}
              ></button>
            </p>
            <p>
              Ghế khách đang đặt{" "}
              <button
                className="ghe text-center gheKhachDat"
                style={{ width: "15px", height: "15px", margin: "0 15px" }}
              ></button>
            </p>
          </div>
          {/* nút đặt vé */}
          <div className=" text-center">
            <button
              className="btn btn-primary mb-3 flex flex-col"
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                dispatch(datVeAction(thongTinDatVe));
              }}
            >
              ĐẶT VÉ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//tạo hàm lịch sử đặt vé
function KetQuaDatVe(props) {
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  useEffect(() => {
    const action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);

  console.log("thongTinNguoiDung", thongTinNguoiDung);

  const renderTicketsItem = function () {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);
      return (
        <div className="col-lg-4 col-md-6 col-sm-12 my-2" key={index}>
          <div className="row">
            <div className="col-4">
              <img
                src={ticket.hinhAnh}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = "../anh1.png";
                }}
                style={{ width: "100px", height: "150px" }}
              />
            </div>
            <div className="col-8">
              <h6>{ticket.tenPhim}</h6>
              <p>
                <span className="font-bold">Giờ chiếu:</span>{" "}
                {moment(ticket.ngayDat).format("hh:mm A")} -{" "}
                <span className="font-bold">Ngày chiếu:</span>{" "}
                {moment(ticket.ngayDat).format("DD-MM-YYYY")} .
              </p>
              <p>
                <span className="font-bold">Địa điểm:</span>{" "}
                {seats.tenHeThongRap}
              </p>
              <p>
                <span className="font-bold">Tên rạp:</span> {seats.tenCumRap} -{" "}
                <span className="font-bold">Ghế:</span>{" "}
                {ticket.danhSachGhe.map((ghe, index) => {
                  return <span key={index}> {ghe.tenGhe}, </span>;
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container p-5">
      <h3 className="text-center text-success">Kết quả đặt vé</h3>
      <p className="text-center">
        Vui lòng xem thông tin và thời gian vé đã đặt để đến đúng giờ nhe bạn!
      </p>
      <hr />
      <div className="row">
        {renderTicketsItem()}
        {/* <div className="col-lg-4 col-md-6 col-sm-12 my-2">
          <div className="row">
            <div className="col-4">
              <img
                src="https:picsum.photos/1000/202"
                style={{ width: "100px", height: "150px" }}
              />
            </div>
            <div className="col-8">
              <h3>Lat mat</h3>
              <p>Giờ chiếu:</p>
              <p>Địa điểm:</p>
              <p>Tên rạp:</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

// sử dụng antd tạo thông tin 2 tab đặt vé và kết quả đặt vé
const { TabPane } = Tabs;

function callback(key) {}

//hàm chính để render ra các giá trị của các giá trị đặt vé
export default function (props) {
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <Fragment>
          <button
            className="btn btn-success mr-2"
            onClick={() => {
              history.push("/");
              window.location.reload();
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              history.push("/");
              window.location.reload();
            }}
            className="btn btn-primary"
          >
            Đăng xuất
          </button>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );

  return (
    <div className="p-2">
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({ type: CHANGE_TAB_ACTIVE, number: key });
        }}
      >
        <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
}
