"use client";

import { Star } from "lucide-react";
import { useApi } from "@/shared/lib/api";
import { money } from "@/shared/lib/format";
import { ProductArt, Skeleton } from "@/shared/ui/primitives";
import { links } from "@/lib/site";

type Showcase = {
  categories: { id: string; name: string; emoji: string; products: number }[];
  featured: { id: string; name: string; emoji: string; tint: string; priceUsd: number; rating: number; category: string; vendor: string; city: string }[];
  stats: { vendors: number; gifts: number; cities: number };
};

/** Live examples from the marketplace (via the public API). Falls back quietly if the API is offline. */
export function FeaturedGifts() {
  const { data, error, loading } = useApi<Showcase>("/public/showcase");
  if (error) return <p className="text-center text-sm text-ink-500">Browse the full collection in the marketplace.</p>;
  return (
    <>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
        {loading && Array.from({ length: 8 }).map((_, i) => <li key={i}><Skeleton className="aspect-square" /></li>)}
        {data?.featured.map((p) => (
          <li key={p.id}>
            <a href={`${links.sender}/products/${p.id}`} className="group block">
              <ProductArt emoji={p.emoji} tint={p.tint} size="lg" className="transition-transform group-hover:-translate-y-1" label={p.name} />
              <p className="mt-3 line-clamp-1 text-sm font-semibold text-ink-900 group-hover:text-plum-600">{p.name}</p>
              <p className="text-xs text-ink-500">{p.vendor} · {p.city}</p>
              <p className="mt-1 flex items-center justify-between text-sm">
                <b className="tabular">{money(p.priceUsd)}</b>
                <span className="inline-flex items-center gap-0.5 text-xs text-ink-500"><Star className="size-3 fill-gold-500 text-gold-500" aria-hidden /> {p.rating.toFixed(1)}</span>
              </p>
            </a>
          </li>
        ))}
      </ul>
      {data && (
        <ul className="mt-12 flex flex-wrap justify-center gap-2">
          {data.categories.map((c) => (
            <li key={c.id}>
              <a href={`${links.sender}/browse?category=${c.id}`} className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-[13px] font-semibold text-ink-700 hover:border-plum-300 hover:text-plum-600">
                <span aria-hidden>{c.emoji}</span> {c.name} <span className="text-ink-400">{c.products}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function LiveStats() {
  const { data } = useApi<Showcase>("/public/showcase");
  const stats = [
    { value: data ? `${data.stats.vendors}` : "—", label: "Approved vendors" },
    { value: data ? `${data.stats.gifts}` : "—", label: "Gifts to choose from" },
    { value: data ? `${data.stats.cities}` : "—", label: "Cities served" },
    { value: "$100", label: "First gift, no SecretWish fee" },
  ];
  return (
    <div className="mx-auto max-w-5xl px-4">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink-200 bg-ink-200 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white px-6 py-7 text-center">
            <dd className="text-3xl font-bold tracking-tight text-plum-600 tabular">{s.value}</dd>
            <dt className="mt-1 text-xs font-medium text-ink-500">{s.label}</dt>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-center text-[11px] text-ink-400">Prototype · counts come from sample data</p>
    </div>
  );
}
