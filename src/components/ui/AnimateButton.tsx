"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string; // Text and border color
  activeColor?: string; // Hover background color
  hoverTextColor?: string; // Optional dynamic hover text color
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  color = "#560bad", // Default color
  activeColor = "#3a0ca3", // Default active color
  hoverTextColor = "white", // Default hover text color
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={cn(
        "relative inline-block w-32 h-11 leading-10 font-medium border-2 rounded-md overflow-hidden transition-colors duration-500 group z-10",
        className
      )}
      style={{
        color: isHovered ? hoverTextColor : color, // Dynamically change text color on hover
        borderColor: color
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
      <span
        className="absolute top-full left-full w-[200px] h-[150px] rounded-full -z-10 transition-all duration-700 group-hover:top-[-30px] group-hover:left-[-30px]"
        style={{ backgroundColor: isHovered ? activeColor : color }} // Dynamically change background color on hover
      />
    </button>
  );
};

export default AnimatedButton;
