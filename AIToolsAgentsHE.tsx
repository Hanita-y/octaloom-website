// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

import * as React from "react"
import { motion } from "framer-motion"
const { useState, useEffect, useRef } = React

// framer-motion is imported to satisfy the Framer component environment.
void motion

// ─── Language ─────────────────────────────────────────────────────────────────
const LANG = "he"

// ─── Styles injection ─────────────────────────────────────────────────────────
function useGlobalStyles() {
  useEffect(() => {
    const id = "aitools-he-styles"
    if (document.getElementById(id)) return
    const s = document.createElement("style")
    s.id = id
    s.textContent = `
@font-face{font-family:'Discovery Fs';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/DiscoveryFs-Light.ttf') format('truetype');font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:'Discovery Fs';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/DiscoveryFs-Medium.ttf') format('truetype');font-weight:500 600 700;font-style:normal;font-display:swap}
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Regular.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Bold.ttf') format('truetype');font-weight:700;font-style:normal;font-display:swap}
.aith-page{--purple:#712eac;--deep-purple:#201e4b;--navy:#060d3d;--ink:#1c1a3c;--lime:#c5e6a2;--lime-2:#c6e1a5;--cream:#ece9e7;--cream-deep:#d8d0c4;--warm-white:#f7f5f2;--paper:#f3efe9;--surface:#ece9e8;--rule:rgba(255,255,255,0.10);--rule-dark:rgba(28,26,60,0.14);--rule-soft:rgba(28,26,60,0.06);--text-dark:#201e4b;--text-mid:#3d3a5c;--text-soft:#6b6680;--font-he:'Discovery Fs','Discovery',sans-serif;--font-en:'Aeonik',system-ui,sans-serif;--font-mono:ui-monospace,'SF Mono',Menlo,monospace}
.aith-page *,.aith-page *::before,.aith-page *::after{margin:0;padding:0;box-sizing:border-box}
.aith-page{font-family:var(--font-he);background:var(--cream);color:var(--ink);line-height:1.75;overflow-x:hidden;direction:rtl;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.aith-page a{color:inherit;text-decoration:none}
.aith-page button{font-family:inherit;border:none;background:none;cursor:pointer;color:inherit}
.aith-page img{display:block;max-width:100%}
.aith-ltr{direction:ltr;unicode-bidi:isolate}
.aith-container{max-width:1200px;margin:0 auto;padding:0 clamp(20px,5vw,56px)}
.aith-container--narrow{max-width:920px;margin:0 auto;padding:0 clamp(20px,5vw,56px)}
.aith-rv{opacity:0;transform:translateY(28px);transition:opacity 0.9s cubic-bezier(.16,1,.3,1),transform 0.9s cubic-bezier(.16,1,.3,1),filter 0.9s cubic-bezier(.16,1,.3,1)}
.aith-rv.in{opacity:1!important;transform:translateY(0)!important;filter:none!important}
.aith-rv--right{transform:translateX(-32px)}
.aith-rv--right.in{transform:translateX(0)!important}
.aith-rv--left{transform:translateX(32px)}
.aith-rv--left.in{transform:translateX(0)!important}
.aith-rv--blur{filter:blur(8px);transform:translateY(12px)}
.aith-btn{display:inline-flex;align-items:center;gap:10px;padding:16px 28px;border-radius:100px;font-size:15px;font-weight:700;letter-spacing:0.01em;transition:transform 0.2s,box-shadow 0.2s,background 0.2s,color 0.2s;cursor:pointer;border:1px solid transparent;font-family:var(--font-he)}
.aith-btn--lime{background:var(--lime);color:var(--purple)}
.aith-btn--lime:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(197,230,162,0.5)}
.aith-btn--ghost-light{background:transparent;color:var(--cream);border-color:rgba(255,255,255,0.2)}
.aith-btn--ghost-light:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.4)}
.aith-btn--ink{background:var(--ink);color:var(--cream)}
.aith-btn--ink:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(28,26,60,0.4)}
.aith-btn--purple{background:var(--purple);color:var(--cream)}
.aith-btn--purple:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(113,46,172,0.4)}
.aith-btn .aith-arrow{transition:transform 0.25s;display:inline-block}
.aith-btn:hover .aith-arrow{transform:translateX(-4px)}
.aith-hero{position:relative;padding:clamp(140px,16vw,200px) 0 clamp(80px,11vw,140px);background:linear-gradient(180deg,#0a0a23 0%,#1c1a3c 60%,#201e4b 100%);color:var(--cream);overflow:hidden}
.aith-hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(197,230,162,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(197,230,162,0.05) 1px,transparent 1px);background-size:44px 44px;pointer-events:none;mask-image:radial-gradient(85% 70% at 50% 38%,#000,transparent 82%);-webkit-mask-image:radial-gradient(85% 70% at 50% 38%,#000,transparent 82%);animation:aithGridDrift 32s linear infinite}
@keyframes aithGridDrift{to{background-position:44px 44px}}
.aith-hero::after{content:'';position:absolute;width:640px;height:640px;top:-220px;left:-200px;background:radial-gradient(circle,rgba(197,230,162,0.16),transparent 65%);pointer-events:none;filter:blur(60px)}
.aith-hero__inner{position:relative;z-index:2}
.aith-hero__label{display:inline-flex;align-items:center;gap:10px;font-size:11px;letter-spacing:0.06em;color:var(--lime);font-weight:700;padding:8px 14px;border:1px solid rgba(197,230,162,0.3);border-radius:100px;background:rgba(197,230,162,0.05)}
.aith-hero__label .aith-pulse{width:6px;height:6px;border-radius:50%;background:var(--lime);animation:aithPulse 1.4s ease infinite}
@keyframes aithPulse{0%,100%{opacity:0.4;transform:scale(0.85)}50%{opacity:1;transform:scale(1)}}
.aith-hero__grid{margin-top:28px;display:grid;grid-template-columns:1.05fr 1fr;gap:clamp(32px,5vw,64px);align-items:center}
.aith-hero__h1{font-size:clamp(32px,4.9vw,60px);font-weight:700;line-height:1.16;letter-spacing:-0.01em;color:var(--cream)}
.aith-hero__h1 .aith-accent{color:var(--lime)}
.aith-hero__sub{margin-top:22px;font-size:clamp(15px,1.4vw,17px);line-height:1.85;color:rgba(236,233,231,0.78);max-width:560px}
.aith-hero__sub+.aith-hero__sub{margin-top:14px}
.aith-hero__sub strong{color:var(--cream);font-weight:700}
.aith-hero__lead{margin-top:22px;font-size:clamp(15px,1.4vw,17px);line-height:1.7;color:var(--lime);font-weight:700}
.aith-hero__cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
.aith-boot{position:relative;background:#0d0d24;border:1px solid rgba(197,230,162,0.2);border-radius:14px;overflow:hidden;font-family:var(--font-mono);font-size:12.5px;line-height:1.6;color:#cfd0e0;box-shadow:0 24px 70px rgba(0,0,0,0.5);direction:ltr;text-align:left}
.aith-boot__bar{display:flex;align-items:center;gap:6px;padding:10px 14px;background:rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.06)}
.aith-win-dot{width:11px;height:11px;border-radius:50%;flex-shrink:0}
.aith-win-dot--r{background:#ff5f56}
.aith-win-dot--y{background:#ffbd2e}
.aith-win-dot--g{background:#27c93f}
.aith-boot__title{margin-left:auto;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.5)}
.aith-boot__body{padding:18px 20px 20px;min-height:372px}
.aith-boot__line{margin-bottom:5px;white-space:nowrap;overflow:hidden}
.aith-boot__prompt{color:var(--lime)}
.aith-boot__path{color:rgba(207,208,224,0.55);margin-right:6px}
.aith-boot__cmd{color:var(--cream)}
.aith-boot__out{color:rgba(207,208,224,0.7);margin-left:14px}
.aith-boot__check{color:var(--lime);margin-right:8px}
.aith-boot__warn{color:#ffbd2e;margin-right:8px}
.aith-boot__caret{display:inline-block;width:7px;height:1em;background:var(--lime);vertical-align:-2px;animation:aithBlink 1s steps(2) infinite}
@keyframes aithBlink{50%{opacity:0}}
.aith-boot__hidden{opacity:0}
.aith-boot__dash{margin-top:14px;padding-top:14px;border-top:1px dashed rgba(197,230,162,0.22);display:grid;grid-template-columns:1fr 1fr;gap:8px;opacity:0;transition:opacity 0.6s ease}
.aith-boot__dash.in{opacity:1}
.aith-boot__node{padding:10px 11px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:7px}
.aith-boot__node .k{font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:var(--lime);margin-bottom:4px}
.aith-boot__node .v{font-size:11px;color:var(--cream)}
@media (max-width:980px){.aith-hero__grid{grid-template-columns:1fr}}
.aith-section{padding:clamp(80px,11vw,140px) 0;position:relative}
.aith-section--cream{background:var(--cream)}
.aith-section--paper{background:var(--paper)}
.aith-section--ink{background:var(--ink);color:var(--cream)}
.aith-section--lime{background:var(--lime);color:var(--ink)}
.aith-sec-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;letter-spacing:0.06em;font-weight:700;color:var(--purple);padding:6px 12px;border:1px solid rgba(113,46,172,0.2);border-radius:100px;background:rgba(113,46,172,0.04);margin-bottom:24px}
.aith-section--ink .aith-sec-eyebrow,.aith-apps .aith-sec-eyebrow,.aith-built .aith-sec-eyebrow,.aith-explain .aith-sec-eyebrow{color:var(--lime);border-color:rgba(197,230,162,0.25);background:rgba(197,230,162,0.06)}
.aith-sec-eyebrow .num{font-family:var(--font-mono);font-weight:400;opacity:0.7;direction:ltr}
.aith-sec-h{font-size:clamp(28px,4.2vw,50px);line-height:1.18;letter-spacing:-0.012em;font-weight:700;max-width:920px}
.aith-sec-h .aith-accent{color:var(--purple)}
.aith-section--ink .aith-sec-h,.aith-apps .aith-sec-h,.aith-built .aith-sec-h,.aith-explain .aith-sec-h{color:var(--cream)}
.aith-section--ink .aith-sec-h .aith-accent,.aith-apps .aith-sec-h .aith-accent,.aith-built .aith-sec-h .aith-accent,.aith-explain .aith-sec-h .aith-accent{color:var(--lime)}
.aith-sec-lede{font-size:clamp(15px,1.3vw,18px);line-height:1.75;color:var(--text-mid);max-width:760px;margin-top:20px}
.aith-section--ink .aith-sec-lede,.aith-apps .aith-sec-lede,.aith-built .aith-sec-lede,.aith-explain .aith-sec-lede{color:rgba(236,233,231,0.72)}
.aith-sec-lede__line2{display:block;margin-top:4px;font-weight:700;color:var(--lime)}
.aith-intro{background:var(--cream);padding:clamp(64px,9vw,110px) 0}
.aith-intro__card{background:var(--warm-white);border:1px solid var(--rule-dark);border-radius:16px;padding:clamp(32px,5vw,56px);position:relative;overflow:hidden}
.aith-intro__card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--purple),var(--lime))}
.aith-intro__bar{display:flex;align-items:center;gap:6px;margin-bottom:22px}
.aith-intro__tag{margin-right:auto;font-family:var(--font-mono);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--text-soft);direction:ltr}
.aith-intro__text{font-size:clamp(17px,1.9vw,22px);line-height:1.7;color:var(--text-dark);font-weight:400}
.aith-intro__text strong{color:var(--purple);font-weight:700}
.aith-explain{background:var(--ink);color:var(--cream)}
.aith-explain__panel{margin-top:clamp(36px,5vw,56px);background:#11102b;border:1px solid var(--rule);border-radius:16px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.35)}
.aith-explain__bar{display:flex;align-items:center;gap:6px;padding:12px 16px;background:rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.06)}
.aith-explain__bar-name{margin-right:10px;font-family:var(--font-mono);font-size:11px;letter-spacing:0.06em;color:rgba(236,233,231,0.7);direction:ltr}
.aith-explain__body{padding:clamp(28px,4vw,48px);display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,3vw,32px)}
.aith-explain__col{padding:clamp(22px,3vw,30px);background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px}
.aith-explain__col--human{border-color:rgba(255,255,255,0.1)}
.aith-explain__col--ai{border-color:rgba(197,230,162,0.28);background:rgba(197,230,162,0.05)}
.aith-explain__col-tag{font-family:var(--font-mono);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:12px;color:rgba(236,233,231,0.55);direction:ltr}
.aith-explain__col--ai .aith-explain__col-tag{color:var(--lime)}
.aith-explain__col h3{font-size:clamp(18px,1.9vw,22px);font-weight:700;letter-spacing:-0.012em;color:var(--cream);margin-bottom:12px}
.aith-explain__col p{font-size:14.5px;line-height:1.8;color:rgba(236,233,231,0.78)}
.aith-explain__col--ai h3{color:var(--lime)}
.aith-explain__foot{margin:0 clamp(28px,4vw,48px) clamp(28px,4vw,48px);padding:clamp(20px,3vw,26px);background:rgba(255,255,255,0.03);border-top:1px dashed rgba(197,230,162,0.22);border-radius:0 0 12px 12px;font-size:15px;line-height:1.8;color:rgba(236,233,231,0.86)}
.aith-explain__foot strong{color:var(--lime);font-weight:700}
@media (max-width:880px){.aith-explain__body{grid-template-columns:1fr}}
.aith-apps{background:var(--ink);color:var(--cream)}
.aith-apps__grid{margin-top:clamp(40px,5vw,60px);display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,2.6vw,28px)}
.aith-apps__grid .aith-appwin--full{grid-column:1 / -1}
.aith-appwin{background:#11102b;border:1px solid var(--rule);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;transition:transform 0.5s cubic-bezier(.16,1,.3,1),box-shadow 0.5s,border-color 0.4s,opacity 0.6s;opacity:0;transform:translateY(34px) scale(0.97)}
.aith-appwin.boot-in{opacity:1;transform:translateY(0) scale(1)}
.aith-appwin:hover{transform:translateY(-5px);box-shadow:0 26px 60px rgba(0,0,0,0.4);border-color:rgba(197,230,162,0.4)}
.aith-appwin--full .aith-appwin__body{display:flex;flex-direction:column;gap:clamp(8px,1.4vw,16px)}
.aith-appwin--full .aith-appwin__head{display:flex;flex-direction:column}
.aith-appwin__bar{display:flex;align-items:center;gap:6px;padding:11px 15px;background:rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.06)}
.aith-appwin__name{margin-right:10px;font-family:var(--font-mono);font-size:11px;letter-spacing:0.06em;color:rgba(236,233,231,0.7);direction:ltr}
.aith-appwin__tier{margin-right:auto;font-family:var(--font-mono);font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:var(--lime);padding:3px 8px;background:rgba(197,230,162,0.08);border-radius:100px;direction:ltr}
.aith-appwin__body{padding:clamp(24px,3vw,34px);display:flex;flex-direction:column;flex:1}
.aith-appwin__no{font-family:var(--font-mono);font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,230,162,0.7);margin-bottom:12px;direction:ltr;text-align:right}
.aith-appwin h3{font-size:clamp(22px,2.3vw,28px);font-weight:700;letter-spacing:-0.012em;color:var(--cream);margin-bottom:6px}
.aith-appwin__tag{font-size:14.5px;line-height:1.7;color:var(--lime);font-weight:700;margin-bottom:14px}
.aith-appwin__body p{font-size:14px;line-height:1.8;color:rgba(236,233,231,0.74);margin-bottom:14px}
.aith-appwin__lead{font-family:var(--font-mono);font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:rgba(236,233,231,0.5);margin:6px 0 12px;direction:ltr;text-align:right}
.aith-appwin__list{list-style:none;display:flex;flex-direction:column;gap:7px;margin-bottom:14px}
.aith-appwin__list li{display:block;position:relative;padding-inline-start:20px;font-size:13.5px;line-height:1.7;color:rgba(236,233,231,0.82)}
.aith-appwin__list li::before{content:'\\25C2';position:absolute;inset-inline-start:0;top:0.45em;color:var(--lime);font-size:11px;line-height:1}
.aith-appwin__list li b,.aith-appwin__list li strong,.aith-appwin__list li .lead{color:var(--lime);font-weight:700}
.aith-appwin__list li .aith-ltr{display:inline;unicode-bidi:isolate;direction:ltr;white-space:normal;margin:0;padding:0;border:0;letter-spacing:normal;word-spacing:normal}
.aith-appwin__foot{padding-top:16px;border-top:1px dashed rgba(197,230,162,0.2);font-size:13px;line-height:1.75;color:rgba(236,233,231,0.6)}
.aith-appwin__callout{margin-top:14px;padding:16px 18px;background:rgba(197,230,162,0.08);border:1px solid rgba(197,230,162,0.28);border-radius:10px;font-size:13px;line-height:1.75;color:rgba(236,233,231,0.86)}
.aith-appwin__callout strong{color:var(--lime);font-weight:700}
.aith-appwin__more{margin-top:auto}
.aith-appwin__reveal{display:flex;align-items:center;gap:10px;width:100%;margin-top:16px;padding:12px 15px;background:rgba(197,230,162,0.06);border:1px solid rgba(197,230,162,0.26);border-radius:10px;font-family:var(--font-mono);text-align:right;transition:background 0.25s,border-color 0.25s}
.aith-appwin__reveal:hover{background:rgba(197,230,162,0.12);border-color:rgba(197,230,162,0.5)}
.aith-appwin__reveal-ic{width:18px;height:18px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--lime);font-size:13px;line-height:1;transition:transform 0.35s cubic-bezier(.16,1,.3,1)}
.aith-appwin__reveal[aria-expanded="true"] .aith-appwin__reveal-ic{transform:rotate(45deg)}
.aith-appwin__reveal-label{font-size:12px;letter-spacing:0.04em;color:var(--cream);font-weight:700;font-family:var(--font-he)}
.aith-appwin__reveal-hint{margin-right:auto;font-size:10px;letter-spacing:0.04em;color:rgba(197,230,162,0.7);flex-shrink:0;font-family:var(--font-he)}
.aith-appwin__reveal[aria-expanded="true"] .aith-appwin__reveal-hint--show{display:none}
.aith-appwin__reveal-hint--hide{display:none}
.aith-appwin__reveal[aria-expanded="true"] .aith-appwin__reveal-hint--hide{display:inline}
.aith-appwin__panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows 0.5s cubic-bezier(.16,1,.3,1)}
.aith-appwin__panel.open{grid-template-rows:1fr}
.aith-appwin__panel-inner{overflow:hidden;min-height:0}
.aith-appwin__panel-inner > :first-child{margin-top:16px}
.aith-appwin__panel .aith-appwin__foot{margin-top:16px}
@media (max-width:980px){.aith-apps__grid{grid-template-columns:1fr}}
.aith-how{background:var(--paper)}
.aith-how__pipe{margin-top:clamp(40px,5vw,60px);display:grid;grid-template-columns:repeat(3,1fr);gap:0;align-items:stretch;position:relative}
.aith-how__rail{position:absolute;top:38px;left:14%;right:14%;height:2px;background:var(--rule-dark)}
.aith-how__rail::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,var(--lime),var(--purple));transform:scaleX(0);transform-origin:right center;transition:transform 1.4s cubic-bezier(.16,1,.3,1)}
.aith-how.in .aith-how__rail::after{transform:scaleX(1)}
.aith-how__stage{padding:0 clamp(10px,2vw,24px);position:relative;display:flex;flex-direction:column}
.aith-how__badge{width:56px;height:56px;border-radius:14px;background:var(--warm-white);border:1px solid var(--rule-dark);display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;font-size:16px;color:var(--purple);margin:0 auto 22px;position:relative;z-index:2;box-shadow:0 8px 20px rgba(28,26,60,0.07);direction:ltr}
.aith-how__stage:nth-child(4) .aith-how__badge{color:var(--ink);background:var(--lime);border-color:transparent}
.aith-how__card{background:var(--warm-white);border:1px solid var(--rule-dark);border-radius:14px;padding:28px 26px;text-align:center;flex:1}
.aith-how__step-n{font-family:var(--font-mono);font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--purple);margin-bottom:10px;direction:ltr}
.aith-how__card h3{font-size:21px;font-weight:700;letter-spacing:-0.008em;color:var(--ink);margin-bottom:10px}
.aith-how__card p{font-size:14px;line-height:1.75;color:var(--text-mid)}
@media (max-width:880px){.aith-how__pipe{grid-template-columns:1fr;gap:20px}.aith-how__rail{display:none}.aith-how__badge{margin-bottom:16px}}
.aith-built{background:var(--purple);color:var(--cream)}
.aith-built__grid{margin-top:clamp(40px,5vw,60px);display:grid;grid-template-columns:0.95fr 1.05fr;gap:clamp(28px,4vw,52px);align-items:stretch}
.aith-built__stat{background:rgba(197,230,162,0.08);border:1px solid rgba(197,230,162,0.28);border-radius:16px;padding:clamp(32px,4vw,48px);display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden}
.aith-built__stat::after{content:'';position:absolute;width:320px;height:320px;bottom:-160px;left:-120px;background:radial-gradient(circle,rgba(197,230,162,0.22),transparent 65%);filter:blur(40px)}
.aith-built__stat .meta{font-family:var(--font-mono);font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--lime);margin-bottom:14px;display:inline-flex;align-items:center;gap:8px;direction:ltr}
.aith-built__stat .meta::before{content:'';width:6px;height:6px;background:var(--lime);border-radius:50%;animation:aithPulse 1.4s ease infinite}
.aith-built__num{font-size:clamp(80px,12vw,150px);font-weight:700;line-height:0.92;letter-spacing:-0.045em;color:transparent;-webkit-text-stroke:2px var(--lime);text-stroke:2px var(--lime);text-shadow:0 0 18px rgba(197,230,162,0.55),0 0 46px rgba(197,230,162,0.4),0 0 80px rgba(197,230,162,0.28);font-feature-settings:"tnum" 1,"lnum" 1;display:inline-flex;align-items:baseline;position:relative;z-index:2;direction:ltr}
.aith-built__num .suffix{font-size:0.42em;margin-right:0.04em;color:transparent;-webkit-text-stroke:1.5px var(--lime);text-stroke:1.5px var(--lime)}
.aith-built__num-lbl{margin-top:14px;font-size:clamp(16px,1.6vw,19px);line-height:1.6;color:rgba(236,233,231,0.9);position:relative;z-index:2;max-width:380px}
.aith-built__log{background:var(--cream-deep);border:1px solid rgba(28,26,60,0.12);border-radius:16px;padding:clamp(24px,3vw,34px)}
.aith-built__log-h{font-family:var(--font-mono);font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-dark);margin-bottom:20px;direction:ltr;text-align:right}
.aith-built__log ul{list-style:none}
.aith-built__log li{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid rgba(28,26,60,0.12);font-size:14px;line-height:1.7;color:var(--text-dark)}
.aith-built__log li:last-child{border-bottom:none}
.aith-built__log li::before{content:'\\2713';flex-shrink:0;color:var(--text-dark);font-weight:700}
.aith-built__foot{margin-top:clamp(32px,4vw,44px);padding-top:22px;border-top:1px solid rgba(236,233,231,0.2);font-size:14px;line-height:1.8;color:rgba(236,233,231,0.82)}
@media (max-width:880px){.aith-built__grid{grid-template-columns:1fr}}
.aith-quote{background:var(--cream)}
.aith-quote__card{margin-top:clamp(28px,4vw,44px);background:var(--warm-white);border:1px solid var(--rule-dark);border-radius:16px;padding:clamp(36px,5vw,64px);position:relative;overflow:hidden}
.aith-quote__card::before{content:'';position:absolute;top:0;right:0;bottom:0;width:4px;background:linear-gradient(180deg,var(--purple),var(--lime))}
.aith-quote__bar{display:flex;align-items:center;gap:6px;margin-bottom:24px}
.aith-quote__tag{margin-right:auto;font-family:var(--font-mono);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--text-soft);direction:ltr}
.aith-quote__text{font-size:clamp(20px,2.6vw,30px);line-height:1.55;font-weight:700;letter-spacing:-0.01em;color:var(--text-dark)}
.aith-quote__text::before{content:'\\201D';color:var(--purple)}
.aith-quote__text::after{content:'\\201C';color:var(--purple)}
.aith-quote__who{margin-top:26px;display:flex;align-items:center;gap:14px}
.aith-quote__avatar{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,var(--purple),var(--ink));display:flex;align-items:center;justify-content:center;color:var(--lime);font-weight:700;font-size:15px;flex-shrink:0;direction:ltr}
.aith-quote__attr .n{font-size:15px;font-weight:700;color:var(--ink)}
.aith-quote__attr .r{font-size:13px;color:var(--text-soft);margin-top:2px}
.aith-hi{background:var(--lime);color:var(--ink);position:relative;overflow:hidden}
.aith-hi::after{content:'';position:absolute;pointer-events:none;width:460px;height:460px;top:-180px;right:-160px;background:radial-gradient(circle,rgba(255,255,255,0.5),transparent 68%);filter:blur(50px);z-index:0}
.aith-hi .aith-container{position:relative;z-index:1}
.aith-hi .aith-sec-eyebrow{color:var(--ink);border-color:rgba(28,26,60,0.22);background:rgba(28,26,60,0.05)}
.aith-hi .aith-sec-h{color:var(--ink)}
.aith-hi .aith-sec-h .aith-accent{color:var(--purple)}
.aith-hi__grid{margin-top:clamp(36px,5vw,56px);display:grid;grid-template-columns:0.78fr 1.22fr;gap:clamp(36px,5vw,64px);align-items:start}
.aith-hi__portrait{position:relative}
.aith-hi__portrait .img{width:100%;aspect-ratio:4/5;border-radius:16px;overflow:hidden;background:linear-gradient(160deg,#2a2554,#060d3d);box-shadow:0 24px 56px rgba(28,26,60,0.22);border:1px solid rgba(28,26,60,0.12);position:relative}
.aith-hi__portrait .img img{width:100%;height:100%;object-fit:cover;object-position:50% 22%}
.aith-hi__portrait-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--lime);font-size:160px;opacity:0.4;font-weight:700;direction:ltr}
.aith-hi__opcard{margin-top:14px;padding:16px 18px;background:var(--ink);color:var(--cream);border-radius:12px;font-family:var(--font-mono);font-size:11px;line-height:1.85;box-shadow:0 14px 34px rgba(28,26,60,0.18);direction:ltr}
.aith-hi__opcard .row{display:flex;justify-content:space-between;gap:12px}
.aith-hi__opcard .k{color:var(--lime)}
.aith-hi__opcard .v{color:var(--cream);text-align:right}
.aith-hi__body p{font-size:16px;line-height:1.85;color:var(--text-dark);margin-bottom:16px}
.aith-hi__body p:first-child{font-size:clamp(20px,2vw,24px);line-height:1.5;color:var(--ink);font-weight:700;letter-spacing:-0.008em;margin-bottom:20px}
.aith-hi__body strong{color:var(--ink);font-weight:700;border-bottom:2px solid rgba(28,26,60,0.28)}
.aith-hi__links{margin-top:24px;display:flex;gap:16px;flex-wrap:wrap}
.aith-hi__links a{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:100px;border:1px solid rgba(28,26,60,0.28);font-size:13px;transition:background 0.2s,color 0.2s,border-color 0.2s}
.aith-hi__links a:hover{background:var(--ink);color:var(--cream);border-color:var(--ink)}
.aith-hi__links a:hover .aith-hi__links-icon{fill:var(--cream)}
.aith-hi__links-icon{width:16px;height:16px;fill:currentColor;flex-shrink:0}
.aith-hi__links .aith-arrow{display:inline-block;transition:transform 0.25s}
.aith-hi__links a:hover .aith-arrow{transform:translateX(-3px)}
@media (max-width:880px){.aith-hi__grid{grid-template-columns:1fr}.aith-hi__portrait{max-width:360px}}
.aith-faq__list{margin-top:clamp(36px,5vw,56px);display:grid;grid-template-columns:1fr;gap:12px}
.aith-faq__item{background:var(--warm-white);border:1px solid var(--rule-dark);border-radius:12px;overflow:hidden;transition:border-color 0.3s}
.aith-faq__item.open{border-color:var(--purple)}
.aith-faq__q{display:flex;align-items:center;justify-content:space-between;width:100%;padding:20px 24px;gap:16px;text-align:right;cursor:pointer}
.aith-faq__q-text{font-size:16px;font-weight:700;color:var(--ink);flex:1;letter-spacing:-0.008em;line-height:1.5}
.aith-faq__q-num{font-family:var(--font-mono);font-size:11px;color:var(--purple);margin-left:14px;opacity:0.7;direction:ltr}
.aith-faq__toggle{flex-shrink:0;width:32px;height:32px;border-radius:8px;background:rgba(113,46,172,0.06);color:var(--purple);display:flex;align-items:center;justify-content:center;font-size:16px;transition:transform 0.4s,background 0.3s,color 0.3s}
.aith-faq__item.open .aith-faq__toggle{background:var(--purple);color:var(--lime);transform:rotate(45deg)}
.aith-faq__a{max-height:0;overflow:hidden;transition:max-height 0.5s cubic-bezier(.16,1,.3,1)}
.aith-faq__a-inner{padding:0 24px 24px 24px;font-size:15px;line-height:1.85;color:var(--text-mid)}
.aith-faq__item.open .aith-faq__a{max-height:720px}
.aith-endzone{position:relative;overflow:hidden}
.aith-endzone::before{content:'';position:absolute;left:50%;bottom:0;width:min(1100px,130vw);height:760px;transform:translate(-50%,38%);background:radial-gradient(closest-side,rgba(197,230,162,0.20),rgba(197,230,162,0.07) 46%,transparent 76%);filter:blur(50px);pointer-events:none;z-index:0}
.aith-endzone::after{content:'';position:absolute;right:18%;bottom:6%;width:520px;height:520px;transform:translate(50%,30%);background:radial-gradient(circle,rgba(120,150,255,0.12),transparent 66%);filter:blur(60px);pointer-events:none;z-index:0}
.aith-final{background:linear-gradient(180deg,#221f4d 0%,#15123a 52%,#211d4b 100%);color:var(--cream);text-align:center;padding:clamp(80px,14vw,160px) 0 clamp(96px,16vw,180px);position:relative}
.aith-final::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(197,230,162,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(197,230,162,0.04) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(60% 60% at 50% 45%,#000,transparent 75%);-webkit-mask-image:radial-gradient(60% 60% at 50% 45%,#000,transparent 75%);pointer-events:none;z-index:1}
.aith-final__inner{position:relative;z-index:2}
.aith-final__prompt{font-family:var(--font-mono);font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:var(--lime);margin-bottom:24px;display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border:1px solid rgba(197,230,162,0.3);border-radius:100px;direction:ltr}
.aith-final__h{font-size:clamp(30px,5.2vw,62px);font-weight:700;line-height:1.16;letter-spacing:-0.012em;max-width:900px;margin:0 auto;color:var(--cream)}
.aith-final__h .aith-accent{color:var(--lime)}
.aith-final__sub{margin:26px auto 0;max-width:620px;font-size:16px;line-height:1.85;color:rgba(236,233,231,0.72)}
.aith-final__cta{margin-top:26px;display:flex;flex-wrap:wrap;gap:14px;justify-content:center}
.aith-final__cta .aith-btn{padding:18px 36px;font-size:16px}
.aith-final__divider{margin:40px auto 0;max-width:620px;display:flex;flex-direction:column;gap:14px}
.aith-final__split{font-size:16px;line-height:1.8;color:rgba(236,233,231,0.78)}
.aith-final__small{margin-top:32px;padding-top:26px;border-top:1px solid rgba(255,255,255,0.1);font-size:14px;color:rgba(236,233,231,0.55);max-width:620px;margin-left:auto;margin-right:auto;display:flex;flex-wrap:wrap;gap:6px 18px;justify-content:center}
.aith-final__small a{color:rgba(236,233,231,0.78);border-bottom:1px solid rgba(197,230,162,0.4);transition:color 0.2s}
.aith-final__small a:hover{color:var(--lime)}
.aith-final__small .aith-arrow{display:inline-block}
.aith-footer{background:#211d4b;color:rgba(255,255,255,0.5);padding:clamp(64px,9vw,104px) 0 32px;position:relative;z-index:2}
.aith-footer__grid{display:grid;grid-template-columns:2fr 0.7fr 1fr 0.95fr 0.85fr 0.85fr;gap:32px}
.aith-footer__brand{max-width:280px}
.aith-footer__logo{height:96px;width:auto;display:block;margin-bottom:14px}
.aith-footer__tag{font-weight:700;font-size:16px;color:var(--cream);line-height:1.5}
.aith-footer__goodies-h{font-size:12px;font-weight:300;color:var(--cream);margin-bottom:14px;line-height:1.5}
.aith-footer__goodies-logo{display:inline-block;transition:opacity 0.2s}
.aith-footer__goodies-logo:hover{opacity:0.82}
.aith-footer__goodies-logo img{height:44px;width:auto;display:block}
.aith-footer__col-h{font-size:12px;letter-spacing:0.04em;color:var(--cream);font-weight:700;margin-bottom:18px}
.aith-footer__col ul{list-style:none;padding:0}
.aith-footer__col li{margin-bottom:10px}
.aith-footer__col a{font-size:13px;color:rgba(255,255,255,0.5);transition:color 0.2s}
.aith-footer__col a:hover{color:var(--lime)}
.aith-footer__socials{display:flex;gap:12px;flex-wrap:wrap}
.aith-footer__socials a{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;transition:background 0.2s,transform 0.2s}
.aith-footer__socials a:hover{background:var(--lime);transform:translateY(-2px)}
.aith-footer__socials a:hover svg{fill:var(--ink)}
.aith-footer__socials svg{width:16px;height:16px;fill:rgba(255,255,255,0.6);transition:fill 0.2s}
.aith-footer__bottom{margin-top:clamp(48px,6vw,72px);padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);display:flex;flex-wrap:wrap;justify-content:space-between;gap:16px;font-size:12px;color:rgba(255,255,255,0.4)}
.aith-footer__legal{display:flex;gap:20px;flex-wrap:wrap}
.aith-footer__legal a:hover{color:var(--lime)}
@media (max-width:980px){.aith-footer__grid{grid-template-columns:1fr 1fr;gap:32px 24px}.aith-footer__brand{grid-column:1 / -1;max-width:none}}
@media (max-width:540px){.aith-footer__grid{grid-template-columns:1fr}.aith-footer__col:not(.aith-footer__brand):not(.aith-footer__col--socials){display:none}}
/* OVERFLOW GUARD - grid/flex children must be allowed to shrink */
.aith-hero__grid > *,.aith-apps__grid > *,.aith-built__grid > *,.aith-explain__body > *,.aith-how__pipe > *,.aith-hi__grid > *,.aith-footer__grid > *{min-width:0}
.aith-appwin,.aith-appwin__body,.aith-appwin__head,.aith-appwin__more,.aith-boot,.aith-boot__body,.aith-built__stat,.aith-built__log,.aith-intro__card,.aith-quote__card,.aith-explain__panel,.aith-explain__col{min-width:0}
.aith-boot__num,.aith-built__num,.aith-hi__opcard{max-width:100%}
.aith-appwin__list li,.aith-built__log li,.aith-intro__text,.aith-explain__col p,.aith-appwin__body p,.aith-appwin__callout,.aith-explain__foot,.aith-built__foot,.aith-final__sub,.aith-faq__a-inner,.aith-hi__body p{overflow-wrap:anywhere;word-break:break-word}
.aith-appwin__list li .aith-ltr,.aith-built__log li .aith-ltr,.aith-hero__sub .aith-ltr,.aith-intro__text .aith-ltr,.aith-explain__col p .aith-ltr,.aith-appwin__body p .aith-ltr,.aith-final__sub .aith-ltr,.aith-faq__a-inner .aith-ltr,.aith-hi__body p .aith-ltr{overflow-wrap:anywhere}
/* ORPHAN GUARD - text-wrap: pretty on body / paragraph / bullet copy */
.aith-hero__sub,.aith-hero__lead,.aith-intro__text,.aith-sec-lede,.aith-sec-eyebrow,.aith-explain__col p,.aith-explain__foot,.aith-appwin__tag,.aith-appwin__body p,.aith-appwin__list li,.aith-appwin__callout,.aith-appwin__foot,.aith-how__card p,.aith-built__num-lbl,.aith-built__log li,.aith-built__foot,.aith-quote__text,.aith-hi__body p,.aith-faq__q-text,.aith-faq__a-inner,.aith-final__sub,.aith-final__split,.aith-final__small{text-wrap:pretty}
/* TABLET (768-1199) */
@media (max-width:1199px) and (min-width:768px){.aith-container,.aith-container--narrow{padding:0 clamp(28px,4.5vw,48px)}.aith-hero__grid{grid-template-columns:1fr;gap:40px}.aith-apps__grid{grid-template-columns:1fr;gap:22px}.aith-apps__grid .aith-appwin--full{grid-column:auto}.aith-built__grid{grid-template-columns:1fr}.aith-how__pipe{grid-template-columns:1fr 1fr 1fr}.aith-explain__body{grid-template-columns:1fr 1fr}.aith-hi__grid{grid-template-columns:1fr;gap:40px}.aith-hi__portrait{max-width:420px}.aith-intro__text{font-size:20px}.aith-boot{font-size:12px}.aith-footer__grid{grid-template-columns:1fr 1fr;gap:36px 28px}.aith-footer__brand{grid-column:1 / -1;max-width:none}}
/* MOBILE + small tablet (<= 980px) shared baseline */
@media (max-width:980px){.aith-boot{font-size:11px}.aith-boot__body{padding:14px 14px 16px;min-height:0;overflow-x:auto;-webkit-overflow-scrolling:touch}.aith-boot__dash{grid-template-columns:1fr 1fr}}
/* MOBILE (<= 767px) */
@media (max-width:767px){.aith-container,.aith-container--narrow{padding:0 18px}.aith-section{padding:64px 0}.aith-hero{padding:116px 0 64px}.aith-intro{padding:56px 0}.aith-hero__grid{grid-template-columns:1fr;gap:28px;margin-top:22px}.aith-hero__h1{font-size:clamp(29px,8.6vw,38px);line-height:1.18}.aith-hero__lead{font-size:15px;margin-top:18px}.aith-hero__sub{font-size:14.5px;margin-top:16px;max-width:100%}.aith-hero__cta-row{margin-top:26px;gap:10px}.aith-hero::after{width:360px;height:360px;top:-160px;left:-160px}.aith-boot{font-size:10.5px;border-radius:12px}.aith-boot__body{padding:13px 13px 15px}.aith-boot__bar{padding:9px 12px}.aith-boot__dash{grid-template-columns:1fr;gap:7px;margin-top:12px;padding-top:12px}.aith-sec-h{font-size:clamp(25px,6.6vw,32px)}.aith-sec-lede{font-size:15px;margin-top:16px}.aith-sec-eyebrow{margin-bottom:18px}.aith-intro__card{padding:26px 22px;border-radius:14px}.aith-intro__text{font-size:17px;line-height:1.7}.aith-explain__body{grid-template-columns:1fr;gap:16px;padding:20px 18px}.aith-explain__col{padding:20px 18px}.aith-explain__foot{margin:0 18px 22px;padding:18px;font-size:14px}.aith-apps__grid{grid-template-columns:1fr;gap:18px;margin-top:32px}.aith-apps__grid .aith-appwin--full{grid-column:auto}.aith-appwin{border-radius:12px}.aith-appwin__body{padding:22px 18px}.aith-appwin__bar{padding:10px 13px}.aith-appwin h3{font-size:clamp(20px,5.4vw,24px)}.aith-appwin__tag{font-size:14px}.aith-appwin__body p{font-size:13.5px}.aith-appwin__list li{font-size:13px;padding-inline-start:18px}.aith-appwin__name{font-size:10px}.aith-appwin__reveal{padding:11px 13px;flex-wrap:wrap;gap:8px}.aith-appwin__reveal-hint{margin-right:auto}.aith-how__pipe{grid-template-columns:1fr;gap:18px;margin-top:32px}.aith-how__rail{display:none}.aith-how__stage{padding:0}.aith-how__badge{margin-bottom:14px}.aith-how__card{padding:24px 20px}.aith-how__card h3{font-size:19px}.aith-built__grid{grid-template-columns:1fr;gap:22px;margin-top:32px}.aith-built__stat{padding:28px 22px}.aith-built__num{font-size:clamp(72px,22vw,104px)}.aith-built__stat::after{width:220px;height:220px;bottom:-120px;left:-90px}.aith-built__log{padding:22px 20px}.aith-built__log li{font-size:13.5px}.aith-quote__card{padding:30px 22px}.aith-quote__text{font-size:clamp(19px,5.2vw,24px);line-height:1.5}.aith-quote__who{flex-wrap:wrap;gap:12px;margin-top:22px}.aith-hi__grid{grid-template-columns:1fr;gap:30px;margin-top:30px}.aith-hi__portrait{max-width:100%}.aith-hi::after{width:300px;height:300px;top:-130px;right:-120px}.aith-hi__body p{font-size:15px}.aith-hi__body p:first-child{font-size:clamp(18px,5vw,22px)}.aith-hi__opcard{font-size:10.5px}.aith-hi__opcard .row{gap:10px}.aith-hi__links{gap:10px}.aith-hi__links a{padding:9px 14px;font-size:12.5px}.aith-faq__list{margin-top:30px}.aith-faq__q{padding:16px 18px;gap:12px}.aith-faq__q-text{font-size:15px}.aith-faq__q-num{margin-left:10px}.aith-faq__a-inner{padding:0 18px 20px;font-size:14.5px}.aith-final{padding:72px 0 88px}.aith-final__h{font-size:clamp(27px,7.6vw,40px)}.aith-final__sub{font-size:15px;margin-top:22px}.aith-final__prompt{font-size:11px}.aith-endzone::before{width:min(700px,150vw);height:520px}.aith-endzone::after{display:none}.aith-footer{padding:64px 0 28px}.aith-footer__grid{grid-template-columns:1fr 1fr;gap:30px 22px}.aith-footer__brand{grid-column:1 / -1;max-width:none}.aith-footer__logo{height:72px}.aith-footer__bottom{gap:12px}.aith-btn{padding:14px 22px;font-size:14px}.aith-hero__cta-row{flex-direction:column;align-items:stretch}.aith-hero__cta-row .aith-btn{width:100%;justify-content:center}.aith-final__cta{flex-direction:column;align-items:stretch}.aith-final__cta .aith-btn{width:100%;justify-content:center}}
/* NARROW (<= 540px) - footer columns collapse, tighter still */
@media (max-width:540px){.aith-footer__grid{grid-template-columns:1fr}.aith-footer__col:not(.aith-footer__brand):not(.aith-footer__col--socials){display:none}}
/* VERY NARROW (<= 360px) */
@media (max-width:360px){.aith-container,.aith-container--narrow{padding:0 14px}.aith-hero__h1{font-size:clamp(26px,8.2vw,30px)}.aith-built__num{font-size:clamp(64px,21vw,84px)}.aith-sec-h{font-size:clamp(23px,6.4vw,28px)}}
/* MOBILE DECLUTTER (<= 767px ONLY) */
@media (max-width:767px){.aith-hero__boot-wrap{display:none}.aith-hero__grid{display:block}.aith-hero{padding:124px 0 72px}.aith-hero__inner{text-align:right}.aith-hero__cta-row{margin-top:28px}.aith-hero::after{width:420px;height:420px;top:-150px;left:auto;right:-150px}.aith-win-dot{display:none}.aith-intro__bar,.aith-explain__bar,.aith-appwin__bar,.aith-quote__bar{display:none}.aith-appwin__no,.aith-appwin__lead,.aith-explain__col-tag,.aith-built__log-h,.aith-built__stat .meta{display:none}.aith-intro__card,.aith-explain__panel,.aith-appwin,.aith-how__card,.aith-built__stat,.aith-built__log,.aith-quote__card,.aith-faq__item{box-shadow:none}.aith-intro__card{padding:24px 20px}.aith-intro__card::before{height:2px}.aith-explain__panel{box-shadow:none}.aith-explain__body{padding:18px 16px;gap:14px}.aith-explain__col{padding:18px 16px}.aith-explain__col h3{font-size:19px;margin-bottom:8px}.aith-explain__col p{font-size:14px;line-height:1.75}.aith-explain__foot{margin:0 16px 18px;padding:16px;border-top:1px solid var(--rule);font-size:13.5px}.aith-apps__grid{gap:16px}.aith-appwin{border-radius:12px}.aith-appwin__body{padding:20px 16px}.aith-appwin h3{font-size:clamp(19px,5vw,22px);margin-bottom:6px}.aith-appwin__tag{font-size:13.5px;margin-bottom:12px}.aith-appwin__body p{font-size:13px;line-height:1.75;margin-bottom:12px}.aith-appwin__list{gap:6px;margin-bottom:12px}.aith-appwin__list li{font-size:12.5px;line-height:1.65;padding-inline-start:16px}.aith-appwin__callout{padding:13px 14px;font-size:12.5px;margin-top:12px}.aith-appwin__foot{border-top:1px solid var(--rule);font-size:12.5px;padding-top:14px}.aith-appwin__reveal{padding:10px 12px}.aith-appwin__reveal-label{font-size:12px}.aith-how__card{padding:22px 18px}.aith-how__badge{box-shadow:none}.aith-built__stat{padding:26px 20px}.aith-built__num{text-shadow:0 0 14px rgba(197,230,162,0.4),0 0 32px rgba(197,230,162,0.22)}.aith-built__num-lbl{font-size:15px}.aith-built__log{padding:20px 18px;border-radius:12px}.aith-built__log li{font-size:13px;padding:12px 0}.aith-built__foot{font-size:13px}.aith-quote__card{padding:28px 20px}.aith-quote__card::before{width:3px}.aith-quote__text{font-size:clamp(18px,5vw,23px)}.aith-hi__opcard{display:none}.aith-hi__portrait{margin-bottom:4px}.aith-intro__text{font-size:16px;line-height:1.7}}
.aith-page :focus-visible{outline:2px solid var(--purple);outline-offset:4px;border-radius:4px}
@media (prefers-reduced-motion:reduce){.aith-page *,.aith-page *::before,.aith-page *::after{animation:none!important;transition:none!important}.aith-rv{opacity:1!important;transform:none!important;filter:none!important}.aith-appwin{opacity:1!important;transform:none!important}.aith-how__rail::after{transform:scaleX(1)!important}.aith-boot__hidden{opacity:1!important}.aith-boot__dash{opacity:1!important}.aith-boot__caret{display:none!important}.aith-appwin__panel{transition:none!important}.aith-appwin__reveal-ic{transition:none!important}}
`
    document.head.appendChild(s)
  }, [])
}

// ─── Reduced motion ───────────────────────────────────────────────────────────
function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

// ─── Reveal observer ──────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    )
    document.querySelectorAll(".aith-rv, .aith-how").forEach((el) => io.observe(el))
    const tm = setTimeout(() => {
      document.querySelectorAll(".aith-rv:not(.in)").forEach((el) => {
        const r = (el as HTMLElement).getBoundingClientRect()
        if (r.top < window.innerHeight) el.classList.add("in")
      })
    }, 200)
    return () => {
      io.disconnect()
      clearTimeout(tm)
    }
  }, [])
}

// ─── Window width ─────────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1440)
  useEffect(() => {
    const fn = () => setW(window.innerWidth)
    window.addEventListener("resize", fn, { passive: true })
    return () => window.removeEventListener("resize", fn)
  }, [])
  return w
}

// ─── Nav / Footer shared constants ────────────────────────────────────────────
const _P = "#712eac", _D = "#201e4b", _L = "#c6e1a5", _C = "#ece9e7", _B = "#e5e7eb"
const _F = "'Discovery Fs', 'Discovery', sans-serif"

// ─── Navbar (RTL) ─────────────────────────────────────────────────────────────
function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [linkedinOpen, setLinkedinOpen] = useState(false)
  const w = useWindowWidth(), isMobile = w < 980

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobile && menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen, isMobile])

  const liSub = [
    { label: "\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05d0\u05e8\u05d2\u05d5\u05e0\u05d9\u05dd", href: "https://www.octaloom.com/linkedin-for-organizations-he" },
    { label: "\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05de\u05e0\u05d4\u05dc\u05d9\u05dd", href: "https://www.octaloom.com/linkedin-for-executives-he" },
    { label: "\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05e2\u05e6\u05de\u05d0\u05d9\u05d9\u05dd", href: "https://www.octaloom.com/linkedin-for-solopreneurs-he" },
  ]
  const otherSub = [
    { label: "\u05e1\u05de\u05e0\u05db\"\u05dc\u05d9\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 \u05d1\u05de\u05d9\u05e7\u05d5\u05e8 \u05d7\u05d5\u05e5", href: "https://www.octaloom.com/fractional-cmo-he" },
    { label: "\u05db\u05dc\u05d9 AI \u05d5\u05e1\u05d5\u05db\u05e0\u05d9\u05dd", href: "https://www.octaloom.com/ai-tools-agents-he" },
    { label: "\u05e1\u05d3\u05e0\u05d0\u05d5\u05ea", href: "https://www.octaloom.com/workshops-he" },
  ]
  const navLinks = [
    { label: "\u05d0\u05d5\u05d3\u05d5\u05ea", href: "https://www.octaloom.com/about-he" },
    { label: "\u05d1\u05dc\u05d5\u05d2", href: "https://www.octaloom.com/blog" },
    { label: "\u05e6\u05e8\u05d5 \u05e7\u05e9\u05e8", href: "#contact" },
    { label: "Goodies", href: "https://octagoodies.com" },
  ]

  const dItem: React.CSSProperties = { display: "block", padding: "9px 12px", fontSize: 13, color: _D, borderRadius: 8, transition: "background 0.15s", textDecoration: "none", textAlign: "right" }
  const dBox: React.CSSProperties = { position: "absolute", background: "#ece9e8", borderRadius: 12, padding: "8px 6px", boxShadow: "0 12px 36px rgba(0,0,0,0.12)", border: `1px solid ${_B}`, zIndex: 50 }
  const hi = (e: any, on: boolean) => {
    e.currentTarget.style.background = on ? "var(--cream)" : "transparent"
    e.currentTarget.style.color = on ? _P : _D
  }

  return (
    <nav style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 1000, width: "calc(100% - 48px)", maxWidth: 1152, borderRadius: 100, background: scrolled ? "rgba(236,233,231,0.92)" : "rgba(236,233,231,0.65)", backdropFilter: "blur(50px)", WebkitBackdropFilter: "blur(50px)", border: "1px solid rgba(255,255,255,0.5)", padding: "10px 22px 10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, fontFamily: _F, transition: "background 0.3s, box-shadow 0.3s", boxShadow: scrolled ? "0 8px 28px rgba(32,30,75,0.1)" : "none" }}>
      <a href="https://www.octaloom.com/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/logo%20nav%20bar.png" alt="OctaLoom" style={{ height: 30, width: "auto", display: "block" }} onError={(e: any) => { e.target.style.display = "none" }} />
      </a>

      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ position: "relative" }} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => { setServicesOpen(false); setLinkedinOpen(false) }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: servicesOpen ? _P : _D, display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 8, transition: "color 0.2s", fontFamily: _F }}>
              {"\u05e9\u05d9\u05e8\u05d5\u05ea\u05d9\u05dd"}
              <svg width={11} height={11} viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.25s", transform: servicesOpen ? "rotate(180deg)" : "none" }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {servicesOpen && <div style={{ position: "absolute", top: "100%", left: 0, right: 0, height: 12, zIndex: 199 }} />}
            {servicesOpen && (
              <div style={{ ...dBox, minWidth: 250, top: "calc(100% + 10px)", right: "50%", transform: "translateX(50%)" }}>
                <a href="https://www.octaloom.com/linkedin-growth-engine-he" style={{ ...dItem, fontWeight: 700, borderBottom: "1px solid rgba(28,26,60,0.06)", marginBottom: 4, paddingBottom: 11 }} onMouseEnter={(e) => hi(e, true)} onMouseLeave={(e) => hi(e, false)}>
                  {"\u05de\u05e0\u05d5\u05e2 \u05e6\u05de\u05d9\u05d7\u05d4 \u05d1\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df"}
                </a>
                <div style={{ paddingRight: 12, marginTop: 2, borderRight: "2px solid rgba(28,26,60,0.06)", marginRight: 12 }}>
                  {liSub.map((s, i) => (
                    <a key={i} href={s.href} style={dItem} onMouseEnter={(e) => hi(e, true)} onMouseLeave={(e) => hi(e, false)}>{s.label}</a>
                  ))}
                </div>
                <a href="https://www.octaloom.com/fractional-cmo-he" style={dItem} onMouseEnter={(e) => hi(e, true)} onMouseLeave={(e) => hi(e, false)}>{"\u05e1\u05de\u05e0\u05db\"\u05dc\u05d9\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 \u05d1\u05de\u05d9\u05e7\u05d5\u05e8 \u05d7\u05d5\u05e5"}</a>
                <a href="https://www.octaloom.com/ai-tools-agents-he" style={dItem} onMouseEnter={(e) => hi(e, true)} onMouseLeave={(e) => hi(e, false)}>{"\u05db\u05dc\u05d9 AI \u05d5\u05e1\u05d5\u05db\u05e0\u05d9\u05dd"}</a>
                <a href="https://www.octaloom.com/workshops-he" style={dItem} onMouseEnter={(e) => hi(e, true)} onMouseLeave={(e) => hi(e, false)}>{"\u05e1\u05d3\u05e0\u05d0\u05d5\u05ea"}</a>
              </div>
            )}
          </div>
          {navLinks.map((item, i) => (
            <a key={i} href={item.href} style={{ fontSize: 14, color: _D, padding: "8px 12px", borderRadius: 8, textDecoration: "none", transition: "color 0.2s", fontFamily: _F }}
              onMouseEnter={(e) => (e.currentTarget.style.color = _P)} onMouseLeave={(e) => (e.currentTarget.style.color = _D)}>
              {item.label}
            </a>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {!isMobile && (
          <>
            <a href="https://www.octaloom.com/ai-tools-agents"
              style={{ fontSize: 13, color: "#3d3a5c", padding: "8px 12px", borderRadius: 8, fontFamily: "'Aeonik', sans-serif", letterSpacing: "0.03em", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = _P }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#3d3a5c" }}>
              EN
            </a>
            <a href="https://calendar.notion.so/meet/octaloom/discovery"
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-discovery")) }}
              style={{ background: _P, color: _C, padding: "10px 20px", borderRadius: 100, fontSize: 13, fontWeight: 700, fontFamily: _F, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(113,46,172,0.3)" }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none" }}>
              {"\u05d1\u05d5\u05d0\u05d5 \u05e0\u05d3\u05d1\u05e8"}
            </a>
          </>
        )}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "\u05e1\u05d2\u05d9\u05e8\u05ea \u05ea\u05e4\u05e8\u05d9\u05d8" : "\u05e4\u05ea\u05d9\u05d7\u05ea \u05ea\u05e4\u05e8\u05d9\u05d8"}
            style={{ background: "none", border: "none", cursor: "pointer", width: 40, height: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ display: "block", width: 18, height: 1.5, background: _D, margin: "3px 0", borderRadius: 2, transition: "transform 0.25s, opacity 0.25s", transform: menuOpen && i === 0 ? "translateY(4.5px) rotate(45deg)" : menuOpen && i === 2 ? "translateY(-4.5px) rotate(-45deg)" : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />
            ))}
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 8, left: 8, background: "#ece9e8", borderRadius: 18, padding: 18, boxShadow: "0 16px 48px rgba(0,0,0,0.18)", zIndex: 50, maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
          <div style={{ padding: "12px 4px", borderBottom: "1px solid rgba(28,26,60,0.06)" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.06em", color: "#6b6680", marginBottom: 8, fontWeight: 700 }}>{"\u05de\u05e0\u05d5\u05e2 \u05e6\u05de\u05d9\u05d7\u05d4 \u05d1\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df"}</div>
            {liSub.map((s, i) => (
              <a key={i} href={s.href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "6px 0", fontSize: 14, color: "#3d3a5c", textAlign: "right", textDecoration: "none", fontFamily: _F }}>{s.label}</a>
            ))}
          </div>
          <div style={{ padding: "12px 4px", borderBottom: "1px solid rgba(28,26,60,0.06)" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.06em", color: "#6b6680", marginBottom: 8, fontWeight: 700 }}>{"\u05e9\u05d9\u05e8\u05d5\u05ea\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd"}</div>
            {otherSub.map((s, i) => (
              <a key={i} href={s.href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "6px 0", fontSize: 14, color: "#3d3a5c", textAlign: "right", textDecoration: "none", fontFamily: _F }}>{s.label}</a>
            ))}
          </div>
          {navLinks.map((item, i) => (
            <a key={i} href={item.href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 4px", fontSize: 15, color: _D, textAlign: "right", textDecoration: "none", borderBottom: "1px solid rgba(28,26,60,0.06)", fontFamily: _F }}>{item.label}</a>
          ))}
          <a href="https://www.octaloom.com/ai-tools-agents" onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 4px", fontSize: 15, color: _D, textAlign: "right", textDecoration: "none", borderBottom: "1px solid rgba(28,26,60,0.06)", fontFamily: _F }}>
            {"English "}<span className="aith-arrow">{"←"}</span>
          </a>
          <a href="https://calendar.notion.so/meet/octaloom/discovery" onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.dispatchEvent(new CustomEvent("open-discovery")) }}
            style={{ display: "block", marginTop: 14, background: _P, color: _C, padding: 14, borderRadius: 100, fontSize: 14, fontWeight: 700, textAlign: "center", textDecoration: "none", fontFamily: _F }}>
            {"\u05d1\u05d5\u05d0\u05d5 \u05e0\u05d3\u05d1\u05e8, \u05d7\u05d9\u05e0\u05dd"}
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── L: inline Latin / English term inside RTL Hebrew flow ────────────────────
const L: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="aith-ltr">{children}</span>
)

// ─── Hero (boot terminal typewriter) ──────────────────────────────────────────
function AIToolsHero() {
  const cmdText = " $ octaloom-ai-os --boot"
  const totalLines = 6
  const [cmd, setCmd] = useState("")
  const [visibleLines, setVisibleLines] = useState(0)
  const [dashIn, setDashIn] = useState(false)
  const [caretHidden, setCaretHidden] = useState(false)

  useEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce) {
      setCmd(cmdText)
      setVisibleLines(totalLines)
      setDashIn(true)
      setCaretHidden(true)
      return
    }
    const timers: number[] = []
    let i = 0
    const typeCmd = () => {
      if (i <= cmdText.length) {
        setCmd(cmdText.slice(0, i))
        i++
        timers.push(window.setTimeout(typeCmd, 42))
      } else {
        setCaretHidden(true)
        for (let idx = 0; idx < totalLines; idx++) {
          timers.push(
            window.setTimeout(() => setVisibleLines((v) => Math.max(v, idx + 1)), 200 + idx * 300)
          )
        }
        timers.push(window.setTimeout(() => setDashIn(true), 200 + totalLines * 300 + 200))
      }
    }
    const start = window.setTimeout(typeCmd, 600)
    timers.push(start)
    return () => timers.forEach((t) => clearTimeout(t))
  }, [])

  const bootLines = [
    { type: "check", text: "runtime.init :: vibe coding layer online" },
    { type: "check", text: "agents.module :: autonomous workflows loaded" },
    { type: "check", text: "gpts.module :: chatbots and gems configured" },
    { type: "check", text: "assets.module :: landing pages, tools ready" },
    { type: "check", text: "automation.module :: Claude-first pipelines active" },
    { type: "warn", text: "operator :: marketing brain connected. ready." },
  ]

  return (
    <header className="aith-hero">
      <div className="aith-container aith-hero__inner">
        <div className="aith-rv">
          <span className="aith-hero__label"><span className="aith-pulse" />{"\u05db\u05dc\u05d9 "}<L>AI</L>{" \u05d5\u05e1\u05d5\u05db\u05e0\u05d9\u05dd · \u05e0\u05d1\u05e0\u05d9\u05dd \u05d1\u05e7\u05e6\u05d1 \u05e9\u05dc "}<L>AI</L></span>
        </div>
        <div className="aith-hero__grid">
          <div>
            <h1 className="aith-hero__h1 aith-rv" style={{ transitionDelay: ".1s" }}>
              {"\u05d0\u05e0\u05d9 \u05d1\u05d5\u05e0\u05d4"}<br />
              <span className="aith-accent">{"\u05e6\u05d5\u05d5\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 "}<L>AI</L></span><br />
              {"\u05e9\u05d4\u05e2\u05e1\u05e7 \u05e9\u05dc\u05db\u05dd"}<br />
              {"\u05d7\u05d5\u05dc\u05dd \u05e2\u05dc\u05d9\u05d5"}
            </h1>
            <p className="aith-hero__lead aith-rv" style={{ transitionDelay: ".18s" }}>
              {"\u05e1\u05d5\u05db\u05e0\u05d9 "}<L>AI</L>{", \u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8\u05d9\u05dd, \u05d5\u05d5\u05d9\u05d1 \u05e7\u05d5\u05d3\u05d9\u05e0\u05d2 \u05d5\u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d5\u05ea\u00a0\u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05d5\u05ea\u00a0\u05dc\u05e2\u05e1\u05e7\u05d9\u05dd"}
            </p>
            <p className="aith-hero__sub aith-rv" style={{ transitionDelay: ".26s" }}>
              {"\u05e9\u05de\u05e2\u05ea\u05dd \u05e2\u05dc \u05e1\u05d5\u05db\u05e0\u05d9 "}<L>AI</L>{", \u05e8\u05d0\u05d9\u05ea\u05dd \u05d3\u05de\u05d5\u05d0\u05d9\u05dd, \u05d0\u05d5\u05dc\u05d9 \u05e0\u05d9\u05e1\u05d9\u05ea\u05dd \u05e7\u05e6\u05ea \u05d0\u05ea \u05e7\u05dc\u05d5\u05d3 \u05d0\u05d5 \u05e6'\u05d0\u05d8 "}<L>GPT</L>{" \u05dc\u05e2\u05e1\u05e7. \u05d0\u05d1\u05dc \u05d0\u05d9\u05df \u05dc\u05db\u05dd \u05de\u05ea\u05db\u05e0\u05ea \u05e9\u05d9\u05d1\u05e0\u05d4 \u05de\u05e9\u05d4\u05d5 \u05de\u05d5\u05ea\u05d0\u05dd, \u05d5\u05d4\u05db\u05dc\u05d9\u05dd \u05d4\u05d2\u05e0\u05e8\u05d9\u05d9\u05dd \u05dc\u05d0\u00a0\u05de\u05ea\u05d0\u05d9\u05de\u05d9\u05dd\u00a0\u05dc\u05ea\u05d4\u05dc\u05d9\u05da\u00a0\u05e9\u05dc\u05db\u05dd."}
            </p>
            <p className="aith-hero__sub aith-rv" style={{ transitionDelay: ".34s" }}>
              {"\u05d0\u05d6 \u05d0\u05e0\u05d9 \u05d1\u05d5\u05e0\u05d4 \u05dc\u05db\u05dd "}<strong>{"\u05e6\u05d5\u05d5\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 AI \u05e9\u05de\u05ea\u05d0\u05d9\u05dd \u05d1\u05d3\u05d9\u05d5\u05e7 \u05dc\u05e2\u05e1\u05e7 \u05e9\u05dc\u05db\u05dd."}</strong>{" \u05e1\u05d5\u05db\u05e0\u05d9\u05dd, \u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8\u05d9\u05dd, \u05d3\u05e4\u05d9 \u05e0\u05d7\u05d9\u05ea\u05d4, \u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d5\u05ea, \u05de\u05d4\u00a0\u05e9\u05e6\u05e8\u05d9\u05da,\u00a0\u05d0\u05e0\u05d9\u00a0\u05d1\u05d5\u05e0\u05d4."}
            </p>
            <div className="aith-hero__cta-row aith-rv" style={{ transitionDelay: ".42s" }}>
              <a className="aith-btn aith-btn--lime" href="https://calendar.notion.so/meet/octaloom/discovery" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-discovery")) }} style={{ color: "var(--purple)" }}>
                {"\u05dc\u05e9\u05d9\u05d7\u05ea \u05d4\u05d9\u05db\u05e8\u05d5\u05ea"}
                <span className="aith-arrow">{"←"}</span>
              </a>
              <a className="aith-btn aith-btn--ghost-light" href="#apps">{"\u05dc\u05d0\u05e8\u05d1\u05e2\u05ea \u05e1\u05d5\u05d2\u05d9 \u05d4\u05e4\u05ea\u05e8\u05d5\u05e0\u05d5\u05ea"}</a>
            </div>
          </div>
          <div className="aith-rv aith-rv--left aith-hero__boot-wrap" style={{ transitionDelay: ".3s" }}>
            <div className="aith-boot">
              <div className="aith-boot__bar">
                <span className="aith-win-dot aith-win-dot--r" />
                <span className="aith-win-dot aith-win-dot--y" />
                <span className="aith-win-dot aith-win-dot--g" />
                <span className="aith-boot__title">octaloom · ai-os</span>
              </div>
              <div className="aith-boot__body">
                <div className="aith-boot__line">
                  <span className="aith-boot__prompt">~</span>
                  <span className="aith-boot__path"> octaloom</span>
                  <span className="aith-boot__cmd">{cmd}</span>
                  {!caretHidden && <span className="aith-boot__caret" />}
                </div>
                {bootLines.map((ln, idx) => (
                  <div key={idx} className={"aith-boot__line" + (idx < visibleLines ? "" : " aith-boot__hidden")}>
                    <span className={ln.type === "warn" ? "aith-boot__warn" : "aith-boot__check"}>{ln.type === "warn" ? "▸" : "✓"}</span>
                    <span className="aith-boot__out">{ln.text}</span>
                  </div>
                ))}
                <div className={"aith-boot__dash" + (dashIn ? " in" : "")}>
                  <div className="aith-boot__node"><div className="k">Build mode</div><div className="v">Project-based</div></div>
                  <div className="aith-boot__node"><div className="k">Operator</div><div className="v">Hanita Yudovski</div></div>
                  <div className="aith-boot__node"><div className="k">Handoff</div><div className="v">Training + docs</div></div>
                  <div className="aith-boot__node"><div className="k">Speed</div><div className="v">AI speed</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// ─── Intro summary ────────────────────────────────────────────────────────────
function AIToolsIntro() {
  return (
    <section className="aith-intro">
      <div className="aith-container">
        <div className="aith-intro__card aith-rv">
          <div className="aith-intro__bar">
            <span className="aith-win-dot aith-win-dot--r" />
            <span className="aith-win-dot aith-win-dot--y" />
            <span className="aith-win-dot aith-win-dot--g" />
            <span className="aith-intro__tag">readme.md</span>
          </div>
          <p className="aith-intro__text">
            <L>OctaLoom</L>{" \u05d1\u05d5\u05e0\u05d4 \u05e4\u05ea\u05e8\u05d5\u05e0\u05d5\u05ea "}<L>AI</L>{" \u05de\u05d5\u05ea\u05d0\u05de\u05d9\u05dd \u05dc\u05e2\u05e1\u05e7\u05d9 "}<L>B2B</L>{": "}<strong>{"\u05e1\u05d5\u05db\u05e0\u05d9 AI \u05d0\u05d5\u05d8\u05d5\u05e0\u05d5\u05de\u05d9\u05d9\u05dd"}</strong>{" (\u05db\u05d5\u05dc\u05dc \u05d0\u05d9\u05e0\u05d8\u05d2\u05e8\u05e6\u05d9\u05d5\u05ea \u05dc\u05e1\u05dc\u05d0\u05e7, \u05d8\u05dc\u05d2\u05e8\u05dd \u05d5\u05d5\u05d0\u05d8\u05e1\u05d0\u05e4), "}<strong>{"\u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8\u05d9\u05dd, GPTs \u05d5-Gems \u05de\u05d5\u05ea\u05d0\u05de\u05d9\u05dd"}</strong>{", "}<strong>{"\u05d3\u05e4\u05d9 \u05e0\u05d7\u05d9\u05ea\u05d4 \u05d5\u05db\u05dc\u05d9\u05dd \u05d0\u05d9\u05e0\u05d8\u05e8\u05d0\u05e7\u05d8\u05d9\u05d1\u05d9\u05d9\u05dd \u05d1\u05d5\u05d5\u05d9\u05d1 \u05e7\u05d5\u05d3\u05d9\u05e0\u05d2"}</strong>{", \u05d5"}<strong>{"\u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d5\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05d5\u05ea \u05de\u05d1\u05d5\u05e1\u05e1\u05d5\u05ea AI"}</strong>{". \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9\u05dd \u05e0\u05e7\u05d5\u05d3\u05ea\u05d9\u05d9\u05dd, \u05e0\u05d1\u05e0\u05d9\u05dd\u00a0\u05d5\u05e0\u05de\u05e1\u05e8\u05d9\u05dd\u00a0\u05e2\u05dd\u00a0\u05d4\u05d3\u05e8\u05db\u05d4."}
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Explainer ────────────────────────────────────────────────────────────────
function AIToolsExplain() {
  return (
    <section className="aith-section aith-explain" id="explain">
      <div className="aith-container">
        <span className="aith-sec-eyebrow aith-rv"><span className="num">01</span>{"\u05d4\u05e1\u05d1\u05e8"}</span>
        <h2 className="aith-sec-h aith-rv">{"\u05de\u05d4 \u05d6\u05d4 "}<span className="aith-accent">{"\"\u05e6\u05d5\u05d5\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 AI\"?"}</span></h2>

        <div className="aith-explain__panel aith-rv">
          <div className="aith-explain__bar">
            <span className="aith-win-dot aith-win-dot--r" />
            <span className="aith-win-dot aith-win-dot--y" />
            <span className="aith-win-dot aith-win-dot--g" />
            <span className="aith-explain__bar-name">what-is-an-ai-team.md</span>
          </div>
          <div className="aith-explain__body">
            <div className="aith-explain__col aith-explain__col--human">
              <div className="aith-explain__col-tag">// team.classic</div>
              <h3>{"\u05e6\u05d5\u05d5\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 \u05e8\u05d2\u05d9\u05dc"}</h3>
              <p>{"\u05e6\u05d5\u05d5\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 \u05e8\u05d2\u05d9\u05dc \u05de\u05d5\u05e8\u05db\u05d1 \u05de\u05d0\u05e0\u05e9\u05d9\u05dd. \u05de\u05e0\u05d4\u05dc\u05d9 \u05e9\u05d9\u05d5\u05d5\u05e7, \u05e7\u05d5\u05e4\u05d9\u05d9\u05e8\u05d9\u05d9\u05d8\u05e8\u05d9\u05dd, \u05de\u05e0\u05d4\u05dc\u05d9 \u05e7\u05de\u05e4\u05d9\u05d9\u05e0\u05d9\u05dd, \u05d0\u05e0\u05dc\u05d9\u05e1\u05d8\u05d9\u05dd, \u05d0\u05e0\u05e9\u05d9 \u05e2\u05d9\u05e6\u05d5\u05d1. \u05db\u05dc \u05d0\u05d7\u05d3 \u05de\u05d4\u05dd \u05e6\u05e8\u05d9\u05da \u05de\u05e9\u05db\u05d5\u05e8\u05ea, \u05d9\u05de\u05d9 \u05de\u05d7\u05dc\u05d4, \u05d7\u05d5\u05e4\u05e9\u05d4\u00a0\u05d5\u05ea\u05e0\u05d0\u05d9\u05dd\u00a0\u05e1\u05d5\u05e6\u05d9\u05d0\u05dc\u05d9\u05dd."}</p>
            </div>
            <div className="aith-explain__col aith-explain__col--ai">
              <div className="aith-explain__col-tag">// team.ai</div>
              <h3>{"\u05e6\u05d5\u05d5\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 AI"}</h3>
              <p>{"\u05e6\u05d5\u05d5\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 "}<L>AI</L>{" \u05de\u05d5\u05e8\u05db\u05d1 \u05de\u05e1\u05d5\u05db\u05e0\u05d9\u05dd \u05d5\u05db\u05dc\u05d9\u05dd \u05e9\u05e2\u05d5\u05e9\u05d9\u05dd \u05d0\u05ea \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05d4\u05d6\u05d0\u05ea \u05d0\u05e4\u05d9\u05dc\u05d5 \u05d1\u05dc\u05d9 \u05dc\u05d9\u05e9\u05d5\u05df. \u05e1\u05d5\u05db\u05df \u05e9\u05de\u05e8\u05d9\u05e5 \u05e7\u05de\u05e4\u05d9\u05d9\u05e0\u05d9\u05dd, \u05e1\u05d5\u05db\u05df \u05e9\u05de\u05d3\u05e8\u05d2 \u05dc\u05d9\u05d3\u05d9\u05dd, \u05d3\u05e4\u05d9 \u05e0\u05d7\u05d9\u05ea\u05d4 \u05e9\u05de\u05de\u05d9\u05e8\u05d9\u05dd, \u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8\u00a0\u05e9\u05e2\u05d5\u05d6\u05e8\u00a0\u05dc\u05dc\u05e7\u05d5\u05d7\u05d5\u05ea\u00a0\u05d1\u05dc\u05d9\u05dc\u05d4."}</p>
            </div>
          </div>
          <div className="aith-explain__foot">
            {"\u05dc\u05d0 \u05de\u05d3\u05d5\u05d1\u05e8 \u05d1\u05e6\u05d5\u05d5\u05ea \u05e9\u05de\u05d7\u05dc\u05d9\u05e3 \u05d0\u05ea \u05d4\u05e6\u05d5\u05d5\u05ea \u05d4\u05d0\u05e0\u05d5\u05e9\u05d9 \u05e9\u05dc\u05db\u05dd, \u05d0\u05dc\u05d0 \u05db\u05d6\u05d4 \u05e9"}<strong>{"\u05de\u05e9\u05dc\u05d9\u05dd \u05d0\u05d5\u05ea\u05d5 \u05d0\u05d5 \u05de\u05d2\u05d1\u05d9\u05e8 \u05d0\u05d5\u05ea\u05d5"}</strong>{"."}<br />{"\u05d1\u05de\u05d9\u05d5\u05d7\u05d3 \u05db\u05e9\u05d0\u05ea\u05dd \u05e2\u05e1\u05e7 \u05e7\u05d8\u05df \u05d0\u05d5 \u05d1\u05d9\u05e0\u05d5\u05e0\u05d9 \u05e9\u05dc\u05d0 \u05d9\u05db\u05d5\u05dc \u05dc\u05d4\u05e2\u05e1\u05d9\u05e7 \u05e6\u05d5\u05d5\u05ea \u05e9\u05dc\u05dd, \u05d6\u05d4\u00a0\u05de\u05e9\u05e0\u05d4\u00a0\u05d0\u05ea\u00a0\u05db\u05dc\u00a0\u05d4\u05de\u05e9\u05d7\u05e7."}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── App window ───────────────────────────────────────────────────────────────
const AppWindow: React.FC<{
  idx: number
  full?: boolean
  name: string
  tier: string
  typeNo: React.ReactNode
  title: React.ReactNode
  tag: React.ReactNode
  body?: React.ReactNode
  reveal?: { hint: React.ReactNode; controls: string }
  more: React.ReactNode
}> = ({ idx, full, name, tier, typeNo, title, tag, body, reveal, more }) => {
  const [bootIn, setBootIn] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const reduce = prefersReducedMotion()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const delay = reduce ? 0 : (idx % 2) * 140
            window.setTimeout(() => setBootIn(true), delay)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.16 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [idx])

  return (
    <article ref={ref} className={"aith-appwin" + (full ? " aith-appwin--full" : "") + (bootIn ? " boot-in" : "")}>
      <div className="aith-appwin__bar">
        <span className="aith-win-dot aith-win-dot--r" />
        <span className="aith-win-dot aith-win-dot--y" />
        <span className="aith-win-dot aith-win-dot--g" />
        <span className="aith-appwin__name">{name}</span>
        <span className="aith-appwin__tier">{tier}</span>
      </div>
      <div className="aith-appwin__body">
        <div className={full ? "aith-appwin__head" : undefined}>
          <div className="aith-appwin__no">{typeNo}</div>
          <h3>{title}</h3>
          <p className="aith-appwin__tag">{tag}</p>
          {body}
        </div>
        <div className="aith-appwin__more">
          {reveal ? (
            <>
              <button type="button" className="aith-appwin__reveal" aria-expanded={open} aria-controls={reveal.controls} onClick={() => setOpen((p) => !p)}>
                <span className="aith-appwin__reveal-ic" aria-hidden="true">{open ? "×" : "+"}</span>
                <span className="aith-appwin__reveal-label">{"\u05dc\u05e8\u05d0\u05d5\u05ea \u05d3\u05d5\u05d2\u05de\u05d0\u05d5\u05ea"}</span>
                <span className="aith-appwin__reveal-hint aith-appwin__reveal-hint--show">{reveal.hint}</span>
                <span className="aith-appwin__reveal-hint aith-appwin__reveal-hint--hide">{"\u05dc\u05d4\u05e1\u05ea\u05d9\u05e8"}</span>
              </button>
              <div className={"aith-appwin__panel" + (open ? " open" : "")} id={reveal.controls}>
                <div className="aith-appwin__panel-inner">{more}</div>
              </div>
            </>
          ) : (
            more
          )}
        </div>
      </div>
    </article>
  )
}

// ─── Four solution types ──────────────────────────────────────────────────────
function AIToolsApps() {
  return (
    <section className="aith-section aith-apps" id="apps">
      <div className="aith-container">
        <span className="aith-sec-eyebrow aith-rv"><span className="num">02</span>{"\u05d4\u05e2\u05e8\u05db\u05d4"}</span>
        <h2 className="aith-sec-h aith-rv">{"\u05d0\u05e8\u05d1\u05e2\u05d4 \u05e1\u05d5\u05d2\u05d9\u05dd \u05e9\u05dc "}<span className="aith-accent">{"\u05e4\u05ea\u05e8\u05d5\u05e0\u05d5\u05ea AI"}</span></h2>
        <p className="aith-sec-lede aith-rv">{"\u05db\u05dc \u05d0\u05d7\u05d3 \u05d4\u05d5\u05d0 \u05d4\u05e6\u05e2\u05d4 \u05e0\u05e4\u05e8\u05d3\u05ea, \u05e2\u05dd \u05e1\u05e7\u05d5\u05e4 \u05e0\u05e4\u05e8\u05d3."}<span className="aith-sec-lede__line2">{"\u05d1\u05d5\u05d7\u05e8\u05d9\u05dd \u05de\u05d4 \u05e9\u05de\u05ea\u05d0\u05d9\u05dd, \u05d0\u05d5 \u05de\u05e9\u05dc\u05d1\u05d9\u05dd."}</span></p>

        <div className="aith-apps__grid">

          <AppWindow
            idx={0}
            full
            name="ai-agents.app"
            tier="Type 01"
            typeNo={<>{"// \u05e1\u05d5\u05d2 01"}</>}
            title={"\u05e1\u05d5\u05db\u05e0\u05d9 AI \u05dc\u05e9\u05d9\u05d5\u05d5\u05e7"}
            tag={<>{"\u05d6\u05d4 \u05d4\u05d3\u05d1\u05e8 \u05d4\u05d0\u05de\u05d9\u05ea\u05d9. \u05e1\u05d5\u05db\u05e0\u05d9\u05dd \u05d0\u05d5\u05d8\u05d5\u05e0\u05d5\u05de\u05d9\u05d9\u05dd \u05e9\u05d0\u05e0\u05d9 \u05d1\u05d5\u05e0\u05d4 \u05e2\u05dd "}<L>Claude Code</L>{". \u05d4\u05dd \u05d7\u05d5\u05e9\u05d1\u05d9\u05dd, \u05de\u05d7\u05dc\u05d9\u05d8\u05d9\u05dd, \u05d5\u05e4\u05d5\u05e2\u05dc\u05d9\u05dd \u05d1\u05e2\u05e6\u05de\u05dd \u05dc\u05e4\u05d9\u00a0\u05d4\u05db\u05dc\u05dc\u05d9\u05dd\u00a0\u05d5\u05d4\u05de\u05d8\u05e8\u05d5\u05ea\u00a0\u05e9\u05e7\u05d1\u05e2\u05ea\u05dd."}</>}
            body={
              <>
                <p>{"\u05de\u05d4 \u05d4\u05d4\u05d1\u05d3\u05dc \u05d1\u05d9\u05df \u05e1\u05d5\u05db\u05df "}<L>AI</L>{" \u05dc\u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8? \u05e1\u05d5\u05db\u05df \u05e4\u05d5\u05e2\u05dc. \u05d4\u05d5\u05d0 \u05dc\u05d0 \u05de\u05d7\u05db\u05d4 \u05e9\u05ea\u05e9\u05d0\u05dc\u05d5 \u05e9\u05d0\u05dc\u05d4. \u05e2\u05d5\u05e7\u05d1, \u05de\u05d7\u05dc\u05d9\u05d8, \u05de\u05d1\u05e6\u05e2.\u00a0\u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8\u00a0\u05de\u05d2\u05d9\u05d1."}</p>
                <p>{"\u05e1\u05d5\u05db\u05df \u05d4\u05d5\u05d0 \u05d7\u05d1\u05e8 \u05e6\u05d5\u05d5\u05ea. \u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8 \u05d4\u05d5\u05d0 \u05db\u05dc\u05d9. \u05e9\u05e0\u05d9\u05d4\u05dd\u00a0\u05e9\u05d9\u05de\u05d5\u05e9\u05d9\u05d9\u05dd,\u00a0\u05dc\u05d0\u00a0\u05d0\u05d5\u05ea\u05d5\u00a0\u05d3\u05d1\u05e8."}</p>
              </>
            }
            more={
              <>
                <div className="aith-appwin__lead">{"// \u05de\u05d4 \u05d0\u05e0\u05d9 \u05d1\u05d5\u05e0\u05d4"}</div>
                <ul className="aith-appwin__list">
                  <li><b>{"\u05e1\u05d5\u05db\u05df \u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d4 \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05ea:"}</b>{" \u05de\u05e8\u05d9\u05e5 \u05e7\u05de\u05e4\u05d9\u05d9\u05e0\u05d9\u05dd, \u05de\u05ea\u05d0\u05d9\u05dd \u05d8\u05e8\u05d2\u05d5\u05d8, \u05de\u05d3\u05d5\u05d5\u05d7 \u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05d1\u05dc\u05d9\u00a0\u05e9\u05ea\u05e6\u05d8\u05e8\u05db\u05d5\u00a0\u05dc\u05e4\u05ea\u05d5\u05d7\u00a0"}<L>dashboard</L></li>
                  <li><b>{"\u05e1\u05d5\u05db\u05df \u05de\u05d7\u05e7\u05e8 \u05ea\u05d5\u05db\u05df:"}</b>{" \u05e1\u05d5\u05e8\u05e7 \u05d0\u05ea \u05d4\u05ea\u05e2\u05e9\u05d9\u05d9\u05d4 \u05e9\u05dc\u05db\u05dd, \u05de\u05e2\u05dc\u05d4 \u05d4\u05d6\u05d3\u05de\u05e0\u05d5\u05d9\u05d5\u05ea, \u05de\u05e6\u05d9\u05e2 \u05e0\u05d5\u05e9\u05d0\u05d9\u05dd \u05dc\u05e4\u05d9 \u05de\u05d4 \u05e9\u05de\u05ea\u05d7\u05d9\u05dc \u05dc\u05e2\u05dc\u05d5\u05ea"}</li>
                  <li><b>{"\u05e1\u05d5\u05db\u05df \u05de\u05db\u05d9\u05e8\u05d5\u05ea AI:"}</b>{" \u05de\u05d3\u05e8\u05d2 \u05d5\u05de\u05e0\u05ea\u05d1 \u05e4\u05e0\u05d9\u05d5\u05ea \u05e0\u05db\u05e0\u05e1\u05d5\u05ea \u05dc\u05e4\u05d9 \u05db\u05dc\u05dc\u05d9\u05dd \u05e9\u05dc\u05db\u05dd, \u05e9\u05d5\u05dc\u05d7 \u05d4\u05ea\u05e8\u05d0\u05d5\u05ea \u05dc\u05d0\u05e0\u05e9\u05d9\u05dd \u05d4\u05e0\u05db\u05d5\u05e0\u05d9\u05dd"}</li>
                  <li><b>{"\u05e1\u05d5\u05db\u05df \u05ea\u05d4\u05dc\u05d9\u05db\u05d9\u05dd \u05e4\u05e0\u05d9\u05de\u05d9:"}</b>{" \u05de\u05d8\u05e4\u05dc \u05d1\u05de\u05e9\u05d9\u05de\u05d5\u05ea \u05d7\u05d5\u05d6\u05e8\u05d5\u05ea (\u05d3\u05d5\u05d7\u05d5\u05ea, "}<L>sync</L>{" \u05d1\u05d9\u05df \u05de\u05e2\u05e8\u05db\u05d5\u05ea, \u05d4\u05ea\u05e8\u05d0\u05d5\u05ea)"}</li>
                  <li><b>{"\u05e1\u05d5\u05db\u05e0\u05d9\u05dd \u05e2\u05dd \u05d0\u05d9\u05e0\u05d8\u05d2\u05e8\u05e6\u05d9\u05d5\u05ea \u05de\u05e1\u05e8\u05d9\u05dd:"}</b>{" \u05e1\u05dc\u05d0\u05e7, \u05d5\u05d0\u05d8\u05e1\u05d0\u05e4, \u05d8\u05dc\u05d2\u05e8\u05dd. \u05d4\u05e1\u05d5\u05db\u05df \u05d7\u05d9 \u05d0\u05d9\u05e4\u05d4 \u05e9\u05d4\u05e6\u05d5\u05d5\u05ea \u05e9\u05dc\u05db\u05dd \u05db\u05d1\u05e8 \u05e2\u05d5\u05d1\u05d3, \u05dc\u05d0 \u05d1\u05e2\u05d5\u05d3 \u05d8\u05d0\u05d1 \u05e4\u05ea\u05d5\u05d7 \u05e9\u05d0\u05e3 \u05d0\u05d7\u05d3 \u05dc\u05d0 \u05d1\u05d5\u05d3\u05e7."}</li>
                </ul>
              </>
            }
          />

          <AppWindow
            idx={1}
            full
            name="vibe-assets.app"
            tier="Type 02"
            typeNo={<>{"// \u05e1\u05d5\u05d2 02"}</>}
            title={"\u05d3\u05e4\u05d9 \u05e0\u05d7\u05d9\u05ea\u05d4 \u05d5\u05db\u05dc\u05d9\u05dd \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05d9\u05dd"}
            tag={<>{"\u05de\u05e2\u05d1\u05e8 \u05dc\u05e1\u05d5\u05db\u05e0\u05d9\u05dd, \u05d0\u05e0\u05d9 \u05d1\u05d5\u05e0\u05d4 \u05d1\u05de\u05d4\u05d9\u05e8\u05d5\u05ea "}<L>AI</L>{" \u05e0\u05db\u05e1\u05d9\u05dd \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05d9\u05dd \u05e9\u05e2\u05d5\u05d1\u05d3\u05d9\u05dd, \u05de\u05d4 \u05e9\u05e0\u05e7\u05e8\u05d0 \"\u05d5\u05d5\u05d9\u05d1 \u05e7\u05d5\u05d3\u05d9\u05e0\u05d2\"."}</>}
            body={
              <p>{"\u05d4\u05db\u05dc \u05e0\u05d1\u05e0\u05d4 \u05e2\u05dd "}<L>Lovable</L>{", "}<L>Claude Design</L>{" \u05d5\u05e4\u05d9\u05ea\u05d5\u05d7 \u05de\u05d5\u05ea\u05d0\u05dd. \u05d1\u05de\u05d4\u05d9\u05e8\u05d5\u05ea "}<L>AI</L>{", \u05e2\u05dd \u05ea\u05d9\u05e2\u05d5\u05d3 \u05d5\u05de\u05e1\u05d9\u05e8\u05d4 \u05de\u05e1\u05d5\u05d3\u05e8\u05ea."}</p>
            }
            more={
              <>
                <div className="aith-appwin__lead">{"// \u05de\u05d4 \u05d0\u05e0\u05d9 \u05d1\u05d5\u05e0\u05d4"}</div>
                <ul className="aith-appwin__list">
                  <li><b>{"\u05d3\u05e4\u05d9 \u05e0\u05d7\u05d9\u05ea\u05d4 \u05e9\u05de\u05de\u05d9\u05e8\u05d9\u05dd:"}</b>{" \u05dc\u05e7\u05de\u05e4\u05d9\u05d9\u05e0\u05d9\u05dd, \u05d4\u05e9\u05e7\u05d5\u05ea, \u05d0\u05d9\u05e8\u05d5\u05e2\u05d9\u05dd"}</li>
                  <li><b>{"Lead magnets \u05d0\u05d9\u05e0\u05d8\u05e8\u05d0\u05e7\u05d8\u05d9\u05d1\u05d9\u05d9\u05dd:"}</b>{" \u05de\u05d7\u05e9\u05d1\u05d5\u05e0\u05d9 "}<L>ROI</L>{", \u05e9\u05d0\u05dc\u05d5\u05e0\u05d9 \u05d0\u05d1\u05d7\u05d5\u05df, \u05db\u05dc\u05d9 \u05d4\u05e2\u05e8\u05db\u05d4, \u05ea\u05d2\u05d9\u05d3\u05d5 \u05d1\u05d9\u05d9 \u05d1\u05d9\u05d9 \u05dc-"}<L>PDF</L>{" \u05de\u05e9\u05e2\u05de\u05dd, \u05d5\u05e9\u05dc\u05d5\u05dd \u05dc\u05d7\u05d5\u05d5\u05d9\u05d4\u00a0\u05d0\u05d9\u05e0\u05d8\u05e8\u05e7\u05d8\u05d9\u05d1\u05d9\u05ea\u00a0\u05e9\u05d0\u05e0\u05e9\u05d9\u05dd\u00a0\u05d6\u05d5\u05db\u05e8\u05d9\u05dd."}</li>
                  <li><b>{"\u05d4\u05d0\u05d1\u05d9\u05dd \u05e4\u05e0\u05d9\u05de\u05d9\u05d9\u05dd:"}</b>{" \u05dc\u05d3\u05d5\u05d2\u05de\u05d4, \u05dc\u05ea\u05d5\u05db\u05e0\u05d9\u05d5\u05ea \u05e9\u05d2\u05e8\u05d9\u05e8\u05d9 \u05de\u05d5\u05ea\u05d2 \u05d0\u05e0\u05d9 \u05d1\u05d5\u05e0\u05d4 \u05d4\u05d0\u05d1 \u05ea\u05d5\u05db\u05df \u05e2\u05dd \u05ea\u05d1\u05e0\u05d9\u05d5\u05ea, \u05d1\u05e0\u05e7 \u05e0\u05d5\u05e9\u05d0\u05d9\u05dd, \u05d5\u05d4\u05e0\u05d7\u05d9\u05d5\u05ea \u05de\u05d5\u05ea\u05d2 \u05d1\u05de\u05e7\u05d5\u05dd \u05d0\u05d7\u05d3. \u05d4\u05e2\u05d5\u05d1\u05d3\u05d9\u05dd \u05e0\u05db\u05e0\u05e1\u05d9\u05dd, \u05de\u05d5\u05e6\u05d0\u05d9\u05dd\u00a0\u05de\u05d4\u00a0\u05e9\u05e6\u05e8\u05d9\u05da,"}<br />{"\u05d5\u05d9\u05d5\u05e6\u05d0\u05d9\u05dd \u05e2\u05dd \u05e4\u05d5\u05e1\u05d8, \u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4 \u05d5\u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05d1\u05e8\u05d5\u05e8\u05d4."}</li>
                  <li><b>{"\u05e2\u05e8\u05db\u05d5\u05ea \u05db\u05dc\u05d9\u05dd \u05d5\u05de\u05e8\u05db\u05d6\u05d9 \u05de\u05e9\u05d0\u05d1\u05d9\u05dd:"}</b>{" \u05e0\u05d1\u05e0\u05d9\u05dd \u05db\u05d3\u05e4\u05d9 \u05e0\u05d7\u05d9\u05ea\u05d4, \u05d1\u05de\u05e7\u05d5\u05dd \u05ea\u05d9\u05e7\u05d9\u05d9\u05ea \u05d2\u05d5\u05d2\u05dc \u05d3\u05e8\u05d9\u05d9\u05d1 \u05de\u05d1\u05d5\u05dc\u05d2\u05e0\u05ea."}</li>
                  <li><b className="lead">{"\u05d7\u05d5\u05d5\u05d9\u05d5\u05ea "}<L>onboarding</L>{" \u05dc\u05dc\u05e7\u05d5\u05d7\u05d5\u05ea \u05d7\u05d3\u05e9\u05d9\u05dd"}</b>{" \u05e9\u05de\u05e8\u05d2\u05d9\u05e9\u05d9\u05dd\u00a0\u05e9\u05d8\u05d9\u05e4\u05dc\u05d5\u00a0\u05d1\u05d4\u05dd"}</li>
                </ul>
              </>
            }
          />

          <AppWindow
            idx={2}
            name="gpts-and-gems.app"
            tier="Type 03"
            typeNo={<>{"// \u05e1\u05d5\u05d2 03"}</>}
            title={"\u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8\u05d9\u05dd, GPTs \u05d5-Gems"}
            tag={<>{"\u05dc\u05d0 \u05db\u05dc \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8 "}<L>AI</L>{" \u05d7\u05d9\u05d9\u05d1 \u05dc\u05e7\u05d7\u05ea \u05d7\u05d5\u05d3\u05e9. \u05d9\u05e9 \u05d3\u05d1\u05e8\u05d9\u05dd \u05e9\u05dc\u05d5\u05e7\u05d7\u05d9\u05dd \u05d9\u05d5\u05de\u05d9\u05d9\u05dd \u05e2\u05d1\u05d5\u05d3\u05d4 \u05db\u05d5\u05dc\u05dc\u00a0\u05d0\u05d9\u05e4\u05d9\u05d5\u05df,\u00a0\u05d5\u05e0\u05d5\u05ea\u05e0\u05d9\u05dd\u00a0\u05e2\u05e8\u05da\u00a0\u05de\u05d9\u05d9\u05d3\u05d9."}</>}
            reveal={{ hint: "4 \u05d3\u05d5\u05d2\u05de\u05d0\u05d5\u05ea", controls: "aith-appPanel3" }}
            more={
              <>
                <ul className="aith-appwin__list">
                  <li><b>{"\u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8\u05d9\u05dd \u05dc\u05dc\u05e7\u05d5\u05d7\u05d5\u05ea:"}</b>{" \u05de\u05d0\u05d5\u05de\u05e0\u05d9\u05dd \u05e2\u05dc \u05d4\u05e7\u05d5\u05dc \u05d5\u05d4\u05de\u05d5\u05e6\u05e8 \u05e9\u05dc\u05db\u05dd, \u05e2\u05d5\u05e0\u05d9\u05dd \u05e2\u05dc \u05e9\u05d0\u05dc\u05d5\u05ea \u05e0\u05e4\u05d5\u05e6\u05d5\u05ea "}<L>24/7</L></li>
                  <li><b>{"GPTs \u05de\u05d5\u05ea\u05d0\u05de\u05d9\u05dd \u05dc\u05e6\u05d5\u05d5\u05ea:"}</b>{" \u05dc\u05d9\u05e6\u05d9\u05e8\u05ea \u05ea\u05d5\u05db\u05df, \u05db\u05ea\u05d9\u05d1\u05ea \u05d4\u05e6\u05e2\u05d5\u05ea, \u05de\u05e2\u05e0\u05d4\u00a0\u05dc\u05e9\u05d0\u05dc\u05d5\u05ea\u00a0\u05e9\u05d7\u05d5\u05d6\u05e8\u05d5\u05ea"}</li>
                  <li><b>{"Gemini Gems:"}</b>{" \u05dc\u05e4\u05d5\u05e0\u05e7\u05e6\u05d9\u05d5\u05ea \u05e2\u05e1\u05e7\u05d9\u05d5\u05ea \u05e1\u05e4\u05e6\u05d9\u05e4\u05d9\u05d5\u05ea"}</li>
                  <li><b className="lead">{"\u05d1\u05d5\u05d8\u05d9\u05dd \u05dc\u05d8\u05e4\u05e1\u05d9 \u05dc\u05d9\u05d3\u05d9\u05dd"}</b>{" \u05d1\u05d0\u05ea\u05e8"}</li>
                </ul>
                <div className="aith-appwin__callout">
                  <strong>{"\u05d6\u05de\u05df \u05d1\u05e0\u05d9\u05d9\u05d4:"}</strong>{" \u05d9\u05d5\u05de\u05d9\u05d9\u05dd \u05e2\u05d1\u05d5\u05d3\u05d4 \u05db\u05d5\u05dc\u05dc \u05d0\u05d9\u05e4\u05d9\u05d5\u05df. \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8 \u05e7\u05e6\u05e8, \u05e2\u05e8\u05da \u05de\u05d9\u05d9\u05d3\u05d9. \u05d4\u05db\u05dc\u05d9\u05dd \u05d4\u05d0\u05dc\u05d4 \u05d4\u05dd \u05dc\u05d0 \u05e1\u05d5\u05db\u05e0\u05d9\u05dd. \u05d4\u05dd \u05de\u05d2\u05d9\u05d1\u05d9\u05dd \u05db\u05e9\u05e4\u05d5\u05e0\u05d9\u05dd \u05d0\u05dc\u05d9\u05d4\u05dd, \u05dc\u05d0 \u05d9\u05d5\u05d6\u05de\u05d9\u05dd. \u05d0\u05d1\u05dc \u05d1\u05e9\u05d1\u05d9\u05dc \u05d4\u05de\u05e7\u05e8\u05d9\u05dd \u05d4\u05e0\u05db\u05d5\u05e0\u05d9\u05dd, \u05d6\u05d4\u00a0\u05de\u05e1\u05e4\u05d9\u05e7\u00a0\u05d5\u05d4\u05e8\u05d1\u05d4."}
                </div>
              </>
            }
          />

          <AppWindow
            idx={3}
            name="automation-flows.app"
            tier="Type 04"
            typeNo={<>{"// \u05e1\u05d5\u05d2 04"}</>}
            title={"\u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d5\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05d5\u05ea"}
            tag={<>{"\u05d1\u05de\u05e7\u05d5\u05dd \u05dc\u05d7\u05d1\u05e8 15 \u05e9\u05dc\u05d1\u05d9 "}<L>Zapier</L>{", \u05d0\u05e0\u05d9 \u05d1\u05d5\u05e0\u05d4 "}<L>workflows</L>{" \u05e2\u05dd "}<L>Claude Code</L>{" \u05db\u05de\u05e0\u05d5\u05e2 \u05e8\u05d0\u05e9\u05d9."}</>}
            body={
              <p><L>Make</L>{" \u05d0\u05d5 "}<L>n8n</L>{" \u05e0\u05db\u05e0\u05e1\u05d9\u05dd \u05db\u05e9\u05e6\u05e8\u05d9\u05da \u05e9\u05db\u05d1\u05ea \u05d0\u05d9\u05e0\u05d8\u05d2\u05e8\u05e6\u05d9\u05d4, \u05d0\u05d1\u05dc \u05d4\u05d0\u05d9\u05e0\u05d8\u05dc\u05d9\u05d2\u05e0\u05e6\u05d9\u05d4 \u05de\u05d2\u05d9\u05e2\u05d4 \u05de-"}<L>AI</L>{", \u05dc\u05d0 \u05de\u05db\u05dc\u05dc\u05d9 "}<L>if-then</L>{"."}</p>
            }
            reveal={{ hint: "4 \u05d3\u05d5\u05d2\u05de\u05d0\u05d5\u05ea", controls: "aith-appPanel4" }}
            more={
              <>
                <ul className="aith-appwin__list">
                  <li><b className="lead">{"\u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d9\u05ea \u05e8\u05e6\u05e4\u05d9 \u05de\u05d9\u05d9\u05dc\u05d9\u05dd"}</b>{" \u05e2\u05dd\u00a0\u05e4\u05e8\u05e1\u05d5\u05e0\u05dc\u05d9\u05d6\u05e6\u05d9\u05d4\u00a0\u05e9\u05e0\u05d5\u05e6\u05e8\u05ea\u00a0\u05d1-"}<L>AI</L></li>
                  <li><b className="lead">{"\u05de\u05d7\u05d6\u05d5\u05e8 \u05ea\u05d5\u05db\u05df:"}</b>{" \u05ea\u05d5\u05db\u05df \u05d0\u05d7\u05d3,\u00a0\u05e4\u05d5\u05e8\u05de\u05d8\u05d9\u05dd\u00a0\u05de\u05e8\u05d5\u05d1\u05d9\u05dd,\u00a0\u05d4\u05e4\u05e6\u05d4\u00a0\u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9\u05ea"}</li>
                  <li><b className="lead">{"\u05e0\u05d9\u05ea\u05d5\u05d1 \u05d5\u05d3\u05d9\u05e8\u05d5\u05d2 \u05dc\u05d9\u05d3\u05d9\u05dd"}</b></li>
                  <li><b className="lead">{"\u05ea\u05d6\u05de\u05d5\u05df \u05e4\u05e8\u05e1\u05d5\u05de\u05d9\u05dd"}</b>{" \u05e2\u05dd \u05ea\u05d6\u05de\u05d5\u05df \u05de\u05d5\u05ea\u05d0\u05dd "}<L>AI</L></li>
                </ul>
                <div className="aith-appwin__callout">
                  {"\u05d4\u05d4\u05d1\u05d3\u05dc \u05d1\u05d9\u05df \u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d4 \u05e8\u05d2\u05d9\u05dc\u05d4 \u05dc\u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d4 \u05de\u05d1\u05d5\u05e1\u05e1\u05ea "}<L>AI</L>{" \u05d6\u05d4 \u05d4\u05d4\u05d1\u05d3\u05dc \u05d1\u05d9\u05df \u05e8\u05d5\u05d1\u05d5\u05d8 \u05e9\u05de\u05d1\u05e6\u05e2 \u05e4\u05e7\u05d5\u05d3\u05d5\u05ea, \u05dc\u05d1\u05d9\u05df \u05e8\u05d5\u05d1\u05d5\u05d8 \u05e9\u05de\u05d1\u05d9\u05df \u05de\u05d4\u00a0\u05d0\u05ea\u05dd\u00a0\u05de\u05e0\u05e1\u05d9\u05dd\u00a0\u05dc\u05d4\u05e9\u05d9\u05d2."}
                </div>
              </>
            }
          />

        </div>
      </div>
    </section>
  )
}

// ─── How it works ─────────────────────────────────────────────────────────────
function AIToolsHow() {
  return (
    <section className="aith-section aith-how">
      <div className="aith-container">
        <span className="aith-sec-eyebrow aith-rv"><span className="num">03</span>{"\u05d4\u05ea\u05d4\u05dc\u05d9\u05da"}</span>
        <h2 className="aith-sec-h aith-rv">{"\u05d0\u05d9\u05da \u05d6\u05d4 "}<span className="aith-accent">{"\u05e2\u05d5\u05d1\u05d3"}</span></h2>

        <div className="aith-how__pipe aith-rv">
          <div className="aith-how__rail" />
          <div className="aith-how__stage">
            <div className="aith-how__badge">01</div>
            <div className="aith-how__card">
              <div className="aith-how__step-n">{"\u05e9\u05dc\u05d1 1"}</div>
              <h3>{"\u05e9\u05d9\u05d7\u05ea \u05d4\u05d9\u05db\u05e8\u05d5\u05ea."}</h3>
              <p>{"\u05de\u05d4 \u05d0\u05ea\u05dd \u05e6\u05e8\u05d9\u05db\u05d9\u05dd? \u05d0\u05d9\u05d6\u05d4 \u05e1\u05d5\u05db\u05df, \u05db\u05dc\u05d9, \u05d0\u05d5\u00a0\u05e9\u05d9\u05dc\u05d5\u05d1\u00a0\u05de\u05ea\u05d0\u05d9\u05dd?\u00a0\u05de\u05d1\u05d9\u05e0\u05d9\u05dd\u00a0\u05d1\u05d9\u05d7\u05d3."}</p>
            </div>
          </div>
          <div className="aith-how__stage">
            <div className="aith-how__badge">02</div>
            <div className="aith-how__card">
              <div className="aith-how__step-n">{"\u05e9\u05dc\u05d1 2"}</div>
              <h3>{"\u05d1\u05e0\u05d9\u05d9\u05d4."}</h3>
              <p><L>GPT's</L>{", "}<L>GEMS</L>{" \u05d0\u05d5 \u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8: \u05d9\u05d5\u05de\u05d9\u05d9\u05dd. \u05e1\u05d5\u05db\u05e0\u05d9\u05dd \u05d5\u05db\u05dc\u05d9 "}<L>AI</L>{" \u05de\u05d5\u05e8\u05db\u05d1\u05d9\u05dd: 2-6 \u05e9\u05d1\u05d5\u05e2\u05d5\u05ea. \u05d0\u05ea\u05dd \u05de\u05e2\u05d5\u05e8\u05d1\u05d9\u05dd \u05dc\u05d0\u05d5\u05e8\u05da \u05d4\u05d3\u05e8\u05da, \u05d0\u05d9\u05df \u05d3\u05d1\u05e8 \u05db\u05d6\u05d4 \u05d0\u05e6\u05dc\u05d9 \u05dc\u05e7\u05d1\u05dc \u05d1\u05e1\u05d5\u05e3 \u05de\u05e9\u05d4\u05d5 \u05d5\u05dc\u05d2\u05dc\u05d5\u05ea \u05e9\u05d6\u05d4\u00a0\u05dc\u05d0\u00a0\u05de\u05d4\u00a0\u05e9\u05d1\u05d9\u05e7\u05e9\u05ea\u05dd."}</p>
            </div>
          </div>
          <div className="aith-how__stage">
            <div className="aith-how__badge">03</div>
            <div className="aith-how__card">
              <div className="aith-how__step-n">{"\u05e9\u05dc\u05d1 3"}</div>
              <h3>{"\u05de\u05e1\u05d9\u05e8\u05d4."}</h3>
              <p>{"\u05d4\u05d3\u05e8\u05db\u05d4 \u05de\u05e1\u05d5\u05d3\u05e8\u05ea, \u05ea\u05d9\u05e2\u05d5\u05d3 \u05e9\u05d0\u05ea\u05dd \u05d9\u05db\u05d5\u05dc\u05d9\u05dd \u05dc\u05d7\u05d6\u05d5\u05e8 \u05d0\u05dc\u05d9\u05d5, \u05d5-30 \u05d9\u05de\u05d9 \u05ea\u05de\u05d9\u05db\u05d4 \u05d0\u05d7\u05e8\u05d9 \u05d4\u05e9\u05e7\u05d4. \u05d0\u05d7\u05e8\u05d9\u00a0\u05d6\u05d4\u00a0\u05d4\u05db\u05dc\u05d9\u00a0\u05e9\u05dc\u05db\u05dd,\u00a0\u05dc\u05d2\u05de\u05e8\u05d9."}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Count-up ─────────────────────────────────────────────────────────────────
const CountUp: React.FC<{ target: number }> = ({ target }) => {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const reduce = prefersReducedMotion()
    if (reduce) {
      setVal(target)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now()
            const dur = 1500
            const ease = (t: number) => 1 - Math.pow(1 - t, 3)
            const tick = (now: number) => {
              const p = Math.min((now - start) / dur, 1)
              setVal(Math.round(target * ease(p)))
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.5 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{val.toLocaleString()}</span>
}

// ─── What's been built (purple) ───────────────────────────────────────────────
function AIToolsBuilt() {
  return (
    <section className="aith-section aith-built">
      <div className="aith-container">
        <span className="aith-sec-eyebrow aith-rv"><span className="num">04</span>{"\u05ea\u05d5\u05e6\u05d0\u05d5\u05ea"}</span>
        <h2 className="aith-sec-h aith-rv">{"\u05ea\u05d5\u05e6\u05d0\u05d5\u05ea "}<span className="aith-accent">{"\u05d0\u05de\u05d9\u05ea\u05d9\u05d5\u05ea"}</span></h2>

        <div className="aith-built__grid aith-rv">
          <div className="aith-built__stat">
            <div className="meta">Headline result</div>
            <div className="aith-built__num"><CountUp target={70} /><span className="suffix">%</span></div>
            <div className="aith-built__num-lbl">{"\u05d4\u05e4\u05d7\u05ea\u05d4 \u05d1\u05e2\u05d1\u05d5\u05d3\u05d4 \u05d9\u05d3\u05e0\u05d9\u05ea \u05d1\u05d0\u05de\u05e6\u05e2\u05d5\u05ea\u00a0\u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d4\u00a0\u05de\u05d5\u05ea\u05d0\u05de\u05ea."}</div>
          </div>
          <div className="aith-built__log">
            <div className="aith-built__log-h">$ build-log --recent</div>
            <ul>
              <li>{"\u05d4\u05d0\u05d1\u05d9\u05dd \u05e4\u05e0\u05d9\u05de\u05d9\u05d9\u05dd \u05dc\u05ea\u05d5\u05db\u05e0\u05d9\u05d5\u05ea \u05e9\u05d2\u05e8\u05d9\u05e8\u05d9 \u05de\u05d5\u05ea\u05d2"}</li>
              <li>{"\u05d3\u05e4\u05d9 \u05e0\u05d7\u05d9\u05ea\u05d4"}</li>
              <li>{"\u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8\u05d9\u05dd \u05d0\u05e8\u05d2\u05d5\u05e0\u05d9\u05d9\u05dd \u05dc\u05ea\u05db\u05e0\u05d9 \u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df"}</li>
              <li><L>{"Lead\u00a0magnets"}</L>{" \u05d0\u05d9\u05e0\u05d8\u05e8\u05d0\u05e7\u05d8\u05d9\u05d1\u05d9\u05d9\u05dd\u00a0\u05d5\u05db\u05dc\u05d9\u00a0\u05d4\u05e2\u05e8\u05db\u05d4"}</li>
              <li>{"\u05de\u05e2\u05e8\u05db\u05d5\u05ea \u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d4 \u05e9\u05de\u05d7\u05dc\u05d9\u05e4\u05d5\u05ea \u05ea\u05d4\u05dc\u05d9\u05db\u05d9\u05dd \u05d9\u05d3\u05e0\u05d9\u05d9\u05dd \u05e9\u05dc\u05de\u05d9\u05dd"}</li>
            </ul>
          </div>
        </div>
        <div className="aith-built__foot aith-rv">{"\u05d4\u05e0\u05d4 \u05de\u05d4 \u05e9\u05e0\u05d1\u05e0\u05d4. \u05d4\u05e0\u05d4 \u05de\u05d4 \u05e9\u05d4\u05d5\u05d7\u05dc\u05e3. \u05d4\u05e0\u05d4 \u05d4\u05d6\u05de\u05df \u05e9\u05e0\u05d7\u05e1\u05da. \u05e2\u05d3\u05d9\u05e3 \u05de\u05d4\u05d1\u05d8\u05d7\u05d5\u05ea \u05dc\"\u05de\u05d4\u05e4\u05db\u05ea "}<L>AI</L>{"\" \u05e9\u05d0\u05e3 \u05d0\u05d7\u05d3 \u05dc\u05d0 \u05d9\u05d5\u05d3\u05e2\u00a0\u05de\u05d4\u00a0\u05d6\u05d4\u00a0\u05d0\u05d5\u05de\u05e8\u00a0\u05d1\u05e4\u05d5\u05e2\u05dc."}</div>
      </div>
    </section>
  )
}

// ─── Client quote ─────────────────────────────────────────────────────────────
function AIToolsQuote() {
  return (
    <section className="aith-section aith-quote">
      <div className="aith-container">
        <span className="aith-sec-eyebrow aith-rv"><span className="num">05</span>{"\u05d0\u05d5\u05ea"}</span>
        <h2 className="aith-sec-h aith-rv">{"\u05de\u05d4 \u05d0\u05d5\u05de\u05e8\u05d9\u05dd "}<span className="aith-accent">{"\u05d4\u05dc\u05e7\u05d5\u05d7\u05d5\u05ea"}</span></h2>

        <div className="aith-quote__card aith-rv">
          <div className="aith-quote__bar">
            <span className="aith-win-dot aith-win-dot--r" />
            <span className="aith-win-dot aith-win-dot--y" />
            <span className="aith-win-dot aith-win-dot--g" />
            <span className="aith-quote__tag">verified.client</span>
          </div>
          <p className="aith-quote__text">{"\u05de\u05d4\u05e8\u05d2\u05e2 \u05e9\u05d7\u05e0\u05d9\u05ea\u05d4 \u05e0\u05db\u05e0\u05e1\u05d4, \u05d4\u05e9\u05d9\u05d5\u05d5\u05e7 \u05d4\u05e4\u05e1\u05d9\u05e7 \u05dc\u05d4\u05d9\u05d5\u05ea \u05de\u05e9\u05d9\u05de\u05d4 \u05de\u05e2\u05d9\u05e7\u05d4 \u05d5\u05d4\u05e4\u05da \u05dc\u05de\u05e0\u05d5\u05e2 \u05e6\u05de\u05d9\u05d7\u05d4. \u05d9\u05e9 \u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4 \u05d1\u05e8\u05d5\u05e8\u05d4, \u05d9\u05e9 \u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d4 \u05e9\u05e2\u05d5\u05d1\u05d3\u05ea, \u05d5\u05d9\u05e9 \u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05e9\u05d0\u05e4\u05e9\u05e8\u00a0\u05dc\u05de\u05d3\u05d5\u05d3\u00a0\u05dc\u05d0\u05d5\u05e8\u05da\u00a0\u05d6\u05de\u05df."}</p>
          <div className="aith-quote__who">
            <div className="aith-quote__avatar">SD</div>
            <div className="aith-quote__attr">
              <div className="n">{"\u05e9\u05d9\u05de\u05d9 \u05d3\u05d1\u05d9\u05e8"}</div>
              <div className="r">{"\u05de\u05e0\u05db\"\u05dc "}<L>AcademAi</L></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Hanita ───────────────────────────────────────────────────────────────────
function AIToolsHanita() {
  return (
    <section className="aith-section aith-hi">
      <div className="aith-container">
        <span className="aith-sec-eyebrow aith-rv"><span className="num">06</span>{"\u05d4\u05d0\u05d5\u05e4\u05e8\u05d8\u05d5\u05e8\u05d9\u05ea"}</span>
        <h2 className="aith-sec-h aith-rv">{"\u05e7\u05e6\u05ea "}<span className="aith-accent">{"\u05e2\u05dc\u05d9\u05d9"}</span></h2>

        <div className="aith-hi__grid">
          <div className="aith-hi__portrait aith-rv aith-rv--right">
            <div className="img">
              <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Headshot-1.png" loading="lazy" decoding="async" alt={"\u05d7\u05e0\u05d9\u05ea\u05d4 \u05d9\u05d5\u05d3\u05d5\u05d1\u05e1\u05e7\u05d9, \u05de\u05d9\u05d9\u05e1\u05d3\u05ea OctaLoom \u05d5\u05de\u05e0\u05d7\u05ea \u05d4\u05e4\u05d5\u05d3\u05e7\u05d0\u05e1\u05d8 \u05de\u05d4 \u05d4\u05e1\u05d9\u05e4\u05d5\u05e8 \u05e2\u05dd? \u05dc\u05e9\u05d9\u05d5\u05d5\u05e7 B2B"} onError={(e: any) => { e.target.style.display = "none"; if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = "flex" }} />
              <div className="aith-hi__portrait-fallback" style={{ display: "none" }}>HY</div>
            </div>
            <div className="aith-hi__opcard">
              <div className="row"><span className="k">role</span><span className="v">Fractional CMO + builder</span></div>
              <div className="row"><span className="k">builds</span><span className="v">Agents · Strategies · Workflows</span></div>
              <div className="row"><span className="k">stack</span><span className="v">Claude Code, N8N, OPENCLAW</span></div>
              <div className="row"><span className="k">model</span><span className="v">Vibe Marketing</span></div>
            </div>
          </div>
          <div className="aith-hi__body aith-rv" style={{ transitionDelay: ".15s" }}>
            {/* HANITA-VERIFY: first line reconstructed from garbled OCR, please confirm wording */}
            <p>{"\u05d0\u05e0\u05d9 \u05d7\u05e0\u05d9\u05ea\u05d4 (\u05d9\u05d5\u05d3\u05d5\u05d1\u05e1\u05e7\u05d9, \u05d0\u05d1\u05dc \u05db\u05de\u05d5 \u05de\u05d3\u05d5\u05e0\u05d4 \u05d4\u05e9\u05dd \u05d4\u05e4\u05e8\u05d8\u05d9 \u05e9\u05dc\u05d9 \u05de\u05e1\u05e4\u05d9\u05e7 \ud83d\ude05), \u05e1\u05de\u05e0\u05db\"\u05dc\u05d9\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 \u05d1\u05de\u05d9\u05e7\u05d5\u05e8 \u05d7\u05d5\u05e5 \u05e9\u05d1\u05d5\u05e0\u05d4 \u05e2\u05dd "}<L>AI</L>{" \u05db\u05dc \u05d9\u05d5\u05dd."}</p>
            <p>{"\u05d6\u05d4 \u05dc\u05d0 \u05e9\u05d9\u05e8\u05d5\u05ea \u05e9\u05d0\u05e0\u05d9 \u05de\u05d5\u05e6\u05d9\u05d0\u05d4 \u05dc\u05de\u05d9\u05e7\u05d5\u05e8 \u05d7\u05d5\u05e5 \u05d0\u05d5 \u05d3\u05d1\u05e8\u05d9\u05dd \u05e9\u05dc\u05de\u05d3\u05ea\u05d9 \u05d1\u05e7\u05d5\u05e8\u05e1, "}<strong>{"\u05d0\u05e0\u05d9 \u05d4\u05d0\u05d5\u05e4\u05e8\u05d8\u05d5\u05e8\u05d9\u05ea"}</strong>{". \u05d0\u05e0\u05d9 \u05d1\u05d5\u05e0\u05d4 \u05e1\u05d5\u05db\u05e0\u05d9\u05dd \u05d1\u05e2\u05e6\u05de\u05d9, \u05d0\u05e0\u05d9 \u05d9\u05d5\u05e9\u05d1\u05ea \u05de\u05d5\u05dc "}<L>Claude Code</L>{", "}<L>N8N</L>{" \u05d5-"}<L>OPENCLAW</L>{" \u05d5\u05d0\u05e0\u05d9 \u05d6\u05d0\u05ea \u05e9\u05de\u05d0\u05e4\u05d9\u05d9\u05e0\u05ea \u05d5\u05de\u05ea\u05d7\u05d6\u05e7\u05ea. \u05d1\u05ea \u05d0\u05d3\u05dd \u05d0\u05d7\u05ea \u05e9\u05e2\u05d5\u05d1\u05d3\u05ea \u05d1\u05e7\u05e6\u05d1 \u05e9\u05dc \u05e6\u05d5\u05d5\u05ea \u05e9\u05dc\u05dd, \u05db\u05d9 \u05d4\u05e1\u05d5\u05db\u05e0\u05d9\u05dd \u05e9\u05dc\u05d9 \u05e2\u05d5\u05d1\u05d3\u05d9\u05dd \u05dc\u05e6\u05d9\u05d3\u05d9."}</p>
            <p>{"\u05d0\u05e0\u05d9 \u05d2\u05dd \u05de\u05e0\u05d7\u05d4 \u05d0\u05ea \u05d4\u05e4\u05d5\u05d3\u05e7\u05d0\u05e1\u05d8 \"\u05de\u05d4 \u05d4\u05e1\u05d9\u05e4\u05d5\u05e8 \u05e2\u05dd?\" \u05e9\u05d1\u05d5 \u05d0\u05e0\u05d7\u05e0\u05d5 \u05de\u05e4\u05e8\u05e7\u05d5\u05ea \u05d0\u05ea \u05de\u05d4 \u05e9\u05d1\u05d0\u05de\u05ea \u05e2\u05d5\u05d1\u05d3 \u05d1\u05e9\u05d9\u05d5\u05d5\u05e7 "}<L>B2B</L>{", \u05db\u05d5\u05dc\u05dc \u05d0\u05d9\u05da "}<L>AI</L>{" \u05de\u05e9\u05ea\u05dc\u05d1 \u05d1\u05dc\u05d9\u00a0\u05dc\u05d4\u05e4\u05d5\u05da\u00a0\u05d4\u05db\u05dc\u00a0\u05dc\u05de\u05dc\u05dc\u00a0\u05e8\u05d9\u05e7."}</p>
            {/* URLs pending: "linkedin" and "podcast" point to # placeholders until final links are confirmed */}
            <div className="aith-hi__links">
              <a href="#"><svg className="aith-hi__links-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.5 18H6V10h2.5v8zM7.25 8.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM18 18h-2.5v-4.25c0-.97-.78-1.75-1.75-1.75S12 12.78 12 13.75V18H9.5v-8H12v1c.41-.69 1.32-1.25 2.25-1.25 1.93 0 3.5 1.57 3.5 3.5V18z" /></svg>{"\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05e9\u05dc\u05d9 "}<span className="aith-arrow">{"←"}</span></a>
              <a href="#">{"\u05dc\u05e4\u05d5\u05d3\u05e7\u05d0\u05e1\u05d8 \"\u05de\u05d4 \u05d4\u05e1\u05d9\u05e4\u05d5\u05e8 \u05e2\u05dd?\" "}<span className="aith-arrow">{"←"}</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQItem: React.FC<{ num: string; q: React.ReactNode; a: React.ReactNode }> = ({ num, q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={"aith-faq__item" + (open ? " open" : "")}>
      <button className="aith-faq__q" onClick={() => setOpen((p) => !p)}>
        <span className="aith-faq__q-num">{num}</span>
        <span className="aith-faq__q-text">{q}</span>
        <span className="aith-faq__toggle">{open ? "×" : "+"}</span>
      </button>
      <div className="aith-faq__a">
        <div className="aith-faq__a-inner">{a}</div>
      </div>
    </div>
  )
}

function AIToolsFAQ() {
  const faqs: Array<{ num: string; q: React.ReactNode; a: React.ReactNode }> = [
    {
      num: "01",
      q: "\u05de\u05d4 \u05d6\u05d4 \u05e1\u05d5\u05db\u05df AI?",
      a: <>{"\u05e1\u05d5\u05db\u05df "}<L>AI</L>{" \u05d4\u05d5\u05d0 \u05ea\u05d5\u05db\u05e0\u05d4 \u05e9\u05e4\u05d5\u05e2\u05dc\u05ea \u05d1\u05d0\u05d5\u05e4\u05df \u05d0\u05d5\u05d8\u05d5\u05e0\u05d5\u05de\u05d9 \u05dc\u05e4\u05d9 \u05de\u05d8\u05e8\u05d5\u05ea \u05d5\u05db\u05dc\u05dc\u05d9\u05dd \u05e9\u05d0\u05ea\u05dd \u05e7\u05d5\u05d1\u05e2\u05d9\u05dd. \u05d4\u05d5\u05d0 \u05e2\u05d5\u05e7\u05d1 \u05d0\u05d7\u05e8\u05d9 \u05e0\u05ea\u05d5\u05e0\u05d9\u05dd, \u05de\u05d7\u05dc\u05d9\u05d8 \u05de\u05d4 \u05dc\u05e2\u05e9\u05d5\u05ea, \u05d5\u05de\u05d1\u05e6\u05e2. \u05d1\u05e0\u05d9\u05d2\u05d5\u05d3 \u05dc\u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8 \u05e9\u05de\u05d7\u05db\u05d4 \u05e9\u05ea\u05e9\u05d0\u05dc\u05d5 \u05e9\u05d0\u05dc\u05d4, \u05e1\u05d5\u05db\u05df \u05d9\u05d5\u05d6\u05dd \u05e4\u05e2\u05d5\u05dc\u05d5\u05ea \u05d1\u05e2\u05e6\u05de\u05d5."}</>,
    },
    {
      num: "02",
      q: "\u05de\u05d4 \u05d4\u05d4\u05d1\u05d3\u05dc \u05d1\u05d9\u05df \u05e1\u05d5\u05db\u05df AI \u05dc\u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8?",
      a: <>{"\u05e1\u05d5\u05db\u05df \u05e4\u05d5\u05e2\u05dc \u05d1\u05d0\u05d5\u05e4\u05df \u05d0\u05d5\u05d8\u05d5\u05e0\u05d5\u05de\u05d9. \u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8 \u05de\u05d2\u05d9\u05d1 \u05dc\u05e7\u05dc\u05d8. \u05e9\u05e0\u05d9\u05d4\u05dd \u05e9\u05d9\u05de\u05d5\u05e9\u05d9\u05d9\u05dd, \u05e4\u05d5\u05ea\u05e8\u05d9\u05dd \u05d1\u05e2\u05d9\u05d5\u05ea \u05e9\u05d5\u05e0\u05d5\u05ea. \u05e1\u05d5\u05db\u05df \u05d4\u05d5\u05d0 \u05d7\u05d1\u05e8 \u05e6\u05d5\u05d5\u05ea. \u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8 \u05d4\u05d5\u05d0 \u05db\u05dc\u05d9."}</>,
    },
    {
      num: "03",
      q: "\u05db\u05de\u05d4 \u05d6\u05de\u05df \u05dc\u05d5\u05e7\u05d7 \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8?",
      a: <>{"\u05e6'\u05d0\u05d8\u05d1\u05d5\u05d8, "}<L>GPT</L>{" \u05d0\u05d5 "}<L>Gem</L>{": \u05d9\u05d5\u05de\u05d9\u05d9\u05dd \u05e2\u05d1\u05d5\u05d3\u05d4 \u05db\u05d5\u05dc\u05dc \u05d0\u05d9\u05e4\u05d9\u05d5\u05df. \u05e1\u05d5\u05db\u05e0\u05d9\u05dd \u05d5\u05db\u05dc\u05d9 "}<L>AI</L>{" \u05de\u05d5\u05e8\u05db\u05d1\u05d9\u05dd: 2-6 \u05e9\u05d1\u05d5\u05e2\u05d5\u05ea. \u05ea\u05dc\u05d5\u05d9 \u05d1\u05de\u05d5\u05e8\u05db\u05d1\u05d5\u05ea, \u05d0\u05d1\u05dc \u05d0\u05d7\u05e8\u05d9 \u05e9\u05d9\u05d7\u05ea \u05d4\u05d9\u05db\u05e8\u05d5\u05ea \u05d0\u05e0\u05d9 \u05e0\u05d5\u05ea\u05e0\u05ea \u05d4\u05e2\u05e8\u05db\u05d4 \u05d1\u05e8\u05d5\u05e8\u05d4."}</>,
    },
    {
      num: "04",
      q: "\u05d0\u05e0\u05d9 \u05dc\u05d0 \u05d8\u05db\u05e0\u05d9. \u05d0\u05e0\u05d9 \u05d9\u05db\u05d5\u05dc\u00a0\u05dc\u05ea\u05d7\u05d6\u05e7\u00a0\u05d0\u05ea\u00a0\u05de\u05d4\u00a0\u05e9\u05e0\u05d1\u05e0\u05d4?",
      a: <>{"\u05d7\u05d3 \u05de\u05e9\u05de\u05e2\u05d9 \u05db\u05df. \u05d4\u05db\u05dc \u05de\u05d2\u05d9\u05e2 \u05e2\u05dd \u05d4\u05d3\u05e8\u05db\u05d4 \u05d5\u05ea\u05d9\u05e2\u05d5\u05d3. \u05d0\u05dd \u05d0\u05ea\u05dd \u05d9\u05d5\u05d3\u05e2\u05d9\u05dd \u05dc\u05e2\u05d1\u05d5\u05d3 \u05e2\u05dd \u05d0\u05e7\u05e1\u05dc, \u05d0\u05ea\u05dd \u05d9\u05db\u05d5\u05dc\u05d9\u05dd\u00a0\u05dc\u05ea\u05d7\u05d6\u05e7\u00a0\u05d0\u05ea\u00a0\u05d4\u05db\u05dc\u05d9\u05dd\u00a0\u05d4\u05d0\u05dc\u05d4."}</>,
    },
    {
      num: "05",
      q: "\u05d0\u05e4\u05e9\u05e8 \u05dc\u05d7\u05d1\u05e8 \u05d0\u05ea \u05d4\u05db\u05dc\u05d9\u05dd \u05dc\u05de\u05e2\u05e8\u05db\u05d5\u05ea \u05e9\u05db\u05d1\u05e8 \u05d9\u05e9 \u05dc\u05d9?",
      a: <>{"\u05db\u05df. \u05d0\u05dd \u05d9\u05e9 "}<L>API</L>{", \u05d0\u05e4\u05e9\u05e8 \u05dc\u05d7\u05d1\u05e8. "}<L>CRM</L>{", \u05de\u05e2\u05e8\u05db\u05d5\u05ea \u05de\u05d9\u05d9\u05dc, \u05db\u05dc\u05d9 \u05ea\u05d6\u05de\u05d5\u05df, \u05de\u05d4 \u05e9\u05e8\u05e5 \u05d0\u05e6\u05dc\u05db\u05dd."}</>,
    },
    {
      num: "06",
      q: "\u05de\u05d4 \u05dc\u05d2\u05d1\u05d9 \u05d0\u05d1\u05d8\u05d7\u05ea \u05de\u05d9\u05d3\u05e2?",
      a: <>{"\u05d0\u05e0\u05d9 \u05d1\u05d5\u05e0\u05d4 \u05dc\u05e4\u05d9 "}<L>best practices</L>{" \u05d5\u05e2\u05d5\u05e9\u05d4 \u05db\u05dc \u05de\u05d4 \u05e9\u05d0\u05e4\u05e9\u05e8 \u05db\u05d3\u05d9 \u05dc\u05d4\u05d2\u05df \u05e2\u05dc \u05d4\u05de\u05d9\u05d3\u05e2 \u05e9\u05dc\u05db\u05dd. \u05e2\u05dd \u05d6\u05d0\u05ea, \u05d0\u05e0\u05d9 \u05dc\u05d0 \u05de\u05d5\u05de\u05d7\u05d9\u05ea \u05d0\u05d1\u05d8\u05d7\u05ea \u05de\u05d9\u05d3\u05e2. \u05d0\u05dd \u05d9\u05e9 \u05dc\u05db\u05dd \u05de\u05e2\u05e8\u05db\u05d5\u05ea \u05d0\u05e8\u05d2\u05d5\u05e0\u05d9\u05d5\u05ea \u05de\u05d5\u05e8\u05db\u05d1\u05d5\u05ea \u05e2\u05dd \u05d3\u05e8\u05d9\u05e9\u05d5\u05ea "}<L>compliance</L>{" \u05e1\u05e4\u05e6\u05d9\u05e4\u05d9\u05d5\u05ea ("}<L>SOC 2</L>{", "}<L>ISO</L>{", "}<L>GDPR</L>{" \u05de\u05ea\u05e7\u05d3\u05dd), \u05db\u05d3\u05d0\u05d9 \u05dc\u05e2\u05e8\u05d1 \u05d0\u05ea \u05e6\u05d5\u05d5\u05ea \u05d4\u05d0\u05d1\u05d8\u05d7\u05d4 \u05e9\u05dc\u05db\u05dd \u05d1\u05ea\u05d4\u05dc\u05d9\u05da, \u05d0\u05d5 \u05dc\u05e2\u05d1\u05d5\u05d3 \u05de\u05d5\u05dc \u05e1\u05e4\u05e7 \u05e2\u05dd \u05d4\u05ea\u05de\u05d7\u05d5\u05ea \u05d1\u05d0\u05d1\u05d8\u05d7\u05d4 \u05d0\u05e8\u05d2\u05d5\u05e0\u05d9\u05ea. \u05d0\u05e0\u05d9 \u05d0\u05d5\u05de\u05e8\u05ea \u05d0\u05ea \u05d6\u05d4 \u05de\u05e8\u05d0\u05e9 \u05db\u05d3\u05d9 \u05e9\u05db\u05d5\u05dc\u05dd\u00a0\u05d9\u05d4\u05d9\u05d5\u00a0\u05e2\u05dc\u00a0\u05d0\u05d5\u05ea\u05d5\u00a0\u05d3\u05e3."}</>,
    },
    {
      num: "07",
      q: "\u05de\u05d4 \u05d6\u05d4 \u05d5\u05d5\u05d9\u05d1 \u05e7\u05d5\u05d3\u05d9\u05e0\u05d2?",
      a: <>{"\u05d1\u05e0\u05d9\u05d9\u05d4 \u05de\u05d4\u05d9\u05e8\u05d4 \u05e9\u05dc \u05e0\u05db\u05e1\u05d9\u05dd \u05d3\u05d9\u05d2\u05d9\u05d8\u05dc\u05d9\u05d9\u05dd \u05e2\u05dd \u05db\u05dc\u05d9 "}<L>AI</L>{". \u05d1\u05de\u05e7\u05d5\u05dd \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd \u05e9\u05dc \u05e4\u05d9\u05ea\u05d5\u05d7, \u05e0\u05d1\u05e0\u05d4 \u05d3\u05e3 \u05e0\u05d7\u05d9\u05ea\u05d4,\u00a0\u05db\u05dc\u05d9\u00a0\u05d0\u05d9\u05e0\u05d8\u05e8\u05d0\u05e7\u05d8\u05d9\u05d1\u05d9\u00a0\u05ea\u05d5\u05da\u00a0\u05d9\u05de\u05d9\u05dd."}</>,
    },
  ]
  return (
    <section className="aith-section aith-section--paper">
      <div className="aith-container aith-container--narrow">
        <span className="aith-sec-eyebrow aith-rv"><span className="num">07</span>Command Palette</span>
        <h2 className="aith-sec-h aith-rv">{"\u05e9\u05d0\u05dc\u05d5\u05ea "}<span className="aith-accent">{"\u05e0\u05e4\u05d5\u05e6\u05d5\u05ea"}</span></h2>

        <div className="aith-faq__list aith-rv">
          {faqs.map((f) => <FAQItem key={f.num} num={f.num} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function AIToolsFinal() {
  return (
    <section className="aith-section aith-final" id="contact">
      <div className="aith-container aith-final__inner">
        <div className="aith-rv">
          <span className="aith-final__prompt">$ ./book-discovery-call --free</span>
        </div>
        <h2 className="aith-final__h aith-rv" style={{ transitionDelay: ".1s" }}>{"\u05e8\u05d5\u05e6\u05d9\u05dd \u05dc\u05d2\u05e9\u05e9 "}<br /><span className="aith-accent">{"\u05dc\u05e4\u05e0\u05d9 \u05e9\u05de\u05ea\u05d7\u05d9\u05d9\u05d1\u05d9\u05dd?"}</span></h2>
        <p className="aith-final__sub aith-rv" style={{ transitionDelay: ".2s" }}>
          {"\u05d1\u05e0\u05d9\u05ea\u05d9 \u05db\u05dc\u05d9 \u05d7\u05d9\u05e0\u05de\u05d9 \u05e9\u05d9\u05e2\u05d6\u05d5\u05e8 \u05dc\u05db\u05dd \u05dc\u05d9\u05d9\u05e6\u05e8 \u05e4\u05e8\u05d5\u05de\u05e4\u05d8 \u05de\u05d3\u05d5\u05d9\u05e7 \u05dc\u05d3\u05e3 \u05d4\u05e0\u05d7\u05d9\u05ea\u05d4 \u05d0\u05d5 \u05d4\u05de\u05d5\u05e6\u05e8 \u05d4\u05d3\u05d9\u05d2\u05d9\u05d8\u05dc\u05d9 \u05e9\u05dc\u05db\u05dd, \u05d1\u05e4\u05d7\u05d5\u05ea \u05de-3 \u05d3\u05e7\u05d5\u05ea. \u05de\u05db\u05e0\u05d9\u05e1\u05d9\u05dd \u05d0\u05ea \u05d4\u05e4\u05e8\u05d8\u05d9\u05dd, \u05de\u05e7\u05d1\u05dc\u05d9\u05dd \u05e4\u05e8\u05d5\u05de\u05e4\u05d8 \u05e9\u05d0\u05e4\u05e9\u05e8 \u05dc\u05d4\u05d3\u05d1\u05d9\u05e7 \u05d9\u05e9\u05d9\u05e8\u05d5\u05ea \u05dc\u05e7\u05dc\u05d5\u05d3 "}<L>BASE 44</L>{"\u00a0\u05d0\u05d5\u00a0"}<L>LOVABLE</L>{",\u00a0\u05d5\u05de\u05ea\u05d7\u05d9\u05dc\u05d9\u05dd."}
        </p>
        <div className="aith-final__cta aith-rv" style={{ transitionDelay: ".28s" }}>
          {/* URL pending: "free tool" link points to # placeholder until the free tool URL is confirmed */}
          <a className="aith-btn aith-btn--lime" href="#" style={{ color: "var(--purple)" }}>
            {"\u05dc\u05db\u05dc\u05d9 \u05d4\u05d7\u05d9\u05e0\u05de\u05d9"}
            <span className="aith-arrow">{"←"}</span>
          </a>
        </div>
        <div className="aith-final__divider aith-rv" style={{ transitionDelay: ".34s" }}>
          <p className="aith-final__split">{"\u05dc\u05d0 \u05de\u05e1\u05d5\u05d2\u05dc\u05d9\u05dd \u05dc\u05d1\u05d3, \u05d0\u05d5 \u05e9\u05d0\u05ea\u05dd \u05e4\u05e9\u05d5\u05d8 \u05e8\u05d5\u05e6\u05d9\u05dd \u05e9\u05de\u05d9\u05e9\u05d4\u05d5 \u05d9\u05e2\u05e9\u05d4 \u05d0\u05ea \u05d6\u05d4 \u05e0\u05db\u05d5\u05df \u05de\u05d4\u05e4\u05e2\u05dd \u05d4\u05e8\u05d0\u05e9\u05d5\u05e0\u05d4?"}</p>
          <div className="aith-final__cta" style={{ marginTop: 0 }}>
            <a className="aith-btn aith-btn--ghost-light" href="https://calendar.notion.so/meet/octaloom/discovery" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-discovery")) }}>
              {"\u05dc\u05e9\u05d9\u05d7\u05ea \u05d4\u05d9\u05db\u05e8\u05d5\u05ea"}
              <span className="aith-arrow">{"←"}</span>
            </a>
          </div>
        </div>
        <p className="aith-final__small aith-rv" style={{ transitionDelay: ".4s" }}>
          {/* URLs pending: fractional-cmo + linkedin links use # placeholders until final HE slugs are confirmed */}
          <span>{"\u05e2\u05d3\u05d9\u05d9\u05df \u05dc\u05d0 \u05d1\u05d8\u05d5\u05d7\u05d9\u05dd? \u05e6\u05e8\u05d9\u05db\u05d9\u05dd \u05d4\u05d5\u05d1\u05dc\u05d4 \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05ea \u05de\u05dc\u05d0\u05d4?"}</span>
          <a href="#">{"\u05e1\u05de\u05e0\u05db\"\u05dc\u05d9\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 \u05d1\u05de\u05d9\u05e7\u05d5\u05e8 \u05d7\u05d5\u05e5 "}<span className="aith-arrow">{"←"}</span></a>
          <a href="#">{"\u05dc\u05e9\u05d9\u05e8\u05d5\u05ea\u05d9 \u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df "}<span className="aith-arrow">{"←"}</span></a>
        </p>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function SiteFooter() {
  const w = useWindowWidth(), isMobile = w < 540
  const pageLinks = [
    { label: "\u05d3\u05e3 \u05d4\u05d1\u05d9\u05ea", href: "https://www.octaloom.com/" },
    { label: "\u05d0\u05d5\u05d3\u05d5\u05ea", href: "https://www.octaloom.com/about-he" },
    { label: "\u05d1\u05dc\u05d5\u05d2", href: "https://www.octaloom.com/blog" },
    { label: "\u05e6\u05e8\u05d5 \u05e7\u05e9\u05e8", href: "#contact" },
  ]
  const svcLinks = [
    { label: "\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05d0\u05e8\u05d2\u05d5\u05e0\u05d9\u05dd", href: "https://www.octaloom.com/linkedin-for-organizations-he" },
    { label: "\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05de\u05e0\u05d4\u05dc\u05d9\u05dd", href: "https://www.octaloom.com/linkedin-for-executives-he" },
    { label: "\u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df \u05dc\u05e2\u05e6\u05de\u05d0\u05d9\u05d9\u05dd", href: "https://www.octaloom.com/linkedin-for-solopreneurs-he" },
  ]
  const otherLinks = [
    { label: "\u05e1\u05de\u05e0\u05db\"\u05dc\u05d9\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 \u05d1\u05de\u05d9\u05e7\u05d5\u05e8 \u05d7\u05d5\u05e5", href: "https://www.octaloom.com/fractional-cmo-he", nowrap: true },
    { label: "\u05db\u05dc\u05d9 AI \u05d5\u05e1\u05d5\u05db\u05e0\u05d9\u05dd", href: "https://www.octaloom.com/ai-tools-agents-he" },
    { label: "\u05e1\u05d3\u05e0\u05d0\u05d5\u05ea", href: "https://www.octaloom.com/workshops-he" },
  ]
  const legalLinks = [
    { label: "\u05e4\u05e8\u05d8\u05d9\u05d5\u05ea", href: "https://www.octaloom.com/privacy-policy-he" },
    { label: "\u05ea\u05e0\u05d0\u05d9 \u05e9\u05d9\u05de\u05d5\u05e9", href: "https://www.octaloom.com/terms-he" },
    { label: "\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea", href: "https://www.octaloom.com/accessibility-he" },
  ]
  const socials = [
    { href: "https://www.linkedin.com/in/hanita-yudovski/", label: "LinkedIn",
      icon: <svg viewBox="0 0 24 24"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.5 18H6V10h2.5v8zM7.25 8.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM18 18h-2.5v-4.25c0-.97-.78-1.75-1.75-1.75S12 12.78 12 13.75V18H9.5v-8H12v1c.41-.69 1.32-1.25 2.25-1.25 1.93 0 3.5 1.57 3.5 3.5V18z" /></svg> },
    { href: "https://www.instagram.com/hanita_Y", label: "Instagram",
      icon: <svg viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.23.41a3.7 3.7 0 011.38.9c.43.42.7.83.9 1.37.16.42.36 1.06.4 2.23.07 1.27.08 1.65.08 4.85s0 3.58-.07 4.85a6.5 6.5 0 01-.41 2.23 3.97 3.97 0 01-2.28 2.28c-.42.16-1.06.36-2.23.4-1.27.07-1.65.08-4.85.08s-3.58 0-4.85-.07a6.5 6.5 0 01-2.23-.41 3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.37 6.5 6.5 0 01-.4-2.23c-.07-1.27-.08-1.65-.08-4.85s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.2-.54.47-.95.9-1.38a3.7 3.7 0 011.37-.9c.42-.16 1.06-.36 2.23-.4 1.27-.07 1.65-.08 4.85-.08zM12 0C8.74 0 8.33 0 7.05.07 5.77.13 4.9.33 4.14.63a5.92 5.92 0 00-2.13 1.4A5.92 5.92 0 00.6 4.14 8.6 8.6 0 00.07 7.05C0 8.33 0 8.74 0 12s0 3.67.07 4.95c.06 1.28.26 2.15.56 2.91a5.92 5.92 0 001.4 2.13 5.92 5.92 0 002.13 1.4c.76.3 1.63.5 2.91.56 1.28.07 1.69.07 4.95.07s3.67 0 4.95-.07a8.6 8.6 0 002.91-.56 5.92 5.92 0 002.13-1.4 5.92 5.92 0 001.4-2.13c.3-.76.5-1.63.56-2.91.07-1.28.07-1.69.07-4.95s0-3.67-.07-4.95a8.6 8.6 0 00-.56-2.91 5.92 5.92 0 00-1.4-2.13A5.92 5.92 0 0019.86.6 8.6 8.6 0 0016.95.07C15.67 0 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /></svg> },
    { href: "https://www.facebook.com/octaloom", label: "Facebook",
      icon: <svg viewBox="0 0 24 24"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.5h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.61 23.1 24 18.1 24 12.07z" /></svg> },
    { href: "https://www.youtube.com/@Hanita_Octaloom", label: "YouTube",
      icon: <svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 00-2.12-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.52A3 3 0 00.5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3 3 0 002.12 2.13C4.5 20.45 12 20.45 12 20.45s7.5 0 9.38-.52A3 3 0 0023.5 17.8C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.6 15.6V8.4l6.24 3.6L9.6 15.6z" /></svg> },
    { href: "https://open.spotify.com/show/4XmsthqR7gnj4nf2gL0T7j", label: "Spotify",
      icon: <svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.5 17.34a.75.75 0 01-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 11-.34-1.46c4.58-1.04 8.51-.59 11.67 1.34.36.22.47.68.25 1.03zm1.47-3.27a.94.94 0 01-1.29.31c-3.23-1.98-8.16-2.56-11.98-1.4a.94.94 0 11-.55-1.8c4.37-1.32 9.81-.67 13.51 1.6.45.28.59.86.31 1.29zm.13-3.4c-3.87-2.3-10.27-2.51-13.97-1.39a1.13 1.13 0 11-.65-2.16C8.74 5.85 15.81 6.1 20.27 8.75a1.13 1.13 0 11-1.17 1.92z" /></svg> },
  ]

  return (
    <footer className="aith-footer">
      <div className="aith-container">
        <div className="aith-footer__grid">
          <div className="aith-footer__brand aith-footer__col">
            <img className="aith-footer__logo" src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png" alt="OctaLoom" onError={(e: any) => { e.target.style.display = "none" }} />
            <div className="aith-footer__tag">{"\u05de\u05d7\u05dc\u05e7\u05ea \u05d4\u05e9\u05d9\u05d5\u05d5\u05e7 \u05e9\u05dc\u05da,"}<br />{"\u05e8\u05e7 \u05d1\u05dc\u05d9 \u05d4\u05de\u05d7\u05dc\u05e7\u05d4."}</div>
          </div>

          {!isMobile && (
            <div className="aith-footer__col">
              <div className="aith-footer__col-h">{"\u05e2\u05de\u05d5\u05d3\u05d9\u05dd"}</div>
              <ul>{pageLinks.map((l, i) => <li key={i}><a href={l.href}>{l.label}</a></li>)}</ul>
            </div>
          )}
          {!isMobile && (
            <div className="aith-footer__col">
              <div className="aith-footer__col-h">{"\u05e9\u05d9\u05e8\u05d5\u05ea\u05d9 \u05dc\u05d9\u05e0\u05e7\u05d3\u05d0\u05d9\u05df"}</div>
              <ul>{svcLinks.map((l, i) => <li key={i}><a href={l.href}>{l.label}</a></li>)}</ul>
            </div>
          )}
          {!isMobile && (
            <div className="aith-footer__col">
              <div className="aith-footer__col-h">{"\u05e9\u05d9\u05e8\u05d5\u05ea\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd"}</div>
              <ul>{otherLinks.map((l, i) => <li key={i}><a href={l.href} style={l.nowrap ? { whiteSpace: "nowrap" } : undefined}>{l.label}</a></li>)}</ul>
            </div>
          )}
          {!isMobile && (
            <div className="aith-footer__col aith-footer__col--goodies">
              <div className="aith-footer__goodies-h">{"\u05db\u05dc\u05d9\u05dd \u05d5\u05ea\u05d1\u05e0\u05d9\u05d5\u05ea"}<br />{"\u05e9\u05d9\u05d5\u05d5\u05e7 \u05d7\u05d9\u05e0\u05de\u05d9\u05d9\u05dd"}</div>
              <a className="aith-footer__goodies-logo" href="https://octagoodies.com" target="_blank" rel="noopener noreferrer" aria-label="OctaGoodies">
                <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/OCTAGOODIES%20GREEN.png" alt="OctaGoodies" onError={(e: any) => { e.target.style.display = "none" }} />
              </a>
            </div>
          )}

          <div className="aith-footer__col aith-footer__col--socials">
            {!isMobile && <div className="aith-footer__col-h">{"\u05e2\u05e7\u05d1\u05d5"}</div>}
            <div className="aith-footer__socials">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="aith-footer__bottom">
          <span>{"© 2026 OctaLoom · \u05db\u05dc \u05d4\u05d6\u05db\u05d5\u05d9\u05d5\u05ea \u05e9\u05de\u05d5\u05e8\u05d5\u05ea"}</span>
          <div className="aith-footer__legal">
            {legalLinks.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//   DEFAULT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export default function AIToolsAgentsHE() {
  useGlobalStyles()
  useReveal()
  return (
    <div className="aith-page" dir="rtl" lang="he" style={{ fontFamily: "'Discovery Fs', 'Discovery', sans-serif" }}>
      <SiteNavbar />
      <AIToolsHero />
      <AIToolsIntro />
      <AIToolsExplain />
      <AIToolsApps />
      <AIToolsHow />
      <AIToolsBuilt />
      <AIToolsQuote />
      <AIToolsHanita />
      <AIToolsFAQ />
      <div className="aith-endzone">
        <AIToolsFinal />
        <SiteFooter />
      </div>
    </div>
  )
}
