import type { Metadata } from "next";
import { Gift, ListChecks, Store } from "lucide-react";
import { Accent, CtaBand, PageHero, PrimaryLink, Section } from "@/components/blocks";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "How it Works", description: "How SecretWish works for senders, recipients and vendors." };

const journeys = [
  {
    id: "senders",
    icon: Gift,
    who: "For senders",
    title: "Send a gift without spoiling it",
    cta: { label: "Send a gift", href: links.sender },
    steps: [
      ["Find the perfect gift", "Open a wishlist link a friend shared, browse public wishlists, or explore gifts from approved vendors."],
      ["Or brief a surprise", "Describe the moment, choose a category and set a budget range. Vendors quote within it; quotes outside it are flagged."],
      ["Personalise", "Choose quantity and variant, add a card message and a delivery date, and decide whether to reveal your name after delivery."],
      ["Pay securely", "Checkout shows product, delivery, VAT and any discount separately. Payment happens with a licensed provider — we never see your card."],
      ["Track every step", "Follow payment, vendor acceptance, dispatch and delivery. Updates can be discreet so nothing leaks on a shared phone."],
    ],
  },
  {
    id: "recipients",
    icon: ListChecks,
    who: "For recipients",
    title: "Wish out loud, stay private",
    cta: { label: "Create a wishlist", href: links.recipient },
    steps: [
      ["Build a wishlist", "Add items from approved vendors, set priorities, quantities and notes like size or colour, and group them your way."],
      ["Choose who sees it", "Private, anyone-with-the-link, or publicly discoverable — public only after you explicitly confirm. Rotate a link any time."],
      ["Receive without spoilers", "You'll see that something special is on its way — not what it is, what it cost or who sent it."],
      ["Verify with your secret code", "Enter the code from your gift card to confirm safe delivery. Codes are single-use, expire, and lock after repeated wrong attempts."],
      ["Say thank you — if they let you", "If the sender chose to reveal themselves, you'll see who it's from once it's arrived."],
    ],
  },
  {
    id: "vendors",
    icon: Store,
    who: "For vendors",
    title: "Fulfil beautifully, get paid reliably",
    cta: { label: "Become a vendor", href: "/vendors" },
    steps: [
      ["Get approved", "Apply with your business registration, settlement account and director ID. We review every vendor before they sell."],
      ["List your products", "Add products with prices, stock and delivery options. Listings are reviewed before going live."],
      ["Accept and prepare", "Accept new orders within 12 hours, pack discreetly with the sender's card message and no prices on the slip."],
      ["Dispatch with tracking", "Hand over to your courier and add the tracking reference. Delivery is confirmed by the recipient's code or courier proof."],
      ["Receive payouts", "Eligible orders are paid out through the payment provider after the hold period, minus commission. Disputes are resolved first."],
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero eyebrow="How it works" title={<>Simple for everyone. <Accent>Secret</Accent> where it matters.</>} intro="SecretWish connects the people who wish, the people who give and the vendors who make it happen — with privacy and accountability at every step.">
        {journeys.map((j) => (
          <a key={j.id} href={`#${j.id}`} className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 hover:border-plum-300 hover:text-plum-600">
            {j.who}
          </a>
        ))}
      </PageHero>
      {journeys.map((j, idx) => (
        <Section key={j.id} id={j.id} eyebrow={j.who} title={j.title} className={idx === 0 ? "!pt-10" : ""}>
          <ol className="mx-auto max-w-3xl">
            {j.steps.map(([title, body], i) => (
              <li key={title} className="relative flex gap-5 pb-8 last:pb-0">
                {i < j.steps.length - 1 && <span className="absolute top-12 left-6 h-[calc(100%-3rem)] w-px bg-plum-200" aria-hidden />}
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-plum-600 text-lg font-bold text-white shadow-[0_8px_20px_rgb(100_58_123/0.25)]">{i + 1}</span>
                <div className="pt-1.5">
                  <h3 className="text-lg font-bold text-ink-900">{title}</h3>
                  <p className="mt-1 leading-relaxed text-ink-500">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <PrimaryLink href={j.cta.href} external={j.cta.href.startsWith("http")}>
              <j.icon className="size-4" aria-hidden /> {j.cta.label}
            </PrimaryLink>
          </div>
        </Section>
      ))}
      <CtaBand />
    </>
  );
}
