import axios from "../../axios";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

function AppliedJob() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("apply/applied")
      .then((res) => {
        console.log(res.data.applies);
        setData(res.data.applies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-white rounded-md flex-grow ml-4">
      <div className="border-2 m-4 rounded-xl h-fit">
        <table className="w-11/12 h-fit m-auto ">
          <tr className="text-left">
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Tiêu đề
            </th>
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Trạng thái
            </th>
            <th className="text-pink-600 font-medium text-lg">Thao tác</th>
          </tr>
          {data.map((apply) => (
            <tr>
              <Link to={"/job/" + apply.job._id}>
                <td className="py-3 px-2">{apply.job.title}</td>
              </Link>
              <td className="py-3 px-2">{apply.status}</td>
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

export default AppliedJob;
