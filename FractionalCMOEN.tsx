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
    const id = "cmo-en-styles"
    if (document.getElementById(id)) return
    const s = document.createElement("style")
    s.id = id
    s.textContent = `
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Regular.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Aeonik';src:url('https://raw.githubusercontent.com/Hanita-y/octaloom-fonts/main/Aeonik-Bold.ttf') format('truetype');font-weight:700;font-style:normal;font-display:swap}
:root{--purple:#712eac;--deep-purple:#201e4b;--navy:#060d3d;--ink:#1c1a3c;--lime:#c5e6a2;--lime-2:#c6e1a5;--cream:#ece9e7;--warm-white:#f7f5f2;--paper:#f3efe9;--rule-dark:rgba(28,26,60,0.12);--rule-soft:rgba(28,26,60,0.06);--text-dark:#201e4b;--text-mid:#3d3a5c;--text-soft:#6b6680;--text-light:#ece9e7;--font-en:'Aeonik',sans-serif}
.cmo-page *,.cmo-page *::before,.cmo-page *::after{margin:0;padding:0;box-sizing:border-box}
.cmo-page{font-family:var(--font-en);background:var(--cream);color:var(--text-dark);overflow-x:hidden;line-height:1.6;-webkit-font-smoothing:antialiased}
.cmo-page a{color:inherit;text-decoration:none}
.cmo-page button{font-family:inherit;border:none;background:none;cursor:pointer;color:inherit}
.cmo-page img{display:block;max-width:100%}
.cmo-container{max-width:1200px;margin:0 auto;padding:0 clamp(20px,5vw,56px)}
.cmo-container--narrow{max-width:920px;margin:0 auto;padding:0 clamp(20px,5vw,56px)}
.rv{opacity:0;transform:translateY(36px);transition:opacity 0.8s cubic-bezier(.16,1,.3,1),transform 0.8s cubic-bezier(.16,1,.3,1),filter 0.8s cubic-bezier(.16,1,.3,1)}
.rv.in{opacity:1!important;transform:translateY(0)!important;filter:none!important}
.rv--left{transform:translateX(-40px) translateY(0)}.rv--left.in{transform:translateX(0)!important}
.rv--right{transform:translateX(40px) translateY(0)}.rv--right.in{transform:translateX(0)!important}
.btn{display:inline-flex;align-items:center;gap:10px;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:700;transition:all 0.25s;cursor:pointer;white-space:nowrap;border:1.5px solid transparent;font-family:var(--font-en);text-decoration:none}
.btn--purple{background:var(--purple);color:#fff}.btn--purple:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(113,46,172,0.35)}
.btn--lime{background:var(--lime);color:var(--ink)}.btn--lime:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(197,230,162,0.5)}
.btn--outline-light{background:transparent;color:var(--cream);border-color:rgba(255,255,255,0.25)}.btn--outline-light:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.5)}
.btn .arrow{transition:transform 0.25s}.btn:hover .arrow{transform:translateX(4px)}
.cmo-section{padding:clamp(72px,11vw,130px) 0;position:relative}
.cmo-section--cream{background:var(--cream)}
.cmo-section--paper{background:var(--paper)}
.cmo-section--warm{background:#ece9e8}
.cmo-section--navy{background:var(--deep-purple);color:var(--text-light)}
.cmo-section--lime{background:var(--lime);color:var(--ink)}
.cmo-section--purple{background:var(--purple);color:var(--cream)}
.cmo-section--purple .sec-title{color:var(--cream)}
.cmo-section--purple .sec-sub{color:rgba(236,233,231,0.75)}
.cmo-section--purple .sec-title__sub{color:rgba(236,233,231,0.75)}
.sec-title{font-size:clamp(28px,4vw,44px);line-height:1.15;letter-spacing:-0.015em;margin-bottom:24px;font-weight:700;color:var(--deep-purple);max-width:880px}
.cmo-section--navy .sec-title{color:var(--text-light)}
.cmo-section--lime .sec-title{color:var(--ink)}
.sec-sub{font-size:17px;line-height:1.6;color:var(--text-mid);max-width:720px;margin-bottom:40px}
.cmo-section--navy .sec-sub{color:rgba(255,255,255,0.65)}
.sec-title__sub{display:block;font-size:0.5em;font-weight:400;color:var(--text-soft);margin-top:14px;letter-spacing:0.01em;line-height:1.3}
.cmo-section--navy .sec-title__sub{color:rgba(236,233,231,0.55)}
.cmo-hero{position:relative;padding:clamp(150px,17vw,210px) 0 clamp(80px,11vw,140px);background:var(--deep-purple);color:var(--text-light);overflow:hidden}
.cmo-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(50% 40% at 80% 10%,rgba(113,46,172,0.4),transparent 65%),radial-gradient(60% 50% at 10% 100%,rgba(197,230,162,0.12),transparent 70%);pointer-events:none}
.cmo-hero__inner{position:relative;z-index:2}
.cmo-hero__grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:clamp(40px,5vw,64px);align-items:center}
.cmo-hero__label{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--lime);margin-bottom:24px}
.cmo-hero__label .dot{width:6px;height:6px;border-radius:50%;background:var(--lime)}
.cmo-hero__h1{font-size:clamp(34px,5.2vw,60px);font-weight:700;line-height:1.06;letter-spacing:-0.025em;color:#fff;max-width:640px;margin-bottom:24px}
.cmo-hero__sub{font-size:clamp(15px,1.4vw,17px);line-height:1.7;color:rgba(255,255,255,0.7);max-width:560px;margin-bottom:16px}
.cmo-hero__sub strong{color:#fff;font-weight:700}
.cmo-hero__fix{font-size:17px;font-weight:700;color:var(--lime);margin-bottom:32px}
.cmo-hero__cta-row{display:flex;flex-wrap:wrap;gap:14px}
.orgchart{position:relative;padding:28px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:0 20px 60px rgba(0,0,0,0.3)}
.orgchart__title{font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:18px;font-weight:700;display:flex;justify-content:space-between;align-items:center}
.orgchart__title .total{color:var(--lime)}
.orgchart__row{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:32px;position:relative}
.orgchart__hire{padding:12px 8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;text-align:center;transition:opacity 0.8s ease,filter 0.8s ease,transform 0.8s ease}
.orgchart__hire .role{font-size:10px;letter-spacing:0.06em;color:rgba(255,255,255,0.7);margin-bottom:6px;line-height:1.2;min-height:24px;display:flex;align-items:center;justify-content:center}
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
.orgchart__node-info .r{font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:var(--lime);margin-top:2px}
.orgchart__node-tag{font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--lime);padding:6px 10px;background:rgba(197,230,162,0.12);border-radius:100px}
.orgchart__legend{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:18px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);font-size:11px;color:rgba(255,255,255,0.55);letter-spacing:0.04em}
.orgchart__legend .sw{display:inline-flex;align-items:center;gap:6px}
.orgchart__legend .sw::before{content:'';width:10px;height:10px;border-radius:2px;background:rgba(255,255,255,0.2)}
.orgchart__legend .sw--lime::before{background:var(--lime)}
.cmo-entity{padding:clamp(56px,8vw,96px) 0 clamp(36px,5vw,56px);background:#ece9e8}
.cmo-entity__body{font-size:clamp(19px,2vw,24px);line-height:1.55;color:var(--deep-purple);max-width:880px;font-weight:400;letter-spacing:-0.005em}
.cmo-entity__body strong{font-weight:700;color:var(--purple)}
.podcast-link{border-bottom:1.5px solid currentColor;transition:color 0.2s}
.podcast-link:hover{color:var(--purple)}
.podcast-link strong{color:inherit}
.what__intro{font-size:17px;line-height:1.7;color:var(--text-mid);margin-bottom:clamp(36px,5vw,48px);max-width:760px}
.what__intro em{color:var(--deep-purple);font-style:normal;font-weight:700}
.what__grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.what__card{padding:24px 26px;background:#ece9e8;border:1px solid var(--rule-dark);border-radius:12px;display:flex;gap:18px;align-items:flex-start;transition:transform 0.4s cubic-bezier(.16,1,.3,1),box-shadow 0.4s,border-color 0.4s}
.what__card:hover{transform:translateY(-3px);box-shadow:0 14px 32px rgba(28,26,60,0.08);border-color:rgba(113,46,172,0.25)}
.what__check{flex-shrink:0;width:28px;height:28px;border-radius:8px;background:rgba(197,230,162,0.5);color:var(--ink);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700}
.what__card p{font-size:15px;line-height:1.6;color:var(--text-dark)}
.what__time{margin-top:clamp(32px,4vw,48px);padding:28px 32px;background:var(--deep-purple);color:var(--text-light);border-radius:14px;display:flex;align-items:center;gap:24px;flex-wrap:wrap}
.what__time .label{font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--lime);font-weight:700;flex-shrink:0}
.what__time .val{font-size:16px;line-height:1.6;color:rgba(255,255,255,0.85)}
.what__teammgmt{margin-top:18px;padding:24px 28px;background:rgba(113,46,172,0.05);border:1px solid rgba(113,46,172,0.15);border-radius:12px;font-size:16px;line-height:1.65;color:var(--text-dark)}
.vibe__intro{font-size:17px;line-height:1.7;color:rgba(255,255,255,0.7);margin-bottom:clamp(40px,5vw,56px);max-width:760px}
.cmo-section--purple .vibe__intro{color:rgba(236,233,231,0.75)}
.vibe__steps{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}
.vibe__step{padding:28px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:14px;position:relative;transition:border-color 0.4s,transform 0.4s,background 0.4s}
.vibe__step:hover{border-color:rgba(197,230,162,0.4);transform:translateY(-3px);background:rgba(255,255,255,0.06)}
.vibe__step .n{font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--lime);margin-bottom:16px;display:inline-flex;align-items:center;gap:8px}
.vibe__step .n::before{content:'';width:16px;height:1px;background:var(--lime)}
.vibe__step p{font-size:15px;line-height:1.7;color:rgba(255,255,255,0.85)}
.vibe__step p strong{color:#fff;font-weight:700}
.vibe__step p em{font-style:normal;color:var(--lime);font-weight:700}
.diff__grid{margin-top:clamp(36px,5vw,48px);display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px}
.diff__card{padding:28px;background:linear-gradient(#ece9e8,#ece9e8) padding-box,linear-gradient(135deg,var(--purple) 0%,var(--lime) 50%,var(--purple) 100%) border-box;background-size:auto,200% 200%;background-position:0 0,0% 50%;border:1.5px solid transparent;border-radius:14px;transition:transform 0.4s cubic-bezier(.16,1,.3,1),box-shadow 0.4s,background-position 0.8s ease;animation:diffBorderShift 6s ease infinite}
.diff__card:hover{transform:translateY(-4px);box-shadow:0 16px 36px rgba(28,26,60,0.1);background-position:0 0,100% 50%}
@keyframes diffBorderShift{0%,100%{background-position:0 0,0% 50%}50%{background-position:0 0,100% 50%}}
.diff__card .ico{width:36px;height:36px;border-radius:10px;background:var(--lime);color:var(--purple);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;margin-bottom:16px}
.diff__card h3{font-size:19px;font-weight:700;color:var(--deep-purple);margin-bottom:10px;letter-spacing:-0.012em}
.diff__card p{font-size:15px;line-height:1.65;color:var(--text-mid)}
.cmo-section--who{background:var(--deep-purple);color:var(--cream)}
.cmo-section--who .sec-title{color:var(--cream)}
.cmo-section--who .sec-title__sub{color:rgba(236,233,231,0.55)}
.time__grid{margin-top:clamp(36px,5vw,48px);display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,3vw,32px)}
.time__col{padding:32px;background:#ece9e8;border:1px solid rgba(236,233,231,0.12);border-radius:14px}
.time__col--yes{background:linear-gradient(180deg,rgba(197,230,162,0.35) 0%,#ece9e8 35%);border-color:rgba(197,230,162,0.5)}
.time__col h3{display:flex;align-items:center;gap:14px;font-size:22px;font-weight:700;color:var(--deep-purple);margin-bottom:22px;letter-spacing:-0.012em}
.time__col .glyph{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;flex-shrink:0}
.time__col--yes .glyph{background:var(--lime);color:var(--ink)}
.time__col--no .glyph{background:rgba(28,26,60,0.06);color:var(--text-mid)}
.time__list{list-style:none}
.time__list li{display:flex;gap:14px;padding:16px 0;border-bottom:1px solid var(--rule-soft);font-size:15px;line-height:1.6;color:var(--text-dark)}
.time__list li:last-child{border-bottom:none}
.time__list .marker{flex-shrink:0;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;margin-top:2px}
.time__col--yes .marker{background:var(--lime);color:var(--ink)}
.time__col--no .marker{background:rgba(28,26,60,0.06);color:var(--text-soft)}
.incl{background:var(--lime);color:var(--ink)}
.incl .sec-title{color:var(--deep-purple)}
.incl .sec-sub{color:rgba(28,26,60,0.7)}
.incl__grid{margin-top:clamp(36px,5vw,48px);display:grid;grid-template-columns:1fr;border-top:1px solid rgba(28,26,60,0.15);max-width:900px;margin-left:auto;margin-right:auto}
.incl__card{padding:22px 4px;border-bottom:1px solid rgba(28,26,60,0.15);background:transparent;border-radius:0;transition:padding-left 0.3s ease}
.incl__card:hover{padding-left:12px}
.incl__card h4{display:flex;align-items:center;gap:14px;font-size:17px;font-weight:700;color:var(--deep-purple);margin-bottom:6px;letter-spacing:-0.012em;background:transparent;padding:0;line-height:1.4}
.incl__card h4::before{content:'✓';flex-shrink:0;width:26px;height:26px;border-radius:50%;background:var(--purple);color:var(--lime);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700}
.incl__card p{font-size:14px;line-height:1.65;color:rgba(28,26,60,0.65);margin:0;padding:0 0 0 40px;max-width:720px}
.noincl-section{background:var(--purple);color:var(--cream)}
.noincl-section .sec-title{color:var(--cream)}
.noincl__grid{margin-top:clamp(36px,5vw,48px);display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px}
.noincl__item{padding:28px;background:#ece9e8;border:1px solid rgba(255,255,255,0.18);border-radius:12px;transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s}
.noincl__item:hover{border-color:var(--lime);transform:translateY(-3px);box-shadow:0 14px 32px rgba(0,0,0,0.15)}
.noincl__item .ico{width:36px;height:36px;border-radius:50%;background:var(--purple);color:var(--lime);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;margin-bottom:18px}
.noincl__item h4{font-size:18px;font-weight:700;color:var(--deep-purple);margin-bottom:10px;letter-spacing:-0.012em}
.noincl__item p{font-size:14px;line-height:1.65;color:var(--text-mid)}
.how{background:var(--paper)}
.how__grid{margin-top:clamp(36px,5vw,48px);display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;position:relative}
.how__step{padding:32px 28px;background:#ece9e8;border:1px solid var(--rule-dark);border-radius:14px;position:relative}
.how__step::before{content:'';position:absolute;top:-1px;left:28px;right:28px;height:3px;background:linear-gradient(90deg,var(--purple),var(--lime));border-radius:0 0 4px 4px}
.how__step .n{font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--purple);margin-bottom:12px;margin-top:8px}
.how__step h3{font-size:22px;font-weight:700;color:var(--deep-purple);margin-bottom:12px;letter-spacing:-0.012em}
.how__step p{font-size:15px;line-height:1.7;color:var(--text-mid)}
.results{background:var(--lime);color:var(--ink)}
.results__intro{font-size:13px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;color:var(--ink);margin-bottom:16px;display:inline-flex;align-items:center;gap:8px}
.results__intro .dot{width:6px;height:6px;background:var(--purple);border-radius:50%}
.results__grid{margin-top:clamp(40px,5vw,56px);display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.results__cell{padding:28px;background:rgba(255,255,255,0.4);border:1px solid rgba(28,26,60,0.1);border-radius:14px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.results__cell .num{font-size:clamp(40px,5.5vw,64px);font-weight:700;line-height:1;letter-spacing:-0.04em;color:var(--ink);font-feature-settings:"tnum" 1,"lnum" 1;display:inline-flex;align-items:baseline}
.results__cell .num .suffix{font-size:0.5em;color:var(--purple);margin-left:0.05em;font-weight:700}
.results__cell .lbl{margin-top:14px;font-size:14px;line-height:1.6;color:var(--ink)}
.test__grid{margin-top:clamp(36px,5vw,48px);display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}
.test__card{padding:32px 28px;background:#fff;border:1px solid var(--rule-dark);border-radius:14px;position:relative;transition:transform 0.4s,box-shadow 0.4s,border-color 0.4s}
.test__card:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(28,26,60,0.08);border-color:rgba(113,46,172,0.25)}
.test__quote-mark{font-size:64px;font-weight:700;color:var(--purple);line-height:0.6;opacity:0.4;margin-bottom:8px}
.test__quote{font-size:15px;line-height:1.65;color:var(--text-dark);margin-bottom:24px}
.test__attr{padding-top:18px;border-top:1px solid var(--rule-soft)}
.test__attr .n{font-size:15px;font-weight:700;color:var(--deep-purple);letter-spacing:-0.01em}
.test__attr .r{font-size:13px;color:var(--text-soft);margin-top:4px}
.hi{background:var(--lime);color:var(--ink)}
.hi .sec-title{color:var(--deep-purple)}
.hi__grid{margin-top:clamp(36px,5vw,48px);display:grid;grid-template-columns:0.75fr 1.25fr;gap:clamp(40px,5vw,72px);align-items:start}
.hi__portrait{width:100%;aspect-ratio:4/5;border-radius:14px;overflow:hidden;background:linear-gradient(160deg,#2a2554,var(--deep-purple));position:relative;box-shadow:0 0 80px rgba(113,46,172,0.55),0 0 160px rgba(113,46,172,0.35),0 20px 50px rgba(28,26,60,0.18);animation:hiGlow 5s ease-in-out infinite}
@keyframes hiGlow{0%,100%{box-shadow:0 0 80px rgba(113,46,172,0.55),0 0 160px rgba(113,46,172,0.35),0 20px 50px rgba(28,26,60,0.18)}50%{box-shadow:0 0 100px rgba(113,46,172,0.7),0 0 200px rgba(113,46,172,0.45),0 20px 50px rgba(28,26,60,0.18)}}
.hi__portrait img{width:100%;height:100%;object-fit:cover}
.hi__portrait::after{content:'';position:absolute;inset:0;background:radial-gradient(60% 40% at 50% 80%,rgba(197,230,162,0.2),transparent 70%);pointer-events:none}
.hi__portrait-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:180px;color:var(--lime);opacity:0.4;font-weight:700}
.hi__body p{font-size:17px;line-height:1.7;color:var(--text-dark);margin-bottom:18px}
.hi__body p:first-child{font-size:clamp(20px,2vw,24px);line-height:1.5;color:var(--deep-purple);font-weight:700;margin-bottom:22px;letter-spacing:-0.01em}
.hi__body strong{color:var(--purple);font-weight:700}
.hi__body em{color:var(--deep-purple);font-style:normal;font-weight:700}
.hi__links{margin-top:28px;display:flex;gap:16px;flex-wrap:wrap}
.hi__links a{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:100px;border:1.5px solid var(--rule-dark);font-size:14px;font-weight:700;color:var(--deep-purple);transition:all 0.25s}
.hi__links a:hover{background:var(--deep-purple);color:var(--cream);border-color:var(--deep-purple)}
.faq__list{margin-top:clamp(36px,5vw,48px)}
.faq__item{background:#ece9e8;border:1px solid rgba(28,26,60,0.08);border-radius:12px;margin-bottom:10px;overflow:hidden;transition:border-color 0.3s,background 0.3s}
.faq__item.open{border-color:var(--purple)}
.faq__q{display:flex;align-items:center;justify-content:space-between;width:100%;padding:22px 26px;gap:18px;text-align:left;cursor:pointer}
.faq__q-text{font-size:17px;font-weight:700;color:var(--deep-purple);flex:1;letter-spacing:-0.012em;line-height:1.35}
.faq__toggle{flex-shrink:0;width:34px;height:34px;border-radius:50%;background:rgba(113,46,172,0.08);color:var(--purple);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;transition:transform 0.4s cubic-bezier(.16,1,.3,1),background 0.3s,color 0.3s}
.faq__item.open .faq__toggle{background:var(--purple);color:var(--lime);transform:rotate(45deg)}
.faq__a{max-height:0;overflow:hidden;transition:max-height 0.5s cubic-bezier(.16,1,.3,1)}
.faq__a-inner{padding:0 26px 24px 26px;font-size:15px;line-height:1.7;color:var(--text-mid)}
.faq__item.open .faq__a{max-height:500px}
.final{background:var(--deep-purple);color:var(--text-light);text-align:center;padding:clamp(80px,13vw,150px) 0;position:relative;overflow:hidden}
.final::before{content:'';position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 50%,rgba(113,46,172,0.4),transparent 65%),radial-gradient(40% 30% at 80% 80%,rgba(197,230,162,0.1),transparent 65%);pointer-events:none}
.final__inner{position:relative;z-index:2}
.final__h{font-size:clamp(34px,5.5vw,60px);font-weight:700;line-height:1.08;letter-spacing:-0.025em;max-width:880px;margin:0 auto;color:#fff}
.final__sub{margin:28px auto 0;max-width:600px;font-size:17px;line-height:1.7;color:rgba(255,255,255,0.7)}
.final__cta{margin-top:40px}
.final__cta .btn{padding:18px 36px;font-size:16px}
.final__small{margin-top:28px;font-size:14px;color:rgba(255,255,255,0.5);font-style:italic;max-width:540px;margin-left:auto;margin-right:auto}
@media (max-width:1024px){.results__grid{grid-template-columns:1fr 1fr;row-gap:32px}.noincl__grid{grid-template-columns:1fr 1fr}}
@media (max-width:980px){.cmo-hero__grid{grid-template-columns:1fr}}
@media (max-width:880px){.diff__grid,.noincl__grid,.how__grid,.test__grid{grid-template-columns:1fr}.hi__grid{grid-template-columns:1fr}.hi__portrait{max-width:360px}.vibe__steps{grid-template-columns:1fr}.results__grid{grid-template-columns:1fr 1fr}}
@media (max-width:740px){.what__grid{grid-template-columns:1fr}.time__grid{grid-template-columns:1fr}}
@media (max-width:540px){.results__grid{grid-template-columns:1fr}.btn{padding:13px 22px;font-size:14px}.cmo-section{padding:72px 0}.what__time{padding:22px}}
@media (max-width:480px){.orgchart__row{grid-template-columns:repeat(5,1fr);gap:4px}.orgchart__hire{padding:8px 4px}.orgchart__hire .role{font-size:9px;min-height:22px}.orgchart__hire .salary{font-size:11px}}
@media (prefers-reduced-motion:reduce){.rv{opacity:1;transform:none}.diff__card,.hi__portrait{animation:none}}
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
function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
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
  return (
    <span className="num">
      {prefix}<span ref={ref}>{val.toLocaleString()}</span>{suffix && <span className="suffix">{suffix}</span>}
    </span>
  )
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────
const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setRevealed(true); io.disconnect() }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    const tm = setTimeout(() => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight) setRevealed(true)
    }, 200)
    return () => { io.disconnect(); clearTimeout(tm) }
  }, [])
  return (
    <div ref={ref} className={"faq__item rv" + (revealed ? " in" : "") + (open ? " open" : "")}>
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
    const t = setTimeout(() => setCollapsed(true), 1400)
    return () => clearTimeout(t)
  }, [])
  return (
    <header className="cmo-hero">
      <div className="cmo-container cmo-hero__inner">
        <div className="cmo-hero__grid">
          <div>
            <div className="cmo-hero__label rv"><span className="dot"></span>Fractional CMO Services</div>
            <h1 className="cmo-hero__h1 rv" style={{ transitionDelay: ".1s" }}>Fractional CMO Services. Built on Vibe Marketing.</h1>
            <p className="cmo-hero__sub rv" style={{ transitionDelay: ".2s" }}>
              You need marketing leadership. You also know a full-time CMO costs <strong>$250K+ per year</strong>, takes months to hire, and might not even be the right fit for where you are right now. Agencies are too slow. Freelancers are too narrow. Doing everything yourself stopped working three fundraising rounds ago.
            </p>
            <p className="cmo-hero__fix rv" style={{ transitionDelay: ".3s" }}>There's a fourth option.</p>
            <div className="cmo-hero__cta-row rv" style={{ transitionDelay: ".4s" }}>
              <a className="btn btn--lime" href="https://calendar.notion.so/meet/octaloom/discovery" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-discovery")) }} style={{ color: "var(--purple)" }}>
                Book a Free Discovery Call
                <span className="arrow">→</span>
              </a>
              <a className="btn btn--outline-light" href="#what">See what's included</a>
            </div>
          </div>
          <div className="rv rv--right" style={{ transitionDelay: ".3s" }}>
            <div className={"orgchart" + (collapsed ? " collapse" : "")}>
              <div className="orgchart__title">
                <span>What it would cost to build in-house</span>
                <span className="total">~$630K/yr</span>
              </div>
              <div className="orgchart__row">
                <div className="orgchart__hire"><div className="role">CMO</div><div className="salary">$250K</div></div>
                <div className="orgchart__hire"><div className="role">Marketing<br/>Manager</div><div className="salary">$120K</div></div>
                <div className="orgchart__hire"><div className="role">Content<br/>Writer</div><div className="salary">$80K</div></div>
                <div className="orgchart__hire"><div className="role">Designer</div><div className="salary">$80K</div></div>
                <div className="orgchart__hire"><div className="role">Automation<br/>Lead</div><div className="salary">$100K</div></div>
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
                  <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Headshot-1.png" alt="Hanita Yudovski, Fractional CMO and founder of OctaLoom" onError={(e: any) => { e.target.style.display = "none"; e.target.parentNode.textContent = "HY" }} />
                </div>
                <div className="orgchart__node-info">
                  <div className="n">OctaLoom · Hanita Yudovski</div>
                  <div className="r">Fractional CMO · powered by Vibe Marketing</div>
                </div>
                <div className="orgchart__node-tag">One operator</div>
              </div>
              <div className="orgchart__legend">
                <span className="sw">In-house hires</span>
                <span className="sw sw--lime">OctaLoom alternative</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// ─── Entity ───────────────────────────────────────────────────────────────────
function CmoEntity() {
  return (
    <section className="cmo-entity">
      <div className="cmo-container">
        <p className="cmo-entity__body rv">
          OctaLoom delivers Fractional CMO services for B2B startups and growing companies, powered by <strong>Vibe Marketing</strong>: the methodology that combines CMO-level strategy with AI-powered execution, delivered by one operator at the speed of a full marketing department. I'm Hanita Yudovski, a LinkedIn-led Fractional CMO and host of the{" "}
          <a className="podcast-link" href="https://whatsthestorywith.com/" target="_blank" rel="noopener noreferrer"><strong>What's the Story With?</strong></a>{" "}B2B marketing podcast.
        </p>
      </div>
    </section>
  )
}

// ─── What I actually do ───────────────────────────────────────────────────────
const WHAT_ITEMS = [
  "Complete marketing strategy and a 12-month roadmap that gets updated, not shelved",
  "ICP definition, positioning, and messaging that your sales team can actually use",
  "Direct execution across channels: LinkedIn, content, social, email, landing pages, events, PR, media outreach. I don't hand you a strategy deck and disappear. I build the system and run it.",
  "Go-to-market strategy for product launches",
  "Paid media strategy and campaign management",
  "Marketing automation and AI workflows that replace manual work",
  "Events, PR, and media presence: making sure you and your brand show up where decision-makers pay attention",
  "Performance tracking and monthly strategic pivots based on real data",
  "Monthly strategic sessions plus ongoing access between sessions",
]
function CmoWhatDo() {
  return (
    <section className="cmo-section" id="what" style={{ background: "#ece9e8" }}>
      <div className="cmo-container">
        <h2 className="sec-title rv">What a Fractional CMO Actually Does?<span className="sec-title__sub">Here, Specifically.</span></h2>
        <p className="what__intro rv">
          <em>"Strategic marketing leadership"</em> is what every fractional CMO website says. Here's what it actually looks like when you work with OctaLoom:
        </p>
        <div className="what__grid">
          {WHAT_ITEMS.map((txt, i) => (
            <div className="what__card rv" key={i} style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="what__check">✓</div>
              <p>{txt}</p>
            </div>
          ))}
        </div>
        <div className="what__time rv">
          <span className="label">Time commitment</span>
          <span className="val">20–25+ hours per month from my side, flexible based on scope. This scales up during launches, events, or high-growth periods.</span>
        </div>
        <div className="what__teammgmt rv">
          If you have a team or contractors, I manage them. If you don't, I execute directly via Vibe Marketing. Either way, you get a marketing department that actually runs.
        </div>
      </div>
    </section>
  )
}

// ─── Vibe Marketing ───────────────────────────────────────────────────────────
function CmoVibe() {
  return (
    <section className="cmo-section cmo-section--purple">
      <div className="cmo-container">
        <h2 className="sec-title rv">What Is Vibe Marketing?</h2>
        <p className="vibe__intro rv">In February 2025, Andrej Karpathy introduced the concept of "vibe coding": describe what you want, and let AI handle the building. It changed how software gets made.</p>
        <div className="vibe__steps">
          <div className="vibe__step rv">
            <div className="n">01 · The Concept</div>
            <p>Vibe Marketing applies the same philosophy to marketing. I set the strategy, define the voice, make the judgment calls, and <strong>AI handles the execution at scale</strong>.</p>
          </div>
          <div className="vibe__step rv" style={{ transitionDelay: ".1s" }}>
            <div className="n">02 · The Stack</div>
            <p>Content generation, workflow automation, scheduling, custom landing pages and micro-sites, analytics dashboards, all built at AI speed while a <em>human brain (mine)</em> keeps the strategy, voice, and tactical calls.</p>
          </div>
          <div className="vibe__step rv" style={{ transitionDelay: ".2s" }}>
            <div className="n">03 · The Result</div>
            <p>One operator delivering what used to take a team of five specialists. AI speed, human judgment. That's the core of every OctaLoom engagement, and it's why a fractional CMO model that would normally give you 20 hours of strategy can give you <strong>20 hours of strategy AND execution</strong>.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── How This Engagement Is Different ─────────────────────────────────────────
function CmoDifferent() {
  return (
    <section className="cmo-section diff" style={{ background: "#ece9e8" }}>
      <div className="cmo-container">
        <h2 className="sec-title rv">How This Engagement Is Different?</h2>
        <div className="diff__grid">
          <div className="diff__card rv">
            <div className="ico">①</div>
            <h3>1–2 companies at a time</h3>
            <p>That's it. You're not an account on a roster. You're part of my daily work.</p>
          </div>
          <div className="diff__card rv" style={{ transitionDelay: ".08s" }}>
            <div className="ico">☎</div>
            <h3>I'm reachable</h3>
            <p>Slack, WhatsApp, regular check-ins. This isn't a monthly strategy call and silence in between.</p>
          </div>
          <div className="diff__card rv" style={{ transitionDelay: ".16s" }}>
            <div className="ico">✱</div>
            <h3>Hands on, not hands off</h3>
            <p>If you have a team or contractors, I manage them. If you don't, I execute directly via Vibe Marketing.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Who Hires / Right time ───────────────────────────────────────────────────
const RIGHT_TIME = [
  "You're a B2B startup (pre-seed through Series B) or a growing SMB",
  "You have an idea, a product, or a service that works, but marketing is scattered or nonexistent",
  "You can't justify a $25K+/month full-time CMO but you need real marketing leadership",
  "You've tried agencies or freelancers and it didn't work (too slow, too generic, no ownership)",
  "You understand that brand awareness is where B2B trust gets built. The sales cycle is long. The companies that win are the ones people already know when the buying decision happens.",
]
const WRONG_TIME = [
  "You want someone to \"run ads\" and nothing else (that's a media buyer, not a CMO)",
  "You want guaranteed revenue numbers in 30 days (B2B sales cycles are long; marketing compounds over 90–180 days; trust is built through consistent brand presence)",
  "You're not willing to invest in brand awareness as a core part of your strategy (for OctaLoom, brand awareness is non-negotiable)",
]
function CmoTime() {
  return (
    <section className="cmo-section cmo-section--who">
      <div className="cmo-container">
        <h2 className="sec-title rv">Who Hires a Fractional CMO?<span className="sec-title__sub">And When Is the Right Time</span></h2>
        <div className="time__grid">
          <div className="time__col time__col--yes rv">
            <h3><span className="glyph">✓</span>Right time</h3>
            <ul className="time__list">
              {RIGHT_TIME.map((t, i) => <li key={i}><span className="marker">✓</span><span>{t}</span></li>)}
            </ul>
          </div>
          <div className="time__col time__col--no rv" style={{ transitionDelay: ".1s" }}>
            <h3><span className="glyph">×</span>Wrong time</h3>
            <ul className="time__list">
              {WRONG_TIME.map((t, i) => <li key={i}><span className="marker">×</span><span>{t}</span></li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── What's Included ──────────────────────────────────────────────────────────
const INCLUDED_ITEMS: Array<{ h: string; p: string }> = [
  { h: "Complete marketing strategy and 12-month roadmap", p: "A live document, updated quarterly. Decisions get traced back to it." },
  { h: "ICP, persona, and positioning work", p: "Sharp enough that founder, sales lead, and content writer all use the same words." },
  { h: "Direct execution across all channels via Vibe Marketing", p: "I build and run the system myself. If you have a team or contractors, I manage them too. Always hands-on." },
  { h: "Go-to-market strategy for product launches", p: "From positioning to launch sequence to follow-through." },
  { h: "LinkedIn strategy and execution", p: "OctaLoom's core channel." },
  { h: "Content strategy across all platforms", p: "One narrative, multiple surfaces." },
  { h: "Brand awareness as a core non-negotiable", p: "B2B sales cycles are long. The brand that wins is the most present. I treat brand awareness as a foundation of every strategy." },
  { h: "Events, PR, and media presence", p: "Making sure you and your brand are visible where decision-makers pay attention: industry events, media outlets, podcasts, press." },
  { h: "Paid media strategy and management", p: "Ads, campaigns, budget allocation." },
  { h: "Marketing automation and AI workflows", p: "Custom builds that replace manual work end-to-end." },
  { h: "Marketing budget management", p: "Tool and contractor recommendations, spend oversight, making sure your budget goes where it actually moves the needle." },
  { h: "Vendor and contractor management", p: "When needed." },
  { h: "Performance tracking and monthly strategic pivots", p: "Real data. Real adjustments." },
  { h: "Monthly strategic sessions plus ongoing access between sessions", p: "Reachable on Slack, WhatsApp, and regular check-ins." },
]
function CmoIncluded() {
  return (
    <section className="cmo-section incl">
      <div className="cmo-container">
        <h2 className="sec-title rv">What's Included</h2>
        <p className="sec-sub rv">Every line below is in scope. No upsells, no "phase two" surprises.</p>
        <div className="incl__grid">
          {INCLUDED_ITEMS.map((it, i) => (
            <div className="incl__card rv" key={i} style={{ transitionDelay: `${i * 0.04}s` }}>
              <h4>{it.h}</h4>
              <p>{it.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Not Included ─────────────────────────────────────────────────────────────
function CmoNotIncluded() {
  return (
    <section className="cmo-section noincl-section">
      <div className="cmo-container">
        <h2 className="sec-title rv">What's Not Included (Honest)</h2>
        <div className="noincl__grid">
          <div className="noincl__item rv">
            <div className="ico">×</div>
            <h4>Sales team management</h4>
            <p>I lead marketing, not sales. Though the two must align, and I'll make sure they do.</p>
          </div>
          <div className="noincl__item rv" style={{ transitionDelay: ".08s" }}>
            <div className="ico">×</div>
            <h4>Full-time availability</h4>
            <p>20–25+ hours per month is the engagement, flexible based on scope. This is fractional leadership.</p>
          </div>
          <div className="noincl__item rv" style={{ transitionDelay: ".16s" }}>
            <div className="ico">×</div>
            <h4>"Fix everything in 30 days" miracles</h4>
            <p>B2B marketing compounds over 90–180 days. Brand awareness builds trust over time. That's the nature of the game.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function CmoHow() {
  return (
    <section className="cmo-section how">
      <div className="cmo-container">
        <h2 className="sec-title rv">How It Works?</h2>
        <div className="how__grid">
          <div className="how__step rv">
            <div className="n">Step 1</div>
            <h3>Discovery call</h3>
            <p>30–45 minutes. I learn about your business, your gaps, your goals. If it's a fit, we move to step 2. If it's not, I'll tell you and probably recommend someone better suited.</p>
          </div>
          <div className="how__step rv" style={{ transitionDelay: ".1s" }}>
            <div className="n">Step 2</div>
            <h3>Marketing audit and strategy build</h3>
            <p>First 2–4 weeks. Deep research, competitive analysis, ICP, messaging, roadmap. Brand awareness strategy goes in from day one.</p>
          </div>
          <div className="how__step rv" style={{ transitionDelay: ".2s" }}>
            <div className="n">Step 3</div>
            <h3>Execution begins</h3>
            <p>Month 2 onwards. I either execute directly (via Vibe Marketing) or manage your team and contractors. Monthly reviews keep everything on track. The system compounds as it runs.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Real Results ─────────────────────────────────────────────────────────────
function CmoResults() {
  return (
    <section className="cmo-section results" id="results">
      <div className="cmo-container">
        <div className="rv"><div className="results__intro"><span className="dot"></span>Real Results</div></div>
        <h2 className="sec-title rv" style={{ color: "var(--ink)", maxWidth: 880 }}>Every number below is organic. No paid amplification. No follower buys.</h2>
        <div className="results__grid">
          <div className="results__cell rv">
            <CountUp target={770} suffix="K+" />
            <div className="lbl">Organic impressions across client accounts, spanning LinkedIn, content, and broader marketing initiatives.</div>
          </div>
          <div className="results__cell rv" style={{ transitionDelay: ".1s" }}>
            <CountUp target={300} suffix="%" />
            <div className="lbl">Engagement lift on a B2B SaaS founder's personal brand.</div>
          </div>
          <div className="results__cell rv" style={{ transitionDelay: ".2s" }}>
            <CountUp target={70} suffix="%" />
            <div className="lbl">Manual work cut through custom AI automation (Vibe Marketing applied to real marketing workflows).</div>
          </div>
          <div className="results__cell rv" style={{ transitionDelay: ".3s" }}>
            <CountUp target={5000} prefix="~" />
            <div className="lbl">Engaged B2B followers grown 100% organically on a personal profile, zero ad spend.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { q: "Hanita accompanied us in building comprehensive marketing infrastructure, from deep understanding of the organization and its challenges. The combination of strategic thinking, process leadership, and precise execution created meaningful impact on how we operate.", n: "Ella Sayag", r: "CEO, Adopt Me" },
  { q: "The moment Hanita joined, marketing stopped being a drag and became a growth engine. There's a clear strategy, automation that actually works, and results we can measure over time.", n: "Shimi Dvir", r: "CEO, AcademAi" },
  { q: "Hanita takes an idea and turns it into a system that actually works. Strategy and thinking, yes, but also the details, the follow-through, the getting things done.", n: "Neta Ergez", r: "Founder, Club20" },
]
function CmoTestimonials() {
  return (
    <section className="cmo-section cmo-section--cream">
      <div className="cmo-container">
        <h2 className="sec-title rv">What Clients Say</h2>
        <div className="test__grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="test__card rv" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
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

// ─── Hi I'm Hanita ────────────────────────────────────────────────────────────
function CmoHi() {
  return (
    <section className="cmo-section hi">
      <div className="cmo-container">
        <h2 className="sec-title rv">Hi, I'm Hanita</h2>
        <div className="hi__grid">
          <div className="hi__portrait rv rv--left">
            <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Headshot-1.png" alt="Hanita Yudovski" onError={(e: any) => { e.target.style.display = "none"; if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = "flex" }} />
            <div className="hi__portrait-fallback" style={{ display: "none" }}>HY</div>
          </div>
          <div className="hi__body rv" style={{ transitionDelay: ".15s" }}>
            <p>Hi, I'm Hanita. I'm a LinkedIn-led Fractional CMO, and I build marketing systems for B2B startups, SMB owners, and solopreneurs who need a real marketing department but can't justify (or don't want) hiring one.</p>
            <p>My approach: weave <strong>strategy, content, automation, and AI</strong> into a single working system, the kind that usually takes five specialists, and deliver it as one operator moving at AI speed. I call it Vibe Marketing, inspired by Andrej Karpathy's "vibe coding" concept: describe the strategy, and let AI handle the building.</p>
            <p>Brand awareness isn't optional in my engagements. In B2B, the sales cycle is long. The companies that win are the ones people already know when the buying decision happens. I build every strategy around that principle.</p>
            <p>5+ years deep in B2B marketing. Last 3 deep in what AI changes about all of it. I host <a className="podcast-link" href="https://whatsthestorywith.com/" target="_blank" rel="noopener noreferrer"><em>What's the Story With?</em></a>, a B2B marketing podcast where I break down what actually works, and what doesn't.</p>
            <p>If your marketing feels scattered and you're tired of hiring around it, my DMs are open.</p>
            <div className="hi__links">
              <a href="https://www.linkedin.com/in/hanita-yudovski/">Connect on LinkedIn →</a>
              <a href="https://whatsthestorywith.com/" target="_blank" rel="noopener noreferrer">Listen to the podcast →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "What is a fractional CMO?", a: "A fractional CMO is a part-time marketing leader who works with your company on a monthly retainer instead of a full-time salary. You get CMO-level strategy and execution without the $25K+/month hire. OctaLoom adds Vibe Marketing on top: AI-powered execution so you get full-department output at solo-operator speed." },
  { q: "How is a fractional CMO different from a marketing agency?", a: "Agencies give you a team managed by account managers. A fractional CMO gives you one strategic brain that owns your marketing like it's their own company. OctaLoom adds AI-powered execution, so you get agency-level output at the speed of one operator who actually thinks about your business every day." },
  { q: "How much does a fractional CMO cost?", a: "Industry range: fractional CMOs typically charge $3K–20K/month depending on scope, seniority, and time commitment. Average retainers land around $10K–12K/month. Some bill hourly ($200–500/hour), others work on monthly retainers. OctaLoom works exclusively on monthly retainers because marketing needs continuity." },
  { q: "How many hours per month does a fractional CMO work?", a: "OctaLoom's engagement starts at 20–25 hours per month, flexible based on scope. Real execution, real oversight, real access. This scales up as needed during launches, events, or high-growth periods." },
  { q: "What's Vibe Marketing?", a: "Vibe Marketing is OctaLoom's methodology, inspired by Andrej Karpathy's \"vibe coding\" concept. The idea: I set the strategy, define the voice, make the judgment calls, and AI handles the execution at scale. Content, automation, workflows, landing pages, all built at AI speed while human judgment keeps the quality and strategic direction. One operator, full-department output." },
  { q: "When is the right time to hire a fractional CMO?", a: "When you've outgrown the founder-does-everything stage but can't justify a full-time CMO hire. That can be pre-seed (when you need brand awareness from day one) or Series B (when you need marketing leadership to scale what's already working). The common thread: you need real marketing leadership, and you need someone who executes." },
  { q: "What if we already have a small marketing team?", a: "Even better. I can lead your existing team, close the strategic gaps, and make their execution more effective. You get senior marketing leadership without replacing anyone." },
  { q: "Do you work in English or Hebrew?", a: "Both. Strategy, copy, presentations, board reporting. Fluent in B2B marketing in either language." },
]
function CmoFAQ() {
  return (
    <section className="cmo-section cmo-section--purple">
      <div className="cmo-container cmo-container--narrow">
        <h2 className="sec-title rv">Frequently Asked Questions</h2>
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
        <h2 className="final__h rv">Ready for Marketing Leadership That Actually Executes?</h2>
        <p className="final__sub rv" style={{ transitionDelay: ".1s" }}>No deck. No pitch. No hourly retainer. A real conversation about whether OctaLoom can build the marketing system your company actually needs.</p>
        <div className="final__cta rv" style={{ transitionDelay: ".2s" }}>
          <a className="btn btn--lime" href="https://calendar.notion.so/meet/octaloom/discovery" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-discovery")) }} style={{ color: "var(--purple)" }}>
            Talk to Your Future CMO
            <span className="arrow">→</span>
          </a>
        </div>
        <p className="final__small rv" style={{ transitionDelay: ".3s" }}>(Discovery calls are strategic conversations. If it's not a fit, I'll tell you. I'll probably recommend someone better suited.)</p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//   NAV + FOOTER — copied from existing service page pattern
// ═══════════════════════════════════════════════════════════════════════════════
const _P = "#712eac", _D = "#201e4b", _L = "#c6e1a5", _C = "#ece9e7", _B = "#e5e7eb"
const _F = "'Aeonik', sans-serif"

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
    { label: "LinkedIn for Organizations", href: "https://www.octaloom.com/linkedin-for-organizations" },
    { label: "LinkedIn for Executives",    href: "https://www.octaloom.com/linkedin-for-executives" },
    { label: "LinkedIn for Solopreneurs",  href: "https://www.octaloom.com/linkedin-for-solopreneurs" },
  ]
  const otherSub = [
    { label: "Fractional CMO",    href: "#" },
    { label: "AI Tools & Agents", href: "https://www.octaloom.com/ai-tools-agents" },
    { label: "Workshops",         href: "#workshops" },
  ]
  const navLinks = [
    { label: "About",   href: "https://www.octaloom.com/about" },
    { label: "Blog",    href: "https://www.octaloom.com/blog" },
    { label: "Contact", href: "#contact" },
    { label: "Goodies", href: "https://octagoodies.com" },
  ]

  const dItem: React.CSSProperties = { display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", fontSize: 13, color: _D, borderRadius: 8, transition: "background 0.15s", textDecoration: "none" }
  const dBox: React.CSSProperties  = { position: "absolute", background: "#fff", borderRadius: 12, padding: "8px 6px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: `1px solid ${_B}`, zIndex: 50 }
  const hi = (e: any, on: boolean) => { e.currentTarget.style.background = on ? "rgba(113,46,172,0.05)" : "transparent" }

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
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {servicesOpen && <div style={{ position: "absolute", top: "100%", left: 0, right: 0, height: 12, zIndex: 199 }} />}
            {servicesOpen && (
              <div style={{ ...dBox, minWidth: 200, top: "calc(100% + 10px)", left: 0 }}>
                <div style={{ position: "relative" }} onMouseEnter={() => setLinkedinOpen(true)} onMouseLeave={() => setLinkedinOpen(false)}>
                  <a href="https://www.octaloom.com/linkedin-growth-engine" style={dItem} onMouseEnter={e => hi(e, true)} onMouseLeave={e => hi(e, false)}>
                    <span>LinkedIn Growth Engine</span>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.45, marginLeft: "auto" }}><path d="M4 2l4 4-4 4" stroke={_D} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  {linkedinOpen && <div style={{ position: "absolute", top: 0, bottom: 0, left: "100%", width: 8, zIndex: 199 }} />}
                  {linkedinOpen && (
                    <div style={{ ...dBox, minWidth: 230, top: 0, left: "calc(100% + 6px)" }}>
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
            <a href="https://www.octaloom.com/fractional-cmo-he"
              style={{ fontSize: 12, fontWeight: 600, color: _D, background: "transparent", border: "1px solid rgba(32,30,75,0.22)", borderRadius: 100, padding: "5px 13px", fontFamily: _F, transition: "border-color 0.2s,color 0.2s", letterSpacing: "0.03em", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = _P; e.currentTarget.style.color = _P }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(32,30,75,0.22)"; e.currentTarget.style.color = _D }}>
              עב
            </a>
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-discovery"))}
              style={{ padding: "8px 20px", borderRadius: 100, background: _P, color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: _F, border: "none", cursor: "pointer" }}>
              Let's Talk
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
        <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, left: 0, background: "#ece9e8", borderRadius: 16, padding: "20px 32px 32px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 50, maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: _P, margin: "0 0 4px", fontFamily: _F }}>Services</p>
          <button onClick={() => setLinkedinExpanded(p => !p)}
            style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", fontSize: 20, color: _D, padding: "11px 0", fontWeight: 600, borderBottom: "1px solid rgba(113,46,172,0.08)", fontFamily: _F, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            LinkedIn Growth Engine
            <svg width={11} height={11} viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.25s", transform: linkedinExpanded ? "rotate(180deg)" : "none" }}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
            <button onClick={() => { setMenuOpen(false); window.dispatchEvent(new CustomEvent("open-discovery")) }}
              style={{ display: "block", textAlign: "center", padding: "14px 24px", fontSize: 15, fontWeight: 600, background: _P, color: "#fff", borderRadius: 100, fontFamily: _F, border: "none", cursor: "pointer", width: "100%" }}>
              Let's Talk. Free.
            </button>
            <a href="https://www.octaloom.com/fractional-cmo-he"
              style={{ display: "block", textAlign: "center", padding: "11px 24px", fontSize: 13, fontWeight: 600, color: _D, borderRadius: 100, fontFamily: _F, border: "1px solid rgba(32,30,75,0.2)", textDecoration: "none", width: "100%", boxSizing: "border-box" }}>
              ← עברית
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
    { label: "LinkedIn for Organizations", href: "https://www.octaloom.com/linkedin-for-organizations" },
    { label: "LinkedIn for Executives",    href: "https://www.octaloom.com/linkedin-for-executives" },
    { label: "LinkedIn for Solopreneurs",  href: "https://www.octaloom.com/linkedin-for-solopreneurs" },
  ]
  const otherLinks = [
    { label: "Fractional CMO",    href: "https://www.octaloom.com/fractional-cmo" },
    { label: "AI Tools & Agents", href: "https://www.octaloom.com/ai-tools-agents" },
    { label: "Workshops",         href: "#workshops" },
  ]
  const pageLinks = [
    { label: "Home",    href: "https://www.octaloom.com/" },
    { label: "About",   href: "https://www.octaloom.com/about" },
    { label: "Blog",    href: "https://www.octaloom.com/blog" },
    { label: "Contact", href: "#contact" },
  ]
  const legalLinks = [
    { label: "Privacy",       href: "https://www.octaloom.com/privacy-policy" },
    { label: "Terms",         href: "https://www.octaloom.com/terms-of-service" },
    { label: "Accessibility", href: "https://www.octaloom.com/accessibility" },
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

  const lnk: React.CSSProperties = { fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s", display: "block", lineHeight: "1.9", fontFamily: _F }
  const hd: React.CSSProperties  = { fontSize: 13, fontWeight: 700, color: _C, margin: "0 0 14px", fontFamily: _F }
  const hov = (e: any, on: boolean) => { e.currentTarget.style.color = on ? _L : "rgba(255,255,255,0.5)" }

  return (
    <footer style={{ padding: isMobile ? "32px 0 0" : "64px 0 0", background: "#211d4b", color: "rgba(255,255,255,0.7)", fontFamily: _F }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 0.65fr 1fr 0.8fr 0.8fr 0.8fr", gap: isMobile ? "20px" : 24, paddingBottom: isMobile ? 24 : 48 }}>

          <div>
            <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/Logo%20footer.png" alt="OctaLoom"
              style={{ height: isMobile ? 64 : 100, width: "auto", display: "block" }} onError={(e: any) => { e.target.style.display = "none" }} />
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 14, maxWidth: 240, lineHeight: 1.65, fontFamily: _F }}>
              Your marketing department,<br/>minus the department.
            </p>
          </div>

          {!isMobile && <div><h4 style={hd}>Pages</h4>{pageLinks.map((l, i) => <a key={i} href={l.href} style={lnk} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>)}</div>}
          {!isMobile && <div><h4 style={hd}>LinkedIn Services</h4>{svcLinks.map((l, i) => <a key={i} href={l.href} style={lnk} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>)}</div>}
          {!isMobile && <div><h4 style={hd}>More Services</h4>{otherLinks.map((l, i) => <a key={i} href={l.href} style={lnk} onMouseEnter={e => hov(e, true)} onMouseLeave={e => hov(e, false)}>{l.label}</a>)}</div>}

          {!isMobile && (
            <div>
              <h4 style={{ ...hd, fontWeight: 300, fontSize: 12 }}>Free marketing<br/>tools &amp; templates</h4>
              <a href="https://octagoodies.com" target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "inline-block", opacity: 0.9, transition: "opacity 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "1" }} onMouseLeave={e => { e.currentTarget.style.opacity = "0.9" }}>
                <img src="https://raw.githubusercontent.com/Hanita-y/Octaloom-images-and-videos/main/OCTAGOODIES%20GREEN.png" alt="OctaGoodies" style={{ height: 44, width: "auto", display: "block" }} />
              </a>
            </div>
          )}

          <div>
            {!isMobile && <h4 style={hd}>Connect</h4>}
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
          <span>© 2026 OctaLoom</span>
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
export default function FractionalCMOEN() {
  useGlobalStyles()
  useReveal()
  return (
    <div className="cmo-page" dir="ltr" style={{ fontFamily: "'Aeonik', sans-serif" }}>
      <SiteNavbar />
      <CmoHero />
      <CmoEntity />
      <CmoWhatDo />
      <CmoVibe />
      <CmoDifferent />
      <CmoTime />
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
