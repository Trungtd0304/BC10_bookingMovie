import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM } from "../types/QuanLyPhimType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const layDanhSachPhimAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyPhimService.layDanhSachPhim();
      // đưa lên reducers
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrPhim: result.data.content,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error", error.response?.data);
    }
  };
};
