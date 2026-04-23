"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default" | "lg";
};

const switchSizes = {
  sm: {
    root: "h-5 w-9",
    thumb:
      "size-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
  },
  default: {
    root: "h-6 w-11",
    thumb:
      "size-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
  },
  lg: {
    root: "h-7 w-13",
    thumb:
      "size-6 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
  },
};

function Switch({ className, size = "default", ...props }: SwitchProps) {
  const currentSize = switchSizes[size];

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors outline-none",
        "data-[state=checked]:bg-violet-600 data-[state=unchecked]:bg-slate-700",
        "focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        "disabled:cursor-not-allowed disabled:opacity-50",
        currentSize.root,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-white shadow-md ring-0 transition-transform",
          currentSize.thumb,
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
