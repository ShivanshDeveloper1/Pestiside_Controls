"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

const pestServices = [
  "Rat control",
  "Mice removal",
  "Cockroach treatment",
  "Bed bug treatment",
  "Wasp nest removal",
  "Commercial pest control",
];

export default function Hero() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const phoneInput = event.currentTarget.querySelector<HTMLInputElement>(
      "#enquiry-phone",
    );

    if (!phoneInput) {
      throw new Error("The enquiry form is missing its phone number field.");
    }

    phoneInput.setCustomValidity(
      phoneInput.value.replace(/\D/g, "").length >= 7
        ? ""
        : "Enter a phone number with at least 7 digits.",
    );

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    setSubmitted(true);
  }

  return (
    <MotionConfig reducedMotion="user">
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="home-hero__container">
          <motion.div
            className="home-hero__content"
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="home-hero__eyebrow">
              <span className="home-hero__eyebrow-mark" aria-hidden="true" />
              Pest control across London
            </p>
            <h1 className="home-hero__title" id="hero-title">
              Pest problems?
              <span>Let’s deal with them.</span>
            </h1>
            <p className="home-hero__description">
              Professional pest control for homes and businesses. Get prompt
              help with rats, mice, cockroaches, bed bugs and wasp nests.
            </p>
            <motion.a
              className="home-hero__cta"
              href="#enquiry-form"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              Tell us what you need
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="home-hero__cta-icon"
              >
                <path
                  d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>

            <div className="home-hero__service-area">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="home-hero__pin-icon"
              >
                <path
                  d="M16.25 8.333c0 4.167-6.25 9.167-6.25 9.167s-6.25-5-6.25-9.167a6.25 6.25 0 1 1 12.5 0Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle
                  cx="10"
                  cy="8.333"
                  r="2.083"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              Serving London homes and businesses
            </div>

            <ul className="home-hero__services" aria-label="Pest control services">
              {pestServices.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </motion.div>

          <motion.aside
            className="home-hero__enquiry"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.08, ease: "easeOut" }}
            aria-label="Pest control enquiry"
          >
            <div className="home-hero__photo">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="A well-kept home exterior"
                fill
                sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1200px) 48vw, 560px"
                className="home-hero__photo-image"
              />
              <span className="home-hero__photo-label">
                Care for every kind of property
              </span>
            </div>

            <div className="home-hero__form-content" id="enquiry-form">
              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.div
                    key="success"
                    className="home-hero__success"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="home-hero__success-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="m6 12.5 4 4 8-9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <h2 className="home-hero__form-title">
                      Thanks, your details are ready.
                    </h2>
                    <p className="home-hero__success-copy">
                      This demo form isn’t connected to our team, so nothing
                      has been sent.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.16 }}
                  >
                    <p className="home-hero__form-kicker">Get started</p>
                    <h2 className="home-hero__form-title">
                      Tell us how to reach you
                    </h2>
                    <p className="home-hero__form-description">
                      Add your details and we’ll help you take the next step.
                    </p>

                    <form
                      className="home-hero__form"
                      onSubmit={handleSubmit}
                      aria-describedby="form-disclaimer"
                    >
                      <div className="home-hero__field">
                        <label htmlFor="enquiry-name">Name</label>
                        <input
                          autoComplete="name"
                          id="enquiry-name"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          required
                          minLength={2}
                        />
                      </div>

                      <div className="home-hero__field">
                        <label htmlFor="enquiry-phone">Phone number</label>
                        <input
                          autoComplete="tel"
                          id="enquiry-phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          placeholder="e.g. 020 1234 5678"
                          required
                          onChange={(event) =>
                            event.currentTarget.setCustomValidity("")
                          }
                        />
                      </div>

                      <div className="home-hero__field">
                        <label htmlFor="enquiry-postcode">Postcode</label>
                        <input
                          autoComplete="postal-code"
                          id="enquiry-postcode"
                          name="postcode"
                          type="text"
                          placeholder="e.g. SW1A 1AA"
                          minLength={5}
                          maxLength={8}
                          pattern="[A-Za-z0-9 ]{5,8}"
                          required
                        />
                      </div>

                      <div className="home-hero__field">
                        <label htmlFor="enquiry-email">Email</label>
                        <input
                          autoComplete="email"
                          id="enquiry-email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                        />
                      </div>

                      <motion.button
                        className="home-hero__submit"
                        type="submit"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.16 }}
                      >
                        Check my details
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="home-hero__cta-icon"
                        >
                          <path
                            d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.button>
                      <p
                        className="home-hero__disclaimer"
                        id="form-disclaimer"
                      >
                        Demo only: details are validated in your browser and
                        aren’t sent anywhere.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        </div>
      </section>
    </MotionConfig>
  );
}
