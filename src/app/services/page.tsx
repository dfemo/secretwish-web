import type { Metadata } from "next";
import { Briefcase, Gift, KeyRound, ListChecks, PackageCheck, Sparkles, Store } from "lucide-react";
import { Accent, CtaBand, PageHero, PrimaryLink, SecondaryLink, Section } from "@/components/blocks";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Services", description: "Wishlists, secret surprise packages, surprise requests, corporate gifting and discreet delivery." };

const services = [
  { icon: ListChecks, title: "Shareable wishlists", body: "Create lists for birthdays, weddings, new homes or just because. Share privately by link; friends gift without seeing your address, and gifted items are marked so nobody doubles up.", points: ["Private, link-only or public", "Priorities, notes, quantities and groups", "Rotate a share link any time"] },
  { icon: Gift, title: "Secret surprise packages", body: "Choose a gift from an approved vendor and send it anonymously. Add a card message, a delivery date and decide whether to reveal yourself after it arrives.", points: ["Anonymous by default", "Price hidden from the recipient", "Discreet outer packaging"] },
  { icon: Sparkles, title: "Surprise requests with a budget", body: "Not sure what to buy? Describe the person and the moment, set a minimum and maximum budget, and approved vendors send you ideas within it.", points: ["Quotes compared side by side", "Out-of-range quotes clearly flagged", "Check out the quote you love"] },
  { icon: Briefcase, title: "Corporate & team gifting", body: "Thank clients, welcome new starters or celebrate milestones. Use one account to send many discreet gifts, with a single place to track them all.", points: ["Multiple recipients", "Card messages per gift", "Talk to us for volume needs"] },
  { icon: PackageCheck, title: "Discreet delivery & tracking", body: "Vendors pack without prices on the slip and dispatch with tracked couriers. Senders follow every step; recipients only learn something is on its way.", points: ["Standard, express and same-day options", "Tracking references on every order", "Discreet notifications"] },
  { icon: KeyRound, title: "Secret-code verification", body: "Each gift carries a single-use code. When the recipient enters it, delivery is confirmed — protecting senders and making sure vendors are paid for real deliveries.", points: ["Single-use and time-limited", "Locks after repeated wrong attempts", "Support on hand if a code is lost"] },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title={<>Everything you need to <Accent>gift well</Accent></>} intro="From a carefully curated wishlist to a fully secret surprise, SecretWish handles the details — discovery, payment, discreet delivery, verification and support.">
        <PrimaryLink href={links.sender} external>Start gifting</PrimaryLink>
        <SecondaryLink href="/contact">Talk to us</SecondaryLink>
      </PageHero>
      <Section title={<>Our <Accent>services</Accent></>} className="!pt-8">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.title} className="flex flex-col rounded-[28px] border border-ink-200 bg-white p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-plum-50 text-plum-600"><s.icon className="size-6" aria-hidden /></span>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.body}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-700">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2"><span className="text-plum-500" aria-hidden>✓</span>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>
      <Section eyebrow="Categories" title={<>Gifts for <Accent>every moment</Accent></>} className="!pt-0">
        <ul className="flex flex-wrap justify-center gap-3">
          {[["💐", "Flowers & bouquets"], ["🎂", "Cakes & treats"], ["🧺", "Hampers"], ["👗", "Fashion"], ["🌸", "Beauty & fragrance"], ["🎧", "Tech & gadgets"], ["💍", "Jewellery"], ["🕯️", "Home & living"], ["📚", "Books & stationery"], ["🎟️", "Experiences"]].map(([e, n]) => (
            <li key={n} className="inline-flex items-center gap-2 rounded-2xl border border-ink-200 bg-white px-5 py-3 text-sm font-semibold text-ink-700"><span className="text-xl" aria-hidden>{e}</span>{n}</li>
          ))}
        </ul>
        <p className="mt-10 text-center"><SecondaryLink href={`${links.sender}/browse`} external><Store className="size-4" aria-hidden /> Browse the marketplace</SecondaryLink></p>
      </Section>
      <CtaBand />
    </>
  );
}
