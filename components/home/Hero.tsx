"use client";

import Image from "next/image";
import {
  useState,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Transition,
  type Variants,
} from "framer-motion";

const pestServices = [
  "Rat control",
  "Mice removal",
  "Cockroach treatment",
  "Bed bug treatment",
  "Wasp nest removal",
  "Commercial pest control",
];

/* ---------- Radar (the hero's signature moment) ---------- */

const SWEEP_SECONDS = 7;

type Detection = {
  area: string;
  pest: string;
  x: number; // % of the radar square
  y: number;
  angle: number; // degrees clockwise from 12 o'clock, so the sweep and the flash line up
  side: "left" | "right";
};

const detections: Detection[] = [
  { area: "E14", pest: "Rats", x: 71, y: 35, angle: 55, side: "left" },
  { area: "SE1", pest: "Wasps", x: 82, y: 48, angle: 86, side: "left" },
  { area: "N7", pest: "Bed bugs", x: 66, y: 62, angle: 127, side: "right" },
  { area: "SW9", pest: "Mice", x: 32, y: 46, angle: 283, side: "right" },
  { area: "W2", pest: "Cockroaches", x: 21.5, y: 36, angle: 296, side: "right" },
  { area: "EC1", pest: "Commercial", x: 38, y: 29, angle: 330, side: "right" },
];

function Blip({ area, pest, x, y, angle, side, reduce }: Detection & { reduce: boolean }) {
  // Each blip flashes at the exact moment the sweep passes its angle.
  const delay = (angle / 360) * SWEEP_SECONDS;
  const loop: Transition = { duration: SWEEP_SECONDS, delay, repeat: Infinity, ease: "easeOut" };

  return (
    <div className="absolute size-0" style={{ left: `${x}%`, top: `${y}%` }}>
      <motion.span
        className="absolute -left-1.25 -top-1.25 size-2.5 rounded-full bg-brand-red shadow-[0_0_14px_3px_rgb(225_29_72/0.75)]"
        initial={{ opacity: 0.25 }}
        animate={reduce ? { opacity: 0.9 } : { opacity: [1, 0.25], scale: [1.7, 1] }}
        transition={reduce ? undefined : loop}
      />
      {!reduce && (
        <motion.span
          className="absolute -left-1.25 -top-1.25 size-2.5 rounded-full border border-brand-red"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.9, 0], scale: [1, 4.5] }}
          transition={{
            duration: 1.6,
            delay,
            repeat: Infinity,
            repeatDelay: SWEEP_SECONDS - 1.6,
            ease: "easeOut",
          }}
        />
      )}
      <span
        className={`absolute top-1/2 -translate-y-1/2 ${side === "left" ? "right-4" : "left-4"}`}
      >
        <motion.span
          className="block whitespace-nowrap rounded-pill border border-white/15 bg-brand-navy-deep/70 px-2 py-0.5 text-[0.6875rem] font-semibold leading-tight text-white/70 backdrop-blur-sm"
          initial={{ opacity: 0.15 }}
          animate={reduce ? { opacity: 1 } : { opacity: [1, 0.15] }}
          transition={reduce ? undefined : loop}
        >
          <b className="font-bold text-white">{area}</b> {pest}
        </motion.span>
      </span>
    </div>
  );
}

function Radar({ reduce }: { reduce: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 aspect-square w-[125%] -translate-x-1/2 -translate-y-1/2"
    >
      {[28, 52, 76, 100].map((size) => (
        <span
          key={size}
          className="absolute rounded-full border border-white/15"
          style={{ inset: `${(100 - size) / 2}%` }}
        />
      ))}
      <span className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
      <span className="absolute left-0 top-1/2 h-px w-full bg-white/10" />

      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 285deg, rgb(139 116 255 / 0.06) 300deg, rgb(139 116 255 / 0.5) 360deg)",
        }}
        initial={{ rotate: 0 }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: SWEEP_SECONDS, ease: "linear", repeat: Infinity }}
      >
        <span
          className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2"
          style={{ background: "linear-gradient(to bottom, rgb(196 181 255 / 0.95), transparent)" }}
        />
      </motion.div>

      {detections.map((d) => (
        <Blip key={d.area} {...d} reduce={reduce} />
      ))}
    </div>
  );
}

/* ---------- Motion presets ---------- */

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const maskUp: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.85, ease } },
};
const chipList: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const chipItem: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease } },
};
const formStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.4 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.16 } },
};

const headlineGradient = "linear-gradient(95deg, #c4b5fd 0%, #e879f9 52%, #fb7185 100%)";

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="size-[1.125rem] shrink-0 transition-transform group-hover:translate-x-1"
    >
      <path
        d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Hero ---------- */

export default function Hero() {
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const reduce = useReducedMotion() ?? false;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Cursor spotlight that trails the mouse across the hero
  const mx = useMotionValue(360);
  const my = useMotionValue(240);
  const sx = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 22, mass: 0.6 });
  const spotlight = useMotionTemplate`radial-gradient(30rem circle at ${sx}px ${sy}px, rgb(139 116 255 / 0.2), transparent 65%)`;

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set(event.clientX - rect.left);
    my.set(event.clientY - rect.top);
  }

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      postcode: formData.get("postcode"),
      email: formData.get("email"),
      service: formData.get("service") || selected,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ type: "success", msg: "Enquiry submitted successfully!" });
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus({ type: "error", msg: data.message || "Something went wrong." });
      }
    } catch (error) {
      setStatus({ type: "error", msg: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative isolate overflow-hidden bg-brand-navy-deep px-page py-16 text-text-inverse sm:py-20 lg:flex lg:min-h-[min(52rem,100svh)] lg:items-center lg:py-24"
        aria-labelledby="hero-title"
        onPointerMove={handlePointerMove}
      >
        {/* Backdrop: glow, dot grid, cursor spotlight */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60rem 40rem at 0% 0%, color-mix(in srgb, var(--brand-purple) 40%, transparent), transparent 60%), radial-gradient(44rem 32rem at 100% 100%, color-mix(in srgb, var(--brand-red) 22%, transparent), transparent 62%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgb(255 255 255 / 0.1) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage: "radial-gradient(ellipse at 72% 40%, #000 8%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at 72% 40%, #000 8%, transparent 70%)",
            }}
          />
          <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        </div>

        <div className="mx-auto grid w-full max-w-content items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-24">
          {/* ---------- Left: message ---------- */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.p
              variants={rise}
              className="inline-flex items-center gap-2.5 rounded-pill border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-white/85 backdrop-blur"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-red opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-red" />
              </span>
              Pest control across London
            </motion.p>

            <h1
              id="hero-title"
              className="mt-6 font-display text-[clamp(2.5rem,8vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.05em] text-white"
            >
              <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                {["Pest", "problems?"].map((word) => (
                  <motion.span
                    key={word}
                    variants={maskUp}
                    className="mr-[0.24em] inline-block last:mr-0"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                <motion.span
                  variants={maskUp}
                  className="inline-block bg-clip-text text-transparent"
                  style={{ backgroundImage: headlineGradient }}
                >
                  Let’s deal with them.
                </motion.span>
              </span>
            </h1>

            <motion.p
              variants={rise}
              className="mt-6 max-w-[38rem] text-[1.0625rem] leading-relaxed text-white/70"
            >
              Professional pest control for homes and businesses. Get prompt
              help with rats, mice, cockroaches, bed bugs and wasp nests.
            </motion.p>

            <motion.a
              variants={rise}
              href="#enquiry-form"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group mt-7 inline-flex min-h-13 items-center gap-3 rounded-md bg-brand-red px-6 py-3.5 text-[0.9375rem] font-bold text-text-inverse shadow-[0_12px_30px_rgb(225_29_72/0.35)] transition-colors hover:bg-brand-red-hover"
            >
              Tell us what you need
              <Arrow />
            </motion.a>

            <motion.p
              variants={rise}
              className="mt-5 flex items-center gap-2 text-sm font-semibold text-white/70"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-[1.125rem] shrink-0 text-white/90">
                <path
                  d="M16.25 8.333c0 4.167-6.25 9.167-6.25 9.167s-6.25-5-6.25-9.167a6.25 6.25 0 1 1 12.5 0Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="8.333" r="2.083" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Serving London homes and businesses
            </motion.p>

            <motion.div variants={rise} className="mt-9">
              <p id="services-label" className="text-sm font-semibold text-white/60">
                What do you need help with?
              </p>
              <motion.ul
                variants={chipList}
                aria-labelledby="services-label"
                className="mt-3 flex flex-wrap gap-2"
              >
                {pestServices.map((service) => {
                  const active = service === selected;
                  return (
                    <motion.li key={service} variants={chipItem}>
                      <motion.button
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelected(active ? null : service)}
                        whileTap={{ scale: 0.95 }}
                        className={`relative isolate cursor-pointer rounded-pill border px-4 py-2 text-[0.8125rem] font-semibold transition-colors ${
                          active
                            ? "border-transparent text-white"
                            : "border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="service-pill"
                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                            className="absolute inset-0 -z-10 rounded-pill bg-brand-red shadow-[0_8px_20px_rgb(225_29_72/0.35)]"
                          />
                        )}
                        {service}
                      </motion.button>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          </motion.div>

          {/* ---------- Right: scan panel + enquiry ---------- */}
          <motion.div
            className="relative mx-auto w-full max-w-[30rem] lg:ml-auto lg:mr-0"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
          >
            {/* Pulses that echo outwards from the card */}
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl border border-white/25"
                initial={{ opacity: 0 }}
                animate={reduce ? undefined : { opacity: [0.5, 0], scale: [1, 1.4] }}
                transition={{ duration: 4.5, delay: 1 + i * 1.5, repeat: Infinity, ease: "easeOut" }}
              />
            ))}

            <aside
              className="relative overflow-hidden rounded-xl border border-border bg-surface text-text-primary shadow-raised"
              aria-label="Pest control enquiry"
            >
              <div className="relative h-56 overflow-hidden bg-brand-navy sm:h-64">
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.8, ease }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                    alt="A well-kept home exterior"
                    fill
                    sizes="(max-width: 1023px) calc(100vw - 32px), 480px"
                    className="object-cover object-[center_57%]"
                  />
                </motion.div>
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, color-mix(in srgb, var(--brand-navy-deep) 92%, transparent), color-mix(in srgb, var(--brand-navy) 45%, transparent) 55%, color-mix(in srgb, var(--brand-purple) 25%, transparent))",
                  }}
                />
                <Radar reduce={reduce} />
                <span className="absolute bottom-4 left-4 z-20 max-w-60 font-display text-lg font-bold leading-snug text-white">
                  Care for every kind of property
                </span>
              </div>

              <div className="scroll-mt-24 p-card" id="enquiry-form">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      className="grid min-h-[21rem] content-center justify-items-start"
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span
                        aria-hidden="true"
                        className="relative mb-5 grid size-14 place-items-center rounded-full bg-brand-purple text-white shadow-[0_10px_28px_rgb(91_61_245/0.35)]"
                      >
                        <motion.span
                          className="absolute inset-0 rounded-full border-2 border-brand-purple"
                          initial={{ scale: 1, opacity: 0.6 }}
                          animate={{ scale: 1.8, opacity: 0 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                        <svg viewBox="0 0 24 24" fill="none" className="size-7">
                          <motion.path
                            d="m6 12.5 4 4 8-9"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                          />
                        </svg>
                      </span>
                      <h2 className="font-display text-[1.5rem] font-bold leading-tight tracking-tight text-brand-navy">
                        Thanks, your details are ready.
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        This demo form isn’t connected to our team, so nothing
                        has been sent.
                      </p>
                      {selected && (
                        <p className="mt-3 text-sm text-text-secondary">
                          Service: <strong className="text-brand-navy">{selected}</strong>
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-6 cursor-pointer text-sm font-semibold text-brand-purple underline underline-offset-4 hover:text-brand-purple-strong"
                      >
                        Start again
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      variants={formStagger}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      <motion.div variants={rise}>
                        <p className="text-sm font-bold text-brand-purple">Get started</p>
                        <h2 className="mt-1 font-display text-[clamp(1.35rem,4vw,1.7rem)] font-bold leading-tight tracking-tight text-brand-navy">
                          Tell us how to reach you
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                          Add your details and we’ll help you take the next step.
                        </p>
                      </motion.div>

                      <AnimatePresence initial={false}>
                        {selected && (
                          <motion.div
                            key="service"
                            className="overflow-hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease }}
                          >
                            <div className="mt-4 flex items-center justify-between gap-3 rounded-md border border-brand-purple/20 bg-brand-purple/5 px-3.5 py-2.5 text-sm">
                              <span>
                                <span className="text-text-secondary">Service: </span>
                                <strong className="text-brand-navy">{selected}</strong>
                              </span>
                              <button
                                type="button"
                                onClick={() => setSelected(null)}
                                aria-label="Clear selected service"
                                className="grid size-6 cursor-pointer place-items-center rounded-full text-text-secondary transition-colors hover:bg-brand-purple/10 hover:text-brand-purple"
                              >
                                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3.5">
                                  <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    <form className="mt-5 grid gap-3.5 sm:grid-cols-2" onSubmit={handleSubmit}>
      <input type="hidden" name="service" value={selected ?? ""} />

      <div className="home-hero__field">
        <label htmlFor="enquiry-name">Name</label>
        <input
          id="enquiry-name"
          name="name"
          type="text"
          placeholder="Your name"
          required
          minLength={2}
          className="w-full"
        />
      </div>

      <div className="home-hero__field">
        <label htmlFor="enquiry-phone">Phone number</label>
        <input
          id="enquiry-phone"
          name="phone"
          type="tel"
          placeholder="e.g. 020 1234 5678"
          required
          className="w-full"
        />
      </div>

      <div className="home-hero__field">
        <label htmlFor="enquiry-postcode">Postcode</label>
        <input
          id="enquiry-postcode"
          name="postcode"
          type="text"
          placeholder="e.g. UB4 8JG"
          required
          minLength={5}
          maxLength={8}
          className="w-full"
        />
      </div>

      <div className="home-hero__field">
        <label htmlFor="enquiry-email">Email</label>
        <input
          id="enquiry-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          className="w-full"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group mt-1 inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-2.5 rounded-md bg-brand-red text-[0.9375rem] font-bold text-text-inverse shadow-[0_10px_24px_rgb(225_29_72/0.28)] transition-colors hover:bg-brand-red-hover disabled:opacity-50 sm:col-span-2"
      >
        {loading ? "Sending..." : "Check my details"}
      </button>

      {status && (
        <p
          className={`text-center text-xs sm:col-span-2 ${
            status.type === "success" ? "text-green-600 font-semibold" : "text-red-500"
          }`}
        >
          {status.msg}
        </p>
      )}
    </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </aside>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}