interface Activity {
  id: string;
  type: string;
  description: string;
  createdAt: string;
}

export function ActivityFeed({ activities }: { activities: Activity[] }) {
  const iconMap: Record<string, string> = {
    ORDER_CREATED: "shopping_bag",
    ORDER_PAID: "payments",
    ORDER_SHIPPED: "local_shipping",
    ORDER_DELIVERED: "check_circle",
    ORDER_CANCELLED: "cancel",
    LOGIN: "login",
    PROFILE_UPDATED: "person",
    ADDRESS_ADDED: "location_on",
  };

  return (
    <div className="bg-surface-container-low border border-outline-variant p-6">
      <h3 className="font-headline-sm text-headline-sm text-primary mb-6">Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="font-body-md text-body-md text-on-surface-variant">No recent activity.</p>
      ) : (
        <div className="space-y-5">
          {activities.map((a) => (
            <div key={a.id} className="flex gap-3">
              <span className="material-symbols-outlined text-primary/60 text-[20px] mt-0.5">
                {iconMap[a.type] || "circle"}
              </span>
              <div>
                <p className="font-body-md text-body-md text-on-surface">{a.description}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {new Date(a.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
