import React, { useEffect, useRef, useState } from "react";
import { useBirthday } from "../context/BirthdayContext";

const COLORS = [
  "#FF4D8D",
  "#FFD700",
  "#00E5FF",
  "#c084fc",
  "#39FF14",
  "#FF8C00",
];

export default function Candles() {
  const { personAge, personName } = useBirthday();
  const count = Math.min(Math.max(personAge || 5, 1), 10);

  const [outFlags, setOutFlags] = useState(() => Array(count).fill(false));
  const [micHint, setMicHint] = useState("");
  const streamRef = useRef(null);

  // Reset candles whenever the count (age) changes
  useEffect(() => {
    setOutFlags(Array(count).fill(false));
    setMicHint("");
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [count]);

  const candlesOut = outFlags.filter(Boolean).length;
  const allOut = candlesOut === count;

  function blowCandle(i) {
    setOutFlags((prev) => {
      if (prev[i]) return prev;
      const next = [...prev];
      next[i] = true;
      return next;
    });
  }

  function blowFirstUnlit() {
    setOutFlags((prev) => {
      const idx = prev.findIndex((v) => !v);
      if (idx === -1) return prev;
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  }

  function startMicBlow() {
    if (!navigator.mediaDevices) {
      setMicHint("Mic not supported on this browser.");
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        streamRef.current = stream;
        setMicHint("🎤 Listening… blow into your mic!");
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = ctx.createAnalyser();
        const source = ctx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;
        const data = new Uint8Array(analyser.frequencyBinCount);
        let blown = 0;

        function check() {
          analyser.getByteFrequencyData(data);
          const vol = data.reduce((a, b) => a + b, 0) / data.length;
          if (vol > 30) {
            blown++;
            if (blown > 3) {
              blowFirstUnlit();
              blown = 0;
            }
          }
          requestAnimationFrame(check);
        }
        check();
      })
      .catch(() => {
        setMicHint("Mic access denied. Click candles instead!");
      });
  }

  // Stop mic once all candles are out
  useEffect(() => {
    if (allOut && streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, [allOut]);

  return (
    <section
      id="candlesSection"
      className="section flex flex-col items-center gap-10 px-6 py-20"
    >
      <div className="mb-0 text-center">
        <span className="mb-4 inline-block rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(255,215,0,0.12)] px-[18px] py-1.5 text-[0.78rem] font-medium tracking-[0.1em] text-(--gold) uppercase">
          🕯️ Make It Special
        </span>
        <h2 className="mb-3.5 font-['Playfair_Display',serif] text-[clamp(2.2rem,5vw,3.5rem)] font-black leading-[1.1]">
          Blow Out the{" "}
          <em className="bg-linear-to-br from-(--gold) to-(--rose) bg-clip-text text-transparent not-italic">
            Candles
          </em>
        </h2>
        <p className="text-base text-(--text-muted)">
          Click each candle or use your mic to blow!
        </p>
      </div>

      <div className="flex w-full max-w-[420px] flex-col items-center gap-6">
        {/* Cake */}
        <div className="relative flex w-full max-w-[340px] flex-col items-center pt-16">
          <div className="absolute top-0 left-1/2 flex -translate-x-1/2 items-end gap-4">
            {outFlags.map((isOut, i) => {
              const col = COLORS[i % COLORS.length];
              return (
                <div
                  key={i}
                  onClick={() => blowCandle(i)}
                  className="flex cursor-pointer flex-col items-center"
                >
                  <span
                    className={`text-sm transition-opacity duration-400 ${isOut ? "opacity-60" : "opacity-0"}`}
                  >
                    💨
                  </span>
                  <span
                    className={`mb-[-2px] h-[26px] w-[18px] text-center text-[22px] leading-none transition-opacity duration-400 ${
                      isOut
                        ? "opacity-0"
                        : "animate-[flicker_0.3s_ease-in-out_infinite_alternate]"
                    }`}
                  >
                    🔥
                  </span>
                  <div
                    className="h-11 w-3.5 rounded"
                    style={{
                      background: `linear-gradient(180deg, ${col}aa, ${col})`,
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="h-10 w-[70%] rounded-t-xl bg-linear-to-br from-[#ff9ebc] to-[#ff4d8d] shadow-[0_4px_20px_rgba(255,77,141,0.4)]" />
          <div className="h-[50px] w-[88%] bg-linear-to-br from-[#ffd700] to-[#ff8c00] shadow-[0_4px_20px_rgba(255,140,0,0.3)]" />
          <div className="h-[60px] w-full rounded-b-2xl bg-linear-to-br from-[#c084fc] to-[#7b2fff] shadow-[0_4px_20px_rgba(123,47,255,0.3)]" />
        </div>

        <div className="text-center">
          <button
            onClick={startMicBlow}
            className="rounded-full border-[1.5px] border-white/30 bg-transparent px-6 py-2.5 text-[0.9rem] text-white transition hover:border-white/60 hover:bg-white/[0.08]"
          >
            🎤 Use Mic to Blow
          </button>
          <p className="mt-2 min-h-5 text-[0.8rem] text-(--text-muted)">
            {micHint}
          </p>
        </div>

        <div className="min-h-10 animate-pulse text-center font-['Dancing_Script',cursive] text-2xl text-(--gold)">
          {allOut ? `🎉 Happy Birthday ${personName}! 🎂` : ""}
        </div>
      </div>
    </section>
  );
}
