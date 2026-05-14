import type { Metadata } from "next";
import { ProfileForm } from "@/features/auth/components/ProfileForm";

export const metadata: Metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-xl">
      <div><h1 className="text-2xl font-bold">Profile</h1><p className="text-muted-foreground text-sm mt-1">Manage your personal information</p></div>
      <ProfileForm defaultValues={{ name: "John Doe", email: "john@example.com", phone: "" }} />
    </div>
  );
}
