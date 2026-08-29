import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bipin Sharma, Chartered Accountant" },
      {
        name: "description",
        content:
          "Get in touch with Chartered Accountant Bipin Sharma in Gaindakot-5, Nawalparasi (East), Nepal for audit, tax and advisory services.",
      },
      { property: "og:title", content: "Contact Bipin Sharma, Chartered Accountant" },
      {
        property: "og:description",
        content: "Phone, email and office hours for audit, taxation and consultancy enquiries.",
      },
    ],
  }),
  component: Contact,
});

const DETAILS = [
  { icon: MapPin, label: "Address", value: "Gaindakot-5, Nawalparasi (East), Nepal" },
  { icon: Phone, label: "Phone", value: "+977 9825417535 | +977 9845814621" },
  { icon: Mail, label: "Email", value: "mail@bipin-sharma.com.np" },
  { icon: Clock, label: "Office Hours", value: "Sun - Fri 10:00 AM to 5:00 PM" },
];

function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="hero-gradient pt-36 pb-20">
        <div className="mx-auto max-w-7xl px-5 text-ink-foreground">
          <h1 className="text-5xl font-extrabold">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-ink-foreground/85">
            Reach out for audit, assurance, taxation, NFRS implementation or advisory support.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2">
          <div className="space-y-6">
            {DETAILS.map((d) => (
              <div key={d.label} className="flex gap-4 rounded-2xl border border-border p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                  <d.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">{d.label}</p>
                  <p className="mt-1 font-medium">{d.value}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            className="rounded-3xl border border-border bg-card p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-2xl font-bold">Send a message</h2>
            <div className="mt-6 space-y-4">
              <input
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                required
                type="email"
                placeholder="Your email"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                required
                rows={5}
                placeholder="How can I help?"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <a
                href="mailto:mail@bipin-sharma.com.np"
                className="inline-flex rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground"
              >
                Email Directly
              </a>
            </div>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
