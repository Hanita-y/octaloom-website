// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

import * as React from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

const { useState, useEffect, useRef, useCallback } = React

// ─── Tokens ─────────────────────────────────────────────────────────────────

const CREAM = "#ece9e7"
const DEEP_PURPLE = "#201e4b"
const NAVY = "#201b4e"
const LIME = "#c6e1a5"
const PURPLE = "#712eac"
const BORDER = "#e5e7eb"
const MUTED = "#6b7280"
const LI_BLUE = "#0A66C2"
const FONT = "'DM Sans', sans-serif"
const SHADOW_LG = "0 20px 60px rgba(0,0,0,.13)"
const SHADOW_PURPLE = "0 8px 32px rgba(113,46,172,.25)"

// ─── Global styles (keyframes + font, injected once) ─────────────────────────

function useGlobalStyles() {
  useEffect(() => {
    if (document.getElementById("lg-en-styles")) return
    const s = document.createElement("style")
    s.id = "lg-en-styles"
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
      @keyframes lg-grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
      @keyframes lg-float{0%,100%{transform:translateY(0) rotate(-.5deg)}50%{transform:translateY(-14px) rotate(.5deg)}}
      @keyframes lg-chart{to{stroke-dashoffset:0}}
      @keyframes lg-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
      .lg-grad-border{background:linear-gradient(135deg,#712eac,#c6e1a5,#4e1c80);background-size:300% 300%;animation:lg-grad 5s ease infinite;padding:1.5px;border-radius:20px;height:100%}
      .lg-float{animation:lg-float 4.5s ease-in-out infinite}
      .lg-chart-line{stroke-dasharray:600;stroke-dashoffset:600;animation:lg-chart 2.2s .5s ease-out forwards}
      .lg-pulse::before{content:'';display:block;width:7px;height:7px;background:#22c55e;border-radius:50%;animation:lg-pulse 2s ease-in-out infinite}
      *,*::before,*::after{box-sizing:border-box}
      html{scroll-behavior:smooth}
      a{text-decoration:none;color:inherit}
      button{border:none;background:none;cursor:pointer;font:inherit}
      img{display:block;max-width:100%}
    `
    document.head.appendChild(s)
  }, [])
}

// ─── Hooks ──────────────────────────────────────────────────────────────────

function useWindowWidth() {
  const [w, setW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1440)
  useEffect(() => {
    const fn = () => setW(window.innerWidth)
    window.addEventListener("resize", fn, { passive: true })
    return () => window.removeEventListener("resize", fn)
  }, [])
  return w
}

// ─── Content ─────────────────────────────────────────────────────────────────

const hero = {
  h1: "Turn LinkedIn Into Your #1 Growth Engine.",
  sub: "If your LinkedIn bio says some version of “helping companies grow” and your last post is from three months ago, we should probably talk. OctaLoom builds LinkedIn management systems for B2B SaaS founders, SMB owners, and lean teams who know LinkedIn should be working harder, and finally want it to.",
  cta1: "Book a Free LinkedIn Audit",
  cta2: "Find Your Plan",
  availability: "Limited availability this month",
  trusted: "Trusted by founders & executives across industries",
}

const entityLines = [
  "OctaLoom was built to bridge the gap between ‘knowing LinkedIn matters’ and actually running it as a system.",
  "Most B2B marketing is scattered: a freelancer handles content, another manages ads, the CRM is half-configured, and the founder writes posts only when they have time, which is usually never.",
  "We close that gap by replacing fragmented tactics with a unified, AI-powered growth engine.",
]

const whyLinkedinData = {
  title: "Why LinkedIn, Why Now?",
  p1: ["In 2026, ", "LinkedIn is the moat.", " For solo founders, freelancers, and B2B founders, it’s the one defensible platform where trust, visibility, and deal flow actually compound instead of expiring the moment you stop posting."],
  p2bold: "Here’s what the top 1% of solo founders, freelancers, and B2B founders already understand:",
  p2body: "Only a fraction of people will actually capture the upside of the AI revolution. The tools are everywhere (most of them free). The real edge is stacking two advantages at the same time: the AI race, where one operator can now produce what used to take a team of five, and the number one business platform, where B2B decisions actually get made long before the first sales call. People who combine both will pull away. Everyone else will catch up later, if at all.",
  pullQuote: "That’s the game OctaLoom is built for.",
}

const whatItMeansData = {
  title: "What LinkedIn Management Services Actually Means",
  content: [
    "Most people hear “LinkedIn management” and picture someone posting on your behalf three times a week. That’s not what this is.",
    "Real LinkedIn management is a full system: strategy tuned to your audience, content that matches how B2B buyers actually decide, engagement patterns built around LinkedIn’s real algorithm (not the gurus’ version), profile optimization that signals expertise at a glance, and analytics that tell you where to double down. Add AI-powered execution and what used to require a five-person team now runs through one operator moving at platform speed.",
    "That’s OctaLoom’s LinkedIn Growth Engine: company pages, founder profiles, content management, profile optimization, and B2B lead generation, all run as one coordinated system.",
  ],
}

const pathsData = {
  title: "Who We Help",
  sub: "Three clear buyers. Each one lands on a different deep page — pick yours.",
  cards: [
    { title: "Companies and Businesses", desc: "Your team is invisible on LinkedIn. Your competitors aren’t. Company page management, workshops, employee advocacy programs, and team training, built to activate both the people who work for you and the brand they represent.", tag: "Most Popular", cta: "See our organizations program", href: "/linkedin-for-organizations" },
    { title: "B2B SaaS Founders & SMB Owners", desc: "You know LinkedIn matters. You also know you haven’t posted in months. Ongoing page management, founder thought leadership, and inbound lead generation, built around your calendar instead of the other way around.", cta: "See how we work with founders", href: "/linkedin-for-executives" },
    { title: "Coaches, Consultants & Solopreneurs", desc: "Your profile is costing you clients. Not because you’re bad at what you do, but because your profile doesn’t signal it. Profile building, content system, and one-time setup or ongoing support, whichever you actually need.", cta: "See our solopreneur setup", href: "/linkedin-for-solopreneurs" },
  ],
}

const whyOctaloomData = {
  title: "Why OctaLoom?",
  intro: "Everyone says “strategy plus execution.” That’s not what actually wins on LinkedIn. What wins is a specific combination that most providers don’t bring to the table.",
  items: [
    { title: "Deep Platform Knowledge", desc: "Understanding how LinkedIn’s algorithm actually rewards content. Knowing how B2B buyers really scroll. Recognizing the difference between a post that earns attention and one that gets eye rolls. Most “social media experts” are strong on Instagram or TikTok and treat LinkedIn as their side platform. OctaLoom treats it as the whole game." },
    { title: "Marketing Psychology", desc: "B2B buyers don’t decide on the one post that finally convinced them. They decide on the brand they kept seeing, over and over, until it became obvious. The post you remember isn’t the one you read: it’s the tenth one. OctaLoom builds every system around that reality." },
    { title: "Consistency As Non-Negotiable", desc: "In a world where attention vanishes after five seconds, the brand that wins isn’t the most talented. It’s the most present. Brand awareness isn’t a strategy anymore, it’s a minimum, and the only way to earn it is to show up relentlessly." },
    { title: "AI-Powered Delivery (Vibe Marketing)", desc: "One operator, five-person output. OctaLoom uses AI to do the heavy lifting: content generation, workflow automation, scheduling, custom landing pages, while a human brain keeps the strategy, voice, and tactical calls. AI speed, human judgment. We call it Vibe Marketing." },
  ],
}

const resultsData = {
  title: "Real Results",
  sub: "Every number below is organic. No paid amplification. No follower buys. Just strategy and execution.",
  items: [
    { num: "770K+", label: "organic impressions across client LinkedIn accounts" },
    { num: "300%", label: "engagement lift on a B2B SaaS founder’s personal brand" },
    { num: "70%", label: "manual work cut through custom AI automation" },
    { num: "~5,000", label: "engaged B2B followers grown 100% organically, zero ad spend" },
  ],
}

const testimonialsData = [
  { quote: "I worked directly with Hanita on B2B marketing strategy and LinkedIn execution. The process was thorough and structured: deep competitive research, long-term strategy, and a clear execution plan. The marketing output contributed meaningfully to our global operations.", author: "Yoram Avigad", role: "CEO, Totzeret HaNegev", photo: "https://media.licdn.com/dms/image/v2/D4D03AQHezDhkinQQ7w/profile-displayphoto-crop_800_800/B4DZmfi1smJIAI-/0/1759318336588?e=1778716800&v=beta&t=J3V6XKgwzycKBElKvGWreV7CDrxOlrVpUrY6AnodTL0", linkedin: "https://www.linkedin.com/in/yoram-avigad/" },
  { quote: "Hanita is one of the best marketing leaders I’ve worked with. She’s a force on social media, and way beyond it — leading brand, initiating campaigns, and driving endless marketing activities end-to-end. If she lived in the US, we’d have her for years.", author: "Ofek Ron", role: "CEO, Oshi", photo: "https://media.licdn.com/dms/image/v2/D4D03AQHwEBxDsl4bYg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1687115988653?e=1778716800&v=beta&t=jr3BDDcDpmEuTA2I7h1UbTTD6HCq1vH6LeGyUfjvWl8" },
  { quote: "The moment Hanita joined, marketing stopped being a drag and became a growth engine. There’s a clear strategy, automation that actually works, and results we can measure over time.", author: "Shimi Dvir", role: "CEO, AcademAi", photo: "https://media.licdn.com/dms/image/v2/D4E03AQGG_Gz5id7LSA/profile-displayphoto-shrink_800_800/B4EZc2WTEpHYAo-/0/1748963505021?e=1779926400&v=beta&t=PQUyGTGJMTNiggZzvXD3FZAIIQGyLb-wLL3siZsBVKw" },
]

const aboutData = {
  title: "Hi, I’m Hanita",
  text: [
    "I’m a LinkedIn-led Fractional CMO, and I build marketing systems for B2B SaaS founders, solopreneurs, and lean teams who know they need a real marketing department but can’t justify (or don’t want) hiring one.",
    "My approach: weave strategy, content, automation, and AI into a single working setup, the kind that usually takes five specialists, and deliver it as one operator moving at AI speed.",
    "5+ years deep in B2B marketing. Last 3 deep in what AI changes about all of it. I host What’s the Story With?, a B2B marketing podcast where I break down what actually works in B2B marketing.",
    "If your marketing feels scattered and you’re tired of hiring around it, my DMs are open. No deck, no pitch, no hourly retainer. Just a real conversation.",
  ],
}

const faqItems = [
  { q: "What are LinkedIn management services?", a: "Real LinkedIn management is a full system built around LinkedIn’s platform mechanics: strategy tuned to your audience, content that matches how B2B buyers actually decide, engagement patterns aligned with the real algorithm, profile optimization, and analytics that tell you where to double down. OctaLoom adds AI-powered execution so the whole thing runs at the speed of a five-person team, through one operator." },
  { q: "How is a LinkedIn management service different from a consultant or a general social media manager?", a: "Consultants do strategy and stop before execution. Social media managers usually specialize in Instagram or TikTok, so LinkedIn ends up as their side platform. OctaLoom sits at the intersection: deep LinkedIn platform knowledge plus broad B2B marketing strategy — which means the strategy is smarter, the execution is sharper, and LinkedIn actually becomes a lead engine instead of a posting schedule." },
  { q: "Who is this service for?", a: "B2B SaaS founders, SMB owners, and CEOs who want ongoing management and thought leadership. Coaches, consultants, and solopreneurs who need their profile to finally earn them clients. Organizations that want to activate their team through workshops and employee advocacy." },
  { q: "How long until I see results?", a: "Honest timeline: 30 days for engagement lift, 90 days for inbound lead flow, 6 months for measurable pipeline impact. Anyone promising faster is either lying or running ads and calling it “organic growth.”" },
  { q: "Do you work with company pages, personal profiles, or both?", a: "Both. Most B2B wins come from founder-led content — a personal profile with real opinions and a real voice, backed by a strong company page that reinforces the story. We build them together, not separately." },
  { q: "Can I outsource LinkedIn marketing entirely, or do I need to be involved?", a: "Here’s the honest answer: if someone builds your LinkedIn presence with zero input from you, the results won’t be great. LinkedIn works when the voice is authentically yours. That’s why OctaLoom starts at an 80-20 split: we handle 80% (strategy, writing, scheduling, analytics), you handle 20% (voice, approvals, and the engagement moments only you can deliver). As the system learns your voice over time, client involvement typically drops to 10%." },
  { q: "What makes OctaLoom different from a traditional marketing agency?", a: "Agencies are built to scale headcount. OctaLoom is built to compound leverage. You’re not buying a retainer that funds junior employees learning on your budget. You’re buying a marketing system that runs as your marketing department, built and run by someone who owns marketing like a CMO, not someone billing for hours." },
]

const ctaData = {
  title: "Ready to Grow on LinkedIn?",
  sub: "No deck. No pitch. No hourly retainer. Just a real conversation about whether OctaLoom can actually move the needle for you.",
  cta1: "Book a Free Discovery Call",
  cta2: "Find Your Plan",
  note1: "Not sure?",
  note2: "Pick your track above or book a call to figure it out together.",
}

const qzQuestions = [
  { q: "What best describes you?", opts: ["Founder / Executive", "Solopreneur / Freelancer", "Organization / Team"] },
  { q: "What’s your main LinkedIn goal?", opts: ["Generate leads & clients", "Build thought leadership", "Grow brand awareness"] },
  { q: "How active are you on LinkedIn today?", opts: ["Not active at all", "Post occasionally", "Active but no results"] },
]

// ─── SVG Paths ───────────────────────────────────────────────────────────────

const LI_PATH = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"

function LiIcon({ size = 16, color = LI_BLUE }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d={LI_PATH}/></svg>
}

const ArrowRight = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg width={11} height={11} viewBox="0 0 12 12" fill="none"
    style={{ transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "none" }}>
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChevronRight = () => (
  <svg width={11} height={11} viewBox="0 0 12 12" fill="none" style={{ opacity: 0.45, flexShrink: 0 }}>
    <path d="M4 2l4 4-4 4" stroke={DEEP_PURPLE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ─── Utility Components ──────────────────────────────────────────────────────

type RevealVariant = "up" | "left" | "right" | "blur" | "scale"

function Reveal({
  children, delay = 0, variant = "up", style = {},
}: { children: React.ReactNode; delay?: number; variant?: RevealVariant; style?: React.CSSProperties }) {
  const map = {
    up:    { hidden: { opacity: 0, y: 24 },    visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -24 },   visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 24 },    visible: { opacity: 1, x: 0 } },
    blur:  { hidden: { opacity: 0, filter: "blur(6px)" }, visible: { opacity: 1, filter: "blur(0px)" } },
    scale: { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } },
  }
  return (
    <motion.div
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: "-7% 0px" }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      variants={map[variant]}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function SecTitle({ children, light = false, style = {} }: { children: React.ReactNode; light?: boolean; style?: React.CSSProperties }) {
  return (
    <h2 style={{
      fontSize: "clamp(26px,3.8vw,44px)", fontWeight: 700, lineHeight: 1.12,
      marginBottom: 16, color: light ? "#fff" : DEEP_PURPLE, fontFamily: FONT, ...style,
    }}>{children}</h2>
  )
}

function SecSub({ children, light = false, style = {} }: { children: React.ReactNode; light?: boolean; style?: React.CSSProperties }) {
  return (
    <p style={{
      fontSize: 17, lineHeight: 1.65, maxWidth: 640, marginBottom: 48,
      color: light ? "rgba(255,255,255,.75)" : MUTED, fontFamily: FONT, ...style,
    }}>{children}</p>
  )
}

function ColorSection({ bg, children, id, innerStyle = {} }: {
  bg?: string; children: React.ReactNode; id?: string; innerStyle?: React.CSSProperties
}) {
  const w = useWindowWidth()
  const isMobile = w < 768
  return (
    <section style={{ background: bg || CREAM, position: "relative" }} id={id}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "40px 18px" : "80px 32px", ...innerStyle }}>
        {children}
      </div>
    </section>
  )
}

function TiltCard({ children, intensity = 11 }: { children: React.ReactNode; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [s, setS] = useState<React.CSSProperties>({})
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    setS({ transform: `perspective(600px) rotateY(${x*intensity}deg) rotateX(${-y*intensity}deg) scale(1.025)`, transition: "transform .1s ease-out" })
  }
  const onLeave = () => setS({ transform: "perspective(600px) rotateY(0) rotateX(0) scale(1)", transition: "transform .4s ease-out" })
  return <div ref={ref} style={{ ...s, height: "100%" }} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>
}

function GradientBorderCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg-grad-border">
      <div style={{ background: "#fff", borderRadius: 18.5, padding: 26, height: "100%" }}>
        {children}
      </div>
    </div>
  )
}

function AnimatedNum({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const [display, setDisplay] = useState("0")
  useEffect(() => {
    if (!inView) return
    const num = parseFloat(value.replace(/[^0-9.]/g, "")) || 0
    const hasPlus = value.includes("+"), hasTilde = value.includes("~"),
          hasPercent = value.includes("%"), hasK = /K/i.test(value), hasComma = value.includes(",")
    const dur = 1500, t0 = Date.now()
    const tick = () => {
      const p = Math.min((Date.now()-t0)/dur, 1), e = 1 - Math.pow(1-p, 3)
      const cur = Math.round(num * e)
      setDisplay((hasTilde?"~":"") + (hasComma ? cur.toLocaleString() : String(cur)) + (hasK?"K":"") + (hasPercent?"%":"") + (hasPlus?"+":""))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView])
  return <span ref={ref}>{display}</span>
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <Reveal variant="left">
      <div style={{ display: "flex", gap: 18, alignItems: "flex-start", margin: "6px 0" }}>
        <div style={{ width: 3, minHeight: 44, background: PURPLE, borderRadius: 2, flexShrink: 0, marginTop: 5 }}/>
        <p style={{ fontSize: 20, fontWeight: 600, color: DEEP_PURPLE, lineHeight: 1.5, fontStyle: "italic", margin: 0, fontFamily: FONT }}>
          {children}
        </p>
      </div>
    </Reveal>
  )
}

function Btn({ variant, children, href, onClick, style = {}, target }: {
  variant: "primary"|"outline"|"purple"|"outline-dark"|"ghost"
  children: React.ReactNode; href?: string; onClick?: () => void
  style?: React.CSSProperties; target?: string
}) {
  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "13px 26px", borderRadius: 100, fontSize: 15, fontWeight: 600,
    cursor: "pointer", border: "none", fontFamily: FONT, textDecoration: "none",
    transition: "all .2s ease", lineHeight: 1,
  }
  const variants: Record<string, React.CSSProperties> = {
    primary:     { ...base, background: PURPLE, color: "#fff", boxShadow: SHADOW_PURPLE },
    outline:     { ...base, background: "transparent", color: DEEP_PURPLE, border: `1.5px solid ${DEEP_PURPLE}` },
    purple:      { ...base, background: DEEP_PURPLE, color: "#fff" },
    "outline-dark": { ...base, background: "transparent", color: DEEP_PURPLE, border: `1.5px solid ${DEEP_PURPLE}` },
    ghost:       { ...base, background: "transparent", color: MUTED },
  }
  const merged = { ...variants[variant], ...style }
  if (href) return <a href={href} style={merged} target={target} rel={target ? "noopener noreferrer" : undefined}>{children}</a>
  return <button style={merged} onClick={onClick}>{children}</button>
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [linkedinOpen, setLinkedinOpen] = useState(false)
  const w = useWindowWidth()
  const isMobile = w < 768

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  useEffect(() => {
    document.body.style.overflow = (isMobile && menuOpen) ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen, isMobile])

  const linkedinSub = [
    { label: "LinkedIn for Organizations", href: "/linkedin-for-organizations" },
    { label: "LinkedIn for Executives",    href: "/linkedin-for-executives" },
    { label: "LinkedIn for Solopreneurs",  href: "/linkedin-for-solopreneurs" },
  ]
  const otherServices = [
    { label: "Fractional CMO",   href: "/fractional-cmo" },
    { label: "AI Tools & Agents", href: "/ai-tools-agents" },
  ]
  const navLinks = [
    { label: "About",   href: "/about" },
    { label: "Blog",    href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Goodies", href: "https://octagoodies.com" },
  ]

  const navStyle: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    padding: scrolled ? "10px 0" : "16px 0",
    transition: "all 0.4s",
    background: scrolled ? "rgba(236,233,231,0.92)" : "rgba(255,255,255,0.02)",
    backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
    borderBottom: scrolled ? "1px solid rgba(113,46,172,0.1)" : "none",
    boxShadow: scrolled ? "0 1px 24px rgba(32,30,75,0.07)" : "none",
  }

  const dropBase: React.CSSProperties = {
    position: "absolute", minWidth: 240, background: "#fff", borderRadius: 12,
    boxShadow: "0 8px 40px rgba(113,46,172,0.15), 0 2px 8px rgba(0,0,0,0.06)",
    border: "1px solid rgba(113,46,172,0.08)", zIndex: 200, padding: "8px 0",
  }

  const dropItem: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "10px 18px", fontSize: 14, color: DEEP_PURPLE,
    textDecoration: "none", gap: 8, background: "transparent",
  }

  const mobileNavStyle: React.CSSProperties = {
    ...navStyle, bottom: 0, background: CREAM, overflowY: "auto",
    display: "flex", flexDirection: "column", padding: 0,
  }

  return (
    <nav style={isMobile && menuOpen ? mobileNavStyle : navStyle}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: `${isMobile && menuOpen ? "14px" : "0"} clamp(20px,4vw,48px) ${isMobile && menuOpen ? "14px" : "0"}`,
        display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 16,
        position: "relative", zIndex: 101,
        borderBottom: isMobile && menuOpen ? "1px solid rgba(113,46,172,0.1)" : "none",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/logo%20nav%20bar.png"
            alt="OctaLoom" style={{ height: 36, width: "auto" }}
            onError={(e: any) => { e.target.style.display="none"; e.target.insertAdjacentHTML("afterend","<span style='font-weight:700;font-size:17px;color:#201e4b'>OctaLoom</span>") }}/>
        </a>

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28 }}>
            <div style={{ position: "relative" }}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => { setServicesOpen(false); setLinkedinOpen(false) }}>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontFamily: FONT,
                color: servicesOpen ? DEEP_PURPLE : "rgba(32,30,75,0.55)",
                display: "flex", alignItems: "center", gap: 5, padding: "6px 0", transition: "color 0.25s" }}>
                Services <ChevronDown open={servicesOpen}/>
              </button>
              {servicesOpen && (
                <div style={{ ...dropBase, top: "calc(100% + 10px)", left: 0 }}>
                  <div style={{ position: "relative" }}
                    onMouseEnter={() => setLinkedinOpen(true)}
                    onMouseLeave={() => setLinkedinOpen(false)}>
                    <a href="/linkedin-growth-engine" style={dropItem}
                      onMouseEnter={(e: any) => e.currentTarget.style.background="rgba(113,46,172,0.05)"}
                      onMouseLeave={(e: any) => e.currentTarget.style.background="transparent"}>
                      <span>LinkedIn Growth Engine</span><ChevronRight/>
                    </a>
                    {linkedinOpen && (
                      <div style={{ ...dropBase, top: 0, left: "calc(100% + 6px)" }}>
                        {linkedinSub.map((sub, i) => (
                          <a key={i} href={sub.href} style={{ ...dropItem, justifyContent: "flex-start" }}
                            onMouseEnter={(e: any) => e.currentTarget.style.background="rgba(113,46,172,0.05)"}
                            onMouseLeave={(e: any) => e.currentTarget.style.background="transparent"}>
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  {otherServices.map((svc, i) => (
                    <a key={i} href={svc.href} style={{ ...dropItem, justifyContent: "flex-start" }}
                      onMouseEnter={(e: any) => e.currentTarget.style.background="rgba(113,46,172,0.05)"}
                      onMouseLeave={(e: any) => e.currentTarget.style.background="transparent"}>
                      {svc.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {navLinks.map((item, i) => (
              <a key={i} href={item.href} style={{ fontSize: 14, color: "rgba(32,30,75,0.55)", textDecoration: "none", transition: "color 0.25s", fontFamily: FONT }}
                onMouseEnter={(e: any) => e.currentTarget.style.color=DEEP_PURPLE}
                onMouseLeave={(e: any) => e.currentTarget.style.color="rgba(32,30,75,0.55)"}>
                {item.label}
              </a>
            ))}
          </div>
        )}

        {!isMobile && (
          <a href="https://calendar.notion.so/meet/octaloom/discovery" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 100, fontSize: 13, fontWeight: 600, background: PURPLE, color: "#fff", textDecoration: "none", fontFamily: FONT }}>
            Book a Call
          </a>
        )}

        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
            style={{ background: "none", border: "none", cursor: "pointer", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", gridColumn: "3" }}>
            <span style={{ position: "relative", display: "block", width: 28, height: 20 }}>
              {[0, 9, 18].map((top, i) => (
                <span key={i} style={{
                  position: "absolute", left: 0, width: "100%", height: 2,
                  background: DEEP_PURPLE, borderRadius: 2, top,
                  transform: menuOpen && i===0 ? "rotate(45deg) translateY(9px)" : menuOpen && i===1 ? "scaleX(0)" : menuOpen && i===2 ? "rotate(-45deg) translateY(-9px)" : "none",
                  opacity: menuOpen && i===1 ? 0 : 1, transition: "all 0.3s",
                }}/>
              ))}
            </span>
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 32px 40px" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: PURPLE, margin: "0 0 4px", fontFamily: FONT }}>Services</p>
          <a href="/linkedin-growth-engine" onClick={() => setMenuOpen(false)}
            style={{ display: "block", fontSize: 20, color: DEEP_PURPLE, textDecoration: "none", padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: FONT }}>
            LinkedIn Growth Engine
          </a>
          {linkedinSub.map((sub, i) => (
            <a key={i} href={sub.href} onClick={() => setMenuOpen(false)}
              style={{ display: "block", fontSize: 15, color: PURPLE, textDecoration: "none", padding: "7px 0 7px 20px", borderBottom: "1px solid rgba(113,46,172,0.05)", fontFamily: FONT }}>
              {sub.label}
            </a>
          ))}
          {otherServices.map((svc, i) => (
            <a key={i} href={svc.href} onClick={() => setMenuOpen(false)}
              style={{ display: "block", fontSize: 20, color: DEEP_PURPLE, textDecoration: "none", padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: FONT }}>
              {svc.label}
            </a>
          ))}
          {navLinks.map((item, i) => (
            <a key={i} href={item.href} onClick={() => setMenuOpen(false)}
              style={{ display: "block", fontSize: 20, color: DEEP_PURPLE, textDecoration: "none", padding: "11px 0", fontWeight: 500, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: FONT }}>
              {item.label}
            </a>
          ))}
          <div style={{ marginTop: 14 }}>
            <a href="https://calendar.notion.so/meet/octaloom/discovery" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", textAlign: "center", padding: "14px 24px", fontSize: 15, fontWeight: 600, background: PURPLE, color: "#fff", borderRadius: 100, textDecoration: "none", fontFamily: FONT }}>
              Book a Free Call
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection({ onQuiz }: { onQuiz: () => void }) {
  const w = useWindowWidth()
  const isMobile = w < 768

  const trustFiles = ["avatar1..jpeg","avatar2.jpeg","avatar3.jpeg","avatar4.jpeg","avatar5.jpeg"]

  return (
    <ColorSection bg={CREAM} id="hero" innerStyle={{ paddingTop: isMobile ? 84 : 136, paddingBottom: isMobile ? 56 : 80 }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 28 : 56, alignItems: "center" }}>
        {/* Text */}
        <div>
          <Reveal>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 600,
              color: LI_BLUE, textTransform: "uppercase", letterSpacing: "0.08em",
              marginBottom: 20, padding: "6px 14px", background: "rgba(10,102,194,.08)",
              borderRadius: 100, border: "1px solid rgba(10,102,194,.14)", fontFamily: FONT,
            }}>
              <LiIcon size={14}/> LinkedIn Growth Engine
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontSize: "clamp(34px,4.8vw,62px)", fontWeight: 700, lineHeight: 1.08, color: DEEP_PURPLE, marginBottom: 22, fontFamily: FONT }}>
              {hero.h1}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: MUTED, marginBottom: 32, maxWidth: 520, fontFamily: FONT }}>{hero.sub}</p>
          </Reveal>
          <Reveal delay={240}>
            <div style={{ display: "flex", gap: 11, flexWrap: "wrap", marginBottom: 18 }}>
              <Btn variant="primary" href="https://calendar.notion.so/meet/octaloom/discovery" target="_blank">
                {hero.cta1} <ArrowRight/>
              </Btn>
              <Btn variant="outline" onClick={onQuiz}>{hero.cta2}</Btn>
            </div>
            <div style={{ marginTop: 12 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: MUTED, fontFamily: FONT }}>
                <motion.span
                  animate={{ opacity: [1, 0.5, 1], scale: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ display: "block", width: 7, height: 7, background: "#22c55e", borderRadius: "50%", flexShrink: 0 }}
                />
                {hero.availability}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {trustFiles.map((f, i) => (
                  <img key={i} src={`https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/${f}`}
                    alt="" loading="lazy" width={34} height={34}
                    style={{ width: 34, height: 34, borderRadius: "50%", border: `2.5px solid ${CREAM}`, marginLeft: i===0 ? 0 : -10, objectFit: "cover" }}
                    onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 34 34'%3E%3Ccircle cx='17' cy='17' r='17' fill='%23712eac'/%3E%3C/svg%3E" }}/>
                ))}
              </div>
              <span style={{ fontSize: 13, color: MUTED, maxWidth: 190, lineHeight: 1.4, fontFamily: FONT }}>{hero.trusted}</span>
            </div>
          </Reveal>
        </div>

        {/* Analytics card */}
        <div style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-end" }}>
          <div className="lg-float" style={{ background: "#fff", borderRadius: 16, padding: 18, boxShadow: `${SHADOW_LG}, 0 4px 16px rgba(0,0,0,.05)`, width: "100%", maxWidth: isMobile ? "100%" : 460 }}>
            <svg style={{ width: 22, height: 22, marginBottom: 12 }} viewBox="0 0 24 24"><path d={LI_PATH} fill={LI_BLUE}/></svg>
            <div style={{ background: "#f8f9fa", borderRadius: 10, padding: 14, border: "1px solid #e8ebed", marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#58667e", marginBottom: 6, display: "block", fontFamily: FONT }}>Content performance</span>
              <div style={{ fontSize: 28, fontWeight: 700, color: LI_BLUE, lineHeight: 1, marginBottom: 3, fontFamily: FONT }}>1,515,967</div>
              <span style={{ fontSize: 11, color: "#58667e", marginBottom: 7, display: "block", fontFamily: FONT }}>Impressions</span>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#057642", fontFamily: FONT }}>
                <span style={{ color: "#057642" }}>▲</span> 83.5% vs. prior 365 days
              </div>
              <div style={{ marginTop: 10 }}>
                <svg viewBox="0 0 300 80" preserveAspectRatio="none" style={{ width: "100%", height: 55, display: "block" }}>
                  <defs>
                    <linearGradient id="lg-cg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0A66C2" stopOpacity="0.14"/>
                      <stop offset="100%" stopColor="#0A66C2" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,75 L20,72 L50,68 L80,60 L110,52 L140,42 L170,35 L200,28 L230,20 L260,15 L290,12 L300,10 L300,80 L0,80 Z" fill="url(#lg-cg)"/>
                  <path className="lg-chart-line" d="M0,75 L20,72 L50,68 L80,60 L110,52 L140,42 L170,35 L200,28 L230,20 L260,15 L290,12 L300,10" fill="none" stroke={LI_BLUE} strokeWidth="2"/>
                </svg>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#89a4c7", marginTop: 3, fontFamily: FONT }}>
                  {["Apr","Jun","Aug","Oct","Dec","Feb","Apr"].map((m,i) => <span key={i}>{m}</span>)}
                </div>
              </div>
            </div>
            {!isMobile && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7 }}>
              {[{t:"Profile views",n:"4,892",g:"312%"},{t:"Search appear.",n:"1,247",g:"185%"},{t:"Inbound leads",n:"87",g:"420%"}].map((c,i) => (
                <div key={i} style={{ background: "#f8f9fa", borderRadius: 10, padding: 10, border: "1px solid #e8ebed", display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 10, color: "#58667e", lineHeight: 1.3, fontFamily: FONT }}>{c.t}</span>
                  <span style={{ fontSize: 17, fontWeight: 700, color: LI_BLUE, fontFamily: FONT }}>{c.n}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#057642", fontFamily: FONT }}>▲ {c.g}</span>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      </div>
    </ColorSection>
  )
}

// ─── Entity ──────────────────────────────────────────────────────────────────

function EntitySection() {
  return (
    <ColorSection bg={CREAM} innerStyle={{ paddingTop: 40, paddingBottom: 56 }}>
      <Reveal>
        <p style={{ fontSize: "clamp(17px,2.2vw,22px)", lineHeight: 1.75, color: DEEP_PURPLE, maxWidth: 820, margin: "0 auto", textAlign: "left", fontWeight: 400, fontFamily: FONT }}>
          {entityLines[0]} {entityLines[1]}<br/>
          We close that gap by replacing fragmented tactics with a unified,<br/>
          AI-powered growth engine.
        </p>
      </Reveal>
    </ColorSection>
  )
}

// ─── Why LinkedIn ─────────────────────────────────────────────────────────────

function WhyLinkedinSection() {
  const w = useWindowWidth()
  const isMobileWL = w < 900

  const insights = [
    {
      num: "1", unit: "operator", body: "Now produces what used to take a team of five.",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    },
    {
      num: "#1", unit: "B2B platform", body: "Where deals are decided long before the first sales call.",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M12 8v4l3 3"/></svg>,
    },
    {
      num: "∞", unit: "compounds", body: "Trust, visibility, deal flow — unlike ads that stop the moment you do.",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>,
    },
  ]

  return (
    <ColorSection bg={CREAM} id="why-linkedin">
      <Reveal variant="blur">
        <SecTitle style={{ marginBottom: 40 }}>{whyLinkedinData.title}</SecTitle>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: isMobileWL ? "1fr" : "1fr 320px", gap: isMobileWL ? 40 : 56, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Reveal delay={0}>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#3a3a52", margin: 0, fontFamily: FONT }}>
              In 2026, <strong>LinkedIn is the moat.</strong> For solo founders, freelancers, and B2B founders, it’s the one defensible platform where trust, visibility, and deal flow actually compound instead of expiring the moment you stop posting.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#3a3a52", marginTop: 22, fontFamily: FONT }}>
              <strong style={{ display: "block", color: DEEP_PURPLE, marginBottom: 10 }}>
                Here’s what the top 1% of solo founders, freelancers, and B2B founders already understand:
              </strong>
              Only a fraction of people will actually capture the upside of the AI revolution. The tools are everywhere (most of them free). The real edge is <strong>stacking two advantages at the same time:</strong> the AI race, where one operator can now produce what used to take a team of five, and the number one business platform, where B2B decisions actually get made long before the first sales call. <strong>People who combine both will pull away.</strong> Everyone else will catch up later, if at all.
            </p>
          </Reveal>
        </div>
        <Reveal delay={200} variant="right" style={{ height: "100%" }}>
          <div style={{
            background: DEEP_PURPLE, borderRadius: 20, padding: "28px 22px",
            display: "flex", flexDirection: "column", gap: 14,
            position: isMobileWL ? "static" : "sticky", top: 96,
            boxShadow: "0 24px 60px rgba(32,30,75,0.22)",
          }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(198,225,165,0.6)", margin: "0 0 6px", fontFamily: FONT }}>The Edge</p>
            {insights.map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "14px 16px", border: "1px solid rgba(198,225,165,0.1)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, background: "rgba(198,225,165,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginBottom: 4 }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: LIME, lineHeight: 1, fontFamily: FONT }}>{item.num}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: FONT }}>{item.unit}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, margin: 0, fontFamily: FONT }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <div style={{ marginTop: 32 }}>
        <PullQuote>{whyLinkedinData.pullQuote}</PullQuote>
      </div>
    </ColorSection>
  )
}

// ─── What It Means ────────────────────────────────────────────────────────────

function WhatItMeansSection() {
  return (
    <ColorSection bg={CREAM}>
      <Reveal><SecTitle>{whatItMeansData.title}</SecTitle></Reveal>
      <div style={{ maxWidth: 700, display: "flex", flexDirection: "column", gap: 22, marginTop: 28 }}>
        {whatItMeansData.content.map((p, i) => {
          if (i === whatItMeansData.content.length - 1 && p.length < 200) return <PullQuote key={i}>{p}</PullQuote>
          return (
            <Reveal key={i} delay={i*90}>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: "#3a3a52", margin: 0, fontFamily: FONT }}>{p}</p>
            </Reveal>
          )
        })}
      </div>
    </ColorSection>
  )
}

// ─── Who We Help (Paths) ──────────────────────────────────────────────────────

function PathsSection() {
  const w = useWindowWidth()
  const isMobile = w < 768
  const isTablet = w >= 768 && w < 1024

  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)"

  return (
    <ColorSection bg={DEEP_PURPLE} id="services">
      <Reveal variant="blur"><SecTitle light>{pathsData.title}</SecTitle></Reveal>
      <Reveal delay={80}><SecSub light>{pathsData.sub}</SecSub></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 16 : 22, marginTop: isMobile ? 24 : 48 }}>
        {pathsData.cards.map((card, i) => (
          <Reveal key={i} delay={140+i*140}>
            <TiltCard>
              <a href={card.href} style={{
                display: "flex", flexDirection: "column", background: "rgba(255,255,255,.07)",
                border: "1px solid rgba(255,255,255,.14)", borderRadius: 20, padding: "30px 26px",
                color: "#fff", height: "100%", position: "relative", textDecoration: "none",
                transition: "border-color .25s, background .25s", overflow: "hidden",
              }}
                onMouseEnter={(e: any) => { e.currentTarget.style.borderColor="rgba(198,225,165,.38)"; e.currentTarget.style.background="rgba(255,255,255,.1)" }}
                onMouseLeave={(e: any) => { e.currentTarget.style.borderColor="rgba(255,255,255,.14)"; e.currentTarget.style.background="rgba(255,255,255,.07)" }}>
                {card.tag && (
                  <span style={{
                    display: "inline-block", background: LIME, color: DEEP_PURPLE, fontSize: 11, fontWeight: 700,
                    padding: "4px 12px", borderRadius: 100, marginBottom: 14, alignSelf: "flex-start",
                    textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: FONT,
                  }}>{card.tag}</span>
                )}
                <h3 style={{ fontSize: 21, fontWeight: 700, marginBottom: 11, color: "#fff", fontFamily: FONT }}>{card.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.68, color: "rgba(255,255,255,.72)", flex: 1, marginBottom: 22, fontFamily: FONT }}>{card.desc}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: LIME, marginTop: "auto", fontFamily: FONT }}>
                  {card.cta} <ArrowRight size={14}/>
                </span>
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </ColorSection>
  )
}

// ─── Why OctaLoom ─────────────────────────────────────────────────────────────

function WhyOctaloomSection() {
  const w = useWindowWidth()
  const isMobile = w < 768

  const icons = [
    <LiIcon size={22}/>,
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z"/><path d="M9 21h6"/></svg>,
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>,
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.09 6.26L20 9.27l-4.91 3.82L16.18 20 12 16.77 7.82 20l1.09-6.91L4 9.27l5.91-1.01L12 2z"/></svg>,
  ]

  return (
    <ColorSection bg={CREAM} id="why-us">
      <Reveal><SecTitle>{whyOctaloomData.title}</SecTitle></Reveal>
      <Reveal delay={80}><SecSub style={{ marginBottom: 0 }}>{whyOctaloomData.intro}</SecSub></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 22, marginTop: isMobile ? 24 : 48 }}>
        {whyOctaloomData.items.map((item, i) => (
          <Reveal key={i} delay={i*110} variant="left" style={{ height: "100%" }}>
            <GradientBorderCard>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, background: "rgba(113,46,172,.08)", borderRadius: 12, flexShrink: 0 }}>
                  {icons[i]}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: DEEP_PURPLE, fontFamily: FONT }}>{item.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.68, color: MUTED, fontFamily: FONT }}>{item.desc}</p>
              </div>
            </GradientBorderCard>
          </Reveal>
        ))}
      </div>
    </ColorSection>
  )
}

// ─── Results ─────────────────────────────────────────────────────────────────

function ResultsSection() {
  const w = useWindowWidth()
  const isMobile = w < 768

  return (
    <ColorSection bg={CREAM} id="results">
      <Reveal><SecTitle>{resultsData.title}</SecTitle></Reveal>
      <Reveal delay={80}><SecSub style={{ marginBottom: 0 }}>{resultsData.sub}</SecSub></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 10 : 24, marginTop: isMobile ? 28 : 48 }}>
        {resultsData.items.map((item, i) => (
          <Reveal key={i} delay={i*90} variant="scale">
            <motion.div whileHover={{ boxShadow: SHADOW_PURPLE, y: -3 }}
              style={{ display: "flex", flexDirection: "column", gap: isMobile ? 6 : 9, padding: isMobile ? "16px 14px" : "24px 20px", background: "#fff", borderRadius: 20, border: `1px solid ${BORDER}`, textAlign: "center", transition: "box-shadow .2s" }}>
              <span style={{ fontSize: isMobile ? "clamp(24px,6vw,36px)" : "clamp(30px,3.5vw,46px)", fontWeight: 700, color: PURPLE, lineHeight: 1, fontFamily: FONT }}>
                <AnimatedNum value={item.num}/>
              </span>
              <span style={{ fontSize: isMobile ? 12 : 13, lineHeight: 1.55, color: MUTED, fontFamily: FONT }}>{item.label}</span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </ColorSection>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const [reactions, setReactions] = useState<Record<number,string>>({})
  const [picker, setPicker] = useState<Record<number,boolean>>({})
  const w = useWindowWidth()
  const isMobile = w < 768
  const isTablet = w >= 768 && w < 1024

  const reactionEmoji: Record<string,string> = { like:"👍", celebrate:"🎉", support:"🤲", love:"❤️", insightful:"💡", funny:"😄" }
  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)"

  return (
    <ColorSection bg={PURPLE} id="testimonials">
      <Reveal variant="blur"><SecTitle light>What Clients Say</SecTitle></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 16 : 18, marginTop: isMobile ? 24 : 48 }}>
        {testimonialsData.map((testi, i) => (
          <Reveal key={i} delay={i*130} style={{ height: "100%" }}>
            <div style={{ background: "#fff", borderRadius: 12, display: "flex", flexDirection: "column", boxShadow: "0 2px 12px rgba(0,0,0,.08)", height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 14px 0" }}>
                <img src={testi.photo} alt={testi.author} loading="lazy"
                  style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `2px solid ${BORDER}` }}/>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                  {testi.linkedin
                    ? <a href={testi.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        <strong style={{ fontSize: 13, fontWeight: 700, color: DEEP_PURPLE, lineHeight: 1.2, fontFamily: FONT }}>{testi.author}</strong>
                      </a>
                    : <strong style={{ fontSize: 13, fontWeight: 700, color: DEEP_PURPLE, lineHeight: 1.2, fontFamily: FONT }}>{testi.author}</strong>
                  }
                  <span style={{ fontSize: 11, color: MUTED, fontFamily: FONT }}>{testi.role}</span>
                </div>
                <LiIcon size={17} color={LI_BLUE}/>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.68, color: "#333", padding: "12px 14px", flex: 1, fontFamily: FONT }}>{testi.quote}</p>
              <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid #e0e0e0", padding: "3px 6px" }}>
                {/* Like with reaction picker */}
                <div style={{ flex: 1, display: "flex", justifyContent: "center", position: "relative" }}>
                  <AnimatePresence>
                    {picker[i] && (
                      <motion.div key="picker"
                        initial={{ opacity: 0, scale: 0.8, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{
                          position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
                          background: "#fff", borderRadius: 100, padding: "7px 12px", display: "flex", gap: 2,
                          boxShadow: "0 8px 32px rgba(0,0,0,.15)", border: `1px solid ${BORDER}`, zIndex: 20, whiteSpace: "nowrap",
                        }}>
                        {Object.entries(reactionEmoji).map(([type, emoji]) => (
                          <button key={type}
                            onClick={() => { setReactions(p => ({...p,[i]:type})); setPicker(p => ({...p,[i]:false})) }}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 5px", borderRadius: "50%", fontSize: 26, lineHeight: 1 }}>
                            {emoji}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button
                    onClick={() => setPicker(p => ({...p,[i]:!p[i]}))}
                    onMouseEnter={() => setPicker(p => ({...p,[i]:true}))}
                    onMouseLeave={() => setTimeout(() => setPicker(p => ({...p,[i]:false})), 700)}
                    style={{ display: "flex", alignItems: "center", gap: 4, padding: "7px 8px", borderRadius: 5, fontSize: 12, fontWeight: reactions[i] ? 700 : 500, color: reactions[i] ? PURPLE : "#666", transition: "background .15s", cursor: "pointer", flex: 1, justifyContent: "center", background: "none", border: "none", fontFamily: FONT }}>
                    {reactions[i]
                      ? <span style={{ fontSize: 18, lineHeight: 1 }}>{reactionEmoji[reactions[i]]}</span>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>
                    }
                    <span style={{ fontSize: isMobile ? 0 : 12, fontFamily: FONT }}>
                      {reactions[i] ? reactions[i].charAt(0).toUpperCase()+reactions[i].slice(1) : "Like"}
                    </span>
                  </button>
                </div>
                {[
                  { label: "Comment", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
                  { label: "Repost",  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg> },
                  { label: "Send",    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg> },
                ].map((action, j) => (
                  <button key={j} style={{ display: "flex", alignItems: "center", gap: 4, padding: "7px 8px", borderRadius: 5, fontSize: 12, fontWeight: 500, color: "#666", transition: "background .15s", cursor: "pointer", flex: 1, justifyContent: "center", background: "none", border: "none", fontFamily: FONT }}>
                    {action.icon}
                    <span style={{ fontSize: isMobile ? 0 : 12 }}>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </ColorSection>
  )
}

// ─── About ───────────────────────────────────────────────────────────────────

function AboutSection() {
  const w = useWindowWidth()
  const isMobile = w < 768

  return (
    <ColorSection bg={CREAM} id="about">
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.55fr", gap: isMobile ? 28 : 60, alignItems: "start" }}>
        <Reveal variant="right">
          <div style={{ position: isMobile ? "static" : "sticky", top: 96 }}>
            <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/HAN.png"
              alt="Hanita Yudovski"
              style={{ width: "100%", borderRadius: "50%", aspectRatio: "1/1", objectFit: "cover", objectPosition: "top center", maxWidth: isMobile ? 180 : 340, margin: "0 auto", display: "block", boxShadow: "0 4px 20px rgba(0,0,0,.09)" }}
              onError={(e: any) => { e.target.style.background = "linear-gradient(135deg,#712eac,#201e4b)"; e.target.src = "" }}/>
          </div>
        </Reveal>
        <div style={{ paddingTop: 12 }}>
          <Reveal><SecTitle>{aboutData.title}</SecTitle></Reveal>
          {aboutData.text.map((p, i) => (
            <Reveal key={i} delay={90+i*90}>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#3a3a52", marginBottom: 18, fontFamily: FONT }}>{p}</p>
            </Reveal>
          ))}
          <Reveal delay={360}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
              <Btn variant="outline" href="https://www.linkedin.com/in/hanita-yudovski/" target="_blank">
                <LiIcon size={15}/> Connect on LinkedIn
              </Btn>
              <Btn variant="ghost" href="#">Listen to the podcast</Btn>
            </div>
          </Reveal>
        </div>
      </div>
    </ColorSection>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQSection() {
  const [open, setOpen] = useState<number|null>(null)
  const w = useWindowWidth()
  const isMobile = w < 768

  return (
    <ColorSection bg={CREAM} id="faq">
      <Reveal><SecTitle>Frequently Asked Questions</SecTitle></Reveal>
      <div style={{ maxWidth: 700, marginTop: isMobile ? 24 : 40, border: `1px solid ${BORDER}`, borderRadius: 20, overflow: "hidden" }}>
        {faqItems.map((item, i) => (
          <Reveal key={i} delay={i*60} variant="left">
            <div
              onClick={() => setOpen(open===i ? null : i)}
              style={{ padding: isMobile ? "14px 16px" : "18px 22px", borderBottom: i < faqItems.length-1 ? `1px solid ${BORDER}` : "none", cursor: "pointer", background: open===i ? "#f9f8f7" : "#fff", transition: "background .18s" }}
              onMouseEnter={(e: any) => { if (open!==i) e.currentTarget.style.background="#f9f8f7" }}
              onMouseLeave={(e: any) => { if (open!==i) e.currentTarget.style.background="#fff" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
                <h3 style={{ fontSize: isMobile ? 14 : 15, fontWeight: 600, color: DEEP_PURPLE, lineHeight: 1.4, fontFamily: FONT }}>{item.q}</h3>
                <motion.span animate={{ rotate: open===i ? 45 : 0 }} transition={{ duration: 0.25 }}
                  style={{ fontSize: 20, fontWeight: 300, color: PURPLE, flexShrink: 0, lineHeight: 1, marginTop: 1, display: "block" }}>
                  +
                </motion.span>
              </div>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div key="ans"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32 }}
                    style={{ overflow: "hidden" }}>
                    <p style={{ fontSize: 14, lineHeight: 1.75, color: MUTED, paddingTop: 12, fontFamily: FONT }}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </ColorSection>
  )
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────

function BottomCTA({ onQuiz }: { onQuiz: () => void }) {
  const w = useWindowWidth()
  const isMobile = w < 768
  return (
    <ColorSection bg={LIME} id="contact" innerStyle={{ textAlign: "center" }}>
      <Reveal>
        <h2 style={{ fontSize: isMobile ? "clamp(22px,6.5vw,32px)" : "clamp(26px,3.8vw,46px)", fontWeight: 700, color: DEEP_PURPLE, marginBottom: 14, fontFamily: FONT }}>
          {ctaData.title}
        </h2>
        <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.65, color: "rgba(32,30,75,.7)", maxWidth: 540, margin: isMobile ? "0 auto 24px" : "0 auto 32px", fontFamily: FONT }}>
          {ctaData.sub}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: isMobile ? "stretch" : "center", flexWrap: "wrap", marginBottom: 18, flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : undefined }}>
          <Btn variant="purple" href="https://calendar.notion.so/meet/octaloom/discovery" target="_blank" style={isMobile ? { width: "100%", justifyContent: "center" } : {}}>
            {ctaData.cta1} <ArrowRight/>
          </Btn>
          <Btn variant="outline-dark" onClick={onQuiz} style={isMobile ? { width: "100%", justifyContent: "center" } : {}}>{ctaData.cta2}</Btn>
        </div>
        <p style={{ fontSize: 13, color: "rgba(32,30,75,.55)", maxWidth: 420, margin: "0 auto", fontFamily: FONT }}>
          <strong>{ctaData.note1}</strong><br/>{ctaData.note2}
        </p>
      </Reveal>
    </ColorSection>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  const w = useWindowWidth()
  const isMobile = w < 768

  const linkStyle: React.CSSProperties = { fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s", display: "block", lineHeight: "1.9", fontFamily: FONT }
  const headStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: CREAM, margin: "0 0 14px", fontFamily: FONT }
  const hover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => { (e.currentTarget as HTMLAnchorElement).style.color = enter ? LIME : "rgba(255,255,255,0.5)" }

  const serviceLinks = [
    { label: "LinkedIn for Organizations", href: "/linkedin-for-organizations" },
    { label: "LinkedIn for Executives",    href: "/linkedin-for-executives" },
    { label: "LinkedIn for Solopreneurs",  href: "/linkedin-for-solopreneurs" },
  ]
  const otherLinks = [
    { label: "Fractional CMO",    href: "/fractional-cmo" },
    { label: "AI Tools & Agents", href: "/ai-tools-agents" },
  ]
  const socialIcons = [
    { href: "https://www.linkedin.com/in/hanita-yudovski/", label: "LinkedIn", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={LI_PATH}/></svg> },
    { href: "https://www.instagram.com/hanita_Y", label: "Instagram", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
    { href: "https://www.facebook.com/octaloom", label: "Facebook", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { href: "https://www.youtube.com/@Hanita_Octaloom", label: "YouTube", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
    { href: "https://open.spotify.com/show/4XmsthqR7gnj4nf2gL0T7j", label: "Spotify", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg> },
  ]

  return (
    <footer style={{ padding: "64px 0 0", background: NAVY, color: "rgba(255,255,255,0.7)", fontFamily: FONT }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 0.65fr 1fr 0.8fr 0.8fr 0.8fr", gap: isMobile ? "28px 20px" : 24, paddingBottom: 48 }}>
          {/* Brand */}
          <div style={{ gridColumn: isMobile ? "1 / -1" : "1" }}>
            <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png"
              alt="OctaLoom" style={{ height: 100, width: "auto" }}
              onError={(e: any) => { e.target.style.display="none" }}/>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 14, maxWidth: 240, lineHeight: 1.65, fontFamily: FONT }}>
              Your marketing department,<br/>minus the department.
            </p>
          </div>
          {/* Pages */}
          <div>
            <h4 style={headStyle}>Pages</h4>
            {[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Blog", href: "/blog" }, { label: "Contact", href: "/contact" }].map((p, i) => (
              <a key={i} href={p.href} style={linkStyle} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{p.label}</a>
            ))}
          </div>
          {/* LinkedIn Services */}
          <div>
            <h4 style={headStyle}>LinkedIn Services</h4>
            {serviceLinks.map((s, i) => (
              <a key={i} href={s.href} style={linkStyle} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{s.label}</a>
            ))}
          </div>
          {/* Other Services */}
          <div>
            <h4 style={headStyle}>Other Services</h4>
            {otherLinks.map((s, i) => (
              <a key={i} href={s.href} style={linkStyle} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{s.label}</a>
            ))}
          </div>
          {/* OctaGoodies */}
          <div>
            <h4 style={{ ...headStyle, fontWeight: 300, letterSpacing: "0.04em", textTransform: "none", fontSize: 12 }}>
              Free Marketing<br/>Tools & Templates
            </h4>
            <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "inline-block" }}
              onMouseEnter={(e: any) => e.currentTarget.style.opacity="1"}
              onMouseLeave={(e: any) => e.currentTarget.style.opacity="0.9"}>
              <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/OCTAGOODIES%20GREEN.png"
                alt="OctaGoodies" style={{ height: 44, width: "auto", opacity: 0.9, transition: "opacity 0.2s" }}/>
            </a>
          </div>
          {/* Connect */}
          <div>
            <h4 style={headStyle}>Connect</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {socialIcons.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                  onMouseEnter={(e: any) => e.currentTarget.style.color=LIME}
                  onMouseLeave={(e: any) => e.currentTarget.style.color="rgba(255,255,255,0.5)"}>
                  {s.svg}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 12, color: "rgba(255,255,255,.38)", flexWrap: "wrap", gap: 12, fontFamily: FONT }}>
          <span>© 2026 OctaLoom</span>
          <div style={{ display: "flex", gap: 18 }}>
            {[{ label: "Privacy", href: "/privacy-policy" }, { label: "Terms", href: "/terms" }, { label: "Accessibility", href: "/accessibility" }].map((l, i) => (
              <a key={i} href={l.href} style={{ color: "rgba(255,255,255,.38)", textDecoration: "none", transition: "color 0.2s", fontFamily: FONT }}
                onMouseEnter={(e: any) => e.currentTarget.style.color=LIME}
                onMouseLeave={(e: any) => e.currentTarget.style.color="rgba(255,255,255,.38)"}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Questionnaire Modal ──────────────────────────────────────────────────────

function QuestionnaireModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number,number>>({})
  const isLast = step >= qzQuestions.length

  useEffect(() => {
    if (open) { setStep(0); setAnswers({}) }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div key="overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.48)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: 20 }}
          onClick={onClose}>
          <motion.div key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 22 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ background: "#fff", borderRadius: 20, padding: 38, maxWidth: 460, width: "100%", position: "relative", fontFamily: FONT }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <button onClick={onClose}
              style={{ position: "absolute", top: 14, right: 14, width: 30, height: 30, borderRadius: "50%", background: BORDER, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", color: MUTED, cursor: "pointer", border: "none" }}>
              ✕
            </button>
            {!isLast ? (
              <>
                <div style={{ display: "flex", gap: 7, marginBottom: 28 }}>
                  {qzQuestions.map((_, i) => (
                    <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i<=step ? PURPLE : BORDER, transition: "background 0.3s" }}/>
                  ))}
                </div>
                <h3 style={{ fontSize: 21, fontWeight: 700, color: DEEP_PURPLE, marginBottom: 22, lineHeight: 1.3, fontFamily: FONT }}>{qzQuestions[step].q}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {qzQuestions[step].opts.map((opt, i) => (
                    <button key={i} onClick={() => { setAnswers({...answers,[step]:i}); setTimeout(()=>setStep(step+1),280) }}
                      style={{ padding: "13px 18px", borderRadius: 12, border: `1.5px solid ${answers[step]===i ? PURPLE : BORDER}`, background: answers[step]===i ? "rgba(113,46,172,.08)" : "#fff", textAlign: "left", fontSize: 14, fontWeight: 500, color: answers[step]===i ? PURPLE : DEEP_PURPLE, cursor: "pointer", transition: "all .18s", fontFamily: FONT }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 52, height: 52, background: "rgba(113,46,172,.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: PURPLE, margin: "0 auto 18px" }}>✓</div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: DEEP_PURPLE, marginBottom: 11, fontFamily: FONT }}>Great! Let’s find the right plan for you.</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: MUTED, marginBottom: 22, fontFamily: FONT }}>Book a free discovery call and we’ll build a custom plan based on your answers.</p>
                <a href="https://calendar.notion.so/meet/octaloom/discovery" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: PURPLE, color: "#fff", padding: "13px 26px", borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "all .2s", fontFamily: FONT }}>
                  Book a Free Call
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Click Reactions ──────────────────────────────────────────────────────────

function ClickReactions() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<any[]>([])
  const raf = useRef<number>()
  const emojis = ["👍","🎉","❤️","💡","🤲","😄","🚀","⭐"]

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext("2d")!
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener("resize", resize)

    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("button,a,input,.modal")) return
      for (let i = 0; i < 6 + Math.floor(Math.random() * 4); i++) {
        const angle = (Math.random() * Math.PI * 0.8) + Math.PI * 0.1
        const spd = 2 + Math.random() * 4
        particles.current.push({ x: e.clientX, y: e.clientY, vx: Math.cos(angle)*spd*(Math.random()>.5?1:-1), vy: -Math.sin(angle)*spd-1, sz: 18+Math.random()*12, op: 1, rot: Math.random()*360, rotSpd: (Math.random()-.5)*9, emoji: emojis[Math.floor(Math.random()*emojis.length)], life: 0, maxLife: 42+Math.random()*28 })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current = particles.current.filter(p => {
        p.life++; p.x+=p.vx; p.y+=p.vy; p.vy+=.09; p.rot+=p.rotSpd; p.op=Math.max(0,1-p.life/p.maxLife)
        if (p.op<=0) return false
        ctx.save(); ctx.globalAlpha=p.op; ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180)
        ctx.font=`${p.sz}px serif`; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText(p.emoji,0,0); ctx.restore(); return true
      })
      raf.current = requestAnimationFrame(animate)
    }

    document.addEventListener("click", onClick)
    raf.current = requestAnimationFrame(animate)
    return () => { document.removeEventListener("click", onClick); window.removeEventListener("resize", resize); cancelAnimationFrame(raf.current!) }
  }, [])

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}/>
}

// ─── Page Nav ─────────────────────────────────────────────────────────────────

function PageNav() {
  const sections = [
    { id: "hero",         label: "Overview" },
    { id: "why-linkedin", label: "Why LinkedIn" },
    { id: "services",     label: "Who We Help" },
    { id: "why-us",       label: "Why OctaLoom" },
    { id: "results",      label: "Results" },
    { id: "testimonials", label: "Testimonials" },
    { id: "about",        label: "About" },
    { id: "faq",          label: "FAQ" },
    { id: "contact",      label: "Book a Call" },
  ]
  const [active, setActive] = useState("hero")
  const [show, setShow] = useState(false)

  useEffect(() => {
    const checkShow = () => setShow(window.scrollY > 400 && window.innerWidth > 1200)
    window.addEventListener("scroll", checkShow, { passive: true })
    window.addEventListener("resize", checkShow, { passive: true })
    checkShow()
    return () => { window.removeEventListener("scroll", checkShow); window.removeEventListener("resize", checkShow) }
  }, [])

  useEffect(() => {
    const observers = sections.map(s => {
      const el = document.getElementById(s.id)
      if (!el) return null
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setActive(s.id)
      }, { threshold: 0.3, rootMargin: "-10% 0px -50% 0px" })
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  if (!show) return null

  return (
    <div style={{ position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 6, zIndex: 50 }}>
      {sections.map(s => (
        <a key={s.id} href={`#${s.id}`} title={s.label}
          style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", justifyContent: "flex-end" }}>
          {active === s.id && (
            <span style={{ fontSize: 11, color: DEEP_PURPLE, fontWeight: 600, whiteSpace: "nowrap", opacity: 0.85, fontFamily: FONT }}>{s.label}</span>
          )}
          <motion.div animate={{ width: active===s.id ? 24 : 6, height: active===s.id ? 3 : 6, borderRadius: active===s.id ? 2 : "50%", background: active===s.id ? PURPLE : "rgba(32,30,75,0.25)" }}
            transition={{ duration: 0.3 }}
            style={{ flexShrink: 0 }}/>
        </a>
      ))}
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

function App() {
  useGlobalStyles()
  const [quizOpen, setQuizOpen] = useState(false)

  return (
    <div style={{ fontFamily: FONT, background: CREAM, color: DEEP_PURPLE, overflowX: "hidden", lineHeight: 1.6, WebkitFontSmoothing: "antialiased", width: "100vw", position: "relative", left: "50%", transform: "translateX(-50%)" }}>
      <Navbar/>
      <main>
        <HeroSection onQuiz={() => setQuizOpen(true)}/>
        <EntitySection/>
        <WhyLinkedinSection/>
        <WhatItMeansSection/>
        <PathsSection/>
        <WhyOctaloomSection/>
        <ResultsSection/>
        <TestimonialsSection/>
        <AboutSection/>
        <FAQSection/>
        <BottomCTA onQuiz={() => setQuizOpen(true)}/>
      </main>
      <Footer/>
      <PageNav/>
      <ClickReactions/>
      <QuestionnaireModal open={quizOpen} onClose={() => setQuizOpen(false)}/>
    </div>
  )
}

export default App
