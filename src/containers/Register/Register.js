import React from "react";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { GROUPID } from "../../util/setting/config";
import { dangKyAction } from "../../redux/actions/QuanLyNguoiDungAction";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";

export default function Register(props) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: `${GROUPID}`,
      maLoaiNguoiDung: "KhachHang",
      hoTen: "",
    },

    onSubmit: (values) => {
      const action = dangKyAction(values);
      dispatch(action);
      console.log(values);
    },
  });

  return (
    <div className="row">
      <div className="col-md-6 bg-light">
        <div className="login d-flex align-items-center py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-7 mx-auto">
                <h3 className="display-4">Sign Up</h3>
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group mb-3">
                    <label>Name</label>
                    <input
                      id="inputHoTen"
                      name="hoTen"
                      type="text"
                      value={formik.values.hoTen}
                      onChange={formik.handleChange}
                      placeholder="Full name"
                      className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Account</label>
                    <input
                      id="inputTaiKhoan"
                      type="text"
                      name="taiKhoan"
                      placeholder="Account"
                      value={formik.values.taiKhoan}
                      onChange={formik.handleChange}
                      className="form-control rounded-pill border-0 shadow-sm px-4"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      id="inputPassword"
                      name="matKhau"
                      type="text"
                      placeholder="Password"
                      value={formik.values.matKhau}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.password &&
                        formik.touched.password &&
                        "error"
                      }
                      className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                    />
                    {formik.errors.password && formik.touched.password && (
                      <div className="input-feedback">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      id="inputEmail"
                      name="email"
                      type="text"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Email"
                      className={`form-control rounded-pill border-0 shadow-sm px-4 text-primary ${
                        formik.errors.email && formik.touched.email && "error"
                      }`}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <div className="input-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label>Phone number</label>
                    <input
                      id="inputSoDT"
                      name="soDt"
                      type="text"
                      value={formik.values.soDt}
                      onChange={formik.handleChange}
                      placeholder="Phone number"
                      className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                    />
                  </div>
                  <NavLink to="/login">
                    <button className="btn btn-dark text-uppercase mb-2 mr-5 rounded-pill shadow-sm">
                      Sign In
                    </button>
                  </NavLink>

                  <button
                    type="submit"
                    className="btn btn-primary text-uppercase mb-2 rounded-pill shadow-sm"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 d-none d-md-flex bg-image"></div>
    </div>
  );
}
