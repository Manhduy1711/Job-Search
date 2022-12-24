import axios from "./../axios";
import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

function Detail(props) {
  const navigate = useNavigate();
  const [job, setJob] = useState({});
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("/job/" + id)
      .then((res) => {
        setUser(res.data.job.createdBy);
        setJob(res.data.job);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const applyHandle = () => {
    axios
      .post("apply/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addFavoriteHandle = () => {
    axios
      .patch("user/favorite/" + id)
      .then((res) => {
        navigate("/jobcandidate/favoriteJobs");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="h-screen">
      <div className="rounded-md bg-white  mt-4 py-4 w-4/5 m-auto px-6 flex">
        <div className="w-3/4 ml-12">
          <p className="text-2xl text-indigo-900 font-bold px-12 ">
            {job.title}
          </p>
          <p className="text-2xl  font-semibold mt-2 px-12">{job.company}</p>
          <p className="text-lg  text-slate-700 mt-2 px-12">
            Hạn nộp hồ sơ: {job.deadline}
          </p>
        </div>
        {localStorage.getItem("currentRole") !== "admin" ? (
          <div className="mt-2">
            <button
              onClick={applyHandle}
              className="w-60 pl-5 pt-2 pb-3 text-lg  bg-pink-400 relative text-white rounded-md"
            >
              <FaPaperPlane className="absolute left-8 top-3" />
              Ứng tuyển ngay
            </button>
            <button
              onClick={addFavoriteHandle}
              className="w-60 pl-5 pt-2 pb-3 text-lg  border-2 mt-4 border-pink-400 relative text-indigo-900 rounded-md"
            >
              <FaPaperPlane className="absolute left-8 top-3" />
              Lưu tin
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex mt-4 m-auto w-4/5">
        <div className="rounded-md bg-white py-4 px-6 flex-grow">
          <p className="text-3xl font-bold px-4 border-l-8 border-l-indigo-900">
            Chi tiết tuyển dụng
          </p>
          <div className="bg-indigo-100 mt-5 rounded-md p-3">
            <p className="underline text-lg mb-2 font-medium">
              Thông tin chung
            </p>
            <div className="flex">
              <div className="mr-20">
                <div className="mb-2">
                  <h3 className="text-indigo-900 font-medium">Mức lương</h3>
                  <p>{job.salaryRange}</p>
                </div>

                <div lassName="mb-2">
                  <h3 className="text-indigo-900 font-medium">Cấp bậc</h3>
                  <p>{job.level}</p>
                </div>
              </div>
              <div>
                <div lassName="mb-2">
                  <h3 className="text-indigo-900 font-medium">Kinh nghiệm</h3>
                  <p>{job.experience}</p>
                </div>
                <div lassName="mb-2">
                  <h3 className="text-indigo-900 font-medium">
                    Số lượng tuyển
                  </h3>
                  <p>{job.quantity}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white w-1/5 ml-4">
          <div className=" h-60 rounded-2xl bg-white overflow-hidden">
            <img
              src={user.photoCover}
              alt="cover"
              className="h-20 w-full object-cover"
            />
            <img
              className="rounded-full w-16 h-16 object-cover m-auto relative bottom-10 shadow-slate-600 shadow-lg"
              src={user.photo}
              alt="avatar"
            />
            <p className="text-center text-xl font-medium relative bottom-8">
              {user.username}
            </p>
            <p className="text-center relative bottom-8">{user.email}</p>
            <Link
              to={"/cv/" + user._id}
              className="text-white flex justify-center mx-8 rounded-lg text-2xl bg-pink-500"
            >
              Xem hồ sơ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Detail;
