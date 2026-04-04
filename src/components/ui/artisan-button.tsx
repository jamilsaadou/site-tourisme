import Link from "next/link";
import { cn } from "@/lib/utils";

type ArtisanButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "gold" | "outline" | "ghost";
};

export function ArtisanButton({
  children,
  href,
  type = "button",
  onClick,
  className,
  variant = "primary",
}: ArtisanButtonProps) {
  const variantClass =
    variant === "gold"
      ? "btn-gold"
      : variant === "outline"
        ? "btn-outline"
        : variant === "ghost"
          ? "btn-ghost"
          : "btn-primary";

  const classes = cn("btn", variantClass, className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
