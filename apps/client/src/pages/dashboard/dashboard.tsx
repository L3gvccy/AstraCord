import React from "react";
import DashboardHeader from "./components/layout/dashboard-header";

const Dashboard = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-full px-4">
        <DashboardHeader />
      </div>
    </div>
  );
};

export default Dashboard;
