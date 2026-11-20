import type { Metadata } from "next";
import { Accent, PageHero } from "@/components/blocks";
import { ContactDetails } from "@/components/contact-details";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact Us", description: "Questions about gifting, wishlists, selling on VeilWish (SecretWish) or corporate gifting? Get in touch." };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact us" title={<>We&apos;d love to <Accent>hear from you</Accent></>} intro="Questions about sending a gift, your wishlist, becoming a vendor or corporate gifting — send us a message and our team will reply by email." />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-24 lg:grid-cols-[1fr_1.5fr]">
        <ul className="space-y-4">
          <ContactDetails />
          <li className="rounded-3xl bg-plum-50 p-6 text-sm text-plum-800">Already have an order? Use <b>Help &amp; support</b> inside the app so we can see your order securely.</li>
        </ul>
        <ContactForm />
      </section>
    </>
  );
}
