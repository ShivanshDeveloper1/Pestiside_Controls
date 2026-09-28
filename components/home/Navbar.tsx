"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Menu, ShieldCheck, X } from "lucide-react";

const NAV_ITEMS = ["Home", "About Us", "Services", "Blog", "Contact Us"] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Subtle elevated-surface state once the page scrolls — no layout shift,
  // the header stays the same height, only its background/shadow change.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile menu is open, and move focus
  // into the panel so keyboard users land somewhere sensible.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape closes the menu and returns focus to the button that opened it.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Basic focus trap: Tab / Shift+Tab cycle within the open panel only.
  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // One-page demo: there are no routes yet, so every nav item and CTA is
  // intentionally inert. Swap this for real scrollIntoView / links once
  // the corresponding sections or pages exist.
  const handleNavClick = () => {
    setIsOpen(false);
  };

  const listVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -16 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? "border-border bg-surface/90 shadow-soft backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 max-w-content items-center justify-between px-page sm:h-[4.5rem]"
        >
          {/* Logo — swap for next/image once a logo asset exists in /public */}
  <button
  type="button"
  onClick={handleNavClick}
  aria-label="Speedy Pest Control — home"
  className="flex items-center rounded-md"
>
  <img
    src="/logo.jpeg"
    alt="Speedy Pest Control"
    className="h-10 w-auto max-w-[180px] object-contain sm:h-12"
  />
</button>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={handleNavClick}
                  className="group relative rounded-md px-4 py-2 text-sm font-semibold text-text-primary transition-colors duration-200 hover:text-brand-purple-strong"
                >
                  {item}
                  <span
                    aria-hidden
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-pill bg-brand-red transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <button
            type="button"
            onClick={handleNavClick}
            className="hidden shrink-0 rounded-md bg-brand-red px-5 py-2.5 text-sm font-bold text-text-inverse shadow-soft transition-colors duration-200 hover:bg-brand-red-hover lg:inline-flex lg:items-center"
          >
            Get a Free Quote
          </button>

          {/* Mobile menu trigger */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-md text-brand-navy lg:hidden"
          >
            <Menu className="h-6 w-6" strokeWidth={2} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-[60] bg-brand-navy-deep/40 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              id="mobile-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={shouldReduceMotion ? { opacity: 0 } : { y: "-8%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { y: "-8%", opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full w-full flex-col bg-surface px-page pb-10 pt-6 shadow-raised sm:mx-auto sm:mt-0 sm:h-auto sm:max-w-md sm:rounded-b-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-base font-bold text-brand-navy">
                  Speedy<span className="text-brand-red">Pest</span>
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-navy"
                >
                  <X className="h-6 w-6" strokeWidth={2} />
                </button>
              </div>

              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="mt-6 flex flex-1 flex-col gap-1"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.li key={item} variants={itemVariants} className="border-b border-border">
                    <button
                      type="button"
                      onClick={handleNavClick}
                      className="block w-full py-4 text-left text-xl font-bold text-brand-navy transition-colors duration-150 active:text-brand-purple-strong"
                    >
                      {item}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>

              <button
                type="button"
                onClick={handleNavClick}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-brand-red px-5 py-4 text-base font-bold text-text-inverse shadow-soft transition-colors duration-200 hover:bg-brand-red-hover"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </button>

              <p className="mt-5 text-center text-xs text-text-secondary">
                Homes, restaurants, offices &amp; warehouses — 10 years of trusted service.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reserves the header's height in normal flow so page content is
          never hidden underneath the fixed header — no layout shift on
          scroll, since this spacer's height never changes. */}
      <div aria-hidden className="h-16 sm:h-[4.5rem]" />
    </>
  );
}