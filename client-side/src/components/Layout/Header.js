import { BiSearchAlt2 } from "react-icons/bi";
import { FaHome, FaShoppingBag } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const logOut = () => {
    navigate("/login");
  };
  const onChangeHandle = (event) => {
    setSearch(event.target.value);
  };
  const onSubmitHandle = (event) => {
    event.preventDefault();
    console.log("1");
    localStorage.setItem("searchTerm", search);
    setSearch("");
    navigate("/candidate/result");
  };
  let activeClass =
    "flex flex-col justify-center items-center pb-2 border-b-2 border-pink-400 text-indigo-900";
  return localStorage.getItem("currentRole") !== "admin" ? (
    <div className="w-full py-2 bg-white flex items-center">
      <img
        src="https://ungdung.mobi/wp-content/uploads/2021/09/Photoroom.png"
        alt="logo"
        width={"40px"}
        className="ml-28"
      />
      <form onSubmit={onSubmitHandle} className="relative">
        <BiSearchAlt2 className="absolute text-2xl top-1.5 left-4 text-slate-500" />
        <input
          name="search"
          value={search}
          onChange={onChangeHandle}
          className="w-80 h-9 rounded ml-3 bg-neutral-300 pl-8"
        />
      </form>
      <ul className="flex text-black ml-36">
        <li className="mx-8">
          <NavLink
            to={"/" + localStorage.getItem("currentRole")}
            className={(isActive) =>
              isActive
                ? activeClass
                : "flex flex-col justify-center items-center"
            }
            // className="flex flex-col justify-center items-center"
          >
            <FaHome size={"1.6rem"} />
            Trang chủ
          </NavLink>
        </li>
        <li className="mx-8">
          <NavLink
            to={"/job" + localStorage.getItem("currentRole")}
            className={({ isActive }) =>
              isActive
                ? activeClass
                : "flex flex-col justify-center items-center"
            }
          >
            <FaShoppingBag size={"1.6rem"} />
            Công việc
          </NavLink>
        </li>
        <li className="mx-8">
          <NavLink
            to="/cv"
            className={({ isActive }) =>
              isActive
                ? activeClass
                : "flex flex-col justify-center items-center"
            }
          >
            <CgProfile size={"1.6rem"} />
            Hồ sơ
          </NavLink>
        </li>
        <li className="flex justify-center items-center border-l-2 px-12">
          <p onClick={logOut}>Đăng xuất</p>
        </li>
      </ul>
    </div>
  ) : (
    ""
  );
}

export default Header;
