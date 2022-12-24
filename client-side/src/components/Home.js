import axios from "./../axios";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        await axios.get("user/islogedin");
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    };
    getData();
  }, []);
  return (
    <div className="bg-pink-200 min-h-screen">
      <Header number={0} />.
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
export default Home;
