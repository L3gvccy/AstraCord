import React from "react";

const DashboardIndex = () => {
  return (
    <div className="flex flex-col gap-2 w-full h-full items-center justify-center">
      <img src="/logo.png" className="w-38 sm:w-44" />
      <p className="text-4xl sm:text-6xl font-semibold bg-clip-text text-transparent bg-linear-45 to-violet-600 via-cyan-500 from-teal-600">
        AstraCord
      </p>
    </div>
  );
};

export default DashboardIndex;
