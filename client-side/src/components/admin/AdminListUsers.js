import axios from "./../../axios";
import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function AdminListUsers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const onChangeHandle = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    axios.get("user").then((res) => {
      setData(res.data.users);
    });
  });
  const onSubmitHandle = (event) => {
    event.preventDefault();
    localStorage.setItem("searchTerm", search);
    setSearch("");
    navigate("/candidate/result");
  };
  return (
    <div className=" rounded-md flex-grow ml-4">
      <div className="w-full flex pb-4">
        <form onSubmit={onSubmitHandle} className="relative w-4/5 ml-20 mt-4">
          <BiSearchAlt2 className="absolute text-2xl top-3 ml-2  left-4 text-slate-500" />
          <input
            name="search"
            value={search}
            placeholder={"Tìm kiếm người dùng"}
            onChange={onChangeHandle}
            className="w-full h-12 rounded ml-3 pl-10"
          />
        </form>
      </div>
      <div className="bg-white mr-16 border-2 m-4 rounded-xl h-fit">
        <table className="w-11/12 h-fit m-auto ">
          <tr className="text-left">
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Tên tài khoản
            </th>
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Email
            </th>
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Vô hiệu quá
            </th>
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Gỡ vô hiệu quá
            </th>
          </tr>
          {data
            .filter((el) => el.role !== "admin")
            .map((user) => (
              <tr className="text-left">
                <td className=" py-3 px-2">{user.username}</td>
                <td className=" py-3 px-2">{user.email}</td>
                <td className=" py-3 px-2">
                  {user.status !== false ? "Hoạt động" : "Bị vô hiệu hóa"}
                </td>
                <td className=" py-3 px-2">Vô hiệu quá</td>
                <td className=" py-3 px-2">Gỡ vô hiệu quá</td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}
export default AdminListUsers;
