// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const C = {
  purple:     "#712eac",
  deepPurple: "#201e4b",
  navy:       "#060d3d",
  lime:       "#c5e6a2",
  cream:      "#ece9e7",
  white:      "#f5f3f1",
  textDim:    "#5c5878",
  surface:    "rgba(113,46,172,0.04)",
  surface2:   "rgba(113,46,172,0.08)",
  redX:       "rgba(255,68,68,0.08)",
  redXText:   "#e85d5d",
}

const F = {
  display: "'Discovery', 'Aeonik', sans-serif",
  body:    "'Aeonik', sans-serif",
}

// ─── CONTEXT ─────────────────────────────────────────────────────────────────
const LangCtx = createContext<{ lang: string; setLang: (l: string) => void }>({ lang: "he", setLang: () => {} })
const useLang  = () => useContext(LangCtx)
const hpT      = (obj: any) => { const { lang } = useLang(); return obj?.[lang] ?? obj?.en ?? "" }

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useWindowSize() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener("resize", h)
    return () => window.removeEventListener("resize", h)
  }, [])
  return w
}

function useLangState(): [string, (l: string) => void] {
  const [lang, setL] = useState<string>(() =>
    typeof document !== "undefined" && document.documentElement.lang === "en" ? "en" : "he"
  )
  const setLang = useCallback((l: string) => {
    setL(l)
    if (typeof document !== "undefined") document.documentElement.lang = l
    localStorage.setItem("octaloom-lang", l)
  }, [])
  useEffect(() => {
    const saved = localStorage.getItem("octaloom-lang")
    if (saved) setL(saved)
    const obs = new MutationObserver(() => setL(document.documentElement.lang === "en" ? "en" : "he"))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] })
    return () => obs.disconnect()
  }, [])
  return [lang, setLang]
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const vis = useInView(ref, { once: true, amount: 0.08 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

function Container({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)", ...style }}>
      {children}
    </div>
  )
}

function Sec({ bg, children, id, style = {} }: { bg: string; children: React.ReactNode; id?: string; style?: React.CSSProperties }) {
  return (
    <section id={id} style={{ background: bg, ...style }}>
      <div style={{ padding: "clamp(64px,10vw,120px) 0" }}>{children}</div>
    </section>
  )
}

function Btn({ href, onClick, variant = "purple", children, style = {} }: {
  href?: string; onClick?: () => void; variant?: string; children: React.ReactNode; style?: React.CSSProperties
}) {
  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 700,
    cursor: "pointer", textDecoration: "none", transition: "all 0.25s",
    border: "none", fontFamily: F.body, ...style
  }
  const variants: Record<string, React.CSSProperties> = {
    purple:  { background: C.purple,     color: "white" },
    ghost:   { background: "transparent", color: C.purple, border: `1px solid rgba(113,46,172,0.2)` },
    white:   { background: "white",      color: C.purple },
    lime:    { background: C.lime,       color: C.navy },
    outline: { background: "transparent", color: C.purple, border: `1.5px solid ${C.purple}` },
    dark:    { background: C.deepPurple, color: "white" },
  }
  const props = { style: { ...base, ...variants[variant] }, onClick }
  if (href) return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" {...props}>{children}</a>
  return <button {...props}>{children}</button>
}

function LogoSVG({ color = C.deepPurple }: { color?: string }) {
  return (
    <svg viewBox="0 0 301.75 301.13" xmlns="http://www.w3.org/2000/svg" style={{ height: 32, width: "auto", fill: color }}>
      <path d="M198.3,194.74l-1.05-.84c-.08-.07-.16-.13-.24-.22l-13.67-13.67,15.51-15.51,12.7,12.7,10.6-10.61-12.7-12.7,15.52-15.5,13.65,13.65c.09.09.17.17.24.27l.83,1.05-41.39,41.38Z"/>
      <path d="M87.17,83.81l-13.65-13.65c-.09-.09-.16-.16-.24-.26l-.84-1.05,41.4-41.39,1.05.84c.09.07.17.15.26.24l13.65,13.65-15.5,15.51-12.7-12.7-10.61,10.6,12.7,12.7-15.51,15.51Z"/>
      <path d="M156.06,222.21h0c-9.53,0-18.47-3.7-25.19-10.43l-75.48-75.5c-6.72-6.72-10.42-15.66-10.42-25.19,0-9.53,3.7-18.47,10.43-25.19l6.45-6.45,1.05,1.3,13.67,13.67-6.32,6.32c-2.76,2.76-4.28,6.43-4.28,10.35,0,3.91,1.52,7.59,4.28,10.34l32.44,32.45-12.7,12.7,10.61,10.61,12.7-12.7,32.44,32.45c2.75,2.76,6.43,4.28,10.34,4.28h0c3.91,0,7.59-1.52,10.35-4.28l6.32-6.32,13.65,13.65,1.3,1.05-1.16,1.2-5.27,5.27c-6.71,6.72-15.66,10.42-25.19,10.42Z"/>
      <path d="M250.29,142.76l-1.05-1.31-13.67-13.67,6.32-6.33c2.76-2.76,4.28-6.43,4.28-10.34,0-3.91-1.52-7.59-4.28-10.35l-32.44-32.45,12.7-12.7-10.6-10.6-12.7,12.7-32.44-32.44c-2.76-2.76-6.43-4.28-10.35-4.28h0c-3.91,0-7.58,1.52-10.34,4.28l-6.33,6.32-13.65-13.65-1.3-1.05,1.16-1.2,5.27-5.27c6.72-6.72,15.66-10.42,25.19-10.42h0c9.53,0,18.47,3.7,25.19,10.43l75.48,75.5c6.72,6.72,10.42,15.66,10.42,25.19,0,9.53-3.7,18.47-10.42,25.19l-6.46,6.46Z"/>
    </svg>
  )
}

function LiIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function AnimatedNum({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const vis = useInView(ref, { once: true })
  const num = parseInt(value.replace(/[^0-9]/g, "")) || 0
  const suffix = value.replace(/[0-9,]/g, "")
  const [cur, setCur] = useState(0)
  useEffect(() => {
    if (!vis) return
    let start = 0
    const step = num / 40
    const timer = setInterval(() => {
      start = Math.min(start + step, num)
      setCur(Math.round(start))
      if (start >= num) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [vis, num])
  return <span ref={ref}>{cur.toLocaleString()}{suffix}</span>
}

// ─── HP DATA ─────────────────────────────────────────────────────────────────
const HP = {
  hero: {
    pill: { en: 'AI-Powered B2B Marketing Services', he: '\u05e9\u05d9\u05e8\u05d5\u05ea\u05d9 \u05e9\u05d9\u05d5\u05d5\u05e7 \u05de\u05d1\u05d5\u05e1\u05e1\u05d9 AI \u05dc\u05d7\u05d1\u05e8\u05d5\u05ea B2B' },
    h1: { en: 'Your marketing\ndepartment,\nminus the\ndepartment. \u1f481\u1f3fb\u200d\u2640\ufe0f', he: '\u05de\u05d7\u05dc\u05e7\u05ea \u05d4\u05e9\u05d9\u05d5\u05d5\u05e7\n\u05e9\u05dc\u05da, \u05e8\u05e7 \u05d1\u05dc\u05d9\n\u05d4\u05de\u05d7\u05dc\u05e7\u05d4 \u1f481\u1f3fb\u200d\u2640\ufe0f' },
    sub: {
      en: 'Smart, AI-powered marketing services for B2B companies ready to turn LinkedIn into a real growth engine.',
      he: '\u05e9\u05d9\u05e8\u05d5\u05ea\u05d9 \u05e9\u05d9\u05d5\u05d5\u05e7 \u05d7\u05db\u05dd \u05de\u05d1\u05d5\u05e1\u05e1 \u05e1\u05d5\u05db\u05e0\u05d9 \u05d5\u05db\u05dc\u05d9 AI \u05dc\u05d7\u05d1\u05e8\u05d5\u05ea B2B \u05e9\u05e8\u05d5\u05e6\u05d5\u05ea \u05dc\u05d4\u05e4\u05d5\u05da \u05d0\u05ea \u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05de\u05e0\u05d5\u05e2 \u05e6\u05de\u05d9\u05d7\u05d4'
    },
    cta1: { en: "Let's Talk", he: '\u05d1\u05d5\u05d0\u05d5 \u05e0\u05d3\u05d1\u05e8' },
    cta2: { en: 'Take What You Need \u2192', he: '\u05e7\u05d7\u05d5 \u05de\u05d4 \u05e9\u05d0\u05ea\u05dd \u05e6\u05e8\u05d9\u05db\u05d9\u05dd \u2192' },
    trustTop: { en: 'trusted by founders and CEOs of B2B companies', he: 'trusted by founders and CEOs of B2B companies' },
    trustBottom: { en: '', he: '' },
  },
  marquee: {
    en: ['AI Agents', 'Marketing Automation', 'B2B Marketing', 'Full Social Presence', 'Fractional CMO', 'LinkedIn Management'],
    he: ['Fractional CMO', '\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05d0\u05e8\u05d2\u05d5\u05e0\u05d9\u05dd', '\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05de\u05d9\u05d9\u05e1\u05d3\u05d9\u05dd', '\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05e2\u05e6\u05de\u05d0\u05d9\u05dd', '\u05e1\u05d5\u05db\u05e0\u05d9 \u05d5\u05db\u05dc\u05d9 AI'],
  },
  problem: {
    title: { en: 'Every founder or organization has three options:', he: '\u05dc\u05db\u05dc \u05de\u05d9\u05d9\u05e1\u05d3 \u05d0\u05d5 \u05d0\u05e8\u05d2\u05d5\u05df \u05d9\u05e9 \u05e9\u05dc\u05d5\u05e9 \u05d0\u05d5\u05e4\u05e6\u05d9\u05d5\u05ea:' },
    cards: [
      { label: { en: 'Hire an in-house team', he: '\u05d2\u05d9\u05d5\u05e1 \u05e6\u05d5\u05d5\u05ea \u05e4\u05e0\u05d9\u05de\u05d9' }, sub: { en: 'Slow, high employer costs', he: '\u05d0\u05d9\u05d8\u05d9, \u05d4\u05d5\u05e6\u05d0\u05d5\u05ea \u05de\u05e2\u05e1\u05d9\u05e7 \u05d2\u05d1\u05d5\u05d4\u05d5\u05ea' } },
      { label: { en: 'Hire an agency', he: '\u05e1\u05d5\u05db\u05e0\u05d5\u05ea' }, sub: { en: 'Expensive retainer, constant handoffs', he: '\u05e8\u05d9\u05d8\u05d9\u05d9\u05e0\u05e8 \u05d2\u05d1\u05d5\u05d4, \u05d0\u05e0\u05e9\u05d9 \u05e7\u05e9\u05e8 \u05e9\u05d5\u05e0\u05d9\u05dd, \u05d4\u05e2\u05d1\u05e8\u05ea \u05d9\u05d3\u05d9\u05d9\u05dd \u05db\u05dc \u05e9\u05e0\u05d9 \u05d5\u05d7\u05de\u05d9\u05e9\u05d9' } },
      { label: { en: 'DIY', he: 'DIY' }, sub: { en: 'No strategy, marketing happens when there\'s time', he: '\u05dc\u05e8\u05d5\u05d1 \u05d1\u05dc\u05d9 \u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4, \u05d4\u05e9\u05d9\u05d5\u05d5\u05e7 \u05e7\u05d5\u05e8\u05d4 \u05db\u05e9\u05d9\u05e9 \u05d6\u05de\u05df' } },
    ],
    none: { en: 'None of them work.', he: '\u05e9\u05dc\u05d5\u05e9\u05ea\u05df \u05dc\u05d0 \u05e2\u05d5\u05d1\u05d3\u05d5\u05ea.' },
  },
  fourthOption: {
    but: { en: 'But\u2026 there\'s a fourth option.', he: '\u05d0\u05d1\u05dc\u2026 \u05d9\u05e9 \u05d0\u05d5\u05e4\u05e6\u05d9\u05d4 \u05e8\u05d1\u05d9\u05e2\u05d9\u05ea.' },
    desc: {
      en: 'OctaLoom is a boutique AI-powered B2B marketing agency that helps founders and companies in Israel turn LinkedIn into their primary growth engine. Led by Hanita Yudovski, LinkedIn-Led Fractional CMO.',
      he: 'OctaLoom \u05d4\u05d9\u05d0 \u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 B2B \u05de\u05d1\u05d5\u05e1\u05e1\u05ea AI \u05e9\u05de\u05d5\u05d1\u05d9\u05dc\u05d4 \u05de\u05d9\u05d9\u05e1\u05d3\u05d9\u05dd \u05d5\u05d7\u05d1\u05e8\u05d5\u05ea \u05dc\u05d4\u05e4\u05d5\u05da \u05d0\u05ea \u05d4\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05e9\u05dc\u05d4\u05dd \u05dc\u05de\u05e0\u05d5\u05e2 \u05e6\u05de\u05d9\u05d7\u05d4 \u05e8\u05d0\u05e9\u05d9. \u05d0\u05e0\u05d9 \u05d7\u05e0\u05d9\u05ea\u05d4 \u05d9\u05d5\u05d3\u05d5\u05d1\u05e1\u05e7\u05d9, LinkedIn-Led Fractional CMO, \u05d5\u05d1\u05e2\u05dc\u05ea \u05d4\u05e1\u05d5\u05db\u05e0\u05d5\u05ea.'
    },
    value: {
      en: 'Work with a senior marketing lead backed by a team of AI agents \u2014 no employer costs, no inflated retainer, no handoffs. This isn\'t artificial intelligence. It\'s a business model.',
      he: '\u05d0\u05d6 \u05e8\u05d2\u05e2, \u05de\u05d4 \u05d6\u05d4 \u05d0\u05d5\u05de\u05e8 \u05d1\u05e4\u05d5\u05e2\u05dc? \u05e9\u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05d1\u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05d4\u05d9\u05d0 \u05e2\u05dc \u05d9\u05d3\u05d9 \u05d0\u05e9\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 \u05d1\u05db\u05d9\u05e8\u05d4 \u05e9\u05de\u05d5\u05d1\u05d9\u05dc\u05d4 \u05e6\u05d5\u05d5\u05ea \u05e9\u05dc \u05e1\u05d5\u05db\u05e0\u05d9 AI. \u05d1\u05dc\u05d9 \u05e2\u05dc\u05d5\u05d9\u05d5\u05ea \u05de\u05e2\u05e1\u05d9\u05e7, \u05d1\u05dc\u05d9 \u05e8\u05d9\u05d8\u05d9\u05d9\u05e0\u05e8 \u05de\u05e0\u05d5\u05e4\u05d7, \u05d5\u05d1\u05dc\u05d9 \u05d4\u05e2\u05d1\u05e8\u05d5\u05ea \u05d9\u05d3\u05d9\u05d9\u05dd. \u05d0\u05e0\u05d9 \u05de\u05e2\u05e6\u05d1\u05ea \u05d0\u05ea \u05d4\u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4, \u05e1\u05d5\u05db\u05e0\u05d9 AI \u05de\u05d1\u05e6\u05e2\u05d9\u05dd \u05d0\u05ea \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05d4\u05d9\u05d5\u05de\u05d9\u05d5\u05de\u05d9\u05ea, \u05d5\u05d0\u05ea \u05e0\u05d9\u05e6\u05e0\u05d9 \u05d4\u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05d0\u05e0\u05d7\u05e0\u05d5 \u05e8\u05d5\u05d0\u05d9\u05dd \u05d9\u05d7\u05d3 \u05db\u05d1\u05e8 \u05ea\u05d5\u05da 30 \u05d9\u05d5\u05dd.'
    },
    cta: { en: "Let's Talk", he: '\u05d1\u05d5\u05d0\u05d5 \u05e0\u05d3\u05d1\u05e8' },
  },
  services: {
    title: { en: 'Take What You Need', he: '\u05e7\u05d7\u05d5 \u05de\u05d4 \u05e9\u05d0\u05ea\u05dd \u05e6\u05e8\u05d9\u05db\u05d9\u05dd' },
    sub: { en: '', he: '' },
    strips: [
      { label: { en: 'LinkedIn for Founders', he: '\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05de\u05d9\u05d9\u05e1\u05d3\u05d9\u05dd' }, href: '#' },
      { label: { en: 'LinkedIn for Solopreneurs', he: '\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05e2\u05e6\u05de\u05d0\u05d9\u05dd' }, href: 'LinkedIn for Solopreneurs.html' },
      { label: { en: 'LinkedIn for Organizations', he: '\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05d0\u05e8\u05d2\u05d5\u05e0\u05d9\u05dd' }, href: '#' },
      { label: { en: 'Fractional CMO', he: '\u05e9\u05d9\u05e8\u05d5\u05ea\u05d9 \u05e9\u05d9\u05d5\u05d5\u05e7 \u05d1\u05de\u05d9\u05e7\u05d5\u05e8 \u05d7\u05d5\u05e5' }, href: '#' },
      { label: { en: 'AI Tools & Agents', he: '\u05e1\u05d5\u05db\u05e0\u05d9 \u05d5\u05db\u05dc\u05d9 AI' }, href: '#' },
    ],
  },
  process: {
    title: { en: 'From First Call to Full Engine', he: '\u05d0\u05d9\u05da \u05d6\u05d4 \u05e2\u05d5\u05d1\u05d3?' },
    steps: [
      {
        title: { en: 'Understand What\u2019s Actually Missing', he: '\u05de\u05d2\u05d3\u05d9\u05e8\u05d9\u05dd \u05d0\u05ea \u05d4\u05d1\u05e2\u05d9\u05d4' },
        desc: {
          en: 'You publish consistently but leads aren\'t coming. The problem isn\'t the content \u2014 it\'s the system.',
          he: '\u05d0\u05ea\u05dd \u05de\u05e4\u05e8\u05e1\u05de\u05d9\u05dd \u05d1\u05e2\u05e7\u05d1\u05d9\u05d5\u05ea \u05d0\u05d1\u05dc \u05d4\u05dc\u05d9\u05d3\u05d9\u05dd \u05dc\u05d0 \u05de\u05d2\u05d9\u05e2\u05d9\u05dd. \u05d4\u05d1\u05e2\u05d9\u05d4 \u05d4\u05d9\u05d0 \u05dc\u05d0 \u05d4\u05ea\u05d5\u05db\u05df, \u05d6\u05d5 \u05d4\u05de\u05e2\u05e8\u05db\u05ea.'
        }
      },
      {
        title: { en: 'Build a Plan That Actually Fits', he: '\u05d1\u05d5\u05e0\u05d9\u05dd \u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05e2\u05d1\u05d5\u05d3\u05d4' },
        desc: {
          en: 'Based on your needs, we build a clear work plan. AI is part of the thinking, prioritization, and usually the execution too \u1f609',
          he: '\u05e2\u05dc \u05d1\u05e1\u05d9\u05e1 \u05d4\u05e6\u05e8\u05db\u05d9\u05dd \u05e9\u05e2\u05dc\u05d5, \u05e0\u05d1\u05e0\u05d9\u05ea \u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05e2\u05d1\u05d5\u05d3\u05d4 \u05de\u05e1\u05d5\u05d3\u05e8\u05ea. \u05d4-AI \u05d4\u05d5\u05d0 \u05d7\u05dc\u05e7 \u05de\u05ea\u05d4\u05dc\u05d9\u05da \u05d4\u05d7\u05e9\u05d9\u05d1\u05d4 \u05d5\u05d4\u05ea\u05d9\u05e2\u05d3\u05d5\u05e3 (\u05d5\u05dc\u05e8\u05d5\u05d1 \u05d2\u05dd \u05d7\u05dc\u05e7 \u05de\u05d4\u05d1\u05d9\u05e6\u05d5\u05e2 \u1f609)'
        }
      },
      {
        title: { en: 'Execute, and See It Happen', he: '\u05de\u05d9\u05d9\u05e9\u05de\u05d9\u05dd \u05d1\u05e4\u05d5\u05e2\u05dc' },
        desc: {
          en: 'AI agents run the daily pace, I maintain positioning, voice and strategy. Results start within 30 days, leads within 90 days, a real pipeline within 6 months.',
          he: '\u05d4\u05e1\u05d5\u05db\u05e0\u05d9\u05dd \u05de\u05e8\u05d9\u05e6\u05d9\u05dd \u05d0\u05ea \u05d4\u05e7\u05e6\u05d1 \u05d4\u05d9\u05d5\u05de\u05d9\u05d5\u05de\u05d9, \u05d0\u05e0\u05d9 \u05e9\u05d5\u05de\u05e8\u05ea \u05e2\u05dc \u05d4\u05de\u05d9\u05e6\u05d5\u05d1, \u05d4\u05e7\u05d5\u05dc \u05d5\u05d4\u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4. \u05d4\u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05de\u05ea\u05d7\u05d9\u05dc\u05d5\u05ea \u05dc\u05d4\u05d2\u05d9\u05e2 \u05ea\u05d5\u05da 30 \u05d9\u05d5\u05dd, \u05dc\u05d9\u05d3\u05d9\u05dd \u05ea\u05d5\u05da 90 \u05d9\u05d5\u05dd, pipeline \u05d0\u05de\u05d9\u05ea\u05d9 \u05ea\u05d5\u05da 6 \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd.'
        }
      },
    ],
    cta: { en: "Let's Talk", he: '\u05d1\u05d5\u05d0\u05d5 \u05e0\u05d3\u05d1\u05e8' },
  },
  testimonials: {
    title: { en: 'What they say about me', he: '\u05de\u05d4 \u05d0\u05d5\u05de\u05e8\u05d9\u05dd \u05e2\u05dc\u05d9\u05d9' },
    items: [
      {
        quote: { en: '"Over the past months I worked directly with Hanita on marketing consulting, focusing on B2B and LinkedIn. The professional guidance was thorough, deep, and structured \u2014 including extensive preliminary research, deep learning of the company\'s field, and competitive landscape analysis. The process included long-term marketing strategy and a clear implementation plan that significantly contributed to the company\'s global activity."', he: '"\u05d1\u05de\u05d4\u05dc\u05da \u05d4\u05d7\u05d5\u05d3\u05e9\u05d9\u05dd \u05d4\u05d0\u05d7\u05e8\u05d5\u05e0\u05d9\u05dd \u05e2\u05d1\u05d3\u05ea\u05d9 \u05d9\u05e9\u05d9\u05e8\u05d5\u05ea \u05de\u05d5\u05dc \u05d7\u05e0\u05d9\u05ea\u05d4 \u05d1\u05db\u05dc \u05d4\u05e7\u05e9\u05d5\u05e8 \u05dc\u05d9\u05d9\u05e2\u05d5\u05e5 \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9, \u05d1\u05d3\u05d2\u05e9 \u05e2\u05dc \u05e2\u05d5\u05dc\u05dd \u05d4-B2B \u05d5\u05e2\u05dc \u05e4\u05e2\u05d9\u05dc\u05d5\u05ea \u05d1\u05e4\u05dc\u05d8\u05e4\u05d5\u05e8\u05de\u05ea \u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df. \u05d4\u05dc\u05d9\u05d5\u05d5\u05d9 \u05d4\u05de\u05e7\u05e6\u05d5\u05e2\u05d9 \u05e9\u05d4\u05d5\u05d1\u05d9\u05dc\u05d4 \u05d4\u05d9\u05d4 \u05d9\u05e1\u05d5\u05d3\u05d9, \u05de\u05e2\u05de\u05d9\u05e7 \u05d5\u05de\u05d5\u05d1\u05e0\u05d4, \u05d5\u05db\u05dc\u05dc \u05de\u05d7\u05e7\u05e8 \u05de\u05e7\u05d3\u05d9\u05dd \u05e8\u05d7\u05d1, \u05dc\u05d9\u05de\u05d5\u05d3 \u05de\u05e2\u05de\u05d9\u05e7 \u05e9\u05dc \u05ea\u05d7\u05d5\u05dd \u05d4\u05e2\u05d9\u05e1\u05d5\u05e7 \u05e9\u05dc \u05d4\u05d7\u05d1\u05e8\u05d4 \u05d5\u05e0\u05d9\u05ea\u05d5\u05d7 \u05d4\u05e1\u05d1\u05d9\u05d1\u05d4 \u05d4\u05e2\u05e1\u05e7\u05d9\u05ea \u05d5\u05d4\u05de\u05ea\u05d7\u05e8\u05d9\u05dd. \u05d4\u05ea\u05d4\u05dc\u05d9\u05da \u05db\u05dc\u05dc \u05d2\u05d9\u05d1\u05d5\u05e9 \u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4 \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05ea \u05d0\u05e8\u05d5\u05db\u05ea \u05d8\u05d5\u05d5\u05d7 \u05d5\u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05e2\u05d1\u05d5\u05d3\u05d4 \u05d1\u05e8\u05d5\u05e8\u05d4, \u05d5\u05d4\u05ea\u05d5\u05e6\u05e8 \u05d4\u05e9\u05d9\u05d5\u05d5\u05e7\u05d9 \u05ea\u05e8\u05dd \u05de\u05e9\u05de\u05e2\u05d5\u05ea\u05d9\u05ea \u05dc\u05e4\u05e2\u05d9\u05dc\u05d5\u05ea \u05d4\u05d2\u05dc\u05d5\u05d1\u05dc\u05d9\u05ea \u05e9\u05dc \u05d4\u05d7\u05d1\u05e8\u05d4."' },
        author: { en: 'Yoram Avigad', he: 'יורם אביגד' },
        role: { en: 'CEO, Totzeret HaNegev', he: 'מנכ"ל תוצרת הנגב' },
      },
      {
        quote: { en: '"Hanita accompanied us in building a comprehensive marketing infrastructure, with deep understanding of the organization and its challenges. The combination of strategic thinking, process leadership, and precise execution created a significant impact on our operations."', he: '"\u05d7\u05e0\u05d9\u05ea\u05d4 \u05dc\u05d9\u05d5\u05d5\u05ea\u05d4 \u05d0\u05d5\u05ea\u05e0\u05d5 \u05d1\u05d1\u05e0\u05d9\u05d9\u05ea \u05ea\u05e9\u05ea\u05d9\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05ea \u05de\u05e7\u05d9\u05e4\u05d4, \u05de\u05ea\u05d5\u05da \u05d4\u05d1\u05e0\u05d4 \u05e2\u05de\u05d5\u05e7\u05d4 \u05e9\u05dc \u05d4\u05d0\u05e8\u05d2\u05d5\u05df \u05d5\u05e9\u05dc \u05d4\u05d0\u05ea\u05d2\u05e8\u05d9\u05dd \u05e9\u05dc\u05d5. \u05d4\u05e9\u05d9\u05dc\u05d5\u05d1 \u05d1\u05d9\u05df \u05d7\u05e9\u05d9\u05d1\u05d4 \u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05ea, \u05d4\u05d5\u05d1\u05dc\u05ea \u05ea\u05d4\u05dc\u05d9\u05db\u05d9\u05dd \u05d5\u05d1\u05d9\u05e6\u05d5\u05e2 \u05de\u05d3\u05d5\u05d9\u05e7 \u05d9\u05e6\u05e8 \u05d4\u05e9\u05e4\u05e2\u05d4 \u05de\u05e9\u05de\u05e2\u05d5\u05ea\u05d9\u05ea \u05e2\u05dc \u05d4\u05e4\u05e2\u05d9\u05dc\u05d5\u05ea \u05e9\u05dc\u05e0\u05d5."' },
        author: { en: 'Ela Sayag', he: 'אלה סייג' },
        role: { en: 'CEO, Me Adopt', he: 'מנכ"לית מי אדופט' },
      },
      {
        quote: { en: '"Hanita is one of the best marketing managers I\'ve had the chance to work with. She\'s a social media champion, knows how to lead branding end-to-end, initiate and drive countless marketing activities."', he: '"\u05d7\u05e0\u05d9\u05ea\u05d4 \u05d4\u05d9\u05d0 \u05d0\u05d7\u05ea \u05de\u05de\u05e0\u05d4\u05dc\u05d5\u05ea \u05d4\u05e9\u05d9\u05d5\u05d5\u05e7 \u05d4\u05db\u05d9 \u05d8\u05d5\u05d1\u05d5\u05ea \u05e9\u05d9\u05e6\u05d0 \u05dc\u05d9 \u05dc\u05e2\u05d1\u05d5\u05d3 \u05d0\u05d9\u05ea\u05df. \u05d4\u05d9\u05d0 \u05d0\u05dc\u05d5\u05e4\u05d4 \u05d1\u05de\u05d3\u05d9\u05d4 \u05d7\u05d1\u05e8\u05ea\u05d9\u05ea, \u05d9\u05d5\u05d3\u05e2\u05ea \u05dc\u05d4\u05d5\u05d1\u05d9\u05dc \u05de\u05d9\u05ea\u05d5\u05d2 \u05de\u05e7\u05e6\u05d4 \u05dc\u05e7\u05e6\u05d4, \u05dc\u05d9\u05d6\u05d5\u05dd \u05d5\u05dc\u05d4\u05d5\u05d1\u05d9\u05dc \u05e4\u05e2\u05d9\u05dc\u05d5\u05d9\u05d5\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05d5\u05ea \u05d0\u05d9\u05e0\u05e1\u05d5\u05e3."' },
        author: { en: 'Ofek Ron', he: 'אופק רון' },
        role: { en: 'CEO, Oshi', he: 'מנכ"ל Oshi' },
      },
      {
        quote: { en: '"From the moment Hanita came in, marketing stopped being an oppressive task and became a growth engine. There\'s a clear strategy, working automation, and measurable results over time."', he: '"\u05de\u05d4\u05e8\u05d2\u05e2 \u05e9\u05d7\u05e0\u05d9\u05ea\u05d4 \u05e0\u05db\u05e0\u05e1\u05d4, \u05d4\u05e9\u05d9\u05d5\u05d5\u05e7 \u05d4\u05e4\u05e1\u05d9\u05e7 \u05dc\u05d4\u05d9\u05d5\u05ea \u05de\u05e9\u05d9\u05de\u05d4 \u05de\u05e2\u05d9\u05e7\u05d4 \u05d5\u05d4\u05e4\u05da \u05dc\u05de\u05e0\u05d5\u05e2 \u05e6\u05de\u05d9\u05d7\u05d4. \u05d9\u05e9 \u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4 \u05d1\u05e8\u05d5\u05e8\u05d4, \u05d9\u05e9 \u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d4 \u05e9\u05e2\u05d5\u05d1\u05d3\u05ea, \u05d5\u05d9\u05e9 \u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05e9\u05d0\u05e4\u05e9\u05e8 \u05dc\u05de\u05d3\u05d5\u05d3 \u05dc\u05d0\u05d5\u05e8\u05da \u05d6\u05de\u05df."' },
        author: { en: 'Shimi Dvir', he: 'שימי דביר' },
        role: { en: 'CEO, AcademAi', he: 'מנכ"ל AcademAi' },
      },
      {
        quote: { en: '"Working with Hanita created clarity for me. She helped me understand what\'s right for us marketing-wise. Her work simply brought in leads."', he: '"\u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05e2\u05dd \u05d7\u05e0\u05d9\u05ea\u05d4 \u05d9\u05e6\u05e8\u05d4 \u05dc\u05d9 \u05d1\u05d4\u05d9\u05e8\u05d5\u05ea. \u05d4\u05d9\u05d0 \u05e2\u05d6\u05e8\u05d4 \u05dc\u05d9 \u05dc\u05d4\u05d1\u05d9\u05df \u05de\u05d4 \u05e0\u05db\u05d5\u05df \u05dc\u05e0\u05d5 \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05ea, \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05e9\u05dc\u05d4 \u05e4\u05e9\u05d5\u05d8 \u05e0\u05db\u05e0\u05e1\u05d4 \u05dc\u05d5\u05e8\u05d9\u05d3\u05d9\u05dd."' },
        author: { en: 'Lior Sade', he: 'ליאור שדה' },
        role: { en: 'CEO, Moving Art', he: 'מנכ"ל Moving Art' },
      },
      {
        quote: { en: '"Hanita knows how to take an idea and translate it into a system that actually works. Not just thinking and strategy, but also getting into the details and driving things until they happen."', he: '"\u05d7\u05e0\u05d9\u05ea\u05d4 \u05d9\u05d5\u05d3\u05e2\u05ea \u05dc\u05e7\u05d7\u05ea \u05e8\u05e2\u05d9\u05d5\u05df \u05d5\u05dc\u05ea\u05e8\u05d2\u05dd \u05d0\u05d5\u05ea\u05d5 \u05dc\u05de\u05e2\u05e8\u05db\u05ea \u05e9\u05d1\u05e4\u05d5\u05e2\u05dc \u05e2\u05d5\u05d1\u05d3\u05ea. \u05dc\u05d0 \u05e8\u05e7 \u05d7\u05e9\u05d9\u05d1\u05d4 \u05d5\u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4, \u05d0\u05dc\u05d0 \u05d2\u05dd \u05d9\u05e8\u05d9\u05d3\u05d4 \u05dc\u05e4\u05e8\u05d8\u05d9\u05dd \u05d5\u05d4\u05d5\u05d1\u05dc\u05d4 \u05e9\u05dc \u05d3\u05d1\u05e8\u05d9\u05dd \u05e2\u05d3 \u05e9\u05d4\u05dd \u05e7\u05d5\u05e8\u05d9\u05dd."' },
        author: { en: 'Neta Argaz', he: 'נטע ארגז' },
        role: { en: 'Founder, Club20', he: 'מייסדת Club20' },
      },
    ],
  },
  caseStudy: {
    tag: { en: 'B2B SaaS Startup, 3 months', he: 'סטארטאפ B2B SaaS, 3 חודשים' },
    headline: {
      en: 'From a CEO with no time for LinkedIn to investor meetings from the feed',
      he: 'ממנכ"ל בלי זמן ללינקדאין, לפגישות עם משקיעים מתוך הפיד'
    },
    quote: {
      en: '"22 years in business. Working with professionals, suppliers, consultants. I haven\'t encountered your level."',
      he: '"22 \u05e9\u05e0\u05d9\u05dd \u05d0\u05e0\u05d9 \u05d1\u05e2\u05d5\u05dc\u05dd \u05d4\u05e2\u05e1\u05e7\u05d9\u05dd. \u05e2\u05d5\u05d1\u05d3 \u05e2\u05dd \u05d0\u05e0\u05e9\u05d9 \u05de\u05e7\u05e6\u05d5\u05e2, \u05e1\u05e4\u05e7\u05d9\u05dd, \u05d9\u05d5\u05e2\u05e6\u05d9\u05dd. \u05dc\u05d0 \u05e0\u05e4\u05d2\u05e9\u05ea\u05d9 \u05d1\u05e8\u05de\u05d4 \u05e9\u05dc\u05da."'
    },
    quoteAuthor: {
      en: '— CEO & Founder, B2B SaaS Startup (Stealth Mode)',
      he: '— מנכ"ל ומייסד, סטארטאפ B2B SaaS (Stealth Mode)'
    },
    startTitle: { en: 'Starting point', he: 'נקודת ההתחלה' },
    startText: {
      en: 'One post every three weeks, if there was time. Like many CEOs running a growing startup, LinkedIn was always pushed to the bottom of the list. The content was fine. But without pace, presence, or a complete picture of who he is and what his company builds.',
      he: 'פוסט אחד כל שלושה שבועות, אם היה זמן. כמו הרבה מנכ"לים שמובילים סטארטאפ בצמיחה, לינקדאין תמיד נדחתה לסוף הרשימה. התוכן שיצא היה בסדר. אבל בלי קצב, בלי נוכחות, ובלי תמונה שלמה של מי הוא ומה החברה שלו בונה.'
    },
    whatTitle: { en: 'What we did', he: 'מה עשינו' },
    whatText: {
      en: "We didn't start with writing. We started with positioning.\nWe built a three-channel system that all spoke the same message:",
      he: '\u05dc\u05d0 \u05d4\u05ea\u05d7\u05dc\u05e0\u05d5 \u05d1\u05db\u05ea\u05d9\u05d1\u05d4. \u05d4\u05ea\u05d7\u05dc\u05e0\u05d5 \u05d1\u05de\u05d9\u05e6\u05d5\u05d1.\n\u05d1\u05e0\u05d9\u05e0\u05d5 \u05de\u05e2\u05e8\u05db\u05ea \u05e9\u05dc \u05e9\u05dc\u05d5\u05e9\u05d4 \u05e2\u05e8\u05d5\u05e6\u05d9\u05dd \u05e9\u05db\u05d5\u05dc\u05dd \u05d3\u05d9\u05d1\u05e8\u05d5 \u05d0\u05ea \u05d0\u05d5\u05ea\u05d5 \u05de\u05e1\u05e8:'
    },
    channels: {
      en: [
        "The founder's personal profile: positioned as a thought leader, consistent posting cadence, authentic voice.",
        "Company page: professional presence with organizational content reinforcing the personal strategy.",
        "Two additional senior team members: posts around the same message, from different perspectives."
      ],
      he: [
        '\u05d4\u05e4\u05e8\u05d5\u05e4\u05d9\u05dc \u05d4\u05d0\u05d9\u05e9\u05d9 \u05e9\u05dc \u05d4\u05de\u05d9\u05d9\u05e1\u05d3: \u05de\u05d9\u05e6\u05d5\u05d1 \u05db\u05de\u05d5\u05d1\u05d9\u05dc \u05d3\u05e2\u05d4 (Thought Leadership), \u05e7\u05e6\u05d1 \u05e4\u05d5\u05e1\u05d8\u05d9\u05dd \u05e2\u05e7\u05d1\u05d9, \u05e7\u05d5\u05dc \u05d0\u05d5\u05ea\u05e0\u05d8\u05d9 \u05e9\u05dc\u05d5.',
        '\u05e2\u05de\u05d5\u05d3 \u05d4\u05d7\u05d1\u05e8\u05d4: \u05e0\u05d5\u05db\u05d7\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05ea \u05e2\u05dd \u05ea\u05d5\u05db\u05df \u05d0\u05e8\u05d2\u05d5\u05e0\u05d9 \u05e9\u05de\u05d7\u05d6\u05e7 \u05d0\u05ea \u05d4\u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4 \u05d4\u05d0\u05d9\u05e9\u05d9\u05ea.',
        '\u05e9\u05e0\u05d9 \u05de\u05e0\u05d4\u05dc\u05d9\u05dd \u05d1\u05db\u05d9\u05e8\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd \u05de\u05d4\u05e6\u05d5\u05d5\u05ea: \u05e4\u05d5\u05e1\u05d8\u05d9\u05dd \u05e1\u05d1\u05d9\u05d1 \u05d0\u05d5\u05ea\u05d5 \u05de\u05e1\u05e8, \u05de\u05e0\u05e7\u05d5\u05d3\u05d5\u05ea \u05de\u05d1\u05d8 \u05e9\u05d5\u05e0\u05d5\u05ea.'
      ]
    },
    summary: {
      en: "In a startup where everyone shares the story, the voice needs to be heard from every direction. The goal was clear: funding round and investor meetings.",
      he: '\u05d1\u05e1\u05d8\u05d0\u05e8\u05d8\u05d0\u05e4 \u05e9\u05db\u05d5\u05dc\u05dd \u05e9\u05d5\u05ea\u05e4\u05d9\u05dd \u05dc\u05e1\u05d9\u05e4\u05d5\u05e8, \u05d4\u05e7\u05d5\u05dc \u05e6\u05e8\u05d9\u05da \u05dc\u05d4\u05d9\u05e9\u05de\u05e2 \u05de\u05db\u05dc \u05d4\u05db\u05d9\u05d5\u05d5\u05e0\u05d9\u05dd. \u05d4\u05de\u05d8\u05e8\u05d4 \u05d1\u05e8\u05d5\u05e8\u05d4: \u05e1\u05d1\u05d1 \u05d2\u05d9\u05d5\u05e1 \u05d5\u05e4\u05d2\u05d9\u05e9\u05d5\u05ea \u05e2\u05dd \u05de\u05e9\u05e7\u05d9\u05e2\u05d9\u05dd.'
    },
    agentLine: {
      en: 'My agents ran the daily pace across all three channels. I maintained voice, positioning, and strategy.',
      he: '\u05d4\u05e1\u05d5\u05db\u05e0\u05d9\u05dd \u05e9\u05dc\u05d9 \u05d4\u05e8\u05d9\u05e6\u05d5 \u05d0\u05ea \u05d4\u05e7\u05e6\u05d1 \u05d4\u05d9\u05d5\u05de\u05d9\u05d5\u05de\u05d9 \u05e2\u05dc \u05e9\u05dc\u05d5\u05e9\u05ea \u05d4\u05e2\u05e8\u05d5\u05e6\u05d9\u05dd. \u05d0\u05e0\u05d9 \u05e9\u05de\u05e8\u05ea\u05d9 \u05e2\u05dc \u05d4\u05e7\u05d5\u05dc, \u05e2\u05dc \u05d4\u05de\u05d9\u05e6\u05d5\u05d1, \u05d5\u05e2\u05dc \u05d4\u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4.'
    },
    resultsTitle: { en: 'Results, 3 months', he: '\u05ea\u05d5\u05e6\u05d0\u05d5\u05ea, 3 \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd' },
    results: [
      { num: '300%', label: { en: "Engagement increase on founder's profile", he: '\u05e2\u05dc\u05d9\u05d9\u05d4 \u05d1\u05de\u05e2\u05d5\u05e8\u05d1\u05d5\u05ea \u05d1\u05e4\u05e8\u05d5\u05e4\u05d9\u05dc \u05d4\u05de\u05d9\u05d9\u05e1\u05d3' } },
      { num: '250%', label: { en: 'Engagement increase on company page', he: '\u05e2\u05dc\u05d9\u05d9\u05d4 \u05d1\u05de\u05e2\u05d5\u05e8\u05d1\u05d5\u05ea \u05d1\u05e2\u05de\u05d5\u05d3 \u05d4\u05d7\u05d1\u05e8\u05d4' } },
      { num: '1,500+', label: { en: 'New business followers', he: '\u05e2\u05d5\u05e7\u05d1\u05d9\u05dd \u05e2\u05e1\u05e7\u05d9\u05d9\u05dd \u05d7\u05d3\u05e9\u05d9\u05dd' } },
    ],
    inbound: {
      en: 'Inbound inquiries from industry peers + direct investor meetings that came from LinkedIn presence',
      he: '\u05e4\u05e0\u05d9\u05d5\u05ea Inbound \u05de\u05e7\u05d5\u05dc\u05d2\u05d5\u05ea \u05d1\u05ea\u05d7\u05d5\u05dd + \u05e4\u05d2\u05d9\u05e9\u05d5\u05ea \u05d9\u05e9\u05d9\u05e8\u05d5\u05ea \u05e2\u05dd \u05de\u05e9\u05e7\u05d9\u05e2\u05d9\u05dd \u05e9\u05d4\u05d2\u05d9\u05e2\u05d5 \u05de\u05d4\u05e0\u05d5\u05db\u05d7\u05d5\u05ea \u05d1\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df'
    },
    bottomCta: { en: 'Want to understand what this could do for you?', he: '\u05e8\u05d5\u05e6\u05d9\u05dd \u05dc\u05d4\u05d1\u05d9\u05df \u05de\u05d4 \u05d6\u05d4 \u05d9\u05db\u05d5\u05dc \u05dc\u05e2\u05e9\u05d5\u05ea \u05d0\u05e6\u05dc\u05db\u05dd?' },
    cta: { en: "Let's Talk", he: '\u05d1\u05d5\u05d0\u05d5 \u05e0\u05d3\u05d1\u05e8' },
  },
  about: {
    title: { en: 'Who\'s behind OctaLoom', he: '\u05de\u05d9 \u05de\u05d0\u05d7\u05d5\u05e8\u05d9 OctaLoom' },
    text: {
      en: "I'm Hanita Yudovski, LinkedIn-Led Fractional CMO. I build AI-powered marketing systems that use LinkedIn as a growth engine. I work with B2B SaaS companies from pre-seed to Series A, founders, CEOs and SMBs on their marketing operations. What I build for clients, I run on my own business every day.",
      he: 'אני חניתה יודובסקי, LinkedIn-Led Fractional CMO. בונה מערכות שיווק מבוססות AI המשתמשות בלינקדאין כמנוע צמיחה. מלווה חברות B2B SaaS מ-pre-seed ועד Series A, מייסדים, מנכ"לים וSMBs במערך השיווק שלהם. מה שאני בונה ללקוחות, אני מריצה גם על העסק שלי כל יום, כך שלא תקבלו מה שאני לא מאמינה בו בעצמי.'
    },
    cta: { en: 'Follow me on LinkedIn', he: 'עקבו אחריי בלינקדאין' },
  },
  faq: {
    title: { en: 'FAQ', he: 'שאלות שחשוב לתת להן מענה בשבילך וגם בשביל ה-SEO 😅' },
    items: [
      {
        q: { en: 'Who are you and what is OctaLoom?', he: 'מי את ומה זה OctaLoom?' },
        a: { en: "I'm Hanita (Yudovski, but like Madonna my first name is enough 😅), a fractional marketing manager — or as I prefer, LinkedIn-Led Fractional CMO. OctaLoom is a boutique B2B marketing agency that works on LinkedIn strategy as a central axis, alongside vibe marketing (AI-based marketing), and also building AI agents for organizations and B2B businesses. I lead the strategy, and my AI agents do the daily work with me.", he: '\u05d0\u05e0\u05d9 \u05d7\u05e0\u05d9\u05ea\u05d4 (\u05d9\u05d5\u05d3\u05d5\u05d1\u05e1\u05e7\u05d9, \u05d0\u05d1\u05dc \u05db\u05de\u05d5 \u05de\u05d3\u05d5\u05e0\u05d4 \u05d4\u05e9\u05dd \u05d4\u05e4\u05e8\u05d8\u05d9 \u05e9\u05dc\u05d9 \u05de\u05e1\u05e4\u05d9\u05e7 \u1f605), \u05de\u05e0\u05d4\u05dc\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 \u05d1\u05de\u05d9\u05e7\u05d5\u05e8 \u05d7\u05d5\u05e5 \u05db\u05de\u05d5 \u05e9\u05d0\u05d5\u05de\u05e8\u05d9\u05dd \u05d1\u05e2\u05d1\u05e8\u05d9\u05ea \u05d0\u05d1\u05dc \u05d0\u05e0\u05d9 \u05de\u05e2\u05d3\u05d9\u05e4\u05d4 LinkedIn-Led Fractional CMO \u05db\u05d9 \u05d6\u05d4 \u05de\u05ea\u05d2\u05dc\u05d2\u05dc \u05e2\u05dc \u05d4\u05dc\u05e9\u05d5\u05df \u05d8\u05d5\u05d1 \u05d9\u05d5\u05ea\u05e8 \u05d5\u05d1\u05db\u05dc\u05dc \u05dc\u05d0 \u05ea\u05e8\u05d2\u05d9\u05dc \u05e9\u05dc \u05e7\u05dc\u05d9\u05e0\u05d0\u05d9\u05ea \u05ea\u05e7\u05e9\u05d5\u05e8\u05ea. \u05d1\u05d2\u05d3\u05d5\u05dc, OctaLoom \u05d4\u05d9\u05d0 \u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 B2B \u05d1\u05d5\u05d8\u05d9\u05e7\u05d9\u05ea \u05e9\u05e2\u05d5\u05d1\u05d3\u05ea \u05e2\u05dc \u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d9\u05ea \u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05db\u05e6\u05d9\u05e8 \u05de\u05e8\u05db\u05d6\u05d9, \u05dc\u05e6\u05d3 \u05d5\u05d5\u05d9\u05d1 \u05de\u05e8\u05e7\u05d8\u05d9\u05e0\u05d2 (\u05e9\u05d9\u05d5\u05d5\u05e7 \u05de\u05d1\u05d5\u05e1\u05e1 AI), \u05d5\u05db\u05de\u05d5 \u05db\u05df \u05d1\u05e0\u05d9\u05d9\u05ea \u05e1\u05d5\u05db\u05e0\u05d9 AI \u05e2\u05d1\u05d5\u05e8 \u05d0\u05e8\u05d2\u05d5\u05e0\u05d9\u05dd \u05d5\u05e2\u05e1\u05e7\u05d9 B2B. \u05d0\u05e0\u05d9 \u05de\u05d5\u05d1\u05d9\u05dc\u05d4 \u05d0\u05ea \u05d4\u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4, \u05d5\u05e1\u05d5\u05db\u05e0\u05d9 AI \u05e9\u05dc\u05d9 \u05e2\u05d5\u05e9\u05d9\u05dd \u05d0\u05d9\u05ea\u05d9 \u05d0\u05ea \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05d4\u05d9\u05d5\u05de\u05d9\u05d5\u05de\u05d9\u05ea.' }
      },
      {
        q: { en: 'What is a Fractional CMO and why do I need one?', he: '\u05de\u05d4 \u05d6\u05d4 Fractional CMO \u05d5\u05dc\u05de\u05d4 \u05d0\u05e0\u05d9 \u05e6\u05e8\u05d9\u05da \u05d0\u05d7\u05ea?' },
        a: { en: "A Fractional CMO is a senior marketing executive who works with you part-time. No full salary, no sick days, no social benefits. Instead of hiring a VP Marketing at 50K NIS a month, you get the same level of experience and execution in a model that fits a startup or medium business. And that's exactly what I offer.", he: 'בעברית לפונקציה הזאת קוראים סמנכ"לית/מנהלת שיווק במיקור חוץ אבל באנגלית זה יותר שווה. Fractional CMO היא מנהלת שיווק בכירה שעובדת איתכם במשרה חלקית. בלי משכורת מלאה, בלי ימי מחלה, בלי תנאים סוציאליים. במקום לגייס VP Marketing ב-50K שקל בחודש, מקבלים את אותה רמה של ניסיון וביצוע במודל שמתאים לסטארטאפ או עסק בינוני. וזה בידיוק מה שאני מציעה.' }
      },
      {
        q: { en: 'How is OctaLoom different from a regular agency?', he: 'במה OctaLoom שונה מסוכנות שיווק רגילה?' },
        a: { en: "A regular agency gets a monthly retainer, puts juniors on the project, and swaps contact people constantly. At OctaLoom you work directly with me and my AI agents and tools. I lead the strategy and build a team of AI agents that executes. Fewer layers, more execution, the same person guiding you from start to results.", he: 'סוכנות רגילה מקבלת ריטיינר חודשי, ושמה ג׳וניורים על הפרויקט, ומחליפה אנשי קשר כל שני וחמישי (מנהלת הלקוחות פתאום בחו"ל אז נכנסת מישהי להחליף אותה ועד שאתם מבינים איך לעבוד איתה הופס היה עוד איזה שינוי ומשהו בפרויקט נפל בין הכיסאות). ב- OctaLoom אתם עובדים ישירות איתי ועם סוכני וכלי ה-AI שלי. אני מובילה את האסטרטגיה ובונה צוות של סוכני AI שמבצע את העבודה. פחות שכבות, יותר ביצוע, אותו ראש שמלווה אתכם מתחילת הדרך עד לתוצאות.' }
      },
      {
        q: { en: 'How do AI agents work in marketing?', he: 'איך עובדים סוכני AI בשיווק?' },
        a: { en: "In every project I build dedicated AI agents that do what an entire marketing department would do: generate content in your style, run automations, analyze LinkedIn data and generate leads. AI works at an insane pace, I maintain quality and strategy.", he: '\u05d1\u05db\u05dc \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8 \u05d0\u05e0\u05d9 \u05d1\u05d5\u05e0\u05d4 \u05e1\u05d5\u05db\u05e0\u05d9 AI \u05d9\u05d9\u05e2\u05d5\u05d3\u05d9\u05d9\u05dd \u05e9\u05e2\u05d5\u05e9\u05d9\u05dd \u05d0\u05ea \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05e9\u05de\u05d7\u05dc\u05e7\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 \u05e9\u05dc\u05de\u05d4 \u05d4\u05d9\u05d9\u05ea\u05d4 \u05e2\u05d5\u05e9\u05d4: \u05de\u05d9\u05d9\u05e6\u05e8\u05d9\u05dd \u05ea\u05d5\u05db\u05df \u05dc\u05e4\u05d9 \u05d4\u05e1\u05d2\u05e0\u05d5\u05df \u05e9\u05dc\u05db\u05dd, \u05de\u05e4\u05e2\u05d9\u05dc\u05d9\u05dd \u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d5\u05ea, \u05de\u05e0\u05ea\u05d7\u05d9\u05dd \u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05de\u05d4\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05d5\u05de\u05d9\u05d9\u05e6\u05e8\u05d9\u05dd \u05dc\u05d9\u05d3\u05d9\u05dd. \u05d4-AI \u05e2\u05d5\u05d1\u05d3 \u05d1\u05e7\u05e6\u05d1 \u05de\u05d8\u05d5\u05e8\u05e3, \u05d0\u05e0\u05d9 \u05e9\u05d5\u05de\u05e8\u05ea \u05e2\u05dc \u05d4\u05d0\u05d9\u05db\u05d5\u05ea \u05d5\u05d4\u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4.' }
      },
      {
        q: { en: 'What company size do you work with?', he: '\u05de\u05d0\u05d9\u05d6\u05d4 \u05d2\u05d5\u05d3\u05dc \u05d7\u05d1\u05e8\u05d4 \u05e2\u05d5\u05d1\u05d3\u05d9\u05dd \u05d9\u05d7\u05d3?' },
        a: { en: "I mainly work with B2B companies from pre-seed to Series A: SaaS, hi-tech and professional service providers. If you have a product or service that works but don't yet have a marketing department, or you have a lean team that needs to accelerate performance, let's talk.", he: '\u05d0\u05e0\u05d9 \u05e2\u05d5\u05d1\u05d3\u05ea \u05d1\u05e2\u05d9\u05e7\u05e8 \u05e2\u05dd \u05d7\u05d1\u05e8\u05d5\u05ea B2B \u05de-pre-seed \u05d5\u05e2\u05d3 Series A: SaaS, \u05d4\u05d9\u05d9-\u05d8\u05e7 \u05d5\u05e0\u05d5\u05ea\u05e0\u05d9 \u05e9\u05d9\u05e8\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d9\u05dd. \u05d0\u05dd \u05d9\u05e9 \u05dc\u05db\u05dd \u05de\u05d5\u05e6\u05e8 \u05d0\u05d5 \u05e9\u05d9\u05e8\u05d5\u05ea \u05e9\u05e2\u05d5\u05d1\u05d3 \u05d0\u05d1\u05dc \u05d0\u05d9\u05df \u05e2\u05d3\u05d9\u05d9\u05df \u05de\u05d7\u05dc\u05e7\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7, \u05d0\u05d5 \u05e9\u05d9\u05e9 \u05dc\u05db\u05dd \u05e6\u05d5\u05d5\u05ea \u05e8\u05d6\u05d4 \u05e9\u05e6\u05e8\u05d9\u05da \u05dc\u05d4\u05d0\u05d9\u05e5 \u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d5\u05d0\u05d9\u05df \u05dc\u05db\u05dd \u05d0\u05e4\u05e9\u05e8\u05d5\u05ea \u05dc\u05d2\u05d9\u05d9\u05e1 \u05e2\u05d5\u05d3 \u05d0\u05e0\u05e9\u05d9\u05dd, \u05e9\u05d5\u05d5\u05d4 \u05e9\u05e0\u05d3\u05d1\u05e8.' }
      },
            {
        q: { en: 'Why LinkedIn specifically and not another platform?', he: '\u05dc\u05de\u05d4 \u05d3\u05d5\u05d5\u05e7\u05d0 \u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05d5\u05dc\u05d0 \u05e4\u05dc\u05d8\u05e4\u05d5\u05e8\u05de\u05d4 \u05d0\u05d7\u05e8\u05ea?' },
        a: { en: "Because that's where B2B decision makers are. Not on Instagram, definitely not on TikTok. Founders looking for suppliers, HR managers looking for training solutions, CTOs reading about new trends \u2014 they're all on LinkedIn. The question is whether they see you there.", he: 'כי שם נמצאים מקבלי ההחלטות בעולמות ה-B2B. לא באינסטגרם, ובטח לא בטיקטוק. מייסד שמחפש ספק, מנהלת HR שמחפשת פתרון הדרכה, סמנכ"ל טכנולוגיה שקורא על טרנדים חדשים — כולם בלינקדאין. השאלה היא אם הם רואים אותך שם.' }
      },
    ],
  },
  finalCta: {
    title: { en: "Let's Build Your Growth Engine", he: '\u05d1\u05d5\u05d0\u05d5 \u05e0\u05d1\u05e0\u05d4 \u05d0\u05ea \u05de\u05e0\u05d5\u05e2 \u05d4\u05e6\u05de\u05d9\u05d7\u05d4 \u05e9\u05dc\u05db\u05dd' },
    sub: {
      en: 'No pitch. Just a real conversation about what you actually need.',
      he: '\u05d1\u05dc\u05d9 \u05de\u05db\u05d9\u05e8\u05d4. \u05e8\u05e7 \u05e9\u05d9\u05d7\u05d4 \u05d0\u05de\u05d9\u05ea\u05d9\u05ea \u05e2\u05dc \u05de\u05d4 \u05e9\u05d0\u05ea\u05dd \u05d1\u05d0\u05de\u05ea \u05e6\u05e8\u05d9\u05db\u05d9\u05dd.'
    },
    cta: { en: "Let's Talk", he: '\u05d1\u05d5\u05d0\u05d5 \u05e0\u05d3\u05d1\u05e8' },
    formName: { en: 'Full name', he: '\u05e9\u05dd \u05de\u05dc\u05d0' },
    formEmail: { en: 'Email', he: '\u05d0\u05d9\u05de\u05d9\u05d9\u05dc' },
    formCompany: { en: 'Company', he: '\u05d7\u05d1\u05e8\u05d4' },
    formBg: { en: 'Brief background', he: '\u05e8\u05e7\u05e2 \u05e7\u05e6\u05e8' },
    formConsent: {
      en: 'I agree to receive marketing content, updates and focused tips from OctaLoom',
      he: '\u05d0\u05e0\u05d9 \u05de\u05e1\u05db\u05d9\u05dd \u05dc\u05e7\u05d1\u05dc \u05ea\u05db\u05e0\u05d9\u05dd \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05d9\u05dd, \u05e2\u05d3\u05db\u05d5\u05e0\u05d9\u05dd \u05d5\u05d8\u05d9\u05e4\u05d9\u05dd \u05de\u05de\u05d5\u05e7\u05d3\u05d9\u05dd \u05de- OctaLoom'
    },
    formSend: { en: 'Send', he: '\u05e9\u05dc\u05d9\u05d7\u05d4' },
  },
  linkedinFeed: {
    title: { en: "What's new on LinkedIn", he: '\u05de\u05d4 \u05d7\u05d3\u05e9 \u05d1\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df' },
    sub: { en: 'Tips, insights and real conversations about B2B marketing', he: '\u05d8\u05d9\u05e4\u05d9\u05dd, \u05ea\u05d5\u05d1\u05e0\u05d5\u05ea \u05d5\u05e9\u05d9\u05d7\u05d5\u05ea \u05d0\u05de\u05d9\u05ea\u05d9\u05d5\u05ea \u05e2\u05dc \u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05d5\u05e9\u05d9\u05d5\u05d5\u05e7 B2B.' },
    followCta: { en: 'Follow me on LinkedIn', he: '\u05e2\u05e7\u05d1\u05d5 \u05d0\u05d7\u05e8\u05d9\u05d9 \u05d1\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df' },
  },
  blog: {
    title: { en: 'Blog (yes, there\'s one too)', he: '\u05d1\u05dc\u05d5\u05d2 (\u05db\u05df, \u05d9\u05e9 \u05d2\u05dd \u05db\u05d6\u05d4)' },
    sub: {
      en: 'Articles on LinkedIn, B2B marketing, and how to use AI the smart way that doesn\'t sound like AI.',
      he: '\u05de\u05d0\u05de\u05e8\u05d9\u05dd \u05e2\u05dc \u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df, \u05e9\u05d9\u05d5\u05d5\u05e7 B2B, \u05d5\u05d0\u05d9\u05da \u05dc\u05d4\u05e9\u05ea\u05de\u05e9 \u05d1-AI \u05d1\u05e6\u05d5\u05e8\u05d4 \u05d7\u05db\u05de\u05d4 \u05e9\u05dc\u05d0 \u05e0\u05e9\u05de\u05e2\u05ea \u05db\u05de\u05d5 AI.'
    },
    readMore: { en: 'Read more', he: '\u05e7\u05e8\u05d0\u05d5 \u05e2\u05d5\u05d3' },
    viewAll: { en: 'Full Blog', he: '\u05dc\u05d1\u05dc\u05d5\u05d2 \u05d4\u05de\u05dc\u05d0' },
    // Placeholder articles
    posts: [
      { title: { en: 'Article title placeholder', he: '\u05db\u05d5\u05ea\u05e8\u05ea \u05de\u05d0\u05de\u05e8 - \u05de\u05de\u05ea\u05d9\u05e0\u05d4 \u05dc\u05ea\u05d5\u05db\u05df' }, date: '2026-04' },
      { title: { en: 'Article title placeholder', he: '\u05db\u05d5\u05ea\u05e8\u05ea \u05de\u05d0\u05de\u05e8 - \u05de\u05de\u05ea\u05d9\u05e0\u05d4 \u05dc\u05ea\u05d5\u05db\u05df' }, date: '2026-04' },
      { title: { en: 'Article title placeholder', he: '\u05db\u05d5\u05ea\u05e8\u05ea \u05de\u05d0\u05de\u05e8 - \u05de\u05de\u05ea\u05d9\u05e0\u05d4 \u05dc\u05ea\u05d5\u05db\u05df' }, date: '2026-03' },
    ],
  },
  newsletter: {
    title: { en: "What you won't see in the feed", he: '\u05de\u05d4 \u05e9\u05dc\u05d0 \u05e8\u05d5\u05d0\u05d9\u05dd \u05d1\u05e4\u05d9\u05d3' },
    sub: {
      en: "Best enjoyed with a cocktail or coffee (I don't judge). Twice a month I send a (super polished \u2728) email with LinkedIn trends, new AI marketing content, project stories, things I learned, and what's actually working.",
      he: '\u05de\u05d5\u05de\u05dc\u05e5 \u05dc\u05e7\u05e8\u05d5\u05d0 \u05dc\u05e6\u05d3 \u05e7\u05d5\u05e7\u05d8\u05d9\u05d9\u05dc \u05d0\u05d5 \u05e7\u05e4\u05d4 (\u05d0\u05e0\u05d9 \u05dc\u05d0 \u05e9\u05d5\u05e4\u05d8\u05ea). \u05e4\u05e2\u05de\u05d9\u05d9\u05dd \u05d1\u05d7\u05d5\u05d3\u05e9 \u05d0\u05e0\u05d9 \u05e9\u05d5\u05dc\u05d7\u05ea \u05de\u05d9\u05d9\u05dc (\u05e1\u05d5\u05e4\u05e8 \u05de\u05d5\u05e9\u05e7\u05e2 \u2728) \u05e2\u05dd \u05db\u05dc \u05de\u05d9\u05e0\u05d9 \u05d8\u05e8\u05e0\u05d3\u05d9\u05dd \u05d1\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05d5\u05ea\u05db\u05e0\u05d9\u05dd \u05d7\u05d3\u05e9\u05d9\u05dd \u05dc\u05d9\u05d9\u05e2\u05d5\u05dc \u05d5\u05e9\u05d9\u05e4\u05d5\u05e8 \u05ea\u05d4\u05dc\u05d9\u05db\u05d9 \u05e9\u05d9\u05d5\u05d5\u05e7 \u05d1-AI, \u05dc\u05e6\u05d3 \u05e1\u05d9\u05e4\u05d5\u05e8\u05d9\u05dd \u05de\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9\u05dd, \u05d3\u05d1\u05e8\u05d9\u05dd \u05e9\u05dc\u05de\u05d3\u05ea\u05d9, \u05d5\u05de\u05d4 \u05e9\u05de\u05e6\u05d0\u05ea\u05d9 \u05e9\u05e2\u05d5\u05d1\u05d3.'
    },
    placeholder: { en: 'Enter your email', he: '\u05d4\u05db\u05e0\u05d9\u05e1\u05d5 \u05d0\u05d9\u05de\u05d9\u05d9\u05dc' },
    btn: { en: 'Subscribe', he: '\u05d4\u05e6\u05d8\u05e8\u05e4\u05d5' },
  },
  footer: {
    tagline: { en: 'Your marketing department, without the department.', he: '\u05de\u05d7\u05dc\u05e7\u05ea \u05d4\u05e9\u05d9\u05d5\u05d5\u05e7 \u05e9\u05dc\u05da, \u05e8\u05e7 \u05d1\u05dc\u05d9 \u05d4\u05de\u05d7\u05dc\u05e7\u05d4.' },
    linkedinServices: { en: 'LinkedIn Services', he: '\u05e9\u05d9\u05e8\u05d5\u05ea\u05d9 \u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df' },
    moreServices: { en: 'More Services', he: '\u05e9\u05d9\u05e8\u05d5\u05ea\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd' },
    connect: { en: 'Connect', he: '\u05d4\u05ea\u05d7\u05d1\u05e8\u05d5' },
    privacy: { en: 'Privacy', he: '\u05e4\u05e8\u05d8\u05d9\u05d5\u05ea' },
    terms: { en: 'Terms', he: '\u05ea\u05e0\u05d0\u05d9\u05dd' },
  },
};

// ─── NAV ─────────────────────────────────────────────────────────────────────
function HPNav() {
  const { lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [linkedinOpen, setLinkedinOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const dir = lang === "he" ? "rtl" : "ltr"
  const w = useWindowSize()
  const isMobile = w < 768

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
        setLinkedinOpen(false)
      }
    }
    document.addEventListener("mousedown", fn)
    return () => document.removeEventListener("mousedown", fn)
  }, [])

  const linkedinSub = [
    { en: "LinkedIn for Organizations",             he: "לינקדאין לארגונים",               href: "/services/linkedin-for-organizations" },
    { en: "LinkedIn for Executives",                he: "לינקדאין למנהלים",                href: "/services/linkedin-for-executives" },
    { en: "LinkedIn for Solopreneurs & Biz Owners", he: "לינקדאין לעצמאים ובעלי עסקים", href: "/services/linkedin-for-solopreneurs" },
  ]

  const services = [
    { en: "LinkedIn Growth Engine", he: "מנוע צמיחה בלינקדאין", href: "/services/linkedin-growth-engine", sub: linkedinSub },
    { en: "Fractional CMO",         he: "Fractional CMO",                                                                                                    href: "/services/fractional-cmo",          sub: null },
    { en: "AI Tools & Agents",      he: "כלי AI וסוכנים",                                                 href: "/services/ai-tools-agents",         sub: null },
  ]

  const navBg: React.CSSProperties = scrolled
    ? { background: "rgba(236,233,231,0.92)", backdropFilter: "blur(20px) saturate(1.4)", borderBottom: `1px solid rgba(113,46,172,0.12)` }
    : { background: "transparent" }

  const dropBase: React.CSSProperties = {
    position: "absolute",
    minWidth: 240,
    background: "white",
    borderRadius: 12,
    boxShadow: "0 8px 40px rgba(113,46,172,0.15), 0 2px 8px rgba(0,0,0,0.06)",
    border: "1px solid rgba(113,46,172,0.08)",
    zIndex: 200,
    padding: "8px 0",
  }

  const dropItem: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "10px 18px", fontSize: 14, color: C.deepPurple,
    textDecoration: "none", cursor: "pointer", transition: "background 0.2s",
    fontFamily: F.body, gap: 8, whiteSpace: "nowrap", background: "transparent",
  }

  return (
    <nav dir={dir} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "10px 0" : "16px 0", transition: "all 0.4s", ...navBg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)",
        display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <LogoSVG />
        </a>

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>

            {/* Services dropdown */}
            <div ref={servicesRef} style={{ position: "relative" }}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => { setServicesOpen(false); setLinkedinOpen(false) }}>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14,
                color: servicesOpen ? C.deepPurple : C.textDim, fontFamily: F.body,
                display: "flex", alignItems: "center", gap: 5, padding: "6px 0", transition: "color 0.25s" }}>
                {lang === "he" ? "שירותים" : "Services"}
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
                  style={{ transition: "transform 0.25s", transform: servicesOpen ? "rotate(180deg)" : "none" }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}
                    style={{ ...dropBase, top: "calc(100% + 10px)", [dir === "rtl" ? "right" : "left"]: 0 }}>
                    {services.map((svc, i) => (
                      <div key={i} style={{ position: "relative" }}
                        onMouseEnter={() => { if (svc.sub) setLinkedinOpen(true) }}
                        onMouseLeave={() => { if (svc.sub) setLinkedinOpen(false) }}>
                        <a href={svc.href} style={dropItem}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(113,46,172,0.05)" }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent" }}>
                          <span>{lang === "he" ? svc.he : svc.en}</span>
                          {svc.sub && (
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
                              style={{ opacity: 0.45, flexShrink: 0, transform: dir === "rtl" ? "rotate(180deg)" : "none" }}>
                              <path d="M4 2l4 4-4 4" stroke={C.deepPurple} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </a>

                        <AnimatePresence>
                          {svc.sub && linkedinOpen && (
                            <motion.div initial={{ opacity: 0, x: dir === "rtl" ? 6 : -6 }}
                              animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir === "rtl" ? 6 : -6 }}
                              transition={{ duration: 0.15 }}
                              style={{ ...dropBase, top: 0,
                                ...(dir === "rtl"
                                  ? { right: "calc(100% + 6px)" }
                                  : { left: "calc(100% + 6px)" })
                              }}>
                              {linkedinSub.map((sub, j) => (
                                <a key={j} href={sub.href}
                                  style={{ ...dropItem, justifyContent: "flex-start" }}
                                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(113,46,172,0.05)" }}
                                  onMouseLeave={e => { e.currentTarget.style.background = "transparent" }}>
                                  {lang === "he" ? sub.he : sub.en}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About / Blog / Contact */}
            {([
              { en: "About",   he: "עליי",      href: "#about" },
              { en: "Blog",    he: "בלוג",      href: "/blog" },
              { en: "Contact", he: "צור קשר",  href: "#contact" },
            ] as {en:string;he:string;href:string}[]).map((item, i) => (
              <a key={i} href={item.href}
                style={{ fontSize: 14, color: C.textDim, textDecoration: "none", fontFamily: F.body, transition: "color 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.deepPurple)}
                onMouseLeave={e => (e.currentTarget.style.color = C.textDim)}>
                {lang === "he" ? item.he : item.en}
              </a>
            ))}

            {/* Goodies */}
            <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 14, color: C.textDim, textDecoration: "none", fontFamily: F.body, transition: "color 0.25s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.deepPurple)}
              onMouseLeave={e => (e.currentTarget.style.color = C.textDim)}>
              Goodies
            </a>

            {/* Lang toggle */}
            <div style={{ display: "flex", gap: 2, background: "rgba(113,46,172,0.06)", borderRadius: 6, padding: 2 }}>
              {["en","he"].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? C.purple : "none",
                  color: lang === l ? "white" : C.textDim, border: "none", cursor: "pointer",
                  fontSize: 12, fontWeight: 700, padding: "5px 10px", borderRadius: 4, transition: "all 0.25s",
                  fontFamily: F.body }}>
                  {l === "en" ? "EN" : "עב"}
                </button>
              ))}
            </div>

            <Btn href="https://calendar.notion.so/meet/octaloom/discovery" variant="purple"
              style={{ padding: "8px 20px", fontSize: 13 }}>
              {hpT(HP.hero.cta1)}
            </Btn>
          </div>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none",
            cursor: "pointer", width: 28, height: 20, position: "relative" }}>
            {[0,9,18].map((top,i) => (
              <span key={i} style={{ position: "absolute", left: 0, width: "100%", height: 2,
                background: C.deepPurple, borderRadius: 2, top,
                transform: mobileOpen && i===0 ? "rotate(45deg) translateY(9px)" : mobileOpen && i===1 ? "scaleX(0)" : mobileOpen && i===2 ? "rotate(-45deg) translateY(-9px)" : "none",
                opacity: mobileOpen && i===1 ? 0 : 1, transition: "all 0.3s" }} />
            ))}
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && mobileOpen && (
        <div style={{ position: "fixed", inset: 0, background: C.cream, zIndex: 99,
          display: "flex", flexDirection: "column", padding: "100px 32px 40px",
          overflowY: "auto", gap: 0 }}>

          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color: C.purple, fontFamily: F.body, marginBottom: 10 }}>
            {lang === "he" ? "שירותים" : "Services"}
          </div>

          {services.map((svc, i) => (
            <div key={i} style={{ borderBottom: `1px solid rgba(113,46,172,0.07)` }}>
              <a href={svc.href} onClick={() => setMobileOpen(false)}
                style={{ display: "block", fontSize: 18, color: C.deepPurple, textDecoration: "none",
                  fontFamily: F.body, padding: "12px 0", fontWeight: svc.sub ? 600 : 400 }}>
                {lang === "he" ? svc.he : svc.en}
              </a>
              {svc.sub && svc.sub.map((sub, j) => (
                <a key={j} href={sub.href} onClick={() => setMobileOpen(false)}
                  style={{ display: "block", fontSize: 15, color: C.purple, textDecoration: "none",
                    fontFamily: F.body, padding: "8px 0",
                    paddingLeft: dir === "ltr" ? 16 : 0, paddingRight: dir === "rtl" ? 16 : 0 }}>
                  {lang === "he" ? sub.he : sub.en}
                </a>
              ))}
            </div>
          ))}

          {([
            { en: "About",   he: "עליי",     href: "#about" },
            { en: "Blog",    he: "בלוג",     href: "/blog" },
            { en: "Contact", he: "צור קשר", href: "#contact" },
          ] as {en:string;he:string;href:string}[]).map((item, i) => (
            <a key={i} href={item.href} onClick={() => setMobileOpen(false)}
              style={{ display: "block", fontSize: 18, color: C.deepPurple, textDecoration: "none",
                fontFamily: F.body, padding: "14px 0", borderBottom: `1px solid rgba(113,46,172,0.07)` }}>
              {lang === "he" ? item.he : item.en}
            </a>
          ))}

          <a href="https://octagoodies.com" target="_blank" onClick={() => setMobileOpen(false)}
            style={{ fontSize: 18, color: C.deepPurple, textDecoration: "none",
              fontFamily: F.body, padding: "14px 0", borderBottom: `1px solid rgba(113,46,172,0.07)` }}>
            Goodies
          </a>

          <div style={{ display: "flex", gap: 8, marginTop: 28 }}>
            {["en","he"].map(l => (
              <button key={l} onClick={() => { setLang(l); setMobileOpen(false) }}
                style={{ background: lang === l ? C.purple : "transparent", color: lang === l ? "white" : C.textDim,
                  border: `1px solid ${lang === l ? C.purple : C.textDim}`, borderRadius: 6,
                  padding: "8px 16px", cursor: "pointer", fontFamily: F.body, fontWeight: 700 }}>
                {l === "en" ? "EN" : "עברית"}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Btn href="https://calendar.notion.so/meet/octaloom/discovery" variant="purple">
              {hpT(HP.hero.cta1)}
            </Btn>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
function HPMarquee() {
  const { lang } = useLang()
  const items = lang === "he" ? HP.marquee.he : HP.marquee.en
  const doubled = [...items,...items,...items,...items]
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(113,46,172,0.1)",
      borderBottom: "1px solid rgba(113,46,172,0.1)", padding: "14px 0", background: C.purple, marginTop: 60 }}>
      <motion.div style={{ display: "flex", whiteSpace: "nowrap", willChange: "transform" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}>
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.85)", padding: "0 20px",
              fontFamily: F.body }}>{item}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>\u2726</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function HPHero() {
  const { lang } = useLang()
  const dir = lang === "he" ? "rtl" : "ltr"
  const w = useWindowSize()
  const isMobile = w < 768

  const avatarColors = ["#9b59b6","#3498db","#27ae60","#e67e22","#e74c3c"]
  const avatarLetters = ["Y","M","R","S","N"]

  return (
    <section dir={dir} style={{ position: "relative", minHeight: "100vh", display: "flex",
      flexDirection: "column", justifyContent: "center", paddingTop: 100,
      overflow: "hidden", background: C.cream }}>

      {/* Ambient glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%",
          background: C.purple, filter: "blur(120px)", opacity: 0.12, top: "-10%", right: "10%" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: C.lime, filter: "blur(120px)", opacity: 0.08, bottom: "5%", left: "-5%" }} />
        <div style={{ position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(113,46,172,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(113,46,172,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%,black 20%,transparent 70%)",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%,black 20%,transparent 70%)" }} />
      </div>

      <Container style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 48, alignItems: "center" }}>

          {/* Text column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Reveal>
              <span style={{ display: "inline-flex", alignSelf: "flex-start", fontSize: 12, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase", color: C.purple,
                padding: "6px 16px", borderRadius: 20, border: `1px solid rgba(113,46,172,0.2)`,
                background: "rgba(113,46,172,0.06)", fontFamily: F.body }}>
                {hpT(HP.hero.pill)}
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 style={{ fontFamily: F.display, fontWeight: 700,
                fontSize: "clamp(34px,5vw,60px)", lineHeight: 1.08,
                letterSpacing: "-0.02em", color: C.deepPurple, whiteSpace: "pre-line", margin: 0 }}>
                {hpT(HP.hero.h1).split("\n").map((line: string, i: number) => {
                  const isLast = i === hpT(HP.hero.h1).split("\n").length - 1
                  return (
                    <span key={i} style={{ display: "block",
                      color: (line.includes("\u05de\u05d7\u05dc\u05e7\u05d4") || line.includes("department")) ? C.purple : C.deepPurple }}>
                      {line}
                    </span>
                  )
                })}
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p style={{ fontSize: 17, color: C.textDim, maxWidth: 480, lineHeight: 1.65,
                margin: 0, fontFamily: F.body }}>
                {hpT(HP.hero.sub)}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap",
                flexDirection: isMobile ? "column" : "row" }}>
                <Btn href="https://calendar.notion.so/meet/octaloom/discovery" variant="purple">
                  {hpT(HP.hero.cta1)}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Btn>
                <Btn href="#services" variant="ghost">{hpT(HP.hero.cta2)}</Btn>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 8 }}>
                <div style={{ display: "flex" }}>
                  {avatarColors.map((bg, i) => (
                    <div key={i} style={{ width: 34, height: 34, borderRadius: "50%",
                      border: `2px solid ${C.cream}`, marginLeft: i === 0 ? 0 : -8,
                      background: bg, display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700, color: "white", fontFamily: F.body }}>
                      {avatarLetters[i]}
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: 13, color: C.textDim, lineHeight: 1.4, fontFamily: F.body }}>
                  {hpT(HP.hero.trustTop)}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Video column */}
          {!isMobile && (
            <Reveal delay={200}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "relative", width: "100%", maxWidth: 520, borderRadius: 16,
                  overflow: "hidden", boxShadow: `0 8px 40px rgba(32,30,75,0.15),0 0 0 1px rgba(113,46,172,0.1)` }}>
                  <video autoPlay muted loop playsInline
                    src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/hero-video.mp4"
                    style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover",
                      background: "rgba(113,46,172,0.04)" }} />
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </Container>

      <HPMarquee />
    </section>
  )
}

// ─── PROBLEM ─────────────────────────────────────────────────────────────────
function HPProblem() {
  const w = useWindowSize(); const isMobile = w < 768
  return (
    <Sec bg={C.cream}>
      <Container>
        <Reveal>
          <h2 style={{ fontFamily: F.display, fontWeight: 500, fontSize: "clamp(28px,4vw,48px)",
            lineHeight: 1.15, letterSpacing: "-0.015em", color: C.deepPurple, marginBottom: 48 }}>
            {hpT(HP.problem.title)}
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
          gap: 20, marginBottom: 48 }}>
          {HP.problem.cards.map((c: any, i: number) => (
            <Reveal key={i} delay={i * 150}>
              <div style={{ background: "white", border: "1px solid rgba(32,30,75,0.06)",
                borderRadius: 12, padding: "32px 28px", height: "100%",
                display: "flex", flexDirection: "column" }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 36, height: 36, borderRadius: 8, background: C.redX,
                  color: C.redXText, fontSize: 16, fontWeight: 700, marginBottom: 16,
                  fontFamily: F.body }}>\u2715</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8,
                  color: C.deepPurple, margin: "0 0 8px", fontFamily: F.body }}>{hpT(c.label)}</h3>
                <p style={{ fontSize: 14, color: C.textDim, lineHeight: 1.6, margin: 0,
                  fontFamily: F.body }}>{hpT(c.sub)}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={500}>
          <p style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: C.textDim,
            letterSpacing: "0.02em", margin: 0, fontFamily: F.body }}>
            {hpT(HP.problem.none)}
          </p>
        </Reveal>
      </Container>
    </Sec>
  )
}

// ─── FOURTH OPTION ────────────────────────────────────────────────────────────
function HPFourthOption() {
  return (
    <Sec bg={C.purple}>
      <Container>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: F.display, fontWeight: 500,
              fontSize: "clamp(28px,4vw,44px)", color: C.lime, marginBottom: 28,
              textAlign: "center" }}>{hpT(HP.fourthOption.but)}</p>
          </Reveal>
          <Reveal delay={150}>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,0.8)",
              marginBottom: 20, fontFamily: F.body }}>{hpT(HP.fourthOption.desc)}</p>
          </Reveal>
          <Reveal delay={250}>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.95)",
              fontWeight: 600, marginBottom: 32, fontFamily: F.body }}>{hpT(HP.fourthOption.value)}</p>
          </Reveal>
          <Reveal delay={350}>
            <div style={{ textAlign: "center" }}>
              <Btn href="https://calendar.notion.so/meet/octaloom/discovery" variant="white">
                {hpT(HP.fourthOption.cta)}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Btn>
            </div>
          </Reveal>
        </div>
      </Container>
    </Sec>
  )
}

// ─── SERVICES / TEAR-OFF POSTER ──────────────────────────────────────────────
function HPServices() {
  const { lang } = useLang()
  const [torn, setTorn] = useState<Record<number,boolean>>({})
  const [tearing, setTearing] = useState<number|null>(null)

  const serviceUrls: Record<number,string> = {
    0: "/services/linkedin-for-executives",
    1: "/services/linkedin-for-solopreneurs",
    2: "/services/linkedin-for-organizations",
    3: "/services/fractional-cmo",
    4: "/services/ai-tools-agents",
  }

  const stripIcons = [
    <svg viewBox="0 0 24 24" fill="none" stroke={C.purple} strokeWidth="1.5" style={{ width: 48, height: 48 }}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke={C.purple} strokeWidth="1.5" style={{ width: 48, height: 48 }}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke={C.purple} strokeWidth="1.5" style={{ width: 48, height: 48 }}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V12h6v10M9 6h.01M15 6h.01M9 10h.01M15 10h.01"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke={C.purple} strokeWidth="1.5" style={{ width: 48, height: 48 }}><path d="M12 2l2.09 6.26L20 9.27l-4.91 3.82L16.18 20 12 16.77 7.82 20l1.09-6.91L4 9.27l5.91-1.01L12 2z"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke={C.purple} strokeWidth="1.5" style={{ width: 48, height: 48 }}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>,
  ]

  const handleTear = (i: number) => {
    if (torn[i] || tearing !== null) return
    setTearing(i)
    setTimeout(() => {
      setTearing(null)
      setTorn(prev => ({ ...prev, [i]: true }))
    }, 600)
  }

  return (
    <Sec bg={C.cream} id="services">
      <Container>
        <Reveal>
          <h2 style={{ fontFamily: F.display, fontWeight: 500, fontSize: "clamp(28px,4vw,48px)",
            lineHeight: 1.15, color: C.deepPurple, marginBottom: 48 }}>
            {hpT(HP.services.title)}
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ position: "relative", maxWidth: 860, margin: "0 auto",
            background: "#f4f1ec", borderRadius: 1, padding: "48px 32px 0",
            transform: "rotate(-0.3deg)", border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "3px 5px 18px rgba(32,30,75,0.1),0 1px 3px rgba(0,0,0,0.06)" }}>

            {/* Tape strips */}
            {[["40px","-8px","-4deg"],["right:40px","-8px","3deg"]].map(([pos,top,rot],i) => (
              <div key={i} style={{ position: "absolute", top, zIndex: 3,
                width: 64, height: 22, background: "rgba(220,210,180,0.5)", borderRadius: 1,
                boxShadow: "0 1px 2px rgba(0,0,0,0.08)", transform: `rotate(${rot})`,
                ...(i === 0 ? { left: 40 } : { right: 40 }) }} />
            ))}

            <p style={{ fontFamily: F.display, fontWeight: 500,
              fontSize: "clamp(40px,7vw,72px)", lineHeight: 1.05, color: C.deepPurple,
              textAlign: "center", letterSpacing: "-0.02em", marginBottom: 48, position: "relative", zIndex: 1,
              whiteSpace: "pre-line" }}>
              {lang === "he" ? "\u05e7\u05d7\u05d5 \u05de\u05d4\n\u05e9\u05d0\u05ea\u05dd \u05e6\u05e8\u05d9\u05db\u05d9\u05dd" : "TAKE WHAT\nYOU NEED"}
            </p>

            <div style={{ position: "relative", zIndex: 1, display: "flex",
              borderTop: `2px dashed ${C.purple}` }}>
              {HP.services.strips.map((strip: any, i: number) => (
                <motion.div key={i}
                  animate={tearing === i ? { y: 60, rotate: -8, opacity: 0 }
                    : torn[i] ? { opacity: 0.25 }
                    : { y: 0, rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleTear(i)}
                  style={{ flex: 1, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "flex-start",
                    padding: "24px 8px 28px", cursor: torn[i] ? "default" : "pointer",
                    textAlign: "center", minHeight: 180,
                    borderRight: i < HP.services.strips.length - 1 ? `1px dashed rgba(113,46,172,0.3)` : "none" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.purple, lineHeight: 1.4,
                    marginBottom: 12, fontFamily: F.body,
                    textDecoration: torn[i] ? "line-through" : "none" }}>
                    {hpT(strip.label)}
                  </span>
                  <div style={{ marginTop: "auto", opacity: 0.6 }}>{stripIcons[i]}</div>
                </motion.div>
              ))}
            </div>

            <div style={{ position: "absolute", bottom: -10, left: 15, right: 15, height: 20,
              background: "radial-gradient(ellipse at center,rgba(0,0,0,0.08) 0%,transparent 70%)",
              pointerEvents: "none" }} />
          </div>
        </Reveal>
      </Container>
    </Sec>
  )
}

// ─── PROCESS ─────────────────────────────────────────────────────────────────
function HPProcess() {
  const w = useWindowSize(); const isMobile = w < 768
  return (
    <Sec bg={C.purple} id="process">
      <Container>
        <Reveal>
          <h2 style={{ fontFamily: F.display, fontWeight: 500, fontSize: "clamp(28px,4vw,48px)",
            lineHeight: 1.15, color: "white", textAlign: "center", marginBottom: 48 }}>
            {hpT(HP.process.title)}
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 20 }}>
          {HP.process.steps.map((step: any, i: number) => (
            <Reveal key={i} delay={i * 150}>
              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 16,
                padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12,
                  background: "rgba(255,255,255,0.15)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 24, fontWeight: 700, color: C.lime, marginBottom: 20,
                  fontFamily: F.display }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "white",
                  marginBottom: 12, fontFamily: F.body }}>{hpT(step.title)}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.65, margin: 0, fontFamily: F.body }}>{hpT(step.desc)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Sec>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function HPTestimonials() {
  const items = HP.testimonials.items
  const [cur, setCur] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval>>()

  const goTo = (idx: number) => {
    setCur(idx)
    clearInterval(timer.current!)
    timer.current = setInterval(() => setCur(p => (p + 1) % items.length), 5000)
  }
  useEffect(() => {
    timer.current = setInterval(() => setCur(p => (p + 1) % items.length), 5000)
    return () => clearInterval(timer.current!)
  }, [])

  return (
    <Sec bg={C.cream}>
      <Container>
        <Reveal>
          <h2 style={{ fontFamily: F.display, fontWeight: 500, fontSize: "clamp(28px,4vw,48px)",
            lineHeight: 1.15, color: C.deepPurple, marginBottom: 48 }}>
            {hpT(HP.testimonials.title)}
          </h2>
        </Reveal>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <motion.div
            animate={{ x: `-${cur * 100}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex" }}>
            {items.map((item: any, i: number) => (
              <div key={i} style={{ minWidth: "100%", padding: "0 4px",
                display: "flex", justifyContent: "center" }}>
                <div style={{ maxWidth: 680, width: "100%", background: "white",
                  border: "1px solid rgba(32,30,75,0.06)", borderRadius: 12, padding: 28 }}>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: C.deepPurple,
                    marginBottom: 20, fontStyle: "italic", margin: "0 0 20px",
                    fontFamily: F.body }}>{hpT(item.quote)}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%",
                      background: `linear-gradient(135deg,${C.purple},#9b59b6)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16, fontWeight: 700, color: "white", flexShrink: 0,
                      fontFamily: F.body }}>
                      {hpT(item.author).charAt(0)}
                    </div>
                    <div>
                      <strong style={{ fontSize: 14, color: C.deepPurple, display: "block",
                        fontFamily: F.body }}>{hpT(item.author)}</strong>
                      <span style={{ fontSize: 12, color: C.textDim, fontFamily: F.body }}>{hpT(item.role)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
            {items.map((_: any, i: number) => (
              <button key={i} onClick={() => goTo(i)}
                style={{ width: 10, height: 10, borderRadius: "50%", border: "none", cursor: "pointer",
                  padding: 0, background: i === cur ? C.purple : "rgba(113,46,172,0.15)",
                  transform: i === cur ? "scale(1.2)" : "scale(1)", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </Container>
    </Sec>
  )
}

// ─── CASE STUDY ───────────────────────────────────────────────────────────────
function HPCaseStudy() {
  const w = useWindowSize(); const isMobile = w < 768
  return (
    <Sec bg={C.cream} id="case">
      <Container>
        <Reveal>
          <div style={{ background: "white", borderRadius: 16,
            padding: isMobile ? 24 : "clamp(32px,5vw,56px)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>

            <h2 style={{ fontFamily: F.display, fontWeight: 500,
              fontSize: "clamp(22px,3vw,32px)", lineHeight: 1.2,
              color: C.deepPurple, marginBottom: 24 }}>
              {hpT(HP.caseStudy.headline)}
            </h2>

            <p style={{ fontSize: 18, fontStyle: "italic", color: C.purple,
              lineHeight: 1.6, marginBottom: 8, fontWeight: 600,
              fontFamily: F.body }}>{hpT(HP.caseStudy.quote)}</p>
            <p style={{ fontSize: 14, color: C.deepPurple, opacity: 0.6,
              marginBottom: 32, fontFamily: F.body }}>{hpT(HP.caseStudy.quoteAuthor)}</p>

            {[
              [HP.caseStudy.startTitle, HP.caseStudy.startText],
            ].map(([title, text]: any, i: number) => (
              <div key={i}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: C.deepPurple,
                  marginBottom: 12, marginTop: 28, fontFamily: F.body }}>{hpT(title)}</h4>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: C.deepPurple,
                  opacity: 0.75, marginBottom: 16, fontFamily: F.body }}>{hpT(text)}</p>
              </div>
            ))}

            <h4 style={{ fontSize: 16, fontWeight: 700, color: C.deepPurple,
              marginBottom: 12, marginTop: 28, fontFamily: F.body }}>{hpT(HP.caseStudy.whatTitle)}</h4>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: C.deepPurple,
              opacity: 0.75, marginBottom: 16, fontFamily: F.body, whiteSpace: "pre-line" }}>{hpT(HP.caseStudy.whatText)}</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column",
              gap: 12, marginBottom: 20, padding: 0 }}>
              {hpT(HP.caseStudy.channels).map((ch: string, i: number) => (
                <li key={i} style={{ display: "flex", gap: 10, fontSize: 14,
                  lineHeight: 1.6, color: C.deepPurple, opacity: 0.8, fontFamily: F.body }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%",
                    background: C.purple, flexShrink: 0, marginTop: 8 }} />
                  {ch}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: C.deepPurple,
              opacity: 0.75, marginBottom: 16, fontFamily: F.body }}>{hpT(HP.caseStudy.summary)}</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: C.deepPurple,
              fontWeight: 600, marginBottom: 16, fontFamily: F.body }}>{hpT(HP.caseStudy.agentLine)}</p>

            <h4 style={{ fontSize: 16, fontWeight: 700, color: C.deepPurple,
              marginBottom: 12, marginTop: 28, fontFamily: F.body }}>{hpT(HP.caseStudy.resultsTitle)}</h4>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
              gap: 16, margin: "28px 0" }}>
              {HP.caseStudy.results.map((r: any, i: number) => (
                <div key={i} style={{ textAlign: "center", padding: "20px 12px",
                  background: "rgba(113,46,172,0.04)", borderRadius: 12 }}>
                  <span style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700,
                    color: C.purple, display: "block", marginBottom: 6, fontFamily: F.body }}>
                    <AnimatedNum value={r.num} />
                  </span>
                  <span style={{ fontSize: 13, color: C.deepPurple, opacity: 0.65,
                    lineHeight: 1.4, fontFamily: F.body }}>{hpT(r.label)}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 14, color: C.purple, fontWeight: 600,
              marginBottom: 28, fontFamily: F.body }}>{hpT(HP.caseStudy.inbound)}</p>

            <div style={{ textAlign: "center", marginTop: 32, paddingTop: 24,
              borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: C.deepPurple,
                marginBottom: 16, fontFamily: F.body }}>{hpT(HP.caseStudy.bottomCta)}</p>
              <Btn href="https://calendar.notion.so/meet/octaloom/discovery" variant="purple">
                {hpT(HP.caseStudy.cta)}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Btn>
            </div>
          </div>
        </Reveal>
      </Container>
    </Sec>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function HPAbout() {
  const w = useWindowSize(); const isMobile = w < 768
  return (
    <Sec bg={C.cream} id="about">
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "220px 1fr",
          gap: 48, alignItems: "start" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}>
              <img
                src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Headshot-1.png"
                alt="Hanita Yudovski"
                style={{ width: 180, height: 180, borderRadius: "50%", objectFit: "cover",
                  border: `3px solid ${C.purple}` }} />
            </div>
          </Reveal>
          <div>
            <Reveal delay={100}>
              <h2 style={{ fontFamily: F.display, fontWeight: 500, fontSize: "clamp(28px,4vw,48px)",
                lineHeight: 1.15, color: C.deepPurple, marginBottom: 24 }}>
                {hpT(HP.about.title)}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: C.deepPurple,
                opacity: 0.75, marginBottom: 24, fontFamily: F.body }}>
                {hpT(HP.about.text)}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <Btn href="https://www.linkedin.com/in/hanita-yudovski/" variant="purple">
                <LiIcon size={16} /> {hpT(HP.about.cta)}
              </Btn>
            </Reveal>
          </div>
        </div>
      </Container>
    </Sec>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function HPFAQ() {
  const [openIdx, setOpenIdx] = useState<number|null>(null)
  return (
    <Sec bg={C.deepPurple} id="faq">
      <Container>
        <Reveal>
          <h2 style={{ fontFamily: F.display, fontWeight: 500, fontSize: "clamp(28px,4vw,48px)",
            lineHeight: 1.15, color: "white", marginBottom: 48 }}>
            {hpT(HP.faq.title)}
          </h2>
        </Reveal>
        <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 2 }}
          itemScope itemType="https://schema.org/FAQPage">
          {HP.faq.items.map((item: any, i: number) => (
            <Reveal key={i} delay={i * 80}>
              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
                  overflow: "hidden" }}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "20px 0", gap: 16 }}>
                  <h3 itemProp="name" style={{ fontSize: 17, fontWeight: 700, color: "white",
                    margin: 0, fontFamily: F.body }}>{hpT(item.q)}</h3>
                  <motion.span animate={{ rotate: openIdx === i ? 180 : 0 }}
                    style={{ fontSize: 22, color: C.lime, flexShrink: 0, width: 28, height: 28,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: F.body }}>
                    {openIdx === i ? "\u2212" : "+"}
                  </motion.span>
                </div>
                <motion.div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
                  animate={{ height: openIdx === i ? "auto" : 0, opacity: openIdx === i ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ overflow: "hidden" }}>
                  <p itemProp="text" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.7, paddingBottom: 20, margin: 0, fontFamily: F.body }}>
                    {hpT(item.a)}
                  </p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Sec>
  )
}

// ─── BOOK A CALL ──────────────────────────────────────────────────────────────
function HPBookCall() {
  const w = useWindowSize(); const isMobile = w < 768
  return (
    <section style={{ background: C.lime, padding: "0 0 clamp(32px,5vw,60px)" }}>
      <Container>
        <Reveal>
          <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 24, marginBottom: 20, fontSize: 15,
              color: C.deepPurple, fontWeight: 600, fontFamily: F.body,
              flexDirection: isMobile ? "column" : "row", gap: isMobile ? 8 : 24 } as any}>
              <span>\u2460 {hpT({ en: "Not sure where to start?", he: "\u05dc\u05d0 \u05d1\u05d8\u05d5\u05d7\u05d9\u05dd \u05de\u05d0\u05d9\u05e4\u05d4 \u05dc\u05d4\u05ea\u05d7\u05d9\u05dc?" })}</span>
              <span>\u2461 {hpT({ en: "Let's figure it out together.", he: "\u05d1\u05d5\u05d0\u05d5 \u05e0\u05d1\u05d9\u05df \u05d1\u05d9\u05d7\u05d3." })}</span>
            </div>
            <div style={{ border: `2.5px solid ${C.deepPurple}`, borderRadius: 12,
              padding: isMobile ? "24px 20px" : "32px 40px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: 24, flexDirection: isMobile ? "column" : "row",
              textAlign: isMobile ? "center" : "start" } as any}>
              <span style={{ fontWeight: 700, fontSize: "clamp(24px,3.5vw,40px)",
                color: C.deepPurple, fontFamily: F.body }}>
                {hpT({ en: "Book a Call With Me", he: "\u05e7\u05d1\u05e2\u05d5 \u05d0\u05d9\u05ea\u05d9 \u05e9\u05d9\u05d7\u05d4" })}
              </span>
              <Btn href="https://calendar.notion.so/meet/octaloom/discovery" variant="purple">
                {hpT({ en: "Let's Talk \u2728", he: "\u05d1\u05d5\u05d0\u05d5 \u05e0\u05d3\u05d1\u05e8 \u2728" })}
              </Btn>
            </div>
            {/* Starburst */}
            <div style={{ position: "absolute", top: -18, right: -12, width: 72, height: 72,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 72 72" width="72" height="72" style={{ position: "absolute" }}>
                <polygon points="36,2 42,22 62,10 50,28 70,36 50,44 62,62 42,50 36,70 30,50 10,62 22,44 2,36 22,28 10,10 30,22" fill={C.purple} />
              </svg>
              <span style={{ position: "relative", zIndex: 1, fontSize: 11, fontWeight: 800,
                color: "white", textAlign: "center", lineHeight: 1.2, fontFamily: F.body }}>
                It's<br/>FREE!
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function HPFinalCTA() {
  return (
    <Sec bg={C.lime} id="contact">
      <Container>
        <div style={{ textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: F.display, fontWeight: 500,
              fontSize: "clamp(28px,4.5vw,48px)", color: C.deepPurple, marginBottom: 16 }}>
              {hpT(HP.finalCta.title)}
            </h2>
            <p style={{ fontSize: 17, color: C.deepPurple, opacity: 0.7, maxWidth: 500,
              margin: "0 auto 32px", lineHeight: 1.6, fontFamily: F.body }}>
              {hpT(HP.finalCta.sub)}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Btn href="https://calendar.notion.so/meet/octaloom/discovery" variant="purple">
              {hpT(HP.finalCta.cta)}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Btn>
          </Reveal>
        </div>
      </Container>
    </Sec>
  )
}

// ─── LINKEDIN FEED ────────────────────────────────────────────────────────────
function HPLinkedInFeed() {
  const feedPosts = [
    { text: { en: "Just had a conversation with a founder who told me: 'I know LinkedIn is important, I just don't know what to do with it.' This is the most common thing I hear. Here's the thing...", he: "\u05d3\u05d9\u05d1\u05e8\u05ea\u05d9 \u05d4\u05d9\u05d5\u05dd \u05e2\u05dd \u05de\u05d9\u05d9\u05e1\u05d3 \u05e9\u05d0\u05de\u05e8 \u05dc\u05d9: \"\u05d0\u05e0\u05d9 \u05d9\u05d5\u05d3\u05e2 \u05e9\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05d7\u05e9\u05d5\u05d1, \u05e4\u05e9\u05d5\u05d8 \u05dc\u05d0 \u05d9\u05d5\u05d3\u05e2 \u05de\u05d4 \u05dc\u05e2\u05e9\u05d5\u05ea \u05e2\u05dd \u05d6\u05d4.\" \u05d6\u05d4 \u05d4\u05d3\u05d1\u05e8 \u05d4\u05db\u05d9 \u05e0\u05e4\u05d5\u05e5 \u05e9\u05d0\u05e0\u05d9 \u05e9\u05d5\u05de\u05e2\u05ea. \u05db\u05db\u05d4 \u05d6\u05d4 \u05e2\u05d5\u05d1\u05d3..." }, date: "2d" },
    { text: { en: "3 things I learned from managing 15+ LinkedIn profiles this quarter: consistency beats virality every single time. The algorithm rewards showing up...", he: "3 \u05d3\u05d1\u05e8\u05d9\u05dd \u05e9\u05dc\u05de\u05d3\u05ea\u05d9 \u05de\u05e0\u05d9\u05d4\u05d5\u05dc 15+ \u05e4\u05e8\u05d5\u05e4\u05d9\u05dc\u05d9 \u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05d4\u05e8\u05d1\u05e2\u05d5\u05df \u05d4\u05d6\u05d4: \u05e2\u05e7\u05d1\u05d9\u05d5\u05ea \u05de\u05e0\u05e6\u05d7\u05ea \u05d5\u05d9\u05e8\u05d0\u05dc\u05d9\u05d5\u05ea. \u05db\u05dc \u05e4\u05e2\u05dd..." }, date: "5d" },
    { text: { en: "AI won't replace marketers. But marketers who use AI will replace those who don't. Here's what my AI agents actually do every day...", he: "AI \u05dc\u05d0 \u05d9\u05d7\u05dc\u05d9\u05e3 \u05d0\u05e0\u05e9\u05d9 \u05e9\u05d9\u05d5\u05d5\u05e7. \u05d0\u05d1\u05dc \u05d0\u05e0\u05e9\u05d9 \u05e9\u05d9\u05d5\u05d5\u05e7 \u05e9\u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd \u05d1-AI \u05d9\u05d7\u05dc\u05d9\u05e4\u05d5 \u05d0\u05ea \u05d0\u05dc\u05d4 \u05e9\u05dc\u05d0. \u05db\u05da \u05e0\u05e8\u05d0\u05d4 \u05d4\u05d9\u05d5\u05dd \u05e9\u05dc\u05d9 \u05e2\u05dd \u05d4\u05e1\u05d5\u05db\u05e0\u05d9\u05dd..." }, date: "1w" },
  ]
  const w = useWindowSize(); const isMobile = w < 768

  return (
    <Sec bg={C.cream}>
      <Container>
        <Reveal>
          <h2 style={{ fontFamily: F.display, fontWeight: 500, fontSize: "clamp(28px,4vw,48px)",
            lineHeight: 1.15, color: C.deepPurple, marginBottom: 8 }}>
            {hpT(HP.linkedinFeed.title)}
          </h2>
        </Reveal>
        <Reveal delay={50}>
          <p style={{ color: C.textDim, marginBottom: 40, fontSize: 16,
            fontFamily: F.body }}>{hpT(HP.linkedinFeed.sub)}</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
          gap: 20, marginBottom: 32 }}>
          {feedPosts.map((post, i) => (
            <Reveal key={i} delay={i * 120}>
              <div style={{ background: "white", borderRadius: 10, padding: 20,
                border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Headshot-1.png"
                    alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <strong style={{ fontSize: 14, color: "#191919", display: "block",
                      fontFamily: F.body }}>Hanita Yudovski</strong>
                    <span style={{ fontSize: 11, color: "#666", fontFamily: F.body }}>
                      LinkedIn-Led Fractional CMO &middot; {post.date}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#333", margin: 0,
                  fontFamily: F.body }}>{hpT(post.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={400}>
          <div style={{ textAlign: "center" }}>
            <Btn href="https://www.linkedin.com/in/hanita-yudovski/" variant="outline">
              <LiIcon size={16} /> {hpT(HP.linkedinFeed.followCta)}
            </Btn>
          </div>
        </Reveal>
      </Container>
    </Sec>
  )
}

// ─── BLOG ─────────────────────────────────────────────────────────────────────
function HPBlog() {
  const w = useWindowSize(); const isMobile = w < 768
  const thumbColors = ["oklch(0.25 0.08 280)","oklch(0.25 0.08 310)","oklch(0.25 0.08 340)"]
  return (
    <Sec bg={C.cream} id="blog">
      <Container>
        <Reveal>
          <h2 style={{ fontFamily: F.display, fontWeight: 500, fontSize: "clamp(28px,4vw,48px)",
            lineHeight: 1.15, color: C.deepPurple, marginBottom: 8 }}>
            {hpT(HP.blog.title)}
          </h2>
        </Reveal>
        <Reveal delay={50}>
          <p style={{ fontSize: 16, color: C.textDim, marginBottom: 40, maxWidth: 560,
            fontFamily: F.body }}>{hpT(HP.blog.sub)}</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
          gap: 24, marginBottom: 32 }}>
          {HP.blog.posts.map((post: any, i: number) => (
            <Reveal key={i} delay={i * 120}>
              <a href="#" style={{ display: "flex", flexDirection: "column", borderRadius: 12,
                overflow: "hidden", background: "white", border: "1px solid rgba(32,30,75,0.06)",
                textDecoration: "none", transition: "all 0.35s" }}>
                <div style={{ aspectRatio: "16/10", overflow: "hidden", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  background: thumbColors[i], fontSize: 11, fontFamily: "monospace",
                  opacity: 0.5, color: C.lime }}>article image</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.deepPurple,
                  padding: "16px 20px 8px", lineHeight: 1.45, margin: 0,
                  fontFamily: F.body }}>{hpT(post.title)}</h3>
                <span style={{ fontSize: 12, color: C.textDim, padding: "0 20px",
                  fontFamily: F.body }}>{post.date}</span>
                <span style={{ fontSize: 13, color: C.purple, padding: "12px 20px 16px",
                  marginTop: "auto", fontWeight: 700, fontFamily: F.body }}>
                  {hpT(HP.blog.readMore)} &rarr;
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={400}>
          <div style={{ textAlign: "center" }}>
            <Btn href="/blog" variant="ghost">{hpT(HP.blog.viewAll)}</Btn>
          </div>
        </Reveal>
      </Container>
    </Sec>
  )
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
function HPNewsletter() {
  const w = useWindowSize(); const isMobile = w < 768
  return (
    <Sec bg={C.purple}>
      <Container>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
            <h2 style={{ fontFamily: F.display, fontWeight: 500,
              fontSize: "clamp(24px,3vw,36px)", color: "white", marginBottom: 16 }}>
              {hpT(HP.newsletter.title)}
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginBottom: 28,
              lineHeight: 1.7, fontFamily: F.body }}>{hpT(HP.newsletter.sub)}</p>
            <form onSubmit={e => e.preventDefault()}
              style={{ display: "flex", gap: 8, maxWidth: 420, margin: "0 auto",
                flexDirection: isMobile ? "column" : "row" } as any}>
              <input type="email"
                placeholder={hpT(HP.newsletter.placeholder)}
                style={{ flex: 1, background: "rgba(255,255,255,0.08)", color: "white",
                  padding: "14px 18px", borderRadius: 8, fontSize: 14,
                  border: "1px solid rgba(255,255,255,0.12)", fontFamily: F.body,
                  outline: "none" }} />
              <button type="submit"
                style={{ background: C.lime, color: C.deepPurple, padding: "14px 24px",
                  borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer",
                  border: "none", fontFamily: F.body, whiteSpace: "nowrap" }}>
                {hpT(HP.newsletter.btn)}
              </button>
            </form>
            <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 14,
              display: "flex", alignItems: "flex-start", gap: 8, justifyContent: "center",
              textAlign: "start" }}>
              <input type="checkbox" style={{ accentColor: C.lime, marginTop: 2 }} />
              <span style={{ fontFamily: F.body }}>{hpT(HP.finalCta.formConsent)}</span>
            </label>
          </div>
        </Reveal>
      </Container>
    </Sec>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function HPFooter() {
  const { lang } = useLang()
  const dir = lang === "he" ? "rtl" : "ltr"
  const w = useWindowSize(); const isMobile = w < 480

  return (
    <footer dir={dir} style={{ padding: "64px 0 32px", background: C.deepPurple,
      color: "rgba(255,255,255,0.7)" }}>
      <Container>
        <div style={{ display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr 1fr",
          gap: 40, marginBottom: 48 }}>
          <div>
            <LogoSVG color="rgba(255,255,255,0.9)" />
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 12,
              maxWidth: 280, fontFamily: F.body }}>{hpT(HP.footer.tagline)}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "white", marginBottom: 4, margin: "0 0 4px",
              fontFamily: F.body }}>{hpT(HP.footer.linkedinServices)}</h4>
            {[
              { label: {en:"LinkedIn for Founders",he:"\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05de\u05d9\u05d9\u05e1\u05d3\u05d9\u05dd"}, href:"/services/linkedin-for-executives" },
              { label: {en:"LinkedIn for Solopreneurs",he:"\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05e2\u05e6\u05de\u05d0\u05d9\u05dd"}, href:"/services/linkedin-for-solopreneurs" },
              { label: {en:"LinkedIn for Organizations",he:"\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05d0\u05e8\u05d2\u05d5\u05e0\u05d9\u05dd"}, href:"/services/linkedin-for-organizations" },
            ].map((l,i) => (
              <a key={i} href={l.href} style={{ fontSize: 14, color: "rgba(255,255,255,0.5)",
                textDecoration: "none", transition: "color 0.2s", fontFamily: F.body }}
                onMouseEnter={e=>(e.currentTarget.style.color=C.lime)}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.5)")}>
                {hpT(l.label)}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "white", margin: "0 0 4px",
              fontFamily: F.body }}>{hpT(HP.footer.moreServices)}</h4>
            {[
              { label: {en:"Fractional CMO",he:"Fractional CMO"}, href:"/services/fractional-cmo" },
              { label: {en:"AI Tools & Agents",he:"\u05e1\u05d5\u05db\u05e0\u05d9 \u05d5\u05db\u05dc\u05d9 AI"}, href:"/services/ai-tools-agents" },
            ].map((l,i) => (
              <a key={i} href={l.href} style={{ fontSize: 14, color: "rgba(255,255,255,0.5)",
                textDecoration: "none", transition: "color 0.2s", fontFamily: F.body }}
                onMouseEnter={e=>(e.currentTarget.style.color=C.lime)}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.5)")}>
                {hpT(l.label)}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "white", margin: "0 0 4px",
              fontFamily: F.body }}>{hpT(HP.footer.connect)}</h4>
            <a href="https://www.linkedin.com/in/hanita-yudovski/" target="_blank" rel="noopener"
              style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none",
                fontFamily: F.body }}
              onMouseEnter={e=>(e.currentTarget.style.color=C.lime)}
              onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.5)")}>
              LinkedIn
            </a>
            <a href="mailto:octaloom@gmail.com"
              style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none",
                fontFamily: F.body }}
              onMouseEnter={e=>(e.currentTarget.style.color=C.lime)}
              onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.5)")}>
              octaloom@gmail.com
            </a>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)",
          fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: F.body,
          flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 0 } as any}>
          <span>\u00a9 2026 OctaLoom</span>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: HP.footer.privacy, href: "/privacy-policy" },
              { label: HP.footer.terms, href: "/terms" },
            ].map((l,i) => (
              <a key={i} href={l.href}
                style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none",
                  transition: "color 0.2s", fontFamily: F.body }}
                onMouseEnter={e=>(e.currentTarget.style.color=C.lime)}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.4)")}>
                {hpT(l.label)}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}

// ─── SCHEMA INJECTION ─────────────────────────────────────────────────────────
function HomepageSchema() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": HP.faq.items.map((item: any) => ({
        "@type": "Question",
        "name": item.q.he,
        "acceptedAnswer": { "@type": "Answer", "text": item.a.he }
      }))
    }
    const existing = document.getElementById("hp-faq-schema")
    if (existing) existing.remove()
    const script = document.createElement("script")
    script.id = "hp-faq-schema"
    script.type = "application/ld+json"
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => { document.getElementById("hp-faq-schema")?.remove() }
  }, [])
  return null
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function OctaLoomHomepageV2() {
  const [lang, setLang] = useLangState()

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <div style={{ fontFamily: F.body, background: C.cream,
        direction: lang === "he" ? "rtl" : "ltr" }}>
        <HomepageSchema />
        <HPNav />
        <main>
          <HPHero />
          <HPProblem />
          <HPFourthOption />
          <HPServices />
          <HPProcess />
          <HPTestimonials />
          <HPCaseStudy />
          <HPAbout />
          <HPFAQ />
          <HPBookCall />
          <HPFinalCTA />
          <HPLinkedInFeed />
          <HPBlog />
          <HPNewsletter />
        </main>
        <HPFooter />
      </div>
    </LangCtx.Provider>
  )
}
