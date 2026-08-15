import React from "react";
import { useBirthday } from "../context/BirthdayContext";

export default function LoveNote() {
  const { note } = useBirthday();

  return (
    <section
      id="note"
      className="section flex flex-col items-center px-6 py-20"
    >
      <div className="mb-[60px] text-center">
        <span className="mb-4 inline-block rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(255,215,0,0.12)] px-[18px] py-1.5 text-[0.78rem] font-medium tracking-[0.1em] text-(--gold) uppercase">
          💌 From the heart
        </span>
        <h2 className="font-['Playfair_Display',serif] text-[clamp(2.2rem,5vw,3.5rem)] font-black leading-[1.1]">
          A Special{" "}
          <em className="bg-linear-to-br from-(--gold) to-(--rose) bg-clip-text text-transparent not-italic">
            Note
          </em>
        </h2>
      </div>

      <div className="w-full max-w-[900px]">
        <div className="glass relative overflow-hidden rounded-[20px] border-l-[3px] border-l-(--rose) p-10 sm:p-7">
          <div className="absolute top-2 left-5 font-['Playfair_Display',serif] text-[5rem] leading-none text-(--rose) opacity-25">
            ❝
          </div>
          <p className="relative z-[2] mb-6 whitespace-pre-line font-['Playfair_Display',serif] text-[1.05rem] leading-[1.85] text-white/90 italic">
            {note}
          </p>
          <div className="text-right font-['Dancing_Script',cursive] text-2xl text-(--gold)">
            — With Love 💖
          </div>
          <div className="mt-2.5 text-right text-[1.1rem] tracking-[4px]">
            <span>💖</span>
            <span>💕</span>
            <span>💗</span>
          </div>
        </div>
      </div>
    </section>
  );
}
