// @framerSupportedLayoutWidth any

// @framerSupportedLayoutHeight any



import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from "react"

import { motion, useInView, AnimatePresence, useMotionValue, useTransform, animate as fmAnimate } from "framer-motion"



// ─── MAILERLITE CONFIG ────────────────────────────────────────────────────────

// ערכים מוזרקים בזמן build מקובץ .env (ראי README)

// לFRAMER: החליפי ידנית עם הערכים האמיתיים לפני העלאה

const MAILERLITE_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYWQxMTYwNWM5MjAzZjU5NmZjZDU1MTQ3NGJlZmNhYzA1YTIzZjJmNzY1NzBlOGJjNzU2N2Y4MGMzMDM4YjBiYTY2MDlhMjNlNTQzNDE1NTQiLCJpYXQiOjE3Nzg0NDc2MjIuODQ0NDE5LCJuYmYiOjE3Nzg0NDc2MjIuODQ0NDIyLCJleHAiOjQ5MzQxMjEyMjIuODM3NTkxLCJzdWIiOiIyMTQ4ODA2Iiwic2NvcGVzIjpbXX0.iUEXT6MVBfuz1DiZiy_i2WI_gsxMhMjn3qU97_F_FAaOk0Nh-tSMS__eenntT4PeHBDyc9-oTXivDxxlc4QMtclpX8SHszO02-oKEF05ZPu8RRQUR0XVVhzKFtEnHUYfduvxWcCwJyo99ji1J6fsYOzLBMjuHlPaBITAriqZM3Fj9LvlOzUEaqErUGR2g62gjjTiYr7qlH_es9Nq7jjyRMmXY1uqRQTI7H0FeWxbgn634xFH0Ewm97ysEfK76SHP7SIoLiVXQ_eRWgIq59iKT4Kd1rI9GuNSWxShIEdbVbaitLdx_ARhjcOsmuXdvzByKMXAw1G6GkdBhr3I9FNCWk3fM-RZEqAa00xuFeIMfRfe3jB387JHIPmI-r1GtWe-_fWY2g-1p_TRxApnM0qHPtEHYb4jo7Ts1eIS5SFwiWFATIRGNMopdcRNkOveilNp6XB6apt8vv3y2M3hpoB81wqo3tkpNfvXWLv-B_iXkQDN7VgXnbZAF4dKe-3MRPvP5klPOEiWYGMBQ_dnoa500J5-MTRYJ13v4fGAEXQaqcixF-DIjnluyYRYdXJ3O1CLQi3t4WrUPTGLvgBKUkmeTjSp7tJ6vrK0Y1F23nrbU3ugo2S6ZF6wF7y7BudPM4xJTWOqGAxIcUpY3Xwg9uQvggx-qffM8f6j-zqJsUXesOk"

const MAILERLITE_GROUP_ID = "179947295108760989"



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

  display: "'DiscoveryFs', 'Discovery', 'Aeonik', sans-serif",

  body:    "'Aeonik', sans-serif",

}



function getLangToggleUrl(isHE: boolean): string {
  if (typeof window === "undefined") return isHE ? "https://www.octaloom.com/" : "https://www.octaloom.com/"
  const path = window.location.pathname
  if (isHE) {
    const enPath = path.replace(/-he$/, "") || "/"
    return "https://www.octaloom.com" + enPath
  } else {
    if (path === "/" || path === "") return "https://www.octaloom.com/"
    return "https://www.octaloom.com" + path.replace(/\/$/, "") + "-he"
  }
}

const langToggleStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 600, color: "#201e4b",
  background: "transparent", border: "1px solid rgba(32,30,75,0.22)",
  borderRadius: 100, padding: "5px 13px", cursor: "pointer",
  fontFamily: "'Discovery Fs', 'Noto Sans Hebrew', sans-serif", transition: "border-color 0.2s, color 0.2s", letterSpacing: "0.03em",
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

function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {

  return (

    <motion.div style={style} initial={{ opacity: 0, y: 22 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}>

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

  const { lang } = useLang()

  const base: React.CSSProperties = {

    display: "inline-flex", alignItems: "center", gap: 8,

    padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 700,

    cursor: "pointer", textDecoration: "none", transition: "all 0.25s",

    border: "none", fontFamily: lang === "he" ? F.display : F.body, ...style

  }

  const variants: Record<string, React.CSSProperties> = {

    purple:  { background: C.purple,     color: C.cream },

    ghost:   { background: "transparent", color: C.purple, border: `1px solid rgba(113,46,172,0.2)` },

    white:   { background: "white",      color: C.purple },

    cream:   { background: C.cream,     color: C.deepPurple },

    lime:    { background: C.lime,       color: C.navy },

    outline: { background: "transparent", color: C.purple, border: `1.5px solid ${C.purple}` },

    dark:    { background: C.deepPurple, color: C.cream },

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

  const num = parseInt(value.replace(/[^0-9]/g, "")) || 0

  const suffix = value.replace(/[0-9,]/g, "")

  const [cur, setCur] = useState(0)

  useEffect(() => {

    const el = ref.current

    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {

      if (!entry.isIntersecting) return

      observer.disconnect()

      let start = 0

      const step = num / 40

      const timer = setInterval(() => {

        start = Math.min(start + step, num)

        setCur(Math.round(start))

        if (start >= num) clearInterval(timer)

      }, 30)

    }, { threshold: 0.1 })

    observer.observe(el)

    return () => observer.disconnect()

  }, [num])

  return <span ref={ref}>{cur.toLocaleString()}{suffix}</span>

}



// ─── HP DATA ─────────────────────────────────────────────────────────────────

const HP = {

  hero: {

    pill: { en: 'AI-Powered B2B Marketing Services', he: '\u05e9\u05d9\u05e8\u05d5\u05ea\u05d9 \u05e9\u05d9\u05d5\u05d5\u05e7 \u05de\u05d1\u05d5\u05e1\u05e1\u05d9 AI \u05dc\u05d7\u05d1\u05e8\u05d5\u05ea B2B' },

    h1: { en: 'Your marketing\ndepartment,\nminus the\ndepartment. 💁🏻‍♀️', he: '\u05de\u05d7\u05dc\u05e7\u05ea \u05d4\u05e9\u05d9\u05d5\u05d5\u05e7\n\u05e9\u05dc\u05da, \u05e8\u05e7 \u05d1\u05dc\u05d9\n\u05d4\u05de\u05d7\u05dc\u05e7\u05d4 💁🏻‍♀️' },

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

    en: ['AI Agents', 'Marketing Automation', 'B2B Marketing', 'Fractional CMO', 'LinkedIn Management'],

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

    but: { en: 'The Fourth Option.', he: '\u05d0\u05d1\u05dc... \u05d9\u05e9 \u05d0\u05d5\u05e4\u05e6\u05d9\u05d4 \u05e8\u05d1\u05d9\u05e2\u05d9\u05ea.' },

    desc: {

      en: "OctaLoom transforms your marketing into a high-performance growth engine without the friction of a traditional agency. I'm Hanita Yudovski, a Fractional CMO who builds your end-to-end marketing strategy from establishing LinkedIn authority to building automation infrastructure, newsletters, and lead-gen funnels.",

      he: 'OctaLoom \u05d4\u05d5\u05e4\u05db\u05ea \u05d0\u05ea \u05d4\u05e9\u05d9\u05d5\u05d5\u05e7 \u05e9\u05dc\u05db\u05dd \u05dc\u05de\u05e0\u05d5\u05e2 \u05e6\u05de\u05d9\u05d7\u05d4 \u05de\u05e9\u05d5\u05de\u05df, \u05d1\u05dc\u05d9 \u05d4\u05e1\u05e8\u05d1\u05d5\u05dc \u05e9\u05dc \u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05d2\u05d3\u05d5\u05dc\u05d4. \u05d0\u05e0\u05d9 \u05d7\u05e0\u05d9\u05ea\u05d4 \u05d9\u05d5\u05d3\u05d5\u05d1\u05e1\u05e7\u05d9, FCMO \u05e9\u05d1\u05d5\u05e0\u05d4 \u05e2\u05d1\u05d5\u05e8\u05db\u05dd \u05d0\u05ea \u05d4\u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4 \u05d4\u05de\u05dc\u05d0\u05d4, \u05de\u05d1\u05d9\u05e1\u05d5\u05e1 \u05e1\u05de\u05db\u05d5\u05ea \u05d1\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05d5\u05e2\u05d3 \u05ea\u05e9\u05ea\u05d9\u05d5\u05ea \u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d4, \u05e0\u05d9\u05d5\u05d6\u05dc\u05d8\u05e8\u05d9\u05dd \u05d5\u05de\u05e9\u05e4\u05db\u05d9 \u05e9\u05d9\u05d5\u05d5\u05e7.'

    },

    value: {

      en: "While I navigate the strategy, my team of AI agents handles the heavy lifting with a volume and precision that no human team can match alone. You get senior-level marketing leadership at tech scale without the overhead of a full-time hire or the weight of an inflated agency retainer.",

      he: '\u05d1\u05d6\u05de\u05df \u05e9\u05d0\u05e0\u05d9 \u05de\u05e0\u05d5\u05d5\u05d8\u05ea, \u05e6\u05d5\u05d5\u05ea \u05e1\u05d5\u05db\u05e0\u05d9 \u05d4-AI \u05e9\u05dc\u05d9 \u05de\u05d1\u05e6\u05e2 \u05d0\u05ea \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05d4\u05e9\u05d7\u05d5\u05e8\u05d4 \u05d1\u05e0\u05e4\u05d7 \u05d5\u05d3\u05d9\u05d5\u05e7 \u05e9\u05e9\u05d5\u05dd \u05d0\u05d3\u05dd \u05dc\u05d0 \u05d9\u05db\u05d5\u05dc \u05dc\u05d4\u05d2\u05d9\u05e2 \u05d0\u05dc\u05d9\u05d5 \u05dc\u05d1\u05d3. \u05d0\u05ea\u05dd \u05de\u05e7\u05d1\u05dc\u05d9\u05dd \u05de\u05e2\u05d8\u05e4\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05ea \u05d1\u05db\u05d9\u05e8\u05d4 \u05d1-Scale \u05e9\u05dc \u05d4\u05d9\u05d9\u05d8\u05e7, \u05d1\u05dc\u05d9 \u05e2\u05dc\u05d5\u05d9\u05d5\u05ea \u05de\u05e2\u05e1\u05d9\u05e7 \u05d5\u05d1\u05dc\u05d9 \u05e8\u05d9\u05d8\u05d9\u05d9\u05e0\u05e8\u05d9\u05dd \u05de\u05e0\u05d5\u05e4\u05d7\u05d9\u05dd.'

    },

    cta: { en: "Let's Talk", he: '\u05d1\u05d5\u05d0\u05d5 \u05e0\u05d3\u05d1\u05e8' },

  },

  services: {

    title: { en: 'What We Offer', he: '\u05de\u05d4 \u05d0\u05e0\u05d7\u05e0\u05d5 \u05de\u05e6\u05d9\u05e2\u05d9\u05dd' },

    sub: { en: '', he: '' },

    strips: [

      { label: { en: 'LinkedIn for Organizations', he: '\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05d0\u05e8\u05d2\u05d5\u05e0\u05d9\u05dd' }, href: 'https://www.octaloom.com/linkedin-for-organizations-he' },

      { label: { en: 'LinkedIn for Executives', he: '\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05de\u05d9\u05d9\u05e1\u05d3\u05d9\u05dd' }, href: 'https://www.octaloom.com/linkedin-for-executives-he' },

      { label: { en: 'LinkedIn for Solopreneurs', he: '\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05e2\u05e6\u05de\u05d0\u05d9\u05dd' }, href: 'https://www.octaloom.com/linkedin-for-solopreneurs-he' },

      { label: { en: 'Fractional CMO', he: '\u05e9\u05d9\u05d5\u05d5\u05e7 \u05d1\u05de\u05d9\u05e7\u05d5\u05e8 \u05d7\u05d5\u05e5' }, href: 'https://www.octaloom.com/fractional-cmo-he' },

      { label: { en: 'AI Tools & Agents', he: '\u05e1\u05d5\u05db\u05e0\u05d9 \u05d5\u05db\u05dc\u05d9 AI' }, href: 'https://www.octaloom.com/ai-tools-agents-he' },

    ],

  },

  process: {

    title: { en: 'From First Call to Full Engine', he: '\u05d0\u05d9\u05da \u05d6\u05d4 \u05e2\u05d5\u05d1\u05d3?' },

    steps: [

      {

        title: { en: 'Understand What’s Actually Missing', he: '\u05de\u05d2\u05d3\u05d9\u05e8\u05d9\u05dd \u05d0\u05ea \u05d4\u05d1\u05e2\u05d9\u05d4' },

        desc: {

          en: 'You publish consistently but leads aren\'t coming. The problem isn\'t the content — it\'s the system.',

          he: '\u05d0\u05ea\u05dd \u05de\u05e4\u05e8\u05e1\u05de\u05d9\u05dd \u05d1\u05e2\u05e7\u05d1\u05d9\u05d5\u05ea \u05d0\u05d1\u05dc \u05d4\u05dc\u05d9\u05d3\u05d9\u05dd \u05dc\u05d0 \u05de\u05d2\u05d9\u05e2\u05d9\u05dd. \u05d4\u05d1\u05e2\u05d9\u05d4 \u05d4\u05d9\u05d0 \u05dc\u05d0 \u05d4\u05ea\u05d5\u05db\u05df, \u05d6\u05d5 \u05d4\u05de\u05e2\u05e8\u05db\u05ea.'

        }

      },

      {

        title: { en: 'Build a Plan That Actually Fits', he: '\u05d1\u05d5\u05e0\u05d9\u05dd \u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05e2\u05d1\u05d5\u05d3\u05d4' },

        desc: {

          en: 'Based on your needs, we build a clear work plan. AI is part of the thinking, prioritization, and usually the execution too 😉',

          he: '\u05e2\u05dc \u05d1\u05e1\u05d9\u05e1 \u05d4\u05e6\u05e8\u05db\u05d9\u05dd \u05e9\u05e2\u05dc\u05d5, \u05e0\u05d1\u05e0\u05d9\u05ea \u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05e2\u05d1\u05d5\u05d3\u05d4 \u05de\u05e1\u05d5\u05d3\u05e8\u05ea. \u05d4-AI \u05d4\u05d5\u05d0 \u05d7\u05dc\u05e7 \u05de\u05ea\u05d4\u05dc\u05d9\u05da \u05d4\u05d7\u05e9\u05d9\u05d1\u05d4 \u05d5\u05d4\u05ea\u05d9\u05e2\u05d3\u05d5\u05e3 (\u05d5\u05dc\u05e8\u05d5\u05d1 \u05d2\u05dd \u05d7\u05dc\u05e7 \u05de\u05d4\u05d1\u05d9\u05e6\u05d5\u05e2 😉)'

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

        quote: { en: '"Over the past months I worked directly with Hanita on marketing consulting, focusing on B2B and LinkedIn. The professional guidance was thorough, deep, and structured — including extensive preliminary research, deep learning of the company\'s field, and competitive landscape analysis. The process included long-term marketing strategy and a clear implementation plan that significantly contributed to the company\'s global activity."', he: '"\u05d1\u05de\u05d4\u05dc\u05da \u05d4\u05d7\u05d5\u05d3\u05e9\u05d9\u05dd \u05d4\u05d0\u05d7\u05e8\u05d5\u05e0\u05d9\u05dd \u05e2\u05d1\u05d3\u05ea\u05d9 \u05d9\u05e9\u05d9\u05e8\u05d5\u05ea \u05de\u05d5\u05dc \u05d7\u05e0\u05d9\u05ea\u05d4 \u05d1\u05db\u05dc \u05d4\u05e7\u05e9\u05d5\u05e8 \u05dc\u05d9\u05d9\u05e2\u05d5\u05e5 \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9, \u05d1\u05d3\u05d2\u05e9 \u05e2\u05dc \u05e2\u05d5\u05dc\u05dd \u05d4-B2B \u05d5\u05e2\u05dc \u05e4\u05e2\u05d9\u05dc\u05d5\u05ea \u05d1\u05e4\u05dc\u05d8\u05e4\u05d5\u05e8\u05de\u05ea \u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df. \u05d4\u05dc\u05d9\u05d5\u05d5\u05d9 \u05d4\u05de\u05e7\u05e6\u05d5\u05e2\u05d9 \u05e9\u05d4\u05d5\u05d1\u05d9\u05dc\u05d4 \u05d4\u05d9\u05d4 \u05d9\u05e1\u05d5\u05d3\u05d9, \u05de\u05e2\u05de\u05d9\u05e7 \u05d5\u05de\u05d5\u05d1\u05e0\u05d4, \u05d5\u05db\u05dc\u05dc \u05de\u05d7\u05e7\u05e8 \u05de\u05e7\u05d3\u05d9\u05dd \u05e8\u05d7\u05d1, \u05dc\u05d9\u05de\u05d5\u05d3 \u05de\u05e2\u05de\u05d9\u05e7 \u05e9\u05dc \u05ea\u05d7\u05d5\u05dd \u05d4\u05e2\u05d9\u05e1\u05d5\u05e7 \u05e9\u05dc \u05d4\u05d7\u05d1\u05e8\u05d4 \u05d5\u05e0\u05d9\u05ea\u05d5\u05d7 \u05d4\u05e1\u05d1\u05d9\u05d1\u05d4 \u05d4\u05e2\u05e1\u05e7\u05d9\u05ea \u05d5\u05d4\u05de\u05ea\u05d7\u05e8\u05d9\u05dd. \u05d4\u05ea\u05d4\u05dc\u05d9\u05da \u05db\u05dc\u05dc \u05d2\u05d9\u05d1\u05d5\u05e9 \u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4 \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05ea \u05d0\u05e8\u05d5\u05db\u05ea \u05d8\u05d5\u05d5\u05d7 \u05d5\u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05e2\u05d1\u05d5\u05d3\u05d4 \u05d1\u05e8\u05d5\u05e8\u05d4, \u05d5\u05d4\u05ea\u05d5\u05e6\u05e8 \u05d4\u05e9\u05d9\u05d5\u05d5\u05e7\u05d9 \u05ea\u05e8\u05dd \u05de\u05e9\u05de\u05e2\u05d5\u05ea\u05d9\u05ea \u05dc\u05e4\u05e2\u05d9\u05dc\u05d5\u05ea \u05d4\u05d2\u05dc\u05d5\u05d1\u05dc\u05d9\u05ea \u05e9\u05dc \u05d4\u05d7\u05d1\u05e8\u05d4."' },

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

        a: { en: "I'm Hanita (Yudovski, but like Madonna my first name is enough 😅), a fractional marketing manager — or as I prefer, LinkedIn-Led Fractional CMO. OctaLoom is a boutique B2B marketing agency that works on LinkedIn strategy as a central axis, alongside vibe marketing (AI-based marketing), and also building AI agents for organizations and B2B businesses. I lead the strategy, and my AI agents do the daily work with me.", he: '\u05d0\u05e0\u05d9 \u05d7\u05e0\u05d9\u05ea\u05d4 (\u05d9\u05d5\u05d3\u05d5\u05d1\u05e1\u05e7\u05d9, \u05d0\u05d1\u05dc \u05db\u05de\u05d5 \u05de\u05d3\u05d5\u05e0\u05d4 \u05d4\u05e9\u05dd \u05d4\u05e4\u05e8\u05d8\u05d9 \u05e9\u05dc\u05d9 \u05de\u05e1\u05e4\u05d9\u05e7 😅), \u05de\u05e0\u05d4\u05dc\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 \u05d1\u05de\u05d9\u05e7\u05d5\u05e8 \u05d7\u05d5\u05e5 \u05db\u05de\u05d5 \u05e9\u05d0\u05d5\u05de\u05e8\u05d9\u05dd \u05d1\u05e2\u05d1\u05e8\u05d9\u05ea \u05d0\u05d1\u05dc \u05d0\u05e0\u05d9 \u05de\u05e2\u05d3\u05d9\u05e4\u05d4 LinkedIn-Led Fractional CMO \u05db\u05d9 \u05d6\u05d4 \u05de\u05ea\u05d2\u05dc\u05d2\u05dc \u05e2\u05dc \u05d4\u05dc\u05e9\u05d5\u05df \u05d8\u05d5\u05d1 \u05d9\u05d5\u05ea\u05e8 \u05d5\u05d1\u05db\u05dc\u05dc \u05dc\u05d0 \u05ea\u05e8\u05d2\u05d9\u05dc \u05e9\u05dc \u05e7\u05dc\u05d9\u05e0\u05d0\u05d9\u05ea \u05ea\u05e7\u05e9\u05d5\u05e8\u05ea. \u05d1\u05d2\u05d3\u05d5\u05dc, OctaLoom \u05d4\u05d9\u05d0 \u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 B2B \u05d1\u05d5\u05d8\u05d9\u05e7\u05d9\u05ea \u05e9\u05e2\u05d5\u05d1\u05d3\u05ea \u05e2\u05dc \u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d9\u05ea \u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05db\u05e6\u05d9\u05e8 \u05de\u05e8\u05db\u05d6\u05d9, \u05dc\u05e6\u05d3 \u05d5\u05d5\u05d9\u05d1 \u05de\u05e8\u05e7\u05d8\u05d9\u05e0\u05d2 (\u05e9\u05d9\u05d5\u05d5\u05e7 \u05de\u05d1\u05d5\u05e1\u05e1 AI), \u05d5\u05db\u05de\u05d5 \u05db\u05df \u05d1\u05e0\u05d9\u05d9\u05ea \u05e1\u05d5\u05db\u05e0\u05d9 AI \u05e2\u05d1\u05d5\u05e8 \u05d0\u05e8\u05d2\u05d5\u05e0\u05d9\u05dd \u05d5\u05e2\u05e1\u05e7\u05d9 B2B. \u05d0\u05e0\u05d9 \u05de\u05d5\u05d1\u05d9\u05dc\u05d4 \u05d0\u05ea \u05d4\u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4, \u05d5\u05e1\u05d5\u05db\u05e0\u05d9 AI \u05e9\u05dc\u05d9 \u05e2\u05d5\u05e9\u05d9\u05dd \u05d0\u05d9\u05ea\u05d9 \u05d0\u05ea \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05d4\u05d9\u05d5\u05de\u05d9\u05d5\u05de\u05d9\u05ea.' }

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

        a: { en: "Because that's where B2B decision makers are. Not on Instagram, definitely not on TikTok. Founders looking for suppliers, HR managers looking for training solutions, CTOs reading about new trends — they're all on LinkedIn. The question is whether they see you there.", he: 'כי שם נמצאים מקבלי ההחלטות בעולמות ה-B2B. לא באינסטגרם, ובטח לא בטיקטוק. מייסד שמחפש ספק, מנהלת HR שמחפשת פתרון הדרכה, סמנכ"ל טכנולוגיה שקורא על טרנדים חדשים — כולם בלינקדאין. השאלה היא אם הם רואים אותך שם.' }

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

    posts: [

      {
        title: { en: 'The Marketing Automation Stack You Actually Need in 2026', he: '\u05e1\u05d8\u05d0\u05e7 \u05d4\u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d4 \u05d4\u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05ea \u05e9\u05d0\u05ea\u05dd \u05d1\u05d0\u05de\u05ea \u05e6\u05e8\u05d9\u05db\u05d9\u05dd \u05d1-2026' },
        date: 'Feb 20, 2026',
        href: 'https://www.octaloom.com/articles/marketing-automation-stack-2026',
        image: 'https://framerusercontent.com/images/bbc8plIg9FnEbLXe2bsnSB2iSCw.jpeg?width=800',
      },

      {
        title: { en: 'Why Most B2B Companies Waste Money on Social Media', he: '\u05dc\u05de\u05d4 \u05e8\u05d5\u05d1 \u05d7\u05d1\u05e8\u05d5\u05ea B2B \u05de\u05d1\u05d6\u05d1\u05d6\u05d5\u05ea \u05db\u05e1\u05e3 \u05e2\u05dc \u05e1\u05d5\u05e9\u05d9\u05d0\u05dc \u05de\u05d3\u05d9\u05d4' },
        date: 'Feb 20, 2026',
        href: 'https://www.octaloom.com/articles/b2b-social-media-waste',
        image: 'https://framerusercontent.com/images/EvckL6XIpKQUWNyl7s4MPwnzQQ.jpeg?scale-down-to=1024',
      },

      {
        title: { en: 'How to Turn LinkedIn Into a Real Sales Channel', he: '\u05d0\u05d9\u05da \u05dc\u05d4\u05e4\u05d5\u05da \u05d0\u05ea \u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05de\u05e0\u05d5\u05e2 \u05de\u05db\u05d9\u05e8\u05d5\u05ea \u05d0\u05de\u05d9\u05ea\u05d9' },
        date: 'Feb 20, 2026',
        href: 'https://www.octaloom.com/articles/linkedin-sales-channel',
        image: 'https://framerusercontent.com/images/qJXyxrZ0IeCMEfcQxk0bRd2RBwA.jpeg?scale-down-to=1024',
      },

    ],

  },

  newsletter: {

    title: { en: "What you won't see in the feed", he: '\u05de\u05d4 \u05e9\u05dc\u05d0 \u05e8\u05d5\u05d0\u05d9\u05dd \u05d1\u05e4\u05d9\u05d3' },

    sub: {

      en: "Best enjoyed with a cocktail or coffee (I don't judge). Twice a month I send a (super polished ✨) email with LinkedIn trends, new AI marketing content, project stories, things I learned, and what's actually working.",

      he: '\u05de\u05d5\u05de\u05dc\u05e5 \u05dc\u05e7\u05e8\u05d5\u05d0 \u05dc\u05e6\u05d3 \u05e7\u05d5\u05e7\u05d8\u05d9\u05d9\u05dc \u05d0\u05d5 \u05e7\u05e4\u05d4 (\u05d0\u05e0\u05d9 \u05dc\u05d0 \u05e9\u05d5\u05e4\u05d8\u05ea). \u05e4\u05e2\u05de\u05d9\u05d9\u05dd \u05d1\u05d7\u05d5\u05d3\u05e9 \u05d0\u05e0\u05d9 \u05e9\u05d5\u05dc\u05d7\u05ea \u05de\u05d9\u05d9\u05dc (\u05e1\u05d5\u05e4\u05e8 \u05de\u05d5\u05e9\u05e7\u05e2 ✨) \u05e2\u05dd \u05db\u05dc \u05de\u05d9\u05e0\u05d9 \u05d8\u05e8\u05e0\u05d3\u05d9\u05dd \u05d1\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05d5\u05ea\u05db\u05e0\u05d9\u05dd \u05d7\u05d3\u05e9\u05d9\u05dd \u05dc\u05d9\u05d9\u05e2\u05d5\u05dc \u05d5\u05e9\u05d9\u05e4\u05d5\u05e8 \u05ea\u05d4\u05dc\u05d9\u05db\u05d9 \u05e9\u05d9\u05d5\u05d5\u05e7 \u05d1-AI, \u05dc\u05e6\u05d3 \u05e1\u05d9\u05e4\u05d5\u05e8\u05d9\u05dd \u05de\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9\u05dd, \u05d3\u05d1\u05e8\u05d9\u05dd \u05e9\u05dc\u05de\u05d3\u05ea\u05d9, \u05d5\u05de\u05d4 \u05e9\u05de\u05e6\u05d0\u05ea\u05d9 \u05e9\u05e2\u05d5\u05d1\u05d3.'

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

  const ff = lang === "he" ? F.display : F.body

  const [scrolled, setScrolled] = useState(false)

  const [mobileOpen, setMobileOpen] = useState(false)

  const [servicesOpen, setServicesOpen] = useState(false)

  const [linkedinOpen, setLinkedinOpen] = useState(false)

  const [linkedinExpanded, setLinkedinExpanded] = useState(false)

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

  useEffect(() => {
    if (!mobileOpen) setLinkedinExpanded(false)
  }, [mobileOpen])



  const linkedinSub = [

    { en: "LinkedIn for Organizations",             he: "לינקדאין לארגונים",               href: lang === "he" ? "https://www.octaloom.com/linkedin-for-organizations-he" : "https://www.octaloom.com/linkedin-for-organizations" },

    { en: "LinkedIn for Executives",                he: "לינקדאין למייסדים ומנכ״לים",                href: lang === "he" ? "https://www.octaloom.com/linkedin-for-executives-he" : "https://www.octaloom.com/linkedin-for-executives" },

    { en: "LinkedIn for Solopreneurs & Biz Owners", he: "לינקדאין לעצמאים ובעלי עסקים", href: lang === "he" ? "https://www.octaloom.com/linkedin-for-solopreneurs-he" : "https://www.octaloom.com/linkedin-for-solopreneurs" },

  ]



  const services = [

    { en: "LinkedIn Growth Engine", he: "מנוע צמיחה בלינקדאין", href: lang === "he" ? "https://www.octaloom.com/linkedin-growth-engine-he" : "https://www.octaloom.com/linkedin-growth-engine", sub: linkedinSub },

    { en: "Fractional CMO",         he: "Fractional CMO",                                                                                                    href: lang === "he" ? "https://www.octaloom.com/fractional-cmo-he" : "https://www.octaloom.com/fractional-cmo",          sub: null },

    { en: "AI Tools & Agents",      he: "כלי AI וסוכנים",                                                                                                href: lang === "he" ? "https://www.octaloom.com/ai-tools-agents-he" : "https://www.octaloom.com/ai-tools-agents",         sub: null },

    { en: "Workshops",              he: "סדנאות",                                                                                                                              href: lang === "he" ? "https://www.octaloom.com/workshops-he" : "https://www.octaloom.com/workshops",               sub: null },

  ]



  const navBg: React.CSSProperties = scrolled

    ? { background: "rgba(236,233,231,0.82)", backdropFilter: "blur(24px) saturate(1.6)", WebkitBackdropFilter: "blur(24px) saturate(1.6)", borderBottom: "1px solid rgba(113,46,172,0.1)", boxShadow: "0 1px 24px rgba(32,30,75,0.07)" }

    : { background: "rgba(255,255,255,0.02)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }



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

    fontFamily: ff, gap: 8, whiteSpace: "nowrap", background: "transparent",

  }



  return (

    <nav dir={dir} style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "background 0.4s, padding 0.3s",
      ...(isMobile && mobileOpen
        ? { bottom: 0, background: C.cream, overflowY: "auto", display: "flex", flexDirection: "column" }
        : { padding: scrolled ? "10px 0" : "16px 0", ...navBg }
      )
    }}>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)",
        display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 16,
        position: "relative", zIndex: 101, direction: isMobile ? "ltr" : dir,
        ...(isMobile && mobileOpen
          ? { paddingTop: 14, paddingBottom: 14, borderBottom: "1px solid rgba(113,46,172,0.1)" }
          : {}
        )
      }}>



        <a href="https://www.octaloom.com/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>

          <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/logo%20nav%20bar.png"

            alt="OctaLoom" style={{ height: 36, width: "auto", display: "block" }} />

        </a>



        {!isMobile && (

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28 }}>



            {/* Services dropdown */}

            <div ref={servicesRef} style={{ position: "relative" }}

              onMouseEnter={() => setServicesOpen(true)}

              onMouseLeave={() => { setServicesOpen(false); setLinkedinOpen(false) }}>

              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14,

                color: servicesOpen ? C.deepPurple : C.textDim, fontFamily: ff,

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

              { en: "About",   he: "עליי",      href: lang === "he" ? "https://www.octaloom.com/about-he" : "https://www.octaloom.com/about" },

              { en: "Blog",    he: "בלוג",      href: lang === "he" ? "https://www.octaloom.com/blog-he" : "https://www.octaloom.com/blog" },

              { en: "Contact", he: "צור קשר",  href: lang === "he" ? "https://www.octaloom.com/contact-he" : "https://www.octaloom.com/contact" },

            ] as {en:string;he:string;href:string}[]).map((item, i) => (

              <a key={i} href={item.href}

                style={{ fontSize: 14, color: C.textDim, textDecoration: "none", fontFamily: ff, transition: "color 0.25s" }}

                onMouseEnter={e => (e.currentTarget.style.color = C.deepPurple)}

                onMouseLeave={e => (e.currentTarget.style.color = C.textDim)}>

                {lang === "he" ? item.he : item.en}

              </a>

            ))}



            {/* Goodies */}

            <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer"

              style={{ fontSize: 14, color: C.textDim, textDecoration: "none", fontFamily: ff, transition: "color 0.25s" }}

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

                  fontFamily: ff }}>

                  {l === "en" ? "EN" : "עב"}

                </button>

              ))}

            </div>



          </div>

        )}



        {!isMobile && (

          <Btn onClick={() => window.dispatchEvent(new Event("open-discovery"))} variant="purple"

            style={{ padding: "8px 20px", fontSize: 13 }}>

            {hpT(HP.hero.cta1)}

          </Btn>

        )}



        {/* Hamburger */}

        {isMobile && (

          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none",

            cursor: "pointer", width: 44, height: 44, position: "relative", gridColumn: "3",

            display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>

            <span style={{ position: "relative", display: "block", width: 28, height: 20 }}>

            {[0,9,18].map((top,i) => (

              <span key={i} style={{ position: "absolute", left: 0, width: "100%", height: 2,

                background: C.deepPurple, borderRadius: 2, top,

                transform: mobileOpen && i===0 ? "rotate(45deg) translateY(9px)" : mobileOpen && i===1 ? "scaleX(0)" : mobileOpen && i===2 ? "rotate(-45deg) translateY(-9px)" : "none",

                opacity: mobileOpen && i===1 ? 0 : 1, transition: "all 0.3s" }} />

            ))}

            </span>

          </button>

        )}

      </div>



      {/* Mobile menu — lives INSIDE the nav so fixed positioning works in Framer */}

      {isMobile && mobileOpen && (

        <div style={{ flex: 1, display: "flex", flexDirection: "column",

          padding: "20px 32px 40px", gap: 0 }}>



          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",

            textTransform: "uppercase", color: C.purple, fontFamily: ff, margin: "0 0 4px" }}>

            {lang === "he" ? "שירותים" : "Services"}

          </p>



          {services.map((svc, i) => (

            <div key={i}>

              {svc.sub ? (
                <button onClick={() => setLinkedinExpanded(prev => !prev)}
                  style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between",
                    fontSize: 20, color: C.deepPurple, padding: "11px 0", fontWeight: 600,
                    borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: ff,
                    background: "none", border: "none", cursor: "pointer",
                    textAlign: dir === "rtl" ? "right" as const : "left" as const }}>
                  {lang === "he" ? svc.he : svc.en}
                  <svg width={11} height={11} viewBox="0 0 12 12" fill="none"
                    style={{ transition: "transform 0.25s", transform: linkedinExpanded ? "rotate(180deg)" : "none", flexShrink: 0 }}>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ) : (
                <a href={svc.href} onClick={() => setMobileOpen(false)}
                  style={{ display: "block", fontSize: 20, color: C.deepPurple, textDecoration: "none",
                    fontFamily: ff, padding: "11px 0", fontWeight: 600,
                    borderBottom: "1px solid rgba(113,46,172,0.08)" }}>
                  {lang === "he" ? svc.he : svc.en}
                </a>
              )}

              <AnimatePresence>
                {svc.sub && linkedinExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                    style={{ overflow: "hidden" }}>
                    {svc.sub.map((sub, j) => (
                      <a key={j} href={sub.href} onClick={() => setMobileOpen(false)}
                        style={{ display: "block", fontSize: 15, color: C.purple, textDecoration: "none",
                          fontFamily: ff, padding: "7px 0",
                          paddingLeft: dir === "ltr" ? 20 : 0, paddingRight: dir === "rtl" ? 20 : 0,
                          borderBottom: "1px solid rgba(113,46,172,0.05)" }}>
                        {lang === "he" ? sub.he : sub.en}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          ))}



          {([

            { en: "About",   he: "עליי",     href: lang === "he" ? "https://www.octaloom.com/about-he" : "https://www.octaloom.com/about" },

            { en: "Blog",    he: "בלוג",     href: lang === "he" ? "https://www.octaloom.com/blog-he" : "https://www.octaloom.com/blog" },

            { en: "Contact", he: "צור קשר", href: lang === "he" ? "https://www.octaloom.com/contact-he" : "https://www.octaloom.com/contact" },

            { en: "Goodies", he: "Goodies",   href: "https://octagoodies.com" },

          ] as {en:string;he:string;href:string}[]).map((item, i) => (

            <a key={i} href={item.href} onClick={() => setMobileOpen(false)}

              style={{ display: "block", fontSize: 20, color: C.deepPurple, textDecoration: "none",

                fontFamily: ff, padding: "11px 0", fontWeight: 500,

                borderBottom: "1px solid rgba(113,46,172,0.08)" }}>

              {lang === "he" ? item.he : item.en}

            </a>

          ))}



          <div style={{ display: "flex", gap: 8, marginTop: 24 }}>

            {["he","en"].map(l => (

              <button key={l} onClick={() => setLang(l)}

                style={{ background: lang === l ? C.purple : "transparent",

                  color: lang === l ? "white" : C.textDim,

                  border: `1.5px solid ${lang === l ? C.purple : "rgba(113,46,172,0.25)"}`,

                  borderRadius: 8, padding: "9px 20px", cursor: "pointer",

                  fontFamily: ff, fontWeight: 700, fontSize: 14 }}>

                {l === "en" ? "EN" : "עברית"}

              </button>

            ))}

          </div>



          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>

            <Btn onClick={() => window.dispatchEvent(new Event("open-discovery"))} variant="purple"

              style={{ display: "block", textAlign: "center", padding: "14px 24px", fontSize: 15 }}>

              {hpT(HP.hero.cta1)}

            </Btn>

            <a href={getLangToggleUrl(true)}
              style={{ display: "block", textAlign: "center", padding: "11px 24px", fontSize: 13, fontWeight: 600, color: "#201e4b", borderRadius: 100, fontFamily: "'Discovery Fs', 'Noto Sans Hebrew', sans-serif", border: "1px solid rgba(32,30,75,0.2)", textDecoration: "none", width: "100%", boxSizing: "border-box" as const }}>
              Switch to English →
            </a>

          </div>

        </div>

      )}

    </nav>

  )

}



// ─── MARQUEE ─────────────────────────────────────────────────────────────────

const MARQUEE_REPEATS = 4
const MARQUEE_SPEED = 55 // px per second

function HPMarquee() {

  const { lang } = useLang()

  const items = lang === "he" ? HP.marquee.he : HP.marquee.en

  const trackRef = useRef<HTMLDivElement>(null)

  const [setWidth, setSetWidth] = useState(0)

  // Measure the width of ONE set in pixels. Pixel-based animation avoids the
  // jump that happens when % distances recalculate after async font load.
  useEffect(() => {

    const el = trackRef.current

    if (!el) return

    const measure = () => {
      const w = el.scrollWidth / MARQUEE_REPEATS
      if (w > 0) setSetWidth(w)
    }

    measure()

    const ro = new ResizeObserver(measure)

    ro.observe(el)

    if ((document as any).fonts?.ready) {
      ;(document as any).fonts.ready.then(measure)
    }

    return () => ro.disconnect()

  }, [items])

  const doubled = Array.from({ length: MARQUEE_REPEATS }).flatMap(() => items)

  return (

    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(113,46,172,0.1)",

      borderBottom: "1px solid rgba(113,46,172,0.1)", padding: "14px 0", background: C.purple, marginTop: 60 }}>

      <motion.div ref={trackRef}

        style={{ display: "flex", whiteSpace: "nowrap", willChange: "transform", width: "max-content" }}

        animate={setWidth > 0 ? { x: [0, -setWidth] } : { x: 0 }}

        transition={setWidth > 0

          ? { duration: setWidth / MARQUEE_SPEED, ease: "linear", repeat: Infinity, repeatType: "loop" }

          : { duration: 0 }}>

        {doubled.map((item, i) => (

          <React.Fragment key={i}>

            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.06em",

              textTransform: "uppercase", color: "rgba(255,255,255,0.85)", padding: "0 20px",

              fontFamily: lang === "he" ? F.display : F.body }}>{item}</span>

            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>✦</span>

          </React.Fragment>

        ))}

      </motion.div>

    </div>

  )

}



// ─── HERO ────────────────────────────────────────────────────────────────────

function HPHero() {

  const { lang } = useLang()

  const ff = lang === "he" ? F.display : F.body

  const dir = lang === "he" ? "rtl" : "ltr"

  const w = useWindowSize()

  const isMobile = w < 768



  const avatarUrls = [

    "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/avatar1..jpeg",

    "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/avatar2.jpeg",

    "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/avatar3.jpeg",

    "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/avatar4.jpeg",

    "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/avatar5.jpeg",

  ]



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

          <div style={{ display: "flex", flexDirection: "column", gap: 20, order: isMobile ? 2 : 0 }}>

            <Reveal>

              <span style={{ display: "inline-flex", alignSelf: "flex-start", fontSize: 12, fontWeight: 700,

                letterSpacing: "0.1em", textTransform: "uppercase", color: C.purple,

                padding: "6px 16px", borderRadius: 20, border: `1px solid rgba(113,46,172,0.2)`,

                background: "rgba(113,46,172,0.06)", fontFamily: ff }}>

                {hpT(HP.hero.pill)}

              </span>

            </Reveal>



            <Reveal delay={100}>

              <h1 style={{ fontFamily: ff, fontWeight: 700,

                fontSize: "clamp(34px,5vw,60px)", lineHeight: 1.08,

                letterSpacing: "-0.02em", color: C.deepPurple, whiteSpace: "pre-line", margin: 0 }}>

                {hpT(HP.hero.h1).split("\n").map((line: string, i: number) => {

                  const isLast = i === hpT(HP.hero.h1).split("\n").length - 1

                  return (

                    <span key={i} style={{ display: "block",

                      color: lang === "en"

                        ? (i >= 2 ? C.purple : C.deepPurple)

                        : (line.includes("\u05de\u05d7\u05dc\u05e7\u05d4") ? C.purple : C.deepPurple) }}>

                      {line}

                    </span>

                  )

                })}

              </h1>

            </Reveal>



            <Reveal delay={200}>

              <p style={{ fontSize: 17, color: C.textDim, maxWidth: 480, lineHeight: 1.65,

                margin: 0, fontFamily: ff }}>

                {hpT(HP.hero.sub)}

              </p>

            </Reveal>



            <Reveal delay={300}>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap",

                flexDirection: "row", justifyContent: isMobile ? "center" : "flex-start" }}>

                <Btn onClick={() => window.dispatchEvent(new Event("open-discovery"))} variant="purple">

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

                  {avatarUrls.map((src, i) => (

                    <img key={i} src={src} alt=""

                      style={{ width: 34, height: 34, borderRadius: "50%",

                        border: `2px solid ${C.cream}`, marginInlineStart: i === 0 ? 0 : -8,

                        objectFit: "cover", display: "block" }} />

                  ))}

                </div>

                <span style={{ fontSize: 13, color: C.textDim, lineHeight: 1.4, fontFamily: ff }}>

                  {hpT(HP.hero.trustTop)}

                </span>

              </div>

            </Reveal>

          </div>



          {/* Video column */}

          <Reveal delay={200} style={{ order: isMobile ? 1 : 0 }}>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

              <div style={{ position: "relative", width: "100%", maxWidth: isMobile ? "100%" : 520, borderRadius: 16,

                overflow: "hidden", boxShadow: `0 8px 40px rgba(32,30,75,0.15),0 0 0 1px rgba(113,46,172,0.1)` }}>

                <video autoPlay muted loop playsInline

                  src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/hero-video.mp4"

                  style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover",

                    background: "rgba(113,46,172,0.04)" }} />

              </div>

            </div>

          </Reveal>

        </div>

      </Container>



      <HPMarquee />

    </section>

  )

}



// ─── PROBLEM ─────────────────────────────────────────────────────────────────

function HPProblem() {

  const { lang } = useLang()

  const ff = lang === "he" ? F.display : F.body

  const w = useWindowSize(); const isMobile = w < 768

  return (

    <Sec bg={C.cream}>

      <Container>

        <Reveal>

          <h2 style={{ fontFamily: ff, fontWeight: lang === "he" ? 500 : 600, fontSize: "clamp(28px,4vw,48px)",

            lineHeight: 1.15, letterSpacing: "-0.015em", color: C.deepPurple, marginBottom: 48 }}>

            {hpT(HP.problem.title)}

          </h2>

        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",

          gap: 20, marginBottom: 48 }}>

          {HP.problem.cards.map((c: any, i: number) => (

            <Reveal key={i} delay={i * 150}>

              <div style={{ background: "white", border: "1px solid rgba(32,30,75,0.06)",

                borderRadius: 12, padding: isMobile ? "20px 18px" : "32px 28px", height: "100%",

                display: "flex", flexDirection: "column" }}>

                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center",

                  width: 36, height: 36, borderRadius: 8, background: C.redX,

                  color: C.redXText, fontSize: 16, fontWeight: 700, marginBottom: 16,

                  fontFamily: ff }}>{"\u2715"}</div>

                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8,

                  color: C.deepPurple, margin: "0 0 8px", fontFamily: ff }}>{hpT(c.label)}</h3>

                <p style={{ fontSize: 14, color: C.textDim, lineHeight: 1.6, margin: 0,

                  fontFamily: ff }}>{hpT(c.sub)}</p>

              </div>

            </Reveal>

          ))}

        </div>

        <Reveal delay={500}>

          <p style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: C.textDim,

            letterSpacing: "0.02em", margin: 0, fontFamily: ff }}>

            {hpT(HP.problem.none)}

          </p>

        </Reveal>

      </Container>

    </Sec>

  )

}



// ─── FOURTH OPTION ────────────────────────────────────────────────────────────

function HPFourthOption() {

  const { lang } = useLang()

  const ff = lang === "he" ? F.display : F.body

  return (

    <Sec bg={C.purple}>

      <Container>

        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          <Reveal>

            <p style={{ fontFamily: ff, fontWeight: lang === "he" ? 500 : 700,

              fontSize: "clamp(28px,4vw,44px)", color: C.lime, marginBottom: 8,

              textAlign: "center" }}>{hpT(HP.fourthOption.but)}</p>

            <p style={{ fontSize: 17, fontWeight: 600, color: "rgba(255,255,255,0.65)",

              textAlign: "center", marginBottom: 28, fontFamily: ff, letterSpacing: "0.02em" }}>

              {hpT({ en: "AI-Powered B2B Marketing", he: "שיווק B2B מבוסס AI" })}

            </p>

          </Reveal>

          <Reveal delay={150}>

            <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,0.8)",

              marginBottom: 20, fontFamily: ff }}>{hpT(HP.fourthOption.desc)}</p>

          </Reveal>

          <Reveal delay={250}>

            <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.95)",

              fontWeight: 600, marginBottom: 32, fontFamily: ff }}>{hpT(HP.fourthOption.value)}</p>

          </Reveal>

          <Reveal delay={350}>

            <div style={{ textAlign: "center" }}>

              <Btn onClick={() => window.dispatchEvent(new Event("open-discovery"))} variant="cream">

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

  const ff = lang === "he" ? F.display : F.body

  const w = useWindowSize(); const isMobile = w < 768

  const [torn, setTorn] = useState<Record<number,boolean>>({})

  const [tearing, setTearing] = useState<number|null>(null)



  // Neon spinning border

  const angle = useMotionValue(0)

  const holoBg = useTransform(angle, (v: number) =>

    `conic-gradient(from ${v}deg, rgba(198,225,165,.85) 0%, rgba(113,46,172,.65) 15%, rgba(236,233,231,.4) 30%, rgba(198,225,165,.45) 45%, rgba(113,46,172,.85) 60%, rgba(198,225,165,.65) 75%, rgba(113,46,172,.45) 90%, rgba(198,225,165,.85) 100%)`

  )

  useEffect(() => {

    const ctrl = fmAnimate(angle, 360, { duration: 4, repeat: Infinity, ease: "linear" })

    return () => ctrl.stop()

  }, [])



  const serviceUrls: Record<string, Record<number,string>> = {

    en: {

      0: "https://www.octaloom.com/linkedin-for-organizations",

      1: "https://www.octaloom.com/linkedin-for-executives",

      2: "https://www.octaloom.com/linkedin-for-solopreneurs",

      3: "https://www.octaloom.com/fractional-cmo",

      4: "https://www.octaloom.com/ai-tools-agents",

    },

    he: {

      0: "https://www.octaloom.com/linkedin-for-organizations-he",

      1: "https://www.octaloom.com/linkedin-for-executives-he",

      2: "https://www.octaloom.com/linkedin-for-solopreneurs-he",

      3: "https://www.octaloom.com/fractional-cmo-he",

      4: "https://www.octaloom.com/ai-tools-agents-he",

    }

  }



  const stripIcons = [

    <svg viewBox="0 0 44 44" fill="none" style={{ width: 44, height: 44 }}>

      <circle cx="22" cy="8" r="3.5" stroke={C.purple} strokeWidth="1.2"/>

      <circle cx="12" cy="24" r="3" stroke={C.purple} strokeWidth="1.2"/>

      <circle cx="32" cy="24" r="3" stroke={C.purple} strokeWidth="1.2"/>

      <circle cx="8" cy="38" r="2" fill={C.purple} fillOpacity=".35" stroke={C.purple} strokeWidth="1"/>

      <circle cx="18" cy="38" r="2" fill={C.purple} fillOpacity=".35" stroke={C.purple} strokeWidth="1"/>

      <circle cx="36" cy="38" r="2" fill={C.purple} fillOpacity=".35" stroke={C.purple} strokeWidth="1"/>

      <line x1="22" y1="11.5" x2="22" y2="19" stroke={C.purple} strokeWidth="1.2" strokeDasharray="2 2"/>

      <line x1="22" y1="19" x2="12" y2="21" stroke={C.purple} strokeWidth="1.2"/>

      <line x1="22" y1="19" x2="32" y2="21" stroke={C.purple} strokeWidth="1.2"/>

      <line x1="12" y1="27" x2="8" y2="36" stroke={C.purple} strokeWidth=".9" strokeDasharray="2 2"/>

      <line x1="12" y1="27" x2="18" y2="36" stroke={C.purple} strokeWidth=".9" strokeDasharray="2 2"/>

      <line x1="32" y1="27" x2="36" y2="36" stroke={C.purple} strokeWidth=".9" strokeDasharray="2 2"/>

    </svg>,

    <svg viewBox="0 0 44 44" fill="none" style={{ width: 44, height: 44 }}>

      <text x="22" y="5" fontFamily="'Aeonik', sans-serif" fontWeight="700" fontSize="6" fill={C.purple} textAnchor="middle" letterSpacing="0.4">CEO &amp;</text>

      <text x="22" y="12" fontFamily="'Aeonik', sans-serif" fontWeight="700" fontSize="6" fill={C.purple} textAnchor="middle" letterSpacing="0.4">FOUNDER</text>

      <circle cx="18" cy="21" r="4" stroke={C.purple} strokeWidth="1.2"/>

      <path d="M11 39 Q11 29 18 29 Q25 29 26 33" stroke={C.purple} strokeWidth="1.2" strokeLinecap="round"/>

      <path d="M31 25 L31 22.5 Q31 21 34 21 Q37 21 37 22.5 L37 25" stroke={C.purple} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>

      <rect x="28" y="25" width="13" height="9" rx="1.5" stroke={C.purple} strokeWidth="1.2"/>

      <line x1="34.5" y1="25" x2="34.5" y2="34" stroke={C.purple} strokeWidth=".8" opacity=".45"/>

    </svg>,

    <svg viewBox="0 0 44 44" fill="none" style={{ width: 44, height: 44 }}>

      <text x="22" y="7" fontFamily="'Aeonik', sans-serif" fontWeight="700" fontSize="6.5" fill={C.purple} textAnchor="middle" letterSpacing="0.3">Biz Owner</text>

      <circle cx="13" cy="17" r="3.5" stroke={C.purple} strokeWidth="1.2"/>

      <path d="M7 33 Q7 25 13 25 Q19 25 20 29" stroke={C.purple} strokeWidth="1.2" strokeLinecap="round"/>

      <rect x="25" y="21" width="16" height="11" rx="1" stroke={C.purple} strokeWidth="1.2"/>

      <line x1="27" y1="24" x2="39" y2="24" stroke={C.purple} strokeWidth=".7" opacity=".4"/>

      <line x1="27" y1="27" x2="37" y2="27" stroke={C.purple} strokeWidth=".7" opacity=".4"/>

      <line x1="27" y1="30" x2="33" y2="30" stroke={C.purple} strokeWidth=".7" opacity=".4"/>

      <path d="M24 32 L41 32 L39.5 36 L25.5 36 Z" stroke={C.purple} strokeWidth="1" strokeLinejoin="round"/>

    </svg>,

    <svg viewBox="0 0 44 44" fill="none" style={{ width: 44, height: 44 }}>

      <circle cx="22" cy="22" r="18" stroke={C.purple} strokeWidth="1.2"/>

      <circle cx="22" cy="22" r="11" stroke={C.purple} strokeWidth="1.2"/>

      <circle cx="22" cy="22" r="5" stroke={C.purple} strokeWidth="1.2"/>

      <circle cx="22" cy="22" r="1.8" fill={C.purple}/>

      <line x1="22" y1="2" x2="22" y2="7" stroke={C.purple} strokeWidth="1.2" strokeLinecap="round"/>

      <line x1="22" y1="37" x2="22" y2="42" stroke={C.purple} strokeWidth="1.2" strokeLinecap="round"/>

      <line x1="2" y1="22" x2="7" y2="22" stroke={C.purple} strokeWidth="1.2" strokeLinecap="round"/>

      <line x1="37" y1="22" x2="42" y2="22" stroke={C.purple} strokeWidth="1.2" strokeLinecap="round"/>

    </svg>,

    <svg viewBox="0 0 44 44" fill="none" style={{ width: 44, height: 44 }}>

      <rect x="16" y="16" width="12" height="12" rx="2" fill={C.purple} fillOpacity=".07" stroke={C.purple} strokeWidth="1.2"/>

      <line x1="10" y1="19.5" x2="16" y2="19.5" stroke={C.purple} strokeWidth="1" strokeLinecap="round"/>

      <line x1="10" y1="24.5" x2="16" y2="24.5" stroke={C.purple} strokeWidth="1" strokeLinecap="round"/>

      <line x1="28" y1="19.5" x2="34" y2="19.5" stroke={C.purple} strokeWidth="1" strokeLinecap="round"/>

      <line x1="28" y1="24.5" x2="34" y2="24.5" stroke={C.purple} strokeWidth="1" strokeLinecap="round"/>

      <circle cx="22" cy="22" r="2" fill={C.purple}/>

      <circle cx="22" cy="5" r="2" stroke={C.purple} strokeWidth="1.1"/>

      <path d="M19.5 10 Q19.5 8.5 22 8.5 Q24.5 8.5 24.5 10" stroke={C.purple} strokeWidth="1.1" strokeLinecap="round"/>

      <line x1="22" y1="10" x2="22" y2="16" stroke={C.purple} strokeWidth="1" strokeLinecap="round" opacity=".5"/>

      <circle cx="8" cy="37" r="2" stroke={C.purple} strokeWidth="1.1"/>

      <path d="M5.5 42 Q5.5 40.5 8 40.5 Q10.5 40.5 10.5 42" stroke={C.purple} strokeWidth="1.1" strokeLinecap="round"/>

      <line x1="10.5" y1="39" x2="16" y2="28" stroke={C.purple} strokeWidth="1" strokeLinecap="round" opacity=".5"/>

      <circle cx="36" cy="37" r="2" stroke={C.purple} strokeWidth="1.1"/>

      <path d="M33.5 42 Q33.5 40.5 36 40.5 Q38.5 40.5 38.5 42" stroke={C.purple} strokeWidth="1.1" strokeLinecap="round"/>

      <line x1="33.5" y1="39" x2="28" y2="28" stroke={C.purple} strokeWidth="1" strokeLinecap="round" opacity=".5"/>

    </svg>,

  ]



  const handleTear = (i: number) => {

    if (torn[i] || tearing !== null) return

    setTearing(i)

    setTimeout(() => {

      setTearing(null)

      setTorn(prev => ({ ...prev, [i]: true }))

      const urls = serviceUrls[lang] || serviceUrls.en

      window.location.href = urls[i] || '/'

    }, 600)

  }



  return (

    <Sec bg={C.cream} id="services">

      <Container>

        <Reveal>

          <h2 style={{ fontFamily: ff, fontWeight: lang === "he" ? 500 : 600, fontSize: "clamp(28px,4vw,48px)",

            lineHeight: 1.15, color: C.deepPurple, marginBottom: 48 }}>

            {hpT(HP.services.title)}

          </h2>

        </Reveal>

        <Reveal delay={200}>

          {/* Neon holo border wrapper */}

          <motion.div style={{

            background: holoBg, padding: 3, borderRadius: 4,

            maxWidth: 860, margin: "0 auto", position: "relative",

            boxShadow: "0 0 18px rgba(198,225,165,.2), 0 0 36px rgba(113,46,172,.15), 0 12px 48px rgba(32,30,75,.12)"

          }}>

            {/* Brass pins */}

            {[{ left: 56 }, { left: "50%", transform: "translateX(-50%)" }, { right: 56 }].map((pos, i) => (

              <div key={i} style={{

                position: "absolute", top: -9, zIndex: 30, width: 22, height: 22,

                borderRadius: "50%",

                background: "radial-gradient(circle at 38% 32%, #fdf0b0 0%, #d49a0e 35%, #8b6200 70%, #4a3000 100%)",

                boxShadow: "0 3px 8px rgba(0,0,0,.5), 0 1px 3px rgba(0,0,0,.3), inset 0 1px 3px rgba(255,240,160,.7)",

                ...pos

              }}>

                <div style={{ position: "absolute", inset: "22%", borderRadius: "50%",

                  background: "radial-gradient(circle at 35% 28%, rgba(255,255,255,.92) 0%, rgba(255,255,255,.3) 50%, transparent 70%)" }} />

              </div>

            ))}



            {/* Poster paper */}

            <div style={{

              background: "#f4f1ec", borderRadius: 1,

              transform: "rotate(-0.4deg)",

              boxShadow: "0 2px 4px rgba(0,0,0,.06), 0 6px 20px rgba(32,30,75,.1)",

              position: "relative", overflow: "hidden"

            }}>

              {/* Paper grain texture */}

              <div style={{

                position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",

                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='0.055'/%3E%3C/svg%3E")`,

              }} />



              {/* Content */}

              <div style={{ padding: "52px 32px 0", position: "relative", zIndex: 1 }}>

                <p style={{ fontFamily: ff, fontWeight: lang === "he" ? 500 : 600,

                  fontSize: isMobile ? 32 : "clamp(40px,7vw,72px)", lineHeight: 1.05, color: C.deepPurple,

                  textAlign: "center", letterSpacing: "-0.02em", marginBottom: isMobile ? 24 : 44, whiteSpace: "pre-line" }}>

                  {lang === "he" ? "\u05e7\u05d7\u05d5 \u05de\u05d4\n\u05e9\u05d0\u05ea\u05dd \u05e6\u05e8\u05d9\u05db\u05d9\u05dd" : "TAKE WHAT\nYOU NEED"}

                </p>



                {/* Tear row */}

                <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>

                  <div style={{ flex: 1, borderTop: `2px dashed rgba(113,46,172,.6)` }} />

                  <span style={{ fontSize: 11, letterSpacing: "0.18em", fontWeight: 500,

                    color: C.purple, fontFamily: ff, padding: "0 12px",

                    whiteSpace: "nowrap", opacity: 0.7 }}>

                    {lang === "he" ? "\u05e7\u05e8\u05e2\u05d5 \u05db\u05d0\u05df" : "TEAR HERE"}

                  </span>

                  <div style={{ flex: 1, borderTop: `2px dashed rgba(113,46,172,.6)` }} />

                  <span style={{ padding: "0 10px", color: C.purple, fontSize: 16, opacity: 0.5,

                    transform: "scaleX(-1)", display: "inline-block" }}>{"\u2702"}</span>

                </div>



                {/* Strips */}

                <div style={{ display: "flex" }}>
                    {HP.services.strips.map((strip: any, i: number) => (
                      <motion.div key={i}
                        animate={tearing === i ? { y: 60, rotate: -8, opacity: 0 }
                          : torn[i] ? { opacity: 0.25 }
                          : { y: 0, rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => handleTear(i)}
                        style={{ flex: 1, display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "flex-start",
                          padding: isMobile ? "14px 4px 18px" : "24px 8px 28px",
                          cursor: torn[i] ? "default" : "pointer",
                          textAlign: "center", minHeight: isMobile ? 100 : 188, position: "relative",
                          ...(lang === "he"
                            ? { borderLeft: i < HP.services.strips.length - 1 ? `1.5px dashed rgba(113,46,172,.22)` : "none" }
                            : { borderRight: i < HP.services.strips.length - 1 ? `1.5px dashed rgba(113,46,172,.22)` : "none" }) }}>
                        {!isMobile && (
                          <div style={{ position: "absolute", top: -6, left: "50%",
                            transform: "translateX(-50%)", width: 12, height: 12,
                            borderRadius: "50%", background: "#ece9e7",
                            boxShadow: "inset 0 0 0 1.5px rgba(113,46,172,.3), 0 1px 3px rgba(0,0,0,.1)" }} />
                        )}
                        <span style={{ fontSize: isMobile ? 9.5 : 13, fontWeight: isMobile ? 500 : 700,
                          color: C.purple, lineHeight: 1.3, fontFamily: ff,
                          textDecoration: (!isMobile && torn[i]) ? "line-through" : "none" }}>
                          {hpT(strip.label)}
                        </span>
                        {!isMobile && i < 3 && (
                          <div style={{ display: "flex", justifyContent: "center", marginBottom: 6, marginTop: 6 }}>
                            <svg viewBox="0 0 20 20" fill="none" style={{ width: 20, height: 20 }}>
                              <rect width="20" height="20" rx="3.5" fill={C.purple} fillOpacity=".1" stroke={C.purple} strokeWidth=".9"/>
                              <path d="M7 9.5v5.5" stroke={C.purple} strokeWidth="1.4" strokeLinecap="round"/>
                              <circle cx="7" cy="7.2" r="1" fill={C.purple}/>
                              <path d="M10.5 15V12q0-2.5 2.5-2.5t2.5 2.5v3" stroke={C.purple} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        )}
                        {!isMobile && (
                          <div style={{ marginTop: "auto", opacity: 0.6 }}>{stripIcons[i]}</div>
                        )}
                      </motion.div>
                    ))}
                  </div>

              </div>

            </div>

          </motion.div>

        </Reveal>

      </Container>

    </Sec>

  )

}



// ─── PROCESS ─────────────────────────────────────────────────────────────────

function HPProcess() {

  const { lang } = useLang()

  const ff = lang === "he" ? F.display : F.body

  const w = useWindowSize(); const isMobile = w < 768

  return (

    <Sec bg={C.purple} id="process">

      <Container>

        <Reveal>

          <h2 style={{ fontFamily: ff, fontWeight: lang === "he" ? 500 : 600, fontSize: "clamp(28px,4vw,48px)",

            lineHeight: 1.15, color: C.cream, textAlign: "center", marginBottom: 48 }}>

            {hpT(HP.process.title)}

          </h2>

        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 20 }}>

          {HP.process.steps.map((step: any, i: number) => (

            <Reveal key={i} delay={i * 150}>

              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 16,

                padding: isMobile ? "20px 18px" : "32px 28px", height: "100%", display: "flex", flexDirection: "column" }}>

                <img

                  src={`https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/${i + 1}.svg`}

                  alt="" aria-hidden="true"

                  style={{ width: 56, height: 56, marginBottom: 20, objectFit: "contain" }}

                />

                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.cream,

                  marginBottom: 12, fontFamily: ff }}>{hpT(step.title)}</h3>

                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)",

                  lineHeight: 1.65, margin: 0, fontFamily: ff }}>{hpT(step.desc)}</p>

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

  const { lang } = useLang()

  const ff = lang === "he" ? F.display : F.body

  const items = HP.testimonials.items

  const [cur, setCur] = useState(0)

  const timer = useRef<ReturnType<typeof setInterval>>()



  const next = () => setCur(p => (p + 1) % items.length)

  const prev = () => setCur(p => (p - 1 + items.length) % items.length)



  const reset = (idx: number) => {

    clearInterval(timer.current!)

    setCur(idx)

    timer.current = setInterval(next, 5000)

  }



  useEffect(() => {

    timer.current = setInterval(next, 5000)

    return () => clearInterval(timer.current!)

  }, [])



  return (

    <Sec bg={C.cream}>

      <Container>

        <Reveal>

          <h2 style={{ fontFamily: ff, fontWeight: lang === "he" ? 500 : 600, fontSize: "clamp(28px,4vw,48px)",

            lineHeight: 1.15, color: C.deepPurple, marginBottom: 48 }}>

            {hpT(HP.testimonials.title)}

          </h2>

        </Reveal>



        <div style={{ position: "relative", overflow: "hidden", maxWidth: 720, margin: "0 auto" }}>

          <AnimatePresence mode="wait">

            <motion.div key={cur}

              initial={{ opacity: 0, x: lang === "he" ? -40 : 40 }}

              animate={{ opacity: 1, x: 0 }}

              exit={{ opacity: 0, x: lang === "he" ? 40 : -40 }}

              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>

              <div style={{ background: "white", border: "1px solid rgba(32,30,75,0.07)",

                borderRadius: 16, padding: "36px 32px",

                boxShadow: "0 4px 32px rgba(32,30,75,0.06)" }}>

                <p style={{ fontSize: 15, lineHeight: 1.85, color: C.deepPurple,

                  marginBottom: 28, fontStyle: "italic", fontFamily: ff }}>

                  {`"${hpT(items[cur].quote)}"`}

                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>

                  <div style={{ width: 48, height: 48, borderRadius: "50%",

                    background: `linear-gradient(135deg,${C.purple},#9b59b6)`,

                    display: "flex", alignItems: "center", justifyContent: "center",

                    fontSize: 20, fontWeight: 700, color: C.cream, flexShrink: 0,

                    fontFamily: ff }}>

                    {hpT(items[cur].author).charAt(0)}

                  </div>

                  <div>

                    <strong style={{ fontSize: 15, color: C.deepPurple, display: "block",

                      fontFamily: ff, fontWeight: 700 }}>

                      {hpT(items[cur].author)}

                    </strong>

                    <span style={{ fontSize: 13, color: C.textDim, fontFamily: ff }}>

                      {hpT(items[cur].role)}

                    </span>

                  </div>

                </div>

              </div>

            </motion.div>

          </AnimatePresence>

        </div>



        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 32 }}>

          <button onClick={() => reset(lang === "he" ? (cur + 1) % items.length : (cur - 1 + items.length) % items.length)}

            style={{ width: 38, height: 38, borderRadius: "50%",

              border: `1.5px solid rgba(113,46,172,0.25)`, background: "transparent",

              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",

              color: C.purple, fontSize: 18, lineHeight: 1 }}>

            {lang === "he" ? "→" : "←"}

          </button>



          <div style={{ display: "flex", gap: 6 }}>

            {items.map((_: any, i: number) => (

              <button key={i} onClick={() => reset(i)}

                style={{ height: 8, width: i === cur ? 28 : 8, borderRadius: 4, border: "none",

                  cursor: "pointer", padding: 0,

                  background: i === cur ? C.purple : "rgba(113,46,172,0.2)",

                  transition: "all 0.35s" }} />

            ))}

          </div>



          <button onClick={() => reset(lang === "he" ? (cur - 1 + items.length) % items.length : (cur + 1) % items.length)}

            style={{ width: 38, height: 38, borderRadius: "50%",

              border: `1.5px solid rgba(113,46,172,0.25)`, background: "transparent",

              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",

              color: C.purple, fontSize: 18, lineHeight: 1 }}>

            {lang === "he" ? "←" : "→"}

          </button>

        </div>

      </Container>

    </Sec>

  )

}



// ─── CASE STUDY ───────────────────────────────────────────────────────────────

function HPCaseStudy() {

  const { lang } = useLang()

  const ff = lang === "he" ? F.display : F.body

  const w = useWindowSize(); const isMobile = w < 768

  return (

    <Sec bg={C.cream} id="case">

      <Container>

        <Reveal>

          <div style={{ background: "rgba(255,255,255,0.55)", borderRadius: 16,

            padding: isMobile ? 24 : "clamp(32px,5vw,56px)",

            boxShadow: "0 4px 32px rgba(0,0,0,0.06)",

            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>



            <h2 style={{ fontFamily: ff, fontWeight: lang === "he" ? 500 : 700,

              fontSize: "clamp(22px,3vw,32px)", lineHeight: 1.2,

              color: C.deepPurple, marginBottom: 24 }}>

              {hpT(HP.caseStudy.headline)}

            </h2>



            <p style={{ fontSize: 18, fontStyle: "italic", color: C.purple,

              lineHeight: 1.6, marginBottom: 8, fontWeight: 600,

              fontFamily: ff }}>{hpT(HP.caseStudy.quote)}</p>

            <p style={{ fontSize: 14, color: C.deepPurple, opacity: 0.6,

              marginBottom: 32, fontFamily: ff }}>{hpT(HP.caseStudy.quoteAuthor)}</p>



            {[

              [HP.caseStudy.startTitle, HP.caseStudy.startText],

            ].map(([title, text]: any, i: number) => (

              <div key={i}>

                <h4 style={{ fontSize: 16, fontWeight: 700, color: C.deepPurple,

                  marginBottom: 12, marginTop: 28, fontFamily: ff }}>{hpT(title)}</h4>

                <p style={{ fontSize: 15, lineHeight: 1.7, color: C.deepPurple,

                  opacity: 0.75, marginBottom: 16, fontFamily: ff }}>{hpT(text)}</p>

              </div>

            ))}



            <h4 style={{ fontSize: 16, fontWeight: 700, color: C.deepPurple,

              marginBottom: 12, marginTop: 28, fontFamily: ff }}>{hpT(HP.caseStudy.whatTitle)}</h4>

            <p style={{ fontSize: 15, lineHeight: 1.7, color: C.deepPurple,

              opacity: 0.75, marginBottom: 16, fontFamily: ff, whiteSpace: "pre-line" }}>{hpT(HP.caseStudy.whatText)}</p>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column",

              gap: 12, marginBottom: 20, padding: 0 }}>

              {hpT(HP.caseStudy.channels).map((ch: string, i: number) => (

                <li key={i} style={{ display: "flex", gap: 10, fontSize: 14,

                  lineHeight: 1.6, color: C.deepPurple, opacity: 0.8, fontFamily: ff }}>

                  <span style={{ width: 6, height: 6, borderRadius: "50%",

                    background: C.purple, flexShrink: 0, marginTop: 8 }} />

                  {ch}

                </li>

              ))}

            </ul>

            <p style={{ fontSize: 15, lineHeight: 1.7, color: C.deepPurple,

              opacity: 0.75, marginBottom: 16, fontFamily: ff }}>{hpT(HP.caseStudy.summary)}</p>

            <p style={{ fontSize: 15, lineHeight: 1.7, color: C.deepPurple,

              fontWeight: 600, marginBottom: 16, fontFamily: ff }}>{hpT(HP.caseStudy.agentLine)}</p>



            <h4 style={{ fontSize: 16, fontWeight: 700, color: C.deepPurple,

              marginBottom: 12, marginTop: 28, fontFamily: ff }}>{hpT(HP.caseStudy.resultsTitle)}</h4>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",

              gap: 16, margin: "28px 0" }}>

              {HP.caseStudy.results.map((r: any, i: number) => (

                <div key={i} style={{ textAlign: "center", padding: "20px 12px",

                  background: "rgba(113,46,172,0.04)", borderRadius: 12 }}>

                  <span style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700,

                    color: C.purple, display: "block", marginBottom: 6, fontFamily: ff }}>

                    <AnimatedNum value={r.num} />

                  </span>

                  <span style={{ fontSize: 13, color: C.deepPurple, opacity: 0.65,

                    lineHeight: 1.4, fontFamily: ff }}>{hpT(r.label)}</span>

                </div>

              ))}

            </div>



            <p style={{ fontSize: 14, color: C.purple, fontWeight: 600,

              marginBottom: 28, fontFamily: ff }}>{hpT(HP.caseStudy.inbound)}</p>



            <div style={{ textAlign: "center", marginTop: 32, paddingTop: 24,

              borderTop: "1px solid rgba(0,0,0,0.06)" }}>

              <p style={{ fontSize: 18, fontWeight: 700, color: C.deepPurple,

                marginBottom: 16, fontFamily: ff }}>{hpT(HP.caseStudy.bottomCta)}</p>

              <Btn onClick={() => window.dispatchEvent(new Event("open-discovery"))} variant="purple">

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

  const { lang } = useLang()

  const ff = lang === "he" ? F.display : F.body

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

              <h2 style={{ fontFamily: ff, fontWeight: lang === "he" ? 500 : 600, fontSize: "clamp(28px,4vw,48px)",

                lineHeight: 1.15, color: C.deepPurple, marginBottom: 24 }}>

                {hpT(HP.about.title)}

              </h2>

            </Reveal>

            <Reveal delay={150}>

              <p style={{ fontSize: 18, fontWeight: 600, color: C.purple,

                marginBottom: 12, fontFamily: ff }}>

                {hpT({ en: "Hi, lovely to meet you.", he: "היי, נעים מאד." })}

              </p>

            </Reveal>

            <Reveal delay={200}>

              <p style={{ fontSize: 16, lineHeight: 1.75, color: C.deepPurple,

                opacity: 0.75, marginBottom: 24, fontFamily: ff }}>

                {hpT(HP.about.text)}

              </p>

            </Reveal>

            <Reveal delay={300}>

              <Btn href="https://www.linkedin.com/in/hanita-yudovski/" variant="purple">

                {lang === "he" ? <>{hpT(HP.about.cta)} <LiIcon size={16} /></> : <><LiIcon size={16} /> {hpT(HP.about.cta)}</>}

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

  const { lang } = useLang()

  const ff = lang === "he" ? F.display : F.body

  const [openIdx, setOpenIdx] = useState<number|null>(null)

  return (

    <Sec bg={C.deepPurple} id="faq">

      <Container>

        <Reveal>

          <h2 style={{ fontFamily: ff, fontWeight: lang === "he" ? 500 : 600, fontSize: "clamp(28px,4vw,48px)",

            lineHeight: 1.15, color: C.cream, marginBottom: 48 }}>

            {hpT(HP.faq.title)}

          </h2>

        </Reveal>

        <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 2 }}>

          {HP.faq.items.map((item: any, i: number) => (

            <Reveal key={i} delay={i * 80}>

              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",

                  overflow: "hidden" }}

                onClick={() => setOpenIdx(openIdx === i ? null : i)}>

                <div style={{ display: "flex", justifyContent: "space-between",

                  alignItems: "center", padding: "20px 0", gap: 16 }}>

                  <h3 style={{ fontSize: 17, fontWeight: 700, color: C.cream,

                    margin: 0, fontFamily: ff }}>{hpT(item.q)}</h3>

                  <motion.span animate={{ rotate: openIdx === i ? 180 : 0 }}

                    style={{ fontSize: 22, color: C.lime, flexShrink: 0, width: 28, height: 28,

                      display: "flex", alignItems: "center", justifyContent: "center",

                      fontFamily: ff }}>

                    {openIdx === i ? "\u2212" : "+"}

                  </motion.span>

                </div>

                <motion.div
                  animate={{ height: openIdx === i ? "auto" : 0, opacity: openIdx === i ? 1 : 0 }}

                  transition={{ duration: 0.4 }}

                  style={{ overflow: "hidden" }}>

                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)",

                    lineHeight: 1.7, paddingBottom: 20, margin: 0, fontFamily: ff }}>

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

  const { lang } = useLang()

  const ff = lang === "he" ? F.display : F.body

  const w = useWindowSize(); const isMobile = w < 768

  return (

    <section style={{ background: C.lime, padding: "clamp(48px,6vw,80px) 0 clamp(32px,5vw,60px)" }}>

      <Container>

        <Reveal>

          <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>

            <div style={{ display: "flex", marginBottom: 20, fontSize: 15,

              color: C.deepPurple, fontWeight: 600, fontFamily: ff,

              flexDirection: isMobile ? "column" : "row", gap: isMobile ? 8 : 24 } as any}>

              <span>{"\u2460"} {hpT({ en: "Not sure where to start?", he: "\u05d9\u05d5\u05ea\u05e8 \u05de\u05d9\u05d3\u05d9 \u05d0\u05d5\u05e4\u05e6\u05d9\u05d5\u05ea?" })}</span>

              <span>{"\u2461"} {hpT({ en: "Let's figure it out together.", he: "\u05dc\u05d0 \u05d1\u05d8\u05d5\u05d7\u05d9\u05dd \u05de\u05d4 \u05de\u05ea\u05d0\u05d9\u05dd?" })}</span>

            </div>

            <div style={{ position: "relative", border: `2.5px solid ${C.deepPurple}`, borderRadius: 12,

              padding: isMobile ? "24px 20px" : "32px 40px",

              display: "flex", alignItems: "center", justifyContent: "space-between",

              gap: 24, flexDirection: isMobile ? "column" : "row",

              textAlign: isMobile ? "center" : "start" } as any}>

              {/* Starburst */}

              <div style={{ position: "absolute", top: -22, right: -16, width: 72, height: 72,

                display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>

                <svg viewBox="0 0 72 72" width="72" height="72" style={{ position: "absolute" }}>

                  <polygon points="36,2 42,22 62,10 50,28 70,36 50,44 62,62 42,50 36,70 30,50 10,62 22,44 2,36 22,28 10,10 30,22" fill={C.purple} />

                </svg>

                <span style={{ position: "relative", zIndex: 1, fontSize: 11, fontWeight: 800,

                  color: C.cream, textAlign: "center", lineHeight: 1.2, fontFamily: ff }}>

                  It's<br/>FREE!

                </span>

              </div>

              <span onClick={() => window.dispatchEvent(new Event("open-discovery"))}
                style={{ fontWeight: 500, fontSize: "clamp(24px,3.5vw,40px)",
                color: C.deepPurple, fontFamily: ff, cursor: "pointer" }}>

                {hpT({ en: "Book a Call With Me", he: "\u05ea\u05d0\u05de\u05d5 \u05d0\u05d9\u05ea\u05d9 \u05e9\u05d9\u05d7\u05d4" })}

              </span>

              <Btn onClick={() => window.dispatchEvent(new Event("open-discovery"))} variant="purple">

                {hpT({ en: "Let's Talk ✨", he: "\u05d3\u05d1\u05e8\u05d9 \u05d0\u05dc\u05d9\u05d9, \u05d0\u05e0\u05d9 \u05de\u05d5\u05dc \u05d4\u05d9\u05d5\u05de\u05df ✨" })}

              </Btn>

            </div>

          </div>

        </Reveal>

      </Container>

    </section>

  )

}



// ─── LINKEDIN FEED ────────────────────────────────────────────────────────────

function HPLinkedInFeed() {
  const { lang } = useLang()
  const ff = lang === "he" ? F.display : F.body
  const w = useWindowSize()
  const isMobile = w < 768
  const liCols = w < 768 ? "1fr" : w < 1024 ? "repeat(2,1fr)" : "repeat(3,1fr)"

  const embeds = [
    "https://www.linkedin.com/embed/feed/update/urn:li:activity:7440302334309511168",
    "https://www.linkedin.com/embed/feed/update/urn:li:activity:7432689632930099200",
    "https://www.linkedin.com/embed/feed/update/urn:li:activity:7439592640687398912",
  ]

  return (
    <Sec bg={C.navy}>
      <Container>
        <Reveal>
          <h2 style={{ fontFamily: ff, fontWeight: lang === "he" ? 500 : 600, fontSize: "clamp(28px,4vw,48px)",
            lineHeight: 1.15, color: C.lime, marginBottom: 8, textAlign: "center" }}>
            {hpT(HP.linkedinFeed.title)}
          </h2>
        </Reveal>
        <Reveal delay={50}>
          <p style={{ color: "rgba(255,253,245,0.7)", marginBottom: 48, fontSize: 16,
            fontFamily: ff, textAlign: "center", maxWidth: 512, margin: "0 auto 48px" }}>
            {hpT(HP.linkedinFeed.sub)}
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: liCols, gap: 24 }}>
          {embeds.map((src, i) => (
            <Reveal key={i} delay={i * 120}>
              <div style={{ borderRadius: 12, overflow: "hidden", border: `2px solid ${C.lime}`, background: "#fff" }}>
                <iframe
                  src={src}
                  height={isMobile ? 380 : 500}
                  width="100%"
                  frameBorder={0}
                  allowFullScreen
                  title={`LinkedIn post ${i + 1}`}
                  style={{ display: "block" }}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Btn href="https://www.linkedin.com/in/hanita-yudovski/" variant="lime">
              {lang === "he" ? <>{hpT(HP.linkedinFeed.followCta)} <LiIcon size={16} /></> : <><LiIcon size={16} /> {hpT(HP.linkedinFeed.followCta)}</>}
            </Btn>
          </div>
        </Reveal>
      </Container>
    </Sec>
  )
}



// ─── BLOG ─────────────────────────────────────────────────────────────────────

function HPBlog() {

  const { lang } = useLang()

  const ff = lang === "he" ? F.display : F.body

  const w = useWindowSize(); const isMobile = w < 768

  const thumbColors = ["oklch(0.25 0.08 280)","oklch(0.25 0.08 310)","oklch(0.25 0.08 340)"]

  return (

    <Sec bg={C.cream} id="blog">

      <Container>

        <Reveal>

          <h2 style={{ fontFamily: ff, fontWeight: lang === "he" ? 500 : 600, fontSize: "clamp(28px,4vw,48px)",

            lineHeight: 1.15, color: C.deepPurple, marginBottom: 8 }}>

            {hpT(HP.blog.title)}

          </h2>

        </Reveal>

        <Reveal delay={50}>

          <p style={{ fontSize: 16, color: C.textDim, marginBottom: 40, maxWidth: 560,

            fontFamily: ff }}>{hpT(HP.blog.sub)}</p>

        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",

          gap: 24, marginBottom: 32 }}>

          {HP.blog.posts.map((post: any, i: number) => (

            <Reveal key={i} delay={i * 120} style={{ height: "100%" }}>

              <a href={(post as any).href || 'https://www.octaloom.com/blog'}
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(32,30,75,0.12)" }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none" }}
                style={{ display: "flex", flexDirection: "column", height: "100%", borderRadius: 12,
                overflow: "hidden", background: "white", border: "1px solid rgba(32,30,75,0.06)",
                textDecoration: "none", transition: "transform 0.3s, box-shadow 0.3s" }}>

                <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                  {(post as any).image
                    ? <img src={(post as any).image} alt={hpT(post.title)}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    : <div style={{ width: "100%", height: "100%", background: thumbColors[i],
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontFamily: "monospace", color: C.lime }}>article image</div>
                  }
                </div>

                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.deepPurple,

                  padding: "16px 20px 8px", lineHeight: 1.45, margin: 0,

                  fontFamily: ff }}>{hpT(post.title)}</h3>

                <span style={{ fontSize: 12, color: C.textDim, padding: "0 20px",

                  fontFamily: ff }}>{post.date}</span>

                <span style={{ fontSize: 13, color: C.purple, padding: "12px 20px 16px",

                  marginTop: "auto", fontWeight: 700, fontFamily: ff }}>

                  {hpT(HP.blog.readMore)} &rarr;

                </span>

              </a>

            </Reveal>

          ))}

        </div>

        <Reveal delay={400}>

          <div style={{ textAlign: "center" }}>

            <Btn href={lang === "he" ? "https://www.octaloom.com/blog-he" : "https://www.octaloom.com/blog"} variant="ghost">{hpT(HP.blog.viewAll)}</Btn>

          </div>

        </Reveal>

      </Container>

    </Sec>

  )

}



// ─── NEWSLETTER ───────────────────────────────────────────────────────────────

function HPNewsletter() {

  const w = useWindowSize(); const isMobile = w < 768

  const { lang } = useLang()

  const ff = lang === "he" ? F.display : F.body

  const [email, setEmail] = useState("")

  const [checked, setChecked] = useState(false)

  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle")

  const [errMsg, setErrMsg] = useState("")



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    if (!email || !checked) {

      setErrMsg(lang === "he" ? "נא למלא אימייל ולאשר את ההסכמה" : "Please enter email and agree to terms")

      setStatus("error")

      return

    }

    setStatus("loading")

    try {

      const res = await fetch("https://connect.mailerlite.com/api/subscribers", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          "Authorization": `Bearer ${MAILERLITE_TOKEN}`,

        },

        body: JSON.stringify({ email, groups: [MAILERLITE_GROUP_ID] }),

      })

      if (res.ok) {

        setStatus("success")

        setEmail("")

        setChecked(false)

      } else {

        const data = await res.json()

        setErrMsg(data?.message || "Error")

        setStatus("error")

      }

    } catch {

      setErrMsg(lang === "he" ? "שגיאת רשת, נסי שוב" : "Network error, please try again")

      setStatus("error")

    }

  }



  return (

    <Sec bg={C.purple}>

      <Container>

        <Reveal>

          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>

            <h2 style={{ fontFamily: ff, fontWeight: 500,

              fontSize: "clamp(24px,3vw,36px)", color: C.cream, marginBottom: 16 }}>

              {hpT(HP.newsletter.title)}

            </h2>

            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginBottom: 28,

              lineHeight: 1.7, fontFamily: ff }}>{hpT(HP.newsletter.sub)}</p>



            {status === "success" ? (

              <p style={{ fontSize: 16, fontFamily: ff, color: C.lime, fontWeight: 600 }}>

                {lang === "he" ? "נרשמת בהצלחה! תודה" : "Subscribed successfully! Thank you"}

              </p>

            ) : (

              <form onSubmit={handleSubmit}

                style={{ display: "flex", gap: 8, maxWidth: 420, margin: "0 auto",

                  flexDirection: isMobile ? "column" : "row" } as any}>

                <input type="email" value={email} onChange={e => setEmail(e.target.value)}

                  placeholder={hpT(HP.newsletter.placeholder)}

                  style={{ flex: 1, background: "rgba(255,255,255,0.08)", color: C.cream,

                    padding: "14px 18px", borderRadius: 8, fontSize: 14,

                    border: status === "error" ? `1px solid ${C.lime}` : "1px solid rgba(255,255,255,0.12)",

                    fontFamily: ff, outline: "none" }} />

                <button type="submit" disabled={status === "loading"}

                  style={{ background: C.lime, color: C.deepPurple, padding: "14px 24px",

                    borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer",

                    border: "none", fontFamily: ff, whiteSpace: "nowrap",

                    opacity: status === "loading" ? 0.7 : 1 }}>

                  {status === "loading"

                    ? (lang === "he" ? "שולחת..." : "Sending...")

                    : hpT(HP.newsletter.btn)}

                </button>

              </form>

            )}



            {status === "error" && (

              <p style={{ fontSize: 12, color: C.lime, marginTop: 8, fontFamily: ff }}>{errMsg}</p>

            )}



            <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 14,

              display: "flex", alignItems: "flex-start", gap: 8, justifyContent: "center",

              textAlign: "start" }}>

              <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)}

                style={{ accentColor: C.lime, marginTop: 2 }} />

              <span style={{ fontFamily: ff }}>{hpT(HP.finalCta.formConsent)}</span>

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

  const ff = lang === "he" ? F.display : F.body

  const dir = lang === "he" ? "rtl" : "ltr"

  const w = useWindowSize(); const isMobile = w < 768



  const linkStyle: React.CSSProperties = {

    fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none",

    transition: "color 0.2s", fontFamily: ff, display: "block", lineHeight: "1.9",

  }

  const headStyle: React.CSSProperties = {

    fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",

    color: C.cream, margin: "0 0 14px", fontFamily: lang === "he" ? F.display : F.body,

  }

  const hover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {

    e.currentTarget.style.color = enter ? C.lime : "rgba(255,255,255,0.5)"

  }



  const pages = [

    { en: "Home",    he: "דף הבית",  href: "https://www.octaloom.com/" },

    { en: "About",   he: "עליי",      href: lang === "he" ? "https://www.octaloom.com/about-he" : "https://www.octaloom.com/about" },

    { en: "Blog",    he: "בלוג",     href: lang === "he" ? "https://www.octaloom.com/blog-he" : "https://www.octaloom.com/blog" },

    { en: "Contact", he: "צור קשר", href: lang === "he" ? "https://www.octaloom.com/contact-he" : "https://www.octaloom.com/contact" },

  ]



  // Services matching nav exactly — Growth Engine first, then sub-items indented, then the rest

  const serviceLinks = [

    { label: { en: "LinkedIn Growth Engine",             he: "מנוע צמיחה בלינקדאין" },          href: lang === "he" ? "https://www.octaloom.com/linkedin-growth-engine-he" : "https://www.octaloom.com/linkedin-growth-engine", indent: false },

    { label: { en: "LinkedIn for Organizations",          he: "לינקדאין לארגונים" },              href: lang === "he" ? "https://www.octaloom.com/linkedin-for-organizations-he" : "https://www.octaloom.com/linkedin-for-organizations", indent: true  },

    { label: { en: "LinkedIn for Executives",             he: "לינקדאין למייסדים ומנכ״לים" },              href: lang === "he" ? "https://www.octaloom.com/linkedin-for-executives-he" : "https://www.octaloom.com/linkedin-for-executives",    indent: true  },

    { label: { en: "LinkedIn for Solopreneurs & Biz Owners", he: "לינקדאין לעצמאים ובעלי עסקים" }, href: lang === "he" ? "https://www.octaloom.com/linkedin-for-solopreneurs-he" : "https://www.octaloom.com/linkedin-for-solopreneurs",  indent: true  },

    { label: { en: "Fractional CMO",                     he: "Fractional CMO" },                   href: lang === "he" ? "https://www.octaloom.com/fractional-cmo-he" : "https://www.octaloom.com/fractional-cmo",            indent: false },

    { label: { en: "AI Tools & Agents",                  he: "כלי AI וסוכנים" },                  href: lang === "he" ? "https://www.octaloom.com/ai-tools-agents-he" : "https://www.octaloom.com/ai-tools-agents",           indent: false },

    { label: { en: "Workshops",                          he: "סדנאות" },                          href: lang === "he" ? "https://www.octaloom.com/workshops-he" : "https://www.octaloom.com/workshops",                 indent: false },

  ]



  const socialIcons = [

    {

      href: "https://www.linkedin.com/in/hanita-yudovski/",

      label: "LinkedIn",

      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,

    },

    {

      href: "https://www.instagram.com/hanita_Y",

      label: "Instagram",

      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,

    },

    {

      href: "https://www.facebook.com/octaloom",

      label: "Facebook",

      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,

    },

    {

      href: "https://www.youtube.com/@Hanita_Octaloom",

      label: "YouTube",

      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>,

    },

    {

      href: "https://open.spotify.com/show/4XmsthqR7gnj4nf2gL0T7j",

      label: "Spotify",

      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>,

    },

  ]



  return (

    <footer dir={dir} style={{ padding: isMobile ? "32px 0 0" : "64px 0 0", background: C.deepPurple, color: "rgba(255,255,255,0.7)" }}>

      <Container>



        {/* Main grid */}

        <div style={{ display: "grid",

          gridTemplateColumns: isMobile ? "1fr" : w < 1024 ? "1fr 1fr" : "2fr 1fr 1.6fr 1fr 1fr",

          gap: isMobile ? 20 : 40, paddingBottom: isMobile ? 24 : 48 }}>



          {/* Brand */}

          <div>

            <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png"

              alt="OctaLoom" style={{ height: isMobile ? 64 : 128, width: "auto", display: "block" }} />

            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 14,

              maxWidth: 240, fontFamily: ff, lineHeight: 1.65 }}>

              {lang === "he"

                ? "מחלקת השיווק שלך, רק בלי המחלקה"

                : "Your marketing department, minus the department."}

            </p>

          </div>



          {/* Pages */}

          {!isMobile && <div>

            <h4 style={headStyle}>{lang === "he" ? "דפים" : "Pages"}</h4>

            {pages.map((p, i) => (

              <a key={i} href={p.href} style={linkStyle}

                onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>

                {lang === "he" ? p.he : p.en}

              </a>

            ))}

          </div>}



          {/* Services */}

          {!isMobile && <div>

            <h4 style={headStyle}>{lang === "he" ? "שירותי לינקדאין" : "LinkedIn Services"}</h4>

            {([

              { en: "LinkedIn for Organizations", he: "לינקדאין לארגונים", href: lang === "he" ? "https://www.octaloom.com/linkedin-for-organizations-he" : "https://www.octaloom.com/linkedin-for-organizations" },

              { en: "LinkedIn for Founders",      he: "לינקדאין למייסדים ומנכ״לים", href: lang === "he" ? "https://www.octaloom.com/linkedin-for-executives-he" : "https://www.octaloom.com/linkedin-for-executives" },

              { en: "LinkedIn for Solopreneurs",  he: "לינקדאין לעצמאים", href: lang === "he" ? "https://www.octaloom.com/linkedin-for-solopreneurs-he" : "https://www.octaloom.com/linkedin-for-solopreneurs" },

            ] as {en:string;he:string;href:string}[]).map((s, i) => (

              <a key={i} href={s.href} style={linkStyle}

                onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>

                {lang === "he" ? s.he : s.en}

              </a>

            ))}

            <h4 style={{ ...headStyle, marginTop: 20 }}>{lang === "he" ? "שירותים נוספים" : "More Services"}</h4>

            {([

              { en: "Fractional CMO",    he: "Fractional CMO",                                                href: lang === "he" ? "https://www.octaloom.com/fractional-cmo-he" : "https://www.octaloom.com/fractional-cmo" },

              { en: "AI Tools & Agents", he: "כלי AI וסוכנים", href: lang === "he" ? "https://www.octaloom.com/ai-tools-agents-he" : "https://www.octaloom.com/ai-tools-agents" },

              { en: "Workshops",         he: "סדנאות",         href: lang === "he" ? "https://www.octaloom.com/workshops-he" : "https://www.octaloom.com/workshops" },

            ] as {en:string;he:string;href:string}[]).map((s, i) => (

              <a key={i} href={s.href} style={linkStyle}

                onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>

                {lang === "he" ? s.he : s.en}

              </a>

            ))}

          </div>}



          {/* OctaGoodies */}

          {!isMobile && <div>

            <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "inline-block" }}>
              <img
                src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/OCTAGOODIES%20GREEN.png"
                alt="OctaGoodies"
                style={{ height: 37, width: "auto", display: "block", opacity: 0.9,
                  transition: "opacity 0.2s" }}
                onMouseEnter={(e: any) => e.currentTarget.style.opacity = "1"}
                onMouseLeave={(e: any) => e.currentTarget.style.opacity = "0.9"}
              />
            </a>

            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 6,

              fontFamily: ff, lineHeight: 1.6 }}>

              {lang === "he" ? "כלים וטמפלייטים לשיווק" : "Marketing tools & templates"}

            </p>

          </div>}



          {/* Follow Us */}

          <div>

            {!isMobile && <h4 style={headStyle}>{lang === "he" ? "עקבו אחרינו" : "Follow Us"}</h4>}

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>

              {socialIcons.map((s, i) => (

                <a key={i} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined}

                  rel="noopener noreferrer" aria-label={s.label}

                  style={{ display: "flex", alignItems: "center", justifyContent: "center",

                    width: 40, height: 40, borderRadius: "50%",

                    border: "1px solid rgba(255,255,255,0.15)",

                    color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "all 0.2s" }}

                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.lime; e.currentTarget.style.color = C.lime }}

                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)" }}>

                  {s.svg}

                </a>

              ))}

            </div>

          </div>

        </div>



        {/* Bottom bar — no separator line */}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",

          paddingTop: 24, paddingBottom: 32,

          fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: ff,

          flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 0 } as any}>

          <span>© 2026 OctaLoom. {lang === "he" ? "כל הזכויות שמורות" : "All Rights Reserved"}</span>

          <div style={{ display: "flex", gap: 20 }}>

            {[

              { label: HP.footer.privacy, href: lang === "he" ? "https://www.octaloom.com/privacy-policy-he" : "https://www.octaloom.com/privacy-policy" },

              { label: HP.footer.terms,   href: lang === "he" ? "https://www.octaloom.com/terms-of-service-he" : "https://www.octaloom.com/terms-of-service" },

              { label: { en: "Accessibility", he: "נגישות" }, href: lang === "he" ? "https://www.octaloom.com/accessibility-he" : "https://www.octaloom.com/accessibility" },

            ].map((l, i) => (

              <a key={i} href={l.href}

                style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none",

                  transition: "color 0.2s", fontFamily: ff }}

                onMouseEnter={e => (e.currentTarget.style.color = C.lime)}

                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>

                {hpT(l.label)}

              </a>

            ))}

          </div>

        </div>



      </Container>

    </footer>

  )

}



// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const raf = useRef<number>()
  const st = useRef({ hover: false, click: false, dark: false })
  const w = useWindowSize()

  useEffect(() => {
    if (w < 768) return
    const style = document.createElement('style')
    style.textContent = '@media (pointer: fine) { * { cursor: none !important; } }'
    document.head.appendChild(style)

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Light bg → purple cursor. Dark bg → cream cursor. Click → inverted.
    const baseColor = () => (st.current.dark ? C.cream : C.purple)
    const invColor  = () => (st.current.dark ? C.purple : C.cream)

    const applyStyles = () => {
      const { hover, click } = st.current
      dot.style.background = click ? invColor() : baseColor()
      dot.style.width  = hover ? '5px' : '8px'
      dot.style.height = hover ? '5px' : '8px'
      const ringSize = click ? 28 : hover ? 54 : 38
      ring.style.width = ringSize + 'px'
      ring.style.height = ringSize + 'px'
      ring.style.borderColor = click ? invColor() : baseColor()
    }

    // Walk up the DOM from the point under the cursor, find the first solid
    // background colour, and decide light vs dark by luminance.
    const isDarkAt = (x: number, y: number) => {
      let el = document.elementFromPoint(x, y) as Element | null
      let depth = 0
      while (el && depth < 12) {
        const bg = getComputedStyle(el).backgroundColor
        const m = bg.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/)
        if (m) {
          const r = +m[1], g = +m[2], b = +m[3]
          const a = m[4] === undefined ? 1 : +m[4]
          if (a > 0.5) {
            const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
            return lum < 0.5
          }
        }
        el = el.parentElement
        depth++
      }
      return false
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    let frame = 0
    const tick = () => {
      // Dot tracks instantly via GPU-composited transform (no layout thrash).
      dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
      // Ring trails with a quick lerp.
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.2)
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.2)
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
      // Background theme check, throttled (~10x/sec — backgrounds change slowly).
      if (frame % 6 === 0) {
        const dark = isDarkAt(pos.current.x, pos.current.y)
        if (dark !== st.current.dark) { st.current.dark = dark; applyStyles() }
      }
      frame++
      raf.current = requestAnimationFrame(tick)
    }

    const isBtn = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest('a,button,[role="button"],input,select,label')

    const onMove  = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY } }
    const onOver  = (e: MouseEvent) => { if (isBtn(e.target))  { st.current.hover = true;  applyStyles() } }
    const onOut   = (e: MouseEvent) => { if (isBtn(e.target) && !isBtn(e.relatedTarget)) { st.current.hover = false; applyStyles() } }
    const onDown  = () => { st.current.click = true;  applyStyles() }
    const onUp    = () => { st.current.click = false; applyStyles() }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout',  onOut,  { passive: true })
    document.addEventListener('mousedown', onDown, { passive: true })
    document.addEventListener('mouseup',   onUp,   { passive: true })
    applyStyles()
    raf.current = requestAnimationFrame(tick)

    return () => {
      style.remove()
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup',   onUp)
      cancelAnimationFrame(raf.current!)
    }
  }, [w])

  if (w < 768) return null

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, width: 8, height: 8,
        borderRadius: '50%', background: C.purple,
        pointerEvents: 'none', zIndex: 9999,
        transform: 'translate3d(-100px, -100px, 0)',
        transition: 'width .15s, height .15s, background .15s',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, width: 38, height: 38,
        borderRadius: '50%', border: `1.5px solid ${C.purple}`,
        pointerEvents: 'none', zIndex: 9998,
        transform: 'translate3d(-100px, -100px, 0)',
        transition: 'width .25s, height .25s, border-color .25s',
      }} />
    </>
  )
}



// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export default function OctaLoomHomepageV2() {

  const [lang, setLang] = useLangState()

  const ff = lang === "he" ? F.display : F.body



  return (

    <LangCtx.Provider value={{ lang, setLang }}>

      <div style={{ fontFamily: ff, background: C.cream,

        direction: lang === "he" ? "rtl" : "ltr", width: "100vw", overflowX: "hidden" }}>

        <CustomCursor />

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

          <HPLinkedInFeed />

          <HPBlog />

          <HPNewsletter />

        </main>

        <HPFooter />

      </div>

    </LangCtx.Provider>

  )

}
