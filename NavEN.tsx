// @ts-nocheck
// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

/**
 * OctaLoom — Navbar EN (standalone Framer code component)
 * ───────────────────────────────────────────────────────
 * English pages — slugs without -he.
 * Renders the fixed glass navbar + an in-flow spacer so page
 * content placed below it never hides behind the floating bar.
 *
 * Use: stack NavEN → [your content] → FooterEN on English legal pages.
 * Split from OctaLoomNavAndFooter.tsx (source of truth) — no design changes.
 */

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

const { useState, useEffect } = React

// ─── SHARED UTILITIES ───────────────────────────────────────────────────────
const CREAM = "#ece9e7"
const NAVY = "#201e4b"
const LIME = "#c6e1a5"
const PURPLE = "#712eac"
const DEEP_PURPLE = "#201e4b"
const BORDER = "#e5e7eb"
const FONT = "'Aeonik', 'Noto Sans Hebrew', sans-serif"

function useWindowWidth() {
  const [w, setW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1440)
  useEffect(() => {
    const fn = () => setW(window.innerWidth)
    window.addEventListener("resize", fn, { passive: true })
    return () => window.removeEventListener("resize", fn)
  }, [])
  return w
}

function useGlobalStyles() {
  useEffect(() => {
    if (document.getElementById("octaloom-shared-styles")) return
    const s = document.createElement("style")
    s.id = "octaloom-shared-styles"
    s.textContent = `
      @font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Regular.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
      @font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Bold.ttf') format('truetype');font-weight:700;font-style:normal;font-display:swap}
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@300;400;500;600;700&display=swap');
      *,*::before,*::after{box-sizing:border-box}
      html{scroll-behavior:smooth}
      a{text-decoration:none;color:inherit}
      button{border:none;background:none;cursor:pointer;font:inherit}
      img{display:block;max-width:100%}
    `
    document.head.appendChild(s)
  }, [])
}

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg width={11} height={11} viewBox="0 0 12 12" fill="none"
    style={{ transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "none" }}>
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Returns the URL of the equivalent page in the other language.
// HE pages end with -he; EN pages don't.
function getLangToggleUrl(isHE: boolean): string {
  if (typeof window === "undefined") return "https://www.octaloom.com/"
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
  fontSize: 12, fontWeight: 600, color: DEEP_PURPLE,
  background: "transparent", border: "1px solid rgba(32,30,75,0.22)",
  borderRadius: 100, padding: "5px 13px", cursor: "pointer",
  fontFamily: FONT, transition: "border-color 0.2s, color 0.2s", letterSpacing: "0.03em",
}

// ─── NAVBAR EN ──────────────────────────────────────────────────────────────

function NavbarEN({ onQuiz }: { onQuiz?: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [linkedinOpen, setLinkedinOpen] = useState(false)
  const [linkedinExpanded, setLinkedinExpanded] = useState(false)
  const w = useWindowWidth()
  const isMobile = w < 768

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = (isMobile && menuOpen) ? "hidden" : ""
    if (!menuOpen) setLinkedinExpanded(false)
    return () => { document.body.style.overflow = "" }
  }, [menuOpen, isMobile])

  const navStyle: React.CSSProperties = {
    position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 1000,
    width: "calc(100% - 48px)", maxWidth: 1152, borderRadius: 100,
    background: scrolled ? "rgba(236,233,231,0.88)" : "rgba(236,233,231,0.6)",
    backdropFilter: "blur(50px)", WebkitBackdropFilter: "blur(50px)",
    border: "1px solid rgba(32,30,75,0.08)", padding: "10px 20px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    fontFamily: FONT, transition: "background 0.3s, box-shadow 0.3s",
    boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
  }

  const linkStyle: React.CSSProperties = {
    fontSize: 14, color: "rgba(32,30,75,0.55)", textDecoration: "none",
    transition: "color 0.25s", fontFamily: FONT,
  }

  const dropBase: React.CSSProperties = {
    position: "absolute", background: "#fff", borderRadius: 12, padding: "8px 6px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: `1px solid ${BORDER}`,
    minWidth: 180, zIndex: 50,
  }

  const dropItemStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 6, padding: "8px 12px",
    fontSize: 13, color: DEEP_PURPLE, borderRadius: 8, transition: "background 0.15s",
    textDecoration: "none",
  }

  const linkedinSub = [
    { label: "LinkedIn for Organizations", href: "https://www.octaloom.com/linkedin-for-organizations" },
    { label: "LinkedIn for Executives",    href: "https://www.octaloom.com/linkedin-for-executives" },
    { label: "LinkedIn for Solopreneurs",  href: "https://www.octaloom.com/linkedin-for-solopreneurs" },
  ]

  const otherSub = [
    { label: "Fractional CMO",    href: "https://www.octaloom.com/fractional-cmo" },
    { label: "AI Tools & Agents", href: "https://www.octaloom.com/ai-tools-agents" },
    { label: "Workshops",         href: "https://www.octaloom.com/workshops" },
  ]

  const navLinks = [
    { label: "About",   href: "https://www.octaloom.com/about" },
    { label: "Blog",    href: "https://www.octaloom.com/blog" },
    { label: "Contact", href: "https://www.octaloom.com/contact" },
    { label: "Goodies", href: "https://octagoodies.com" },
  ]

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <a href="https://www.octaloom.com/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img
          src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/logo%20nav%20bar.png"
          alt="OctaLoom"
          style={{ height: 36, width: "auto", display: "block" }}
          onError={e => { (e.target as HTMLImageElement).style.display = "none" }}
        />
      </a>

      {/* Desktop nav */}
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* Services dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => { setServicesOpen(false); setLinkedinOpen(false) }}
          >
            <button style={{
              background: "none", border: "none", cursor: "pointer", fontSize: 14,
              color: servicesOpen ? DEEP_PURPLE : "rgba(32,30,75,0.55)",
              display: "flex", alignItems: "center", gap: 5, padding: "6px 0",
              transition: "color 0.25s", fontFamily: FONT,
            }}>
              Services<ChevronDown open={servicesOpen}/>
            </button>

            {servicesOpen && (
              <div style={{ position: "absolute", top: "100%", left: 0, right: 0, height: 12, zIndex: 199 }} />
            )}

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                  style={{ ...dropBase, top: "calc(100% + 10px)", left: 0 }}
                >
                  {/* LinkedIn sub-menu */}
                  <div
                    style={{ position: "relative" }}
                    onMouseEnter={() => setLinkedinOpen(true)}
                    onMouseLeave={() => setLinkedinOpen(false)}
                  >
                    <a
                      href="https://www.octaloom.com/linkedin-growth-engine"
                      style={dropItemStyle}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(113,46,172,0.05)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <span>LinkedIn Growth Engine</span>
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.45 }}>
                        <path d="M4 2l4 4-4 4" stroke={DEEP_PURPLE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>

                    {linkedinOpen && (
                      <div style={{ position: "absolute", top: 0, bottom: 0, left: "100%", width: 8, zIndex: 199 }} />
                    )}

                    <AnimatePresence>
                      {linkedinOpen && (
                        <motion.div
                          initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }}
                          style={{ ...dropBase, top: 0, left: "calc(100% + 6px)" }}
                        >
                          {linkedinSub.map((sub, i) => (
                            <a key={i} href={sub.href} style={dropItemStyle}
                              onMouseEnter={e => (e.currentTarget.style.background = "rgba(113,46,172,0.05)")}
                              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                              {sub.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {otherSub.map((svc, i) => (
                    <a key={i} href={svc.href} style={dropItemStyle}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(113,46,172,0.05)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      {svc.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((item, i) => (
            <a key={i} href={item.href} style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = DEEP_PURPLE)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(32,30,75,0.55)")}>
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Right side: lang toggle + CTA + hamburger */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {!isMobile && (
          <>
            <a href={getLangToggleUrl(false)}
              style={langToggleStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = PURPLE; (e.currentTarget as HTMLAnchorElement).style.color = PURPLE }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(32,30,75,0.22)"; (e.currentTarget as HTMLAnchorElement).style.color = DEEP_PURPLE }}>
              עב
            </a>
            <button
              onClick={() => onQuiz ? onQuiz() : window.dispatchEvent(new CustomEvent("open-discovery"))}
              style={{
                padding: "8px 20px", borderRadius: 100, background: PURPLE, color: "#fff",
                fontSize: 13, fontWeight: 600, fontFamily: FONT, border: "none", cursor: "pointer",
              }}
            >
              {"Let's Talk"}
            </button>
          </>
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ background: "none", border: "none", cursor: "pointer", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <span style={{ position: "relative", display: "block", width: 28, height: 20 }}>
              {[0, 9, 18].map((top, i) => (
                <span key={i} style={{
                  position: "absolute", left: 0, width: "100%", height: 2,
                  background: DEEP_PURPLE, borderRadius: 2, top,
                  transform: menuOpen && i === 0 ? "rotate(45deg) translateY(9px)"
                    : menuOpen && i === 1 ? "scaleX(0)"
                    : menuOpen && i === 2 ? "rotate(-45deg) translateY(-9px)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                  transition: "all 0.3s",
                }} />
              ))}
            </span>
          </button>
        )}
      </div>

      {/* Mobile drawer */}
      {isMobile && menuOpen && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0, left: 0,
          background: "#fff", borderRadius: 16, padding: "20px 32px 32px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 50,
          maxHeight: "calc(100vh - 100px)", overflowY: "auto",
        }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: PURPLE, margin: "0 0 4px", fontFamily: FONT }}>
            Services
          </p>

          <button
            onClick={() => setLinkedinExpanded(prev => !prev)}
            style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between",
              fontSize: 20, color: DEEP_PURPLE, padding: "11px 0", fontWeight: 600,
              borderBottom: `1px solid rgba(113,46,172,0.08)`, fontFamily: FONT,
              background: "none", border: "none", cursor: "pointer", textAlign: "left" as const }}
          >
            LinkedIn Growth Engine
            <ChevronDown open={linkedinExpanded} />
          </button>
          <AnimatePresence>
            {linkedinExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden" }}
              >
                {linkedinSub.map((sub, i) => (
                  <a key={i} href={sub.href} onClick={() => setMenuOpen(false)}
                    style={{ display: "block", fontSize: 15, color: PURPLE, textDecoration: "none", padding: "7px 0 7px 20px", borderBottom: `1px solid rgba(113,46,172,0.05)`, fontFamily: FONT }}>
                    {sub.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {otherSub.map((svc, i) => (
            <a key={i} href={svc.href} onClick={() => setMenuOpen(false)}
              style={{ display: "block", fontSize: 20, color: DEEP_PURPLE, textDecoration: "none", padding: "11px 0", fontWeight: 600, borderBottom: `1px solid rgba(113,46,172,0.08)`, fontFamily: FONT }}>
              {svc.label}
            </a>
          ))}

          {navLinks.map((item, i) => (
            <a key={i} href={item.href} onClick={() => setMenuOpen(false)}
              style={{ display: "block", fontSize: 20, color: DEEP_PURPLE, textDecoration: "none", padding: "11px 0", fontWeight: 500, borderBottom: i < navLinks.length - 1 ? `1px solid rgba(113,46,172,0.08)` : "none", fontFamily: FONT }}>
              {item.label}
            </a>
          ))}

          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              onClick={() => { setMenuOpen(false); onQuiz ? onQuiz() : window.dispatchEvent(new CustomEvent("open-discovery")) }}
              style={{ display: "block", textAlign: "center", padding: "14px 24px", fontSize: 15, fontWeight: 600, background: PURPLE, color: "#fff", borderRadius: 100, fontFamily: FONT, border: "none", cursor: "pointer", width: "100%" }}
            >
              {"Let's Talk — Free"}
            </button>
            <a href={getLangToggleUrl(false)}
              style={{ display: "block", textAlign: "center", padding: "11px 24px", fontSize: 13, fontWeight: 600, color: DEEP_PURPLE, borderRadius: 100, fontFamily: FONT, border: `1px solid rgba(32,30,75,0.2)`, textDecoration: "none", width: "100%", boxSizing: "border-box" as const }}>
              {"← עברית"}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── DEFAULT EXPORT — fixed navbar + in-flow spacer ─────────────────────────
// The navbar is position:fixed (floats over content). The spacer below
// reserves vertical room so whatever you stack under this component on the
// page starts below the bar instead of hiding behind it.

export default function NavEN() {
  useGlobalStyles()
  return (
    <>
      <NavbarEN />
      <div style={{ height: 88, width: "100%", flexShrink: 0 }} aria-hidden="true" />
    </>
  )
}
