import Link from "next/link";
import { ArrowRight, BadgeCheck, EyeOff, Gift, KeyRound, ListChecks, Lock, MapPinOff, ShieldCheck, Sparkles, Store, Truck, Wallet } from "lucide-react";
import { Accent, CtaBand, Faq, PrimaryLink, SecondaryLink, Section } from "@/components/blocks";
import { HeroCards } from "@/components/hero-cards";
import { FeaturedGifts, LiveStats } from "@/components/showcase";
import { links } from "@/lib/site";

const steps = [
  { icon: ListChecks, title: "Wish or brief", body: "Recipients build a wishlist from approved vendors — or a sender briefs a surprise with a budget range." },
  { icon: Wallet, title: "Gift securely", body: "Senders pay through a licensed payment provider. Addresses stay private; the recipient learns nothing yet." },
  { icon: Truck, title: "Delivered discreetly", body: "The vendor packs and dispatches in discreet packaging. Everyone can track progress — without spoilers." },
  { icon: KeyRound, title: "Verified on arrival", body: "The recipient enters the secret code from their gift card. Only then is the vendor paid." },
];

const privacy = [
  { icon: MapPinOff, title: "Addresses stay private", body: "Senders only ever see a first name and city. The vendor and courier get the address — nobody else." },
  { icon: EyeOff, title: "No spoilers", body: "Recipients see “something special is on its way” — never the item, price or sender until it arrives." },
  { icon: Lock, title: "You choose who sees", body: "Wishlists are private by default. Share by link, or go public only when you say so." },
  { icon: ShieldCheck, title: "Discreet notifications", body: "Turn on discreet mode and previews never mention gifts, prices or people." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 pt-16 pb-6 text-center md:pt-24">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-plum-100 bg-white px-3 py-1 text-xs font-semibold text-plum-600 shadow-sm">
          <Sparkles className="size-3.5" aria-hidden /> Now launching in Lagos, Abuja &amp; beyond
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-[40px] leading-[1.08] font-bold tracking-tight text-ink-900 md:text-[60px]">
          Gift What They <Accent>Wish</Accent>, Keep It a <Accent>Secret</Accent>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-500">
          Whether it&apos;s a birthday, a thank-you or just because — share a wishlist or send a secret surprise from approved vendors, delivered discreetly anywhere we serve.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <PrimaryLink href={links.sender} external>Send a Gift</PrimaryLink>
          <SecondaryLink href="/how-it-works">How it Works</SecondaryLink>
        </div>
        <HeroCards />
      </section>

      <div className="pt-6 pb-4"><LiveStats /></div>

      <Section id="ways" eyebrow="Two ways to give" title={<>One platform, <Accent>two kinds of magic</Accent></>} intro="Gift exactly what someone hoped for, or let our vendors surprise them within your budget.">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[28px] border border-ink-200 bg-white p-8">
            <span className="grid size-12 place-items-center rounded-2xl bg-plum-50 text-plum-600"><ListChecks className="size-6" aria-hidden /></span>
            <h3 className="mt-5 text-xl font-bold text-ink-900">Wishlists</h3>
            <p className="mt-2 text-ink-500">Recipients add gifts from approved vendors, set priorities and notes, and share a private link. Friends gift from it without ever seeing the address — and items are marked as gifted so nobody doubles up.</p>
            <a href={links.recipient} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-plum-600 hover:underline">Create a wishlist <ArrowRight className="size-4" aria-hidden /></a>
          </article>
          <article className="rounded-[28px] bg-plum-800 p-8 text-white">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-gold-300"><Gift className="size-6" aria-hidden /></span>
            <h3 className="mt-5 text-xl font-bold">Secret surprise packages</h3>
            <p className="mt-2 text-plum-100">Not sure what to buy? Describe the moment and set a budget range. Approved vendors send quotes within it; you choose, we deliver — and the recipient never knows until it arrives.</p>
            <a href={`${links.sender}/surprises`} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold-300 hover:underline">Brief a surprise <ArrowRight className="size-4" aria-hidden /></a>
          </article>
        </div>
      </Section>

      <Section id="how" eyebrow="How it works" title={<>From wish to <Accent>wow</Accent> in four steps</>} className="!pt-4">
        <ol className="grid gap-5 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-3xl border border-ink-200 bg-white p-6">
              <span className="absolute top-5 right-5 text-4xl font-bold text-plum-100" aria-hidden>0{i + 1}</span>
              <s.icon className="size-7 text-plum-600" aria-hidden />
              <h3 className="mt-4 font-bold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center"><Link href="/how-it-works" className="inline-flex items-center gap-1 text-sm font-semibold text-plum-600 hover:underline">See the full journey for senders, recipients and vendors <ArrowRight className="size-4" aria-hidden /></Link></p>
      </Section>

      <Section id="gifts" eyebrow="Marketplace" title={<>Loved gifts from <Accent>approved vendors</Accent></>} intro="Every vendor is verified before they can sell. A few favourites right now:">
        <FeaturedGifts />
      </Section>

      <section className="bg-white py-20 md:py-24" aria-labelledby="privacy-h">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-plum-500 uppercase">Privacy by design</p>
            <h2 id="privacy-h" className="mt-2 text-3xl leading-tight font-bold tracking-tight text-ink-900 md:text-[40px]">The surprise stays a <Accent>surprise</Accent></h2>
            <p className="mt-4 text-[17px] text-ink-500">Surprise gifting only works if it&apos;s discreet. Privacy isn&apos;t a setting at SecretWish — it&apos;s how the whole platform is built.</p>
            <div className="mt-8">
              <SecondaryLink href="/privacy">How we protect you</SecondaryLink>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {privacy.map((p) => (
              <li key={p.title} className="rounded-3xl bg-[#f6f3f9] p-6">
                <p.icon className="size-6 text-plum-600" aria-hidden />
                <h3 className="mt-3 font-bold text-ink-900">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section id="vendors" eyebrow="For vendors" title={<>Sell to people who are <Accent>ready to gift</Accent></>} intro="Florists, bakers, hamper makers, jewellers, experience hosts — reach customers who already know what they want, and get paid reliably after delivery.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Store, title: "A storefront in minutes", body: "List products, set stock and delivery options. We review listings so the marketplace stays premium." },
            { icon: Sparkles, title: "Quote on surprises", body: "Receive briefs in your category and pitch ideas within each sender's budget range." },
            { icon: BadgeCheck, title: "Clear, fair payouts", body: "Paid through the payment provider once delivery is verified and the hold period passes. Always read-only and transparent." },
          ].map((c) => (
            <article key={c.title} className="rounded-3xl border border-ink-200 bg-white p-7">
              <c.icon className="size-7 text-plum-600" aria-hidden />
              <h3 className="mt-4 font-bold text-ink-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center gap-3">
          <PrimaryLink href="/vendors">Become a vendor</PrimaryLink>
          <SecondaryLink href={links.vendor} external>Vendor login</SecondaryLink>
        </div>
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Questions, answered">
        <Faq
          items={[
            { q: "Will the recipient know who sent the gift?", a: "Only if you choose. By default the card says “from a secret admirer”. You can opt to reveal your name after delivery." },
            { q: "Can I see my friend's address?", a: "No. When you gift from a wishlist, we deliver to the owner's saved address. You only see their first name and city." },
            { q: "What is the secret code?", a: "Each gift comes with a single-use code on its card. The recipient enters it to confirm safe delivery — and that's what releases the vendor's payment." },
            { q: "How much does it cost?", a: <>Registering is free, and your first gift up to $100 has no SecretWish fee. After that, a monthly or yearly plan applies. <Link className="font-semibold text-plum-600" href="/pricing">See pricing</Link>.</> },
            { q: "Which currency will I pay in?", a: "Prices are set in US dollars and shown in your local currency — naira in Nigeria — at the exchange rate recorded when you order." },
            { q: "What if something goes wrong?", a: "Our support team handles late deliveries, damaged gifts and refunds. Every case is reviewed with evidence and decided fairly." },
          ]}
        />
      </Section>

      <CtaBand />
    </>
  );
}
