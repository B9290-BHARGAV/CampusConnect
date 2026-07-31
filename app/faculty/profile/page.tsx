import EditProfileForm from "@/components/profile/EditProfileForm";

export default function FacultyProfilePage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>

        <p className="mt-2 text-muted-foreground">
          View and update your faculty profile information.
        </p>
      </div>

      <EditProfileForm />
    </div>
  );
}