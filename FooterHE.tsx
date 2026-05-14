// @ts-nocheck
// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

/**
 * OctaLoom — Footer HE (standalone Framer code component)
 * ───────────────────────────────────────────────────────
 * Hebrew pages — RTL, all slugs end with -he.
 * Mobile pattern: hide link columns, show only logo + socials + legal.
 *
 * Use: stack NavHE → [your content] → FooterHE on Hebrew legal pages.
 * Split from OctaLoomNavAndFooter.tsx (source of truth) — no design changes.
 */

import * as React from "react"

const { useState, useEffect } = React

// ─── SHARED UTILITIES ───────────────────────────────────────────────────────
const CREAM = "#ece9e7"
const NAVY = "#201e4b"
const LIME = "#c6e1a5"
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

// ─── FOOTER HE ──────────────────────────────────────────────────────────────

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

// ─── DEFAULT EXPORT ─────────────────────────────────────────────────────────

export default function FooterHE() {
  useGlobalStyles()
  return <Footer />
}
