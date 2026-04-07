import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "flag" | "elevated";
  hover?: boolean;
};

export function GlassCard({ 
  children, 
  className, 
  variant = "default",
  hover = true 
}: GlassCardProps) {
  const baseClasses = variant === "flag" 
    ? "card-glass-flag" 
    : "card-glass";
  
  const hoverClasses = hover ? "" : "hover:transform-none hover:shadow-[var(--shadow-glass)]";
  
  return (
    <div className={cn(baseClasses, "p-6", hoverClasses, className)}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

type GlassContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlassContainer({ children, className }: GlassContainerProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-light)]",
        "bg-[var(--surface-glass-strong)] backdrop-blur-xl",
        "shadow-[var(--shadow-glass)]",
        className
      )}
    >
      <div className="texture-overlay" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

type GlassPanelProps = {
  children: React.ReactNode;
  className?: string;
  accentColor?: "green" | "orange" | "gold";
};

export function GlassPanel({ 
  children, 
  className,
  accentColor 
}: GlassPanelProps) {
  const accentClasses = accentColor === "green" 
    ? "before:bg-[var(--niger-green)]"
    : accentColor === "orange"
      ? "before:bg-[var(--niger-orange)]"
      : accentColor === "gold"
        ? "before:bg-[var(--gold)]"
        : "";

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-xl)]",
        "border border-[var(--border-light)]",
        "bg-gradient-to-br from-white/95 to-white/85",
        "backdrop-blur-xl shadow-[var(--shadow-medium)]",
        accentColor && "before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:rounded-t-[var(--radius-xl)]",
        accentClasses,
        className
      )}
    >
      {children}
    </div>
  );
}
