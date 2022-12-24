import { NavLink, Outlet } from "react-router-dom";

function CandidateJob() {
  return (
    <div className="mx-8 h-fit my-4 flex">
      <div className="bg-white rounded-md mr-4 w-1/5 overflow-hidden">
        <NavLink
          to=""
          className="hover:bg-indigo-900 hover:text-white border-b-2 py-3 text-lg block text-center"
        >
          Công việc ứng tuyển
        </NavLink>
        <NavLink
          to="favoriteJobs"
          className="hover:bg-indigo-900 hover:text-white px-2 border-b-2 py-3 text-lg block text-center"
        >
          Công việc yêu thích
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}

export default CandidateJob;
