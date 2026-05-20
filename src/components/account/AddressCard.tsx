"use client";

import { useState } from "react";
import Link from "next/link";

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

export function AddressCard({
  address,
  onSetDefault,
  onDelete,
}: {
  address: Address;
  onSetDefault: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-surface-container-low border border-outline-variant p-6 relative">
      {address.isDefault && (
        <span className="absolute top-3 right-3 font-label-caps text-[10px] text-primary uppercase tracking-wider border border-primary px-2 py-0.5">
          Default
        </span>
      )}
      <div className="font-body-md text-body-md text-on-surface space-y-1 mb-4">
        <p className="font-medium">
          {address.firstName} {address.lastName}
        </p>
        {address.label && (
          <p className="font-label-caps text-label-caps text-primary">{address.label}</p>
        )}
        <p>{address.line1}</p>
        {address.line2 && <p>{address.line2}</p>}
        <p>
          {address.city}, {address.state} {address.zipCode}
        </p>
      </div>
      <div className="flex gap-4">
        {!address.isDefault && (
          <button
            onClick={onSetDefault}
            className="font-label-caps text-label-caps text-primary hover:underline"
          >
            Set Default
          </button>
        )}
        <button onClick={onDelete} className="font-label-caps text-label-caps text-error hover:underline">
          Remove
        </button>
      </div>
    </div>
  );
}

export function AddressForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<AddressInput>;
  onSave: (data: AddressInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<AddressInput>({
    firstName: initial?.firstName || "",
    lastName: initial?.lastName || "",
    line1: initial?.line1 || "",
    line2: initial?.line2 || "",
    city: initial?.city || "",
    state: initial?.state || "",
    zipCode: initial?.zipCode || "",
    phone: initial?.phone || "",
    isDefault: initial?.isDefault || false,
    label: initial?.label || "",
  });
  const [saving, setSaving] = useState(false);

  const set = (key: string, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface-container-low border border-outline-variant p-6 space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="First Name" value={form.firstName} onChange={(v) => set("firstName", v)} />
        <Field label="Last Name" value={form.lastName} onChange={(v) => set("lastName", v)} />
      </div>
      <Field label="Label (e.g. Home, Office)" value={form.label || ""} onChange={(v) => set("label", v)} />
      <Field label="Address Line 1" value={form.line1} onChange={(v) => set("line1", v)} />
      <Field label="Address Line 2 (optional)" value={form.line2 || ""} onChange={(v) => set("line2", v)} />
      <div className="grid grid-cols-3 gap-4">
        <Field label="City" value={form.city} onChange={(v) => set("city", v)} />
        <Field label="State" value={form.state} onChange={(v) => set("state", v)} />
        <Field label="ZIP Code" value={form.zipCode} onChange={(v) => set("zipCode", v)} />
      </div>
      <Field label="Phone (+1XXXXXXXXXX)" value={form.phone || ""} onChange={(v) => set("phone", v)} />
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(e) => set("isDefault", e.target.checked)}
          className="w-5 h-5 bg-transparent border-2 border-primary text-primary focus:ring-0 rounded-none"
        />
        <span className="font-body-md text-body-md text-on-surface">Set as default address</span>
      </label>
      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-on-primary px-8 py-3 font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-fixed-dim transition-all disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-outline-variant text-on-surface px-8 py-3 font-label-caps text-label-caps hover:bg-surface-container-higher transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-label-caps text-label-caps text-on-surface-variant">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-surface-container-lowest border border-outline-variant p-3 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
      />
    </div>
  );
}

interface AddressInput {
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  isDefault: boolean;
  label?: string;
}
