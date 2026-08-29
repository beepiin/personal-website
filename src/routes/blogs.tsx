import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Blogs — Bipin Sharma, Chartered Accountant" },
      {
        name: "description",
        content:
          "Articles and notes on auditing, NFRS compliance, taxation and financial reporting in Nepal by Chartered Accountant Bipin Sharma.",
      },
      { property: "og:title", content: "Blogs — Bipin Sharma, Chartered Accountant" },
      {
        property: "og:description",
        content: "Insights on audit, NFRS, taxation and financial reporting practice in Nepal.",
      },
    ],
  }),
  component: Blogs,
});

const POSTS = [
  {
    title: "Understanding NFRS Compliance for Nepali Companies",
    date: "Coming soon",
    excerpt:
      "A practical walkthrough of gap analysis, policy design and transition support when adopting Nepal Financial Reporting Standards.",
  },
  {
    title: "Preparing for Your First External Audit",
    date: "Coming soon",
    excerpt:
      "What documents, reconciliations and internal controls an organization should have ready before the auditors arrive.",
  },
  {
    title: "Income Tax Return Filing Essentials",
    date: "Coming soon",
    excerpt:
      "Key deadlines, common mistakes and record-keeping habits that make annual tax filing straightforward.",
  },
];

function Blogs() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="hero-gradient pt-36 pb-20">
        <div className="mx-auto max-w-7xl px-5 text-ink-foreground">
          <h1 className="text-5xl font-extrabold">Blogs</h1>
          <p className="mt-3 max-w-2xl text-ink-foreground/85">
            Notes on auditing, taxation, NFRS and financial reporting practice.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.title}
              className="rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-xl"
            >
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                {p.date}
              </p>
              <h2 className="mt-3 text-xl font-bold">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
