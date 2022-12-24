import axios from "./../axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Signup() {
  const [newAcc, setNewAcc] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "",
  });
  const onSubmitHandle = (event) => {
    event.preventDefault();
    axios
      .post("/user/signup", {
        username: newAcc.username,
        email: newAcc.email,
        password: newAcc.password,
        passwordConfirm: newAcc.passwordConfirm,
        role: newAcc.role,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeInput = (event) => {
    setNewAcc((preVale) => ({
      ...preVale,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className="h-screen bg-gradient-to-r from-indigo-600 to-violet-600 flex">
      <form
        onSubmit={onSubmitHandle}
        className="m-auto max-w-fit bg-white rounded-xl overflow-hidden"
      >
        <div className="flex justify-center">
          <p className="text-5xl font-bold pt-5 pb-8 px-24 border-b-2 border-slate-300 ">
            Đăng ký
          </p>
        </div>
        <input
          type={"text"}
          name="username"
          placeholder="Tên tài khoản"
          value={newAcc.username}
          onChange={onChangeInput}
          className="m-auto block px-8 w-3/4 py-3 mt-2 mb-6 focus:border-none border-b-2 border-blue-900"
        />
        <input
          type={"email"}
          name="email"
          placeholder="email"
          value={newAcc.email}
          onChange={onChangeInput}
          className=" m-auto block px-8 w-3/4 py-3  mt-6 mb-6 border-b-2 border-blue-900"
        />
        <input
          type={"password"}
          name="password"
          placeholder="Mật khẩu"
          value={newAcc.password}
          onChange={onChangeInput}
          className="m-auto block px-8 w-3/4 py-3 mb-6 focus:border-none border-b-2 border-blue-900"
        />
        <input
          type={"password"}
          name="passwordConfirm"
          placeholder="Xác nhận mật khẩu"
          value={newAcc.passwordConfirm}
          onChange={onChangeInput}
          className="m-auto block px-8 w-3/4 py-3 mb-6 focus:border-none border-b-2 border-blue-900"
        />
        <div className="flex justify-center items-center mb-12">
          <p className="mr-12">Bạn là một : </p>
          <select
            value={newAcc.role}
            name="role"
            onChange={onChangeInput}
            className="border-2 px-4 py-2 hover:border-indigo-900"
          >
            <option value={"candidate"}>Ứng viên</option>
            <option value={"hr"}>Nhà tuyển dụng</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white text-lg rounded-xl px-24 py-3 m-auto block"
        >
          Đăng Ký
        </button>
        <p className="block m-auto mt-6 mb-8 px-24">
          Bạn đã có tài khoản ?{" "}
          <Link to="/login" className="text-red-600">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Signup;
