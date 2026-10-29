// Links to the SecretWish apps. Override per environment with NEXT_PUBLIC_* variables.
export const links = {
  sender: process.env.NEXT_PUBLIC_SENDER_URL ?? "http://localhost:3002",
  recipient: process.env.NEXT_PUBLIC_RECIPIENT_URL ?? "http://localhost:3003",
  vendor: process.env.NEXT_PUBLIC_VENDOR_URL ?? "http://localhost:3004",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/services", label: "Services" },
  { href: "/vendors", label: "For Vendors" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact Us" },
];

export const portals = [
  { href: links.sender, title: "Send a gift", body: "Buy from a wishlist or brief a secret surprise." },
  { href: links.recipient, title: "My wishlists", body: "Create lists and receive gifts privately." },
  { href: links.vendor, title: "Vendor portal", body: "Manage orders, listings and payouts." },
];
