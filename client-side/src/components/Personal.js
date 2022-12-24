import axios from "./../axios";
import { AiOutlineMail, AiTwotonePhone, AiOutlineHome } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Personal() {
  const [data, setData] = useState({});
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios
      .get("/user/" + (id ? id : "me"))
      .then((res) => {
        setData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="mx-20">
      <div className="bg-white rounded-xl mt-6 mb-6 overflow-hidden h-fit">
        <div className="bg-green-500 w-full h-32 relative">
          {data.role === localStorage.getItem("currentRole") ? (
            <Link to="/updatecv">
              <button className="bg-pink-500 px-4 py-3 absolute -bottom-16 right-12 text-xl text-white rounded-lg font-medium">
                Cập nhập hồ sơ
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
        <img
          src={data.photo}
          alt="avatar"
          className="rounded-full w-40 h-40 object-cover relative bottom-20 shadow-xl left-8"
        />
        <div className="relative bottom-12 left-8 h-fit">
          <p className="text-xl font-medium mb-1">{data.username}</p>
          <p className="flex items-center">
            <AiOutlineMail className="mr-1" />
            {data.email}
          </p>
          <p className="flex items-center">
            <AiTwotonePhone className="mr-1" />
            {data.numberPhone}
          </p>
          <p className="flex items-center">
            <AiOutlineHome className="mr-1" />
            {data.address}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl mb-6 w-full p-4">
        <p className="text-3xl font-semibold pl-4 border-l-8 border-indigo-900">
          Mô tả
        </p>
        <p className="mt-2 ml-6">{data.description}</p>
      </div>
      <div className="bg-white rounded-xl mb-12 w-full p-4">
        <p className="text-3xl font-semibold pl-4 border-l-8 border-indigo-900">
          Thông tin cơ bản
        </p>
        <p className="mt-2 ml-6 text-xl underline font-medium">Giới tính</p>
        <p className="mt-2 ml-8 text-xl ">{data.gender}</p>
        <p className="mt-2 ml-6 text-xl underline font-medium">Tuổi</p>
        <p className="mt-2 ml-8 text-xl ">{data.age}</p>
        <p className="mt-2 ml-6 text-xl underline font-medium">
          Trình độ giáo dục
        </p>
        <p className="mt-2 ml-8 text-xl ">Đại học phenikaa</p>
        <p className="mt-2 ml-6 text-xl underline font-medium">Bằng cấp</p>
        <p className="mt-2 ml-8 text-xl ">JLPT N3</p>
      </div>
    </div>
  );
}
export default Personal;
