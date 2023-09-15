import { dashboardLinks } from "@/data";
import DashboardLinkItem from "./DashboardLinkItem";

const DashboardNavigationMobile = () => {
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
