// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"

// ── Design tokens ────────────────────────────────────────────────────────────
const C = {
    purple: "#712eac",
    navy: "#201e4b",
    deepNavy: "#060d3d",
    lime: "#c5e6a2",
    cream: "#ece9e7",
    muted: "#5c5878",
}
const FONT_DISPLAY = "'Discovery Fs', 'Discovery', sans-serif"
const FONT_BODY = "'Aeonik', sans-serif"
const GIF_URL =
    "https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/gif%20hanita.gif"

// ── Copy ─────────────────────────────────────────────────────────────────────
const COPY = {
    en: {
        taglines: [
            "This weave leads nowhere.",
            "The weave came undone.",
            "Lost between the weaves.",
            "This page unweaved itself.",
            "Weave gone wrong.",
        ],
        subtitles: [
            "Looks like this page got tangled up somewhere.\nDon't worry, even the best looms skip a stitch.",
            "We searched every thread and came up empty.\nLet's get you back on the right pattern.",
            "This page decided to go freelance.\nUnfortunately, it didn't leave a forwarding address.",
            "Our threads are usually very well-organized.\nThis one clearly had other plans.",
            "404: Page not found. Dignity: also missing.\nLet's pretend this never happened.",
        ],
        cta: "Back to safety",
        easterEgg: [
            "You clicked {n} times. The page is still missing.",
            "That's {n} clicks. Impressive commitment.",
            "{n} clicks. This page isn't coming back, you know.",
            "{n}. Okay, you win. But the page still doesn't exist.",
            "{n} clicks?! You should be running a company. Oh wait.",
        ],
    },
    he: {
        taglines: [
            "\u05D4\u05E2\u05DE\u05D5\u05D3 \u05D4\u05D6\u05D4 \u05D4\u05EA\u05E4\u05E8\u05E7",
            "\u05D4\u05D0\u05E8\u05D9\u05D2\u05D4 \u05E0\u05E4\u05E8\u05DE\u05D4.",
            "\u05D4\u05D5\u05DC\u05DB\u05D9\u05DD \u05DC\u05D0\u05D9\u05D1\u05D5\u05D3 \u05D1\u05D3\u05D5\u05D2\u05DE\u05D4.",
            "\u05D4\u05D7\u05D5\u05D8 \u05D4\u05D6\u05D4 \u05DC\u05D0 \u05DE\u05D5\u05D1\u05D9\u05DC \u05DC\u05E9\u05D5\u05DD \u05DE\u05E7\u05D5\u05DD.",
            "\u05D7\u05D5\u05D8 \u05DC\u05D0 \u05E0\u05DB\u05D5\u05DF, \u05D7\u05D1\u05E8/\u05D4.",
        ],
        subtitles: [
            "\u05E0\u05E8\u05D0\u05D4 \u05E9\u05E0\u05E4\u05E8\u05DD \u05DC\u05E0\u05D5 \u05E7\u05E9\u05E8 \u05D1\u05D3\u05E8\u05DA.\n\u05D1\u05D5\u05D0\u05D5 \u05E0\u05D7\u05D6\u05D5\u05E8 \u05DC\u05E0\u05E7\u05D5\u05D3\u05D4 \u05E9\u05D1\u05D4 \u05D4\u05DB\u05DC \u05DE\u05EA\u05D7\u05D1\u05E8 \u05D5\u05E0\u05EA\u05D7\u05D9\u05DC \u05DC\u05D0\u05E8\u05D5\u05D2 \u05DE\u05D7\u05D3\u05E9.",
            "\u05D7\u05D9\u05E4\u05E9\u05E0\u05D5 \u05D1\u05DB\u05DC \u05D7\u05D5\u05D8 \u05D5\u05D9\u05E6\u05D0\u05E0\u05D5 \u05D1\u05D9\u05D3\u05D9\u05D9\u05DD \u05E8\u05D9\u05E7\u05D5\u05EA.\n\u05D1\u05D5\u05D0\u05D5 \u05E0\u05D7\u05D6\u05D9\u05E8 \u05D0\u05EA\u05DB\u05DD \u05DC\u05D3\u05D5\u05D2\u05DE\u05D4 \u05D4\u05E0\u05DB\u05D5\u05E0\u05D4.",
            "\u05D4\u05E2\u05DE\u05D5\u05D3 \u05D4\u05D7\u05DC\u05D9\u05D8 \u05DC\u05E6\u05D0\u05EA \u05DC\u05E4\u05E8\u05D9\u05DC\u05E0\u05E1.\n\u05DC\u05E6\u05E2\u05E8\u05E0\u05D5, \u05D4\u05D5\u05D0 \u05DC\u05D0 \u05D4\u05E9\u05D0\u05D9\u05E8 \u05DB\u05EA\u05D5\u05D1\u05EA.",
            "\u05D4\u05D7\u05D5\u05D8\u05D9\u05DD \u05E9\u05DC\u05E0\u05D5 \u05D1\u05D3\u05E8\u05DA \u05DB\u05DC\u05DC \u05DE\u05E1\u05D5\u05D3\u05E8\u05D9\u05DD.\n\u05DC\u05D6\u05D4 \u05DB\u05E0\u05E8\u05D0\u05D4 \u05D4\u05D9\u05D5 \u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05EA.",
            "404: \u05E2\u05DE\u05D5\u05D3 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0. \u05DB\u05D1\u05D5\u05D3: \u05D2\u05DD \u05E0\u05E2\u05DC\u05DD.\n\u05D1\u05D5\u05D0\u05D5 \u05E0\u05E2\u05E9\u05D4 \u05DB\u05D0\u05D9\u05DC\u05D5 \u05D6\u05D4 \u05DC\u05D0 \u05E7\u05E8\u05D4.",
        ],
        cta: "\u05D7\u05D6\u05E8\u05D4 \u05DC\u05DE\u05E7\u05D5\u05DD \u05D1\u05D8\u05D5\u05D7",
        easterEgg: [
            "\u05DC\u05D7\u05E6\u05EA {n} \u05E4\u05E2\u05DE\u05D9\u05DD. \u05D4\u05E2\u05DE\u05D5\u05D3 \u05E2\u05D3\u05D9\u05D9\u05DF \u05D7\u05E1\u05E8.",
            "\u05D6\u05D4 {n} \u05DC\u05D7\u05D9\u05E6\u05D5\u05EA. \u05DE\u05D7\u05D5\u05D9\u05D1\u05D5\u05EA \u05DE\u05E8\u05E9\u05D9\u05DE\u05D4.",
            "{n} \u05DC\u05D7\u05D9\u05E6\u05D5\u05EA. \u05D4\u05E2\u05DE\u05D5\u05D3 \u05DC\u05D0 \u05D7\u05D5\u05D6\u05E8, \u05D0\u05EA\u05D4 \u05D9\u05D5\u05D3\u05E2.",
            "{n}. \u05D0\u05D5\u05E7\u05D9\u05D9, \u05E0\u05D9\u05E6\u05D7\u05EA. \u05D0\u05D1\u05DC \u05D4\u05E2\u05DE\u05D5\u05D3 \u05E2\u05D3\u05D9\u05D9\u05DF \u05DC\u05D0 \u05E7\u05D9\u05D9\u05DD.",
            "{n} \u05DC\u05D7\u05D9\u05E6\u05D5\u05EA?! \u05D0\u05EA\u05D4 \u05E6\u05E8\u05D9\u05DA \u05DC\u05E0\u05D4\u05DC \u05D7\u05D1\u05E8\u05D4. \u05E8\u05D2\u05E2...",
        ],
    },
}

// ── Spark type ────────────────────────────────────────────────────────────────
type Spark = {
    id: number
    x: number
    y: number
    color: string
    dx: number
    dy: number
    size: number
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function OctaLoom404NotFound() {
    const [lang, setLang] = useState<"he" | "en">("he")
    const [copyIndex] = useState(() => Math.floor(Math.random() * 5))
    const [isFalling, setIsFalling] = useState(false)
    const [clickCount, setClickCount] = useState(0)
    const [sparks, setSparks] = useState<Spark[]>([])

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const gifRef = useRef<HTMLImageElement>(null)
    const logoControls = useAnimation()
    const d1Controls = useAnimation()
    const d2Controls = useAnimation()

    // Load lang from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem("octaloom-lang") as "he" | "en"
            if (saved === "he" || saved === "en") setLang(saved)
        } catch {}
    }, [])

    // Logo fall after 3s
    useEffect(() => {
        const t = setTimeout(async () => {
            setIsFalling(true)
            await logoControls.start({
                y: [0, -12, 380],
                rotate: [0, -7, 20],
                opacity: [1, 1, 0],
                transition: {
                    duration: 1.1,
                    times: [0, 0.18, 1],
                    ease: "easeIn",
                },
            })
        }, 3000)
        return () => clearTimeout(t)
    }, [])

    // GIF loop reset every 8s
    useEffect(() => {
        const iv = setInterval(() => {
            if (gifRef.current) {
                const base = gifRef.current.src.split("?")[0]
                gifRef.current.src = base + "?t=" + Date.now()
            }
        }, 8000)
        return () => clearInterval(iv)
    }, [])

    // Canvas threads animation
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animId: number

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener("resize", resize)

        const generateCurve = () => {
            const sx = Math.random() * 1.4 - 0.2
            const sy = Math.random()
            return Array.from({ length: 5 }, (_, j) => ({
                x:
                    sx +
                    (j / 4) *
                        (0.5 + Math.random() * 0.5) *
                        (Math.random() > 0.5 ? 1 : -1),
                y: sy + (j / 4) * (0.6 + Math.random() * 0.4),
                vx: (Math.random() - 0.5) * 0.02,
                vy: (Math.random() - 0.5) * 0.01,
            }))
        }

        const threads = Array.from({ length: 8 }, (_, i) => ({
            points: generateCurve(),
            speed: 0.2 + Math.random() * 0.4,
            offset: Math.random() * Math.PI * 2,
            color:
                i % 3 === 0
                    ? "rgba(113,46,172,0.06)"
                    : i % 3 === 1
                      ? "rgba(197,230,162,0.08)"
                      : "rgba(32,30,75,0.04)",
            width: 1 + Math.random() * 2,
        }))

        const draw = (t: number) => {
            const w = canvas.width
            const h = canvas.height
            ctx.clearRect(0, 0, w, h)
            threads.forEach(thread => {
                ctx.beginPath()
                ctx.strokeStyle = thread.color
                ctx.lineWidth = thread.width
                ctx.lineCap = "round"
                const pts = thread.points.map(p => ({
                    x:
                        (p.x +
                            Math.sin(
                                t * 0.001 * thread.speed +
                                    p.vx * 100 +
                                    thread.offset
                            ) *
                                0.03) *
                        w,
                    y:
                        (p.y +
                            Math.cos(
                                t * 0.001 * thread.speed +
                                    p.vy * 100 +
                                    thread.offset
                            ) *
                                0.02) *
                        h,
                }))
                ctx.moveTo(pts[0].x, pts[0].y)
                for (let i = 1; i < pts.length - 1; i++) {
                    const cpx = (pts[i].x + pts[i + 1].x) / 2
                    const cpy = (pts[i].y + pts[i + 1].y) / 2
                    ctx.quadraticCurveTo(pts[i].x, pts[i].y, cpx, cpy)
                }
                ctx.stroke()
            })
            animId = requestAnimationFrame(draw)
        }
        animId = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener("resize", resize)
        }
    }, [])

    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleSetLang = (l: "he" | "en") => {
        setLang(l)
        try {
            localStorage.setItem("octaloom-lang", l)
        } catch {}
    }

    const handleDigitClick = async (which: "d1" | "d2") => {
        const ctrl = which === "d1" ? d1Controls : d2Controls
        ctrl.start({
            rotate: [0, -12, 10, -6, 4, 0],
            transition: { duration: 0.5 },
        })
        setClickCount(n => n + 1)
    }

    const emitSparks = (cx: number, cy: number) => {
        const colors = [C.purple, C.lime, C.navy, C.purple, C.lime]
        const newSparks: Spark[] = Array.from({ length: 10 }, (_, i) => {
            const angle =
                (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.5
            const dist = 40 + Math.random() * 60
            return {
                id: Date.now() + i,
                x: cx,
                y: cy,
                color: colors[i % colors.length],
                dx: Math.cos(angle) * dist,
                dy: Math.sin(angle) * dist,
                size: 4 + Math.random() * 5,
            }
        })
        setSparks(prev => [...prev, ...newSparks])
        setTimeout(() => {
            const ids = new Set(newSparks.map(s => s.id))
            setSparks(prev => prev.filter(s => !ids.has(s.id)))
        }, 700)
    }

    const handleLogoClick = (e: React.MouseEvent) => {
        if (isFalling) return
        logoControls.start({
            rotate: [0, 180, 360],
            scale: [1, 0.85, 1],
            transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
        })
        emitSparks(e.clientX, e.clientY)
        setClickCount(n => n + 1)
    }

    // ── Derived ───────────────────────────────────────────────────────────────
    const c = COPY[lang]
    const isRTL = lang === "he"
    const tagline = isRTL ? c.taglines[0] : c.taglines[copyIndex]
    const subtitle = isRTL ? c.subtitles[0] : c.subtitles[copyIndex]
    const easterMsg =
        clickCount >= 3
            ? c.easterEgg[
                  Math.min(
                      Math.floor((clickCount - 3) / 4),
                      c.easterEgg.length - 1
                  )
              ].replace("{n}", String(clickCount))
            : ""

    // ── Styles ────────────────────────────────────────────────────────────────
    const root: React.CSSProperties = {
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background: C.cream,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_BODY,
        color: C.navy,
        direction: isRTL ? "rtl" : "ltr",
        WebkitFontSmoothing: "antialiased",
    }

    const digitStyle: React.CSSProperties = {
        fontFamily: FONT_DISPLAY,
        fontWeight: 500,
        fontSize: "clamp(100px, 18vw, 180px)",
        lineHeight: 1,
        color: C.navy,
        cursor: "grab",
        userSelect: "none",
        transition: "color 0.3s",
    }

    const ctaBtnStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "16px 32px",
        borderRadius: 10,
        background: C.purple,
        color: "#fff",
        fontSize: 16,
        fontWeight: isRTL ? 500 : 700,
        fontFamily: isRTL ? FONT_DISPLAY : FONT_BODY,
        textDecoration: "none",
        cursor: "pointer",
        border: "none",
    }

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div style={root}>
            {/* Glow blobs */}
            <div
                style={{
                    position: "absolute",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: C.purple,
                    filter: "blur(120px)",
                    top: "-15%",
                    right: "5%",
                    opacity: 0.09,
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background: C.lime,
                    filter: "blur(120px)",
                    bottom: "-10%",
                    left: "-5%",
                    opacity: 0.12,
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background: C.purple,
                    filter: "blur(120px)",
                    bottom: "20%",
                    right: "25%",
                    opacity: 0.05,
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* Canvas threads */}
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* Language toggle */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: "absolute",
                    top: 24,
                    [isRTL ? "left" : "right"]: 24,
                    zIndex: 20,
                    display: "flex",
                    gap: 2,
                    background: "rgba(113,46,172,0.06)",
                    borderRadius: 8,
                    padding: 3,
                }}
            >
                {(["en", "he"] as const).map(l => (
                    <button
                        key={l}
                        onClick={() => handleSetLang(l)}
                        style={{
                            background: lang === l ? C.purple : "none",
                            color: lang === l ? "#fff" : C.muted,
                            fontSize: 13,
                            fontWeight: 700,
                            padding: "6px 14px",
                            borderRadius: 6,
                            border: "none",
                            cursor: "pointer",
                            fontFamily: FONT_BODY,
                            letterSpacing: "0.05em",
                            transition: "all 0.3s",
                        }}
                    >
                        {l === "en" ? "EN" : "\u05E2\u05D1"}
                    </button>
                ))}
            </motion.div>

            {/* Main content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: 20,
                    maxWidth: 700,
                }}
            >
                {/* 404 number */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 32,
                        userSelect: "none",
                    }}
                >
                    {/* Digit 4 left */}
                    <motion.span
                        animate={d1Controls}
                        onClick={() => handleDigitClick("d1")}
                        whileHover={{ color: C.purple }}
                        style={digitStyle}
                    >
                        4
                    </motion.span>

                    {/* Logo zero */}
                    <motion.div
                        animate={logoControls}
                        onClick={handleLogoClick}
                        style={{
                            width: "clamp(90px, 16vw, 160px)",
                            height: "clamp(90px, 16vw, 160px)",
                            cursor: isFalling ? "default" : "pointer",
                            position: "relative",
                            color: C.purple,
                            filter: "drop-shadow(0 4px 20px rgba(113,46,172,0.2))",
                            pointerEvents: isFalling ? "none" : "auto",
                        }}
                    >
                        <svg
                            viewBox="0 0 301.75 301.13"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ width: "100%", height: "100%" }}
                        >
                            <g>
                                <path
                                    d="M198.3,194.74l-1.05-.84c-.08-.07-.16-.13-.24-.22l-13.67-13.67,15.51-15.51,12.7,12.7,10.6-10.61-12.7-12.7,15.52-15.5,13.65,13.65c.09.09.17.17.24.27l.83,1.05-41.39,41.38ZM187.58,180.01l10.6,10.61,11.27-11.27-10.6-10.61-11.27,11.27ZM213.69,153.89l10.61,10.61,11.27-11.26-10.6-10.61-11.27,11.26Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M87.17,83.81l-13.65-13.65c-.09-.09-.16-.16-.24-.26l-.84-1.05,41.4-41.39,1.05.84c.09.07.17.15.26.24l13.65,13.65-15.5,15.51-12.7-12.7-10.61,10.6,12.7,12.7-15.51,15.51ZM76.57,68.97l10.6,10.6,11.27-11.27-10.6-10.6-11.27,11.27ZM102.69,42.85l10.61,10.61,11.26-11.27-10.6-10.6-11.27,11.26Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M156.06,222.21h0c-9.53,0-18.47-3.7-25.19-10.43l-75.48-75.5c-6.72-6.72-10.42-15.66-10.42-25.19,0-9.53,3.7-18.47,10.43-25.19l6.45-6.45,1.05,1.3,13.67,13.67-6.32,6.32c-2.76,2.76-4.28,6.43-4.28,10.35,0,3.91,1.52,7.59,4.28,10.34l32.44,32.45-12.7,12.7,10.61,10.61,12.7-12.7,32.44,32.45c2.75,2.76,6.43,4.28,10.34,4.28h0c3.91,0,7.59-1.52,10.35-4.28l6.32-6.32,13.65,13.65,1.3,1.05-1.16,1.2-5.27,5.27c-6.71,6.72-15.66,10.42-25.19,10.42Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M250.29,142.76l-1.05-1.31-13.67-13.67,6.32-6.33c2.76-2.76,4.28-6.43,4.28-10.34,0-3.91-1.52-7.59-4.28-10.35l-32.44-32.45,12.7-12.7-10.6-10.6-12.7,12.7-32.44-32.44c-2.76-2.76-6.43-4.28-10.35-4.28h0c-3.91,0-7.58,1.52-10.34,4.28l-6.33,6.32-13.65-13.65-1.3-1.05,1.16-1.2,5.27-5.27c6.72-6.72,15.66-10.42,25.19-10.42h0c9.53,0,18.47,3.7,25.19,10.43l75.48,75.5c6.72,6.72,10.42,15.66,10.42,25.19,0,9.53-3.7,18.47-10.42,25.19l-6.46,6.46Z"
                                    fill="currentColor"
                                />
                            </g>
                        </svg>
                    </motion.div>

                    {/* Digit 4 right */}
                    <motion.span
                        animate={d2Controls}
                        onClick={() => handleDigitClick("d2")}
                        whileHover={{ color: C.purple }}
                        style={digitStyle}
                    >
                        4
                    </motion.span>
                </div>

                {/* Tagline */}
                <h1
                    style={{
                        fontFamily: isRTL ? FONT_DISPLAY : FONT_BODY,
                        fontWeight: isRTL ? 500 : 700,
                        fontSize: "clamp(24px, 4vw, 38px)",
                        lineHeight: 1.25,
                        marginBottom: 16,
                        color: C.navy,
                        letterSpacing: "-0.01em",
                    }}
                >
                    {tagline}
                </h1>

                {/* Subtitle */}
                <p
                    style={{
                        fontFamily: isRTL ? FONT_DISPLAY : FONT_BODY,
                        fontWeight: isRTL ? 300 : 400,
                        fontSize: "clamp(15px, 2.2vw, 18px)",
                        color: C.muted,
                        lineHeight: 1.65,
                        marginBottom: 36,
                        maxWidth: 460,
                        whiteSpace: "pre-line",
                    }}
                >
                    {subtitle}
                </p>

                {/* GIF */}
                <div
                    style={{
                        marginBottom: 24,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <img
                        ref={gifRef}
                        src={GIF_URL}
                        alt=""
                        style={{
                            maxWidth: 158,
                            width: "100%",
                            borderRadius: 12,
                        }}
                        loading="lazy"
                    />
                </div>

                {/* CTA button */}
                <motion.a
                    href="/"
                    style={ctaBtnStyle}
                    whileHover={{
                        y: -2,
                        scale: 1.03,
                        boxShadow: "0 8px 30px rgba(113,46,172,0.35)",
                    }}
                    whileTap={{ y: 0, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                    <span>{c.cta}</span>
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            transform: isRTL ? "scaleX(-1)" : "none",
                            transition: "transform 0.3s",
                        }}
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </motion.a>
            </motion.div>

            {/* Easter egg counter */}
            <AnimatePresence>
                {easterMsg ? (
                    <motion.div
                        key="easter"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "absolute",
                            bottom: 24,
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontSize: 13,
                            color: C.muted,
                            fontFamily: FONT_BODY,
                            textAlign: "center",
                            zIndex: 20,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {easterMsg}
                    </motion.div>
                ) : null}
            </AnimatePresence>

            {/* Sparks */}
            <AnimatePresence>
                {sparks.map(spark => (
                    <motion.div
                        key={spark.id}
                        initial={{ x: spark.x, y: spark.y, scale: 1, opacity: 1 }}
                        animate={{
                            x: spark.x + spark.dx,
                            y: spark.y + spark.dy,
                            scale: 0,
                            opacity: 0,
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: "fixed",
                            width: spark.size,
                            height: spark.size,
                            borderRadius: "50%",
                            background: spark.color,
                            pointerEvents: "none",
                            zIndex: 30,
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    )
}
