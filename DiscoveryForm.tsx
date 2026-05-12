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
    successSub:      "",
    bookBtn:         "\u05e7\u05d1\u05e2\u05d5 \u05e9\u05d9\u05d7\u05d4 \u05e2\u05db\u05e9\u05d9\u05d5",
    errorRequired:   "\u05e0\u05d0 \u05dc\u05de\u05dc\u05d0 \u05d0\u05ea \u05db\u05dc \u05d4\u05e9\u05d3\u05d5\u05ea",
    errorEmail:      "\u05db\u05ea\u05d5\u05d1\u05ea \u05d0\u05d9\u05de\u05d9\u05d9\u05dc \u05dc\u05d0 \u05ea\u05e7\u05d9\u05e0\u05d4",
    errorSend:       "\u05e9\u05d2\u05d9\u05d0\u05d4 \u05d1\u05e9\u05dc\u05d9\u05d7\u05d4, \u05e0\u05e1\u05d5 \u05e9\u05d5\u05d1",
    selectService:   "\u05d1\u05d7\u05e8\u05d5 \u05d0\u05e4\u05e9\u05e8\u05d5\u05ea",
    selectTimeline:  "\u05d1\u05d7\u05e8\u05d5 \u05de\u05ea\u05d9",
    emailSubject:    "\u05e4\u05e0\u05d9\u05d9\u05d4 \u05d7\u05d3\u05e9\u05d4",
    emailFrom:       "\u05de",
    emailTitle:      "\u05e4\u05e0\u05d9\u05d9\u05d4 \u05d7\u05d3\u05e9\u05d4 \u05de\u05d4\u05d0\u05ea\u05e8",
    fName:           "\u05e9\u05dd",
    fCompany:        "\u05d7\u05d1\u05e8\u05d4",
    fEmail:          "\u05d0\u05d9\u05de\u05d9\u05d9\u05dc",
    fService:        "\u05de\u05d4 \u05de\u05d7\u05e4\u05e9\u05d9\u05dd",
    fTimeline:       "\u05ea\u05d9\u05d6\u05de\u05d5\u05df",
    fNotes:          "\u05d4\u05e2\u05e8\u05d5\u05ea",
  },
  en: {
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
    successSub:      "",
    bookBtn:         "Book the call now",
    errorRequired:   "Please fill in all fields",
    errorEmail:      "Invalid email address",
    errorSend:       "Send failed, please try again",
    selectService:   "Select an option",
    selectTimeline:  "Select timeline",
    emailSubject:    "New inquiry",
    emailFrom:       "from",
    emailTitle:      "New inquiry from the website",
    fName:           "Name",
    fCompany:        "Company",
    fEmail:          "Email",
    fService:        "Looking for",
    fTimeline:       "Timeline",
    fNotes:          "Notes",
  },
}

export default function DiscoveryForm() {
  const [open, setOpen]       = useState(false)
  const [step, setStep]       = useState(1)
  const [lang, setLang]       = useState<"he" | "en">("he")
  const [name, setName]       = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail]     = useState("")
  const [service, setService] = useState("")
  const [timeline, setTimeline] = useState("")
  const [notes, setNotes]     = useState("")
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errMsg, setErrMsg]   = useState("")

  const detectLang = useCallback(() => {
    if (typeof window === "undefined") return "he"
    const saved = localStorage.getItem("octaloom-lang")
    if (saved === "en" || saved === "he") return saved
    const domLang = document.documentElement.lang ?? ""
    if (domLang === "en") return "en"
    return "he"
  }, [])

  useEffect(() => {
    setLang(detectLang())
  }, [detectLang])

  useEffect(() => {
    const obs = new MutationObserver(() => setLang(detectLang()))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] })
    return () => obs.disconnect()
  }, [detectLang])

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener("open-discovery", handler)
    return () => window.removeEventListener("open-discovery", handler)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    setTimeout(() => {
      setStep(1)
      setName(""); setCompany(""); setEmail("")
      setService(""); setTimeline(""); setNotes("")
      setStatus("idle"); setErrMsg("")
    }, 300)
  }, [])

  const t = T[lang]
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
    width: "100%", padding: "12px 14px", borderRadius: 8,
    border: `1.5px solid ${C.border}`, fontSize: 15, fontFamily: ff,
    outline: "none", boxSizing: "border-box",
    direction: isRTL ? "rtl" : "ltr", background: C.white,
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: C.deepPurple,
    marginBottom: 6, display: "block", fontFamily: ff,
    textAlign: isRTL ? "right" : "left",
  }

  const primaryBtn: React.CSSProperties = {
    flex: 2, background: C.purple, color: C.white, padding: "14px",
    borderRadius: 8, border: "none", fontWeight: 700, fontSize: 16,
    cursor: "pointer", fontFamily: ff,
  }

  const ghostBtn: React.CSSProperties = {
    flex: 1, padding: "14px", borderRadius: 8,
    border: `1.5px solid ${C.border}`, background: "transparent",
    color: C.muted, fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: ff,
  }

  return (
    <>
      <div style={{ width: 1, height: 1, overflow: "hidden", position: "absolute", pointerEvents: "none" }} />

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={e => { if (e.target === e.currentTarget) close() }}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              backgroundColor: "rgba(6,13,61,0.72)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 20,
            }}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              style={{
                background: C.white, borderRadius: 16, padding: "32px 28px",
                width: "100%", maxWidth: 480,
                direction: isRTL ? "rtl" : "ltr",
                position: "relative", maxHeight: "90vh", overflowY: "auto",
              }}
            >
              {/* Close button */}
              <button
                onClick={close}
                style={{
                  position: "absolute", top: 14,
                  [isRTL ? "left" : "right"]: 14,
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 24, color: C.muted, lineHeight: 1, padding: 4,
                }}
              >{"\u00d7"}</button>

              {/* Progress bar */}
              {status !== "success" && (
                <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
                  {[1, 2, 3].map(s => (
                    <div key={s} style={{
                      height: 3, flex: 1, borderRadius: 2,
                      background: s <= step ? C.purple : C.border,
                      transition: "background 0.3s",
                    }} />
                  ))}
                </div>
              )}

              {/* \u2500\u2500 SUCCESS \u2500\u2500 */}
              {status === "success" && (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>{"\ud83c\udf89"}</div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: C.deepPurple, margin: "0 0 28px", fontFamily: ff }}>{t.successTitle}</h2>
                  <a
                    href={NOTION_CALENDAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block", background: C.purple, color: C.white,
                      padding: "14px 32px", borderRadius: 8, fontWeight: 700, fontSize: 16,
                      textDecoration: "none", fontFamily: ff,
                    }}
                  >{t.bookBtn}</a>
                </div>
              )}

              {/* \u2500\u2500 STEP 1 \u2500\u2500 */}
              {status !== "success" && step === 1 && (
                <>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.deepPurple, margin: "0 0 22px", fontFamily: ff }}>{t.step1Title}</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                  <button onClick={nextStep1} style={{ ...primaryBtn, flex: "unset", width: "100%", marginTop: 24 }}>{t.next}</button>
                </>
              )}

              {/* \u2500\u2500 STEP 2 \u2500\u2500 */}
              {status !== "success" && step === 2 && (
                <>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.deepPurple, margin: "0 0 22px", fontFamily: ff }}>{t.step2Title}</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {t.services.map(s => (
                      <button key={s} onClick={() => setService(s)} style={{
                        padding: "12px 16px", borderRadius: 8,
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
                  <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                    <button onClick={() => { setErrMsg(""); setStep(1) }} style={ghostBtn}>{t.back}</button>
                    <button onClick={nextStep2} style={primaryBtn}>{t.next}</button>
                  </div>
                </>
              )}

              {/* \u2500\u2500 STEP 3 \u2500\u2500 */}
              {status !== "success" && step === 3 && (
                <>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.deepPurple, margin: "0 0 22px", fontFamily: ff }}>{t.step3Title}</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div>
                      <label style={labelStyle}>{t.timelineLabel}</label>
                      <div style={{ display: "flex", gap: 8 }}>
                        {t.timelines.map(tl => (
                          <button key={tl} onClick={() => setTimeline(tl)} style={{
                            flex: 1, padding: "10px 6px", borderRadius: 8, fontSize: 13,
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
                        rows={3}
                        style={{ ...inputStyle, resize: "vertical" }}
                      />
                    </div>
                  </div>
                  {errMsg && <p style={{ color: C.error, fontSize: 13, margin: "12px 0 0", fontFamily: ff }}>{errMsg}</p>}
                  <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                    <button onClick={() => { setErrMsg(""); setStep(2) }} style={ghostBtn}>{t.back}</button>
                    <button
                      onClick={submit}
                      disabled={status === "loading"}
                      style={{ ...primaryBtn, opacity: status === "loading" ? 0.7 : 1, cursor: status === "loading" ? "wait" : "pointer" }}
                    >{status === "loading" ? t.sending : t.send}</button>
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
