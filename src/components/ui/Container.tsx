import React from "react";
import clsx from "clsx";

interface IContainer {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: IContainer) => {
  return (
    <div className={clsx("px-4 md:px-6 max-w-7xl mx-auto", className)}>
      {children}
    </div>
  );
};

export default Container;
