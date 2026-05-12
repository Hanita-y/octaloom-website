// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const WEB3FORMS_KEY = "abe931a2-a849-4da6-b9d6-ce7dfddc09d9"
const NOTION_CALENDAR = "https://calendar.notion.so/meet/octaloom/discovery"

const C = {
  purple:     "#712eac",
  deepPurple: "#201e4b",
  lime:       "#c5e6a2",
  cream:      "#ece9e7",
  textDim:    "#5c5878",
  error:      "#ef4444",
}
const FF = "'DiscoveryFs', 'Discovery', 'Aeonik', sans-serif"

const T = {
  headline:     "בואו נבדוק אם\nיש בינינו התאמה.",
  sub:          "ממלאים את הטופס, קובעים פגישה\nאני והסוכנים שלי עוברים על הכל לפני.",
  warmPara:     "עולים לשיחה, בודקים אם יש התאמה. ומשם זה סיפור אהבה (אפלטוני כמובן, בכל זאת.. אני מקצועית).",
  toForm:       "בואו נתחיל",
  step1Title:   "קצת עליכם",
  step2Title:   "מה אתם צריכים?",
  step2Sub:     "אפשר לבחור יותר מאחד",
  step3Title:   "כדי שאבוא מוכנה לשיחה",
  name:         "שם מלא",
  company:      "שם החברה",
  email:        "אימייל",
  services: [
    "LinkedIn לארגונים",
    "LinkedIn למייסדים ומנכ״לים",
    "LinkedIn לעצמאיים",
    "סמנכלית שיווק במיקור חוץ",
    "כלי AI וסוכנים",
    "סדנאות",
    "עוד לא בטוח/ה",
  ],
  timelineLabel:"מתי מחפשים להתחיל?",
  timelines:    ["מידי", "1-3 חודשים", "סתם בודק/ת"],
  notesLabel:   "הוסיפו משהו שחשוב (אפשרי)",
  next:         "המשיכו",
  back:         "חזרה",
  send:         "שלחו",
  sending:      "שולח...",
  successTitle: "קיבלתי.",
  successSub:   "עכשיו קבעו שיחה קצרה:",
  bookBtn:      "קבעו שיחה עכשיו",
  trustLine:    "רק שיחה. אם יש התאמה, ממשיכים.",
  errRequired:  "נא למלא את כל השדות",
  errEmail:     "כתובת אימייל לא תקינה",
  errSelect:    "נא לבחור אפשרות",
  errSelectTL:  "נא לבחור מתי",
  errSend:      "שגיאה בשליחה, נסו שוב",
  altContact:   "מעדיפים ישיר?",
  altEmail:     "שלחו מייל",
  altLinkedIn:  "LinkedIn",
  subject:      "פנייה חדשה",
  from:         "מ",
}

function useWindowSize() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener("resize", h)
    return () => window.removeEventListener("resize", h)
  }, [])
  return w
}

function Container({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)", ...style }}>
      {children}
    </div>
  )
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function NavHE() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [linkedinOpen, setLinkedinOpen] = useState(false)
  const w = useWindowSize()
  const isMobile = w < 768
  const linkColor = "rgba(32,30,75,0.55)"

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = (isMobile && menuOpen) ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen, isMobile])

  const linkedinSub = [
    { label: "LinkedIn לארגונים", href: "/linkedin-for-organizations-he" },
    { label: "LinkedIn למייסדים ומנכ״לים", href: "/linkedin-for-executives-he" },
    { label: "LinkedIn לעצמאים", href: "/linkedin-for-solopreneurs-he" },
  ]
  const otherSub = [
    { label: "CMO במיקור חוץ", href: "/fractional-cmo-he" },
    { label: "כלי AI וסוכנים", href: "/ai-tools-agents-he" },
    { label: "סדנאות", href: "/workshops-he" },
  ]
  const navLinks = [
    { label: "אודות", href: "/about" },
    { label: "בלוג", href: "/blog" },
    { label: "צרו קשר", href: "/contact-he" },
    { label: "Goodies", href: "https://octagoodies.com" },
  ]

  const dropBase: React.CSSProperties = {
    position: "absolute", background: "#fff", borderRadius: 12, padding: "8px 6px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(32,30,75,0.08)",
    minWidth: 200, zIndex: 50,
  }
  const dropItemStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 6, padding: "8px 12px",
    fontSize: 13, color: C.deepPurple, borderRadius: 8, transition: "background 0.15s",
    textDecoration: "none", fontFamily: FF, whiteSpace: "nowrap" as const,
  }
  const hoverDrop = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    e.currentTarget.style.background = enter ? "rgba(113,46,172,0.05)" : "transparent"
  }

  const hamburger = (
    <button onClick={() => setMenuOpen(!menuOpen)} aria-label="menu"
      style={{ background: "none", border: "none", cursor: "pointer", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ position: "relative", display: "block", width: 28, height: 20 }}>
        {[0,9,18].map((top,i) => (
          <span key={i} style={{ position: "absolute", left: 0, width: "100%", height: 2,
            background: C.deepPurple, borderRadius: 2, top,
            transform: menuOpen && i===0 ? "rotate(45deg) translateY(9px)" : menuOpen && i===1 ? "scaleX(0)" : menuOpen && i===2 ? "rotate(-45deg) translateY(-9px)" : "none",
            opacity: menuOpen && i===1 ? 0 : 1, transition: "all 0.3s" }}/>
        ))}
      </span>
    </button>
  )

  const desktopDropdown = (
    <div style={{ position: "relative" }}
      onMouseEnter={() => setServicesOpen(true)}
      onMouseLeave={() => { setServicesOpen(false); setLinkedinOpen(false) }}>
      <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14,
        color: servicesOpen ? C.deepPurple : linkColor, fontFamily: FF,
        display: "flex", alignItems: "center", gap: 5, padding: "6px 0", transition: "color 0.25s" }}>
        {"שירותים"}
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
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
              <a href="https://www.octaloom.com/linkedin-growth-engine-he"
                style={{ ...dropItemStyle, justifyContent: "space-between" }}
                onMouseEnter={e => hoverDrop(e, true)} onMouseLeave={e => hoverDrop(e, false)}>
                <span>{"מנוע צמיחה LinkedIn"}</span>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.45, transform: "scaleX(-1)" }}>
                  <path d="M4 2l4 4-4 4" stroke={C.deepPurple} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <AnimatePresence>
                {linkedinOpen && (
                  <motion.div initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    style={{ ...dropBase, top: 0, right: "calc(100% + 6px)" }}>
                    {linkedinSub.map((sub, i) => (
                      <a key={i} href={sub.href} style={dropItemStyle}
                        onMouseEnter={e => hoverDrop(e, true)} onMouseLeave={e => hoverDrop(e, false)}>
                        {sub.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {otherSub.map((svc, i) => (
              <a key={i} href={svc.href} style={dropItemStyle}
                onMouseEnter={e => hoverDrop(e, true)} onMouseLeave={e => hoverDrop(e, false)}>
                {svc.label}
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
      background: "#fff", borderRadius: 16,
      padding: "20px 32px 32px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      direction: "rtl", zIndex: 50, maxHeight: "calc(100vh - 100px)", overflowY: "auto" as const,
    }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: C.purple, margin: "0 0 4px", fontFamily: FF }}>{"שירותים"}</p>
      <a href="https://www.octaloom.com/linkedin-growth-engine-he" onClick={() => setMenuOpen(false)}
        style={{ display: "block", fontSize: 20, color: C.deepPurple, textDecoration: "none", padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: FF }}>
        {"מנוע צמיחה LinkedIn"}
      </a>
      {linkedinSub.map((sub, i) => (
        <a key={i} href={sub.href} onClick={() => setMenuOpen(false)}
          style={{ display: "block", fontSize: 15, color: C.purple, textDecoration: "none", padding: "7px 0 7px 20px", borderBottom: "1px solid rgba(113,46,172,0.05)", fontFamily: FF }}>
          {sub.label}
        </a>
      ))}
      {otherSub.map((svc, i) => (
        <a key={i} href={svc.href} onClick={() => setMenuOpen(false)}
          style={{ display: "block", fontSize: 20, color: C.deepPurple, textDecoration: "none", padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: FF }}>
          {svc.label}
        </a>
      ))}
      {navLinks.map((item, i) => (
        <a key={i} href={item.href} onClick={() => setMenuOpen(false)}
          style={{ display: "block", fontSize: 20, color: C.deepPurple, textDecoration: "none", padding: "11px 0", fontWeight: 500, borderBottom: i < navLinks.length - 1 ? "1px solid rgba(113,46,172,0.08)" : "none", fontFamily: FF }}>
          {item.label}
        </a>
      ))}
      <div style={{ marginTop: 16 }}>
        <a href="/contact" style={{ fontSize: 14, color: linkColor, fontFamily: FF, textDecoration: "none" }}>EN</a>
      </div>
    </div>
  )

  return (
    <nav dir="rtl" style={{
      position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 1000,
      width: "calc(100% - 48px)", maxWidth: 1152, borderRadius: 100,
      background: scrolled ? "rgba(236,233,231,0.88)" : "rgba(236,233,231,0.6)",
      backdropFilter: "blur(50px)", WebkitBackdropFilter: "blur(50px)",
      border: "1px solid rgba(32,30,75,0.08)", padding: "10px 20px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontFamily: FF, transition: "background 0.3s, box-shadow 0.3s",
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
    }}>
      <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/logo%20nav%20bar.png"
          alt="OctaLoom" style={{ height: 36, width: "auto", display: "block" }}/>
      </a>
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 28, direction: "rtl" }}>
          {desktopDropdown}
          {navLinks.map((item, i) => (
            <a key={i} href={item.href}
              style={{ fontSize: 14, color: linkColor, textDecoration: "none", fontFamily: FF, transition: "color 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.color = C.deepPurple }}
              onMouseLeave={e => { e.currentTarget.style.color = linkColor }}>
              {item.label}
            </a>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <a href="/contact" style={{ fontSize: 13, fontWeight: 700, color: linkColor, fontFamily: FF, textDecoration: "none", padding: "5px 10px" }}>EN</a>
        {isMobile && hamburger}
      </div>
      {isMobile && menuOpen && mobileMenu}
    </nav>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function FooterHE() {
  const w = useWindowSize()
  const isMobile = w < 768
  const linkStyle: React.CSSProperties = { fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s", display: "block", lineHeight: "1.9", fontFamily: FF }
  const headStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: C.cream, margin: "0 0 14px", fontFamily: FF }
  const hover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => { e.currentTarget.style.color = enter ? C.lime : "rgba(255,255,255,0.5)" }

  const serviceLinks = [
    { label: "LinkedIn לארגונים", href: "/linkedin-for-organizations-he" },
    { label: "LinkedIn למייסדים ומנכ״לים", href: "/linkedin-for-executives-he" },
    { label: "LinkedIn לעצמאים", href: "/linkedin-for-solopreneurs-he" },
  ]
  const otherLinks = [
    { label: "CMO במיקור חוץ", href: "/fractional-cmo-he" },
    { label: "כלי AI וסוכנים", href: "/ai-tools-agents-he" },
    { label: "סדנאות", href: "/workshops-he" },
  ]
  const pageLinks = [
    { label: "עמוד הבית", href: "/" },
    { label: "אודות", href: "/about" },
    { label: "בלוג", href: "/blog" },
    { label: "צרו קשר", href: "/contact-he" },
  ]
  const legalLinks = [
    { label: "פרטיות", href: "/privacy-policy" },
    { label: "תנאים", href: "/terms" },
    { label: "נגישות", href: "/accessibility" },
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
            <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png"
              alt="OctaLoom" style={{ height: isMobile ? 64 : 100, width: "auto", display: "block" }}/>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 14, maxWidth: 240, lineHeight: 1.65, fontFamily: FF }}>
              {"מחלקת השיווק שלך,"}<br/>{"רק בלי המחלקה."}
            </p>
          </div>
          {!isMobile && <div>
            <h4 style={headStyle}>{"עמודים"}</h4>
            {pageLinks.map((l, i) => (
              <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{l.label}</a>
            ))}
          </div>}
          {!isMobile && <div>
            <h4 style={headStyle}>{"שירותי LinkedIn"}</h4>
            {serviceLinks.map((l, i) => (
              <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{l.label}</a>
            ))}
          </div>}
          {!isMobile && <div>
            <h4 style={headStyle}>{"שירותים נוספים"}</h4>
            {otherLinks.map((l, i) => (
              <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{l.label}</a>
            ))}
          </div>}
          {!isMobile && <div>
            <h4 style={{ ...headStyle, fontWeight: 300, fontSize: 12 }}>
              {"כלי שיווק"}<br/>{"חינמיים ותבניות"}
            </h4>
            <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "inline-block", opacity: 0.9 }}>
              <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/OCTAGOODIES%20GREEN.png"
                alt="OctaGoodies" style={{ height: 44, width: "auto", display: "block" }}/>
            </a>
          </div>}
          <div>
            {!isMobile && <h4 style={headStyle}>{"התחברו"}</h4>}
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
          <span>&#169; 2026 OctaLoom</span>
          <div style={{ display: "flex", gap: 18 }}>
            {legalLinks.map((l, i) => (
              <a key={i} href={l.href} style={{ color: "rgba(255,255,255,.38)", textDecoration: "none", transition: "color 0.2s", fontFamily: FF }}
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

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ContactPageHE() {
  const [step, setStep]         = useState(1)
  const [name, setName]         = useState("")
  const [company, setCompany]   = useState("")
  const [email, setEmail]       = useState("")
  const [service, setService]   = useState("")
  const [timeline, setTimeline] = useState("")
  const [notes, setNotes]       = useState("")
  const [status, setStatus]     = useState("idle")
  const [errMsg, setErrMsg]     = useState("")
  const w = useWindowSize()
  const isMobile = w < 768

  const nextStep1 = () => {
    if (!name.trim() || !company.trim() || !email.trim()) { setErrMsg(T.errRequired); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErrMsg(T.errEmail); return }
    setErrMsg(""); setStep(2)
  }
  const nextStep2 = () => {
    if (!service) { setErrMsg(T.errSelect); return }
    setErrMsg(""); setStep(3)
  }
  const submit = async () => {
    if (!timeline) { setErrMsg(T.errSelectTL); return }
    setErrMsg(""); setStatus("loading")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${T.subject}: ${name} ${T.from} ${company}`,
          from_name: "OctaLoom Contact Page HE",
          name, email, company, service, timeline,
          notes: notes || "(none)",
        }),
      })
      const data = await res.json()
      if (data.success) setStatus("success")
      else { setErrMsg(T.errSend); setStatus("error") }
    } catch {
      setErrMsg(T.errSend); setStatus("error")
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 16px", borderRadius: 10,
    border: "1px solid rgba(32,30,75,0.14)", fontSize: 15, fontFamily: FF,
    outline: "none", boxSizing: "border-box" as const, direction: "rtl",
    background: "white", color: C.deepPurple, transition: "border 0.2s, box-shadow 0.2s",
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 500, color: C.textDim,
    marginBottom: 7, display: "block", fontFamily: FF, textAlign: "right",
  }
  const focusField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.border = `1px solid ${C.purple}`
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(113,46,172,0.08)"
  }
  const blurField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.border = "1px solid rgba(32,30,75,0.14)"
    e.currentTarget.style.boxShadow = "none"
  }

  return (
    <div style={{ width: "100vw", overflowX: "hidden", background: C.cream, minHeight: "100vh" }}>
      <NavHE />

      {/* HERO */}
      <section style={{ position: "relative", paddingTop: isMobile ? 120 : 160, paddingBottom: isMobile ? 64 : 96, background: C.cream, overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: isMobile ? -80 : -120, left: isMobile ? -80 : -60,
          width: isMobile ? 320 : 520, height: isMobile ? 320 : 520,
          borderRadius: "50%", border: "1.5px solid rgba(113,46,172,0.1)", pointerEvents: "none",
        }} />
        <Container>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", maxWidth: 720, direction: "rtl", textAlign: "right", width: "100%" }}>
            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              style={{
                fontFamily: FF, fontWeight: 500,
                fontSize: `clamp(${isMobile ? "36px" : "48px"}, 6vw, 72px)`,
                color: C.purple, lineHeight: 1.15, margin: "0 0 28px",
                direction: "rtl", width: "100%", textAlign: "right", whiteSpace: "pre-line",
              }}>
              {T.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{
                fontSize: isMobile ? 17 : 20, fontFamily: FF, color: C.deepPurple,
                maxWidth: 560, margin: "0 0 16px", lineHeight: 1.75, direction: "rtl",
                fontWeight: 400, textAlign: "right", width: "100%", whiteSpace: "pre-line",
              }}>
              {T.sub}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              style={{
                fontSize: isMobile ? 15 : 17, fontFamily: FF, color: C.textDim,
                maxWidth: 480, margin: "0 0 44px", lineHeight: 1.75, direction: "rtl",
                textAlign: "right", width: "100%",
              }}>
              {T.warmPara}
            </motion.p>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <motion.a href="#contact-form"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "13px 28px", borderRadius: 50,
                  background: C.purple, color: "white",
                  fontSize: 15, fontFamily: FF, fontWeight: 700,
                  textDecoration: "none", transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                {T.toForm}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12l7 7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </div>
          </div>
        </Container>
      </section>

      <div style={{ height: 1, background: "rgba(113,46,172,0.08)", margin: "0 clamp(20px,6vw,80px)" }} />

      {/* FORM SECTION */}
      <section id="contact-form" style={{ background: C.lime, padding: isMobile ? "60px 0 80px" : "80px 0 120px" }}>
        <Container>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: 660 }}>
              <motion.div
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                style={{
                  width: "100%", background: C.cream, borderRadius: 20,
                  border: "1px solid rgba(113,46,172,0.15)",
                  padding: isMobile ? "28px 20px" : "48px 48px",
                  boxShadow: "0 0 0 1px rgba(113,46,172,0.1), 0 8px 60px rgba(113,46,172,0.22), 0 2px 16px rgba(0,0,0,0.04)",
                }}>

                {/* Step indicators */}
                {status !== "success" && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 40, gap: 0, direction: "ltr" }}>
                    {[1,2,3].map((s, i) => (
                      <React.Fragment key={s}>
                        <div style={{
                          width: 34, height: 34, borderRadius: "50%",
                          border: `2px solid ${step >= s ? C.purple : "rgba(32,30,75,0.12)"}`,
                          background: step >= s ? C.purple : "white",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.3s", flexShrink: 0,
                        }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: step >= s ? "white" : C.textDim, fontFamily: "'Aeonik', sans-serif" }}>{s}</span>
                        </div>
                        {i < 2 && <div style={{ flex: 1, height: 1, maxWidth: 80, background: step > s ? C.purple : "rgba(32,30,75,0.1)", transition: "background 0.4s" }} />}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* SUCCESS */}
                {status === "success" && (
                  <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                    style={{ textAlign: "center", padding: isMobile ? "20px 0" : "32px 0", direction: "rtl" }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      style={{ width: 68, height: 68, borderRadius: "50%", background: "rgba(197,230,162,0.15)", border: `2px solid ${C.lime}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke={C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <h2 style={{ fontFamily: FF, fontWeight: 500, fontSize: isMobile ? 24 : 28, color: C.deepPurple, margin: "0 0 10px" }}>{T.successTitle}</h2>
                    <p style={{ fontFamily: FF, fontSize: 16, color: C.textDim, maxWidth: 380, margin: "0 auto 32px", lineHeight: 1.75 }}>{T.successSub}</p>
                    <a href={NOTION_CALENDAR} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 32px", borderRadius: 50, background: C.lime, color: "#060d3d", fontFamily: FF, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
                      {T.bookBtn} {"←"}
                    </a>
                  </motion.div>
                )}

                <AnimatePresence mode="wait">
                  {/* STEP 1 */}
                  {status !== "success" && step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                      style={{ direction: "rtl" }}>
                      <h2 style={{ fontFamily: FF, fontWeight: 500, fontSize: isMobile ? 21 : 24, color: C.deepPurple, margin: "0 0 22px" }}>{T.step1Title}</h2>
                      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div><label style={labelStyle}>{T.name}</label><input value={name} onChange={e => setName(e.target.value)} style={inputStyle} onFocus={focusField} onBlur={blurField} /></div>
                        <div><label style={labelStyle}>{T.company}</label><input value={company} onChange={e => setCompany(e.target.value)} style={inputStyle} onFocus={focusField} onBlur={blurField} /></div>
                        <div><label style={labelStyle}>{T.email}</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} onFocus={focusField} onBlur={blurField} /></div>
                      </div>
                      {errMsg && <p style={{ color: C.error, fontSize: 13, margin: "12px 0 0", fontFamily: FF }}>{errMsg}</p>}
                      <div style={{ marginTop: 26 }}>
                        <button onClick={nextStep1} style={{ padding: "13px 36px", borderRadius: 50, border: "none", background: C.purple, color: "white", fontFamily: FF, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                          {T.next} {"←"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2 */}
                  {status !== "success" && step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                      style={{ direction: "rtl" }}>
                      <h2 style={{ fontFamily: FF, fontWeight: 500, fontSize: isMobile ? 21 : 24, color: C.deepPurple, margin: "0 0 4px" }}>{T.step2Title}</h2>
                      <p style={{ fontSize: 13, color: C.textDim, fontFamily: FF, margin: "0 0 20px" }}>{T.step2Sub}</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {T.services.map((s: string, i: number) => (
                          <button key={i} onClick={() => setService(s)} style={{
                            padding: "12px 16px", borderRadius: 10, textAlign: "right",
                            border: `1.5px solid ${service === s ? C.purple : "rgba(32,30,75,0.1)"}`,
                            background: service === s ? "rgba(113,46,172,0.05)" : "white",
                            color: service === s ? C.deepPurple : C.textDim,
                            fontWeight: service === s ? 600 : 400,
                            cursor: "pointer", fontSize: 15, fontFamily: FF, transition: "all 0.15s",
                          }}>{s}</button>
                        ))}
                      </div>
                      {errMsg && <p style={{ color: C.error, fontSize: 13, margin: "12px 0 0", fontFamily: FF }}>{errMsg}</p>}
                      <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
                        <button onClick={() => { setErrMsg(""); setStep(1) }} style={{ flex: 1, padding: "13px", borderRadius: 50, border: "1px solid rgba(32,30,75,0.12)", background: "transparent", color: C.textDim, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: FF }}>{T.back}</button>
                        <button onClick={nextStep2} style={{ flex: 2, padding: "13px", borderRadius: 50, border: "none", background: C.purple, color: "white", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: FF }}>{T.next} {"←"}</button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3 */}
                  {status !== "success" && step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                      style={{ direction: "rtl" }}>
                      <h2 style={{ fontFamily: FF, fontWeight: 500, fontSize: isMobile ? 21 : 24, color: C.deepPurple, margin: "0 0 22px" }}>{T.step3Title}</h2>
                      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        <div>
                          <label style={labelStyle}>{T.timelineLabel}</label>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                            {T.timelines.map((tl: string) => (
                              <button key={tl} onClick={() => setTimeline(tl)} style={{
                                flex: 1, minWidth: 90, padding: "11px 8px", borderRadius: 10, fontSize: 14,
                                border: `1.5px solid ${timeline === tl ? C.purple : "rgba(32,30,75,0.1)"}`,
                                background: timeline === tl ? "rgba(113,46,172,0.05)" : "white",
                                color: timeline === tl ? C.deepPurple : C.textDim,
                                fontWeight: timeline === tl ? 700 : 400,
                                cursor: "pointer", fontFamily: FF, transition: "all 0.15s",
                              }}>{tl}</button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label style={labelStyle}>{T.notesLabel}</label>
                          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4}
                            style={{ ...inputStyle, resize: "vertical" as const, fontFamily: FF }}
                            onFocus={focusField} onBlur={blurField} />
                        </div>
                      </div>
                      {errMsg && <p style={{ color: C.error, fontSize: 13, margin: "12px 0 0", fontFamily: FF }}>{errMsg}</p>}
                      <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
                        <button onClick={() => { setErrMsg(""); setStep(2) }} style={{ flex: 1, padding: "13px", borderRadius: 50, border: "1px solid rgba(32,30,75,0.12)", background: "transparent", color: C.textDim, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: FF }}>{T.back}</button>
                        <button onClick={submit} disabled={status === "loading"} style={{ flex: 2, padding: "13px", borderRadius: 50, border: "none", background: C.lime, color: "#060d3d", fontWeight: 700, fontSize: 15, cursor: status === "loading" ? "wait" : "pointer", fontFamily: FF, opacity: status === "loading" ? 0.7 : 1 }}>{status === "loading" ? T.sending : T.send}</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {status !== "success" && (
                  <p style={{ fontSize: 12, color: "rgba(32,30,75,0.28)", textAlign: "center", margin: "24px 0 0", fontFamily: FF }}>{T.trustLine}</p>
                )}
              </motion.div>

              {/* Alt contact */}
              <div style={{ marginTop: 48, textAlign: "center", direction: "rtl" }}>
                <p style={{ fontSize: 14, color: C.textDim, fontFamily: FF, marginBottom: 16, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{T.altContact}</p>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: isMobile ? 12 : 20, flexWrap: "wrap" as const }}>
                  <a href="mailto:Hanita@octaloom.com"
                    style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 50, border: "1px solid rgba(32,30,75,0.14)", color: C.deepPurple, textDecoration: "none", fontFamily: FF, fontSize: 14, fontWeight: 500, transition: "all 0.2s", background: "transparent" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.purple; e.currentTarget.style.color = C.purple }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(32,30,75,0.14)"; e.currentTarget.style.color = C.deepPurple }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    {T.altEmail}
                  </a>
                  <a href="https://www.linkedin.com/in/hanita-yudovski/" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 50, border: "1px solid rgba(32,30,75,0.14)", color: C.deepPurple, textDecoration: "none", fontFamily: FF, fontSize: 14, fontWeight: 500, transition: "all 0.2s", background: "transparent" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.purple; e.currentTarget.style.color = C.purple }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(32,30,75,0.14)"; e.currentTarget.style.color = C.deepPurple }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    {T.altLinkedIn}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FooterHE />
    </div>
  )
}
