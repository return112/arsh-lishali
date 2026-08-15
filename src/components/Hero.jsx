import React, { useState, useEffect, useRef } from "react";
import { useBirthday } from "../context/BirthdayContext";
import { formatDate } from "../utils/helpers";
import { launchConfetti, spawnEmojiBurst } from "../utils/confetti";
import FloatingEmojis from "./FloatingEmojis";

function useNextBirthdayCountdown(dobStr) {
  const [label, setLabel] = useState("…");

  useEffect(() => {
    if (!dobStr) return;
    function update() {
      const now = new Date();
      const dob = new Date(dobStr);
      let next = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
      if (next <= now) next.setFullYear(now.getFullYear() + 1);

      const diff = next - now;
      const days = Math.floor(diff / 86400000);
      const hrs = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);

      if (days === 0 && hrs === 0 && mins === 0) setLabel("🎉 TODAY!");
      else if (days === 0) setLabel(`${hrs}h ${mins}m ${secs}s`);
      else setLabel(`${days}d ${hrs}h ${mins}m`);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [dobStr]);

  return label;
}

export default function Hero({ onViewGallery }) {
  const { personName, personDOB, personAge } = useBirthday();
  const countdown = useNextBirthdayCountdown(personDOB);
  const [popping, setPopping] = useState(false);

  function triggerCelebrate() {
    launchConfetti();
    setPopping(true);
    setTimeout(() => setPopping(false), 600);
    spawnEmojiBurst();
  }

  return (
    <section
      id="home"
      className="section relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
    >
      <div className="relative z-10 w-full max-w-[700px]">
        <div className="mb-7 flex flex-col items-center gap-0.5 leading-[1.1]">
          <span className="font-['Dancing_Script',cursive] text-[clamp(2.2rem,8vw,5rem)] font-bold tracking-[0.03em] text-[var(--gold-light)] [animation:hbFloat_3s_ease-in-out_infinite] [text-shadow:0_0_30px_rgba(255,215,0,0.5),0_0_60px_rgba(255,215,0,0.2)]">
            Happy
          </span>
          <span className="hb-birthday-anim bg-[linear-gradient(135deg,var(--gold)_0%,var(--rose)_50%,#c084fc_100%)] bg-clip-text bg-[length:200%_200%] font-['Dancing_Script',cursive] text-[clamp(2.8rem,11vw,7rem)] font-bold tracking-[0.02em] text-transparent drop-shadow-[0_0_20px_rgba(255,77,141,0.4)]">
            Birthday
          </span>
          <span className="mt-1 animate-[hbFloat_3s_ease-in-out_infinite_0.8s,hbGlow_2.5s_ease-in-out_infinite] font-['Playfair_Display',serif] text-[clamp(1.6rem,6vw,3.2rem)] font-black tracking-wider text-white">
            {personName}
          </span>
        </div>

        <div className="glass mb-6 inline-block animate-pulse rounded-full px-[22px] py-2 text-[0.85rem] tracking-wider text-(--gold)">
          🎂 Turning {personAge} Today!
        </div>

        <p className="mb-2 text-[0.95rem] tracking-wider text-(--text-muted)">
          ✨ Today is all about
        </p>
        <h1 className="hero-name mb-4 wrap-break-word bg-[linear-gradient(135deg,#fff_20%,var(--gold)_50%,var(--rose)_80%)] bg-clip-text font-['Playfair_Display',serif] text-[clamp(3rem,10vw,7rem)] font-black leading-[1.05] text-transparent [animation:shimmer_3s_ease-in-out_infinite] drop-shadow-[0_0_40px_rgba(255,215,0,0.3)]">
          {personName}
        </h1>
        <p className="mb-5 text-[1.1rem] italic text-(--text-muted)">
          Wishing the most magical birthday to someone truly extraordinary.
        </p>

        <div className="glass mb-2 inline-block rounded-full px-6 py-2.5 text-[0.9rem] text-white/80">
          📅 Born: {formatDate(personDOB)}
        </div>
        <br />
        <div className="glass mb-9 inline-flex animate-pulse items-center gap-2.5 rounded-full border border-[rgba(255,77,141,0.3)] bg-[rgba(255,77,141,0.12)] px-5 py-2 text-[0.82rem] text-white">
          <span className="text-(--text-muted)">🎂 Next birthday in</span>
          <span className="font-bold text-(--rose)">{countdown}</span>
        </div>

        <div className="flex flex-wrap justify-center gap-3.5">
          <button
            onClick={triggerCelebrate}
            className={`flex items-center gap-2 rounded-full border-none bg-linear-to-br from-[var(--rose-dark)] via-(--rose) to-[#ff8fb1] px-8 py-[15px] text-base font-medium text-white shadow-[0_4px_30px_rgba(255,77,141,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,77,141,0.55)] ${
              popping
                ? "animate-[celebratePop_0.6s_cubic-bezier(0.34,1.56,0.64,1)_both]"
                : ""
            }`}
          >
            🎊 Celebrate!
          </button>
          <button
            onClick={onViewGallery}
            className="rounded-full border-[1.5px] border-white/30 bg-transparent px-7 py-3.5 text-base text-white transition hover:border-white/60 hover:bg-white/[0.08]"
          >
            View Gallery
          </button>
        </div>
      </div>

      <FloatingEmojis />
    </section>
  );
}
