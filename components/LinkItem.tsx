"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LinkItem = ({ path, linkname }: { path: string; linkname: string }) => {
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
