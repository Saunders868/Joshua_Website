import DashboardLinkItem from "@/components/DashboardLinkItem";
import DashboardNavigationMobile from "@/components/DashboardNavigationMobile";
import { dashboardLinks } from "@/data";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="dashboard">
      <section className="dashboard__content">
        {children}
      </section>
      {/* mobile navigation for admin */}
      <DashboardNavigationMobile />
      <aside className="dashboard__navigation__desktop">
        <nav>
          <ul>
            {dashboardLinks.map((link) => (
              <li key={link.linkname}>
                <DashboardLinkItem
                  linkname={link.linkname}
                  path={link.path}
                  icon={link.icon}
                  isDesktop
                />
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </main>
  );
}
