import { useState } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onSubmitHandle = (event) => {
    event.preventDefault();
    axios
      .post("user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("currentRole", res.data.data.user.role);
        navigate("/" + localStorage.getItem("currentRole"));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-600 to-violet-600 flex">
      <form
        onSubmit={onSubmitHandle}
        className="m-auto justify-center max-w-fit bg-white rounded-xl overflow-hidden"
      >
        <p className="text-5xl font-bold px-24 pt-5 pb-8 border-b-2 border-slate-300 ">
          Đăng nhập
        </p>
        <input
          type={"email"}
          placeholder="Username"
          value={email}
          onChange={onChangeEmail}
          className=" m-auto block px-8 w-3/4 py-3  mt-8 mb-10 border-b-2 border-blue-900"
        />
        <input
          type={"password"}
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
          className="m-auto block px-8 w-3/4 py-3 mb-16 focus:border-none border-b-2 border-blue-900"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white text-lg rounded-xl px-24 py-3 m-auto block"
        >
          Đăng Nhập
        </button>
        <p className="block m-auto mt-6 mb-8 px-24">
          Bạn chưa có tài khoản ?{" "}
          <Link to="/signup" className="text-rose-600">
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
