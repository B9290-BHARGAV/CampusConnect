"use client";

import { useEffect, useState } from "react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm, {
  ProfileFormData,
} from "@/components/profile/ProfileForm";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserProfile {
  _id: string;
  fullName?: string;
  email?: string;
  role?: string;
  enrollmentNumber?: string;
  department?: string;
  year?: number;
  bio?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  image?: string;
  isProfileComplete?: boolean;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  user?: UserProfile;
}

export default function EditProfileForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [email, setEmail] = useState("");
const [role, setRole] = useState("");
const [image, setImage] = useState("");
const [enrollmentNumber, setEnrollmentNumber] =
  useState("");
const [isProfileComplete, setIsProfileComplete] =
  useState(false);

  const [formData, setFormData] =
    useState<ProfileFormData>({
      fullName: "",
      department: "",
      year: null,
      enrollmentNumber: "",
      bio: "",
      github: "",
      linkedin: "",
      website: "",
    });

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "GET",
        cache: "no-store",
      });

      const data: ApiResponse =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ?? "Failed to fetch profile"
        );
      }

      if (!data.user) {
        throw new Error("User not found");
      }

     setEmail(data.user.email ?? "");
setRole(data.user.role ?? "");
setImage(data.user.image ?? "");
setEnrollmentNumber(data.user.enrollmentNumber ?? "");
setIsProfileComplete(
  data.user.isProfileComplete ?? false
);

      setFormData({
        fullName: data.user.fullName ?? "",
        department: data.user.department ?? "",
        year: data.user.year ?? null,
        enrollmentNumber:
          data.user.enrollmentNumber ?? "",
        bio: data.user.bio ?? "",
        github: data.user.github ?? "",
        linkedin: data.user.linkedin ?? "",
        website: data.user.website ?? "",
      });
    } catch (error) {
      console.error(error);
      alert("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
    (async () => {
      await fetchProfile();
    })();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          department: formData.department,
          year: formData.year,
          enrollmentNumber: formData.enrollmentNumber,
          bio: formData.bio,
          github: formData.github,
          linkedin: formData.linkedin,
          website: formData.website,
        }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ?? "Failed to update profile"
        );
      }

      setIsProfileComplete(
        data.user?.isProfileComplete ?? true
      );

      alert("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>

        <CardContent className="py-10">
          <div className="text-center text-muted-foreground">
            Loading profile...
          </div>
        </CardContent>
      </Card>
    );
  }
    return (
    <div className="mx-auto max-w-4xl space-y-6">
     <ProfileHeader
  fullName={formData.fullName}
  email={email}
  role={role}
  enrollmentNumber={enrollmentNumber}
  department={formData.department}
  year={formData.year}
  image={image}
  isProfileComplete={isProfileComplete}
/>

      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <ProfileForm
            formData={formData}
            setFormData={setFormData}
          />

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={saving}
              size="lg"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </Button>
          </div>
 
              </CardContent>
      </Card>
    </div>
  );
}