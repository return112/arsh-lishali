import React, { useEffect, useState } from "react";
import { useBirthday } from "../context/BirthdayContext";

function fmt(n) {
  return Math.floor(n).toLocaleString();
}

const CARDS = [
  {
    key: "heartbeats",
    icon: "❤️",
    label: "Heartbeats",
    calc: (secs) => secs * 1.2,
  },
  {
    key: "breaths",
    icon: "🌬️",
    label: "Breaths Taken",
    calc: (secs) => secs * 0.267,
  },
  {
    key: "hours",
    icon: "⏰",
    label: "Hours Lived",
    calc: (secs) => secs / 3600,
  },
  {
    key: "days",
    icon: "📅",
    label: "Days on Earth",
    calc: (secs) => secs / 86400,
  },
  {
    key: "sleep",
    icon: "😴",
    label: "Hours of Sleep",
    calc: (secs) => (secs / 3600) * 0.33,
  },
  {
    key: "laughs",
    icon: "😂",
    label: "Times Laughed",
    calc: (secs) => (secs / 86400) * 15,
  },
];

export default function Stats() {
  const { personDOB } = useBirthday();
  const [values, setValues] = useState({});

  useEffect(() => {
    if (!personDOB) return;
    function update() {
      const born = new Date(personDOB).getTime();
      const secs = (Date.now() - born) / 1000;
      const next = {};
      CARDS.forEach((c) => (next[c.key] = fmt(c.calc(secs))));
      setValues(next);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [personDOB]);

  return (
    <section
      id="statsSection"
      className="section flex flex-col items-center gap-10 px-6 py-20"
    >
      <div className="text-center">
        <span className="mb-4 inline-block rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(255,215,0,0.12)] px-[18px] py-1.5 text-[0.78rem] font-medium tracking-[0.1em] text-(--gold) uppercase">
          ⏳ Your Life So Far
        </span>
        <h2 className="mb-3.5 font-['Playfair_Display',serif] text-[clamp(2.2rem,5vw,3.5rem)] font-black leading-[1.1]">
          Age in{" "}
          <em className="bg-linear-to-br from-(--gold) to-(--rose) bg-clip-text text-transparent not-italic">
            Fun Stats
          </em>
        </h2>
        <p className="text-base text-(--text-muted)">
          Live counting since the moment you were born
        </p>
      </div>

      <div className="grid w-full max-w-[700px] grid-cols-3 gap-4 sm:grid-cols-2">
        {CARDS.map((c) => (
          <div
            key={c.key}
            className="glass rounded-[18px] px-4 py-6 text-center transition hover:-translate-y-1.5"
          >
            <div className="mb-2.5 text-[2rem]">{c.icon}</div>
            <div className="mb-1.5 wrap-break-word font-['Playfair_Display',serif] text-[clamp(1.1rem,3vw,1.5rem)] leading-tight font-black text-(--gold)">
              {values[c.key] ?? "0"}
            </div>
            <div className="text-xs tracking-wider text-(--text-muted)">
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
