import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import Reveal from "@/components/pages/Reveal";

type LegalPageProps = {
  title: string;
  intro: string;
  sections: { heading: string; text: string }[];
};

export default function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <main className="min-h-[65vh] bg-background">
      <section className="bg-brand-navy px-page pb-14 pt-14 text-white sm:pb-16 sm:pt-20">
        <div className="mx-auto max-w-content">
          <p className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.13em] text-violet-200">
            <FileText className="size-4 text-brand-red" aria-hidden="true" />
            Speedy Pest Control
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.25rem)] font-bold leading-tight tracking-[-0.05em]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-300">{intro}</p>
        </div>
      </section>
      <section className="px-page py-12 sm:py-16">
        <div className="mx-auto max-w-reading">
          <div className="rounded-2xl border border-amber-300/50 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950">
            <strong>Placeholder for client review.</strong> This draft is
            provided to reserve the page structure and is not legal advice.
            Have the final wording reviewed and approved before publication.
          </div>
          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <Reveal key={section.heading}>
                <section>
                  <h2 className="font-display text-xl font-bold text-brand-navy">
                    {section.heading}
                  </h2>
                  <p className="mt-3 leading-7 text-text-secondary">
                    {section.text}
                  </p>
                </section>
              </Reveal>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-red px-4 font-bold text-white transition hover:bg-brand-red-hover"
          >
            Contact us
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
