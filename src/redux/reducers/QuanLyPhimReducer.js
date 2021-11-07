import {
  SET_DANH_SACH_PHIM,
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../types/QuanLyPhimType";

const stateDefault = {
  arrPhim: [
    {
      maPhim: 1322,
      tenPhim: "John Wick II",
      biDanh: "john-wick-ii",
      trailer: "https://www.youtube.com/embed/XGk2EfbD_Ps",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/john-wick-ii_gp09.jpeg",
      moTa: "Mạng đổi mạng là một bộ phim hành động Mỹ sản xuất năm 2014, được đạo diễn bởi Chad Stahelski. Phim có sự tham gia của các diễn viên Keanu Reeves, Michael Nyqvist, Alfie Allen, Adrianne Palicki, Bridget Moynahan, Ian McShane, Willem Dafoe, John Leguizamo và Dean Winters",
      maNhom: "GP09",
      ngayKhoiChieu: "2021-08-28T20:55:10.05",
      danhGia: 10,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
  ],
  dangChieu: true,
  sapChieu: true,
  arrPhimDefault: [],
  
};

export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM: {
      state.arrPhim = action.arrPhim;
      state.arrPhimDefault = state.arrPhim;

      return { ...state };
    }

    case SET_FILM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;
      state.arrPhim = state.arrPhimDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    }
    case SET_FILM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;
      state.arrPhim = state.arrPhimDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    }
    default:
      return { ...state };
  }

};
