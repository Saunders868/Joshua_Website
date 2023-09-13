"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LinkItem = ({ path, linkname, isMobile }: { path: string; linkname: string, isMobile?: boolean }) => {
  const pathname = usePathname();
  
  return (
    <div className="link-container">
      <Link className={pathname === path ? "active" : ""} href={path}>
        {linkname}
      </Link>
    </div>
  );
};

export default LinkItem;
