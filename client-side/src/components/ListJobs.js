import axios from "./../axios";
import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

function ListJobs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/user/me")
      .then((res) => {
        console.log(res.data.user.createdJobs);
        setData(res.data.user.createdJobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="bg-white rounded-md flex-grow ml-4">
      <div className="w-full flex pb-4 border-b-2">
        <p className="text-3xl font-medium px-4 mt-4">Danh sách công việc</p>
        <Link to="/jobhr/createJob">
          <button className="px-8 py-3 bg-indigo-800 text-white text-lg font-medium rounded-lg h-fit flex items-center mt-3">
            <FiPlusCircle className="mr-2" size={"1.5rem"} />
            Tạo công việc
          </button>
        </Link>
      </div>
      <div className="border-2 m-4 rounded-xl">
        <table className="w-11/12 h-fit m-auto ">
          <tr className="text-left">
            <th className="text-pink-600 py-3 px-2 font-medium text-lg w-80">
              Tiêu đề
            </th>
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Thời gian tạo
            </th>
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Hạn nộp
            </th>
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Số lượng tuyển
            </th>
            <th className="text-pink-600 font-medium text-lg">Thao tác</th>
          </tr>
          {data.map((el) => (
            <tr>
              <td className="py-3 px-2">{el.title}</td>
              <td className="py-3 px-2">{el.createdAt.slice(0, 10)}</td>
              <td className="py-3 px-2">{el.deadline.slice(0, 10)}</td>
              <td className="py-3 px-2">{el.quantity}</td>
              <td className="py-3 px-2">
                <RiDeleteBin6Line />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
export default ListJobs;
