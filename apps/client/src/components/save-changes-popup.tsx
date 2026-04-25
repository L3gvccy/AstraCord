import React from "react";
import { motion } from "framer-motion";

const SaveChangesPopup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute w-full max-w-138 bottom-4 left-1/2 -translate-x-1/2 px-4"
    >
      <div className="flex justify-between items-center gap-8 p-4 rounded-xl bg-white/5">
        <p className="text-sm sm:text-base">You have unsaved changes!</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white cursor-pointer transition-all duration-300">
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white cursor-pointer transition-all duration-300">
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SaveChangesPopup;
