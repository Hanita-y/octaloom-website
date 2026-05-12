// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const WEB3FORMS_KEY = "abe931a2-a849-4da6-b9d6-ce7dfddc09d9"
const NOTION_CALENDAR = "https://calendar.notion.so/meet/octaloom/discovery"

const C = {
  purple:     "#712eac",
  deepPurple: "#201e4b",
  navy:       "#060d3d",
  lime:       "#c5e6a2",
  cream:      "#ece9e7",
  textDim:    "#5c5878",
  error:      "#ef4444",
}
const F = {
  display: "'DiscoveryFs', 'Discovery', 'Aeonik', sans-serif",
  body:    "'Aeonik', sans-serif",
}

// ─── COPY (no em dashes) ──────────────────────────────────────────────────────
const CP: Record<string, any> = {
  he: {
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
    errConsent:   "נא אשרו את ההסכמה",
    errSend:      "שגיאה בשליחה, נסו שוב",
    consent:      "אשמח לקבל עדכונים מ-OctaLoom, בלי ספאם",
    altContact:   "מעדיפים ישיר?",
    altEmail:     "שלחו מייל",
    altLinkedIn:  "LinkedIn",
    altBook:      "קבעו שיחה ישירות, בלי טופס",
    quoteText:    "חשבתי שעוד סוכנות. זה לא היה כך.",
    quoteAuthor:  "מייסד B2B SaaS, 15 עובדים",
    subject:      "פנייה חדשה",
    from:         "מ",
    navCta:       "בואו נדבר",
    services_lbl: "שירותים",
  },
  en: {
    headline:     "Let's See If\nThere's a Fit.",
    sub:          "Fill out the form, book a meeting\nMy agents and I review everything beforehand.",
    warmPara:     "We get on the call, see if there's a fit. And from there it's a love story (platonic of course, I'm a professional).",
    toForm:       "Let's Start",
    step1Title:   "A bit about you",
    step2Title:   "What do you need?",
    step2Sub:     "You can select more than one",
    step3Title:   "So I come prepared",
    name:         "Full name",
    company:      "Company name",
    email:        "Email",
    services: [
      "LinkedIn for Organizations",
      "LinkedIn for Founders & CEOs",
      "LinkedIn for Freelancers",
      "Fractional CMO",
      "AI Tools & Agents",
      "Workshops",
      "Not sure yet",
    ],
    timelineLabel:"When are you looking to start?",
    timelines:    ["Immediately", "1-3 months", "Just exploring"],
    notesLabel:   "Anything we should know (optional)",
    next:         "Continue",
    back:         "Back",
    send:         "Send",
    sending:      "Sending...",
    successTitle: "Got it.",
    successSub:   "I'll read it and get back to you within 24 hours. Or book a time right now:",
    bookBtn:      "Book a call now",
    trustLine:    "Just a conversation. No hard pitch.",
    errRequired:  "Please fill in all fields",
    errEmail:     "Invalid email address",
    errSelect:    "Please select an option",
    errSelectTL:  "Please select a timeline",
    errConsent:   "Please accept the consent",
    errSend:      "Send failed, please try again",
    consent:      "Happy to receive updates from OctaLoom. No spam.",
    altContact:   "Prefer direct?",
    altEmail:     "Send an email",
    altLinkedIn:  "LinkedIn",
    altBook:      "Book directly, no form",
    quoteText:    "I thought it would be another agency. It wasn't.",
    quoteAuthor:  "B2B SaaS founder, 15 employees",
    subject:      "New inquiry",
    from:         "from",
    navCta:       "Let's Talk",
    services_lbl: "Services",
  },
}

// ─── LANGUAGE ─────────────────────────────────────────────────────────────────
const LangCtx = createContext<{ lang: string; setLang: (l: string) => void }>({ lang: "he", setLang: () => {} })
const useLang = () => useContext(LangCtx)

function useLangState(): [string, (l: string) => void] {
  const [lang, setL] = useState<string>(() => {
    if (typeof window === "undefined") return "he"
    const saved = localStorage.getItem("octaloom-lang")
    if (saved) return saved
    return document.documentElement.lang === "en" ? "en" : "he"
  })
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
function ContactNav() {
  const { lang, setLang } = useLang()
  const isHE = lang === "he"
  const ff = isHE ? F.display : F.body
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [linkedinOpen, setLinkedinOpen] = useState(false)
  const w = useWindowSize()
  const isMobile = w < 768

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = (isMobile && menuOpen) ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen, isMobile])

  const linkedinSub = isHE ? [
    { label: "LinkedIn לארגונים", href: "/linkedin-for-organizations-he" },
    { label: "LinkedIn למייסדים ומנכ״לים", href: "/linkedin-for-executives-he" },
    { label: "LinkedIn לעצמאים", href: "/linkedin-for-solopreneurs-he" },
  ] : [
    { label: "LinkedIn for Organizations", href: "/linkedin-for-organizations" },
    { label: "LinkedIn for Executives",    href: "/linkedin-for-executives" },
    { label: "LinkedIn for Solopreneurs",  href: "/linkedin-for-solopreneurs" },
  ]
  const otherSub = isHE ? [
    { label: "CMO במיקור חוץ", href: "/fractional-cmo-he" },
    { label: "כלי AI וסוכנים", href: "/ai-tools-agents-he" },
    { label: "סדנאות", href: "/workshops-he" },
  ] : [
    { label: "Fractional CMO",    href: "/fractional-cmo" },
    { label: "AI Tools & Agents", href: "/ai-tools-agents" },
    { label: "Workshops",         href: "/workshops" },
  ]
  const navLinks = isHE ? [
    { label: "אודות", href: "/about" },
    { label: "בלוג", href: "/blog" },
    { label: "צרו קשר", href: "/contact" },
    { label: "Goodies", href: "https://octagoodies.com" },
  ] : [
    { label: "About",   href: "/about" },
    { label: "Blog",    href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Goodies", href: "https://octagoodies.com" },
  ]
  const servicesLabel = isHE ? "שירותים" : "Services"
  const linkedinParent = isHE ? "מנוע צמיחה LinkedIn" : "LinkedIn Growth Engine"
  const linkedinHref = isHE ? "https://www.octaloom.com/linkedin-growth-engine-he" : "/linkedin-growth-engine"
  const ctaLabel = isHE ? "קביעת שיחה" : "Book a Call"
  const linkColor = "rgba(32,30,75,0.55)"

  const dropBase: React.CSSProperties = {
    position: "absolute", background: "#fff", borderRadius: 12, padding: "8px 6px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(32,30,75,0.08)",
    minWidth: 200, zIndex: 50,
  }
  const dropItemStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 6, padding: "8px 12px",
    fontSize: 13, color: C.deepPurple, borderRadius: 8, transition: "background 0.15s",
    textDecoration: "none", fontFamily: ff, whiteSpace: "nowrap" as const,
  }
  const hoverDrop = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    e.currentTarget.style.background = enter ? "rgba(113,46,172,0.05)" : "transparent"
  }
  const hoverLink = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    e.currentTarget.style.color = enter ? C.deepPurple : linkColor
  }
  const langToggle = (
    <div style={{ display: "flex", gap: 2, background: "rgba(113,46,172,0.06)", borderRadius: 6, padding: 2 }}>
      {["he","en"].map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          background: lang === l ? C.purple : "none", color: lang === l ? "white" : linkColor,
          border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700,
          padding: "5px 10px", borderRadius: 4, transition: "all 0.25s", fontFamily: ff,
        }}>{l === "en" ? "EN" : "עב"}</button>
      ))}
    </div>
  )
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
  const mobileMenu = (mobileDir: "rtl" | "ltr", isAbsolute: boolean) => (
    <div style={{
      position: isAbsolute ? "absolute" as const : "relative" as const,
      top: isAbsolute ? "calc(100% + 8px)" : undefined,
      right: isAbsolute ? 0 : undefined, left: isAbsolute ? 0 : undefined,
      background: "#fff", borderRadius: isAbsolute ? 16 : 0,
      padding: "20px 32px 32px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      direction: mobileDir, zIndex: 50, maxHeight: "calc(100vh - 100px)", overflowY: "auto" as const,
    }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: C.purple, margin: "0 0 4px", fontFamily: ff }}>{servicesLabel}</p>
      <a href={linkedinHref} onClick={() => setMenuOpen(false)}
        style={{ display: "block", fontSize: 20, color: C.deepPurple, textDecoration: "none", padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: ff }}>
        {linkedinParent}
      </a>
      {linkedinSub.map((sub, i) => (
        <a key={i} href={sub.href} onClick={() => setMenuOpen(false)}
          style={{ display: "block", fontSize: 15, color: C.purple, textDecoration: "none", padding: "7px 0 7px 20px", borderBottom: "1px solid rgba(113,46,172,0.05)", fontFamily: ff }}>
          {sub.label}
        </a>
      ))}
      {otherSub.map((svc, i) => (
        <a key={i} href={svc.href} onClick={() => setMenuOpen(false)}
          style={{ display: "block", fontSize: 20, color: C.deepPurple, textDecoration: "none", padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: ff }}>
          {svc.label}
        </a>
      ))}
      {navLinks.map((item, i) => (
        <a key={i} href={item.href} onClick={() => setMenuOpen(false)}
          style={{ display: "block", fontSize: 20, color: C.deepPurple, textDecoration: "none", padding: "11px 0", fontWeight: 500, borderBottom: i < navLinks.length - 1 ? "1px solid rgba(113,46,172,0.08)" : "none", fontFamily: ff }}>
          {item.label}
        </a>
      ))}
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {["he","en"].map(l => (
          <button key={l} onClick={() => setLang(l)}
            style={{ background: lang === l ? C.purple : "transparent", color: lang === l ? "white" : linkColor,
              border: `1.5px solid ${lang === l ? C.purple : "rgba(32,30,75,0.2)"}`,
              borderRadius: 8, padding: "9px 20px", cursor: "pointer", fontFamily: ff, fontWeight: 700, fontSize: 14 }}>
            {l === "en" ? "EN" : "עברית"}
          </button>
        ))}
      </div>
    </div>
  )
  const desktopDropdown = (
    <div style={{ position: "relative" }}
      onMouseEnter={() => setServicesOpen(true)}
      onMouseLeave={() => { setServicesOpen(false); setLinkedinOpen(false) }}>
      <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14,
        color: servicesOpen ? C.deepPurple : linkColor, fontFamily: ff,
        display: "flex", alignItems: "center", gap: 5, padding: "6px 0", transition: "color 0.25s" }}>
        {servicesLabel}
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
          style={{ transition: "transform 0.25s", transform: servicesOpen ? "rotate(180deg)" : "none" }}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <AnimatePresence>
        {servicesOpen && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            style={{ ...dropBase, top: "calc(100% + 10px)", [isHE ? "right" : "left"]: 0 }}>
            <div style={{ position: "relative" }}
              onMouseEnter={() => setLinkedinOpen(true)}
              onMouseLeave={() => setLinkedinOpen(false)}>
              <a href={linkedinHref} style={{ ...dropItemStyle, justifyContent: "space-between" }}
                onMouseEnter={e => hoverDrop(e, true)} onMouseLeave={e => hoverDrop(e, false)}>
                <span>{linkedinParent}</span>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.45, transform: isHE ? "scaleX(-1)" : "none" }}>
                  <path d="M4 2l4 4-4 4" stroke={C.deepPurple} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <AnimatePresence>
                {linkedinOpen && (
                  <motion.div initial={{ opacity: 0, x: isHE ? 6 : -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    style={{ ...dropBase, top: 0, [isHE ? "right" : "left"]: "calc(100% + 6px)" }}>
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

  if (isHE) {
    return (
      <nav dir="rtl" style={{
        position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 1000,
        width: "calc(100% - 48px)", maxWidth: 1152, borderRadius: 100,
        background: scrolled ? "rgba(236,233,231,0.88)" : "rgba(236,233,231,0.6)",
        backdropFilter: "blur(50px)", WebkitBackdropFilter: "blur(50px)",
        border: "1px solid rgba(32,30,75,0.08)", padding: "10px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontFamily: ff, transition: "background 0.3s, box-shadow 0.3s",
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
                style={{ fontSize: 14, color: linkColor, textDecoration: "none", fontFamily: ff, transition: "color 0.25s" }}
                onMouseEnter={e => hoverLink(e, true)} onMouseLeave={e => hoverLink(e, false)}>
                {item.label}
              </a>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {langToggle}
          {isMobile && hamburger}
        </div>
        {isMobile && menuOpen && mobileMenu("rtl", true)}
      </nav>
    )
  }

  // EN: full-width bar
  const enNavStyle: React.CSSProperties = isMobile && menuOpen
    ? { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: C.cream, overflowY: "auto", display: "flex", flexDirection: "column", zIndex: 100 }
    : { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? "10px 0" : "16px 0",
        transition: "all 0.4s", background: scrolled ? "rgba(236,233,231,0.92)" : "rgba(255,255,255,0.02)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: scrolled ? "1px solid rgba(113,46,172,0.1)" : "none",
        boxShadow: scrolled ? "0 1px 24px rgba(32,30,75,0.07)" : "none" }
  return (
    <nav dir="ltr" style={enNavStyle}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: isMobile && menuOpen ? "14px clamp(20px,4vw,48px)" : "0 clamp(20px,4vw,48px)",
        display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 16,
        borderBottom: isMobile && menuOpen ? "1px solid rgba(113,46,172,0.1)" : "none",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/logo%20nav%20bar.png"
            alt="OctaLoom" style={{ height: 36, width: "auto", display: "block" }}/>
        </a>
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28 }}>
            {desktopDropdown}
            {navLinks.map((item, i) => (
              <a key={i} href={item.href}
                style={{ fontSize: 14, color: linkColor, textDecoration: "none", fontFamily: ff, transition: "color 0.25s" }}
                onMouseEnter={e => hoverLink(e, true)} onMouseLeave={e => hoverLink(e, false)}>
                {item.label}
              </a>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "flex-end" }}>
          {langToggle}
          {isMobile && hamburger}
        </div>
      </div>
      {isMobile && menuOpen && mobileMenu("ltr", false)}
    </nav>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function ContactFooter() {
  const { lang } = useLang()
  const isHE = lang === "he"
  const ff = isHE ? F.display : F.body
  const dir = isHE ? "rtl" : "ltr"
  const w = useWindowSize()
  const isMobile = w < 768

  const linkStyle: React.CSSProperties = { fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s", display: "block", lineHeight: "1.9", fontFamily: ff }
  const headStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: C.cream, margin: "0 0 14px", fontFamily: ff }
  const hover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => { e.currentTarget.style.color = enter ? C.lime : "rgba(255,255,255,0.5)" }

  const serviceLinks = isHE ? [
    { label: "LinkedIn לארגונים", href: "/linkedin-for-organizations-he" },
    { label: "LinkedIn למייסדים ומנכ״לים", href: "/linkedin-for-executives-he" },
    { label: "LinkedIn לעצמאים", href: "/linkedin-for-solopreneurs-he" },
  ] : [
    { label: "LinkedIn for Organizations", href: "/linkedin-for-organizations" },
    { label: "LinkedIn for Executives",    href: "/linkedin-for-executives" },
    { label: "LinkedIn for Solopreneurs",  href: "/linkedin-for-solopreneurs" },
  ]
  const otherLinks = isHE ? [
    { label: "CMO במיקור חוץ", href: "/fractional-cmo-he" },
    { label: "כלי AI וסוכנים", href: "/ai-tools-agents-he" },
    { label: "סדנאות", href: "/workshops-he" },
  ] : [
    { label: "Fractional CMO",    href: "/fractional-cmo" },
    { label: "AI Tools & Agents", href: "/ai-tools-agents" },
    { label: "Workshops",         href: "/workshops" },
  ]
  const pageLinks = isHE ? [
    { label: "עמוד הבית", href: "/" },
    { label: "אודות", href: "/about" },
    { label: "בלוג", href: "/blog" },
    { label: "צרו קשר", href: "/contact" },
  ] : [
    { label: "Home",    href: "/" },
    { label: "About",   href: "/about" },
    { label: "Blog",    href: "/blog" },
    { label: "Contact", href: "/contact" },
  ]
  const legalLinks = isHE ? [
    { label: "פרטיות", href: "/privacy-policy" },
    { label: "תנאים", href: "/terms" },
    { label: "נגישות", href: "/accessibility" },
  ] : [
    { label: "Privacy",       href: "/privacy-policy" },
    { label: "Terms",         href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
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
    <footer dir={dir} style={{ padding: "64px 0 0", background: "#201b4e", color: "rgba(255,255,255,0.7)", fontFamily: ff }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 0.65fr 1fr 0.8fr 0.8fr 0.8fr", gap: isMobile ? "28px 20px" : 24, paddingBottom: 48 }}>
          <div style={{ gridColumn: isMobile ? "1 / -1" : "1" }}>
            <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png"
              alt="OctaLoom" style={{ height: 100, width: "auto", display: "block" }}/>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 14, maxWidth: 240, lineHeight: 1.65, fontFamily: ff }}>
              {isHE ? <>"מחלקת השיווק שלך,"<br/>"רק בלי המחלקה."</> : <>"Your marketing department,"<br/>"minus the department."</>}
            </p>
          </div>
          <div>
            <h4 style={headStyle}>{isHE ? "עמודים" : "Pages"}</h4>
            {pageLinks.map((l, i) => (
              <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{l.label}</a>
            ))}
          </div>
          <div>
            <h4 style={headStyle}>{isHE ? "שירותי LinkedIn" : "LinkedIn Services"}</h4>
            {serviceLinks.map((l, i) => (
              <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{l.label}</a>
            ))}
          </div>
          <div>
            <h4 style={headStyle}>{isHE ? "שירותים נוספים" : "Other Services"}</h4>
            {otherLinks.map((l, i) => (
              <a key={i} href={l.href} style={linkStyle} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{l.label}</a>
            ))}
          </div>
          <div>
            <h4 style={{ ...headStyle, fontWeight: 300, fontSize: 12 }}>
              {isHE ? <>"כלי שיווק"<br/>"חינמיים ותבניות"</> : <>"Free Marketing"<br/>"Tools & Templates"</>}
            </h4>
            <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "inline-block" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1" }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9" }}>
              <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/OCTAGOODIES%20GREEN.png"
                alt="OctaGoodies" style={{ height: 44, width: "auto", display: "block", opacity: 0.9, transition: "opacity 0.2s" }}/>
            </a>
          </div>
          <div>
            <h4 style={headStyle}>{isHE ? "התחברו" : "Connect"}</h4>
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 12, color: "rgba(255,255,255,.38)", flexWrap: "wrap" as const, gap: 12, fontFamily: ff }}>
          <span>&#169; 2026 OctaLoom</span>
          <div style={{ display: "flex", gap: 18 }}>
            {legalLinks.map((l, i) => (
              <a key={i} href={l.href} style={{ color: "rgba(255,255,255,.38)", textDecoration: "none", transition: "color 0.2s", fontFamily: ff }}
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

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [lang, setLang] = useLangState()

  const [step, setStep]         = useState(1)
  const [name, setName]         = useState("")
  const [company, setCompany]   = useState("")
  const [email, setEmail]       = useState("")
  const [service, setService]   = useState("")
  const [timeline, setTimeline] = useState("")
  const [notes, setNotes]       = useState("")
  const [consent, setConsent]   = useState(false)
  const [status, setStatus]     = useState("idle")
  const [errMsg, setErrMsg]     = useState("")

  const cp = CP[lang] || CP.he
  const isRTL = lang === "he"
  const ff = isRTL ? F.display : F.body
  const dir = isRTL ? "rtl" : "ltr"
  const w = useWindowSize()
  const isMobile = w < 768

  const nextStep1 = () => {
    if (!name.trim() || !company.trim() || !email.trim()) { setErrMsg(cp.errRequired); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErrMsg(cp.errEmail); return }
    setErrMsg(""); setStep(2)
  }
  const nextStep2 = () => {
    if (!service) { setErrMsg(cp.errSelect); return }
    setErrMsg(""); setStep(3)
  }
  const submit = async () => {
    if (!timeline) { setErrMsg(cp.errSelectTL); return }
    setErrMsg(""); setStatus("loading")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${cp.subject}: ${name} ${cp.from} ${company}`,
          from_name: "OctaLoom Contact Page",
          name, email, company, service, timeline,
          notes: notes || "(none)",
        }),
      })
      const data = await res.json()
      if (data.success) setStatus("success")
      else { setErrMsg(cp.errSend); setStatus("error") }
    } catch {
      setErrMsg(cp.errSend); setStatus("error")
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 16px", borderRadius: 10,
    border: "1px solid rgba(32,30,75,0.14)", fontSize: 15, fontFamily: ff,
    outline: "none", boxSizing: "border-box" as const,
    direction: isRTL ? "rtl" : "ltr",
    background: "white",
    color: C.deepPurple,
    transition: "border 0.2s, box-shadow 0.2s",
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 500, color: C.textDim,
    marginBottom: 7, display: "block", fontFamily: ff,
    textAlign: isRTL ? "right" : "left",
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
    <LangCtx.Provider value={{ lang, setLang }}>
      <div style={{ width: "100vw", overflowX: "hidden", background: C.cream, minHeight: "100vh", position: "relative" }}>

        <ContactNav />

        {/* HERO ─────────────────────────────────────────────────────────────── */}
        <section style={{ position: "relative", paddingTop: isMobile ? 120 : 160, paddingBottom: isMobile ? 64 : 96, background: C.cream, overflow: "hidden" }}>

          {/* decorative circle — subtle brand accent */}
          <div style={{
            position: "absolute",
            top: isMobile ? -80 : -120,
            [isRTL ? "left" : "right"]: isMobile ? -80 : -60,
            width: isMobile ? 320 : 520,
            height: isMobile ? 320 : 520,
            borderRadius: "50%",
            border: "1.5px solid rgba(113,46,172,0.1)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            top: isMobile ? -40 : -60,
            [isRTL ? "left" : "right"]: isMobile ? -40 : -30,
            width: isMobile ? 200 : 340,
            height: isMobile ? 200 : 340,
            borderRadius: "50%",
            border: "1px solid rgba(113,46,172,0.06)",
            pointerEvents: "none",
          }} />

          <Container>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", maxWidth: 720, direction: dir, textAlign: isRTL ? "right" : "left", width: "100%" }}>

              <motion.h1
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                style={{
                  fontFamily: ff,
                  fontWeight: isRTL ? 500 : 700,
                  fontSize: `clamp(${isMobile ? "36px" : "48px"}, 6vw, 72px)`,
                  color: C.purple,
                  lineHeight: 1.15,
                  margin: "0 0 28px",
                  letterSpacing: isRTL ? 0 : "-0.02em",
                  direction: dir,
                  width: "100%",
                  textAlign: isRTL ? "right" : "left",
                  whiteSpace: "pre-line",
                }}>
                {cp.headline}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                style={{
                  fontSize: isMobile ? 17 : 20, fontFamily: ff, color: C.deepPurple,
                  maxWidth: 560, margin: "0 0 16px", lineHeight: 1.75, direction: dir,
                  fontWeight: 400, textAlign: isRTL ? "right" : "left", width: "100%",
                  whiteSpace: "pre-line",
                }}>
                {cp.sub}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                style={{
                  fontSize: isMobile ? 15 : 17, fontFamily: ff, color: C.textDim,
                  maxWidth: 480, margin: "0 0 44px", lineHeight: 1.75, direction: dir,
                  textAlign: isRTL ? "right" : "left", width: "100%",
                }}>
                {cp.warmPara}
              </motion.p>

              <div style={{ width: "100%", display: "flex", justifyContent: isRTL ? "flex-end" : "flex-start" }}>
                <motion.a href="#contact-form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.32 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "13px 28px", borderRadius: 50,
                    background: C.purple, color: "white",
                    fontSize: 15, fontFamily: ff, fontWeight: 700,
                    textDecoration: "none", transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                  {cp.toForm}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12l7 7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </Container>
        </section>

        {/* thin separator */}
        <div style={{ height: 1, background: "rgba(113,46,172,0.08)", margin: "0 clamp(20px,6vw,80px)" }} />

        {/* FORM SECTION ─────────────────────────────────────────────────────── */}
        <section id="contact-form" style={{ background: C.lime, padding: isMobile ? "60px 0 80px" : "80px 0 120px" }}>
          <Container>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: 660 }}>

              <motion.div
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                style={{
                  width: "100%", maxWidth: 660,
                  background: C.cream,
                  borderRadius: 20,
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
                          <span style={{ fontSize: 13, fontWeight: 700, color: step >= s ? "white" : C.textDim, fontFamily: F.body }}>
                            {s}
                          </span>
                        </div>
                        {i < 2 && (
                          <div style={{
                            flex: 1, height: 1, maxWidth: 80,
                            background: step > s ? C.purple : "rgba(32,30,75,0.1)",
                            transition: "background 0.4s",
                          }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* SUCCESS */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ textAlign: "center", padding: isMobile ? "20px 0" : "32px 0", direction: dir }}>
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      style={{
                        width: 68, height: 68, borderRadius: "50%",
                        background: "rgba(197,230,162,0.15)",
                        border: `2px solid ${C.lime}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 24px",
                      }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke={C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <h2 style={{ fontFamily: ff, fontWeight: isRTL ? 500 : 700, fontSize: isMobile ? 24 : 28, color: C.deepPurple, margin: "0 0 10px" }}>
                      {cp.successTitle}
                    </h2>
                    <p style={{ fontFamily: ff, fontSize: 16, color: C.textDim, maxWidth: 380, margin: "0 auto 32px", lineHeight: 1.75 }}>
                      {cp.successSub}
                    </p>
                    <a href={NOTION_CALENDAR} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "13px 32px", borderRadius: 50,
                        background: C.lime, color: C.navy,
                        fontFamily: ff, fontWeight: 700, fontSize: 15,
                        textDecoration: "none",
                      }}>
                      {cp.bookBtn} {isRTL ? "←" : "→"}
                    </a>
                  </motion.div>
                )}

                {/* STEP 1 */}
                <AnimatePresence mode="wait">
                  {status !== "success" && step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                      style={{ direction: dir }}>
                      <h2 style={{ fontFamily: ff, fontWeight: isRTL ? 500 : 700, fontSize: isMobile ? 21 : 24, color: C.deepPurple, margin: "0 0 22px" }}>
                        {cp.step1Title}
                      </h2>
                      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div>
                          <label style={labelStyle}>{cp.name}</label>
                          <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} onFocus={focusField} onBlur={blurField} />
                        </div>
                        <div>
                          <label style={labelStyle}>{cp.company}</label>
                          <input value={company} onChange={e => setCompany(e.target.value)} style={inputStyle} onFocus={focusField} onBlur={blurField} />
                        </div>
                        <div>
                          <label style={labelStyle}>{cp.email}</label>
                          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} onFocus={focusField} onBlur={blurField} />
                        </div>
                      </div>
                      {errMsg && <p style={{ color: C.error, fontSize: 13, margin: "12px 0 0", fontFamily: ff }}>{errMsg}</p>}
                      <div style={{ marginTop: 26 }}>
                        <button onClick={nextStep1} style={{
                          padding: "13px 36px", borderRadius: 50, border: "none",
                          background: C.purple, color: "white",
                          fontFamily: ff, fontWeight: 700, fontSize: 15, cursor: "pointer",
                        }}>
                          {cp.next} {isRTL ? "←" : "→"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2 */}
                  {status !== "success" && step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                      style={{ direction: dir }}>
                      <h2 style={{ fontFamily: ff, fontWeight: isRTL ? 500 : 700, fontSize: isMobile ? 21 : 24, color: C.deepPurple, margin: "0 0 4px" }}>
                        {cp.step2Title}
                      </h2>
                      <p style={{ fontSize: 13, color: C.textDim, fontFamily: ff, margin: "0 0 20px" }}>{cp.step2Sub}</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {cp.services.map((s: string, i: number) => (
                          <button key={i} onClick={() => setService(s)} style={{
                            padding: "12px 16px", borderRadius: 10,
                            textAlign: isRTL ? "right" : "left",
                            border: `1.5px solid ${service === s ? C.purple : "rgba(32,30,75,0.1)"}`,
                            background: service === s ? "rgba(113,46,172,0.05)" : "white",
                            color: service === s ? C.deepPurple : C.textDim,
                            fontWeight: service === s ? 600 : 400,
                            cursor: "pointer", fontSize: 15, fontFamily: ff, transition: "all 0.15s",
                          }}>{s}</button>
                        ))}
                      </div>
                      {errMsg && <p style={{ color: C.error, fontSize: 13, margin: "12px 0 0", fontFamily: ff }}>{errMsg}</p>}
                      <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
                        <button onClick={() => { setErrMsg(""); setStep(1) }} style={{
                          flex: 1, padding: "13px", borderRadius: 50,
                          border: "1px solid rgba(32,30,75,0.12)", background: "transparent",
                          color: C.textDim, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: ff,
                        }}>{cp.back}</button>
                        <button onClick={nextStep2} style={{
                          flex: 2, padding: "13px", borderRadius: 50, border: "none",
                          background: C.purple, color: "white", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: ff,
                        }}>{cp.next} {isRTL ? "←" : "→"}</button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3 */}
                  {status !== "success" && step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                      style={{ direction: dir }}>
                      <h2 style={{ fontFamily: ff, fontWeight: isRTL ? 500 : 700, fontSize: isMobile ? 21 : 24, color: C.deepPurple, margin: "0 0 22px" }}>
                        {cp.step3Title}
                      </h2>
                      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        <div>
                          <label style={labelStyle}>{cp.timelineLabel}</label>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                            {cp.timelines.map((tl: string) => (
                              <button key={tl} onClick={() => setTimeline(tl)} style={{
                                flex: 1, minWidth: 90, padding: "11px 8px", borderRadius: 10, fontSize: 14,
                                border: `1.5px solid ${timeline === tl ? C.purple : "rgba(32,30,75,0.1)"}`,
                                background: timeline === tl ? "rgba(113,46,172,0.05)" : "white",
                                color: timeline === tl ? C.deepPurple : C.textDim,
                                fontWeight: timeline === tl ? 700 : 400,
                                cursor: "pointer", fontFamily: ff, transition: "all 0.15s",
                              }}>{tl}</button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label style={labelStyle}>{cp.notesLabel}</label>
                          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4}
                            style={{ ...inputStyle, resize: "vertical" as const, fontFamily: ff }}
                            onFocus={focusField} onBlur={blurField} />
                        </div>
                      </div>
                      {errMsg && <p style={{ color: C.error, fontSize: 13, margin: "12px 0 0", fontFamily: ff }}>{errMsg}</p>}
                      <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
                        <button onClick={() => { setErrMsg(""); setStep(2) }} style={{
                          flex: 1, padding: "13px", borderRadius: 50,
                          border: "1px solid rgba(32,30,75,0.12)", background: "transparent",
                          color: C.textDim, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: ff,
                        }}>{cp.back}</button>
                        <button onClick={submit} disabled={status === "loading"} style={{
                          flex: 2, padding: "13px", borderRadius: 50, border: "none",
                          background: C.lime, color: C.navy,
                          fontWeight: 700, fontSize: 15,
                          cursor: status === "loading" ? "wait" : "pointer",
                          fontFamily: ff, opacity: status === "loading" ? 0.7 : 1,
                        }}>{status === "loading" ? cp.sending : cp.send}</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {status !== "success" && (
                  <p style={{ fontSize: 12, color: "rgba(32,30,75,0.28)", textAlign: "center", margin: "24px 0 0", fontFamily: ff }}>
                    {cp.trustLine}
                  </p>
                )}

              </motion.div>

                {/* Alternative contact options */}
                <div style={{
                  marginTop: 48,
                  textAlign: "center",
                  direction: dir,
                }}>
                  <p style={{
                    fontSize: 14,
                    color: C.textDim,
                    fontFamily: ff,
                    marginBottom: 16,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase" as const,
                  }}>
                    {cp.altContact}
                  </p>
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: isMobile ? 12 : 20,
                    flexWrap: "wrap" as const,
                  }}>
                    {/* Email */}
                    <a href="mailto:Hanita@octaloom.com"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        padding: "10px 20px", borderRadius: 50,
                        border: "1px solid rgba(32,30,75,0.14)",
                        color: C.deepPurple, textDecoration: "none",
                        fontFamily: ff, fontSize: 14, fontWeight: 500,
                        transition: "all 0.2s",
                        background: "transparent",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.purple; e.currentTarget.style.color = C.purple }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(32,30,75,0.14)"; e.currentTarget.style.color = C.deepPurple }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      {cp.altEmail}
                    </a>
                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/in/hanita-yudovski/" target="_blank" rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        padding: "10px 20px", borderRadius: 50,
                        border: "1px solid rgba(32,30,75,0.14)",
                        color: C.deepPurple, textDecoration: "none",
                        fontFamily: ff, fontSize: 14, fontWeight: 500,
                        transition: "all 0.2s",
                        background: "transparent",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.purple; e.currentTarget.style.color = C.purple }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(32,30,75,0.14)"; e.currentTarget.style.color = C.deepPurple }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      {cp.altLinkedIn}
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </Container>
        </section>

        <ContactFooter />

      </div>
    </LangCtx.Provider>
  )
}
