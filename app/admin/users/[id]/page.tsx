"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Hash,
  Calendar,
  Globe,
  GitFork,
  Link2,
  ShieldCheck,
  ShieldOff,
  Save,
} from "lucide-react";

interface UserDetail {
  _id: string;
  fullName: string;
  email: string;
  image: string;
  role: "student" | "faculty" | "admin" | null;
  department: string;
  enrollmentNumber: string;
  phone: string;
  bio: string;
  skills: string[];
  linkedin: string;
  github: string;
  website: string;
  year: number | null;
  isVerified: boolean;
  isProfileComplete: boolean;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminUserDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Editable fields
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/admin/users/${id}`);
        const data = await res.json();

        if (data.success) {
          setUser(data.user);
          setRole(data.user.role || "");
          setFullName(data.user.fullName);
          setDepartment(data.user.department);
          setIsVerified(data.user.isVerified);
        } else {
          alert("User not found");
          router.push("/admin/users");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id, router]);

  async function handleSave() {
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, fullName, department, isVerified }),
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        alert("User updated successfully");
      } else {
        alert(data.message || "Failed to update user");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-lg text-slate-400">Loading user details...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-lg text-slate-400">User not found.</p>
      </main>
    );
  }

  const infoItems = [
    { icon: Mail, label: "Email", value: user.email },
    { icon: Phone, label: "Phone", value: user.phone || "Not provided" },
    {
      icon: Building2,
      label: "Department",
      value: user.department || "Not set",
    },
    {
      icon: Hash,
      label: "Enrollment",
      value: user.enrollmentNumber || "N/A",
    },
    {
      icon: Calendar,
      label: "Joined",
      value: new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },
  ];

  const socialLinks = [
    { icon: Link2, label: "LinkedIn", value: user.linkedin },
    { icon: GitFork, label: "GitHub", value: user.github },
    { icon: Globe, label: "Website", value: user.website },
  ];

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
        {/* Back */}
        <Link
          href="/admin/users"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={16} />
          Back to Users
        </Link>

        {/* Profile Header */}
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <Image
              src={user.image || "/default-avatar.png"}
              alt={user.fullName}
              width={100}
              height={100}
              className="rounded-full"
            />

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-slate-900">
                {user.fullName}
              </h1>
              <p className="mt-1 text-slate-500">{user.email}</p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <span
                  className={`rounded-full px-4 py-1 text-sm font-semibold ${
                    user.role === "admin"
                      ? "bg-amber-100 text-amber-700"
                      : user.role === "faculty"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user.role || "No Role"}
                </span>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
                    user.isVerified
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.isVerified ? (
                    <>
                      <ShieldCheck size={14} /> Verified
                    </>
                  ) : (
                    <>
                      <ShieldOff size={14} /> Unverified
                    </>
                  )}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-500">
                  {user.provider}
                </span>
              </div>

              {user.bio && (
                <p className="mt-4 text-slate-600">{user.bio}</p>
              )}

              {user.skills && user.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {user.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info & Social */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Info */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              User Information
            </h2>
            <div className="space-y-4">
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="rounded-lg bg-slate-100 p-2">
                    <item.icon size={18} className="text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="text-sm font-medium text-slate-700">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Social Links
            </h2>
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <div key={link.label} className="flex items-center gap-3">
                  <div className="rounded-lg bg-slate-100 p-2">
                    <link.icon size={18} className="text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{link.label}</p>
                    {link.value ? (
                      <a
                        href={link.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-indigo-600 hover:underline"
                      >
                        {link.value}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-400">Not provided</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Edit Section */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Edit User
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Verified */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Verification Status
              </label>
              <select
                value={isVerified ? "true" : "false"}
                onChange={(e) => setIsVerified(e.target.value === "true")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                <option value="true">Verified</option>
                <option value="false">Unverified</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </main>
  );
}
