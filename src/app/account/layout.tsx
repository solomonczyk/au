import { requireAuth } from "@/lib/auth-helpers";
import { AccountSidebar } from "@/components/account/AccountSidebar";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth();

  return (
    <div className="flex min-h-screen bg-surface">
      <AccountSidebar
        user={{ name: session.user?.name ?? null, email: session.user?.email ?? null }}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-gutter lg:p-8 pb-24 md:pb-8">{children}</main>
      </div>
    </div>
  );
}
