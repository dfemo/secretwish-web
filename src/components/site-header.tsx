"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cx, Logo } from "@/shared/ui/primitives";
import { links, nav, portals } from "@/lib/site";

/** Floating pill navigation: logo, centred links, sign-in menu and a Marketplace call to action. */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setOpen(false);
    setMobile(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-3 z-40 px-4">
      <a href="#main" className="sr-only rounded bg-white px-3 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 rounded-2xl border border-ink-200/70 bg-white/90 px-4 shadow-[0_6px_30px_rgb(43_23_54/0.06)] backdrop-blur">
        <Link href="/" className="text-plum-900" aria-label="SecretWish home">
          <Logo />
        </Link>
        <nav aria-label="Main" className="mx-auto hidden items-center gap-1 min-[1120px]:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined} className={cx("rounded-xl px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors", active(n.href) ? "bg-plum-50 text-plum-600" : "text-ink-900 hover:bg-ink-50")}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 min-[1120px]:ml-0">
          <span className="hidden h-5 w-px bg-ink-200 min-[1120px]:block" aria-hidden />
          <div className="relative hidden sm:block" ref={ref}>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="true" className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-[13px] font-semibold whitespace-nowrap text-ink-900 hover:bg-ink-50">
              Log in / Sign up <ChevronDown className={cx("size-4 transition-transform", open && "rotate-180")} aria-hidden />
            </button>
            {open && (
              <div className="absolute top-12 right-0 w-72 rounded-2xl border border-ink-200 bg-white p-2 shadow-[var(--shadow-pop)]">
                {portals.map((p) => (
                  <a key={p.title} href={p.href} className="block rounded-xl px-3 py-2.5 hover:bg-plum-50">
                    <span className="block text-sm font-semibold text-ink-900">{p.title}</span>
                    <span className="block text-xs text-ink-500">{p.body}</span>
                  </a>
                ))}
                <p className="px-3 pt-1 pb-2 text-[11px] text-ink-400">Prototype: each app uses a demo persona sign-in.</p>
              </div>
            )}
          </div>
          <a href={`${links.sender}/browse`} className="rounded-xl bg-plum-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm hover:bg-plum-700">
            Marketplace
          </a>
          <button type="button" onClick={() => setMobile((m) => !m)} aria-expanded={mobile} aria-label={mobile ? "Close menu" : "Open menu"} className="rounded-xl p-2 text-ink-900 hover:bg-ink-50 min-[1120px]:hidden">
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {mobile && (
        <nav aria-label="Mobile" className="mx-auto mt-2 max-w-6xl rounded-2xl border border-ink-200 bg-white p-2 shadow-[var(--shadow-pop)] min-[1120px]:hidden">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined} className={cx("block rounded-xl px-4 py-3 text-sm font-semibold", active(n.href) ? "bg-plum-50 text-plum-600" : "text-ink-900")}>
              {n.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-ink-100 pt-2">
            {portals.map((p) => (
              <a key={p.title} href={p.href} className="block rounded-xl px-4 py-2.5 text-sm text-ink-700">
                {p.title} →
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
