import {
  SET_HE_THONG_RAP_CHIEU,
  SET_CHI_TIET_PHIM,
} from "../types/QuanLyRapType";

const stateDefault = {
  heThongRapChieu: [],
  filmDetail: {},
};

export const QuanLyRapReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_HE_THONG_RAP_CHIEU: {
      state.heThongRapChieu = action.heThongRapChieu;
      return { ...state };
    }

    case SET_CHI_TIET_PHIM: {
      state.filmDetail = action.filmDetail;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
