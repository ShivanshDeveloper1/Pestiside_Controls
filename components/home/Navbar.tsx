"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Subtle elevated-surface state once the page scrolls
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile menu is open
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

  // Escape closes the menu and returns focus
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

  // Basic focus trap
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

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const listVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "border-b border-slate-200/50 bg-white/80 shadow-sm backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/80"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={handleNavClick}
            aria-label="Speedo Pest Control — home"
            className="group flex items-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <img
              src="/logo.jpeg"
              alt="Speedo Pest Control"
              className="h-10 w-auto max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-12"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-2 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleNavClick}
                  className="group relative block rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors duration-300 hover:bg-slate-50 hover:text-rose-600 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-rose-400"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-rose-500 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/quote"
            onClick={handleNavClick}
            className="hidden shrink-0 transform rounded-full bg-rose-600 px-7 py-3 text-sm font-bold text-white shadow-md shadow-rose-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-500/40 lg:inline-flex lg:items-center"
          >
           Contact Us
          </Link>

          {/* Mobile menu trigger */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
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
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              id="mobile-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={shouldReduceMotion ? { opacity: 0 } : { y: "-10%", opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { y: "-5%", opacity: 0, scale: 0.98 }}
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full w-full flex-col overflow-y-auto bg-white px-6 pb-10 pt-6 shadow-2xl dark:bg-slate-950 sm:mx-auto sm:mt-4 sm:h-auto sm:max-w-md sm:rounded-3xl sm:border sm:border-slate-200/50 sm:dark:border-slate-800/50"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Speedo<span className="text-rose-600">Pest</span>
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <X className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </div>

              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="mt-8 flex flex-1 flex-col gap-2"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.li key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={handleNavClick}
                      className="group flex w-full items-center justify-between rounded-xl px-4 py-4 text-left text-xl font-bold text-slate-800 transition-all duration-200 hover:bg-slate-50 hover:text-rose-600 dark:text-slate-100 dark:hover:bg-slate-900 dark:hover:text-rose-400"
                    >
                      {item.label}
                      <ArrowRight className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100" strokeWidth={2.5} />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-8">
                <Link
                  href="/quote"
                  onClick={handleNavClick}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-rose-500/25 transition-all duration-300 hover:bg-rose-700 hover:shadow-xl hover:shadow-rose-500/40 active:scale-[0.98]"
                >
                 Contact Us
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                </Link>

                <p className="mt-6 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                  Homes, restaurants, offices &amp; warehouses — <br className="hidden sm:block" />
                  <span className="text-slate-700 dark:text-slate-300">10 years of trusted service.</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent layout shift */}
      <div aria-hidden className="h-20" />
    </>
  );
}