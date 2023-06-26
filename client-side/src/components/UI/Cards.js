import { useEffect, useState } from "react";
import axios from "../../axios";
import Card from "./Card";
import ProfileCard from "./ProfileCard";
function Cards(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("searchTerm")) {
      console.log();
      axios
        .get("/job/acceptedJobs")
        .then((res) => {
          setData(res.data.jobs);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      axios
        .get("/job/result", {
          searchTerm: localStorage.getItem("searchTerm"),
        })
        .then((res) => {
          localStorage.removeItem("searchTerm");
          console.log(res.data.jobs);
          setData(res.data.jobs);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);
  return (
    <div className="flex">
      <ProfileCard />

      <div className="ml-12 max-w-fit grid grid-cols-2 mb-8">
        {data
          .filter((el) => el.status !== "Đã từ chối")
          .map((el) => (
            <Card key={el._id} data={el} />
          ))}
      </div>
    </div>
  );
}
export default Cards;
