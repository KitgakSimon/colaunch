import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  Users,
  Activity,
  Zap,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Star,
  Monitor,
  Command,
  Lock,
  Bot,
  Database,
  BarChart3,
  Calendar,
  Check,
  Terminal,
  Eye,
  X,
  Globe,
  ChevronRight,
  MessageSquare,
  Shield,
  Rocket,
  Search,
  Sparkle,
  Heart,
  BookOpen,
  FolderOpen
} from "lucide-react";
import { getFriendlyColorName, hexToRgba } from "../../utils/avatarColorExtractor";

/**
 * CoLaunch Studio Color Scheme
 * Clean, human, prestigious venture studio palettes (Obsidian, Emerald, Forge Lime, Ocean Cyan, Venture Amber, Steel)
 * Zero non-human AI purple gradients.
 */
export const BRAND_COLORS = [
  { name: "Emerald", hex: "#16A34A", bg: "bg-emerald-600", text: "text-emerald-500", border: "border-emerald-600/40", glow: "rgba(22, 163, 74, 0.22)" },
  { name: "Forge Lime", hex: "#C8FF3D", bg: "bg-[#C8FF3D]", text: "text-[#C8FF3D]", border: "border-[#C8FF3D]/40", glow: "rgba(200, 255, 61, 0.2)" },
  { name: "Obsidian Slate", hex: "#0F172A", bg: "bg-slate-900", text: "text-slate-200", border: "border-slate-700", glow: "rgba(15, 23, 42, 0.3)" },
  { name: "Ocean Cyan", hex: "#0284C7", bg: "bg-sky-600", text: "text-sky-400", border: "border-sky-500/40", glow: "rgba(2, 132, 199, 0.2)" },
  { name: "Venture Amber", hex: "#D97706", bg: "bg-amber-600", text: "text-amber-400", border: "border-amber-500/40", glow: "rgba(217, 119, 6, 0.2)" },
  { name: "Steel", hex: "#475569", bg: "bg-slate-600", text: "text-slate-300", border: "border-slate-600/40", glow: "rgba(71, 85, 105, 0.2)" },
];

export function getBrandColorObj(colorInput) {
  if (!colorInput) return BRAND_COLORS[0];
  const found = BRAND_COLORS.find(
    (c) =>
      c.name.toLowerCase() === String(colorInput).toLowerCase() ||
      c.hex.toLowerCase() === String(colorInput).toLowerCase()
  );
  if (found) return found;
  // If a legacy purple/violet hex was stored, remap to Emerald
  if (String(colorInput).toLowerCase().includes("8b5cf6") || (String(colorInput).toLowerCase().includes("purple") && !String(colorInput).startsWith("#"))) {
    return BRAND_COLORS[0];
  }

  const hex = String(colorInput).startsWith("#") ? colorInput : `#${colorInput}`;
  const friendlyName = getFriendlyColorName(hex);

  return {
    name: friendlyName || "Creator Custom",
    hex: hex,
    bg: "bg-slate-900",
    text: "text-white",
    border: `${hex}50`,
    glow: hexToRgba(hex, 0.25),
    isCustom: true,
  };
}

/**
 * Full Landing Page Preview Modal
 * Gives the operator & creator an immersive, full-resolution preview of the public-facing product landing page.
 */
function LandingPagePreviewModal({
  isOpen,
  onClose,
  concept,
  creator,
  mockupType,
  accentHex,
  appUrl,
  onOpenDeck,
  onEditConcept
}) {
  if (!isOpen || !concept) return null;

  const creatorName = creator?.name || creator?.display_name || "Creator";
  const firstName = creatorName.split(" ")[0];
  const niche = creator?.niche || "Tech & Creator Tools";
  const conceptName = concept?.name || "Product OS";
  const tagline = concept?.tagline || `The automated operating system for ${niche} professionals`;
  const description = concept?.description || concept?.problem || "Streamline your daily workflows, eliminate manual friction, and accelerate execution with a dedicated software platform.";
  const features = Array.isArray(concept?.keyFeatures) && concept.keyFeatures.length > 0
    ? concept.keyFeatures
    : ["Automated Workflow Pipelines", "Curated Template Library", "Real-Time Analytics Dashboard", "1-Click Digital Delivery"];
  const pricing = concept?.pricing || "$29/mo Starter • $79/mo Pro";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090B10] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-100 flex flex-col max-h-[92vh]">
        {/* Browser Top Chrome */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0D1017] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/90" />
            <div className="w-3 h-3 rounded-full bg-amber-400/90" />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentHex }} />
            <div className="ml-3 hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-black/50 border border-slate-800 text-xs font-mono text-slate-300">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>https://{appUrl}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
              style={{
                color: accentHex,
                backgroundColor: `${accentHex}1a`,
                borderColor: `${accentHex}40`
              }}
            >
              Live Landing Page Preview
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Landing Page Content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-10 space-y-12">
          {/* Landing Page Nav */}
          <nav className="flex items-center justify-between pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shadow-md"
                style={{ backgroundColor: accentHex, color: "#090B10" }}
              >
                {conceptName.charAt(0)}
              </div>
              <span className="font-bold text-base tracking-tight text-white">{conceptName}</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
              <span className="hover:text-white cursor-pointer transition-colors">Features</span>
              <span className="hover:text-white cursor-pointer transition-colors">Solutions</span>
              <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
              <span className="hover:text-white cursor-pointer transition-colors">About</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hover:text-white cursor-pointer hidden sm:inline">Log in</span>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg font-bold text-xs text-slate-900 transition-transform active:scale-95 cursor-pointer shadow-sm"
                style={{ backgroundColor: accentHex }}
              >
                Get Started Free →
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="text-center max-w-2xl mx-auto space-y-5 pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border"
              style={{
                color: accentHex,
                backgroundColor: `${accentHex}14`,
                borderColor: `${accentHex}33`
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Co-Launched with {creatorName} • Built for {niche}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {mockupType === "ai_copilot" ? (
                <>
                  The AI Copilot that <span className="italic" style={{ color: accentHex }}>actually</span> automates your {niche} workflow.
                </>
              ) : mockupType === "knowledge_hub" ? (
                <>
                  More impact. Less chaos. <span style={{ color: accentHex }}>Built for {firstName}&apos;s community.</span>
                </>
              ) : (
                <>
                  Run your entire {niche} workflow <span style={{ color: accentHex }}>in one unified operating system.</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
              {description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-900 transition-all hover:opacity-95 shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
                style={{ backgroundColor: accentHex, boxShadow: `0 8px 24px -4px ${accentHex}50` }}
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 transition-all active:scale-95 cursor-pointer"
              >
                Watch 2-Min Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span><strong>4.9/5</strong> rating from 1,200+ members</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline text-slate-400">Zero setup required</span>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="space-y-4 pt-6 border-t border-slate-800/80">
            <div className="text-center max-w-md mx-auto space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400" style={{ color: accentHex }}>
                Core Platform Capabilities
              </span>
              <h2 className="text-xl font-bold text-white">Everything needed to execute at scale</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 flex items-start gap-3 hover:border-slate-700 transition-colors"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${accentHex}1a`, color: accentHex }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{feat}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Tailored to {creatorName}&apos;s verified best practices and automated for immediate deployment.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Commercial Model Banner */}
          <div
            className="p-6 rounded-2xl border text-center space-y-3 relative overflow-hidden"
            style={{
              borderColor: `${accentHex}40`,
              background: `linear-gradient(180deg, ${accentHex}10 0%, rgba(9, 11, 16, 0.8) 100%)`
            }}
          >
            <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accentHex }}>
              Transparent Launch Pricing
            </span>
            <div className="text-2xl font-black text-white font-mono">{pricing}</div>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              50/50 Co-Founder Revenue Share with CoLaunch • Fully managed cloud infrastructure, 24/7 billing, and product updates.
            </p>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3.5 bg-[#0D1017] border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono">
            Target Audience: <strong className="text-slate-200">{concept?.customer || "High-Intent Practitioners"}</strong>
          </span>
          <div className="flex items-center gap-2">
            {onEditConcept && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEditConcept();
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Customize Concept</span>
              </button>
            )}
            {onOpenDeck && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDeck();
                }}
                className="px-3.5 py-1.5 rounded-lg font-bold text-slate-900 transition-colors cursor-pointer flex items-center gap-1.5"
                style={{ backgroundColor: accentHex }}
              >
                <Monitor className="w-3.5 h-3.5 text-slate-900" />
                <span>View Pitch Deck</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Dynamic Concept Mockup
 * Renders authentic, high-converting product Landing Page Hero Mockups
 * styled in the creator's branding color and niche visual style, directly matching
 * the reference examples (Coachly, Puppy Borrow, study100).
 */
export default function DynamicConceptMockup({
  concept,
  creator,
  conceptIndex = 0,
  theme,
  onOpenDeck,
  onEditConcept
}) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const brandColorObj = theme
    ? {
        name: theme.name,
        hex: theme.primaryHex,
        glow: theme.glow || `${theme.primaryHex}33`,
        bg: theme.badgeBg,
        text: theme.badgeText,
        border: theme.borderActive || theme.primaryHex,
      }
    : getBrandColorObj(concept?.brandColor || (conceptIndex === 0 ? "#16A34A" : conceptIndex === 1 ? "#0F172A" : "#0284C7"));
  const accentHex = brandColorObj.hex;
  const creatorName = creator?.name || creator?.display_name || "Creator";
  const firstName = creatorName.split(" ")[0];
  const niche = creator?.niche || "Creator Economy";

  const appUrl =
    concept?.mockup?.appUrl ||
    concept?.appUrl ||
    `${(concept?.name || firstName).toLowerCase().replace(/[^a-z0-9]/g, "")}.app`;

  // Determine distinct visual mockup archetype (matches Deck 1, Deck 2, Deck 3)
  const resolvedMockupType = (() => {
    if (concept?.isModifiedByAdmin && concept?.mockupType) {
      return concept.mockupType;
    }
    const raw = concept?.mockupType;
    if (conceptIndex === 0) {
      return raw === "ai_copilot" ? "ai_copilot" : "saas_os";
    }
    if (conceptIndex === 1) {
      return raw === "saas_os" ? "saas_os" : "ai_copilot";
    }
    return "knowledge_hub";
  })();

  const mockupType = resolvedMockupType;

  const rawCustomImg = (concept?.customImageUrl || concept?.imageUrl || concept?.mockup?.imageUrl || "").trim();
  const hasRealCustomImg = Boolean(
    rawCustomImg &&
    !rawCustomImg.includes("/api/outreach/concept-card-image") &&
    !rawCustomImg.includes("images.unsplash.com")
  );
  const customImageUrl = hasRealCustomImg ? rawCustomImg : null;

  return (
    <>
      <div
        className="rounded-xl bg-[#080A0E] border border-slate-800/90 p-2.5 relative overflow-hidden flex flex-col justify-between shadow-md space-y-2.5 transition-all duration-300 group"
        style={{
          boxShadow: `0 6px 24px -4px ${brandColorObj.glow}`,
          borderColor: accentHex === "#0F172A" ? "#334155" : `${accentHex}40`
        }}
      >
        {/* Top Browser / macOS Window Chrome with realistic URL bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentHex }} />
            <div className="ml-1.5 flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-[9px] font-mono text-slate-300 max-w-[170px] truncate">
              <Lock className="w-2 h-2 text-emerald-400 shrink-0" />
              <span className="truncate">{appUrl}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="text-[8.5px] font-bold px-1.5 py-0.5 rounded-full border flex items-center gap-1"
              style={{
                color: accentHex,
                backgroundColor: `${accentHex}1a`,
                borderColor: `${accentHex}45`
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentHex }} />
              Landing Page
            </span>
          </div>
        </div>

        {/* ── Realistic Product Landing Page Hero Canvas ── */}
        <div
          className="relative rounded-lg overflow-hidden border border-slate-800/90 min-h-[225px] sm:min-h-[240px] flex flex-col justify-between p-3 select-none transition-all duration-300"
          style={{
            background: mockupType === "ai_copilot"
              ? `radial-gradient(ellipse at 50% 0%, ${accentHex}18 0%, #070A0F 75%)`
              : mockupType === "knowledge_hub"
              ? `radial-gradient(ellipse at 50% 0%, ${accentHex}20 0%, #080A0E 75%)`
              : `radial-gradient(ellipse at 50% 0%, ${accentHex}22 0%, #06080C 75%)`
          }}
        >
          {/* If custom image provided, display it */}
          {customImageUrl ? (
            <div className="absolute inset-0 z-0">
              <img
                src={customImageUrl}
                alt={concept.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            </div>
          ) : (
            <div className="relative z-10 w-full h-full flex flex-col justify-between space-y-2">
              {/* ── STYLE 1: Modern Dark SaaS (Coachly Inspired) ── */}
              {mockupType === "saas_os" && (
                <div className="flex flex-col justify-between h-full space-y-2.5">
                  {/* Mini Navigation Bar */}
                  <div className="flex items-center justify-between border-b border-slate-800/70 pb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-4 rounded font-black text-[9px] flex items-center justify-center text-slate-950 shadow-xs"
                        style={{ backgroundColor: accentHex }}
                      >
                        {concept.name ? concept.name.charAt(0) : "C"}
                      </div>
                      <span className="text-[10px] font-bold text-white tracking-tight truncate max-w-[110px]">
                        {concept.name}
                      </span>
                    </div>
                    <div className="hidden xs:flex items-center gap-2 text-[7.5px] text-slate-400 font-medium">
                      <span>Workflows</span>
                      <span>Templates</span>
                      <span>Pricing</span>
                    </div>
                    <span
                      className="text-[7.5px] font-bold px-1.5 py-0.5 rounded text-slate-950 shadow-2xs"
                      style={{ backgroundColor: accentHex }}
                    >
                      Start Free
                    </span>
                  </div>

                  {/* Hero Headline & Benefit */}
                  <div className="text-center space-y-1.5 pt-0.5">
                    <div
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[7.5px] font-semibold border"
                      style={{
                        color: accentHex,
                        backgroundColor: `${accentHex}15`,
                        borderColor: `${accentHex}35`
                      }}
                    >
                      <Sparkles className="w-2 h-2" />
                      <span>The #1 All-in-One OS for {niche}</span>
                    </div>

                    <h4 className="text-[12.5px] sm:text-[13px] font-black text-white leading-tight tracking-tight px-1">
                      {concept.tagline || `Run your entire ${niche} workflow in one place.`}
                    </h4>

                    <p className="text-[8.5px] text-slate-300 line-clamp-2 leading-relaxed px-2">
                      {concept.problem
                        ? `Eliminates manual friction. ${concept.problem.slice(0, 95)}...`
                        : `Automated project pipelines, live analytics, and digital asset delivery built for ${creatorName}'s audience.`}
                    </p>

                    {/* Dual Action Buttons */}
                    <div className="flex items-center justify-center gap-1.5 pt-1">
                      <span
                        className="text-[8px] font-bold px-2 py-1 rounded-md text-slate-950 flex items-center gap-1 shadow-xs cursor-pointer"
                        style={{ backgroundColor: accentHex }}
                      >
                        <span>Launch App</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                      <span className="text-[8px] font-semibold px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300">
                        View Demo
                      </span>
                    </div>
                  </div>

                  {/* Domain Cards / Feature Strip (Like Coachly's domain pill strip) */}
                  <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-800/60">
                    <div className="bg-slate-900/90 rounded border border-slate-800/80 p-1 text-center">
                      <Zap className="w-2.5 h-2.5 mx-auto" style={{ color: accentHex }} />
                      <span className="text-[6.5px] text-slate-300 font-bold block truncate mt-0.5">Pipeline</span>
                    </div>
                    <div className="bg-slate-900/90 rounded border border-slate-800/80 p-1 text-center">
                      <BarChart3 className="w-2.5 h-2.5 text-amber-400 mx-auto" />
                      <span className="text-[6.5px] text-slate-300 font-bold block truncate mt-0.5">Analytics</span>
                    </div>
                    <div className="bg-slate-900/90 rounded border border-slate-800/80 p-1 text-center">
                      <FolderOpen className="w-2.5 h-2.5 text-sky-400 mx-auto" />
                      <span className="text-[6.5px] text-slate-300 font-bold block truncate mt-0.5">Presets</span>
                    </div>
                    <div className="bg-slate-900/90 rounded border border-slate-800/80 p-1 text-center">
                      <ShieldCheck className="w-2.5 h-2.5 text-emerald-400 mx-auto" />
                      <span className="text-[6.5px] text-slate-300 font-bold block truncate mt-0.5">Verified</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STYLE 2: High-Contrast Editorial AI (study100 Inspired) ── */}
              {mockupType === "ai_copilot" && (
                <div className="flex flex-col justify-between h-full space-y-2.5">
                  {/* Mini Navigation Bar */}
                  <div className="flex items-center justify-between border-b border-slate-800/70 pb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-4 rounded font-bold text-[9px] flex items-center justify-center bg-sky-500/20 text-sky-300 border border-sky-500/40"
                      >
                        <Bot className="w-2.5 h-2.5" />
                      </div>
                      <span className="text-[10px] font-bold text-white tracking-tight truncate max-w-[110px]">
                        {concept.name}
                      </span>
                    </div>
                    <div className="hidden xs:flex items-center gap-2 text-[7.5px] text-slate-400 font-medium">
                      <span>Model</span>
                      <span>Benchmarks</span>
                      <span>Pricing</span>
                    </div>
                    <span
                      className="text-[7.5px] font-bold px-1.5 py-0.5 rounded text-white shadow-2xs border border-sky-500/40 bg-sky-950/80"
                    >
                      Try Copilot
                    </span>
                  </div>

                  {/* Hero Headline & Editorial Tag */}
                  <div className="text-center space-y-1.5 pt-0.5">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[7.5px] font-semibold border border-sky-500/30 bg-sky-500/10 text-sky-300">
                      <Sparkle className="w-2 h-2 text-sky-400" />
                      <span>Fine-tuned for {creatorName}&apos;s Audience</span>
                    </div>

                    <h4 className="text-[12.5px] sm:text-[13px] font-black text-white leading-tight tracking-tight px-1">
                      The AI Copilot that <span className="italic" style={{ color: accentHex }}>actually</span> delivers.
                    </h4>

                    <p className="text-[8.5px] text-slate-300 line-clamp-2 leading-relaxed px-2">
                      {concept.description || `Instantly synthesizes ${niche} strategies, optimizes client outputs, and saves 14+ manual hours each week.`}
                    </p>

                    {/* Dual Action Buttons */}
                    <div className="flex items-center justify-center gap-1.5 pt-1">
                      <span
                        className="text-[8px] font-bold px-2 py-1 rounded-md text-slate-950 flex items-center gap-1 shadow-xs cursor-pointer"
                        style={{ backgroundColor: accentHex }}
                      >
                        <span>Start Free</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                      <span className="text-[8px] font-semibold px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300">
                        Exam Coverage
                      </span>
                    </div>
                  </div>

                  {/* Simulated AI Prompt & Response Showcase Card */}
                  <div className="bg-slate-950/90 rounded border border-slate-800/90 p-1.5 space-y-1">
                    <div className="flex items-center justify-between text-[7px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1 text-slate-300 truncate">
                        <Terminal className="w-2 h-2 text-sky-400 shrink-0" />
                        <span>Prompt: Automate {niche} workflow...</span>
                      </span>
                      <span className="text-emerald-400 font-bold shrink-0">120ms</span>
                    </div>
                    <div className="flex items-center gap-1 text-[6.5px] text-slate-400 bg-black/50 px-1.5 py-0.5 rounded border border-slate-800">
                      <Check className="w-2 h-2 text-emerald-400 shrink-0" />
                      <span className="truncate">450+ verified templates indexed • 99.2% accuracy</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STYLE 3: Warm High-Trust Community & Vault (Puppy Borrow Inspired) ── */}
              {mockupType === "knowledge_hub" && (
                <div className="flex flex-col justify-between h-full space-y-2.5">
                  {/* Mini Navigation Bar */}
                  <div className="flex items-center justify-between border-b border-slate-800/70 pb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-4 rounded font-bold text-[9px] flex items-center justify-center bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      >
                        <Heart className="w-2.5 h-2.5 text-amber-400" />
                      </div>
                      <span className="text-[10px] font-bold text-white tracking-tight truncate max-w-[110px]">
                        {concept.name}
                      </span>
                    </div>
                    <div className="hidden xs:flex items-center gap-2 text-[7.5px] text-slate-400 font-medium">
                      <span>Vault</span>
                      <span>Live Calls</span>
                      <span>Perks</span>
                    </div>
                    <span
                      className="text-[7.5px] font-bold px-1.5 py-0.5 rounded text-slate-950 shadow-2xs"
                      style={{ backgroundColor: accentHex }}
                    >
                      Join Vault
                    </span>
                  </div>

                  {/* Hero Headline & Community Tag */}
                  <div className="text-center space-y-1.5 pt-0.5">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[7.5px] font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-300">
                      <Users className="w-2 h-2 text-amber-400" />
                      <span>Private Mastermind & VIP Vault</span>
                    </div>

                    <h4 className="text-[12.5px] sm:text-[13px] font-black text-white leading-tight tracking-tight px-1">
                      More impact. <span style={{ color: accentHex }}>Less friction.</span> Built for {firstName}&apos;s inner circle.
                    </h4>

                    <p className="text-[8.5px] text-slate-300 line-clamp-2 leading-relaxed px-2">
                      {concept.description || `Direct weekly strategy calls with ${creatorName}, 40+ curated presets, and an invite-only network of top founders.`}
                    </p>

                    {/* Dual Action Buttons */}
                    <div className="flex items-center justify-center gap-1.5 pt-1">
                      <span
                        className="text-[8px] font-bold px-2 py-1 rounded-md text-slate-950 flex items-center gap-1 shadow-xs cursor-pointer"
                        style={{ backgroundColor: accentHex }}
                      >
                        <span>Apply for Access</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                      <span className="text-[8px] font-semibold px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300">
                        Explore Vault
                      </span>
                    </div>
                  </div>

                  {/* 3 Community Perk Cards */}
                  <div className="grid grid-cols-3 gap-1 pt-1 border-t border-slate-800/60">
                    <div className="bg-slate-900/90 rounded border border-slate-800/80 p-1 text-center">
                      <Calendar className="w-2.5 h-2.5 text-amber-400 mx-auto" />
                      <span className="text-[6.5px] text-slate-300 font-bold block truncate mt-0.5">Live Calls</span>
                    </div>
                    <div className="bg-slate-900/90 rounded border border-slate-800/80 p-1 text-center">
                      <Database className="w-2.5 h-2.5 text-cyan-400 mx-auto" />
                      <span className="text-[6.5px] text-slate-300 font-bold block truncate mt-0.5">42+ Presets</span>
                    </div>
                    <div className="bg-slate-900/90 rounded border border-slate-800/80 p-1 text-center">
                      <Star className="w-2.5 h-2.5 text-emerald-400 mx-auto" />
                      <span className="text-[6.5px] text-slate-300 font-bold block truncate mt-0.5">94% Retention</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hover Action Overlay: Preview Landing Page, View Deck, Customize */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20 p-2">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="px-2.5 py-1.5 rounded-lg font-bold text-[10px] text-slate-950 transition-all flex items-center gap-1 cursor-pointer shadow-md hover:scale-105 active:scale-95"
              style={{ backgroundColor: accentHex }}
              title="Preview Landing Page"
            >
              <Eye className="w-3 h-3 text-slate-950" />
              <span>Preview Landing Page</span>
            </button>

            {onOpenDeck && (
              <button
                type="button"
                onClick={onOpenDeck}
                className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-bold text-[10px] transition-all flex items-center gap-1 cursor-pointer shadow-md hover:scale-105 active:scale-95"
                title="View Pitch Deck"
              >
                <Monitor className="w-3 h-3 text-slate-700" />
                <span>Deck</span>
              </button>
            )}

            {onEditConcept && (
              <button
                type="button"
                onClick={onEditConcept}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-[10px] transition-all flex items-center gap-1 cursor-pointer hover:scale-105 active:scale-95"
                title="Customize Concept"
              >
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Metric Pills with Studio High-Contrast Styling */}
        <div className="grid grid-cols-3 gap-1.5">
          <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
            <span className="text-[7.5px] text-slate-400 block font-medium">MRR Projected</span>
            <span className="text-[10px] font-bold font-mono" style={{ color: accentHex }}>
              {concept?.mockup?.primaryMetric || concept?.primaryMetric || "$22.5K"}
            </span>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
            <span className="text-[7.5px] text-slate-400 block font-medium">Active Users</span>
            <span className="text-[10px] font-bold text-slate-200 font-mono">
              {concept?.mockup?.activeMetric || concept?.activeMetric || "850"}
            </span>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
            <span className="text-[7.5px] text-slate-400 block font-medium">Retention</span>
            <span className="text-[10px] font-bold text-emerald-400 font-mono">
              {concept?.mockup?.efficiencyMetric || concept?.efficiencyMetric || "94%"}
            </span>
          </div>
        </div>

        {/* Target User & Pricing Footer */}
        <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-slate-800/80 pt-1.5">
          <span className="truncate max-w-[130px] text-slate-300 font-medium">
            {concept?.customer || concept?.demographicAlignment || "Target Users"}
          </span>
          <span className="font-bold font-mono" style={{ color: accentHex }}>
            {concept?.pricing || "$29/mo"}
          </span>
        </div>
      </div>

      {/* Extended Landing Page Preview Modal */}
      <LandingPagePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        concept={concept}
        creator={creator}
        mockupType={mockupType}
        accentHex={accentHex}
        appUrl={appUrl}
        onOpenDeck={onOpenDeck}
        onEditConcept={onEditConcept}
      />
    </>
  );
}
