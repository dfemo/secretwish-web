import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/shared/ui/primitives";
import { links, nav } from "@/lib/site";

export function Section({ id, eyebrow, title, intro, children, className = "" }: { id?: string; eyebrow?: string; title: ReactNode; intro?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-h` : undefined} className={`mx-auto max-w-6xl px-4 py-20 md:py-24 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow && <p className="text-xs font-bold tracking-[0.16em] text-plum-500 uppercase">{eyebrow}</p>}
        <h2 id={id ? `${id}-h` : undefined} className="mt-2 text-3xl leading-tight font-bold tracking-tight text-ink-900 md:text-[40px]">
          {title}
        </h2>
        {intro && <p className="mt-4 text-[17px] leading-relaxed text-ink-500">{intro}</p>}
      </div>
      <div className="mt-12">{children}</div>
    </section>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro: ReactNode; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-20 pb-8 text-center md:pt-24">
      <p className="text-xs font-bold tracking-[0.16em] text-plum-500 uppercase">{eyebrow}</p>
      <h1 className="mt-3 text-4xl leading-[1.1] font-bold tracking-tight text-ink-900 md:text-[56px]">{title}</h1>
      <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-500">{intro}</p>
      {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
    </section>
  );
}

export function Accent({ children }: { children: ReactNode }) {
  return <span className="bg-gradient-to-r from-plum-500 to-plum-700 bg-clip-text text-transparent">{children}</span>;
}

const btn = "inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition";
export function PrimaryLink({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const cls = `${btn} bg-plum-600 text-white shadow-[0_8px_24px_rgb(100_58_123/0.28)] hover:bg-plum-700`;
  return external ? <a href={href} className={cls}>{children}</a> : <Link href={href} className={cls}>{children}</Link>;
}
export function SecondaryLink({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const cls = `${btn} border border-ink-200 bg-white text-ink-900 shadow-sm hover:border-plum-300`;
  return external ? <a href={href} className={cls}>{children}</a> : <Link href={href} className={cls}>{children}</Link>;
}

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="relative overflow-hidden rounded-[32px] bg-plum-900 px-6 py-14 text-center text-white md:px-16">
        <div className="pointer-events-none absolute -top-20 -left-10 size-64 rounded-full bg-plum-500/40 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-10 -bottom-24 size-72 rounded-full bg-gold-500/25 blur-3xl" aria-hidden />
        <h2 className="relative text-3xl font-bold tracking-tight md:text-4xl">Ready to make someone&apos;s day?</h2>
        <p className="relative mx-auto mt-3 max-w-xl text-plum-100">Your first gift up to $100 has no SecretWish fee. Start a wishlist or send a surprise in minutes.</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <a href={links.sender} className={`${btn} bg-white text-plum-800 hover:bg-plum-50`}>Send a gift</a>
          <a href={links.recipient} className={`${btn} border border-white/30 text-white hover:bg-white/10`}>Create a wishlist</a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-200/70 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-ink-500">Privacy-first wishlists and surprise gifting from approved vendors. Launching in Nigeria.</p>
          <p className="mt-4 text-xs text-ink-400">Prototype website · figures shown are sample data.</p>
        </div>
        <FooterCol title="Explore" items={nav.slice(1).map((n) => ({ href: n.href, label: n.label }))} />
        <FooterCol title="Apps" items={[{ href: links.sender, label: "Send a gift", external: true }, { href: links.recipient, label: "My wishlists", external: true }, { href: links.vendor, label: "Vendor portal", external: true }]} />
        <FooterCol title="Company" items={[{ href: "/privacy", label: "Privacy" }, { href: "/contact", label: "Contact" }, { href: "/vendors", label: "Become a vendor" }]} />
      </div>
      <p className="border-t border-ink-100 py-5 text-center text-xs text-ink-400">© {new Date().getFullYear()} SecretWish. All rights reserved.</p>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { href: string; label: string; external?: boolean }[] }) {
  return (
    <div>
      <p className="text-sm font-bold text-ink-900">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-ink-500">
        {items.map((i) => (
          <li key={i.label}>{i.external ? <a href={i.href} className="hover:text-plum-600">{i.label}</a> : <Link href={i.href} className="hover:text-plum-600">{i.label}</Link>}</li>
        ))}
      </ul>
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-ink-200 rounded-3xl border border-ink-200 bg-white">
      {items.map((f) => (
        <details key={f.q} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-ink-900">
            {f.q}
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-plum-50 text-plum-600 transition-transform group-open:rotate-45" aria-hidden>+</span>
          </summary>
          <div className="mt-3 text-sm leading-relaxed text-ink-500">{f.a}</div>
        </details>
      ))}
    </div>
  );
}
