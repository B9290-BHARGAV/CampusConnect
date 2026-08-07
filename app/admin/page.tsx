"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  UserCog,
  CalendarDays,
  Briefcase,
  Megaphone,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  UserPlus,
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  students: number;
  faculty: number;
  admins: number;
  events: number;
  jobs: number;
  announcements: number;
  resources: number;
  recentSignups: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    students: 0,
    faculty: 0,
    admins: 0,
    events: 0,
    jobs: 0,
    announcements: 0,
    resources: 0,
    recentSignups: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();

        if (data.success) {
          setStats(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-indigo-500",
    },
    {
      title: "Students",
      value: stats.students,
      icon: GraduationCap,
      color: "bg-blue-500",
    },
    {
      title: "Faculty",
      value: stats.faculty,
      icon: UserCog,
      color: "bg-emerald-500",
    },
    {
      title: "Admins",
      value: stats.admins,
      icon: ShieldCheck,
      color: "bg-amber-500",
    },
    {
      title: "Events",
      value: stats.events,
      icon: CalendarDays,
      color: "bg-cyan-500",
    },
    {
      title: "Jobs",
      value: stats.jobs,
      icon: Briefcase,
      color: "bg-violet-500",
    },
    {
      title: "Announcements",
      value: stats.announcements,
      icon: Megaphone,
      color: "bg-rose-500",
    },
    {
      title: "Resources",
      value: stats.resources,
      icon: BookOpen,
      color: "bg-teal-500",
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "View, edit roles, and manage all platform users.",
      href: "/admin/users",
      icon: Users,
      gradient: "from-indigo-600 via-blue-600 to-cyan-600",
    },
    {
      title: "Manage Events",
      description: "View, edit, and delete all campus events.",
      href: "/admin/manage-events",
      icon: CalendarDays,
      gradient: "from-emerald-500 via-green-500 to-teal-600",
    },
    {
      title: "Manage Jobs",
      description: "Oversee all job and internship postings.",
      href: "/admin/manage-jobs",
      icon: Briefcase,
      gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    },
    {
      title: "Manage Announcements",
      description: "Review and moderate all announcements.",
      href: "/admin/manage-announcements",
      icon: Megaphone,
      gradient: "from-red-500 via-pink-500 to-rose-600",
    },
    {
      title: "Manage Resources",
      description: "Oversee all uploaded study materials.",
      href: "/admin/manage-resources",
      icon: BookOpen,
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-slate-500">
              Platform overview and management
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-indigo-50 px-5 py-3">
            <UserPlus className="h-5 w-5 text-indigo-600" />
            <div>
              <p className="text-sm text-slate-500">New signups (7 days)</p>
              <p className="text-xl font-bold text-indigo-600">
                {loading ? "..." : stats.recentSignups}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.title}</p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {loading ? "..." : card.value}
                  </h2>
                </div>
                <div
                  className={`${card.color} rounded-2xl p-3.5 text-white`}
                >
                  <card.icon size={26} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="mb-6 text-3xl font-bold text-slate-900">
            Quick Actions
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className={`rounded-3xl bg-linear-to-r ${action.gradient} p-8 text-white shadow-lg transition duration-300 hover:scale-[1.03]`}
              >
                <action.icon size={45} />

                <h3 className="mt-6 text-2xl font-bold">{action.title}</h3>

                <p className="mt-3 text-white/90">{action.description}</p>

                <div className="mt-8 flex items-center gap-2 font-semibold">
                  Open
                  <ArrowRight size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
