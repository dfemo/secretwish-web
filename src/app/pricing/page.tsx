import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Accent, Faq, PageHero, Section } from "@/components/blocks";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Pricing", description: "Free to join. Your first gift up to $100 has no SecretWish fee. Simple monthly or yearly plans after that." };

const customer = [
  { name: "Free", price: "$0", note: "to register", features: ["Your first gift or sample wishlist up to $100 with no SecretWish fee", "Shareable wishlists", "Discreet delivery & tracking"], cta: "Get started", href: links.sender, highlight: false },
  { name: "Monthly", price: "TBC", note: "per month", features: ["Unlimited gifts and wishlists", "Surprise requests with vendor quotes", "Priority support"], cta: "Choose monthly", href: links.sender, highlight: true },
  { name: "Yearly", price: "TBC", note: "per year · reduced price", features: ["Everything in Monthly", "Best value for frequent gifters", "Great for teams"], cta: "Choose yearly", href: links.sender, highlight: false },
];

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing" title={<>Free to join. <Accent>Fair</Accent> when you grow.</>} intro="Registration is free for everyone. Your first gift — up to $100 — carries no SecretWish fee. Prices are set in US dollars and shown in your local currency (naira in Nigeria)." />
      <Section title="For senders & wishlist owners" className="!pt-8">
        <ul className="grid gap-6 md:grid-cols-3">
          {customer.map((p) => (
            <li key={p.name} className={`flex flex-col rounded-[28px] p-8 ${p.highlight ? "bg-plum-800 text-white shadow-[0_30px_60px_rgb(43_23_54/0.25)]" : "border border-ink-200 bg-white"}`}>
              <p className={`text-sm font-bold ${p.highlight ? "text-gold-300" : "text-plum-600"}`}>{p.name}</p>
              <p className="mt-3 text-4xl font-bold tracking-tight">{p.price}</p>
              <p className={`text-sm ${p.highlight ? "text-plum-200" : "text-ink-500"}`}>{p.note}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><Check className={`mt-0.5 size-4 shrink-0 ${p.highlight ? "text-gold-300" : "text-plum-600"}`} aria-hidden />{f}</li>
                ))}
              </ul>
              <a href={p.href} className={`mt-8 rounded-xl px-5 py-3 text-center text-sm font-semibold ${p.highlight ? "bg-white text-plum-800 hover:bg-plum-50" : "bg-plum-600 text-white hover:bg-plum-700"}`}>{p.cta}</a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm text-ink-500">“TBC”: plan price points will be published at launch. Gift prices, delivery and VAT are always shown separately at checkout.</p>
      </Section>
      <Section title="For vendors" className="!pt-0">
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {[["Vendor monthly", "Billed monthly"], ["Vendor yearly", "Billed yearly at a reduced price"]].map(([n, d]) => (
            <div key={n} className="rounded-[28px] border border-ink-200 bg-white p-8">
              <p className="text-sm font-bold text-plum-600">{n}</p>
              <p className="mt-3 text-4xl font-bold tracking-tight text-ink-900">TBC</p>
              <p className="text-sm text-ink-500">{d}</p>
              <p className="mt-5 text-sm text-ink-700">Listing, order management, surprise-request quoting and payouts. A commission applies to each order&apos;s product subtotal.</p>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="FAQ" title="Pricing questions" className="!pt-0">
        <Faq
          items={[
            { q: "What counts as my free first gift?", a: "One gift or sample wishlist per person, as long as its total is $100 or less. Anything above $100, or any further gift, needs a plan." },
            { q: "Why US dollars?", a: "USD is our universal base currency. You'll always see and pay in your local currency at the rate recorded when you order." },
            { q: "Are there hidden fees?", a: "No. Checkout shows the gift price, delivery, VAT and any discount separately before you pay." },
          ]}
        />
      </Section>
    </>
  );
}
