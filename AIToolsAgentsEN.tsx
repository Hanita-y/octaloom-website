// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

import * as React from "react"
const { useState, useEffect, useRef } = React
import { motion, AnimatePresence } from "framer-motion"

// ─── Language ─────────────────────────────────────────────────────────────────
const LANG = "en"

// ─── Styles injection ─────────────────────────────────────────────────────────
function useGlobalStyles() {
  useEffect(() => {
    const id = "aitools-en-styles"
    if (document.getElementById(id)) return
    const s = document.createElement("style")
    s.id = id
    s.textContent = `
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Regular.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Bold.ttf') format('truetype');font-weight:700;font-style:normal;font-display:swap}
.ait-page{--purple:#712eac;--deep-purple:#201e4b;--navy:#060d3d;--ink:#1c1a3c;--lime:#c5e6a2;--lime-2:#c6e1a5;--cream:#ece9e7;--cream-deep:#d8d0c4;--warm-white:#f7f5f2;--paper:#f3efe9;--surface:#ece9e8;--rule:rgba(255,255,255,0.10);--rule-dark:rgba(28,26,60,0.14);--rule-soft:rgba(28,26,60,0.06);--text-dark:#201e4b;--text-mid:#3d3a5c;--text-soft:#6b6680;--font-sans:'Aeonik',system-ui,sans-serif;--font-mono:ui-monospace,'SF Mono',Menlo,monospace}
.ait-page *,.ait-page *::before,.ait-page *::after{margin:0;padding:0;box-sizing:border-box}
.ait-page{font-family:var(--font-sans);background:var(--cream);color:var(--ink);line-height:1.6;overflow-x:hidden;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.ait-page a{color:inherit;text-decoration:none}
.ait-page button{font-family:inherit;border:none;background:none;cursor:pointer;color:inherit}
.ait-page img{display:block;max-width:100%}
.ait-page p,.ait-page li,.ait-sec-lede,.ait-intro__text,.ait-appwin__tag,.ait-appwin__foot,.ait-appwin__callout,.ait-hero__sub,.ait-final__sub,.ait-final__small,.ait-footer__tag,.ait-how__card p,.ait-hi__body p,.ait-appwin__list li > div,.ait-quote__text,.ait-faq__a,.ait-built__stat p{text-wrap:pretty}
.ait-container{max-width:1200px;margin:0 auto;padding:0 clamp(20px,5vw,56px)}
.ait-container--narrow{max-width:920px;margin:0 auto;padding:0 clamp(20px,5vw,56px)}
.ait-rv{opacity:0;transform:translateY(28px);transition:opacity 0.9s cubic-bezier(.16,1,.3,1),transform 0.9s cubic-bezier(.16,1,.3,1),filter 0.9s cubic-bezier(.16,1,.3,1)}
.ait-rv.in{opacity:1!important;transform:translateY(0)!important;filter:none!important}
.ait-rv--right{transform:translateX(32px)}
.ait-rv--right.in{transform:translateX(0)!important}
.ait-rv--left{transform:translateX(-32px)}
.ait-rv--left.in{transform:translateX(0)!important}
.ait-btn{display:inline-flex;align-items:center;gap:10px;padding:16px 28px;border-radius:100px;font-size:14px;font-weight:700;letter-spacing:0.01em;transition:transform 0.2s,box-shadow 0.2s,background 0.2s,color 0.2s;cursor:pointer;border:1px solid transparent}
.ait-btn--lime{background:var(--lime);color:var(--ink)}
.ait-btn--lime:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(197,230,162,0.5)}
.ait-hero .ait-btn--lime{color:var(--purple)}
.ait-btn--ghost-light{background:transparent;color:var(--cream);border-color:rgba(255,255,255,0.2)}
.ait-btn--ghost-light:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.4)}
.ait-btn .ait-arrow{transition:transform 0.25s}
.ait-btn:hover .ait-arrow{transform:translateX(4px)}
.ait-hero{position:relative;padding:clamp(140px,16vw,200px) 0 clamp(80px,11vw,140px);background:linear-gradient(180deg,#0a0a23 0%,#1c1a3c 60%,#201e4b 100%);color:var(--cream);overflow:hidden}
.ait-hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(197,230,162,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(197,230,162,0.05) 1px,transparent 1px);background-size:44px 44px;pointer-events:none;mask-image:radial-gradient(85% 70% at 50% 38%,#000,transparent 82%);-webkit-mask-image:radial-gradient(85% 70% at 50% 38%,#000,transparent 82%);animation:aitGridDrift 32s linear infinite}
@keyframes aitGridDrift{to{background-position:44px 44px}}
.ait-hero::after{content:'';position:absolute;width:640px;height:640px;top:-220px;right:-200px;background:radial-gradient(circle,rgba(197,230,162,0.16),transparent 65%);pointer-events:none;filter:blur(60px)}
.ait-hero__inner{position:relative;z-index:2}
.ait-hero__label{display:inline-flex;align-items:center;gap:10px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--lime);font-weight:700;padding:8px 14px;border:1px solid rgba(197,230,162,0.3);border-radius:100px;background:rgba(197,230,162,0.05)}
.ait-hero__label .ait-pulse{width:6px;height:6px;border-radius:50%;background:var(--lime);animation:aitPulse 1.4s ease infinite}
@keyframes aitPulse{0%,100%{opacity:0.4;transform:scale(0.85)}50%{opacity:1;transform:scale(1)}}
.ait-hero__grid{margin-top:28px;display:grid;grid-template-columns:1.05fr 1fr;gap:clamp(32px,5vw,64px);align-items:center}
.ait-hero__grid > *{min-width:0}
.ait-hero__h1{font-size:clamp(34px,5.2vw,66px);font-weight:700;line-height:1.06;letter-spacing:-0.032em;color:var(--cream)}
.ait-hero__h1 .ait-accent{color:var(--lime)}
.ait-hero__sub{margin-top:24px;font-size:clamp(15px,1.4vw,17px);line-height:1.65;color:rgba(236,233,231,0.74);max-width:540px}
.ait-hero__sub+.ait-hero__sub{margin-top:16px}
.ait-hero__sub strong{color:var(--cream);font-weight:700}
.ait-hero__cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px}
.ait-boot{position:relative;width:100%;max-width:100%;min-width:0;background:#0d0d24;border:1px solid rgba(197,230,162,0.2);border-radius:14px;overflow:hidden;font-family:var(--font-mono);font-size:12.5px;line-height:1.6;color:#cfd0e0;box-shadow:0 24px 70px rgba(0,0,0,0.5)}
.ait-boot__bar{display:flex;align-items:center;gap:6px;padding:10px 14px;background:rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.06)}
.ait-win-dot{width:11px;height:11px;border-radius:50%}
.ait-win-dot--r{background:#ff5f56}
.ait-win-dot--y{background:#ffbd2e}
.ait-win-dot--g{background:#27c93f}
.ait-boot__title{margin-left:auto;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.5)}
.ait-boot__body{padding:18px 20px 20px;min-height:372px}
.ait-boot__line{margin-bottom:5px;white-space:nowrap;overflow:hidden}
.ait-boot__prompt{color:var(--lime)}
.ait-boot__path{color:rgba(207,208,224,0.55);margin-right:6px}
.ait-boot__cmd{color:var(--cream)}
.ait-boot__out{color:rgba(207,208,224,0.7);margin-left:14px}
.ait-boot__check{color:var(--lime);margin-right:8px}
.ait-boot__warn{color:#ffbd2e;margin-right:8px}
.ait-boot__caret{display:inline-block;width:7px;height:1em;background:var(--lime);vertical-align:-2px;animation:aitBlink 1s steps(2) infinite}
@keyframes aitBlink{50%{opacity:0}}
.ait-boot__hidden{opacity:0}
.ait-boot__dash{margin-top:14px;padding-top:14px;border-top:1px dashed rgba(197,230,162,0.22);display:grid;grid-template-columns:1fr 1fr;gap:8px;opacity:0;transition:opacity 0.6s ease}
.ait-boot__dash.in{opacity:1}
.ait-boot__node{padding:10px 11px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:7px}
.ait-boot__node .k{font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:var(--lime);margin-bottom:4px}
.ait-boot__node .v{font-size:11px;color:var(--cream)}
@media (max-width:980px){.ait-hero__grid{grid-template-columns:1fr;margin-top:22px}.ait-boot__line{white-space:normal;overflow-wrap:anywhere}.ait-boot__out{margin-left:0;display:inline}.ait-boot__body{padding:16px 16px 18px;min-height:0}.ait-boot{font-size:11.5px}.ait-boot__dash{grid-template-columns:1fr 1fr}.ait-boot__node{padding:9px 10px}}
.ait-section{padding:clamp(80px,11vw,140px) 0;position:relative}
.ait-section--cream{background:var(--cream)}
.ait-section--paper{background:var(--paper)}
.ait-section--ink{background:var(--ink);color:var(--cream)}
.ait-section--lime{background:var(--lime);color:var(--ink)}
.ait-sec-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;color:var(--purple);padding:6px 12px;border:1px solid rgba(113,46,172,0.2);border-radius:100px;background:rgba(113,46,172,0.04);margin-bottom:24px}
.ait-section--ink .ait-sec-eyebrow,.ait-apps .ait-sec-eyebrow,.ait-built .ait-sec-eyebrow{color:var(--lime);border-color:rgba(197,230,162,0.25);background:rgba(197,230,162,0.06)}
.ait-sec-eyebrow .num{font-family:var(--font-mono);font-weight:400;opacity:0.7}
.ait-sec-h{font-size:clamp(28px,4.2vw,52px);line-height:1.08;letter-spacing:-0.025em;font-weight:700;max-width:900px}
.ait-sec-h .ait-accent{color:var(--purple)}
.ait-section--ink .ait-sec-h,.ait-apps .ait-sec-h,.ait-built .ait-sec-h{color:var(--cream)}
.ait-section--ink .ait-sec-h .ait-accent,.ait-apps .ait-sec-h .ait-accent,.ait-built .ait-sec-h .ait-accent{color:var(--lime)}
.ait-sec-lede{font-size:clamp(15px,1.3vw,18px);line-height:1.6;color:var(--text-mid);max-width:720px;margin-top:20px}
.ait-section--ink .ait-sec-lede,.ait-apps .ait-sec-lede,.ait-built .ait-sec-lede{color:rgba(236,233,231,0.72)}
.ait-sec-lede__line2{display:block;margin-top:4px;font-weight:700;color:var(--lime)}
.ait-intro{background:var(--cream);padding:clamp(64px,9vw,110px) 0}
.ait-intro__card{background:var(--warm-white);border:1px solid var(--rule-dark);border-radius:16px;padding:clamp(32px,5vw,56px);position:relative;overflow:hidden}
.ait-intro__card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--purple),var(--lime))}
.ait-intro__bar{display:flex;align-items:center;gap:6px;margin-bottom:22px}
.ait-intro__tag{margin-left:auto;font-family:var(--font-mono);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--text-soft)}
.ait-intro__text{font-size:clamp(17px,1.9vw,22px);line-height:1.6;color:var(--text-dark);font-weight:400}
.ait-intro__text strong{color:var(--purple);font-weight:700}
.ait-apps{background:var(--ink);color:var(--cream)}
.ait-apps__grid{margin-top:clamp(40px,5vw,60px);display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,2.6vw,28px)}
.ait-apps__grid > *{min-width:0}
.ait-appwin{background:#11102b;border:1px solid var(--rule);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;transition:transform 0.5s cubic-bezier(.16,1,.3,1),box-shadow 0.5s,border-color 0.4s,opacity 0.6s;opacity:0;transform:translateY(34px) scale(0.97)}
.ait-appwin.boot-in{opacity:1;transform:translateY(0) scale(1)}
.ait-appwin:hover{transform:translateY(-5px);box-shadow:0 26px 60px rgba(0,0,0,0.4);border-color:rgba(197,230,162,0.4)}
.ait-appwin__bar{display:flex;align-items:center;gap:6px;padding:11px 15px;background:rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.06)}
.ait-appwin__name{margin-left:10px;font-family:var(--font-mono);font-size:11px;letter-spacing:0.06em;color:rgba(236,233,231,0.7)}
.ait-appwin__tier{margin-left:auto;font-family:var(--font-mono);font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:var(--lime);padding:3px 8px;background:rgba(197,230,162,0.08);border-radius:100px}
.ait-appwin__body{padding:clamp(24px,3vw,34px);display:flex;flex-direction:column;flex:1}
.ait-appwin__no{font-family:var(--font-mono);font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,230,162,0.7);margin-bottom:12px}
.ait-appwin h3{font-size:clamp(22px,2.3vw,28px);font-weight:700;letter-spacing:-0.02em;color:var(--cream);margin-bottom:4px}
.ait-appwin__tag{font-size:14px;line-height:1.55;color:var(--lime);font-weight:700;margin-bottom:14px}
.ait-appwin__body p{font-size:14px;line-height:1.68;color:rgba(236,233,231,0.74);margin-bottom:14px}
.ait-appwin__lead{font-family:var(--font-mono);font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:rgba(236,233,231,0.5);margin:6px 0 12px}
.ait-appwin__list{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:14px}
.ait-appwin__list li{display:flex;gap:11px;font-size:13.5px;line-height:1.55;color:rgba(236,233,231,0.82)}
.ait-appwin__list li::before{content:'\\25B8';flex-shrink:0;color:var(--lime);font-size:11px;margin-top:2px}
.ait-appwin__list li > div{min-width:0;text-wrap:pretty}
.ait-appwin__list li .lead{color:var(--lime);font-weight:700}
.ait-appwin__foot{padding-top:16px;border-top:1px dashed rgba(197,230,162,0.2);font-size:13px;line-height:1.6;color:rgba(236,233,231,0.6)}
.ait-appwin__callout{margin-top:14px;padding:16px 18px;background:rgba(197,230,162,0.08);border:1px solid rgba(197,230,162,0.28);border-radius:10px;font-size:13px;line-height:1.62;color:rgba(236,233,231,0.86)}
.ait-appwin__callout strong{color:var(--lime);font-weight:700}
.ait-appwin__more{margin-top:auto}
.ait-appwin__reveal{display:flex;align-items:center;gap:10px;width:100%;margin-top:16px;padding:12px 15px;background:rgba(197,230,162,0.06);border:1px solid rgba(197,230,162,0.26);border-radius:10px;font-family:var(--font-mono);text-align:left;transition:background 0.25s,border-color 0.25s}
.ait-appwin__reveal:hover{background:rgba(197,230,162,0.12);border-color:rgba(197,230,162,0.5)}
.ait-appwin__reveal-ic{width:18px;height:18px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--lime);font-size:13px;line-height:1;transition:transform 0.35s cubic-bezier(.16,1,.3,1)}
.ait-appwin__reveal[aria-expanded="true"] .ait-appwin__reveal-ic{transform:rotate(45deg)}
.ait-appwin__reveal-label{font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:var(--cream);font-weight:700}
.ait-appwin__reveal-hint{margin-left:auto;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(197,230,162,0.7);flex-shrink:0}
.ait-appwin__reveal[aria-expanded="true"] .ait-appwin__reveal-hint--show{display:none}
.ait-appwin__reveal-hint--hide{display:none}
.ait-appwin__reveal[aria-expanded="true"] .ait-appwin__reveal-hint--hide{display:inline}
.ait-appwin__panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows 0.5s cubic-bezier(.16,1,.3,1)}
.ait-appwin__panel.open{grid-template-rows:1fr}
.ait-appwin__panel-inner{overflow:hidden;min-height:0}
.ait-appwin__panel-inner > :first-child{margin-top:16px}
.ait-appwin__panel .ait-appwin__foot{margin-top:16px}
.ait-flows-trigger{margin-top:18px;display:flex;align-items:center;gap:12px;width:100%;padding:13px 16px;background:rgba(197,230,162,0.06);border:1px solid rgba(197,230,162,0.28);border-radius:10px;font-family:var(--font-mono);text-align:left;transition:background 0.25s,border-color 0.25s,transform 0.2s}
.ait-flows-trigger:hover{background:rgba(197,230,162,0.12);border-color:rgba(197,230,162,0.5);transform:translateY(-1px)}
.ait-flows-trigger__icon{color:var(--lime);font-size:12px;flex-shrink:0}
.ait-flows-trigger__label{font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:var(--cream);font-weight:700}
.ait-flows-trigger__hint{margin-left:auto;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(197,230,162,0.7);flex-shrink:0}
.ait-flows-modal{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:clamp(16px,4vw,48px)}
.ait-flows-modal__overlay{position:absolute;inset:0;background:rgba(6,13,61,0.78);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
.ait-flows-modal__win{position:relative;z-index:2;width:100%;max-width:720px;max-height:88vh;display:flex;flex-direction:column;background:#11102b;border:1px solid rgba(197,230,162,0.22);border-radius:14px;overflow:hidden;box-shadow:0 32px 90px rgba(0,0,0,0.6)}
.ait-flows-modal__bar{display:flex;align-items:center;gap:6px;padding:11px 14px;background:rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0}
.ait-flows-modal__name{margin-left:10px;font-family:var(--font-mono);font-size:11px;letter-spacing:0.06em;color:rgba(236,233,231,0.7)}
.ait-flows-modal__close{margin-left:auto;width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:18px;line-height:1;color:rgba(236,233,231,0.7);background:rgba(255,255,255,0.05);transition:background 0.2s,color 0.2s}
.ait-flows-modal__close:hover{background:rgba(197,230,162,0.14);color:var(--lime)}
.ait-flows-modal__body{padding:clamp(22px,3vw,32px);overflow-y:auto;-webkit-overflow-scrolling:touch}
.ait-flow{margin-bottom:18px}
.ait-flow:last-child{margin-bottom:0}
.ait-flow__name{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:var(--cream);margin-bottom:10px}
.ait-flow__name::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--lime)}
.ait-flow__pipe{display:flex;flex-wrap:wrap;align-items:stretch;gap:0}
.ait-flow__step{font-family:var(--font-mono);font-size:11px;line-height:1.4;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:7px;padding:8px 11px;color:rgba(236,233,231,0.82);max-width:220px;opacity:0;transform:translateY(8px);transition:opacity 0.5s ease,transform 0.5s ease}
.ait-flow.flow-in .ait-flow__step{opacity:1;transform:translateY(0)}
.ait-flow__conn{align-self:center;flex-shrink:0;width:22px;height:2px;margin:0 2px;background:linear-gradient(90deg,rgba(197,230,162,0.2),var(--lime));position:relative;transform:scaleX(0);transform-origin:left center;transition:transform 0.5s cubic-bezier(.16,1,.3,1)}
.ait-flow.flow-in .ait-flow__conn{transform:scaleX(1)}
.ait-flow__conn::after{content:'';position:absolute;right:-1px;top:50%;transform:translateY(-50%);border-left:5px solid var(--lime);border-top:3px solid transparent;border-bottom:3px solid transparent}
@media (max-width:980px){.ait-apps__grid{grid-template-columns:1fr}}
.ait-how{background:var(--paper)}
.ait-how__pipe{margin-top:clamp(40px,5vw,60px);display:grid;grid-template-columns:repeat(3,1fr);gap:0;align-items:stretch;position:relative}
.ait-how__pipe > *{min-width:0}
.ait-how__rail{position:absolute;top:38px;left:14%;right:14%;height:2px;background:var(--rule-dark)}
.ait-how__rail::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,var(--purple),var(--lime));transform:scaleX(0);transform-origin:left center;transition:transform 1.4s cubic-bezier(.16,1,.3,1)}
.ait-how.in .ait-how__rail::after{transform:scaleX(1)}
.ait-how__stage{padding:0 clamp(10px,2vw,24px);position:relative;display:flex;flex-direction:column}
.ait-how__badge{width:56px;height:56px;border-radius:14px;background:var(--warm-white);border:1px solid var(--rule-dark);display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;font-size:16px;color:var(--purple);margin:0 auto 22px;position:relative;z-index:2;box-shadow:0 8px 20px rgba(28,26,60,0.07)}
.ait-how__stage:nth-child(3) .ait-how__badge{color:var(--ink);background:var(--lime);border-color:transparent}
.ait-how__stage:nth-child(4) .ait-how__badge{color:var(--ink);background:var(--cream)}
.ait-how__card{background:var(--warm-white);border:1px solid var(--rule-dark);border-radius:14px;padding:28px 26px;text-align:center;flex:1}
.ait-how__step-n{font-family:var(--font-mono);font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--purple);margin-bottom:10px}
.ait-how__card h3{font-size:21px;font-weight:700;letter-spacing:-0.014em;color:var(--ink);margin-bottom:10px}
.ait-how__card p{font-size:14px;line-height:1.62;color:var(--text-mid)}
@media (max-width:880px){.ait-how__pipe{grid-template-columns:1fr;gap:20px}.ait-how__rail{display:none}.ait-how__badge{margin-bottom:16px}}
.ait-built{background:var(--purple);color:var(--cream)}
.ait-built__grid{margin-top:clamp(40px,5vw,60px);display:grid;grid-template-columns:0.95fr 1.05fr;gap:clamp(28px,4vw,52px);align-items:stretch}
.ait-built__grid > *{min-width:0}
.ait-built__stat{background:rgba(197,230,162,0.08);border:1px solid rgba(197,230,162,0.28);border-radius:16px;padding:clamp(32px,4vw,48px);display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden}
.ait-built__stat::after{content:'';position:absolute;width:320px;height:320px;bottom:-160px;right:-120px;background:radial-gradient(circle,rgba(197,230,162,0.22),transparent 65%);filter:blur(40px)}
.ait-built__stat .meta{font-family:var(--font-mono);font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--lime);margin-bottom:14px;display:inline-flex;align-items:center;gap:8px}
.ait-built__stat .meta::before{content:'';width:6px;height:6px;background:var(--lime);border-radius:50%;animation:aitPulse 1.4s ease infinite}
.ait-built__num{font-size:clamp(80px,12vw,150px);font-weight:700;line-height:0.92;letter-spacing:-0.045em;color:transparent;-webkit-text-stroke:2px var(--lime);text-stroke:2px var(--lime);text-shadow:0 0 18px rgba(197,230,162,0.55),0 0 46px rgba(197,230,162,0.4),0 0 80px rgba(197,230,162,0.28);font-feature-settings:"tnum" 1,"lnum" 1;display:inline-flex;align-items:baseline;position:relative;z-index:2}
.ait-built__num .suffix{font-size:0.42em;margin-left:0.04em;color:transparent;-webkit-text-stroke:1.5px var(--lime);text-stroke:1.5px var(--lime)}
.ait-built__num-lbl{margin-top:14px;font-size:clamp(16px,1.6vw,19px);line-height:1.5;color:rgba(236,233,231,0.9);position:relative;z-index:2;max-width:360px}
.ait-built__log{background:var(--cream-deep);border:1px solid rgba(28,26,60,0.12);border-radius:16px;padding:clamp(24px,3vw,34px);font-family:var(--font-mono)}
.ait-built__log-h{font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--text-dark);margin-bottom:20px}
.ait-built__log ul{list-style:none}
.ait-built__log li{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid rgba(28,26,60,0.12);font-size:13.5px;line-height:1.55;color:var(--text-dark)}
.ait-built__log li:last-child{border-bottom:none}
.ait-built__log li::before{content:'\\2713';flex-shrink:0;color:var(--text-dark);font-weight:700}
.ait-built__foot{margin-top:clamp(32px,4vw,44px);padding-top:22px;border-top:1px solid rgba(236,233,231,0.2);font-family:var(--font-mono);font-size:12.5px;letter-spacing:0.04em;color:rgba(236,233,231,0.78)}
@media (max-width:880px){.ait-built__grid{grid-template-columns:1fr}}
.ait-quote{background:var(--cream)}
.ait-quote__card{margin-top:clamp(28px,4vw,44px);background:var(--warm-white);border:1px solid var(--rule-dark);border-radius:16px;padding:clamp(36px,5vw,64px);position:relative;overflow:hidden}
.ait-quote__card::before{content:'';position:absolute;top:0;left:0;bottom:0;width:4px;background:linear-gradient(180deg,var(--purple),var(--lime))}
.ait-quote__bar{display:flex;align-items:center;gap:6px;margin-bottom:24px}
.ait-quote__tag{margin-left:auto;font-family:var(--font-mono);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--text-soft)}
.ait-quote__text{font-size:clamp(20px,2.6vw,30px);line-height:1.45;font-weight:700;letter-spacing:-0.018em;color:var(--text-dark)}
.ait-quote__text::before{content:'\\201C';color:var(--purple)}
.ait-quote__text::after{content:'\\201D';color:var(--purple)}
.ait-quote__who{margin-top:26px;display:flex;align-items:center;gap:14px}
.ait-quote__avatar{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,var(--purple),var(--ink));display:flex;align-items:center;justify-content:center;color:var(--lime);font-weight:700;font-size:15px;flex-shrink:0}
.ait-quote__attr .n{font-size:15px;font-weight:700;color:var(--ink)}
.ait-quote__attr .r{font-size:13px;color:var(--text-soft);margin-top:2px}
.ait-hi{background:var(--lime);color:var(--ink);position:relative;overflow:hidden}
.ait-hi::after{content:'';position:absolute;pointer-events:none;width:460px;height:460px;top:-180px;left:-160px;background:radial-gradient(circle,rgba(255,255,255,0.5),transparent 68%);filter:blur(50px);z-index:0}
.ait-hi .ait-container{position:relative;z-index:1}
.ait-hi .ait-sec-eyebrow{color:var(--ink);border-color:rgba(28,26,60,0.22);background:rgba(28,26,60,0.05)}
.ait-hi .ait-sec-h{color:var(--ink)}
.ait-hi .ait-sec-h .ait-accent{color:var(--purple)}
.ait-hi__grid{margin-top:clamp(36px,5vw,56px);display:grid;grid-template-columns:0.78fr 1.22fr;gap:clamp(36px,5vw,64px);align-items:start}
.ait-hi__grid > *{min-width:0}
.ait-hi__portrait{position:relative}
.ait-hi__portrait .img{width:100%;aspect-ratio:4/5;border-radius:16px;overflow:hidden;background:linear-gradient(160deg,#2a2554,#060d3d);box-shadow:0 24px 56px rgba(28,26,60,0.22);border:1px solid rgba(28,26,60,0.12);position:relative}
.ait-hi__portrait .img img{width:100%;height:100%;object-fit:cover;object-position:50% 22%}
.ait-hi__portrait-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--lime);font-size:160px;opacity:0.4;font-weight:700}
.ait-hi__opcard{margin-top:14px;padding:16px 18px;background:var(--ink);color:var(--cream);border-radius:12px;font-family:var(--font-mono);font-size:11px;line-height:1.85;box-shadow:0 14px 34px rgba(28,26,60,0.18)}
.ait-hi__opcard .row{display:flex;justify-content:space-between;gap:12px}
.ait-hi__opcard .k{color:var(--lime)}
.ait-hi__opcard .v{color:var(--cream);text-align:right}
.ait-hi__body p{font-size:16px;line-height:1.7;color:var(--text-dark);margin-bottom:16px}
.ait-hi__body p:first-child{font-size:clamp(20px,2vw,24px);line-height:1.4;color:var(--ink);font-weight:700;letter-spacing:-0.012em;margin-bottom:20px}
.ait-hi__body strong{color:var(--ink);font-weight:700;border-bottom:2px solid rgba(28,26,60,0.28)}
.ait-hi__links{margin-top:24px;display:flex;gap:16px;flex-wrap:wrap}
.ait-hi__links a{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:100px;border:1px solid rgba(28,26,60,0.28);font-size:13px;transition:background 0.2s,color 0.2s,border-color 0.2s}
.ait-hi__links a:hover{background:var(--ink);color:var(--cream);border-color:var(--ink)}
.ait-hi__links-icon{width:16px;height:16px;fill:currentColor;flex-shrink:0}
@media (max-width:880px){.ait-hi__grid{grid-template-columns:1fr}.ait-hi__portrait{max-width:360px}}
.ait-faq__list{margin-top:clamp(36px,5vw,56px);display:grid;grid-template-columns:1fr;gap:12px}
.ait-faq__item{background:var(--warm-white);border:1px solid var(--rule-dark);border-radius:12px;overflow:hidden;transition:border-color 0.3s}
.ait-faq__item.open{border-color:var(--purple)}
.ait-faq__q{display:flex;align-items:center;justify-content:space-between;width:100%;padding:20px 24px;gap:16px;text-align:left;cursor:pointer}
.ait-faq__q-text{font-size:16px;font-weight:700;color:var(--ink);flex:1;letter-spacing:-0.012em}
.ait-faq__q-num{font-family:var(--font-mono);font-size:11px;color:var(--purple);margin-right:14px;opacity:0.7}
.ait-faq__toggle{flex-shrink:0;width:32px;height:32px;border-radius:8px;background:rgba(113,46,172,0.06);color:var(--purple);display:flex;align-items:center;justify-content:center;font-size:16px;transition:transform 0.4s,background 0.3s,color 0.3s}
.ait-faq__item.open .ait-faq__toggle{background:var(--purple);color:var(--lime);transform:rotate(45deg)}
.ait-faq__a{max-height:0;overflow:hidden;transition:max-height 0.5s cubic-bezier(.16,1,.3,1)}
.ait-faq__a-inner{padding:0 24px 24px 24px;font-size:15px;line-height:1.7;color:var(--text-mid)}
.ait-faq__item.open .ait-faq__a{max-height:460px}
.ait-endzone{position:relative;overflow-x:clip}
.ait-endzone::before{content:'';position:absolute;left:50%;bottom:0;width:min(1100px,130vw);height:760px;transform:translate(-50%,38%);background:radial-gradient(closest-side,rgba(197,230,162,0.20),rgba(197,230,162,0.07) 46%,transparent 76%);filter:blur(50px);pointer-events:none;z-index:0}
.ait-endzone::after{content:'';position:absolute;left:18%;bottom:6%;width:520px;height:520px;transform:translate(-50%,30%);background:radial-gradient(circle,rgba(120,150,255,0.12),transparent 66%);filter:blur(60px);pointer-events:none;z-index:0}
.ait-final{background:linear-gradient(180deg,#221f4d 0%,#15123a 52%,#211d4b 100%);color:var(--cream);text-align:center;padding:clamp(80px,14vw,160px) 0 clamp(96px,16vw,180px);position:relative}
.ait-final::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(197,230,162,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(197,230,162,0.04) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(60% 60% at 50% 45%,#000,transparent 75%);-webkit-mask-image:radial-gradient(60% 60% at 50% 45%,#000,transparent 75%);pointer-events:none;z-index:1}
.ait-final__inner{position:relative;z-index:2}
.ait-final__prompt{font-family:var(--font-mono);font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:var(--lime);margin-bottom:24px;display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border:1px solid rgba(197,230,162,0.3);border-radius:100px}
.ait-final__h{font-size:clamp(32px,5.6vw,70px);font-weight:700;line-height:1.06;letter-spacing:-0.032em;max-width:900px;margin:0 auto;color:var(--cream)}
.ait-final__h .ait-accent{color:var(--lime)}
.ait-final__sub{margin:28px auto 0;max-width:560px;font-size:16px;line-height:1.7;color:rgba(236,233,231,0.72)}
.ait-final__cta{margin-top:40px}
.ait-final__cta .ait-btn{padding:20px 40px;font-size:16px}
.ait-final__small{margin-top:28px;font-size:13px;color:rgba(236,233,231,0.5);font-style:italic;max-width:560px;margin-left:auto;margin-right:auto}
.ait-footer{background:#211d4b;color:rgba(255,255,255,0.5);padding:clamp(64px,9vw,104px) 0 32px;position:relative;z-index:2}
.ait-footer__grid{display:grid;grid-template-columns:2fr 0.7fr 1fr 0.85fr 0.85fr 0.85fr;gap:32px}
.ait-footer__brand{max-width:280px}
.ait-footer__logo{height:96px;width:auto;display:block;margin-bottom:14px;margin-left:-6px}
.ait-footer__tag{font-weight:700;font-size:16px;color:var(--cream);line-height:1.4}
.ait-footer__goodies-logo{display:inline-block;margin-top:16px;transition:opacity 0.2s}
.ait-footer__goodies-logo:hover{opacity:0.82}
.ait-footer__goodies-logo img{height:38px;width:auto;display:block}
.ait-footer__col-h{font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--cream);font-weight:700;margin-bottom:18px}
.ait-footer__col ul{list-style:none;padding:0}
.ait-footer__col li{margin-bottom:10px}
.ait-footer__col a{font-size:13px;color:rgba(255,255,255,0.5);transition:color 0.2s}
.ait-footer__col a:hover{color:var(--lime)}
.ait-footer__socials{display:flex;gap:12px;flex-wrap:wrap}
.ait-footer__socials a{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;transition:background 0.2s,transform 0.2s}
.ait-footer__socials a:hover{background:var(--lime);transform:translateY(-2px)}
.ait-footer__socials a:hover svg{fill:var(--ink)}
.ait-footer__socials svg{width:16px;height:16px;fill:rgba(255,255,255,0.6);transition:fill 0.2s}
.ait-footer__bottom{margin-top:clamp(48px,6vw,72px);padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);display:flex;flex-wrap:wrap;justify-content:space-between;gap:16px;font-size:12px;color:rgba(255,255,255,0.4)}
.ait-footer__legal{display:flex;gap:20px;flex-wrap:wrap}
.ait-footer__legal a:hover{color:var(--lime)}
@media (max-width:980px){.ait-footer__grid{grid-template-columns:1fr 1fr;gap:32px 24px}.ait-footer__brand{grid-column:1 / -1;max-width:none}}
@media (max-width:540px){.ait-footer__grid{grid-template-columns:1fr}.ait-footer__col:not(.ait-footer__brand):not(.ait-footer__col--socials){display:none}}
@media (max-width:1199px) and (min-width:768px){.ait-apps__grid{grid-template-columns:1fr 1fr;gap:22px}.ait-built__grid{grid-template-columns:1fr}.ait-how__pipe{grid-template-columns:1fr 1fr 1fr}.ait-flow__step{max-width:none;flex:1 1 30%}.ait-intro__text{font-size:20px}.ait-hero__grid{grid-template-columns:1fr}.ait-container,.ait-container--narrow{padding:0 32px}}
@media (max-width:980px){.ait-apps__grid{grid-template-columns:1fr;gap:22px}.ait-built__grid{grid-template-columns:1fr}}
@media (max-width:880px){.ait-flow__pipe{flex-direction:column;align-items:stretch;gap:6px}.ait-flow__step{max-width:none}.ait-flow__conn{width:2px;height:16px;margin:2px 0 2px 14px;background:linear-gradient(180deg,rgba(197,230,162,0.2),var(--lime));transform:scaleY(0);transform-origin:top center}.ait-flow.flow-in .ait-flow__conn{transform:scaleY(1)}.ait-flow__conn::after{right:auto;left:50%;top:auto;bottom:-1px;transform:translateX(-50%);border-left:3px solid transparent;border-right:3px solid transparent;border-top:5px solid var(--lime);border-bottom:none}}
@media (max-width:768px){.ait-container,.ait-container--narrow{padding:0 22px}.ait-hero{padding:124px 0 72px}.ait-hero__h1{font-size:clamp(30px,8.4vw,40px)}.ait-hero__sub{font-size:15px;max-width:none}.ait-hero__cta-row{gap:10px;margin-top:26px}.ait-section{padding:64px 0}.ait-intro{padding:56px 0}.ait-intro__card{padding:26px 22px}.ait-intro__text{font-size:17px}.ait-sec-h{font-size:clamp(26px,7.2vw,36px)}.ait-sec-lede{font-size:15px}.ait-appwin__body{padding:24px 22px}.ait-appwin h3{font-size:23px}.ait-built__num{font-size:clamp(72px,22vw,110px)}.ait-built__stat{padding:30px 24px}.ait-built__log{padding:24px 22px}.ait-quote__card{padding:32px 24px}.ait-quote__text{font-size:clamp(19px,5.6vw,24px)}.ait-hi__body p:first-child{font-size:clamp(19px,5vw,22px)}.ait-final__h{font-size:clamp(30px,8.4vw,44px)}.ait-final__cta .ait-btn{padding:17px 30px;font-size:15px}.ait-endzone::before{width:min(640px,150vw);height:520px}.ait-endzone::after{width:360px;height:360px}.ait-hero::after{width:360px;height:360px;top:-140px;right:-140px}.ait-built__stat::after{width:220px;height:220px;bottom:-120px;right:-90px}.ait-hi::after{width:320px;height:320px;top:-130px;left:-120px}}
@media (max-width:767px){.ait-boot{display:none}.ait-hero{padding:130px 0 78px}.ait-hero__grid{display:block;margin-top:26px}.ait-hero__sub{max-width:560px}.ait-hero__sub+.ait-hero__sub{margin-top:14px}.ait-hero__cta-row{margin-top:30px}.ait-intro__bar{display:none}.ait-intro__card{padding:24px 20px}.ait-intro__card::before{display:none}.ait-appwin__bar{display:none}.ait-appwin{border-radius:12px}.ait-appwin__body{padding:22px 20px}.ait-appwin__no{display:none}.ait-appwin h3{font-size:21px}.ait-appwin__tag{font-size:13.5px;margin-bottom:12px}.ait-appwin__body p{font-size:13.5px;margin-bottom:12px}.ait-appwin__lead{font-size:10.5px}.ait-appwin__list li{font-size:13px}.ait-appwin__foot{font-size:12.5px;padding-top:14px}.ait-appwin__callout{padding:13px 15px;font-size:12.5px}.ait-appwin__reveal{padding:11px 14px}.ait-appwin__reveal-label{font-size:11.5px}.ait-flows-trigger{padding:12px 14px}.ait-flows-trigger__label{font-size:11.5px}.ait-how__badge{width:46px;height:46px;font-size:14px;border-radius:12px;margin-bottom:14px}.ait-how__card{padding:22px 20px;border-radius:12px}.ait-how__card h3{font-size:19px}.ait-how__card p{font-size:13.5px}.ait-built__stat{padding:26px 22px;border-radius:14px}.ait-built__num-lbl{font-size:15px}.ait-built__log{padding:22px 20px;border-radius:14px}.ait-built__log-h{display:none}.ait-built__log li{font-size:13px;padding:12px 0}.ait-quote__bar{display:none}.ait-quote__card{padding:30px 22px;border-radius:14px}.ait-hi__opcard{display:none}.ait-hi__portrait .img{box-shadow:0 14px 34px rgba(28,26,60,0.16);border-radius:14px}.ait-hi__body p{font-size:15px}.ait-faq__item{border-radius:10px}.ait-faq__q{padding:18px 20px}.ait-faq__q-text{font-size:15px}}
@media (max-width:540px){.ait-btn{padding:14px 22px;font-size:13px}.ait-section{padding:56px 0}.ait-hero__cta-row .ait-btn{width:100%;justify-content:center}.ait-quote__who{flex-wrap:wrap}.ait-appwin__reveal{flex-wrap:wrap;gap:8px}.ait-appwin__reveal-hint{margin-left:0}.ait-flows-trigger{flex-wrap:wrap;gap:8px 10px}.ait-flows-trigger__hint{margin-left:0}.ait-hi__portrait{max-width:none}.ait-faq__q{padding:18px 18px;gap:12px}.ait-faq__q-num{margin-right:8px}.ait-faq__a-inner{padding:0 18px 20px 18px}}
@media (max-width:360px){.ait-container,.ait-container--narrow{padding:0 16px}.ait-hero__h1{font-size:27px}.ait-boot__title{font-size:9px}.ait-appwin__bar{flex-wrap:wrap;gap:6px 8px}.ait-appwin__tier{margin-left:0}.ait-built__num{font-size:68px}}
.ait-page :focus-visible{outline:2px solid var(--purple);outline-offset:4px;border-radius:4px}
@media (prefers-reduced-motion:reduce){.ait-page *,.ait-page *::before,.ait-page *::after{animation:none!important;transition:none!important}.ait-rv{opacity:1!important;transform:none!important;filter:none!important}.ait-appwin{opacity:1!important;transform:none!important}.ait-flow__step{opacity:1!important;transform:none!important}.ait-flow__conn{transform:scaleX(1)!important}.ait-how__rail::after{transform:scaleX(1)!important}.ait-boot__hidden{opacity:1!important}.ait-boot__dash{opacity:1!important}.ait-boot__caret{display:none!important}.ait-appwin__panel{transition:none!important}.ait-appwin__reveal-ic{transition:none!important}}
@media (prefers-reduced-motion:reduce) and (max-width:880px){.ait-flow__conn{transform:scaleY(1)!important}}
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
    document.querySelectorAll(".ait-rv, .ait-how").forEach((el) => io.observe(el))
    const tm = setTimeout(() => {
      document.querySelectorAll(".ait-rv:not(.in)").forEach((el) => {
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
const _F = "'Aeonik', sans-serif"

// ─── Navbar ───────────────────────────────────────────────────────────────────
function SiteNavbar() {
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
    document.body.style.overflow = isMobile && menuOpen ? "hidden" : ""
    if (!menuOpen) setLinkedinExpanded(false)
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen, isMobile])

  const liSub = [
    { label: "LinkedIn for Organizations", href: "https://www.octaloom.com/linkedin-for-organizations" },
    { label: "LinkedIn for Executives", href: "https://www.octaloom.com/linkedin-for-executives" },
    { label: "LinkedIn for Solopreneurs", href: "https://www.octaloom.com/linkedin-for-solopreneurs" },
  ]
  const otherSub = [
    { label: "Fractional CMO", href: "https://www.octaloom.com/fractional-cmo" },
    { label: "AI Tools & Agents", href: "#" },
    { label: "Workshops", href: "https://www.octaloom.com/workshops" },
  ]
  const navLinks = [
    { label: "About", href: "https://www.octaloom.com/about" },
    { label: "Blog", href: "https://www.octaloom.com/blog" },
    { label: "Contact", href: "#contact" },
    { label: "Goodies", href: "https://octagoodies.com" },
  ]

  const dItem: React.CSSProperties = { display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", fontSize: 13, color: _D, borderRadius: 8, transition: "background 0.15s", textDecoration: "none" }
  const dBox: React.CSSProperties = { position: "absolute", background: "#ece9e8", borderRadius: 12, padding: "8px 6px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: `1px solid ${_B}`, zIndex: 50 }
  const hi = (e: any, on: boolean) => {
    e.currentTarget.style.background = on ? "rgba(113,46,172,0.05)" : "transparent"
  }

  return (
    <nav style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 1000, width: "calc(100% - 48px)", maxWidth: 1152, borderRadius: 100, background: scrolled ? "rgba(236,233,231,0.92)" : "rgba(236,233,231,0.65)", backdropFilter: "blur(50px)", WebkitBackdropFilter: "blur(50px)", border: "1px solid rgba(32,30,75,0.08)", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: _F, transition: "background 0.3s, box-shadow 0.3s", boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none" }}>
      <a href="https://www.octaloom.com/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/logo%20nav%20bar.png" alt="OctaLoom" style={{ height: 36, width: "auto", display: "block" }} onError={(e: any) => { e.target.style.display = "none" }} />
      </a>

      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ position: "relative" }} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => { setServicesOpen(false); setLinkedinOpen(false) }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: servicesOpen ? _D : "rgba(32,30,75,0.55)", display: "flex", alignItems: "center", gap: 5, padding: "6px 0", transition: "color 0.25s", fontFamily: _F }}>
              Services
              <svg width={11} height={11} viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.25s", transform: servicesOpen ? "rotate(180deg)" : "none" }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {servicesOpen && <div style={{ position: "absolute", top: "100%", left: 0, right: 0, height: 12, zIndex: 199 }} />}
            {servicesOpen && (
              <div style={{ ...dBox, minWidth: 200, top: "calc(100% + 10px)", left: 0 }}>
                <div style={{ position: "relative" }} onMouseEnter={() => setLinkedinOpen(true)} onMouseLeave={() => setLinkedinOpen(false)}>
                  <a href="https://www.octaloom.com/linkedin-growth-engine" style={dItem} onMouseEnter={(e) => hi(e, true)} onMouseLeave={(e) => hi(e, false)}>
                    <span>LinkedIn Growth Engine</span>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.45, marginLeft: "auto" }}>
                      <path d="M4 2l4 4-4 4" stroke={_D} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  {linkedinOpen && <div style={{ position: "absolute", top: 0, bottom: 0, left: "100%", width: 8, zIndex: 199 }} />}
                  {linkedinOpen && (
                    <div style={{ ...dBox, minWidth: 230, top: 0, left: "calc(100% + 6px)" }}>
                      {liSub.map((s, i) => (
                        <a key={i} href={s.href} style={dItem} onMouseEnter={(e) => hi(e, true)} onMouseLeave={(e) => hi(e, false)}>{s.label}</a>
                      ))}
                    </div>
                  )}
                </div>
                {otherSub.map((s, i) => (
                  <a key={i} href={s.href} style={dItem} onMouseEnter={(e) => hi(e, true)} onMouseLeave={(e) => hi(e, false)}>{s.label}</a>
                ))}
              </div>
            )}
          </div>
          {navLinks.map((item, i) => (
            <a key={i} href={item.href} style={{ fontSize: 14, color: "rgba(32,30,75,0.55)", textDecoration: "none", transition: "color 0.25s", fontFamily: _F }}
              onMouseEnter={(e) => (e.currentTarget.style.color = _D)} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(32,30,75,0.55)")}>
              {item.label}
            </a>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {!isMobile && (
          <>
            <a href="https://www.octaloom.com/ai-tools-agents-he"
              style={{ fontSize: 12, fontWeight: 600, color: _D, background: "transparent", border: "1px solid rgba(32,30,75,0.22)", borderRadius: 100, padding: "5px 13px", fontFamily: _F, transition: "border-color 0.2s,color 0.2s", letterSpacing: "0.03em", textDecoration: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = _P; e.currentTarget.style.color = _P }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(32,30,75,0.22)"; e.currentTarget.style.color = _D }}>
              {"\u05e2\u05d1"}
            </a>
            <a href="https://calendar.notion.so/meet/octaloom/discovery"
              style={{ padding: "8px 20px", borderRadius: 100, background: _P, color: "#ece9e7", fontSize: 13, fontWeight: 600, fontFamily: _F, textDecoration: "none" }}>
              Let's Talk
            </a>
          </>
        )}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{ background: "none", border: "none", cursor: "pointer", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ position: "relative", display: "block", width: 28, height: 20 }}>
              {[0, 9, 18].map((top, i) => (
                <span key={i} style={{ position: "absolute", left: 0, width: "100%", height: 2, background: _D, borderRadius: 2, top, transform: menuOpen && i === 0 ? "rotate(45deg) translateY(9px)" : menuOpen && i === 1 ? "scaleX(0)" : menuOpen && i === 2 ? "rotate(-45deg) translateY(-9px)" : "none", opacity: menuOpen && i === 1 ? 0 : 1, transition: "all 0.3s" }} />
              ))}
            </span>
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, left: 0, background: "#ece9e8", borderRadius: 16, padding: "20px 32px 32px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 50, maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: _P, margin: "0 0 4px", fontFamily: _F }}>Services</p>
          <button onClick={() => setLinkedinExpanded((p) => !p)}
            style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", fontSize: 20, color: _D, padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: _F, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            LinkedIn Growth Engine
            <svg width={11} height={11} viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.25s", transform: linkedinExpanded ? "rotate(180deg)" : "none" }}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {linkedinExpanded && liSub.map((s, i) => (
            <a key={i} href={s.href} onClick={() => setMenuOpen(false)} style={{ display: "block", fontSize: 15, color: _P, textDecoration: "none", padding: "7px 0 7px 20px", borderBottom: "1px solid rgba(113,46,172,0.05)", fontFamily: _F }}>{s.label}</a>
          ))}
          {otherSub.map((s, i) => (
            <a key={i} href={s.href} onClick={() => setMenuOpen(false)} style={{ display: "block", fontSize: 20, color: _D, textDecoration: "none", padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: _F }}>{s.label}</a>
          ))}
          {navLinks.map((item, i) => (
            <a key={i} href={item.href} onClick={() => setMenuOpen(false)} style={{ display: "block", fontSize: 20, color: _D, textDecoration: "none", padding: "11px 0", fontWeight: 500, borderBottom: i < navLinks.length - 1 ? "1px solid rgba(113,46,172,0.08)" : "none", fontFamily: _F }}>{item.label}</a>
          ))}
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="https://calendar.notion.so/meet/octaloom/discovery" onClick={() => setMenuOpen(false)}
              style={{ display: "block", textAlign: "center", padding: "14px 24px", fontSize: 15, fontWeight: 600, background: _P, color: "#ece9e7", borderRadius: 100, fontFamily: _F, textDecoration: "none", width: "100%", boxSizing: "border-box" }}>
              Let's Talk · Free
            </a>
            <a href="https://www.octaloom.com/ai-tools-agents-he"
              style={{ display: "block", textAlign: "center", padding: "11px 24px", fontSize: 13, fontWeight: 600, color: _D, borderRadius: 100, fontFamily: _F, border: "1px solid rgba(32,30,75,0.2)", textDecoration: "none", width: "100%", boxSizing: "border-box" }}>
              {"Switch to \u05e2\u05d1 →"}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

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
    { type: "check", text: "assets.module :: landing pages, micro-sites ready" },
    { type: "check", text: "automation.module :: Claude-first pipelines active" },
    { type: "warn", text: "operator :: marketing brain connected. ready." },
  ]

  return (
    <header className="ait-hero">
      <div className="ait-container ait-hero__inner">
        <div className="ait-rv">
          <span className="ait-hero__label"><span className="ait-pulse" />AI Tools &amp; Agents · Built at AI Speed</span>
        </div>
        <div className="ait-hero__grid">
          <div>
            <h1 className="ait-hero__h1 ait-rv" style={{ transitionDelay: ".1s" }}>
              AI Agents, Tools, and <span className="ait-accent">Vibe-Coded Marketing Systems</span> for Your Business
            </h1>
            <p className="ait-hero__sub ait-rv" style={{ transitionDelay: ".22s" }}>
              We're in a world where building AI-powered marketing tools no longer requires a development team. The combination of vibe coding, modern AI platforms, and deep marketing understanding is enough to build agents, chatbots, landing pages, and automation workflows that actually fit the way your business works.
            </p>
            <p className="ait-hero__sub ait-rv" style={{ transitionDelay: ".32s" }}>
              That's what OctaLoom builds. <strong>Custom AI solutions, project-based, built and handed off.</strong> The marketing brain decides what to build. The AI builds it.
            </p>
            <div className="ait-hero__cta-row ait-rv" style={{ transitionDelay: ".42s" }}>
              <a className="ait-btn ait-btn--lime" href="https://calendar.notion.so/meet/octaloom/discovery">
                Book a Free Discovery Call
                <span className="ait-arrow">{"→"}</span>
              </a>
              <a className="ait-btn ait-btn--ghost-light" href="#apps">See the four apps</a>
            </div>
          </div>
          <div className="ait-rv ait-rv--right" style={{ transitionDelay: ".3s" }}>
            <div className="ait-boot">
              <div className="ait-boot__bar">
                <span className="ait-win-dot ait-win-dot--r" />
                <span className="ait-win-dot ait-win-dot--y" />
                <span className="ait-win-dot ait-win-dot--g" />
                <span className="ait-boot__title">octaloom · ai-os</span>
              </div>
              <div className="ait-boot__body">
                <div className="ait-boot__line">
                  <span className="ait-boot__prompt">~</span>
                  <span className="ait-boot__path"> octaloom</span>
                  <span className="ait-boot__cmd">{cmd}</span>
                  {!caretHidden && <span className="ait-boot__caret" />}
                </div>
                {bootLines.map((ln, idx) => (
                  <div key={idx} className={"ait-boot__line" + (idx < visibleLines ? "" : " ait-boot__hidden")}>
                    <span className={ln.type === "warn" ? "ait-boot__warn" : "ait-boot__check"}>{ln.type === "warn" ? "▸" : "✓"}</span>
                    <span className="ait-boot__out">{ln.text}</span>
                  </div>
                ))}
                <div className={"ait-boot__dash" + (dashIn ? " in" : "")}>
                  <div className="ait-boot__node"><div className="k">Build mode</div><div className="v">Project-based</div></div>
                  <div className="ait-boot__node"><div className="k">Operator</div><div className="v">Hanita Yudovski</div></div>
                  <div className="ait-boot__node"><div className="k">Handoff</div><div className="v">Training + docs</div></div>
                  <div className="ait-boot__node"><div className="k">Speed</div><div className="v">AI speed</div></div>
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
    <section className="ait-intro">
      <div className="ait-container">
        <div className="ait-intro__card ait-rv">
          <div className="ait-intro__bar">
            <span className="ait-win-dot ait-win-dot--r" />
            <span className="ait-win-dot ait-win-dot--y" />
            <span className="ait-win-dot ait-win-dot--g" />
            <span className="ait-intro__tag">readme.md</span>
          </div>
          <p className="ait-intro__text">
            OctaLoom builds custom AI solutions for B2B companies: <strong>autonomous AI agents</strong> (also via slack/telegram &amp; Whatsapp), <strong>custom GPTs/Gems and chatbots</strong>, <strong>vibe-coded landing pages and interactive tools</strong>, and <strong>AI-powered automation workflows</strong>. Project-based, built and handed{" "}off{" "}with{" "}training
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── App window (progressive disclosure) ──────────────────────────────────────
type AppItem = { lead: string; rest: string }
const AppWindow: React.FC<{
  idx: number
  name: string
  tier: string
  typeNo: string
  title: React.ReactNode
  tag: string
  intro: string
  hint: string
  lead?: string
  items: AppItem[]
  foot?: string
  callout?: React.ReactNode
  flowsTrigger?: React.ReactNode
}> = ({ idx, name, tier, typeNo, title, tag, intro, hint, lead, items, foot, callout, flowsTrigger }) => {
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
    <article ref={ref} className={"ait-appwin" + (bootIn ? " boot-in" : "")}>
      <div className="ait-appwin__bar">
        <span className="ait-win-dot ait-win-dot--r" />
        <span className="ait-win-dot ait-win-dot--y" />
        <span className="ait-win-dot ait-win-dot--g" />
        <span className="ait-appwin__name">{name}</span>
        <span className="ait-appwin__tier">{tier}</span>
      </div>
      <div className="ait-appwin__body">
        <div className="ait-appwin__no">{typeNo}</div>
        <h3>{title}</h3>
        <p className="ait-appwin__tag">{tag}</p>
        <p>{intro}</p>
        <div className="ait-appwin__more">
          <button type="button" className="ait-appwin__reveal" aria-expanded={open} onClick={() => setOpen((p) => !p)}>
            <span className="ait-appwin__reveal-ic" aria-hidden="true">{open ? "×" : "+"}</span>
            <span className="ait-appwin__reveal-label">See examples</span>
            <span className="ait-appwin__reveal-hint ait-appwin__reveal-hint--show">{hint}</span>
            <span className="ait-appwin__reveal-hint ait-appwin__reveal-hint--hide">Hide</span>
          </button>
          <div className={"ait-appwin__panel" + (open ? " open" : "")}>
            <div className="ait-appwin__panel-inner">
              {lead && <div className="ait-appwin__lead">{lead}</div>}
              <ul className="ait-appwin__list">
                {items.map((it, i) => (
                  <li key={i}><div><b className="lead">{it.lead}</b> {it.rest}</div></li>
                ))}
              </ul>
              {foot && <div className="ait-appwin__foot">{foot}</div>}
              {callout && <div className="ait-appwin__callout">{callout}</div>}
            </div>
          </div>
          {flowsTrigger}
        </div>
      </div>
    </article>
  )
}

// ─── Use-case flows modal ─────────────────────────────────────────────────────
const FLOWS: Array<{ name: string; steps: string[] }> = [
  { name: "Lead qualification", steps: ["Visitor fills in a form", "Agent asks follow-up questions", "Filters by fit", "Only qualified leads reach your team"] },
  { name: "Customer support", steps: ["Customer asks a question", "Agent responds from your knowledge base", "Escalates to a human only when genuinely needed"] },
  { name: "Pre-call research", steps: ["Client books a call", "Agent collects background info", "Sends your team a summary before the meeting starts"] },
  { name: "Automated onboarding", steps: ["New client signs", "Agent walks them through the process", "Answers questions at every step", "Updates your team"] },
]

const FlowsModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [playedFlows, setPlayedFlows] = useState<number[]>([])
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<Element | null>(null)

  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement
      document.body.style.overflow = "hidden"
      const reduce = prefersReducedMotion()
      const timers: number[] = []
      if (reduce) {
        setPlayedFlows(FLOWS.map((_, i) => i))
      } else {
        setPlayedFlows([])
        FLOWS.forEach((_, i) => {
          timers.push(window.setTimeout(() => setPlayedFlows((p) => (p.includes(i) ? p : [...p, i])), 180 + i * 160))
        })
      }
      const t = window.setTimeout(() => closeRef.current?.focus(), 60)
      timers.push(t)
      return () => {
        timers.forEach((tm) => clearTimeout(tm))
        document.body.style.overflow = ""
      }
    } else {
      setPlayedFlows([])
      document.body.style.overflow = ""
      if (lastFocused.current && typeof (lastFocused.current as HTMLElement).focus === "function") {
        (lastFocused.current as HTMLElement).focus()
      }
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="ait-flows-modal" role="presentation">
          <motion.div
            className="ait-flows-modal__overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="ait-flows-modal__win"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ait-flowsModalTitle"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ait-flows-modal__bar">
              <span className="ait-win-dot ait-win-dot--r" />
              <span className="ait-win-dot ait-win-dot--y" />
              <span className="ait-win-dot ait-win-dot--g" />
              <span className="ait-flows-modal__name" id="ait-flowsModalTitle">ai-agents.app · what this looks like in practice</span>
              <button type="button" className="ait-flows-modal__close" onClick={onClose} aria-label="Close" ref={closeRef}>{"×"}</button>
            </div>
            <div className="ait-flows-modal__body">
              {FLOWS.map((flow, fi) => (
                <div key={fi} className={"ait-flow" + (playedFlows.includes(fi) ? " flow-in" : "")} data-flow>
                  <div className="ait-flow__name">{flow.name}</div>
                  <div className="ait-flow__pipe">
                    {flow.steps.map((step, si) => (
                      <React.Fragment key={si}>
                        <span className="ait-flow__step">{step}</span>
                        {si < flow.steps.length - 1 && <span className="ait-flow__conn" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// ─── Four apps section ────────────────────────────────────────────────────────
function AIToolsApps() {
  const [flowsOpen, setFlowsOpen] = useState(false)
  return (
    <section className="ait-section ait-apps" id="apps">
      <div className="ait-container">
        <span className="ait-sec-eyebrow ait-rv"><span className="num">01</span>The Toolkit</span>
        <h2 className="ait-sec-h ait-rv">Four Types of <span className="ait-accent">AI Solutions</span></h2>
        <p className="ait-sec-lede ait-rv">Each one is a separate offering, separately scoped, separately priced.<span className="ait-sec-lede__line2">Pick what fits, or combine them.</span></p>

        <div className="ait-apps__grid">
          <AppWindow
            idx={0}
            name="ai-agents.app"
            tier="Type 01"
            typeNo="// type 01"
            title="AI Agents"
            tag="The real deal. These are autonomous agents built with Claude Code and open-source frameworks that think, decide, and act on your behalf."
            intro="What makes an agent different from a chatbot: an agent takes ACTION. It doesn't wait for you to ask a question. It monitors, decides, and executes based on the rules and goals you set. A chatbot responds to input. An agent initiates."
            hint="5 examples"
            lead="Examples of what I build"
            items={[
              { lead: "Marketing automation agents", rest: "that run campaigns, adjust targeting, and report results" },
              { lead: "Content research agents", rest: "that scan your industry and surface opportunities you'd otherwise miss" },
              { lead: "Lead qualification agents", rest: "that score and route inbound leads before your sales team even sees them" },
              { lead: "Internal workflow agents", rest: "that handle repetitive operational tasks so your team focuses on what matters" },
              { lead: "Messaging-integrated agents", rest: "built to live where your team already works: Slack, WhatsApp, Telegram. These agents operate inside your communication channels, responding, initiating tasks, and delivering outputs without anyone needing to open another tool" },
            ]}
            foot="Built with Claude Code and open-source tools. Integrated with whatever your team already uses."
            flowsTrigger={
              <button type="button" className="ait-flows-trigger" aria-haspopup="dialog" onClick={() => setFlowsOpen(true)}>
                <span className="ait-flows-trigger__icon" aria-hidden="true">{"▸"}</span>
                <span className="ait-flows-trigger__label">What this looks like in practice</span>
                <span className="ait-flows-trigger__hint">4 example flows</span>
              </button>
            }
          />

          <AppWindow
            idx={1}
            name="gpts-and-gems.app"
            tier="Type 02"
            typeNo="// type 02"
            title={<>Custom GPTs, Chatbots &amp; Gems</>}
            tag="Powerful tools. Clearly distinct from agents."
            intro="These are AI-powered tools that respond to input. They don't think autonomously or take action on their own. They're excellent for specific, predictable use cases:"
            hint="4 examples"
            items={[
              { lead: "Customer-facing chatbots", rest: "trained on your brand voice and product knowledge" },
              { lead: "Custom GPTs for internal teams", rest: "(content generation, proposal writing, FAQ handling, onboarding support)" },
              { lead: "Google Gems", rest: "configured for specific business functions" },
              { lead: "Lead capture bots", rest: "on your website that qualify visitors and route them to the right person" },
            ]}
            callout={
              <>
                <strong>Important distinction:</strong> these tools are powerful and solve real problems. But they respond when prompted. They don't initiate or decide autonomously. They're faster to build, simpler to maintain, and perfect for use cases where the input-output pattern is predictable. If you need autonomous decision-making, you need an agent (see above).
              </>
            }
          />

          <AppWindow
            idx={2}
            name="vibe-assets.app"
            tier="Type 03"
            typeNo="// type 03"
            title="Vibe-Coded Marketing Assets"
            tag="Landing pages, micro-sites, interactive tools, and internal toolkits built at AI speed."
            intro="Vibe coding, the concept Andrej Karpathy introduced for software development, applied to marketing deliverables. Built using tools like Lovable, Claude Design, and custom development:"
            hint="6 examples"
            items={[
              { lead: "Landing pages that convert", rest: "(campaign-specific, product launches, event pages)" },
              { lead: "Interactive lead magnets", rest: "that feel like software, not PDFs (ROI calculators, diagnostic quizzes, assessment tools, self-service pricing estimators)" },
              { lead: "Internal content hubs for organizations.", rest: "Example: for employee advocacy programs, I build internal content hubs where team members find ready-to-use post templates, topic banks, and brand guidelines in one interactive place" },
              { lead: "Chatbots for organizational toolkits.", rest: "Example: for LinkedIn ambassador programs, I build chatbots that help employees generate on-brand posts quickly without needing anyone to hold their hand" },
              { lead: "Toolkits and resource centers", rest: "built as micro-sites (an actual interactive experience, not a Google Drive folder)" },
              { lead: "Customer onboarding experiences", rest: "that guide new clients through your process step by step" },
            ]}
            foot={"These are real examples from real client work. When I run an employee advocacy program, the toolkit isn't a PDF deck. It's a vibe-coded content hub with a chatbot that helps employees create content on-brand. That's what \"built at AI speed\" actually means."}
          />

          <AppWindow
            idx={3}
            name="automation-flows.app"
            tier="Type 04"
            typeNo="// type 04"
            title="AI-Powered Automation Workflows"
            tag="Marketing automation, Claude-first."
            intro="Instead of stitching together 15 Zapier steps with if-then rules, I build automation workflows using Claude Code as the primary intelligence layer. Make or n8n plug in where integration layers are genuinely needed, but the thinking comes from AI."
            hint="4 examples"
            lead="Examples"
            items={[
              { lead: "Email sequence automation", rest: "with AI-generated personalization (each email adapts to the recipient's context)" },
              { lead: "Content repurposing workflows", rest: "(one piece of content becomes multiple formats, distributed automatically across channels)" },
              { lead: "Lead routing and scoring", rest: "(AI evaluates the lead, assigns a score, and sends it to the right person)" },
              { lead: "Social scheduling", rest: "with AI-optimized timing and content adaptation per platform" },
            ]}
            callout="Automation handles rule-based workflows (if this, then that). An AI agent handles open-ended, conversational interactions: answering questions, filtering leads, guiding users through processes. Both are useful. They're often more powerful together."
          />
        </div>
      </div>
      <FlowsModal open={flowsOpen} onClose={() => setFlowsOpen(false)} />
    </section>
  )
}

// ─── How it works ─────────────────────────────────────────────────────────────
function AIToolsHow() {
  return (
    <section className="ait-section ait-how">
      <div className="ait-container">
        <span className="ait-sec-eyebrow ait-rv"><span className="num">02</span>The Pipeline</span>
        <h2 className="ait-sec-h ait-rv">How It <span className="ait-accent">Works</span></h2>

        <div className="ait-how__pipe ait-rv">
          <div className="ait-how__rail" />
          <div className="ait-how__stage">
            <div className="ait-how__badge">01</div>
            <div className="ait-how__card">
              <div className="ait-how__step-n">Step 1</div>
              <h3>Discovery call.</h3>
              <p>What do you need? We figure out which type of solution (or combination) fits your situation.</p>
            </div>
          </div>
          <div className="ait-how__stage">
            <div className="ait-how__badge">02</div>
            <div className="ait-how__card">
              <div className="ait-how__step-n">Step 2</div>
              <h3>Build.</h3>
              <p>Depending on complexity: 2 to 6 weeks. I build, test, and iterate. You review along the way.</p>
            </div>
          </div>
          <div className="ait-how__stage">
            <div className="ait-how__badge">03</div>
            <div className="ait-how__card">
              <div className="ait-how__step-n">Step 3</div>
              <h3>Handoff.</h3>
              <p>Training, documentation, and post-launch support. Your team owns it. You don't need technical knowledge to maintain what I build.</p>
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

// ─── What's been built ────────────────────────────────────────────────────────
function AIToolsBuilt() {
  return (
    <section className="ait-section ait-built">
      <div className="ait-container">
        <span className="ait-sec-eyebrow ait-rv"><span className="num">03</span>Track Record</span>
        <h2 className="ait-sec-h ait-rv">What's Been <span className="ait-accent">Built</span></h2>

        <div className="ait-built__grid ait-rv">
          <div className="ait-built__stat">
            <div className="meta">Headline result</div>
            <div className="ait-built__num"><CountUp target={70} /><span className="suffix">%</span></div>
            <div className="ait-built__num-lbl">Manual work cut through custom AI automation for a client's marketing operations.</div>
          </div>
          <div className="ait-built__log">
            <div className="ait-built__log-h">$ build-log --recent</div>
            <ul>
              <li>Internal content hubs for employee advocacy programs</li>
              <li>Custom chatbots for LinkedIn ambassador{" "}toolkits</li>
              <li>AI-powered lead magnets and interactive assessment{" "}tools</li>
              <li>Automated workflow systems replacing manual marketing{" "}operations</li>
            </ul>
          </div>
        </div>
        <div className="ait-built__foot ait-rv">// Every project is built and handed off with training and documentation.</div>
      </div>
    </section>
  )
}

// ─── Client quote ─────────────────────────────────────────────────────────────
function AIToolsQuote() {
  return (
    <section className="ait-section ait-quote">
      <div className="ait-container">
        <span className="ait-sec-eyebrow ait-rv"><span className="num">04</span>Signal</span>
        <h2 className="ait-sec-h ait-rv">What a Client <span className="ait-accent">Says</span></h2>

        <div className="ait-quote__card ait-rv">
          <div className="ait-quote__bar">
            <span className="ait-win-dot ait-win-dot--r" />
            <span className="ait-win-dot ait-win-dot--y" />
            <span className="ait-win-dot ait-win-dot--g" />
            <span className="ait-quote__tag">verified.client</span>
          </div>
          <p className="ait-quote__text">The moment Hanita joined, marketing stopped being a drag and became a growth engine. There's a clear strategy, automation that actually works, and results we can measure over time.</p>
          <div className="ait-quote__who">
            <div className="ait-quote__avatar">SD</div>
            <div className="ait-quote__attr">
              <div className="n">Shimi Dvir</div>
              <div className="r">CEO, AcademAi</div>
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
    <section className="ait-section ait-hi">
      <div className="ait-container">
        <span className="ait-sec-eyebrow ait-rv"><span className="num">05</span>The Operator</span>
        <h2 className="ait-sec-h ait-rv">Hi, I'm <span className="ait-accent">Hanita</span></h2>

        <div className="ait-hi__grid">
          <div className="ait-hi__portrait ait-rv ait-rv--left">
            <div className="img">
              <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Headshot-1.png" loading="lazy" decoding="async" alt="Hanita Yudovski, founder of OctaLoom and host of the What's the Story With? B2B marketing podcast" onError={(e: any) => { e.target.style.display = "none"; if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = "flex" }} />
              <div className="ait-hi__portrait-fallback" style={{ display: "none" }}>HY</div>
            </div>
            <div className="ait-hi__opcard">
              <div className="row"><span className="k">role</span><span className="v">Fractional CMO + builder</span></div>
              <div className="row"><span className="k">builds</span><span className="v">Agents · Marketing Strategies · Workflows</span></div>
              <div className="row"><span className="k">stack</span><span className="v">Claude Code, Lovable, n8n</span></div>
              <div className="row"><span className="k">model</span><span className="v">Vibe Marketing</span></div>
            </div>
          </div>
          <div className="ait-hi__body ait-rv" style={{ transitionDelay: ".15s" }}>
            <p>Hi, I'm Hanita. I build AI solutions for B2B companies. Every day.</p>
            <p>I'm a <strong>LinkedIn-led Fractional CMO</strong>, and the AI layer is where my work gets technical. I build agents with Claude Code, design chatbots and GPTs, create vibe-coded landing pages and toolkits, and automate marketing workflows that used to eat hours of manual work.</p>
            <p>This is <strong>Vibe Marketing</strong> in action: I set the strategy, define the goals, and build the systems using AI at every step. One operator, full-stack marketing technology output.</p>
            <p>I host <strong>What's the Story With?</strong>, a B2B marketing podcast. And the tools I build for clients are the same tools I use to run my own marketing.</p>
            <div className="ait-hi__links">
              <a href="#"><svg className="ait-hi__links-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.5 18H6V10h2.5v8zM7.25 8.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM18 18h-2.5v-4.25c0-.97-.78-1.75-1.75-1.75S12 12.78 12 13.75V18H9.5v-8H12v1c.41-.69 1.32-1.25 2.25-1.25 1.93 0 3.5 1.57 3.5 3.5V18z" /></svg>Connect on LinkedIn {"→"}</a>
              <a href="#">Listen to the podcast {"→"}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQItem: React.FC<{ num: string; q: string; a: React.ReactNode }> = ({ num, q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={"ait-faq__item" + (open ? " open" : "")}>
      <button className="ait-faq__q" onClick={() => setOpen((p) => !p)}>
        <span className="ait-faq__q-num">{num}</span>
        <span className="ait-faq__q-text">{q}</span>
        <span className="ait-faq__toggle">{open ? "×" : "+"}</span>
      </button>
      <div className="ait-faq__a">
        <div className="ait-faq__a-inner">{a}</div>
      </div>
    </div>
  )
}

function AIToolsFAQ() {
  const faqs: Array<{ num: string; q: string; a: React.ReactNode }> = [
    { num: "01", q: "What's the difference between an AI agent and a chatbot?", a: "An agent takes action autonomously: it monitors, decides, and executes based on the rules and goals you set. A chatbot responds to input: you ask, it answers. Both are useful. They solve different problems and are priced separately." },
    { num: "02", q: "What tools do you build with?", a: "Claude Code (and open code projects) for agents and complex workflows. Custom GPT's builder and Google Gems for simpler tools. Lovable, Base 44 and Claude Design for vibe-coded landing pages and micro-sites. Make or n8n for integration layers where needed. Whatever fits the use case." },
    { num: "03", q: "How long does a typical project take?", a: "Simple chatbot or custom Gem: 1 to 3 weeks. Complex AI agent or vibe-coded micro-site: 2 to 6 weeks. Automation workflows: 2 to 4 weeks. Everything depends on scope, which we define together on the discovery call." },
    { num: "04", q: "Do I need technical knowledge to maintain what you build?", a: "No. Everything comes with training and documentation written for non-technical teams. If you can use a spreadsheet, you can maintain these tools." },
    { num: "05", q: "Can these integrate with my existing tools?", a: "Yes. Slack, WhatsApp, Telegram, your CRM, email platforms, scheduling tools. If it has an API, I can connect it. If it doesn't, we find another way." },
    { num: "06", q: "What if I need marketing strategy too, not just tools?", a: <>That's the <a href="https://www.octaloom.com/fractional-cmo" style={{ color: "var(--purple)", fontWeight: 700 }}>Fractional CMO</a> service. AI tools and agents are the execution layer. Strategy is the thinking layer. They pair naturally, and many clients use both.</> },
  ]
  return (
    <section className="ait-section ait-section--paper">
      <div className="ait-container ait-container--narrow">
        <span className="ait-sec-eyebrow ait-rv"><span className="num">06</span>Command Palette</span>
        <h2 className="ait-sec-h ait-rv">Frequently Asked <span className="ait-accent">Questions</span></h2>

        <div className="ait-faq__list ait-rv">
          {faqs.map((f) => <FAQItem key={f.num} num={f.num} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function AIToolsFinal() {
  return (
    <section className="ait-section ait-final" id="contact">
      <div className="ait-container ait-final__inner">
        <div className="ait-rv">
          <span className="ait-final__prompt">$ ./book-discovery-call --free</span>
        </div>
        <h2 className="ait-final__h ait-rv" style={{ transitionDelay: ".1s" }}>Ready to Build Something <br /><span className="ait-accent">That Actually Works?</span></h2>
        <p className="ait-final__sub ait-rv" style={{ transitionDelay: ".2s" }}>No demos. No proof-of-concept theater. Real AI solutions, built for your business, handed off with training.</p>
        <div className="ait-final__cta ait-rv" style={{ transitionDelay: ".3s" }}>
          <a className="ait-btn ait-btn--lime" href="https://calendar.notion.so/meet/octaloom/discovery">
            Book a Free Discovery Call
            <span className="ait-arrow">{"→"}</span>
          </a>
        </div>
        <p className="ait-final__small ait-rv" style={{ transitionDelay: ".4s" }}>(Tell me what you're trying to automate, build, or replace. I'll tell you if AI is the right solution or if something simpler works better.)</p>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function SiteFooter() {
  const w = useWindowWidth(), isMobile = w < 768
  const svcLinks = [
    { label: "For Organizations", href: "https://www.octaloom.com/linkedin-for-organizations" },
    { label: "For Executives", href: "https://www.octaloom.com/linkedin-for-executives" },
    { label: "For Solopreneurs", href: "https://www.octaloom.com/linkedin-for-solopreneurs" },
  ]
  const otherLinks = [
    { label: "Fractional CMO", href: "https://www.octaloom.com/fractional-cmo" },
    { label: "AI Tools & Agents", href: "https://www.octaloom.com/ai-tools-agents" },
    { label: "Workshops", href: "https://www.octaloom.com/workshops" },
  ]
  const pageLinks = [
    { label: "Home", href: "https://www.octaloom.com/" },
    { label: "About", href: "https://www.octaloom.com/about" },
    { label: "Blog", href: "https://www.octaloom.com/blog" },
    { label: "Contact", href: "#contact" },
  ]
  const legalLinks = [
    { label: "Privacy", href: "https://www.octaloom.com/privacy-policy" },
    { label: "Terms", href: "https://www.octaloom.com/terms" },
    { label: "Accessibility", href: "https://www.octaloom.com/accessibility" },
  ]
  const socials = [
    { href: "https://www.linkedin.com/in/hanita-yudovski/", label: "LinkedIn",
      icon: <svg viewBox="0 0 24 24"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.5 18H6V10h2.5v8zM7.25 8.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM18 18h-2.5v-4.25c0-.97-.78-1.75-1.75-1.75S12 12.78 12 13.75V18H9.5v-8H12v1c.41-.69 1.32-1.25 2.25-1.25 1.93 0 3.5 1.57 3.5 3.5V18z" /></svg> },
    { href: "https://instagram.com/", label: "Instagram",
      icon: <svg viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.23.41a3.7 3.7 0 011.38.9c.43.42.7.83.9 1.37.16.42.36 1.06.4 2.23.07 1.27.08 1.65.08 4.85s0 3.58-.07 4.85a6.5 6.5 0 01-.41 2.23 3.97 3.97 0 01-2.28 2.28c-.42.16-1.06.36-2.23.4-1.27.07-1.65.08-4.85.08s-3.58 0-4.85-.07a6.5 6.5 0 01-2.23-.41 3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.37 6.5 6.5 0 01-.4-2.23c-.07-1.27-.08-1.65-.08-4.85s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.2-.54.47-.95.9-1.38a3.7 3.7 0 011.37-.9c.42-.16 1.06-.36 2.23-.4 1.27-.07 1.65-.08 4.85-.08zM12 0C8.74 0 8.33 0 7.05.07 5.77.13 4.9.33 4.14.63a5.92 5.92 0 00-2.13 1.4A5.92 5.92 0 00.6 4.14 8.6 8.6 0 00.07 7.05C0 8.33 0 8.74 0 12s0 3.67.07 4.95c.06 1.28.26 2.15.56 2.91a5.92 5.92 0 001.4 2.13 5.92 5.92 0 002.13 1.4c.76.3 1.63.5 2.91.56 1.28.07 1.69.07 4.95.07s3.67 0 4.95-.07a8.6 8.6 0 002.91-.56 5.92 5.92 0 002.13-1.4 5.92 5.92 0 001.4-2.13c.3-.76.5-1.63.56-2.91.07-1.28.07-1.69.07-4.95s0-3.67-.07-4.95a8.6 8.6 0 00-.56-2.91 5.92 5.92 0 00-1.4-2.13A5.92 5.92 0 0019.86.6 8.6 8.6 0 0016.95.07C15.67 0 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /></svg> },
    { href: "https://facebook.com/", label: "Facebook",
      icon: <svg viewBox="0 0 24 24"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.5h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.61 23.1 24 18.1 24 12.07z" /></svg> },
    { href: "https://youtube.com/", label: "YouTube",
      icon: <svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 00-2.12-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.52A3 3 0 00.5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3 3 0 002.12 2.13C4.5 20.45 12 20.45 12 20.45s7.5 0 9.38-.52A3 3 0 0023.5 17.8C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.6 15.6V8.4l6.24 3.6L9.6 15.6z" /></svg> },
    { href: "https://spotify.com/", label: "Spotify",
      icon: <svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.5 17.34a.75.75 0 01-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 11-.34-1.46c4.58-1.04 8.51-.59 11.67 1.34.36.22.47.68.25 1.03zm1.47-3.27a.94.94 0 01-1.29.31c-3.23-1.98-8.16-2.56-11.98-1.4a.94.94 0 11-.55-1.8c4.37-1.32 9.81-.67 13.51 1.6.45.28.59.86.31 1.29zm.13-3.4c-3.87-2.3-10.27-2.51-13.97-1.39a1.13 1.13 0 11-.65-2.16C8.74 5.85 15.81 6.1 20.27 8.75a1.13 1.13 0 11-1.17 1.92z" /></svg> },
  ]

  return (
    <footer className="ait-footer">
      <div className="ait-container">
        <div className="ait-footer__grid">
          <div className="ait-footer__brand ait-footer__col">
            <img className="ait-footer__logo" src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png" alt="OctaLoom" onError={(e: any) => { e.target.style.display = "none" }} />
            <div className="ait-footer__tag">Your marketing department,<br />minus the department</div>
          </div>

          {!isMobile && (
            <div className="ait-footer__col">
              <div className="ait-footer__col-h">Pages</div>
              <ul>{pageLinks.map((l, i) => <li key={i}><a href={l.href}>{l.label}</a></li>)}</ul>
            </div>
          )}
          {!isMobile && (
            <div className="ait-footer__col">
              <div className="ait-footer__col-h">LinkedIn Services</div>
              <ul>{svcLinks.map((l, i) => <li key={i}><a href={l.href}>{l.label}</a></li>)}</ul>
            </div>
          )}
          {!isMobile && (
            <div className="ait-footer__col">
              <div className="ait-footer__col-h">More Services</div>
              <ul>{otherLinks.map((l, i) => <li key={i}><a href={l.href}>{l.label}</a></li>)}</ul>
            </div>
          )}
          {!isMobile && (
            <div className="ait-footer__col ait-footer__col--goodies">
              <ul>
                <li><a href="https://octagoodies.com">Free resources</a></li>
              </ul>
              <a className="ait-footer__goodies-logo" href="https://octagoodies.com" aria-label="OctaGoodies">
                <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/OCTAGOODIES%20GREEN.png" alt="OctaGoodies" onError={(e: any) => { e.target.style.display = "none" }} />
              </a>
            </div>
          )}

          <div className="ait-footer__col ait-footer__col--socials">
            {!isMobile && <div className="ait-footer__col-h">Follow</div>}
            <div className="ait-footer__socials">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="ait-footer__bottom">
          <span>{"©"} 2026 OctaLoom · All rights reserved</span>
          <div className="ait-footer__legal">
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
export default function AIToolsAgentsEN() {
  useGlobalStyles()
  useReveal()
  return (
    <div className="ait-page" dir="ltr" style={{ fontFamily: "'Aeonik', sans-serif" }}>
      <SiteNavbar />
      <AIToolsHero />
      <AIToolsIntro />
      <AIToolsApps />
      <AIToolsHow />
      <AIToolsBuilt />
      <AIToolsQuote />
      <AIToolsHanita />
      <AIToolsFAQ />
      <div className="ait-endzone">
        <AIToolsFinal />
        <SiteFooter />
      </div>
    </div>
  )
}
