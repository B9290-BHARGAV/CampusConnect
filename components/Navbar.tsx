"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Hide navbar on authentication and onboarding pages
  const hiddenRoutes = ["/login", "/signup", "/select-role", "/auth/callback", "/register"];

  if (hiddenRoutes.some((route) => pathname.startsWith(route))) {
    return null;
  }

  // Don't render until session status is known
  if (status === "loading") {
    return null;
  }

  // Only logged-in users can see the navbar
  if (!session) {
    return null;
  }

  const role = (session.user as { role?: string }).role;

  const dashboardLink =
    role === "faculty"
      ? "/faculty"
      : role === "admin"
      ? "/admin"
      : "/student";

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <Link href={dashboardLink} className="text-3xl font-bold">
          Campus<span className="text-indigo-600">Connect</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href={dashboardLink} className="transition hover:text-indigo-600">
            Dashboard
          </Link>

          <Link href="/events" className="transition hover:text-indigo-600">
            Events
          </Link>

          <Link href="/resources" className="transition hover:text-indigo-600">
            Resources
          </Link>

          <Link href="/jobs" className="transition hover:text-indigo-600">
            Jobs
          </Link>

          <Link href="/announcements" className="transition hover:text-indigo-600">
            Announcements
          </Link>

          {role === "admin" && (
            <Link
              href="/admin/users"
              className="rounded-lg bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-200"
            >
              Users
            </Link>
          )}
        </div>

        <UserMenu />
      </div>
    </nav>
  );
}