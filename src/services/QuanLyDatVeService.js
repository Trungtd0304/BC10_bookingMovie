import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { baseService } from "./baseService";

export class QuanLyDatVeService extends baseService {
  constructor() {
    super();
  }
  layChiTietPhongVe = (maLichChieu) => {
    //maLichChieu lấy từ api
    return this.get(
      `api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  };
  datVe = (thongTinDatVe = new ThongTinDatVe()) => {
    /* thongTinDatVe =  {
        "maLichChieu": 0,
        "danhSachVe": [
          {
            "maGhe": 0,
            "giaVe": 0
          }
        ]
      }*/
    return this.post("api/QuanLyDatVe/DatVe", thongTinDatVe);
  };
}

export const quanLyDatVeService = new QuanLyDatVeService();
