import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, useMotionTemplate } from "motion/react";
import { cn } from "@/lib/utils";

export function MovingCard({
  borderRadius = "1rem",
  children,
  containerClassName,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden p-px flex items-center justify-center border border-neutral-300 dark:border-slate-800",
        containerClassName
      )}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div
        className={cn(
          "relative p-4 flex items-center justify-center w-full h-full bg-white/80 dark:bg-slate-900/80 text-black dark:text-white text-sm antialiased backdrop-blur-xl",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </div>
  );
}
export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue(0);
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    if (pathRef.current?.getTotalLength) {
      setLength(pathRef.current.getTotalLength());
    }
  }, []);

  useAnimationFrame((time) => {
    if (!length) return;
    const pxPerMs = length / duration;
    progress.set((time * pxPerMs) % length);
  });

  const x = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val)?.x || 0
  );
  const y = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val)?.y || 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
