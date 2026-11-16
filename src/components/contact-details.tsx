"use client";

import { Clock, Mail, MapPin } from "lucide-react";
import { useApi } from "@/shared/lib/api";

type Contact = { email?: string | null; deliveryAreas?: string | null; supportHours?: string | null };

/** Shown until the API answers, and wherever an admin hasn't set a value (Admin → Settings → Contact details). */
const fallback = {
  email: "hello@secretwish.example",
  deliveryAreas: "Lagos, Abuja, Port Harcourt, Ibadan, Enugu and Kano — more cities soon.",
  supportHours: "Monday to Saturday, 8am – 8pm WAT. Urgent delivery issues are prioritised.",
};

/** The contact page's email, delivery areas and support hours, as set by admins. */
export function ContactDetails() {
  const { data } = useApi<{ contact?: Contact | null }>("/meta");
  const c = data?.contact;
  const email = c?.email || fallback.email;
  const items = [
    { icon: Mail, t: "Email", b: <a href={`mailto:${email}`} className="break-all text-plum-700 hover:underline">{email}</a> },
    { icon: MapPin, t: "Where we deliver", b: c?.deliveryAreas || fallback.deliveryAreas },
    { icon: Clock, t: "Support hours", b: c?.supportHours || fallback.supportHours },
  ];
  return (
    <>
      {items.map((i) => (
        <li key={i.t} className="flex gap-4 rounded-3xl border border-ink-200 bg-white p-6">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-plum-50 text-plum-600"><i.icon className="size-5" aria-hidden /></span>
          <div className="min-w-0">
            <p className="font-bold text-ink-900">{i.t}</p>
            <p className="mt-1 text-sm whitespace-pre-line text-ink-500">{i.b}</p>
          </div>
        </li>
      ))}
    </>
  );
}
