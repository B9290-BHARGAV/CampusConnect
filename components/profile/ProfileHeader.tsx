"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileHeaderProps {
  fullName: string;
  email: string;
  role: string;
  enrollmentNumber?: string;
  department?: string;
  year?: number | null;
  image?: string;
  isProfileComplete?: boolean;
}

export default function ProfileHeader({
  fullName,
  email,
  role,
  enrollmentNumber,
  department,
  year,
  image,
  isProfileComplete,
}: ProfileHeaderProps) {
  const initials =
    fullName
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  const displayIdentity =
    role === "student"
      ? enrollmentNumber || "Enrollment Number"
      : email;

  return (
    <Card className="mb-8">
      <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row">
        <Avatar className="h-24 w-24">
          {image && (
            <AvatarImage
              src={image}
              alt={fullName}
            />
          )}

          <AvatarFallback className="text-2xl">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2 text-center md:text-left">
          <h2 className="text-3xl font-bold">
            {fullName || "Unknown User"}
          </h2>

          <p className="text-muted-foreground">
            {displayIdentity}
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            <Badge>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Badge>

            {department && (
              <Badge variant="secondary">
                {department.toUpperCase()}
              </Badge>
            )}

            {role === "student" && year && (
              <Badge variant="outline">
                Year {year}
              </Badge>
            )}

            {isProfileComplete ? (
              <Badge className="bg-green-600 hover:bg-green-700">
                ✓ Profile Complete
              </Badge>
            ) : (
              <Badge variant="destructive">
                Incomplete Profile
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}