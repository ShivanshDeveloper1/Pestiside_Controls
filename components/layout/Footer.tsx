import Link from "next/link";
import {
  ArrowRight,
  Building2,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { SERVICE_CATALOG } from "@/components/services/serviceCatalog";

const SITE_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog & advice", href: "/blog" },
  { label: "Contact us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-navy-deep px-page pb-6 pt-14 text-white sm:pt-16">
      <div className="mx-auto max-w-content">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr_1.2fr] xl:gap-14">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-display text-xl font-bold tracking-tight"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-brand-purple/20 text-violet-200">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              Speedy Pest Control
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-300">
              Professional pest-control services for homes and businesses.
              Clear advice and practical next steps for London properties.
            </p>
            <div className="mt-5 flex items-start gap-2.5 text-sm text-slate-300">
              <MapPin className="mt-0.5 size-4 shrink-0 text-violet-300" aria-hidden="true" />
              <span> 1300 Uxbridge Road hayes 
Ub4 8JG</span>
            </div>
            <div className="mt-3 flex items-start gap-2.5 text-sm text-slate-300">
              <Building2 className="mt-0.5 size-4 shrink-0 text-violet-300" aria-hidden="true" />
              <span>Residential and commercial enquiries welcome.</span>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-violet-200">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {SITE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/quote"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-red px-4 text-sm font-bold text-white transition hover:bg-brand-red-hover"
            >
               Contact Us
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </nav>

          <nav aria-label="Pest-control services">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-violet-200">
              Services
            </h2>
            <ul className="mt-4 grid gap-x-5 gap-y-2.5 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              {SERVICE_CATALOG.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="text-sm text-slate-300 transition hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Speedy Pest Control. All rights
            reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition hover:text-white"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="transition hover:text-white"
                >
                  Terms &amp; conditions
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
