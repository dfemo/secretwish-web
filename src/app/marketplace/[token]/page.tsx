"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CalendarDays, CheckCircle2, ExternalLink, Gift, LogIn, MapPin } from "lucide-react";
import { useApi } from "@/shared/lib/api";
import { date } from "@/shared/lib/format";
import { EmptyState, ErrorState, ProductArt, Skeleton } from "@/shared/ui/primitives";
import { giftedTimes, giftLink, useRates, wishPrice, type PublicWishlist } from "@/components/marketplace";

/** One open wishlist, viewable without an account. "Gift this" opens the sender app, which asks you to sign in at that point. */
export default function PublicWishlistPage() {
  const { token } = useParams<{ token: string }>();
  const { data, error, loading, reload } = useApi<PublicWishlist>(`/public/wishlists/${token}`);
  const rate = useRates();

  return (
    <section className="mx-auto max-w-4xl px-4 pt-32 pb-20">
      <Link href="/marketplace" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-plum-600">
        <ArrowLeft className="size-4" aria-hidden /> Marketplace
      </Link>
      {loading && !data && <Skeleton className="h-64 rounded-3xl" />}
      {error && (error.status === 404 ? <EmptyState icon={Gift} title="This wishlist isn't available" description="It may be private, or the link may have changed." /> : <ErrorState error={error} onRetry={reload} />)}
      {data && (
        <>
          <header className="rounded-3xl bg-plum-950 p-7 text-ivory-50">
            <p className="text-xs font-semibold text-gold-400">{data.occasion ?? "Wishlist"}</p>
            <h1 className="mt-1 font-display text-3xl font-semibold md:text-4xl">{data.title}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-plum-200">
              <span className="inline-flex items-center gap-1"><MapPin className="size-4" aria-hidden /> {data.owner.firstName} · {data.owner.city}</span>
              {data.eventDate && <span className="inline-flex items-center gap-1"><CalendarDays className="size-4" aria-hidden /> {date(data.eventDate)}</span>}
              {data.gifts > 0 && (
                <span className="rounded-full bg-gold-400/20 px-2.5 py-0.5 text-xs font-semibold text-gold-300">
                  {giftedTimes(data.gifts)}{data.cashGifts > 0 && ` · ${data.cashGifts === data.gifts ? "all cash" : `${data.cashGifts} in cash`}`}
                </span>
              )}
            </p>
            {data.description && <p className="mt-4 max-w-2xl text-sm text-plum-100">{data.description}</p>}
            <a href={giftLink(data.token)} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gold-400 px-5 py-3 text-sm font-semibold text-plum-950 hover:bg-gold-500">
              <LogIn className="size-4" aria-hidden /> Sign in to gift from this list
            </a>
            <p className="mt-2 text-xs text-plum-300">Gifts are delivered privately. {data.owner.firstName} never sees your details unless you choose to reveal them.</p>
          </header>

          <ul className="mt-6 space-y-3">
            {data.items.map((w) => {
              const price = wishPrice(w, data.currency, rate);
              return (
                <li key={w.id} className={`flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-4 ${w.fulfilled ? "opacity-60" : ""}`}>
                  {w.kind === "Custom" && w.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={w.imageUrl} alt="" referrerPolicy="no-referrer" className="size-14 shrink-0 rounded-xl object-cover" />
                  ) : (
                    <ProductArt emoji={w.kind === "Cash" ? "💸" : (w.product?.emoji ?? "🎁")} tint={w.kind === "Cash" ? "sage" : (w.product?.tint ?? "lavender")} size="sm" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink-900">{w.kind === "Cash" ? "Cash gift" : w.name}{w.quantity > 1 && ` ×${w.quantity}`}</p>
                    <p className="text-xs text-ink-500">
                      {w.kind === "Catalog" && w.product ? `from ${w.product.vendor}` : w.kind === "Custom" ? "Sourced by a SecretWish vendor" : w.category}
                      {w.notes && ` · “${w.notes}”`}
                    </p>
                    {w.url && (
                      <a href={w.url} target="_blank" rel="noopener noreferrer nofollow" className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-plum-600 hover:underline">
                        See the item <ExternalLink className="size-3" aria-hidden />
                      </a>
                    )}
                  </div>
                  <div className="text-right">
                    {price && <p className="text-sm font-bold tabular">{price}</p>}
                    {w.fulfilled ? (
                      <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-success-700"><CheckCircle2 className="size-3.5" aria-hidden /> Gifted</p>
                    ) : (
                      <a href={giftLink(data.token)} className="mt-1 inline-block rounded-lg bg-plum-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-plum-700">Gift this</a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          {data.items.length === 0 && <EmptyState icon={Gift} title="No wishes yet" />}
        </>
      )}
    </section>
  );
}
