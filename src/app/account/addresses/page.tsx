"use client";

import { useEffect, useState } from "react";
import { AddressCard } from "@/components/account/AddressCard";

interface Address {
  id: string;
  label?: string | null;
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  zipCode: string;
  phone?: string | null;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    try {
      const res = await fetch("/api/user/addresses");
      const json = await res.json();
      if (json.success) setAddresses(json.data);
    } catch {
      /* ignore */
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSetDefault = async (id: string) => {
    const res = await fetch(`/api/user/addresses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDefault: true }),
    });
    const json = await res.json();
    if (json.success) {
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: a.id === id }))
      );
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/user/addresses/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Addresses</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Manage your shipping addresses.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {[1, 2].map((i) => (
            <div key={i} className="bg-surface-container-low border border-outline-variant p-6 animate-pulse h-40" />
          ))}
        </div>
      ) : addresses.length === 0 ? (
        <div className="bg-surface-container-low border border-outline-variant p-12 text-center">
          <span className="material-symbols-outlined text-[48px] text-outline mb-4 block">location_off</span>
          <p className="font-body-md text-body-md text-on-surface-variant">No addresses saved yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              onSetDefault={() => handleSetDefault(addr.id)}
              onDelete={() => handleDelete(addr.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
