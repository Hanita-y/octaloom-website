// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

import * as React from "react"
const { useState, useEffect, useRef } = React
import { motion, AnimatePresence } from "framer-motion"

// ─── Language ─────────────────────────────────────────────────────────────────
const LANG = "he"
const t = (obj: any): any => {
  if (!obj) return ""
  if (typeof obj === "string") return obj
  return obj?.[LANG] ?? obj?.en ?? ""
}

// ─── Styles injection ─────────────────────────────────────────────────────────
function useGlobalStyles() {
  useEffect(() => {
    const id = "orgs-styles-he"
    if (document.getElementById(id)) return
    const s = document.createElement("style")
    s.id = id
    s.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@300;400;500;600;700&display=swap');
@font-face{font-family:'Discovery Fs';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/DiscoveryFs-Light.ttf') format('truetype');font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:'Discovery Fs';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/DiscoveryFs-Medium.ttf') format('truetype');font-weight:500 600 700;font-style:normal;font-display:swap}
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Regular.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Bold.ttf') format('truetype');font-weight:700;font-style:normal;font-display:swap}
:root{--purple:#712eac;--deep-purple:#201e4b;--navy:#060d3d;--lime:#c5e6a2;--cream:#ece9e7;--text-dark:#201e4b;--text-mid:#3d3a5c;--text-light:#ece9e7;--font-he:'Discovery Fs','Noto Sans Hebrew',sans-serif}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
body{font-family:var(--font-he);background:var(--cream);color:var(--text-dark);overflow-x:hidden;line-height:1.6}
a{color:inherit;text-decoration:none}
button{font-family:inherit;border:none;background:none;cursor:pointer}
.container{max-width:1120px;margin:0 auto;padding:0 clamp(20px,5vw,48px)}
.rv{opacity:0;transform:translateY(36px);transition:opacity 0.8s cubic-bezier(.16,1,.3,1),transform 0.8s cubic-bezier(.16,1,.3,1),filter 0.8s cubic-bezier(.16,1,.3,1)}
.rv.rv-in{opacity:1!important;transform:translateY(0)!important;filter:none!important}
.rv--left{transform:translateX(-40px) translateY(0)}.rv--left.rv-in{transform:translateX(0)!important}
.rv--right{transform:translateX(40px) translateY(0)}.rv--right.rv-in{transform:translateX(0)!important}
.rv--scale{transform:scale(0.92)}.rv--scale.rv-in{transform:scale(1)!important}
.rv--blur{filter:blur(8px);transform:translateY(20px)}.rv--blur.rv-in{filter:blur(0)!important;transform:translateY(0)!important}
.rv--tilt{transform:perspective(800px) rotateX(6deg) translateY(30px);transform-origin:bottom}.rv--tilt.rv-in{transform:perspective(800px) rotateX(0) translateY(0)!important}
.color-section{background-color:var(--section-bg,var(--cream));transition:background-color 0.6s ease}
.section-inner{padding:clamp(64px,10vw,120px) 0}
.sec-title{font-size:clamp(28px,4vw,44px);line-height:1.15;letter-spacing:-0.015em;margin-bottom:40px;font-weight:700;font-family:var(--font-he)}
.sec-title--dark{color:var(--deep-purple)}.sec-title--light{color:var(--text-light)}
.sec-sub--dark{font-size:17px;color:var(--deep-purple);opacity:0.6;margin-bottom:32px;max-width:720px}
.sec-sub--emphasis{opacity:0.85!important;font-weight:600}
.btn{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:700;transition:all 0.25s;cursor:pointer;white-space:nowrap}
.btn--lime{background:var(--lime);color:var(--navy)}.btn--lime:hover{box-shadow:0 4px 24px rgba(197,230,162,0.4);transform:translateY(-1px)}
.btn--purple{background:var(--purple);color:white}.btn--purple:hover{box-shadow:0 4px 24px rgba(113,46,172,0.35);transform:translateY(-1px)}
.btn--outline{background:transparent;color:var(--purple);border:1.5px solid var(--purple)}.btn--outline:hover{background:var(--purple);color:white}
.btn--ghost{color:var(--purple);padding:12px 24px;font-size:14px;font-weight:700}.btn--ghost:hover{text-decoration:underline}
.org-hero{color:var(--text-light)}.org-hero .section-inner{padding:clamp(100px,15vw,160px) 0 clamp(80px,12vw,120px)}
.org-hero__grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:48px;align-items:center}
.org-hero__label{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--lime);margin-bottom:24px}
.org-hero__h1{font-size:clamp(30px,4.5vw,48px);font-weight:700;line-height:1.12;letter-spacing:-0.025em;color:white;max-width:620px;margin-bottom:24px;white-space:pre-line}
.org-hero__sub{font-size:16px;line-height:1.7;color:rgba(255,255,255,0.65);max-width:540px;margin-bottom:16px}
.org-hero__fix{font-size:17px;font-weight:700;color:var(--lime);margin-bottom:32px;white-space:pre-line}
.org-hero__visual{display:flex;justify-content:center;perspective:1000px}
.org-mockup{position:relative;width:300px;border-radius:10px;background:white;overflow:visible;box-shadow:0 8px 40px rgba(0,0,0,0.35),0 0 0 1px rgba(255,255,255,0.05);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
.org-mockup__cover{position:relative;height:64px;border-radius:10px 10px 0 0}
.org-mockup__ghost{position:absolute;inset:0;border-radius:10px;background:rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:5}
.org-mockup__ghost-icon{display:flex;flex-direction:column;align-items:center;gap:4px}
.org-mockup__popups{position:absolute;top:30px;right:-24px;width:220px;display:flex;flex-direction:column;gap:8px;z-index:10}
.org-mockup__popup{display:flex;align-items:center;gap:8px;padding:8px 10px;background:white;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,0.12),0 0 0 1px rgba(0,0,0,0.04);opacity:0;transform:translateX(30px) scale(0.9);transition:all 0.5s cubic-bezier(.16,1,.3,1)}
.org-mockup__popups.show .org-mockup__popup{opacity:1;transform:translateX(0) scale(1)}
.org-mockup__popups.show .org-mockup__popup--1{transition-delay:0s}
.org-mockup__popups.show .org-mockup__popup--2{transition-delay:0.2s}
.org-mockup__popups.show .org-mockup__popup--3{transition-delay:0.4s}
@keyframes fadeInUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.org-entity .section-inner{padding-top:60px;padding-bottom:30px}
.org-entity__text{font-size:18px;line-height:1.75;color:var(--deep-purple);opacity:0.75;max-width:720px}
.org-company .section-inner{padding-top:30px}
.org-company__intro{font-size:16px;line-height:1.7;color:var(--deep-purple);opacity:0.7;margin-bottom:16px;max-width:720px}
.org-company__statement{font-size:17px;font-weight:700;color:var(--deep-purple);margin-bottom:24px}
.org-checklist{list-style:none;display:flex;flex-direction:column;gap:14px;max-width:720px;margin-bottom:24px}
.org-checklist li{display:flex;gap:12px;font-size:15px;line-height:1.6;color:var(--deep-purple);opacity:0.75}
.org-checklist__icon{flex-shrink:0;font-weight:700;width:22px;height:22px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;background:rgba(197,230,162,0.3);color:#2d7a2d}
.org-checklist__icon--lime{background:rgba(197,230,162,0.15);color:var(--lime)}
.org-checklist--light li{color:rgba(255,255,255,0.8)}
.org-truth__p{font-size:16px;line-height:1.75;color:rgba(255,255,255,0.75);max-width:720px;margin-bottom:16px;white-space:pre-line}
.org-truth__sub-title{font-size:20px;font-weight:700;color:white;margin-bottom:20px;margin-top:12px}
.org-truth__bridge{font-size:16px;line-height:1.7;color:rgba(255,255,255,0.65);max-width:680px;margin-top:16px;font-style:italic}
.reach-compare{display:grid;grid-template-columns:1fr auto 1fr;gap:20px;align-items:stretch;margin:40px auto;max-width:640px}
.reach-compare__card{padding:28px 24px;border-radius:16px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center}
.reach-compare__card--page{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08)}
.reach-compare__card--employee{background:rgba(197,230,162,0.08);border:1px solid rgba(197,230,162,0.2);box-shadow:0 0 40px rgba(197,230,162,0.06)}
.reach-compare__icon-wrap{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center}
.reach-compare__icon-wrap--page{background:rgba(255,255,255,0.06)}
.reach-compare__icon-wrap--employee{background:rgba(197,230,162,0.15)}
.reach-compare__label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.45)}
.reach-compare__card--employee .reach-compare__label{color:var(--lime)}
.reach-compare__meter{width:100%;height:8px;border-radius:4px;background:rgba(255,255,255,0.06);overflow:hidden}
.reach-compare__fill{height:100%;border-radius:4px}
.reach-compare__fill--page{width:10%;background:rgba(255,255,255,0.15)}
.reach-compare__fill--employee{width:100%;background:linear-gradient(90deg,var(--lime),rgba(197,230,162,0.6))}
.reach-compare__num{font-size:32px;font-weight:800;line-height:1}
.reach-compare__num--dim{color:rgba(255,255,255,0.25)}.reach-compare__num--bright{color:var(--lime)}
.reach-compare__unit{font-size:13px;font-weight:600;opacity:0.6}
.reach-compare__dots{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;max-width:120px}
.reach-compare__dot{width:8px;height:8px;border-radius:50%}
.reach-compare__dot--dim{background:rgba(255,255,255,0.1)}
.reach-compare__dot--bright{background:var(--lime);animation:dotPulse 1.5s ease infinite}
@keyframes dotPulse{0%,100%{opacity:0.4;transform:scale(0.85)}50%{opacity:1;transform:scale(1)}}
.reach-compare__vs-badge{display:flex;align-items:center;justify-content:center;align-self:center}
.reach-compare__vs-badge span{font-size:18px;font-weight:800;color:var(--lime);background:rgba(197,230,162,0.1);border:1px solid rgba(197,230,162,0.2);padding:8px 14px;border-radius:10px;white-space:nowrap}
.org-invest__grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.org-invest__grid>*{display:flex}
.org-invest__grid .gradient-border-card{flex:1;display:flex}
.org-invest__grid .gradient-border-card__inner{flex:1;display:flex}
.org-invest__item{padding:28px 24px;flex:1;display:flex;flex-direction:column}
.org-invest__icon{width:44px;height:44px;border-radius:12px;background:rgba(113,46,172,0.06);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
.org-invest__item h3{font-size:18px;font-weight:700;color:var(--deep-purple);margin-bottom:8px}
.org-invest__item p{font-size:14px;color:var(--deep-purple);opacity:0.65;line-height:1.6}
.gradient-border-card{position:relative;border-radius:14px;padding:1.5px;background:linear-gradient(135deg,rgba(113,46,172,0.2),rgba(197,230,162,0.3),rgba(113,46,172,0.1));background-size:200% 200%;animation:gradientShift 6s ease infinite}
.gradient-border-card__inner{background:var(--cream);border-radius:13px}
@keyframes gradientShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.org-workshops__sub{font-size:16px;color:var(--deep-purple);opacity:0.6;margin-bottom:36px;max-width:560px;font-style:italic}
.org-workshops__grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.org-workshops__grid>*{display:flex}
.org-workshop-card-wrap{position:relative;height:100%;flex:1;display:flex;padding:2px;border-radius:16px;overflow:hidden;isolation:isolate;box-shadow:0 0 18px rgba(198,225,165,0.25),0 0 36px rgba(113,46,172,0.18),0 12px 48px rgba(32,30,75,0.12)}
.org-workshop-card-wrap::before{content:"";position:absolute;inset:-100%;z-index:0;background:conic-gradient(rgba(198,225,165,0.85) 0%,rgba(113,46,172,0.65) 15%,rgba(236,233,231,0.4) 30%,rgba(198,225,165,0.45) 45%,rgba(113,46,172,0.85) 60%,rgba(198,225,165,0.65) 75%,rgba(113,46,172,0.45) 90%,rgba(198,225,165,0.85) 100%);animation:orgWorkshopGlow 4s linear infinite;pointer-events:none}
.org-workshop-card{position:relative;z-index:1;padding:28px 24px;border-radius:14px;background:rgba(255,255,255,0.94);flex:1;display:flex;flex-direction:column;backdrop-filter:blur(4px);transition:transform 0.3s,box-shadow 0.3s}
.org-workshop-card:hover{box-shadow:0 4px 24px rgba(113,46,172,0.18)}
@keyframes orgWorkshopGlow{to{transform:rotate(360deg)}}
.org-workshop-card__duration{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--purple);margin-bottom:10px}
.org-workshop-card h3{font-size:18px;font-weight:700;color:var(--deep-purple);margin-bottom:10px}
.org-workshop-card p{font-size:14px;color:var(--deep-purple);opacity:0.7;line-height:1.6;flex:1}
.org-workshops__note{font-size:15px;color:var(--deep-purple);opacity:0.5;margin-top:28px;max-width:600px;font-style:italic;line-height:1.6}
.org-advocacy .section-inner{padding-bottom:40px}
.org-advocacy__sub-label{font-size:15px;color:var(--purple);font-weight:700;font-style:italic;margin-bottom:24px}
.org-advocacy__intro{max-width:720px;margin-bottom:24px}
.org-advocacy__intro p{font-size:16px;line-height:1.7;color:var(--deep-purple);opacity:0.7;margin-bottom:12px}
.advocacy-layout{display:grid;grid-template-columns:1fr 300px;gap:40px;align-items:start}
.advocacy-layout__content{min-width:0}
.advocacy-visual{position:relative;width:280px;height:280px;display:flex;align-items:center;justify-content:center;margin:20px auto}
.advocacy-visual__hub{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:6px}
.advocacy-visual__hub-icon{width:56px;height:56px;border-radius:14px;background:white;border:2px solid rgba(113,46,172,0.15);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(113,46,172,0.1)}
.advocacy-visual__hub-label{font-size:10px;font-weight:700;color:var(--purple);text-transform:uppercase;letter-spacing:0.06em}
.advocacy-visual__node{position:absolute;z-index:3;display:flex;align-items:center;gap:6px;opacity:0;transition:all 0.6s cubic-bezier(.16,1,.3,1)}
.advocacy-visual__node--active{opacity:1}
.advocacy-visual__avatar{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:white;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.1);flex-shrink:0}
.advocacy-visual__node-info{display:flex;flex-direction:column}
.advocacy-visual__node-name{font-size:10px;font-weight:700;color:var(--deep-purple);white-space:nowrap}
.advocacy-visual__node-role{font-size:9px;color:var(--text-mid);opacity:0.6;white-space:nowrap}
.advocacy-visual__ripple{position:absolute;inset:20%;border-radius:50%;border:1.5px solid rgba(113,46,172,0.08);opacity:0;transform:scale(0.5);transition:all 0.8s ease 0.5s}
.advocacy-visual__ripple--2{inset:5%;transition-delay:0.8s}
.advocacy-visual__ripple--active{opacity:1;transform:scale(1)}
.pull-quote{display:flex;gap:16px;margin:28px 0;padding:20px 0}
.pull-quote__bar{width:4px;border-radius:2px;flex-shrink:0;background:linear-gradient(to bottom,var(--purple),var(--lime))}
.pull-quote p{font-size:20px;font-weight:700;line-height:1.5;color:var(--deep-purple);letter-spacing:-0.01em;white-space:pre-line;flex:1}
[dir="rtl"] .pull-quote{flex-direction:row}
[dir="rtl"] .pull-quote p{text-align:right!important}
[dir="rtl"] .cta__sub,[dir="rtl"] .cta__note{text-align:center;margin:0 auto}
[dir="rtl"] .org-advocacy__intro p{text-align:right}
.org-results .section-inner{padding-top:40px}
.results__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.results__grid>*{display:flex}
.results__item{text-align:center;padding:28px 16px;background:rgba(113,46,172,0.04);border-radius:14px;border:1px solid rgba(113,46,172,0.06);transition:transform 0.3s;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center}
.results__item:hover{transform:translateY(-2px)}
.results__num{font-size:clamp(32px,4vw,48px);font-weight:700;color:var(--purple);display:block;margin-bottom:8px}
.results__label{font-size:14px;color:var(--deep-purple);opacity:0.65;line-height:1.4}
.results__note{text-align:center;font-size:14px;color:var(--purple);font-weight:700;margin-top:24px}
.about__layout{display:grid;grid-template-columns:200px 1fr;gap:48px;align-items:start}
.about__photo-img{width:160px;height:160px;border-radius:50%;object-fit:cover;border:3px solid var(--purple)}
.about__p{font-size:16px;line-height:1.7;color:var(--deep-purple);opacity:0.7;margin-bottom:14px}
.about__links{display:flex;gap:12px;flex-wrap:wrap;margin-top:8px}
.faq__list{max-width:700px;display:flex;flex-direction:column;gap:2px}
.faq__item{border-bottom:1px solid rgba(255,255,255,0.08);cursor:pointer;overflow:hidden}
.faq__q{display:flex;justify-content:space-between;align-items:center;padding:20px 0;gap:16px}
.faq__q h3{font-size:17px;font-weight:700;color:white}
.faq__toggle{font-size:22px;color:var(--lime);flex-shrink:0;width:28px;height:28px;display:flex;align-items:center;justify-content:center}
.faq__a{max-height:0;overflow:hidden;transition:max-height 0.4s cubic-bezier(.16,1,.3,1),padding 0.4s;padding:0}
.faq__item.open .faq__a{max-height:300px;padding-bottom:20px}
.faq__a p{font-size:15px;color:rgba(255,255,255,0.65);line-height:1.65}
.bottom-cta{color:var(--deep-purple);text-align:center}
.cta__title{font-size:clamp(26px,4vw,44px);line-height:1.12;color:var(--deep-purple);margin-bottom:16px;font-weight:700}
.cta__sub{font-size:17px;color:var(--deep-purple);opacity:0.7;max-width:500px;margin:0 auto 32px;line-height:1.6}
.cta__actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:20px}
.cta__note{font-size:14px;color:var(--deep-purple);opacity:0.5;max-width:560px;margin:0 auto}
.vpage-nav{position:fixed;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:10px;z-index:500;right:20px}
[dir="rtl"] .vpage-nav{right:auto;left:20px}
@media(max-width:1200px){.vpage-nav{display:none}}
.vpage-nav__item{display:flex;align-items:center;gap:8px;cursor:pointer;justify-content:flex-end}
.vpage-nav__dot{width:7px;height:7px;border-radius:50%;background:rgba(32,30,75,0.18);border:1.5px solid rgba(32,30,75,0.22);transition:all 0.3s cubic-bezier(.16,1,.3,1);flex-shrink:0}
.vpage-nav__dot.active{background:var(--purple);border-color:var(--purple);width:10px;height:10px}
.vpage-nav__item:hover .vpage-nav__dot{background:var(--purple);border-color:var(--purple);transform:scale(1.2)}
.vpage-nav__label{font-size:11px;font-weight:600;color:var(--deep-purple);background:white;padding:4px 9px;border-radius:5px;white-space:nowrap;box-shadow:0 2px 10px rgba(0,0,0,0.1);pointer-events:none;animation:vpageIn 0.18s cubic-bezier(.16,1,.3,1) forwards}
@keyframes vpageIn{from{opacity:0;transform:translateX(6px)}to{opacity:1;transform:translateX(0)}}
@media(max-width:768px){
  .org-hero__grid{grid-template-columns:1fr}.org-hero__visual{display:none}
  .org-hero__h1{font-size:30px}.org-hero__sub{font-size:15px}
  .org-invest__grid{grid-template-columns:1fr}.org-workshops__grid{grid-template-columns:1fr}
  .results__grid{grid-template-columns:1fr 1fr}
  .about__layout{grid-template-columns:1fr;text-align:center}
  .about__photo{display:flex;justify-content:center}.about__links{justify-content:center}
  .reach-compare{grid-template-columns:1fr;gap:12px}
  .advocacy-layout{grid-template-columns:1fr}.advocacy-visual{width:240px;height:240px}
  .sec-title{font-size:28px}.btn{padding:12px 20px;font-size:14px}
  .cta__actions{flex-direction:column;align-items:center}
}
@media(max-width:480px){
  .results__grid{grid-template-columns:1fr}.container{padding:0 16px}
  .org-hero__h1{font-size:26px}.faq__q h3{font-size:15px}
}
.mob-br{display:none}
@media(max-width:768px){.mob-br{display:block}}
`
    document.head.appendChild(s)
  }, [])
}

// ─── Utilities ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, vis] as const
}

function Reveal({ children, delay = 0, className = "", style = {} }: any) {
  const [ref, vis] = useInView(0.08)
  return (
    <div ref={ref} className={`rv ${vis ? "rv-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

function ColorSection({ bg, children, className = "", id, style = {} }: any) {
  return (
    <section className={`color-section ${className}`} id={id}
      style={{ "--section-bg": bg, ...style } as any}>
      <div className="section-inner">{children}</div>
    </section>
  )
}

function GradientBorderCard({ children, className = "" }: any) {
  return (
    <div className={`gradient-border-card ${className}`}>
      <div className="gradient-border-card__inner">{children}</div>
    </div>
  )
}

function TiltCard({ children, className = "", intensity = 12 }: any) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tStyle, setTStyle] = useState({})
  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTStyle({ transform: `perspective(600px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.02)`, transition: "transform 0.1s ease-out" })
  }
  const handleLeave = () => setTStyle({ transform: "perspective(600px) rotateY(0) rotateX(0) scale(1)", transition: "transform 0.4s ease-out" })
  return (
    <div ref={cardRef} className={className} style={tStyle} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  )
}

function AnimatedNum({ value }: { value: string }) {
  const [ref, isVis] = useInView(0.3)
  const [display, setDisplay] = useState("0")
  useEffect(() => {
    if (!isVis) return
    const target = parseFloat(value.replace(/[^0-9.]/g, "")) || 0
    const hasPlus = value.includes("+"), hasPercent = value.includes("%"), hasK = /K/i.test(value)
    const startTime = Date.now()
    const tick = () => {
      const pct = Math.min((Date.now() - startTime) / 1500, 1)
      const current = Math.round(target * (1 - Math.pow(1 - pct, 3)))
      setDisplay(String(current) + (hasK ? "K" : "") + (hasPercent ? "%" : "") + (hasPlus ? "+" : ""))
      if (pct < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isVis])
  return <span ref={ref as any}>{display}</span>
}

// ─── LinkedIn Icon ────────────────────────────────────────────────────────────
const LI_PATH = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
function LiIcon({ size = 16, color = "#0A66C2" }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d={LI_PATH} /></svg>
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ORG: any = {
  hero: {
    label: { he: "לינקדאין לארגונים", en: "LinkedIn for Organizations" },
    h1: { he: "הלינקדאין הארגוני שלכם\nיכול להביא לקוחות,\nמועמדים ונראוּת.\nאם מנהלים אותו נכון..." },
    sub: { he: "רוב דפי החברה בלינקדאין נראים אותו דבר: תמונת קאבר מ-2022, פוסט כל שבועיים על חג שלאף אחד לא אכפת ממנו, ואפס מעורבות. בינתיים דפי החברה של המתחרים שלכם מייצרים שיחות אמיתיות, מושכים מועמדים ובונים נוכחות." },
    cta: { he: "לשיחת היכרות" },
    fix: { he: "OctaLoom מנהלת דפים ארגוניים בלינקדאין לחברות וארגונים.\nניהול מקצועי שהופך את דף החברה שלכם מבית קברות לערוץ שמביא לקוחות,\nמועמדים ונראוּת בשוק." },
  },
  entity: { he: "OctaLoom מנהלת דפים ארגוניים בלינקדאין ובונה תוכניות שמפעילות את הנוכחות של כל הצוות שלכם בפלטפורמה." },
  companyPage: {
    title: { he: "ניהול דף חברה בלינקדאין" },
    intro: { he: "דף החברה שלכם בלינקדאין הוא הדבר הראשון שלקוחות פוטנציאליים ומועמדים בודקים. לפני שהם נכנסים לאתר, לפני שהם שולחים מייל, הם בודקים אתכם בלינקדאין. ומה שהם מוצאים שם קובע אם הם ממשיכים הלאה או נכנסים לשיחה." },
    statement: { he: "ניהול דף חברה עם OctaLoom כולל:" },
    items: { he: [
      "אסטרטגיית תוכן מותאמת למטרות העסקיות שלכם: לידים, גיוס, מיתוג מעסיק, או שילוב של הכל",
      "כתיבה ופרסום תוכן עקבי שמספר את הסיפור הארגוני: מקרי בוחן, תוכן מקצועי, employer branding, סיפורי עובדים",
      "תזמון וניהול לוח פרסומים. עקביות היא המנטרה והדרך להישאר בתודעה",
      "ניהול קהילה ותגובות: מעורבות עם עוקבים, תגובות ושיתופי פעולה עם פרופילים אישיים של ההנהלה",
      "אופטימיזציה של הדף עצמו: About, Headline, Featured section, CTA ומילות מפתח",
      "אנליטיקס ודוחות ביצועים חודשיים: מה עובד, מה לא, ולאן ממשיכים",
    ]},
    ongoing: { he: "מדובר בניהול שוטף, המתייחס גם לפרופילים של הנהלה הבכירה,\nגם לעובדים וגם לבניית נוכחות מותגית עקבית." },
  },
  truth: {
    title: { he: "האמת על דפי חברה בלינקדאין" },
    content: { he: [
      'בגדול, רוב הסוכנויות לא יגידו לכם את זה:\nאם אתם מצפים שדף החברה יהפוך ל"וויראלי", אתם לא מבינים את לינקדאין ולא מבינים אנשים.',
      "דף חברה מתפקד כמו דף נחיתה או בלוג. רוב האנשים יבקרו בדף החברה שלכם לפני שהם יחליטו לעבוד אתכם,\nבדיוק כמו שהם יבדקו את האתר. אבל האלגוריתם של לינקדאין נותן חשיפה לפרופילים אישיים, לא לדפי חברה.",
      "ניהול נכון של דף חברה אומר: תוכן עקבי, סיפור ארגוני ברור, ואופטימיזציה שמביאה אתכם בתוצאות חיפוש.\nבלי ציפיות לוויראליות, אבל עם ציפיות לתוצאות.",
    ]},
    successTitle: { he: "דף חברה מצליח הוא כזה ש:" },
    successItems: { he: [
      "מספר את הסיפור הארגוני בבהירות",
      "נראה מקצועי ועדכני כשמועמדים או לקוחות מציצים בו",
      "עובד כחלק ממערכת רחבה יותר ולא לבדו",
    ]},
    pullquote: { he: "הרשתות של העובדים שלכם גדולות פי 10 ממספר העוקבים בדף החברה. ואנשים סומכים על עובדים יותר מאשר על מותגים." },
    bridge: { he: "לכן OctaLoom מציעה גם ניהול דף חברה וגם תוכניות שגרירי מותג כשירותים נפרדים שעובדים בצורה הטובה ביותר יחד. אפשר להתחיל בכל אחד בנפרד ולהוסיף את השני כשהזמן מתאים." },
  },
  whyInvest: {
    title: { he: "למה ארגונים (ובמיוחד חברות הייטק)\nמשקיעים בנוכחות בלינקדאין" },
    intro: { he: "מודעות מותג ב-B2B נבנית דרך אנשים, לא לוגואים." },
    introLine2: { he: "מקבלי החלטות סומכים על מייסדים ועובדים שהם עוקבים אחריהם, לא על דפי חברה שלא ראו מעולם." },
    items: [
      { icon: "sales",     title: { he: "Sales Enablement" },           desc: { he: 'כשצוות המכירות שלכם חזק בלינקדאין, שיחת המכירה הראשונה מתחילה חמה. מ"מי אתם?", ל"ראיתי את הפוסט שלכם על..."' }},
      { icon: "talent",    title: { he: "גיוס עובדים" },                 desc: { he: "חברות הייטק עם דף חברה חזק בלינקדאין מקבלות יותר פניות ספונטניות ממועמדים. בשוק גיוס תחרותי, זה לא יתרון, זה סטנדרט." }},
      { icon: "thought",   title: { he: "הפצת מנהיגות דעה" },             desc: { he: "במקום שמייסד אחד נושא את כל הנראות, כל הצוות מגביר את המסר." }},
      { icon: "awareness", title: { he: "מודעות מותג ב-B2B" },           desc: { he: "מחזורי מכירה ב-B2B ארוכים. המותג שמנצח הוא זה שאנשים כבר מכירים כשמגיע רגע ההחלטה. לינקדאין הוא המקום שבו המודעות הזו מצטברת." }},
    ],
  },
  workshops: {
    title: { he: "סדנאות והדרכות לינקדאין" },
    sub: { he: "שירות נפרד לארגונים שרוצים להפעיל את הנוכחות של הצוות שלהם דרך למידה מעשית." },
    items: [
      { title: { he: "LinkedIn Authority" },             duration: { he: "60-90 דקות" },       desc: { he: "הרצאה על מיתוג אישי ונוכחות בלינקדאין. מתאים לכנסים, ימי צוות, או אירועי חברה. בלי מצגות גנריות, מותאם לתחום ולקהל שלכם." }},
      { title: { he: "סדנה מעשית" },                     duration: { he: "חצי יום, מעשי" },    desc: { he: "עם ידיים על המקלדת, המשתתפים מאפטמים פרופילים, כותבים פוסטים ראשונים, ובונים תוכנית מעורבות בזמן אמת. עד 20 משתתפים." }},
      { title: { he: "LinkedIn Leadership Blueprint" },  duration: { he: "רב-מפגשי" },         desc: { he: "עבודה אסטרטגית עמוקה לצוות ההנהלה. מיצוב אישי, אסטרטגיית תוכן, ומפת דרכים ללינקדאין לכל מנהל." }},
      { title: { he: "סדנאות וירטואליות" },              duration: { he: "גמיש" },             desc: { he: "אותו תוכן, בפורמט וובינר. 60-90 דקות הרצאה או 2-3 שעות מעשיות. עד 50 משתתפים." }},
    ],
    note: { he: "כל סדנה מותאמת לתעשייה שלכם, לרמת הצוות ולמטרות שלכם. בלי מצגות גנריות. בלי שטחיות." },
  },
  advocacy: {
    title: { he: "תוכניות שגרירי מותג (Employee Advocacy)" },
    sub: { he: "שירות נפרד שהופך את הצוות שלכם לערוץ הלינקדאין הכי חזק שלכם." },
    intro: { he: [
      "הצוות שלכם הוא הנכס הגדול ביותר שלכם בלינקדאין. ביחד, הרשתות שלהם גדולות פי 10 ממספר העוקבים בדף החברה. ואנשים סומכים על עובדים יותר מאשר על מותגים.",
      "אבל כרגע? אף אחד לא מפרסם אלא אם מזכירים להם. כשהם כן מפרסמים, זה לא תואם את המותג או לא נוח להם. אין מערכת, אין ערכת תוכן, אין תרבות שיתוף.",
      'אנחנו בונים תוכנית שגרירי מותג מאפס. לא מייל "בבקשה שתפו את הפוסטים שלנו". מערכת אמיתית.',
    ]},
    items: { he: [
      'עיצוב תוכנית שגרירות עם מטרות, מבנה, קצב, ומה "הצלחה" נראית כמו עבור הארגון שלכם',
      "הדרכת לינקדאין לעובדים כדי שהצוות ילמד לכתוב פוסטים שמרגישים אותנטיים, לא ארגוניים",
      "ערכת תוכן עם תבניות מוכנות לשימוש, בנק נושאים, ומסגרות פוסטים (הם מתאימים אישית, לא מעתיקים)",
      "תמיכת הפעלה: אנחנו מנהלים את הסשן הפותח, עונים על שאלות, ומניעים את הגל הראשון של פוסטים",
      "פיד תוכן שוטף: תוכן חודשי שהצוות יכול להתאים ולפרסם",
    ]},
    note: { he: "תוכנית שגרירי מותג היא תוכנית חצי שנתית או שנתית. הכוללת הקמה, הדרכה, ערכות תוכן, וליווי עד שהצוות רץ בעצמו." },
  },
  results: {
    title: { he: "תוצאות אמיתיות" },
    sub: { he: "ניהול דף חברה לארגון B2B גלובלי בתחום ה-SAAS:" },
    items: [
      { num: "250%", label: { he: "צמיחת עוקבים בדף החברה בלינקדאין" }},
      { num: "350%", label: { he: "עלייה במעורבות בתוכן הארגוני" }},
      { num: "300K", label: { he: "חשיפות במהלך ההתקשרות" }},
    ],
    note: { he: "כל מספר הוא אורגני. אפס קידום ממומן." },
  },
  about: {
    title: { he: "קצת עליי" },
    text: { he: [
      'אני חניתה (יודובסקי, אבל כמו מדונה, השם הפרטי שלי מספיק), סמנכ"לית שיווק במיקור חוץ עם התמחות בלינקדאין.',
      "אני בונה מערכות שיווק ונוכחות בלינקדאין לארגונים, חברות הייטק, ומייסדים. +5 שנים של שיווק B2B, כולל ניהול דפי חברה, סדנאות, ותוכניות הפעלת עובדים (שגרירים).",
      'אני מנחה את הפודקאסט "מה הסיפור עם?" שבו אנחנו מפרקים את מה שבאמת עובד בשיווק B2B.',
    ]},
    cta1: { he: "בואו נתחבר" },
    cta2: { he: 'לפודקאסט "מה הסיפור עם?"' },
  },
  faq: {
    title: { he: "שאלות נפוצות" },
    items: [
      { q: { he: "מה כולל ניהול דף חברה בלינקדאין?" },                                    a: { he: "אסטרטגיית תוכן, כתיבה ופרסום, ניהול קהילה ותגובות, אנליטיקס ודוחות חודשיים, ואופטימיזציה שוטפת של הדף. הכל מותאם לסיפור הארגוני ולמטרות העסקיות שלכם." }},
      { q: { he: "כמה זמן לוקח עד שרואים תוצאות מניהול דף החברה?" },                       a: { he: "בדרך כלל 2-3 חודשים עד שמתחילים לראות עלייה משמעותית בעוקבים ובמעורבות. לינקדאין מתגמל עקביות, לא קיצורי דרך." }},
      { q: { he: "אנחנו חברת הייטק. הלינקדאין הארגוני באמת רלוונטי לנו?" },                  a: { he: "חד משמעי כן. חברות הייטק חיות ומתות על גיוס ומיתוג מעסיק. דף חברה חזק בלינקדאין הוא הדבר הראשון שמועמדים ולקוחות פוטנציאליים בודקים." }},
      { q: { he: "מה ההבדל בין ניהול דף חברה לסדנת לינקדאין?" },                            a: { he: "ניהול דף חברה הוא שירות שוטף: אני מנהלת את הדף הארגוני שלכם. סדנה היא אירוע חד פעמי שנותן לצוות כלים ומיומנויות. שני שירותים נפרדים, אפשר להזמין כל אחד בנפרד." }},
      { q: { he: "אפשר להתחיל רק עם ניהול דף חברה בלי סדנאות?" },                          a: { he: "בהחלט. כל שירות עומד בפני עצמו. רוב הארגונים מתחילים עם ניהול דף החברה ומוסיפים שירותים נוספים לפי הצורך." }},
      { q: { he: "כמה תוכן אתם מפרסמים בחודש?" },                                          a: { he: "תלוי באסטרטגיה ובמטרות. בדרך כלל 4-12 פרסומים בחודש: שילוב של סיפורי חברה, תוכן מקצועי, מותג מעסיק, ומקרי בוחן. הכמות מותאמת, לא נוסחה קבועה." }},
    ],
  },
  cta: {
    title: { he: "מוכנים להפעיל את הלינקדאין הארגוני?" },
    sub: { he: "אפשר להמשיך עם דף חברה שקט, ואפשר לקבוע שיחה. בואו נבנה תוכנית שמתאימה בדיוק לארגון שלכם." },
    cta1: { he: "לשיחת היכרות" },
    note: { he: "לשירותי לינקדאין נוספים, " },
    noteLink: { he: "לחצו כאן" },
  },
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function OrgHero() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1200)
    const t2 = setTimeout(() => setPhase(2), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const AvatarRow = ({ count, active }: { count: number; active: boolean }) => (
    <div style={{ display: "flex" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: 24, height: 24, borderRadius: "50%", border: "2px solid white",
          marginLeft: i > 0 ? -8 : 0,
          background: active ? ["#667eea","#764ba2","#0A66C2","#2d7a2d","#e67e22"][i % 5] : "#d0d0d0",
          transition: "all 0.6s cubic-bezier(.16,1,.3,1)", transitionDelay: `${i * 80}ms`,
          transform: active ? "scale(1)" : "scale(0.85)", opacity: active ? 1 : 0.4,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, color: "white", fontWeight: 700,
        }}>{String.fromCharCode(65 + i)}</div>
      ))}
    </div>
  )

  const MiniPost = ({ active, delay = 0 }: { active: boolean; delay?: number }) => (
    <div style={{
      display: "flex", gap: 8, alignItems: "flex-start", padding: "8px 10px",
      background: active ? "#f8f9fa" : "#fafafa", borderRadius: 6,
      transition: "all 0.5s ease", transitionDelay: `${delay}ms`,
      opacity: active ? 1 : 0.35,
      border: active ? "1px solid rgba(10,102,194,0.1)" : "1px solid #eee",
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
        background: active ? "linear-gradient(135deg,#712eac,#0A66C2)" : "#e0e0e0",
        transition: "all 0.5s ease", transitionDelay: `${delay}ms`,
      }} />
      <div style={{ flex: 1 }}>
        <div style={{ height: 6, borderRadius: 3, marginBottom: 4, background: active ? "#333" : "#e0e0e0", width: active ? "80%" : "60%", transition: "all 0.5s ease", transitionDelay: `${delay + 100}ms` }} />
        <div style={{ height: 5, borderRadius: 3, background: active ? "#999" : "#eee", width: active ? "55%" : "40%", transition: "all 0.5s ease", transitionDelay: `${delay + 150}ms` }} />
        {active && (
          <div style={{ display: "flex", gap: 10, marginTop: 6, animation: "fadeInUp 0.4s ease forwards", animationDelay: `${delay + 300}ms`, opacity: 0 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {["\u{1F44D}", "\u{1F389}", "❤️"].map((e, i) => <span key={i} style={{ fontSize: 10 }}>{e}</span>)}
            </div>
            <span style={{ fontSize: 9, color: "#666" }}>47</span>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <ColorSection bg="var(--deep-purple)" className="org-hero">
      <div className="container">
        <div className="org-hero__grid">
          <div className="org-hero__text">
            <Reveal className="rv--blur">
              <span className="org-hero__label"><LiIcon size={16} color="var(--lime)" /> {t(ORG.hero.label)}</span>
            </Reveal>
            <Reveal delay={150}>
              <h1 className="org-hero__h1">{t(ORG.hero.h1)}</h1>
            </Reveal>
            <Reveal delay={300}><p className="org-hero__sub">{t(ORG.hero.sub)}</p></Reveal>
            <Reveal delay={400}><p className="org-hero__fix">{t(ORG.hero.fix)}</p></Reveal>
            <Reveal delay={500}>
              <a href="https://calendar.notion.so/meet/octaloom/discovery" className="btn btn--lime" target="_blank" rel="noopener noreferrer">
                {t(ORG.hero.cta)}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </Reveal>
          </div>
          <div className="org-hero__visual">
            <Reveal delay={300} className="rv--tilt">
              <div className="org-mockup">
                <div className="org-mockup__cover" style={{
                  background: phase >= 1 ? "linear-gradient(135deg,#712eac 0%,#0A66C2 100%)" : "linear-gradient(135deg,#c4c4c4 0%,#a0a0a0 100%)",
                  transition: "all 0.8s cubic-bezier(.16,1,.3,1)",
                }}>
                  <div style={{ position: "absolute", bottom: -20, left: 16, width: 48, height: 48, borderRadius: 8, background: "white", border: "2px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 4, background: phase >= 1 ? "linear-gradient(135deg,#712eac,#c5e6a2)" : "#e0e0e0", transition: "all 0.6s ease", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "white" }}>
                      {phase >= 1 ? "Co" : ""}
                    </div>
                  </div>
                </div>

                <div style={{ padding: "28px 16px 12px" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--deep-purple)" }}>YourCompany</div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{phase >= 1 ? "B2B SaaS · בונים את העתיד של..." : "טכנולוגיה · תל אביב"}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: "#0A66C2", fontWeight: 600 }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{phase >= 1 ? "4,832" : "347"}</span> עוקבים
                    </div>
                    <AvatarRow count={5} active={phase >= 1} />
                  </div>
                </div>

                <div style={{ padding: "10px 16px", borderTop: "1px solid #eee", display: "flex", gap: 16 }}>
                  {[{ label: "חשיפות", before: "203", after: "48,500" }, { label: "מעורבות", before: "0.2%", after: "4.8%" }].map((stat, si) => (
                    <div key={si} style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: phase >= 1 ? "#0A66C2" : "#999", transition: "all 0.6s ease", transitionDelay: `${si * 150}ms` }}>{phase >= 1 ? stat.after : stat.before}</span>
                      <span style={{ fontSize: 9, color: "#999" }}>{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div style={{ padding: "8px 12px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
                  <MiniPost active={phase >= 1} delay={200} />
                  <MiniPost active={phase >= 1} delay={400} />
                  <MiniPost active={phase >= 2} delay={600} />
                </div>

                <div className="org-mockup__ghost" style={{ opacity: phase >= 1 ? 0 : 1, transition: "opacity 0.8s ease" }}>
                  <div className="org-mockup__ghost-icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(150,150,150,0.4)" strokeWidth="1.2">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>
                    </svg>
                    <span style={{ fontSize: 10, color: "#bbb", marginTop: 4, fontWeight: 600 }}>פוסט אחרון: לפני 3 חודשים</span>
                  </div>
                </div>

                <div className={`org-mockup__popups ${phase >= 2 ? "show" : ""}`}>
                  <div className="org-mockup__popup org-mockup__popup--1">
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#DFF0D8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#2d7a2d"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--deep-purple)" }}>+250% צמיחת עוקבים</div>
                  </div>
                  <div className="org-mockup__popup org-mockup__popup--2">
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#E7F0FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--deep-purple)" }}>12 עובדים פרסמו השבוע</div>
                  </div>
                  <div className="org-mockup__popup org-mockup__popup--3">
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#FFF3E0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 12 }}>{"🎉"}</span>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--deep-purple)" }}>+350% עלייה במעורבות</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </ColorSection>
  )
}

// ─── Entity ───────────────────────────────────────────────────────────────────
function OrgEntity() {
  return (
    <ColorSection bg="var(--cream)" className="org-entity">
      <div className="container">
        <Reveal><p className="org-entity__text">{t(ORG.entity)}</p></Reveal>
      </div>
    </ColorSection>
  )
}

// ─── Company Page Management ──────────────────────────────────────────────────
function OrgCompanyPage() {
  return (
    <ColorSection bg="var(--cream)" className="org-company" id="company-page">
      <div className="container">
        <Reveal className="rv--blur"><h2 className="sec-title sec-title--dark">{t(ORG.companyPage.title)}</h2></Reveal>
        <Reveal delay={80}><p className="org-company__intro">{t(ORG.companyPage.intro)}</p></Reveal>
        <Reveal delay={120}><p className="org-company__statement">{t(ORG.companyPage.statement)}</p></Reveal>
        <ul className="org-checklist">
          {(t(ORG.companyPage.items) as string[]).map((item, i) => (
            <Reveal key={i} delay={160 + i * 60} className="rv--left">
              <li><span className="org-checklist__icon">✓</span>{item}</li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={600}>
          <div className="pull-quote"><div className="pull-quote__bar" /><p>{t(ORG.companyPage.ongoing)}</p></div>
        </Reveal>
      </div>
    </ColorSection>
  )
}

// ─── The Truth ────────────────────────────────────────────────────────────────
function OrgTruth() {
  return (
    <ColorSection bg="var(--purple)" className="org-truth" id="truth">
      <div className="container">
        <Reveal className="rv--blur">
          <h2 className="sec-title sec-title--light" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {t(ORG.truth.title)} <LiIcon size={32} color="white" />
          </h2>
        </Reveal>
        {(t(ORG.truth.content) as string[]).map((p, i) => (
          <Reveal key={i} delay={i * 100}><p className="org-truth__p">{p}</p></Reveal>
        ))}

        <Reveal delay={300} className="rv--scale">
          <div className="reach-compare">
            <div className="reach-compare__card reach-compare__card--page">
              <div className="reach-compare__icon-wrap reach-compare__icon-wrap--page">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </div>
              <span className="reach-compare__label">דף חברה</span>
              <div className="reach-compare__meter"><div className="reach-compare__fill reach-compare__fill--page" /></div>
              <span className="reach-compare__num reach-compare__num--dim">50 <span className="reach-compare__unit">חשיפות</span></span>
              <div className="reach-compare__dots">
                {Array.from({ length: 5 }).map((_, i) => <div key={i} className="reach-compare__dot reach-compare__dot--dim" />)}
              </div>
            </div>
            <div className="reach-compare__vs-badge"><span>10x</span></div>
            <div className="reach-compare__card reach-compare__card--employee">
              <div className="reach-compare__icon-wrap reach-compare__icon-wrap--employee">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <span className="reach-compare__label">פוסט של עובד</span>
              <div className="reach-compare__meter"><div className="reach-compare__fill reach-compare__fill--employee" /></div>
              <span className="reach-compare__num reach-compare__num--bright">500 <span className="reach-compare__unit">חשיפות</span></span>
              <div className="reach-compare__dots">
                {Array.from({ length: 10 }).map((_, i) => <div key={i} className="reach-compare__dot reach-compare__dot--bright" style={{ animationDelay: `${i * 0.15}s` }} />)}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={400}><h3 className="org-truth__sub-title">{t(ORG.truth.successTitle)}</h3></Reveal>
        <ul className="org-checklist org-checklist--light">
          {(t(ORG.truth.successItems) as string[]).map((item, i) => (
            <Reveal key={i} delay={450 + i * 80} className="rv--left">
              <li><span className="org-checklist__icon org-checklist__icon--lime">✓</span>{item}</li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={700}>
          <div className="pull-quote" style={{ borderColor: "rgba(197,230,162,0.3)" }}>
            <div className="pull-quote__bar" />
            <p style={{ color: "rgba(255,255,255,0.9)" }}>{t(ORG.truth.pullquote)}</p>
          </div>
        </Reveal>
        <Reveal delay={800}><p className="org-truth__bridge">{t(ORG.truth.bridge)}</p></Reveal>
      </div>
    </ColorSection>
  )
}

// ─── Why Invest ───────────────────────────────────────────────────────────────
function OrgWhyInvest() {
  const iconSvgs: any = {
    sales:     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
    talent:    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    thought:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z"/><path d="M9 21h6M10 17v1M14 17v1"/></svg>,
    awareness: <LiIcon size={24} />,
  }
  return (
    <ColorSection bg="var(--cream)" className="org-invest" id="why-invest">
      <div className="container">
        <Reveal className="rv--blur">
          <h2 className="sec-title sec-title--dark" style={{ whiteSpace: "pre-line" }}>
            {t(ORG.whyInvest.title)} <LiIcon size={22} color="var(--deep-purple)" />
          </h2>
        </Reveal>
        <Reveal delay={80}><p className="sec-sub--dark" style={{ whiteSpace: "normal" }}>{t(ORG.whyInvest.intro)}</p></Reveal>
        <Reveal delay={120}><p className="sec-sub--dark sec-sub--emphasis" style={{ whiteSpace: "normal" }}>{t(ORG.whyInvest.introLine2)}</p></Reveal>
        <div className="org-invest__grid">
          {ORG.whyInvest.items.map((item: any, i: number) => (
            <Reveal key={i} delay={150 + i * 120} className="rv--left">
              <GradientBorderCard>
                <div className="org-invest__item">
                  <span className="org-invest__icon">{iconSvgs[item.icon]}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.desc)}</p>
                </div>
              </GradientBorderCard>
            </Reveal>
          ))}
        </div>
      </div>
    </ColorSection>
  )
}

// ─── Workshops ────────────────────────────────────────────────────────────────
function OrgWorkshops() {
  return (
    <ColorSection bg="var(--lime)" className="org-workshops" id="workshops">
      <div className="container">
        <Reveal className="rv--blur"><h2 className="sec-title sec-title--dark">{t(ORG.workshops.title)}</h2></Reveal>
        <Reveal delay={60}><p className="org-workshops__sub">{t(ORG.workshops.sub)}</p></Reveal>
        <div className="org-workshops__grid">
          {ORG.workshops.items.map((item: any, i: number) => (
            <Reveal key={i} delay={150 + i * 120} className="rv--tilt">
              <TiltCard className="org-workshop-card-wrap">
                <div className="org-workshop-card">
                  <span className="org-workshop-card__duration">{t(item.duration)}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.desc)}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={700}><p className="org-workshops__note">{t(ORG.workshops.note)}</p></Reveal>
      </div>
    </ColorSection>
  )
}

// ─── Advocacy ─────────────────────────────────────────────────────────────────
function OrgAdvocacy() {
  const [inView, setInView] = useState(false)
  const visRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.25 })
    if (visRef.current) obs.observe(visRef.current)
    return () => obs.disconnect()
  }, [])

  const team = [
    { name: "A. Cohen", role: "VP Sales",    color: "#667eea" },
    { name: "S. Levi",  role: "Product Lead", color: "#0A66C2" },
    { name: "M. Katz",  role: "CTO",          color: "#764ba2" },
    { name: "R. Ben",   role: "HR Director",  color: "#2d7a2d" },
    { name: "D. Tal",   role: "BD Manager",   color: "#e67e22" },
  ]

  return (
    <ColorSection bg="var(--cream)" className="org-advocacy" id="advocacy">
      <div className="container">
        <Reveal className="rv--blur"><h2 className="sec-title sec-title--dark">{t(ORG.advocacy.title)}</h2></Reveal>
        <Reveal delay={60}><p className="org-advocacy__sub-label">{t(ORG.advocacy.sub)}</p></Reveal>
        <div className="advocacy-layout">
          <div className="advocacy-layout__content">
            <div className="org-advocacy__intro">
              {(t(ORG.advocacy.intro) as string[]).map((p, i) => (
                <Reveal key={i} delay={100 + i * 80}><p>{p}</p></Reveal>
              ))}
            </div>
            <ul className="org-checklist">
              {(t(ORG.advocacy.items) as string[]).map((item, i) => (
                <Reveal key={i} delay={300 + i * 60} className="rv--left">
                  <li><span className="org-checklist__icon">✓</span>{item}</li>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={200} className="rv--right">
            <div className="advocacy-visual" ref={visRef}>
              <div className="advocacy-visual__hub">
                <div className="advocacy-visual__hub-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                </div>
                <span className="advocacy-visual__hub-label">דף חברה</span>
              </div>
              {team.map((member, i) => {
                const angle = (-60 + i * 30) * (Math.PI / 180)
                const x = Math.cos(angle) * 90, y = Math.sin(angle) * 90
                return (
                  <div key={i}
                    className={`advocacy-visual__node ${inView ? "advocacy-visual__node--active" : ""}`}
                    style={{ transform: inView ? `translate(${x}px,${y}px) scale(1)` : "translate(0,0) scale(0.5)", transitionDelay: `${i * 120}ms` }}>
                    <div className="advocacy-visual__avatar" style={{ background: member.color }}>{member.name[0]}</div>
                    <div className="advocacy-visual__node-info">
                      <span className="advocacy-visual__node-name">{member.name}</span>
                      <span className="advocacy-visual__node-role">{member.role}</span>
                    </div>
                  </div>
                )
              })}
              <div className={`advocacy-visual__ripple ${inView ? "advocacy-visual__ripple--active" : ""}`} />
              <div className={`advocacy-visual__ripple advocacy-visual__ripple--2 ${inView ? "advocacy-visual__ripple--active" : ""}`} />
            </div>
          </Reveal>
        </div>
        <Reveal delay={650}>
          <div className="pull-quote"><div className="pull-quote__bar" /><p>{t(ORG.advocacy.note)}</p></div>
        </Reveal>
      </div>
    </ColorSection>
  )
}

// ─── Results ──────────────────────────────────────────────────────────────────
function OrgResults() {
  return (
    <ColorSection bg="var(--cream)" className="org-results" id="results">
      <div className="container">
        <Reveal className="rv--blur"><h2 className="sec-title sec-title--dark">{t(ORG.results.title)}</h2></Reveal>
        <Reveal delay={80}><p className="sec-sub--dark">{t(ORG.results.sub)}</p></Reveal>
        <div className="results__grid">
          {ORG.results.items.map((item: any, i: number) => (
            <Reveal key={i} delay={i * 100} className="rv--scale">
              <div className="results__item">
                <span className="results__num"><AnimatedNum value={item.num} /></span>
                <span className="results__label">{t(item.label)}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={400}><p className="results__note">{t(ORG.results.note)}</p></Reveal>
      </div>
    </ColorSection>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function OrgAbout() {
  return (
    <ColorSection bg="var(--cream)" className="about" id="about">
      <div className="container">
        <div className="about__layout">
          <Reveal className="rv--right">
            <div className="about__photo">
              <img
                src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/HAN.png"
                alt="Hanita"
                className="about__photo-img"
                onError={(e: any) => { e.target.style.display = "none" }}
              />
            </div>
          </Reveal>
          <div className="about__content">
            <Reveal><h2 className="sec-title sec-title--dark">{t(ORG.about.title)}</h2></Reveal>
            {(t(ORG.about.text) as string[]).map((p, i) => (
              <Reveal key={i} delay={100 + i * 100}><p className="about__p">{p}</p></Reveal>
            ))}
            <Reveal delay={500}>
              <div className="about__links">
                <a href="https://www.linkedin.com/in/hanita-yudovski/" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                  {t(ORG.about.cta1)} <LiIcon size={16} />
                </a>
                <a href="https://open.spotify.com/show/4XmsthqR7gnj4nf2gL0T7j" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">{t(ORG.about.cta2)}</a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </ColorSection>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function OrgFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <ColorSection bg="var(--deep-purple)" className="faq" id="faq">
      <div className="container">
        <Reveal className="rv--blur"><h2 className="sec-title sec-title--light">{t(ORG.faq.title)}</h2></Reveal>
        <div className="faq__list">
          {ORG.faq.items.map((item: any, i: number) => (
            <Reveal key={i} delay={i * 80} className="rv--left">
              <div className={`faq__item ${openIdx === i ? "open" : ""}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <div className="faq__q">
                  <h3>{t(item.q)}</h3>
                  <span className="faq__toggle">{openIdx === i ? "−" : "+"}</span>
                </div>
                <div className="faq__a"><p>{t(item.a)}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </ColorSection>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function OrgCTA() {
  return (
    <ColorSection bg="var(--lime)" className="bottom-cta" id="contact">
      <div className="container">
        <Reveal>
          <h2 className="cta__title">{t(ORG.cta.title)}</h2>
          <p className="cta__sub">{t(ORG.cta.sub)}</p>
          <div className="cta__actions">
            <a href="https://calendar.notion.so/meet/octaloom/discovery" className="btn btn--purple" target="_blank" rel="noopener noreferrer">
              {t(ORG.cta.cta1)}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <p className="cta__note" style={{ opacity: 1 }}>
            {t(ORG.cta.note)}
            <a href="https://www.octaloom.com/linkedin-growth-engine-he"
              style={{ color: "var(--deep-purple)", fontWeight: 700, textDecoration: "underline" }}>
              {t((ORG.cta as any).noteLink)}
            </a>
          </p>
        </Reveal>
      </div>
    </ColorSection>
  )
}

// ─── Navbar constants ─────────────────────────────────────────────────────────
const _P = "#712eac", _D = "#201e4b", _L = "#c6e1a5", _C = "#ece9e7", _B = "#e5e7eb"
const _F = "'Discovery Fs', 'Noto Sans Hebrew', sans-serif"

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1440)
  useEffect(() => {
    const fn = () => setW(window.innerWidth)
    window.addEventListener("resize", fn, { passive: true })
    return () => window.removeEventListener("resize", fn)
  }, [])
  return w
}

// ─── Navbar HE ────────────────────────────────────────────────────────────────
function SiteNavbarHe() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [linkedinOpen, setLinkedinOpen] = useState(false)
  const [linkedinExpanded, setLinkedinExpanded] = useState(false)
  const w = useWindowWidth(), isMobile = w < 768

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

  const liSub = [
    { label: "לינקדאין לארגונים",  href: "#" },
    { label: "לינקדאין למנהלים",   href: "https://www.octaloom.com/linkedin-for-executives-he" },
    { label: "לינקדאין לעצמאיים", href: "https://www.octaloom.com/linkedin-for-solopreneurs-he" },
  ]
  const otherSub = [
    { label: 'סמנכ"לית שיווק במיקור חוץ', href: "https://www.octaloom.com/fractional-cmo-he" },
    { label: "כלי AI וסוכנים",          href: "https://www.octaloom.com/ai-tools-agents-he" },
    { label: "סדנאות",                  href: "#workshops" },
  ]
  const navLinks = [
    { label: "אודות",   href: "https://www.octaloom.com/about-he" },
    { label: "בלוג",    href: "https://www.octaloom.com/blog" },
    { label: "צור קשר", href: "#contact" },
    { label: "Goodies", href: "https://octagoodies.com" },
  ]

  const dItem: React.CSSProperties = { display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", fontSize: 13, color: _D, borderRadius: 8, transition: "background 0.15s", textDecoration: "none", fontFamily: _F, direction: "rtl" }
  const dBox: React.CSSProperties  = { position: "absolute", background: "#fff", borderRadius: 12, padding: "8px 6px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: `1px solid ${_B}`, zIndex: 50 }
  const hi = (e: any, on: boolean) => { e.currentTarget.style.background = on ? "rgba(113,46,172,0.05)" : "transparent" }

  return (
    <nav dir="rtl" style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 1000, width: "calc(100% - 48px)", maxWidth: 1152, borderRadius: 100, background: scrolled ? "rgba(236,233,231,0.92)" : "rgba(236,233,231,0.65)", backdropFilter: "blur(50px)", WebkitBackdropFilter: "blur(50px)", border: "1px solid rgba(32,30,75,0.08)", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: _F, transition: "background 0.3s, box-shadow 0.3s", boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none" }}>

      <a href="https://www.octaloom.com/he" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/logo%20nav%20bar.png" alt="OctaLoom" style={{ height: 36, width: "auto", display: "block" }} onError={(e: any) => { e.target.style.display = "none" }} />
      </a>

      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 28, direction: "rtl" }}>
          <div style={{ position: "relative" }} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => { setServicesOpen(false); setLinkedinOpen(false) }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: servicesOpen ? _D : "rgba(32,30,75,0.55)", display: "flex", alignItems: "center", gap: 5, padding: "6px 0", transition: "color 0.25s", fontFamily: _F }}>
              שירותים
              <svg width={11} height={11} viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.25s", transform: servicesOpen ? "rotate(180deg)" : "none" }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {servicesOpen && <div style={{ position: "absolute", top: "100%", left: 0, right: 0, height: 12, zIndex: 199 }} />}
            {servicesOpen && (
              <div style={{ ...dBox, minWidth: 210, top: "calc(100% + 10px)", right: 0 }}>
                <div style={{ position: "relative" }} onMouseEnter={() => setLinkedinOpen(true)} onMouseLeave={() => setLinkedinOpen(false)}>
                  <a href="https://www.octaloom.com/linkedin-growth-engine-he" style={dItem} onMouseEnter={e => hi(e, true)} onMouseLeave={e => hi(e, false)}>
                    <span>מנוע צמיחה בלינקדאין</span>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.45, marginRight: "auto" }}><path d="M8 2l-4 4 4 4" stroke={_D} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  {linkedinOpen && <div style={{ position: "absolute", top: 0, bottom: 0, right: "100%", width: 8, zIndex: 199 }} />}
                  {linkedinOpen && (
                    <div style={{ ...dBox, minWidth: 210, top: 0, right: "calc(100% + 6px)" }}>
                      {liSub.map((s, i) => <a key={i} href={s.href} style={dItem} onMouseEnter={e => hi(e, true)} onMouseLeave={e => hi(e, false)}>{s.label}</a>)}
                    </div>
                  )}
                </div>
                {otherSub.map((s, i) => <a key={i} href={s.href} style={dItem} onMouseEnter={e => hi(e, true)} onMouseLeave={e => hi(e, false)}>{s.label}</a>)}
              </div>
            )}
          </div>
          {navLinks.map((item, i) => (
            <a key={i} href={item.href} style={{ fontSize: 14, color: "rgba(32,30,75,0.55)", textDecoration: "none", transition: "color 0.25s", fontFamily: _F }}
              onMouseEnter={e => (e.currentTarget.style.color = _D)} onMouseLeave={e => (e.currentTarget.style.color = "rgba(32,30,75,0.55)")}>
              {item.label}
            </a>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {!isMobile && (
          <>
            <a href="https://www.octaloom.com/linkedin-for-organizations"
              style={{ fontSize: 12, fontWeight: 600, color: _D, background: "transparent", border: "1px solid rgba(32,30,75,0.22)", borderRadius: 100, padding: "5px 13px", fontFamily: "'Aeonik', sans-serif", transition: "border-color 0.2s, color 0.2s", letterSpacing: "0.03em", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = _P; e.currentTarget.style.color = _P }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(32,30,75,0.22)"; e.currentTarget.style.color = _D }}>
              EN
            </a>
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-discovery"))}
              style={{ padding: "8px 20px", borderRadius: 100, background: _P, color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: _F, border: "none", cursor: "pointer" }}>
              בואו נדבר
            </button>
          </>
        )}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
            style={{ background: "none", border: "none", cursor: "pointer", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ position: "relative", display: "block", width: 28, height: 20 }}>
              {[0, 9, 18].map((top, i) => (
                <span key={i} style={{ position: "absolute", left: 0, width: "100%", height: 2, background: _D, borderRadius: 2, top,
                  transform: menuOpen && i === 0 ? "rotate(45deg) translateY(9px)" : menuOpen && i === 1 ? "scaleX(0)" : menuOpen && i === 2 ? "rotate(-45deg) translateY(-9px)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1, transition: "all 0.3s" }} />
              ))}
            </span>
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, left: 0, background: "#fff", borderRadius: 16, padding: "20px 32px 32px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 50, maxHeight: "calc(100vh - 100px)", overflowY: "auto", direction: "rtl" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: _P, margin: "0 0 4px", fontFamily: _F }}>שירותים</p>
          <div style={{ display: "flex", width: "100%", alignItems: "center", borderBottom: "1px solid rgba(113,46,172,0.08)" }}>
            <a href="https://www.octaloom.com/linkedin-growth-engine-he" onClick={() => setMenuOpen(false)}
              style={{ flex: 1, fontSize: 20, color: _D, padding: "11px 0", fontWeight: 700, fontFamily: _F, textAlign: "right", textDecoration: "none" }}>
              מנוע צמיחה בלינקדאין
            </a>
            <button onClick={() => setLinkedinExpanded(p => !p)} aria-label="הצג שירותי לינקדאין"
              style={{ background: "none", border: "none", padding: "11px 8px", cursor: "pointer", color: _D, display: "flex", alignItems: "center" }}>
              <svg width={11} height={11} viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.25s", transform: linkedinExpanded ? "rotate(180deg)" : "none" }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          {linkedinExpanded && liSub.map((s, i) => (
            <a key={i} href={s.href} onClick={() => setMenuOpen(false)} style={{ display: "block", fontSize: 15, color: _P, textDecoration: "none", padding: "7px 20px 7px 0", borderBottom: "1px solid rgba(113,46,172,0.05)", fontFamily: _F, textAlign: "right" }}>{s.label}</a>
          ))}
          {otherSub.map((s, i) => (
            <a key={i} href={s.href} onClick={() => setMenuOpen(false)} style={{ display: "block", fontSize: 20, color: _D, textDecoration: "none", padding: "11px 0", fontWeight: 700, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: _F, textAlign: "right" }}>{s.label}</a>
          ))}
          {navLinks.map((item, i) => (
            <a key={i} href={item.href} onClick={() => setMenuOpen(false)} style={{ display: "block", fontSize: 20, color: _D, textDecoration: "none", padding: "11px 0", fontWeight: 500, borderBottom: i < navLinks.length - 1 ? "1px solid rgba(113,46,172,0.08)" : "none", fontFamily: _F, textAlign: "right" }}>{item.label}</a>
          ))}
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={() => { setMenuOpen(false); window.dispatchEvent(new CustomEvent("open-discovery")) }}
              style={{ display: "block", textAlign: "center", padding: "14px 24px", fontSize: 15, fontWeight: 700, background: _P, color: "#fff", borderRadius: 100, fontFamily: _F, border: "none", cursor: "pointer", width: "100%" }}>
              בואו נדבר
            </button>
            <a href="https://www.octaloom.com/linkedin-for-organizations"
              style={{ display: "block", textAlign: "center", padding: "11px 24px", fontSize: 13, fontWeight: 600, color: _D, borderRadius: 100, fontFamily: "'Aeonik', sans-serif", border: "1px solid rgba(32,30,75,0.2)", textDecoration: "none", width: "100%", boxSizing: "border-box" }}>
              English →
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── Footer HE ────────────────────────────────────────────────────────────────
function SiteFooterHe() {
  const w = useWindowWidth(), isMobile = w < 768
  const svcLinks = [
    { label: "לינקדאין לארגונים",  href: "#" },
    { label: "לינקדאין למנהלים",   href: "https://www.octaloom.com/linkedin-for-executives-he" },
    { label: "לינקדאין לעצמאיים", href: "https://www.octaloom.com/linkedin-for-solopreneurs-he" },
  ]
  const otherLinks = [
    { label: 'סמנכ"לית שיווק במיקור חוץ', href: "https://www.octaloom.com/fractional-cmo-he" },
    { label: "כלי AI וסוכנים",          href: "https://www.octaloom.com/ai-tools-agents-he" },
    { label: "סדנאות",                  href: "#workshops" },
  ]
  const pageLinks = [
    { label: "בית",     href: "https://www.octaloom.com/he" },
    { label: "אודות",   href: "https://www.octaloom.com/about-he" },
    { label: "בלוג",    href: "https://www.octaloom.com/blog" },
    { label: "צור קשר", href: "#contact" },
  ]
  const legalLinks = [
    { label: "פרטיות",     href: "https://www.octaloom.com/privacy-policy" },
    { label: "תנאי שימוש", href: "https://www.octaloom.com/terms-of-service" },
    { label: "נגישות",     href: "https://www.octaloom.com/accessibility" },
  ]
  const socials = [
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

  const lnk: React.CSSProperties = { fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s", display: "block", lineHeight: "1.9", fontFamily: _F, textAlign: "right" }
  const hd: React.CSSProperties  = { fontSize: 13, fontWeight: 700, color: _C, margin: "0 0 14px", fontFamily: _F, textAlign: "right" }
  const hov = (e: any, on: boolean) => { e.currentTarget.style.color = on ? _L : "rgba(255,255,255,0.5)" }

  return (
    <footer dir="rtl" style={{ padding: isMobile ? "32px 0 0" : "64px 0 0", background: "#201e4b", color: "rgba(255,255,255,0.7)", fontFamily: _F }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 0.65fr 1fr 0.8fr 0.8fr 0.8fr", gap: isMobile ? "20px" : 24, paddingBottom: isMobile ? 24 : 48 }}>

          <div>
            <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png" alt="OctaLoom"
              style={{ height: isMobile ? 64 : 100, width: "auto", display: "block" }} onError={(e: any) => { e.target.style.display = "none" }} />
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 14, maxWidth: 240, lineHeight: 1.65, fontFamily: _F, textAlign: "right" }}>
              מחלקת השיווק שלך,<br/>רק בלי המחלקה.
            </p>
          </div>

          {!isMobile && <div><h4 style={hd}>דפים</h4>{pageLinks.map((l, i) => <a key={i} href={l.href} style={lnk} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>)}</div>}
          {!isMobile && <div><h4 style={hd}>שירותי לינקדאין</h4>{svcLinks.map((l, i) => <a key={i} href={l.href} style={lnk} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>)}</div>}
          {!isMobile && <div><h4 style={hd}>שירותים נוספים</h4>{otherLinks.map((l, i) => <a key={i} href={l.href} style={lnk} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>)}</div>}

          {!isMobile && (
            <div>
              <h4 style={{ ...hd, fontWeight: 300, fontSize: 12 }}>כלים ותבניות<br/>שיווק חינמיים</h4>
              <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "inline-block", opacity: 0.9, transition: "opacity 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "1" }} onMouseLeave={e => { e.currentTarget.style.opacity = "0.9" }}>
                <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/OCTAGOODIES%20GREEN.png" alt="OctaGoodies" style={{ height: 44, width: "auto", display: "block" }} />
              </a>
            </div>
          )}

          <div>
            {!isMobile && <h4 style={hd}>התחברו</h4>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: isMobile ? "flex-start" : "flex-end" }}>
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = _L }} onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 12, color: "rgba(255,255,255,.38)", flexWrap: "wrap", gap: 12, fontFamily: _F }}>
          <div style={{ display: "flex", gap: 18 }}>
            {legalLinks.map((l, i) => (
              <a key={i} href={l.href} style={{ color: "rgba(255,255,255,.38)", textDecoration: "none", transition: "color 0.2s", fontFamily: _F }}
                onMouseEnter={e => { e.currentTarget.style.color = _L }} onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,.38)" }}>
                {l.label}
              </a>
            ))}
          </div>
          <span>© 2026 OctaLoom</span>
        </div>
      </div>
    </footer>
  )
}

// ─── Vertical Page Nav HE ─────────────────────────────────────────────────────
function VerticalPageNavHe() {
  const sections = [
    { id: "company-page", label: "ניהול דף חברה" },
    { id: "truth",        label: "האמת" },
    { id: "why-invest",   label: "למה להשקיע" },
    { id: "workshops",    label: "סדנאות" },
    { id: "advocacy",     label: "שגרירי מותג" },
    { id: "results",      label: "תוצאות" },
    { id: "about",        label: "על חניתה" },
    { id: "faq",          label: "שאלות נפוצות" },
    { id: "contact",      label: "בואו נדבר" },
  ]
  const [active,  setActive]  = useState("")
  const [hovered, setHovered] = useState("")

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive((e.target as HTMLElement).id) }),
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    )
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <div className="vpage-nav">
      {sections.map(s => (
        <div key={s.id} className="vpage-nav__item"
          style={{ justifyContent: "flex-start", flexDirection: "row-reverse" }}
          onMouseEnter={() => setHovered(s.id)} onMouseLeave={() => setHovered("")}
          onClick={() => { const el = document.getElementById(s.id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }) }}>
          {hovered === s.id && <span className="vpage-nav__label" style={{ marginRight: 8, marginLeft: 0 }}>{s.label}</span>}
          <div className={`vpage-nav__dot ${active === s.id ? "active" : ""}`} />
        </div>
      ))}
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function LinkedInForOrganizationsHE() {
  useGlobalStyles()
  useEffect(() => {
    document.documentElement.lang = "he"
    document.documentElement.dir = "rtl"
    const timer = setTimeout(() => {
      document.querySelectorAll(".rv:not(.rv-in)").forEach(el => el.classList.add("rv-in"))
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div dir="rtl" style={{ fontFamily: "'Discovery Fs', 'Noto Sans Hebrew', sans-serif" }}>
      <SiteNavbarHe />
      <VerticalPageNavHe />
      <OrgHero />
      <OrgEntity />
      <OrgCompanyPage />
      <OrgTruth />
      <OrgWhyInvest />
      <OrgWorkshops />
      <OrgAdvocacy />
      <OrgResults />
      <OrgAbout />
      <OrgFAQ />
      <OrgCTA />
      <SiteFooterHe />
    </div>
  )
}
