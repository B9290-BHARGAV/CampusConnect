"use client";

import Image from "next/image";
import {
  Mail,
  Phone,
  GraduationCap,
  Building2,
  UserCircle,
  Globe,
} from "lucide-react";

interface UserProfile {
  fullName: string;
  email: string;
  image?: string;
  role: string;
  department: string;
  year: number | null;
  enrollmentNumber: string;
  phone: string;
  bio: string;
  skills: string[];
  linkedin: string;
  github: string;
  website: string;
}

interface ProfileCardProps {
  user: UserProfile;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="rounded-3xl bg-white shadow-lg p-8">
      <div className="flex flex-col items-center">
        <Image
          src={
            user.image && user.image !== ""
              ? user.image
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.fullName
                )}&background=4f46e5&color=fff`
          }
          alt={user.fullName}
          width={128}
          height={128}
          className="h-32 w-32 rounded-full border-4 border-indigo-500 object-cover"
        />

        <h2 className="mt-5 text-3xl font-bold">{user.fullName}</h2>

        <span className="mt-2 rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium capitalize text-indigo-700">
          {user.role}
        </span>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3">
          <Mail size={20} />
          <span>{user.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <Building2 size={20} />
          <span>{user.department || "-"}</span>
        </div>

        <div className="flex items-center gap-3">
          <GraduationCap size={20} />
          <span>{user.year ? `Year ${user.year}` : "-"}</span>
        </div>

        <div className="flex items-center gap-3">
          <UserCircle size={20} />
          <span>{user.enrollmentNumber || "-"}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={20} />
          <span>{user.phone || "-"}</span>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-2 text-lg font-semibold">About</h3>

        <p className="text-slate-600">
          {user.bio || "No bio added yet."}
        </p>
      </div>

      <div className="mt-8">
        <h3 className="mb-2 text-lg font-semibold">Skills</h3>

        <div className="flex flex-wrap gap-2">
          {user.skills && user.skills.length > 0 ? (
            user.skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-slate-500">No skills added.</span>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-lg font-semibold">Social Links</h3>

        <div className="space-y-3">
          {user.linkedin && (
            <a
              href={user.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-blue-600 hover:underline"
            >
              <Globe size={18} />
              LinkedIn
            </a>
          )}

          {user.github && (
            <a
              href={user.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-800 hover:underline"
            >
              <Globe size={18} />
              GitHub
            </a>
          )}

          {user.website && (
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-green-600 hover:underline"
            >
              <Globe size={18} />
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}