import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

type SaveChangesPopupProps = {
  container: HTMLElement | null;
  onCancel: () => void;
  onSave: () => void;
  isLoading?: boolean;
};

const SaveChangesPopup = ({
  container,
  onCancel,
  onSave,
  isLoading = false,
}: SaveChangesPopupProps) => {
  if (!container) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: 12, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: 12, x: "-50%" }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-4 left-1/2 z-50 w-full max-w-xl px-4"
    >
      <div className="flex items-center justify-between gap-8 rounded-xl border border-white/10 bg-slate-950/65 p-4 text-white shadow-xl shadow-black/30 backdrop-blur-md">
        <p className="text-sm sm:text-base">You have unsaved changes!</p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="cursor-pointer rounded-lg bg-slate-700 px-4 py-2 text-white transition-all duration-300 hover:bg-slate-600 disabled:pointer-events-none disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={isLoading}
            className="cursor-pointer rounded-lg bg-violet-600 px-4 py-2 text-white transition-all duration-300 hover:bg-violet-500 disabled:pointer-events-none disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </motion.div>,
    container,
  );
};

export default SaveChangesPopup;
