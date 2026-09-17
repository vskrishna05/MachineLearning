import { useState, useEffect, useRef, useCallback } from "react";
import type { Format, CricTeam, PredictionRecord } from "./data/cricket";
import {
  teamsForFormat, ALL_VENUES, PITCH_TYPES, FORMAT_META,
  TEST_TEAMS, IPL_TEAMS, T20_TEAMS,
} from "./data/cricket";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Ic = {
  overview:  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 11h1v6a1 1 0 001 1h4v-4h2v4h4a1 1 0 001-1v-6h1a1 1 0 00.707-1.707l-7-7z"/></svg>,
  predictor: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg>,
  analytics: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>,
  teams:     <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm8 0a3 3 0 11-6 0 3 3 0 016 0zM5.001 11.502a8.003 8.003 0 00-2.996 2.5 1 1 0 101.994.997C4.788 13.533 6.275 13 8 13c.365 0 .722.025 1.068.073A6.003 6.003 0 0115 14.999 5.99 5.99 0 0019 14c0-2.21-1.794-4-4-4a3.988 3.988 0 00-2.576.942A7.003 7.003 0 005.001 11.502z"/></svg>,
  history:   <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>,
  about:     <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>,
  chevron:   <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>,
  check:     <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>,
  x:         <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>,
  menu:      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/></svg>,
  search:    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>,
  trash:     <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>,
  arrow:     <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>,
  spin:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 spin-smooth"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
  trophy:    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M6 2a1 1 0 00-.894.553L4.382 4H2a1 1 0 100 2h.01l.38 3.04A4.002 4.002 0 006 12.83V14H5a1 1 0 100 2h10a1 1 0 100-2h-1v-1.17A4.002 4.002 0 0017.61 9.04L17.99 6H18a1 1 0 100-2h-2.382l-.724-1.447A1 1 0 0014 2H6z" clipRule="evenodd"/></svg>,
  trend:     <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/></svg>,
  bat:       <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M3 10a1 1 0 011-1h5V4a1 1 0 012 0v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 01-1-1z"/></svg>,
  shield:    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944z" clipRule="evenodd"/></svg>,
  target:    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/></svg>,
  info:      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>,
};

// ─── Shared primitives ────────────────────────────────────────────────────────

function Badge({ children, color = "default" }: { children: React.ReactNode; color?: "blue"|"green"|"amber"|"red"|"default" }) {
  const c = {
    blue:    "bg-[rgba(10,132,255,0.14)] text-[#0a84ff] border-[rgba(10,132,255,0.22)]",
    green:   "bg-[rgba(48,209,88,0.12)] text-[#30d158] border-[rgba(48,209,88,0.20)]",
    amber:   "bg-[rgba(255,214,10,0.12)] text-[#e6c209] border-[rgba(255,214,10,0.20)]",
    red:     "bg-[rgba(255,69,58,0.12)] text-[#ff453a] border-[rgba(255,69,58,0.20)]",
    default: "bg-[rgba(255,255,255,0.06)] text-[rgba(235,235,245,0.50)] border-[rgba(255,255,255,0.09)]",
  }[color];
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border tracking-wider ${c}`}>{children}</span>;
}

function Btn({ children, onClick, variant="primary", size="md", disabled, full, className="" }: {
  children: React.ReactNode; onClick?: () => void;
  variant?: "primary"|"secondary"|"ghost"|"danger"; size?: "sm"|"md"|"lg";
  disabled?: boolean; full?: boolean; className?: string;
}) {
  const sz = { sm: "text-xs px-3 py-1.5", md: "text-sm px-4 py-2", lg: "text-sm px-6 py-3" }[size];
  const v = {
    primary:   "bg-[#0a84ff] text-white hover:bg-[#0070d8] shadow-[0_2px_12px_rgba(10,132,255,0.30)] active:scale-[0.98]",
    secondary: "glass text-[rgba(235,235,245,0.75)] hover:text-white hover:bg-[rgba(255,255,255,0.10)] active:scale-[0.98]",
    ghost:     "text-[rgba(235,235,245,0.45)] hover:text-[rgba(235,235,245,0.80)] hover:bg-[rgba(255,255,255,0.05)]",
    danger:    "bg-[rgba(255,69,58,0.12)] text-[#ff453a] border border-[rgba(255,69,58,0.20)] hover:bg-[rgba(255,69,58,0.20)]",
  }[variant];
  return (
    <button
      onClick={onClick} disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-display font-semibold rounded-xl transition-all duration-200 select-none shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] disabled:opacity-35 disabled:pointer-events-none ${sz} ${v} ${full?"w-full":""} ${className}`}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-mono text-[rgba(235,235,245,0.30)] uppercase tracking-[0.15em] mb-3">{children}</p>;
}

function Card({ children, className="", onClick, style }: { children: React.ReactNode; className?: string; onClick?: () => void; style?: React.CSSProperties }) {
  return <div className={`glass rounded-2xl border border-[rgba(255,255,255,0.065)] shadow-[0_18px_60px_rgba(0,0,0,0.16)] ${onClick ? "cursor-pointer hover:border-[rgba(10,132,255,0.18)] hover:bg-[rgba(255,255,255,0.055)] hover:-translate-y-[1px]" : ""} transition-all duration-200 ${className}`} onClick={onClick} style={style}>{children}</div>;
}

// ─── Segment control ──────────────────────────────────────────────────────────
function Segment<T extends string>({ options, value, onChange }: { options:{value:T;label:string}[]; value:T; onChange:(v:T)=>void }) {
  return (
    <div className="segment-track flex gap-0.5">
      {options.map((o) => (
        <button key={o.value} onClick={() => onChange(o.value)}
          className={`flex-1 px-3 py-1.5 rounded-[8px] text-xs font-mono font-medium tracking-wider transition-all duration-150 ${
            o.value===value ? "segment-thumb text-[#f2f2f7]" : "text-[rgba(235,235,245,0.38)] hover:text-[rgba(235,235,245,0.65)]"
          }`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ─── Team avatar ──────────────────────────────────────────────────────────────
function TeamAvatar({ team, size="md" }: { team: CricTeam; size?: "xs"|"sm"|"md"|"lg" }) {
  const sz = { xs:"w-6 h-6 text-[9px] rounded-lg", sm:"w-8 h-8 text-[10px] rounded-xl", md:"w-10 h-10 text-xs rounded-xl", lg:"w-14 h-14 text-sm rounded-2xl" }[size];
  const safeColor = team.color === "#000000" ? "#6e6e73" : team.color;
  return (
    <div className={`${sz} flex items-center justify-center font-display font-bold flex-shrink-0`}
      style={{ background:`${safeColor}22`, border:`1px solid ${safeColor}40`, color: safeColor }}>
      {team.short.slice(0,3)}
    </div>
  );
}

// ─── Searchable team selector ─────────────────────────────────────────────────
function TeamSelector({ label, selected, teams, exclude, onSelect, format }: {
  label: string; selected: CricTeam|null; teams: CricTeam[]; exclude?: string;
  onSelect:(t:CricTeam)=>void; format?: Format;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e:MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  const available = teams.filter(t => t.id !== exclude);
  const filtered = available.filter(t => !q || t.name.toLowerCase().includes(q.toLowerCase()) || t.short.toLowerCase().includes(q.toLowerCase()));
  const ph = format==="T20" ? "Search from all available T20 teams…" : "Search teams…";
  return (
    <div ref={ref} className="relative">
      <label className="block text-[11px] font-mono text-[rgba(235,235,245,0.32)] tracking-wider uppercase mb-1.5">{label}</label>
      <button onClick={() => setOpen(!open)}
        className="w-full glass rounded-xl px-3 py-3 flex items-center gap-3 text-left border border-[rgba(255,255,255,0.07)] hover:border-[rgba(10,132,255,0.22)] hover:bg-[rgba(255,255,255,0.07)] transition-all duration-200">
        {selected ? (
          <>
            <TeamAvatar team={selected} size="sm"/>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-sm text-[#f2f2f7] truncate">{selected.name}</p>
              <p className="text-[10px] font-mono text-[rgba(235,235,245,0.28)]">{selected.short}</p>
            </div>
          </>
        ) : <p className="flex-1 text-sm text-[rgba(235,235,245,0.25)]">Select team</p>}
        <span className="text-[rgba(235,235,245,0.22)]">{Ic.chevron}</span>
      </button>
      {open && (
        <div className="absolute z-40 mt-1.5 w-full glass-elevated rounded-2xl overflow-hidden">
          <div className="p-2.5 border-b border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.06)] rounded-lg px-3 py-2">
              <span className="text-[rgba(235,235,245,0.28)]">{Ic.search}</span>
              <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder={ph}
                className="flex-1 text-sm bg-transparent text-[#f2f2f7] placeholder-[rgba(235,235,245,0.22)] outline-none"/>
              {q && <button onClick={() => setQ("")} className="text-[rgba(235,235,245,0.28)] hover:text-[rgba(235,235,245,0.60)]">{Ic.x}</button>}
            </div>
            <p className="text-[10px] font-mono text-[rgba(235,235,245,0.20)] mt-1.5 px-1">{filtered.length} of {available.length} teams</p>
          </div>
          <div className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0
              ? <p className="text-xs text-center text-[rgba(235,235,245,0.22)] py-5">No teams match "{q}"</p>
              : filtered.map(t => (
                <button key={t.id} onClick={() => { onSelect(t); setOpen(false); setQ(""); }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[rgba(255,255,255,0.06)] transition-colors">
                  <TeamAvatar team={t} size="xs"/>
                  <span className="flex-1 text-sm text-[rgba(235,235,245,0.78)] text-left">{t.name}</span>
                  <span className="text-[10px] font-mono text-[rgba(235,235,245,0.20)]">{t.short}</span>
                  {selected?.id===t.id && <span className="text-[#0a84ff] ml-1">{Ic.check}</span>}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Searchable dropdown ──────────────────────────────────────────────────────
function DropSelect({ label, value, options, onSelect, placeholder="Select", note }: {
  label:string; value:string; options:string[]; onSelect:(v:string)=>void; placeholder?:string; note?:string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e:MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  const filtered = options.filter(o => !q || o.toLowerCase().includes(q.toLowerCase()));
  return (
    <div ref={ref} className="relative">
      <label className="block text-[11px] font-mono text-[rgba(235,235,245,0.32)] tracking-wider uppercase mb-1.5">{label}</label>
      <button onClick={() => setOpen(!open)}
        className="w-full glass rounded-xl px-3 py-3 flex items-center gap-2 text-left border border-[rgba(255,255,255,0.07)] hover:border-[rgba(10,132,255,0.22)] hover:bg-[rgba(255,255,255,0.07)] transition-all duration-200">
        <span className={`flex-1 text-sm ${value ? "text-[#f2f2f7]" : "text-[rgba(235,235,245,0.25)]"}`}>{value || placeholder}</span>
        <span className="text-[rgba(235,235,245,0.22)]">{Ic.chevron}</span>
      </button>
      {note && <p className="flex items-center gap-1 mt-1 text-[10px] text-[rgba(235,235,245,0.22)]"><span>{Ic.info}</span>{note}</p>}
      {open && (
        <div className="absolute z-40 mt-1.5 w-full glass-elevated rounded-2xl overflow-hidden">
          <div className="p-2.5 border-b border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.06)] rounded-lg px-3 py-2">
              <span className="text-[rgba(235,235,245,0.28)]">{Ic.search}</span>
              <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder={`Search ${label.toLowerCase()}…`}
                className="flex-1 text-sm bg-transparent text-[#f2f2f7] placeholder-[rgba(235,235,245,0.22)] outline-none"/>
              {q && <button onClick={() => setQ("")} className="text-[rgba(235,235,245,0.28)]">{Ic.x}</button>}
            </div>
          </div>
          <div className="max-h-56 overflow-y-auto py-1">
            {filtered.map(o => (
              <button key={o} onClick={() => { onSelect(o); setOpen(false); setQ(""); }}
                className="w-full px-3 py-2 text-sm text-left text-[rgba(235,235,245,0.72)] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#f2f2f7] transition-colors flex items-center justify-between">
                {o}{value===o && <span className="text-[#0a84ff]">{Ic.check}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
interface Toast { id:number; msg:string; type:"ok"|"err"|"info" }
function Toasts({ list, remove }: { list:Toast[]; remove:(id:number)=>void }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {list.map(t => (
        <div key={t.id} className="fade-up glass-elevated flex items-center gap-3 px-4 py-3 rounded-2xl max-w-xs">
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: t.type==="ok"?"#30d158":t.type==="err"?"#ff453a":"#0a84ff" }}/>
          <p className="text-sm text-[#f2f2f7] flex-1">{t.msg}</p>
          <button onClick={() => remove(t.id)} className="text-[rgba(235,235,245,0.28)] hover:text-[rgba(235,235,245,0.65)]">{Ic.x}</button>
        </div>
      ))}
    </div>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ compact=false }: { compact?:boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background:"linear-gradient(145deg,rgba(10,132,255,0.9),rgba(0,80,200,0.8))", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.22),0 2px 8px rgba(10,132,255,0.28)" }}>
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
          <circle cx="8" cy="8" r="5.5" stroke="white" strokeWidth="1.2" opacity="0.65"/>
          <path d="M5.5 10.5L8 5L10.5 10.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.3 8.8h3.4" stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.55"/>
        </svg>
      </div>
      {!compact && (
        <div>
          <p className="font-display font-bold text-[#f2f2f7] text-sm leading-none tracking-tight">CricVision</p>
          <p className="text-[9px] font-mono text-[rgba(235,235,245,0.28)] leading-none mt-0.5 tracking-wider">Cricket Intelligence</p>
        </div>
      )}
    </div>
  );
}

// ─── Format pill ──────────────────────────────────────────────────────────────
function FmtPill({ fmt, active, onClick }: { fmt:Format; active:boolean; onClick:()=>void }) {
  return (
    <button onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium tracking-widest transition-all duration-150 border ${
        active
          ? "bg-[rgba(10,132,255,0.16)] text-[#0a84ff] border-[rgba(10,132,255,0.28)]"
          : "text-[rgba(235,235,245,0.35)] border-transparent hover:text-[rgba(235,235,245,0.60)] hover:border-[rgba(255,255,255,0.07)]"
      }`}>
      {fmt}
    </button>
  );
}

const FORMAT_LIST: Format[] = ["TEST","ODI","T20","IPL"];
const CHART_STYLE = { fontSize:11, fontFamily:"'Outfit','Inter',sans-serif", fill:"rgba(235,235,245,0.40)" };

// ─── Navigation ───────────────────────────────────────────────────────────────
type Page = "overview"|"predictor"|"analytics"|"teams"|"history"|"about";
const NAV: { id:Page; label:string; icon:React.ReactNode }[] = [
  { id:"overview",  label:"Overview",          icon:Ic.overview  },
  { id:"predictor", label:"Match Predictor",   icon:Ic.predictor },
  { id:"analytics", label:"Analytics",         icon:Ic.analytics },
  { id:"teams",     label:"Team Intelligence", icon:Ic.teams     },
  { id:"history",   label:"Prediction History",icon:Ic.history   },
  { id:"about",     label:"About Model",       icon:Ic.about     },
];

function Sidebar({ page, onNav, histCount }: { page:Page; onNav:(p:Page)=>void; histCount:number }) {
  return (
    <aside className="hidden md:flex flex-col w-60 flex-shrink-0 glass-panel h-screen sticky top-0 border-r border-[rgba(255,255,255,0.06)]">
      <div className="px-5 py-6 border-b border-[rgba(255,255,255,0.06)]"><Logo/></div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map(n => (
          <button key={n.id} onClick={() => onNav(n.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 text-left relative ${
              page===n.id
                ? "bg-[rgba(10,132,255,0.13)] text-[#f2f2f7]"
                : "text-[rgba(235,235,245,0.42)] hover:text-[rgba(235,235,245,0.75)] hover:bg-[rgba(255,255,255,0.05)]"
            }`}>
            <span className={page===n.id?"text-[#0a84ff]":""}>{n.icon}</span>
            <span className="font-display font-medium text-sm">{n.label}</span>
            {n.id==="history" && histCount>0 && (
              <span className="ml-auto text-[10px] font-mono bg-[rgba(10,132,255,0.16)] text-[#0a84ff] px-1.5 rounded-full">{histCount}</span>
            )}
            {page===n.id && <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#0a84ff] rounded-full"/>}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function MobileHeader({ page, onNav, mobileOpen, setMobileOpen }: {
  page:Page; onNav:(p:Page)=>void; mobileOpen:boolean; setMobileOpen:(v:boolean)=>void;
}) {
  return (
    <header className="glass-bar sticky top-0 z-30 flex items-center gap-4 px-5 py-3 md:hidden">
      <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[rgba(235,235,245,0.45)] hover:text-[#f2f2f7]">
        {mobileOpen ? Ic.x : Ic.menu}
      </button>
      <Logo/>
      <span className="ml-auto text-xs font-mono text-[rgba(235,235,245,0.30)]">
        {NAV.find(n=>n.id===page)?.label}
      </span>
    </header>
  );
}

// ─── Overview page ────────────────────────────────────────────────────────────
function Overview({ navigate }: { navigate:(p:Page, fmt?:Format)=>void }) {
  const formatCards = [
    { fmt:"TEST" as Format, desc:"Three-outcome prediction with win and draw analysis." },
    { fmt:"ODI"  as Format, desc:"Pre-match outcome prediction using historical team and venue performance." },
    { fmt:"T20"  as Format, desc:"Pre-match prediction focused on recent form and performance trends." },
    { fmt:"IPL"  as Format, desc:"Pre-match prediction using franchise history, form and venue performance." },
  ];
  return (
    <div className="space-y-8 fade-up">
      {/* Hero */}
      <Card className="relative overflow-hidden border-[rgba(10,132,255,0.13)] shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-2/3 h-full" style={{ background:"radial-gradient(ellipse 70% 100% at 100% 0%,rgba(10,132,255,0.06) 0%,transparent 65%)" }}/>
        </div>
        <div className="relative z-10 p-8 md:p-14">
          <div className="flex items-center gap-2 mb-5"><span className="w-1.5 h-1.5 rounded-full bg-[#30d158] shadow-[0_0_12px_rgba(48,209,88,0.65)]"/><p className="text-[10px] font-mono tracking-[0.18em] text-[rgba(235,235,245,0.38)] uppercase">Cricket Intelligence Platform</p></div>
          <h1 className="font-display font-bold text-[clamp(2rem,4.5vw,3rem)] text-[#f2f2f7] leading-tight tracking-tight mb-3">CricVision</h1>
          <p className="text-[rgba(235,235,245,0.62)] text-base md:text-lg mb-2">Cricket Intelligence &amp; Match Prediction</p>
          <p className="text-[rgba(235,235,245,0.38)] text-sm max-w-lg leading-relaxed mb-8">
            Analyze cricket teams, venues and historical performance to understand match outcomes before the game begins.
          </p>
          <div className="flex flex-wrap gap-3">
            <Btn size="lg" onClick={() => navigate("predictor")}>{Ic.arrow} Predict a Match</Btn>
            <Btn size="lg" variant="secondary" onClick={() => navigate("analytics")}>View Analytics</Btn>
          </div>
        </div>
        <div className="border-t border-[rgba(255,255,255,0.05)] px-8 md:px-12 py-3 flex gap-5 flex-wrap">
          {FORMAT_LIST.map(f => (
            <button key={f} onClick={() => navigate("predictor", f)}
              className="flex items-center gap-1.5 text-xs font-mono text-[rgba(235,235,245,0.30)] hover:text-[#0a84ff] transition-colors group">
              <span className="tracking-widest">{f}</span>
              <span className="text-[rgba(235,235,245,0.15)] group-hover:text-[#0a84ff] transition-colors">{Ic.chevron}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Format cards */}
      <div>
        <p className="text-[rgba(235,235,245,0.55)] text-xs font-mono uppercase tracking-widest mb-4">Choose your format</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {formatCards.map(({ fmt, desc }) => (
            <Card key={fmt} className="p-5 cursor-pointer group hover:bg-[rgba(255,255,255,0.07)] hover:border-[rgba(10,132,255,0.20)] transition-all duration-200 active:scale-[0.98]"
              onClick={() => navigate("predictor", fmt)}>
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-[10px] font-semibold tracking-widest text-[rgba(235,235,245,0.28)]">{fmt}</span>
                <span className="text-[rgba(235,235,245,0.18)] group-hover:text-[rgba(235,235,245,0.50)] transition-colors">{Ic.arrow}</span>
              </div>
              <p className="font-display font-semibold text-[#f2f2f7] text-sm leading-snug mb-2">{FORMAT_META[fmt].fullName}</p>
              <p className="text-xs text-[rgba(235,235,245,0.32)] leading-relaxed">{desc}</p>
              <button className="mt-4 text-xs text-[#0a84ff] font-mono hover:underline">Predict →</button>
            </Card>
          ))}
        </div>
      </div>

      {/* What is CricVision */}
      <Card className="p-6">
        <SectionLabel>About CricVision</SectionLabel>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon:Ic.target, title:"Understand the Teams",    desc:"Explore historical performance, win rates and recent form for any team." },
            { icon:Ic.shield, title:"Understand the Conditions", desc:"Factor in venue history, pitch type and toss to add match context." },
            { icon:Ic.trend,  title:"Understand the Prediction", desc:"Clear explanations of why each prediction was made, in plain cricket language." },
          ].map(s => (
            <div key={s.title} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[rgba(10,132,255,0.10)] flex items-center justify-center flex-shrink-0 text-[#0a84ff]">{s.icon}</div>
              <div>
                <p className="font-display font-semibold text-sm text-[#f2f2f7] mb-1">{s.title}</p>
                <p className="text-xs text-[rgba(235,235,245,0.38)] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex items-start gap-2.5 glass rounded-xl px-4 py-3 border border-[rgba(255,214,10,0.09)]">
        <span className="flex-shrink-0 text-[rgba(255,214,10,0.55)] mt-0.5">{Ic.info}</span>
        <p className="text-xs text-[rgba(235,235,245,0.32)] leading-relaxed">
          CricVision provides statistical pre-match predictions based on historical data. Predictions are probabilistic estimates — not guaranteed outcomes. Technical model details are available on the About Model page.
        </p>
      </div>
    </div>
  );
}

// ─── "Why this prediction?" factor support ─────────────────────────────────────
interface Factor {
  label:string;
  desc:string;
  advantage:"team1"|"team2"|"none";
  icon:React.ReactNode;
}

interface ApiPredictionFactor {
  factor?: string;
  label?: string;
  explanation?: string;
  desc?: string;
  advantage?: string;
}

type CricVisionPredictionRecord = PredictionRecord & {
  modelFeatures?: Record<string, number>;
  predictionFactors?: ApiPredictionFactor[];
};

function advantageFromValue(value:number, team1:CricTeam, team2:CricTeam): Factor["advantage"] {
  if (!Number.isFinite(value) || Math.abs(value) < 0.000001) return "none";
  return value > 0 ? "team1" : "team2";
}

function buildFeatureFactors(
  result:CricVisionPredictionRecord
): Factor[] {
  const features = result.modelFeatures;

  if (!features || Object.keys(features).length === 0) {
    return [
      {
        label:"Model Inputs",
        desc:"The prediction was generated by the trained format-specific model using historical team performance, recent form, head-to-head, venue and toss inputs. Detailed feature values are shown when returned by the backend.",
        advantage:"none",
        icon:Ic.target,
      },
    ];
  }

  const t1 = result.team1;
  const t2 = result.team2;

  const items: Factor[] = [];

  const addDiff = (
    label:string,
    key:string,
    formatValue:(v:number)=>string,
    icon:React.ReactNode
  ) => {
    const value = Number(features[key]);
    if (!Number.isFinite(value)) return;

    const advantage = advantageFromValue(value, t1, t2);
    let desc = "";

    if (advantage === "none") {
      desc = `${label} is approximately balanced between ${t1.name} and ${t2.name}.`;
    } else {
      const team = advantage === "team1" ? t1.name : t2.name;
      desc = `${team} has the statistical advantage for ${label.toLowerCase()} (${formatValue(Math.abs(value))} difference in Team 1 − Team 2 feature value).`;
    }

    items.push({ label, desc, advantage, icon });
  };

  addDiff(
    "Overall Win Rate",
    "win_rate_diff",
    v => v.toFixed(3),
    Ic.trophy
  );

  addDiff(
    "Recent Form",
    "recent_form_diff",
    v => v.toFixed(3),
    Ic.trend
  );

  addDiff(
    "Batting Performance",
    "avg_runs_diff",
    v => v.toFixed(2),
    Ic.bat
  );

  addDiff(
    "Bowling Performance",
    "avg_wickets_diff",
    v => v.toFixed(2),
    Ic.shield
  );

  addDiff(
    "Run Rate",
    "run_rate_diff",
    v => v.toFixed(2),
    Ic.trend
  );

  addDiff(
    "Elo / Team Strength",
    "elo_diff",
    v => v.toFixed(1),
    Ic.target
  );

  const h2h = Number(features.team_1_h2h_win_rate);
  if (Number.isFinite(h2h)) {
    const advantage =
      Math.abs(h2h - 0.5) < 0.000001
        ? "none"
        : h2h > 0.5
          ? "team1"
          : "team2";

    items.push({
      label:"Head-to-Head Record",
      desc:
        advantage === "none"
          ? "The historical head-to-head rate is balanced at approximately 50% for Team 1."
          : `${advantage === "team1" ? t1.name : t2.name} has the stronger historical head-to-head rate (${(h2h * 100).toFixed(1)}% from the Team 1 perspective).`,
      advantage,
      icon:Ic.shield,
    });
  }

  addDiff(
    "Venue Performance",
    "venue_win_rate_diff",
    v => v.toFixed(3),
    Ic.target
  );

  const toss = Number(features.toss_winner_diff);
  if (Number.isFinite(toss) && toss !== 0) {
    items.push({
      label:"Toss Winner",
      desc:`${toss > 0 ? t1.name : t2.name} won the toss and the toss input was included in the prediction.`,
      advantage:toss > 0 ? "team1" : "team2",
      icon:Ic.trophy,
    });
  }

  const batFirst = Number(features.bat_first_diff);
  if (Number.isFinite(batFirst) && batFirst !== 0) {
    items.push({
      label:"Batting First",
      desc:`The toss decision indicates ${batFirst > 0 ? t1.name : t2.name} is represented as batting first in the model input.`,
      advantage:batFirst > 0 ? "team1" : "team2",
      icon:Ic.bat,
    });
  }

  return items.slice(0, 8);
}

function buildFactors(
  result:CricVisionPredictionRecord
): Factor[] {
  const apiFactors = result.predictionFactors;

  if (Array.isArray(apiFactors) && apiFactors.length > 0) {
    return apiFactors.map((f) => {
      const rawAdvantage = String(f.advantage || "").toLowerCase();

      return {
        label:f.factor || f.label || "Model Factor",
        desc:f.explanation || f.desc || "This factor was returned by the prediction backend.",
        advantage:
          rawAdvantage === "team1" || rawAdvantage === result.team1.name.toLowerCase()
            ? "team1"
            : rawAdvantage === "team2" || rawAdvantage === result.team2.name.toLowerCase()
              ? "team2"
              : "none",
        icon:
          (f.factor || f.label || "").toLowerCase().includes("form")
            ? Ic.trend
            : (f.factor || f.label || "").toLowerCase().includes("bat")
              ? Ic.bat
              : (f.factor || f.label || "").toLowerCase().includes("bowl")
                ? Ic.shield
                : (f.factor || f.label || "").toLowerCase().includes("venue")
                  ? Ic.target
                  : Ic.trophy,
      };
    });
  }

  return buildFeatureFactors(result);
}

// ─── Match predictor page ─────────────────────────────────────────────────────
type PredStep = "form"|"loading"|"result";
interface PredForm {
  format:Format; team1:CricTeam|null; team2:CricTeam|null;
  venue:string; pitch:string; tossWinner:string; tossDecision:string;
}
const LOAD_STEPS = ["Loading historical data","Computing performance metrics","Evaluating recent form","Analysing head-to-head","Running prediction model","Generating result"];

function MatchPredictor({ defaultFormat, onSaveHistory, toast }: {
  defaultFormat:Format; onSaveHistory:(r:CricVisionPredictionRecord)=>void; toast:(m:string,t:Toast["type"])=>void;
}) {
  const [step, setStep] = useState<PredStep>("form");
  const [loadIdx, setLoadIdx] = useState(0);
  const [result, setResult] = useState<CricVisionPredictionRecord|null>(null);
  const [form, setForm] = useState<PredForm>({ format:defaultFormat, team1:null, team2:null, venue:"", pitch:"", tossWinner:"", tossDecision:"" });
  const teams = teamsForFormat(form.format);
  const set = useCallback(<K extends keyof PredForm>(k:K,v:PredForm[K]) => setForm(p=>({...p,[k]:v})),[]);

  const changeFormat = (fmt:Format) => { set("format",fmt); set("team1",null); set("team2",null); set("tossWinner",""); };

  const submit = async () => {
    if (!form.team1 || !form.team2) {
      toast("Select both teams", "err");
      return;
    }

    if (form.team1.id === form.team2.id) {
      toast("Select two different teams", "err");
      return;
    }

    if (!form.venue) {
      toast("Select a venue", "err");
      return;
    }

    setStep("loading");
    setLoadIdx(0);

    let i = 0;

    const iv = setInterval(() => {
      i++;
      setLoadIdx(i);

      if (i >= LOAD_STEPS.length) {
        clearInterval(iv);
      }
    }, 300);

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

      const endpoint =
        `${apiUrl}/predict/${form.format.toLowerCase()}`;

      const tossWinner =
        form.tossWinner && form.tossWinner !== "Not Available"
          ? form.tossWinner
          : null;

      const tossDecision =
        form.tossDecision && form.tossDecision !== "Not Available"
          ? form.tossDecision
          : null;

      const response = await fetch(endpoint, {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          team1:form.team1.name,
          team2:form.team2.name,
          venue:form.venue,
          pitch_type:form.pitch || "Balanced",
          toss_winner:tossWinner,
          toss_decision:tossDecision,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail ||
          `Prediction failed (${response.status})`
        );
      }

      const api = await response.json();

      await new Promise(resolve => setTimeout(resolve, 500));

      clearInterval(iv);
      setLoadIdx(LOAD_STEPS.length);

      const winner =
        api.prediction === "Draw"
          ? ({
              id:"DRAW",
              name:"Draw",
              short:"D",
              color:"#636366",
              formats:[],
            } as CricTeam)
          : api.prediction === form.team1.name
            ? form.team1
            : form.team2;

      const rec:CricVisionPredictionRecord = {
        id:Date.now().toString(),
        date:new Date(),
        format:form.format,
        team1:form.team1,
        team2:form.team2,
        venue:form.venue,
        pitchType:form.pitch,
        tossWinner:form.tossWinner,
        tossDecision:form.tossDecision,
        winner,
        p1:Number(api.team_1_win_probability ?? 0),
        p2:Number(api.team_2_win_probability ?? 0),
        pDraw:
          api.draw_probability !== undefined
            ? Number(api.draw_probability)
            : undefined,
        modelFeatures:api.model_features || {},
        predictionFactors:Array.isArray(api.prediction_factors)
          ? api.prediction_factors
          : [],
      };

      setResult(rec);
      setStep("result");
      onSaveHistory(rec);
      toast("Prediction complete","ok");

    } catch (error) {
      clearInterval(iv);
      setStep("form");

      const message =
        error instanceof Error
          ? error.message
          : "Unable to connect to CricVision API.";

      toast(message,"err");
    }
  };

  const reset = () => { setStep("form"); setResult(null); };

  // Loading
  if (step==="loading") return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 fade-in">
      <Card className="p-8 flex flex-col items-center gap-5 w-full max-w-sm">
        <div className="text-[#0a84ff]">{Ic.spin}</div>
        <p className="font-display font-semibold text-[rgba(235,235,245,0.60)] text-sm">Generating prediction…</p>
        <div className="w-full space-y-2.5">
          {LOAD_STEPS.map((s,i) => (
            <div key={s} className={`flex items-center gap-2.5 transition-all duration-200 ${i<loadIdx?"opacity-100":"opacity-22"}`}>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${i<loadIdx?"bg-[rgba(48,209,88,0.18)] text-[#30d158]":"border border-[rgba(255,255,255,0.08)]"}`}>
                {i<loadIdx && <span className="scale-75">{Ic.check}</span>}
              </div>
              <span className="text-xs text-[rgba(235,235,245,0.60)] font-mono">{s}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // Result
  if (step==="result" && result) {
    const maxP = Math.max(result.p1, result.p2, result.pDraw??0);
    const factors = buildFactors(result);
    const advLabel = (adv:Factor["advantage"], t1:CricTeam, t2:CricTeam) =>
      adv==="team1" ? `${t1.name} Advantage` : adv==="team2" ? `${t2.name} Advantage` : "No Clear Advantage";
    const advColor = (adv:Factor["advantage"]) =>
      adv==="none" ? "text-[rgba(235,235,245,0.35)]" : "text-[#0a84ff]";

    const probRows = [
      { team:result.team1, pct:result.p1 },
      { team:result.team2, pct:result.p2 },
      ...(result.pDraw!==undefined ? [{ team:{id:"DRAW",name:"Draw",short:"D",color:"#636366",formats:[]} as CricTeam, pct:result.pDraw }] : []),
    ];

    return (
      <div className="space-y-4 fade-up max-w-2xl mx-auto">
        {/* Result actions */}
        <div className="flex items-center justify-end">
          <Btn variant="ghost" size="sm" onClick={reset}>New Prediction</Btn>
        </div>

        {/* Match header */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge>{result.format}</Badge>
            <span className="text-xs font-mono text-[rgba(235,235,245,0.28)] truncate">{result.venue}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <TeamAvatar team={result.team1} size="sm"/>
              <span className="font-display font-semibold text-sm text-[#f2f2f7] truncate">{result.team1.name}</span>
            </div>
            <span className="text-xs font-mono text-[rgba(235,235,245,0.22)] flex-shrink-0">vs</span>
            <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
              <span className="font-display font-semibold text-sm text-[#f2f2f7] truncate">{result.team2.name}</span>
              <TeamAvatar team={result.team2} size="sm"/>
            </div>
          </div>
          {(result.pitchType||result.tossWinner) && (
            <div className="flex gap-3 mt-3 flex-wrap">
              {result.pitchType && <Badge>{result.pitchType}</Badge>}
              {result.tossWinner && <Badge>Toss: {result.tossWinner} — {result.tossDecision||"—"}</Badge>}
            </div>
          )}
        </Card>

        {/* Predicted winner */}
        <Card className="p-6 md:p-7 overflow-hidden relative" style={{ borderColor:`${result.winner.color}30`, boxShadow:`0 20px 70px ${result.winner.color}12` }}>
          <SectionLabel>Predicted Winner</SectionLabel>
          <div className="flex items-center gap-4 mb-6">
            <TeamAvatar team={result.winner} size="lg"/>
            <div>
              <p className="font-display font-bold text-2xl md:text-3xl text-[#f2f2f7] tracking-tight">{result.winner.name}</p>
              <p className="text-xs text-[rgba(235,235,245,0.38)] mt-0.5">Pre-match prediction</p>
            </div>
          </div>

          {/* Probability bars */}
          <div className="space-y-3">
            {probRows.map(({ team, pct }) => (
              <div key={team.id} className="flex items-center gap-3">
                <span className="text-xs font-mono text-[rgba(235,235,245,0.50)] w-32 flex-shrink-0 truncate">{team.name}</span>
                <div className="flex-1 h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                  <div className="h-full rounded-full bar-grow" style={{
                    width:`${(pct/maxP)*100}%`,
                    background: team.id==="DRAW" ? "rgba(235,235,245,0.22)"
                      : pct===maxP ? "#0a84ff"
                      : `${team.color==="000000"?"#6e6e73":team.color}88`,
                  }}/>
                </div>
                <span className="text-sm font-mono font-semibold text-[#f2f2f7] w-12 text-right flex-shrink-0">{pct}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Why this prediction */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <p className="font-display font-semibold text-[#f2f2f7]">Why this prediction?</p>
            <Badge color="blue">Key Factors</Badge>
          </div>
          <div className="space-y-2.5">
            {factors.map(f => (
              <div key={f.label} className="flex items-start gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
                <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] flex items-center justify-center flex-shrink-0 text-[rgba(235,235,245,0.45)]">{f.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <p className="text-xs font-mono font-semibold text-[rgba(235,235,245,0.65)] uppercase tracking-wider">{f.label}</p>
                    <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider flex-shrink-0 ${advColor(f.advantage)}`}>
                      {advLabel(f.advantage, result.team1, result.team2)}
                    </span>
                  </div>
                  <p className="text-xs text-[rgba(235,235,245,0.45)] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[rgba(235,235,245,0.22)] mt-3">
            Factor details are based only on values returned by the prediction backend. Pitch type remains contextual and is not directly used by the current model.
          </p>
        </Card>

        {/* Match context */}
        <Card className="p-5">
          <SectionLabel>Match Context</SectionLabel>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k:"Format", v:result.format },
              { k:"Venue",  v:result.venue.split(",")[0] },
              ...(result.pitchType ? [{ k:"Pitch Type", v:result.pitchType }] : []),
              ...(result.tossWinner ? [{ k:"Toss Winner", v:result.tossWinner },{ k:"Toss Decision", v:result.tossDecision||"—" }] : []),
            ].map(item => (
              <div key={item.k} className="bg-[rgba(255,255,255,0.03)] rounded-xl p-3">
                <p className="text-[10px] font-mono text-[rgba(235,235,245,0.28)] uppercase mb-1">{item.k}</p>
                <p className="text-sm text-[rgba(235,235,245,0.70)] font-medium truncate">{item.v}</p>
              </div>
            ))}
          </div>
          {result.pitchType && (
            <p className="flex items-start gap-1.5 mt-3 text-[10px] text-[rgba(235,235,245,0.28)] leading-relaxed">
              <span className="flex-shrink-0 mt-0.5">{Ic.info}</span>
              Pitch type is provided as match context and is not directly used by the current prediction model.
            </p>
          )}
        </Card>

        <Btn full variant="secondary" size="lg" onClick={reset}>New Prediction</Btn>
      </div>
    );
  }

  // Form
  const tossOptions = [form.team1?.name, form.team2?.name, "Not Available"].filter(Boolean) as string[];

  return (
    <div className="space-y-5 fade-up max-w-3xl mx-auto">
      <div>
        <h2 className="font-display font-bold text-[#f2f2f7] text-xl mb-1">Match Predictor</h2>
        <p className="text-sm text-[rgba(235,235,245,0.38)]">Pre-match prediction — configure the match details below.</p>
      </div>

      {/* Format */}
      <Card className="p-5 border-[rgba(10,132,255,0.10)]">
        <SectionLabel>Match Format</SectionLabel>
        <div className="flex gap-2 flex-wrap">
          {FORMAT_LIST.map(f => <FmtPill key={f} fmt={f} active={form.format===f} onClick={() => changeFormat(f)}/>)}
        </div>
      </Card>

      {/* Teams + Venue */}
      <Card className="p-5 space-y-4">
        <SectionLabel>Match Details</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-4">
          <TeamSelector label="Team 1" selected={form.team1} teams={teams} exclude={form.team2?.id} onSelect={t=>set("team1",t)} format={form.format}/>
          <TeamSelector label="Team 2" selected={form.team2} teams={teams} exclude={form.team1?.id} onSelect={t=>set("team2",t)} format={form.format}/>
        </div>
        <DropSelect label="Venue" value={form.venue} options={ALL_VENUES} onSelect={v=>set("venue",v)} placeholder="Search venue…"/>
        <DropSelect label="Pitch Type" value={form.pitch} options={PITCH_TYPES} onSelect={v=>set("pitch",v)} placeholder="Select pitch type (optional)"
          note="Pitch type is contextual and not directly used by the current model."/>
      </Card>

      {/* Toss */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between"><SectionLabel>Toss Information</SectionLabel><Badge>Optional</Badge></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <DropSelect label="Toss Winner" value={form.tossWinner} options={tossOptions} onSelect={v=>set("tossWinner",v)} placeholder="Select toss winner"/>
          <DropSelect label="Toss Decision" value={form.tossDecision} options={["Bat","Field","Not Available"]} onSelect={v=>set("tossDecision",v)} placeholder="Bat or Field"/>
        </div>
      </Card>

      <Btn full size="lg" onClick={submit} disabled={!form.team1||!form.team2||!form.venue}>
        {Ic.predictor} Predict Match
      </Btn>
    </div>
  );
}

// ─── Analytics page ───────────────────────────────────────────────────────────
function Analytics() {
  const [fmt, setFmt] = useState<Format>("IPL");

  const iplData = IPL_TEAMS.map(t => ({
    name:t.short,
    winRate: fmt==="IPL" ? +(([0.582,0.594,0.491,0.527,0.488,0.463,0.506,0.512,0.625,0.565][IPL_TEAMS.indexOf(t)]??0.5)*100).toFixed(0) : 50,
    fill: t.color==="000000"?"#6e6e73":t.color,
  }));

  const intlSample = TEST_TEAMS.slice(0,8).map((t,i) => ({
    name:t.short,
    winRate: [62,58,56,55,54,52,45,43][i],
    fill: t.color==="#000000"?"#6e6e73":t.color,
  }));

  const chartData = (fmt==="IPL") ? iplData : intlSample;

  const h2hTeams = fmt==="IPL" ? IPL_TEAMS.slice(0,6) : TEST_TEAMS.slice(0,6);

  return (
    <div className="space-y-6 fade-up">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display font-bold text-[#f2f2f7] text-xl mb-1">Analytics</h2>
          <p className="text-sm text-[rgba(235,235,245,0.38)]">Cricket performance insights across formats.</p>
        </div>
        <Segment value={fmt} options={FORMAT_LIST.map(f=>({value:f,label:f}))} onChange={v=>setFmt(v as Format)}/>
      </div>

      {/* Team win rates */}
      <Card className="p-5">
        <SectionLabel>Team Win Rate — {FORMAT_META[fmt].fullName}</SectionLabel>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} barSize={18} margin={{top:4,right:4,bottom:0,left:-16}}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
            <XAxis dataKey="name" tick={CHART_STYLE} axisLine={false} tickLine={false}/>
            <YAxis tick={CHART_STYLE} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
            <Tooltip contentStyle={{ background:"#16162a", border:"1px solid rgba(255,255,255,0.10)", borderRadius:12, fontFamily:"Outfit,Inter,sans-serif", fontSize:11 }}
              labelStyle={{ color:"rgba(235,235,245,0.65)" }} itemStyle={{ color:"rgba(235,235,245,0.80)" }}
              formatter={(v:unknown) => [`${v}%`,"Win Rate"]}/>
            <Bar dataKey="winRate" radius={[4,4,0,0]}>
              {chartData.map((d,i) => <Cell key={i} fill={d.fill+"bb"}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Venue insights */}
      <Card className="p-5">
        <SectionLabel>Venue Insights</SectionLabel>
        <div className="py-8 text-center">
          <p className="text-sm text-[rgba(235,235,245,0.28)] font-mono">Venue data loads from backend</p>
          <p className="text-xs text-[rgba(235,235,245,0.18)] mt-1">Connect GET /analytics?format={fmt} to populate venue-specific win rates</p>
        </div>
      </Card>

      {/* Head to Head */}
      <Card className="p-5">
        <SectionLabel>Head-to-Head Overview</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {h2hTeams.map(t => (
            <div key={t.id} className="flex items-center gap-2.5 p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
              <TeamAvatar team={t} size="xs"/>
              <div>
                <p className="text-xs font-display font-semibold text-[rgba(235,235,245,0.70)]">{t.name}</p>
                <p className="text-[10px] font-mono text-[rgba(235,235,245,0.28)]">{t.short}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-[rgba(235,235,245,0.22)] mt-3">Select two teams on the Predict page to see head-to-head breakdown in results.</p>
      </Card>
    </div>
  );
}

// ─── Team Intelligence page ───────────────────────────────────────────────────
function TeamIntelligence({ navigate }: { navigate:(p:Page,fmt?:Format)=>void }) {
  const [fmt, setFmt] = useState<Format>("IPL");
  const [selected, setSelected] = useState<CricTeam|null>(null);
  const teams = teamsForFormat(fmt);

  const mockStats = (t:CricTeam) => {
    const seed = t.id.charCodeAt(0)+t.id.charCodeAt(1||0);
    return {
      matches: 80 + (seed%120),
      wins:    40 + (seed%60),
      winRate: (50 + (seed%25)).toFixed(0),
      recentForm: (["W","L","W","W","L"] as const).map((_,i) => (seed+i)%3===0 ? "L" : "W"),
      avgRuns: 155 + (seed%30),
      avgWkts: 6.2 + ((seed%8)/10),
      runRate: 8.1 + ((seed%6)/10),
    };
  };

  const radarData = (t:CricTeam) => {
    const s = mockStats(t);
    return [
      { m:"Win Rate",  v: parseInt(s.winRate) },
      { m:"Form",      v: (s.recentForm.filter(r=>r==="W").length/5)*100 },
      { m:"Batting",   v: ((s.avgRuns-150)/30)*100 },
      { m:"Bowling",   v: ((9-s.avgWkts)/3)*100 },
      { m:"Run Rate",  v: ((s.runRate-8)/0.8)*100 },
    ];
  };

  if (selected) {
    const s = mockStats(selected);
    const safeColor = selected.color==="000000"?"#6e6e73":selected.color;
    return (
      <div className="space-y-5 fade-up">
        <button onClick={() => setSelected(null)} className="text-xs font-mono text-[rgba(235,235,245,0.38)] hover:text-[rgba(235,235,245,0.70)] transition-colors">← Back to Teams</button>
        <div className="flex items-center gap-4">
          <TeamAvatar team={selected} size="lg"/>
          <div>
            <p className="text-[10px] font-mono tracking-widest mb-0.5" style={{ color:safeColor }}>Team Intelligence</p>
            <h2 className="font-display font-bold text-2xl text-[#f2f2f7]">{selected.name}</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { k:"Matches",  v:s.matches.toString() },
            { k:"Wins",     v:s.wins.toString() },
            { k:"Win Rate", v:`${s.winRate}%` },
            { k:"Run Rate", v:s.runRate.toFixed(2) },
          ].map(m => (
            <Card key={m.k} className="p-4">
              <SectionLabel>{m.k}</SectionLabel>
              <p className="font-display font-bold text-xl text-[#f2f2f7]">{m.v}</p>
            </Card>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="p-5">
            <SectionLabel>Recent Form</SectionLabel>
            <div className="flex gap-2">
              {s.recentForm.map((r,i) => (
                <div key={i} className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-display font-bold"
                  style={{ background:r==="W"?"rgba(48,209,88,0.14)":"rgba(255,69,58,0.10)", border:`1px solid ${r==="W"?"rgba(48,209,88,0.28)":"rgba(255,69,58,0.18)"}`, color:r==="W"?"#30d158":"#ff453a" }}>
                  {r}
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2.5">
              {[
                { k:"Avg Runs",    v:`${s.avgRuns}`, bar:(s.avgRuns-150)/30, c:"#0a84ff" },
                { k:"Avg Wickets", v:`${s.avgWkts.toFixed(1)}`, bar:((9-s.avgWkts)/3), c:"#30d158" },
              ].map(m => (
                <div key={m.k}>
                  <div className="flex justify-between text-xs font-mono text-[rgba(235,235,245,0.38)] mb-1"><span>{m.k}</span><span style={{color:m.c}}>{m.v}</span></div>
                  <div className="h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <div className="h-full bar-grow rounded-full" style={{ width:`${Math.min(100,m.bar*100)}%`, background:m.c }}/>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <SectionLabel>Performance Profile</SectionLabel>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={radarData(selected)}>
                <PolarGrid stroke="rgba(255,255,255,0.06)"/>
                <PolarAngleAxis dataKey="m" tick={{ ...CHART_STYLE, fontSize:10 }}/>
                <Radar dataKey="v" stroke={safeColor} fill={safeColor} fillOpacity={0.10} strokeWidth={1.5}/>
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </div>
        <Card className="p-5">
          <SectionLabel>Venue Performance</SectionLabel>
          <p className="text-sm text-[rgba(235,235,245,0.28)]">Venue-specific data loads from backend — connect GET /team-stats/{selected.id}</p>
        </Card>
        <Card className="p-5">
          <SectionLabel>Head-to-Head</SectionLabel>
          <p className="text-sm text-[rgba(235,235,245,0.28)]">Select an opponent on the Predict page to compare matchup history in the result screen.</p>
          <Btn className="mt-3" size="sm" variant="secondary" onClick={() => navigate("predictor")}>Go to Match Predictor →</Btn>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-5 fade-up">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display font-bold text-[#f2f2f7] text-xl mb-1">Team Intelligence</h2>
          <p className="text-sm text-[rgba(235,235,245,0.38)]">Select a team to view performance data.</p>
        </div>
        <Segment value={fmt} options={FORMAT_LIST.map(f=>({value:f,label:f}))} onChange={v=>{setFmt(v as Format);setSelected(null);}}/>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {teams.map(t => {
          const s = mockStats(t);
          const safeColor = t.color==="000000"?"#6e6e73":t.color;
          return (
            <Card key={t.id} className="p-4 cursor-pointer hover:bg-[rgba(255,255,255,0.07)] transition-all group" onClick={() => setSelected(t)}>
              <div className="flex items-center gap-3 mb-3">
                <TeamAvatar team={t} size="sm"/>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sm text-[#f2f2f7] truncate">{t.name}</p>
                  <div className="flex gap-1 mt-1">
                    {s.recentForm.map((r,i) => (
                      <div key={i} className="w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] font-bold"
                        style={{ background:r==="W"?"rgba(48,209,88,0.18)":"rgba(255,69,58,0.10)", color:r==="W"?"#30d158":"#ff453a" }}>{r}</div>
                    ))}
                  </div>
                </div>
                <span className="text-[rgba(235,235,245,0.18)] group-hover:text-[rgba(235,235,245,0.50)] transition-colors">{Ic.chevron}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { k:"Win Rate", v:`${s.winRate}%` },
                  { k:"Avg Runs", v:s.avgRuns.toString() },
                  { k:"Run Rate", v:s.runRate.toFixed(1) },
                ].map(m => (
                  <div key={m.k} className="bg-[rgba(255,255,255,0.03)] rounded-lg p-2 text-center">
                    <p className="text-[9px] font-mono text-[rgba(235,235,245,0.25)] uppercase">{m.k}</p>
                    <p className="text-xs font-display font-semibold mt-0.5" style={{ color:safeColor }}>{m.v}</p>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Prediction History page ───────────────────────────────────────────────────
function PredictionHistory({ records, onClear, toast }: {
  records:PredictionRecord[]; onClear:()=>void; toast:(m:string,t:Toast["type"])=>void;
}) {
  const [fmt, setFmt] = useState<Format|"ALL">("ALL");
  const [q, setQ] = useState("");

  const filtered = [...records]
    .filter(r => fmt==="ALL" || r.format===fmt)
    .filter(r => !q || r.team1.name.toLowerCase().includes(q.toLowerCase()) || r.team2.name.toLowerCase().includes(q.toLowerCase()) || r.venue.toLowerCase().includes(q.toLowerCase()))
    .reverse();

  return (
    <div className="space-y-5 fade-up">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display font-bold text-[#f2f2f7] text-2xl mb-1">Prediction History</h2>
          <p className="text-sm text-[rgba(235,235,245,0.38)]">{records.length} prediction{records.length!==1?"s":""} saved.</p>
        </div>
        {records.length>0 && (
          <Btn variant="danger" size="sm" onClick={() => { onClear(); toast("History cleared","info"); }}>
            {Ic.trash} Clear all
          </Btn>
        )}
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 glass rounded-xl px-3 py-2">
          <span className="text-[rgba(235,235,245,0.28)]">{Ic.search}</span>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search teams or venue…"
            className="text-sm bg-transparent text-[#f2f2f7] placeholder-[rgba(235,235,245,0.22)] outline-none w-44"/>
        </div>
        <Segment value={fmt} options={[{value:"ALL",label:"ALL"},...FORMAT_LIST.map(f=>({value:f,label:f}))]} onChange={v=>setFmt(v as Format|"ALL")}/>
      </div>

      {filtered.length===0 ? (
        <Card className="p-16 text-center">
          <p className="font-display font-semibold text-[rgba(235,235,245,0.20)] text-base mb-2">No predictions yet</p>
          <p className="text-sm text-[rgba(235,235,245,0.15)]">Run your first prediction to see results here.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map(r => (
            <Card key={r.id} className="px-4 py-3.5 hover:bg-[rgba(255,255,255,0.06)] transition-colors">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge>{r.format}</Badge>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <TeamAvatar team={r.team1} size="xs"/>
                  <span className="text-xs font-mono text-[rgba(235,235,245,0.45)]">{r.p1}%</span>
                  <span className="text-[10px] text-[rgba(235,235,245,0.18)] font-mono">v</span>
                  <span className="text-xs font-mono text-[rgba(235,235,245,0.45)]">{r.p2}%</span>
                  <TeamAvatar team={r.team2} size="xs"/>
                  {r.pDraw!==undefined && <span className="text-[10px] font-mono text-[rgba(235,235,245,0.28)]">Draw {r.pDraw}%</span>}
                </div>
                <p className="text-xs text-[rgba(235,235,245,0.30)] hidden sm:block truncate max-w-36">{r.venue.split(",")[0]}</p>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] font-mono text-[rgba(235,235,245,0.22)]">Winner</span>
                  <div className="px-2 py-0.5 rounded-lg border text-xs font-mono font-semibold"
                    style={{ borderColor:`${r.winner.color}28`, background:`${r.winner.color}14`, color:r.winner.color==="000000"?"#f2f2f7":r.winner.color }}>
                    {r.winner.short}
                  </div>
                </div>
                <p className="text-[10px] font-mono text-[rgba(235,235,245,0.18)] flex-shrink-0">
                  {r.date.toLocaleDateString()} {r.date.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── About Model page ─────────────────────────────────────────────────────────
function AboutModel() {
  const factors = [
    "Team Strength (historical win rate & Elo rating)",
    "Win Rate across all matches in the dataset",
    "Recent Form (last N match results)",
    "Average Runs per innings",
    "Average Wickets per innings",
    "Run Rate (scoring rate)",
    "Head-to-Head performance between the two teams",
    "Venue Performance (historical results at the venue)",
    "Toss Information (winner and decision)",
  ];
  const tech = [
    { k:"Language", v:"Python" },
    { k:"ML Framework", v:"scikit-learn" },
    { k:"TEST Model", v:"Logistic Regression (3-class)" },
    { k:"ODI Model", v:"Random Forest" },
    { k:"T20 Model", v:"Random Forest" },
    { k:"IPL Model", v:"Random Forest" },
    { k:"Backend API", v:"FastAPI" },
    { k:"Frontend", v:"React + Vite" },
  ];
  return (
    <div className="space-y-6 fade-up max-w-2xl mx-auto">
      <div>
        <h2 className="font-display font-bold text-[#f2f2f7] text-2xl mb-1">About CricVision</h2>
        <p className="text-sm text-[rgba(235,235,245,0.40)]">How CricVision Makes Predictions</p>
      </div>

      <Card className="p-5">
        <SectionLabel>What is CricVision?</SectionLabel>
        <p className="text-sm text-[rgba(235,235,245,0.55)] leading-relaxed">
          CricVision is a cricket intelligence platform that uses trained machine-learning models and historical match data to generate pre-match outcome predictions across Test, ODI, T20 and IPL cricket.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          {FORMAT_LIST.map(f => (
            <div key={f} className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded-xl p-3 text-center">
              <p className="font-mono font-bold text-sm text-[#f2f2f7]">{f}</p>
              <p className="text-[10px] text-[rgba(235,235,245,0.30)] mt-0.5">{FORMAT_META[f].fullName}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <SectionLabel>Prediction Factors</SectionLabel>
        <p className="text-xs text-[rgba(235,235,245,0.38)] mb-3 leading-relaxed">
          CricVision considers the following factors when generating a prediction. Factors are weighted differently by format.
        </p>
        <div className="space-y-2">
          {factors.map((f,i) => (
            <div key={f} className="flex items-start gap-2.5 py-2 border-b border-[rgba(255,255,255,0.05)] last:border-0">
              <span className="text-[10px] font-mono text-[rgba(235,235,245,0.25)] w-5 flex-shrink-0 mt-0.5">{i+1}.</span>
              <span className="text-sm text-[rgba(235,235,245,0.60)]">{f}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 border border-[rgba(10,132,255,0.12)]">
        <SectionLabel>Test Match — Three Outcomes</SectionLabel>
        <p className="text-sm text-[rgba(235,235,245,0.55)] mb-4 leading-relaxed">
          Test cricket is the only format where CricVision predicts three possible outcomes.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {["Team 1 Win","Draw","Team 2 Win"].map(o => (
            <div key={o} className="bg-[rgba(10,132,255,0.07)] border border-[rgba(10,132,255,0.14)] rounded-xl p-3 text-center">
              <p className="text-xs font-mono font-semibold text-[#0a84ff]">{o}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Technical section */}
      <Card className="p-5">
        <SectionLabel>Model Details</SectionLabel>
        <p className="text-xs text-[rgba(235,235,245,0.35)] mb-4">Technical information about the underlying prediction models.</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.06)]">
            <p className="text-[10px] font-mono text-[rgba(235,235,245,0.30)] uppercase tracking-wider mb-2">Format Models</p>
            <div className="space-y-2.5">
              {[
                { k:"TEST", v:"Logistic Regression — 3 outcomes" },
                { k:"ODI", v:"Random Forest" },
                { k:"T20", v:"Random Forest" },
                { k:"IPL", v:"Random Forest" },
              ].map(m=>(
                <div key={m.k} className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-mono text-[rgba(235,235,245,0.30)]">{m.k}</span>
                  <span className="text-xs text-[rgba(235,235,245,0.65)] text-right">{m.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.06)]">
            <p className="text-[10px] font-mono text-[rgba(235,235,245,0.25)] uppercase tracking-wider mb-2">Prediction Architecture</p>
            <p className="text-xs text-[rgba(235,235,245,0.40)] leading-relaxed">
              React + Vite sends the selected pre-match inputs to FastAPI. FastAPI loads the corresponding trained model and returns the prediction and probabilities to the CricVision interface.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {tech.map(t=>(
            <div key={t.k} className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.05)] last:border-0 sm:last:border-0">
              <span className="text-xs font-mono text-[rgba(235,235,245,0.30)]">{t.k}</span>
              <span className="text-xs text-[rgba(235,235,245,0.60)]">{t.v}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex items-start gap-2 glass rounded-xl px-4 py-3 border border-[rgba(255,255,255,0.05)]">
        <span className="text-[rgba(235,235,245,0.30)] flex-shrink-0 mt-0.5">{Ic.info}</span>
        <p className="text-[10px] text-[rgba(235,235,245,0.30)] leading-relaxed">
          Pitch type is currently a contextual input and is not directly used by the prediction model. CricVision generates probabilistic pre-match estimates — not guaranteed match outcomes.
        </p>
      </div>
    </div>
  );
}

// ─── App shell ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("overview");
  const [predFmt, setPredFmt] = useState<Format>("IPL");
  const [history, setHistory] = useState<PredictionRecord[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const tid = useRef(0);

  const toast = useCallback((msg:string, type:Toast["type"]) => {
    const id = ++tid.current;
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),4000);
  },[]);

  const navigate = useCallback((p:Page, fmt?:Format) => {
    setPage(p);
    if (fmt) setPredFmt(fmt);
    setMobileOpen(false);
  },[]);

  const currentLabel = NAV.find(n=>n.id===page)?.label ?? "";

  const renderPage = () => {
    switch (page) {
      case "overview":  return <Overview navigate={navigate}/>;
      case "predictor": return <MatchPredictor key={predFmt} defaultFormat={predFmt} onSaveHistory={r=>setHistory(p=>[...p,r])} toast={toast}/>;
      case "analytics": return <Analytics/>;
      case "teams":     return <TeamIntelligence navigate={navigate}/>;
      case "history":   return <PredictionHistory records={history} onClear={()=>setHistory([])} toast={toast}/>;
      case "about":     return <AboutModel/>;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#08080c]">
      <Sidebar page={page} onNav={navigate} histCount={history.length}/>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.55)]" onClick={()=>setMobileOpen(false)}/>
          <aside className="relative z-10 w-64 h-full glass-panel flex flex-col slide-right">
            <div className="px-5 py-5 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
              <Logo/>
              <button onClick={()=>setMobileOpen(false)} className="text-[rgba(235,235,245,0.38)]">{Ic.x}</button>
            </div>
            <nav className="p-3 space-y-0.5 flex-1">
              {NAV.map(n=>(
                <button key={n.id} onClick={()=>navigate(n.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-colors text-left ${
                    page===n.id?"bg-[rgba(10,132,255,0.13)] text-[#f2f2f7]":"text-[rgba(235,235,245,0.42)] hover:bg-[rgba(255,255,255,0.05)]"
                  }`}>
                  <span className={page===n.id?"text-[#0a84ff]":""}>{n.icon}</span>
                  <span className="font-display font-medium">{n.label}</span>
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader page={page} onNav={navigate} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>

        {/* Desktop breadcrumb */}
        <div className="hidden md:flex items-center justify-between px-8 py-3 border-b border-[rgba(255,255,255,0.055)] bg-[rgba(8,8,12,0.72)] backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-[rgba(235,235,245,0.25)]">CricVision</span>
            <span className="text-[rgba(235,235,245,0.15)]">/</span>
            <span className="text-[rgba(235,235,245,0.55)]">{currentLabel}</span>
          </div>
        </div>

        <main className="flex-1 px-5 py-7 md:px-8 md:py-9 max-w-5xl w-full mx-auto">
          {renderPage()}
        </main>

        <footer className="border-t border-[rgba(255,255,255,0.05)] px-8 py-4 flex items-center justify-between flex-wrap gap-3">
          <Logo/>
          <p className="text-[10px] font-mono text-[rgba(235,235,245,0.18)]">TEST · ODI · T20 · IPL</p>
          <p className="text-[10px] font-mono text-[rgba(235,235,245,0.15)]">Cricket Intelligence &amp; Match Prediction</p>
        </footer>
      </div>

      <Toasts list={toasts} remove={id=>setToasts(p=>p.filter(t=>t.id!==id))}/>
    </div>
  );
}
