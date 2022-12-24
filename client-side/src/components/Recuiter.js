import axios from "./../axios";
import { useEffect, useState } from "react";
import CandidateCard from "./CandidateCard";
import ProfileCard from "./ProfileCard";
function Recuiter() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/apply/appliedUsers")
      .then((res) => {
        console.log(res.data.candidates);
        setData(res.data.candidates);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="flex">
      <ProfileCard />
      <div className="grid grid-cols-2 ml-4">
        {data.map((el) => (
          <CandidateCard key={el._id} data={el} />
        ))}
      </div>
    </div>
  );
}
export default Recuiter;
