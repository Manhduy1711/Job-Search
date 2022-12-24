import axios from "./../../axios";
import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

function AdminListJobs() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("job")
      .then((res) => {
        setData(res.data.jobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onChangeHandle = (event) => {
    setSearch(event.target.value);
  };
  const onSubmitHandle = (event) => {
    event.preventDefault();
    localStorage.setItem("searchTerm", search);
    setSearch("");
    navigate("/candidate/result");
  };
  const onClickHandle = (event, value) => {
    axios
      .patch("job/" + value, {
        status: event.target.name,
      })
      .then((res) => {
        axios
          .get("job")
          .then((res) => {
            setData(res.data.jobs);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
  return (
    <div className=" rounded-md flex-grow ml-4">
      <div className="w-full flex pb-4">
        <form onSubmit={onSubmitHandle} className="relative w-4/5 ml-20 mt-4">
          <BiSearchAlt2 className="absolute text-2xl top-3 ml-2  left-4 text-slate-500" />
          <input
            name="search"
            value={search}
            placeholder={"Tìm kiếm công việc"}
            onChange={onChangeHandle}
            className="w-full h-12 rounded ml-3 pl-10"
          />
        </form>
      </div>
      <div className="bg-white mr-16 border-2 m-4 rounded-xl h-fit">
        <table className="w-11/12 h-fit m-auto ">
          <tr className="text-left">
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Tiêu đề
            </th>
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Trạng thái
            </th>
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              <button name="Đã duyệt" onClick={onClickHandle}>
                Duyệt
              </button>
            </th>
            <th className="text-pink-600 font-medium text-lg">
              <button name="Đã từ chối" onClick={onClickHandle}>
                Không Duyệt
              </button>
            </th>
          </tr>
          {data.map((el) => (
            <tr>
              <Link to={"/job/" + el._id}>
                <td className="py-3 px-2 w-64">{el.title}</td>
              </Link>
              <td className="py-3 px-2">{el.status}</td>
              <td className="py-3 px-2">
                <button
                  name="Đã duyệt"
                  onClick={(event) => onClickHandle(event, el._id)}
                >
                  Duyệt
                </button>
              </td>
              <td className="py-3 px-2">
                <button
                  name="Đã từ chối"
                  onClick={(event) => onClickHandle(event, el._id)}
                >
                  Không Duyệt
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
export default AdminListJobs;
