"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  PhoneCall,
  RotateCcw,
} from "lucide-react";
import { SERVICE_CATALOG } from "@/components/services/serviceCatalog";

type EnquiryFormProps = {
  mode: "contact" | "quote";
};

const inputClass =
  "min-h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-secondary/60 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10";

export default function EnquiryForm({ mode }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [preferredContact, setPreferredContact] = useState("phone");
  const reduceMotion = useReducedMotion();
  const isQuote = mode === "quote";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const phoneInput = event.currentTarget.elements.namedItem("phone");
    if (phoneInput instanceof HTMLInputElement) {
      phoneInput.setCustomValidity(
        preferredContact === "phone" &&
          phoneInput.value.replace(/\D/g, "").length < 7
          ? "Enter a phone number with at least 7 digits."
          : "",
      );
    }

    if (!event.currentTarget.reportValidity()) return;
    setSubmitted(true);
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-raised sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="confirmation"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="grid min-h-[28rem] content-center justify-items-start"
            role="status"
            aria-live="polite"
          >
            <span className="grid size-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="size-7" aria-hidden="true" />
            </span>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.12em] text-brand-purple">
              {isQuote ? "Request prepared" : "Thank you"}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
              {isQuote ? "Your quote request is ready." : "Your enquiry is ready."}
            </h2>
            <p className="mt-3 max-w-lg leading-relaxed text-text-secondary">
              This website demo does not send or store form submissions. No
              details have been delivered to Speedo Pest Control.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 text-sm font-bold text-brand-navy transition hover:border-brand-purple hover:text-brand-purple"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Start again
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <p className="text-sm font-bold text-brand-purple">
                {isQuote ? "Quote request" : "Contact our team"}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
                {isQuote ? "Tell us what you need." : "How can we help?"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {isQuote
                  ? "Share a few details so the right service and next steps can be discussed."
                  : "Choose a service area and the best way to reach you."}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" htmlFor={`${mode}-name`}>
                <input
                  id={`${mode}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Name"
                  minLength={2}
                  required
                  className={inputClass}
                />
              </Field>

              <Field label="I’m enquiring as" htmlFor={`${mode}-customer-type`}>
                <select
                  id={`${mode}-customer-type`}
                  name="customerType"
                  defaultValue=""
                  required
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </Field>

              <Field label="Service or pest type" htmlFor={`${mode}-service`}>
                <select
                  id={`${mode}-service`}
                  name="service"
                  defaultValue=""
                  required
                  className={inputClass}
                >
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {SERVICE_CATALOG.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                  <option value="not-sure">Not sure yet</option>
                </select>
              </Field>

              <Field label="London area or postcode" htmlFor={`${mode}-area`}>
                <input
                  id={`${mode}-area`}
                  name="area"
                  type="text"
                  autoComplete="postal-code"
                  placeholder="e.g. Islington or SW1A"
                  required
                  className={inputClass}
                />
              </Field>
            </div>

            <fieldset>
              <legend className="text-sm font-bold text-text-primary">
                How would you prefer to be contacted?
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {[
                  { value: "phone", label: "Phone", icon: PhoneCall },
                  { value: "email", label: "Email", icon: Mail },
                ].map(({ value, label, icon: Icon }) => (
                  <label
                    key={value}
                    className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                      preferredContact === value
                        ? "border-brand-purple bg-brand-purple/5 text-brand-purple-strong"
                        : "border-border text-text-secondary hover:border-brand-purple/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      value={value}
                      checked={preferredContact === value}
                      onChange={(event) => {
                        setPreferredContact(value);
                        const phoneInput =
                          event.currentTarget.form?.elements.namedItem("phone");
                        if (phoneInput instanceof HTMLInputElement) {
                          phoneInput.setCustomValidity("");
                        }
                      }}
                      className="accent-brand-purple"
                    />
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Phone number" htmlFor={`${mode}-phone`}>
                <input
                  id={`${mode}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Your phone number"
                  required={preferredContact === "phone"}
                  onChange={(event) => event.currentTarget.setCustomValidity("")}
                  className={inputClass}
                />
              </Field>
              <Field label="Email address" htmlFor={`${mode}-email`}>
                <input
                  id={`${mode}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required={preferredContact === "email"}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field
              label={isQuote ? "Additional details" : "How can we help?"}
              htmlFor={`${mode}-details`}
            >
              <textarea
                id={`${mode}-details`}
                name="details"
                rows={4}
                placeholder={
                  isQuote
                    ? "Describe the issue, property or timing (optional)"
                    : "Share any details that may help us understand your enquiry"
                }
                required={!isQuote}
                className={`${inputClass} resize-y`}
              />
            </Field>

            <p className="text-xs leading-relaxed text-text-secondary">
              Frontend demonstration only: submitting shows a local
              confirmation and does not send your personal information.
            </p>
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3 font-bold text-white shadow-soft transition hover:bg-brand-red-hover sm:w-auto"
            >
              {isQuote ? "Prepare my quote request" : "Prepare my enquiry"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="grid content-start gap-2">
      <label htmlFor={htmlFor} className="text-sm font-bold text-text-primary">
        {label}
      </label>
      {children}
    </div>
  );
}
