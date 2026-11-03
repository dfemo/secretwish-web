"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarDays, Gift, Heart, Lock, MapPin } from "lucide-react";
import { usePagedApi, useApi } from "@/shared/lib/api";
import { date, money } from "@/shared/lib/format";
import { EmptyState, ErrorState, Select, SearchInput, Skeleton, Tabs } from "@/shared/ui/primitives";
import { PagedFooter } from "@/shared/ui/data";
import { links } from "@/lib/site";

type Card = {
  title: string; description: string; occasion: string | null; eventDate: string | null; currency: string; token: string; createdAt: string;
  owner: { firstName: string; city: string }; wishes: number; open: number; preview: { name: string; emoji: string }[];
  /** Gifts received (orders and cash, including cash for the list as a whole). Counts only. */
  gifts: number;
  closure: Closure | null;
};

/** How a list closed: by its owner (Thanks / NoLongerNeeded, with their message if they shared it) or by SecretWish (Staff). */
export type Closure = { at: string; kind: "Thanks" | "NoLongerNeeded" | "Staff"; note: string | null };

export function closureTitle(c: Closure, firstName: string) {
  return c.kind === "Thanks" ? `${firstName} closed this list to say thank you` : c.kind === "NoLongerNeeded" ? `${firstName} doesn't need gifts from this list any more` : "This wishlist is closed";
}

export type Wish = {
  id: string; kind: "Catalog" | "Custom" | "Cash"; name: string; notes: string; quantity: number; fulfilled: boolean; category: string;
  url: string | null; imageUrl: string | null; estimatedPriceUsd: number | null; cashAmountUsd: number | null;
  product: { id: string; name: string; priceUsd: number; emoji: string; tint: string; available: boolean; vendor: string } | null;
};
export type PublicWishlist = {
  title: string; description: string; occasion: string | null; eventDate: string | null; visibility: string; currency: string; token: string;
  owner: { firstName: string; city: string }; items: Wish[];
  /** Gifts received, and how many were cash. Counts only: amounts and gifters stay private. */
  gifts: number; cashGifts: number; closed: boolean; closure: Closure | null;
};

/** "Gifted once" / "Gifted 3 times". */
export const giftedTimes = (n: number) => (n === 1 ? "Gifted once" : `Gifted ${n} times`);

const occasions = ["Birthday", "Wedding", "Anniversary", "Graduation", "Baby shower", "Housewarming", "Valentine's", "Christmas", "Just because"];

/** Units of `currency` per US dollar from the public /meta endpoint (amounts are stored in USD). */
export function useRates() {
  const { data } = useApi<{ fxRateNgn: number; currencies?: { code: string; perUsd: number }[] }>("/meta");
  return (code: string) => (code === "USD" ? 1 : data?.currencies?.find((c) => c.code === code)?.perUsd ?? (code === "NGN" ? (data?.fxRateNgn ?? 1550) : 1));
}

/** The public marketplace: open wishlists anyone can browse. Signing in is only needed to gift something. */
export function Marketplace() {
  const [occasion, setOccasion] = useState("");
  // Open lists take gifts; closed ones show how they ended (and the owner's thank-you, where shared).
  const [status, setStatus] = useState<"open" | "closed">("open");
  const { data, items, error, loading, reload, setPage, search, setSearch } = usePagedApi<Card>("/public/wishlists", { occasion, status }, 12);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Tabs className="w-fit" value={status} onChange={setStatus} tabs={[{ value: "open", label: "Open" }, { value: "closed", label: "Closed & thank-yous" }]} />
        <SearchInput value={search} onChange={setSearch} label="Search wishlists" placeholder="Search by title or occasion" className="min-w-[240px] flex-1 sm:flex-none sm:w-80" />
        <label htmlFor="occasion" className="sr-only">Occasion</label>
        <Select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)} className="w-52">
          <option value="">All occasions</option>
          {occasions.map((o) => <option key={o}>{o}</option>)}
        </Select>
      </div>
      {error && <ErrorState error={error} onRetry={reload} />}
      {items?.length === 0 && (
        <EmptyState icon={Gift} title={search || occasion ? "No wishlists match" : status === "closed" ? "No closed wishlists yet" : "No open wishlists yet"} description={status === "closed" ? "When owners close a public list, it moves here with their message." : "Public wishlists appear here as soon as their owners publish them."} />
      )}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading && !data && Array.from({ length: 6 }).map((_, i) => <li key={i}><Skeleton className="h-52 rounded-3xl" /></li>)}
        {items?.map((w) => (
          <li key={w.token}>
            <Link href={`/marketplace/${w.token}`} className="group flex h-full flex-col rounded-3xl border border-ink-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-plum-300 hover:shadow-[var(--shadow-pop)]">
              <p className="text-xs font-semibold text-plum-600">{w.occasion ?? "Wishlist"}</p>
              <h2 className="mt-1 line-clamp-2 font-display text-xl font-semibold text-ink-900 group-hover:text-plum-700">{w.title}</h2>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
                <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" aria-hidden /> {w.owner.firstName} · {w.owner.city}</span>
                {w.eventDate && <span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" aria-hidden /> {date(w.eventDate)}</span>}
              </p>
              {w.closure && (
                <div className="mt-4 rounded-2xl bg-ivory-100 px-4 py-3 text-xs text-ink-700">
                  <p className="flex items-center gap-1.5 font-semibold text-plum-800">{w.closure.kind === "Thanks" && <Heart className="size-3.5" aria-hidden />}{closureTitle(w.closure, w.owner.firstName)}</p>
                  {w.closure.note && <p className="mt-1 line-clamp-3 font-display text-sm italic">“{w.closure.note}”</p>}
                </div>
              )}
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {!w.closure && w.preview.map((p, i) => (
                  <li key={i} className="max-w-full truncate rounded-full bg-plum-50 px-2.5 py-1 text-xs font-medium text-plum-800"><span aria-hidden>{p.emoji}</span> {p.name}</li>
                ))}
              </ul>
              <p className="mt-auto pt-5 text-xs font-semibold text-ink-700">
                {w.closure ? `Closed ${date(w.closure.at)}` : w.wishes === 0 ? "Open to cash gifts" : `${w.open} of ${w.wishes} wish${w.wishes === 1 ? "" : "es"} still open`}
                {w.gifts > 0 && ` · ${giftedTimes(w.gifts)}`} · <span className="text-plum-600">View list →</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <PagedFooter data={data} onPage={setPage} className="mt-6 rounded-2xl border border-ink-200 bg-white" />
      <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-ink-500">
        <Lock className="size-3.5" aria-hidden /> Private and link-only wishlists never appear here. Their owners share them directly.
      </p>
    </>
  );
}

/** Price shown for a wish, in the list's own currency. */
export function wishPrice(w: Wish, currency: string, rate: (c: string) => number) {
  const usd = w.product?.priceUsd ?? w.cashAmountUsd ?? w.estimatedPriceUsd;
  return usd == null ? null : `${w.kind === "Custom" ? "~" : ""}${money(usd, currency, rate(currency))}`;
}

/** Where a visitor goes to gift: the sender app's view of this list, which asks them to sign in first. */
export const giftLink = (token: string) => `${links.sender}/w/${token}`;
