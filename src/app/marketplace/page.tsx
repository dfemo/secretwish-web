import type { Metadata } from "next";
import { Accent, PageHero } from "@/components/blocks";
import { Marketplace } from "@/components/marketplace";

export const metadata: Metadata = { title: "Marketplace", description: "Browse open wishlists and pick a gift to make someone's day. No account needed until you gift." };

export default function MarketplacePage() {
  return (
    <>
      <PageHero
        eyebrow="Marketplace"
        title={<>Open wishlists, <Accent>ready to gift</Accent></>}
        intro="Browse wishlists people have made public and pick something to make their day. Look around freely. You only sign in when you choose a gift."
      />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Marketplace />
      </section>
    </>
  );
}
