import React, { useEffect, useRef } from "react";
import { useBirthday } from "../context/BirthdayContext";
import { getZodiac } from "../utils/helpers";

function drawStarMap(canvas, z) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const bg = ctx.createRadialGradient(W / 2, H / 2, 10, W / 2, H / 2, W / 2);
  bg.addColorStop(0, "#1a0040");
  bg.addColorStop(1, "#050010");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 80; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * W,
      Math.random() * H,
      Math.random() * 1.5,
      0,
      Math.PI * 2,
    );
    ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.random() * 0.5})`;
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(255,215,0,0.3)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 6]);
  ctx.beginPath();
  z.stars.forEach((s, i) =>
    i === 0 ? ctx.moveTo(s[0], s[1]) : ctx.lineTo(s[0], s[1]),
  );
  ctx.stroke();
  ctx.setLineDash([]);

  z.stars.forEach((s) => {
    const grd = ctx.createRadialGradient(s[0], s[1], 0, s[0], s[1], 10);
    grd.addColorStop(0, "rgba(255,215,0,1)");
    grd.addColorStop(0.5, "rgba(255,215,0,0.4)");
    grd.addColorStop(1, "rgba(255,215,0,0)");
    ctx.beginPath();
    ctx.arc(s[0], s[1], 10, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(s[0], s[1], 3, 0, Math.PI * 2);
    ctx.fillStyle = "#FFE866";
    ctx.fill();
  });
}

export default function Zodiac() {
  const { personDOB } = useBirthday();
  const canvasRef = useRef(null);
  const z = getZodiac(personDOB);

  useEffect(() => {
    drawStarMap(canvasRef.current, z);
  }, [personDOB]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      id="zodiacSection"
      className="section flex flex-col items-center gap-10 px-6 py-20"
    >
      <div className="text-center">
        <span className="mb-4 inline-block rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(255,215,0,0.12)] px-[18px] py-1.5 text-[0.78rem] font-medium tracking-[0.1em] text-(--gold) uppercase">
          🌙 Written in the Stars
        </span>
        <h2 className="mb-3.5 font-['Playfair_Display',serif] text-[clamp(2.2rem,5vw,3.5rem)] font-black leading-[1.1]">
          Your{" "}
          <em className="bg-linear-to-br from-(--gold) to-(--rose) bg-clip-text text-transparent not-italic">
            Zodiac
          </em>
        </h2>
        <p className="text-base text-(--text-muted)">
          The cosmos has a message for you
        </p>
      </div>

      <div className="w-full max-w-[700px]">
        <div className="glass flex flex-wrap items-center justify-center gap-8 rounded-[24px] p-9">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="h-[200px] w-[200px] flex-shrink-0 rounded-full"
          />
          <div className="min-w-[200px] flex-1 text-center">
            <div className="mb-2 animate-pulse text-[4rem]">{z.symbol}</div>
            <div className="mb-1.5 bg-linear-to-br from-(--gold) to-(--rose) bg-clip-text font-['Playfair_Display',serif] text-[2rem] font-black text-transparent">
              {z.name}
            </div>
            <div className="mb-4 text-[0.82rem] text-(--text-muted)">
              {z.dates}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {z.traits.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(255,215,0,0.12)] px-3.5 py-1.5 text-[0.8rem] text-(--gold)"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
