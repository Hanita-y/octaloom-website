// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

import * as React from "react"
const { useState, useEffect, useRef } = React

// ─── Language Lock ──────────────────────────────────────────────────────────
const LANG = "he"
const IS_HE = true

// ─── Simple translation helper ──────────────────────────────────────────────
const t = (obj: any): any => {
  if (!obj) return ""
  if (typeof obj === "string") return obj
  return obj?.[LANG] || obj?.en || ""
}

// ─── Global styles (exec-styles.css + font-faces injected once) ──────────────
function useGlobalStyles() {
  useEffect(() => {
    const id = "exec-styles-he"
    if (document.getElementById(id)) return
    const s = document.createElement("style")
    s.id = id
    s.textContent = `
@font-face{font-family:'Discovery Fs';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/DiscoveryFs-Light.ttf') format('truetype');font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:'Discovery Fs';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/DiscoveryFs-Medium.ttf') format('truetype');font-weight:500 600 700;font-style:normal;font-display:swap}
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Regular.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Bold.ttf') format('truetype');font-weight:700;font-style:normal;font-display:swap}
:root{--purple:#712eac;--deep-purple:#201e4b;--navy:#060d3d;--lime:#c5e6a2;--cream:#ece9e7;--text-dark:#201e4b;--text-mid:#3d3a5c;--text-light:#ece9e7;--text-dim-light:#a9a3b8;--font-en:'Aeonik',sans-serif;--font-he:'Discovery Fs','Discovery',sans-serif}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
body{font-family:var(--font-he);background:var(--cream);color:var(--text-dark);overflow-x:hidden;line-height:1.6}
[dir="rtl"]{font-family:var(--font-he)}
a{color:inherit;text-decoration:none}
button{font-family:inherit;border:none;background:none;cursor:pointer}
.container{max-width:1120px;margin:0 auto;padding:0 clamp(20px,5vw,48px)}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:16px 0;transition:all 0.35s ease}
.nav--scrolled{background:rgba(236,233,231,0.8);backdrop-filter:blur(20px) saturate(1.3);-webkit-backdrop-filter:blur(20px) saturate(1.3);padding:10px 0;box-shadow:0 1px 0 rgba(0,0,0,0.06)}
.nav__inner{max-width:1120px;margin:0 auto;padding:0 clamp(20px,5vw,48px);display:flex;align-items:center;justify-content:space-between}
.nav__logo{display:flex;align-items:center;gap:10px}
.nav__logo svg{height:28px;width:auto;color:var(--deep-purple)}
.nav__wordmark{font-family:inherit;font-weight:500;font-size:18px;color:var(--deep-purple);letter-spacing:-0.02em}
.nav__links{display:flex;align-items:center;gap:28px}
.nav__link{font-size:14px;color:var(--text-mid);transition:color 0.2s}
.nav__link:hover{color:var(--text-dark)}
.nav__lang{display:flex;align-items:center;gap:4px;font-size:13px}
.nav__lang button{color:var(--text-mid);font-weight:400;font-size:13px;padding:0;transition:color 0.2s}
.nav__lang button.active{color:var(--purple);font-weight:700}
.nav__lang-sep{color:var(--text-mid);opacity:0.3}
.nav__cta{display:inline-flex;align-items:center;padding:10px 22px;border-radius:8px;background:var(--purple);color:white;font-size:14px;font-weight:700;transition:box-shadow 0.3s,transform 0.15s}
.nav__cta:hover{box-shadow:0 4px 20px rgba(113,46,172,0.3);transform:translateY(-1px)}
.nav__burger{display:none;width:24px;height:18px;position:relative;z-index:101;cursor:pointer}
.nav__burger span{position:absolute;left:0;width:100%;height:2px;background:var(--text-dark);border-radius:2px;transition:all 0.3s}
.nav__burger span:nth-child(1){top:0}
.nav__burger span:nth-child(2){top:8px}
.nav__burger span:nth-child(3){top:16px}
.nav__burger.open span:nth-child(1){top:8px;transform:rotate(45deg)}
.nav__burger.open span:nth-child(2){opacity:0}
.nav__burger.open span:nth-child(3){top:8px;transform:rotate(-45deg)}
@media(max-width:768px){.nav__links{display:none;flex-direction:column;position:fixed;inset:0;background:var(--cream);padding:100px 32px 32px;gap:24px;z-index:99}.nav__links.open{display:flex}.nav__burger{display:block}}
.footer{padding:64px 0 32px;background:var(--deep-purple);color:rgba(255,255,255,0.7);font-family:var(--font-he)}
.footer__grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:48px}
.footer__brand p{font-size:14px;color:rgba(255,255,255,0.5);margin-top:12px;max-width:280px;line-height:1.6}
.footer__logo-text{font-size:20px;font-weight:700;color:white;letter-spacing:-0.02em}
.footer__col{display:flex;flex-direction:column;gap:10px}
.footer__col h4{font-size:13px;font-weight:700;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px}
.footer__col a{font-size:14px;color:rgba(255,255,255,0.65);transition:color 0.2s}
.footer__col a:hover{color:white}
.footer__bottom{display:flex;align-items:center;justify-content:space-between;padding-top:32px;border-top:1px solid rgba(255,255,255,0.08);font-size:13px;color:rgba(255,255,255,0.35)}
.footer__legal{display:flex;gap:20px}
.footer__legal a{color:rgba(255,255,255,0.35);transition:color 0.2s}
.footer__legal a:hover{color:rgba(255,255,255,0.7)}
@media(max-width:768px){.footer__grid{grid-template-columns:1fr 1fr;gap:32px}.footer__bottom{flex-direction:column;gap:12px;text-align:center}}
@media(max-width:480px){.footer__grid{grid-template-columns:1fr}}
.exec-hero .section-inner{padding-top:110px !important}
.rv{opacity:0;transform:translateY(36px);transition:opacity 0.8s cubic-bezier(.16,1,.3,1),transform 0.8s cubic-bezier(.16,1,.3,1),filter 0.8s cubic-bezier(.16,1,.3,1)}
.rv.rv-in{opacity:1 !important;transform:translateY(0) !important;filter:none !important}
.rv--left{transform:translateX(-40px) translateY(0)}
.rv--left.rv-in{transform:translateX(0) !important}
[dir="rtl"] .rv--left{transform:translateX(40px) translateY(0)}
[dir="rtl"] .rv--left.rv-in{transform:translateX(0) !important}
.rv--right{transform:translateX(40px) translateY(0)}
.rv--right.rv-in{transform:translateX(0) !important}
[dir="rtl"] .rv--right{transform:translateX(-40px) translateY(0)}
[dir="rtl"] .rv--right.rv-in{transform:translateX(0) !important}
.rv--scale{transform:scale(0.92)}
.rv--scale.rv-in{transform:scale(1) !important}
.rv--blur{filter:blur(8px);transform:translateY(20px)}
.rv--blur.rv-in{filter:blur(0) !important;transform:translateY(0) !important}
.rv--tilt{transform:perspective(800px) rotateX(6deg) translateY(30px);transform-origin:bottom}
.rv--tilt.rv-in{transform:perspective(800px) rotateX(0) translateY(0) !important}
.color-section{background-color:var(--section-bg,var(--cream));transition:background-color 0.6s ease}
.section-inner{padding:clamp(64px,10vw,120px) 0}
.sec-title{font-size:clamp(28px,4vw,44px);line-height:1.15;letter-spacing:-0.015em;margin-bottom:40px;font-weight:700;font-family:var(--font-he)}
[dir="rtl"] .sec-title{font-family:var(--font-he)}
.sec-title--dark{color:var(--deep-purple)}
.sec-title--light{color:var(--text-light)}
.sec-sub--dark{font-size:17px;color:var(--deep-purple);opacity:0.6;margin-bottom:32px;max-width:560px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:700;transition:all 0.25s;cursor:pointer;white-space:nowrap}
.btn--primary{background:var(--purple);color:white}
.btn--primary:hover{box-shadow:0 4px 24px rgba(113,46,172,0.35);transform:translateY(-1px)}
.btn--lime{background:var(--lime);color:var(--navy)}
.btn--lime:hover{box-shadow:0 4px 24px rgba(197,230,162,0.4);transform:translateY(-1px)}
.btn--purple{background:var(--purple);color:white}
.btn--purple:hover{box-shadow:0 4px 24px rgba(113,46,172,0.35);transform:translateY(-1px)}
.btn--outline{background:transparent;color:var(--purple);border:1.5px solid var(--purple)}
.btn--outline:hover{background:var(--purple);color:white}
.btn--ghost{color:var(--purple);padding:12px 24px;font-size:14px;font-weight:700}
.btn--ghost:hover{text-decoration:underline}
.exec-hero{color:var(--text-light)}
.exec-hero .section-inner{padding:clamp(100px,15vw,160px) 0 clamp(80px,12vw,120px)}
.exec-hero__grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:48px;align-items:center}
.exec-hero__label{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--lime);margin-bottom:24px}
.exec-hero__h1{font-size:clamp(32px,5vw,52px);font-weight:700;line-height:1.1;letter-spacing:-0.025em;color:white;max-width:720px;margin-bottom:24px;font-family:var(--font-he)}
.exec-hero__sub{font-size:17px;line-height:1.7;color:rgba(255,255,255,0.7);max-width:540px;margin-bottom:36px}
.exec-hero__visual{display:flex;justify-content:center;perspective:1000px}
.li-mockup{position:relative;width:320px;border-radius:10px;background:white;overflow:visible;box-shadow:0 8px 40px rgba(0,0,0,0.35),0 0 0 1px rgba(255,255,255,0.05);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
.li-mockup__nav{display:flex;align-items:center;padding:6px 12px;background:#1B1F23;border-radius:10px 10px 0 0}
.li-mockup__cover{position:relative;height:72px;background:linear-gradient(135deg,#0A66C2 0%,#004182 100%)}
.li-mockup__avatar-ring{width:68px;height:68px;border-radius:50%;border:3px solid white;overflow:hidden;background:white}
.li-mockup__avatar{width:100%;height:100%;border-radius:50%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);display:flex;align-items:center;justify-content:center}
.li-mockup__profile{padding:6px 16px 12px}
.li-mockup__analytics{padding:10px 16px 14px;border-top:1px solid #eee}
.li-mockup__stat{display:flex;flex-direction:column;gap:1px}
.li-mockup__stat-num{font-size:15px;font-weight:700;color:#0A66C2;transition:all 0.8s cubic-bezier(.16,1,.3,1)}
@keyframes statPop{0%{transform:scale(1)}40%{transform:scale(1.3);color:#2d7a2d}100%{transform:scale(1)}}
.li-mockup__stat-num--pop{animation:statPop 0.6s cubic-bezier(.16,1,.3,1)}
.li-mockup__popups{position:absolute;top:50px;right:-20px;width:240px;display:flex;flex-direction:column;gap:8px;z-index:10}
[dir="rtl"] .li-mockup__popups{right:auto;left:-20px}
.li-mockup__popup{display:flex;align-items:center;gap:10px;padding:10px 12px;background:white;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.15),0 0 0 1px rgba(0,0,0,0.04);opacity:0;transform:translateX(30px) scale(0.9);transition:all 0.5s cubic-bezier(.16,1,.3,1)}
[dir="rtl"] .li-mockup__popup{transform:translateX(-30px) scale(0.9)}
.li-mockup__popups.show .li-mockup__popup{opacity:1;transform:translateX(0) scale(1)}
[dir="rtl"] .li-mockup__popups.show .li-mockup__popup{transform:translateX(0) scale(1)}
.li-mockup__popups.show .li-mockup__popup--1{transition-delay:0s}
.li-mockup__popups.show .li-mockup__popup--2{transition-delay:0.2s}
.li-mockup__popups.show .li-mockup__popup--3{transition-delay:0.4s}
.exec-entity .section-inner{padding-top:60px;padding-bottom:30px}
.exec-entity__text{font-size:18px;line-height:1.75;color:var(--deep-purple);opacity:0.75;max-width:720px;font-family:var(--font-he)}
.exec-problem .section-inner{padding-top:30px}
.exec-problem__p{font-size:16px;line-height:1.7;color:var(--deep-purple);opacity:0.7;margin-bottom:16px;max-width:720px}
.exec-alts{display:flex;flex-direction:column;gap:12px;margin:28px 0;max-width:640px}
.exec-alt{display:flex;gap:14px;align-items:flex-start;padding:18px 20px;border-radius:10px;background:rgba(113,46,172,0.04);border:1px solid rgba(113,46,172,0.08);transition:border-color 0.3s,transform 0.3s;position:relative}
.exec-alt:hover{border-color:rgba(113,46,172,0.15);transform:translateX(4px)}
[dir="rtl"] .exec-alt:hover{transform:translateX(-4px)}
.exec-alt__x{color:#e85d5d;font-weight:700;font-size:16px;flex-shrink:0;padding-top:2px}
.exec-alt strong{font-size:15px;color:var(--deep-purple);display:block;margin-bottom:2px}
.exec-alt p{font-size:14px;color:var(--text-mid);line-height:1.5;margin:0}
.timeline__item--active .timeline__dot{background:var(--purple);box-shadow:0 0 0 2px var(--purple),0 0 12px rgba(113,46,172,0.3);transform:scale(1.2);transition:all 0.5s}
.timeline__item--active .timeline__line{background:linear-gradient(to bottom,var(--purple),rgba(113,46,172,0.15))}
.timeline__item--active .timeline__time{background:rgba(113,46,172,0.1);color:var(--purple)}
.exec-brand .section-inner{padding:clamp(60px,8vw,100px) 0}
.exec-brand__p{font-size:17px;line-height:1.75;color:rgba(255,255,255,0.8);max-width:680px;margin-bottom:16px;font-family:var(--font-he)}
.ba-cards{display:flex;align-items:center;justify-content:center;gap:16px;margin:40px 0 36px;flex-wrap:wrap}
.ba-card{position:relative;width:260px;padding:20px;border-radius:12px;background:white;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;transition:all 0.6s cubic-bezier(.16,1,.3,1)}
.ba-card--before{opacity:0.6;filter:grayscale(0.6) brightness(0.95);box-shadow:0 2px 12px rgba(0,0,0,0.1)}
.ba-card--before.ba-card--visible{opacity:0.75}
.ba-card--after{box-shadow:0 4px 24px rgba(10,102,194,0.2),0 0 0 1px rgba(10,102,194,0.1)}
.ba-card--after.ba-card--visible{box-shadow:0 4px 32px rgba(10,102,194,0.25),0 0 40px rgba(197,230,162,0.08),0 0 0 1px rgba(10,102,194,0.15)}
.ba-card__label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#999;margin-bottom:14px;font-family:var(--font-en)}
.ba-card__label--after{color:#0A66C2}
.ba-card__profile{display:flex;align-items:center;gap:10px;margin-bottom:14px}
.ba-card__avatar{width:44px;height:44px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.ba-card__avatar--before{background:#e8e8e8}
.ba-card__avatar--after{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);box-shadow:0 0 0 2px #2d7a2d}
.ba-card__stats{display:flex;gap:20px;margin-bottom:12px}
.ba-card__stat{display:flex;flex-direction:column;gap:1px}
.ba-card__stat-num{font-size:16px;font-weight:700}
.ba-card__stat-label{font-size:10px;color:#999;font-family:var(--font-he)}
.ba-card__post-status{display:flex;align-items:center;gap:6px;font-size:11px;color:#999;font-family:var(--font-en);padding:8px 10px;background:#f8f8f8;border-radius:6px}
.ba-card__post-status--active{background:#f0f8e8;color:#2d7a2d}
.ba-card__dust{position:absolute;inset:0;border-radius:12px;pointer-events:none;background:repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(200,200,200,0.03) 3px,rgba(200,200,200,0.03) 4px)}
.ba-card__dm{position:absolute;top:-8px;left:-16px;display:flex;align-items:center;gap:6px;padding:6px 10px;background:white;border-radius:8px;box-shadow:0 3px 12px rgba(0,0,0,0.12);opacity:0;transform:translateY(8px) scale(0.9);transition:all 0.5s cubic-bezier(.16,1,.3,1) 1s}
[dir="rtl"] .ba-card__dm{left:auto;right:-16px}
.ba-card__dm--visible{opacity:1;transform:translateY(0) scale(1)}
.ba-arrow{opacity:0;transform:scaleX(0);transition:all 0.5s cubic-bezier(.16,1,.3,1) 0.4s;flex-shrink:0}
[dir="rtl"] .ba-arrow{transform:scaleX(0) rotate(180deg)}
.ba-arrow--visible{opacity:1;transform:scaleX(1)}
[dir="rtl"] .ba-arrow--visible{transform:scaleX(1) rotate(180deg)}
@media(max-width:600px){.ba-cards{flex-direction:column;gap:12px}.ba-card{width:100%;max-width:280px}.ba-arrow{transform:rotate(90deg) scaleX(0)}.ba-arrow--visible{transform:rotate(90deg) scaleX(1)}[dir="rtl"] .ba-arrow{transform:rotate(90deg) scaleX(0)}[dir="rtl"] .ba-arrow--visible{transform:rotate(90deg) scaleX(1)}}
.pull-quote{display:flex;gap:16px;margin:28px 0;padding:20px 0}
.pull-quote__bar{width:4px;border-radius:2px;flex-shrink:0;background:linear-gradient(to bottom,var(--purple),var(--lime))}
.pull-quote p{font-size:20px;font-weight:700;line-height:1.5;color:var(--deep-purple);letter-spacing:-0.01em;font-family:var(--font-he)}
.timeline{position:relative;max-width:700px}
.timeline__item{display:flex;gap:24px;padding-bottom:8px}
.timeline__marker{display:flex;flex-direction:column;align-items:center;flex-shrink:0;width:20px;padding-top:6px}
.timeline__dot{width:16px;height:16px;border-radius:50%;background:var(--purple);border:3px solid var(--cream);box-shadow:0 0 0 2px var(--purple);flex-shrink:0}
.timeline__line{width:2px;flex:1;background:linear-gradient(to bottom,var(--purple),rgba(113,46,172,0.1));margin-top:4px}
.timeline__content{padding-bottom:40px;flex:1}
.timeline__label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--purple);margin-bottom:4px;display:block}
.timeline__title{font-size:22px;font-weight:700;color:var(--deep-purple);margin-bottom:12px;font-family:var(--font-he)}
.timeline__list{list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.timeline__list li{font-size:15px;color:var(--deep-purple);opacity:0.7;line-height:1.5;padding-left:16px;position:relative}
[dir="rtl"] .timeline__list li{padding-left:0;padding-right:16px}
.timeline__list li::before{content:'';position:absolute;left:0;top:8px;width:6px;height:6px;border-radius:50%;background:var(--purple)}
[dir="rtl"] .timeline__list li::before{left:auto;right:0}
.timeline__time{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--purple);padding:8px 14px;background:rgba(113,46,172,0.06);border-radius:8px}
.fit-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.fit-card{padding:36px 32px;border-radius:16px;height:100%}
.fit-card--yes{background:rgba(197,230,162,0.12);border:1px solid rgba(197,230,162,0.25);transition:box-shadow 0.3s}
.fit-card--yes:hover{box-shadow:0 0 30px rgba(197,230,162,0.15)}
.fit-card--no{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);transition:box-shadow 0.3s}
.fit-card--no:hover{box-shadow:0 0 30px rgba(255,100,100,0.1)}
.fit-card h3{font-size:18px;font-weight:700;color:white;margin-bottom:20px;font-family:var(--font-he)}
.fit-card ul{list-style:none;display:flex;flex-direction:column;gap:12px}
.fit-card li{display:flex;gap:10px;font-size:15px;color:rgba(255,255,255,0.8);line-height:1.5}
.fit-check{color:var(--lime);font-weight:700;flex-shrink:0}
.fit-x{color:#ff8a8a;font-weight:700;flex-shrink:0}
.fit-honesty{font-size:15px;color:rgba(255,255,255,0.5);margin-top:24px;text-align:center;max-width:600px;margin-left:auto;margin-right:auto;font-style:italic}
.exec-score .section-inner{padding:60px 0}
.score-card{text-align:center;max-width:600px;margin:0 auto;font-family:var(--font-he)}
.score-card h2{font-size:clamp(24px,3.5vw,36px);font-weight:700;color:var(--deep-purple);margin-bottom:16px;font-family:inherit}
.score-stat{font-size:17px;font-weight:700;color:var(--purple);margin-bottom:12px;font-family:inherit}
.score-desc{font-size:15px;color:var(--deep-purple);opacity:0.7;line-height:1.6;margin-bottom:24px;font-family:inherit}
.included-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px}
.included-col h2{font-size:clamp(22px,3vw,32px)}
.checklist{list-style:none;display:flex;flex-direction:column;gap:14px}
.checklist li{display:flex;gap:12px;font-size:15px;line-height:1.55;color:var(--deep-purple);opacity:0.75}
.checklist__icon{flex-shrink:0;font-weight:700;width:22px;height:22px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px}
.checklist--yes .checklist__icon{background:rgba(197,230,162,0.3);color:#2d7a2d}
.checklist--no .checklist__icon{background:rgba(232,93,93,0.1);color:#e85d5d}
.checklist__icon--animated{transition:transform 0.3s,box-shadow 0.3s}
.rv-in .checklist__icon--animated{animation:checkPop 0.4s cubic-bezier(.16,1,.3,1)}
@keyframes checkPop{0%{transform:scale(0)}50%{transform:scale(1.3)}100%{transform:scale(1)}}
.results__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.results__item{text-align:center;padding:28px 16px;background:rgba(113,46,172,0.04);border-radius:14px;border:1px solid rgba(113,46,172,0.06);transition:transform 0.3s}
.results__item:hover{transform:translateY(-2px)}
.results__num{font-size:clamp(32px,4vw,48px);font-weight:700;color:var(--purple);display:block;margin-bottom:8px}
.results__label{font-size:14px;color:var(--deep-purple);opacity:0.65;line-height:1.4;font-family:var(--font-he)}
.results__note{text-align:center;font-size:14px;color:var(--purple);font-weight:700;margin-top:24px}
.li-testi-post{background:white;border-radius:10px;padding:20px 24px;border:1px solid rgba(0,0,0,0.08);box-shadow:0 1px 4px rgba(0,0,0,0.06)}
.li-testi-post__header{display:flex;align-items:center;gap:10px;margin-bottom:14px}
.li-testi-post__photo{width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0}
.li-testi-post__info{flex:1}
.li-testi-post__info a{text-decoration:none}
.li-testi-post__info strong{font-size:15px;color:var(--deep-purple);display:block}
.li-testi-post__info span{font-size:12px;color:var(--text-mid)}
.li-testi-post__body{font-size:14px;line-height:1.65;color:#333;margin-bottom:14px}
.li-testi-post__actions{display:flex;gap:0;border-top:1px solid rgba(0,0,0,0.06);padding-top:4px}
.li-action-wrap{position:relative;flex:1}
.li-testi-action{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:10px 4px;border-radius:6px;font-size:12px;font-weight:600;color:#666;background:none;border:none;cursor:pointer;transition:background 0.2s}
.li-testi-action:hover{background:rgba(0,0,0,0.04)}
.li-testi-action.liked{color:#0A66C2}
.about__layout{display:grid;grid-template-columns:200px 1fr;gap:48px;align-items:start}
.about__photo-img{width:160px;height:160px;border-radius:50%;object-fit:cover;border:3px solid var(--purple)}
.about__p{font-size:16px;line-height:1.7;color:var(--deep-purple);opacity:0.7;margin-bottom:14px;font-family:var(--font-he)}
.about__links{display:flex;gap:12px;flex-wrap:wrap;margin-top:8px}
.faq__list{max-width:700px;display:flex;flex-direction:column;gap:2px}
.faq__item{border-bottom:1px solid rgba(0,0,0,0.06);cursor:pointer;overflow:hidden}
.faq__q{display:flex;justify-content:space-between;align-items:center;padding:20px 0;gap:16px}
.faq__q h3{font-size:17px;font-weight:700;color:var(--deep-purple);font-family:var(--font-he)}
.faq__toggle{font-size:22px;color:var(--purple);flex-shrink:0;width:28px;height:28px;display:flex;align-items:center;justify-content:center;transition:transform 0.3s}
.faq__item.open .faq__toggle{transform:rotate(180deg)}
.faq__a{max-height:0;overflow:hidden;transition:max-height 0.4s cubic-bezier(.16,1,.3,1),padding 0.4s;padding:0}
.faq__item.open .faq__a{max-height:300px;padding-bottom:20px}
.faq__a p{font-size:15px;color:var(--deep-purple);line-height:1.65;opacity:0.65;font-family:var(--font-he)}
.bottom-cta{color:var(--deep-purple);text-align:center}
.cta__title{font-size:clamp(28px,4.5vw,48px);line-height:1.12;color:var(--deep-purple);margin-bottom:16px;font-weight:700;font-family:var(--font-he)}
.cta__sub{font-size:17px;color:var(--deep-purple);opacity:0.7;max-width:500px;margin:0 auto 32px;line-height:1.6;font-family:var(--font-he)}
.cta__actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:20px}
.cta__note{font-size:14px;color:var(--deep-purple);opacity:0.5}
[dir="rtl"]{text-align:right}
[dir="rtl"] .testimonials,[dir="rtl"] .bottom-cta,[dir="rtl"] .exec-score{text-align:center}
@media(max-width:768px){.exec-hero__grid{grid-template-columns:1fr}.exec-hero__visual{display:none}.exec-hero__h1{font-size:32px}.exec-hero__sub{font-size:16px}.fit-grid{grid-template-columns:1fr}.included-grid{grid-template-columns:1fr}.results__grid{grid-template-columns:1fr 1fr}.about__layout{grid-template-columns:1fr;text-align:center}.about__photo{display:flex;justify-content:center}.about__links{justify-content:center}.sec-title{font-size:28px}.btn{padding:12px 20px;font-size:14px}.cta__actions{flex-direction:column;align-items:center}.timeline__item{gap:16px}}
@media(max-width:480px){.results__grid{grid-template-columns:1fr}.container{padding:0 16px}.exec-hero__h1{font-size:28px}.faq__q h3{font-size:15px}}
    `
    document.head.appendChild(s)
  }, [])
}

// ─── useWindowWidth hook ─────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1440)
  useEffect(() => {
    const fn = () => setW(window.innerWidth)
    window.addEventListener("resize", fn, { passive: true })
    return () => window.removeEventListener("resize", fn)
  }, [])
  return w
}

// ─── useInView hook ──────────────────────────────────────────────────────────
function useInView(threshold = 0.12): [React.RefObject<any>, boolean] {
  const ref = useRef<any>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.unobserve(el) }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, vis]
}

// ─── Reveal ──────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "", style = {} }: any) {
  const [ref, vis] = useInView(0.08)
  return (
    <div ref={ref} className={`rv ${vis ? "rv-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

// ─── ColorSection ────────────────────────────────────────────────────────────
function ColorSection({ bg, children, className = "", id, style = {} }: any) {
  return (
    <section className={`color-section ${className}`} id={id}
      style={{ "--section-bg": bg, ...style } as any}>
      <div className="section-inner">{children}</div>
    </section>
  )
}

// ─── Content (EX object — HE locked) ────────────────────────────────────────
const EX = {
  hero: {
    h1: { he: 'אתם מנהלים את החברה. אבל מי מנהל את הלינקדאין האישי שלכם?', en: 'LinkedIn Ghostwriting & Thought Leadership for B2B Founders' },
    sub: { he: 'תנו לי לנחש: פרסמתם 4-5 פוסטים, קיבלתם לייקים מכמה קולגות ומהשותף, ואז נעלמתם מהפיד לחודשיים, או שלושה, אולי אפילו לחצי שנה. בינתיים, מייסדים אחרים בתחום שלכם בונים פרסונל ברנד, מקבלים הודעות מלקוחות פוטנציאליים, ונראים כמו מובילי דעה (דיי נו, אתם יודעים שמשפיענים זה לא השפה בלינקדאין).', en: 'You know LinkedIn matters.' },
    cta: { he: 'בואו נדבר', en: 'Book a Free Discovery Call' },
  },
  entity: {
    he: "הקמתי את OctaLoom בין היתר כדי לתת מענה למצב הזה. כסמנכ״לית שיווק במיקור חוץ, אני בונה למייסדים ולמנכ״לים מערכת ניהול לינקדאין שלמה: פרסונל ברנד, ביסוס אוטוריטה או מיצוב כמובילי דעה (Thought Leadership), תוכן שנשמע כמוכם, ומנגנון שמייצר לידים. אתם ממשיכים לנהל חברה, אני מנהלת את הלינקדאין.",
    en: "OctaLoom runs LinkedIn as a full marketing system for B2B SaaS founders and SMB owners.",
  },
  problem: {
    title: { he: 'למה זה עדיין לא עובד לכם?', en: 'The Real Problem' },
    content: {
      he: [
        'הבעיה היא לא רק שאתם לא מפרסמים מספיק. הבעיה העיקרית היא שאין לכם שיטה.',
        'פרסום אקראי בלי אסטרטגיה לא מצטבר לשום דבר. פוסט פה, פוסט שם, ואז שקט של חודשיים. האלגוריתם של לינקדאין שוכח שאתם קיימים, וכך גם קהל היעד שלכם.',
      ],
      en: ['Everyone tells you to post more.'],
    },
    alternatives: {
      he: [
        { label: 'לגייס אשת שיווק פנימית', desc: '2-3 חודשי הכשרה ומשכורת מלאה לפני שרואים קמצוץ של תוצאה' },
        { label: 'סוכנות שיווק', desc: 'מינימום 3 אנשים מעורבים, שבועות של אונבורדינג, וכותב ג׳וניור שלומד את התעשייה שלכם על חשבונכם' },
        { label: 'פרילנסר', desc: 'מבצע, אבל בלי חשיבה אסטרטגית רחבה של הארגון' },
        { label: 'לעשות לבד', desc: 'זה נופל מהיומן ברגע שמגיעה ישיבת דירקטוריון, סבב גיוס, או סתם יום עמוס' },
      ],
    },
    solution: { he: 'המודל של OctaLoom נבנה במיוחד בשביל הפער הזה: אסטרטגיה של סמנכ״לית שיווק, ביצוע של מחלקה שלמה (רק בלי המחלקה), ובלי שום דבר מכל הרשימה למעלה.' },
    pullquote: { en: "You don't need more posts. You need a LinkedIn system.", he: '' },
  },
  personalBrand: {
    title: { he: 'לינקדאין זה לא רק לידים, זה הפרסונל ברנד שלכם', en: '' },
    content: {
      he: [
        'לידים זה נחמד, אבל הנכס האמיתי שאתם בונים פה הוא הפרסונל ברנד שלכם.',
        'מייסד עם נוכחות חזקה בלינקדאין לא מתפקד כעוד פרופיל. הוא סמכות בתחום, אנשים סומכים עליו, הזדמנויות מגיעות אליו ודלתות נפתחות בפניו. ולא מדובר רק בלקוחות: גם משקיעים, שותפים אסטרטגיים, ועובדים שרוצים לעבוד דווקא אצלכם.',
        'חשבו על זה ככה: כשמישהו מגוגל אתכם לפני פגישה (ואנחנו יודעים שכולם עושים את זה), מה הוא מוצא? פרופיל שנראה כמו קורות חיים מ-2017, או נוכחות שמשדרת שאתם יודעים בדיוק מה אתם עושים?',
        'הפרסונל ברנד שלכם עובד 24/7, גם כשאתם בישיבה, גם כשאתם בחופש. הוא הנציג שלכם בלינקדאין, והלידים מגיעים כתוצאה טבעית ממנו.',
      ],
    },
    heOnly: true,
  },
  timeline: {
    title: { he: 'איך זה נראה בפועל', en: 'What This Actually Looks Like' },
    sub: { he: 'כך נראה תהליך עבודה טיפוסי עם מייסד.', en: "Here's the honest arc of a founder engagement." },
    months: [
      {
        label: { he: 'חודש 1', en: 'Month 1' },
        title: { he: 'הנחת היסודות', en: 'Onboarding and calibration' },
        items: {
          he: [
            'מחקר קהל יעד: מי קונה מכם, מה חשוב להם, מה בונה אצלם אמון',
            'סריקת מתחרים: מה מייסדים אחרים בתחום אומרים, איפה הפערים',
            'אופטימיזציית פרופיל: כותרת, אודות, תמונה, קאבר',
            'עבודת קול ומיצוב: 2-3 שעות, פעם אחת',
            'הגדרת KPIs ומדידה',
            'תוכן מתחיל לצאת בשבועות 2-3',
          ],
          en: ['Deep audience research', 'Competitive scan', 'Voice and positioning work'],
        },
        time: { he: 'כ-30 דקות בשבוע מכם', en: 'About 30 minutes per week from you' },
      },
      {
        label: { he: 'חודש 2 ואילך', en: 'Months 2-3' },
        title: { he: 'המערכת רצה', en: 'System lock' },
        items: {
          he: [
            '2-3 פוסטים בשבוע על הפרופיל האישי שלכם, בקול שלכם',
            'אסטרטגיית מעורבות: תגובות, הודעות, בניית רשת קשרים רלוונטית',
            'סקירה אסטרטגית חודשית: מה עובד, על מה להכפיל, מה לזרוק',
          ],
          en: ['2-3 posts per week', 'Active engagement', 'Monthly strategic review'],
        },
        time: { he: 'יורד לכ-15 דקות בשבוע. הקול ננעל.', en: 'About 15 minutes per week.' },
      },
      {
        label: { he: 'חודש 4 ואילך', en: 'Month 4+' },
        title: { he: 'שיחה חודשית', en: 'Maintenance mode' },
        items: {
          he: [
            'שיחה חודשית אחת של 15-30 דקות',
            'יש חודשים שלמים שלא תשמעו ממני בכלל',
          ],
          en: ['System is running', "You're getting DMs from buyers"],
        },
        time: { he: 'הכיוון הוא תמיד פחות מהזמן שלכם, לא יותר.', en: 'A monthly check-in of 15-30 minutes.' },
      },
    ],
    pullquote: { he: 'כל המערכת בנויה לרוץ בלי שתצטרכו לגעת בה.', en: 'The trajectory is always toward less of your time.' },
  },
  fit: {
    title: { he: 'למי זה מתאים (ולמי לא)', en: 'Who This Is For' },
    forYou: {
      title: { he: 'מתאים לכם אם:', en: 'This is for you if:' },
      items: {
        he: [
          'אתם מייסדים או מנכ"לים של חברת B2B עם כ-10-100 עובדים',
          'אתם יודעים שלינקדאין הוא המקום שבו הלקוחות שלכם נמצאים',
          'אתם רוצים לבנות פרסונל ברנד ושהפרופיל האישי שלכם ייצר pipeline',
          'אין לכם זמן לפרסם בעקביות',
          'אתם מחפשים שותפה אסטרטגית, לא ספקית תוכן',
        ],
        en: ['B2B SaaS founder or SMB owner', 'Buyers are on LinkedIn'],
      },
    },
    notForYou: {
      title: { he: 'לא מתאים לכם אם:', en: 'This is not for you if:' },
      items: {
        he: [
          'אתם רוצים לתת כרטיס אשראי ולהעלם',
          'אתם בתחום שבו קהל היעד שלכם לא נמצא בלינקדאין',
          'אתם רוצים פוסט כל יום (2-3 פוסטים אסטרטגיים מנצחים ספאם יומי)',
          'אתם רוצים הבטחה למספר לידים ספציפי (מי שמבטיח מספרים, משקר)',
        ],
        en: ['You want to hand someone a credit card and disappear'],
      },
    },
    honesty: { en: "Honesty is the trust signal.", he: '' },
  },
  included: {
    title: { he: 'מה כולל השירות', en: "What's Included" },
    items: {
      he: [
        'מחקר קהל ומתחרים',
        'עבודת קול ומיצוב',
        'אופטימיזציית פרופיל (כותרת, אודות, תמונה, קאבר)',
        'אסטרטגיית תוכן ומיתוג אישי',
        'כתיבת תוכן בקול שלכם, 2-3 פוסטים בשבוע',
        'אסטרטגיית מעורבות (תגובות, הודעות, בניית רשת)',
        'ניתוח נתונים וסקירה חודשית',
        'ניהול עמוד החברה (בעלות נוספת)',
      ],
      en: ['Audience and competitive research', 'Voice and positioning setup'],
    },
  },
  notIncluded: {
    title: { he: 'מה לא כולל השירות', en: "What's Not Included (Honest)" },
    items: {
      he: [
        'פרסום ממומן (סקופ נפרד)',
        'פלטפורמות אחרות (אינסטגרם, טיקטוק, טוויטר)',
        'סגירת עסקאות (אנחנו מייצרים לידים, אתם סוגרים)',
        'פוסט כל יום',
        'כתיבה בשם כמה אנשים באותו ריטיינר',
        'הבטחה למספרי לידים ספציפיים',
      ],
      en: ['Paid ads', 'Other social platforms'],
    },
  },
  results: {
    title: { he: 'תוצאות אמיתיות', en: 'Real Results' },
    sub: { he: 'מספרים, לא הבטחות.', en: 'Every number below is organic.' },
    items: [
      { num: '300%', label: { he: 'עלייה במעורבות בפרופיל של מייסד חברת B2B SaaS ישראלית', en: 'engagement lift on a B2B SaaS founder personal brand' } },
      { num: '770K+', label: { he: 'חשיפות אורגניות על פני חשבונות לינקדאין של לקוחות', en: 'organic impressions across client LinkedIn accounts' } },
      { num: '~5,000', label: { he: 'עוקבים עסקיים ב-3 חודשים, צמיחה אורגנית מלאה', en: 'engaged B2B followers grown 100% organically' } },
    ],
    note: { he: 'כל מספר כאן הוא אורגני.', en: '' },
  },
  testimonial: {
    quote: {
      he: 'במהלך החודשים האחרונים עבדתי ישירות מול חניתה בכל הקשור לייעוץ שיווקי, בדגש על עולם ה-B2B ועל פעילות בפלטפורמת לינקדאין. הליווי המקצועי שהובילה היה יסודי, מעמיק ומובנה, וכלל מחקר מקדים רחב, לימוד מעמיק של תחום העיסוק של החברה וניתוח הסביבה העסקית והמתחרים. התהליך כלל גיבוש אסטרטגיה שיווקית ארוכת טווח ותכנית עבודה ברורה, והתוצר השיווקי תרם משמעותית לפעילות הגלובלית של החברה.',
      en: 'I worked directly with Hanita on B2B marketing strategy and LinkedIn execution.',
    },
    author: { he: 'יורם אביגד', en: 'Yoram Avigad' },
    role: { he: 'מנכ"ל תוצרת הנגב', en: 'CEO, Totzeret HaNegev' },
    photo: 'https://media.licdn.com/dms/image/v2/D4D03AQHezDhkinQQ7w/profile-displayphoto-crop_800_800/B4DZmfi1smJIAI-/0/1759318336588?e=1778716800&v=beta&t=J3V6XKgwzycKBElKvGWreV7CDrxOlrVpUrY6AnodTL0',
    linkedin: 'https://www.linkedin.com/in/yoram-avigad/',
  },
  about: {
    title: { he: 'קצת עליי', en: "Hi, I'm Hanita" },
    text: {
      he: [
        'אני חניתה (יודובסקי, אבל כמו מדונה השם הפרטי שלי מספיק 😅), סמנכ״לית שיווק במיקור חוץ. בגדול, אני מחלקת שיווק שלמה, רק בלי המחלקה.',
        'כבר 5+ שנים אני בונה מערכות שיווק B2B לחברות ישראליות. הפרופיל שלי בלינקדאין? כ-5,000 עוקבים עסקיים, 100% צמיחה אורגנית, אותה מערכת בדיוק שאני בונה ללקוחות. אני לא באה למכור תיאוריה, אני מוכרת משהו שאני עושה בעצמי כל יום.',
        'אני מנחה את הפודקאסט ״מה הסיפור עם?״ שבו אנחנו מפרקות את מה שבאמת עובד בשיווק B2B.',
      ],
      en: ["Hi, I'm Hanita."],
    },
    cta1: { he: 'לינקדאין של חניתה', en: 'Connect on LinkedIn' },
    cta2: { he: 'לפודקאסט ״מה הסיפור עם?״', en: 'Listen to the podcast' },
  },
  faq: {
    title: { he: 'שאלות נפוצות', en: 'Frequently Asked Questions' },
    items: [
      {
        q: { he: 'מה ההבדל בין לפרסם בעצמי לבין ניהול לינקדאין מקצועי?', en: '' },
        a: { he: 'אתם מייסדים, לא משווקים. לפרסם בעצמכם זה 45 דקות על פוסט אחד, בלי אסטרטגיה, בלי מדידה, רק כדי שאחרי 3 שבועות תוותרו שוב. ניהול מקצועי מוריד מכם את עלות הזמן ומוסיף שכבה אסטרטגית שגורמת לתוכן לבנות פרסונל ברנד ולהצטבר לתוצאות.', en: '' },
      },
      {
        q: { he: 'כמה מהזמן שלי זה דורש?', en: '' },
        a: { he: 'השקעה ראשונית של 2-3 שעות לעבודת קול ומיצוב, פעם אחת בלבד. אחר כך, בחודש 1 כ-30 דקות בשבוע בזמן שאנחנו מכיילים את הקול, בחודשים 2-3 זה יורד ל-15 דקות בשבוע, ומחודש 4 רוב הלקוחות שומעים ממני פעם בחודש לשיחה אסטרטגית של 15-30 דקות. הכיוון תמיד אותו: פחות מהזמן שלכם, יותר מהזמן של הסוכנים.', en: '' },
      },
      {
        q: { he: 'איך מבטיחים שהתוכן ישמע כמוני ולא כמו קופי גנרי?', en: '' },
        a: { he: 'בגלל זה האונבורדינג מרוכז בהתחלה, אני לומדת איך אתם מדברים, מה אתם באמת חושבים, ומה אתם בשום פנים ואופן לא אומרים. הפוסטים של החודש הראשון עוברים דרככם לעריכה. מחודש שני, הקול ננעל.', en: '' },
      },
      {
        q: { he: 'תוך כמה זמן מתחילים לראות תוצאות?', en: '' },
        a: { he: '30 יום למעורבות (תגובות, הודעות, כניסות לפרופיל). 90 יום ללידים אמיתיים. 6 חודשים ל-pipeline שאפשר למדוד. מי שמבטיח לכם יותר מהר, כנראה מריץ פרסום ממומן וקורא לזה ״צמיחה אורגנית״.', en: '' },
      },
      {
        q: { he: 'את עובדת על הפרופיל האישי, עמוד החברה, או שניהם?', en: '' },
        a: { he: 'תמיד שניהם, ותמיד ביחד. רוב ההצלחות ב-B2B מגיעות מתוכן של המייסד על הפרופיל האישי, כשעמוד החברה מגבה ומחזק את הסיפור. ניהול עמוד החברה הוא בעלות נוספת.', en: '' },
      },
      {
        q: { he: 'מה קורה אם מפסיקים לעבוד יחד?', en: '' },
        a: { he: 'מה ששלכם נשאר שלכם. מסמך הקול, מבנה לוח התוכן, עבודת המיצוב. המערכת בנויה כך שתוכלו להעביר אותה לגיוס פנימי או להמשיך בעצמכם.', en: '' },
      },
      {
        q: { he: 'איך ניהול לינקדאין בונה לי פרסונל ברנד ולא רק מביא לידים?', en: '' },
        a: { he: 'הלידים הם תוצאה, אבל הנכס האמיתי הוא הפרסונל ברנד. מייסד עם מותג אישי חזק בלינקדאין מושך לקוחות, משקיעים, שותפים ועובדים. אנשים סומכים על מי שהם מכירים. התוכן שאנחנו בונים ממצב אתכם כמובילי דעה בתחום, והלידים מגיעים כתוצאה טבעית מזה.', en: '' },
        heOnly: true,
      },
    ],
  },
  cta: {
    title: { he: 'מוכנים לבנות פרסונל ברנד ומנוע צמיחה מהלינקדאין?', en: 'Ready to Build Your LinkedIn Engine?' },
    sub: {
      he: 'אפשר להמשיך לחשוב על זה, ואפשר פשוט לדבר. שיחת היכרות קצרה, בלי התחייבות. אם זה לא מתאים, אגיד לכם.',
      en: 'No deck. No pitch. No hourly retainer. Just a real conversation.',
    },
    cta1: { he: 'בואו נדבר', en: 'Book a Free Discovery Call' },
    note: { he: 'עדיין לא בטוחים? חזרו לכל שירותי הלינקדאין.', en: "(Discovery calls are strategic conversations, not sales pitches.)" },
  },
  linkedinScore: {
    title: { he: 'רוצים לדעת איפה אתם עומדים?', en: 'Want to know where you stand?' },
    stat: { he: '75% מלקוחות B2B בודקים את פרופיל המנכ"ל והארגון בלינקדאין לפני רכישה.', en: "75% of B2B buyers check the CEO's and company's LinkedIn profile before making a purchase." },
    desc: { he: 'לפני שנתחיל לעבוד יחד, כדאי לדעת מאיפה אנחנו מתחילים. בדקו את ציון הנוכחות שלכם בלינקדאין בחינם: 3 דקות, 6 קטגוריות, תוצאות מיידיות עם תובנות ספציפיות לפרופיל שלכם.', en: 'Check your LinkedIn presence score for free.' },
    cta: { he: 'לבדיקת הציון שלי', en: 'Check My Score' },
  },
}

// ─── LiIcon ──────────────────────────────────────────────────────────────────
const LI_ICON_PATH = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"

function LiIcon({ size = 16, color = "#0A66C2" }: any) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d={LI_ICON_PATH} /></svg>
}

function LiReaction({ type, size = 24 }: any) {
  return <img src={`assets/reactions/${type}.png`} width={size} height={size} alt={type} style={{ display: "block" }} />
}

// ─── AnimatedNum ─────────────────────────────────────────────────────────────
function AnimatedNum({ value, suffix = "" }: any) {
  const [ref, isVis] = useInView(0.3)
  const [display, setDisplay] = useState("0")
  useEffect(() => {
    if (!isVis) return
    const numericPart = value.replace(/[^0-9.]/g, "")
    const target = parseFloat(numericPart) || 0
    const hasPlus = value.includes("+")
    const hasComma = value.includes(",")
    const hasTilde = value.includes("~")
    const hasPercent = value.includes("%")
    const hasK = /K/i.test(value)
    const duration = 1500
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const pct = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - pct, 3)
      const current = Math.round(target * eased)
      let formatted = hasComma ? current.toLocaleString() : String(current)
      setDisplay((hasTilde ? "~" : "") + formatted + (hasK ? "K" : "") + (hasPercent ? "%" : "") + (hasPlus ? "+" : "") + suffix)
      if (pct < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isVis])
  return <span ref={ref}>{display}</span>
}

// ─── HPNav (HE locked) ───────────────────────────────────────────────────────
function HPNav() {
  const dir = "rtl"
  const fontFamily = "var(--font-he)"
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [linkedinOpen, setLinkedinOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false)
  const closeTimerRef = useRef<any>(null)
  const liCloseTimerRef = useRef<any>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    const onResize = () => { setIsMobile(window.innerWidth < 768); if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize) }
  }, [])

  useEffect(() => {
    document.body.style.overflow = (isMobile && menuOpen) ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen, isMobile])

  const linkedinSub = [
    { label: "LinkedIn לארגונים", href: "/linkedin-for-organizations" },
    { label: "LinkedIn למנהלים", href: "/linkedin-for-executives" },
    { label: "LinkedIn לעצמאים", href: "/linkedin-for-solopreneurs" },
  ]
  const otherServices = [
    { label: "CMO במיקור חוץ", href: "/fractional-cmo" },
    { label: "כלי AI וסוכנים", href: "/ai-tools-agents" },
    { label: "סדנאות", href: "/workshops" },
  ]
  const navLinks = [
    { label: "אודות", href: "/about" },
    { label: "בלוג", href: "/blog" },
    { label: "צרו קשר", href: "#contact" },
    { label: "Goodies", href: "https://octagoodies.com" },
  ]

  const navStyle: any = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    padding: scrolled ? "10px 0" : "16px 0",
    transition: "all 0.4s",
    background: scrolled ? "rgba(236,233,231,0.88)" : "var(--cream)",
    backdropFilter: scrolled ? "blur(24px) saturate(1.3)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.3)" : "none",
    borderBottom: scrolled ? "1px solid rgba(113,46,172,0.1)" : "1px solid rgba(113,46,172,0.06)",
    boxShadow: scrolled ? "0 1px 24px rgba(32,30,75,0.07)" : "0 1px 0 rgba(0,0,0,0.04)",
  }
  const dropBase: any = {
    position: "absolute", minWidth: 240, background: "#fff", borderRadius: 12,
    boxShadow: "0 8px 40px rgba(113,46,172,0.15), 0 2px 8px rgba(0,0,0,0.06)",
    border: "1px solid rgba(113,46,172,0.08)", zIndex: 200, padding: "8px 0",
  }
  const dropItemStyle: any = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "10px 18px", fontSize: 14, color: "var(--deep-purple)",
    textDecoration: "none", gap: 8, background: "transparent", transition: "background 0.15s",
    direction: "rtl", textAlign: "right", fontFamily,
  }

  return (
    <nav style={isMobile && menuOpen
      ? { ...navStyle, bottom: 0, background: "var(--cream)", overflowY: "auto", display: "flex", flexDirection: "column", padding: 0 }
      : navStyle}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)",
        display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 16,
        direction: dir, position: "relative", zIndex: 101,
        ...(isMobile && menuOpen ? { paddingTop: 14, paddingBottom: 14, borderBottom: "1px solid rgba(113,46,172,0.1)" } : {})
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/logo%20nav%20bar.png"
            alt="OctaLoom" style={{ height: 36, width: "auto", display: "block" }}
            onError={(e: any) => { e.target.style.display = "none" }} />
        </a>

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28, direction: dir }}>
            <div style={{ position: "relative" }}
              onMouseEnter={() => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); setServicesOpen(true) }}
              onMouseLeave={() => { closeTimerRef.current = setTimeout(() => { setServicesOpen(false); setLinkedinOpen(false) }, 200) }}>
              <button style={{
                background: "none", border: "none", cursor: "pointer", fontSize: 14,
                color: servicesOpen ? "var(--deep-purple)" : "rgba(32,30,75,0.55)",
                display: "flex", alignItems: "center", gap: 5, padding: "6px 0", transition: "color 0.25s", fontFamily, direction: dir,
              }}>
                שירותים
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
                  style={{ transition: "transform 0.25s", transform: servicesOpen ? "rotate(180deg)" : "none" }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {servicesOpen && (
                <div style={{ ...dropBase, top: "calc(100% + 10px)", right: 0 }}>
                  <div style={{ position: "relative" }}
                    onMouseEnter={() => { if (liCloseTimerRef.current) clearTimeout(liCloseTimerRef.current); setLinkedinOpen(true) }}
                    onMouseLeave={() => { liCloseTimerRef.current = setTimeout(() => setLinkedinOpen(false), 150) }}>
                    <a href="/linkedin-growth-engine-he" style={{ ...dropItemStyle, flexDirection: "row-reverse" }}
                      onMouseEnter={(e: any) => e.currentTarget.style.background = "rgba(113,46,172,0.05)"}
                      onMouseLeave={(e: any) => e.currentTarget.style.background = "transparent"}>
                      <span>מנוע צמיחה LinkedIn</span>
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.45, flexShrink: 0, transform: "scaleX(-1)" }}>
                        <path d="M4 2l4 4-4 4" stroke="var(--deep-purple)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                    {linkedinOpen && (
                      <div style={{ ...dropBase, top: 0, right: "calc(100% + 6px)" }}>
                        {linkedinSub.map((sub, i) => (
                          <a key={i} href={sub.href} style={{ ...dropItemStyle, justifyContent: "flex-start" }}
                            onMouseEnter={(e: any) => e.currentTarget.style.background = "rgba(113,46,172,0.05)"}
                            onMouseLeave={(e: any) => e.currentTarget.style.background = "transparent"}>
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  {otherServices.map((svc, i) => (
                    <a key={i} href={svc.href} style={{ ...dropItemStyle, justifyContent: "flex-start" }}
                      onMouseEnter={(e: any) => e.currentTarget.style.background = "rgba(113,46,172,0.05)"}
                      onMouseLeave={(e: any) => e.currentTarget.style.background = "transparent"}>
                      {svc.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {navLinks.map((item, i) => (
              <a key={i} href={item.href}
                style={{ fontSize: 14, color: "rgba(32,30,75,0.55)", textDecoration: "none", transition: "color 0.25s", fontFamily }}
                onMouseEnter={(e: any) => e.currentTarget.style.color = "var(--deep-purple)"}
                onMouseLeave={(e: any) => e.currentTarget.style.color = "rgba(32,30,75,0.55)"}>
                {item.label}
              </a>
            ))}
          </div>
        )}

        {!isMobile && (
          <a href="https://calendar.notion.so/meet/octaloom/discovery" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 100, fontSize: 13, fontWeight: 600, background: "var(--purple)", color: "#fff", textDecoration: "none", fontFamily }}>
            קביעת שיחה
          </a>
        )}

        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="תפריט"
            style={{ background: "none", border: "none", cursor: "pointer", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", gridColumn: "3" }}>
            <span style={{ position: "relative", display: "block", width: 28, height: 20 }}>
              {[0, 9, 18].map((top, i) => (
                <span key={i} style={{
                  position: "absolute", left: 0, width: "100%", height: 2,
                  background: "var(--deep-purple)", borderRadius: 2, top,
                  transform: menuOpen && i === 0 ? "rotate(45deg) translateY(9px)" : menuOpen && i === 1 ? "scaleX(0)" : menuOpen && i === 2 ? "rotate(-45deg) translateY(-9px)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1, transition: "all 0.3s",
                }} />
              ))}
            </span>
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 32px 40px", gap: 0, direction: dir }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--purple)", margin: "0 0 4px", fontFamily }}>שירותים</p>
          <a href="/linkedin-growth-engine-he" onClick={() => setMenuOpen(false)}
            style={{ display: "block", fontSize: 20, color: "var(--deep-purple)", textDecoration: "none", padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily }}>
            מנוע צמיחה LinkedIn
          </a>
          {linkedinSub.map((sub, i) => (
            <a key={i} href={sub.href} onClick={() => setMenuOpen(false)}
              style={{ display: "block", fontSize: 15, color: "var(--purple)", textDecoration: "none", padding: "7px 0 7px 20px", borderBottom: "1px solid rgba(113,46,172,0.05)", fontFamily }}>
              {sub.label}
            </a>
          ))}
          {otherServices.map((svc, i) => (
            <a key={i} href={svc.href} onClick={() => setMenuOpen(false)}
              style={{ display: "block", fontSize: 20, color: "var(--deep-purple)", textDecoration: "none", padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily }}>
              {svc.label}
            </a>
          ))}
          {navLinks.map((item, i) => (
            <a key={i} href={item.href} onClick={() => setMenuOpen(false)}
              style={{ display: "block", fontSize: 20, color: "var(--deep-purple)", textDecoration: "none", padding: "11px 0", fontWeight: 500, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily }}>
              {item.label}
            </a>
          ))}
          <div style={{ marginTop: 14 }}>
            <a href="https://calendar.notion.so/meet/octaloom/discovery" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", textAlign: "center", padding: "14px 24px", fontSize: 15, fontWeight: 600, background: "var(--purple)", color: "#fff", borderRadius: 100, textDecoration: "none", fontFamily }}>
              קביעת שיחה חינם
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── HPFooter (HE locked) ────────────────────────────────────────────────────
function HPFooter() {
  const dir = "rtl"
  const fontFamily = "var(--font-he)"
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", fn, { passive: true })
    return () => window.removeEventListener("resize", fn)
  }, [])

  const LI_SVG = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"

  const linkStyle: any = { fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s", display: "block", lineHeight: "1.9", fontFamily }
  const headStyle: any = { fontSize: 13, fontWeight: 700, letterSpacing: "0", textTransform: "none", color: "var(--cream)", margin: "0 0 14px", fontFamily }
  const hover = (e: any, enter: boolean) => { e.currentTarget.style.color = enter ? "var(--lime)" : "rgba(255,255,255,0.5)" }

  const serviceLinks = [
    { label: "LinkedIn לארגונים", href: "/linkedin-for-organizations" },
    { label: "LinkedIn למנהלים", href: "/linkedin-for-executives" },
    { label: "LinkedIn לעצמאים", href: "/linkedin-for-solopreneurs" },
  ]
  const otherLinks = [
    { label: "CMO במיקור חוץ", href: "/fractional-cmo" },
    { label: "כלי AI וסוכנים", href: "/ai-tools-agents" },
    { label: "סדנאות", href: "/workshops" },
  ]
  const pageLinks = [
    { label: "עמוד הבית", href: "/" },
    { label: "אודות", href: "/about" },
    { label: "בלוג", href: "/blog" },
    { label: "צרו קשר", href: "#contact" },
  ]
  const legalLinks = [
    { label: "פרטיות", href: "/privacy-policy" },
    { label: "תנאים", href: "/terms" },
    { label: "נגישות", href: "/accessibility" },
  ]
  const socialIcons = [
    { href: "https://www.linkedin.com/in/hanita-yudovski/", label: "LinkedIn", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={LI_SVG} /></svg> },
    { href: "https://www.instagram.com/hanita_Y", label: "Instagram", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
    { href: "https://www.facebook.com/octaloom", label: "Facebook", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
    { href: "https://www.youtube.com/@Hanita_Octaloom", label: "YouTube", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg> },
    { href: "https://open.spotify.com/show/4XmsthqR7gnj4nf2gL0T7j", label: "Spotify", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg> },
  ]

  return (
    <footer style={{ padding: "64px 0 0", background: "var(--deep-purple)", color: "rgba(255,255,255,0.7)", direction: dir, fontFamily }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 0.65fr 1fr 0.8fr 0.8fr 0.8fr",
          gap: isMobile ? "28px 20px" : 24,
          paddingBottom: 48,
        }}>
          <div style={{ gridColumn: isMobile ? "1 / -1" : "1" }}>
            <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png"
              alt="OctaLoom" style={{ height: 100, width: "auto", display: "block" }}
              onError={(e: any) => { e.target.style.display = "none" }} />
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 14, maxWidth: 240, lineHeight: 1.65, fontFamily }}>
              מחלקת השיווק שלך,<br />רק בלי המחלקה.
            </p>
          </div>
          <div>
            <h4 style={headStyle}>עמודים</h4>
            {pageLinks.map((p, i) => (
              <a key={i} href={p.href} style={linkStyle} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>{p.label}</a>
            ))}
          </div>
          <div>
            <h4 style={headStyle}>שירותי LinkedIn</h4>
            {serviceLinks.map((s, i) => (
              <a key={i} href={s.href} style={linkStyle} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>{s.label}</a>
            ))}
          </div>
          <div>
            <h4 style={headStyle}>שירותים נוספים</h4>
            {otherLinks.map((s, i) => (
              <a key={i} href={s.href} style={linkStyle} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>{s.label}</a>
            ))}
          </div>
          <div>
            <h4 style={{ ...headStyle, fontWeight: 300, letterSpacing: "0.04em", fontSize: 12 }}>
              כלי שיווק<br />חינמיים ותבניות
            </h4>
            <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "inline-block" }}>
              <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/OCTAGOODIES%20GREEN.png"
                alt="OctaGoodies" style={{ height: 44, width: "auto", display: "block", opacity: 0.9, transition: "opacity 0.2s" }} />
            </a>
          </div>
          <div>
            <h4 style={headStyle}>התחברו</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {socialIcons.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                  onMouseEnter={(e: any) => e.currentTarget.style.color = "var(--lime)"}
                  onMouseLeave={(e: any) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
                  {s.svg}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "22px 0", borderTop: "1px solid rgba(255,255,255,0.1)",
          fontSize: 12, color: "rgba(255,255,255,0.38)", flexWrap: "wrap", gap: 12, fontFamily,
        }}>
          <span>© 2026 OctaLoom</span>
          <div style={{ display: "flex", gap: 18 }}>
            {legalLinks.map((l, i) => (
              <a key={i} href={l.href} style={{ color: "rgba(255,255,255,0.38)", textDecoration: "none", transition: "color 0.2s", fontFamily }}
                onMouseEnter={(e: any) => e.currentTarget.style.color = "var(--lime)"}
                onMouseLeave={(e: any) => e.currentTarget.style.color = "rgba(255,255,255,0.38)"}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── VerticalNav (HE locked) ─────────────────────────────────────────────────
const DARK_SECTIONS = new Set(["exec-hero", "exec-brand", "exec-fit", "exec-testi"])

function VerticalNav() {
  const [active, setActive] = useState("exec-hero")
  const onDark = DARK_SECTIONS.has(active)

  const sections = [
    { id: "exec-hero",     label: "פתיחה" },
    { id: "exec-problem",  label: "הבעיה" },
    { id: "exec-brand",    label: "מיתוג אישי" },
    { id: "exec-timeline", label: "המסע" },
    { id: "exec-fit",      label: "זה בשבילך?" },
    { id: "exec-score",    label: "ציון לינקדאין" },
    { id: "exec-included", label: "מה כלול" },
    { id: "exec-results",  label: "תוצאות" },
    { id: "exec-testi",    label: "המלצה" },
    { id: "exec-about",    label: "על חנית" },
    { id: "faq",           label: "שאלות" },
    { id: "contact",       label: "לתיאום שיחה" },
  ]

  useEffect(() => {
    const observers: any[] = []
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const dotActive = onDark ? "rgba(255,255,255,0.95)" : "var(--purple)"
  const dotInactive = onDark ? "rgba(255,255,255,0.3)" : "rgba(32,30,75,0.2)"
  const labelColor = onDark ? "rgba(255,255,255,0.9)" : "var(--purple)"
  const shadow = onDark ? "0 0 0 3px rgba(255,255,255,0.2)" : "0 0 0 3px rgba(113,46,172,0.2)"

  return (
    <div style={{
      position: "fixed", top: "50%", transform: "translateY(-50%)",
      right: 16, zIndex: 90,
      display: "flex", flexDirection: "column", gap: 8,
      alignItems: "flex-end",
      transition: "color 0.4s",
    }}>
      {sections.map(s => {
        const isActive = active === s.id
        return (
          <a key={s.id}
            onClick={(e: any) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }) }}
            href={`#${s.id}`}
            title={s.label}
            style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", textDecoration: "none", flexDirection: "row-reverse" }}>
            <div style={{
              width: isActive ? 9 : 5, height: isActive ? 9 : 5,
              borderRadius: "50%", flexShrink: 0,
              background: isActive ? dotActive : dotInactive,
              transition: "all 0.25s",
              boxShadow: isActive ? shadow : "none",
            }} />
            <span style={{
              fontSize: 11, fontWeight: 600, color: labelColor,
              fontFamily: "var(--font-he)",
              transition: "opacity 0.25s", whiteSpace: "nowrap",
              opacity: isActive ? 1 : 0, pointerEvents: "none",
            }}>
              {s.label}
            </span>
          </a>
        )
      })}
    </div>
  )
}

// ─── Section Components ──────────────────────────────────────────────────────

function ExecHero() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800)
    const t2 = setTimeout(() => setPhase(2), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  const liBlue = "#0A66C2"

  return (
    <ColorSection bg="var(--deep-purple)" className="exec-hero" id="exec-hero">
      <div className="container">
        <div className="exec-hero__grid">
          <div className="exec-hero__text">
            <Reveal className="rv--blur">
              <span className="exec-hero__label"><LiIcon size={16} color="var(--lime)" /> לינקדאין למייסדים ומנכ"לים</span>
            </Reveal>
            <Reveal delay={150}><h1 className="exec-hero__h1">{t(EX.hero.h1)}</h1></Reveal>
            <Reveal delay={300}><p className="exec-hero__sub">{t(EX.hero.sub)}</p></Reveal>
            <Reveal delay={450}>
              <a href="https://calendar.notion.so/meet/octaloom/discovery" className="btn btn--lime" target="_blank" rel="noopener noreferrer">
                {t(EX.hero.cta)}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </Reveal>
          </div>
          <div className="exec-hero__visual">
            <Reveal delay={300} className="rv--tilt">
              <div className="li-mockup">
                <div className="li-mockup__nav">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" /></svg>
                  <div style={{ flex: 1, margin: "0 12px" }}>
                    <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 4, padding: "5px 10px", fontSize: 12, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                      Search
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
                    {[
                      { label: "Home", badge: null, path: "M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7z" },
                      { label: "Network", badge: "12", path: "M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a3 3 0 00-3 3v4h8v-4a3 3 0 00-3-3zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z" },
                      { label: "Messages", badge: "7", path: "M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-4 8.5H7v-1h5zm5-3H7v-1h10z" },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, position: "relative", cursor: "pointer", opacity: 0.7 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d={item.path} /></svg>
                        {item.badge && <span style={{ position: "absolute", top: -4, right: -6, background: "#CC1016", color: "white", fontSize: 9, fontWeight: 700, borderRadius: 10, padding: "1px 5px", minWidth: 16, textAlign: "center", lineHeight: "14px" }}>{item.badge}</span>}
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap" }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="li-mockup__cover">
                  <div style={{ position: "absolute", bottom: -32, left: 16 }}>
                    <div className="li-mockup__avatar-ring">
                      <div className="li-mockup__avatar">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="li-mockup__profile">
                  <div style={{ marginTop: 20 }}>
                    <strong style={{ fontSize: 16, color: "#191919", display: "flex", alignItems: "center", gap: 6 }}>
                      השם שלכם
                      <svg width="16" height="16" viewBox="0 0 16 16" fill={liBlue}><path d="M8 0l2.1 5.3L16 6.2l-4 3.8 1 5.5L8 12.9l-5 2.6 1-5.5-4-3.8 5.9-.9z" /></svg>
                    </strong>
                    <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>מנכ"ל ומייסד YourCompany | B2B SaaS</div>
                    <div style={{ fontSize: 11, color: "#999", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                      Tel Aviv, Israel · <span style={{ color: liBlue, fontWeight: 600 }}>500+ קשרים</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <div style={{ background: liBlue, color: "white", padding: "4px 14px", borderRadius: 14, fontSize: 11, fontWeight: 600 }}>Open to</div>
                    <div style={{ border: `1px solid ${liBlue}`, color: liBlue, padding: "4px 14px", borderRadius: 14, fontSize: 11, fontWeight: 600 }}>Message</div>
                  </div>
                </div>
                <div className="li-mockup__analytics">
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#191919", marginBottom: 8 }}>Analytics</div>
                  <div style={{ display: "flex", gap: 20 }}>
                    {[
                      { val: phase >= 1 ? "2,847" : "14", label: "צפיות בפרופיל" },
                      { val: phase >= 1 ? "14,203" : "89", label: "חשיפות פוסטים" },
                      { val: phase >= 1 ? "312" : "4", label: "הופעות בחיפוש" },
                    ].map((stat, i) => (
                      <div key={i} className="li-mockup__stat">
                        <span className={`li-mockup__stat-num ${phase >= 1 ? "li-mockup__stat-num--pop" : ""}`}>{stat.val}</span>
                        <span style={{ fontSize: 10, color: "#666" }}>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`li-mockup__popups ${phase >= 2 ? "show" : ""}`}>
                  {[
                    { bg: "#DFF0D8", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#2d7a2d"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>, title: "הודעה חדשה מ-VP Sales", sub: '"ראיתי את הפוסט שלך על..."', cls: "li-mockup__popup--1" },
                    { bg: "#E7F0FE", icon: <LiReaction type="like" size={16} />, title: '+47 תגובות על הפוסט האחרון', sub: "כולל 3 מנהלי C-level", cls: "li-mockup__popup--2" },
                    { bg: "#FFF3E0", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#E67E22"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>, title: "בקשת חיבור התקבלה", sub: 'מנכ"ל של חשבון יעד', cls: "li-mockup__popup--3" },
                  ].map((popup, i) => (
                    <div key={i} className={`li-mockup__popup ${popup.cls}`}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: popup.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {popup.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#191919" }}>{popup.title}</div>
                        <div style={{ fontSize: 10, color: "#666" }}>{popup.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </ColorSection>
  )
}

function ExecEntity() {
  return (
    <ColorSection bg="var(--cream)" className="exec-entity" id="exec-entity">
      <div className="container">
        <Reveal><p className="exec-entity__text">{t(EX.entity)}</p></Reveal>
      </div>
    </ColorSection>
  )
}

function ExecProblem() {
  const alts = EX.problem.alternatives?.he || []
  return (
    <ColorSection bg="var(--cream)" className="exec-problem" id="exec-problem">
      <div className="container">
        <Reveal className="rv--blur"><h2 className="sec-title sec-title--dark">{t(EX.problem.title)}</h2></Reveal>
        {(t(EX.problem.content) as string[]).map((p: string, i: number) => (
          <Reveal key={i} delay={i * 100}><p className="exec-problem__p">{p}</p></Reveal>
        ))}
        {alts.length > 0 && (
          <div className="exec-alts">
            {alts.map((alt: any, i: number) => (
              <Reveal key={i} delay={i * 120} className="rv--left">
                <div className="exec-alt">
                  <span className="exec-alt__x">✕</span>
                  <div>
                    <strong>{alt.label}</strong>
                    <p>{alt.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
        {EX.problem.solution?.he && (
          <Reveal delay={500}>
            <div className="pull-quote"><div className="pull-quote__bar" /><p>{EX.problem.solution.he}</p></div>
          </Reveal>
        )}
      </div>
    </ColorSection>
  )
}

function ExecPersonalBrand() {
  const [inView, setInView] = useState(false)
  const ref = useRef<any>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <ColorSection bg="var(--purple)" className="exec-brand" id="exec-brand">
      <div className="container">
        <Reveal className="rv--blur"><h2 className="sec-title sec-title--light">{EX.personalBrand.title.he}</h2></Reveal>
        {EX.personalBrand.content.he.slice(0, 2).map((p: string, i: number) => (
          <Reveal key={i} delay={i * 100}><p className="exec-brand__p">{p}</p></Reveal>
        ))}
        <div className="ba-cards" ref={ref}>
          <Reveal delay={200} className="rv--left">
            <div className={`ba-card ba-card--before ${inView ? "ba-card--visible" : ""}`}>
              <div className="ba-card__label">לפני</div>
              <div className="ba-card__profile">
                <div className="ba-card__avatar ba-card__avatar--before">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(150,150,150,0.6)"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#666" }}>CEO at Company</div>
                  <div style={{ fontSize: 11, color: "#999" }}>Tel Aviv, Israel</div>
                </div>
              </div>
              <div className="ba-card__stats">
                <div className="ba-card__stat">
                  <span className="ba-card__stat-num" style={{ color: "#999" }}>47</span>
                  <span className="ba-card__stat-label">עוקבים</span>
                </div>
                <div className="ba-card__stat">
                  <span className="ba-card__stat-num" style={{ color: "#999" }}>12</span>
                  <span className="ba-card__stat-label">צפיות בפרופיל</span>
                </div>
              </div>
              <div className="ba-card__post-status">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#ccc" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" /></svg>
                <span>הפוסט האחרון: לפני 4 חודשים</span>
              </div>
              <div className="ba-card__dust"></div>
            </div>
          </Reveal>
          <div className={`ba-arrow ${inView ? "ba-arrow--visible" : ""}`}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M8 20h24M24 12l8 8-8 8" stroke="var(--lime)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <Reveal delay={400} className="rv--right">
            <div className={`ba-card ba-card--after ${inView ? "ba-card--visible" : ""}`}>
              <div className="ba-card__label ba-card__label--after">אחרי</div>
              <div className="ba-card__profile">
                <div className="ba-card__avatar ba-card__avatar--after">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#191919", display: "flex", alignItems: "center", gap: 4 }}>
                    Founder & CEO
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="#0A66C2"><path d="M8 0l2.1 5.3L16 6.2l-4 3.8 1 5.5L8 12.9l-5 2.6 1-5.5-4-3.8 5.9-.9z" /></svg>
                  </div>
                  <div style={{ fontSize: 11, color: "#666" }}>Helping B2B companies scale through...</div>
                </div>
              </div>
              <div className="ba-card__stats">
                <div className="ba-card__stat">
                  <span className="ba-card__stat-num" style={{ color: "#0A66C2", fontWeight: 700 }}>4,800+</span>
                  <span className="ba-card__stat-label">עוקבים</span>
                </div>
                <div className="ba-card__stat">
                  <span className="ba-card__stat-num" style={{ color: "#0A66C2", fontWeight: 700 }}>2,847</span>
                  <span className="ba-card__stat-label">צפיות בפרופיל</span>
                </div>
              </div>
              <div className="ba-card__post-status ba-card__post-status--active">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#2d7a2d" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" /></svg>
                <span>3 פוסטים השבוע</span>
              </div>
              <div className={`ba-card__dm ${inView ? "ba-card__dm--visible" : ""}`}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#E7F0FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#0A66C2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                </div>
                <span style={{ fontSize: 10, color: "#191919", fontWeight: 600 }}>"ראיתי את הפוסט שלך..."</span>
              </div>
            </div>
          </Reveal>
        </div>
        {EX.personalBrand.content.he.slice(2).map((p: string, i: number) => (
          <Reveal key={i + 2} delay={500 + i * 100}><p className="exec-brand__p">{p}</p></Reveal>
        ))}
        <Reveal delay={700}>
          <div className="pull-quote" style={{ borderColor: "rgba(197,230,162,0.3)" }}>
            <div className="pull-quote__bar" />
            <p style={{ color: "rgba(255,255,255,0.9)" }}>הפרסונל ברנד שלכם עובד 24/7, גם כשאתם בישיבה, גם כשאתם בחופש.</p>
          </div>
        </Reveal>
      </div>
    </ColorSection>
  )
}

function ExecTimeline() {
  const [activeMonth, setActiveMonth] = useState(-1)
  const monthRefs = useRef<any[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = parseInt((e.target as any).dataset.monthIdx)
          setActiveMonth(prev => Math.max(prev, idx))
        }
      })
    }, { threshold: 0.4 })
    monthRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <ColorSection bg="var(--cream)" className="exec-timeline" id="exec-timeline">
      <div className="container">
        <Reveal className="rv--blur"><h2 className="sec-title sec-title--dark">{t(EX.timeline.title)}</h2></Reveal>
        <Reveal delay={80}><p className="sec-sub--dark">{t(EX.timeline.sub)}</p></Reveal>
        <div className="timeline">
          {EX.timeline.months.map((month: any, mi: number) => (
            <div key={mi} className={`timeline__item ${mi <= activeMonth ? "timeline__item--active" : ""}`}
              ref={(el: any) => monthRefs.current[mi] = el} data-month-idx={mi}>
              <div className="timeline__marker">
                <div className="timeline__dot" />
                {mi < EX.timeline.months.length - 1 && <div className="timeline__line" />}
              </div>
              <Reveal className="rv--left" delay={mi * 150}>
                <div className="timeline__content">
                  <span className="timeline__label">{t(month.label)}</span>
                  <h3 className="timeline__title">{t(month.title)}</h3>
                  <ul className="timeline__list">
                    {(t(month.items) as string[]).map((item: string, ii: number) => <li key={ii}>{item}</li>)}
                  </ul>
                  <div className="timeline__time">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    {t(month.time)}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
        <Reveal delay={600}>
          <div className="pull-quote"><div className="pull-quote__bar" /><p>{t(EX.timeline.pullquote)}</p></div>
        </Reveal>
      </div>
    </ColorSection>
  )
}

function ExecFit() {
  return (
    <ColorSection bg="var(--deep-purple)" className="exec-fit" id="exec-fit">
      <div className="container">
        <Reveal className="rv--blur"><h2 className="sec-title sec-title--light">{t(EX.fit.title)}</h2></Reveal>
        <div className="fit-grid">
          <Reveal delay={100} className="rv--left">
            <div className="fit-card fit-card--yes">
              <h3>{t(EX.fit.forYou.title)}</h3>
              <ul>{(t(EX.fit.forYou.items) as string[]).map((item: string, i: number) => <li key={i}><span className="fit-check">✓</span>{item}</li>)}</ul>
            </div>
          </Reveal>
          <Reveal delay={250} className="rv--right">
            <div className="fit-card fit-card--no">
              <h3>{t(EX.fit.notForYou.title)}</h3>
              <ul>{(t(EX.fit.notForYou.items) as string[]).map((item: string, i: number) => <li key={i}><span className="fit-x">✕</span>{item}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </div>
    </ColorSection>
  )
}

function ExecLinkedInScore() {
  return (
    <ColorSection bg="var(--lime)" className="exec-score" id="exec-score">
      <div className="container">
        <Reveal className="rv--scale">
          <div className="score-card">
            <LiIcon size={28} color="var(--purple)" />
            <h2>{t(EX.linkedinScore.title)}</h2>
            <p className="score-stat" style={{ whiteSpace: "pre-line" }}>{t(EX.linkedinScore.stat)}</p>
            <p className="score-desc">{t(EX.linkedinScore.desc)}</p>
            <a href="https://octaloom.com/404" className="btn btn--purple">{t(EX.linkedinScore.cta)}</a>
          </div>
        </Reveal>
      </div>
    </ColorSection>
  )
}

function ExecIncluded() {
  return (
    <ColorSection bg="var(--cream)" className="exec-included" id="exec-included">
      <div className="container">
        <div className="included-grid">
          <div className="included-col">
            <Reveal><h2 className="sec-title sec-title--dark">{t(EX.included.title)}</h2></Reveal>
            <ul className="checklist checklist--yes">
              {(t(EX.included.items) as string[]).map((item: string, i: number) => (
                <Reveal key={i} delay={i * 60} className="rv--left">
                  <li><span className="checklist__icon checklist__icon--animated">✓</span>{item}</li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="included-col">
            <Reveal delay={200}><h2 className="sec-title sec-title--dark">{t(EX.notIncluded.title)}</h2></Reveal>
            <ul className="checklist checklist--no">
              {(t(EX.notIncluded.items) as string[]).map((item: string, i: number) => (
                <Reveal key={i} delay={200 + i * 60} className="rv--left">
                  <li><span className="checklist__icon checklist__icon--animated">✕</span>{item}</li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ColorSection>
  )
}

function ExecResults() {
  return (
    <ColorSection bg="var(--cream)" className="exec-results" id="exec-results">
      <div className="container">
        <Reveal className="rv--blur"><h2 className="sec-title sec-title--dark">{t(EX.results.title)}</h2></Reveal>
        <Reveal delay={80}><p className="sec-sub--dark">{t(EX.results.sub)}</p></Reveal>
        <div className="results__grid">
          {EX.results.items.map((item: any, i: number) => (
            <Reveal key={i} delay={i * 100} className="rv--scale">
              <div className="results__item">
                <span className="results__num"><AnimatedNum value={item.num} /></span>
                <span className="results__label">{t(item.label)}</span>
              </div>
            </Reveal>
          ))}
        </div>
        {EX.results.note && t(EX.results.note) && (
          <Reveal delay={500}><p className="results__note">{t(EX.results.note)}</p></Reveal>
        )}
      </div>
    </ColorSection>
  )
}

function ExecTestimonial() {
  const [liked, setLiked] = useState(false)
  const te = EX.testimonial
  return (
    <ColorSection bg="var(--purple)" className="exec-testi" id="exec-testi">
      <div className="container">
        <Reveal className="rv--blur"><h2 className="sec-title sec-title--light">מה אומרים הלקוחות</h2></Reveal>
        <Reveal delay={150} className="rv--tilt">
          <div className="li-testi-post" style={{ maxWidth: 600, margin: "0 auto" }}>
            <div className="li-testi-post__header">
              <img src={te.photo} alt={t(te.author)} className="li-testi-post__photo" />
              <div className="li-testi-post__info">
                <a href={te.linkedin} target="_blank" rel="noopener noreferrer"><strong>{t(te.author)}</strong></a>
                <span>{t(te.role)}</span>
              </div>
              <LiIcon size={18} color="#0A66C2" />
            </div>
            <p className="li-testi-post__body">{t(te.quote)}</p>
            <div className="li-testi-post__actions">
              <div className="li-action-wrap">
                <button className={`li-testi-action ${liked ? "liked" : ""}`} onClick={() => setLiked(!liked)}>
                  {liked ? <LiReaction type="like" size={20} /> :
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" /><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>
                  }
                  <span>{liked ? "אהבתי" : "לייק"}</span>
                </button>
              </div>
              <button className="li-testi-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                <span>תגובה</span>
              </button>
              <button className="li-testi-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 01-4 4H3" /></svg>
                <span>שיתוף</span>
              </button>
              <button className="li-testi-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                <span>שלח</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </ColorSection>
  )
}

function ExecAbout() {
  return (
    <ColorSection bg="var(--cream)" className="about" id="exec-about">
      <div className="container">
        <div className="about__layout">
          <Reveal className="rv--right">
            <div className="about__photo">
              <img src="assets/hanita.png" alt="חניתה" className="about__photo-img" />
            </div>
          </Reveal>
          <div className="about__content">
            <Reveal><h2 className="sec-title sec-title--dark">{t(EX.about.title)}</h2></Reveal>
            {(t(EX.about.text) as string[]).map((p: string, i: number) => (
              <Reveal key={i} delay={100 + i * 100}><p className="about__p">{p}</p></Reveal>
            ))}
            <Reveal delay={400}>
              <div className="about__links">
                <a href="https://www.linkedin.com/in/hanita-yudovski/" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                  <LiIcon size={16} /> {t(EX.about.cta1)}
                </a>
                <a href="#" className="btn btn--ghost">{t(EX.about.cta2)}</a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </ColorSection>
  )
}

function ExecFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const items = EX.faq.items.filter((it: any) => !it.enOnly)
  return (
    <ColorSection bg="var(--cream)" className="faq" id="faq">
      <div className="container">
        <Reveal className="rv--blur"><h2 className="sec-title sec-title--dark">{t(EX.faq.title)}</h2></Reveal>
        <div className="faq__list">
          {items.map((item: any, i: number) => (
            <Reveal key={i} delay={i * 80} className="rv--left">
              <div className={`faq__item ${openIdx === i ? "open" : ""}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <div className="faq__q"><h3>{t(item.q)}</h3><span className="faq__toggle">{openIdx === i ? "−" : "+"}</span></div>
                <div className="faq__a"><p>{t(item.a)}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </ColorSection>
  )
}

function ExecCTA() {
  return (
    <ColorSection bg="var(--lime)" className="bottom-cta" id="contact">
      <div className="container">
        <Reveal>
          <h2 className="cta__title">{t(EX.cta.title)}</h2>
          <p className="cta__sub">{t(EX.cta.sub)}</p>
          <div className="cta__actions">
            <a href="https://calendar.notion.so/meet/octaloom/discovery" className="btn btn--purple" target="_blank" rel="noopener noreferrer">
              {t(EX.cta.cta1)}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          <p className="cta__note">{t(EX.cta.note)}</p>
        </Reveal>
      </div>
    </ColorSection>
  )
}

function ExecBackLink() {
  return (
    <div style={{
      textAlign: "center", padding: "28px 20px",
      background: "var(--lime)", fontFamily: "var(--font-he)",
      fontSize: "15px", color: "var(--deep-purple)",
    }}>
      <span>עדיין לא בטוחים?{" "}
        <a href="https://www.octaloom.com/linkedin-growth-engine-he"
          style={{ color: "var(--deep-purple)", fontWeight: 700, textDecoration: "underline" }}>
          חזרו לכל שירותי הלינקדאין
        </a>
      </span>
    </div>
  )
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function LinkedInForExecutivesHE() {
  useGlobalStyles()
  const w = useWindowWidth()
  const isMobile = w < 768

  return (
    <div dir="rtl" lang="he" style={{ fontFamily: "var(--font-he)", background: "var(--cream)", minHeight: "100vh" }}>
      <HPNav />
      {!isMobile && <VerticalNav />}
      <ExecHero />
      <ExecEntity />
      <ExecProblem />
      <ExecPersonalBrand />
      <ExecTimeline />
      <ExecFit />
      <ExecLinkedInScore />
      <ExecIncluded />
      <ExecResults />
      <ExecTestimonial />
      <ExecAbout />
      <ExecFAQ />
      <ExecCTA />
      <ExecBackLink />
      <HPFooter />
    </div>
  )
}
