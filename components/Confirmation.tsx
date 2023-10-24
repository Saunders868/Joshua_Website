"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animation from "../utils/lottie.json";
import { useRouter } from "next/navigation";

const Confirmation = ({ text, location }: { text: string, location: string }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { push } = useRouter();

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      push(location);
    }, 5000);

    return () => {
      clearTimeout(timer); // Clear the timer when the component unmounts
    };
  }, []);
  return (
    <div className={`confirmation ${isVisible ? "active" : ""}`}>
      <div className="lottie__animation">
        <Lottie animationData={animation} loop={false} />
      </div>
      <div>
        <div className="circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 256 256"
          >
            <path
              fill="white"
              d="m232.49 80.49l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183L215.51 63.51a12 12 0 0 1 17 17Z"
            />
          </svg>
        </div>

        <p>{text}!</p>
      </div>
    </div>
  );
};

export default Confirmation;
