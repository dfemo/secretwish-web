import type { Metadata } from "next";
import { Accent, PageHero } from "@/components/blocks";

export const metadata: Metadata = { title: "Privacy", description: "How SecretWish protects senders, recipients and the surprise." };

const sections = [
  ["What we collect", "Your name, email and phone; delivery addresses you give us; wishlists you create; orders and messages. Payment card details are handled by our payment provider and never reach SecretWish."],
  ["Who sees what", "Senders see a recipient's first name and city — never their address. Vendors see what they need to deliver — never the sender. Recipients see nothing about a gift until it arrives, and the sender only if they opt in. Our support staff see masked details by default and must record a reason to view more."],
  ["Your choices", "Wishlists are private unless you choose otherwise; public discovery needs your explicit confirmation. You can rotate share links, turn on discreet notifications and opt out of marketing at any time."],
  ["Security", "Verification codes are stored only as salted hashes, expire, are single-use and lock after repeated wrong attempts. Sensitive staff actions are recorded in an audit log."],
  ["Your rights", "You can ask to access, correct or delete your data by contacting us. We keep order records only as long as needed for legal, tax and dispute purposes."],
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title={<>Privacy is <Accent>the product</Accent></>} intro="A plain-language summary of how SecretWish handles your information. This prototype summary is not a final privacy policy; the full policy will be published after legal review." />
      <section className="mx-auto max-w-3xl space-y-6 px-4 pb-24">
        {sections.map(([t, b]) => (
          <article key={t} className="rounded-3xl border border-ink-200 bg-white p-7">
            <h2 className="text-lg font-bold text-ink-900">{t}</h2>
            <p className="mt-2 leading-relaxed text-ink-500">{b}</p>
          </article>
        ))}
      </section>
    </>
  );
}
