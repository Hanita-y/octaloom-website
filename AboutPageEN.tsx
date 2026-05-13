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
const LOGO_GOOD  = "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/OCTAGOODIES%20GREEN.png"

const C = {
  purple:     "#712eac",
  deepPurple: "#201e4b",
  navy:       "#060d3d",
  lime:       "#c5e6a2",
  cream:      "#ece9e7",
  textDim:    "#5c5878",
  surface:    "#f5f2f0",
  white:      "#ffffff",
  border:     "#e5e7eb",
  muted:      "#6b7280",
}
const FF = "'Aeonik', sans-serif"

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
    const id = "about-en-styles"
    if (document.getElementById(id)) return
    const s = document.createElement("style")
    s.id = id
    s.textContent = `
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Regular.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Bold.ttf') format('truetype');font-weight:700;font-style:normal;font-display:swap}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-font-smoothing:antialiased;scroll-behavior:smooth}
body{font-family:'Aeonik',sans-serif;background:#ece9e7;color:#201e4b;overflow-x:hidden}
a{color:inherit;text-decoration:none}
button{font-family:inherit;cursor:pointer;border:none;background:none}
`
    document.head.appendChild(s)
  }, [])
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
  const shown =
    from === "scale" ? "scale(1) translateY(0)" : "translate(0)"
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
      <div ref={dotRef} style={{ position: "fixed", top: 0, left: -100, width: 8, height: 8, borderRadius: "50%", background: C.purple, pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)", transition: "width .15s,height .15s,background .15s" }} />
      <div ref={ringRef} style={{ position: "fixed", top: 0, left: -100, width: 38, height: 38, borderRadius: "50%", border: "1.5px solid rgba(113,46,172,.45)", pointerEvents: "none", zIndex: 9998, transform: "translate(-50%,-50%)", transition: "width .25s,height .25s,border-color .25s" }} />
    </>
  )
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function NavEN() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [linkedinOpen, setLinkedinOpen] = useState(false)
  const [linkedinExpanded, setLinkedinExpanded] = useState(false)
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
    if (!menuOpen) setLinkedinExpanded(false)
    return () => { document.body.style.overflow = "" }
  }, [menuOpen, isMobile])

  const liSub = [
    { label: "LinkedIn for Organizations",  href: "https://www.octaloom.com/linkedin-for-organizations" },
    { label: "LinkedIn for Founders & CEOs", href: "https://www.octaloom.com/linkedin-for-executives" },
    { label: "LinkedIn for Freelancers",     href: "https://www.octaloom.com/linkedin-for-solopreneurs" },
  ]
  const otherSub = [
    { label: "Fractional CMO",     href: "https://www.octaloom.com/fractional-cmo" },
    { label: "AI Tools & Agents",  href: "https://www.octaloom.com/ai-tools-agents" },
    { label: "Workshops",          href: "https://www.octaloom.com/workshops" },
  ]
  const topLinks = [
    { label: "About",   href: "https://www.octaloom.com/about",    active: true },
    { label: "Blog",    href: "https://www.octaloom.com/blog" },
    { label: "Contact", href: "https://www.octaloom.com/contact" },
    { label: "Goodies", href: "https://octagoodies.com" },
  ]

  const dropBase: React.CSSProperties = {
    position: "absolute", background: "#fff", borderRadius: 12, padding: "8px 6px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(32,30,75,0.08)",
    minWidth: 200, zIndex: 50,
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
    <button onClick={() => setMenuOpen(!menuOpen)} aria-label="menu"
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
        {"Services"}
        <svg width={11} height={11} viewBox="0 0 12 12" fill="none"
          style={{ transition: "transform 0.25s", transform: servicesOpen ? "rotate(180deg)" : "none" }}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <AnimatePresence>
        {servicesOpen && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            style={{ ...dropBase, top: "calc(100% + 10px)", left: 0 }}>
            <div style={{ position: "relative" }}
              onMouseEnter={() => setLinkedinOpen(true)}
              onMouseLeave={() => setLinkedinOpen(false)}>
              <a href="https://www.octaloom.com/linkedin-growth-engine" style={{ ...dropItem, justifyContent: "space-between" }}
                onMouseEnter={e => hDrop(e, true)} onMouseLeave={e => hDrop(e, false)}>
                <span>{"LinkedIn Growth Engine"}</span>
                <svg width={11} height={11} viewBox="0 0 12 12" fill="none" style={{ opacity: 0.45 }}>
                  <path d="M4 2l4 4-4 4" stroke={C.deepPurple} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <AnimatePresence>
                {linkedinOpen && (
                  <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    style={{ ...dropBase, top: 0, left: "calc(100% + 6px)" }}>
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
        {"Services"}
      </p>
      <button onClick={() => setLinkedinExpanded(prev => !prev)}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 20, color: C.deepPurple, padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: FF, background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" as const }}>
        {"LinkedIn Growth Engine"}
        <svg width={11} height={11} viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.25s", transform: linkedinExpanded ? "rotate(180deg)" : "none", flexShrink: 0 }}><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <AnimatePresence>
        {linkedinExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            {liSub.map((s, i) => (
              <a key={i} href={s.href} onClick={() => setMenuOpen(false)}
                style={{ display: "block", fontSize: 15, color: C.purple, padding: "7px 0 7px 20px", borderBottom: "1px solid rgba(113,46,172,0.05)", fontFamily: FF }}>
                {s.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
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
      <div style={{ marginTop: 16 }}>
        <a href="https://www.octaloom.com/about-he" style={{ fontSize: 14, color: dim, fontFamily: FF }}>&#1506;&#1489;</a>
      </div>
    </div>
  )

  return (
    <nav dir="ltr" style={{
      position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 1000,
      width: "calc(100% - 48px)", maxWidth: 1152, borderRadius: 100,
      background: scrolled ? "rgba(236,233,231,0.88)" : "rgba(236,233,231,0.6)",
      backdropFilter: "blur(50px)", WebkitBackdropFilter: "blur(50px)",
      border: "1px solid rgba(32,30,75,0.08)", padding: "10px 20px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontFamily: FF, transition: "background 0.3s, box-shadow 0.3s",
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
    }}>
      <a href="https://www.octaloom.com/" style={{ display: "flex", alignItems: "center" }}>
        <img src={LOGO_NAV} alt="OctaLoom" style={{ height: 36, width: "auto", display: "block" }}/>
      </a>
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
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
        <a href="https://www.octaloom.com/about-he" style={{ fontSize: 13, fontWeight: 700, color: dim, fontFamily: FF, padding: "5px 10px" }}>&#1506;&#1489;</a>
        {!isMobile && (
          <button onClick={() => window.dispatchEvent(new Event("open-discovery"))}
            style={{ display: "inline-flex", alignItems: "center", padding: "9px 20px", borderRadius: 8, background: C.purple, color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: FF, border: "none", cursor: "pointer", transition: "box-shadow 0.25s, transform 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(113,46,172,0.35)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)" }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none" }}>
            {"Let’s Talk"}
          </button>
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
        {/* Full-width landscape photo with parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease }}
          style={{ overflow: "hidden", borderRadius: isMobile ? 16 : 24, marginBottom: isMobile ? 40 : 56, position: "relative" }}>
          <motion.img
            src={HEADSHOT}
            alt="Hanita Yudovski, LinkedIn-Led Fractional CMO and founder of OctaLoom"
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

        {/* Text below photo */}
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
              {"LinkedIn-Led Fractional CMO · Founder, OctaLoom"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.32, ease }}
            style={{
              fontFamily: FF, fontWeight: 700,
              fontSize: isMobile ? "clamp(40px,10vw,54px)" : "clamp(52px,5.5vw,76px)",
              lineHeight: 1.0, letterSpacing: "-0.03em",
              color: C.deepPurple, marginBottom: 10,
            }}>
            {"Hi, I’m Hanita."}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.4, ease }}
            style={{ fontSize: isMobile ? 14 : 16, fontFamily: FF, color: C.textDim, marginBottom: 28, fontStyle: "italic", lineHeight: 1.5 }}>
            {"(Yudovski, but like Madonna, first name is enough. 😅)"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.48, ease }}>
            <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.8, color: C.deepPurple, marginBottom: 6, fontFamily: FF }}>
              {"I’m a LinkedIn-Led Fractional CMO and the founder of OctaLoom."}
            </p>
            <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.8, color: C.deepPurple, marginBottom: 18, fontFamily: FF }}>
              {"In plain terms: your marketing department, minus the department."}
            </p>
            <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.8, color: C.textDim, marginBottom: 18, fontFamily: FF }}>
              {"For five years I’ve built marketing systems for B2B founders and companies who want serious marketing without hiring a full team. And if there’s one thing I’ve learned: most B2B founders don’t have a marketing problem. They have a LinkedIn problem."}
            </p>
            <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.6, color: C.deepPurple, fontWeight: 700, marginBottom: 36, fontFamily: FF }}>
              {"That’s the gap I close."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.58, ease }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
            <button onClick={() => window.dispatchEvent(new Event("open-discovery"))}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 8, background: C.purple, color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: FF, border: "none", cursor: "pointer", transition: "box-shadow 0.25s, transform 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(113,46,172,0.35)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none" }}>
              {"Let’s Talk"}
            </button>
            <a href="https://www.linkedin.com/in/hanita-yudovski/" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 8, background: "transparent", color: C.purple, border: `1.5px solid ${C.purple}`, fontSize: 15, fontWeight: 700, fontFamily: FF, transition: "background 0.2s, color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = C.purple; (e.currentTarget as HTMLAnchorElement).style.color = "#fff" }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = C.purple }}>
              <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              {"Connect on LinkedIn"}
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

// ─── HOW I GOT HERE ───────────────────────────────────────────────────────────
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
          {/* Label column */}
          <Reveal>
            <div>
              <h2 style={{
                fontFamily: FF, fontWeight: 700,
                fontSize: isMobile ? 28 : "clamp(28px,3.2vw,40px)",
                lineHeight: 1.15, letterSpacing: "-0.02em",
                color: C.deepPurple, marginBottom: 18,
              }}>
                {"How I got here"}
              </h2>
              <div style={{ width: 44, height: 3, background: C.lime, borderRadius: 2 }} />
            </div>
          </Reveal>

          {/* Narrative column */}
          <div>
            <Reveal delay={80}>
              <div style={{
                paddingLeft: 24,
                borderLeft: `3px solid ${C.purple}`,
                marginBottom: 36,
              }}>
                <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.85, color: C.deepPurple, marginBottom: 16, fontFamily: FF }}>
                  {"Between 2024 and 2025, I led marketing operations at Adopt Me. Three teams, 18 people. That’s where something clicked: everything a large team or agency spends months building, one person with the right systems can do differently."}
                </p>
                <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.8, color: C.textDim, fontFamily: FF }}>
                  {"No management layers. No handoffs. No strategy lost on the way to execution."}
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div style={{
                paddingLeft: 24,
                borderLeft: `3px solid ${C.lime}`,
                marginBottom: 36,
              }}>
                <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.85, color: C.deepPurple, fontFamily: FF }}>
                  {"I went deep into AI and automation starting in 2022, not as a side tool but as a core way to work. Today my team is me and the AI agents I’ve built. What used to take five people, I deliver as one operator, faster, with full strategic coherence."}
                </p>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <p style={{
                fontSize: isMobile ? 19 : 22,
                fontWeight: 700,
                color: C.purple,
                fontFamily: FF,
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
              }}>
                {"That’s OctaLoom: your marketing department, minus the department."}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─── IN PRACTICE ──────────────────────────────────────────────────────────────
function StatsSection({ isMobile }: { isMobile: boolean }) {
  const stats = [
    { target: 770,  suffix: "K+",  prefix: "",  label: "organic impressions for a B2B SaaS client in 3 months" },
    { target: 300,  suffix: "%",   prefix: "",  label: "engagement growth on a LinkedIn business page" },
    { target: 70,   suffix: "%",   prefix: "",  label: "less manual work through custom AI automation" },
    { target: 5000, suffix: "+",   prefix: "~", label: "organic B2B followers, zero ad spend" },
  ]
  return (
    <section style={{ background: C.deepPurple, padding: isMobile ? "72px 0" : "104px 0" }}>
      <Container>
        <Reveal>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.lime, marginBottom: 10, fontFamily: FF }}>
            {"In practice"}
          </p>
          <h2 style={{
            fontFamily: FF, fontWeight: 700,
            fontSize: isMobile ? 28 : "clamp(28px,3.2vw,40px)",
            lineHeight: 1.15, letterSpacing: "-0.02em",
            color: "#fff", marginBottom: isMobile ? 40 : 56,
          }}>
            {"Results that compound."}
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
                  fontFamily: FF, fontWeight: 700,
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
      title: "Organizations",
      desc: "Full LinkedIn strategy and page management, content systems, and employee advocacy programs for B2B companies that need consistent brand presence at scale.",
      href: "https://www.octaloom.com/linkedin-for-organizations",
    },
    {
      title: "Founders & Executives",
      desc: "Personal brand building for founders and senior leaders who need to become the face clients recognize and trust before they ever reach out.",
      href: "https://www.octaloom.com/linkedin-for-executives",
    },
    {
      title: "Solopreneurs",
      desc: "LinkedIn presence for freelancers and independent consultants who need inbound leads without an ad budget.",
      href: "https://www.octaloom.com/linkedin-for-solopreneurs",
    },
  ]
  const beyond = [
    {
      title: "Fractional CMO",
      desc: "CMO-level strategic leadership for companies that need a real marketing brain at the table without a full-time hire.",
      href: "https://www.octaloom.com/fractional-cmo",
    },
    {
      title: "AI Tools & Agents",
      desc: "Custom AI agents and automation systems that replace manual marketing processes.",
      href: "https://www.octaloom.com/ai-tools-agents",
    },
    {
      title: "Workshops",
      desc: "LinkedIn and AI marketing workshops for organizations building internal capability.",
      href: "#",
      badge: "Coming soon",
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
            {"What I do"}
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.8, color: C.textDim, maxWidth: 600, marginBottom: isMobile ? 36 : 48, fontFamily: FF }}>
            {"LinkedIn is the core of everything I do. Whether I’m working with a company, a founder, or a solopreneur, LinkedIn is where strategy starts. It’s the one platform where B2B trust and deal flow actually compound over time."}
          </p>
        </Reveal>

        {/* LinkedIn client cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
          gap: isMobile ? 14 : 20,
          marginBottom: 16,
        }}>
          {liClients.map((c, i) => (
            <Reveal key={i} delay={i * 70}>
              <a href={c.href} style={{
                display: "block", background: C.white, borderRadius: 16,
                padding: isMobile ? "24px 20px" : "28px 24px",
                border: "1px solid rgba(32,30,75,0.07)",
                borderLeft: `4px solid ${C.purple}`,
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
                  {"Learn more →"}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div style={{ marginBottom: isMobile ? 48 : 64 }} />

        {/* Beyond LinkedIn */}
        <Reveal>
          <div style={{ borderTop: "1px solid rgba(32,30,75,0.1)", paddingTop: isMobile ? 48 : 64 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.textDim, marginBottom: 24, fontFamily: FF }}>
              {"Beyond LinkedIn"}
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
                      <path d="M3 8h10M9 4l4 4-4 4" stroke={C.deepPurple} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
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
        <Reveal>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(6,13,61,0.5)", marginBottom: 16, fontFamily: FF }}>
              {"B2B Marketing Podcast"}
            </p>
            <h2 style={{
              fontFamily: FF, fontWeight: 700,
              fontSize: isMobile ? 22 : "clamp(22px,2.8vw,34px)",
              lineHeight: 1.2, letterSpacing: "-0.02em",
              color: C.navy, marginBottom: 16,
            }}>
              {"“What’s the Story With?” 🎙️"}
            </h2>
            <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.75, color: "rgba(6,13,61,0.7)", maxWidth: 560, marginBottom: 28, fontFamily: FF }}>
              {"I co-host with Noga Fink, a B2B marketing podcast where we break down what actually works in LinkedIn strategy, AI, campaigns, and fractional leadership. No frameworks. Just real marketing conversations."}
            </p>
            <a href="https://whatsthestorywith.com/" target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 8,
                background: C.deepPurple, color: "#fff",
                fontSize: 14, fontWeight: 700, fontFamily: FF,
                transition: "box-shadow 0.25s, transform 0.15s",
                marginBottom: 28,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 24px rgba(32,30,75,0.35)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; (e.currentTarget as HTMLAnchorElement).style.transform = "none" }}>
              {"Watch or listen →"}
            </a>
            {/* Spotify embed */}
            <div style={{ borderRadius: 12, overflow: "hidden", maxWidth: 520 }}>
              <iframe
                src="https://open.spotify.com/embed/show/4XmsthqR7gnj4nf2gL0T7j?utm_source=generator&theme=0"
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ border: "none", display: "block", borderRadius: 12 }}
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

// ─── ON A PERSONAL LEVEL ──────────────────────────────────────────────────────
function PersonalSection({ isMobile }: { isMobile: boolean }) {
  const traits = [
    { icon: "🐕", label: "Dog mom to Kara", sub: "Anxious Canaanite", bg: C.purple,     color: "#fff",       border: "none" },
    { icon: "☕", label: "Coffee snob",      sub: "No compromise",    bg: C.lime,        color: C.deepPurple, border: "none" },
    { icon: "🌱", label: "Plant-based",      sub: "13+ years strong", bg: C.white,       color: C.deepPurple, border: `1.5px solid ${C.purple}` },
    { icon: "⚡", label: "ADHD brain",       sub: "Wired differently", bg: C.deepPurple, color: "#fff",       border: "none" },
    { icon: "💪", label: "Soviet work ethic", sub: "Your unfair advantage", bg: C.lime,  color: C.deepPurple, border: "none" },
    { icon: "🏋️", label: "Pilates reformer",  sub: "Mat is for amateurs",  bg: C.white, color: C.deepPurple, border: `1.5px solid ${C.purple}` },
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
          {/* Left: text */}
          <div>
            <Reveal>
              <h2 style={{
                fontFamily: FF, fontWeight: 700,
                fontSize: isMobile ? 28 : "clamp(28px,3.2vw,40px)",
                lineHeight: 1.15, letterSpacing: "-0.02em",
                color: C.deepPurple, marginBottom: 24,
              }}>
                {"On a Personal Level"}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.85, color: C.textDim, fontFamily: FF }}>
                {"I’m a dog mom to an anxious Canaanite named Kara, coffee snob, plant-based for over 13 years, with an ADHD brain and a Soviet work ethic which is probably the unfair advantage you didn’t know you were getting."}
              </p>
            </Reveal>
          </div>
          {/* Right: trait chips */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignContent: "flex-start",
          }}>
            {traits.map((t, i) => (
              <Reveal key={i} delay={i * 80} from="right">
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  padding: "18px 22px",
                  borderRadius: 20,
                  background: t.bg,
                  border: t.border,
                  minWidth: isMobile ? 130 : 148,
                  flex: "1 0 auto",
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
      q: "What is a LinkedIn-Led Fractional CMO?",
      a: "A Fractional CMO is a senior marketing leader who works with your company part-time rather than full-time. LinkedIn-Led means my approach is built around the platform where B2B decisions actually happen. I handle strategy, content, execution, and marketing leadership without the overhead of a full-time hire.",
    },
    {
      q: "Who do you work with?",
      a: "B2B founders and companies who need serious marketing leadership but aren’t at the stage where a full-time CMO makes financial sense. If your LinkedIn presence is thin, your content is inconsistent, and you’re losing visibility to competitors who show up every week. That’s exactly what I fix.",
    },
    {
      q: "What makes OctaLoom different from an agency?",
      a: "An agency wins when more people work on your account. I win when fewer people do more. You get one strategist who knows your business, builds the systems, and executes, with no account managers between strategy and the actual work.",
    },
    {
      q: "What is Vibe Marketing?",
      a: "The framework I work by: the same philosophy Andrej Karpathy defined with Vibe Coding for software development, applied to marketing. AI handles the scale. I handle the thinking. What used to require five people, delivered by one operator.",
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
            {"FAQ"}
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
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "20px 0", textAlign: "left" as const,
                  }}>
                  <span style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: "#fff", lineHeight: 1.4, paddingRight: 20, fontFamily: FF }}>
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
            {/* GIF */}
            <img
              src={GIF_HANITA}
              alt="Hanita Yudovski"
              style={{
                width: isMobile ? 88 : 110,
                height: isMobile ? 88 : 110,
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                borderRadius: 12,
                marginBottom: isMobile ? 28 : 36,
              }}
            />
            <h2 style={{
              fontFamily: FF, fontWeight: 700,
              fontSize: isMobile ? "clamp(32px,8vw,44px)" : "clamp(40px,4.5vw,60px)",
              lineHeight: 1.05, letterSpacing: "-0.03em",
              color: C.purple, marginBottom: 16,
            }}>
              {"Ready to connect?"}
            </h2>
            <p style={{
              fontSize: isMobile ? 16 : 19,
              lineHeight: 1.6,
              color: C.deepPurple,
              marginBottom: isMobile ? 36 : 48,
              fontFamily: FF,
              maxWidth: 480,
            }}>
              {"Let’s weave something great together."}
            </p>
            <button onClick={() => window.dispatchEvent(new Event("open-discovery"))}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: isMobile ? "14px 36px" : "18px 48px",
                borderRadius: 100,
                background: C.purple, color: "#fff",
                fontSize: isMobile ? 15 : 17, fontWeight: 700, fontFamily: FF,
                letterSpacing: "-0.01em",
                border: "none", cursor: "pointer",
                transition: "box-shadow 0.25s, transform 0.15s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 40px rgba(113,46,172,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none" }}>
              {"Let’s Talk"}
            </button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function FooterEN({ isMobile }: { isMobile: boolean }) {
  const linkStyle: React.CSSProperties = { fontSize: 14, color: "rgba(255,255,255,0.5)", display: "block", lineHeight: "1.9", fontFamily: FF, transition: "color 0.2s" }
  const headStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: C.cream, margin: "0 0 14px", fontFamily: FF }
  const hov = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => { e.currentTarget.style.color = enter ? C.lime : "rgba(255,255,255,0.5)" }

  const serviceLinks = [
    { label: "LinkedIn for Organizations",   href: "https://www.octaloom.com/linkedin-for-organizations" },
    { label: "LinkedIn for Founders & CEOs", href: "https://www.octaloom.com/linkedin-for-executives" },
    { label: "LinkedIn for Freelancers",      href: "https://www.octaloom.com/linkedin-for-solopreneurs" },
  ]
  const otherLinks = [
    { label: "Fractional CMO",    href: "https://www.octaloom.com/fractional-cmo" },
    { label: "AI Tools & Agents", href: "https://www.octaloom.com/ai-tools-agents" },
    { label: "Workshops",         href: "https://www.octaloom.com/workshops" },
  ]
  const pageLinks = [
    { label: "Home",    href: "https://www.octaloom.com/" },
    { label: "About",   href: "https://www.octaloom.com/about" },
    { label: "Blog",    href: "https://www.octaloom.com/blog" },
    { label: "Contact", href: "https://www.octaloom.com/contact" },
  ]
  const legalLinks = [
    { label: "Privacy",       href: "https://www.octaloom.com/privacy-policy" },
    { label: "Terms",         href: "https://www.octaloom.com/terms-of-service" },
    { label: "Accessibility", href: "https://www.octaloom.com/accessibility" },
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
    <footer dir="ltr" style={{ padding: isMobile ? "32px 0 0" : "64px 0 0", background: "#201b4e", color: "rgba(255,255,255,0.7)", fontFamily: FF }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 0.65fr 1fr 0.8fr 0.8fr 0.8fr", gap: isMobile ? 20 : 24, paddingBottom: isMobile ? 24 : 48 }}>
          <div>
            <img src={LOGO_FOOT} alt="OctaLoom" style={{ height: isMobile ? 64 : 100, width: "auto", display: "block" }}/>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 14, maxWidth: 240, lineHeight: 1.65, fontFamily: FF }}>
              {"Your marketing department,"}<br/>{"without the department."}
            </p>
          </div>
          {!isMobile && (
            <div>
              <h4 style={headStyle}>{"Pages"}</h4>
              {pageLinks.map((l, i) => (
                <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>
              ))}
            </div>
          )}
          {!isMobile && (
            <div>
              <h4 style={headStyle}>{"LinkedIn Services"}</h4>
              {serviceLinks.map((l, i) => (
                <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>
              ))}
            </div>
          )}
          {!isMobile && (
            <div>
              <h4 style={headStyle}>{"More Services"}</h4>
              {otherLinks.map((l, i) => (
                <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>
              ))}
            </div>
          )}
          {!isMobile && (
            <div>
              <h4 style={{ ...headStyle, fontWeight: 300, fontSize: 12 }}>
                {"Free Marketing"}<br/>{"Tools & Templates"}
              </h4>
              <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", opacity: 0.9 }}>
                <img src={LOGO_GOOD} alt="OctaGoodies" style={{ height: 44, width: "auto", display: "block" }}/>
              </a>
            </div>
          )}
          <div>
            {!isMobile && <h4 style={headStyle}>{"Connect"}</h4>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {socialIcons.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.lime }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 12, color: "rgba(255,255,255,.38)", flexWrap: "wrap" as const, gap: 12, fontFamily: FF }}>
          <span>{"© 2026 OctaLoom"}</span>
          <div style={{ display: "flex", gap: 18 }}>
            {legalLinks.map((l, i) => (
              <a key={i} href={l.href} style={{ color: "rgba(255,255,255,.38)", transition: "color 0.2s", fontFamily: FF }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.lime }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.38)" }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── SCHEMA ───────────────────────────────────────────────────────────────────
function SchemaAbout() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://octaloom.com/#hanita",
        "name": "Hanita Yudovski",
        "jobTitle": "LinkedIn-Led Fractional CMO",
        "description": "I'm Hanita Yudovski, LinkedIn-Led Fractional CMO and founder of OctaLoom. I help B2B founders and companies build LinkedIn authority and marketing systems that generate real business. 770K+ impressions.",
        "url": "https://octaloom.com/about",
        "image": HEADSHOT,
        "sameAs": [
          "https://www.linkedin.com/in/hanita-yudovski/",
          "https://www.instagram.com/hanita_Y",
        ],
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
            "name": "What is a LinkedIn-Led Fractional CMO?",
            "acceptedAnswer": { "@type": "Answer", "text": "A Fractional CMO is a senior marketing leader who works with your company part-time rather than full-time. LinkedIn-Led means my approach is built around the platform where B2B decisions actually happen. I handle strategy, content, execution, and marketing leadership without the overhead of a full-time hire." },
          },
          {
            "@type": "Question",
            "name": "Who does OctaLoom work with?",
            "acceptedAnswer": { "@type": "Answer", "text": "B2B founders and companies who need serious marketing leadership but aren't at the stage where a full-time CMO makes financial sense." },
          },
          {
            "@type": "Question",
            "name": "What makes OctaLoom different from an agency?",
            "acceptedAnswer": { "@type": "Answer", "text": "An agency wins when more people work on your account. I win when fewer people do more. You get one strategist who knows your business, builds the systems, and executes with no account managers between strategy and the actual work." },
          },
          {
            "@type": "Question",
            "name": "What is Vibe Marketing?",
            "acceptedAnswer": { "@type": "Answer", "text": "The framework I work by: the same philosophy Andrej Karpathy defined with Vibe Coding for software development, applied to marketing. AI handles the scale. I handle the thinking." },
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

// ─── DISCOVERY FORM MODAL ────────────────────────────────────────────────────
const WEB3FORMS_KEY = "abe931a2-a849-4da6-b9d6-ce7dfddc09d9"
const DFT = {
  he: {
    step1Title:    "ספרו לנו קצת על עצמכם",
    step2Title:    "מה אתם מחפשים?",
    step3Title:    "עוד קצת",
    name:          "שם מלא",
    company:       "שם החברה",
    email:         "אימייל",
    services:      ["LinkedIn לארגונים","LinkedIn למייסדים ומנכ״לים","LinkedIn לעצמאיים","CMO במיקור חוץ","כלי AI וסוכנים","סדנאות","עוד לא בטוח/ה"],
    timelineLabel: "מתי מחפשים להתחיל?",
    timelines:     ["מיידי","1–3 חודשים","סתם בודק/ת"],
    notesLabel:    "הוסיפו משהו שחשוב לנו לדעת (אפשרי)",
    next:          "המשיכו",
    back:          "חזרה",
    send:          "שלחו",
    sending:       "שולח...",
    successTitle:  "מעולה! עכשיו שאנחנו יודעים מה אתם צריכים,",
    bookBtn:       "קבעו שיחה עכשיו",
    errorRequired: "נא למלא את כל השדות",
    errorEmail:    "כתובת אימייל לא תקינה",
    errorSend:     "שגיאה בשליחה, נסו שוב",
    selectService: "בחרו אפשרות",
    selectTimeline:"בחרו מתי",
    emailSubject:  "פנייה חדשה",
    emailFrom:     "מ",
  },
  en: {
    step1Title:    "Tell us a bit about you",
    step2Title:    "What are you looking for?",
    step3Title:    "A bit more",
    name:          "Full name",
    company:       "Company name",
    email:         "Email",
    services:      ["LinkedIn for Organizations","LinkedIn for Founders & CEOs","LinkedIn for Freelancers","Fractional CMO","AI Tools & Agents","Workshops","Not sure yet"],
    timelineLabel: "When are you looking to start?",
    timelines:     ["Immediately","1–3 months","Just exploring"],
    notesLabel:    "Anything important we should know (optional)",
    next:          "Next",
    back:          "Back",
    send:          "Send",
    sending:       "Sending…",
    successTitle:  "Great! Now that we know what you need,",
    bookBtn:       "Book the call now",
    errorRequired: "Please fill in all fields",
    errorEmail:    "Invalid email address",
    errorSend:     "Send failed, please try again",
    selectService: "Select an option",
    selectTimeline:"Select timeline",
    emailSubject:  "New inquiry",
    emailFrom:     "from",
  },
}

function DiscoveryFormModal() {
  const [open, setOpen]         = useState(false)
  const [step, setStep]         = useState(1)
  const [dfLang, setDfLang]     = useState<"he" | "en">("en")
  const [name, setName]         = useState("")
  const [company, setCompany]   = useState("")
  const [email, setEmail]       = useState("")
  const [service, setService]   = useState("")
  const [timeline, setTimeline] = useState("")
  const [notes, setNotes]       = useState("")
  const [status, setStatus]     = useState<"idle"|"loading"|"success"|"error">("idle")
  const [errMsg, setErrMsg]     = useState("")

  const detectLang = useCallback((): "he"|"en" => {
    if (typeof window === "undefined") return "en"
    const saved = localStorage.getItem("octaloom-lang")
    if (saved === "en" || saved === "he") return saved
    return document.documentElement.lang === "he" ? "he" : "en"
  }, [])

  useEffect(() => { setDfLang(detectLang()) }, [detectLang])
  useEffect(() => {
    const obs = new MutationObserver(() => setDfLang(detectLang()))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] })
    return () => obs.disconnect()
  }, [detectLang])
  useEffect(() => {
    const h = () => setOpen(true)
    window.addEventListener("open-discovery", h)
    return () => window.removeEventListener("open-discovery", h)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    setTimeout(() => { setStep(1); setName(""); setCompany(""); setEmail(""); setService(""); setTimeline(""); setNotes(""); setStatus("idle"); setErrMsg("") }, 300)
  }, [])

  const t      = DFT[dfLang]
  const isRTL  = dfLang === "he"
  const dfFont = isRTL ? "'Discovery Fs','Aeonik',sans-serif" : "'Aeonik',sans-serif"
  const dfErr  = "#ef4444"

  const nextStep1 = () => {
    if (!name.trim() || !company.trim() || !email.trim()) { setErrMsg(t.errorRequired); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErrMsg(t.errorEmail); return }
    setErrMsg(""); setStep(2)
  }
  const nextStep2 = () => {
    if (!service) { setErrMsg(t.selectService); return }
    setErrMsg(""); setStep(3)
  }
  const submit = async () => {
    if (!timeline) { setErrMsg(t.selectTimeline); return }
    setErrMsg(""); setStatus("loading")
    try {
      const res  = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `${t.emailSubject}: ${name} ${t.emailFrom} ${company}`, from_name: "OctaLoom Website", name, email, company, service, timeline, notes: notes || "—" }),
      })
      const data = await res.json()
      if (data.success) setStatus("success")
      else { setErrMsg(t.errorSend); setStatus("error") }
    } catch { setErrMsg(t.errorSend); setStatus("error") }
  }

  const inputS: React.CSSProperties  = { width: "100%", padding: "12px 14px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 15, fontFamily: dfFont, outline: "none", boxSizing: "border-box", direction: isRTL ? "rtl" : "ltr", background: C.white }
  const labelS: React.CSSProperties  = { fontSize: 13, fontWeight: 600, color: C.deepPurple, marginBottom: 6, display: "block", fontFamily: dfFont, textAlign: isRTL ? "right" : "left" }
  const primS: React.CSSProperties   = { flex: 2, background: C.purple, color: C.white, padding: "14px", borderRadius: 8, border: "none", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: dfFont }
  const ghostS: React.CSSProperties  = { flex: 1, padding: "14px", borderRadius: 8, border: `1.5px solid ${C.border}`, background: "transparent", color: C.muted, fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: dfFont }

  return (
    <>
      <div style={{ width: 1, height: 1, overflow: "hidden", position: "absolute", pointerEvents: "none" }} />
      <AnimatePresence>
        {open && (
          <motion.div key="df-ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            onClick={e => { if (e.target === e.currentTarget) close() }}
            style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(6,13,61,0.72)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <motion.div key="df-mod" initial={{ opacity: 0, y: 32, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.97 }} transition={{ type: "spring", damping: 26, stiffness: 300 }}
              style={{ background: C.white, borderRadius: 16, padding: "32px 28px", width: "100%", maxWidth: 480, direction: isRTL ? "rtl" : "ltr", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
              <button onClick={close} style={{ position: "absolute", top: 14, [isRTL ? "left" : "right"]: 14, background: "none", border: "none", cursor: "pointer", fontSize: 24, color: C.muted, lineHeight: 1, padding: 4 }}>{"×"}</button>
              {status !== "success" && (
                <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
                  {[1,2,3].map(s => <div key={s} style={{ height: 3, flex: 1, borderRadius: 2, background: s <= step ? C.purple : C.border, transition: "background 0.3s" }} />)}
                </div>
              )}
              {status === "success" && (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>{"🎉"}</div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: C.deepPurple, margin: "0 0 28px", fontFamily: dfFont }}>{t.successTitle}</h2>
                  <a href={NOTION_CALENDAR} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-block", background: C.purple, color: C.white, padding: "14px 32px", borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: "none", fontFamily: dfFont }}>{t.bookBtn}</a>
                </div>
              )}
              {status !== "success" && step === 1 && (
                <>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.deepPurple, margin: "0 0 22px", fontFamily: dfFont }}>{t.step1Title}</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div><label style={labelS}>{t.name}</label><input value={name} onChange={e => setName(e.target.value)} style={inputS} /></div>
                    <div><label style={labelS}>{t.company}</label><input value={company} onChange={e => setCompany(e.target.value)} style={inputS} /></div>
                    <div><label style={labelS}>{t.email}</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputS} /></div>
                  </div>
                  {errMsg && <p style={{ color: dfErr, fontSize: 13, margin: "12px 0 0", fontFamily: dfFont }}>{errMsg}</p>}
                  <button onClick={nextStep1} style={{ ...primS, flex: "unset" as any, width: "100%", marginTop: 24 }}>{t.next}</button>
                </>
              )}
              {status !== "success" && step === 2 && (
                <>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.deepPurple, margin: "0 0 22px", fontFamily: dfFont }}>{t.step2Title}</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {t.services.map(s => (
                      <button key={s} onClick={() => setService(s)} style={{ padding: "12px 16px", borderRadius: 8, textAlign: isRTL ? "right" : "left", border: `1.5px solid ${service === s ? C.purple : C.border}`, background: service === s ? "rgba(113,46,172,0.07)" : C.white, color: service === s ? C.purple : C.deepPurple, fontWeight: service === s ? 700 : 400, cursor: "pointer", fontSize: 15, fontFamily: dfFont, transition: "all 0.15s" }}>{s}</button>
                    ))}
                  </div>
                  {errMsg && <p style={{ color: dfErr, fontSize: 13, margin: "12px 0 0", fontFamily: dfFont }}>{errMsg}</p>}
                  <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                    <button onClick={() => { setErrMsg(""); setStep(1) }} style={ghostS}>{t.back}</button>
                    <button onClick={nextStep2} style={primS}>{t.next}</button>
                  </div>
                </>
              )}
              {status !== "success" && step === 3 && (
                <>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.deepPurple, margin: "0 0 22px", fontFamily: dfFont }}>{t.step3Title}</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div>
                      <label style={labelS}>{t.timelineLabel}</label>
                      <div style={{ display: "flex", gap: 8 }}>
                        {t.timelines.map(tl => (
                          <button key={tl} onClick={() => setTimeline(tl)} style={{ flex: 1, padding: "10px 6px", borderRadius: 8, fontSize: 13, border: `1.5px solid ${timeline === tl ? C.purple : C.border}`, background: timeline === tl ? "rgba(113,46,172,0.07)" : C.white, color: timeline === tl ? C.purple : C.deepPurple, fontWeight: timeline === tl ? 700 : 400, cursor: "pointer", fontFamily: dfFont, transition: "all 0.15s" }}>{tl}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={labelS}>{t.notesLabel}</label>
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} style={{ ...inputS, resize: "vertical" as const }} />
                    </div>
                  </div>
                  {errMsg && <p style={{ color: dfErr, fontSize: 13, margin: "12px 0 0", fontFamily: dfFont }}>{errMsg}</p>}
                  <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                    <button onClick={() => { setErrMsg(""); setStep(2) }} style={ghostS}>{t.back}</button>
                    <button onClick={submit} disabled={status === "loading"} style={{ ...primS, opacity: status === "loading" ? 0.7 : 1, cursor: status === "loading" ? "wait" : "pointer" }}>{status === "loading" ? t.sending : t.send}</button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function AboutPageEN() {
  useGlobalStyles()
  const w = useWindowSize()
  const isMobile = w < 768

  return (
    <div dir="ltr" style={{ width: "100%", overflowX: "hidden", fontFamily: FF, background: C.cream }}>
      <SchemaAbout />
      <ScrollProgress />
      <CustomCursor />
      <NavEN />
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
      <FooterEN isMobile={isMobile} />
      <DiscoveryFormModal />
    </div>
  )
}
