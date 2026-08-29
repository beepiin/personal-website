import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Calculator, FileSpreadsheet, UserRound } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import heroImg from "@/assets/hero.png";
import aboutImg from "@/assets/about.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bipin Sharma — Chartered Accountant in Kathmandu, Nepal" },
      {
        name: "description",
        content:
          "Bipin Sharma is a Chartered Accountant offering external, internal and tax audit, NFRS implementation, bookkeeping and financial advisory services in Nepal.",
      },
      { property: "og:title", content: "Bipin Sharma — Chartered Accountant" },
      {
        property: "og:description",
        content:
          "Audit & assurance, taxation, NFRS implementation and consultancy services across banking, hydropower, healthcare and education sectors.",
      },
    ],
  }),
  component: Home,
});

const SERVICES = [
  {
    icon: ShieldCheck,
    title: "Audit & Assurance",
    body: "I have performed audits of organizations like banking sectors, hydropower companies, hospitals, NGOs & INGOs, educational institutions, digital wallet companies, broker companies and many more private companies.",
  },
  {
    icon: Calculator,
    title: "Consultancy & Advisory Services",
    body: "I provide accounting support, bookkeeping, payroll management, and tax return filing services. I assist with financial reporting, regulatory compliance, and audit preparation to help businesses maintain accurate records.",
  },
  {
    icon: FileSpreadsheet,
    title: "NFRS Implementation",
    body: "Comprehensive NFRS implementation and professional bookkeeping services, including assessment of existing accounting systems, gap analysis, design of compliant accounting policies, and transition support.",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden pt-32 pb-0">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 md:grid-cols-2">
          <div className="text-ink-foreground">
            <p className="text-2xl font-bold md:text-3xl">Chartered Accountant</p>
            <h1 className="mt-1 text-5xl font-extrabold md:text-6xl">Bipin Sharma</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/85">
              A qualified Chartered Accountant with comprehensive experience gained during
              articleship at A.S.U.S Associates and ECOVIS PYC &amp; Associates, Chartered
              Accountants. Possess in-depth exposure to external, internal, and tax audits across
              industries including banking, insurance, hydropower, healthcare, and education.
              Proven expertise in financial reporting, NFRS compliance, taxation, and internal
              control assessment.
            </p>
            <a
              href="/cv/bipin-sharma-cv.pdf"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary py-2 pr-2 pl-6 font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Download CV
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-primary">
                <UserRound className="h-4 w-4" />
              </span>
            </a>
          </div>

          <div className="relative flex justify-center">
            <span className="absolute top-10 right-6 h-4 w-4 rounded-full border-2 border-primary" />
            <span className="absolute bottom-24 left-4 h-3 w-3 rounded-full bg-primary" />
            <div className="rotate-3 rounded-[3rem] bg-ink-foreground/10 p-3 backdrop-blur-sm">
              <img
                src={heroImg}
                alt="Bipin Sharma, Chartered Accountant"
                className="max-h-[520px] w-full -rotate-3 rounded-[2.5rem] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="relative overflow-hidden py-20">
        <span className="ring-blob absolute -top-16 -right-24 hidden h-72 w-72 md:block" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2">
          <div className="relative">
            <span className="ring-blob absolute -top-6 -left-6 hidden h-64 w-64 md:block" />
            <img
              src={aboutImg}
              alt="Portrait of Bipin Sharma"
              className="relative w-full rounded-[2.5rem] bg-primary object-cover"
            />
          </div>

          <div>
            <p className="inline-flex items-center gap-3 text-lg font-semibold">
              <span className="h-10 w-10 rounded-full bg-primary/70" />
              <span className="-ml-11 pl-3">
                <span className="text-gradient-green font-bold">About</span> Us
              </span>
            </p>
            <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">Bipin Sharma</h2>
            <p className="mt-4 font-semibold italic underline">
              A Passionate Individual Based in Kathmandu, Nepal
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              I am Bipin Sharma, a dedicated Chartered Accountant with hands-on experience in
              auditing, tax filing, and consultancy at leading firms. Skilled in financial analysis
              and accounting software, I have worked across various sectors including banking,
              insurance, and hospitality. I am committed to accuracy, continuous learning, and
              delivering high-quality results.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Read More <ArrowRight className="h-4 w-4" />
              </Link>
              <div>
                <p className="text-4xl font-extrabold">10+</p>
                <p className="text-sm text-muted-foreground">Client Handled</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Freelance CTA */}
      <section className="bg-ink py-20 text-ink-foreground">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-primary uppercase">
            I Am Available For
          </p>
          <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">Freelance Work</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-ink-foreground/75">
            I am Bipin Sharma, a Chartered Accountant and audit professional with practical
            experience. I am also available to work as a freelancer, offering services in auditing,
            accounting, tax filing, and financial consultancy.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="text-lg font-semibold">
            <span className="text-gradient-green font-bold">Service</span> For You
          </p>
          <h2 className="mt-3 max-w-3xl text-2xl leading-snug font-bold md:text-3xl">
            Knowledge &amp; Skills Related to External Audit, Internal Audit, Tax Audit, Tax Return
            Filings etc
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                className="group rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-xl"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/80 hover:text-primary"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
