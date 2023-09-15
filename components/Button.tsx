import Link from "next/link";
import React from "react";

const Button = ({
  link,
  text,
  fill,
  light
}: {
  link: string;
  text: string;
  fill?: boolean;
  light?: boolean;
}) => {
  return (
    <Link className={`btn ${fill ? "fill" : ""} ${light ? "light" : ""}`} href={link}>
      {text}
    </Link>
  );
};

export default Button;
