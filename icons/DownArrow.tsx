import React from "react";

const DownArrow = ({ classString }: { classString: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className={classString}
    >
      <path
        fill="none"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 5v14m7-7l-7 7l-7-7"
      />
    </svg>
  );
};

export default DownArrow;
