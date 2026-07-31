"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ProfileFormData {
  fullName: string;
  department: string;
  year: number | null;
  enrollmentNumber: string;
  bio: string;
  linkedin: string;
  github: string;
  website: string;
}

interface ProfileFormProps {
  formData: ProfileFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
}

export default function ProfileForm({
  formData,
  setFormData,
}: ProfileFormProps) {
  return (
    <div className="space-y-6">
      {/* Full Name */}
      <div className="space-y-2">
        <Label>Full Name</Label>

        <Input
          value={formData.fullName}
          onChange={(e) =>
            setFormData({
              ...formData,
              fullName: e.target.value,
            })
          }
          placeholder="Enter your full name"
        />
      </div>

      {/* Department */}
      <div className="space-y-2">
        <Label>Department</Label>

        <Input
          value={formData.department}
          onChange={(e) =>
            setFormData({
              ...formData,
              department: e.target.value,
            })
          }
          placeholder="Computer Engineering"
        />
      </div>

      {/* Year */}
      <div className="space-y-2">
        <Label>Year</Label>

        <Select
          value={formData.year?.toString() ?? ""}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              year: Number(value),
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="1">1st Year</SelectItem>
            <SelectItem value="2">2nd Year</SelectItem>
            <SelectItem value="3">3rd Year</SelectItem>
            <SelectItem value="4">4th Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Enrollment Number */}
      <div className="space-y-2">
        <Label>Enrollment Number</Label>

        <Input
          value={formData.enrollmentNumber}
          onChange={(e) =>
            setFormData({
              ...formData,
              enrollmentNumber: e.target.value,
            })
          }
          placeholder="23DCE077"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label>Bio</Label>

        <Textarea
          rows={5}
          value={formData.bio}
          onChange={(e) =>
            setFormData({
              ...formData,
              bio: e.target.value,
            })
          }
          placeholder="Tell everyone about yourself..."
        />
      </div>

      {/* GitHub */}
      <div className="space-y-2">
        <Label>GitHub</Label>

        <Input
          value={formData.github}
          onChange={(e) =>
            setFormData({
              ...formData,
              github: e.target.value,
            })
          }
          placeholder="https://github.com/username"
        />
      </div>

      {/* LinkedIn */}
      <div className="space-y-2">
        <Label>LinkedIn</Label>

        <Input
          value={formData.linkedin}
          onChange={(e) =>
            setFormData({
              ...formData,
              linkedin: e.target.value,
            })
          }
          placeholder="https://linkedin.com/in/username"
        />
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label>Website</Label>

        <Input
          value={formData.website}
          onChange={(e) =>
            setFormData({
              ...formData,
              website: e.target.value,
            })
          }
          placeholder="https://yourwebsite.com"
        />
      </div>
    </div>
  );
}