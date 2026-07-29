import type { ReactNode } from "react";

import "../../styles/components/Badge.css";

interface BadgeProps {
  children: ReactNode;
  variant?: "discount";
}

function Badge({
  children,
  variant = "discount",
}: BadgeProps) {
  return (
    <span className={`badge badge--${variant}`}>
      {children}
    </span>
  );
}

export default Badge;