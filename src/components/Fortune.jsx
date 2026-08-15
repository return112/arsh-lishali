import React, { useState } from "react";
import { fortunes } from "../data/constants";

export default function Fortune() {
  const [swirling, setSwirling] = useState(false);
  const [fortune, setFortune] = useState(null);
  const [symbol, setSymbol] = useState("✨");

  function revealFortune() {
    setSwirling(true);
    setSymbol("🔮");
    setTimeout(() => {
      setSwirling(false);
      const f = fortunes[Math.floor(Math.random() * fortunes.length)];
      setSymbol(f.emoji);
      setFortune(f);
    }, 1200);
  }

  return (
    <section
      id="fortuneSection"
      className="section flex flex-col items-center gap-10 px-6 py-20"
    >
      <div className="text-center">
        <span className="mb-4 inline-block rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(255,215,0,0.12)] px-[18px] py-1.5 text-[0.78rem] font-medium tracking-[0.1em] text-(--gold) uppercase">
          🔮 The Universe Speaks
        </span>
        <h2 className="mb-3.5 font-['Playfair_Display',serif] text-[clamp(2.2rem,5vw,3.5rem)] font-black leading-[1.1]">
          Birthday{" "}
          <em className="bg-linear-to-br from-(--gold) to-(--rose) bg-clip-text text-transparent not-italic">
            Fortune
          </em>
        </h2>
        <p className="text-base text-(--text-muted)">
          Tap the crystal ball to reveal your destiny
        </p>
      </div>

      <div className="flex flex-col items-center gap-7">
        <div
          onClick={revealFortune}
          className="relative flex h-[180px] w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.4),rgba(147,51,234,0.6)_40%,rgba(30,0,80,0.9))] shadow-[0_0_40px_rgba(147,51,234,0.6),0_0_80px_rgba(147,51,234,0.2),inset_0_0_40px_rgba(255,255,255,0.1)] transition hover:scale-[1.06] hover:shadow-[0_0_60px_rgba(147,51,234,0.8),0_0_120px_rgba(147,51,234,0.3)]"
        >
          <div
            className={`absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(192,132,252,0.3)_0%,transparent_70%)] ${
              swirling
                ? "animate-[crystalSwirl_1s_ease-in-out_3]"
                : "animate-[crystalPulse_2s_ease-in-out_infinite]"
            }`}
          />
          <div className="relative z-[2] animate-pulse text-center text-[2.5rem]">
            {symbol}
          </div>
          <div className="absolute top-[18%] left-[22%] h-[25%] w-[35%] -rotate-[30deg] rounded-full bg-white/25" />
        </div>

        {fortune && (
          <div className="glass max-w-[380px] rounded-[20px] px-7 py-6 text-center text-base leading-relaxed text-white">
            <span className="mb-2.5 block text-[2rem]">{fortune.emoji}</span>
            <strong>{fortune.title}</strong>
            <br />
            <span className="text-(--text-muted)">{fortune.text}</span>
            <br />
            <br />
            <small className="text-[0.75rem] text-(--text-muted)">
              Tap again for a new fortune ✨
            </small>
          </div>
        )}
      </div>
    </section>
  );
}
