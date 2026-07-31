"use client";

import Link from "next/link";
import {
  PlusCircle,
  ClipboardList,
  Megaphone,
  BookOpen,
  Briefcase,
  ArrowRight,
} from "lucide-react";

import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function FacultyPage() {
  const quickActions = [
    {
      title: "Create Event",
      description: "Organize workshops, seminars and hackathons.",
      href: "/faculty/create-event",
      icon: PlusCircle,
      gradient: "from-indigo-600 via-blue-600 to-cyan-600",
    },
    {
      title: "Manage Events",
      description: "Edit, delete and monitor all campus events.",
      href: "/faculty/manage-events",
      icon: ClipboardList,
      gradient: "from-emerald-500 via-green-500 to-teal-600",
    },
    {
      title: "Create Announcement",
      description: "Publish important announcements for students.",
      href: "/faculty/create-announcement",
      icon: Megaphone,
      gradient: "from-red-500 via-pink-500 to-rose-600",
    },
    {
      title: "Manage Resources",
      description:
        "Upload, edit and manage notes, PDFs and study materials.",
      href: "/faculty/manage-resources",
      icon: BookOpen,
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
    },
    {
      title: "Manage Jobs",
      description:
        "Share internships and placement opportunities.",
      href: "/faculty/manage-jobs",
      icon: Briefcase,
      gradient: "from-cyan-500 via-sky-500 to-blue-600",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Statistics */}
        <DashboardStats />

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

                <h3 className="mt-6 text-2xl font-bold">
                  {action.title}
                </h3>

                <p className="mt-3 text-white/90">
                  {action.description}
                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold">
                  Open
                  <ArrowRight size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-10">
          <RecentActivity />
        </div>
      </div>
    </main>
  );
}