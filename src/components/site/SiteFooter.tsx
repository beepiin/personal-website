import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3">
        <div>
          <img src={logo} alt="Bipin Sharma – Chartered Accountant" className="h-10 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-foreground/70">
            Chartered Accountant offering audit, assurance, taxation, NFRS implementation and
            advisory services across Nepal.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold">Contact Us</h3>
          <ul className="mt-5 space-y-4 text-sm text-ink-foreground/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Gaindakot-5, Nawalparasi (East), Nepal
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                <a href="tel:+9779825417535" className="hover:text-primary">
                  +977 9825417535
                </a>{" "}
                |{" "}
                <a href="tel:+9779845814621" className="hover:text-primary">
                  +977 9845814621
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href="mailto:mail@bipin-sharma.com.np" className="hover:text-primary">
                mail@bipin-sharma.com.np
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Sun - Fri 10:00 AM to 5:00 PM
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold">Links</h3>
          <ul className="mt-5 space-y-3 text-sm text-ink-foreground/75">
            {[
              { to: "/", label: "HOME" },
              { to: "/blogs", label: "BLOGS" },
              { to: "/contact", label: "CONTACT" },
              { to: "/privacy-policy", label: "PRIVACY POLICY" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10 py-6 text-center text-xs text-ink-foreground/60">
        Copyright © {new Date().getFullYear()} Bipin Sharma – Chartered Accountant | Designed by
        @beepiinofficial
      </div>
    </footer>
  );
}
