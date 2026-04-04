import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn("card-glass p-7", className)}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
