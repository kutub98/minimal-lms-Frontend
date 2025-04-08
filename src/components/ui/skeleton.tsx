// components/ui/Skeleton.tsx

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLProps<HTMLDivElement> {
  itemsCount?: number; // Number of skeleton items to render
  className?: string; // Custom classes
  shape?: "rectangle" | "circle"; // Shape of the skeleton
}

export const Skeleton = ({
  itemsCount = 1,
  className,
  shape = "rectangle",
  ...props
}: SkeletonProps) => {
  const skeletons = Array.from({ length: itemsCount }).map((_, idx) => (
    <div
      key={idx}
      className={cn(
        "bg-gray-200 animate-pulse",
        shape === "circle" ? "rounded-full" : "rounded-lg",
        className
      )}
      {...props}
    ></div>
  ));

  return <>{skeletons}</>;
};
