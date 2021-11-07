import { quanLyRapService } from "../../services/QuanLyRapService";
import {
  SET_CHI_TIET_PHIM,
  SET_HE_THONG_RAP_CHIEU,
} from "../types/QuanLyRapType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const layDanhSachHeThongRapAction = () => {
  return async (dispatch) => {
    dispatch(displayLoadingAction);
    try {
      const result = await quanLyRapService.layDanhSachHeThongRap();
      if (result.status === 200) {
        dispatch({
          type: SET_HE_THONG_RAP_CHIEU,
          heThongRapChieu: result.data.content,
        });
      }
      dispatch(hideLoadingAction);
    } catch (err) {
      dispatch(hideLoadingAction);
      console.log(err);
    }
  };
};

export const layThongTinChiTietPhim = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyRapService.layThongTinLichChieuPhim(id);
      //dua du lieu len reducer
      dispatch({
        type: SET_CHI_TIET_PHIM,
        filmDetail: result.data.content,
      });
      dispatch(hideLoadingAction);
    } catch (err) {
      dispatch(hideLoadingAction);
      console.log(err);
    }
  };
};
