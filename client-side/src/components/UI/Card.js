import { Link } from "react-router-dom";

function Card(props) {
  return (
    <div className="bg-white w-fit h-fit max-w-sm mt-6 mx-4 px-12 rounded-md shadow-xl hover:bg-indigo-900 hover:text-white">
      <p className="text-2xl pt-8 pb-6 border-b-2 border-slate-600 ">
        {props.data.title}
      </p>
      <p className="text-xl mb-3 ">{props.data.type}</p>
      <p className="text-lg mb-2 ">{props.data.salaryRange}</p>
      <p className="text-lg pb-3 ">
        <Link to={"/job/" + props.data._id}>Xem chi tiet</Link>
      </p>
    </div>
  );
}

export default Card;
