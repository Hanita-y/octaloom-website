// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

import * as React from "react"
const { useState, useEffect, useRef, useCallback } = React
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const NOTION_CALENDAR = "https://calendar.notion.so/meet/octaloom/discovery"
const HEADSHOT   = "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/about%20me%20picture.jpeg"
const GIF_HANITA = "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/gif%20hanita.gif"
const LOGO_NAV   = "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/logo%20nav%20bar.png"
const LOGO_FOOT  = "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png"

const C = {
  purple:     "#712eac",
  deepPurple: "#201e4b",
  navy:       "#060d3d",
  lime:       "#c5e6a2",
  cream:      "#ece9e7",
  textDim:    "#5c5878",
  surface:    "#f5f2f0",
  white:      "#ffffff",
}
const FF = "'Discovery Fs', 'Aeonik', sans-serif"

function getLangToggleUrl(isHE: boolean): string {
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

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useWindowSize() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
  useEffect(() => {
    const fn = () => setW(window.innerWidth)
    window.addEventListener("resize", fn)
    return () => window.removeEventListener("resize", fn)
  }, [])
  return w
}

function useIntersect(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible] as const
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
function useGlobalStyles() {
  useEffect(() => {
    const id = "about-he-styles"
    if (document.getElementById(id)) return
    const s = document.createElement("style")
    s.id = id
    s.textContent = `
@font-face{font-family:'Discovery Fs';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/DiscoveryFs-Light.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Discovery Fs';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/DiscoveryFs-Medium.ttf') format('truetype');font-weight:600;font-style:normal;font-display:swap}
@font-face{font-family:'Discovery Fs';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/DiscoveryFs-Medium.ttf') format('truetype');font-weight:700;font-style:normal;font-display:swap}
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Regular.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Bold.ttf') format('truetype');font-weight:700;font-style:normal;font-display:swap}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-font-smoothing:antialiased;scroll-behavior:smooth}
body{font-family:'Discovery Fs','Aeonik',sans-serif;background:#ece9e7;color:#201e4b;overflow-x:hidden}
a{color:inherit;text-decoration:none}
button{font-family:inherit;cursor:pointer;border:none;background:none}
`
    document.head.appendChild(s)
  }, [])
}

// ─── LOOPING GIF ──────────────────────────────────────────────────────────────
function LoopingGif({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [key, setKey] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setKey(k => k + 1), 5200)
    return () => clearInterval(t)
  }, [])
  return <img key={key} src={src} alt={alt} style={style} />
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Container({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,48px)", ...style }}>
      {children}
    </div>
  )
}

type RevealFrom = "bottom" | "left" | "right" | "scale"
function Reveal({ children, delay = 0, style = {}, from = "bottom" }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; from?: RevealFrom }) {
  const [ref, visible] = useIntersect()
  const tr = `opacity 0.8s ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 0.8s ${delay}ms cubic-bezier(0.16,1,0.3,1)`
  const hidden =
    from === "scale"  ? "scale(0.93) translateY(16px)" :
    from === "left"   ? "translateX(-32px)" :
    from === "right"  ? "translateX(32px)" :
                        "translateY(36px)"
  const shown = from === "scale" ? "scale(1) translateY(0)" : "translate(0)"
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? shown : hidden,
      transition: tr,
      ...style,
    }}>
      {children}
    </div>
  )
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: 3, background: C.purple,
        transformOrigin: "0%", scaleX: scrollYProgress,
        zIndex: 10000, pointerEvents: "none",
      }}
    />
  )
}

function AnimatedStat({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [cur, setCur] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      let n = 0
      const step = target / 50
      const timer = setInterval(() => {
        n = Math.min(n + step, target)
        setCur(Math.round(n))
        if (n >= target) clearInterval(timer)
      }, 24)
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{prefix}{cur.toLocaleString()}{suffix}</span>
}

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const raf     = useRef<number>()
  const st      = useRef({ hover: false, click: false })
  const w = useWindowSize()

  useEffect(() => {
    if (w < 768) return
    const style = document.createElement("style")
    style.textContent = "@media (pointer: fine) { * { cursor: none !important; } }"
    document.head.appendChild(style)
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    const setDot  = () => { dot.style.width  = st.current.hover ? "5px" : "8px"; dot.style.height = st.current.hover ? "5px" : "8px"; dot.style.background = st.current.hover ? C.lime : C.purple }
    const setRing = () => { const { hover, click } = st.current; if (click) { ring.style.width = "28px"; ring.style.height = "28px"; ring.style.borderColor = C.lime } else if (hover) { ring.style.width = "54px"; ring.style.height = "54px"; ring.style.borderColor = C.purple } else { ring.style.width = "38px"; ring.style.height = "38px"; ring.style.borderColor = "rgba(113,46,172,.45)" } }
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const tick = () => { dot.style.left = pos.current.x + "px"; dot.style.top = pos.current.y + "px"; ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12); ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12); ring.style.left = ringPos.current.x + "px"; ring.style.top = ringPos.current.y + "px"; raf.current = requestAnimationFrame(tick) }
    const isBtn = (t: EventTarget | null) => t instanceof Element && !!t.closest("a,button,[role='button'],input,select,label")
    const onMove  = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY } }
    const onOver  = (e: MouseEvent) => { if (isBtn(e.target)) { st.current.hover = true;  setDot(); setRing() } }
    const onOut   = (e: MouseEvent) => { if (isBtn(e.target) && !isBtn(e.relatedTarget)) { st.current.hover = false; setDot(); setRing() } }
    const onDown  = () => { st.current.click = true;  setRing() }
    const onUp    = () => { st.current.click = false; setRing() }
    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout",  onOut)
    document.addEventListener("mousedown", onDown)
    document.addEventListener("mouseup",   onUp)
    raf.current = requestAnimationFrame(tick)
    return () => {
      style.remove()
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseout",  onOut)
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("mouseup",   onUp)
      cancelAnimationFrame(raf.current!)
    }
  }, [w])

  if (w < 768) return null
  return (
    <>
      <div ref={dotRef}  style={{ position: "fixed", top: 0, left: -100, width: 8, height: 8, borderRadius: "50%", background: C.purple, pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)", transition: "width .15s,height .15s,background .15s" }} />
      <div ref={ringRef} style={{ position: "fixed", top: 0, left: -100, width: 38, height: 38, borderRadius: "50%", border: "1.5px solid rgba(113,46,172,.45)", pointerEvents: "none", zIndex: 9998, transform: "translate(-50%,-50%)", transition: "width .25s,height .25s,border-color .25s" }} />
    </>
  )
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function NavHE() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [linkedinOpen, setLinkedinOpen] = useState(false)
  const w = useWindowSize()
  const isMobile = w < 768
  const dim = "rgba(32,30,75,0.55)"

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobile && menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen, isMobile])

  const liSub = [
    { label: "לינקדאין לארגונים",         href: "https://www.octaloom.com/linkedin-for-organizations-he" },
    { label: "לינקדאין למייסדים ומנכ״לים", href: "https://www.octaloom.com/linkedin-for-executives-he" },
    { label: "לינקדאין לעצמאיים",          href: "https://www.octaloom.com/linkedin-for-solopreneurs-he" },
  ]
  const otherSub = [
    { label: "סמנכ״לית שיווק במיקור חוץ", href: "https://www.octaloom.com/fractional-cmo-he" },
    { label: "כלי AI וסוכנים", href: "https://www.octaloom.com/ai-tools-agents-he" },
    { label: "סדנאות", href: "#" },
  ]
  const topLinks = [
    { label: "עליי",    href: "https://www.octaloom.com/about-he",              active: true },
    { label: "בלוג",    href: "https://www.octaloom.com/blog-he" },
    { label: "צור קשר", href: "https://www.octaloom.com/contact-he" },
    { label: "Goodies", href: "https://octagoodies.com" },
  ]

  const dropBase: React.CSSProperties = {
    position: "absolute", background: "#fff", borderRadius: 12, padding: "8px 6px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(32,30,75,0.08)",
    minWidth: 220, zIndex: 50,
  }
  const dropItem: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 6, padding: "8px 12px",
    fontSize: 13, color: C.deepPurple, borderRadius: 8, transition: "background 0.15s",
    fontFamily: FF, whiteSpace: "nowrap" as const,
  }
  const hDrop = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    e.currentTarget.style.background = enter ? "rgba(113,46,172,0.05)" : "transparent"
  }

  const burger = (
    <button onClick={() => setMenuOpen(!menuOpen)} aria-label="תפריט"
      style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ position: "relative", display: "block", width: 28, height: 20 }}>
        {[0, 9, 18].map((top, i) => (
          <span key={i} style={{
            position: "absolute", left: 0, width: "100%", height: 2,
            background: C.deepPurple, borderRadius: 2, top,
            transform: menuOpen && i === 0 ? "rotate(45deg) translateY(9px)"
              : menuOpen && i === 1 ? "scaleX(0)"
              : menuOpen && i === 2 ? "rotate(-45deg) translateY(-9px)" : "none",
            opacity: menuOpen && i === 1 ? 0 : 1, transition: "all 0.3s",
          }}/>
        ))}
      </span>
    </button>
  )

  const desktopDrop = (
    <div style={{ position: "relative" }}
      onMouseEnter={() => setServicesOpen(true)}
      onMouseLeave={() => { setServicesOpen(false); setLinkedinOpen(false) }}>
      <button style={{ fontSize: 14, color: servicesOpen ? C.deepPurple : dim, fontFamily: FF,
        display: "flex", alignItems: "center", gap: 5, padding: "6px 0", transition: "color 0.25s" }}>
        {"שירותים"}
        <svg width={11} height={11} viewBox="0 0 12 12" fill="none"
          style={{ transition: "transform 0.25s", transform: servicesOpen ? "rotate(180deg)" : "none" }}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <AnimatePresence>
        {servicesOpen && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            style={{ ...dropBase, top: "calc(100% + 10px)", right: 0 }}>
            <div style={{ position: "relative" }}
              onMouseEnter={() => setLinkedinOpen(true)}
              onMouseLeave={() => setLinkedinOpen(false)}>
              <a href="https://www.octaloom.com/linkedin-growth-engine-he" style={{ ...dropItem, justifyContent: "space-between" }}
                onMouseEnter={e => hDrop(e, true)} onMouseLeave={e => hDrop(e, false)}>
                <svg width={11} height={11} viewBox="0 0 12 12" fill="none" style={{ opacity: 0.45 }}>
                  <path d="M8 2l-4 4 4 4" stroke={C.deepPurple} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{"לינקדאין כמנוע צמיחה"}</span>
              </a>
              <AnimatePresence>
                {linkedinOpen && (
                  <motion.div initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    style={{ ...dropBase, top: 0, right: "calc(100% + 6px)" }}>
                    {liSub.map((s, i) => (
                      <a key={i} href={s.href} style={dropItem}
                        onMouseEnter={e => hDrop(e, true)} onMouseLeave={e => hDrop(e, false)}>
                        {s.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {otherSub.map((s, i) => (
              <a key={i} href={s.href} style={dropItem}
                onMouseEnter={e => hDrop(e, true)} onMouseLeave={e => hDrop(e, false)}>
                {s.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const mobileMenu = (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", right: 0, left: 0,
      background: "#fff", borderRadius: 16, padding: "20px 32px 32px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      zIndex: 50, maxHeight: "calc(100vh - 100px)", overflowY: "auto" as const,
    }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: C.purple, margin: "0 0 4px", fontFamily: FF }}>
        {"שירותים"}
      </p>
      <a href="https://www.octaloom.com/linkedin-growth-engine-he" onClick={() => setMenuOpen(false)}
        style={{ display: "block", fontSize: 20, color: C.deepPurple, padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: FF }}>
        {"לינקדאין כמנוע צמיחה"}
      </a>
      {liSub.map((s, i) => (
        <a key={i} href={s.href} onClick={() => setMenuOpen(false)}
          style={{ display: "block", fontSize: 15, color: C.purple, padding: "7px 0 7px 20px", borderBottom: "1px solid rgba(113,46,172,0.05)", fontFamily: FF }}>
          {s.label}
        </a>
      ))}
      {otherSub.map((s, i) => (
        <a key={i} href={s.href} onClick={() => setMenuOpen(false)}
          style={{ display: "block", fontSize: 20, color: C.deepPurple, padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: FF }}>
          {s.label}
        </a>
      ))}
      {topLinks.map((item, i) => (
        <a key={i} href={item.href} onClick={() => setMenuOpen(false)}
          style={{ display: "block", fontSize: 20, color: item.active ? C.purple : C.deepPurple, padding: "11px 0", fontWeight: item.active ? 700 : 500, borderBottom: i < topLinks.length - 1 ? "1px solid rgba(113,46,172,0.08)" : "none", fontFamily: FF }}>
          {item.label}
        </a>
      ))}
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        <a href={getLangToggleUrl(true)}
          style={{ display: "block", textAlign: "center", padding: "11px 24px", fontSize: 13, fontWeight: 600, color: "#201e4b", borderRadius: 100, fontFamily: "'Discovery Fs', 'Noto Sans Hebrew', sans-serif", border: "1px solid rgba(32,30,75,0.2)", textDecoration: "none", width: "100%", boxSizing: "border-box" as const }}>
          Switch to English →
        </a>
      </div>
    </div>
  )

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: isMobile ? "12px 20px" : "14px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(236,233,231,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      transition: "background 0.4s, box-shadow 0.4s",
      boxShadow: scrolled ? "0 1px 0 rgba(32,30,75,0.06)" : "none",
    }}>
      <a href="https://www.octaloom.com/" style={{ display: "flex", alignItems: "center" }}>
        <img src={LOGO_NAV} alt="OctaLoom" style={{ height: isMobile ? 28 : 36, width: "auto" }} />
      </a>
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 32, position: "relative" }}>
          {desktopDrop}
          {topLinks.map((item, i) => (
            <a key={i} href={item.href}
              style={{ fontSize: 14, color: item.active ? C.deepPurple : dim, fontWeight: item.active ? 700 : 400, fontFamily: FF, transition: "color 0.25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.deepPurple }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = item.active ? C.deepPurple : dim }}>
              {item.label}
            </a>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {!isMobile && (
          <>
            <a href={getLangToggleUrl(true)} style={langToggleStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#712eac"; (e.currentTarget as HTMLAnchorElement).style.color = "#712eac" }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(32,30,75,0.22)"; (e.currentTarget as HTMLAnchorElement).style.color = "#201e4b" }}>
              EN
            </a>
            <a href={NOTION_CALENDAR} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", padding: "9px 20px", borderRadius: 8, background: C.purple, color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: FF, transition: "box-shadow 0.25s, transform 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(113,46,172,0.35)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; (e.currentTarget as HTMLAnchorElement).style.transform = "none" }}>
              {"בואו נדבר"}
            </a>
          </>
        )}
        {isMobile && burger}
      </div>
      {isMobile && menuOpen && mobileMenu}
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection({ isMobile }: { isMobile: boolean }) {
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const dur  = 0.85
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 600], [0, isMobile ? 40 : 90])

  return (
    <section style={{ background: C.cream, paddingTop: isMobile ? 88 : 110, paddingBottom: isMobile ? 64 : 88, overflow: "hidden" }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease }}
          style={{ overflow: "hidden", borderRadius: isMobile ? 16 : 24, marginBottom: isMobile ? 40 : 56, position: "relative" }}>
          <motion.img
            src={HEADSHOT}
            alt="חניתה יודובסקי, Fractional CMO ומייסדת OctaLoom"
            style={{
              width: "100%",
              height: isMobile ? 260 : 520,
              objectFit: "cover" as const,
              objectPosition: "center 20%",
              display: "block",
              y: imgY,
              scale: 1.06,
            } as any}
          />
        </motion.div>

        <div style={{ maxWidth: 760 }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.25, ease }}>
            <span style={{
              display: "inline-flex", alignItems: "center",
              background: "rgba(113,46,172,0.08)", borderRadius: 100,
              padding: "6px 16px", fontSize: 11, fontWeight: 700,
              color: C.purple, fontFamily: FF, letterSpacing: "0.07em",
              textTransform: "uppercase" as const, marginBottom: 24,
            }}>
              {"מומחית לינקדאין | מייסדת OctaLoom"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.32, ease }}
            style={{
              fontFamily: FF, fontWeight: 700,
              fontSize: isMobile ? "clamp(40px,10vw,54px)" : "clamp(52px,5.5vw,76px)",
              lineHeight: 1.0, letterSpacing: "-0.02em",
              color: C.deepPurple, marginBottom: 10,
            }}>
            {"היי, אני חניתה."}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.4, ease }}
            style={{ fontSize: isMobile ? 14 : 16, fontFamily: FF, color: C.textDim, marginBottom: 28, fontStyle: "italic", lineHeight: 1.5 }}>
            {"(יודובסקי. אבל כמו מדונה, שם הפרטי מספיק. 😅)"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.48, ease }}>
            <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.8, color: C.deepPurple, marginBottom: 18, fontFamily: FF }}>
              {"מומחית לינקדאין, חובבת סוכני AI מושבעת (ויש שיגידו נופלת לכל הייפ AI) ומנהלת שיווק במיקור חוץ. בשורה התחתונה: אני מחלקת השיווק שלכם, רק בלי מחלקה."}
            </p>
            <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.8, color: C.textDim, marginBottom: 18, fontFamily: FF }}>
              {"כבר חמש שנים שאני עובדת עם מייסדים וחברות B2B שרוצים שיווק אסטרטגי שמניע לתוצאות. מה שלמדתי בדרך: למייסדים אין בעיית שיווק – יש להם בעיית נראות."}
            </p>
            <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.8, color: C.textDim, marginBottom: 10, fontFamily: FF }}>
              {"לינקדאין הוא המקום שבו B2B קורה. לפני כל מייל או שיחה, הלקוח כבר חיפש אתכם שם."}
            </p>
            <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.8, color: C.textDim, marginBottom: 18, fontFamily: FF }}>
              {"הבעיה היא שרוב המייסדים פשוט לא נוכחים בזירה."}
            </p>
            <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.6, color: C.deepPurple, fontWeight: 700, marginBottom: 36, fontFamily: FF }}>
              {"את זה אני מתקנת."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.58, ease }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
            <a href={NOTION_CALENDAR} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 8, background: C.purple, color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: FF, transition: "box-shadow 0.25s, transform 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px rgba(113,46,172,0.35)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; (e.currentTarget as HTMLAnchorElement).style.transform = "none" }}>
              {"בואו נדבר"}
            </a>
            <a href="https://www.linkedin.com/in/hanita-yudovski/" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 8, background: "transparent", color: C.purple, border: `1.5px solid ${C.purple}`, fontSize: 15, fontWeight: 700, fontFamily: FF, transition: "background 0.2s, color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = C.purple; (e.currentTarget as HTMLAnchorElement).style.color = "#fff" }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = C.purple }}>
              {"בואו נתחבר"}
              <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

// ─── TIMELINE ─────────────────────────────────────────────────────────────────
function TimelineSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{ background: C.surface, padding: isMobile ? "72px 0" : "104px 0" }}>
      <Container>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "280px 1fr",
          gap: isMobile ? 36 : 72,
          alignItems: "start",
        }}>
          <Reveal>
            <div>
              <h2 style={{
                fontFamily: FF, fontWeight: 700,
                fontSize: isMobile ? 28 : "clamp(28px,3.2vw,40px)",
                lineHeight: 1.15, letterSpacing: "-0.02em",
                color: C.deepPurple, marginBottom: 18,
              }}>
                {"איך הגעתי לכאן"}
              </h2>
              <div style={{ width: 44, height: 3, background: C.lime, borderRadius: 2 }} />
            </div>
          </Reveal>

          <div>
            <Reveal delay={80}>
              <div style={{
                paddingRight: 24,
                borderRight: `3px solid ${C.purple}`,
                marginBottom: 36,
              }}>
                <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.85, color: C.deepPurple, marginBottom: 16, fontFamily: FF }}>
                  {"בין 2024 ל-2025 ניהלתי את כל מערך השיווק ב-Adopt Me. שלושה צוותים, 18 בני אדם, הכל. ושם הבנתי משהו ששינה לי הכל: כל מה שצוות שלם בונה בחודשים, אשת שיווק אחת עם המערכות הנכונות יכולה לעשות לבד. בלי כל העברות מקל, בלי כל האינסוף פגישות, ובלי שהאסטרטגיה נמחקת בדרך לביצוע."}
                </p>
                <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.85, color: C.textDim, marginBottom: 16, fontFamily: FF }}>
                  {"ב-2022 נכנסתי עמוק ל-AI ואוטומציה, ראיתי איך העולם נודד לכיוונים יעילים ומהירים ואני רק בעד. היום הצוות שלי הוא אני, והסוכנים שבניתי. מחלקה שלמה רק בלי המחלקה."}
                </p>
                <p style={{ fontSize: isMobile ? 16 : 18, fontWeight: 700, color: C.purple, fontFamily: FF }}>
                  {"זה OctaLoom."}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function StatsSection({ isMobile }: { isMobile: boolean }) {
  const stats = [
    { target: 770,  suffix: "K+",  prefix: "",  label: "חשיפות אורגניות ל-3 חודשים" },
    { target: 300,  suffix: "%",   prefix: "",  label: "צמיחה במעורבות בדף לינקדאין" },
    { target: 70,   suffix: "%",   prefix: "",  label: "פחות עבודה ידנית דרך AI ואוטומציה" },
    { target: 5000, suffix: "+",   prefix: "~", label: "עוקבי B2B אורגניים, ללא תקציב פרסום" },
  ]
  return (
    <section style={{ background: C.deepPurple, padding: isMobile ? "72px 0" : "104px 0" }}>
      <Container>
        <Reveal>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.lime, marginBottom: 10, fontFamily: FF }}>
            {"בפועל"}
          </p>
          <h2 style={{
            fontFamily: FF, fontWeight: 700,
            fontSize: isMobile ? 28 : "clamp(28px,3.2vw,40px)",
            lineHeight: 1.15, letterSpacing: "-0.02em",
            color: "#fff", marginBottom: isMobile ? 40 : 56,
          }}>
            {"תוצאות שמצטברות."}
          </h2>
        </Reveal>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
          gap: isMobile ? 16 : 24,
        }}>
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 70} from="scale">
              <div style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: isMobile ? "24px 18px" : "32px 28px",
                border: "1px solid rgba(255,255,255,0.07)",
              }}>
                <div style={{
                  fontFamily: "'Aeonik', sans-serif", fontWeight: 700,
                  fontSize: isMobile ? "clamp(30px,7vw,42px)" : "clamp(36px,3.8vw,52px)",
                  lineHeight: 1, color: C.lime, marginBottom: 12,
                  letterSpacing: "-0.02em",
                }}>
                  <AnimatedStat target={s.target} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "rgba(255,255,255,0.55)", fontFamily: FF }}>
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ─── WHAT I DO ────────────────────────────────────────────────────────────────
function WhatIDoSection({ isMobile }: { isMobile: boolean }) {
  const liClients = [
    {
      title: "לינקדאין לארגונים",
      desc: "אסטרטגיה, ניהול תוכן ונוכחות מלאה לדפים עסקיים, תוכניות שגרירי מותג שהופכות את עובדי הארגון למכפילי כח.",
      href: "https://www.octaloom.com/linkedin-for-organizations-he",
    },
    {
      title: "לינקדאין למייסדים ומנכ״לים",
      desc: "בניית מותג אישי בלינקדאין למי שרוצה שהלקוחות יזהו אותו ויסמכו עליו, הרבה לפני שהם פנו אליו.",
      href: "https://www.octaloom.com/linkedin-for-executives-he",
    },
    {
      title: "לינקדאין לעצמאיים",
      desc: "נוכחות בלינקדאין לפרילנסרים ויועצים שרוצים ליידים נכנסים בלי תקציב פרסום.",
      href: "https://www.octaloom.com/linkedin-for-solopreneurs-he",
    },
  ]
  const beyond = [
    {
      title: "סמנכ״לית שיווק במיקור חוץ",
      desc: "הנהגה שיווקית ברמת CMO לחברות שצריכות מי שינהל להן את מערך השיווק, בלי משרה מלאה.",
      href: "https://www.octaloom.com/fractional-cmo-he",
    },
    {
      title: "כלי AI וסוכנים",
      desc: "סוכני AI מותאמים ואוטומציות שמחליפות עבודה ידנית, ועושות את מה שפעם דרש צוות שלם.",
      href: "https://www.octaloom.com/ai-tools-agents-he",
    },
    {
      title: "סדנאות",
      desc: "סדנאות לינקדאין ושיווק AI לארגונים שרוצים לבנות יכולות פנימיות.",
      href: "#",
      badge: "בקרוב",
    },
  ]

  return (
    <section style={{ background: C.cream, padding: isMobile ? "72px 0" : "104px 0" }}>
      <Container>
        <Reveal>
          <h2 style={{
            fontFamily: FF, fontWeight: 700,
            fontSize: isMobile ? 28 : "clamp(28px,3.2vw,40px)",
            lineHeight: 1.15, letterSpacing: "-0.02em",
            color: C.deepPurple, marginBottom: 20,
          }}>
            {"אז מה אני עושה?"}
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.8, color: C.textDim, maxWidth: 640, marginBottom: 4, fontFamily: FF }}>
            {"לינקדאין היא הלב של הפעילות שלי. זו הפלטפורמה המרכזית שבה מתקבלות החלטות B2B,"}
          </p>
          <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.8, color: C.textDim, maxWidth: 640, marginBottom: isMobile ? 36 : 48, fontFamily: FF }}>
            {"והיא מהווה את הזירה העיקרית לבניית אמון וסמכות מקצועית."}
          </p>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
          gap: isMobile ? 14 : 20,
          marginBottom: 16,
          alignItems: "stretch",
        }}>
          {liClients.map((c, i) => (
            <Reveal key={i} delay={i * 70} style={{ height: "100%" }}>
              <a href={c.href} style={{
                display: "block", background: C.white, borderRadius: 16,
                padding: isMobile ? "24px 20px" : "28px 24px",
                border: "1px solid rgba(32,30,75,0.07)",
                borderRight: `4px solid ${C.purple}`,
                height: "100%",
                transition: "box-shadow 0.25s, transform 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(113,46,172,0.11)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)" }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; (e.currentTarget as HTMLAnchorElement).style.transform = "none" }}>
                <h3 style={{ fontFamily: FF, fontWeight: 700, fontSize: 17, color: C.deepPurple, marginBottom: 10 }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: C.textDim, marginBottom: 16, fontFamily: FF }}>
                  {c.desc}
                </p>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.purple, fontFamily: FF }}>
                  {"לדף השירות ←"}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div style={{ marginBottom: isMobile ? 48 : 64 }} />

        <Reveal>
          <div style={{ borderTop: "1px solid rgba(32,30,75,0.1)", paddingTop: isMobile ? 48 : 64 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.textDim, marginBottom: 24, fontFamily: FF }}>
              {"ומעבר ללינקדאין"}
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
              gap: isMobile ? 12 : 16,
              alignItems: "stretch",
            }}>
              {beyond.map((b, i) => (
                <Reveal key={i} delay={i * 60} style={{ height: "100%" }}>
                  <a href={b.href} style={{
                    display: "flex", alignItems: "flex-start", gap: 14,
                    padding: "20px",
                    background: "rgba(113,46,172,0.04)",
                    borderRadius: 12,
                    border: "1px solid rgba(113,46,172,0.08)",
                    transition: "background 0.2s",
                    height: "100%",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(113,46,172,0.08)" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(113,46,172,0.04)" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 15, color: C.deepPurple }}>{b.title}</span>
                        {b.badge && (
                          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", padding: "2px 8px", borderRadius: 100, background: C.lime, color: C.navy, fontFamily: FF }}>
                            {b.badge}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 13, lineHeight: 1.6, color: C.textDim, fontFamily: FF }}>{b.desc}</p>
                    </div>
                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 3, opacity: 0.35 }}>
                      <path d="M13 8H3M7 4l-4 4 4 4" stroke={C.deepPurple} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

// ─── PODCAST ──────────────────────────────────────────────────────────────────
function PodcastSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{ background: C.lime, padding: isMobile ? "72px 0" : "88px 0" }}>
      <Container>
        <div style={{
          display: isMobile ? "flex" : "grid",
          flexDirection: "column" as const,
          gridTemplateColumns: "1fr 1fr",
          gap: isMobile ? 32 : 64,
          alignItems: "center",
        }}>
          {/* Text column — right side in RTL */}
          <Reveal>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(6,13,61,0.5)", marginBottom: 16, fontFamily: FF }}>
                {"פודקאסט שיווק B2B"}
              </p>
              <h2 style={{
                fontFamily: FF, fontWeight: 700,
                fontSize: isMobile ? 22 : "clamp(22px,2.8vw,34px)",
                lineHeight: 1.2, letterSpacing: "-0.02em",
                color: C.navy, marginBottom: 16,
              }}>
                {"\"מה הסיפור עם?\" 🎙️"}
              </h2>
              <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.75, color: "rgba(6,13,61,0.7)", marginBottom: 28, fontFamily: FF }}>
                {"יחד עם נגה פינק אני מנחה פודקאסט שיווק B2B שבו אנחנו מפרקות את מה שבאמת עובד: לינקדאין, AI, קמפיינים, ומה זה אומר להוביל שיווק בשטח. בלי תיאוריות שנמכרות בכנסים. רק שיחות אמיתיות."}
              </p>
              <a href="https://whatsthestorywith.com/" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "12px 24px", borderRadius: 8,
                  background: C.deepPurple, color: "#fff",
                  fontSize: 14, fontWeight: 700, fontFamily: FF,
                  transition: "box-shadow 0.25s, transform 0.15s",
                  marginBottom: isMobile ? 24 : 0,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 24px rgba(32,30,75,0.35)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)" }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; (e.currentTarget as HTMLAnchorElement).style.transform = "none" }}>
                {"לשמיעה ולצפייה →"}
              </a>
            </div>
          </Reveal>
          {/* Embed column — left side in RTL */}
          <Reveal from="left">
            <div style={{ borderRadius: 12, overflow: "hidden" }}>
              <iframe
                src="https://open.spotify.com/embed/show/4XmsthqR7gnj4nf2gL0T7j?utm_source=generator&theme=0"
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ border: "none", display: "block", borderRadius: 12 }}
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

// ─── ON A PERSONAL LEVEL ──────────────────────────────────────────────────────
function PersonalSection({ isMobile }: { isMobile: boolean }) {
  const traits = [
    { icon: "🐕", label: "אמא של קארה",             sub: "כנענית חרדתית",        bg: C.purple,     color: "#fff",       border: "none" },
    { icon: "☕",       label: "סנובית קפה",             sub: "ללא פשרות",                             bg: C.lime,       color: C.deepPurple, border: "none" },
    { icon: "🌱", label: "טבעונית",                          sub: "13.5+ שנים",                            bg: C.white,      color: C.deepPurple, border: `1.5px solid ${C.purple}` },
    { icon: "⚡",       label: "מוח ADHD",                                             sub: "חושבת אחרת",                      bg: C.deepPurple, color: "#fff",       border: "none" },
    { icon: "💪", label: "מוסר עבודה סובייטי", sub: "היתרון הלא הוגן שלכם", bg: C.lime, color: C.deepPurple, border: "none" },
    { icon: "🏋️", label: "פילאטיס מכשירים", sub: "כמו כל תל אביבית טובה", bg: C.white, color: C.deepPurple, border: `1.5px solid ${C.purple}` },
  ]
  return (
    <section style={{ background: C.surface, padding: isMobile ? "72px 0" : "104px 0" }}>
      <Container>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 48 : 80,
          alignItems: "start",
        }}>
          <div>
            <Reveal>
              <h2 style={{
                fontFamily: FF, fontWeight: 700,
                fontSize: isMobile ? 28 : "clamp(28px,3.2vw,40px)",
                lineHeight: 1.15, letterSpacing: "-0.02em",
                color: C.deepPurple, marginBottom: 24,
              }}>
                {"עוד קצת עליי"}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.85, color: C.textDim, fontFamily: FF }}>
                {"בת אדם שמתרגשת באותה מידה מ-workflow מדויק ומממסעדת vegan fine dining חדשה בכל עיר שאני מגיעה אליה. אמא של קארה, כנענית חרדתית עם דעות חזקות לגבי שעות העבודה שלי. סנובית קפה, טבעונית כבר 13 וחצי שנים. בעלת מוח ADHD עם מוסר עבודה סובייטי, שזה בעצם היתרון הלא הוגן שלא ידעתם שאתם מקבלים."}
              </p>
            </Reveal>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: isMobile ? 10 : 12,
            alignContent: "flex-start",
          }}>
            {traits.map((t, i) => (
              <Reveal key={i} delay={i * 80} from="scale" style={{ height: "100%" }}>
                <div style={{
                  display: "flex", flexDirection: "column", gap: 4,
                  padding: isMobile ? "16px 18px" : "18px 22px", borderRadius: 20,
                  background: t.bg, border: t.border,
                  height: "100%",
                  boxShadow: "0 2px 12px rgba(32,30,75,0.07)",
                }}>
                  <span style={{ fontSize: 26, lineHeight: 1 }}>{t.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: t.color, fontFamily: FF, marginTop: 8, lineHeight: 1.2 }}>{t.label}</span>
                  <span style={{ fontSize: 11, color: t.color, opacity: 0.6, fontFamily: FF, marginTop: 2 }}>{t.sub}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection({ isMobile }: { isMobile: boolean }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const faqs = [
    {
      q: "מה זה Fractional CMO?",
      a: "אם הייתם שוכרים CMO במשרה מלאה, הייתם משלמים 40-60 אלף שקל בחודש על מישהו שלוקח חצי שנה להבין את העסק שלכם. Fractional CMO זה אותה הנהגה שיווקית, בלי המשכורת הזאת ובלי חודשי ההסתגלות. אני נכנסת, מבינה מהר, ומתחילה לעבוד.",
    },
    {
      q: "עם מי את עובדת?",
      a: "בעיקר עם מייסדים וחברות B2B שצריכים שיווק רציני, אבל לא בשלב שגיוס CMO במשרה מלאה הגיוני להם כלכלית. אם הנוכחות שלכם בלינקדאין דלה, התוכן לא עקבי, ואתם מפסידים נראות למתחרים שנמצאים שם כל שבוע, זה בדיוק המקרה שלכם.",
    },
    {
      q: "מה ההבדל בין OctaLoom לסוכנות שיווק?",
      a: "סוכנות מרוויחה כשיש יותר אנשים בתיק שלכם. אני מרוויחה כשצריך פחות. אתם מקבלים אסטרטגית אחת שמכירה את הסיפור שלכם, עושה את העבודה בעצמה, ולא מעבירה אתכם ממנהלת לקוח אחת לאחרת כל רבעון.",
    },
    {
      q: "מה זה Vibe Marketing?",
      a: "אנדריי קרפתי הגדיר Vibe Coding לפיתוח תוכנה: ה-AI עושה את הסקייל, האדם עושה את החשיבה. Vibe Marketing זאת אותה פילוסופיה, רק על שיווק. מה שפעם היה צריך חמישה אנשים לבנות, אני מספקת לבד, בלי לוותר על האיכות.",
    },
  ]

  return (
    <section style={{ background: C.deepPurple, padding: isMobile ? "72px 0" : "104px 0" }}>
      <Container>
        <Reveal>
          <h2 style={{
            fontFamily: FF, fontWeight: 700,
            fontSize: isMobile ? 28 : "clamp(28px,3.2vw,40px)",
            lineHeight: 1.15, letterSpacing: "-0.02em",
            color: "#fff", marginBottom: isMobile ? 36 : 52,
          }}>
            {"שאלות שכדאי לשאול"}
          </h2>
        </Reveal>
        <div style={{ maxWidth: 720 }}>
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 50}>
              <div style={{
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.12)" : "none",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
              }}>
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  aria-expanded={openIdx === i}
                  dir="rtl"
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "20px 0",
                  }}>
                  <span style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: "#fff", lineHeight: 1.4, paddingLeft: 20, fontFamily: FF, textAlign: "right" as const }}>
                    {faq.q}
                  </span>
                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" style={{
                    flexShrink: 0,
                    transform: openIdx === i ? "rotate(180deg)" : "none",
                    transition: "transform 0.3s",
                    color: C.lime,
                  }}>
                    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <AnimatePresence>
                  {openIdx === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}>
                      <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", paddingBottom: 20, fontFamily: FF }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{ background: C.cream, padding: isMobile ? "80px 0" : "120px 0" }}>
      <Container>
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            {isMobile ? (
              <img
                src={HEADSHOT}
                alt="חניתה יודובסקי"
                loading="lazy"
                style={{
                  width: 88, height: 88,
                  objectFit: "cover", objectPosition: "center 15%",
                  display: "block", borderRadius: 12,
                  marginBottom: 28,
                }}
              />
            ) : (
            <LoopingGif
              src={GIF_HANITA}
              alt="חניתה יודובסקי"
              style={{
                width: 110,
                height: 110,
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                borderRadius: 12,
                marginBottom: 36,
              }}
            />
            )}
            <h2 style={{
              fontFamily: FF, fontWeight: 700,
              fontSize: isMobile ? "clamp(32px,8vw,44px)" : "clamp(40px,4.5vw,60px)",
              lineHeight: 1.05, letterSpacing: "-0.02em",
              color: C.purple, marginBottom: 16,
            }}>
              {"מוכנים לדבר?"}
            </h2>
            <p style={{
              fontSize: isMobile ? 16 : 19,
              lineHeight: 1.6,
              color: C.deepPurple,
              marginBottom: isMobile ? 36 : 48,
              fontFamily: FF,
              maxWidth: 520,
            }}>
              {"אם אתם מייסדים או חברת B2B שצריכים שיווק לינקדאין רציני עם ביצוע אמיתי, בואו נדבר."}
            </p>
            <a href={NOTION_CALENDAR} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: isMobile ? "14px 36px" : "18px 48px",
                borderRadius: 100,
                background: C.purple, color: "#fff",
                fontSize: isMobile ? 15 : 17, fontWeight: 700, fontFamily: FF,
                letterSpacing: "-0.01em",
                transition: "box-shadow 0.25s, transform 0.15s",
                textDecoration: "none",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 10px 40px rgba(113,46,172,0.4)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; (e.currentTarget as HTMLAnchorElement).style.transform = "none" }}>
              {"בואו נדבר"}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function FooterHE({ isMobile }: { isMobile: boolean }) {
  const linkStyle: React.CSSProperties = { fontSize: 14, color: "rgba(255,255,255,0.5)", display: "block", lineHeight: "1.9", fontFamily: FF, transition: "color 0.2s" }
  const headStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#ece9e7", margin: "0 0 14px", fontFamily: FF }
  const hov = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => { e.currentTarget.style.color = enter ? C.lime : "rgba(255,255,255,0.5)" }

  const serviceLinks = [
    { label: "לינקדאין לארגונים",      href: "https://www.octaloom.com/linkedin-for-organizations-he" },
    { label: "לינקדאין למייסדים", href: "https://www.octaloom.com/linkedin-for-executives-he" },
    { label: "לינקדאין לעצמאיים",  href: "https://www.octaloom.com/linkedin-for-solopreneurs-he" },
  ]
  const otherLinks = [
    { label: "סמנכ״לית שיווק",  href: "https://www.octaloom.com/fractional-cmo-he" },
    { label: "כלי AI וסוכנים", href: "https://www.octaloom.com/ai-tools-agents-he" },
    { label: "סדנאות",                             href: "#" },
  ]
  const pageLinks = [
    { label: "בית",        href: "https://www.octaloom.com/he" },
    { label: "עליי",  href: "https://www.octaloom.com/about-he" },
    { label: "בלוג",  href: "https://www.octaloom.com/blog-he" },
    { label: "צור קשר", href: "https://www.octaloom.com/contact-he" },
  ]
  const legalLinks = [
    { label: "פרטיות",  href: "https://www.octaloom.com/privacy-policy-he" },
    { label: "תנאים",        href: "https://www.octaloom.com/terms-of-service-he" },
    { label: "נגישות",  href: "https://www.octaloom.com/accessibility-he" },
  ]
  const socialIcons = [
    { href: "https://www.linkedin.com/in/hanita-yudovski/", label: "LinkedIn",
      icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { href: "https://www.instagram.com/hanita_Y", label: "Instagram",
      icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
    { href: "https://www.facebook.com/octaloom", label: "Facebook",
      icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { href: "https://www.youtube.com/@Hanita_Octaloom", label: "YouTube",
      icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
    { href: "https://open.spotify.com/show/4XmsthqR7gnj4nf2gL0T7j", label: "Spotify",
      icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg> },
  ]

  return (
    <footer dir="rtl" style={{ padding: isMobile ? "32px 0 0" : "64px 0 0", background: "#201b4e", color: "rgba(255,255,255,0.7)", fontFamily: FF }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 0.65fr 1fr 0.8fr 0.8fr 0.8fr", gap: isMobile ? 20 : 24, paddingBottom: isMobile ? 24 : 48 }}>
          <div>
            <img src={LOGO_FOOT} alt="OctaLoom" style={{ height: isMobile ? 64 : 100, width: "auto", display: "block" }}/>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 14, maxWidth: 240, lineHeight: 1.65, fontFamily: FF }}>
              {"מחלקת השיווק שלכם,"}<br/>{"רק בלי המחלקה."}
            </p>
          </div>
          {!isMobile && (
            <div>
              <h4 style={headStyle}>{"דפים"}</h4>
              {pageLinks.map((l, i) => (
                <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>
              ))}
            </div>
          )}
          {!isMobile && (
            <div>
              <h4 style={headStyle}>{"שירותי לינקדאין"}</h4>
              {serviceLinks.map((l, i) => (
                <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>
              ))}
            </div>
          )}
          {!isMobile && (
            <div>
              <h4 style={headStyle}>{"ומעבר"}</h4>
              {otherLinks.map((l, i) => (
                <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>
              ))}
            </div>
          )}
          {!isMobile && (
            <div>
              <h4 style={headStyle}>{"משפטי"}</h4>
              {legalLinks.map((l, i) => (
                <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>
              ))}
            </div>
          )}
          <div>
            <h4 style={{ ...headStyle, marginBottom: 16 }}>{"Social"}</h4>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
              {socialIcons.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ color: "rgba(255,255,255,.38)", transition: "color 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.lime }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.38)" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 12 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", fontFamily: FF }}>{"© 2026 OctaLoom"}</span>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            {legalLinks.map((l, i) => (
              <a key={i} href={l.href} style={{ color: "rgba(255,255,255,0.38)", textDecoration: "none", fontSize: 12, fontFamily: FF, transition: "color 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.lime }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.38)" }}>
                {l.label}
              </a>
            ))}
            <a href="https://www.octaloom.com/about" style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", fontFamily: "'Aeonik', sans-serif", transition: "color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.lime }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.38)" }}>
              {"EN"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── SCHEMA ───────────────────────────────────────────────────────────────────
function SchemaAboutHE() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://octaloom.com/#hanita",
        "name": "חניתה יודובסקי",
        "jobTitle": "Fractional CMO",
        "description": "חניתה יודובסקי, Fractional CMO ומייסדת OctaLoom. בונה מערכות שיווק ולינקדאין למייסדים וחברות B2B.",
        "url": "https://octaloom.com/about-he",
        "image": HEADSHOT,
        "sameAs": ["https://www.linkedin.com/in/hanita-yudovski/"],
        "worksFor": {
          "@type": "Organization",
          "@id": "https://octaloom.com/#org",
          "name": "OctaLoom",
          "url": "https://octaloom.com",
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "מה זה Fractional CMO?",
            "acceptedAnswer": { "@type": "Answer", "text": "אם הייתם שוכרים CMO במשרה מלאה, הייתם משלמים 40-60 אלף שקל בחודש. Fractional CMO זה אותה הנהגה שיווקית, בלי המשכורת." },
          },
          {
            "@type": "Question",
            "name": "עם מי את עובדת?",
            "acceptedAnswer": { "@type": "Answer", "text": "בעיקר עם מייסדים וחברות B2B שצריכים שיווק רציני בלינקדאין." },
          },
        ],
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function AboutPageHE() {
  useGlobalStyles()
  const w = useWindowSize()
  const isMobile = w < 768

  return (
    <div dir="rtl" style={{ width: "100%", overflowX: "hidden", fontFamily: FF, background: C.cream }}>
      <SchemaAboutHE />
      <ScrollProgress />
      <CustomCursor />
      <NavHE />
      <main>
        <HeroSection isMobile={isMobile} />
        <TimelineSection isMobile={isMobile} />
        <StatsSection isMobile={isMobile} />
        <WhatIDoSection isMobile={isMobile} />
        <PodcastSection isMobile={isMobile} />
        <PersonalSection isMobile={isMobile} />
        <FAQSection isMobile={isMobile} />
        <CTASection isMobile={isMobile} />
      </main>
      <FooterHE isMobile={isMobile} />
    </div>
  )
}
