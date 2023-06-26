import { Outlet, NavLink } from "react-router-dom";

function HrJob() {
  return (
    <div className="mx-8 h-fit my-4 flex">
      <div className="bg-white rounded-md mr-4 w-1/5 overflow-hidden h-fit">
        <ul>
          <NavLink
            to=""
            className="hover:bg-indigo-900 hover:text-white border-b-2 py-3 text-lg block text-center"
          >
            Danh sách công việc
          </NavLink>
          <NavLink
            to="/jobhr/processApply"
            className="hover:bg-indigo-900 hover:text-white border-b-2 py-3 text-lg block text-center"
          >
            Duyệt công việc
          </NavLink>
          <NavLink
            to="/jobhr/createJob"
            className="hover:bg-indigo-900 hover:text-white border-b-2 py-3 text-lg block text-center"
          >
            Tạo công việc
          </NavLink>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
export default HrJob;
