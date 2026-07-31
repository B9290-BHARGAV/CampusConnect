import EditProfileForm from "@/components/profile/EditProfileForm";

export default function StudentProfilePage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-2">
          View and update your personal information.
        </p>
      </div>

      <EditProfileForm />
    </div>
  );
}