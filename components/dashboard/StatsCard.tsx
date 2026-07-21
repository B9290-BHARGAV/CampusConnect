interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
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
      className={`rounded-3xl p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${gradient}`}
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm opacity-80">
            {title}
          </p>

          <h2 className="mt-3 text-5xl font-bold">
            {value}
          </h2>

          <p className="mt-4 text-sm opacity-90">
            {subtitle}
          </p>
        </div>

        <div className="rounded-full bg-white/20 p-4 text-4xl backdrop-blur-sm">
          {icon}
        </div>

      </div>
    </div>
  );
}