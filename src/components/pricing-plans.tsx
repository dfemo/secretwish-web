"use client";

import { useState } from "react";
import { useApi } from "@/shared/lib/api";
import { BillingToggle, PricingCards, type Billing, type PlanCatalog } from "@/shared/ui/pricing";
import { Skeleton } from "@/shared/ui/primitives";

/** Whole dollars without decimals ($17), otherwise cents ($9.58): the website shows plan prices in USD. */
const usd = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;

/** The plans admins have set for customers or vendors, with the Annual / Monthly switch. Each card links to the app to sign up. */
export function PricingPlans({ audience, href }: { audience: "customer" | "vendor"; href: string }) {
  const { data, error } = useApi<PlanCatalog>(`/plans/${audience}`);
  const [billing, setBilling] = useState<Billing>("Yearly");
  if (error) return <p className="text-center text-sm text-ink-500">Plans couldn&apos;t be loaded just now. Please refresh the page.</p>;
  if (!data) return <div className="grid gap-5 lg:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-[520px] rounded-[30px]" />)}</div>;
  return (
    <>
      <div className="mb-10 flex justify-center">
        <BillingToggle value={billing} onChange={setBilling} />
      </div>
      <PricingCards
        catalog={data}
        billing={billing}
        format={usd}
        currencyNote="(USD)"
        action={(p) => (
          <a
            href={href}
            className={`inline-flex min-w-40 items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium shadow-sm transition ${p.highlighted ? "bg-white text-plum-950 hover:bg-ivory-100" : "bg-ivory-100 text-ink-900 hover:bg-ivory-200"}`}
          >
            {p.isFree ? "Get started free" : `Choose ${p.name}`}
          </a>
        )}
      />
    </>
  );
}
