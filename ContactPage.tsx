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

// ─── COPY ─────────────────────────────────────────────────────────────────────
const CP: Record<string, any> = {
  he: {
    eyebrow:      "דברו איתנו — זה בחינם",
    headline:     "רגע לפני שממשיכים",
    sub:          "ממלאים את הטופס, חניתה קוראת אישית ומחזירה תוך יום עסקים. אם יש התאמה, קובעים שיחה קצרה.",
    toForm:       "לטופס",
    step1Title:   "ספרו לנו עליכם",
    step2Title:   "מה אתם צריכים?",
    step2Sub:     "אפשר לבחור יותר מאחד",
    step3Title:   "עוד קצת",
    name:         "שם מלא",
    company:      "שם החברה",
    email:        "אימייל",
    services: [
      "לינקדאין שעובד בשבילך",
      "נוכחות ברשתות מא׳ עד ת׳",
      "תשתית שיווק שרצה לבד",
      "מנהל.ת שיווק במשרה חלקית",
      "תהליכים שרצים בלעדיך",
      "סוכן AI שעושה את העבודה",
      "עדיין לא בטוח/ה",
    ],
    timelineLabel:"מתי מחפשים להתחיל?",
    timelines:    ["מיידי", "1–3 חודשים", "סתם בודק/ת"],
    notesLabel:   "הוסיפו משהו שחשוב (אפשרי)",
    next:         "המשיכו",
    back:         "חזרה",
    send:         "שלחו",
    sending:      "שולח...",
    successTitle: "מעולה. קיבלנו.",
    successSub:   "חניתה תחזור תוך 24 שעות. אם רוצים לקבוע עכשיו:",
    bookBtn:      "קבעו שיחה עכשיו",
    trustLine:    "בלי ספאם. בלי פרסום. רק שיחה.",
    errRequired:  "נא למלא את כל השדות",
    errEmail:     "כתובת אימייל לא תקינה",
    errSelect:    "נא לבחור אפשרות",
    errSelectTL:  "נא לבחור מתי",
    errConsent:   "נא אשרו את ההסכמה",
    errSend:      "שגיאה בשליחה, נסו שוב",
    consent:      "אני מסכים/מסכימה לקבלת מיילים מ-OctaLoom",
    subject:      "פנייה חדשה",
    from:         "מ",
    navCta:       "בואו נדבר",
    services_lbl: "שירותים",
  },
  en: {
    eyebrow:      "Talk to us — it’s free",
    headline:     "Let’s Figure Out What You Need",
    sub:          "Fill out the form and Hanita will read it personally and get back to you within one business day. If there’s a fit, we’ll book a short call.",
    toForm:       "to the form",
    step1Title:   "Tell us about you",
    step2Title:   "What do you need?",
    step2Sub:     "You can select more than one",
    step3Title:   "A bit more",
    name:         "Full name",
    company:      "Company name",
    email:        "Email",
    services:     [
      "LinkedIn that works for you",
      "Full social presence, handled",
      "Marketing infrastructure that runs itself",
      "Part-time marketing leadership",
      "Processes that run without you",
      "An AI agent that does the work",
      "Not sure yet",
    ],
    timelineLabel:"When are you looking to start?",
    timelines:    ["Immediately", "1–3 months", "Just exploring"],
    notesLabel:   "Anything important we should know (optional)",
    next:         "Continue",
    back:         "Back",
    send:         "Send",
    sending:      "Sending…",
    successTitle: "Got it. We received it.",
    successSub:   "Hanita will be in touch within 24 hours. Or book a time now:",
    bookBtn:      "Book a call now",
    trustLine:    "No spam. No pitch decks. Just a conversation.",
    errRequired:  "Please fill in all fields",
    errEmail:     "Invalid email address",
    errSelect:    "Please select an option",
    errSelectTL:  "Please select a timeline",
    errConsent:   "Please accept the consent",
    errSend:      "Send failed, please try again",
    consent:      "I agree to receive emails from OctaLoom",
    subject:      "New inquiry",
    from:         "from",
    navCta:       "Let’s Talk",
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

// ─── NAV ──────────────────────────────────────────────────────────────────────
function ContactNav() {
  const { lang, setLang } = useLang()
  const ff = lang === "he" ? F.display : F.body
  const cp = CP[lang] || CP.he
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
    { en: "LinkedIn for Organizations",             he: "לינקדאין לארגונים",                    href: "/services/linkedin-for-organizations" },
    { en: "LinkedIn for Executives",                he: "לינקדאין למנהלים",                   href: "/services/linkedin-for-executives" },
    { en: "LinkedIn for Solopreneurs & Biz Owners", he: "לינקדאין לעצמאים ובעלי עסקים", href: "/services/linkedin-for-solopreneurs" },
  ]

  const services = [
    { en: "LinkedIn Growth Engine", he: "מנוע צמיחה בלינקדאין", href: "/services/linkedin-growth-engine", sub: linkedinSub },
    { en: "Fractional CMO",         he: "Fractional CMO",                                                                                              href: "/services/fractional-cmo",          sub: null },
    { en: "AI Tools & Agents",      he: "כלי AI וסוכנים",                                         href: "/services/ai-tools-agents",         sub: null },
  ]

  const navBg: React.CSSProperties = scrolled
    ? { background: "rgba(236,233,231,0.92)", backdropFilter: "blur(24px) saturate(1.6)", WebkitBackdropFilter: "blur(24px) saturate(1.6)", borderBottom: "1px solid rgba(113,46,172,0.1)", boxShadow: "0 1px 24px rgba(32,30,75,0.07)" }
    : { background: "rgba(6,13,61,0.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(197,230,162,0.06)" }

  const textColor = scrolled ? C.textDim : "rgba(236,233,231,0.72)"
  const textColorHover = scrolled ? C.deepPurple : "#fff"
  const activeColor = scrolled ? C.deepPurple : "#fff"

  const dropBase: React.CSSProperties = {
    position: "absolute", minWidth: 240, background: "white",
    borderRadius: 12, boxShadow: "0 8px 40px rgba(113,46,172,0.15), 0 2px 8px rgba(0,0,0,0.06)",
    border: "1px solid rgba(113,46,172,0.08)", zIndex: 200, padding: "8px 0",
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
        ? { bottom: 0, background: C.navy, overflowY: "auto", display: "flex", flexDirection: "column" }
        : { padding: scrolled ? "10px 0" : "16px 0", ...navBg }
      )
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)",
        display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 16,
        position: "relative", zIndex: 101,
        ...(isMobile && mobileOpen ? { paddingTop: 14, paddingBottom: 14, borderBottom: "1px solid rgba(197,230,162,0.1)" } : {})
      }}>

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
                color: servicesOpen ? activeColor : textColor, fontFamily: ff,
                display: "flex", alignItems: "center", gap: 5, padding: "6px 0", transition: "color 0.25s" }}>
                {cp.services_lbl}
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
                                ...(dir === "rtl" ? { right: "calc(100% + 6px)" } : { left: "calc(100% + 6px)" }) }}>
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
              { en: "About", he: "עליי", href: "/about-he" },
              { en: "Blog",  he: "בלוג", href: "/blog" },
            ] as {en:string;he:string;href:string}[]).map((item, i) => (
              <a key={i} href={item.href}
                style={{ fontSize: 14, color: textColor, textDecoration: "none", fontFamily: ff, transition: "color 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.color = textColorHover)}
                onMouseLeave={e => (e.currentTarget.style.color = textColor)}>
                {lang === "he" ? item.he : item.en}
              </a>
            ))}

            <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 14, color: textColor, textDecoration: "none", fontFamily: ff, transition: "color 0.25s" }}
              onMouseEnter={e => (e.currentTarget.style.color = textColorHover)}
              onMouseLeave={e => (e.currentTarget.style.color = textColor)}>
              Goodies
            </a>

            <div style={{ display: "flex", gap: 2, background: "rgba(197,230,162,0.1)", borderRadius: 6, padding: 2 }}>
              {["en","he"].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  background: lang === l ? C.lime : "none",
                  color: lang === l ? C.navy : "rgba(197,230,162,0.65)",
                  border: "none", cursor: "pointer",
                  fontSize: 12, fontWeight: 700, padding: "5px 10px", borderRadius: 4, transition: "all 0.25s",
                  fontFamily: ff }}>
                  {l === "en" ? "EN" : "עב"}
                </button>
              ))}
            </div>

          </div>
        )}

        {!isMobile && (
          <a href="#contact-form"
            style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap",
              padding: "9px 22px", fontSize: 13, borderRadius: 50,
              background: C.lime, color: C.navy, fontFamily: ff, fontWeight: 700,
              textDecoration: "none" }}>
            {cp.navCta}
          </a>
        )}

        {isMobile && (
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none",
            cursor: "pointer", width: 44, height: 44, position: "relative", gridColumn: "3",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
            <span style={{ position: "relative", display: "block", width: 28, height: 20 }}>
              {[0,9,18].map((top,i) => (
                <span key={i} style={{ position: "absolute", left: 0, width: "100%", height: 2,
                  background: scrolled ? C.deepPurple : "#fff",
                  borderRadius: 2, top,
                  transform: mobileOpen && i===0 ? "rotate(45deg) translateY(9px)" : mobileOpen && i===1 ? "scaleX(0)" : mobileOpen && i===2 ? "rotate(-45deg) translateY(-9px)" : "none",
                  opacity: mobileOpen && i===1 ? 0 : 1, transition: "all 0.3s" }} />
              ))}
            </span>
          </button>
        )}
      </div>

      {isMobile && mobileOpen && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 32px 40px", gap: 0 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: C.lime, fontFamily: ff, margin: "0 0 4px" }}>
            {cp.services_lbl}
          </p>
          {services.map((svc, i) => (
            <div key={i}>
              <a href={svc.href} onClick={() => setMobileOpen(false)}
                style={{ display: "block", fontSize: 20, color: "#fff", textDecoration: "none",
                  fontFamily: ff, padding: "11px 0", fontWeight: 600,
                  borderBottom: "1px solid rgba(197,230,162,0.1)" }}>
                {lang === "he" ? svc.he : svc.en}
              </a>
              {svc.sub && svc.sub.map((sub, j) => (
                <a key={j} href={sub.href} onClick={() => setMobileOpen(false)}
                  style={{ display: "block", fontSize: 15, color: C.lime, textDecoration: "none",
                    fontFamily: ff, padding: "7px 0",
                    paddingLeft: dir === "ltr" ? 20 : 0, paddingRight: dir === "rtl" ? 20 : 0,
                    borderBottom: "1px solid rgba(197,230,162,0.05)" }}>
                  {lang === "he" ? sub.he : sub.en}
                </a>
              ))}
            </div>
          ))}

          {([
            { en: "About",   he: "עליי",     href: "/about-he" },
            { en: "Blog",    he: "בלוג",     href: "/blog" },
            { en: "Goodies", he: "Goodies",  href: "https://octagoodies.com" },
          ] as {en:string;he:string;href:string}[]).map((item, i) => (
            <a key={i} href={item.href} onClick={() => setMobileOpen(false)}
              style={{ display: "block", fontSize: 20, color: "#fff", textDecoration: "none",
                fontFamily: ff, padding: "11px 0", fontWeight: 500,
                borderBottom: "1px solid rgba(197,230,162,0.08)" }}>
              {lang === "he" ? item.he : item.en}
            </a>
          ))}

          <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
            {["he","en"].map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{ background: lang === l ? C.lime : "transparent",
                  color: lang === l ? C.navy : "rgba(197,230,162,0.7)",
                  border: `1.5px solid ${lang === l ? C.lime : "rgba(197,230,162,0.25)"}`,
                  borderRadius: 8, padding: "9px 20px", cursor: "pointer",
                  fontFamily: ff, fontWeight: 700, fontSize: 14 }}>
                {l === "en" ? "EN" : "עברית"}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <a href="#contact-form" onClick={() => setMobileOpen(false)}
              style={{ display: "block", textAlign: "center", padding: "14px 24px", fontSize: 15,
                background: C.lime, color: C.navy, borderRadius: 50,
                fontFamily: ff, fontWeight: 700, textDecoration: "none" }}>
              {cp.navCta}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function ContactFooter() {
  const { lang } = useLang()
  const ff = lang === "he" ? F.display : F.body
  const dir = lang === "he" ? "rtl" : "ltr"
  const w = useWindowSize()
  const isMobile = w < 768

  const linkStyle: React.CSSProperties = {
    fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none",
    transition: "color 0.2s", fontFamily: ff, display: "block", lineHeight: "1.9",
  }
  const headStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
    color: C.cream, margin: "0 0 14px", fontFamily: ff,
  }
  const hover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    e.currentTarget.style.color = enter ? C.lime : "rgba(255,255,255,0.5)"
  }

  const pages = [
    { en: "Home",    he: "דף הבית",  href: "/" },
    { en: "About",   he: "עליי",               href: "/about-he" },
    { en: "Blog",    he: "בלוג",               href: "/blog" },
    { en: "Contact", he: "צור קשר",  href: "/contact" },
  ]

  const socialIcons = [
    { href: "https://www.linkedin.com/in/hanita-yudovski/", label: "LinkedIn",
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { href: "https://www.instagram.com/hanita_Y", label: "Instagram",
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
    { href: "https://www.facebook.com/octaloom", label: "Facebook",
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { href: "https://www.youtube.com/@Hanita_Octaloom", label: "YouTube",
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
    { href: "https://open.spotify.com/show/4XmsthqR7gnj4nf2gL0T7j", label: "Spotify",
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg> },
  ]

  return (
    <footer dir={dir} style={{ padding: "64px 0 0", background: C.deepPurple, color: "rgba(255,255,255,0.7)" }}>
      <Container>
        <div style={{ display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : w < 1024 ? "1fr 1fr" : "2fr 1fr 1.6fr 1fr 1fr",
          gap: isMobile ? 36 : 40, paddingBottom: 48 }}>

          <div>
            <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png"
              alt="OctaLoom" style={{ height: 128, width: "auto", display: "block" }} />
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 14, maxWidth: 240, fontFamily: ff, lineHeight: 1.65 }}>
              {lang === "he"
                ? "מחלקת השיווק שלך, רק בלי המחלקה"
                : "Your marketing department, minus the department."}
            </p>
          </div>

          <div>
            <h4 style={headStyle}>{lang === "he" ? "דפים" : "Pages"}</h4>
            {pages.map((p, i) => (
              <a key={i} href={p.href} style={linkStyle}
                onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>
                {lang === "he" ? p.he : p.en}
              </a>
            ))}
          </div>

          <div>
            <h4 style={headStyle}>{lang === "he" ? "שירותי לינקדאין" : "LinkedIn Services"}</h4>
            {([
              { en: "LinkedIn for Organizations", he: "לינקדאין לארגונים", href: "/services/linkedin-for-organizations" },
              { en: "LinkedIn for Founders",      he: "לינקדאין למייסדים", href: "/services/linkedin-for-executives" },
              { en: "LinkedIn for Solopreneurs",  he: "לינקדאין לעצמאים", href: "/services/linkedin-for-solopreneurs" },
            ] as {en:string;he:string;href:string}[]).map((s, i) => (
              <a key={i} href={s.href} style={linkStyle}
                onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>
                {lang === "he" ? s.he : s.en}
              </a>
            ))}
            <h4 style={{ ...headStyle, marginTop: 20 }}>{lang === "he" ? "שירותים נוספים" : "More Services"}</h4>
            {([
              { en: "Fractional CMO",    he: "Fractional CMO",                                              href: "/services/fractional-cmo" },
              { en: "AI Tools & Agents", he: "כלי AI וסוכנים", href: "/services/ai-tools-agents" },
            ] as {en:string;he:string;href:string}[]).map((s, i) => (
              <a key={i} href={s.href} style={linkStyle}
                onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>
                {lang === "he" ? s.he : s.en}
              </a>
            ))}
          </div>

          <div>
            <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "inline-block" }}>
              <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/OCTAGOODIES%20GREEN.png"
                alt="OctaGoodies"
                style={{ height: 37, width: "auto", display: "block", opacity: 0.9, transition: "opacity 0.2s" }}
                onMouseEnter={(e: any) => e.currentTarget.style.opacity = "1"}
                onMouseLeave={(e: any) => e.currentTarget.style.opacity = "0.9"} />
            </a>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 6, fontFamily: ff, lineHeight: 1.6 }}>
              {lang === "he" ? "כלים וטמפלייטים לשיווק" : "Marketing tools & templates"}
            </p>
          </div>

          <div>
            <h4 style={headStyle}>{lang === "he" ? "עקבו אחרינו" : "Follow Us"}</h4>
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
          paddingTop: 24, paddingBottom: 32,
          fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: ff,
          flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 0 } as any}>
          <span>{"© 2026 OctaLoom. "}{lang === "he" ? "כל הזכויות שמורות" : "All Rights Reserved"}</span>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { en: "Privacy",       he: "פרטיות",  href: "/privacy-policy" },
              { en: "Terms",         he: "תנאים",        href: "/terms" },
              { en: "Accessibility", he: "נגישות",  href: "/accessibility" },
            ].map((l, i) => (
              <a key={i} href={l.href}
                style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s", fontFamily: ff }}
                onMouseEnter={e => (e.currentTarget.style.color = C.lime)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
                {lang === "he" ? l.he : l.en}
              </a>
            ))}
          </div>
        </div>
      </Container>
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
    if (!consent) { setErrMsg(cp.errConsent); return }
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
          notes: notes || "—",
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
    width: "100%", padding: "14px 16px", borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)", fontSize: 16, fontFamily: ff,
    outline: "none", boxSizing: "border-box" as const,
    direction: isRTL ? "rtl" : "ltr",
    background: "rgba(255,255,255,0.06)",
    color: C.cream,
    transition: "border 0.2s, box-shadow 0.2s",
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 500, color: "rgba(236,233,231,0.5)",
    marginBottom: 8, display: "block", fontFamily: ff,
    textAlign: isRTL ? "right" : "left",
  }

  const focusField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.border = "1px solid rgba(197,230,162,0.4)"
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(197,230,162,0.07)"
  }
  const blurField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)"
    e.currentTarget.style.boxShadow = "none"
  }

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <div style={{ width: "100vw", overflowX: "hidden", background: C.navy, minHeight: "100vh", position: "relative" }}>

        {/* Atmospheric glows — fixed, behind everything */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          background: "radial-gradient(circle at 78% 8%, rgba(197,230,162,0.08) 0%, transparent 52%), radial-gradient(circle at 12% 80%, rgba(113,46,172,0.12) 0%, transparent 52%)",
        }} />

        <ContactNav />

        {/* HERO ─────────────────────────────────────────────────────────────── */}
        <section style={{
          position: "relative", zIndex: 1,
          paddingTop: isMobile ? 120 : 164,
          paddingBottom: isMobile ? 60 : 84,
          backgroundImage: "repeating-linear-gradient(-15deg, rgba(197,230,162,0.025) 0px, rgba(197,230,162,0.025) 1px, transparent 1px, transparent 80px)",
        }}>
          <Container>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "7px 18px", borderRadius: 50,
                  background: "rgba(197,230,162,0.08)",
                  border: "1px solid rgba(197,230,162,0.2)",
                  color: C.lime, fontSize: 13, fontFamily: ff, marginBottom: 28 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%",
                  background: C.lime, boxShadow: "0 0 8px rgba(197,230,162,0.8)",
                  display: "inline-block", flexShrink: 0 }} />
                {cp.eyebrow}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ fontFamily: ff, fontWeight: isRTL ? 500 : 700,
                  fontSize: `clamp(${isMobile ? "30px" : "38px"}, 5.5vw, 66px)`,
                  color: C.cream, lineHeight: 1.15,
                  margin: "0 0 20px", maxWidth: 860, direction: dir }}>
                {cp.headline}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ fontSize: isMobile ? 16 : 18, fontFamily: ff,
                  color: "rgba(236,233,231,0.52)",
                  maxWidth: 540, margin: "0 0 48px", lineHeight: 1.8, direction: dir }}>
                {cp.sub}
              </motion.p>

              <motion.a href="#contact-form"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8,
                  color: "rgba(197,230,162,0.45)", textDecoration: "none",
                  fontSize: 13, fontFamily: ff }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {cp.toForm}
              </motion.a>
            </div>
          </Container>

          <div style={{ position: "absolute", bottom: 0, left: "5%", right: "5%",
            height: 1, background: "rgba(197,230,162,0.08)" }} />
        </section>

        {/* FORM SECTION ─────────────────────────────────────────────────────── */}
        <section id="contact-form" style={{
          position: "relative", zIndex: 1,
          background: "#0d0a2b",
          padding: isMobile ? "60px 0 80px" : "80px 0 120px",
        }}>
          <Container>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <motion.div
                initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                style={{ width: "100%", maxWidth: 680,
                  background: "rgba(255,255,255,0.025)",
                  borderRadius: 24,
                  border: "1px solid rgba(113,46,172,0.28)",
                  padding: isMobile ? "28px 20px" : "48px 48px",
                  boxShadow: "0 0 60px rgba(113,46,172,0.09), 0 24px 48px rgba(6,13,61,0.4)" }}>

                {/* Step indicators */}
                {status !== "success" && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 40, gap: 0, direction: "ltr" }}>
                    {[1,2,3].map((s, i) => (
                      <React.Fragment key={s}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%",
                          border: `2px solid ${step >= s ? C.lime : "rgba(255,255,255,0.14)"}`,
                          background: step >= s ? C.lime : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.3s",
                          boxShadow: step === s ? "0 0 14px rgba(197,230,162,0.38)" : "none",
                          flexShrink: 0,
                        }}>
                          <span style={{ fontSize: 14, fontWeight: 700,
                            color: step >= s ? C.navy : "rgba(255,255,255,0.3)",
                            fontFamily: F.body }}>
                            {s}
                          </span>
                        </div>
                        {i < 2 && (
                          <div style={{ flex: 1, height: 1, maxWidth: 80,
                            background: step > s ? "rgba(197,230,162,0.45)" : "rgba(255,255,255,0.07)",
                            transition: "background 0.4s" }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* SUCCESS */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45 }}
                    style={{ textAlign: "center", padding: isMobile ? "20px 0" : "36px 0" }}>
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      style={{ width: 72, height: 72, borderRadius: "50%",
                        background: "rgba(197,230,162,0.1)",
                        border: "2px solid rgba(197,230,162,0.38)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 28px",
                        boxShadow: "0 0 32px rgba(197,230,162,0.18)" }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="#c5e6a2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                    <h2 style={{ fontFamily: ff, fontWeight: isRTL ? 500 : 700,
                      fontSize: isMobile ? 24 : 30, color: C.cream, margin: "0 0 12px", direction: dir }}>
                      {cp.successTitle}
                    </h2>
                    <p style={{ fontFamily: ff, fontSize: 17, color: "rgba(236,233,231,0.48)",
                      maxWidth: 400, margin: "0 auto 36px", lineHeight: 1.78, direction: dir }}>
                      {cp.successSub}
                    </p>
                    <a href={NOTION_CALENDAR} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "13px 32px", borderRadius: 50,
                        border: "1px solid rgba(197,230,162,0.32)",
                        color: C.lime, fontFamily: ff, fontWeight: 600, fontSize: 15,
                        textDecoration: "none" }}>
                      {cp.bookBtn} {isRTL ? "←" : "→"}
                    </a>
                  </motion.div>
                )}

                {/* STEP 1 — Contact info */}
                {status !== "success" && step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: isRTL ? -24 : 24 }}
                    animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                    style={{ direction: dir }}>
                    <h2 style={{ fontFamily: ff, fontWeight: isRTL ? 500 : 700,
                      fontSize: isMobile ? 22 : 26, color: C.cream, margin: "0 0 24px" }}>
                      {cp.step1Title}
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      <div>
                        <label style={labelStyle}>{cp.name}</label>
                        <input value={name} onChange={e => setName(e.target.value)}
                          style={inputStyle} onFocus={focusField} onBlur={blurField} />
                      </div>
                      <div>
                        <label style={labelStyle}>{cp.company}</label>
                        <input value={company} onChange={e => setCompany(e.target.value)}
                          style={inputStyle} onFocus={focusField} onBlur={blurField} />
                      </div>
                      <div>
                        <label style={labelStyle}>{cp.email}</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                          style={inputStyle} onFocus={focusField} onBlur={blurField} />
                      </div>
                    </div>
                    {errMsg && <p style={{ color: C.error, fontSize: 13, margin: "12px 0 0", fontFamily: ff }}>{errMsg}</p>}
                    <div style={{ marginTop: 28 }}>
                      <button onClick={nextStep1} style={{
                        width: isMobile ? "100%" : "auto",
                        padding: "14px 40px", borderRadius: 50, border: "none",
                        background: C.purple, color: "#fff",
                        fontFamily: ff, fontWeight: 700, fontSize: 15, cursor: "pointer",
                      }}>
                        {cp.next} {isRTL ? "←" : "→"}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 — Service selection */}
                {status !== "success" && step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: isRTL ? -24 : 24 }}
                    animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                    style={{ direction: dir }}>
                    <h2 style={{ fontFamily: ff, fontWeight: isRTL ? 500 : 700,
                      fontSize: isMobile ? 22 : 26, color: C.cream, margin: "0 0 6px" }}>
                      {cp.step2Title}
                    </h2>
                    <p style={{ fontSize: 13, color: "rgba(236,233,231,0.38)", fontFamily: ff, margin: "0 0 22px" }}>
                      {cp.step2Sub}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {cp.services.map((s: string, i: number) => (
                        <button key={i} onClick={() => setService(s)} style={{
                          padding: "13px 18px", borderRadius: 12,
                          textAlign: isRTL ? "right" : "left",
                          border: `1px solid ${service === s ? C.lime : "rgba(255,255,255,0.1)"}`,
                          background: service === s ? "rgba(197,230,162,0.07)" : "rgba(255,255,255,0.025)",
                          color: service === s ? C.lime : "rgba(236,233,231,0.72)",
                          fontWeight: service === s ? 600 : 400,
                          cursor: "pointer", fontSize: 15, fontFamily: ff,
                          transition: "all 0.15s",
                        }}>{s}</button>
                      ))}
                    </div>
                    {errMsg && <p style={{ color: C.error, fontSize: 13, margin: "12px 0 0", fontFamily: ff }}>{errMsg}</p>}
                    <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
                      <button onClick={() => { setErrMsg(""); setStep(1) }} style={{
                        flex: 1, padding: "14px", borderRadius: 50,
                        border: "1px solid rgba(255,255,255,0.1)", background: "transparent",
                        color: "rgba(236,233,231,0.38)", fontWeight: 600, fontSize: 14,
                        cursor: "pointer", fontFamily: ff,
                      }}>{cp.back}</button>
                      <button onClick={nextStep2} style={{
                        flex: 2, padding: "14px", borderRadius: 50, border: "none",
                        background: C.purple, color: "#fff",
                        fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: ff,
                      }}>{cp.next} {isRTL ? "←" : "→"}</button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 — Timeline + notes */}
                {status !== "success" && step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: isRTL ? -24 : 24 }}
                    animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                    style={{ direction: dir }}>
                    <h2 style={{ fontFamily: ff, fontWeight: isRTL ? 500 : 700,
                      fontSize: isMobile ? 22 : 26, color: C.cream, margin: "0 0 24px" }}>
                      {cp.step3Title}
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div>
                        <label style={labelStyle}>{cp.timelineLabel}</label>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                          {cp.timelines.map((tl: string) => (
                            <button key={tl} onClick={() => setTimeline(tl)} style={{
                              flex: 1, minWidth: 100, padding: "12px 8px", borderRadius: 10, fontSize: 13,
                              border: `1px solid ${timeline === tl ? C.lime : "rgba(255,255,255,0.1)"}`,
                              background: timeline === tl ? "rgba(197,230,162,0.07)" : "rgba(255,255,255,0.025)",
                              color: timeline === tl ? C.lime : "rgba(236,233,231,0.62)",
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
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <input type="checkbox" id="cp-consent" checked={consent} onChange={e => setConsent(e.target.checked)}
                          style={{ marginTop: 3, width: 16, height: 16, accentColor: C.lime, cursor: "pointer", flexShrink: 0 }} />
                        <label htmlFor="cp-consent"
                          style={{ fontSize: 13, color: "rgba(236,233,231,0.38)", fontFamily: ff, cursor: "pointer", lineHeight: 1.55 }}>
                          {cp.consent}
                        </label>
                      </div>
                    </div>
                    {errMsg && <p style={{ color: C.error, fontSize: 13, margin: "12px 0 0", fontFamily: ff }}>{errMsg}</p>}
                    <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
                      <button onClick={() => { setErrMsg(""); setStep(2) }} style={{
                        flex: 1, padding: "14px", borderRadius: 50,
                        border: "1px solid rgba(255,255,255,0.1)", background: "transparent",
                        color: "rgba(236,233,231,0.38)", fontWeight: 600, fontSize: 14,
                        cursor: "pointer", fontFamily: ff,
                      }}>{cp.back}</button>
                      <button onClick={submit} disabled={status === "loading"} style={{
                        flex: 2, padding: "14px", borderRadius: 50, border: "none",
                        background: C.lime, color: C.navy,
                        fontWeight: 700, fontSize: 15,
                        cursor: status === "loading" ? "wait" : "pointer",
                        fontFamily: ff, opacity: status === "loading" ? 0.7 : 1,
                        boxShadow: "0 0 24px rgba(197,230,162,0.14)",
                      }}>{status === "loading" ? cp.sending : cp.send}</button>
                    </div>
                  </motion.div>
                )}

                {/* Trust line */}
                {status !== "success" && (
                  <p style={{ fontSize: 12, color: "rgba(236,233,231,0.18)",
                    textAlign: "center", marginTop: 28, fontFamily: ff, margin: "28px 0 0" }}>
                    {cp.trustLine}
                  </p>
                )}

              </motion.div>
            </div>
          </Container>
        </section>

        <ContactFooter />

      </div>
    </LangCtx.Provider>
  )
}
