import { BsFillMouse2Fill } from "react-icons/bs";
import { Link } from "react-router-dom";
function CandidateCard(props) {
  console.log(props.data);
  return (
    <div className="flex m-6 w-fit overflow-hidden rounded-xl h-fit">
      <div className="bg-green-400 h-fit px-8 py-20">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/012/717/409/small_2x/camera-pink-icon-flat-sign-vector.jpg"
          alt="avatar"
          className="w-20 rounded-full border-2 border-green-900"
        />
      </div>
      <div className="bg-white w-72 text-center relative">
        <p className="text-lg font-bold py-3">{props.data.username}</p>
        <p className="">{props.data.description}</p>
        <Link
          to={"/cv/" + props.data._id}
          className="flex justify-end items-center text-indigo-900 mr-6 absolute right-0 bottom-4"
        >
          <BsFillMouse2Fill className="mr-1" />
          Bấm vào để xem chi tiết
        </Link>
      </div>
    </div>
  );
}
export default CandidateCard;
