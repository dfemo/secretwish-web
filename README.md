# SecretWish — Public website

The marketing site anyone can visit: what SecretWish is, how it works for senders, recipients and vendors, services, pricing, privacy and a contact form. The look and feel follow a clean voucher-marketplace style: a floating pill navigation, bold centred headlines with accent words, and fanned gift cards. It uses SecretWish's plum and gold palette.

Next.js 16 (App Router, statically rendered pages for SEO) · React 19 · TypeScript (strict) · Tailwind CSS 4.

## Run

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

| Page | Content |
|---|---|
| `/` | Hero, live stats, two ways to give, 4-step journey, featured gifts (live from the API), privacy, vendors, FAQ |
| `/how-it-works` | Step-by-step journeys for senders, recipients and vendors |
| `/services` | Wishlists, secret surprise packages, budget-range surprise requests, corporate gifting, discreet delivery, secret-code verification |
| `/vendors` | Why sell, how selling works, standards, vendor FAQ |
| `/pricing` | Free first gift ≤ $100; customer and vendor monthly/yearly plans (price points TBC) |
| `/contact` | Validated contact form → `POST /api/public/contact` (rate-limited, honeypot) — appears in Admin → Customer Support → Website enquiries |
| `/privacy` | Plain-language privacy summary (not a final policy) |

The *Log in / Sign up* menu and *Marketplace* button link to the Sender, Recipient and Vendor apps (`NEXT_PUBLIC_*_URL`). The featured gifts and stats come from `GET /api/public/showcase`. If the API is unavailable, the site still renders and shows a fallback instead.

`src/shared` is the SecretWish design system, synced from Admin with `sync-shared.ps1`.
