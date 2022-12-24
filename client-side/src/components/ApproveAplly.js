import axios from "./../axios";
import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { GrDislike, GrLike } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function ApproveApply() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("apply")
      .then((res) => {
        console.log(res.data.applies);
        setData(res.data.applies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onClickHandle = (event, value, status) => {
    event.preventDefault();
    console.log(status);
    axios
      .patch("apply/" + value, {
        status: status,
      })
      .then((res) => {
        axios
          .get("apply")
          .then((res) => {
            console.log(res.data.applies);
            setData(res.data.applies);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="bg-white rounded-md h-fit flex-grow ml-4">
      <div className="border-2 m-4 rounded-xl h-fit">
        <table className="w-11/12 h-fit m-auto ">
          <tr className="text-left">
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Công việc
            </th>
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Tên ứng viên
            </th>
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Trạng thái
            </th>
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              <button name="Đã duyệt" onClick={onClickHandle}>
                Thao tác
              </button>
            </th>
          </tr>
          {data.map((apply) => (
            <tr>
              <td className="py-3 px-2 w-64">{apply.job.title}</td>
              <td className="py-3 px-2">{apply.candidate.username}</td>
              <td className="py-3 px-2">{apply.status}</td>
              <td className="py-3 px-2 flex items-center">
                <GrDislike
                  onClick={(event) =>
                    onClickHandle(event, apply._id, "Đã duyệt")
                  }
                  className=" hover:bg-indigo-100 p-1 rounded"
                  size={"2rem"}
                />
                <GrLike
                  onClick={(event) =>
                    onClickHandle(event, apply._id, "Đã từ chối")
                  }
                  className="ml-5 hover:bg-indigo-100 p-1 rounded"
                  size={"2rem"}
                />
              </td>

              {/* <td className="py-3 px-2">
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
                </td> */}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
export default ApproveApply;
