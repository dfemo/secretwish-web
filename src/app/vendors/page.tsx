import type { Metadata } from "next";
import { BadgeCheck, BarChart3, ClipboardCheck, HandCoins, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Accent, Faq, PageHero, PrimaryLink, SecondaryLink, Section } from "@/components/blocks";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "For Vendors", description: "Sell gifts on SecretWish: reach ready-to-gift customers, quote on surprises and get paid reliably." };

export default function VendorsPage() {
  return (
    <>
      <PageHero eyebrow="For vendors" title={<>Grow with customers who are <Accent>ready to gift</Accent></>} intro="SecretWish brings you senders with a clear occasion and a budget. You focus on beautiful gifts and on-time delivery; we handle discovery, payments and customer care.">
        <PrimaryLink href="/contact">Apply to sell</PrimaryLink>
        <SecondaryLink href={links.vendor} external>Vendor login</SecondaryLink>
      </PageHero>

      <Section title={<>Why vendors choose <Accent>SecretWish</Accent></>} className="!pt-8">
        <ul className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Sparkles, title: "Demand with intent", body: "Wishlists tell you exactly what people want. Surprise requests come with a category, a story and a budget range." },
            { icon: HandCoins, title: "Transparent payouts", body: "See every order's earnings, commission and payout eligibility. Payouts go through the payment provider after verified delivery." },
            { icon: BarChart3, title: "Tools that help you run", body: "A fulfilment board, stock alerts, sales analytics and a single inbox for operations — on desktop or phone." },
          ].map((c) => (
            <li key={c.title} className="rounded-3xl border border-ink-200 bg-white p-7">
              <c.icon className="size-7 text-plum-600" aria-hidden />
              <h3 className="mt-4 font-bold text-ink-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-white py-20" aria-labelledby="flow-h">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="flow-h" className="text-center text-3xl font-bold tracking-tight text-ink-900 md:text-[40px]">How selling works</h2>
          <ol className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              { icon: ClipboardCheck, t: "Apply & verify", b: "Business registration, settlement account and director ID are checked before approval." },
              { icon: BadgeCheck, t: "List & get reviewed", b: "Products are reviewed for quality and compliance before customers can see them." },
              { icon: Truck, t: "Accept & dispatch", b: "Accept within 12 hours, pack discreetly, dispatch with a tracking reference." },
              { icon: HandCoins, t: "Get paid", b: "After verified delivery and a short hold period, with no open disputes." },
            ].map((s, i) => (
              <li key={s.t} className="rounded-3xl bg-[#f6f3f9] p-6">
                <span className="text-xs font-bold text-plum-500">STEP {i + 1}</span>
                <s.icon className="mt-3 size-6 text-plum-600" aria-hidden />
                <h3 className="mt-3 font-bold text-ink-900">{s.t}</h3>
                <p className="mt-1.5 text-sm text-ink-500">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section eyebrow="Standards" title={<>What we <Accent>expect</Accent></>}>
        <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
          {["Respond to new orders within 12 hours", "Pack discreetly — no prices on slips or cards", "Use tracked delivery and add the reference", "Keep stock accurate so orders aren't missed", "Never mark an order delivered yourself", "Cooperate with evidence on refunds and disputes"].map((x) => (
            <li key={x} className="flex items-start gap-3 rounded-2xl border border-ink-200 bg-white px-5 py-4 text-sm text-ink-700"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-plum-600" aria-hidden />{x}</li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Vendor FAQ" title="Good to know" className="!pt-0">
        <Faq
          items={[
            { q: "What does it cost to sell?", a: "Vendors subscribe monthly, or yearly at a reduced price, and SecretWish takes a commission on the product subtotal. Final price points will be published at launch." },
            { q: "When do I get paid?", a: "Once an order is delivered with evidence (the recipient's code or courier proof), the hold period has passed and there's no open refund or dispute, it joins your next payout through the payment provider." },
            { q: "Will I see who sent the gift?", a: "No. You see what you need to fulfil — the items, card message, and the recipient's delivery details — never the sender's identity." },
            { q: "Can I decline an order?", a: "Yes, with a reason. Our operations team will refund the sender or offer an alternative. Declines affect your acceptance rate." },
          ]}
        />
      </Section>
    </>
  );
}
