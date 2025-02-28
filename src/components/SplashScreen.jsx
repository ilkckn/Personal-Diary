import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import SplashSc from "../assets/lottie/SplashScreen.json";
import SplashSc2 from "../assets/lottie/SplashScreen2.json";
import "../../src/index.css";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      navigate("/home");
    }, 5000); 
  }, [navigate]);

  return (
    visible && (
      <div className="splash-screen flex items-center justify-center h-screen text-white text-2xl">
        <Lottie animationData={SplashSc2} loop={false} autoPlay={true} />
      </div>
    )
  );
}
