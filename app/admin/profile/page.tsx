"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Globe,
  GitFork,
  Link2,
  Save,
  ShieldCheck,
} from "lucide-react";

interface ProfileData {
  _id: string;
  fullName: string;
  email: string;
  image: string;
  role: string;
  department: string;
  phone: string;
  bio: string;
  skills: string[];
  linkedin: string;
  github: string;
  website: string;
  provider: string;
  createdAt: string;
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Editable fields
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (data.success) {
          const u = data.user;
          setProfile(u);
          setFullName(u.fullName || "");
          setDepartment(u.department || "");
          setPhone(u.phone || "");
          setBio(u.bio || "");
          setLinkedin(u.linkedin || "");
          setGithub(u.github || "");
          setWebsite(u.website || "");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  async function handleSave() {
    setSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          department,
          phone,
          bio,
          linkedin,
          github,
          website,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setProfile(data.user);
        alert("Profile updated successfully");
      } else {
        alert(data.message || "Failed to update profile");
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
        <p className="text-lg text-slate-400">Loading profile...</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-lg text-slate-400">Profile not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-8 lg:px-8">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Profile Header */}
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <Image
              src={profile.image || "/default-avatar.png"}
              alt={profile.fullName}
              width={90}
              height={90}
              className="rounded-full"
            />

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-slate-900">
                {profile.fullName}
              </h1>
              <p className="mt-1 text-slate-500">{profile.email}</p>
              <div className="mt-3 flex items-center justify-center gap-3 sm:justify-start">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">
                  <ShieldCheck size={14} /> Administrator
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-500">
                  {profile.provider}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="mt-6 rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Edit Profile
          </h2>

          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Mail size={16} /> Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Building2 size={16} /> Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Phone size={16} /> Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Link2 size={16} /> LinkedIn
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <GitFork size={16} /> GitHub
                </label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Globe size={16} /> Website
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
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
