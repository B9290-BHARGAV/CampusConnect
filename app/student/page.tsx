import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";

import JobsCard from "@/components/dashboard/JobsCard";
import ResourcesCard from "@/components/dashboard/ResourcesCard";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";

import {
  FaCalendarAlt,
  FaBriefcase,
  FaBook,
  FaUserFriends,
} from "react-icons/fa";

export default function StudentDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Welcome */}

        <div>
          <h2 className="text-4xl font-bold">
            Good Afternoon, Bhargav 👋
          </h2>

          <p className="mt-2 text-gray-500">
            Welcome back to CampusConnect
          </p>
        </div>

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatsCard
            title="Upcoming Events"
            value="12"
            subtitle="+5 This Week"
            icon={<FaCalendarAlt />}
            gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
          />

          <StatsCard
            title="Jobs"
            value="18"
            subtitle="3 New Today"
            icon={<FaBriefcase />}
            gradient="bg-gradient-to-br from-green-500 to-emerald-600"
          />

          <StatsCard
            title="Resources"
            value="95"
            subtitle="Updated Daily"
            icon={<FaBook />}
            gradient="bg-gradient-to-br from-orange-500 to-red-500"
          />

          <StatsCard
            title="Connections"
            value="54"
            subtitle="Growing Fast"
            icon={<FaUserFriends />}
            gradient="bg-gradient-to-br from-purple-500 to-pink-600"
          />

        </div>

        {/* Dashboard Content */}

        <div className="grid gap-6 lg:grid-cols-2">

          <UpcomingEvents />

          <JobsCard />

          <ResourcesCard />

          <AnnouncementCard />

        </div>

      </div>
    </DashboardLayout>
  );
}