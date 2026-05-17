// @ts-nocheck
// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

/**
 * OctaLoom — Shared Navbar + Footer
 * ─────────────────────────────────
 * SOURCE OF TRUTH for nav and footer used across all pages.
 * Copy the relevant section into any new page component.
 *
 * HOW TO USE:
 *   1. Copy ─── SHARED UTILITIES ─── section into your page file (once per file)
 *   2. Copy ─── NAVBAR HE ─── for Hebrew pages  (slugs end with -he)
 *   3. Copy ─── NAVBAR EN ─── for English pages (slugs without -he)
 *   4. Copy ─── FOOTER ─── (same for all pages)
 *
 * Default export = live preview (add to Framer for visual QA)
 */

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

const { useState, useEffect, useRef } = React

// ═══════════════════════════════════════════════════════════════════════════════
// ─── SHARED UTILITIES ───────────────────────────────────────────────────────
// Copy everything below into your page file (skip if already present)
// ═══════════════════════════════════════════════════════════════════════════════

const CREAM = "#ece9e7"
const NAVY = "#201e4b"
const LIME = "#c6e1a5"
const PURPLE = "#712eac"
const DEEP_PURPLE = "#201e4b"
const BORDER = "#e5e7eb"
const FONT = "'Discovery Fs', 'Noto Sans Hebrew', sans-serif"

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
      @font-face{font-family:'Discovery Fs';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/DiscoveryFs-Light.ttf') format('truetype');font-weight:300;font-style:normal;font-display:swap}
      @font-face{font-family:'Discovery Fs';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/DiscoveryFs-Medium.ttf') format('truetype');font-weight:500 600 700;font-style:normal;font-display:swap}
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
  // Articles use /<slug>/he convention; every other page uses -he suffix.
  const isArticle = path.startsWith("/articles/")
  if (isHE) {
    const enPath = isArticle
      ? (path.replace(/\/he\/?$/, "") || "/")
      : (path.replace(/-he\/?$/, "") || "/")
    return "https://www.octaloom.com" + enPath
  } else {
    if (path === "/" || path === "") return "https://www.octaloom.com/"
    const cleanPath = path.replace(/\/$/, "")
    return "https://www.octaloom.com" + cleanPath + (isArticle ? "/he" : "-he")
  }
}

const langToggleStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 600, color: DEEP_PURPLE,
  background: "transparent", border: "1px solid rgba(32,30,75,0.22)",
  borderRadius: 100, padding: "5px 13px", cursor: "pointer",
  fontFamily: FONT, transition: "border-color 0.2s, color 0.2s", letterSpacing: "0.03em",
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── NAVBAR HE ──────────────────────────────────────────────────────────────
// Hebrew pages — all slugs end with -he, full paths
// Copy from here down to the closing brace of NavbarHE()
// ═══════════════════════════════════════════════════════════════════════════════

function NavbarHE({ onQuiz }: { onQuiz?: () => void }) {
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
    display: "flex", alignItems: "center", justifyContent: "space-between", direction: "rtl",
    flexDirection: isMobile ? "row-reverse" : undefined,
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
    minWidth: 170, zIndex: 50, direction: "rtl",
  }

  const dropItemStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 6, padding: "8px 12px",
    fontSize: 13, color: DEEP_PURPLE, borderRadius: 8, transition: "background 0.15s",
    textDecoration: "none",
  }

  const linkedinSub = [
    { label: "LinkedIn לארגונים", href: "https://www.octaloom.com/linkedin-for-organizations-he" },
    { label: "LinkedIn למייסדים ומנכ״לים", href: "https://www.octaloom.com/linkedin-for-executives-he" },
    { label: "LinkedIn לעצמאים", href: "https://www.octaloom.com/linkedin-for-solopreneurs-he" },
  ]

  const otherSub = [
    { label: "CMO במיקור חוץ", href: "https://www.octaloom.com/fractional-cmo-he" },
    { label: "כלי AI וסוכנים", href: "https://www.octaloom.com/ai-tools-agents-he" },
    { label: "סדנאות", href: "https://www.octaloom.com/workshops-he" },
  ]

  const navLinks = [
    { label: "אודות", href: "https://www.octaloom.com/about-he" },
    { label: "בלוג", href: "https://www.octaloom.com/blog-he" },
    { label: "צרו קשר", href: "https://www.octaloom.com/contact-he" },
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28, direction: "rtl" }}>
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
              {"שירותים"}<ChevronDown open={servicesOpen}/>
            </button>

            {/* Bridge gap so hover doesn't break */}
            {servicesOpen && (
              <div style={{ position: "absolute", top: "100%", left: 0, right: 0, height: 12, zIndex: 199 }} />
            )}

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                  style={{ ...dropBase, top: "calc(100% + 10px)", right: 0 }}
                >
                  {/* LinkedIn sub-menu */}
                  <div
                    style={{ position: "relative" }}
                    onMouseEnter={() => setLinkedinOpen(true)}
                    onMouseLeave={() => setLinkedinOpen(false)}
                  >
                    <a
                      href="https://www.octaloom.com/linkedin-growth-engine-he"
                      style={{ ...dropItemStyle, flexDirection: "row-reverse" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(113,46,172,0.05)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <span>{"מנוע צמיחה LinkedIn"}</span>
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.45, transform: "scaleX(-1)" }}>
                        <path d="M4 2l4 4-4 4" stroke={DEEP_PURPLE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>

                    {/* Sub-menu bridge gap */}
                    {linkedinOpen && (
                      <div style={{ position: "absolute", top: 0, bottom: 0, right: "100%", width: 8, zIndex: 199 }} />
                    )}

                    <AnimatePresence>
                      {linkedinOpen && (
                        <motion.div
                          initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }}
                          style={{ ...dropBase, top: 0, right: "calc(100% + 6px)" }}
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

                  {/* Other services */}
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

          {/* Static nav links */}
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
      <div style={{ display: "flex", gap: 8, alignItems: "center", direction: "ltr" }}>
        {!isMobile && (
          <>
            <a href={getLangToggleUrl(true)}
              style={langToggleStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = PURPLE; (e.currentTarget as HTMLAnchorElement).style.color = PURPLE }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(32,30,75,0.22)"; (e.currentTarget as HTMLAnchorElement).style.color = DEEP_PURPLE }}>
              EN
            </a>
            <button
              onClick={() => onQuiz ? onQuiz() : window.dispatchEvent(new CustomEvent("open-discovery"))}
              style={{
                padding: "8px 20px", borderRadius: 100, background: PURPLE, color: "#fff",
                fontSize: 13, fontWeight: 600, fontFamily: FONT, border: "none", cursor: "pointer",
              }}
            >
              {"בואו נדבר"}
            </button>
          </>
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={"תפריט"}
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
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)", direction: "rtl", zIndex: 50,
          maxHeight: "calc(100vh - 100px)", overflowY: "auto",
        }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: PURPLE, margin: "0 0 4px", fontFamily: FONT }}>
            {"שירותים"}
          </p>

          <button
            onClick={() => setLinkedinExpanded(prev => !prev)}
            style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between",
              fontSize: 20, color: DEEP_PURPLE, padding: "11px 0", fontWeight: 600,
              borderBottom: `1px solid rgba(113,46,172,0.08)`, fontFamily: FONT,
              background: "none", border: "none", cursor: "pointer", textAlign: "right" as const }}
          >
            {"מנוע צמיחה LinkedIn"}
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
              {"בואו נדבר חינם"}
            </button>
            <a href={getLangToggleUrl(true)}
              style={{ display: "block", textAlign: "center", padding: "11px 24px", fontSize: 13, fontWeight: 600, color: DEEP_PURPLE, borderRadius: 100, fontFamily: FONT, border: `1px solid rgba(32,30,75,0.2)`, textDecoration: "none", width: "100%", boxSizing: "border-box" as const }}>
              Switch to English →
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── NAVBAR EN ──────────────────────────────────────────────────────────────
// English pages — slugs without -he, full paths
// Copy from here down to the closing brace of NavbarEN()
// ═══════════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════════
// ─── FOOTER ─────────────────────────────────────────────────────────────────
// Copy from here down to the closing brace of Footer()
// Mobile pattern: hide link columns, show only logo + socials + legal
// ═══════════════════════════════════════════════════════════════════════════════

function Footer() {
  const w = useWindowWidth()
  const isMobile = w < 768

  const linkStyle: React.CSSProperties = {
    fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none",
    transition: "color 0.2s", display: "block", lineHeight: "1.9", fontFamily: FONT,
  }
  const headStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 700, color: CREAM, margin: "0 0 14px", fontFamily: FONT,
  }
  const hover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    e.currentTarget.style.color = enter ? LIME : "rgba(255,255,255,0.5)"
  }

  const serviceLinks = [
    { label: "LinkedIn לארגונים", href: "https://www.octaloom.com/linkedin-for-organizations-he" },
    { label: "LinkedIn למייסדים ומנכ״לים", href: "https://www.octaloom.com/linkedin-for-executives-he" },
    { label: "LinkedIn לעצמאים", href: "https://www.octaloom.com/linkedin-for-solopreneurs-he" },
  ]
  const otherLinks = [
    { label: "CMO במיקור חוץ", href: "https://www.octaloom.com/fractional-cmo-he" },
    { label: "כלי AI וסוכנים", href: "https://www.octaloom.com/ai-tools-agents-he" },
    { label: "סדנאות", href: "https://www.octaloom.com/workshops-he" },
  ]
  const pageLinks = [
    { label: "עמוד הבית", href: "https://www.octaloom.com/" },
    { label: "אודות", href: "https://www.octaloom.com/about-he" },
    { label: "בלוג", href: "https://www.octaloom.com/blog-he" },
    { label: "צרו קשר", href: "https://www.octaloom.com/contact-he" },
  ]

  const socialIcons = [
    {
      href: "https://www.linkedin.com/in/hanita-yudovski/", label: "LinkedIn",
      icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    },
    {
      href: "https://www.instagram.com/hanita_Y", label: "Instagram",
      icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    },
    {
      href: "https://www.facebook.com/octaloom", label: "Facebook",
      icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    },
    {
      href: "https://www.youtube.com/@Hanita_Octaloom", label: "YouTube",
      icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>,
    },
    {
      href: "https://open.spotify.com/show/4XmsthqR7gnj4nf2gL0T7j", label: "Spotify",
      icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>,
    },
  ]

  const legalLinks = [
    { label: "פרטיות", href: "https://www.octaloom.com/privacy-policy-he" },
    { label: "תנאים", href: "https://www.octaloom.com/terms-of-service-he" },
    { label: "נגישות", href: "https://www.octaloom.com/accessibility-he" },
  ]

  return (
    <footer style={{
      padding: isMobile ? "32px 0 0" : "64px 0 0",
      background: NAVY, color: "rgba(255,255,255,0.7)", direction: "rtl", fontFamily: FONT,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 0.65fr 1fr 0.8fr 0.8fr 0.8fr",
          gap: isMobile ? "20px" : 24,
          paddingBottom: isMobile ? 24 : 48,
        }}>
          {/* Logo + tagline */}
          <div>
            <img
              src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png"
              alt="OctaLoom"
              style={{ height: isMobile ? 64 : 100, width: "auto", display: "block" }}
              onError={e => { (e.target as HTMLImageElement).style.display = "none" }}
            />
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 14, maxWidth: 240, lineHeight: 1.65, fontFamily: FONT }}>
              {"מחלקת השיווק שלך,"}<br/>{"רק בלי המחלקה."}
            </p>
          </div>

          {/* Pages — desktop only */}
          {!isMobile && (
            <div>
              <h4 style={headStyle}>{"עמודים"}</h4>
              {pageLinks.map((l, i) => (
                <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{l.label}</a>
              ))}
            </div>
          )}

          {/* LinkedIn services — desktop only */}
          {!isMobile && (
            <div>
              <h4 style={headStyle}>{"שירותי LinkedIn"}</h4>
              {serviceLinks.map((l, i) => (
                <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{l.label}</a>
              ))}
            </div>
          )}

          {/* Other services — desktop only */}
          {!isMobile && (
            <div>
              <h4 style={headStyle}>{"שירותים נוספים"}</h4>
              {otherLinks.map((l, i) => (
                <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{l.label}</a>
              ))}
            </div>
          )}

          {/* OctaGoodies — desktop only */}
          {!isMobile && (
            <div>
              <h4 style={{ ...headStyle, fontWeight: 300, fontSize: 12 }}>
                {"כלי שיווק"}<br/>{"חינמיים ותבניות"}
              </h4>
              <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "inline-block" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1" }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9" }}>
                <img
                  src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/OCTAGOODIES%20GREEN.png"
                  alt="OctaGoodies"
                  style={{ height: 44, width: "auto", display: "block", opacity: 0.9, transition: "opacity 0.2s" }}
                />
              </a>
            </div>
          )}

          {/* Social icons — always visible */}
          <div>
            {!isMobile && <h4 style={headStyle}>{"התחברו"}</h4>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {socialIcons.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = LIME }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "22px 0", borderTop: "1px solid rgba(255,255,255,0.1)",
          fontSize: 12, color: "rgba(255,255,255,.38)", flexWrap: "wrap", gap: 12, fontFamily: FONT,
        }}>
          <span>© 2026 OctaLoom</span>
          <div style={{ display: "flex", gap: 18 }}>
            {legalLinks.map((l, i) => (
              <a key={i} href={l.href} style={{ color: "rgba(255,255,255,.38)", textDecoration: "none", transition: "color 0.2s", fontFamily: FONT }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = LIME }}
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

// ═══════════════════════════════════════════════════════════════════════════════
// Default export — preview wrapper for Framer (shows both nav + footer)
// ═══════════════════════════════════════════════════════════════════════════════

export default function OctaLoomNavAndFooter() {
  useGlobalStyles()
  return (
    <div style={{ fontFamily: FONT, minHeight: "100vh", background: CREAM, display: "flex", flexDirection: "column" }}>
      <NavbarHE />
      {/* Spacer to push footer down in preview */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 120, paddingBottom: 80 }}>
        <p style={{ color: NAVY, opacity: 0.35, fontSize: 14, fontFamily: FONT }}>
          {"— "}
          {"תוכן הדף כאן"}
          {" —"}
        </p>
      </div>
      <Footer />
    </div>
  )
}
