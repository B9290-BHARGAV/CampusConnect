import { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  gradient: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  gradient,
}: StatsCardProps) {
  return (
    <div
      className={`${gradient} group relative overflow-hidden rounded-3xl p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
    >
      {/* Decorative Background */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex items-center justify-between">
        {/* Left Content */}
        <div>
          <p className="text-sm font-medium text-white/80">
            {title}
          </p>

          <h2 className="mt-3 text-5xl font-bold tracking-tight">
            {value}
          </h2>

          <div className="mt-4 flex items-center gap-2 text-sm text-white/90">
            <TrendingUp className="h-4 w-4" />
            <span>{subtitle}</span>
          </div>
        </div>

        {/* Icon */}
        <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
          <div className="text-4xl">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}