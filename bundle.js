// OctaLoomHomepageV2.tsx
import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, animate as fmAnimate } from "framer-motion";
var C = {
  purple: "#712eac",
  deepPurple: "#201e4b",
  navy: "#060d3d",
  lime: "#c5e6a2",
  cream: "#ece9e7",
  white: "#f5f3f1",
  textDim: "#5c5878",
  surface: "rgba(113,46,172,0.04)",
  surface2: "rgba(113,46,172,0.08)",
  redX: "rgba(255,68,68,0.08)",
  redXText: "#e85d5d"
};
var F = {
  display: "'Discovery', 'Aeonik', sans-serif",
  body: "'Aeonik', sans-serif"
};
var LangCtx = createContext({ lang: "he", setLang: () => {
} });
var useLang = () => useContext(LangCtx);
var hpT = (obj) => {
  const { lang } = useLang();
  return obj?.[lang] ?? obj?.en ?? "";
};
function useWindowSize() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}
function useLangState() {
  const [lang, setL] = useState(
    () => typeof document !== "undefined" && document.documentElement.lang === "en" ? "en" : "he"
  );
  const setLang = useCallback((l) => {
    setL(l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
    localStorage.setItem("octaloom-lang", l);
  }, []);
  useEffect(() => {
    const saved = localStorage.getItem("octaloom-lang");
    if (saved) setL(saved);
    const obs = new MutationObserver(() => setL(document.documentElement.lang === "en" ? "en" : "he"));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => obs.disconnect();
  }, []);
  return [lang, setLang];
}
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const vis = useInView(ref, { once: true, amount: 0.08 });
  return /* @__PURE__ */ React.createElement(
    motion.div,
    {
      ref,
      initial: { opacity: 0, y: 32 },
      animate: vis ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.8, delay: delay / 1e3, ease: [0.16, 1, 0.3, 1] }
    },
    children
  );
}
function Container({ children, style = {} }) {
  return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)", ...style } }, children);
}
function Sec({ bg, children, id, style = {} }) {
  return /* @__PURE__ */ React.createElement("section", { id, style: { background: bg, ...style } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "clamp(64px,10vw,120px) 0" } }, children));
}
function Btn({ href, onClick, variant = "purple", children, style = {} }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 28px",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.25s",
    border: "none",
    fontFamily: F.body,
    ...style
  };
  const variants = {
    purple: { background: C.purple, color: "white" },
    ghost: { background: "transparent", color: C.purple, border: `1px solid rgba(113,46,172,0.2)` },
    white: { background: "white", color: C.purple },
    lime: { background: C.lime, color: C.navy },
    outline: { background: "transparent", color: C.purple, border: `1.5px solid ${C.purple}` },
    dark: { background: C.deepPurple, color: "white" }
  };
  const props = { style: { ...base, ...variants[variant] }, onClick };
  if (href) return /* @__PURE__ */ React.createElement("a", { href, target: href.startsWith("http") ? "_blank" : void 0, rel: "noopener noreferrer", ...props }, children);
  return /* @__PURE__ */ React.createElement("button", { ...props }, children);
}
function LiIcon({ size = 16 }) {
  return /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" }), /* @__PURE__ */ React.createElement("circle", { cx: "4", cy: "4", r: "2" }));
}
function AnimatedNum({ value }) {
  const ref = useRef(null);
  const vis = useInView(ref, { once: true });
  const num = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9,]/g, "");
  const [cur, setCur] = useState(0);
  useEffect(() => {
    if (!vis) return;
    let start = 0;
    const step = num / 40;
    const timer = setInterval(() => {
      start = Math.min(start + step, num);
      setCur(Math.round(start));
      if (start >= num) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [vis, num]);
  return /* @__PURE__ */ React.createElement("span", { ref }, cur.toLocaleString(), suffix);
}
var HP = {
  hero: {
    pill: { en: "AI-Powered B2B Marketing Services", he: "\u05E9\u05D9\u05E8\u05D5\u05EA\u05D9 \u05E9\u05D9\u05D5\u05D5\u05E7 \u05DE\u05D1\u05D5\u05E1\u05E1\u05D9 AI \u05DC\u05D7\u05D1\u05E8\u05D5\u05EA B2B" },
    h1: { en: "Your marketing\ndepartment,\nminus the\ndepartment. \u{1F481}\u{1F3FB}\u200D\u2640\uFE0F", he: "\u05DE\u05D7\u05DC\u05E7\u05EA \u05D4\u05E9\u05D9\u05D5\u05D5\u05E7\n\u05E9\u05DC\u05DA, \u05E8\u05E7 \u05D1\u05DC\u05D9\n\u05D4\u05DE\u05D7\u05DC\u05E7\u05D4 \u{1F481}\u{1F3FB}\u200D\u2640\uFE0F" },
    sub: {
      en: "Smart, AI-powered marketing services for B2B companies ready to turn LinkedIn into a real growth engine.",
      he: "\u05E9\u05D9\u05E8\u05D5\u05EA\u05D9 \u05E9\u05D9\u05D5\u05D5\u05E7 \u05D7\u05DB\u05DD \u05DE\u05D1\u05D5\u05E1\u05E1 \u05E1\u05D5\u05DB\u05E0\u05D9 \u05D5\u05DB\u05DC\u05D9 AI \u05DC\u05D7\u05D1\u05E8\u05D5\u05EA B2B \u05E9\u05E8\u05D5\u05E6\u05D5\u05EA \u05DC\u05D4\u05E4\u05D5\u05DA \u05D0\u05EA \u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05DE\u05E0\u05D5\u05E2 \u05E6\u05DE\u05D9\u05D7\u05D4"
    },
    cta1: { en: "Let's Talk", he: "\u05D1\u05D5\u05D0\u05D5 \u05E0\u05D3\u05D1\u05E8" },
    cta2: { en: "Take What You Need \u2192", he: "\u05E7\u05D7\u05D5 \u05DE\u05D4 \u05E9\u05D0\u05EA\u05DD \u05E6\u05E8\u05D9\u05DB\u05D9\u05DD \u2192" },
    trustTop: { en: "trusted by founders and CEOs of B2B companies", he: "trusted by founders and CEOs of B2B companies" },
    trustBottom: { en: "", he: "" }
  },
  marquee: {
    en: ["AI Agents", "Marketing Automation", "B2B Marketing", "Full Social Presence", "Fractional CMO", "LinkedIn Management"],
    he: ["Fractional CMO", "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05D0\u05E8\u05D2\u05D5\u05E0\u05D9\u05DD", "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05DE\u05D9\u05D9\u05E1\u05D3\u05D9\u05DD", "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05E2\u05E6\u05DE\u05D0\u05D9\u05DD", "\u05E1\u05D5\u05DB\u05E0\u05D9 \u05D5\u05DB\u05DC\u05D9 AI"]
  },
  problem: {
    title: { en: "Every founder or organization has three options:", he: "\u05DC\u05DB\u05DC \u05DE\u05D9\u05D9\u05E1\u05D3 \u05D0\u05D5 \u05D0\u05E8\u05D2\u05D5\u05DF \u05D9\u05E9 \u05E9\u05DC\u05D5\u05E9 \u05D0\u05D5\u05E4\u05E6\u05D9\u05D5\u05EA:" },
    cards: [
      { label: { en: "Hire an in-house team", he: "\u05D2\u05D9\u05D5\u05E1 \u05E6\u05D5\u05D5\u05EA \u05E4\u05E0\u05D9\u05DE\u05D9" }, sub: { en: "Slow, high employer costs", he: "\u05D0\u05D9\u05D8\u05D9, \u05D4\u05D5\u05E6\u05D0\u05D5\u05EA \u05DE\u05E2\u05E1\u05D9\u05E7 \u05D2\u05D1\u05D5\u05D4\u05D5\u05EA" } },
      { label: { en: "Hire an agency", he: "\u05E1\u05D5\u05DB\u05E0\u05D5\u05EA" }, sub: { en: "Expensive retainer, constant handoffs", he: "\u05E8\u05D9\u05D8\u05D9\u05D9\u05E0\u05E8 \u05D2\u05D1\u05D5\u05D4, \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05E9\u05D5\u05E0\u05D9\u05DD, \u05D4\u05E2\u05D1\u05E8\u05EA \u05D9\u05D3\u05D9\u05D9\u05DD \u05DB\u05DC \u05E9\u05E0\u05D9 \u05D5\u05D7\u05DE\u05D9\u05E9\u05D9" } },
      { label: { en: "DIY", he: "DIY" }, sub: { en: "No strategy, marketing happens when there's time", he: "\u05DC\u05E8\u05D5\u05D1 \u05D1\u05DC\u05D9 \u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D4, \u05D4\u05E9\u05D9\u05D5\u05D5\u05E7 \u05E7\u05D5\u05E8\u05D4 \u05DB\u05E9\u05D9\u05E9 \u05D6\u05DE\u05DF" } }
    ],
    none: { en: "None of them work.", he: "\u05E9\u05DC\u05D5\u05E9\u05EA\u05DF \u05DC\u05D0 \u05E2\u05D5\u05D1\u05D3\u05D5\u05EA." }
  },
  fourthOption: {
    but: { en: "The Fourth Option.", he: "\u05D0\u05D1\u05DC... \u05D9\u05E9 \u05D0\u05D5\u05E4\u05E6\u05D9\u05D4 \u05E8\u05D1\u05D9\u05E2\u05D9\u05EA." },
    desc: {
      en: "OctaLoom transforms your marketing into a high-performance growth engine without the friction of a traditional agency. I'm Hanita Yudovski, a Fractional CMO who builds your end-to-end marketing strategy from establishing LinkedIn authority to building automation infrastructure, newsletters, and lead-gen funnels.",
      he: "OctaLoom \u05D4\u05D5\u05E4\u05DB\u05EA \u05D0\u05EA \u05D4\u05E9\u05D9\u05D5\u05D5\u05E7 \u05E9\u05DC\u05DB\u05DD \u05DC\u05DE\u05E0\u05D5\u05E2 \u05E6\u05DE\u05D9\u05D7\u05D4 \u05DE\u05E9\u05D5\u05DE\u05DF, \u05D1\u05DC\u05D9 \u05D4\u05E1\u05E8\u05D1\u05D5\u05DC \u05E9\u05DC \u05E1\u05D5\u05DB\u05E0\u05D5\u05EA \u05D2\u05D3\u05D5\u05DC\u05D4. \u05D0\u05E0\u05D9 \u05D7\u05E0\u05D9\u05EA\u05D4 \u05D9\u05D5\u05D3\u05D5\u05D1\u05E1\u05E7\u05D9, FCMO \u05E9\u05D1\u05D5\u05E0\u05D4 \u05E2\u05D1\u05D5\u05E8\u05DB\u05DD \u05D0\u05EA \u05D4\u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D4 \u05D4\u05DE\u05DC\u05D0\u05D4, \u05DE\u05D1\u05D9\u05E1\u05D5\u05E1 \u05E1\u05DE\u05DB\u05D5\u05EA \u05D1\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05D5\u05E2\u05D3 \u05EA\u05E9\u05EA\u05D9\u05D5\u05EA \u05D0\u05D5\u05D8\u05D5\u05DE\u05E6\u05D9\u05D4, \u05E0\u05D9\u05D5\u05D6\u05DC\u05D8\u05E8\u05D9\u05DD \u05D5\u05DE\u05E9\u05E4\u05DB\u05D9 \u05E9\u05D9\u05D5\u05D5\u05E7."
    },
    value: {
      en: "While I navigate the strategy, my team of AI agents handles the heavy lifting with a volume and precision that no human team can match alone. You get senior-level marketing leadership at tech scale without the overhead of a full-time hire or the weight of an inflated agency retainer.",
      he: "\u05D1\u05D6\u05DE\u05DF \u05E9\u05D0\u05E0\u05D9 \u05DE\u05E0\u05D5\u05D5\u05D8\u05EA, \u05E6\u05D5\u05D5\u05EA \u05E1\u05D5\u05DB\u05E0\u05D9 \u05D4-AI \u05E9\u05DC\u05D9 \u05DE\u05D1\u05E6\u05E2 \u05D0\u05EA \u05D4\u05E2\u05D1\u05D5\u05D3\u05D4 \u05D4\u05E9\u05D7\u05D5\u05E8\u05D4 \u05D1\u05E0\u05E4\u05D7 \u05D5\u05D3\u05D9\u05D5\u05E7 \u05E9\u05E9\u05D5\u05DD \u05D0\u05D3\u05DD \u05DC\u05D0 \u05D9\u05DB\u05D5\u05DC \u05DC\u05D4\u05D2\u05D9\u05E2 \u05D0\u05DC\u05D9\u05D5 \u05DC\u05D1\u05D3. \u05D0\u05EA\u05DD \u05DE\u05E7\u05D1\u05DC\u05D9\u05DD \u05DE\u05E2\u05D8\u05E4\u05EA \u05E9\u05D9\u05D5\u05D5\u05E7\u05D9\u05EA \u05D1\u05DB\u05D9\u05E8\u05D4 \u05D1-Scale \u05E9\u05DC \u05D4\u05D9\u05D9\u05D8\u05E7, \u05D1\u05DC\u05D9 \u05E2\u05DC\u05D5\u05D9\u05D5\u05EA \u05DE\u05E2\u05E1\u05D9\u05E7 \u05D5\u05D1\u05DC\u05D9 \u05E8\u05D9\u05D8\u05D9\u05D9\u05E0\u05E8\u05D9\u05DD \u05DE\u05E0\u05D5\u05E4\u05D7\u05D9\u05DD."
    },
    cta: { en: "Let's Talk", he: "\u05D1\u05D5\u05D0\u05D5 \u05E0\u05D3\u05D1\u05E8" }
  },
  services: {
    title: { en: "What We Offer", he: "\u05DE\u05D4 \u05E9\u05D0\u05E0\u05D7\u05E0\u05D5 \u05DE\u05E6\u05D9\u05E2\u05D9\u05DD" },
    sub: { en: "", he: "" },
    strips: [
      { label: { en: "LinkedIn for Organizations", he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05D0\u05E8\u05D2\u05D5\u05E0\u05D9\u05DD" }, href: "/linkedin-for-organizations-he" },
      { label: { en: "LinkedIn for Executives", he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05DE\u05D9\u05D9\u05E1\u05D3\u05D9\u05DD" }, href: "/linkedin-for-executives-he" },
      { label: { en: "LinkedIn for Solopreneurs", he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05E2\u05E6\u05DE\u05D0\u05D9\u05DD" }, href: "/linkedin-for-solopreneurs-he" },
      { label: { en: "Fractional CMO", he: "\u05E9\u05D9\u05D5\u05D5\u05E7 \u05D1\u05DE\u05D9\u05E7\u05D5\u05E8 \u05D7\u05D5\u05E5" }, href: "/fractional-cmo-he" },
      { label: { en: "AI Tools & Agents", he: "\u05E1\u05D5\u05DB\u05E0\u05D9 \u05D5\u05DB\u05DC\u05D9 AI" }, href: "/ai-tools-agents-he" }
    ]
  },
  process: {
    title: { en: "From First Call to Full Engine", he: "\u05D0\u05D9\u05DA \u05D6\u05D4 \u05E2\u05D5\u05D1\u05D3?" },
    steps: [
      {
        title: { en: "Understand What\u2019s Actually Missing", he: "\u05DE\u05D2\u05D3\u05D9\u05E8\u05D9\u05DD \u05D0\u05EA \u05D4\u05D1\u05E2\u05D9\u05D4" },
        desc: {
          en: "You publish consistently but leads aren't coming. The problem isn't the content \u2014 it's the system.",
          he: "\u05D0\u05EA\u05DD \u05DE\u05E4\u05E8\u05E1\u05DE\u05D9\u05DD \u05D1\u05E2\u05E7\u05D1\u05D9\u05D5\u05EA \u05D0\u05D1\u05DC \u05D4\u05DC\u05D9\u05D3\u05D9\u05DD \u05DC\u05D0 \u05DE\u05D2\u05D9\u05E2\u05D9\u05DD. \u05D4\u05D1\u05E2\u05D9\u05D4 \u05D4\u05D9\u05D0 \u05DC\u05D0 \u05D4\u05EA\u05D5\u05DB\u05DF, \u05D6\u05D5 \u05D4\u05DE\u05E2\u05E8\u05DB\u05EA."
        }
      },
      {
        title: { en: "Build a Plan That Actually Fits", he: "\u05D1\u05D5\u05E0\u05D9\u05DD \u05EA\u05D5\u05DB\u05E0\u05D9\u05EA \u05E2\u05D1\u05D5\u05D3\u05D4" },
        desc: {
          en: "Based on your needs, we build a clear work plan. AI is part of the thinking, prioritization, and usually the execution too \u{1F609}",
          he: "\u05E2\u05DC \u05D1\u05E1\u05D9\u05E1 \u05D4\u05E6\u05E8\u05DB\u05D9\u05DD \u05E9\u05E2\u05DC\u05D5, \u05E0\u05D1\u05E0\u05D9\u05EA \u05EA\u05D5\u05DB\u05E0\u05D9\u05EA \u05E2\u05D1\u05D5\u05D3\u05D4 \u05DE\u05E1\u05D5\u05D3\u05E8\u05EA. \u05D4-AI \u05D4\u05D5\u05D0 \u05D7\u05DC\u05E7 \u05DE\u05EA\u05D4\u05DC\u05D9\u05DA \u05D4\u05D7\u05E9\u05D9\u05D1\u05D4 \u05D5\u05D4\u05EA\u05D9\u05E2\u05D3\u05D5\u05E3 (\u05D5\u05DC\u05E8\u05D5\u05D1 \u05D2\u05DD \u05D7\u05DC\u05E7 \u05DE\u05D4\u05D1\u05D9\u05E6\u05D5\u05E2 \u{1F609})"
        }
      },
      {
        title: { en: "Execute, and See It Happen", he: "\u05DE\u05D9\u05D9\u05E9\u05DE\u05D9\u05DD \u05D1\u05E4\u05D5\u05E2\u05DC" },
        desc: {
          en: "AI agents run the daily pace, I maintain positioning, voice and strategy. Results start within 30 days, leads within 90 days, a real pipeline within 6 months.",
          he: "\u05D4\u05E1\u05D5\u05DB\u05E0\u05D9\u05DD \u05DE\u05E8\u05D9\u05E6\u05D9\u05DD \u05D0\u05EA \u05D4\u05E7\u05E6\u05D1 \u05D4\u05D9\u05D5\u05DE\u05D9\u05D5\u05DE\u05D9, \u05D0\u05E0\u05D9 \u05E9\u05D5\u05DE\u05E8\u05EA \u05E2\u05DC \u05D4\u05DE\u05D9\u05E6\u05D5\u05D1, \u05D4\u05E7\u05D5\u05DC \u05D5\u05D4\u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D4. \u05D4\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05DE\u05EA\u05D7\u05D9\u05DC\u05D5\u05EA \u05DC\u05D4\u05D2\u05D9\u05E2 \u05EA\u05D5\u05DA 30 \u05D9\u05D5\u05DD, \u05DC\u05D9\u05D3\u05D9\u05DD \u05EA\u05D5\u05DA 90 \u05D9\u05D5\u05DD, pipeline \u05D0\u05DE\u05D9\u05EA\u05D9 \u05EA\u05D5\u05DA 6 \u05D7\u05D5\u05D3\u05E9\u05D9\u05DD."
        }
      }
    ],
    cta: { en: "Let's Talk", he: "\u05D1\u05D5\u05D0\u05D5 \u05E0\u05D3\u05D1\u05E8" }
  },
  testimonials: {
    title: { en: "What they say about me", he: "\u05DE\u05D4 \u05D0\u05D5\u05DE\u05E8\u05D9\u05DD \u05E2\u05DC\u05D9\u05D9" },
    items: [
      {
        quote: { en: `"Over the past months I worked directly with Hanita on marketing consulting, focusing on B2B and LinkedIn. The professional guidance was thorough, deep, and structured \u2014 including extensive preliminary research, deep learning of the company's field, and competitive landscape analysis. The process included long-term marketing strategy and a clear implementation plan that significantly contributed to the company's global activity."`, he: '"\u05D1\u05DE\u05D4\u05DC\u05DA \u05D4\u05D7\u05D5\u05D3\u05E9\u05D9\u05DD \u05D4\u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD \u05E2\u05D1\u05D3\u05EA\u05D9 \u05D9\u05E9\u05D9\u05E8\u05D5\u05EA \u05DE\u05D5\u05DC \u05D7\u05E0\u05D9\u05EA\u05D4 \u05D1\u05DB\u05DC \u05D4\u05E7\u05E9\u05D5\u05E8 \u05DC\u05D9\u05D9\u05E2\u05D5\u05E5 \u05E9\u05D9\u05D5\u05D5\u05E7\u05D9, \u05D1\u05D3\u05D2\u05E9 \u05E2\u05DC \u05E2\u05D5\u05DC\u05DD \u05D4-B2B \u05D5\u05E2\u05DC \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA \u05D1\u05E4\u05DC\u05D8\u05E4\u05D5\u05E8\u05DE\u05EA \u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF. \u05D4\u05DC\u05D9\u05D5\u05D5\u05D9 \u05D4\u05DE\u05E7\u05E6\u05D5\u05E2\u05D9 \u05E9\u05D4\u05D5\u05D1\u05D9\u05DC\u05D4 \u05D4\u05D9\u05D4 \u05D9\u05E1\u05D5\u05D3\u05D9, \u05DE\u05E2\u05DE\u05D9\u05E7 \u05D5\u05DE\u05D5\u05D1\u05E0\u05D4, \u05D5\u05DB\u05DC\u05DC \u05DE\u05D7\u05E7\u05E8 \u05DE\u05E7\u05D3\u05D9\u05DD \u05E8\u05D7\u05D1, \u05DC\u05D9\u05DE\u05D5\u05D3 \u05DE\u05E2\u05DE\u05D9\u05E7 \u05E9\u05DC \u05EA\u05D7\u05D5\u05DD \u05D4\u05E2\u05D9\u05E1\u05D5\u05E7 \u05E9\u05DC \u05D4\u05D7\u05D1\u05E8\u05D4 \u05D5\u05E0\u05D9\u05EA\u05D5\u05D7 \u05D4\u05E1\u05D1\u05D9\u05D1\u05D4 \u05D4\u05E2\u05E1\u05E7\u05D9\u05EA \u05D5\u05D4\u05DE\u05EA\u05D7\u05E8\u05D9\u05DD. \u05D4\u05EA\u05D4\u05DC\u05D9\u05DA \u05DB\u05DC\u05DC \u05D2\u05D9\u05D1\u05D5\u05E9 \u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D4 \u05E9\u05D9\u05D5\u05D5\u05E7\u05D9\u05EA \u05D0\u05E8\u05D5\u05DB\u05EA \u05D8\u05D5\u05D5\u05D7 \u05D5\u05EA\u05D5\u05DB\u05E0\u05D9\u05EA \u05E2\u05D1\u05D5\u05D3\u05D4 \u05D1\u05E8\u05D5\u05E8\u05D4, \u05D5\u05D4\u05EA\u05D5\u05E6\u05E8 \u05D4\u05E9\u05D9\u05D5\u05D5\u05E7\u05D9 \u05EA\u05E8\u05DD \u05DE\u05E9\u05DE\u05E2\u05D5\u05EA\u05D9\u05EA \u05DC\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA \u05D4\u05D2\u05DC\u05D5\u05D1\u05DC\u05D9\u05EA \u05E9\u05DC \u05D4\u05D7\u05D1\u05E8\u05D4."' },
        author: { en: "Yoram Avigad", he: "\u05D9\u05D5\u05E8\u05DD \u05D0\u05D1\u05D9\u05D2\u05D3" },
        role: { en: "CEO, Totzeret HaNegev", he: '\u05DE\u05E0\u05DB"\u05DC \u05EA\u05D5\u05E6\u05E8\u05EA \u05D4\u05E0\u05D2\u05D1' }
      },
      {
        quote: { en: '"Hanita accompanied us in building a comprehensive marketing infrastructure, with deep understanding of the organization and its challenges. The combination of strategic thinking, process leadership, and precise execution created a significant impact on our operations."', he: '"\u05D7\u05E0\u05D9\u05EA\u05D4 \u05DC\u05D9\u05D5\u05D5\u05EA\u05D4 \u05D0\u05D5\u05EA\u05E0\u05D5 \u05D1\u05D1\u05E0\u05D9\u05D9\u05EA \u05EA\u05E9\u05EA\u05D9\u05EA \u05E9\u05D9\u05D5\u05D5\u05E7\u05D9\u05EA \u05DE\u05E7\u05D9\u05E4\u05D4, \u05DE\u05EA\u05D5\u05DA \u05D4\u05D1\u05E0\u05D4 \u05E2\u05DE\u05D5\u05E7\u05D4 \u05E9\u05DC \u05D4\u05D0\u05E8\u05D2\u05D5\u05DF \u05D5\u05E9\u05DC \u05D4\u05D0\u05EA\u05D2\u05E8\u05D9\u05DD \u05E9\u05DC\u05D5. \u05D4\u05E9\u05D9\u05DC\u05D5\u05D1 \u05D1\u05D9\u05DF \u05D7\u05E9\u05D9\u05D1\u05D4 \u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05EA, \u05D4\u05D5\u05D1\u05DC\u05EA \u05EA\u05D4\u05DC\u05D9\u05DB\u05D9\u05DD \u05D5\u05D1\u05D9\u05E6\u05D5\u05E2 \u05DE\u05D3\u05D5\u05D9\u05E7 \u05D9\u05E6\u05E8 \u05D4\u05E9\u05E4\u05E2\u05D4 \u05DE\u05E9\u05DE\u05E2\u05D5\u05EA\u05D9\u05EA \u05E2\u05DC \u05D4\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA \u05E9\u05DC\u05E0\u05D5."' },
        author: { en: "Ela Sayag", he: "\u05D0\u05DC\u05D4 \u05E1\u05D9\u05D9\u05D2" },
        role: { en: "CEO, Me Adopt", he: '\u05DE\u05E0\u05DB"\u05DC\u05D9\u05EA \u05DE\u05D9 \u05D0\u05D3\u05D5\u05E4\u05D8' }
      },
      {
        quote: { en: `"Hanita is one of the best marketing managers I've had the chance to work with. She's a social media champion, knows how to lead branding end-to-end, initiate and drive countless marketing activities."`, he: '"\u05D7\u05E0\u05D9\u05EA\u05D4 \u05D4\u05D9\u05D0 \u05D0\u05D7\u05EA \u05DE\u05DE\u05E0\u05D4\u05DC\u05D5\u05EA \u05D4\u05E9\u05D9\u05D5\u05D5\u05E7 \u05D4\u05DB\u05D9 \u05D8\u05D5\u05D1\u05D5\u05EA \u05E9\u05D9\u05E6\u05D0 \u05DC\u05D9 \u05DC\u05E2\u05D1\u05D5\u05D3 \u05D0\u05D9\u05EA\u05DF. \u05D4\u05D9\u05D0 \u05D0\u05DC\u05D5\u05E4\u05D4 \u05D1\u05DE\u05D3\u05D9\u05D4 \u05D7\u05D1\u05E8\u05EA\u05D9\u05EA, \u05D9\u05D5\u05D3\u05E2\u05EA \u05DC\u05D4\u05D5\u05D1\u05D9\u05DC \u05DE\u05D9\u05EA\u05D5\u05D2 \u05DE\u05E7\u05E6\u05D4 \u05DC\u05E7\u05E6\u05D4, \u05DC\u05D9\u05D6\u05D5\u05DD \u05D5\u05DC\u05D4\u05D5\u05D1\u05D9\u05DC \u05E4\u05E2\u05D9\u05DC\u05D5\u05D9\u05D5\u05EA \u05E9\u05D9\u05D5\u05D5\u05E7\u05D9\u05D5\u05EA \u05D0\u05D9\u05E0\u05E1\u05D5\u05E3."' },
        author: { en: "Ofek Ron", he: "\u05D0\u05D5\u05E4\u05E7 \u05E8\u05D5\u05DF" },
        role: { en: "CEO, Oshi", he: '\u05DE\u05E0\u05DB"\u05DC Oshi' }
      },
      {
        quote: { en: `"From the moment Hanita came in, marketing stopped being an oppressive task and became a growth engine. There's a clear strategy, working automation, and measurable results over time."`, he: '"\u05DE\u05D4\u05E8\u05D2\u05E2 \u05E9\u05D7\u05E0\u05D9\u05EA\u05D4 \u05E0\u05DB\u05E0\u05E1\u05D4, \u05D4\u05E9\u05D9\u05D5\u05D5\u05E7 \u05D4\u05E4\u05E1\u05D9\u05E7 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05E9\u05D9\u05DE\u05D4 \u05DE\u05E2\u05D9\u05E7\u05D4 \u05D5\u05D4\u05E4\u05DA \u05DC\u05DE\u05E0\u05D5\u05E2 \u05E6\u05DE\u05D9\u05D7\u05D4. \u05D9\u05E9 \u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D4 \u05D1\u05E8\u05D5\u05E8\u05D4, \u05D9\u05E9 \u05D0\u05D5\u05D8\u05D5\u05DE\u05E6\u05D9\u05D4 \u05E9\u05E2\u05D5\u05D1\u05D3\u05EA, \u05D5\u05D9\u05E9 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05E9\u05D0\u05E4\u05E9\u05E8 \u05DC\u05DE\u05D3\u05D5\u05D3 \u05DC\u05D0\u05D5\u05E8\u05DA \u05D6\u05DE\u05DF."' },
        author: { en: "Shimi Dvir", he: "\u05E9\u05D9\u05DE\u05D9 \u05D3\u05D1\u05D9\u05E8" },
        role: { en: "CEO, AcademAi", he: '\u05DE\u05E0\u05DB"\u05DC AcademAi' }
      },
      {
        quote: { en: `"Working with Hanita created clarity for me. She helped me understand what's right for us marketing-wise. Her work simply brought in leads."`, he: '"\u05D4\u05E2\u05D1\u05D5\u05D3\u05D4 \u05E2\u05DD \u05D7\u05E0\u05D9\u05EA\u05D4 \u05D9\u05E6\u05E8\u05D4 \u05DC\u05D9 \u05D1\u05D4\u05D9\u05E8\u05D5\u05EA. \u05D4\u05D9\u05D0 \u05E2\u05D6\u05E8\u05D4 \u05DC\u05D9 \u05DC\u05D4\u05D1\u05D9\u05DF \u05DE\u05D4 \u05E0\u05DB\u05D5\u05DF \u05DC\u05E0\u05D5 \u05E9\u05D9\u05D5\u05D5\u05E7\u05D9\u05EA, \u05D4\u05E2\u05D1\u05D5\u05D3\u05D4 \u05E9\u05DC\u05D4 \u05E4\u05E9\u05D5\u05D8 \u05E0\u05DB\u05E0\u05E1\u05D4 \u05DC\u05D5\u05E8\u05D9\u05D3\u05D9\u05DD."' },
        author: { en: "Lior Sade", he: "\u05DC\u05D9\u05D0\u05D5\u05E8 \u05E9\u05D3\u05D4" },
        role: { en: "CEO, Moving Art", he: '\u05DE\u05E0\u05DB"\u05DC Moving Art' }
      },
      {
        quote: { en: '"Hanita knows how to take an idea and translate it into a system that actually works. Not just thinking and strategy, but also getting into the details and driving things until they happen."', he: '"\u05D7\u05E0\u05D9\u05EA\u05D4 \u05D9\u05D5\u05D3\u05E2\u05EA \u05DC\u05E7\u05D7\u05EA \u05E8\u05E2\u05D9\u05D5\u05DF \u05D5\u05DC\u05EA\u05E8\u05D2\u05DD \u05D0\u05D5\u05EA\u05D5 \u05DC\u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05D1\u05E4\u05D5\u05E2\u05DC \u05E2\u05D5\u05D1\u05D3\u05EA. \u05DC\u05D0 \u05E8\u05E7 \u05D7\u05E9\u05D9\u05D1\u05D4 \u05D5\u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D4, \u05D0\u05DC\u05D0 \u05D2\u05DD \u05D9\u05E8\u05D9\u05D3\u05D4 \u05DC\u05E4\u05E8\u05D8\u05D9\u05DD \u05D5\u05D4\u05D5\u05D1\u05DC\u05D4 \u05E9\u05DC \u05D3\u05D1\u05E8\u05D9\u05DD \u05E2\u05D3 \u05E9\u05D4\u05DD \u05E7\u05D5\u05E8\u05D9\u05DD."' },
        author: { en: "Neta Argaz", he: "\u05E0\u05D8\u05E2 \u05D0\u05E8\u05D2\u05D6" },
        role: { en: "Founder, Club20", he: "\u05DE\u05D9\u05D9\u05E1\u05D3\u05EA Club20" }
      }
    ]
  },
  caseStudy: {
    tag: { en: "B2B SaaS Startup, 3 months", he: "\u05E1\u05D8\u05D0\u05E8\u05D8\u05D0\u05E4 B2B SaaS, 3 \u05D7\u05D5\u05D3\u05E9\u05D9\u05DD" },
    headline: {
      en: "From a CEO with no time for LinkedIn to investor meetings from the feed",
      he: '\u05DE\u05DE\u05E0\u05DB"\u05DC \u05D1\u05DC\u05D9 \u05D6\u05DE\u05DF \u05DC\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF, \u05DC\u05E4\u05D2\u05D9\u05E9\u05D5\u05EA \u05E2\u05DD \u05DE\u05E9\u05E7\u05D9\u05E2\u05D9\u05DD \u05DE\u05EA\u05D5\u05DA \u05D4\u05E4\u05D9\u05D3'
    },
    quote: {
      en: `"22 years in business. Working with professionals, suppliers, consultants. I haven't encountered your level."`,
      he: '"22 \u05E9\u05E0\u05D9\u05DD \u05D0\u05E0\u05D9 \u05D1\u05E2\u05D5\u05DC\u05DD \u05D4\u05E2\u05E1\u05E7\u05D9\u05DD. \u05E2\u05D5\u05D1\u05D3 \u05E2\u05DD \u05D0\u05E0\u05E9\u05D9 \u05DE\u05E7\u05E6\u05D5\u05E2, \u05E1\u05E4\u05E7\u05D9\u05DD, \u05D9\u05D5\u05E2\u05E6\u05D9\u05DD. \u05DC\u05D0 \u05E0\u05E4\u05D2\u05E9\u05EA\u05D9 \u05D1\u05E8\u05DE\u05D4 \u05E9\u05DC\u05DA."'
    },
    quoteAuthor: {
      en: "\u2014 CEO & Founder, B2B SaaS Startup (Stealth Mode)",
      he: '\u2014 \u05DE\u05E0\u05DB"\u05DC \u05D5\u05DE\u05D9\u05D9\u05E1\u05D3, \u05E1\u05D8\u05D0\u05E8\u05D8\u05D0\u05E4 B2B SaaS (Stealth Mode)'
    },
    startTitle: { en: "Starting point", he: "\u05E0\u05E7\u05D5\u05D3\u05EA \u05D4\u05D4\u05EA\u05D7\u05DC\u05D4" },
    startText: {
      en: "One post every three weeks, if there was time. Like many CEOs running a growing startup, LinkedIn was always pushed to the bottom of the list. The content was fine. But without pace, presence, or a complete picture of who he is and what his company builds.",
      he: '\u05E4\u05D5\u05E1\u05D8 \u05D0\u05D7\u05D3 \u05DB\u05DC \u05E9\u05DC\u05D5\u05E9\u05D4 \u05E9\u05D1\u05D5\u05E2\u05D5\u05EA, \u05D0\u05DD \u05D4\u05D9\u05D4 \u05D6\u05DE\u05DF. \u05DB\u05DE\u05D5 \u05D4\u05E8\u05D1\u05D4 \u05DE\u05E0\u05DB"\u05DC\u05D9\u05DD \u05E9\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD \u05E1\u05D8\u05D0\u05E8\u05D8\u05D0\u05E4 \u05D1\u05E6\u05DE\u05D9\u05D7\u05D4, \u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05EA\u05DE\u05D9\u05D3 \u05E0\u05D3\u05D7\u05EA\u05D4 \u05DC\u05E1\u05D5\u05E3 \u05D4\u05E8\u05E9\u05D9\u05DE\u05D4. \u05D4\u05EA\u05D5\u05DB\u05DF \u05E9\u05D9\u05E6\u05D0 \u05D4\u05D9\u05D4 \u05D1\u05E1\u05D3\u05E8. \u05D0\u05D1\u05DC \u05D1\u05DC\u05D9 \u05E7\u05E6\u05D1, \u05D1\u05DC\u05D9 \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA, \u05D5\u05D1\u05DC\u05D9 \u05EA\u05DE\u05D5\u05E0\u05D4 \u05E9\u05DC\u05DE\u05D4 \u05E9\u05DC \u05DE\u05D9 \u05D4\u05D5\u05D0 \u05D5\u05DE\u05D4 \u05D4\u05D7\u05D1\u05E8\u05D4 \u05E9\u05DC\u05D5 \u05D1\u05D5\u05E0\u05D4.'
    },
    whatTitle: { en: "What we did", he: "\u05DE\u05D4 \u05E2\u05E9\u05D9\u05E0\u05D5" },
    whatText: {
      en: "We didn't start with writing. We started with positioning.\nWe built a three-channel system that all spoke the same message:",
      he: "\u05DC\u05D0 \u05D4\u05EA\u05D7\u05DC\u05E0\u05D5 \u05D1\u05DB\u05EA\u05D9\u05D1\u05D4. \u05D4\u05EA\u05D7\u05DC\u05E0\u05D5 \u05D1\u05DE\u05D9\u05E6\u05D5\u05D1.\n\u05D1\u05E0\u05D9\u05E0\u05D5 \u05DE\u05E2\u05E8\u05DB\u05EA \u05E9\u05DC \u05E9\u05DC\u05D5\u05E9\u05D4 \u05E2\u05E8\u05D5\u05E6\u05D9\u05DD \u05E9\u05DB\u05D5\u05DC\u05DD \u05D3\u05D9\u05D1\u05E8\u05D5 \u05D0\u05EA \u05D0\u05D5\u05EA\u05D5 \u05DE\u05E1\u05E8:"
    },
    channels: {
      en: [
        "The founder's personal profile: positioned as a thought leader, consistent posting cadence, authentic voice.",
        "Company page: professional presence with organizational content reinforcing the personal strategy.",
        "Two additional senior team members: posts around the same message, from different perspectives."
      ],
      he: [
        "\u05D4\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC \u05D4\u05D0\u05D9\u05E9\u05D9 \u05E9\u05DC \u05D4\u05DE\u05D9\u05D9\u05E1\u05D3: \u05DE\u05D9\u05E6\u05D5\u05D1 \u05DB\u05DE\u05D5\u05D1\u05D9\u05DC \u05D3\u05E2\u05D4 (Thought Leadership), \u05E7\u05E6\u05D1 \u05E4\u05D5\u05E1\u05D8\u05D9\u05DD \u05E2\u05E7\u05D1\u05D9, \u05E7\u05D5\u05DC \u05D0\u05D5\u05EA\u05E0\u05D8\u05D9 \u05E9\u05DC\u05D5.",
        "\u05E2\u05DE\u05D5\u05D3 \u05D4\u05D7\u05D1\u05E8\u05D4: \u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05DE\u05E7\u05E6\u05D5\u05E2\u05D9\u05EA \u05E2\u05DD \u05EA\u05D5\u05DB\u05DF \u05D0\u05E8\u05D2\u05D5\u05E0\u05D9 \u05E9\u05DE\u05D7\u05D6\u05E7 \u05D0\u05EA \u05D4\u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D4 \u05D4\u05D0\u05D9\u05E9\u05D9\u05EA.",
        "\u05E9\u05E0\u05D9 \u05DE\u05E0\u05D4\u05DC\u05D9\u05DD \u05D1\u05DB\u05D9\u05E8\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD \u05DE\u05D4\u05E6\u05D5\u05D5\u05EA: \u05E4\u05D5\u05E1\u05D8\u05D9\u05DD \u05E1\u05D1\u05D9\u05D1 \u05D0\u05D5\u05EA\u05D5 \u05DE\u05E1\u05E8, \u05DE\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05DE\u05D1\u05D8 \u05E9\u05D5\u05E0\u05D5\u05EA."
      ]
    },
    summary: {
      en: "In a startup where everyone shares the story, the voice needs to be heard from every direction. The goal was clear: funding round and investor meetings.",
      he: "\u05D1\u05E1\u05D8\u05D0\u05E8\u05D8\u05D0\u05E4 \u05E9\u05DB\u05D5\u05DC\u05DD \u05E9\u05D5\u05EA\u05E4\u05D9\u05DD \u05DC\u05E1\u05D9\u05E4\u05D5\u05E8, \u05D4\u05E7\u05D5\u05DC \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05E9\u05DE\u05E2 \u05DE\u05DB\u05DC \u05D4\u05DB\u05D9\u05D5\u05D5\u05E0\u05D9\u05DD. \u05D4\u05DE\u05D8\u05E8\u05D4 \u05D1\u05E8\u05D5\u05E8\u05D4: \u05E1\u05D1\u05D1 \u05D2\u05D9\u05D5\u05E1 \u05D5\u05E4\u05D2\u05D9\u05E9\u05D5\u05EA \u05E2\u05DD \u05DE\u05E9\u05E7\u05D9\u05E2\u05D9\u05DD."
    },
    agentLine: {
      en: "My agents ran the daily pace across all three channels. I maintained voice, positioning, and strategy.",
      he: "\u05D4\u05E1\u05D5\u05DB\u05E0\u05D9\u05DD \u05E9\u05DC\u05D9 \u05D4\u05E8\u05D9\u05E6\u05D5 \u05D0\u05EA \u05D4\u05E7\u05E6\u05D1 \u05D4\u05D9\u05D5\u05DE\u05D9\u05D5\u05DE\u05D9 \u05E2\u05DC \u05E9\u05DC\u05D5\u05E9\u05EA \u05D4\u05E2\u05E8\u05D5\u05E6\u05D9\u05DD. \u05D0\u05E0\u05D9 \u05E9\u05DE\u05E8\u05EA\u05D9 \u05E2\u05DC \u05D4\u05E7\u05D5\u05DC, \u05E2\u05DC \u05D4\u05DE\u05D9\u05E6\u05D5\u05D1, \u05D5\u05E2\u05DC \u05D4\u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D4."
    },
    resultsTitle: { en: "Results, 3 months", he: "\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA, 3 \u05D7\u05D5\u05D3\u05E9\u05D9\u05DD" },
    results: [
      { num: "300%", label: { en: "Engagement increase on founder's profile", he: "\u05E2\u05DC\u05D9\u05D9\u05D4 \u05D1\u05DE\u05E2\u05D5\u05E8\u05D1\u05D5\u05EA \u05D1\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC \u05D4\u05DE\u05D9\u05D9\u05E1\u05D3" } },
      { num: "250%", label: { en: "Engagement increase on company page", he: "\u05E2\u05DC\u05D9\u05D9\u05D4 \u05D1\u05DE\u05E2\u05D5\u05E8\u05D1\u05D5\u05EA \u05D1\u05E2\u05DE\u05D5\u05D3 \u05D4\u05D7\u05D1\u05E8\u05D4" } },
      { num: "1,500+", label: { en: "New business followers", he: "\u05E2\u05D5\u05E7\u05D1\u05D9\u05DD \u05E2\u05E1\u05E7\u05D9\u05D9\u05DD \u05D7\u05D3\u05E9\u05D9\u05DD" } }
    ],
    inbound: {
      en: "Inbound inquiries from industry peers + direct investor meetings that came from LinkedIn presence",
      he: "\u05E4\u05E0\u05D9\u05D5\u05EA Inbound \u05DE\u05E7\u05D5\u05DC\u05D2\u05D5\u05EA \u05D1\u05EA\u05D7\u05D5\u05DD + \u05E4\u05D2\u05D9\u05E9\u05D5\u05EA \u05D9\u05E9\u05D9\u05E8\u05D5\u05EA \u05E2\u05DD \u05DE\u05E9\u05E7\u05D9\u05E2\u05D9\u05DD \u05E9\u05D4\u05D2\u05D9\u05E2\u05D5 \u05DE\u05D4\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA \u05D1\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF"
    },
    bottomCta: { en: "Want to understand what this could do for you?", he: "\u05E8\u05D5\u05E6\u05D9\u05DD \u05DC\u05D4\u05D1\u05D9\u05DF \u05DE\u05D4 \u05D6\u05D4 \u05D9\u05DB\u05D5\u05DC \u05DC\u05E2\u05E9\u05D5\u05EA \u05D0\u05E6\u05DC\u05DB\u05DD?" },
    cta: { en: "Let's Talk", he: "\u05D1\u05D5\u05D0\u05D5 \u05E0\u05D3\u05D1\u05E8" }
  },
  about: {
    title: { en: "Who's behind OctaLoom", he: "\u05DE\u05D9 \u05DE\u05D0\u05D7\u05D5\u05E8\u05D9 OctaLoom" },
    text: {
      en: "I'm Hanita Yudovski, LinkedIn-Led Fractional CMO. I build AI-powered marketing systems that use LinkedIn as a growth engine. I work with B2B SaaS companies from pre-seed to Series A, founders, CEOs and SMBs on their marketing operations. What I build for clients, I run on my own business every day.",
      he: '\u05D0\u05E0\u05D9 \u05D7\u05E0\u05D9\u05EA\u05D4 \u05D9\u05D5\u05D3\u05D5\u05D1\u05E1\u05E7\u05D9, LinkedIn-Led Fractional CMO. \u05D1\u05D5\u05E0\u05D4 \u05DE\u05E2\u05E8\u05DB\u05D5\u05EA \u05E9\u05D9\u05D5\u05D5\u05E7 \u05DE\u05D1\u05D5\u05E1\u05E1\u05D5\u05EA AI \u05D4\u05DE\u05E9\u05EA\u05DE\u05E9\u05D5\u05EA \u05D1\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DB\u05DE\u05E0\u05D5\u05E2 \u05E6\u05DE\u05D9\u05D7\u05D4. \u05DE\u05DC\u05D5\u05D5\u05D4 \u05D7\u05D1\u05E8\u05D5\u05EA B2B SaaS \u05DE-pre-seed \u05D5\u05E2\u05D3 Series A, \u05DE\u05D9\u05D9\u05E1\u05D3\u05D9\u05DD, \u05DE\u05E0\u05DB"\u05DC\u05D9\u05DD \u05D5SMBs \u05D1\u05DE\u05E2\u05E8\u05DA \u05D4\u05E9\u05D9\u05D5\u05D5\u05E7 \u05E9\u05DC\u05D4\u05DD. \u05DE\u05D4 \u05E9\u05D0\u05E0\u05D9 \u05D1\u05D5\u05E0\u05D4 \u05DC\u05DC\u05E7\u05D5\u05D7\u05D5\u05EA, \u05D0\u05E0\u05D9 \u05DE\u05E8\u05D9\u05E6\u05D4 \u05D2\u05DD \u05E2\u05DC \u05D4\u05E2\u05E1\u05E7 \u05E9\u05DC\u05D9 \u05DB\u05DC \u05D9\u05D5\u05DD, \u05DB\u05DA \u05E9\u05DC\u05D0 \u05EA\u05E7\u05D1\u05DC\u05D5 \u05DE\u05D4 \u05E9\u05D0\u05E0\u05D9 \u05DC\u05D0 \u05DE\u05D0\u05DE\u05D9\u05E0\u05D4 \u05D1\u05D5 \u05D1\u05E2\u05E6\u05DE\u05D9.'
    },
    cta: { en: "Follow me on LinkedIn", he: "\u05E2\u05E7\u05D1\u05D5 \u05D0\u05D7\u05E8\u05D9\u05D9 \u05D1\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF" }
  },
  faq: {
    title: { en: "FAQ", he: "\u05E9\u05D0\u05DC\u05D5\u05EA \u05E9\u05D7\u05E9\u05D5\u05D1 \u05DC\u05EA\u05EA \u05DC\u05D4\u05DF \u05DE\u05E2\u05E0\u05D4 \u05D1\u05E9\u05D1\u05D9\u05DC\u05DA \u05D5\u05D2\u05DD \u05D1\u05E9\u05D1\u05D9\u05DC \u05D4-SEO \u{1F605}" },
    items: [
      {
        q: { en: "Who are you and what is OctaLoom?", he: "\u05DE\u05D9 \u05D0\u05EA \u05D5\u05DE\u05D4 \u05D6\u05D4 OctaLoom?" },
        a: { en: "I'm Hanita (Yudovski, but like Madonna my first name is enough \u{1F605}), a fractional marketing manager \u2014 or as I prefer, LinkedIn-Led Fractional CMO. OctaLoom is a boutique B2B marketing agency that works on LinkedIn strategy as a central axis, alongside vibe marketing (AI-based marketing), and also building AI agents for organizations and B2B businesses. I lead the strategy, and my AI agents do the daily work with me.", he: "\u05D0\u05E0\u05D9 \u05D7\u05E0\u05D9\u05EA\u05D4 (\u05D9\u05D5\u05D3\u05D5\u05D1\u05E1\u05E7\u05D9, \u05D0\u05D1\u05DC \u05DB\u05DE\u05D5 \u05DE\u05D3\u05D5\u05E0\u05D4 \u05D4\u05E9\u05DD \u05D4\u05E4\u05E8\u05D8\u05D9 \u05E9\u05DC\u05D9 \u05DE\u05E1\u05E4\u05D9\u05E7 \u{1F605}), \u05DE\u05E0\u05D4\u05DC\u05EA \u05E9\u05D9\u05D5\u05D5\u05E7 \u05D1\u05DE\u05D9\u05E7\u05D5\u05E8 \u05D7\u05D5\u05E5 \u05DB\u05DE\u05D5 \u05E9\u05D0\u05D5\u05DE\u05E8\u05D9\u05DD \u05D1\u05E2\u05D1\u05E8\u05D9\u05EA \u05D0\u05D1\u05DC \u05D0\u05E0\u05D9 \u05DE\u05E2\u05D3\u05D9\u05E4\u05D4 LinkedIn-Led Fractional CMO \u05DB\u05D9 \u05D6\u05D4 \u05DE\u05EA\u05D2\u05DC\u05D2\u05DC \u05E2\u05DC \u05D4\u05DC\u05E9\u05D5\u05DF \u05D8\u05D5\u05D1 \u05D9\u05D5\u05EA\u05E8 \u05D5\u05D1\u05DB\u05DC\u05DC \u05DC\u05D0 \u05EA\u05E8\u05D2\u05D9\u05DC \u05E9\u05DC \u05E7\u05DC\u05D9\u05E0\u05D0\u05D9\u05EA \u05EA\u05E7\u05E9\u05D5\u05E8\u05EA. \u05D1\u05D2\u05D3\u05D5\u05DC, OctaLoom \u05D4\u05D9\u05D0 \u05E1\u05D5\u05DB\u05E0\u05D5\u05EA \u05E9\u05D9\u05D5\u05D5\u05E7 B2B \u05D1\u05D5\u05D8\u05D9\u05E7\u05D9\u05EA \u05E9\u05E2\u05D5\u05D1\u05D3\u05EA \u05E2\u05DC \u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D9\u05EA \u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DB\u05E6\u05D9\u05E8 \u05DE\u05E8\u05DB\u05D6\u05D9, \u05DC\u05E6\u05D3 \u05D5\u05D5\u05D9\u05D1 \u05DE\u05E8\u05E7\u05D8\u05D9\u05E0\u05D2 (\u05E9\u05D9\u05D5\u05D5\u05E7 \u05DE\u05D1\u05D5\u05E1\u05E1 AI), \u05D5\u05DB\u05DE\u05D5 \u05DB\u05DF \u05D1\u05E0\u05D9\u05D9\u05EA \u05E1\u05D5\u05DB\u05E0\u05D9 AI \u05E2\u05D1\u05D5\u05E8 \u05D0\u05E8\u05D2\u05D5\u05E0\u05D9\u05DD \u05D5\u05E2\u05E1\u05E7\u05D9 B2B. \u05D0\u05E0\u05D9 \u05DE\u05D5\u05D1\u05D9\u05DC\u05D4 \u05D0\u05EA \u05D4\u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D4, \u05D5\u05E1\u05D5\u05DB\u05E0\u05D9 AI \u05E9\u05DC\u05D9 \u05E2\u05D5\u05E9\u05D9\u05DD \u05D0\u05D9\u05EA\u05D9 \u05D0\u05EA \u05D4\u05E2\u05D1\u05D5\u05D3\u05D4 \u05D4\u05D9\u05D5\u05DE\u05D9\u05D5\u05DE\u05D9\u05EA." }
      },
      {
        q: { en: "What is a Fractional CMO and why do I need one?", he: "\u05DE\u05D4 \u05D6\u05D4 Fractional CMO \u05D5\u05DC\u05DE\u05D4 \u05D0\u05E0\u05D9 \u05E6\u05E8\u05D9\u05DA \u05D0\u05D7\u05EA?" },
        a: { en: "A Fractional CMO is a senior marketing executive who works with you part-time. No full salary, no sick days, no social benefits. Instead of hiring a VP Marketing at 50K NIS a month, you get the same level of experience and execution in a model that fits a startup or medium business. And that's exactly what I offer.", he: '\u05D1\u05E2\u05D1\u05E8\u05D9\u05EA \u05DC\u05E4\u05D5\u05E0\u05E7\u05E6\u05D9\u05D4 \u05D4\u05D6\u05D0\u05EA \u05E7\u05D5\u05E8\u05D0\u05D9\u05DD \u05E1\u05DE\u05E0\u05DB"\u05DC\u05D9\u05EA/\u05DE\u05E0\u05D4\u05DC\u05EA \u05E9\u05D9\u05D5\u05D5\u05E7 \u05D1\u05DE\u05D9\u05E7\u05D5\u05E8 \u05D7\u05D5\u05E5 \u05D0\u05D1\u05DC \u05D1\u05D0\u05E0\u05D2\u05DC\u05D9\u05EA \u05D6\u05D4 \u05D9\u05D5\u05EA\u05E8 \u05E9\u05D5\u05D5\u05D4. Fractional CMO \u05D4\u05D9\u05D0 \u05DE\u05E0\u05D4\u05DC\u05EA \u05E9\u05D9\u05D5\u05D5\u05E7 \u05D1\u05DB\u05D9\u05E8\u05D4 \u05E9\u05E2\u05D5\u05D1\u05D3\u05EA \u05D0\u05D9\u05EA\u05DB\u05DD \u05D1\u05DE\u05E9\u05E8\u05D4 \u05D7\u05DC\u05E7\u05D9\u05EA. \u05D1\u05DC\u05D9 \u05DE\u05E9\u05DB\u05D5\u05E8\u05EA \u05DE\u05DC\u05D0\u05D4, \u05D1\u05DC\u05D9 \u05D9\u05DE\u05D9 \u05DE\u05D7\u05DC\u05D4, \u05D1\u05DC\u05D9 \u05EA\u05E0\u05D0\u05D9\u05DD \u05E1\u05D5\u05E6\u05D9\u05D0\u05DC\u05D9\u05D9\u05DD. \u05D1\u05DE\u05E7\u05D5\u05DD \u05DC\u05D2\u05D9\u05D9\u05E1 VP Marketing \u05D1-50K \u05E9\u05E7\u05DC \u05D1\u05D7\u05D5\u05D3\u05E9, \u05DE\u05E7\u05D1\u05DC\u05D9\u05DD \u05D0\u05EA \u05D0\u05D5\u05EA\u05D4 \u05E8\u05DE\u05D4 \u05E9\u05DC \u05E0\u05D9\u05E1\u05D9\u05D5\u05DF \u05D5\u05D1\u05D9\u05E6\u05D5\u05E2 \u05D1\u05DE\u05D5\u05D3\u05DC \u05E9\u05DE\u05EA\u05D0\u05D9\u05DD \u05DC\u05E1\u05D8\u05D0\u05E8\u05D8\u05D0\u05E4 \u05D0\u05D5 \u05E2\u05E1\u05E7 \u05D1\u05D9\u05E0\u05D5\u05E0\u05D9. \u05D5\u05D6\u05D4 \u05D1\u05D9\u05D3\u05D9\u05D5\u05E7 \u05DE\u05D4 \u05E9\u05D0\u05E0\u05D9 \u05DE\u05E6\u05D9\u05E2\u05D4.' }
      },
      {
        q: { en: "How is OctaLoom different from a regular agency?", he: "\u05D1\u05DE\u05D4 OctaLoom \u05E9\u05D5\u05E0\u05D4 \u05DE\u05E1\u05D5\u05DB\u05E0\u05D5\u05EA \u05E9\u05D9\u05D5\u05D5\u05E7 \u05E8\u05D2\u05D9\u05DC\u05D4?" },
        a: { en: "A regular agency gets a monthly retainer, puts juniors on the project, and swaps contact people constantly. At OctaLoom you work directly with me and my AI agents and tools. I lead the strategy and build a team of AI agents that executes. Fewer layers, more execution, the same person guiding you from start to results.", he: '\u05E1\u05D5\u05DB\u05E0\u05D5\u05EA \u05E8\u05D2\u05D9\u05DC\u05D4 \u05DE\u05E7\u05D1\u05DC\u05EA \u05E8\u05D9\u05D8\u05D9\u05D9\u05E0\u05E8 \u05D7\u05D5\u05D3\u05E9\u05D9, \u05D5\u05E9\u05DE\u05D4 \u05D2\u05F3\u05D5\u05E0\u05D9\u05D5\u05E8\u05D9\u05DD \u05E2\u05DC \u05D4\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8, \u05D5\u05DE\u05D7\u05DC\u05D9\u05E4\u05D4 \u05D0\u05E0\u05E9\u05D9 \u05E7\u05E9\u05E8 \u05DB\u05DC \u05E9\u05E0\u05D9 \u05D5\u05D7\u05DE\u05D9\u05E9\u05D9 (\u05DE\u05E0\u05D4\u05DC\u05EA \u05D4\u05DC\u05E7\u05D5\u05D7\u05D5\u05EA \u05E4\u05EA\u05D0\u05D5\u05DD \u05D1\u05D7\u05D5"\u05DC \u05D0\u05D6 \u05E0\u05DB\u05E0\u05E1\u05EA \u05DE\u05D9\u05E9\u05D4\u05D9 \u05DC\u05D4\u05D7\u05DC\u05D9\u05E3 \u05D0\u05D5\u05EA\u05D4 \u05D5\u05E2\u05D3 \u05E9\u05D0\u05EA\u05DD \u05DE\u05D1\u05D9\u05E0\u05D9\u05DD \u05D0\u05D9\u05DA \u05DC\u05E2\u05D1\u05D5\u05D3 \u05D0\u05D9\u05EA\u05D4 \u05D4\u05D5\u05E4\u05E1 \u05D4\u05D9\u05D4 \u05E2\u05D5\u05D3 \u05D0\u05D9\u05D6\u05D4 \u05E9\u05D9\u05E0\u05D5\u05D9 \u05D5\u05DE\u05E9\u05D4\u05D5 \u05D1\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8 \u05E0\u05E4\u05DC \u05D1\u05D9\u05DF \u05D4\u05DB\u05D9\u05E1\u05D0\u05D5\u05EA). \u05D1- OctaLoom \u05D0\u05EA\u05DD \u05E2\u05D5\u05D1\u05D3\u05D9\u05DD \u05D9\u05E9\u05D9\u05E8\u05D5\u05EA \u05D0\u05D9\u05EA\u05D9 \u05D5\u05E2\u05DD \u05E1\u05D5\u05DB\u05E0\u05D9 \u05D5\u05DB\u05DC\u05D9 \u05D4-AI \u05E9\u05DC\u05D9. \u05D0\u05E0\u05D9 \u05DE\u05D5\u05D1\u05D9\u05DC\u05D4 \u05D0\u05EA \u05D4\u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D4 \u05D5\u05D1\u05D5\u05E0\u05D4 \u05E6\u05D5\u05D5\u05EA \u05E9\u05DC \u05E1\u05D5\u05DB\u05E0\u05D9 AI \u05E9\u05DE\u05D1\u05E6\u05E2 \u05D0\u05EA \u05D4\u05E2\u05D1\u05D5\u05D3\u05D4. \u05E4\u05D7\u05D5\u05EA \u05E9\u05DB\u05D1\u05D5\u05EA, \u05D9\u05D5\u05EA\u05E8 \u05D1\u05D9\u05E6\u05D5\u05E2, \u05D0\u05D5\u05EA\u05D5 \u05E8\u05D0\u05E9 \u05E9\u05DE\u05DC\u05D5\u05D5\u05D4 \u05D0\u05EA\u05DB\u05DD \u05DE\u05EA\u05D7\u05D9\u05DC\u05EA \u05D4\u05D3\u05E8\u05DA \u05E2\u05D3 \u05DC\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA.' }
      },
      {
        q: { en: "How do AI agents work in marketing?", he: "\u05D0\u05D9\u05DA \u05E2\u05D5\u05D1\u05D3\u05D9\u05DD \u05E1\u05D5\u05DB\u05E0\u05D9 AI \u05D1\u05E9\u05D9\u05D5\u05D5\u05E7?" },
        a: { en: "In every project I build dedicated AI agents that do what an entire marketing department would do: generate content in your style, run automations, analyze LinkedIn data and generate leads. AI works at an insane pace, I maintain quality and strategy.", he: "\u05D1\u05DB\u05DC \u05E4\u05E8\u05D5\u05D9\u05E7\u05D8 \u05D0\u05E0\u05D9 \u05D1\u05D5\u05E0\u05D4 \u05E1\u05D5\u05DB\u05E0\u05D9 AI \u05D9\u05D9\u05E2\u05D5\u05D3\u05D9\u05D9\u05DD \u05E9\u05E2\u05D5\u05E9\u05D9\u05DD \u05D0\u05EA \u05D4\u05E2\u05D1\u05D5\u05D3\u05D4 \u05E9\u05DE\u05D7\u05DC\u05E7\u05EA \u05E9\u05D9\u05D5\u05D5\u05E7 \u05E9\u05DC\u05DE\u05D4 \u05D4\u05D9\u05D9\u05EA\u05D4 \u05E2\u05D5\u05E9\u05D4: \u05DE\u05D9\u05D9\u05E6\u05E8\u05D9\u05DD \u05EA\u05D5\u05DB\u05DF \u05DC\u05E4\u05D9 \u05D4\u05E1\u05D2\u05E0\u05D5\u05DF \u05E9\u05DC\u05DB\u05DD, \u05DE\u05E4\u05E2\u05D9\u05DC\u05D9\u05DD \u05D0\u05D5\u05D8\u05D5\u05DE\u05E6\u05D9\u05D5\u05EA, \u05DE\u05E0\u05EA\u05D7\u05D9\u05DD \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DE\u05D4\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05D5\u05DE\u05D9\u05D9\u05E6\u05E8\u05D9\u05DD \u05DC\u05D9\u05D3\u05D9\u05DD. \u05D4-AI \u05E2\u05D5\u05D1\u05D3 \u05D1\u05E7\u05E6\u05D1 \u05DE\u05D8\u05D5\u05E8\u05E3, \u05D0\u05E0\u05D9 \u05E9\u05D5\u05DE\u05E8\u05EA \u05E2\u05DC \u05D4\u05D0\u05D9\u05DB\u05D5\u05EA \u05D5\u05D4\u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D4." }
      },
      {
        q: { en: "What company size do you work with?", he: "\u05DE\u05D0\u05D9\u05D6\u05D4 \u05D2\u05D5\u05D3\u05DC \u05D7\u05D1\u05E8\u05D4 \u05E2\u05D5\u05D1\u05D3\u05D9\u05DD \u05D9\u05D7\u05D3?" },
        a: { en: "I mainly work with B2B companies from pre-seed to Series A: SaaS, hi-tech and professional service providers. If you have a product or service that works but don't yet have a marketing department, or you have a lean team that needs to accelerate performance, let's talk.", he: "\u05D0\u05E0\u05D9 \u05E2\u05D5\u05D1\u05D3\u05EA \u05D1\u05E2\u05D9\u05E7\u05E8 \u05E2\u05DD \u05D7\u05D1\u05E8\u05D5\u05EA B2B \u05DE-pre-seed \u05D5\u05E2\u05D3 Series A: SaaS, \u05D4\u05D9\u05D9-\u05D8\u05E7 \u05D5\u05E0\u05D5\u05EA\u05E0\u05D9 \u05E9\u05D9\u05E8\u05D5\u05EA \u05DE\u05E7\u05E6\u05D5\u05E2\u05D9\u05D9\u05DD. \u05D0\u05DD \u05D9\u05E9 \u05DC\u05DB\u05DD \u05DE\u05D5\u05E6\u05E8 \u05D0\u05D5 \u05E9\u05D9\u05E8\u05D5\u05EA \u05E9\u05E2\u05D5\u05D1\u05D3 \u05D0\u05D1\u05DC \u05D0\u05D9\u05DF \u05E2\u05D3\u05D9\u05D9\u05DF \u05DE\u05D7\u05DC\u05E7\u05EA \u05E9\u05D9\u05D5\u05D5\u05E7, \u05D0\u05D5 \u05E9\u05D9\u05E9 \u05DC\u05DB\u05DD \u05E6\u05D5\u05D5\u05EA \u05E8\u05D6\u05D4 \u05E9\u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D0\u05D9\u05E5 \u05D1\u05D9\u05E6\u05D5\u05E2\u05D9\u05DD \u05D5\u05D0\u05D9\u05DF \u05DC\u05DB\u05DD \u05D0\u05E4\u05E9\u05E8\u05D5\u05EA \u05DC\u05D2\u05D9\u05D9\u05E1 \u05E2\u05D5\u05D3 \u05D0\u05E0\u05E9\u05D9\u05DD, \u05E9\u05D5\u05D5\u05D4 \u05E9\u05E0\u05D3\u05D1\u05E8." }
      },
      {
        q: { en: "Why LinkedIn specifically and not another platform?", he: "\u05DC\u05DE\u05D4 \u05D3\u05D5\u05D5\u05E7\u05D0 \u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05D5\u05DC\u05D0 \u05E4\u05DC\u05D8\u05E4\u05D5\u05E8\u05DE\u05D4 \u05D0\u05D7\u05E8\u05EA?" },
        a: { en: "Because that's where B2B decision makers are. Not on Instagram, definitely not on TikTok. Founders looking for suppliers, HR managers looking for training solutions, CTOs reading about new trends \u2014 they're all on LinkedIn. The question is whether they see you there.", he: '\u05DB\u05D9 \u05E9\u05DD \u05E0\u05DE\u05E6\u05D0\u05D9\u05DD \u05DE\u05E7\u05D1\u05DC\u05D9 \u05D4\u05D4\u05D7\u05DC\u05D8\u05D5\u05EA \u05D1\u05E2\u05D5\u05DC\u05DE\u05D5\u05EA \u05D4-B2B. \u05DC\u05D0 \u05D1\u05D0\u05D9\u05E0\u05E1\u05D8\u05D2\u05E8\u05DD, \u05D5\u05D1\u05D8\u05D7 \u05DC\u05D0 \u05D1\u05D8\u05D9\u05E7\u05D8\u05D5\u05E7. \u05DE\u05D9\u05D9\u05E1\u05D3 \u05E9\u05DE\u05D7\u05E4\u05E9 \u05E1\u05E4\u05E7, \u05DE\u05E0\u05D4\u05DC\u05EA HR \u05E9\u05DE\u05D7\u05E4\u05E9\u05EA \u05E4\u05EA\u05E8\u05D5\u05DF \u05D4\u05D3\u05E8\u05DB\u05D4, \u05E1\u05DE\u05E0\u05DB"\u05DC \u05D8\u05DB\u05E0\u05D5\u05DC\u05D5\u05D2\u05D9\u05D4 \u05E9\u05E7\u05D5\u05E8\u05D0 \u05E2\u05DC \u05D8\u05E8\u05E0\u05D3\u05D9\u05DD \u05D7\u05D3\u05E9\u05D9\u05DD \u2014 \u05DB\u05D5\u05DC\u05DD \u05D1\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF. \u05D4\u05E9\u05D0\u05DC\u05D4 \u05D4\u05D9\u05D0 \u05D0\u05DD \u05D4\u05DD \u05E8\u05D5\u05D0\u05D9\u05DD \u05D0\u05D5\u05EA\u05DA \u05E9\u05DD.' }
      }
    ]
  },
  finalCta: {
    title: { en: "Let's Build Your Growth Engine", he: "\u05D1\u05D5\u05D0\u05D5 \u05E0\u05D1\u05E0\u05D4 \u05D0\u05EA \u05DE\u05E0\u05D5\u05E2 \u05D4\u05E6\u05DE\u05D9\u05D7\u05D4 \u05E9\u05DC\u05DB\u05DD" },
    sub: {
      en: "No pitch. Just a real conversation about what you actually need.",
      he: "\u05D1\u05DC\u05D9 \u05DE\u05DB\u05D9\u05E8\u05D4. \u05E8\u05E7 \u05E9\u05D9\u05D7\u05D4 \u05D0\u05DE\u05D9\u05EA\u05D9\u05EA \u05E2\u05DC \u05DE\u05D4 \u05E9\u05D0\u05EA\u05DD \u05D1\u05D0\u05DE\u05EA \u05E6\u05E8\u05D9\u05DB\u05D9\u05DD."
    },
    cta: { en: "Let's Talk", he: "\u05D1\u05D5\u05D0\u05D5 \u05E0\u05D3\u05D1\u05E8" },
    formName: { en: "Full name", he: "\u05E9\u05DD \u05DE\u05DC\u05D0" },
    formEmail: { en: "Email", he: "\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC" },
    formCompany: { en: "Company", he: "\u05D7\u05D1\u05E8\u05D4" },
    formBg: { en: "Brief background", he: "\u05E8\u05E7\u05E2 \u05E7\u05E6\u05E8" },
    formConsent: {
      en: "I agree to receive marketing content, updates and focused tips from OctaLoom",
      he: "\u05D0\u05E0\u05D9 \u05DE\u05E1\u05DB\u05D9\u05DD \u05DC\u05E7\u05D1\u05DC \u05EA\u05DB\u05E0\u05D9\u05DD \u05E9\u05D9\u05D5\u05D5\u05E7\u05D9\u05D9\u05DD, \u05E2\u05D3\u05DB\u05D5\u05E0\u05D9\u05DD \u05D5\u05D8\u05D9\u05E4\u05D9\u05DD \u05DE\u05DE\u05D5\u05E7\u05D3\u05D9\u05DD \u05DE- OctaLoom"
    },
    formSend: { en: "Send", he: "\u05E9\u05DC\u05D9\u05D7\u05D4" }
  },
  linkedinFeed: {
    title: { en: "What's new on LinkedIn", he: "\u05DE\u05D4 \u05D7\u05D3\u05E9 \u05D1\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF" },
    sub: { en: "Tips, insights and real conversations about B2B marketing", he: "\u05D8\u05D9\u05E4\u05D9\u05DD, \u05EA\u05D5\u05D1\u05E0\u05D5\u05EA \u05D5\u05E9\u05D9\u05D7\u05D5\u05EA \u05D0\u05DE\u05D9\u05EA\u05D9\u05D5\u05EA \u05E2\u05DC \u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05D5\u05E9\u05D9\u05D5\u05D5\u05E7 B2B." },
    followCta: { en: "Follow me on LinkedIn", he: "\u05E2\u05E7\u05D1\u05D5 \u05D0\u05D7\u05E8\u05D9\u05D9 \u05D1\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF" }
  },
  blog: {
    title: { en: "Blog (yes, there's one too)", he: "\u05D1\u05DC\u05D5\u05D2 (\u05DB\u05DF, \u05D9\u05E9 \u05D2\u05DD \u05DB\u05D6\u05D4)" },
    sub: {
      en: "Articles on LinkedIn, B2B marketing, and how to use AI the smart way that doesn't sound like AI.",
      he: "\u05DE\u05D0\u05DE\u05E8\u05D9\u05DD \u05E2\u05DC \u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF, \u05E9\u05D9\u05D5\u05D5\u05E7 B2B, \u05D5\u05D0\u05D9\u05DA \u05DC\u05D4\u05E9\u05EA\u05DE\u05E9 \u05D1-AI \u05D1\u05E6\u05D5\u05E8\u05D4 \u05D7\u05DB\u05DE\u05D4 \u05E9\u05DC\u05D0 \u05E0\u05E9\u05DE\u05E2\u05EA \u05DB\u05DE\u05D5 AI."
    },
    readMore: { en: "Read more", he: "\u05E7\u05E8\u05D0\u05D5 \u05E2\u05D5\u05D3" },
    viewAll: { en: "Full Blog", he: "\u05DC\u05D1\u05DC\u05D5\u05D2 \u05D4\u05DE\u05DC\u05D0" },
    // Placeholder articles
    posts: [
      { title: { en: "Article title placeholder", he: "\u05DB\u05D5\u05EA\u05E8\u05EA \u05DE\u05D0\u05DE\u05E8 - \u05DE\u05DE\u05EA\u05D9\u05E0\u05D4 \u05DC\u05EA\u05D5\u05DB\u05DF" }, date: "2026-04" },
      { title: { en: "Article title placeholder", he: "\u05DB\u05D5\u05EA\u05E8\u05EA \u05DE\u05D0\u05DE\u05E8 - \u05DE\u05DE\u05EA\u05D9\u05E0\u05D4 \u05DC\u05EA\u05D5\u05DB\u05DF" }, date: "2026-04" },
      { title: { en: "Article title placeholder", he: "\u05DB\u05D5\u05EA\u05E8\u05EA \u05DE\u05D0\u05DE\u05E8 - \u05DE\u05DE\u05EA\u05D9\u05E0\u05D4 \u05DC\u05EA\u05D5\u05DB\u05DF" }, date: "2026-03" }
    ]
  },
  newsletter: {
    title: { en: "What you won't see in the feed", he: "\u05DE\u05D4 \u05E9\u05DC\u05D0 \u05E8\u05D5\u05D0\u05D9\u05DD \u05D1\u05E4\u05D9\u05D3" },
    sub: {
      en: "Best enjoyed with a cocktail or coffee (I don't judge). Twice a month I send a (super polished \u2728) email with LinkedIn trends, new AI marketing content, project stories, things I learned, and what's actually working.",
      he: "\u05DE\u05D5\u05DE\u05DC\u05E5 \u05DC\u05E7\u05E8\u05D5\u05D0 \u05DC\u05E6\u05D3 \u05E7\u05D5\u05E7\u05D8\u05D9\u05D9\u05DC \u05D0\u05D5 \u05E7\u05E4\u05D4 (\u05D0\u05E0\u05D9 \u05DC\u05D0 \u05E9\u05D5\u05E4\u05D8\u05EA). \u05E4\u05E2\u05DE\u05D9\u05D9\u05DD \u05D1\u05D7\u05D5\u05D3\u05E9 \u05D0\u05E0\u05D9 \u05E9\u05D5\u05DC\u05D7\u05EA \u05DE\u05D9\u05D9\u05DC (\u05E1\u05D5\u05E4\u05E8 \u05DE\u05D5\u05E9\u05E7\u05E2 \u2728) \u05E2\u05DD \u05DB\u05DC \u05DE\u05D9\u05E0\u05D9 \u05D8\u05E8\u05E0\u05D3\u05D9\u05DD \u05D1\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05D5\u05EA\u05DB\u05E0\u05D9\u05DD \u05D7\u05D3\u05E9\u05D9\u05DD \u05DC\u05D9\u05D9\u05E2\u05D5\u05DC \u05D5\u05E9\u05D9\u05E4\u05D5\u05E8 \u05EA\u05D4\u05DC\u05D9\u05DB\u05D9 \u05E9\u05D9\u05D5\u05D5\u05E7 \u05D1-AI, \u05DC\u05E6\u05D3 \u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD \u05DE\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9\u05DD, \u05D3\u05D1\u05E8\u05D9\u05DD \u05E9\u05DC\u05DE\u05D3\u05EA\u05D9, \u05D5\u05DE\u05D4 \u05E9\u05DE\u05E6\u05D0\u05EA\u05D9 \u05E9\u05E2\u05D5\u05D1\u05D3."
    },
    placeholder: { en: "Enter your email", he: "\u05D4\u05DB\u05E0\u05D9\u05E1\u05D5 \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC" },
    btn: { en: "Subscribe", he: "\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5" }
  },
  footer: {
    tagline: { en: "Your marketing department, without the department.", he: "\u05DE\u05D7\u05DC\u05E7\u05EA \u05D4\u05E9\u05D9\u05D5\u05D5\u05E7 \u05E9\u05DC\u05DA, \u05E8\u05E7 \u05D1\u05DC\u05D9 \u05D4\u05DE\u05D7\u05DC\u05E7\u05D4." },
    linkedinServices: { en: "LinkedIn Services", he: "\u05E9\u05D9\u05E8\u05D5\u05EA\u05D9 \u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF" },
    moreServices: { en: "More Services", he: "\u05E9\u05D9\u05E8\u05D5\u05EA\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD" },
    connect: { en: "Connect", he: "\u05D4\u05EA\u05D7\u05D1\u05E8\u05D5" },
    privacy: { en: "Privacy", he: "\u05E4\u05E8\u05D8\u05D9\u05D5\u05EA" },
    terms: { en: "Terms", he: "\u05EA\u05E0\u05D0\u05D9\u05DD" }
  }
};
function HPNav() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [linkedinOpen, setLinkedinOpen] = useState(false);
  const servicesRef = useRef(null);
  const dir = lang === "he" ? "rtl" : "ltr";
  const w = useWindowSize();
  const isMobile = w < 768;
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const fn = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
        setLinkedinOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);
  const linkedinSub = [
    { en: "LinkedIn for Organizations", he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05D0\u05E8\u05D2\u05D5\u05E0\u05D9\u05DD", href: "/services/linkedin-for-organizations" },
    { en: "LinkedIn for Executives", he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05DE\u05E0\u05D4\u05DC\u05D9\u05DD", href: "/services/linkedin-for-executives" },
    { en: "LinkedIn for Solopreneurs & Biz Owners", he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05E2\u05E6\u05DE\u05D0\u05D9\u05DD \u05D5\u05D1\u05E2\u05DC\u05D9 \u05E2\u05E1\u05E7\u05D9\u05DD", href: "/services/linkedin-for-solopreneurs" }
  ];
  const services = [
    { en: "LinkedIn Growth Engine", he: "\u05DE\u05E0\u05D5\u05E2 \u05E6\u05DE\u05D9\u05D7\u05D4 \u05D1\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF", href: "/services/linkedin-growth-engine", sub: linkedinSub },
    { en: "Fractional CMO", he: "Fractional CMO", href: "/services/fractional-cmo", sub: null },
    { en: "AI Tools & Agents", he: "\u05DB\u05DC\u05D9 AI \u05D5\u05E1\u05D5\u05DB\u05E0\u05D9\u05DD", href: "/services/ai-tools-agents", sub: null }
  ];
  const navBg = scrolled ? { background: "rgba(236,233,231,0.82)", backdropFilter: "blur(24px) saturate(1.6)", WebkitBackdropFilter: "blur(24px) saturate(1.6)", borderBottom: "1px solid rgba(113,46,172,0.1)", boxShadow: "0 1px 24px rgba(32,30,75,0.07)" } : { background: "rgba(255,255,255,0.02)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" };
  const dropBase = {
    position: "absolute",
    minWidth: 240,
    background: "white",
    borderRadius: 12,
    boxShadow: "0 8px 40px rgba(113,46,172,0.15), 0 2px 8px rgba(0,0,0,0.06)",
    border: "1px solid rgba(113,46,172,0.08)",
    zIndex: 200,
    padding: "8px 0"
  };
  const dropItem = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 18px",
    fontSize: 14,
    color: C.deepPurple,
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.2s",
    fontFamily: F.body,
    gap: 8,
    whiteSpace: "nowrap",
    background: "transparent"
  };
  return /* @__PURE__ */ React.createElement("nav", { dir, style: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: scrolled ? "10px 0" : "16px 0",
    transition: "all 0.4s",
    ...navBg
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 clamp(20px,4vw,48px)",
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    gap: 16
  } }, /* @__PURE__ */ React.createElement("a", { href: "/", style: { display: "flex", alignItems: "center", gap: 10, textDecoration: "none" } }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/logo%20nav%20bar.png",
      alt: "OctaLoom",
      style: { height: 36, width: "auto", display: "block" }
    }
  )), !isMobile && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 28 } }, /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: servicesRef,
      style: { position: "relative" },
      onMouseEnter: () => setServicesOpen(true),
      onMouseLeave: () => {
        setServicesOpen(false);
        setLinkedinOpen(false);
      }
    },
    /* @__PURE__ */ React.createElement("button", { style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 14,
      color: servicesOpen ? C.deepPurple : C.textDim,
      fontFamily: F.body,
      display: "flex",
      alignItems: "center",
      gap: 5,
      padding: "6px 0",
      transition: "color 0.25s"
    } }, lang === "he" ? "\u05E9\u05D9\u05E8\u05D5\u05EA\u05D9\u05DD" : "Services", /* @__PURE__ */ React.createElement(
      "svg",
      {
        width: "11",
        height: "11",
        viewBox: "0 0 12 12",
        fill: "none",
        style: { transition: "transform 0.25s", transform: servicesOpen ? "rotate(180deg)" : "none" }
      },
      /* @__PURE__ */ React.createElement("path", { d: "M2 4l4 4 4-4", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
    )),
    /* @__PURE__ */ React.createElement(AnimatePresence, null, servicesOpen && /* @__PURE__ */ React.createElement(
      motion.div,
      {
        initial: { opacity: 0, y: -6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.18 },
        style: { ...dropBase, top: "calc(100% + 10px)", [dir === "rtl" ? "right" : "left"]: 0 }
      },
      services.map((svc, i) => /* @__PURE__ */ React.createElement(
        "div",
        {
          key: i,
          style: { position: "relative" },
          onMouseEnter: () => {
            if (svc.sub) setLinkedinOpen(true);
          },
          onMouseLeave: () => {
            if (svc.sub) setLinkedinOpen(false);
          }
        },
        /* @__PURE__ */ React.createElement(
          "a",
          {
            href: svc.href,
            style: dropItem,
            onMouseEnter: (e) => {
              e.currentTarget.style.background = "rgba(113,46,172,0.05)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.background = "transparent";
            }
          },
          /* @__PURE__ */ React.createElement("span", null, lang === "he" ? svc.he : svc.en),
          svc.sub && /* @__PURE__ */ React.createElement(
            "svg",
            {
              width: "11",
              height: "11",
              viewBox: "0 0 12 12",
              fill: "none",
              style: { opacity: 0.45, flexShrink: 0, transform: dir === "rtl" ? "rotate(180deg)" : "none" }
            },
            /* @__PURE__ */ React.createElement("path", { d: "M4 2l4 4-4 4", stroke: C.deepPurple, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
          )
        ),
        /* @__PURE__ */ React.createElement(AnimatePresence, null, svc.sub && linkedinOpen && /* @__PURE__ */ React.createElement(
          motion.div,
          {
            initial: { opacity: 0, x: dir === "rtl" ? 6 : -6 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: dir === "rtl" ? 6 : -6 },
            transition: { duration: 0.15 },
            style: {
              ...dropBase,
              top: 0,
              ...dir === "rtl" ? { right: "calc(100% + 6px)" } : { left: "calc(100% + 6px)" }
            }
          },
          linkedinSub.map((sub, j) => /* @__PURE__ */ React.createElement(
            "a",
            {
              key: j,
              href: sub.href,
              style: { ...dropItem, justifyContent: "flex-start" },
              onMouseEnter: (e) => {
                e.currentTarget.style.background = "rgba(113,46,172,0.05)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.background = "transparent";
              }
            },
            lang === "he" ? sub.he : sub.en
          ))
        ))
      ))
    ))
  ), [
    { en: "About", he: "\u05E2\u05DC\u05D9\u05D9", href: "#about" },
    { en: "Blog", he: "\u05D1\u05DC\u05D5\u05D2", href: "/blog" },
    { en: "Contact", he: "\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8", href: "#contact" }
  ].map((item, i) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: i,
      href: item.href,
      style: { fontSize: 14, color: C.textDim, textDecoration: "none", fontFamily: F.body, transition: "color 0.25s" },
      onMouseEnter: (e) => e.currentTarget.style.color = C.deepPurple,
      onMouseLeave: (e) => e.currentTarget.style.color = C.textDim
    },
    lang === "he" ? item.he : item.en
  )), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://octagoodies.com",
      target: "_blank",
      rel: "noopener noreferrer",
      style: { fontSize: 14, color: C.textDim, textDecoration: "none", fontFamily: F.body, transition: "color 0.25s" },
      onMouseEnter: (e) => e.currentTarget.style.color = C.deepPurple,
      onMouseLeave: (e) => e.currentTarget.style.color = C.textDim
    },
    "Goodies"
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 2, background: "rgba(113,46,172,0.06)", borderRadius: 6, padding: 2 } }, ["en", "he"].map((l) => /* @__PURE__ */ React.createElement("button", { key: l, onClick: () => setLang(l), style: {
    background: lang === l ? C.purple : "none",
    color: lang === l ? "white" : C.textDim,
    border: "none",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700,
    padding: "5px 10px",
    borderRadius: 4,
    transition: "all 0.25s",
    fontFamily: F.body
  } }, l === "en" ? "EN" : "\u05E2\u05D1")))), !isMobile && /* @__PURE__ */ React.createElement(
    Btn,
    {
      href: "https://calendar.notion.so/meet/octaloom/discovery",
      variant: "purple",
      style: { padding: "8px 20px", fontSize: 13 }
    },
    hpT(HP.hero.cta1)
  ), isMobile && /* @__PURE__ */ React.createElement("button", { onClick: () => setMobileOpen(!mobileOpen), style: {
    background: "none",
    border: "none",
    cursor: "pointer",
    width: 28,
    height: 20,
    position: "relative",
    gridColumn: "3"
  } }, [0, 9, 18].map((top, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: {
    position: "absolute",
    left: 0,
    width: "100%",
    height: 2,
    background: C.deepPurple,
    borderRadius: 2,
    top,
    transform: mobileOpen && i === 0 ? "rotate(45deg) translateY(9px)" : mobileOpen && i === 1 ? "scaleX(0)" : mobileOpen && i === 2 ? "rotate(-45deg) translateY(-9px)" : "none",
    opacity: mobileOpen && i === 1 ? 0 : 1,
    transition: "all 0.3s"
  } })))), isMobile && mobileOpen && /* @__PURE__ */ React.createElement("div", { style: {
    position: "fixed",
    inset: 0,
    background: C.cream,
    zIndex: 99,
    display: "flex",
    flexDirection: "column",
    padding: "100px 32px 40px",
    overflowY: "auto",
    gap: 0
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: C.purple,
    fontFamily: F.body,
    marginBottom: 10
  } }, lang === "he" ? "\u05E9\u05D9\u05E8\u05D5\u05EA\u05D9\u05DD" : "Services"), services.map((svc, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { borderBottom: `1px solid rgba(113,46,172,0.07)` } }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: svc.href,
      onClick: () => setMobileOpen(false),
      style: {
        display: "block",
        fontSize: 18,
        color: C.deepPurple,
        textDecoration: "none",
        fontFamily: F.body,
        padding: "12px 0",
        fontWeight: svc.sub ? 600 : 400
      }
    },
    lang === "he" ? svc.he : svc.en
  ), svc.sub && svc.sub.map((sub, j) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: j,
      href: sub.href,
      onClick: () => setMobileOpen(false),
      style: {
        display: "block",
        fontSize: 15,
        color: C.purple,
        textDecoration: "none",
        fontFamily: F.body,
        padding: "8px 0",
        paddingLeft: dir === "ltr" ? 16 : 0,
        paddingRight: dir === "rtl" ? 16 : 0
      }
    },
    lang === "he" ? sub.he : sub.en
  )))), [
    { en: "About", he: "\u05E2\u05DC\u05D9\u05D9", href: "#about" },
    { en: "Blog", he: "\u05D1\u05DC\u05D5\u05D2", href: "/blog" },
    { en: "Contact", he: "\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8", href: "#contact" }
  ].map((item, i) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: i,
      href: item.href,
      onClick: () => setMobileOpen(false),
      style: {
        display: "block",
        fontSize: 18,
        color: C.deepPurple,
        textDecoration: "none",
        fontFamily: F.body,
        padding: "14px 0",
        borderBottom: `1px solid rgba(113,46,172,0.07)`
      }
    },
    lang === "he" ? item.he : item.en
  )), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://octagoodies.com",
      target: "_blank",
      onClick: () => setMobileOpen(false),
      style: {
        fontSize: 18,
        color: C.deepPurple,
        textDecoration: "none",
        fontFamily: F.body,
        padding: "14px 0",
        borderBottom: `1px solid rgba(113,46,172,0.07)`
      }
    },
    "Goodies"
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 28 } }, ["en", "he"].map((l) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: l,
      onClick: () => {
        setLang(l);
        setMobileOpen(false);
      },
      style: {
        background: lang === l ? C.purple : "transparent",
        color: lang === l ? "white" : C.textDim,
        border: `1px solid ${lang === l ? C.purple : C.textDim}`,
        borderRadius: 6,
        padding: "8px 16px",
        cursor: "pointer",
        fontFamily: F.body,
        fontWeight: 700
      }
    },
    l === "en" ? "EN" : "\u05E2\u05D1\u05E8\u05D9\u05EA"
  ))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16 } }, /* @__PURE__ */ React.createElement(Btn, { href: "https://calendar.notion.so/meet/octaloom/discovery", variant: "purple" }, hpT(HP.hero.cta1)))));
}
function HPMarquee() {
  const { lang } = useLang();
  const items = lang === "he" ? HP.marquee.he : HP.marquee.en;
  const doubled = [...items, ...items, ...items, ...items];
  return /* @__PURE__ */ React.createElement("div", { style: {
    overflow: "hidden",
    borderTop: "1px solid rgba(113,46,172,0.1)",
    borderBottom: "1px solid rgba(113,46,172,0.1)",
    padding: "14px 0",
    background: C.purple,
    marginTop: 60
  } }, /* @__PURE__ */ React.createElement(
    motion.div,
    {
      style: { display: "flex", whiteSpace: "nowrap", willChange: "transform" },
      animate: { x: ["0%", "-50%"] },
      transition: { duration: 25, ease: "linear", repeat: Infinity }
    },
    doubled.map((item, i) => /* @__PURE__ */ React.createElement(React.Fragment, { key: i }, /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.85)",
      padding: "0 20px",
      fontFamily: F.body
    } }, item), /* @__PURE__ */ React.createElement("span", { style: { color: "rgba(255,255,255,0.4)", fontSize: 10 } }, "\u2726")))
  ));
}
function HPHero() {
  const { lang } = useLang();
  const dir = lang === "he" ? "rtl" : "ltr";
  const w = useWindowSize();
  const isMobile = w < 768;
  const avatarUrls = [
    "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/avatar1..jpeg",
    "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/avatar2.jpeg",
    "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/avatar3.jpeg",
    "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/avatar4.jpeg",
    "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/avatar5.jpeg"
  ];
  return /* @__PURE__ */ React.createElement("section", { dir, style: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 100,
    overflow: "hidden",
    background: C.cream
  } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background: C.purple,
    filter: "blur(120px)",
    opacity: 0.12,
    top: "-10%",
    right: "10%"
  } }), /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: C.lime,
    filter: "blur(120px)",
    opacity: 0.08,
    bottom: "5%",
    left: "-5%"
  } }), /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    inset: 0,
    backgroundImage: "linear-gradient(rgba(113,46,172,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(113,46,172,0.03) 1px,transparent 1px)",
    backgroundSize: "60px 60px",
    WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%,black 20%,transparent 70%)",
    maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%,black 20%,transparent 70%)"
  } })), /* @__PURE__ */ React.createElement(Container, { style: { position: "relative", zIndex: 2 } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: 48,
    alignItems: "center"
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } }, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("span", { style: {
    display: "inline-flex",
    alignSelf: "flex-start",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: C.purple,
    padding: "6px 16px",
    borderRadius: 20,
    border: `1px solid rgba(113,46,172,0.2)`,
    background: "rgba(113,46,172,0.06)",
    fontFamily: F.body
  } }, hpT(HP.hero.pill))), /* @__PURE__ */ React.createElement(Reveal, { delay: 100 }, /* @__PURE__ */ React.createElement("h1", { style: {
    fontFamily: F.display,
    fontWeight: 700,
    fontSize: "clamp(34px,5vw,60px)",
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    color: C.deepPurple,
    whiteSpace: "pre-line",
    margin: 0
  } }, hpT(HP.hero.h1).split("\n").map((line, i) => {
    const isLast = i === hpT(HP.hero.h1).split("\n").length - 1;
    return /* @__PURE__ */ React.createElement("span", { key: i, style: {
      display: "block",
      color: line.includes("\u05DE\u05D7\u05DC\u05E7\u05D4") || line.includes("department") ? C.purple : C.deepPurple
    } }, line);
  }))), /* @__PURE__ */ React.createElement(Reveal, { delay: 200 }, /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 17,
    color: C.textDim,
    maxWidth: 480,
    lineHeight: 1.65,
    margin: 0,
    fontFamily: F.body
  } }, hpT(HP.hero.sub))), /* @__PURE__ */ React.createElement(Reveal, { delay: 300 }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    flexDirection: isMobile ? "column" : "row"
  } }, /* @__PURE__ */ React.createElement(Btn, { href: "https://calendar.notion.so/meet/octaloom/discovery", variant: "purple" }, hpT(HP.hero.cta1), /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M3 8h10M9 4l4 4-4 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }))), /* @__PURE__ */ React.createElement(Btn, { href: "#services", variant: "ghost" }, hpT(HP.hero.cta2)))), /* @__PURE__ */ React.createElement(Reveal, { delay: 400 }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginTop: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex" } }, avatarUrls.map((src, i) => /* @__PURE__ */ React.createElement(
    "img",
    {
      key: i,
      src,
      alt: "",
      style: {
        width: 34,
        height: 34,
        borderRadius: "50%",
        border: `2px solid ${C.cream}`,
        marginInlineStart: i === 0 ? 0 : -8,
        objectFit: "cover",
        display: "block"
      }
    }
  ))), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: C.textDim, lineHeight: 1.4, fontFamily: F.body } }, hpT(HP.hero.trustTop))))), !isMobile && /* @__PURE__ */ React.createElement(Reveal, { delay: 200 }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { style: {
    position: "relative",
    width: "100%",
    maxWidth: 520,
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: `0 8px 40px rgba(32,30,75,0.15),0 0 0 1px rgba(113,46,172,0.1)`
  } }, /* @__PURE__ */ React.createElement(
    "video",
    {
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      src: "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/hero-video.mp4",
      style: {
        width: "100%",
        display: "block",
        aspectRatio: "16/9",
        objectFit: "cover",
        background: "rgba(113,46,172,0.04)"
      }
    }
  )))))), /* @__PURE__ */ React.createElement(HPMarquee, null));
}
function HPProblem() {
  const w = useWindowSize();
  const isMobile = w < 768;
  return /* @__PURE__ */ React.createElement(Sec, { bg: C.cream }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("h2", { style: {
    fontFamily: F.display,
    fontWeight: 500,
    fontSize: "clamp(28px,4vw,48px)",
    lineHeight: 1.15,
    letterSpacing: "-0.015em",
    color: C.deepPurple,
    marginBottom: 48
  } }, hpT(HP.problem.title))), /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
    gap: 20,
    marginBottom: 48
  } }, HP.problem.cards.map((c, i) => /* @__PURE__ */ React.createElement(Reveal, { key: i, delay: i * 150 }, /* @__PURE__ */ React.createElement("div", { style: {
    background: "white",
    border: "1px solid rgba(32,30,75,0.06)",
    borderRadius: 12,
    padding: "32px 28px",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 8,
    background: C.redX,
    color: C.redXText,
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 16,
    fontFamily: F.body
  } }, "\u2715"), /* @__PURE__ */ React.createElement("h3", { style: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8,
    color: C.deepPurple,
    margin: "0 0 8px",
    fontFamily: F.body
  } }, hpT(c.label)), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 14,
    color: C.textDim,
    lineHeight: 1.6,
    margin: 0,
    fontFamily: F.body
  } }, hpT(c.sub)))))), /* @__PURE__ */ React.createElement(Reveal, { delay: 500 }, /* @__PURE__ */ React.createElement("p", { style: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: 700,
    color: C.textDim,
    letterSpacing: "0.02em",
    margin: 0,
    fontFamily: F.body
  } }, hpT(HP.problem.none)))));
}
function HPFourthOption() {
  return /* @__PURE__ */ React.createElement(Sec, { bg: C.purple }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 760, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("p", { style: {
    fontFamily: F.display,
    fontWeight: 500,
    fontSize: "clamp(28px,4vw,44px)",
    color: C.lime,
    marginBottom: 28,
    textAlign: "center"
  } }, hpT(HP.fourthOption.but))), /* @__PURE__ */ React.createElement(Reveal, { delay: 150 }, /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 17,
    lineHeight: 1.75,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 20,
    fontFamily: F.body
  } }, hpT(HP.fourthOption.desc))), /* @__PURE__ */ React.createElement(Reveal, { delay: 250 }, /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 18,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.95)",
    fontWeight: 600,
    marginBottom: 32,
    fontFamily: F.body
  } }, hpT(HP.fourthOption.value))), /* @__PURE__ */ React.createElement(Reveal, { delay: 350 }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement(Btn, { href: "https://calendar.notion.so/meet/octaloom/discovery", variant: "white" }, hpT(HP.fourthOption.cta), /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M3 8h10M9 4l4 4-4 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }))))))));
}
function HPServices() {
  const { lang } = useLang();
  const [torn, setTorn] = useState({});
  const [tearing, setTearing] = useState(null);
  const angle = useMotionValue(0);
  const holoBg = useTransform(
    angle,
    (v) => `conic-gradient(from ${v}deg, rgba(198,225,165,.85) 0%, rgba(113,46,172,.65) 15%, rgba(236,233,231,.4) 30%, rgba(198,225,165,.45) 45%, rgba(113,46,172,.85) 60%, rgba(198,225,165,.65) 75%, rgba(113,46,172,.45) 90%, rgba(198,225,165,.85) 100%)`
  );
  useEffect(() => {
    const ctrl = fmAnimate(angle, 360, { duration: 4, repeat: Infinity, ease: "linear" });
    return () => ctrl.stop();
  }, []);
  const serviceUrls = {
    en: {
      0: "/linkedin-for-organizations",
      1: "/linkedin-for-executives",
      2: "/linkedin-for-solopreneurs",
      3: "/fractional-cmo",
      4: "/ai-tools-agents"
    },
    he: {
      0: "/linkedin-for-organizations-he",
      1: "/linkedin-for-executives-he",
      2: "/linkedin-for-solopreneurs-he",
      3: "/fractional-cmo-he",
      4: "/ai-tools-agents-he"
    }
  };
  const stripIcons = [
    /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 44 44", fill: "none", style: { width: 44, height: 44 } }, /* @__PURE__ */ React.createElement("circle", { cx: "22", cy: "8", r: "3.5", stroke: C.purple, strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "24", r: "3", stroke: C.purple, strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement("circle", { cx: "32", cy: "24", r: "3", stroke: C.purple, strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement("circle", { cx: "8", cy: "38", r: "2", fill: C.purple, fillOpacity: ".35", stroke: C.purple, strokeWidth: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "18", cy: "38", r: "2", fill: C.purple, fillOpacity: ".35", stroke: C.purple, strokeWidth: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "36", cy: "38", r: "2", fill: C.purple, fillOpacity: ".35", stroke: C.purple, strokeWidth: "1" }), /* @__PURE__ */ React.createElement("line", { x1: "22", y1: "11.5", x2: "22", y2: "19", stroke: C.purple, strokeWidth: "1.2", strokeDasharray: "2 2" }), /* @__PURE__ */ React.createElement("line", { x1: "22", y1: "19", x2: "12", y2: "21", stroke: C.purple, strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement("line", { x1: "22", y1: "19", x2: "32", y2: "21", stroke: C.purple, strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "27", x2: "8", y2: "36", stroke: C.purple, strokeWidth: ".9", strokeDasharray: "2 2" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "27", x2: "18", y2: "36", stroke: C.purple, strokeWidth: ".9", strokeDasharray: "2 2" }), /* @__PURE__ */ React.createElement("line", { x1: "32", y1: "27", x2: "36", y2: "36", stroke: C.purple, strokeWidth: ".9", strokeDasharray: "2 2" })),
    /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 44 44", fill: "none", style: { width: 44, height: 44 } }, /* @__PURE__ */ React.createElement("text", { x: "22", y: "5", fontFamily: "'Aeonik', sans-serif", fontWeight: "700", fontSize: "6", fill: C.purple, textAnchor: "middle", letterSpacing: "0.4" }, "CEO &"), /* @__PURE__ */ React.createElement("text", { x: "22", y: "12", fontFamily: "'Aeonik', sans-serif", fontWeight: "700", fontSize: "6", fill: C.purple, textAnchor: "middle", letterSpacing: "0.4" }, "FOUNDER"), /* @__PURE__ */ React.createElement("circle", { cx: "18", cy: "21", r: "4", stroke: C.purple, strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement("path", { d: "M11 39 Q11 29 18 29 Q25 29 26 33", stroke: C.purple, strokeWidth: "1.2", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("path", { d: "M31 25 L31 22.5 Q31 21 34 21 Q37 21 37 22.5 L37 25", stroke: C.purple, strokeWidth: "1.1", strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ React.createElement("rect", { x: "28", y: "25", width: "13", height: "9", rx: "1.5", stroke: C.purple, strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement("line", { x1: "34.5", y1: "25", x2: "34.5", y2: "34", stroke: C.purple, strokeWidth: ".8", opacity: ".45" })),
    /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 44 44", fill: "none", style: { width: 44, height: 44 } }, /* @__PURE__ */ React.createElement("text", { x: "22", y: "7", fontFamily: "'Aeonik', sans-serif", fontWeight: "700", fontSize: "6.5", fill: C.purple, textAnchor: "middle", letterSpacing: "0.3" }, "Biz Owner"), /* @__PURE__ */ React.createElement("circle", { cx: "13", cy: "17", r: "3.5", stroke: C.purple, strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement("path", { d: "M7 33 Q7 25 13 25 Q19 25 20 29", stroke: C.purple, strokeWidth: "1.2", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("rect", { x: "25", y: "21", width: "16", height: "11", rx: "1", stroke: C.purple, strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement("line", { x1: "27", y1: "24", x2: "39", y2: "24", stroke: C.purple, strokeWidth: ".7", opacity: ".4" }), /* @__PURE__ */ React.createElement("line", { x1: "27", y1: "27", x2: "37", y2: "27", stroke: C.purple, strokeWidth: ".7", opacity: ".4" }), /* @__PURE__ */ React.createElement("line", { x1: "27", y1: "30", x2: "33", y2: "30", stroke: C.purple, strokeWidth: ".7", opacity: ".4" }), /* @__PURE__ */ React.createElement("path", { d: "M24 32 L41 32 L39.5 36 L25.5 36 Z", stroke: C.purple, strokeWidth: "1", strokeLinejoin: "round" })),
    /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 44 44", fill: "none", style: { width: 44, height: 44 } }, /* @__PURE__ */ React.createElement("circle", { cx: "22", cy: "22", r: "18", stroke: C.purple, strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement("circle", { cx: "22", cy: "22", r: "11", stroke: C.purple, strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement("circle", { cx: "22", cy: "22", r: "5", stroke: C.purple, strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement("circle", { cx: "22", cy: "22", r: "1.8", fill: C.purple }), /* @__PURE__ */ React.createElement("line", { x1: "22", y1: "2", x2: "22", y2: "7", stroke: C.purple, strokeWidth: "1.2", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("line", { x1: "22", y1: "37", x2: "22", y2: "42", stroke: C.purple, strokeWidth: "1.2", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("line", { x1: "2", y1: "22", x2: "7", y2: "22", stroke: C.purple, strokeWidth: "1.2", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("line", { x1: "37", y1: "22", x2: "42", y2: "22", stroke: C.purple, strokeWidth: "1.2", strokeLinecap: "round" })),
    /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 44 44", fill: "none", style: { width: 44, height: 44 } }, /* @__PURE__ */ React.createElement("rect", { x: "16", y: "16", width: "12", height: "12", rx: "2", fill: C.purple, fillOpacity: ".07", stroke: C.purple, strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement("line", { x1: "10", y1: "19.5", x2: "16", y2: "19.5", stroke: C.purple, strokeWidth: "1", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("line", { x1: "10", y1: "24.5", x2: "16", y2: "24.5", stroke: C.purple, strokeWidth: "1", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("line", { x1: "28", y1: "19.5", x2: "34", y2: "19.5", stroke: C.purple, strokeWidth: "1", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("line", { x1: "28", y1: "24.5", x2: "34", y2: "24.5", stroke: C.purple, strokeWidth: "1", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("circle", { cx: "22", cy: "22", r: "2", fill: C.purple }), /* @__PURE__ */ React.createElement("circle", { cx: "22", cy: "5", r: "2", stroke: C.purple, strokeWidth: "1.1" }), /* @__PURE__ */ React.createElement("path", { d: "M19.5 10 Q19.5 8.5 22 8.5 Q24.5 8.5 24.5 10", stroke: C.purple, strokeWidth: "1.1", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("line", { x1: "22", y1: "10", x2: "22", y2: "16", stroke: C.purple, strokeWidth: "1", strokeLinecap: "round", opacity: ".5" }), /* @__PURE__ */ React.createElement("circle", { cx: "8", cy: "37", r: "2", stroke: C.purple, strokeWidth: "1.1" }), /* @__PURE__ */ React.createElement("path", { d: "M5.5 42 Q5.5 40.5 8 40.5 Q10.5 40.5 10.5 42", stroke: C.purple, strokeWidth: "1.1", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("line", { x1: "10.5", y1: "39", x2: "16", y2: "28", stroke: C.purple, strokeWidth: "1", strokeLinecap: "round", opacity: ".5" }), /* @__PURE__ */ React.createElement("circle", { cx: "36", cy: "37", r: "2", stroke: C.purple, strokeWidth: "1.1" }), /* @__PURE__ */ React.createElement("path", { d: "M33.5 42 Q33.5 40.5 36 40.5 Q38.5 40.5 38.5 42", stroke: C.purple, strokeWidth: "1.1", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("line", { x1: "33.5", y1: "39", x2: "28", y2: "28", stroke: C.purple, strokeWidth: "1", strokeLinecap: "round", opacity: ".5" }))
  ];
  const handleTear = (i) => {
    if (torn[i] || tearing !== null) return;
    setTearing(i);
    setTimeout(() => {
      setTearing(null);
      setTorn((prev) => ({ ...prev, [i]: true }));
      const urls = serviceUrls[lang] || serviceUrls.en;
      window.location.href = urls[i] || "/";
    }, 600);
  };
  return /* @__PURE__ */ React.createElement(Sec, { bg: C.cream, id: "services" }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("h2", { style: {
    fontFamily: F.display,
    fontWeight: 500,
    fontSize: "clamp(28px,4vw,48px)",
    lineHeight: 1.15,
    color: C.deepPurple,
    marginBottom: 48
  } }, hpT(HP.services.title))), /* @__PURE__ */ React.createElement(Reveal, { delay: 200 }, /* @__PURE__ */ React.createElement(motion.div, { style: {
    background: holoBg,
    padding: 3,
    borderRadius: 4,
    maxWidth: 860,
    margin: "0 auto",
    position: "relative",
    boxShadow: "0 0 18px rgba(198,225,165,.2), 0 0 36px rgba(113,46,172,.15), 0 12px 48px rgba(32,30,75,.12)"
  } }, [{ left: 56 }, { left: "50%", transform: "translateX(-50%)" }, { right: 56 }].map((pos, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    position: "absolute",
    top: -9,
    zIndex: 30,
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "radial-gradient(circle at 38% 32%, #fdf0b0 0%, #d49a0e 35%, #8b6200 70%, #4a3000 100%)",
    boxShadow: "0 3px 8px rgba(0,0,0,.5), 0 1px 3px rgba(0,0,0,.3), inset 0 1px 3px rgba(255,240,160,.7)",
    ...pos
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    inset: "22%",
    borderRadius: "50%",
    background: "radial-gradient(circle at 35% 28%, rgba(255,255,255,.92) 0%, rgba(255,255,255,.3) 50%, transparent 70%)"
  } }))), /* @__PURE__ */ React.createElement("div", { style: {
    background: "#f4f1ec",
    borderRadius: 1,
    transform: "rotate(-0.4deg)",
    boxShadow: "0 2px 4px rgba(0,0,0,.06), 0 6px 20px rgba(32,30,75,.1)",
    position: "relative",
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='0.055'/%3E%3C/svg%3E")`
  } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "52px 32px 0", position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("p", { style: {
    fontFamily: F.display,
    fontWeight: 500,
    fontSize: "clamp(40px,7vw,72px)",
    lineHeight: 1.05,
    color: C.deepPurple,
    textAlign: "center",
    letterSpacing: "-0.02em",
    marginBottom: 44,
    whiteSpace: "pre-line"
  } }, lang === "he" ? "\u05E7\u05D7\u05D5 \u05DE\u05D4\n\u05E9\u05D0\u05EA\u05DD \u05E6\u05E8\u05D9\u05DB\u05D9\u05DD" : "TAKE WHAT\nYOU NEED"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", marginBottom: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, borderTop: `2px dashed rgba(113,46,172,.6)` } }), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 11,
    letterSpacing: "0.18em",
    fontWeight: 500,
    color: C.purple,
    fontFamily: F.display,
    padding: "0 12px",
    whiteSpace: "nowrap",
    opacity: 0.7
  } }, lang === "he" ? "\u05E7\u05E8\u05E2\u05D5 \u05DB\u05D0\u05DF" : "TEAR HERE"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, borderTop: `2px dashed rgba(113,46,172,.6)` } }), /* @__PURE__ */ React.createElement("span", { style: {
    padding: "0 10px",
    color: C.purple,
    fontSize: 16,
    opacity: 0.5,
    transform: "scaleX(-1)",
    display: "inline-block"
  } }, "\\u2702")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex" } }, HP.services.strips.map((strip, i) => /* @__PURE__ */ React.createElement(
    motion.div,
    {
      key: i,
      animate: tearing === i ? { y: 60, rotate: -8, opacity: 0 } : torn[i] ? { opacity: 0.25 } : { y: 0, rotate: 0, opacity: 1 },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      onClick: () => handleTear(i),
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "24px 8px 28px",
        cursor: torn[i] ? "default" : "pointer",
        textAlign: "center",
        minHeight: 188,
        position: "relative",
        borderLeft: i < HP.services.strips.length - 1 ? `1.5px dashed rgba(113,46,172,.22)` : "none"
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      top: -6,
      left: "50%",
      transform: "translateX(-50%)",
      width: 12,
      height: 12,
      borderRadius: "50%",
      background: "#ece9e7",
      boxShadow: "inset 0 0 0 1.5px rgba(113,46,172,.3), 0 1px 3px rgba(0,0,0,.1)"
    } }),
    /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.purple,
      lineHeight: 1.4,
      marginBottom: i < 3 ? 6 : 12,
      fontFamily: F.body,
      textDecoration: torn[i] ? "line-through" : "none"
    } }, hpT(strip.label)),
    i < 3 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 20 20", fill: "none", style: { width: 20, height: 20 } }, /* @__PURE__ */ React.createElement("rect", { width: "20", height: "20", rx: "3.5", fill: C.purple, fillOpacity: ".1", stroke: C.purple, strokeWidth: ".9" }), /* @__PURE__ */ React.createElement("path", { d: "M7 9.5v5.5", stroke: C.purple, strokeWidth: "1.4", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("circle", { cx: "7", cy: "7.2", r: "1", fill: C.purple }), /* @__PURE__ */ React.createElement("path", { d: "M10.5 15V12q0-2.5 2.5-2.5t2.5 2.5v3", stroke: C.purple, strokeWidth: "1.4", strokeLinecap: "round", strokeLinejoin: "round" }))),
    /* @__PURE__ */ React.createElement("div", { style: { marginTop: "auto", opacity: 0.6 } }, stripIcons[i])
  )))))))));
}
function HPProcess() {
  const w = useWindowSize();
  const isMobile = w < 768;
  return /* @__PURE__ */ React.createElement(Sec, { bg: C.purple, id: "process" }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("h2", { style: {
    fontFamily: F.display,
    fontWeight: 500,
    fontSize: "clamp(28px,4vw,48px)",
    lineHeight: 1.15,
    color: "white",
    textAlign: "center",
    marginBottom: 48
  } }, hpT(HP.process.title))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 20 } }, HP.process.steps.map((step, i) => /* @__PURE__ */ React.createElement(Reveal, { key: i, delay: i * 150 }, /* @__PURE__ */ React.createElement("div", { style: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: "32px 28px",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: "rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: 700,
    color: C.lime,
    marginBottom: 20,
    fontFamily: F.display
  } }, i + 1), /* @__PURE__ */ React.createElement("h3", { style: {
    fontSize: 18,
    fontWeight: 700,
    color: "white",
    marginBottom: 12,
    fontFamily: F.body
  } }, hpT(step.title)), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 1.65,
    margin: 0,
    fontFamily: F.body
  } }, hpT(step.desc))))))));
}
function HPTestimonials() {
  const items = HP.testimonials.items;
  const [cur, setCur] = useState(0);
  const timer = useRef();
  const goTo = (idx) => {
    setCur(idx);
    clearInterval(timer.current);
    timer.current = setInterval(() => setCur((p) => (p + 1) % items.length), 5e3);
  };
  useEffect(() => {
    timer.current = setInterval(() => setCur((p) => (p + 1) % items.length), 5e3);
    return () => clearInterval(timer.current);
  }, []);
  return /* @__PURE__ */ React.createElement(Sec, { bg: C.cream }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("h2", { style: {
    fontFamily: F.display,
    fontWeight: 500,
    fontSize: "clamp(28px,4vw,48px)",
    lineHeight: 1.15,
    color: C.deepPurple,
    marginBottom: 48
  } }, hpT(HP.testimonials.title))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement(
    motion.div,
    {
      animate: { x: `-${cur * 100}%` },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      style: { display: "flex" }
    },
    items.map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
      minWidth: "100%",
      padding: "0 4px",
      display: "flex",
      justifyContent: "center"
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      maxWidth: 680,
      width: "100%",
      background: "white",
      border: "1px solid rgba(32,30,75,0.06)",
      borderRadius: 12,
      padding: 28
    } }, /* @__PURE__ */ React.createElement("p", { style: {
      fontSize: 14,
      lineHeight: 1.7,
      color: C.deepPurple,
      marginBottom: 20,
      fontStyle: "italic",
      margin: "0 0 20px",
      fontFamily: F.body
    } }, hpT(item.quote)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: `linear-gradient(135deg,${C.purple},#9b59b6)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      fontWeight: 700,
      color: "white",
      flexShrink: 0,
      fontFamily: F.body
    } }, hpT(item.author).charAt(0)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: {
      fontSize: 14,
      color: C.deepPurple,
      display: "block",
      fontFamily: F.body
    } }, hpT(item.author)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: C.textDim, fontFamily: F.body } }, hpT(item.role)))))))
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", gap: 8, marginTop: 24 } }, items.map((_, i) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: i,
      onClick: () => goTo(i),
      style: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        padding: 0,
        background: i === cur ? C.purple : "rgba(113,46,172,0.15)",
        transform: i === cur ? "scale(1.2)" : "scale(1)",
        transition: "all 0.3s"
      }
    }
  ))))));
}
function HPCaseStudy() {
  const w = useWindowSize();
  const isMobile = w < 768;
  return /* @__PURE__ */ React.createElement(Sec, { bg: C.cream, id: "case" }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("div", { style: {
    background: "white",
    borderRadius: 16,
    padding: isMobile ? 24 : "clamp(32px,5vw,56px)",
    boxShadow: "0 4px 32px rgba(0,0,0,0.06)"
  } }, /* @__PURE__ */ React.createElement("h2", { style: {
    fontFamily: F.display,
    fontWeight: 500,
    fontSize: "clamp(22px,3vw,32px)",
    lineHeight: 1.2,
    color: C.deepPurple,
    marginBottom: 24
  } }, hpT(HP.caseStudy.headline)), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 18,
    fontStyle: "italic",
    color: C.purple,
    lineHeight: 1.6,
    marginBottom: 8,
    fontWeight: 600,
    fontFamily: F.body
  } }, hpT(HP.caseStudy.quote)), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 14,
    color: C.deepPurple,
    opacity: 0.6,
    marginBottom: 32,
    fontFamily: F.body
  } }, hpT(HP.caseStudy.quoteAuthor)), [
    [HP.caseStudy.startTitle, HP.caseStudy.startText]
  ].map(([title, text], i) => /* @__PURE__ */ React.createElement("div", { key: i }, /* @__PURE__ */ React.createElement("h4", { style: {
    fontSize: 16,
    fontWeight: 700,
    color: C.deepPurple,
    marginBottom: 12,
    marginTop: 28,
    fontFamily: F.body
  } }, hpT(title)), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 15,
    lineHeight: 1.7,
    color: C.deepPurple,
    opacity: 0.75,
    marginBottom: 16,
    fontFamily: F.body
  } }, hpT(text)))), /* @__PURE__ */ React.createElement("h4", { style: {
    fontSize: 16,
    fontWeight: 700,
    color: C.deepPurple,
    marginBottom: 12,
    marginTop: 28,
    fontFamily: F.body
  } }, hpT(HP.caseStudy.whatTitle)), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 15,
    lineHeight: 1.7,
    color: C.deepPurple,
    opacity: 0.75,
    marginBottom: 16,
    fontFamily: F.body,
    whiteSpace: "pre-line"
  } }, hpT(HP.caseStudy.whatText)), /* @__PURE__ */ React.createElement("ul", { style: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 20,
    padding: 0
  } }, hpT(HP.caseStudy.channels).map((ch, i) => /* @__PURE__ */ React.createElement("li", { key: i, style: {
    display: "flex",
    gap: 10,
    fontSize: 14,
    lineHeight: 1.6,
    color: C.deepPurple,
    opacity: 0.8,
    fontFamily: F.body
  } }, /* @__PURE__ */ React.createElement("span", { style: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: C.purple,
    flexShrink: 0,
    marginTop: 8
  } }), ch))), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 15,
    lineHeight: 1.7,
    color: C.deepPurple,
    opacity: 0.75,
    marginBottom: 16,
    fontFamily: F.body
  } }, hpT(HP.caseStudy.summary)), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 15,
    lineHeight: 1.7,
    color: C.deepPurple,
    fontWeight: 600,
    marginBottom: 16,
    fontFamily: F.body
  } }, hpT(HP.caseStudy.agentLine)), /* @__PURE__ */ React.createElement("h4", { style: {
    fontSize: 16,
    fontWeight: 700,
    color: C.deepPurple,
    marginBottom: 12,
    marginTop: 28,
    fontFamily: F.body
  } }, hpT(HP.caseStudy.resultsTitle)), /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
    gap: 16,
    margin: "28px 0"
  } }, HP.caseStudy.results.map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    textAlign: "center",
    padding: "20px 12px",
    background: "rgba(113,46,172,0.04)",
    borderRadius: 12
  } }, /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: "clamp(28px,3.5vw,40px)",
    fontWeight: 700,
    color: C.purple,
    display: "block",
    marginBottom: 6,
    fontFamily: F.body
  } }, /* @__PURE__ */ React.createElement(AnimatedNum, { value: r.num })), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 13,
    color: C.deepPurple,
    opacity: 0.65,
    lineHeight: 1.4,
    fontFamily: F.body
  } }, hpT(r.label))))), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 14,
    color: C.purple,
    fontWeight: 600,
    marginBottom: 28,
    fontFamily: F.body
  } }, hpT(HP.caseStudy.inbound)), /* @__PURE__ */ React.createElement("div", { style: {
    textAlign: "center",
    marginTop: 32,
    paddingTop: 24,
    borderTop: "1px solid rgba(0,0,0,0.06)"
  } }, /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 18,
    fontWeight: 700,
    color: C.deepPurple,
    marginBottom: 16,
    fontFamily: F.body
  } }, hpT(HP.caseStudy.bottomCta)), /* @__PURE__ */ React.createElement(Btn, { href: "https://calendar.notion.so/meet/octaloom/discovery", variant: "purple" }, hpT(HP.caseStudy.cta), /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M3 8h10M9 4l4 4-4 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }))))))));
}
function HPAbout() {
  const { lang } = useLang();
  const w = useWindowSize();
  const isMobile = w < 768;
  return /* @__PURE__ */ React.createElement(Sec, { bg: C.cream, id: "about" }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "220px 1fr",
    gap: 48,
    alignItems: "start"
  } }, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: isMobile ? "center" : "flex-start" } }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Headshot-1.png",
      alt: "Hanita Yudovski",
      style: {
        width: 180,
        height: 180,
        borderRadius: "50%",
        objectFit: "cover",
        border: `3px solid ${C.purple}`
      }
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Reveal, { delay: 100 }, /* @__PURE__ */ React.createElement("h2", { style: {
    fontFamily: F.display,
    fontWeight: 500,
    fontSize: "clamp(28px,4vw,48px)",
    lineHeight: 1.15,
    color: C.deepPurple,
    marginBottom: 24
  } }, hpT(HP.about.title))), /* @__PURE__ */ React.createElement(Reveal, { delay: 200 }, /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 16,
    lineHeight: 1.75,
    color: C.deepPurple,
    opacity: 0.75,
    marginBottom: 24,
    fontFamily: F.body
  } }, hpT(HP.about.text))), /* @__PURE__ */ React.createElement(Reveal, { delay: 300 }, /* @__PURE__ */ React.createElement(Btn, { href: "https://www.linkedin.com/in/hanita-yudovski/", variant: "purple" }, lang === "he" ? /* @__PURE__ */ React.createElement(React.Fragment, null, hpT(HP.about.cta), " ", /* @__PURE__ */ React.createElement(LiIcon, { size: 16 })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(LiIcon, { size: 16 }), " ", hpT(HP.about.cta))))))));
}
function HPFAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  return /* @__PURE__ */ React.createElement(Sec, { bg: C.deepPurple, id: "faq" }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("h2", { style: {
    fontFamily: F.display,
    fontWeight: 500,
    fontSize: "clamp(28px,4vw,48px)",
    lineHeight: 1.15,
    color: "white",
    marginBottom: 48
  } }, hpT(HP.faq.title))), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { maxWidth: 720, display: "flex", flexDirection: "column", gap: 2 },
      itemScope: true,
      itemType: "https://schema.org/FAQPage"
    },
    HP.faq.items.map((item, i) => /* @__PURE__ */ React.createElement(Reveal, { key: i, delay: i * 80 }, /* @__PURE__ */ React.createElement(
      "div",
      {
        itemScope: true,
        itemProp: "mainEntity",
        itemType: "https://schema.org/Question",
        style: {
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          cursor: "pointer",
          overflow: "hidden"
        },
        onClick: () => setOpenIdx(openIdx === i ? null : i)
      },
      /* @__PURE__ */ React.createElement("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 0",
        gap: 16
      } }, /* @__PURE__ */ React.createElement("h3", { itemProp: "name", style: {
        fontSize: 17,
        fontWeight: 700,
        color: "white",
        margin: 0,
        fontFamily: F.body
      } }, hpT(item.q)), /* @__PURE__ */ React.createElement(
        motion.span,
        {
          animate: { rotate: openIdx === i ? 180 : 0 },
          style: {
            fontSize: 22,
            color: C.lime,
            flexShrink: 0,
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: F.body
          }
        },
        openIdx === i ? "\u2212" : "+"
      )),
      /* @__PURE__ */ React.createElement(
        motion.div,
        {
          itemScope: true,
          itemProp: "acceptedAnswer",
          itemType: "https://schema.org/Answer",
          animate: { height: openIdx === i ? "auto" : 0, opacity: openIdx === i ? 1 : 0 },
          transition: { duration: 0.4 },
          style: { overflow: "hidden" }
        },
        /* @__PURE__ */ React.createElement("p", { itemProp: "text", style: {
          fontSize: 15,
          color: "rgba(255,255,255,0.7)",
          lineHeight: 1.7,
          paddingBottom: 20,
          margin: 0,
          fontFamily: F.body
        } }, hpT(item.a))
      )
    )))
  )));
}
function HPBookCall() {
  const w = useWindowSize();
  const isMobile = w < 768;
  return /* @__PURE__ */ React.createElement("section", { style: { background: C.lime, padding: "clamp(48px,6vw,80px) 0 clamp(32px,5vw,60px)" } }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", maxWidth: 800, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    marginBottom: 20,
    fontSize: 15,
    color: C.deepPurple,
    fontWeight: 600,
    fontFamily: F.body,
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 8 : 24
  } }, /* @__PURE__ */ React.createElement("span", null, "\u2460", " ", hpT({ en: "Not sure where to start?", he: "\u05D9\u05D5\u05EA\u05E8 \u05DE\u05D9\u05D3\u05D9 \u05D0\u05D5\u05E4\u05E6\u05D9\u05D5\u05EA?" })), /* @__PURE__ */ React.createElement("span", null, "\u2461", " ", hpT({ en: "Let's figure it out together.", he: "\u05DC\u05D0 \u05D1\u05D8\u05D5\u05D7\u05D9\u05DD \u05DE\u05D4 \u05DE\u05EA\u05D0\u05D9\u05DD?" }))), /* @__PURE__ */ React.createElement("div", { style: {
    position: "relative",
    border: `2.5px solid ${C.deepPurple}`,
    borderRadius: 12,
    padding: isMobile ? "24px 20px" : "32px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    flexDirection: isMobile ? "column" : "row",
    textAlign: isMobile ? "center" : "start"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    top: -22,
    right: -16,
    width: 72,
    height: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2
  } }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 72 72", width: "72", height: "72", style: { position: "absolute" } }, /* @__PURE__ */ React.createElement("polygon", { points: "36,2 42,22 62,10 50,28 70,36 50,44 62,62 42,50 36,70 30,50 10,62 22,44 2,36 22,28 10,10 30,22", fill: C.purple })), /* @__PURE__ */ React.createElement("span", { style: {
    position: "relative",
    zIndex: 1,
    fontSize: 11,
    fontWeight: 800,
    color: "white",
    textAlign: "center",
    lineHeight: 1.2,
    fontFamily: F.body
  } }, "It's", /* @__PURE__ */ React.createElement("br", null), "FREE!")), /* @__PURE__ */ React.createElement("span", { style: {
    fontWeight: 700,
    fontSize: "clamp(24px,3.5vw,40px)",
    color: C.deepPurple,
    fontFamily: F.body
  } }, hpT({ en: "Book a Call With Me", he: "\u05EA\u05D0\u05DE\u05D5 \u05D0\u05D9\u05EA\u05D9 \u05E9\u05D9\u05D7\u05D4" })), /* @__PURE__ */ React.createElement(Btn, { href: "https://calendar.notion.so/meet/octaloom/discovery", variant: "purple" }, hpT({ en: "Let's Talk \u2728", he: "\u05D3\u05D1\u05E8\u05D9 \u05D0\u05DC\u05D9\u05D9, \u05D0\u05E0\u05D9 \u05DE\u05D5\u05DC \u05D4\u05D9\u05D5\u05DE\u05DF \u2728" })))))));
}
function HPLinkedInFeed() {
  const feedPosts = [
    { text: { en: "Just had a conversation with a founder who told me: 'I know LinkedIn is important, I just don't know what to do with it.' This is the most common thing I hear. Here's the thing...", he: '\u05D3\u05D9\u05D1\u05E8\u05EA\u05D9 \u05D4\u05D9\u05D5\u05DD \u05E2\u05DD \u05DE\u05D9\u05D9\u05E1\u05D3 \u05E9\u05D0\u05DE\u05E8 \u05DC\u05D9: "\u05D0\u05E0\u05D9 \u05D9\u05D5\u05D3\u05E2 \u05E9\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05D7\u05E9\u05D5\u05D1, \u05E4\u05E9\u05D5\u05D8 \u05DC\u05D0 \u05D9\u05D5\u05D3\u05E2 \u05DE\u05D4 \u05DC\u05E2\u05E9\u05D5\u05EA \u05E2\u05DD \u05D6\u05D4." \u05D6\u05D4 \u05D4\u05D3\u05D1\u05E8 \u05D4\u05DB\u05D9 \u05E0\u05E4\u05D5\u05E5 \u05E9\u05D0\u05E0\u05D9 \u05E9\u05D5\u05DE\u05E2\u05EA. \u05DB\u05DB\u05D4 \u05D6\u05D4 \u05E2\u05D5\u05D1\u05D3...' }, date: "2d" },
    { text: { en: "3 things I learned from managing 15+ LinkedIn profiles this quarter: consistency beats virality every single time. The algorithm rewards showing up...", he: "3 \u05D3\u05D1\u05E8\u05D9\u05DD \u05E9\u05DC\u05DE\u05D3\u05EA\u05D9 \u05DE\u05E0\u05D9\u05D4\u05D5\u05DC 15+ \u05E4\u05E8\u05D5\u05E4\u05D9\u05DC\u05D9 \u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05D4\u05E8\u05D1\u05E2\u05D5\u05DF \u05D4\u05D6\u05D4: \u05E2\u05E7\u05D1\u05D9\u05D5\u05EA \u05DE\u05E0\u05E6\u05D7\u05EA \u05D5\u05D9\u05E8\u05D0\u05DC\u05D9\u05D5\u05EA. \u05DB\u05DC \u05E4\u05E2\u05DD..." }, date: "5d" },
    { text: { en: "AI won't replace marketers. But marketers who use AI will replace those who don't. Here's what my AI agents actually do every day...", he: "AI \u05DC\u05D0 \u05D9\u05D7\u05DC\u05D9\u05E3 \u05D0\u05E0\u05E9\u05D9 \u05E9\u05D9\u05D5\u05D5\u05E7. \u05D0\u05D1\u05DC \u05D0\u05E0\u05E9\u05D9 \u05E9\u05D9\u05D5\u05D5\u05E7 \u05E9\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD \u05D1-AI \u05D9\u05D7\u05DC\u05D9\u05E4\u05D5 \u05D0\u05EA \u05D0\u05DC\u05D4 \u05E9\u05DC\u05D0. \u05DB\u05DA \u05E0\u05E8\u05D0\u05D4 \u05D4\u05D9\u05D5\u05DD \u05E9\u05DC\u05D9 \u05E2\u05DD \u05D4\u05E1\u05D5\u05DB\u05E0\u05D9\u05DD..." }, date: "1w" }
  ];
  const { lang } = useLang();
  const w = useWindowSize();
  const isMobile = w < 768;
  return /* @__PURE__ */ React.createElement(Sec, { bg: C.cream }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("h2", { style: {
    fontFamily: F.display,
    fontWeight: 500,
    fontSize: "clamp(28px,4vw,48px)",
    lineHeight: 1.15,
    color: C.deepPurple,
    marginBottom: 8
  } }, hpT(HP.linkedinFeed.title))), /* @__PURE__ */ React.createElement(Reveal, { delay: 50 }, /* @__PURE__ */ React.createElement("p", { style: {
    color: C.textDim,
    marginBottom: 40,
    fontSize: 16,
    fontFamily: F.body
  } }, hpT(HP.linkedinFeed.sub))), /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
    gap: 20,
    marginBottom: 32
  } }, feedPosts.map((post, i) => /* @__PURE__ */ React.createElement(Reveal, { key: i, delay: i * 120 }, /* @__PURE__ */ React.createElement("div", { style: {
    background: "white",
    borderRadius: 10,
    padding: 20,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 } }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Headshot-1.png",
      alt: "",
      style: { width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }
    }
  ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: {
    fontSize: 14,
    color: "#191919",
    display: "block",
    fontFamily: F.body
  } }, "Hanita Yudovski"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "#666", fontFamily: F.body } }, "LinkedIn-Led Fractional CMO \xB7 ", post.date))), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "#333",
    margin: 0,
    fontFamily: F.body
  } }, hpT(post.text)))))), /* @__PURE__ */ React.createElement(Reveal, { delay: 400 }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement(Btn, { href: "https://www.linkedin.com/in/hanita-yudovski/", variant: "outline" }, lang === "he" ? /* @__PURE__ */ React.createElement(React.Fragment, null, hpT(HP.linkedinFeed.followCta), " ", /* @__PURE__ */ React.createElement(LiIcon, { size: 16 })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(LiIcon, { size: 16 }), " ", hpT(HP.linkedinFeed.followCta)))))));
}
function HPBlog() {
  const w = useWindowSize();
  const isMobile = w < 768;
  const thumbColors = ["oklch(0.25 0.08 280)", "oklch(0.25 0.08 310)", "oklch(0.25 0.08 340)"];
  return /* @__PURE__ */ React.createElement(Sec, { bg: C.cream, id: "blog" }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("h2", { style: {
    fontFamily: F.display,
    fontWeight: 500,
    fontSize: "clamp(28px,4vw,48px)",
    lineHeight: 1.15,
    color: C.deepPurple,
    marginBottom: 8
  } }, hpT(HP.blog.title))), /* @__PURE__ */ React.createElement(Reveal, { delay: 50 }, /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 16,
    color: C.textDim,
    marginBottom: 40,
    maxWidth: 560,
    fontFamily: F.body
  } }, hpT(HP.blog.sub))), /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
    gap: 24,
    marginBottom: 32
  } }, HP.blog.posts.map((post, i) => /* @__PURE__ */ React.createElement(Reveal, { key: i, delay: i * 120 }, /* @__PURE__ */ React.createElement("a", { href: "#", style: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 12,
    overflow: "hidden",
    background: "white",
    border: "1px solid rgba(32,30,75,0.06)",
    textDecoration: "none",
    transition: "all 0.35s"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    aspectRatio: "16/10",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: thumbColors[i],
    fontSize: 11,
    fontFamily: "monospace",
    opacity: 0.5,
    color: C.lime
  } }, "article image"), /* @__PURE__ */ React.createElement("h3", { style: {
    fontSize: 16,
    fontWeight: 700,
    color: C.deepPurple,
    padding: "16px 20px 8px",
    lineHeight: 1.45,
    margin: 0,
    fontFamily: F.body
  } }, hpT(post.title)), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 12,
    color: C.textDim,
    padding: "0 20px",
    fontFamily: F.body
  } }, post.date), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 13,
    color: C.purple,
    padding: "12px 20px 16px",
    marginTop: "auto",
    fontWeight: 700,
    fontFamily: F.body
  } }, hpT(HP.blog.readMore), " \u2192"))))), /* @__PURE__ */ React.createElement(Reveal, { delay: 400 }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement(Btn, { href: "/blog", variant: "ghost" }, hpT(HP.blog.viewAll))))));
}
function HPNewsletter() {
  const w = useWindowSize();
  const isMobile = w < 768;
  return /* @__PURE__ */ React.createElement(Sec, { bg: C.purple }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", maxWidth: 640, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("h2", { style: {
    fontFamily: F.display,
    fontWeight: 500,
    fontSize: "clamp(24px,3vw,36px)",
    color: "white",
    marginBottom: 16
  } }, hpT(HP.newsletter.title)), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 28,
    lineHeight: 1.7,
    fontFamily: F.body
  } }, hpT(HP.newsletter.sub)), /* @__PURE__ */ React.createElement(
    "form",
    {
      onSubmit: (e) => e.preventDefault(),
      style: {
        display: "flex",
        gap: 8,
        maxWidth: 420,
        margin: "0 auto",
        flexDirection: isMobile ? "column" : "row"
      }
    },
    /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "email",
        placeholder: hpT(HP.newsletter.placeholder),
        style: {
          flex: 1,
          background: "rgba(255,255,255,0.08)",
          color: "white",
          padding: "14px 18px",
          borderRadius: 8,
          fontSize: 14,
          border: "1px solid rgba(255,255,255,0.12)",
          fontFamily: F.body,
          outline: "none"
        }
      }
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "submit",
        style: {
          background: C.lime,
          color: C.deepPurple,
          padding: "14px 24px",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          border: "none",
          fontFamily: F.body,
          whiteSpace: "nowrap"
        }
      },
      hpT(HP.newsletter.btn)
    )
  ), /* @__PURE__ */ React.createElement("label", { style: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginTop: 14,
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    justifyContent: "center",
    textAlign: "start"
  } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", style: { accentColor: C.lime, marginTop: 2 } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: F.body } }, hpT(HP.finalCta.formConsent)))))));
}
function HPFooter() {
  const { lang } = useLang();
  const dir = lang === "he" ? "rtl" : "ltr";
  const w = useWindowSize();
  const isMobile = w < 768;
  const linkStyle = {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    textDecoration: "none",
    transition: "color 0.2s",
    fontFamily: F.body,
    display: "block",
    lineHeight: "1.9"
  };
  const headStyle = {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "white",
    margin: "0 0 14px",
    fontFamily: F.body
  };
  const hover = (e, enter) => {
    e.currentTarget.style.color = enter ? C.lime : "rgba(255,255,255,0.5)";
  };
  const pages = [
    { en: "Home", he: "\u05D3\u05E3 \u05D4\u05D1\u05D9\u05EA", href: "/" },
    { en: "About", he: "\u05E2\u05DC\u05D9\u05D9", href: "#about" },
    { en: "Blog", he: "\u05D1\u05DC\u05D5\u05D2", href: "/blog" },
    { en: "Contact", he: "\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8", href: "#contact" }
  ];
  const serviceLinks = [
    { label: { en: "LinkedIn Growth Engine", he: "\u05DE\u05E0\u05D5\u05E2 \u05E6\u05DE\u05D9\u05D7\u05D4 \u05D1\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF" }, href: "/services/linkedin-growth-engine", indent: false },
    { label: { en: "LinkedIn for Organizations", he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05D0\u05E8\u05D2\u05D5\u05E0\u05D9\u05DD" }, href: "/services/linkedin-for-organizations", indent: true },
    { label: { en: "LinkedIn for Executives", he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05DE\u05E0\u05D4\u05DC\u05D9\u05DD" }, href: "/services/linkedin-for-executives", indent: true },
    { label: { en: "LinkedIn for Solopreneurs & Biz Owners", he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05E2\u05E6\u05DE\u05D0\u05D9\u05DD \u05D5\u05D1\u05E2\u05DC\u05D9 \u05E2\u05E1\u05E7\u05D9\u05DD" }, href: "/services/linkedin-for-solopreneurs", indent: true },
    { label: { en: "Fractional CMO", he: "Fractional CMO" }, href: "/services/fractional-cmo", indent: false },
    { label: { en: "AI Tools & Agents", he: "\u05DB\u05DC\u05D9 AI \u05D5\u05E1\u05D5\u05DB\u05E0\u05D9\u05DD" }, href: "/services/ai-tools-agents", indent: false }
  ];
  const socialIcons = [
    {
      href: "https://www.linkedin.com/in/hanita-yudovski/",
      label: "LinkedIn",
      svg: /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }))
    },
    {
      href: "https://www.instagram.com/octaloom/",
      label: "Instagram",
      svg: /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", ry: "5" }), /* @__PURE__ */ React.createElement("path", { d: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" }), /* @__PURE__ */ React.createElement("line", { x1: "17.5", y1: "6.5", x2: "17.51", y2: "6.5" }))
    },
    {
      href: "https://www.facebook.com/octaloom",
      label: "Facebook",
      svg: /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }))
    },
    {
      href: "https://www.youtube.com/@octaloom",
      label: "YouTube",
      svg: /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" }))
    }
  ];
  return /* @__PURE__ */ React.createElement("footer", { dir, style: { padding: "64px 0 0", background: C.deepPurple, color: "rgba(255,255,255,0.7)" } }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1.6fr 1fr 1fr",
    gap: isMobile ? 36 : 40,
    paddingBottom: 48
  } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png",
      alt: "OctaLoom",
      style: { height: 72, width: "auto", display: "block" }
    }
  ), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    marginTop: 14,
    maxWidth: 240,
    fontFamily: F.body,
    lineHeight: 1.65
  } }, lang === "he" ? "\u05DE\u05D7\u05DC\u05E7\u05EA \u05D4\u05E9\u05D9\u05D5\u05D5\u05E7 \u05E9\u05DC\u05DA, \u05E8\u05E7 \u05D1\u05DC\u05D9 \u05D4\u05DE\u05D7\u05DC\u05E7\u05D4" : "Your marketing department, minus the department.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { style: headStyle }, lang === "he" ? "\u05D3\u05E4\u05D9\u05DD" : "Pages"), pages.map((p, i) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: i,
      href: p.href,
      style: linkStyle,
      onMouseEnter: (e) => hover(e, true),
      onMouseLeave: (e) => hover(e, false)
    },
    lang === "he" ? p.he : p.en
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { style: headStyle }, lang === "he" ? "\u05E9\u05D9\u05E8\u05D5\u05EA\u05D9 \u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF" : "LinkedIn Services"), [
    { en: "LinkedIn for Organizations", he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05D0\u05E8\u05D2\u05D5\u05E0\u05D9\u05DD", href: "/services/linkedin-for-organizations" },
    { en: "LinkedIn for Founders", he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05DE\u05D9\u05D9\u05E1\u05D3\u05D9\u05DD", href: "/services/linkedin-for-executives" },
    { en: "LinkedIn for Solopreneurs", he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05E2\u05E6\u05DE\u05D0\u05D9\u05DD", href: "/services/linkedin-for-solopreneurs" }
  ].map((s, i) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: i,
      href: s.href,
      style: linkStyle,
      onMouseEnter: (e) => hover(e, true),
      onMouseLeave: (e) => hover(e, false)
    },
    lang === "he" ? s.he : s.en
  )), /* @__PURE__ */ React.createElement("h4", { style: { ...headStyle, marginTop: 20 } }, lang === "he" ? "\u05E9\u05D9\u05E8\u05D5\u05EA\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD" : "More Services"), [
    { en: "Fractional CMO", he: "Fractional CMO", href: "/services/fractional-cmo" },
    { en: "AI Tools & Agents", he: "\u05DB\u05DC\u05D9 AI \u05D5\u05E1\u05D5\u05DB\u05E0\u05D9\u05DD", href: "/services/ai-tools-agents" }
  ].map((s, i) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: i,
      href: s.href,
      style: linkStyle,
      onMouseEnter: (e) => hover(e, true),
      onMouseLeave: (e) => hover(e, false)
    },
    lang === "he" ? s.he : s.en
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://octagoodies.com",
      target: "_blank",
      rel: "noopener noreferrer",
      style: { textDecoration: "none" }
    },
    /* @__PURE__ */ React.createElement(
      "h4",
      {
        style: {
          ...headStyle,
          display: "flex",
          alignItems: "center",
          gap: 5,
          transition: "color 0.2s"
        },
        onMouseEnter: (e) => e.currentTarget.style.color = C.lime,
        onMouseLeave: (e) => e.currentTarget.style.color = "white"
      },
      "OctaGoodies",
      /* @__PURE__ */ React.createElement("svg", { width: "11", height: "11", viewBox: "0 0 12 12", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M2 2h8v8M2 10l8-8", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }))
    )
  ), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    marginTop: 6,
    fontFamily: F.body,
    lineHeight: 1.6
  } }, lang === "he" ? "\u05DB\u05DC\u05D9\u05DD \u05D5\u05D8\u05DE\u05E4\u05DC\u05D9\u05D9\u05D8\u05D9\u05DD \u05DC\u05E9\u05D9\u05D5\u05D5\u05E7" : "Marketing tools & templates")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { style: headStyle }, lang === "he" ? "\u05E2\u05E7\u05D1\u05D5 \u05D0\u05D7\u05E8\u05D9\u05E0\u05D5" : "Follow Us"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, socialIcons.map((s, i) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: i,
      href: s.href,
      target: s.href.startsWith("http") ? "_blank" : void 0,
      rel: "noopener noreferrer",
      "aria-label": s.label,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "rgba(255,255,255,0.5)",
        textDecoration: "none",
        transition: "all 0.2s"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = C.lime;
        e.currentTarget.style.color = C.lime;
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
        e.currentTarget.style.color = "rgba(255,255,255,0.5)";
      }
    },
    s.svg
  ))))), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 32,
    fontSize: 13,
    color: "rgba(255,255,255,0.35)",
    fontFamily: F.body,
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 12 : 0
  } }, /* @__PURE__ */ React.createElement("span", null, "\xA9 2026 OctaLoom. ", lang === "he" ? "\u05DB\u05DC \u05D4\u05D6\u05DB\u05D5\u05D9\u05D5\u05EA \u05E9\u05DE\u05D5\u05E8\u05D5\u05EA" : "All Rights Reserved"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 20 } }, [
    { label: HP.footer.privacy, href: "/privacy-policy" },
    { label: HP.footer.terms, href: "/terms" },
    { label: { en: "Accessibility", he: "\u05E0\u05D2\u05D9\u05E9\u05D5\u05EA" }, href: "/accessibility" }
  ].map((l, i) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: i,
      href: l.href,
      style: {
        color: "rgba(255,255,255,0.35)",
        textDecoration: "none",
        transition: "color 0.2s",
        fontFamily: F.body
      },
      onMouseEnter: (e) => e.currentTarget.style.color = C.lime,
      onMouseLeave: (e) => e.currentTarget.style.color = "rgba(255,255,255,0.35)"
    },
    hpT(l.label)
  ))))));
}
function HomepageSchema() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": HP.faq.items.map((item) => ({
        "@type": "Question",
        "name": item.q.he,
        "acceptedAnswer": { "@type": "Answer", "text": item.a.he }
      }))
    };
    const existing = document.getElementById("hp-faq-schema");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "hp-faq-schema";
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.getElementById("hp-faq-schema")?.remove();
    };
  }, []);
  return null;
}
function OctaLoomHomepageV2() {
  const [lang, setLang] = useLangState();
  return /* @__PURE__ */ React.createElement(LangCtx.Provider, { value: { lang, setLang } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: F.body,
    background: C.cream,
    direction: lang === "he" ? "rtl" : "ltr"
  } }, /* @__PURE__ */ React.createElement(HomepageSchema, null), /* @__PURE__ */ React.createElement(HPNav, null), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(HPHero, null), /* @__PURE__ */ React.createElement(HPProblem, null), /* @__PURE__ */ React.createElement(HPFourthOption, null), /* @__PURE__ */ React.createElement(HPServices, null), /* @__PURE__ */ React.createElement(HPProcess, null), /* @__PURE__ */ React.createElement(HPTestimonials, null), /* @__PURE__ */ React.createElement(HPCaseStudy, null), /* @__PURE__ */ React.createElement(HPAbout, null), /* @__PURE__ */ React.createElement(HPFAQ, null), /* @__PURE__ */ React.createElement(HPBookCall, null), /* @__PURE__ */ React.createElement(HPLinkedInFeed, null), /* @__PURE__ */ React.createElement(HPBlog, null), /* @__PURE__ */ React.createElement(HPNewsletter, null)), /* @__PURE__ */ React.createElement(HPFooter, null)));
}
export {
  OctaLoomHomepageV2 as default
};
