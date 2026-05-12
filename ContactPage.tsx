// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const WEB3FORMS_KEY = "abe931a2-a849-4da6-b9d6-ce7dfddc09d9"
const NOTION_CALENDAR = "https://calendar.notion.so/meet/octaloom/discovery"

const C = {
  purple:     "#712eac",
  deepPurple: "#201e4b",
  navy:       "#060d3d",
  lime:       "#c5e6a2",
  cream:      "#ece9e7",
  white:      "#ffffff",
  muted:      "#6b7280",
  border:     "#e5e7eb",
  error:      "#ef4444",
}

const F = {
  display: "'Discovery Fs', 'Discovery', 'Aeonik', sans-serif",
  body:    "'Aeonik', sans-serif",
}

const T = {
  he: {
    pageTitle:       "\u05d1\u05d5\u05d0\u05d5 \u05e0\u05d3\u05d1\u05e8",
    pageSub:         "\u05de\u05dc\u05d0\u05d5 \u05d0\u05ea \u05d4\u05e4\u05e8\u05d8\u05d9\u05dd \u05d5\u05e0\u05d7\u05d6\u05d5\u05e8 \u05d0\u05dc\u05d9\u05db\u05dd \u05ea\u05d5\u05da 24 \u05e9\u05e2\u05d5\u05ea.",
    step1Title:      "\u05e1\u05e4\u05e8\u05d5 \u05dc\u05e0\u05d5 \u05e7\u05e6\u05ea \u05e2\u05dc \u05e2\u05e6\u05de\u05db\u05dd",
    step2Title:      "\u05de\u05d4 \u05d0\u05ea\u05dd \u05de\u05d7\u05e4\u05e9\u05d9\u05dd?",
    step3Title:      "\u05e2\u05d5\u05d3 \u05e7\u05e6\u05ea",
    name:            "\u05e9\u05dd \u05de\u05dc\u05d0",
    company:         "\u05e9\u05dd \u05d4\u05d7\u05d1\u05e8\u05d4",
    email:           "\u05d0\u05d9\u05de\u05d9\u05d9\u05dc",
    services: [
      "LinkedIn Growth Engine",
      "\u05e0\u05d5\u05db\u05d7\u05d5\u05ea \u05de\u05dc\u05d0\u05d4 \u05d1\u05e8\u05e9\u05ea\u05d5\u05ea",
      "\u05ea\u05e9\u05ea\u05d9\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05ea",
      "CMO \u05e4\u05e8\u05e7\u05e6\u05d9\u05d5\u05e0\u05dc\u05d9",
      "\u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d9\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7",
      "\u05e4\u05d9\u05ea\u05d5\u05d7 \u05e1\u05d5\u05db\u05df AI",
      "\u05e2\u05d5\u05d3 \u05dc\u05d0 \u05d1\u05d8\u05d5\u05d7/\u05d4",
    ],
    timelineLabel:   "\u05de\u05ea\u05d9 \u05de\u05d7\u05e4\u05e9\u05d9\u05dd \u05dc\u05d4\u05ea\u05d7\u05d9\u05dc?",
    timelines:       ["\u05de\u05d9\u05d9\u05d3\u05d9", "1\u20133 \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd", "\u05e1\u05ea\u05dd \u05d1\u05d5\u05d3\u05e7/\u05ea"],
    notesLabel:      "\u05d4\u05d5\u05e1\u05d9\u05e4\u05d5 \u05de\u05e9\u05d4\u05d5 \u05e9\u05d7\u05e9\u05d5\u05d1 \u05dc\u05e0\u05d5 \u05dc\u05d3\u05e2\u05ea (\u05d0\u05e4\u05e9\u05e8\u05d9)",
    next:            "\u05d4\u05de\u05e9\u05d9\u05db\u05d5",
    back:            "\u05d7\u05d6\u05e8\u05d4",
    send:            "\u05e9\u05dc\u05d7\u05d5",
    sending:         "\u05e9\u05d5\u05dc\u05d7...",
    successTitle:    "\u05de\u05e2\u05d5\u05dc\u05d4! \u05e2\u05db\u05e9\u05d9\u05d5 \u05e9\u05d0\u05e0\u05d7\u05e0\u05d5 \u05d9\u05d5\u05d3\u05e2\u05d9\u05dd \u05de\u05d4 \u05d0\u05ea\u05dd \u05e6\u05e8\u05d9\u05db\u05d9\u05dd,",
    bookBtn:         "\u05e7\u05d1\u05e2\u05d5 \u05e9\u05d9\u05d7\u05d4 \u05e2\u05db\u05e9\u05d9\u05d5",
    errorRequired:   "\u05e0\u05d0 \u05dc\u05de\u05dc\u05d0 \u05d0\u05ea \u05db\u05dc \u05d4\u05e9\u05d3\u05d5\u05ea",
    errorEmail:      "\u05db\u05ea\u05d5\u05d1\u05ea \u05d0\u05d9\u05de\u05d9\u05d9\u05dc \u05dc\u05d0 \u05ea\u05e7\u05d9\u05e0\u05d4",
    errorSend:       "\u05e9\u05d2\u05d9\u05d0\u05d4 \u05d1\u05e9\u05dc\u05d9\u05d7\u05d4, \u05e0\u05e1\u05d5 \u05e9\u05d5\u05d1",
    selectService:   "\u05d1\u05d7\u05e8\u05d5 \u05d0\u05e4\u05e9\u05e8\u05d5\u05ea",
    selectTimeline:  "\u05d1\u05d7\u05e8\u05d5 \u05de\u05ea\u05d9",
    emailSubject:    "\u05e4\u05e0\u05d9\u05d9\u05d4 \u05d7\u05d3\u05e9\u05d4",
    emailFrom:       "\u05de",
  },
  en: {
    pageTitle:       "Let's talk",
    pageSub:         "Fill in the details and we'll get back to you within 24 hours.",
    step1Title:      "Tell us a bit about you",
    step2Title:      "What are you looking for?",
    step3Title:      "A bit more",
    name:            "Full name",
    company:         "Company name",
    email:           "Email",
    services:        ["LinkedIn Growth Engine", "Full Social Presence", "Marketing Infrastructure", "Fractional CMO", "Marketing Automation", "AI Agent Development", "Not sure yet"],
    timelineLabel:   "When are you looking to start?",
    timelines:       ["Immediately", "1\u20133 months", "Just exploring"],
    notesLabel:      "Anything important we should know (optional)",
    next:            "Next",
    back:            "Back",
    send:            "Send",
    sending:         "Sending\u2026",
    successTitle:    "Great! Now that we know what you need,",
    bookBtn:         "Book the call now",
    errorRequired:   "Please fill in all fields",
    errorEmail:      "Invalid email address",
    errorSend:       "Send failed, please try again",
    selectService:   "Select an option",
    selectTimeline:  "Select timeline",
    emailSubject:    "New inquiry",
    emailFrom:       "from",
  },
}

export default function ContactPage() {
  const [step, setStep]         = useState(1)
  const [lang, setLang]         = useState("he")
  const [name, setName]         = useState("")
  const [company, setCompany]   = useState("")
  const [email, setEmail]       = useState("")
  const [service, setService]   = useState("")
  const [timeline, setTimeline] = useState("")
  const [notes, setNotes]       = useState("")
  const [status, setStatus]     = useState("idle")
  const [errMsg, setErrMsg]     = useState("")

  const detectLang = useCallback(() => {
    if (typeof window === "undefined") return "he"
    const saved = localStorage.getItem("octaloom-lang")
    if (saved === "en" || saved === "he") return saved
    const domLang = document.documentElement.lang ?? ""
    if (domLang === "en") return "en"
    return "he"
  }, [])

  useEffect(() => { setLang(detectLang()) }, [detectLang])

  useEffect(() => {
    const obs = new MutationObserver(() => setLang(detectLang()))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] })
    return () => obs.disconnect()
  }, [detectLang])

  const t = T[lang] || T.he
  const isRTL = lang === "he"
  const ff = isRTL ? F.display : F.body

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
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject:    `${t.emailSubject}: ${name} ${t.emailFrom} ${company}`,
          from_name:  "OctaLoom Website",
          name, email, company, service, timeline,
          notes:      notes || "\u2014",
        }),
      })
      const data = await res.json()
      if (data.success) setStatus("success")
      else { setErrMsg(t.errorSend); setStatus("error") }
    } catch {
      setErrMsg(t.errorSend); setStatus("error")
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", borderRadius: 10,
    border: `1.5px solid ${C.border}`, fontSize: 16, fontFamily: ff,
    outline: "none", boxSizing: "border-box",
    direction: isRTL ? "rtl" : "ltr", background: C.white,
    color: C.deepPurple,
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 14, fontWeight: 600, color: C.deepPurple,
    marginBottom: 8, display: "block", fontFamily: ff,
    textAlign: isRTL ? "right" : "left",
  }

  const primaryBtn: React.CSSProperties = {
    flex: 2, background: C.purple, color: C.white, padding: "15px",
    borderRadius: 10, border: "none", fontWeight: 700, fontSize: 16,
    cursor: "pointer", fontFamily: ff,
  }

  const ghostBtn: React.CSSProperties = {
    flex: 1, padding: "15px", borderRadius: 10,
    border: `1.5px solid ${C.border}`, background: "transparent",
    color: C.muted, fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: ff,
  }

  return (
    <div style={{
      width: "100vw", minHeight: "100vh", background: C.cream,
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "80px 20px 60px", boxSizing: "border-box",
      direction: isRTL ? "rtl" : "ltr",
    }}>
      <div style={{ width: "100%", maxWidth: 540 }}>

        {/* Page header */}
        {status !== "success" && (
          <div style={{ marginBottom: 40, textAlign: isRTL ? "right" : "left" }}>
            <h1 style={{ fontSize: 42, fontWeight: 700, color: C.deepPurple, margin: "0 0 12px", fontFamily: ff, lineHeight: 1.2 }}>
              {t.pageTitle}
            </h1>
            <p style={{ fontSize: 17, color: C.muted, margin: 0, fontFamily: ff }}>{t.pageSub}</p>
          </div>
        )}

        {/* Progress */}
        {status !== "success" && (
          <div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{
                height: 4, flex: 1, borderRadius: 2,
                background: s <= step ? C.purple : C.border,
                transition: "background 0.3s",
              }} />
            ))}
          </div>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", paddingTop: 60 }}
          >
            <div style={{ fontSize: 56, marginBottom: 20 }}>{"\u1f389"}</div>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: C.deepPurple, margin: "0 0 32px", fontFamily: ff }}>{t.successTitle}</h2>
            <a
              href={NOTION_CALENDAR}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block", background: C.purple, color: C.white,
                padding: "16px 36px", borderRadius: 10, fontWeight: 700, fontSize: 17,
                textDecoration: "none", fontFamily: ff,
              }}
            >{t.bookBtn}</a>
          </motion.div>
        )}

        {/* STEP 1 */}
        {status !== "success" && step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: isRTL ? -20 : 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: C.deepPurple, margin: "0 0 24px", fontFamily: ff }}>{t.step1Title}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={labelStyle}>{t.name}</label>
                <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>{t.company}</label>
                <input value={company} onChange={e => setCompany(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>{t.email}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
              </div>
            </div>
            {errMsg && <p style={{ color: C.error, fontSize: 13, margin: "12px 0 0", fontFamily: ff }}>{errMsg}</p>}
            <button onClick={nextStep1} style={{ ...primaryBtn, flex: "unset", width: "100%", marginTop: 28 }}>{t.next}</button>
          </motion.div>
        )}

        {/* STEP 2 */}
        {status !== "success" && step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: isRTL ? -20 : 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: C.deepPurple, margin: "0 0 24px", fontFamily: ff }}>{t.step2Title}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {t.services.map((s: string) => (
                <button key={s} onClick={() => setService(s)} style={{
                  padding: "13px 18px", borderRadius: 10,
                  textAlign: isRTL ? "right" : "left",
                  border: `1.5px solid ${service === s ? C.purple : C.border}`,
                  background: service === s ? "rgba(113,46,172,0.07)" : C.white,
                  color: service === s ? C.purple : C.deepPurple,
                  fontWeight: service === s ? 700 : 400,
                  cursor: "pointer", fontSize: 15, fontFamily: ff,
                  transition: "all 0.15s",
                }}>{s}</button>
              ))}
            </div>
            {errMsg && <p style={{ color: C.error, fontSize: 13, margin: "12px 0 0", fontFamily: ff }}>{errMsg}</p>}
            <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
              <button onClick={() => { setErrMsg(""); setStep(1) }} style={ghostBtn}>{t.back}</button>
              <button onClick={nextStep2} style={primaryBtn}>{t.next}</button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 */}
        {status !== "success" && step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: isRTL ? -20 : 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: C.deepPurple, margin: "0 0 24px", fontFamily: ff }}>{t.step3Title}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={labelStyle}>{t.timelineLabel}</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {t.timelines.map((tl: string) => (
                    <button key={tl} onClick={() => setTimeline(tl)} style={{
                      flex: 1, padding: "12px 8px", borderRadius: 10, fontSize: 14,
                      border: `1.5px solid ${timeline === tl ? C.purple : C.border}`,
                      background: timeline === tl ? "rgba(113,46,172,0.07)" : C.white,
                      color: timeline === tl ? C.purple : C.deepPurple,
                      fontWeight: timeline === tl ? 700 : 400,
                      cursor: "pointer", fontFamily: ff, transition: "all 0.15s",
                    }}>{tl}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>{t.notesLabel}</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
            </div>
            {errMsg && <p style={{ color: C.error, fontSize: 13, margin: "12px 0 0", fontFamily: ff }}>{errMsg}</p>}
            <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
              <button onClick={() => { setErrMsg(""); setStep(2) }} style={ghostBtn}>{t.back}</button>
              <button
                onClick={submit}
                disabled={status === "loading"}
                style={{ ...primaryBtn, opacity: status === "loading" ? 0.7 : 1, cursor: status === "loading" ? "wait" : "pointer" }}
              >{status === "loading" ? t.sending : t.send}</button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}
