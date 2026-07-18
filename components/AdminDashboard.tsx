"use client";

import { useState } from "react";

const interests = [
  ["Insurance and coverage", 34],
  ["Finding a prosthetist", 27],
  ["Peer support", 19],
  ["Financial help", 12],
  ["Caregiver guidance", 8]
];

const audienceMix = [
  ["New to limb loss", "48%"],
  ["Supporting someone", "29%"],
  ["Clinicians and advocates", "14%"],
  ["Other visitors", "9%"]
];

export function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasError, setHasError] = useState(false);

  function unlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== "1234") {
      setHasError(true);
      return;
    }
    setHasError(false);
    setPassword("");
    setIsUnlocked(true);
  }

  if (!isUnlocked) {
    return (
      <main className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-ink">Admin dashboard</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Preview the synthetic analytics layout used for product planning.</p>
        <form className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-soft" onSubmit={unlock}>
          <label className="block text-sm font-semibold text-slate-700" htmlFor="admin-password">
            Passcode
            <input autoFocus className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" id="admin-password" onChange={(event) => { setPassword(event.target.value); setHasError(false); }} type="password" value={password} />
          </label>
          {hasError ? <p className="mt-2 text-xs text-red-700">That passcode did not match.</p> : null}
          <button className="mt-4 rounded-md bg-spruce px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90" type="submit">Open dashboard</button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-spruce">Admin settings</p>
          <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">Navigator activity</h1>
        </div>
        <p className="text-sm text-slate-600">Illustrative snapshot</p>
      </div>

      <aside className="mt-6 rounded-lg border border-skysoft bg-skysoft/35 px-4 py-3 text-sm leading-6 text-slate-700">
        <strong className="text-ink">Demo data only.</strong> Every number and chart on this page is fictional. This prototype does not collect chat transcripts, visitor demographics, or identifying information.
      </aside>

      <section aria-label="Illustrative activity summary" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Guidance requests" value="184" detail="Illustrative monthly total" />
        <Stat label="Saved resources" value="46" detail="Illustrative browser saves" />
        <Stat label="Next-step clarity" value="72%" detail="Illustrative helpfulness signal" />
        <Stat label="Typical session" value="3m 18s" detail="Illustrative time on task" />
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border-t border-slate-200 pt-5">
          <h2 className="text-xl font-bold text-ink">What people are exploring</h2>
          <p className="mt-2 text-sm text-slate-600">Sample topic mix for dashboard design review.</p>
          <div className="mt-6 space-y-5">
            {interests.map(([label, value]) => (
              <div key={label}>
                <div className="flex items-center justify-between gap-4 text-sm"><span className="font-semibold text-ink">{label}</span><span className="text-slate-600">{value}%</span></div>
                <div aria-hidden="true" className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-spruce" style={{ width: `${value}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-5">
          <h2 className="text-xl font-bold text-ink">Audience paths</h2>
          <p className="mt-2 text-sm text-slate-600">Fictional, non-identifying visitor roles.</p>
          <div className="mt-6 flex items-center gap-6">
            <div aria-label="Illustrative audience paths pie chart" className="h-40 w-40 shrink-0 rounded-full border border-white shadow-sm" style={{ background: "conic-gradient(rgb(var(--color-spruce)) 0 48%, rgb(var(--color-clay)) 48% 77%, #9ca3af 77% 91%, #d1d5db 91% 100%)" }} />
            <ul className="space-y-3 text-sm">
              {audienceMix.map(([label, value]) => <li className="flex justify-between gap-4" key={label}><span className="text-slate-600">{label}</span><strong className="text-ink">{value}</strong></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 border-t border-slate-200 pt-6 md:grid-cols-3">
        <Setting label="Resource review" value="7 current" detail="All seeded links have an illustrative review date." />
        <Setting label="Sensitive data" value="Not retained" detail="No names, IDs, demographics, or full transcripts in this prototype." />
        <Setting label="Local finder" value="Planned" detail="Add only after a vetted, maintainable state-level resource source is ready." />
      </section>
    </main>
  );
}

function Stat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="border-t border-slate-200 pt-4"><p className="text-sm text-slate-600">{label}</p><p className="mt-2 text-3xl font-bold text-ink">{value}</p><p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p></div>;
}

function Setting({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div><p className="text-sm font-semibold text-slate-600">{label}</p><p className="mt-2 text-lg font-bold text-ink">{value}</p><p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p></div>;
}
