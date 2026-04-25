import React, { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface Props {
  color?: string;
  onChange: (color: any) => void;
}

const ColorPicker = ({ color, onChange }: Props) => {
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutClick = (e: MouseEvent) => {
      if (!pickerRef.current) return;
      if (!pickerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutClick);

    return () => {
      document.removeEventListener("mousedown", handleOutClick);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
      h-10 w-10 rounded-full border border-slate-700
      shadow-md shadow-black/30 transition-all duration-200
      hover:border-violet-500 cursor-pointer
    "
        style={{ backgroundColor: color || "#8b5cf6" }}
      />

      {isOpen && (
        <div
          ref={pickerRef}
          className="absolute left-12 bottom-0 z-50 rounded-2xl border border-slate-700 bg-slate-950 p-4 shadow-xl shadow-black/40"
        >
          <HexColorPicker color={color || "#8b5cf6"} onChange={onChange} />

          <div className="mt-3 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300">
            {color || "#8b5cf6"}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
