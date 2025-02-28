import React from "react";
import logo from "../assets/images/logo/logo.png";

const Home = () => {
  return (
    <div className="homeContainer w-full min-h-[100vh]">
      <div className="logo w-full py-5 px-[7rem] flex items-center justify-start">
        <img src={logo} alt="diary-logo" className="w-[15rem] h-[15rem]" />
      </div>
    </div>
  );
};

export default Home;
