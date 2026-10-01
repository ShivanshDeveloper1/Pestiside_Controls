"use client"
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Clock,
  Zap,
  Sparkles,
  X,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Home,
  PhoneCall,
  ChevronRight,
  Filter,
  Check,
  Leaf,
  Bug,
  ShieldAlert,
  DollarSign,
  Calendar,
  Layers,
  Info,
  Flame,
  Award,
  SlidersHorizontal,
  RefreshCw,
  Phone,
  FileText
} from "lucide-react";
import { SERVICES } from "@/components/services/serviceData";

const CATEGORIES = ["All", "Rodents", "Insects", "Nuisance & Specialty", "Commercial"];

function ServiceCard({ service, onSelect, onQuote }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      {/* Dynamic Cursor Spotlight Hover Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Top Accent Gradient Border on Hover */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-rose-500 to-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div>
        {/* Card Header & Image Container */}
        <div className="relative mb-5 h-48 w-full overflow-hidden rounded-xl bg-slate-950">
          <img
            src={service.image}
            alt={service.imageAlt}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Badge Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md ${service.badgeColor}`}>
              <Sparkles className="h-3 w-3" />
              {service.badge}
            </span>
          </div>

          {/* Response Time Badge */}
          <div className="absolute bottom-3 right-3 rounded-md bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-md border border-slate-700/50 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            {service.responseTime}
          </div>
        </div>

        {/* Title & Category */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            {service.category}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            Est. {service.priceRange}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-slate-100 transition-colors group-hover:text-indigo-300">
          {service.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-3">
          {service.shortDesc}
        </p>

        {/* Feature Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-slate-300 border border-slate-700/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
        <button
          onClick={() => onSelect(service)}
          className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Details & Process
          <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </button>

        <button
          onClick={() => onQuote(service)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95"
        >
          <Zap className="h-3.5 w-3.5 text-amber-300" />
          Quick Quote
        </button>
      </div>
    </motion.article>
  );
}

function ServiceDetailModal({ service, onClose, onOpenQuote }) {
  const [activeTab, setActiveTab] = useState("overview");
  const reduceMotion = useReducedMotion();

  if (!service) return null;

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-slate-950/80"
      onClick={onClose}
    >
      <motion.div
        id="service-details-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-details-title"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
        transition={reduceMotion ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100 sm:p-8"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close service details"
          className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Hero Banner */}
        <div className="relative mb-6 h-52 sm:h-64 w-full overflow-hidden rounded-2xl">
          <img
            src={service.image}
            alt={service.imageAlt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <span className={`inline-block rounded-full border px-3 py-0.5 text-xs font-semibold backdrop-blur-md ${service.badgeColor} mb-2`}>
                {service.badge}
              </span>
              <h2 id="service-details-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {service.title}
              </h2>
            </div>
            <div className="rounded-xl bg-slate-900/90 border border-slate-700/60 px-3 py-1.5 backdrop-blur-md">
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Estimated Cost</p>
              <p className="text-base font-bold text-emerald-400">{service.priceRange}</p>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div
          role="tablist"
          aria-label="Service details"
          aria-orientation="horizontal"
          onKeyDown={(event) => {
            const tabs = Array.from(
              event.currentTarget.querySelectorAll<HTMLButtonElement>(
                '[role="tab"]',
              ),
            );
            const activeIndex = tabs.findIndex(
              (tab) => tab === document.activeElement,
            );
            let nextIndex = activeIndex;

            if (event.key === "ArrowRight") {
              nextIndex = (activeIndex + 1) % tabs.length;
            } else if (event.key === "ArrowLeft") {
              nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
            } else if (event.key === "Home") {
              nextIndex = 0;
            } else if (event.key === "End") {
              nextIndex = tabs.length - 1;
            } else {
              return;
            }

            event.preventDefault();
            const nextTab = tabs[nextIndex];
            nextTab.focus();
            setActiveTab(nextTab.dataset.tabId ?? "overview");
          }}
          className="mb-6 grid grid-cols-3 border-b border-slate-800"
        >
          {[
            { id: "overview", label: "Overview & Safety", icon: Info },
            { id: "process", label: "4-Step Treatment Plan", icon: Layers },
            { id: "guarantee", label: "Warranty & SLA", icon: ShieldCheck }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                id={`service-tab-${tab.id}`}
                data-tab-id={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls="service-tab-panel"
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex min-w-0 flex-col items-center justify-center gap-1.5 px-1 py-3 text-center text-xs font-semibold transition-colors sm:flex-row sm:gap-2 sm:px-4 sm:text-sm ${
                  activeTab === tab.id
                    ? "text-indigo-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <IconComponent className="h-4 w-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="modalTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div
          id="service-tab-panel"
          role="tabpanel"
          aria-labelledby={`service-tab-${activeTab}`}
          className="space-y-6"
        >
          {activeTab === "overview" && (
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="space-y-4"
            >
              <p className="text-base leading-relaxed text-slate-300">
                {service.fullDesc}
              </p>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2">
                <div className="rounded-xl bg-slate-800/50 border border-slate-700/40 p-3.5 text-center">
                  <Clock className="mx-auto h-5 w-5 text-amber-400 mb-1" />
                  <p className="text-xs text-slate-400">Response Speed</p>
                  <p className="text-sm font-bold text-slate-100">{service.responseTime}</p>
                </div>
                <div className="rounded-xl bg-slate-800/50 border border-slate-700/40 p-3.5 text-center">
                  <Leaf className="mx-auto h-5 w-5 text-emerald-400 mb-1" />
                  <p className="text-xs text-slate-400">Eco Safety Score</p>
                  <p className="text-sm font-bold text-slate-100">{service.ecoRating}</p>
                </div>
                <div className="rounded-xl bg-slate-800/50 border border-slate-700/40 p-3.5 text-center">
                  <Award className="mx-auto h-5 w-5 text-indigo-400 mb-1" />
                  <p className="text-xs text-slate-400">Guarantee</p>
                  <p className="text-sm font-bold text-slate-100">{service.warranty}</p>
                </div>
              </div>

              {/* Tags Cloud */}
              <div className="pt-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Technique Highlights</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-950/60 border border-indigo-800/40 px-3 py-1 text-xs font-medium text-indigo-300">
                      <Check className="h-3.5 w-3.5 text-indigo-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "process" && (
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="space-y-4"
            >
              <div className="relative border-l-2 border-indigo-500/30 ml-4 space-y-6 py-2">
                {service.steps.map((step, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-lg ring-4 ring-slate-900">
                      {idx + 1}
                    </div>
                    <h4 className="text-base font-bold text-slate-100">{step.title}</h4>
                    <p className="mt-1 text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "guarantee" && (
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="space-y-4"
            >
              <div className="rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-800/40 border border-indigo-500/20 p-5">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="h-8 w-8 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-bold text-white">100% Free Re-Treatment Guarantee</h4>
                    <p className="mt-1 text-sm text-slate-300 leading-relaxed">
                      If you notice any resurgence of pest activity during your warranty window ({service.warranty}), our rapid response dispatch team will re-inspect and re-treat your home at zero additional cost.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-slate-300">
                <div className="flex items-center gap-2 rounded-xl bg-slate-800/40 p-3 border border-slate-700/30">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Licensed & Bonded Pest Specialists</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-800/40 p-3 border border-slate-700/30">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>EPA-Registered & Low Odor Formulas</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-800/40 p-3 border border-slate-700/30">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Detailed Digital Service Certificate</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-800/40 p-3 border border-slate-700/30">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Child & Household Pet Safety Protocol</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Modal Action Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-6">
          <div className="text-center sm:text-left">
            <span className="text-xs text-slate-400 block">Need Immediate Dispatch?</span>
            <span className="text-sm font-bold text-amber-400 flex items-center justify-center sm:justify-start gap-1">
              <PhoneCall className="h-3.5 w-3.5" />
              Direct Emergency Desk: 1-800-PEST-NOW
            </span>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenQuote(service);
              }}
              className="w-1/2 sm:w-auto rounded-xl bg-gradient-to-r from-indigo-600 to-rose-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Get Instant Estimate
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function QuickQuoteModal({ service, onClose, onSubmitted }) {
  const reduceMotion = useReducedMotion();
  const [propertyType, setPropertyType] = useState("residential");
  const [sizeSqFt, setSizeSqFt] = useState(1800);
  const [urgency, setUrgency] = useState("standard");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const basePrice = service ? service.avgPrice : 200;

  const estimatedTotal = useMemo(() => {
    let multiplier = 1;
    if (propertyType === "commercial") multiplier += 0.4;
    if (sizeSqFt > 2500) multiplier += 0.3;
    if (urgency === "emergency") multiplier += 0.25;
    return Math.round(basePrice * multiplier);
  }, [basePrice, propertyType, sizeSqFt, urgency]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!phone) return;
    setSubmitted(true);
    setTimeout(() => {
      onSubmitted(service?.title || "Pest Service", estimatedTotal);
    }, 1200);
  }

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-950/80"
      onClick={onClose}
    >
      <motion.div
        id="quick-quote-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-quote-title"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
        transition={reduceMotion ? { duration: 0 } : undefined}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quote estimator"
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-400">
                <Zap className="h-3.5 w-3.5" />
                Live Instant Estimator
              </span>
              <h3 id="quick-quote-title" className="mt-2 text-2xl font-bold text-white">
                Instant Estimate: {service ? service.title : "Custom Treatment"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Adjust parameters below for an immediate cost estimate.</p>
            </div>

            {/* Property Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Property Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPropertyType("residential")}
                  className={`flex items-center justify-center gap-2 rounded-xl p-3 border text-sm font-semibold transition-all ${
                    propertyType === "residential"
                      ? "border-indigo-500 bg-indigo-600/20 text-indigo-300"
                      : "border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Residential
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyType("commercial")}
                  className={`flex items-center justify-center gap-2 rounded-xl p-3 border text-sm font-semibold transition-all ${
                    propertyType === "commercial"
                      ? "border-indigo-500 bg-indigo-600/20 text-indigo-300"
                      : "border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  Commercial
                </button>
              </div>
            </div>

            {/* Area Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="uppercase tracking-wider text-slate-400">Approx. Coverage Area</span>
                <span className="text-indigo-400">{sizeSqFt.toLocaleString()} sq. ft.</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={sizeSqFt}
                onChange={(e) => setSizeSqFt(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>500 sq ft (Apartment)</span>
                <span>2,500 sq ft (Avg House)</span>
                <span>5,000+ sq ft</span>
              </div>
            </div>

            {/* Urgency */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Response Priority</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUrgency("standard")}
                  className={`rounded-xl p-3 border text-left text-xs font-semibold transition-all ${
                    urgency === "standard"
                      ? "border-indigo-500 bg-indigo-600/20 text-indigo-300"
                      : "border-slate-800 bg-slate-800/40 text-slate-400"
                  }`}
                >
                  <div className="text-sm font-bold text-white">Standard Dispatch</div>
                  <div className="text-[11px] text-slate-400">Within 24-48 Hours</div>
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency("emergency")}
                  className={`rounded-xl p-3 border text-left text-xs font-semibold transition-all ${
                    urgency === "emergency"
                      ? "border-rose-500 bg-rose-600/20 text-rose-300"
                      : "border-slate-800 bg-slate-800/40 text-slate-400"
                  }`}
                >
                  <div className="text-sm font-bold text-white flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5 text-rose-500" />
                    Priority 2-Hr Rush
                  </div>
                  <div className="text-[11px] text-slate-400">Same-Day Emergency</div>
                </button>
              </div>
            </div>

            {/* Live Pricing Summary Box */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Estimated Total</p>
                <p className="text-xs text-slate-500">Includes inspection + warranty</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-emerald-400">${estimatedTotal}</span>
                <span className="text-xs text-slate-400 block">no hidden fees</span>
              </div>
            </div>

            {/* Contact Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Phone Number for Lock-In</label>
                <input
                  type="tel"
                  required
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-rose-600 py-3.5 text-sm font-bold text-white shadow-xl hover:shadow-indigo-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              Lock In ${estimatedTotal} Quote & Book
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        ) : (
          <div className="py-12 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 id="quick-quote-title" className="text-2xl font-bold text-white">
              Quote Locked In!
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Our dispatch team has received your calculation of <strong className="text-emerald-400">${estimatedTotal}</strong>. We will call <span className="text-indigo-300 font-semibold">{phone}</span> within 15 minutes to confirm.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();
  
  // State management
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyEmergency, setOnlyEmergency] = useState(false);
  const [activeModalService, setActiveModalService] = useState(null);
  const [activeQuoteService, setActiveQuoteService] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Filtered Services Calculation
  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory;
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesEmergency = onlyEmergency ? service.isEmergency : true;

      return matchesCategory && matchesSearch && matchesEmergency;
    });
  }, [selectedCategory, searchQuery, onlyEmergency]);

  // Toast trigger
  function handleQuoteSubmitted(serviceName, price) {
    setActiveQuoteService(null);
    setToastMessage(`Quote confirmed for ${serviceName} at ~$${price}! Dispatch notified.`);
    setTimeout(() => setToastMessage(null), 5000);
  }

  return (
    <section id="services" className="relative bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden text-slate-100 min-h-screen">
      {/* Background Glow Accents */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl bg-indigo-900/15 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 bg-rose-900/10 blur-[140px] rounded-full" />

      {/* Floating Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-slate-900/95 px-5 py-3.5 shadow-2xl backdrop-blur-xl text-emerald-300 text-sm font-semibold"
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Precision Pest Management
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-display leading-tight">
            Targeted pest control <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              built around your home
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            From emergency rodent exclusion to certified commercial compliance, explore our guaranteed solutions tailored to your property.
          </p>
        </motion.div>

        {/* Stats Highlight Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 sm:p-6 sm:grid-cols-4 backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">100% Guaranteed</p>
              <p className="text-xs text-slate-400">Free re-treatment SLA</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">&lt; 2 Hr Arrival</p>
              <p className="text-xs text-slate-400">Same-day emergency desk</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Eco-Botanical</p>
              <p className="text-xs text-slate-400">Child & pet conscious</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">1,400+ Homes</p>
              <p className="text-xs text-slate-400">4.9/5 star satisfaction</p>
            </div>
          </div>
        </motion.div>

        {/* Interactive Filter Toolbar & Search */}
        {}
        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-slate-800 pb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "text-white"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="categoryPill"
                    className="absolute inset-0 rounded-xl bg-indigo-600 shadow-md shadow-indigo-600/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          {/* Search Input & Emergency Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search pests or treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setOnlyEmergency(!onlyEmergency)}
              className={`flex items-center justify-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                onlyEmergency
                  ? "border-rose-500 bg-rose-500/20 text-rose-300"
                  : "border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700"
              }`}
            >
              <Flame className={`h-3.5 w-3.5 ${onlyEmergency ? "text-rose-400" : "text-slate-500"}`} />
              Emergency Only
            </button>
          </div>
        </div>

        {/* Dynamic Services Grid with Animated Layout Reordering */}
        {}
        <div className="mt-8">
          {filteredServices.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence>
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onSelect={(s) => setActiveModalService(s)}
                    onQuote={(s) => setActiveQuoteService(s)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center space-y-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30"
            >
              <Bug className="mx-auto h-12 w-12 text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-300">No Services Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No active treatments match "{searchQuery}". Try broadening your search or resetting filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setOnlyEmergency(false);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset All Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Footer Guarantee Callout Card */}
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950 p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 bg-indigo-500/10 blur-3xl rounded-full" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                Guaranteed Satisfaction
              </span>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Not sure which service you need?
              </h3>
              <p className="text-sm text-slate-400 max-w-xl">
                Our certified technicians perform comprehensive thermal and visual inspections to pinpoint hidden nesting sites before recommending a treatment plan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={() => setActiveQuoteService(SERVICES[0])}
                className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-950 hover:bg-slate-100 transition-colors shadow-lg shadow-white/10 flex items-center justify-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Schedule Free Audit
              </button>
              <a
                href="tel:18005550199"
                className="rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3 text-sm font-bold text-slate-200 hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4 text-indigo-400" />
                Call Hotline
              </a>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Detail Slideover / Modal */}
      <AnimatePresence>
        {activeModalService && (
          <ServiceDetailModal
            service={activeModalService}
            onClose={() => setActiveModalService(null)}
            onOpenQuote={(service) => setActiveQuoteService(service)}
          />
        )}
      </AnimatePresence>

      {/* Quick Quote Estimator Modal */}
      <AnimatePresence>
        {activeQuoteService && (
          <QuickQuoteModal
            service={activeQuoteService}
            onClose={() => setActiveQuoteService(null)}
            onSubmitted={handleQuoteSubmitted}
          />
        )}
      </AnimatePresence>
    </section>
  );
}