import React, { useState } from "react";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";

const Landing = () => {
  return (
    <div className="flex relative flex-col w-full items-center justify-center">
      <div className="absolute w-[60vw] h-[10vw] top-[-5vw] rounded-full bg-violet-800/30 blur-3xl" />
      <div className="absolute w-[25vw] h-[8vw] top-[25vw] left-[5vw] rounded-full bg-cyan-800/20 blur-3xl" />
      <div className="absolute w-[25vw] h-[8vw] top-[10vw] right-[5vw] rounded-full bg-teal-800/20 blur-3xl" />

      <div className="flex flex-col w-full max-w-342 justify-center items-center gap-6 py-6 px-4 z-50">
        <Header />
        <Hero />
      </div>
    </div>
  );
};

export default Landing;
