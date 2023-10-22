
import DashboardLinkItem from "./DashboardLinkItem";
import { AdminDasboardLink } from "@/types";

const DashboardNavigationMobile = ({ dashboardLinks }: { dashboardLinks: AdminDasboardLink[] }) => {
  return (
    <aside className="dashboard__navigation__mobile">
      <nav>
        <ul>
          {dashboardLinks.map((link) => (
            <li key={link.linkname}>
              <DashboardLinkItem
                linkname={link.linkname}
                path={link.path}
                icon={link.icon}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardNavigationMobile;
