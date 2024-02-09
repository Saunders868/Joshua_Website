import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  number: number;
  link: string;
  icon: React.ReactElement;
}

const DashboardGrid = ({ title, number, link, icon }: Props) => {
  return (
    <div className="single__admin__page__dashboard__card">
      <div className="single__admin__page__dashboard__card__icon">{icon}</div>
      <div className="single__admin__page__dashboard__card__left">
        <h3>{title}</h3>
        <p>{number}</p>
      </div>
      <div className="single__admin__page__dashboard__card__right">
        <div className="dashboard-link-container">
          <Link href={link}>view all</Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;
