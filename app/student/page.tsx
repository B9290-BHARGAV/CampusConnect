"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

import StudentStats from "@/components/student/StudentStats";
import UpcomingEvents from "@/components/student/UpcomingEvents";
import LatestJobs from "@/components/student/LatestJobs";
import LatestResources from "@/components/student/LatestResources";
import LatestAnnouncements from "@/components/student/LatestAnnouncements";

export default function StudentDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Statistics */}
        <StudentStats />

        {/* Dashboard Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          <UpcomingEvents />

          <LatestJobs />

          <LatestResources />

          <LatestAnnouncements />
        </div>
      </div>
    </DashboardLayout>
  );
}