import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Cards from "./components/Cards";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import HrJob from "./components/HrJob";
import Recuiter from "./components/Recuiter.js";
import ListJobs from "./components/ListJobs";
import CreateJob from "./components/CreateJob";
import Personal from "./components/Personal";
import CandidateJob from "./components/CandidateJob";
import AppliedJob from "./components/AppliedJob";
import FavoriteJobs from "./components/FavoriteJobs";
import Admin from "./components/admin/Admin";
import AdminListUsers from "./components/admin/AdminListUsers";
import AdminListJobs from "./components/admin/AdminListJobs";
import ApproveApply from "./components/ApproveAplly";
import UpdatePersonal from "./components/UpdatePersonal";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/candidate/result" element={<Cards />} />
          <Route path="/candidate" element={<Cards />}></Route>
          <Route path="/hr" element={<Recuiter />} />
          <Route path="/job/:id" element={<Detail />} />
          <Route path="jobhr" element={<HrJob />}>
            <Route index element={<ListJobs />} />
            <Route path="createJob" element={<CreateJob />} />
            <Route path="processApply" element={<ApproveApply />} />
          </Route>
          <Route path="/jobcandidate" element={<CandidateJob />}>
            <Route index element={<AppliedJob />} />
            <Route path="favoriteJobs" element={<FavoriteJobs />} />
          </Route>

          <Route path="/cv" element={<Personal />} />
          <Route path="/cv/:id" element={<Personal />} />
          <Route path="updatecv" element={<UpdatePersonal />} />
        </Route>
        <Route path="admin" element={<Admin />}>
          <Route index element={<AdminListJobs />} />
          <Route path="user" element={<AdminListUsers />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
