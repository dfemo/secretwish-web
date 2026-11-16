import type { Metadata } from "next";
import { Accent, Faq, PageHero, Section } from "@/components/blocks";
import { PricingPlans } from "@/components/pricing-plans";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Pricing", description: "Free to join. Your first gift up to $100 has no SecretWish fee. Simple monthly or yearly plans after that, with a saving when you pay yearly." };

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing" title={<>Free to join. <Accent>Fair</Accent> when you grow.</>} intro="Registration is free for everyone. Your first gift — up to $100 — carries no SecretWish fee. Prices are set in US dollars and shown in your local currency (naira in Nigeria)." />
      <section aria-label="Plans for senders and wishlist owners" className="bg-[linear-gradient(135deg,#f3eef7_0%,#fbf6e8_100%)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-ink-900 md:text-[40px]">For senders &amp; wishlist owners</h2>
          <p className="mb-10 text-center text-[17px] text-ink-500">Prices in US dollars; you&apos;ll see and pay them in your local currency.</p>
          <PricingPlans audience="customer" href={links.sender} />
          <p className="mt-8 text-center text-sm text-ink-500">Gift prices, delivery and VAT are always shown separately at checkout.</p>
        </div>
      </section>
      <section aria-label="Plans for vendors" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-ink-900 md:text-[40px]">For vendors</h2>
        <p className="mb-10 text-center text-[17px] text-ink-500">A commission also applies to each order&apos;s product subtotal.</p>
        <PricingPlans audience="vendor" href={links.vendor} />
      </section>
      <Section eyebrow="FAQ" title="Pricing questions">
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
