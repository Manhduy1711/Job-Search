import { Link, NavLink, Outlet } from "react-router-dom";

function Admin() {
  return (
    <div className="h-fit flex bg-pink-200 min-h-screen">
      <div className="bg-white rounded-md mr-4 w-1/5 overflow-hidden ml-16 mt-24 h-fit">
        <ul>
          <NavLink
            to=""
            className="hover:bg-indigo-900 hover:text-white border-b-2 py-3 text-lg block text-center"
          >
            Quản lý công việc
          </NavLink>
          <NavLink
            to="/admin/user"
            className="hover:bg-indigo-900 hover:text-white border-b-2 py-3 text-lg block text-center"
          >
            Quản lý người dùng
          </NavLink>
          <NavLink
            to="/login"
            className="hover:bg-indigo-900 hover:text-white border-b-2 py-3 text-lg block text-center"
          >
            Đăng xuất
          </NavLink>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
export default Admin;
