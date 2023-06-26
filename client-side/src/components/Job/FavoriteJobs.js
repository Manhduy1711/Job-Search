import axios from "../../axios";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

function FavoriteJobs() {
  const [data, setData] = useState([]);
  const deleteFavoriteJob = (event, id) => {
    event.preventDefault();
    axios.delete("user/favorite/" + id);
    axios
      .get("user/me")
      .then((res) => {
        setData(res.data.user.favoriteJobs);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("user/me")
      .then((res) => {
        setData(res.data.user.favoriteJobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-white rounded-md h-fit flex-grow ml-4">
      <div className="border-2 m-4 rounded-xl h-fit">
        <table className="w-11/12 h-fit m-auto ">
          <tr className="text-left">
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Tiêu đề
            </th>
            <th className="text-pink-600 py-3 px-2 font-medium text-lg">
              Hạn nộp hồ sơ
            </th>
            <th className="text-pink-600 font-medium text-lg">Thao tác</th>
          </tr>
          {data.map((el) => (
            <tr>
              <Link to={"/job/" + el._id}>
                <td className="py-3 px-2">{el.title}</td>
              </Link>
              <td className="py-3 px-2">{el.deadline.slice(0, 10)}</td>
              <td className="py-3 px-2">
                <RiDeleteBin6Line
                  onClick={(event) => deleteFavoriteJob(event, el._id)}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
export default FavoriteJobs;
