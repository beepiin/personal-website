import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Bipin Sharma, Chartered Accountant" },
      {
        name: "description",
        content:
          "How Bipin Sharma, Chartered Accountant, collects, uses and protects the information shared through this website.",
      },
      { property: "og:title", content: "Privacy Policy — Bipin Sharma" },
      {
        property: "og:description",
        content: "Information handling, confidentiality and contact details for privacy requests.",
      },
    ],
  }),
  component: Privacy,
});

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "We collect only the information you voluntarily provide, such as your name, email address, phone number and the details of your enquiry when you contact us.",
  },
  {
    title: "How We Use Information",
    body: "Your information is used solely to respond to enquiries, deliver professional services and maintain records required by applicable laws and professional standards.",
  },
  {
    title: "Confidentiality",
    body: "As a Chartered Accountant, client information is treated as strictly confidential and is not disclosed to third parties except where required by law or regulatory authority.",
  },
  {
    title: "Cookies & Analytics",
    body: "This website may use basic cookies and analytics to understand traffic and improve the browsing experience. No personally identifying profiles are built from this data.",
  },
  {
    title: "Your Rights",
    body: "You may request access to, correction of, or deletion of the personal information you have shared with us by writing to mail@bipin-sharma.com.np.",
  },
];

function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="hero-gradient pt-36 pb-20">
        <div className="mx-auto max-w-7xl px-5 text-ink-foreground">
          <h1 className="text-5xl font-extrabold">Privacy Policy</h1>
          <p className="mt-3 max-w-2xl text-ink-foreground/85">
            Your privacy and the confidentiality of your financial information matter to us.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl space-y-10 px-5">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-2xl font-bold">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
