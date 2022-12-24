import axios from "./../axios";
import { useEffect, useState } from "react";
function ProfileCard() {
  const [data, setData] = useState({});
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    axios
      .get("user/me")
      .then((res) => {
        console.log(res.data.user.photo);
        setData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [avatar]);
  return (
    <div className="ml-28 mt-6 h-96 w-56 rounded-2xl bg-white overflow-hidden">
      <img className="relative bottom-8" src={data.photoCover} alt="cover" />
      <img
        className="rounded-full w-16 h-16 object-cover m-auto relative bottom-16"
        src={data.photo}
        alt="avatar"
      />
      <p className="text-xl font-medium relative bottom-14 ml-12">
        Xin chào {data.username}
      </p>
      <div className="relative">
        <input
          type={"file"}
          className="absolute bottom-12 left-12 z-10 opacity-0 cursor-pointer"
          onChange={(event) => {
            const formData = new FormData();
            formData.append("image", event.target.files[0]);
            formData.set("key", "550d1f5837b69495d2c8d319c0543e50");
            console.log({ body: formData });
            fetch(
              "https://api.imgbb.com/1/upload?key=550d1f5837b69495d2c8d319c0543e50",
              {
                method: "post",
                body: formData,
              }
            )
              .then((data) => data.json())
              .then((data) => {
                axios.patch("/user/me", {
                  photo: data.data.url,
                });
              });
            setAvatar(URL.createObjectURL(event.target.files[0]));
          }}
        />
        <p className="relative bottom-14 text-sm text-blue-700 ml-12">
          Chọn ảnh đại diện
        </p>
      </div>

      <div className="m-auto text-center w-full mt-7">
        <p className="relative bottom-14 text-2xl text-indigo-900 font-bold text-centerr">
          {localStorage.getItem("currentRole") === "hr"
            ? "Bạn là một nhà tuyển dụng tài ba"
            : "Bạn là ứng viên tiềm năng"}
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
