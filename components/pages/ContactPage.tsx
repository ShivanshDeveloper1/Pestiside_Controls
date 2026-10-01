"use client";

import Link from "next/link";
import { ArrowRight, Building2, MapPin, PhoneCall } from "lucide-react";
import EnquiryForm from "@/components/pages/EnquiryForm";
import Reveal from "@/components/pages/Reveal";

const BUSINESS_PHONE = "";

export default function ContactPage() {
  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden bg-brand-navy px-page pb-16 pt-14 text-white sm:pb-20 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-40 size-[32rem] rounded-full bg-brand-purple/25 blur-[110px]"
        />
        <div className="relative mx-auto max-w-content">
          <p className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.13em] text-violet-200">
            <MapPin className="size-4 text-brand-red" aria-hidden="true" />
            Speedy Pest Control · London
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,7vw,4.75rem)] font-bold leading-[1.05] tracking-[-0.05em]">
            Let’s talk about what’s happening at your property.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Contact us about a home or business pest concern. Share your
            location and a few details so the right next step can be discussed.
          </p>
        </div>
      </section>

      <section className="px-page py-12 sm:py-16">
        <div className="mx-auto grid max-w-content gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-start lg:gap-12">
          <Reveal>
            <EnquiryForm mode="contact" />
          </Reveal>

          <aside className="space-y-4">
            <Reveal>
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-purple/10 text-brand-purple">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold text-brand-navy">
                  London service area
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  We serve customers in London and nearby areas. Share your
                  postcode so availability for your location can be confirmed.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
                <span className="grid size-11 place-items-center rounded-xl bg-rose-50 text-brand-red">
                  <PhoneCall className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold text-brand-navy">
                  Prefer to call?
                </h2>
                {BUSINESS_PHONE ? (
                  <a
                    href={`tel:${BUSINESS_PHONE}`}
                    className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-red px-4 font-bold text-white transition hover:bg-brand-red-hover"
                  >
                    Call Speedy Pest Control
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                ) : (
                  <>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      Phone contact details are being confirmed. Use the
                      enquiry form or request a quote in the meantime.
                    </p>
                    <Link
                      href="/quote"
                      className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-red px-4 font-bold text-white transition hover:bg-brand-red-hover"
                    >
                      Request a quote
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </>
                )}
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-purple/10 text-brand-purple">
                  <Building2 className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold text-brand-navy">
                  Homes and businesses
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  The form supports both residential and commercial enquiries,
                  including offices, hospitality and retail premises.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </main>
  );
}
