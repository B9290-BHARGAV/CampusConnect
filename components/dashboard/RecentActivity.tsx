"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Briefcase,
  BookOpen,
  Megaphone,
} from "lucide-react";

interface Activity {
  title: string;
}

interface ActivityData {
  events: Activity[];
  jobs: Activity[];
  resources: Activity[];
  announcements: Activity[];
}

export default function RecentActivity() {
  const [activity, setActivity] = useState<ActivityData>({
    events: [],
    jobs: [],
    resources: [],
    announcements: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch("/api/dashboard/activity");
        const data = await res.json();

        if (data.success) {
          setActivity(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
  }, []);

  if (loading) {
    return (
      <div className="mt-12 rounded-3xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-3xl font-bold">
          Recent Activity
        </h2>

        <p className="text-slate-500">
          Loading recent activity...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="mb-8 text-3xl font-bold">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {activity.events[0] && (
          <div className="flex items-center gap-4 rounded-2xl border p-5 hover:bg-slate-50">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <CalendarDays size={24} />
            </div>

            <div>
              <h3 className="font-semibold">
                Event Created
              </h3>

              <p className="text-slate-500">
                {activity.events[0].title}
              </p>
            </div>
          </div>
        )}

        {activity.jobs[0] && (
          <div className="flex items-center gap-4 rounded-2xl border p-5 hover:bg-slate-50">
            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <Briefcase size={24} />
            </div>

            <div>
              <h3 className="font-semibold">
                Job Posted
              </h3>

              <p className="text-slate-500">
                {activity.jobs[0].title}
              </p>
            </div>
          </div>
        )}

        {activity.resources[0] && (
          <div className="flex items-center gap-4 rounded-2xl border p-5 hover:bg-slate-50">
            <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
              <BookOpen size={24} />
            </div>

            <div>
              <h3 className="font-semibold">
                Resource Uploaded
              </h3>

              <p className="text-slate-500">
                {activity.resources[0].title}
              </p>
            </div>
          </div>
        )}

        {activity.announcements[0] && (
          <div className="flex items-center gap-4 rounded-2xl border p-5 hover:bg-slate-50">
            <div className="rounded-xl bg-red-100 p-3 text-red-600">
              <Megaphone size={24} />
            </div>

            <div>
              <h3 className="font-semibold">
                Announcement Posted
              </h3>

              <p className="text-slate-500">
                {activity.announcements[0].title}
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}