"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardLinkItem = ({
  path,
  linkname,
  icon,
  isDesktop,
}: {
  path: string;
  linkname: string;
  icon?: React.ReactElement;
  isDesktop?: boolean;
}) => {
  const pathname = usePathname();

  return (
    <div className="dashboard-link-container">
      <Link
        className={
          pathname === path ? "active" : `${isDesktop ? "desktop" : ""}`
        }
        href={path}
      >
        {icon} <p className="link-desktop">{linkname}</p>
      </Link>
    </div>
  );
};

export default DashboardLinkItem;
