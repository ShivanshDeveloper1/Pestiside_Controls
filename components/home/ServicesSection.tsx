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

const SERVICES = [
  {
    id: "rat-control",
    title: "Rat Control & Removal",
    category: "Rodents",
    badge: "24/7 Emergency",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    image:
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Brown rat inspection and wildlife management target",
    shortDesc:
      "Targeted baiting and entry-point sealing that clears active rat infestations and prevents re-entry permanently.",
    fullDesc:
      "Rats cause structural damage and pose serious health hazards through gnawing and contamination. Our dual-phase program uses strategic smart-baiting coupled with heavy-duty structural proofing (steel mesh & industrial sealant) to guarantee total eradication.",
    priceRange: "$180 - $350",
    avgPrice: 245,
    responseTime: "< 2 Hours",
    ecoRating: "92% Eco-Balanced",
    warranty: "6-Month Money Back",
    isEmergency: true,
    tags: ["Rodent Proofing", "Bait Stations", "Sanitation Audit"],
    steps: [
      { title: "Inspection & Thermal Audit", desc: "Locate nesting zones and entry cracks down to 0.5 inches." },
      { title: "Targeted Eradication", desc: "Deploy tamper-proof bait matrices and smart sensors." },
      { title: "Entry-Point Proofing", desc: "Seal pipe gaps, vents, and rooflines with chew-proof mesh." },
      { title: "Sanitation & Prevention", desc: "Sanitize affected areas and issue a 6-month clear warranty." }
    ]
  },
  {
    id: "mice-removal",
    title: "Precision Mice Control",
    category: "Rodents",
    badge: "Family & Pet Safe",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    image:
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Field mouse trapped safely in eco-friendly environment",
    shortDesc:
      "Trap placement and gap-sealing paired with hygiene guidance to clear house and field mice quickly.",
    fullDesc:
      "Mice breed exponentially and contaminate food surfaces. We deploy non-toxic, eco-friendly trapping technology paired with precision copper mesh sealing to eliminate nesting grounds without toxic airborne fumes.",
    priceRange: "$150 - $280",
    avgPrice: 195,
    responseTime: "Same-Day",
    ecoRating: "98% Botanical & Safe",
    warranty: "90-Day Guarantee",
    isEmergency: false,
    tags: ["Snap Traps", "Copper Mesh", "Attic Sealing"],
    steps: [
      { title: "Pheromone Mapping", desc: "Identify high-traffic travel routes and wall void harborages." },
      { title: "Snap & Live Capture", desc: "Position concealed, child-safe multi-catch stations." },
      { title: "Exclusion Sealing", desc: "Block baseboards, kickplates, and exterior utility holes." },
      { title: "Final Clearing Audit", desc: "Verify 100% elimination with flour tracking tests." }
    ]
  },
  {
    id: "cockroach-treatment",
    title: "Cockroach Colony Treatment",
    category: "Insects",
    badge: "Targeted Gel Matrix",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    image:
      "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Close up of insect treatment application surface",
    shortDesc:
      "Advanced gel baiting and crack-and-crevice treatments reaching roaches deep where they breed.",
    fullDesc:
      "German and American cockroaches carry pathogens and thrive in hard-to-reach crevices. Our deep gel baiting incorporates Insect Growth Regulators (IGRs) that destroy eggs and stop breeding cycles permanently.",
    priceRange: "$160 - $320",
    avgPrice: 220,
    responseTime: "< 4 Hours",
    ecoRating: "88% Targeted Micro-Gel",
    warranty: "100-Day Clean Guarantee",
    isEmergency: true,
    tags: ["IGR Gel Bait", "Crack & Crevice", "Kitchen Audit"],
    steps: [
      { title: "Species Identification", desc: "Distinguish German, Oriental, or American species for precise baiting." },
      { title: "Micro-Gel Placement", desc: "Apply non-odorous bait dot matrix in hinges, motors, and voids." },
      { title: "Growth Regulator Fog", desc: "Disrupt juvenile molting to sterilize surviving colonies." },
      { title: "Follow-Up Monitoring", desc: "Install adhesive monitor traps to confirm zero activity." }
    ]
  },
  {
    id: "bed-bug-heat",
    title: "Bed Bug Thermal Eradication",
    category: "Nuisance & Specialty",
    badge: "1-Day Heat Solution",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Clean mattress and sanitized bedroom interior",
    shortDesc:
      "Thermal heat and residual spray treatments for mattresses, frames, and furniture breaking all lifecycle stages.",
    fullDesc:
      "Bed bugs are immune to standard over-the-counter sprays. Our eco-thermal heating technology penetrates walls, mattresses, and floorboards up to 135°F to eliminate bugs and hidden eggs in a single 6-hour visit.",
    priceRange: "$290 - $650",
    avgPrice: 450,
    responseTime: "24-Hour Dispatch",
    ecoRating: "100% Chemical-Free Heat",
    warranty: "1-Year Complete Guarantee",
    isEmergency: true,
    tags: ["Heat Treatment", "Mattress Encase", "Egg Destruction"],
    steps: [
      { title: "Canine/K9 Inspection", desc: "Pinpoint hidden harborage pockets in headboards and baseboards." },
      { title: "Thermal Convection", desc: "Heat ambient space to lethal temperatures (130°F-140°F) for 4+ hours." },
      { title: "Residual Perimeter Shield", desc: "Apply invisible desiccant dust inside electric outlets and trim." },
      { title: "Mattress Protection", desc: "Install certified bite-proof encasements on box springs." }
    ]
  },
  {
    id: "wasp-removal",
    title: "Emergency Wasp & Nest Removal",
    category: "Insects",
    badge: "Same-Day Emergency",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    image:
      "https://images.unsplash.com/photo-1585152004491-4f12cf830a34?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Wasp close up near structural eave",
    shortDesc:
      "Safe, fast nest removal from eaves, attics, and gardens with zero ladder risks for property owners.",
    fullDesc:
      "Aggressive wasps, hornets, and yellowjackets endanger families and guests. Our certified technicians equip high-reach telescoping dusters to neutralize nests instantly and spray anti-nesting repellents on soffits.",
    priceRange: "$120 - $240",
    avgPrice: 175,
    responseTime: "< 1 Hour Priority",
    ecoRating: "85% Instant Knockdown",
    warranty: "Season-Long Protection",
    isEmergency: true,
    tags: ["High-Reach Rig", "Hornet Neutralizer", "Eave Spray"],
    steps: [
      { title: "Perimeter Drone Scan", desc: "Identify active entry holes in high roof gables and wall cavities." },
      { title: "Fast-Knockdown Treatment", desc: "Inject lethal dust directly into nest core structure." },
      { title: "Complete Nest Extraction", desc: "Safely remove and bag nest casing from eaves or trees." },
      { title: "Anti-Rebuild Pheromone Shield", desc: "Treat eaves with repelling oils to stop future nest building." }
    ]
  },
  {
    id: "commercial-control",
    title: "Commercial & Business Defense",
    category: "Commercial",
    badge: "Regulatory Compliant",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Large commercial warehouse with pristine storage shelving",
    shortDesc:
      "Scheduled maintenance, audit documentation, and compliance support for restaurants, offices, and logistics.",
    fullDesc:
      "Protect your brand, pass health department audits with flying colors, and ensure zero customer complaints. We provide discreet off-hours servicing, barcode tracking, and complete digital reporting.",
    priceRange: "Custom / Monthly",
    avgPrice: 350,
    responseTime: "Dedicated Account Lead",
    ecoRating: "100% Audit Ready",
    warranty: "Zero-Infestation SLA",
    isEmergency: false,
    tags: ["Audit Documentation", "Discreet Service", "Barcode Scanning"],
    steps: [
      { title: "Risk & Vulnerability Mapping", desc: "Conduct HACCP/AIB standard audit of loading docks and kitchen bays." },
      { title: "Discreet Implementation", desc: "Install hidden interior stations and fly control units after hours." },
      { title: "Digital Barcode Logging", desc: "Track station activity with real-time cloud mobile app reports." },
      { title: "Health Inspector Sign-Off", desc: "Furnish quarterly compliance binders for regulatory inspections." }
    ]
  },
  {
    id: "ant-extermination",
    title: "Ant Colony Extermination",
    category: "Insects",
    badge: "Queen Destruction",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    image:
      "https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Macro close up of ants on trail",
    shortDesc:
      "Eradicate persistent carpenter, sugar, and pavement ant trails by targeting the subterranean queen.",
    fullDesc:
      "Surface sprays only kill worker ants while the queen lays thousands more inside walls. Our protein/sugar dual baiting system is carried directly into the colony nest, destroying the queen and entire colony inside 48 hours.",
    priceRange: "$140 - $260",
    avgPrice: 185,
    responseTime: "Same-Day",
    ecoRating: "95% Non-Repellent",
    warranty: "6-Month Defense",
    isEmergency: false,
    tags: ["Carpenter Ant Barrier", "Queen Baiting", "Lawn Spray"],
    steps: [
      { title: "Pheromone Trail Tracking", desc: "Follow active worker trails back to subterranean or wall-void nests." },
      { title: "Delayed-Action Baiting", desc: "Deploy protein/sugar baits that workers carry to the queen." },
      { title: "Perimeter Granular Barrier", desc: "Apply weather-resistant granules around foundation perimeter." },
      { title: "Wood Structure Check", desc: "Audit structural beams for carpenter ant tunneling damage." }
    ]
  },
  {
    id: "termite-protection",
    title: "Termite & Timber Protection",
    category: "Nuisance & Specialty",
    badge: "Structural Warranty",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Wooden building framework structure",
    shortDesc:
      "Radar thermal scanning, liquid soil barriers, and subterranean baiting to safeguard property foundations.",
    fullDesc:
      "Subterranean termites cause billions in property damage silently. We use Termatrac radar and acoustic sensors to detect activity inside drywalls, then apply liquid Termidor barriers and station monitors.",
    priceRange: "$350 - $1,200",
    avgPrice: 650,
    responseTime: "Priority Scheduling",
    ecoRating: "90% Low Volume Soil Barrier",
    warranty: "5-Year Renewable Warranty",
    isEmergency: false,
    tags: ["Radar Detection", "Liquid Barrier", "In-Ground Stations"],
    steps: [
      { title: "Acoustic & Thermal Scanning", desc: "Locate active movement behind walls without drilling holes." },
      { title: "Perimeter Trench & Injection", desc: "Inject non-repellent termiticide into soil around foundations." },
      { title: "In-Ground Smart Stations", desc: "Place monitored bait tubes every 10 feet around property line." },
      { title: "Annual Inspection Shield", desc: "Conduct annual renewal checks backed by $250k repair guarantee." }
    ]
  }
];

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

  if (!service) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-slate-950/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100 sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
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
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
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
        <div className="mb-6 flex border-b border-slate-800">
          {[
            { id: "overview", label: "Overview & Safety", icon: Info },
            { id: "process", label: "4-Step Treatment Plan", icon: Layers },
            { id: "guarantee", label: "Warranty & SLA", icon: ShieldCheck }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
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
        <div className="space-y-6">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-950/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100 sm:p-8"
      >
        <button
          onClick={onClose}
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
              <h3 className="mt-2 text-2xl font-bold text-white">
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
            <h3 className="text-2xl font-bold text-white">Quote Locked In!</h3>
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