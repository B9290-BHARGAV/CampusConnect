"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowRight, Users, CalendarDays, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const { data: session } = useSession();

  const dashboardLink =
    session?.user?.role === "faculty" ? "/faculty" : "/student";

  return (
    <section className="bg-gradient-to-b from-white to-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
          🚀 The Future of Campus Networking
        </span>

        <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-gray-900 md:text-7xl">
          Connect.
          <span className="text-indigo-600"> Learn.</span>
          <br />
          Grow Together.
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
          CampusConnect helps students, faculty, and administrators stay
          connected through events, resources, opportunities, mentorship, and
          real-time collaboration.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {!session ? (
            <>
              <Link href="/signup">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/login">
                <Button variant="outline" size="lg">
                  Login
                </Button>
              </Link>
            </>
          ) : (
            <Link href={dashboardLink}>
              <Button size="lg">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <Users className="mx-auto mb-4 h-10 w-10 text-indigo-600" />
            <h3 className="text-xl font-semibold">Network</h3>
            <p className="mt-2 text-gray-600">
              Connect with students, alumni and faculty members.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <CalendarDays className="mx-auto mb-4 h-10 w-10 text-indigo-600" />
            <h3 className="text-xl font-semibold">Events</h3>
            <p className="mt-2 text-gray-600">
              Participate in workshops, hackathons and campus activities.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <Briefcase className="mx-auto mb-4 h-10 w-10 text-indigo-600" />
            <h3 className="text-xl font-semibold">Careers</h3>
            <p className="mt-2 text-gray-600">
              Find internships, placements and career opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}