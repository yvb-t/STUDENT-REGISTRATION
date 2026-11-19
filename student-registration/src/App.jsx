import { useState, useEffect } from 'react'

// ─── All CSS injected as string ───────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');

:root {
  --accent:      #0E7C86;
  --accent-lt:   #12a0ad;
  --accent-dim:  rgba(14,124,134,0.1);
  --accent-glow: 0 0 0 3px rgba(14,124,134,0.22);
  --bg:          #f4f6f8;
  --bg2:         #ffffff;
  --bg3:         #eef0f3;
  --surface:     #ffffff;
  --border:      #d6dbe2;
  --text:        #111827;
  --text2:       #4b5563;
  --text3:       #9ca3af;
  --r:           14px;
  --r-sm:        8px;
  --r-lg:        20px;
  --sh:          0 2px 12px rgba(0,0,0,0.07);
  --sh-md:       0 4px 24px rgba(0,0,0,0.12);
  --tr:          0.2s cubic-bezier(.4,0,.2,1);
  --font:        'Bricolage Grotesque', system-ui, sans-serif;
  --ok:          #059669;
  --err:         #dc2626;
  --warn:        #d97706;
  color-scheme: light;
}
[data-theme="dark"] {
  --bg:      #0f1117; --bg2: #1a1d27; --bg3: #22263a;
  --surface: #1a1d27; --border: #2e3348;
  --text: #f1f5f9; --text2: #94a3b8; --text3: #475569;
  --sh:    0 2px 12px rgba(0,0,0,0.4);
  --sh-md: 0 4px 24px rgba(0,0,0,0.5);
  color-scheme: dark;
}
@media (prefers-reduced-motion: reduce) {
  *,*::before,*::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; }
}
body { font-family:var(--font); background:var(--bg); color:var(--text); min-height:100vh; font-size:15px; line-height:1.6; }
*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }

/* ── Shell ── */
.shell { min-height:100vh; display:flex; flex-direction:column; }

/* ── Top bar ── */
.topbar {
  display:flex; align-items:center; gap:12px;
  padding:0 24px; height:58px;
  background:var(--surface); border-bottom:1px solid var(--border);
  position:sticky; top:0; z-index:200; box-shadow:var(--sh);
}
.logo { display:flex; align-items:center; gap:9px; font-weight:800; font-size:17px; color:var(--accent); }
.logo-box { width:32px; height:32px; border-radius:9px; background:var(--accent); color:#fff; display:flex; align-items:center; justify-content:center; font-size:17px; }
.spacer { flex:1; }
.icon-btn {
  width:36px; height:36px; border-radius:9px; border:1.5px solid var(--border);
  background:var(--bg2); color:var(--text2); display:flex; align-items:center;
  justify-content:center; cursor:pointer; font-size:16px; transition:all var(--tr);
}
.icon-btn:hover { background:var(--accent-dim); color:var(--accent); border-color:var(--accent); }
.icon-btn:focus-visible { outline:none; box-shadow:var(--accent-glow); }

/* ── Tab nav (below topbar) ── */
.tab-bar {
  display:flex; gap:2px; padding:0 20px;
  background:var(--surface); border-bottom:1px solid var(--border);
  overflow-x:auto; scrollbar-width:none;
}
.tab-bar::-webkit-scrollbar { display:none; }
.tab-btn {
  display:flex; align-items:center; gap:6px;
  padding:11px 16px; font-family:var(--font); font-size:13.5px; font-weight:600;
  color:var(--text2); background:transparent; border:none; border-bottom:2.5px solid transparent;
  cursor:pointer; transition:all var(--tr); white-space:nowrap;
}
.tab-btn:hover { color:var(--text); }
.tab-btn.active { color:var(--accent); border-bottom-color:var(--accent); }
.tab-btn:focus-visible { outline:none; box-shadow:var(--accent-glow); }
.tab-icon { font-size:16px; }

/* ── Page area ── */
.page { flex:1; max-width:1000px; margin:0 auto; padding:32px 20px 72px; width:100%; }
.page-sm { max-width:680px; }
.page-title { font-size:24px; font-weight:800; color:var(--text); margin-bottom:4px; }
.page-sub   { font-size:14px; color:var(--text2); margin-bottom:28px; }

/* ── Buttons ── */
.btn {
  display:inline-flex; align-items:center; gap:7px;
  padding:9px 18px; border-radius:var(--r-sm); font-family:var(--font);
  font-size:14px; font-weight:600; cursor:pointer; border:none;
  transition:all var(--tr);
}
.btn:focus-visible { outline:none; box-shadow:var(--accent-glow); }
.btn-primary   { background:var(--accent);  color:#fff; }
.btn-primary:hover { background:var(--accent-lt); }
.btn-secondary { background:var(--bg3); color:var(--text); border:1.5px solid var(--border); }
.btn-secondary:hover { border-color:var(--accent); color:var(--accent); }
.btn-ghost { background:transparent; color:var(--accent); padding:6px 10px; }
.btn-ghost:hover { background:var(--accent-dim); border-radius:6px; }
.btn-danger { background:#fef2f2; color:var(--err); border:1.5px solid #fca5a5; }
.btn-danger:hover { background:#fee2e2; }
[data-theme="dark"] .btn-danger { background:#3b1515; border-color:#7f1d1d; }
.btn:disabled { opacity:.45; cursor:not-allowed; }
.btn-lg { padding:12px 26px; font-size:15px; border-radius:var(--r); }
.btn-sm { padding:5px 13px; font-size:12.5px; border-radius:7px; }
.btn-full { width:100%; justify-content:center; }

/* ── Form ── */
.field { display:flex; flex-direction:column; gap:5px; }
.grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
@media(max-width:600px){ .grid-2,.grid-3 { grid-template-columns:1fr; } }
label.lbl { font-size:12.5px; font-weight:600; color:var(--text2); letter-spacing:.03em; display:flex; align-items:center; gap:5px; }
.inp,.sel {
  background:var(--bg2); border:1.5px solid var(--border);
  border-radius:var(--r-sm); color:var(--text);
  padding:10px 13px; font-family:var(--font); font-size:14.5px;
  width:100%; transition:border-color var(--tr),box-shadow var(--tr); appearance:none; outline:none;
}
.inp::placeholder { color:var(--text3); }
.inp:focus,.sel:focus { border-color:var(--accent); box-shadow:var(--accent-glow); }
.inp.ok { border-color:var(--ok); }
.inp.bad,.sel.bad { border-color:var(--err); }
.sel-wrap { position:relative; }
.sel-wrap::after { content:'▾'; position:absolute; right:12px; top:50%; transform:translateY(-50%); pointer-events:none; color:var(--text3); font-size:13px; }
.sel { padding-right:32px; cursor:pointer; }
.sel option { background:var(--bg2); color:var(--text); }
.ferr  { font-size:12px; color:var(--err); display:flex; align-items:center; gap:4px; }
.fhint { font-size:12px; color:var(--text3); }
.vtick { color:var(--ok); }
.card  { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--r-lg); padding:24px; box-shadow:var(--sh); }
.section-h { font-size:17px; font-weight:700; margin-bottom:18px; color:var(--text); }
.form-gap { display:flex; flex-direction:column; gap:16px; }

/* ── Login ── */
.login-wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; background:var(--bg); padding:20px; }
.login-box {
  background:var(--surface); border:1.5px solid var(--border);
  border-radius:var(--r-lg); padding:44px 38px 36px;
  width:100%; max-width:410px; box-shadow:var(--sh-md);
  display:flex; flex-direction:column; gap:20px;
}
.login-logo { display:flex; flex-direction:column; align-items:center; gap:10px; }
.login-icon { width:54px; height:54px; border-radius:16px; background:var(--accent); color:#fff; display:flex; align-items:center; justify-content:center; font-size:26px; }
.login-title { font-size:21px; font-weight:800; text-align:center; }
.login-sub   { font-size:13.5px; color:var(--text2); text-align:center; margin-top:-14px; }
.role-tabs   { display:flex; background:var(--bg3); border-radius:var(--r-sm); padding:4px; gap:4px; }
.role-tab    { flex:1; padding:9px; border-radius:6px; font-family:var(--font); font-size:14px; font-weight:600; border:none; cursor:pointer; transition:all var(--tr); color:var(--text2); background:transparent; }
.role-tab.on { background:var(--surface); color:var(--accent); box-shadow:var(--sh); }
.role-tab:focus-visible { outline:none; box-shadow:var(--accent-glow); }
.login-err { color:var(--err); font-size:13px; background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:10px 14px; display:flex; align-items:center; gap:6px; }
[data-theme="dark"] .login-err { background:#3b1515; border-color:#7f1d1d; }
.demo-note { font-size:12px; color:var(--text3); text-align:center; border-top:1px solid var(--border); padding-top:16px; line-height:1.9; }

/* ── Stepper ── */
.stepper { display:flex; align-items:flex-start; margin-bottom:28px; position:relative; }
.stepper::before { content:''; position:absolute; top:17px; left:calc(10% + 17px); right:calc(10% + 17px); height:2px; background:var(--border); z-index:0; }
.step-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:5px; position:relative; z-index:1; }
.step-dot { width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; border:2.5px solid; transition:all var(--tr); }
.step-dot.done   { background:var(--ok);     border-color:var(--ok);     color:#fff; }
.step-dot.active { background:var(--accent); border-color:var(--accent); color:#fff; box-shadow:0 0 0 4px rgba(14,124,134,0.18); }
.step-dot.todo   { background:var(--bg2); border-color:var(--border); color:var(--text3); }
.step-lbl { font-size:11.5px; font-weight:600; color:var(--text3); text-align:center; letter-spacing:.03em; }
.step-lbl.al { color:var(--accent); }
.step-lbl.dl { color:var(--ok); }
.prog-bar  { height:3px; background:var(--bg3); border-radius:99px; margin-bottom:26px; overflow:hidden; }
.prog-fill { height:100%; background:var(--accent); border-radius:99px; transition:width .4s cubic-bezier(.4,0,.2,1); }

/* ── Step animation ── */
.step-anim { animation:stepIn .24s ease both; }
@keyframes stepIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

/* ── Success ── */
.success-screen { display:flex; flex-direction:column; align-items:center; gap:20px; padding:60px 20px; text-align:center; animation:stepIn .4s ease both; }
.success-tick { width:78px; height:78px; border-radius:50%; background:rgba(5,150,105,.1); border:3px solid var(--ok); display:flex; align-items:center; justify-content:center; font-size:34px; animation:tickPop .5s cubic-bezier(.34,1.56,.64,1) both; }
@keyframes tickPop { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
.confetti-wrap { position:fixed; inset:0; pointer-events:none; overflow:hidden; z-index:999; }
.confetti-piece { position:absolute; top:-16px; animation:cfFall linear forwards; }
@keyframes cfFall { to{transform:translateY(110vh) rotate(720deg);opacity:0} }

/* ── Detail view ── */
.detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px 24px; }
@media(max-width:540px){ .detail-grid { grid-template-columns:1fr; } }
.detail-row  { display:flex; flex-direction:column; gap:2px; }
.detail-lbl  { font-size:11.5px; font-weight:600; color:var(--text3); letter-spacing:.05em; text-transform:uppercase; }
.detail-val  { font-size:14px; color:var(--text); font-weight:500; }
.info-note   { background:var(--accent-dim); border:1px solid rgba(14,124,134,.2); color:var(--accent); padding:12px 16px; border-radius:var(--r-sm); font-size:13px; display:flex; align-items:flex-start; gap:8px; line-height:1.6; }

/* ── Dashboard stat cards ── */
.stat-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(170px,1fr)); gap:16px; margin-bottom:28px; }
.stat-card { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--r); padding:20px; box-shadow:var(--sh); display:flex; flex-direction:column; gap:6px; }
.stat-num  { font-size:30px; font-weight:800; color:var(--accent); line-height:1; }
.stat-lbl  { font-size:12.5px; color:var(--text2); font-weight:600; }
.stat-sub  { font-size:11.5px; color:var(--text3); }

/* ── Chart-like bars (dept breakdown) ── */
.bar-list { display:flex; flex-direction:column; gap:12px; }
.bar-item { display:flex; flex-direction:column; gap:5px; }
.bar-meta { display:flex; justify-content:space-between; font-size:13px; font-weight:600; color:var(--text); }
.bar-track { height:8px; background:var(--bg3); border-radius:99px; overflow:hidden; }
.bar-fill  { height:100%; background:var(--accent); border-radius:99px; transition:width .6s cubic-bezier(.4,0,.2,1); }

/* ── Recent activity ── */
.activity-list { display:flex; flex-direction:column; }
.activity-item { display:flex; align-items:center; gap:14px; padding:13px 0; border-bottom:1px solid var(--border); }
.activity-item:last-child { border-bottom:none; }
.act-dot { width:8px; height:8px; border-radius:50%; background:var(--accent); flex-shrink:0; }
.act-text { font-size:13.5px; color:var(--text); flex:1; }
.act-time { font-size:12px; color:var(--text3); white-space:nowrap; }

/* ── Roster table ── */
.toolbar { display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:18px; }
.search-wrap { position:relative; flex:1; min-width:200px; }
.search-wrap .ico { position:absolute; left:11px; top:50%; transform:translateY(-50%); color:var(--text3); pointer-events:none; }
.search-inp {
  padding:9px 12px 9px 36px; background:var(--bg2); border:1.5px solid var(--border);
  border-radius:var(--r-sm); color:var(--text); font-family:var(--font); font-size:14px;
  width:100%; outline:none; transition:border-color var(--tr),box-shadow var(--tr);
}
.search-inp:focus { border-color:var(--accent); box-shadow:var(--accent-glow); }
.search-inp::placeholder { color:var(--text3); }
.filter-sel {
  background:var(--bg2); border:1.5px solid var(--border); border-radius:var(--r-sm);
  color:var(--text); font-family:var(--font); font-size:13.5px; padding:9px 30px 9px 12px;
  outline:none; cursor:pointer; appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath fill='%239ca3af' d='M0 0l6 8 6-8z'/%3E%3C/svg%3E");
  background-repeat:no-repeat; background-position:right 10px center;
  transition:border-color var(--tr);
}
.filter-sel:focus { border-color:var(--accent); }
.table-wrap { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--r-lg); overflow:hidden; box-shadow:var(--sh); }
table { width:100%; border-collapse:collapse; }
thead tr { background:var(--bg3); border-bottom:1.5px solid var(--border); }
thead th { padding:11px 16px; font-size:11.5px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:var(--text2); text-align:left; white-space:nowrap; cursor:pointer; user-select:none; }
thead th:hover { color:var(--accent); }
tbody tr { border-bottom:1px solid var(--border); transition:background var(--tr); }
tbody tr:last-child { border-bottom:none; }
tbody tr:hover { background:var(--bg3); }
td { padding:12px 16px; font-size:13.5px; color:var(--text); vertical-align:middle; }
.td-name { font-weight:600; }
.td-sub  { font-size:11.5px; color:var(--text3); margin-top:1px; }
.td-id   { font-size:12px; color:var(--text3); font-weight:600; letter-spacing:.04em; font-variant-numeric:tabular-nums; }
.td-dept { font-size:12.5px; color:var(--accent); font-weight:600; }
.td-acts { display:flex; gap:5px; align-items:center; flex-wrap:wrap; }
.empty-state { padding:48px; text-align:center; color:var(--text3); font-size:14px; }
.pill { display:inline-flex; align-items:center; gap:4px; font-size:11.5px; font-weight:700; padding:3px 10px; border-radius:99px; letter-spacing:.03em; white-space:nowrap; }
.pill-ok  { background:rgba(5,150,105,.1);  color:var(--ok);  border:1px solid rgba(5,150,105,.25); }
.pill-err { background:rgba(220,38,38,.08); color:var(--err); border:1px solid rgba(220,38,38,.2); }
.pill-warn{ background:rgba(217,119,6,.08); color:var(--warn);border:1px solid rgba(217,119,6,.2); }
.badge { display:inline-flex; align-items:center; gap:4px; font-size:11.5px; font-weight:700; padding:3px 10px; border-radius:99px; background:var(--accent-dim); color:var(--accent); border:1px solid rgba(14,124,134,.3); }

/* ── Progress tab ── */
.sem-row { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:24px; }
.sem-box {
  display:flex; flex-direction:column; align-items:center; gap:5px;
  width:70px; padding:12px 8px; border-radius:var(--r-sm);
  border:1.5px solid var(--border); background:var(--surface);
  font-size:12px; font-weight:600; color:var(--text2);
  box-shadow:var(--sh); transition:all var(--tr);
}
.sem-box.done    { border-color:var(--ok);     background:rgba(5,150,105,.07);  color:var(--ok); }
.sem-box.current { border-color:var(--accent); background:var(--accent-dim); color:var(--accent); box-shadow:0 0 0 3px rgba(14,124,134,.15); }
.sem-num { font-size:20px; font-weight:800; }
.sem-label { font-size:10.5px; letter-spacing:.05em; text-transform:uppercase; }

/* ── Reports ── */
.report-opts { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:16px; margin-bottom:28px; }
.report-opt {
  background:var(--surface); border:1.5px solid var(--border); border-radius:var(--r);
  padding:22px 20px; cursor:pointer; display:flex; flex-direction:column; gap:10px;
  box-shadow:var(--sh); transition:all var(--tr);
}
.report-opt:hover { border-color:var(--accent); box-shadow:var(--sh-md); transform:translateY(-1px); }
.report-opt:focus-visible { outline:none; box-shadow:var(--accent-glow); border-color:var(--accent); }
.report-icon { font-size:28px; }
.report-title{ font-size:14.5px; font-weight:700; color:var(--text); }
.report-desc { font-size:12.5px; color:var(--text2); line-height:1.5; }

/* ── Help / Contact ── */
.help-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:16px; }
.help-card { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--r); padding:22px; box-shadow:var(--sh); display:flex; flex-direction:column; gap:8px; }
.help-icon { font-size:26px; }
.help-title{ font-size:14.5px; font-weight:700; color:var(--text); }
.help-body { font-size:13px; color:var(--text2); line-height:1.6; }
.help-link { color:var(--accent); font-weight:600; text-decoration:none; }
.help-link:hover { text-decoration:underline; }
.faq-list  { display:flex; flex-direction:column; gap:12px; }
.faq-item  { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--r-sm); overflow:hidden; }
.faq-q     { padding:14px 16px; font-size:14px; font-weight:600; color:var(--text); cursor:pointer; display:flex; justify-content:space-between; align-items:center; }
.faq-q:hover { color:var(--accent); }
.faq-a     { padding:0 16px 14px; font-size:13.5px; color:var(--text2); line-height:1.6; }

/* ── Guardian box ── */
.guardian-box { background:var(--accent-dim); border:1px solid rgba(14,124,134,.2); border-radius:var(--r-sm); padding:16px; display:flex; flex-direction:column; gap:14px; }
.guardian-h   { font-weight:700; color:var(--accent); font-size:14px; }

/* ── Modal ── */
.overlay { position:fixed; inset:0; background:rgba(0,0,0,.42); z-index:300; display:flex; align-items:center; justify-content:center; padding:20px; animation:fadeO .18s ease; }
@keyframes fadeO { from{opacity:0} to{opacity:1} }
.modal { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--r-lg); padding:30px; max-width:420px; width:100%; box-shadow:var(--sh-md); animation:mPop .22s cubic-bezier(.34,1.56,.64,1); }
@keyframes mPop { from{transform:scale(.92);opacity:0} to{transform:scale(1);opacity:1} }
.modal-h { font-size:17px; font-weight:700; margin-bottom:10px; }
.modal-b { font-size:14px; color:var(--text2); margin-bottom:22px; line-height:1.6; }

/* ── Print report ── */
@media print {
  .topbar,.tab-bar,.no-print { display:none!important; }
  .page { padding:0!important; max-width:100%!important; }
  .card,.table-wrap { box-shadow:none!important; border:1px solid #ccc!important; }
}

/* ── Utils ── */
.row  { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.col  { display:flex; flex-direction:column; gap:8px; }
.div  { height:1px; background:var(--border); margin:4px 0; }
.mt4  { margin-top:16px; }
.mt6  { margin-top:24px; }
.mb4  { margin-bottom:16px; }
.mb6  { margin-bottom:24px; }
@media(max-width:480px){ .topbar{padding:0 14px;} .page{padding:20px 14px 60px;} .login-box{padding:32px 18px 28px;} .card{padding:18px 14px;} }
`

// ═══════════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════════
const DEPTS = ['Computer Science','Electronics & Communication','Mechanical Engineering','Civil Engineering','Business Administration','Mathematics & Statistics']

const PROG_MAP = {
  'Computer Science':            ['B.Tech CSE','B.Tech AI & ML','B.Tech Data Science','M.Tech CSE','MCA','Ph.D Computer Science'],
  'Electronics & Communication': ['B.Tech ECE','B.Tech VLSI','M.Tech ECE','M.Tech Signal Processing'],
  'Mechanical Engineering':      ['B.Tech Mechanical','B.Tech Automobile','M.Tech Thermal','M.Tech Manufacturing'],
  'Civil Engineering':           ['B.Tech Civil','B.Tech Environmental','M.Tech Structural'],
  'Business Administration':     ['BBA','MBA','B.Com','M.Com','Ph.D Management'],
  'Mathematics & Statistics':    ['B.Sc Mathematics','B.Sc Statistics','M.Sc Mathematics','M.Sc Statistics','Ph.D Mathematics'],
}

const COUNTRIES = {
  IN:{ label:'India',          phone:'+91', postal:/^\d{6}$/,              hint:'6-digit PIN code' },
  US:{ label:'United States',  phone:'+1',  postal:/^\d{5}$/,              hint:'5-digit ZIP code' },
  GB:{ label:'United Kingdom', phone:'+44', postal:/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i, hint:'UK postcode' },
  AU:{ label:'Australia',      phone:'+61', postal:/^\d{4}$/,              hint:'4-digit postcode' },
}

const STATES = {
  IN:['Andhra Pradesh','Bihar','Delhi','Goa','Gujarat','Haryana','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','West Bengal'],
  US:['Alabama','California','Florida','Georgia','Illinois','New York','Ohio','Texas','Washington'],
  GB:['England','Northern Ireland','Scotland','Wales'],
  AU:['New South Wales','Queensland','South Australia','Tasmania','Victoria','Western Australia'],
}

const DISTRICTS = {
  IN:{ 'Karnataka':['Bangalore Urban','Bangalore Rural','Mysuru','Mangaluru','Hubli-Dharwad'],'Maharashtra':['Mumbai','Pune','Nagpur','Nashik','Aurangabad'],'Tamil Nadu':['Chennai','Coimbatore','Madurai','Salem','Tiruchirappalli'],'Uttar Pradesh':['Lucknow','Agra','Kanpur','Varanasi','Prayagraj'],'Delhi':['Central Delhi','East Delhi','New Delhi','North Delhi','South Delhi'] },
  US:{ 'California':['Los Angeles','San Francisco','San Diego','Sacramento'],'New York':['New York City','Buffalo','Rochester','Albany'],'Texas':['Houston','Dallas','Austin','San Antonio'] },
  GB:{ 'England':['London','Manchester','Birmingham','Leeds','Liverpool'],'Scotland':['Edinburgh','Glasgow','Aberdeen','Dundee'] },
  AU:{ 'Victoria':['Melbourne','Geelong','Ballarat','Bendigo'],'New South Wales':['Sydney','Newcastle','Wollongong','Central Coast'] },
}

const SEMS   = ['1st','2nd','3rd','4th','5th','6th','7th','8th']
const PIN    = '1234'

const SEED = [
  { id:'STU1001',firstName:'Arjun',lastName:'Sharma',dob:'2004-03-15',gender:'Male',phone:'9876543210',email:'arjun@edureg.edu',country:'IN',state:'Karnataka',district:'Bangalore Urban',address:'12 MG Road, Bengaluru',postalCode:'560001',department:'Computer Science',programme:'B.Tech CSE',currentSemester:5,enrollYear:2022,expiryYear:2026,guardian:null,status:'Active',registeredAt:'2024-07-01T09:30:00Z' },
  { id:'STU1002',firstName:'Priya',lastName:'Patel',dob:'2005-07-22',gender:'Female',phone:'9123456789',email:'priya@edureg.edu',country:'IN',state:'Maharashtra',district:'Pune',address:'34 FC Road, Pune',postalCode:'411004',department:'Business Administration',programme:'MBA',currentSemester:3,enrollYear:2023,expiryYear:2027,guardian:null,status:'Active',registeredAt:'2024-07-02T10:15:00Z' },
  { id:'STU1003',firstName:'Rahul',lastName:'Verma',dob:'2003-11-08',gender:'Male',phone:'7000012345',email:'rahul@edureg.edu',country:'IN',state:'Uttar Pradesh',district:'Lucknow',address:'5 Sector 15, Noida',postalCode:'201301',department:'Electronics & Communication',programme:'B.Tech ECE',currentSemester:7,enrollYear:2021,expiryYear:2025,guardian:null,status:'Active',registeredAt:'2024-07-03T08:00:00Z' },
]

// ─── Helpers ──────────────────────────────────────────────────
function ls(k,f){ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):f }catch{ return f } }
function lsSet(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)) }catch{} }
function age(dob){ if(!dob)return null; const b=new Date(dob),t=new Date(); let a=t.getFullYear()-b.getFullYear(); if(t.getMonth()<b.getMonth()||(t.getMonth()===b.getMonth()&&t.getDate()<b.getDate()))a--; return a }
function nextId(list){ const max=list.reduce((m,s)=>{ const n=parseInt((s.id||'').replace(/\D/g,''),10); return isNaN(n)?m:Math.max(m,n) },1000); const ex=new Set(list.map(s=>s.id)); let c,seq=max+1; do{ c=`STU${seq++}` }while(ex.has(c)); return c }
function expired(s){ return s.expiryYear&&parseInt(s.expiryYear,10)<new Date().getFullYear() }
function timeAgo(iso){ if(!iso)return ''; const d=Math.floor((Date.now()-new Date(iso))/86400000); return d===0?'today':d===1?'yesterday':`${d} days ago` }

// ═══════════════════════════════════════════════════════════
//  CONFETTI
// ═══════════════════════════════════════════════════════════
function Confetti(){
  const p=Array.from({length:50},(_,i)=>({ id:i,left:Math.random()*100,delay:Math.random()*1.1,dur:2.2+Math.random()*1.8,size:7+Math.random()*7,color:['#0E7C86','#6366f1','#f59e0b','#ec4899','#22c55e','#f97316'][i%6],circ:Math.random()>.5 }))
  return <div className="confetti-wrap" aria-hidden>{p.map(x=><div key={x.id} className="confetti-piece" style={{left:`${x.left}%`,width:x.size,height:x.size,background:x.color,borderRadius:x.circ?'50%':'2px',animationDelay:`${x.delay}s`,animationDuration:`${x.dur}s`}}/>)}</div>
}

// ═══════════════════════════════════════════════════════════
//  WIZARD (4-step registration form)
// ═══════════════════════════════════════════════════════════
const STEP_LABELS = ['About You','Address','Course','Review']
const BLANK = { firstName:'',lastName:'',dob:'',gender:'',phone:'',email:'',country:'IN',state:'',district:'',address:'',postalCode:'',department:DEPTS[0],programme:PROG_MAP[DEPTS[0]][0],currentSemester:1,enrollYear:new Date().getFullYear(),expiryYear:new Date().getFullYear()+4,status:'Active',guardian:{name:'',phone:'',relation:''} }

function Wizard({ students, onSuccess, onCancel, editData }) {
  const isEdit = !!editData
  const [step,setStep] = useState(0)
  const [form,setForm] = useState(isEdit ? {...editData} : {...BLANK, id: nextId(students)})
  const [touched,setTouched] = useState({})
  const [done,setDone] = useState(false)

  const studentAge = age(form.dob)
  const needGuardian = studentAge !== null && studentAge < 18

  const touch  = f => setTouched(p=>({...p,[f]:true}))
  const touchM = fs => setTouched(p=>{ const n={...p}; fs.forEach(f=>n[f]=true); return n })

  const set = (f,v) => setForm(p=>{
    const n={...p,[f]:v}
    if(f==='country'){ n.state=''; n.district='' }
    if(f==='state')  { n.district='' }
    if(f==='department'){ n.programme=PROG_MAP[v]?.[0]||'' }
    return n
  })

  const V = {
    firstName: v=>v.trim().length>=2?'':'At least 2 characters',
    lastName:  v=>v.trim().length>=2?'':'At least 2 characters',
    dob:       v=>v?'':'Date of birth is required',
    gender:    v=>v?'':'Please select a gender',
    email:     v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?'':'Enter a valid email address',
    phone:     v=>/^\d{7,15}$/.test(v.replace(/\s/g,''))?'':'Enter a valid phone number',
    country:   v=>v?'':'Please select a country',
    state:     v=>v?'':'Please select a state / region',
    address:   v=>v.trim().length>=5?'':'Enter your full address',
    postalCode:v=>{ const r=COUNTRIES[form.country]?.postal; return !r||r.test(v)?'':(COUNTRIES[form.country]?.hint||'Invalid postal code') },
    department:v=>v?'':'Please select a department',
    programme: v=>v?'':'Please select a programme',
  }

  const STEP_FIELDS = [
    ['firstName','lastName','dob','gender','email','phone'],
    ['country','state','address','postalCode'],
    ['department','programme'],
    [],
  ]

  const ferr = f=>{ if(!touched[f])return ''; return V[f]?V[f](form[f]??''):'' }
  const allOk = fs=>fs.every(f=>!V[f]||!V[f](form[f]??''))

  function goNext(){ const fs=STEP_FIELDS[step]; touchM(fs); if(!allOk(fs))return; setStep(s=>s+1); window.scrollTo({top:0,behavior:'smooth'}) }
  function goBack(){ setStep(s=>s-1); window.scrollTo({top:0,behavior:'smooth'}) }
  function submit(){
    const all=STEP_FIELDS.flat(); touchM(all)
    if(!allOk(all)){ setStep(0); return }
    onSuccess({...form, registeredAt: isEdit ? form.registeredAt : new Date().toISOString()})
    setDone(true)
  }

  // Shared input helpers
  function FI({ label, field, type='text', placeholder='', required=true, hint='' }){
    const e=ferr(field), v=form[field]??'', ok=touched[field]&&!e&&v
    return (
      <div className="field">
        <label className="lbl" htmlFor={`f-${field}`}>{label}{required&&<span style={{color:'var(--err)'}}> *</span>}{ok&&<span className="vtick"> ✓</span>}</label>
        <input id={`f-${field}`} type={type} className={`inp${e?' bad':ok?' ok':''}`} value={v} placeholder={placeholder} onChange={ev=>{set(field,ev.target.value);touch(field)}} onBlur={()=>touch(field)} />
        {hint&&!e&&<span className="fhint">{hint}</span>}
        {e&&<span className="ferr">⚠ {e}</span>}
      </div>
    )
  }

  function FSel({ label, field, options, placeholder='Select…', required=true }){
    const e=ferr(field), v=form[field]??'', ok=touched[field]&&!e&&v
    return (
      <div className="field">
        <label className="lbl" htmlFor={`f-${field}`}>{label}{required&&<span style={{color:'var(--err)'}}> *</span>}{ok&&<span className="vtick"> ✓</span>}</label>
        <div className="sel-wrap">
          <select id={`f-${field}`} className={`sel${e?' bad':ok?' ok':''}`} value={v} onChange={ev=>{set(field,ev.target.value);touch(field)}} onBlur={()=>touch(field)}>
            {!v&&<option value="">{placeholder}</option>}
            {options.map(o=>{ const val=o.v??o,lbl=o.l??o; return <option key={val} value={val}>{lbl}</option> })}
          </select>
        </div>
        {e&&<span className="ferr">⚠ {e}</span>}
      </div>
    )
  }

  const cOpts = Object.entries(COUNTRIES).map(([v,{label}])=>({v,l:label}))
  const sOpts = STATES[form.country]||[]
  const dOpts = DISTRICTS[form.country]?.[form.state]||[]
  const phonePfx = COUNTRIES[form.country]?.phone||''
  const postalHint= COUNTRIES[form.country]?.hint||''

  if(done) return (
    <>
      <Confetti/>
      <div className="success-screen">
        <div className="success-tick">✓</div>
        <h2 style={{fontSize:24,fontWeight:800}}>{isEdit?'Record Updated!':'Enrolment Complete!'}</h2>
        <p style={{color:'var(--text2)',maxWidth:360}}>{form.firstName}&#8217;s record has been {isEdit?'updated':'created'} successfully. ID: <strong>{form.id}</strong></p>
        <button className="btn btn-primary btn-lg" onClick={onCancel}>Back to Roster</button>
      </div>
    </>
  )

  const pct = (step/(STEP_LABELS.length-1))*100

  return (
    <div>
      {/* Stepper */}
      <div className="stepper">
        {STEP_LABELS.map((lbl,i)=>(
          <div className="step-item" key={lbl}>
            <div className={`step-dot ${i<step?'done':i===step?'active':'todo'}`}>{i<step?'✓':i+1}</div>
            <span className={`step-lbl ${i===step?'al':i<step?'dl':''}`}>{lbl}</span>
          </div>
        ))}
      </div>
      <div className="prog-bar mb6"><div className="prog-fill" style={{width:`${pct}%`}}/></div>

      {/* Step 0: About You */}
      {step===0&&<div key={0} className="step-anim card form-gap">
        <div className="section-h">Personal Information</div>
        <div className="grid-2"><FI label="First Name" field="firstName" placeholder="e.g. Arjun"/><FI label="Last Name" field="lastName" placeholder="e.g. Sharma"/></div>
        <div className="grid-2"><FI label="Date of Birth" field="dob" type="date"/><FSel label="Gender" field="gender" options={['Male','Female','Non-binary','Prefer not to say']} placeholder="Select gender…"/></div>
        <div className="grid-2"><FI label="Email Address" field="email" type="email" placeholder="student@edureg.edu"/><FI label={`Phone${phonePfx?` (${phonePfx})`:''}`} field="phone" type="tel" placeholder="e.g. 9876543210"/></div>
        {needGuardian&&(
          <div className="guardian-box">
            <div className="guardian-h">🛡 Guardian Information <span style={{color:'var(--text2)',fontWeight:500,fontSize:12}}>(required — student is under 18)</span></div>
            <div className="grid-2">
              <div className="field"><label className="lbl">Guardian Full Name</label><input className="inp" value={form.guardian?.name||''} placeholder="Full name" onChange={e=>set('guardian',{...form.guardian,name:e.target.value})}/></div>
              <div className="field"><label className="lbl">Relationship</label><div className="sel-wrap"><select className="sel" value={form.guardian?.relation||''} onChange={e=>set('guardian',{...form.guardian,relation:e.target.value})}><option value="">Select…</option>{['Father','Mother','Sibling','Guardian','Other'].map(r=><option key={r}>{r}</option>)}</select></div></div>
            </div>
            <div className="field"><label className="lbl">Guardian Phone</label><input className="inp" value={form.guardian?.phone||''} placeholder="Contact number" onChange={e=>set('guardian',{...form.guardian,phone:e.target.value})}/></div>
          </div>
        )}
      </div>}

      {/* Step 1: Address */}
      {step===1&&<div key={1} className="step-anim card form-gap">
        <div className="section-h">Address Details</div>
        <FSel label="Country" field="country" options={cOpts}/>
        <div className="grid-2">
          <FSel label="State / Region" field="state" options={sOpts} placeholder="Select state…"/>
          {dOpts.length>0?<FSel label="District / City" field="district" options={dOpts} placeholder="Select district…" required={false}/>:<FI label="City / District" field="district" placeholder="Enter city or district" required={false}/>}
        </div>
        <FI label="Street Address" field="address" placeholder="Flat No., Street, Area"/>
        <FI label={`Postal Code${postalHint?` — ${postalHint}`:''}`} field="postalCode" placeholder={postalHint}/>
      </div>}

      {/* Step 2: Course */}
      {step===2&&<div key={2} className="step-anim card form-gap">
        <div className="section-h">Academic Details</div>
        <FSel label="Department" field="department" options={DEPTS}/>
        <FSel label="Programme / Degree" field="programme" options={PROG_MAP[form.department]||[]}/>
        <div className="grid-2">
          <div className="field"><label className="lbl">Current Semester</label><div className="sel-wrap"><select className="sel" value={form.currentSemester} onChange={e=>set('currentSemester',parseInt(e.target.value,10))}>{SEMS.map((s,i)=><option key={i+1} value={i+1}>{s} Semester</option>)}</select></div></div>
          <div className="field"><label className="lbl">Status</label><div className="sel-wrap"><select className="sel" value={form.status} onChange={e=>set('status',e.target.value)}><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div></div>
        </div>
        <div className="grid-2">
          <div className="field"><label className="lbl">Enrolment Year</label><input className="inp" type="number" min="2000" max="2099" value={form.enrollYear} onChange={e=>set('enrollYear',e.target.value)}/></div>
          <div className="field"><label className="lbl">Card Expiry Year</label><input className="inp" type="number" min="2000" max="2099" value={form.expiryYear} onChange={e=>set('expiryYear',e.target.value)}/></div>
        </div>
      </div>}

      {/* Step 3: Review */}
      {step===3&&<div key={3} className="step-anim card form-gap">
        <div className="section-h">Review &amp; Confirm</div>
        {[
          {title:'Personal', goTo:0, rows:[['Full Name',`${form.firstName} ${form.lastName}`],['Date of Birth',form.dob],['Gender',form.gender],['Email',form.email],['Phone',form.phone]]},
          {title:'Address',  goTo:1, rows:[['Country',COUNTRIES[form.country]?.label||form.country],['State',form.state],['District',form.district||'—'],['Street Address',form.address],['Postal Code',form.postalCode]]},
          {title:'Academic', goTo:2, rows:[['Department',form.department],['Programme',form.programme],['Semester',SEMS[form.currentSemester-1]+' Semester'],['Status',form.status],['Enrolment Year',form.enrollYear],['Expiry Year',form.expiryYear]]},
        ].map(sec=>(
          <div key={sec.title} style={{marginBottom:16}}>
            <div className="row mb4">
              <span style={{fontWeight:700,fontSize:12.5,color:'var(--text2)',textTransform:'uppercase',letterSpacing:'.05em'}}>{sec.title}</span>
              <div className="spacer"/><button className="btn btn-ghost btn-sm" onClick={()=>setStep(sec.goTo)}>✎ Edit</button>
            </div>
            <div className="detail-grid">
              {sec.rows.map(([l,v])=><div className="detail-row" key={l}><span className="detail-lbl">{l}</span><span className="detail-val">{v||<span style={{color:'var(--text3)'}}>—</span>}</span></div>)}
            </div>
            <div className="div" style={{marginTop:14}}/>
          </div>
        ))}
        {needGuardian&&form.guardian?.name&&(
          <div>
            <div style={{fontWeight:700,fontSize:12.5,color:'var(--text2)',textTransform:'uppercase',letterSpacing:'.05em',marginBottom:10}}>Guardian</div>
            <div className="detail-grid">
              {[['Name',form.guardian.name],['Relation',form.guardian.relation],['Phone',form.guardian.phone]].map(([l,v])=><div className="detail-row" key={l}><span className="detail-lbl">{l}</span><span className="detail-val">{v||'—'}</span></div>)}
            </div>
          </div>
        )}
      </div>}

      {/* Nav */}
      <div className="row mt6">
        <button className="btn btn-secondary" onClick={step===0?onCancel:goBack}>{step===0?'✕ Cancel':'← Back'}</button>
        <div className="spacer"/>
        {step<3?<button className="btn btn-primary" onClick={goNext}>Next →</button>:<button className="btn btn-primary btn-lg" onClick={submit}>{isEdit?'💾 Save Changes':'🎓 Submit Enrolment'}</button>}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
//  STAFF TABS
// ═══════════════════════════════════════════════════════════
function StaffDashboard({ students }) {
  const total    = students.length
  const active   = students.filter(s => !expired(s) && s.status === 'Active').length
  const expiredN = students.filter(s => expired(s)).length
  const deptCount= DEPTS.reduce((acc, d) => { acc[d] = students.filter(s => s.department === d).length; return acc }, {})
  const maxDept  = Math.max(...Object.values(deptCount), 1)
  const recent   = [...students].sort((a,b)=>new Date(b.registeredAt||0)-new Date(a.registeredAt||0)).slice(0,5)

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-sub">Overview of your student registry.</p>

      {/* Stat cards */}
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-num">{total}</div><div className="stat-lbl">Total Students</div><div className="stat-sub">All registered</div></div>
        <div className="stat-card"><div className="stat-num" style={{color:'var(--ok)'}}>{active}</div><div className="stat-lbl">Active</div><div className="stat-sub">Valid enrolment</div></div>
        <div className="stat-card"><div className="stat-num" style={{color:'var(--err)'}}>{expiredN}</div><div className="stat-lbl">Expired</div><div className="stat-sub">Past expiry year</div></div>
        <div className="stat-card"><div className="stat-num" style={{color:'var(--warn)'}}>{DEPTS.length}</div><div className="stat-lbl">Departments</div><div className="stat-sub">Active faculties</div></div>
      </div>

      <div className="row" style={{alignItems:'flex-start',gap:24,flexWrap:'wrap'}}>
        {/* Dept breakdown */}
        <div className="card" style={{flex:'1 1 300px'}}>
          <div className="section-h" style={{fontSize:15}}>Students by Department</div>
          <div className="bar-list">
            {DEPTS.map(d=>(
              <div className="bar-item" key={d}>
                <div className="bar-meta"><span style={{fontSize:12.5}}>{d}</span><span style={{fontSize:12,color:'var(--text3)'}}>{deptCount[d]||0}</span></div>
                <div className="bar-track"><div className="bar-fill" style={{width:`${((deptCount[d]||0)/maxDept)*100}%`}}/></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent registrations */}
        <div className="card" style={{flex:'1 1 280px'}}>
          <div className="section-h" style={{fontSize:15}}>Recent Registrations</div>
          {recent.length===0
            ? <div style={{color:'var(--text3)',fontSize:13}}>No students yet.</div>
            : <div className="activity-list">
                {recent.map(s=>(
                  <div className="activity-item" key={s.id}>
                    <div className="act-dot"/>
                    <div className="act-text"><strong>{s.firstName} {s.lastName}</strong><br/><span style={{fontSize:12,color:'var(--text3)'}}>{s.id} · {s.department}</span></div>
                    <div className="act-time">{timeAgo(s.registeredAt)}</div>
                  </div>
                ))}
              </div>
          }
        </div>
      </div>
    </div>
  )
}

function StaffRoster({ students, onEdit, onDelete, onPunch }) {
  const [search,setSearch]   = useState('')
  const [deptF,setDeptF]     = useState('ALL')
  const [statusF,setStatusF] = useState('ALL')
  const [sortF,setSortF]     = useState('firstName')
  const [sortAsc,setSortAsc] = useState(true)
  const [delTarget,setDelTarget] = useState(null)

  const filtered = students
    .filter(s=>{
      const q=search.toLowerCase()
      const matchQ=!q||`${s.firstName} ${s.lastName} ${s.id} ${s.department} ${s.email}`.toLowerCase().includes(q)
      const matchD=deptF==='ALL'||s.department===deptF
      const matchS=statusF==='ALL'||(statusF==='Active'&&!expired(s)&&s.status==='Active')||(statusF==='Expired'&&expired(s))
      return matchQ&&matchD&&matchS
    })
    .sort((a,b)=>{
      let va=a[sortF]??'', vb=b[sortF]??''
      if(typeof va==='string') va=va.toLowerCase()
      if(typeof vb==='string') vb=vb.toLowerCase()
      return sortAsc?(va>vb?1:va<vb?-1:0):(va<vb?1:va>vb?-1:0)
    })

  function toggleSort(f){ if(sortF===f) setSortAsc(a=>!a); else{ setSortF(f); setSortAsc(true) } }
  function arrow(f){ return sortF===f?(sortAsc?' ↑':' ↓'):'' }

  return (
    <div>
      {delTarget&&(
        <div className="overlay" onClick={()=>setDelTarget(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-h">Delete Student Record?</div>
            <div className="modal-b">Permanently remove <strong>{delTarget.firstName} {delTarget.lastName}</strong> ({delTarget.id})? This cannot be undone.</div>
            <div className="row"><button className="btn btn-secondary" onClick={()=>setDelTarget(null)}>Cancel</button><div className="spacer"/><button className="btn btn-danger" onClick={()=>{onDelete(delTarget.id);setDelTarget(null)}}>🗑 Delete</button></div>
          </div>
        </div>
      )}

      <h1 className="page-title">Student Roster</h1>
      <p className="page-sub">All registered students with search, filter, and sort.</p>

      <div className="toolbar">
        <div className="search-wrap">
          <span className="ico">🔍</span>
          <input type="search" className="search-inp" placeholder="Search name, ID, email, department…" value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <select className="filter-sel" value={deptF} onChange={e=>setDeptF(e.target.value)}>
          <option value="ALL">All Departments</option>
          {DEPTS.map(d=><option key={d} value={d}>{d}</option>)}
        </select>
        <select className="filter-sel" value={statusF} onChange={e=>setStatusF(e.target.value)}>
          <option value="ALL">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
        </select>
        <span className="badge">{filtered.length} student{filtered.length!==1?'s':''}</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th onClick={()=>toggleSort('firstName')}>Name{arrow('firstName')}</th>
              <th onClick={()=>toggleSort('id')}>ID{arrow('id')}</th>
              <th onClick={()=>toggleSort('department')}>Department{arrow('department')}</th>
              <th>Programme</th>
              <th onClick={()=>toggleSort('currentSemester')}>Sem{arrow('currentSemester')}</th>
              <th onClick={()=>toggleSort('expiryYear')}>Expires{arrow('expiryYear')}</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length===0
              ? <tr><td colSpan={8} className="empty-state">{search||deptF!=='ALL'||statusF!=='ALL'?'No students match your filters.':'No students registered yet.'}</td></tr>
              : filtered.map(s=>(
                <tr key={s.id}>
                  <td><div className="td-name">{s.firstName} {s.lastName}</div><div className="td-sub">{s.email}</div></td>
                  <td><span className="td-id">{s.id}</span></td>
                  <td><span className="td-dept">{s.department}</span></td>
                  <td style={{fontSize:13}}>{s.programme}</td>
                  <td style={{fontSize:13,textAlign:'center'}}>{SEMS[(s.currentSemester||1)-1]}</td>
                  <td style={{fontSize:13,textAlign:'center'}}>{s.expiryYear}</td>
                  <td><span className={`pill ${expired(s)?'pill-err':'pill-ok'}`}>{expired(s)?'✕ Expired':'✓ Active'}</span></td>
                  <td>
                    <div className="td-acts">
                      <button className="btn btn-sm btn-secondary" onClick={()=>onEdit(s)}>✎ Edit</button>
                      <button className="btn btn-sm" style={{background:'var(--accent-dim)',color:'var(--accent)',border:'1.5px solid rgba(14,124,134,.3)'}} onClick={()=>onPunch(s)} disabled={(s.currentSemester||1)>=8} title="Advance semester">🎫 Punch</button>
                      <button className="btn btn-sm btn-danger" onClick={()=>setDelTarget(s)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StaffReports({ students }) {
  const [generated,setGenerated] = useState(null)

  const reports = [
    { id:'full',   icon:'📋', title:'Full Student Registry', desc:'All students with complete details — name, ID, department, programme, semester, status.' },
    { id:'active', icon:'✅', title:'Active Students Only',   desc:'Filtered list of currently active, non-expired enrolments.' },
    { id:'dept',   icon:'🏛', title:'Department Summary',    desc:'Aggregated count of students per department and programme.' },
    { id:'expiring',icon:'⚠', title:'Expiring Soon',        desc:'Students whose card expires this year or next year.' },
    { id:'sem',    icon:'📅', title:'Semester Distribution', desc:'How many students are in each semester across all departments.' },
  ]

  function generate(id) {
    let rows = []
    if (id==='full') rows = students.map(s=>[s.id,`${s.firstName} ${s.lastName}`,s.department,s.programme,`Sem ${s.currentSemester}`,s.expiryYear,expired(s)?'Expired':'Active'])
    if (id==='active') rows = students.filter(s=>!expired(s)&&s.status==='Active').map(s=>[s.id,`${s.firstName} ${s.lastName}`,s.department,s.programme,`Sem ${s.currentSemester}`])
    if (id==='dept') {
      rows = DEPTS.map(d=>{
        const ds = students.filter(s=>s.department===d)
        return [d, ds.length, ds.map(s=>s.programme).filter((v,i,a)=>a.indexOf(v)===i).join(', ')]
      })
    }
    if (id==='expiring') {
      const yr = new Date().getFullYear()
      rows = students.filter(s=>s.expiryYear&&parseInt(s.expiryYear,10)<=yr+1).map(s=>[s.id,`${s.firstName} ${s.lastName}`,s.department,s.expiryYear,parseInt(s.expiryYear,10)<yr?'Already Expired':'Expires This/Next Year'])
    }
    if (id==='sem') {
      rows = SEMS.map((s,i)=>{ const n=students.filter(x=>(x.currentSemester||1)===i+1).length; return [`${s} Semester`,n,`${total>0?Math.round(n/students.length*100):0}%`] })
    }
    const total = students.length
    setGenerated({ id, rows })
  }

  const headers = {
    full:    ['ID','Name','Department','Programme','Semester','Expires','Status'],
    active:  ['ID','Name','Department','Programme','Semester'],
    dept:    ['Department','Students','Programmes'],
    expiring:['ID','Name','Department','Expiry Year','Note'],
    sem:     ['Semester','Students','% of Total'],
  }

  return (
    <div>
      <h1 className="page-title">Reports &amp; Exports</h1>
      <p className="page-sub">Generate and print tabular reports from your student registry.</p>

      <div className="report-opts">
        {reports.map(r=>(
          <div key={r.id} className="report-opt" role="button" tabIndex={0} onClick={()=>generate(r.id)} onKeyDown={e=>(e.key==='Enter'||e.key===' ')&&generate(r.id)}>
            <div className="report-icon">{r.icon}</div>
            <div className="report-title">{r.title}</div>
            <div className="report-desc">{r.desc}</div>
          </div>
        ))}
      </div>

      {generated&&(
        <div className="card" style={{marginTop:0}}>
          <div className="row mb4">
            <div className="section-h" style={{marginBottom:0}}>{reports.find(r=>r.id===generated.id)?.title}</div>
            <div className="spacer"/>
            <button className="btn btn-primary btn-sm" onClick={()=>window.print()}>🖨 Print</button>
            <button className="btn btn-secondary btn-sm" onClick={()=>setGenerated(null)}>✕ Close</button>
          </div>
          <div style={{overflowX:'auto'}}>
            <table>
              <thead><tr>{headers[generated.id].map(h=><th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {generated.rows.length===0
                  ? <tr><td colSpan={10} className="empty-state">No data for this report.</td></tr>
                  : generated.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)
                }
              </tbody>
            </table>
          </div>
          <div style={{marginTop:12,fontSize:12,color:'var(--text3)'}}>Generated on {new Date().toLocaleString()} · {generated.rows.length} row{generated.rows.length!==1?'s':''}</div>
        </div>
      )}
    </div>
  )
}

function StaffView({ students, setStudents, onLogout }) {
  const [tab,setTab]       = useState('dashboard')
  const [wizard,setWizard] = useState(null) // null | 'new' | student-object for edit

  function save(data){
    setStudents(prev=>{
      const idx=prev.findIndex(s=>s.id===data.id)
      const next=idx>=0?prev.map(s=>s.id===data.id?data:s):[data,...prev]
      lsSet('edureg_students',next); return next
    })
  }
  function del(id){ setStudents(prev=>{ const n=prev.filter(s=>s.id!==id); lsSet('edureg_students',n); return n }) }
  function punch(s){ save({...s,currentSemester:Math.min((s.currentSemester||1)+1,8)}) }

  if(wizard){
    return (
      <div className="page page-sm">
        <div className="row mb6"><h1 className="page-title">{wizard==='new'?'New Student Registration':'Edit Student Record'}</h1><div className="spacer"/></div>
        <Wizard students={students} onSuccess={data=>{save(data)}} onCancel={()=>setWizard(null)} editData={wizard==='new'?null:wizard}/>
      </div>
    )
  }

  return (
    <div>
      <div className="tab-bar">
        {[
          {id:'dashboard',icon:'📊',label:'Dashboard'},
          {id:'roster',   icon:'👥',label:'Roster'},
          {id:'register', icon:'➕',label:'Register'},
          {id:'reports',  icon:'📋',label:'Reports'},
        ].map(t=>(
          <button key={t.id} className={`tab-btn${tab===t.id?' active':''}`} onClick={()=>{ if(t.id==='register'){setWizard('new');return} setTab(t.id) }}>
            <span className="tab-icon">{t.icon}</span>{t.label}
          </button>
        ))}
        <div className="spacer"/>
        <button className="tab-btn" style={{color:'var(--err)'}} onClick={onLogout}>Sign Out</button>
      </div>
      <div className="page">
        {tab==='dashboard'&&<StaffDashboard students={students}/>}
        {tab==='roster'&&<StaffRoster students={students} onEdit={s=>{setWizard(s)}} onDelete={del} onPunch={punch}/>}
        {tab==='reports'&&<StaffReports students={students}/>}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
//  STUDENT TABS
// ═══════════════════════════════════════════════════════════
function StudentProfile({ student }) {
  const sections = [
    { title:'Personal', rows:[['Full Name',`${student.firstName} ${student.lastName}`],['Student ID',student.id],['Date of Birth',student.dob],['Gender',student.gender],['Email',student.email],['Phone',student.phone]] },
    { title:'Address',  rows:[['Country',COUNTRIES[student.country]?.label||student.country],['State',student.state],['District',student.district||'—'],['Street Address',student.address],['Postal Code',student.postalCode]] },
    { title:'Academic', rows:[['Department',student.department],['Programme',student.programme],['Current Semester',SEMS[(student.currentSemester||1)-1]+' Semester'],['Enrolment Year',student.enrollYear],['Expiry Year',student.expiryYear],['Status',student.status||'Active']] },
  ]
  if(student.guardian?.name) sections.push({ title:'Guardian', rows:[['Name',student.guardian.name],['Relation',student.guardian.relation],['Phone',student.guardian.phone]] })

  return (
    <div>
      <div className="info-note mb6">
        <span style={{fontSize:20,flexShrink:0}}>ℹ</span>
        <div>To correct any details, contact the Registrar&#8217;s Office — Block A, Room 102 or email <strong>registrar@edureg.edu</strong>. Changes cannot be made from this portal.</div>
      </div>
      <div className="card form-gap">
        {sections.map((sec,si)=>(
          <div key={sec.title}>
            {si>0&&<div className="div"/>}
            <div className="section-h" style={{fontSize:15,marginBottom:14}}>{sec.title}</div>
            <div className="detail-grid">
              {sec.rows.map(([l,v])=>(
                <div className={`detail-row${l==='Street Address'?' span-2':''}`} key={l} style={l==='Street Address'?{gridColumn:'1/-1'}:{}}>
                  <span className="detail-lbl">{l}</span>
                  <span className="detail-val">{v||<span style={{color:'var(--text3)'}}>—</span>}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StudentProgress({ student }) {
  const sem = student.currentSemester || 1
  const totalSems = 8

  return (
    <div>
      <div className="card form-gap">
        <div className="section-h">Semester Progress</div>
        <div className="sem-row">
          {SEMS.map((s,i)=>{
            const n=i+1, done=n<sem, curr=n===sem
            return (
              <div key={n} className={`sem-box ${done?'done':curr?'current':''}`}>
                <div className="sem-num">{done?'✓':n}</div>
                <div className="sem-label">{s}</div>
                <div style={{fontSize:10,marginTop:2,color:done?'var(--ok)':curr?'var(--accent)':'var(--text3)'}}>{done?'Done':curr?'Current':'Upcoming'}</div>
              </div>
            )
          })}
        </div>

        <div className="div"/>

        <div className="section-h" style={{fontSize:15}}>Enrolment Summary</div>
        <div className="detail-grid">
          <div className="detail-row"><span className="detail-lbl">Programme</span><span className="detail-val">{student.programme}</span></div>
          <div className="detail-row"><span className="detail-lbl">Department</span><span className="detail-val">{student.department}</span></div>
          <div className="detail-row"><span className="detail-lbl">Enrolment Year</span><span className="detail-val">{student.enrollYear}</span></div>
          <div className="detail-row"><span className="detail-lbl">Card Expires</span><span className="detail-val">{student.expiryYear} {expired(student)&&<span className="pill pill-err" style={{fontSize:11,padding:'1px 7px',marginLeft:6}}>Expired</span>}</span></div>
          <div className="detail-row"><span className="detail-lbl">Completed Semesters</span><span className="detail-val">{sem-1} of {totalSems}</span></div>
          <div className="detail-row"><span className="detail-lbl">Remaining Semesters</span><span className="detail-val">{totalSems-sem+1}</span></div>
        </div>

        {/* Progress bar */}
        <div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:12.5,color:'var(--text2)',marginBottom:6}}>
            <span>Overall Completion</span>
            <strong>{Math.round(((sem-1)/totalSems)*100)}%</strong>
          </div>
          <div className="prog-bar" style={{height:8,marginBottom:0}}>
            <div className="prog-fill" style={{width:`${((sem-1)/totalSems)*100}%`,background:'var(--ok)'}}/>
          </div>
        </div>
      </div>
    </div>
  )
}

const FAQS = [
  {q:'How do I update my personal details?',   a:'Personal details can only be changed by the Registrar\'s Office. Visit Block A, Room 102 or email registrar@edureg.edu with supporting documents.'},
  {q:'How do I get a duplicate ID card?',       a:'Submit a lost-card application at the Registrar\'s Office with a police FIR (if stolen) or an affidavit. A replacement fee applies.'},
  {q:'What if my card has expired?',            a:'Card renewal is done through the Registrar. Bring your original card, fee receipt, and a passport photo.'},
  {q:'How do I apply for a semester freeze?',   a:'Download the Semester Freeze form from the academic office portal and submit it with a supporting medical or personal reason letter.'},
  {q:'Who do I contact for exam schedule issues?',a:'For examination-related queries, contact the Examinations Office in Block B, Room 210 or email exams@edureg.edu.'},
]

function StudentHelp() {
  const [openFaq,setOpenFaq] = useState(null)

  const contacts = [
    {icon:'🏛',title:'Registrar\'s Office', body:'Block A, Room 102\nMon–Fri, 9 am – 5 pm', link:'mailto:registrar@edureg.edu',linkLabel:'registrar@edureg.edu'},
    {icon:'📚',title:'Academic Office',    body:'Block B, Room 205\nMon–Sat, 9 am – 4 pm', link:'mailto:academic@edureg.edu',linkLabel:'academic@edureg.edu'},
    {icon:'📋',title:'Examinations Cell',  body:'Block B, Room 210\nMon–Fri, 10 am – 4 pm',link:'mailto:exams@edureg.edu',linkLabel:'exams@edureg.edu'},
    {icon:'🛟',title:'Student Support',    body:'Student Centre, Ground Floor\n24 × 7 Helpline',link:'tel:+911800000000',linkLabel:'+91 1800-000-0000'},
  ]

  return (
    <div>
      <div className="section-h">Contact &amp; Support</div>
      <div className="help-grid mb6">
        {contacts.map(c=>(
          <div key={c.title} className="help-card">
            <div className="help-icon">{c.icon}</div>
            <div className="help-title">{c.title}</div>
            <div className="help-body" style={{whiteSpace:'pre-line'}}>{c.body}</div>
            <a href={c.link} className="help-link">{c.linkLabel}</a>
          </div>
        ))}
      </div>

      <div className="section-h">Frequently Asked Questions</div>
      <div className="faq-list">
        {FAQS.map((f,i)=>(
          <div key={i} className="faq-item">
            <div className="faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)} role="button" tabIndex={0} onKeyDown={e=>(e.key==='Enter'||e.key===' ')&&setOpenFaq(openFaq===i?null:i)}>
              <span>{f.q}</span>
              <span style={{fontSize:12,color:'var(--text3)'}}>{openFaq===i?'▲':'▼'}</span>
            </div>
            {openFaq===i&&<div className="faq-a">{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

function StudentView({ student, onLogout }) {
  const [tab,setTab] = useState('profile')
  return (
    <div>
      <div className="tab-bar">
        {[
          {id:'profile',  icon:'👤', label:'My Profile'},
          {id:'progress', icon:'📈', label:'Progress'},
          {id:'help',     icon:'🛟', label:'Help & Contact'},
        ].map(t=>(
          <button key={t.id} className={`tab-btn${tab===t.id?' active':''}`} onClick={()=>setTab(t.id)}>
            <span className="tab-icon">{t.icon}</span>{t.label}
          </button>
        ))}
        <div className="spacer"/>
        <button className="tab-btn" style={{color:'var(--err)'}} onClick={onLogout}>Sign Out</button>
      </div>
      <div className="page page-sm">
        <div className="row mb6">
          <div>
            <h1 className="page-title">{tab==='profile'?'My Profile':tab==='progress'?'Academic Progress':'Help & Support'}</h1>
            <p className="page-sub" style={{marginBottom:0}}>
              {tab==='profile'?'Read-only view of your registration record.':tab==='progress'?'Your semester completion and enrolment details.':'Contact information and common questions.'}
            </p>
          </div>
        </div>
        {tab==='profile'  && <StudentProfile  student={student}/>}
        {tab==='progress' && <StudentProgress student={student}/>}
        {tab==='help'     && <StudentHelp/>}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
//  LOGIN
// ═══════════════════════════════════════════════════════════
function LoginPage({ students, onStudent, onStaff }) {
  const [role,setRole] = useState('student')
  const [inp,setInp]   = useState('')
  const [err,setErr]   = useState('')

  function submit(e){
    e.preventDefault(); setErr('')
    if(role==='student'){
      const s=students.find(x=>x.id.toLowerCase()===inp.trim().toLowerCase())
      if(!s){ setErr('Student ID not found. Please check and try again.'); return }
      onStudent(s)
    } else {
      if(inp.trim()!==PIN){ setErr('Incorrect PIN. Please try again.'); return }
      onStaff()
    }
  }

  return (
    <div className="login-wrap">
      <form className="login-box" onSubmit={submit} noValidate>
        <div className="login-logo">
          <div className="login-icon">🎓</div>
          <div className="login-title">EduReg Portal</div>
        </div>
        <p className="login-sub">Student Registration &amp; Records System</p>

        <div className="role-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={role==='student'} className={`role-tab${role==='student'?' on':''}`} onClick={()=>{setRole('student');setErr('');setInp('')}}>👤 Student</button>
          <button type="button" role="tab" aria-selected={role==='staff'}   className={`role-tab${role==='staff'?' on':''}`}   onClick={()=>{setRole('staff');  setErr('');setInp('')}}>🛡 Staff</button>
        </div>

        <div className="field">
          <label className="lbl" htmlFor="login-inp">{role==='student'?'Student ID':'Staff PIN'}</label>
          <input id="login-inp" className="inp" type={role==='staff'?'password':'text'} placeholder={role==='student'?'e.g. STU1001':'• • • •'} value={inp} autoFocus autoComplete={role==='staff'?'current-password':'username'} onChange={e=>{setInp(e.target.value);setErr('')}}/>
        </div>

        {err&&<div className="login-err"><span>⚠</span>{err}</div>}
        <button type="submit" className="btn btn-primary btn-full btn-lg">Sign In →</button>

        <div className="demo-note">
          Demo IDs: <strong>STU1001</strong> · <strong>STU1002</strong> · <strong>STU1003</strong><br/>
          Staff PIN: <strong>1234</strong><br/>
          ⚠ This PIN is for demonstration only and is not real security.
        </div>
      </form>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [theme,setTheme]       = useState(()=>ls('edureg_theme','light'))
  const [students,setStudents] = useState(()=>ls('edureg_students',SEED))
  const [session,setSession]   = useState(null)

  useEffect(()=>{ lsSet('edureg_students',students) },[students])
  useEffect(()=>{ lsSet('edureg_theme',theme) },[theme])

  useEffect(()=>{
    let el=document.getElementById('edureg-css')
    if(!el){ el=document.createElement('style'); el.id='edureg-css'; document.head.appendChild(el) }
    el.textContent=CSS
  },[])

  const themeBtn=(
    <button className="icon-btn" onClick={()=>setTheme(t=>t==='dark'?'light':'dark')} aria-label="Toggle theme" title={theme==='dark'?'Light mode':'Dark mode'}>
      {theme==='dark'?'☀':'🌙'}
    </button>
  )

  if(!session) return (
    <div data-theme={theme}>
      <LoginPage students={students} onStudent={s=>setSession({role:'student',student:s})} onStaff={()=>setSession({role:'staff'})}/>
      <div style={{position:'fixed',bottom:16,right:16}}>{themeBtn}</div>
    </div>
  )

  return (
    <div data-theme={theme} className="shell">
      <header className="topbar">
        <span className="logo"><span className="logo-box">🎓</span>EduReg</span>
        {session.role==='staff'&&<span className="badge" style={{fontSize:11.5}}>🛡 Staff Access</span>}
        {session.role==='student'&&<span style={{fontSize:14,color:'var(--text2)'}}>Welcome, <strong>{session.student?.firstName}</strong></span>}
        <div className="spacer"/>
        {themeBtn}
      </header>

      {session.role==='student'&&<StudentView student={session.student} onLogout={()=>setSession(null)}/>}
      {session.role==='staff'  &&<StaffView  students={students} setStudents={setStudents} onLogout={()=>setSession(null)}/>}
    </div>
  )
}
