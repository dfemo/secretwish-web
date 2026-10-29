import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";
import { Accent, PageHero } from "@/components/blocks";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact Us", description: "Questions about gifting, wishlists, selling on SecretWish or corporate gifting? Get in touch." };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact us" title={<>We&apos;d love to <Accent>hear from you</Accent></>} intro="Questions about sending a gift, your wishlist, becoming a vendor or corporate gifting — send us a message and our team will reply by email." />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-24 lg:grid-cols-[1fr_1.5fr]">
        <ul className="space-y-4">
          {[
            { icon: Mail, t: "Email", b: "hello@secretwish.example" },
            { icon: MapPin, t: "Where we deliver", b: "Lagos, Abuja, Port Harcourt, Ibadan, Enugu and Kano — more cities soon." },
            { icon: Clock, t: "Support hours", b: "Monday to Saturday, 8am – 8pm WAT. Urgent delivery issues are prioritised." },
          ].map((c) => (
            <li key={c.t} className="flex gap-4 rounded-3xl border border-ink-200 bg-white p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-plum-50 text-plum-600"><c.icon className="size-5" aria-hidden /></span>
              <div>
                <p className="font-bold text-ink-900">{c.t}</p>
                <p className="mt-1 text-sm text-ink-500">{c.b}</p>
              </div>
            </li>
          ))}
          <li className="rounded-3xl bg-plum-50 p-6 text-sm text-plum-800">Already have an order? Use <b>Help &amp; support</b> inside the app so we can see your order securely.</li>
        </ul>
        <ContactForm />
      </section>
    </>
  );
}
