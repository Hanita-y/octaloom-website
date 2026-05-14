// @framerSupportedLayoutWidth any
// @framerSupportedLayoutHeight any

import * as React from "react"
const { useState, useEffect, useRef } = React
import { motion, AnimatePresence } from "framer-motion"

// ─── Language ─────────────────────────────────────────────────────────────────
const LANG = "he"

// ─── Styles injection ─────────────────────────────────────────────────────────
function useGlobalStyles() {
  useEffect(() => {
    const id = "cmo-he-styles"
    if (document.getElementById(id)) return
    const s = document.createElement("style")
    s.id = id
    s.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@300;400;500;600;700&display=swap');
@font-face{font-family:'Discovery Fs';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/DiscoveryFs-Light.ttf') format('truetype');font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:'Discovery Fs';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/DiscoveryFs-Medium.ttf') format('truetype');font-weight:500 600 700;font-style:normal;font-display:swap}
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Regular.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Bold.ttf') format('truetype');font-weight:700;font-style:normal;font-display:swap}
:root{--purple:#712eac;--deep-purple:#201e4b;--navy:#060d3d;--ink:#1c1a3c;--lime:#c5e6a2;--lime-2:#c6e1a5;--cream:#ece9e7;--warm-white:#f7f5f2;--paper:#f3efe9;--rule-dark:rgba(28,26,60,0.12);--rule-soft:rgba(28,26,60,0.06);--text-dark:#201e4b;--text-mid:#3d3a5c;--text-soft:#6b6680;--text-light:#ece9e7;--font-he:'Discovery Fs','Noto Sans Hebrew',sans-serif;--font-en:'Aeonik',sans-serif}
.cmo-he *,.cmo-he *::before,.cmo-he *::after{margin:0;padding:0;box-sizing:border-box}
.cmo-he{font-family:var(--font-he);background:var(--cream);color:var(--text-dark);line-height:1.7;overflow-x:hidden;direction:rtl;-webkit-font-smoothing:antialiased}
.cmo-he a{color:inherit;text-decoration:none}
.cmo-he button{font-family:inherit;border:none;background:none;cursor:pointer;color:inherit}
.cmo-he img{display:block;max-width:100%}
.cmo-he .ltr{direction:ltr;unicode-bidi:embed;display:inline-block}
.cmo-container{max-width:1200px;margin:0 auto;padding:0 clamp(20px,5vw,56px)}
.cmo-container--narrow{max-width:920px;margin:0 auto;padding:0 clamp(20px,5vw,56px)}
.rv{opacity:0;transform:translateY(36px);transition:opacity 0.8s cubic-bezier(.16,1,.3,1),transform 0.8s cubic-bezier(.16,1,.3,1),filter 0.8s cubic-bezier(.16,1,.3,1)}
.rv.in{opacity:1!important;transform:translateY(0)!important;filter:none!important}
.rv--right{transform:translateX(40px) translateY(0)}.rv--right.in{transform:translateX(0)!important}
.rv--left{transform:translateX(-40px) translateY(0)}.rv--left.in{transform:translateX(0)!important}
.cmo-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 28px;border-radius:8px;font-size:16px;font-weight:700;transition:all 0.25s;cursor:pointer;white-space:nowrap;border:1.5px solid transparent;font-family:var(--font-he);text-decoration:none}
.cmo-btn--purple{background:var(--purple);color:#fff}.cmo-btn--purple:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(113,46,172,0.35)}
.cmo-btn--lime{background:var(--lime);color:var(--purple)}.cmo-btn--lime:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(197,230,162,0.5)}
.cmo-btn .arrow{transition:transform 0.25s}.cmo-btn:hover .arrow{transform:translateX(-4px)}
.cmo-section{padding:clamp(72px,11vw,130px) 0;position:relative}
.cmo-section--cream{background:var(--cream)}
.cmo-section--paper{background:var(--paper)}
.cmo-section--navy{background:var(--deep-purple);color:var(--text-light)}
.cmo-section--lime{background:var(--lime);color:var(--ink)}
.cmo-section--purple{background:var(--purple);color:var(--cream)}
.cmo-section--purple .sec-title{color:var(--cream)}
.sec-title{font-size:clamp(28px,4vw,44px);line-height:1.25;margin-bottom:24px;font-weight:700;color:var(--deep-purple);max-width:880px}
.cmo-section--navy .sec-title{color:var(--text-light)}
.cmo-section--lime .sec-title{color:var(--ink)}
.cmo-hero{position:relative;padding:clamp(150px,17vw,210px) 0 clamp(80px,11vw,140px);background:var(--deep-purple);color:var(--text-light);overflow:hidden}
.cmo-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(50% 40% at 20% 10%,rgba(113,46,172,0.4),transparent 65%),radial-gradient(60% 50% at 90% 100%,rgba(197,230,162,0.12),transparent 70%);pointer-events:none}
.cmo-hero__inner{position:relative;z-index:2}
.cmo-hero__grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:clamp(40px,5vw,64px);align-items:center}
.cmo-hero__label{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:var(--lime);margin-bottom:24px}
.cmo-hero__label .dot{width:6px;height:6px;border-radius:50%;background:var(--lime)}
.cmo-hero__h1{font-size:clamp(34px,5.2vw,60px);font-weight:700;line-height:1.18;color:var(--lime);max-width:640px;margin-bottom:24px}
.cmo-hero__sub{font-size:clamp(15px,1.4vw,17px);line-height:1.85;color:rgba(236,233,231,0.85);max-width:580px;margin-bottom:16px}
.cmo-hero__sub strong{color:var(--cream);font-weight:700}
.cmo-hero__cta-row{display:flex;flex-wrap:wrap;gap:14px;margin-top:16px}
.orgchart{position:relative;padding:28px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:0 20px 60px rgba(0,0,0,0.3)}
.orgchart__title{font-size:12px;color:rgba(255,255,255,0.55);margin-bottom:18px;font-weight:700;display:flex;justify-content:space-between;align-items:center}
.orgchart__title .total{color:var(--lime)}
.orgchart__row{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:32px;position:relative}
.orgchart__hire{padding:12px 8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;text-align:center;transition:opacity 0.8s ease,filter 0.8s ease,transform 0.8s ease}
.orgchart__hire .role{font-size:11px;color:rgba(255,255,255,0.7);margin-bottom:6px;line-height:1.25;min-height:30px;display:flex;align-items:center;justify-content:center}
.orgchart__hire .salary{font-size:13px;font-weight:700;color:#fff}
.orgchart.collapse .orgchart__hire{opacity:0.28;filter:grayscale(1);transform:translateY(-4px)}
.orgchart__conn{position:relative;height:48px;margin-bottom:16px}
.orgchart__conn svg{width:100%;height:100%;display:block;overflow:visible}
.orgchart__conn path{fill:none;stroke:rgba(255,255,255,0.2);stroke-width:1;stroke-dasharray:3 4;transition:stroke 0.8s ease}
.orgchart.collapse .orgchart__conn path{stroke:rgba(197,230,162,0.5)}
.orgchart__node{display:flex;align-items:center;gap:16px;padding:16px 18px;background:linear-gradient(135deg,rgba(197,230,162,0.1),rgba(197,230,162,0.04));border:1px solid rgba(197,230,162,0.3);border-radius:12px;position:relative;transition:border-color 0.8s ease,box-shadow 0.8s ease,background 0.8s ease}
.orgchart.collapse .orgchart__node{border-color:var(--lime);background:linear-gradient(135deg,rgba(197,230,162,0.18),rgba(197,230,162,0.08));box-shadow:0 0 40px rgba(197,230,162,0.25)}
.orgchart__avatar{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--purple),var(--deep-purple));display:flex;align-items:center;justify-content:center;color:var(--lime);font-weight:700;font-size:16px;flex-shrink:0;overflow:hidden;border:2px solid rgba(197,230,162,0.4)}
.orgchart__avatar img{width:100%;height:100%;object-fit:cover}
.orgchart__node-info{flex:1}
.orgchart__node-info .n{font-size:14px;font-weight:700;color:#fff}
.orgchart__node-info .r{font-size:11px;color:var(--lime);margin-top:2px}
.orgchart__node-tag{font-size:11px;font-weight:700;color:var(--lime);padding:6px 10px;background:rgba(197,230,162,0.12);border-radius:100px;white-space:nowrap}
.orgchart__legend{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:18px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);font-size:11px;color:rgba(255,255,255,0.55)}
.orgchart__legend .sw{display:inline-flex;align-items:center;gap:6px}
.orgchart__legend .sw::before{content:'';width:10px;height:10px;border-radius:2px;background:rgba(255,255,255,0.2)}
.orgchart__legend .sw--lime::before{background:var(--lime)}
.what{background:#ece9e8}
.what__intro{font-size:17px;line-height:1.8;color:var(--text-mid);margin-bottom:clamp(36px,5vw,48px);max-width:800px}
.what__intro strong{color:var(--deep-purple);font-weight:700}
.what__grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.what__card{padding:22px 24px;background:#fff;border:1px solid var(--rule-dark);border-radius:12px;display:flex;gap:16px;align-items:flex-start;transition:transform 0.4s cubic-bezier(.16,1,.3,1),box-shadow 0.4s,border-color 0.4s}
.what__card:hover{transform:translateY(-3px);box-shadow:0 14px 32px rgba(28,26,60,0.08);border-color:rgba(113,46,172,0.25)}
.what__check{flex-shrink:0;width:28px;height:28px;border-radius:8px;background:rgba(197,230,162,0.5);color:var(--ink);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700}
.what__card p{font-size:15px;line-height:1.7;color:var(--text-dark)}
.what__card p strong{color:var(--deep-purple);font-weight:700}
.what__brand{margin-top:clamp(28px,4vw,40px);padding:28px 32px;background:rgba(113,46,172,0.05);border:1px solid rgba(113,46,172,0.15);border-radius:14px;font-size:16px;line-height:1.85;color:var(--text-dark)}
.what__brand strong{color:var(--purple);font-weight:700}
.what__time{margin-top:18px;padding:24px 32px;background:var(--deep-purple);color:var(--text-light);border-radius:14px;display:flex;align-items:center;gap:20px;flex-wrap:wrap}
.what__time .label{font-size:12px;color:var(--lime);font-weight:700;flex-shrink:0}
.what__time .val{font-size:16px;line-height:1.7;color:rgba(255,255,255,0.85)}
.vibe__intro{font-size:17px;line-height:1.85;color:rgba(236,233,231,0.78);margin-bottom:clamp(40px,5vw,56px);max-width:800px}
.vibe__steps{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}
.vibe__step{padding:28px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:14px;transition:border-color 0.4s,transform 0.4s,background 0.4s}
.vibe__step:hover{border-color:rgba(197,230,162,0.4);transform:translateY(-3px);background:rgba(255,255,255,0.06)}
.vibe__step .n{font-size:13px;font-weight:700;color:var(--lime);margin-bottom:14px;display:inline-flex;align-items:center;gap:8px}
.vibe__step .n::before{content:'';width:16px;height:1px;background:var(--lime)}
.vibe__step h3{font-size:19px;font-weight:700;color:var(--lime);margin-bottom:8px}
.vibe__step p{font-size:15px;line-height:1.8;color:rgba(255,255,255,0.82)}
.vibe__step p strong{color:#fff;font-weight:700}
.vibe__close{margin-top:clamp(32px,4vw,44px);font-size:17px;line-height:1.85;color:rgba(236,233,231,0.92);max-width:820px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.12)}
.vibe__close strong{color:var(--lime);font-weight:700}
.fit__grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,3vw,32px)}
.fit__col{padding:32px;background:#ece9e8;border:1px solid rgba(236,233,231,0.12);border-radius:14px}
.fit__col--yes{background:linear-gradient(180deg,rgba(197,230,162,0.35) 0%,#ece9e8 35%);border-color:rgba(197,230,162,0.5)}
.fit__col h3{display:flex;align-items:center;gap:14px;font-size:22px;font-weight:700;color:var(--deep-purple);margin-bottom:22px}
.fit__col .glyph{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;flex-shrink:0}
.fit__col--yes .glyph{background:var(--lime);color:var(--ink)}
.fit__col--no .glyph{background:rgba(28,26,60,0.06);color:var(--text-mid)}
.fit__list{list-style:none}
.fit__list li{display:flex;gap:14px;padding:16px 0;border-bottom:1px solid var(--rule-soft);font-size:15px;line-height:1.75;color:var(--text-dark)}
.fit__list li:last-child{border-bottom:none}
.fit__list .marker{flex-shrink:0;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;margin-top:3px}
.fit__col--yes .marker{background:var(--lime);color:var(--ink)}
.fit__col--no .marker{background:rgba(28,26,60,0.06);color:var(--text-soft)}
.compare__lead{font-size:18px;font-weight:700;color:var(--deep-purple);margin-bottom:clamp(32px,4vw,44px)}
.compare__grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}
.compare__card{padding:32px 30px;background:#ece9e8;border:2px solid rgba(113,46,172,0.28);border-radius:16px;box-shadow:0 0 28px rgba(113,46,172,0.14);transition:transform 0.4s cubic-bezier(.16,1,.3,1),box-shadow 0.4s,border-color 0.4s}
.compare__card:hover{transform:translateY(-4px);border-color:rgba(113,46,172,0.55);box-shadow:0 0 48px rgba(113,46,172,0.32),0 16px 36px rgba(28,26,60,0.1)}
.compare__card .ico{width:44px;height:44px;border-radius:12px;background:rgba(113,46,172,0.1);color:var(--purple);display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:16px}
.compare__card h3{font-size:20px;font-weight:700;color:var(--deep-purple);margin-bottom:10px}
.compare__card p{font-size:15px;line-height:1.8;color:var(--text-mid)}
.compare__card--win{grid-column:1 / -1;background:linear-gradient(#712eac,#712eac) padding-box,linear-gradient(135deg,var(--deep-purple) 0%,var(--lime) 50%,var(--deep-purple) 100%) border-box;background-size:auto,200% 200%;background-position:0 0,0% 50%;border:2.5px solid transparent;box-shadow:0 0 50px rgba(113,46,172,0.4);animation:cmpBorderShift 6s ease infinite}
@keyframes cmpBorderShift{0%,100%{background-position:0 0,0% 50%}50%{background-position:0 0,100% 50%}}
.compare__card--win:hover{transform:translateY(-4px);box-shadow:0 0 70px rgba(113,46,172,0.55)}
.compare__card--win .ico{background:rgba(197,230,162,0.15);color:var(--lime)}
.compare__card--win h3{color:var(--lime);font-size:24px}
.compare__card--win p{color:rgba(236,233,231,0.85)}
.compare__stats{display:flex;gap:32px;margin:18px 0 20px;flex-wrap:wrap}
.compare__stat{display:flex;flex-direction:column}
.compare__stat .num{font-size:clamp(34px,4vw,46px);font-weight:700;color:var(--lime);line-height:1;display:inline-flex;align-items:baseline}
.compare__stat .num .suffix{font-size:0.5em;margin-right:0.04em}
.compare__stat .lbl{font-size:13px;color:rgba(236,233,231,0.7);margin-top:8px}
.incl{background:var(--lime);color:var(--ink)}
.incl .sec-title{color:var(--deep-purple)}
.incl__grid{margin-top:clamp(36px,5vw,48px);display:grid;grid-template-columns:1fr;border-top:1px solid rgba(28,26,60,0.15);max-width:960px;margin-right:auto;margin-left:auto}
.incl__card{padding:20px 4px;border-bottom:1px solid rgba(28,26,60,0.15);display:flex;gap:14px;align-items:flex-start;transition:padding-right 0.3s ease}
.incl__card:hover{padding-right:12px}
.incl__card::before{content:'\\2713';flex-shrink:0;width:26px;height:26px;border-radius:50%;background:var(--purple);color:var(--lime);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;margin-top:2px}
.incl__card .body{font-size:15px;line-height:1.75;color:var(--text-dark)}
.incl__card .body strong{font-weight:700;color:var(--deep-purple)}
.incl__bonus{max-width:960px;margin:24px auto 0;padding:18px 24px;background:rgba(113,46,172,0.08);border:1px solid rgba(113,46,172,0.2);border-radius:12px;font-size:15px;line-height:1.7;color:var(--deep-purple)}
.incl__bonus strong{font-weight:700}
.noincl__grid{margin-top:clamp(36px,5vw,48px);display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px}
.noincl__item{padding:28px;background:#ece9e8;border:1px solid rgba(255,255,255,0.18);border-radius:12px;transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s}
.noincl__item:hover{border-color:var(--lime);transform:translateY(-3px);box-shadow:0 14px 32px rgba(0,0,0,0.15)}
.noincl__item .ico{width:36px;height:36px;border-radius:50%;background:var(--purple);color:var(--lime);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;margin-bottom:18px}
.noincl__item h4{font-size:18px;font-weight:700;color:var(--deep-purple);margin-bottom:10px}
.noincl__item p{font-size:14px;line-height:1.8;color:var(--text-mid)}
.how{background:var(--paper)}
.how__grid{margin-top:clamp(36px,5vw,48px);display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}
.how__step{padding:32px 28px;background:#ece9e8;border:1px solid var(--rule-dark);border-radius:14px;position:relative}
.how__step::before{content:'';position:absolute;top:-1px;right:28px;left:28px;height:3px;background:linear-gradient(90deg,var(--purple),var(--lime));border-radius:0 0 4px 4px}
.how__step .n{font-size:12px;font-weight:700;color:var(--purple);margin-bottom:12px;margin-top:8px}
.how__step h3{font-size:22px;font-weight:700;color:var(--deep-purple);margin-bottom:12px}
.how__step p{font-size:15px;line-height:1.8;color:var(--text-mid)}
.results{background:var(--lime);color:var(--ink)}
.results__grid{margin-top:clamp(40px,5vw,56px);display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,3vw,36px)}
.results__block{padding:32px;background:rgba(255,255,255,0.4);border:1px solid rgba(28,26,60,0.1);border-radius:14px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.results__block h3{font-size:17px;font-weight:700;color:var(--deep-purple);margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid rgba(28,26,60,0.15)}
.results__list{list-style:none}
.results__list li{display:flex;gap:12px;padding:10px 0;font-size:15px;line-height:1.7;color:var(--text-dark)}
.results__list li::before{content:'';flex-shrink:0;width:6px;height:6px;border-radius:50%;background:var(--purple);margin-top:11px}
.results__list li strong{font-weight:700;color:var(--deep-purple)}
.test__grid{margin-top:clamp(36px,5vw,48px);display:grid;grid-template-columns:1fr 1fr;gap:20px}
.test__card{padding:32px 28px;background:#fff;border:1px solid var(--rule-dark);border-radius:14px;transition:transform 0.4s,box-shadow 0.4s,border-color 0.4s}
.test__card:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(28,26,60,0.08);border-color:rgba(113,46,172,0.25)}
.test__quote-mark{font-size:56px;font-weight:700;color:var(--purple);line-height:0.5;opacity:0.4;margin-bottom:12px}
.test__quote{font-size:15px;line-height:1.8;color:var(--text-dark);margin-bottom:22px}
.test__attr{padding-top:16px;border-top:1px solid var(--rule-soft)}
.test__attr .n{font-size:15px;font-weight:700;color:var(--deep-purple)}
.test__attr .r{font-size:13px;color:var(--text-soft);margin-top:4px}
.hi{background:var(--lime);color:var(--ink)}
.hi .sec-title{color:var(--deep-purple)}
.hi__grid{margin-top:clamp(36px,5vw,48px);display:grid;grid-template-columns:0.75fr 1.25fr;gap:clamp(40px,5vw,72px);align-items:start}
.hi__portrait{width:100%;aspect-ratio:4/5;border-radius:14px;overflow:hidden;background:linear-gradient(160deg,#2a2554,var(--deep-purple));position:relative;box-shadow:0 0 80px rgba(113,46,172,0.55),0 0 160px rgba(113,46,172,0.35),0 20px 50px rgba(28,26,60,0.18);animation:hiGlow 5s ease-in-out infinite}
@keyframes hiGlow{0%,100%{box-shadow:0 0 80px rgba(113,46,172,0.55),0 0 160px rgba(113,46,172,0.35),0 20px 50px rgba(28,26,60,0.18)}50%{box-shadow:0 0 100px rgba(113,46,172,0.7),0 0 200px rgba(113,46,172,0.45),0 20px 50px rgba(28,26,60,0.18)}}
.hi__portrait img{width:100%;height:100%;object-fit:cover}
.hi__portrait::after{content:'';position:absolute;inset:0;background:radial-gradient(60% 40% at 50% 80%,rgba(197,230,162,0.2),transparent 70%);pointer-events:none}
.hi__portrait-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:180px;color:var(--lime);opacity:0.4;font-weight:700}
.hi__body p{font-size:17px;line-height:1.85;color:var(--text-dark);margin-bottom:18px}
.hi__body p:first-child{font-size:clamp(19px,2vw,23px);line-height:1.6;color:var(--deep-purple);font-weight:700;margin-bottom:22px}
.hi__body strong{color:var(--purple);font-weight:700}
.hi__links{margin-top:28px;display:flex;gap:16px;flex-wrap:wrap}
.hi__links a{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:100px;border:1.5px solid var(--rule-dark);font-size:14px;font-weight:700;color:var(--deep-purple);transition:all 0.25s}
.hi__links a:hover{background:var(--deep-purple);color:var(--cream);border-color:var(--deep-purple)}
.faq__list{margin-top:clamp(36px,5vw,48px)}
.faq__item{background:#ece9e8;border:1px solid rgba(28,26,60,0.08);border-radius:12px;margin-bottom:10px;overflow:hidden;transition:border-color 0.3s}
.faq__item.open{border-color:var(--purple)}
.faq__q{display:flex;align-items:center;justify-content:space-between;width:100%;padding:22px 26px;gap:18px;text-align:right;cursor:pointer}
.faq__q-text{font-size:18px;font-weight:700;color:var(--deep-purple);flex:1;line-height:1.4}
.faq__toggle{flex-shrink:0;width:34px;height:34px;border-radius:50%;background:rgba(113,46,172,0.08);color:var(--purple);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;transition:transform 0.4s cubic-bezier(.16,1,.3,1),background 0.3s,color 0.3s}
.faq__item.open .faq__toggle{background:var(--purple);color:var(--lime);transform:rotate(45deg)}
.faq__a{max-height:0;overflow:hidden;transition:max-height 0.5s cubic-bezier(.16,1,.3,1)}
.faq__a-inner{padding:0 26px 24px 26px;font-size:15px;line-height:1.85;color:var(--text-mid)}
.faq__item.open .faq__a{max-height:600px}
.final{background:var(--deep-purple);color:var(--text-light);text-align:center;padding:clamp(80px,13vw,150px) 0;position:relative;overflow:hidden}
.final::before{content:'';position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 50%,rgba(113,46,172,0.4),transparent 65%),radial-gradient(40% 30% at 20% 80%,rgba(197,230,162,0.1),transparent 65%);pointer-events:none}
.final__inner{position:relative;z-index:2}
.final__h{font-size:clamp(32px,5vw,56px);font-weight:700;line-height:1.2;max-width:880px;margin:0 auto;color:#fff}
.final__sub{margin:28px auto 0;max-width:620px;font-size:17px;line-height:1.85;color:rgba(255,255,255,0.7)}
.final__cta{margin-top:36px}
.final__cta .cmo-btn{padding:14px 30px;font-size:16px}
.final__alt{margin-top:28px;font-size:14px;color:rgba(255,255,255,0.6);display:flex;gap:18px;justify-content:center;flex-wrap:wrap}
.final__alt a{color:var(--lime);border-bottom:1px solid rgba(197,230,162,0.4);padding-bottom:2px;transition:border-color 0.2s}
.final__alt a:hover{border-color:var(--lime)}
@media (max-width:1024px){.noincl__grid{grid-template-columns:1fr 1fr}}
@media (max-width:980px){.cmo-hero__grid{grid-template-columns:1fr}}
@media (max-width:880px){.vibe__steps{grid-template-columns:1fr}.noincl__grid{grid-template-columns:1fr}.how__grid{grid-template-columns:1fr}.results__grid{grid-template-columns:1fr}.hi__grid{grid-template-columns:1fr}.hi__portrait{max-width:360px}}
@media (max-width:740px){.what__grid{grid-template-columns:1fr}.fit__grid{grid-template-columns:1fr}.compare__grid{grid-template-columns:1fr}.compare__card--win{grid-column:auto}.test__grid{grid-template-columns:1fr}}
@media (max-width:540px){.cmo-btn{padding:13px 22px;font-size:15px}.cmo-section{padding:72px 0}.what__time{padding:22px}}
@media (max-width:480px){.orgchart__row{gap:4px}.orgchart__hire{padding:8px 4px}.orgchart__hire .role{font-size:9px;min-height:26px}.orgchart__hire .salary{font-size:11px}}
@media (prefers-reduced-motion:reduce){.rv{opacity:1;transform:none}.compare__card--win,.hi__portrait{animation:none}}
`
    document.head.appendChild(s)
  }, [])
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
    document.querySelectorAll(".rv").forEach((el) => io.observe(el))
    const tm = setTimeout(() => {
      document.querySelectorAll(".rv:not(.in)").forEach((el) => {
        const r = (el as HTMLElement).getBoundingClientRect()
        if (r.top < window.innerHeight) el.classList.add("in")
      })
    }, 200)
    return () => { io.disconnect(); clearTimeout(tm) }
  }, [])
}

// ─── Counter ──────────────────────────────────────────────────────────────────
const Counter: React.FC<{ target: number }> = ({ target }) => {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now()
            const dur = 1600
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
      { threshold: 0.4 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{val.toLocaleString()}</span>
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────
const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={"faq__item rv" + (open ? " open" : "")}>
      <button className="faq__q" onClick={() => setOpen((p) => !p)}>
        <span className="faq__q-text">{q}</span>
        <span className="faq__toggle">{open ? "×" : "+"}</span>
      </button>
      <div className="faq__a">
        <div className="faq__a-inner">{a}</div>
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function CmoHero() {
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    const tm = setTimeout(() => setCollapsed(true), 1400)
    return () => clearTimeout(tm)
  }, [])
  return (
    <header className="cmo-hero">
      <div className="cmo-container cmo-hero__inner">
        <div className="cmo-hero__grid">
          <div>
            <div className="cmo-hero__label rv"><span className="dot"></span>סמנכ"לית שיווק במיקור חוץ</div>
            <h1 className="cmo-hero__h1 rv" style={{ transitionDelay: ".1s" }}>כל מה שמחלקת<br/>שיווק שלמה עושה.<br/>רק בלי המחלקה.</h1>
            <p className="cmo-hero__sub rv" style={{ transitionDelay: ".2s" }}>הפיץ' למשקיעים מושלם. המוצר עובד. עכשיו צריך לגדול, להגיע ליותר משתמשים, לגרום לאנשים להכיר אתכם. אבל מה שנדחק שוב ושוב בין ישיבת דירקטוריון לסבב גיוס הוא כל מה שקשור לשיווק.</p>
            <p className="cmo-hero__sub rv" style={{ transitionDelay: ".25s" }}>ואתם כבר מבינים שזה לא עוד <span className="ltr">one-pager</span> ולוגו חדש. צריך תשתיות שיווק אמיתיות: מה המסרים שלכם? מה ה-<span className="ltr">GTM</span>? מה ה-<span className="ltr">USP</span> וה-<span className="ltr">Value Proposition</span>? איך מתרגמים את זה לעשייה? ואיך מגיעים למקבלי ההחלטות השונים, בערוצים הנכונים, בתזמון הנכון?</p>
            <p className="cmo-hero__sub rv" style={{ transitionDelay: ".3s" }}>הקמתי את <span className="ltr">OctaLoom</span> בדיוק בשביל זה. כסמנכ"לית שיווק במיקור חוץ שמאמינה בלינקדאין כמנוע צמיחה (<span className="ltr">LinkedIn-Led Fractional CMO</span>), אני מובילה את השיווק שלכם עם סיסטמים חכמים, סוכני <span className="ltr">AI</span> וכלי <span className="ltr">AI</span> שמחליפים צוותים שלמים. <strong>בת אדם אחת, בקצב של מחלקה שלמה.</strong> מה שנקרא וויב מרקטינג (<span className="ltr">Vibe Marketing</span>).</p>
            <div className="cmo-hero__cta-row rv" style={{ transitionDelay: ".4s" }}>
              <a className="cmo-btn cmo-btn--lime" href="https://calendar.notion.so/meet/octaloom/discovery">
                בואו נדבר
                <span className="arrow">←</span>
              </a>
            </div>
          </div>
          <div className="rv rv--left" style={{ transitionDelay: ".3s" }}>
            <div className={"orgchart" + (collapsed ? " collapse" : "")}>
              <div className="orgchart__title">
                <span>כמה זה היה עולה לבנות מחלקה פנימית (In-house)</span>
                <span className="total ltr">₪110K</span>
              </div>
              <div className="orgchart__row">
                <div className="orgchart__hire"><div className="role">סמנכ"ל/ית שיווק</div><div className="salary ltr">₪40K</div></div>
                <div className="orgchart__hire"><div className="role">מנהל/ת שיווק</div><div className="salary ltr">₪22K</div></div>
                <div className="orgchart__hire"><div className="role">כותב/ת תוכן</div><div className="salary ltr">₪15K</div></div>
                <div className="orgchart__hire"><div className="role">מעצב/ת</div><div className="salary ltr">₪15K</div></div>
                <div className="orgchart__hire"><div className="role">מומחה/ית אוטומציה</div><div className="salary ltr">₪18K</div></div>
              </div>
              <div className="orgchart__conn">
                <svg viewBox="0 0 500 48" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M50 0 Q50 24 250 36"/>
                  <path d="M150 0 Q150 18 250 36"/>
                  <path d="M250 0 L250 36"/>
                  <path d="M350 0 Q350 18 250 36"/>
                  <path d="M450 0 Q450 24 250 36"/>
                </svg>
              </div>
              <div className="orgchart__node">
                <div className="orgchart__avatar">
                  <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Headshot-1.png" alt="" onError={(e: any) => { e.target.style.display = "none"; e.target.parentNode.textContent = "HY" }} />
                </div>
                <div className="orgchart__node-info">
                  <div className="n">OctaLoom · חניתה יודובסקי</div>
                  <div className="r">סמנכ"לית שיווק במיקור חוץ · על בסיס שיווק AI חכם</div>
                </div>
                <div className="orgchart__node-tag">אופרטורית אחת</div>
              </div>
              <div className="orgchart__legend">
                <span className="sw">גיוס מחלקה בבית</span>
                <span className="sw sw--lime">החלופה של OctaLoom</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// ─── What ─────────────────────────────────────────────────────────────────────
const WHAT_ITEMS: Array<{ b: string; rest: string }> = [
  { b: "אסטרטגיית שיווק שלמה ותוכנית עבודה ל-12 חודשים:", rest: " הגדרת קהל יעד, מיצוב, מסרים, USP, value proposition" },
  { b: "אסטרטגיית Go-to-market (גו-טו-מרקט):", rest: " איך מגיעים למקבלי ההחלטות השונים, באילו ערוצים, באיזה תזמון" },
  { b: "לינקדאין כערוץ מרכזי:", rest: " ניהול לינקדאין ארגוני + פרופיל מנכ\"ל. לינקדאין היא הליבה של OctaLoom, המקום שבו עסקאות B2B מתחילות. כל שאר הערוצים סובבים סביבו." },
  { b: "פלטפורמות חברתיות נוספות במידה וצריך:", rest: " אינסטגרם, פייסבוק, או כל פלטפורמה רלוונטית לקהל שלכם" },
  { b: "עמודי נחיתה ואימייל מרקטינג:", rest: " בנייה והפעלה של כל מה שצריך כדי להמיר תנועה ללידים" },
  { b: "ניהול כל הנכסים השיווקיים", rest: " שכבר קיימים + הקמה של חדשים במידת הצורך" },
  { b: "אירועים, PR, נוכחות מדיה:", rest: " כנסים, פודקאסטים, כתבות. להיות נוכחים במקומות שבהם מקבלי ההחלטות שמים לב." },
  { b: "פרסום ממומן:", rest: " מודעות, קמפיינים, הקצאת תקציבים" },
  { b: "אוטומציות שיווק ותהליכי AI:", rest: " N8N, Make, Zapier, Claude, CRM, סוכני AI מותאמים" },
  { b: "מעקב ביצועים וסקירה אסטרטגית חודשית", rest: "" },
]
function CmoWhat() {
  return (
    <section className="cmo-section what" id="what">
      <div className="cmo-container">
        <h2 className="sec-title rv">מה סמנכ"לית שיווק במיקור חוץ עושה?</h2>
        <p className="what__intro rv">בגדול, כל מה שמחלקת שיווק של 5 אנשים עושה. רק שהיום, עם הסיסטמים והכלים הנכונים, לא צריך 5 אנשים. צריך את <strong>הראש הנכון</strong>. הנה מה שנראה כשנעבוד יחד:</p>
        <div className="what__grid">
          {WHAT_ITEMS.map((it, i) => (
            <div className="what__card rv" key={i} style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="what__check">{"✓"}</div>
              <p><strong>{it.b}</strong>{it.rest}</p>
            </div>
          ))}
        </div>
        <div className="what__brand rv">
          ולגבי <strong>brand awareness</strong>: זה לא "נחמד שיהיה." מחזור מכירות B2B ארוך, הלקוחות שלכם צריכים לראות אתכם 7-10 פעמים לפני שהם בכלל יחליטו לפנות אליכם. המותג המצליח הוא הנוכח ביותר. ב-OctaLoom, נוכחות מותגית היא הבסיס לכל אסטרטגיה, והיא לא אופציה.
        </div>
        <div className="what__time rv">
          <span className="label">היקף העבודה</span>
          <span className="val">היקף העבודה שלי הוא לרוב כ-20-25+ שעות בחודש, אך יש גמישות לפי הסקופ (עולה בתקופות השקה או צמיחה מואצת).</span>
        </div>
      </div>
    </section>
  )
}

// ─── Vibe ─────────────────────────────────────────────────────────────────────
function CmoVibe() {
  return (
    <section className="cmo-section cmo-section--purple">
      <div className="cmo-container">
        <h2 className="sec-title rv">מה זה וויב מרקטינג? (ולמה זה משנה לכם)</h2>
        <p className="vibe__intro rv">וויב מרקטינג (<span className="ltr">Vibe Marketing</span>) זו המתודולוגיה של <span className="ltr">OctaLoom</span>. הרעיון מבוסס על וויב קודינג (<span className="ltr">Vibe Coding</span>) של אנדרג' קרפאת'י: מבינים מה צריך, מאפיינים ומתאים וה-<span className="ltr">AI</span> בונה. אותו דבר בשיווק. איך זה עובד בפועל:</p>
        <div className="vibe__steps">
          <div className="vibe__step rv">
            <div className="n">01</div>
            <h3>חשיבה אסטרטגית</h3>
            <p>כיוון, מיצוב, מסרים, החלטות שדורשות בינה אנושית. <span className="ltr">AI</span> לא יכול להחליט מה ה-<span className="ltr">value proposition</span> שלכם. <strong>אני כן.</strong></p>
          </div>
          <div className="vibe__step rv" style={{ transitionDelay: ".1s" }}>
            <div className="n">02</div>
            <h3>סיסטמים חכמים + סוכני AI</h3>
            <p>תוכן, אוטומציות, דפי נחיתה, מיקרו-סייטים, עיצוב, תהליכי עבודה. כל זה בנוי בקצב שפעם דרש 5 אנשים. כלים כמו <span className="ltr">N8N, Make, Claude</span>, וסוכנים שבניתי בעצמי מחליפים צוותים שלמים.</p>
          </div>
          <div className="vibe__step rv" style={{ transitionDelay: ".2s" }}>
            <div className="n">03</div>
            <h3>בינה אנושית</h3>
            <p>קול, טון, החלטות טקטיות שדורשות הבנה של הקונטקסט, של התחום שלכם, ושל מה הלקוחות שלכם באמת צריכים לשמוע.</p>
          </div>
        </div>
        <p className="vibe__close rv">למה זה משנה לכם? כי סוכנויות עדיין בנויות על <span className="ltr">headcount</span>. הן מוסיפות אנשים כדי לגדול.<br/><strong>OctaLoom בנויה על יעילות:</strong> <span className="ltr">One-women-show</span> עם הסיסטמים הנכונים, בקצב של מחלקה שלמה.</p>
      </div>
    </section>
  )
}

// ─── Fit ──────────────────────────────────────────────────────────────────────
const FIT_YES = [
  "אתם סטארטאפ pre-seed (B2B עד Series B) או חברה צומחת, 10-100 עובדים",
  "נעלתם את הפיץ' למשקיעים ועכשיו מבינים שצריך לגדול, להגיע לעוד אנשים, לבנות נוכחות",
  "אתם צריכים הובלה שיווקית, ולא עוד פרילנסר שמבצע מטלות",
  "אין לכם תקציב לסמנכ\"ל שיווק במשרה מלאה (ועם 35-45K ₪ לחודש + equity + הטבות, מי יכול במדינה מוכת מלחמות?)",
  "ניסיתם סוכנות או פרילנסרים וזה לא עבד: איטי מדי, גנרי מדי, או העברת בעלות מיד ליד",
  "אתם מבינים שמודעות מותג (ברנד אוורנס) זה לא \"נחמד שיהיה\" אלא בסיס לכל דבר",
]
const FIT_NO = [
  "אתם צריכים מישהו \"רק להריץ מודעות\" (זה media buyer, לא CMO)",
  "אתם רוצים הבטחה להכנסות תוך 30 יום (שיווק B2B מצטבר על פני 90-180 יום. אמון נבנה דרך נוכחות עקבית. זה האופי של המשחק.)",
  "אתם לא מוכנים להשקיע בנוכחות מותגית כחלק מהאסטרטגיה (ב-OctaLoom, זה לא אופציונלי)",
]
function CmoFit() {
  return (
    <section className="cmo-section cmo-section--navy">
      <div className="cmo-container">
        <h2 className="sec-title rv">למי זה מתאים (ולמי לא)</h2>
        <div className="fit__grid">
          <div className="fit__col fit__col--yes rv">
            <h3><span className="glyph">{"✓"}</span>בואו נעבוד יחד אם:</h3>
            <ul className="fit__list">
              {FIT_YES.map((t, i) => <li key={i}><span className="marker">{"✓"}</span><span>{t}</span></li>)}
            </ul>
          </div>
          <div className="fit__col fit__col--no rv" style={{ transitionDelay: ".1s" }}>
            <h3><span className="glyph">{"×"}</span>אולי עדיף שלא נעבוד יחד אם:</h3>
            <ul className="fit__list">
              {FIT_NO.map((t, i) => <li key={i}><span className="marker">{"×"}</span><span>{t}</span></li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Compare ──────────────────────────────────────────────────────────────────
function CmoCompare() {
  return (
    <section className="cmo-section cmo-section--cream">
      <div className="cmo-container">
        <h2 className="sec-title rv" style={{ color: "var(--purple)" }}>מה ההבדל בין סמנכ"לית שיווק במיקור חוץ לאלטרנטיבות</h2>
        <p className="compare__lead rv">בואו נהיה כנים:</p>
        <div className="compare__grid">
          <div className="compare__card rv">
            <div className="ico">{"🏢"}</div>
            <h3>סוכנות שיווק</h3>
            <p>צוות של 3-5 אנשים, מנהלת לקוח שמתרגמת ביניכם, שבועות של אונבורדינג, כותבים ג'וניורים שלומדים את התחום שלכם על החשבון שלכם. פינג פונג בין מחלקות.</p>
          </div>
          <div className="compare__card rv" style={{ transitionDelay: ".08s" }}>
            <div className="ico">{"🧑‍💻"}</div>
            <h3>פרילנסר.ית</h3>
            <p>מבצעים מה שתגידו. בסקופ פחות גמיש, בלי ראייה רחבה של הארגון, בלי בעלות ולקיחת אחריות.</p>
          </div>
          <div className="compare__card rv" style={{ transitionDelay: ".16s" }}>
            <div className="ico">{"💼"}</div>
            <h3>לשכור סמנכ"ל שיווק במשרה מלאה</h3>
            <p>חודשים של גיוס + משכורת של 35-45K ₪ בחודש + <span className="ltr">equity</span> + הטבות. לפני שראיתם קמצוץ של תוצאה.</p>
          </div>
          <div className="compare__card compare__card--win rv" style={{ transitionDelay: ".24s" }}>
            <div className="ico">{"✦"}</div>
            <h3>OctaLoom</h3>
            <div className="compare__stats">
              <div className="compare__stat"><span className="num"><Counter target={770} /><span className="suffix">K+</span></span><span className="lbl">חשיפות אורגניות</span></div>
              <div className="compare__stat"><span className="num"><Counter target={300} /><span className="suffix">%</span></span><span className="lbl">גדילה במעורבות</span></div>
            </div>
            <p>בגזרת הלינקדאין כהתמחות ראשית, הגענו ל-770K+ חשיפות אורגניות ו-300% גדילה במעורבות ללקוחות. אישה אחת עם סיסטמים חכמים וסוכני <span className="ltr">AI</span>, חושבת כמו מייסדת, מריצה מחלקת שיווק שלמה רק בלי המחלקה...</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Included ─────────────────────────────────────────────────────────────────
const INCL_ITEMS: Array<{ b: string; rest: string }> = [
  { b: "אסטרטגיית שיווק שלמה:", rest: " מחקר שוק, הגדרת קהל יעד, מיצוב, מסרים, תוכנית עבודה ל-12 חודשים" },
  { b: "וויב מרקטינג בפעולה:", rest: " סיסטמים חכמים, סוכני AI וכלי אוטומציה כמו N8N, Make, Claude. הראש הנכון עם הכלים הנכונים." },
  { b: "אסטרטגיית Go-to-market:", rest: " השקות מוצר, כניסה לשווקים חדשים" },
  { b: "לינקדאין כהתמחות ראשית:", rest: " ניהול לינקדאין ארגוני + פרופיל מנכ\"ל, אסטרטגיה וביצוע. הליבה של OctaLoom." },
  { b: "פלטפורמות חברתיות נוספות:", rest: " אינסטגרם, פייסבוק, או כל פלטפורמה רלוונטית לקהל שלכם" },
  { b: "עמודי נחיתה ואימייל מרקטינג:", rest: " בנייה והפעלה של כל מה שצריך כדי להמיר תנועה ללידים" },
  { b: "ניהול כל הנכסים השיווקיים:", rest: " הובלה של מה שקיים + הקמה של חדשים במידת הצורך" },
  { b: "brand awareness כבסיס:", rest: " מחזור מכירות ב-B2B ארוך. המותג שמנצח הוא הנוכח ביותר." },
  { b: "אירועים, PR, נוכחות מדיה:", rest: " כנסים, פודקאסטים, כתבות. הנוכחות שלכם במקומות שבהם מקבלי החלטות שמים לב." },
  { b: "פרסום ממומן:", rest: " מודעות, קמפיינים, הקצאת תקציבים" },
  { b: "אוטומציות שיווק ותהליכי AI:", rest: " N8N, Make, Zapier, Claude, CRM, סוכני AI מותאמים" },
  { b: "מעקב ביצועים וסקירה אסטרטגית חודשית:", rest: " מה עובד, מה שווה להכפיל ועל מה שווה לוותר." },
  { b: "גישה ישירה שוטפת:", rest: " לא רק פגישה חודשית. גישה אליי בין הפגישות." },
]
function CmoIncluded() {
  return (
    <section className="cmo-section incl">
      <div className="cmo-container">
        <h2 className="sec-title rv">מה כולל השירות</h2>
        <div className="incl__grid">
          {INCL_ITEMS.map((it, i) => (
            <div className="incl__card rv" key={i}>
              <div className="body"><strong>{it.b}</strong>{it.rest}</div>
            </div>
          ))}
        </div>
        <div className="incl__bonus rv"><strong>בתוספת תשלום:</strong> תוכניות שגרירים (<span className="ltr">Employee Advocacy</span>) ואתגרי לינקדאין לעובדים וארגונים.</div>
      </div>
    </section>
  )
}

// ─── Not Included ─────────────────────────────────────────────────────────────
function CmoNotIncluded() {
  return (
    <section className="cmo-section cmo-section--purple">
      <div className="cmo-container">
        <h2 className="sec-title rv">מה לא כולל השירות</h2>
        <div className="noincl__grid">
          <div className="noincl__item rv">
            <div className="ico">{"×"}</div>
            <h4>ניהול צוות מכירות</h4>
            <p>אני מובילה את השיווק, לא את המכירות. אבל השניים חייבים להיות מיושרים, ואני דואגת לזה.</p>
          </div>
          <div className="noincl__item rv" style={{ transitionDelay: ".08s" }}>
            <div className="ico">{"×"}</div>
            <h4>זמינות של משרה מלאה</h4>
            <p>20-25+ שעות בחודש, גמיש לפי סקופ. זו הובלה חלקית, לא משרה מלאה.</p>
          </div>
          <div className="noincl__item rv" style={{ transitionDelay: ".16s" }}>
            <div className="ico">{"×"}</div>
            <h4>"השקה ותשתיות מהירות"</h4>
            <p>שיווק <span className="ltr">B2B</span> מצטבר על פני 90-180 יום במקרה הטוב. <span className="ltr">brand awareness</span> בונה אמון לאורך זמן. מי שמבטיח לכם אחרת, משקר לכם.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── How ──────────────────────────────────────────────────────────────────────
function CmoHow() {
  return (
    <section className="cmo-section how">
      <div className="cmo-container">
        <h2 className="sec-title rv">איך זה עובד</h2>
        <div className="how__grid">
          <div className="how__step rv">
            <div className="n">שלב 1</div>
            <h3>שיחת היכרות</h3>
            <p>30-45 דקות. להבין את העסק, את הפערים, את היעדים.</p>
          </div>
          <div className="how__step rv" style={{ transitionDelay: ".1s" }}>
            <div className="n">שלב 2</div>
            <h3>אודיט (משוב) שיווקי + בניית אסטרטגיה</h3>
            <p>2-4 שבועות ראשונים. מחקר עומק, ניתוח מתחרים, הגדרת קהל יעד, מסרים, תוכנית עבודה.</p>
          </div>
          <div className="how__step rv" style={{ transitionDelay: ".2s" }}>
            <div className="n">שלב 3</div>
            <h3>ביצוע מתחיל</h3>
            <p>חודש 2 ואילך. <span className="ltr">OctaLoom</span> מריצה את המערכת דרך וויב מרקטינג, או מנהלת את הצוות והספקים שלכם. ודוח חודשי כדי לוודא שהכל בכיוון.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Results ──────────────────────────────────────────────────────────────────
const RESULTS_STARTUP = [
  { pre: "4 שיתופי פעולה אסטרטגיים", post: " שנבנו מאפס" },
  { pre: "מאות הורדות לאפליקציה", post: " כתוצאה מפעילות שיווקית ממוקדת" },
  { pre: "גדילה של 250%", post: " ברשתות החברתיות" },
  { pre: "בניה והפעלה של תכניות משפיענים", post: "" },
  { pre: "הפעילות השיווקית תרמה גם לסבב גיוס", post: "" },
  { pre: "בניית תשתיות שיווקיות מקיפות מאפס", post: " + ניהול 3 צוותים (~18 אנשים)" },
]
const RESULTS_OCTALOOM = [
  { pre: "770,000+ חשיפות אורגניות", post: " על פני חשבונות לינקדאין של לקוחות. בלי שהושקע שקל." },
  { pre: "70% פחות עבודה ידנית", post: " אחרי בניית סיסטמים, סוכני AI ואוטומציות בהתאמה." },
  { pre: "עלייה של 300% במעורבות", post: " בפרופיל של מייסד חברת SaaS B2B ישראלית. תגובות, שיתופים, הודעות ישירות מלקוחות פוטנציאליים." },
]
function CmoResults() {
  return (
    <section className="cmo-section results" id="results">
      <div className="cmo-container">
        <h2 className="sec-title rv">תוצאות אמיתיות</h2>
        <div className="results__grid">
          <div className="results__block rv">
            <h3>כסמנכ"לית שיווק בסטארטאפ ישראלי (<span className="ltr">social impact</span>) הגעתי ל:</h3>
            <ul className="results__list">
              {RESULTS_STARTUP.map((r, i) => <li key={i}><span><strong>{r.pre}</strong>{r.post}</span></li>)}
            </ul>
          </div>
          <div className="results__block rv" style={{ transitionDelay: ".1s" }}>
            <h3>כסמנכ"לית שיווק במיקור חוץ (<span className="ltr">OctaLoom</span>):</h3>
            <ul className="results__list">
              {RESULTS_OCTALOOM.map((r, i) => <li key={i}><span><strong>{r.pre}</strong>{r.post}</span></li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { q: "חניתה ליוותה אותנו בבניית תשתיות שיווקית מקיפה, מתוך הבנה עמוקה של הארגון והאתגרים שלו. השילוב בין חשיבה אסטרטגית, הובלת תהליכים וביצוע מדויק יצר השפעה משמעותית על הפעילות שלנו.", n: "אלה סייג", r: "מנכ\"לית אדופט מי" },
  { q: "מהרגע שחניתה נכנסה, השיווק הפסיק להיות משימה מעיקה והפך למנוע צמיחה. יש אסטרטגיה ברורה, יש אוטומציה שעובדת, ויש תוצאות שאפשר למדוד לאורך זמן.", n: "שימי דביר", r: "מנכ\"ל AcademAi" },
  { q: "חניתה יודעת לקחת רעיון ולתרגם אותו למערכת שעובדת בפועל. לא רק חשיבה ואסטרטגיה, אלא גם ירידה לפרטים והובלה של דברים עד שהם קורים.", n: "נטע ארגז", r: "מייסדת Club20" },
  { q: "חניתה היא אחת ממנהלות השיווק הכי טובות שיצא לי לעבוד איתן. היא אלופה במדיה חברתית ולא רק, יודעת להוביל מיתוג מקצה לקצה, ליזום ולהוביל אינסוף פעילויות שיווקיות.", n: "אופק רון", r: "מנכ\"ל Oshi" },
]
function CmoTestimonials() {
  return (
    <section className="cmo-section cmo-section--cream">
      <div className="cmo-container">
        <h2 className="sec-title rv">מה אומרים הלקוחות</h2>
        <div className="test__grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="test__card rv" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="test__quote-mark">"</div>
              <p className="test__quote">{t.q}</p>
              <div className="test__attr">
                <div className="n">{t.n}</div>
                <div className="r">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Hi ───────────────────────────────────────────────────────────────────────
function CmoHi() {
  return (
    <section className="cmo-section hi">
      <div className="cmo-container">
        <h2 className="sec-title rv">קצת עליי</h2>
        <div className="hi__grid">
          <div className="hi__portrait rv rv--right">
            <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Headshot-1.png" alt="חניתה יודובסקי" onError={(e: any) => { e.target.style.display = "none"; if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = "flex" }} />
            <div className="hi__portrait-fallback" style={{ display: "none" }}>HY</div>
          </div>
          <div className="hi__body rv" style={{ transitionDelay: ".15s" }}>
            <p>אני חניתה (יודובסקי, אבל כמו מדונה השם הפרטי שלי מספיק {"😅"}), סמנכ"לית שיווק במיקור חוץ עם התמחות בלינקדאין. באנגלית אוהבת את התואר <span className="ltr">LinkedIn-Led Fractional CMO</span>.</p>
            <p>כבר 5+ שנים אני בונה מערכות שיווק <span className="ltr">B2B</span> לחברות ישראליות. 3 השנים האחרונות עמוק בתוך מה ש-<span className="ltr">AI</span> משנה בשיווק, ובואו, זה שינה הכל. בניתי תשתיות שיווק מאפס בסטארטאפ <span className="ltr">social impact</span> ישראלי, ניהלתי 3 צוותים ו-18 אנשים, ועבדתי עם חברות <span className="ltr">B2B</span> שונות החל מ-<span className="ltr">social impact</span>, <span className="ltr">SaaS</span>, חינוך, מזון, וקריאייטיב.</p>
            <p>אני מנחה את הפודקאסט <strong>"מה הסיפור עם?"</strong> שבו אנחנו מפרקות את מה שבאמת עובד בשיווק <span className="ltr">B2B</span>.</p>
            <div className="hi__links">
              <a href="https://www.linkedin.com/in/hanita-yudovski/">לינקדאין של חניתה ←</a>
              <a href="https://whatsthestorywith.com/" target="_blank" rel="noopener noreferrer">לפודקאסט "מה הסיפור עם?" ←</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "מה זה סמנכ\"לית שיווק במיקור חוץ?", a: "סמנכ\"לית שיווק במיקור חוץ היא אשת שיווק בכירה שעובדת עם הארגון שלכם בריטיינר חודשי במקום משכורת משרה מלאה. אתם מקבלים הובלת שיווק ברמת סמנכ\"ל, בלי עלות הגיוס, ה-equity, וחודשי ההכשרה." },
  { q: "מה ההבדל בין סמנכ\"ל שיווק במיקור חוץ לסוכנות שיווק?", a: "סוכנות נותנת צוות שמנוהל על ידי מנהלת לקוח. סמנכ\"ל שיווק במיקור חוץ נותן מוח אסטרטגי אחד שמתייחס לשיווק שלכם כאילו זו החברה שלו. סוכנויות בנויות על headcount. OctaLoom בנויה על יעילות: אופרטורית אחת עם סיסטמים חכמים וסוכני AI, בקצב של מחלקה שלמה." },
  { q: "מה זה וויב מרקטינג?", a: "וויב מרקטינג (Vibe Marketing) היא המתודולוגיה של OctaLoom: חשיבה אסטרטגית ברמת CMO + סיסטמים חכמים וסוכני AI שמחליפים צוותים שלמים + בינה אנושית איפה שזה חשוב. המונח מבוסס על וויב קודינג של קרפאת'י: מתארים בשפה פשוטה מה צריך, AI בונה. אותו דבר בשיווק." },
  { q: "כמה שעות בחודש זה דורש?", a: "20-25+ שעות בחודש מצד OctaLoom, גמיש לפי סקופ. עולה בתקופות השקה או צמיחה מואצת. מצדכם: בחודש הראשון כ-3-4 שעות לעבודת מיצוב ראשונית. אחרי זה, שיחה אסטרטגית חודשית + גישה שוטפת ביניהן." },
  { q: "מתי הזמן הנכון לשכור סמנכ\"ל שיווק במיקור חוץ?", a: "אחרי שנעלתם את הפיץ' למשקיעים והגעתם לנקודה שבה צריך לגדול, להגיע ליותר משתמשים, לגרום לאנשים להכיר אתכם. בדרך כלל Seed עד Series B, 10-100 עובדים. המוצר עובד, אבל השיווק דורש התייחסות." },
  { q: "מה קורה אם מפסיקים לעבוד יחד?", a: "מה ששלכם נשאר שלכם. האסטרטגיה, תוכנית העבודה, המיצוב, כל התשתיות שנבנו. המערכת בנויה כך שתוכלו להעביר אותה לגיוס פנימי או להמשיך בעצמכם. הקלישאה נכונה: הצלחה שלכם = הצלחה שלי." },
]
function CmoFAQ() {
  return (
    <section className="cmo-section cmo-section--purple">
      <div className="cmo-container cmo-container--narrow">
        <h2 className="sec-title rv">שאלות נפוצות</h2>
        <div className="faq__list">
          {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function CmoFinalCTA() {
  return (
    <section className="cmo-section final" id="contact">
      <div className="cmo-container final__inner">
        <h2 className="final__h rv">מוכנים להוביל את השיווק<br/>בלי לשכור מחלקה?</h2>
        <p className="final__sub rv" style={{ transitionDelay: ".1s" }}>אפשר להמשיך לחשוב על זה, ואפשר לקבוע שיחה. שיחת היכרות קצרה, בלי התחייבות. אם זה לא מתאים, אגיד לכם.</p>
        <div className="final__cta rv" style={{ transitionDelay: ".2s" }}>
          <a className="cmo-btn cmo-btn--lime" href="https://calendar.notion.so/meet/octaloom/discovery">
            בואו נדבר
            <span className="arrow">←</span>
          </a>
        </div>
        <div className="final__alt rv" style={{ transitionDelay: ".3s" }}>
          <span>עדיין לא בטוחים?</span>
          <a href="https://www.octaloom.com/linkedin-growth-engine-he">מחפשים ניהול לינקדאין בלבד? ←</a>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//   NAV + FOOTER (RTL Hebrew)
// ═══════════════════════════════════════════════════════════════════════════════
const _P = "#712eac", _D = "#201e4b", _L = "#c6e1a5", _C = "#ece9e7"
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
    document.body.style.overflow = (isMobile && menuOpen) ? "hidden" : ""
    if (!menuOpen) setLinkedinExpanded(false)
    return () => { document.body.style.overflow = "" }
  }, [menuOpen, isMobile])

  const liSub = [
    { label: "לינקדאין לארגונים", href: "https://www.octaloom.com/linkedin-for-organizations-he" },
    { label: "לינקדאין למנכ\"לים", href: "https://www.octaloom.com/linkedin-for-executives-he" },
    { label: "לינקדאין לעצמאים", href: "https://www.octaloom.com/linkedin-for-solopreneurs-he" },
  ]
  const otherSub = [
    { label: "סמנכ\"לית שיווק במיקור חוץ", href: "#" },
    { label: "כלי AI וסוכנים", href: "https://www.octaloom.com/ai-tools-agents-he" },
    { label: "סדנאות", href: "https://www.octaloom.com/workshops-he" },
  ]
  const navLinks = [
    { label: "אודות", href: "https://www.octaloom.com/about-he" },
    { label: "בלוג", href: "https://www.octaloom.com/blog-he" },
    { label: "צרו קשר", href: "#contact" },
    { label: "Goodies", href: "https://octagoodies.com" },
  ]

  const dItem: React.CSSProperties = { display: "block", padding: "9px 12px", fontSize: 13, color: _D, borderRadius: 8, transition: "background 0.15s", textDecoration: "none" }
  const dBox: React.CSSProperties = { position: "absolute", background: "#ece9e8", borderRadius: 12, padding: "8px 6px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(28,26,60,0.08)", zIndex: 50 }
  const hi = (e: any, on: boolean) => { e.currentTarget.style.background = on ? "rgba(113,46,172,0.05)" : "transparent" }

  return (
    <nav style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 1000, width: "calc(100% - 48px)", maxWidth: 1152, borderRadius: 100, background: scrolled ? "rgba(236,233,231,0.92)" : "rgba(236,233,231,0.65)", backdropFilter: "blur(50px)", WebkitBackdropFilter: "blur(50px)", border: "1px solid rgba(32,30,75,0.08)", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: _F, direction: "rtl", transition: "background 0.3s, box-shadow 0.3s", boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none" }}>
      <a href="https://www.octaloom.com/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/logo%20nav%20bar.png" alt="OctaLoom" style={{ height: 36, width: "auto", display: "block" }} onError={(e: any) => { e.target.style.display = "none" }} />
      </a>

      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ position: "relative" }} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => { setServicesOpen(false); setLinkedinOpen(false) }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: servicesOpen ? _D : "rgba(32,30,75,0.55)", display: "flex", alignItems: "center", gap: 5, padding: "6px 0", transition: "color 0.25s", fontFamily: _F }}>
              שירותים
              <svg width={11} height={11} viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.25s", transform: servicesOpen ? "rotate(180deg)" : "none" }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {servicesOpen && <div style={{ position: "absolute", top: "100%", right: 0, left: 0, height: 12, zIndex: 199 }} />}
            {servicesOpen && (
              <div style={{ ...dBox, minWidth: 220, top: "calc(100% + 10px)", right: 0 }}>
                <div style={{ position: "relative" }} onMouseEnter={() => setLinkedinOpen(true)} onMouseLeave={() => setLinkedinOpen(false)}>
                  <a href="https://www.octaloom.com/linkedin-growth-engine-he" style={{ ...dItem, display: "flex", alignItems: "center", gap: 6 }} onMouseEnter={e => hi(e, true)} onMouseLeave={e => hi(e, false)}>
                    <span>מנוע צמיחה בלינקדאין</span>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.45, marginRight: "auto", transform: "scaleX(-1)" }}><path d="M4 2l4 4-4 4" stroke={_D} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  {linkedinOpen && <div style={{ position: "absolute", top: 0, bottom: 0, right: "100%", width: 8, zIndex: 199 }} />}
                  {linkedinOpen && (
                    <div style={{ ...dBox, minWidth: 220, top: 0, right: "calc(100% + 6px)" }}>
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
            <a href="https://www.octaloom.com/fractional-cmo"
              style={{ fontSize: 12, fontWeight: 600, color: _D, background: "transparent", border: "1px solid rgba(32,30,75,0.22)", borderRadius: 100, padding: "5px 13px", fontFamily: _F, transition: "border-color 0.2s,color 0.2s", letterSpacing: "0.03em", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = _P; e.currentTarget.style.color = _P }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(32,30,75,0.22)"; e.currentTarget.style.color = _D }}>
              EN
            </a>
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-discovery"))}
              style={{ padding: "8px 20px", borderRadius: 100, background: _P, color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: _F, border: "none", cursor: "pointer" }}>
              בואו נדבר
            </button>
          </>
        )}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="תפריט"
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
        <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, left: 0, background: "#ece9e8", borderRadius: 16, padding: "20px 32px 32px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 50, maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: _P, margin: "0 0 4px", fontFamily: _F }}>שירותים</p>
          <button onClick={() => setLinkedinExpanded(p => !p)}
            style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", fontSize: 20, color: _D, padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: _F, background: "none", border: "none", cursor: "pointer", textAlign: "right" }}>
            מנוע צמיחה בלינקדאין
            <svg width={11} height={11} viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.25s", transform: linkedinExpanded ? "rotate(180deg)" : "none" }}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {linkedinExpanded && liSub.map((s, i) => (
            <a key={i} href={s.href} onClick={() => setMenuOpen(false)} style={{ display: "block", fontSize: 15, color: _P, textDecoration: "none", padding: "7px 20px 7px 0", borderBottom: "1px solid rgba(113,46,172,0.05)", fontFamily: _F }}>{s.label}</a>
          ))}
          {otherSub.map((s, i) => (
            <a key={i} href={s.href} onClick={() => setMenuOpen(false)} style={{ display: "block", fontSize: 20, color: _D, textDecoration: "none", padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: _F }}>{s.label}</a>
          ))}
          {navLinks.map((item, i) => (
            <a key={i} href={item.href} onClick={() => setMenuOpen(false)} style={{ display: "block", fontSize: 20, color: _D, textDecoration: "none", padding: "11px 0", fontWeight: 500, borderBottom: i < navLinks.length - 1 ? "1px solid rgba(113,46,172,0.08)" : "none", fontFamily: _F }}>{item.label}</a>
          ))}
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={() => { setMenuOpen(false); window.dispatchEvent(new CustomEvent("open-discovery")) }}
              style={{ display: "block", textAlign: "center", padding: "14px 24px", fontSize: 15, fontWeight: 600, background: _P, color: "#fff", borderRadius: 100, fontFamily: _F, border: "none", cursor: "pointer", width: "100%" }}>
              בואו נדבר. חינם.
            </button>
            <a href="https://www.octaloom.com/fractional-cmo"
              style={{ display: "block", textAlign: "center", padding: "11px 24px", fontSize: 13, fontWeight: 600, color: _D, borderRadius: 100, fontFamily: _F, border: "1px solid rgba(32,30,75,0.2)", textDecoration: "none", width: "100%", boxSizing: "border-box" }}>
              Switch to English →
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

function SiteFooter() {
  const w = useWindowWidth(), isMobile = w < 768
  const svcLinks = [
    { label: "לינקדאין לארגונים", href: "https://www.octaloom.com/linkedin-for-organizations-he" },
    { label: "לינקדאין למנכ\"לים", href: "https://www.octaloom.com/linkedin-for-executives-he" },
    { label: "לינקדאין לעצמאים", href: "https://www.octaloom.com/linkedin-for-solopreneurs-he" },
  ]
  const otherLinks = [
    { label: "סמנכ\"לית שיווק במיקור חוץ", href: "https://www.octaloom.com/fractional-cmo-he" },
    { label: "כלי AI וסוכנים", href: "https://www.octaloom.com/ai-tools-agents-he" },
    { label: "סדנאות", href: "https://www.octaloom.com/workshops-he" },
  ]
  const pageLinks = [
    { label: "דף הבית", href: "https://www.octaloom.com/" },
    { label: "אודות", href: "https://www.octaloom.com/about-he" },
    { label: "בלוג", href: "https://www.octaloom.com/blog-he" },
    { label: "צרו קשר", href: "#contact" },
  ]
  const legalLinks = [
    { label: "פרטיות", href: "https://www.octaloom.com/privacy-policy-he" },
    { label: "תנאים", href: "https://www.octaloom.com/terms-he" },
    { label: "נגישות", href: "https://www.octaloom.com/accessibility-he" },
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

  const lnk: React.CSSProperties = { fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s", display: "block", lineHeight: "1.9", fontFamily: _F }
  const hd: React.CSSProperties = { fontSize: 12, fontWeight: 700, color: _C, margin: "0 0 14px", fontFamily: _F }
  const hov = (e: any, on: boolean) => { e.currentTarget.style.color = on ? _L : "rgba(255,255,255,0.5)" }

  return (
    <footer style={{ padding: isMobile ? "32px 0 0" : "64px 0 0", background: "#211d4b", color: "rgba(255,255,255,0.7)", fontFamily: _F, direction: "rtl" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 0.65fr 1fr 0.85fr 0.85fr 0.8fr", gap: isMobile ? "20px" : 24, paddingBottom: isMobile ? 24 : 48 }}>
          <div>
            <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png" alt="OctaLoom"
              style={{ height: isMobile ? 56 : 72, width: "auto", display: "block" }} onError={(e: any) => { e.target.style.display = "none" }} />
            <p style={{ fontSize: 15, fontWeight: 700, color: _C, marginTop: 14, maxWidth: 240, lineHeight: 1.5, fontFamily: _F }}>
              מחלקת השיווק שלך, רק בלי המחלקה.
            </p>
          </div>

          {!isMobile && <div><h4 style={hd}>עמודים</h4>{pageLinks.map((l, i) => <a key={i} href={l.href} style={lnk} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>)}</div>}
          {!isMobile && <div><h4 style={hd}>שירותי לינקדאין</h4>{svcLinks.map((l, i) => <a key={i} href={l.href} style={lnk} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>)}</div>}
          {!isMobile && <div><h4 style={hd}>שירותים נוספים</h4>{otherLinks.map((l, i) => <a key={i} href={l.href} style={{ ...lnk, whiteSpace: i === 0 ? "nowrap" : "normal" }} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>)}</div>}

          {!isMobile && (
            <div>
              <h4 style={hd}>משאבים חינמיים</h4>
              <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "inline-block", opacity: 0.9, transition: "opacity 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "1" }} onMouseLeave={e => { e.currentTarget.style.opacity = "0.9" }}>
                <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/OCTAGOODIES%20GREEN.png" alt="OctaGoodies" style={{ height: 44, width: "auto", display: "block" }} />
              </a>
            </div>
          )}

          <div>
            {!isMobile && <h4 style={hd}>עקבו</h4>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
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
          <span>© 2026 OctaLoom · כל הזכויות שמורות</span>
          <div style={{ display: "flex", gap: 18 }}>
            {legalLinks.map((l, i) => (
              <a key={i} href={l.href} style={{ color: "rgba(255,255,255,.38)", textDecoration: "none", transition: "color 0.2s", fontFamily: _F }}
                onMouseEnter={e => { e.currentTarget.style.color = _L }} onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,.38)" }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//   DEFAULT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export default function FractionalCMOHE() {
  useGlobalStyles()
  useReveal()
  return (
    <div className="cmo-he" dir="rtl" style={{ fontFamily: "'Discovery Fs', 'Noto Sans Hebrew', sans-serif" }}>
      <SiteNavbar />
      <CmoHero />
      <CmoWhat />
      <CmoVibe />
      <CmoFit />
      <CmoCompare />
      <CmoIncluded />
      <CmoNotIncluded />
      <CmoHow />
      <CmoResults />
      <CmoTestimonials />
      <CmoHi />
      <CmoFAQ />
      <CmoFinalCTA />
      <SiteFooter />
    </div>
  )
}
