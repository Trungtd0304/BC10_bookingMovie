import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { dangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";

export default function Login(props) {
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      const action = dangNhapAction(values);
      dispatch(action);
      console.log("values", values);
    },
  });

  return (
    <div class="col-md-6 bg-light">
      <div class="login d-flex align-items-center py-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 col-xl-7 mx-auto">
              <h3 class="display-4">Login</h3>
              <form onSubmit={formik.handleSubmit}>
                <div class="form-group mb-3">
                  <input
                    id="inputTaiKhoan"
                    type="text"
                    name="taiKhoan"
                    onChange={formik.handleChange}
                    placeholder="Account"
                    required=""
                    autofocus=""
                    class="form-control rounded-pill border-0 shadow-sm px-4"
                  />
                </div>
                <div class="form-group mb-3">
                  <input
                    id="inputPassword"
                    name="matKhau"
                    onChange={formik.handleChange}
                    type="password"
                    placeholder="Password"
                    required=""
                    class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                  />
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input
                    id="customCheck1"
                    type="checkbox"
                    checked
                    class="custom-control-input"
                  />
                  <label for="customCheck1" class="custom-control-label">
                    Remember password
                  </label>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
