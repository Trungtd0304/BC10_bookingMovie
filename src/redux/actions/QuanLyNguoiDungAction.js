import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import {
  DANG_NHAP_ACTION,
  SET_THONG_TIN_NGUOI_DUNG,
} from "../types/QuanLyNguoiDungType";
import { history } from "../../App";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
        //chuyen huong ve trang truoc do
        history.goBack();
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error", error.response.data);
    }
  };
};
export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();

      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error", error.response.data);
    }
  };
};

export const dangKyAction = (thongTinDangKy) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      alert(error.response.data.content);
    }
  };
};
