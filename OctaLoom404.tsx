// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"

// ── Tokens ────────────────────────────────────────────────────────────────────
const C = {
  purple:     "#712eac",
  deepPurple: "#201e4b",
  navy:       "#060d3d",
  lime:       "#c5e6a2",
  cream:      "#ece9e7",
  white:      "#f5f3f1",
  textDim:    "#5c5878",
  muted:      "#5c5878",
}
const F = {
  display: "'DiscoveryFs', 'Discovery', 'Aeonik', sans-serif",
  body:    "'Aeonik', sans-serif",
}
const GIF_URL = "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/gif%20hanita.gif"

// ── Lang context ──────────────────────────────────────────────────────────────
const LangCtx = createContext<{ lang: string; setLang: (l: string) => void }>({ lang: "he", setLang: () => {} })
const useLang = () => useContext(LangCtx)
const hpT = (obj: any) => { const { lang } = useLang(); return obj?.[lang] ?? obj?.en ?? "" }

// ── Hooks ─────────────────────────────────────────────────────────────────────
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

// ── Btn ───────────────────────────────────────────────────────────────────────
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
    purple: { background: C.purple, color: C.cream },
    ghost:  { background: "transparent", color: C.purple, border: `1px solid rgba(113,46,172,0.2)` },
  }
  const props = { style: { ...base, ...(variants[variant] || variants.purple) }, onClick }
  if (href) return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" {...props}>{children}</a>
  return <button {...props}>{children}</button>
}

// ── Copy (404 page) ───────────────────────────────────────────────────────────
const COPY = {
  en: {
    taglines: [
      "This weave leads nowhere.",
      "The weave came undone.",
      "Lost between the weaves.",
      "This page unweaved itself.",
      "Weave gone wrong.",
    ],
    subtitles: [
      "Looks like this page got tangled up somewhere.\nDon't worry, even the best looms skip a stitch.",
      "We searched every thread and came up empty.\nLet's get you back on the right pattern.",
      "This page decided to go freelance.\nUnfortunately, it didn't leave a forwarding address.",
      "Our threads are usually very well-organized.\nThis one clearly had other plans.",
      "404: Page not found. Dignity: also missing.\nLet's pretend this never happened.",
    ],
    cta: "Back to safety",
    easterEgg: [
      "You clicked {n} times. The page is still missing.",
      "That's {n} clicks. Impressive commitment.",
      "{n} clicks. This page isn't coming back, you know.",
      "{n}. Okay, you win. But the page still doesn't exist.",
      "{n} clicks?! You should be running a company. Oh wait.",
    ],
  },
  he: {
    taglines: [
      "\u05D4\u05E2\u05DE\u05D5\u05D3 \u05D4\u05D6\u05D4 \u05D4\u05EA\u05E4\u05E8\u05E7",
      "\u05D4\u05D0\u05E8\u05D9\u05D2\u05D4 \u05E0\u05E4\u05E8\u05DE\u05D4.",
      "\u05D4\u05D5\u05DC\u05DB\u05D9\u05DD \u05DC\u05D0\u05D9\u05D1\u05D5\u05D3 \u05D1\u05D3\u05D5\u05D2\u05DE\u05D4.",
      "\u05D4\u05D7\u05D5\u05D8 \u05D4\u05D6\u05D4 \u05DC\u05D0 \u05DE\u05D5\u05D1\u05D9\u05DC \u05DC\u05E9\u05D5\u05DD \u05DE\u05E7\u05D5\u05DD.",
      "\u05D7\u05D5\u05D8 \u05DC\u05D0 \u05E0\u05DB\u05D5\u05DF, \u05D7\u05D1\u05E8/\u05D4.",
    ],
    subtitles: [
      "\u05E0\u05E8\u05D0\u05D4 \u05E9\u05E0\u05E4\u05E8\u05DD \u05DC\u05E0\u05D5 \u05E7\u05E9\u05E8 \u05D1\u05D3\u05E8\u05DA.\n\u05D1\u05D5\u05D0\u05D5 \u05E0\u05D7\u05D6\u05D5\u05E8 \u05DC\u05E0\u05E7\u05D5\u05D3\u05D4 \u05E9\u05D1\u05D4 \u05D4\u05DB\u05DC \u05DE\u05EA\u05D7\u05D1\u05E8 \u05D5\u05E0\u05EA\u05D7\u05D9\u05DC \u05DC\u05D0\u05E8\u05D5\u05D2 \u05DE\u05D7\u05D3\u05E9.",
      "\u05D7\u05D9\u05E4\u05E9\u05E0\u05D5 \u05D1\u05DB\u05DC \u05D7\u05D5\u05D8 \u05D5\u05D9\u05E6\u05D0\u05E0\u05D5 \u05D1\u05D9\u05D3\u05D9\u05D9\u05DD \u05E8\u05D9\u05E7\u05D5\u05EA.\n\u05D1\u05D5\u05D0\u05D5 \u05E0\u05D7\u05D6\u05D9\u05E8 \u05D0\u05EA\u05DB\u05DD \u05DC\u05D3\u05D5\u05D2\u05DE\u05D4 \u05D4\u05E0\u05DB\u05D5\u05E0\u05D4.",
      "\u05D4\u05E2\u05DE\u05D5\u05D3 \u05D4\u05D7\u05DC\u05D9\u05D8 \u05DC\u05E6\u05D0\u05EA \u05DC\u05E4\u05E8\u05D9\u05DC\u05E0\u05E1.\n\u05DC\u05E6\u05E2\u05E8\u05E0\u05D5, \u05D4\u05D5\u05D0 \u05DC\u05D0 \u05D4\u05E9\u05D0\u05D9\u05E8 \u05DB\u05EA\u05D5\u05D1\u05EA.",
      "\u05D4\u05D7\u05D5\u05D8\u05D9\u05DD \u05E9\u05DC\u05E0\u05D5 \u05D1\u05D3\u05E8\u05DA \u05DB\u05DC\u05DC \u05DE\u05E1\u05D5\u05D3\u05E8\u05D9\u05DD.\n\u05DC\u05D6\u05D4 \u05DB\u05E0\u05E8\u05D0\u05D4 \u05D4\u05D9\u05D5 \u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05EA.",
      "404: \u05E2\u05DE\u05D5\u05D3 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0. \u05DB\u05D1\u05D5\u05D3: \u05D2\u05DD \u05E0\u05E2\u05DC\u05DD.\n\u05D1\u05D5\u05D0\u05D5 \u05E0\u05E2\u05E9\u05D4 \u05DB\u05D0\u05D9\u05DC\u05D5 \u05D6\u05D4 \u05DC\u05D0 \u05E7\u05E8\u05D4.",
    ],
    cta: "\u05D7\u05D6\u05E8\u05D4 \u05DC\u05DE\u05E7\u05D5\u05DD \u05D1\u05D8\u05D5\u05D7",
    easterEgg: [
      "\u05DC\u05D7\u05E6\u05EA {n} \u05E4\u05E2\u05DE\u05D9\u05DD. \u05D4\u05E2\u05DE\u05D5\u05D3 \u05E2\u05D3\u05D9\u05D9\u05DF \u05D7\u05E1\u05E8.",
      "\u05D6\u05D4 {n} \u05DC\u05D7\u05D9\u05E6\u05D5\u05EA. \u05DE\u05D7\u05D5\u05D9\u05D1\u05D5\u05EA \u05DE\u05E8\u05E9\u05D9\u05DE\u05D4.",
      "{n} \u05DC\u05D7\u05D9\u05E6\u05D5\u05EA. \u05D4\u05E2\u05DE\u05D5\u05D3 \u05DC\u05D0 \u05D7\u05D5\u05D6\u05E8, \u05D0\u05EA\u05D4 \u05D9\u05D5\u05D3\u05E2.",
      "{n}. \u05D0\u05D5\u05E7\u05D9\u05D9, \u05E0\u05D9\u05E6\u05D7\u05EA. \u05D0\u05D1\u05DC \u05D4\u05E2\u05DE\u05D5\u05D3 \u05E2\u05D3\u05D9\u05D9\u05DF \u05DC\u05D0 \u05E7\u05D9\u05D9\u05DD.",
      "{n} \u05DC\u05D7\u05D9\u05E6\u05D5\u05EA?! \u05D0\u05EA\u05D4 \u05E6\u05E8\u05D9\u05DA \u05DC\u05E0\u05D4\u05DC \u05D7\u05D1\u05E8\u05D4. \u05E8\u05D2\u05E2...",
    ],
  },
}

// ── Nav data ──────────────────────────────────────────────────────────────────
const NAV_CTA = { en: "Let's Talk", he: "\u05D1\u05D5\u05D0\u05D5 \u05E0\u05D3\u05D1\u05E8" }
const FOOTER_PRIVACY = { en: "Privacy", he: "\u05E4\u05E8\u05D8\u05D9\u05D5\u05EA" }
const FOOTER_TERMS   = { en: "Terms",   he: "\u05EA\u05E0\u05D0\u05D9\u05DD" }

// ── HPNav (exact copy from OctaLoomHomepageV2) ────────────────────────────────
function HPNav() {
  const { lang, setLang } = useLang()
  const ff = lang === "he" ? F.display : F.body
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
        setServicesOpen(false); setLinkedinOpen(false)
      }
    }
    document.addEventListener("mousedown", fn)
    return () => document.removeEventListener("mousedown", fn)
  }, [])

  const linkedinSub = [
    { en: "LinkedIn for Organizations",             he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05D0\u05E8\u05D2\u05D5\u05E0\u05D9\u05DD",               href: "/services/linkedin-for-organizations" },
    { en: "LinkedIn for Executives",                he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05DE\u05E0\u05D4\u05DC\u05D9\u05DD",                href: "/services/linkedin-for-executives" },
    { en: "LinkedIn for Solopreneurs & Biz Owners", he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05E2\u05E6\u05DE\u05D0\u05D9\u05DD \u05D5\u05D1\u05E2\u05DC\u05D9 \u05E2\u05E1\u05E7\u05D9\u05DD",   href: "/services/linkedin-for-solopreneurs" },
  ]
  const services = [
    { en: "LinkedIn Growth Engine", he: "\u05DE\u05E0\u05D5\u05E2 \u05E6\u05DE\u05D9\u05D7\u05D4 \u05D1\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF", href: "/services/linkedin-growth-engine", sub: linkedinSub },
    { en: "Fractional CMO",         he: "Fractional CMO",         href: "/services/fractional-cmo",         sub: null },
    { en: "AI Tools & Agents",      he: "\u05DB\u05DC\u05D9 AI \u05D5\u05E1\u05D5\u05DB\u05E0\u05D9\u05DD",        href: "/services/ai-tools-agents",        sub: null },
  ]

  const navBg: React.CSSProperties = scrolled
    ? { background: "rgba(236,233,231,0.82)", backdropFilter: "blur(24px) saturate(1.6)", WebkitBackdropFilter: "blur(24px) saturate(1.6)", borderBottom: "1px solid rgba(113,46,172,0.1)", boxShadow: "0 1px 24px rgba(32,30,75,0.07)" }
    : { background: "rgba(255,255,255,0.02)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }

  const dropBase: React.CSSProperties = {
    position: "absolute", minWidth: 240, background: "white", borderRadius: 12,
    boxShadow: "0 8px 40px rgba(113,46,172,0.15),0 2px 8px rgba(0,0,0,0.06)",
    border: "1px solid rgba(113,46,172,0.08)", zIndex: 200, padding: "8px 0",
  }
  const dropItem: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "10px 18px", fontSize: 14, color: C.deepPurple,
    textDecoration: "none", cursor: "pointer", transition: "background 0.2s",
    fontFamily: ff, gap: 8, whiteSpace: "nowrap", background: "transparent",
  }

  return (
    <nav dir={dir} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "10px 0" : "16px 0", transition: "all 0.4s", ...navBg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)",
        display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 16 }}>

        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/logo%20nav%20bar.png"
            alt="OctaLoom" style={{ height: 36, width: "auto", display: "block" }} />
        </a>

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28 }}>
            <div ref={servicesRef} style={{ position: "relative" }}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => { setServicesOpen(false); setLinkedinOpen(false) }}>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14,
                color: servicesOpen ? C.deepPurple : C.textDim, fontFamily: ff,
                display: "flex", alignItems: "center", gap: 5, padding: "6px 0", transition: "color 0.25s" }}>
                {lang === "he" ? "\u05E9\u05D9\u05E8\u05D5\u05EA\u05D9\u05DD" : "Services"}
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
                              style={{ ...dropBase, top: 0, ...(dir === "rtl" ? { right: "calc(100% + 6px)" } : { left: "calc(100% + 6px)" }) }}>
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

            {([
              { en: "About",   he: "\u05E2\u05DC\u05D9\u05D9",     href: "/about" },
              { en: "Blog",    he: "\u05D1\u05DC\u05D5\u05D2",     href: "/blog" },
              { en: "Contact", he: "\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8", href: "/contact" },
            ] as {en:string;he:string;href:string}[]).map((item, i) => (
              <a key={i} href={item.href}
                style={{ fontSize: 14, color: C.textDim, textDecoration: "none", fontFamily: ff, transition: "color 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.deepPurple)}
                onMouseLeave={e => (e.currentTarget.style.color = C.textDim)}>
                {lang === "he" ? item.he : item.en}
              </a>
            ))}

            <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 14, color: C.textDim, textDecoration: "none", fontFamily: ff, transition: "color 0.25s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.deepPurple)}
              onMouseLeave={e => (e.currentTarget.style.color = C.textDim)}>
              Goodies
            </a>

            <div style={{ display: "flex", gap: 2, background: "rgba(113,46,172,0.06)", borderRadius: 6, padding: 2 }}>
              {["en","he"].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? C.purple : "none",
                  color: lang === l ? "white" : C.textDim, border: "none", cursor: "pointer",
                  fontSize: 12, fontWeight: 700, padding: "5px 10px", borderRadius: 4, transition: "all 0.25s", fontFamily: ff }}>
                  {l === "en" ? "EN" : "\u05E2\u05D1"}
                </button>
              ))}
            </div>
          </div>
        )}

        {!isMobile && (
          <Btn href="https://calendar.notion.so/meet/octaloom/discovery" variant="purple"
            style={{ padding: "8px 20px", fontSize: 13 }}>
            {hpT(NAV_CTA)}
          </Btn>
        )}

        {isMobile && (
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none",
            cursor: "pointer", width: 28, height: 20, position: "relative", gridColumn: "3" }}>
            {[0,9,18].map((top,i) => (
              <span key={i} style={{ position: "absolute", left: 0, width: "100%", height: 2,
                background: C.deepPurple, borderRadius: 2, top,
                transform: mobileOpen && i===0 ? "rotate(45deg) translateY(9px)" : mobileOpen && i===1 ? "scaleX(0)" : mobileOpen && i===2 ? "rotate(-45deg) translateY(-9px)" : "none",
                opacity: mobileOpen && i===1 ? 0 : 1, transition: "all 0.3s" }} />
            ))}
          </button>
        )}
      </div>

      {isMobile && mobileOpen && (
        <div style={{ position: "fixed", inset: 0, background: C.cream, zIndex: 99,
          display: "flex", flexDirection: "column", padding: "100px 32px 40px", overflowY: "auto", gap: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color: C.purple, fontFamily: ff, marginBottom: 10 }}>
            {lang === "he" ? "\u05E9\u05D9\u05E8\u05D5\u05EA\u05D9\u05DD" : "Services"}
          </div>
          {services.map((svc, i) => (
            <div key={i} style={{ borderBottom: `1px solid rgba(113,46,172,0.07)` }}>
              <a href={svc.href} onClick={() => setMobileOpen(false)}
                style={{ display: "block", fontSize: 18, color: C.deepPurple, textDecoration: "none",
                  fontFamily: ff, padding: "12px 0", fontWeight: svc.sub ? 600 : 400 }}>
                {lang === "he" ? svc.he : svc.en}
              </a>
              {svc.sub && svc.sub.map((sub, j) => (
                <a key={j} href={sub.href} onClick={() => setMobileOpen(false)}
                  style={{ display: "block", fontSize: 15, color: C.purple, textDecoration: "none",
                    fontFamily: ff, padding: "8px 0",
                    paddingLeft: dir === "ltr" ? 16 : 0, paddingRight: dir === "rtl" ? 16 : 0 }}>
                  {lang === "he" ? sub.he : sub.en}
                </a>
              ))}
            </div>
          ))}
          {([
            { en: "About",   he: "\u05E2\u05DC\u05D9\u05D9",     href: "/about" },
            { en: "Blog",    he: "\u05D1\u05DC\u05D5\u05D2",     href: "/blog" },
            { en: "Contact", he: "\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8", href: "/contact" },
          ] as {en:string;he:string;href:string}[]).map((item, i) => (
            <a key={i} href={item.href} onClick={() => setMobileOpen(false)}
              style={{ display: "block", fontSize: 18, color: C.deepPurple, textDecoration: "none",
                fontFamily: ff, padding: "14px 0", borderBottom: `1px solid rgba(113,46,172,0.07)` }}>
              {lang === "he" ? item.he : item.en}
            </a>
          ))}
          <a href="https://octagoodies.com" target="_blank" onClick={() => setMobileOpen(false)}
            style={{ fontSize: 18, color: C.deepPurple, textDecoration: "none",
              fontFamily: ff, padding: "14px 0", borderBottom: `1px solid rgba(113,46,172,0.07)` }}>
            Goodies
          </a>
          <div style={{ display: "flex", gap: 8, marginTop: 28 }}>
            {["en","he"].map(l => (
              <button key={l} onClick={() => { setLang(l); setMobileOpen(false) }}
                style={{ background: lang === l ? C.purple : "transparent", color: lang === l ? "white" : C.textDim,
                  border: `1px solid ${lang === l ? C.purple : C.textDim}`, borderRadius: 6,
                  padding: "8px 16px", cursor: "pointer", fontFamily: ff, fontWeight: 700 }}>
                {l === "en" ? "EN" : "\u05E2\u05D1\u05E8\u05D9\u05EA"}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Btn href="https://calendar.notion.so/meet/octaloom/discovery" variant="purple">
              {hpT(NAV_CTA)}
            </Btn>
          </div>
        </div>
      )}
    </nav>
  )
}

// ── HPFooter (exact copy from OctaLoomHomepageV2) ─────────────────────────────
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
    { en: "Home",    he: "\u05D3\u05E3 \u05D4\u05D1\u05D9\u05EA",  href: "/" },
    { en: "About",   he: "\u05E2\u05DC\u05D9\u05D9",      href: "/about" },
    { en: "Blog",    he: "\u05D1\u05DC\u05D5\u05D2",     href: "/blog" },
    { en: "Contact", he: "\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8", href: "/contact" },
  ]

  const socialIcons = [
    { href: "https://www.linkedin.com/in/hanita-yudovski/", label: "LinkedIn",
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { href: "https://www.instagram.com/octaloom/", label: "Instagram",
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
    { href: "https://www.facebook.com/octaloom", label: "Facebook",
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { href: "https://www.youtube.com/@octaloom", label: "YouTube",
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
  ]

  return (
    <footer dir={dir} style={{ padding: "64px 0 0", background: C.deepPurple, color: "rgba(255,255,255,0.7)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
        <div style={{ display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1.6fr 1fr 1fr",
          gap: isMobile ? 36 : 40, paddingBottom: 48 }}>

          <div>
            <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png"
              alt="OctaLoom" style={{ height: 93, width: "auto", display: "block" }} />
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 14,
              maxWidth: 240, fontFamily: ff, lineHeight: 1.65 }}>
              {lang === "he" ? "\u05DE\u05D7\u05DC\u05E7\u05EA \u05D4\u05E9\u05D9\u05D5\u05D5\u05E7 \u05E9\u05DC\u05DA, \u05E8\u05E7 \u05D1\u05DC\u05D9 \u05D4\u05DE\u05D7\u05DC\u05E7\u05D4" : "Your marketing department, minus the department."}
            </p>
          </div>

          <div>
            <h4 style={headStyle}>{lang === "he" ? "\u05D3\u05E4\u05D9\u05DD" : "Pages"}</h4>
            {pages.map((p, i) => (
              <a key={i} href={p.href} style={linkStyle}
                onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>
                {lang === "he" ? p.he : p.en}
              </a>
            ))}
          </div>

          <div>
            <h4 style={headStyle}>{lang === "he" ? "\u05E9\u05D9\u05E8\u05D5\u05EA\u05D9 \u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF" : "LinkedIn Services"}</h4>
            {([
              { en: "LinkedIn for Organizations", he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05D0\u05E8\u05D2\u05D5\u05E0\u05D9\u05DD", href: "/services/linkedin-for-organizations" },
              { en: "LinkedIn for Founders",      he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05DE\u05D9\u05D9\u05E1\u05D3\u05D9\u05DD", href: "/services/linkedin-for-executives" },
              { en: "LinkedIn for Solopreneurs",  he: "\u05DC\u05D9\u05E0\u05E7\u05D3\u05D0\u05D9\u05DF \u05DC\u05E2\u05E6\u05DE\u05D0\u05D9\u05DD",  href: "/services/linkedin-for-solopreneurs" },
            ] as {en:string;he:string;href:string}[]).map((s, i) => (
              <a key={i} href={s.href} style={linkStyle}
                onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>
                {lang === "he" ? s.he : s.en}
              </a>
            ))}
            <h4 style={{ ...headStyle, marginTop: 20 }}>{lang === "he" ? "\u05E9\u05D9\u05E8\u05D5\u05EA\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD" : "More Services"}</h4>
            {([
              { en: "Fractional CMO",    he: "Fractional CMO",     href: "/services/fractional-cmo" },
              { en: "AI Tools & Agents", he: "\u05DB\u05DC\u05D9 AI \u05D5\u05E1\u05D5\u05DB\u05E0\u05D9\u05DD", href: "/services/ai-tools-agents" },
            ] as {en:string;he:string;href:string}[]).map((s, i) => (
              <a key={i} href={s.href} style={linkStyle}
                onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>
                {lang === "he" ? s.he : s.en}
              </a>
            ))}
          </div>

          <div>
            <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <h4 style={{ ...headStyle, display: "flex", alignItems: "center", gap: 5, transition: "color 0.2s" }}
                onMouseEnter={(e: any) => e.currentTarget.style.color = C.lime}
                onMouseLeave={(e: any) => e.currentTarget.style.color = "white"}>
                OctaGoodies
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2h8v8M2 10l8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </h4>
            </a>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 6, fontFamily: ff, lineHeight: 1.6 }}>
              {lang === "he" ? "\u05DB\u05DC\u05D9\u05DD \u05D5\u05D8\u05DE\u05E4\u05DC\u05D9\u05D9\u05D8\u05D9\u05DD \u05DC\u05E9\u05D9\u05D5\u05D5\u05E7" : "Marketing tools & templates"}
            </p>
          </div>

          <div>
            <h4 style={headStyle}>{lang === "he" ? "\u05E2\u05E7\u05D1\u05D5 \u05D0\u05D7\u05E8\u05D9\u05E0\u05D5" : "Follow Us"}</h4>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {socialIcons.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
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

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 24, paddingBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: ff,
          flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 0 } as any}>
          <span>© 2026 OctaLoom. {lang === "he" ? "\u05DB\u05DC \u05D4\u05D6\u05DB\u05D5\u05D9\u05D5\u05EA \u05E9\u05DE\u05D5\u05E8\u05D5\u05EA" : "All Rights Reserved"}</span>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: FOOTER_PRIVACY, href: "/privacy-policy" },
              { label: FOOTER_TERMS,   href: "/terms" },
              { label: { en: "Accessibility", he: "\u05E0\u05D2\u05D9\u05E9\u05D5\u05EA" }, href: "/accessibility" },
            ].map((l, i) => (
              <a key={i} href={l.href}
                style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s", fontFamily: ff }}
                onMouseEnter={e => (e.currentTarget.style.color = C.lime)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
                {hpT(l.label)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Spark type ────────────────────────────────────────────────────────────────
type Spark = { id: number; x: number; y: number; color: string; dx: number; dy: number; size: number }

// ── 404 Inner ─────────────────────────────────────────────────────────────────
function OctaLoom404Inner() {
  const { lang } = useLang()
  const isRTL = lang === "he"
  const [copyIndex] = useState(() => Math.floor(Math.random() * 5))
  const [isFalling, setIsFalling] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [sparks, setSparks] = useState<Spark[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gifRef = useRef<HTMLImageElement>(null)
  const logoControls = useAnimation()
  const d1Controls = useAnimation()
  const d2Controls = useAnimation()

  useEffect(() => {
    const t = setTimeout(async () => {
      setIsFalling(true)
      await logoControls.start({
        y: [0, -12, 380], rotate: [0, -7, 20], opacity: [1, 1, 0],
        transition: { duration: 1.1, times: [0, 0.18, 1], ease: "easeIn" },
      })
    }, 3000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => {
      if (gifRef.current) {
        const base = gifRef.current.src.split("?")[0]
        gifRef.current.src = base + "?t=" + Date.now()
      }
    }, 8000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let animId: number
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener("resize", resize)
    const generateCurve = () => {
      const sx = Math.random() * 1.4 - 0.2; const sy = Math.random()
      return Array.from({ length: 5 }, (_, j) => ({
        x: sx + (j / 4) * (0.5 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1),
        y: sy + (j / 4) * (0.6 + Math.random() * 0.4),
        vx: (Math.random() - 0.5) * 0.02, vy: (Math.random() - 0.5) * 0.01,
      }))
    }
    const threads = Array.from({ length: 8 }, (_, i) => ({
      points: generateCurve(), speed: 0.2 + Math.random() * 0.4, offset: Math.random() * Math.PI * 2,
      color: i % 3 === 0 ? "rgba(113,46,172,0.06)" : i % 3 === 1 ? "rgba(197,230,162,0.08)" : "rgba(32,30,75,0.04)",
      width: 1 + Math.random() * 2,
    }))
    const draw = (t: number) => {
      const w = canvas.width; const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      threads.forEach(thread => {
        ctx.beginPath(); ctx.strokeStyle = thread.color; ctx.lineWidth = thread.width; ctx.lineCap = "round"
        const pts = thread.points.map(p => ({
          x: (p.x + Math.sin(t * 0.001 * thread.speed + p.vx * 100 + thread.offset) * 0.03) * w,
          y: (p.y + Math.cos(t * 0.001 * thread.speed + p.vy * 100 + thread.offset) * 0.02) * h,
        }))
        ctx.moveTo(pts[0].x, pts[0].y)
        for (let i = 1; i < pts.length - 1; i++) {
          const cpx = (pts[i].x + pts[i + 1].x) / 2; const cpy = (pts[i].y + pts[i + 1].y) / 2
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, cpx, cpy)
        }
        ctx.stroke()
      })
      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])

  const handleDigitClick = (ctrl: any) => {
    ctrl.start({ rotate: [0, -12, 10, -6, 4, 0], transition: { duration: 0.5 } })
    setClickCount(n => n + 1)
  }

  const emitSparks = (cx: number, cy: number) => {
    const colors = [C.purple, C.lime, C.deepPurple, C.purple, C.lime]
    const ns: Spark[] = Array.from({ length: 10 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.5
      const dist = 40 + Math.random() * 60
      return { id: Date.now() + i, x: cx, y: cy, color: colors[i % colors.length],
        dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist, size: 4 + Math.random() * 5 }
    })
    setSparks(prev => [...prev, ...ns])
    setTimeout(() => { const ids = new Set(ns.map(s => s.id)); setSparks(prev => prev.filter(s => !ids.has(s.id))) }, 700)
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isFalling) return
    logoControls.start({ rotate: [0, 180, 360], scale: [1, 0.85, 1], transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } })
    emitSparks(e.clientX, e.clientY)
    setClickCount(n => n + 1)
  }

  const c = (COPY as any)[lang] || COPY.en
  const tagline = isRTL ? c.taglines[0] : c.taglines[copyIndex]
  const subtitle = isRTL ? c.subtitles[0] : c.subtitles[copyIndex]
  const easterMsg = clickCount >= 3
    ? c.easterEgg[Math.min(Math.floor((clickCount - 3) / 4), c.easterEgg.length - 1)].replace("{n}", String(clickCount))
    : ""

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 80px)", display: "flex",
      alignItems: "center", justifyContent: "center", overflow: "hidden",
      background: C.cream, paddingTop: 80 }}>

      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />

      {/* Glows */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: C.purple,
        filter: "blur(120px)", top: "-15%", right: "5%", opacity: 0.09, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: C.lime,
        filter: "blur(120px)", bottom: "-10%", left: "-5%", opacity: 0.12, pointerEvents: "none", zIndex: 0 }} />

      {/* Content */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center", padding: 20, maxWidth: 700,
          direction: isRTL ? "rtl" : "ltr" }}>

        {/* 404 */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, userSelect: "none" }}>
          <motion.span animate={d1Controls} onClick={() => handleDigitClick(d1Controls)}
            whileHover={{ color: C.purple }}
            style={{ fontFamily: F.display, fontWeight: 500, fontSize: "clamp(100px,18vw,180px)",
              lineHeight: 1, color: C.deepPurple, cursor: "grab" }}>4</motion.span>

          <motion.div animate={logoControls} onClick={handleLogoClick}
            style={{ width: "clamp(90px,16vw,160px)", height: "clamp(90px,16vw,160px)",
              cursor: isFalling ? "default" : "pointer", color: C.purple,
              filter: "drop-shadow(0 4px 20px rgba(113,46,172,0.2))", pointerEvents: isFalling ? "none" : "auto" }}>
            <svg viewBox="0 0 301.75 301.13" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              <g>
                <path d="M198.3,194.74l-1.05-.84c-.08-.07-.16-.13-.24-.22l-13.67-13.67,15.51-15.51,12.7,12.7,10.6-10.61-12.7-12.7,15.52-15.5,13.65,13.65c.09.09.17.17.24.27l.83,1.05-41.39,41.38ZM187.58,180.01l10.6,10.61,11.27-11.27-10.6-10.61-11.27,11.27ZM213.69,153.89l10.61,10.61,11.27-11.26-10.6-10.61-11.27,11.26Z" fill="currentColor"/>
                <path d="M87.17,83.81l-13.65-13.65c-.09-.09-.16-.16-.24-.26l-.84-1.05,41.4-41.39,1.05.84c.09.07.17.15.26.24l13.65,13.65-15.5,15.51-12.7-12.7-10.61,10.6,12.7,12.7-15.51,15.51ZM76.57,68.97l10.6,10.6,11.27-11.27-10.6-10.6-11.27,11.27ZM102.69,42.85l10.61,10.61,11.26-11.27-10.6-10.6-11.27,11.26Z" fill="currentColor"/>
                <path d="M156.06,222.21h0c-9.53,0-18.47-3.7-25.19-10.43l-75.48-75.5c-6.72-6.72-10.42-15.66-10.42-25.19,0-9.53,3.7-18.47,10.43-25.19l6.45-6.45,1.05,1.3,13.67,13.67-6.32,6.32c-2.76,2.76-4.28,6.43-4.28,10.35,0,3.91,1.52,7.59,4.28,10.34l32.44,32.45-12.7,12.7,10.61,10.61,12.7-12.7,32.44,32.45c2.75,2.76,6.43,4.28,10.34,4.28h0c3.91,0,7.59-1.52,10.35-4.28l6.32-6.32,13.65,13.65,1.3,1.05-1.16,1.2-5.27,5.27c-6.71,6.72-15.66,10.42-25.19,10.42Z" fill="currentColor"/>
                <path d="M250.29,142.76l-1.05-1.31-13.67-13.67,6.32-6.33c2.76-2.76,4.28-6.43,4.28-10.34,0-3.91-1.52-7.59-4.28-10.35l-32.44-32.45,12.7-12.7-10.6-10.6-12.7,12.7-32.44-32.44c-2.76-2.76-6.43-4.28-10.35-4.28h0c-3.91,0-7.58,1.52-10.34,4.28l-6.33,6.32-13.65-13.65-1.3-1.05,1.16-1.2,5.27-5.27c6.72-6.72,15.66-10.42,25.19-10.42h0c9.53,0,18.47,3.7,25.19,10.43l75.48,75.5c6.72,6.72,10.42,15.66,10.42,25.19,0,9.53-3.7,18.47-10.42,25.19l-6.46,6.46Z" fill="currentColor"/>
              </g>
            </svg>
          </motion.div>

          <motion.span animate={d2Controls} onClick={() => handleDigitClick(d2Controls)}
            whileHover={{ color: C.purple }}
            style={{ fontFamily: F.display, fontWeight: 500, fontSize: "clamp(100px,18vw,180px)",
              lineHeight: 1, color: C.deepPurple, cursor: "grab" }}>4</motion.span>
        </div>

        <h1 style={{ fontFamily: isRTL ? F.display : F.body, fontWeight: isRTL ? 500 : 700,
          fontSize: "clamp(24px,4vw,38px)", lineHeight: 1.25, marginBottom: 16,
          color: C.deepPurple, letterSpacing: "-0.01em" }}>
          {tagline}
        </h1>

        <p style={{ fontFamily: isRTL ? F.display : F.body, fontWeight: isRTL ? 300 : 400,
          fontSize: "clamp(15px,2.2vw,18px)", color: C.muted, lineHeight: 1.65,
          marginBottom: 36, maxWidth: 460, whiteSpace: "pre-line" }}>
          {subtitle}
        </p>

        {/* GIF */}
        <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
          <img ref={gifRef} src={GIF_URL} alt=""
            style={{ maxWidth: 158, width: "100%", borderRadius: 12 }} loading="lazy" />
        </div>

        {/* CTA */}
        <motion.a href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px",
            borderRadius: 10, background: C.purple, color: "#fff", fontSize: 16,
            fontWeight: isRTL ? 500 : 700, fontFamily: isRTL ? F.display : F.body,
            textDecoration: "none", cursor: "pointer" }}
          whileHover={{ y: -2, scale: 1.03, boxShadow: "0 8px 30px rgba(113,46,172,0.35)" }}
          whileTap={{ y: 0, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}>
          <span>{c.cta}</span>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: isRTL ? "scaleX(-1)" : "none" }}>
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </motion.a>
      </motion.div>

      {/* Easter egg */}
      <AnimatePresence>
        {easterMsg ? (
          <motion.div key="easter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
              fontSize: 13, color: C.muted, fontFamily: F.body, textAlign: "center",
              zIndex: 20, whiteSpace: "nowrap" }}>
            {easterMsg}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Sparks */}
      <AnimatePresence>
        {sparks.map(spark => (
          <motion.div key={spark.id}
            initial={{ x: spark.x, y: spark.y, scale: 1, opacity: 1 }}
            animate={{ x: spark.x + spark.dx, y: spark.y + spark.dy, scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "fixed", width: spark.size, height: spark.size, borderRadius: "50%",
              background: spark.color, pointerEvents: "none", zIndex: 30 }} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function OctaLoom404NotFound() {
  const [lang, setLang] = useLangState()
  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column",
        fontFamily: lang === "he" ? F.display : F.body, background: C.cream }}>
        <HPNav />
        <main style={{ flex: 1 }}>
          <OctaLoom404Inner />
        </main>
        <HPFooter />
      </div>
    </LangCtx.Provider>
  )
}
