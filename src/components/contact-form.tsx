"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { api, ApiError } from "@/shared/lib/api";
import { Button, Field, Input, Notice, Select, Textarea } from "@/shared/ui/primitives";

const topics = ["General", "Sending a gift", "Wishlists", "Becoming a vendor", "Corporate gifting", "Press"];
const empty = { name: "", email: "", topic: "General", message: "", website: "" };

export function ContactForm() {
  const [f, setF] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v: Record<string, string> = {};
    if (!f.name.trim()) v.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) v.email = "Enter a valid email address.";
    if (f.message.trim().length < 10) v.message = "Your message needs at least 10 characters.";
    setErrors(v);
    setFailure(null);
    if (Object.keys(v).length) return;
    setPending(true);
    try {
      const r = await api<{ reference: string }>("/public/contact", { method: "POST", body: f });
      setDone(r.reference);
      setF(empty);
    } catch (err) {
      const ae = err as ApiError;
      if (ae.errors) setErrors(Object.fromEntries(Object.entries(ae.errors).map(([k, m]) => [k, m[0]])));
      setFailure(ae.message);
    } finally {
      setPending(false);
    }
  };

  if (done)
    return (
      <div className="flex flex-col items-center justify-center rounded-[28px] border border-ink-200 bg-white p-10 text-center" role="status">
        <CheckCircle2 className="size-12 text-success-600" aria-hidden />
        <h2 className="mt-4 text-2xl font-bold text-ink-900">Message sent</h2>
        <p className="mt-2 text-ink-500">Thanks — your reference is <b className="text-ink-900">{done}</b>. We&apos;ll reply by email, usually within one working day.</p>
        <Button variant="secondary" className="mt-6" onClick={() => setDone(null)}>Send another message</Button>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="space-y-5 rounded-[28px] border border-ink-200 bg-white p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" required error={errors.name}>
          {(id, d) => <Input id={id} aria-describedby={d} aria-invalid={!!errors.name} autoComplete="name" maxLength={80} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />}
        </Field>
        <Field label="Email" required error={errors.email}>
          {(id, d) => <Input id={id} aria-describedby={d} aria-invalid={!!errors.email} type="email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />}
        </Field>
      </div>
      <Field label="Topic">
        {(id) => (
          <Select id={id} value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })}>
            {topics.map((t) => <option key={t}>{t}</option>)}
          </Select>
        )}
      </Field>
      <Field label="Message" required error={errors.message} hint={`${2000 - f.message.length} characters left`}>
        {(id, d) => <Textarea id={id} aria-describedby={d} aria-invalid={!!errors.message} maxLength={2000} className="min-h-[160px]" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />}
      </Field>
      {/* Honeypot for bots — hidden from people and assistive technology */}
      <div className="hidden" aria-hidden>
        <label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} /></label>
      </div>
      <p className="text-xs text-ink-400">We use your details only to reply to this message. Please don&apos;t include payment details or other people&apos;s addresses.</p>
      {failure && !Object.keys(errors).length && <Notice tone="danger">{failure}</Notice>}
      <Button type="submit" size="lg" icon={Send} loading={pending} className="w-full">Send message</Button>
    </form>
  );
}
