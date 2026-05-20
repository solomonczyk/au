export function AccountTopbar({ user }: { user: { name?: string | null; email?: string | null } }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-surface/95 backdrop-blur border-b border-outline-variant">
      <div className="flex items-center gap-3 md:hidden">
        <span className="font-headline-sm text-headline-sm text-primary tracking-widest uppercase">AUREUM</span>
      </div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
          {user.name?.charAt(0)?.toUpperCase() ?? "U"}
        </div>
        <span className="font-body-sm text-body-sm text-on-surface hidden sm:block">
          {user.name ?? "User"}
        </span>
      </div>
    </header>
  );
}
