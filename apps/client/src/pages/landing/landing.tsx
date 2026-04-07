import React, { useState } from "react";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";

const Landing = () => {
  return (
    <div className="flex relative flex-col w-full min-h-screen items-center">
      <div className="absolute w-[80vw] md:w-[60vw] h-[10vw] top-[-5vh] rounded-full bg-violet-600/30 dark:bg-violet-800/30 blur-3xl" />
      <div className="absolute w-[40vw] md:w-[25vw] h-[8vw] top-[45vh] left-[5vw] rounded-full bg-fuchsia-400/20 dark:bg-fuchsia-600/20 blur-3xl" />
      <div className="absolute w-[40vw] md:w-[25vw] h-[8vw] top-[15vh] right-[5vw] rounded-full bg-cyan-400/30 dark:bg-cyan-700/30 blur-3xl" />

      <div className="flex flex-col w-full max-w-342 justify-center items-center gap-6 py-6 px-4 z-50">
        <Header />
        <div className="flex w-full items-center h-[87vh]">
          <Hero />
        </div>
      </div>
    </div>
  );
};

export default Landing;
