"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  BookOpen,
  Briefcase,
  Megaphone,
} from "lucide-react";

interface StudentStatsData {
  events: number;
  resources: number;
  jobs: number;
  announcements: number;
}

export default function StudentStats() {
  const [stats, setStats] = useState<StudentStatsData>({
    events: 0,
    resources: 0,
    jobs: 0,
    announcements: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard/stats");
        const data = await res.json();

        if (data.success) {
          setStats({
            events: data.events,
            resources: data.resources,
            jobs: data.jobs,
            announcements: data.announcements,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Events",
      value: stats.events,
      icon: CalendarDays,
      color: "bg-blue-500",
    },
    {
      title: "Resources",
      value: stats.resources,
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      title: "Jobs",
      value: stats.jobs,
      icon: Briefcase,
      color: "bg-cyan-500",
    },
    {
      title: "Announcements",
      value: stats.announcements,
      icon: Megaphone,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">{card.title}</p>

              <h2 className="mt-3 text-4xl font-bold">
                {loading ? "..." : card.value}
              </h2>
            </div>

            <div className={`${card.color} rounded-2xl p-4 text-white`}>
              <card.icon size={32} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}