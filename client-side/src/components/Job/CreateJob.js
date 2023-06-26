import axios from "../../axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateJob() {
  const [newJob, setNewJob] = useState({
    title: "",
    type: "Bán hàng",
    location: "",
    salaryRange: "",
    company: "",
    description: "",
    require: "",
    benefit: "",
    deadline: "",
    experience: "Chưa có kinh nghiệm",
    level: "",
    quantity: "",
  });
  const navigate = useNavigate();
  const onChangeHandle = (event) => {
    setNewJob((preVale) => ({
      ...preVale,
      [event.target.name]: event.target.value,
    }));
  };
  const onSubmitHandle = (event) => {
    event.preventDefault();
    const createJob = async () => {
      try {
        const job = await axios.post("/job", {
          title: newJob.title,
          type: newJob.type,
          location: newJob.location,
          salaryRange: newJob.salaryRange,
          company: newJob.company,
          description: newJob.description,
          require: newJob.require,
          benefit: newJob.benefit,
          deadline: newJob.deadline,
          experience: newJob.experience,
          level: newJob.level,
          quantity: newJob.quantity,
        });
        console.log(job);
      } catch (err) {
        console.log(err);
      }
    };
    createJob();
    navigate("/jobhr");
  };
  return (
    <div className="bg-white rounded-md flex-grow ml-4">
      <form onSubmit={onSubmitHandle}>
        <div>
          <label>Tiêu đề(*)</label>
          <input
            onChange={onChangeHandle}
            name="title"
            value={newJob.title}
            className="block w-full border-2 rounded-sm"
            type={"text"}
            required
          />
        </div>
        <div>
          <label>Địa chỉ(*)</label>
          <input
            onChange={onChangeHandle}
            name="location"
            value={newJob.location}
            className="block w-full border-2 rounded-sm"
            type={"text"}
            required
          />
        </div>
        <div>
          <label>Mô tả</label>
          <textarea
            onChange={onChangeHandle}
            name="description"
            value={newJob.description}
            className="block w-full border-2 rounded-sm"
          />
        </div>
        <div>
          <label>Quyền lợi, lợi ích</label>
          <textarea
            onChange={onChangeHandle}
            name="benefit"
            value={newJob.benefit}
            className="block w-full border-2 rounded-sm"
          />
        </div>
        <div>
          <label>Yêu cầu</label>
          <textarea
            onChange={onChangeHandle}
            name="require"
            value={newJob.require}
            className="block w-full border-2 rounded-sm"
          />
        </div>
        <div className="grid grid-cols-2 border-2 rounded-sm">
          <div>
            <label>Ngành nghề(*)</label>
            <select
              onChange={onChangeHandle}
              name="type"
              value={newJob.type}
              className="block border-2 rounded-sm"
              required
            >
              <option>Bán Hàng</option>
              <option>IT phần mềm</option>
              <option>Marketing</option>
              <option>Kế toán - Kiểm toán</option>
              <option>Khách sạn - Nhà hàng</option>
              <option>Phiên dịch ngoại ngữ</option>
              <option>Hành chính - văn phòng</option>
              <option>Kỹ sư</option>
            </select>
          </div>
          <div>
            <label>Kinh nghiệm làm việc(*)</label>
            <select
              onChange={onChangeHandle}
              name="experience"
              value={newJob.experience}
              className="block border-2 rounded-sm"
              required
            >
              <option>Chưa có kinh nghiệm</option>
              <option>Dưới 1 năm</option>
              <option>1 năm</option>
              <option>2 năm</option>
              <option>3 năm</option>
              <option>4 năm</option>
              <option>5 năm</option>
              <option>Trên 5 năm</option>
            </select>
          </div>
          <div>
            <label>Cấp bậc</label>
            <select
              onChange={onChangeHandle}
              name="level"
              value={newJob.level}
              className="border-2 rounded-sm block"
            >
              <option>Intern</option>
              <option>Fresher</option>
              <option>Junier</option>
              <option>Senior</option>
            </select>
          </div>
          <div>
            <label>Mức lương</label>
            <input
              onChange={onChangeHandle}
              name="salaryRange"
              value={newJob.salaryRange}
              className="block w-1/2 border-2 rounded-sm"
              type={"text"}
            />
          </div>
          <div>
            <label>Công ty(*)</label>
            <input
              onChange={onChangeHandle}
              name="company"
              value={newJob.company}
              className="block w-1/2 border-2 rounded-sm"
              type={"text"}
              required
            />
          </div>
          <div>
            <label>Hạn nộp hồ sơ</label>
            <input
              onChange={onChangeHandle}
              name="deadline"
              value={newJob.deadline}
              className="block w-1/2 border-2 rounded-sm"
              type={"date"}
            />
          </div>
          <div>
            <label>Số lượng tuyển</label>
            <input
              onChange={onChangeHandle}
              name="quantity"
              value={newJob.quantity}
              className="block w-1/2 border-2 rounded-sm"
              type={"text"}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-pink-500 text-white px-3 py-2 rounded-lg"
        >
          Xác nhận thông tin
        </button>
      </form>
    </div>
  );
}

export default CreateJob;
