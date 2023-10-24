"use client";

import React, { SetStateAction } from "react";
import LinkItem from "../LinkItem";
import { linksDataMobile } from "@/data";
import Button from "../Button";
import { useAppSelector } from "@/redux/hooks";

const Hamburger = ({
  setIsClicked,
  isClicked,
}: {
  setIsClicked: React.Dispatch<SetStateAction<boolean>>;
  isClicked: boolean;
}) => {
  const userData = useAppSelector((state) => state.user.user);
  return (
    <div className="mobile">
      <div
        onClick={() => setIsClicked(!isClicked)}
        className={`hamburger ${isClicked ? "active" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            id="hamburger"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.09009 5.2H21.9099C22.5119 5.2 23 4.70751 23 4.1C23 3.49249 22.5119 3 21.9099 3H2.09009C1.48805 3 1 3.49249 1 4.1C1 4.70751 1.48805 5.2 2.09009 5.2ZM2.09009 12.9484H21.9099C22.5119 12.9484 23 12.4559 23 11.8484C23 11.2408 22.5119 10.7484 21.9099 10.7484H2.09009C1.48805 10.7484 1 11.2408 1 11.8484C1 12.4559 1.48805 12.9484 2.09009 12.9484ZM21.9099 20.6967H2.09009C1.48805 20.6967 1 20.2042 1 19.5967C1 18.9892 1.48805 18.4967 2.09009 18.4967H21.9099C22.5119 18.4967 23 18.9892 23 19.5967C23 20.2042 22.5119 20.6967 21.9099 20.6967Z"
            fill="white"
          />
        </svg>
      </div>

      <div className={`mobile-menu ${isClicked ? "active" : ""}`}>
        <ul>
          {linksDataMobile.map((link) => (
            <li onClick={() => setIsClicked(false)} key={link.path}>
              <LinkItem path={link.path} linkname={link.linkname} />
            </li>
          ))}
          {userData.auth == "admin" ? (
            <>
              <li onClick={() => setIsClicked(false)}>
                <LinkItem path={"/admin/dashboard"} linkname={"admin"} />
              </li>
            </>
          ) : null}
          {userData.email !== "" ? (
            <>
              <Button text="Logout" link={"sign-out"} />
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Hamburger;
