"use client";

import { useEffect, useState } from "react";
import { ProfileForm } from "@/components/account/ProfileForm";
import { PasswordForm } from "@/components/account/PasswordForm";

interface User {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  emailVerified: Date | null;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setUser(json.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Profile</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Manage your personal information and security.
        </p>
      </div>

      {user ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          <ProfileForm user={user} />
          <PasswordForm />
        </div>
      ) : (
        <div className="animate-pulse bg-surface-container-low border border-outline-variant p-6 h-64" />
      )}
    </div>
  );
}
