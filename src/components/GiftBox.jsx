import React, { useState } from "react";
import { giftMessages } from "../data/constants";

export default function GiftBox() {
  const [opened, setOpened] = useState(false);
  const [message, setMessage] = useState("");

  function openGift() {
    if (opened) return;
    setOpened(true);
    setTimeout(() => {
      setMessage(giftMessages[Math.floor(Math.random() * giftMessages.length)]);
    }, 700);
  }

  return (
    <section
      id="giftSection"
      className="section flex flex-col items-center gap-10 px-6 py-20"
    >
      <div className="text-center">
        <span className="mb-4 inline-block rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(255,215,0,0.12)] px-[18px] py-1.5 text-[0.78rem] font-medium tracking-[0.1em] text-(--gold) uppercase">
          🎁 Surprise!
        </span>
        <h2 className="mb-3.5 font-['Playfair_Display',serif] text-[clamp(2.2rem,5vw,3.5rem)] font-black leading-[1.1]">
          Open Your{" "}
          <em className="bg-linear-to-br from-(--gold) to-(--rose) bg-clip-text text-transparent not-italic">
            Gift
          </em>
        </h2>
        <p className="text-base text-(--text-muted)">
          Tap the box to unwrap your surprise
        </p>
      </div>

      <div
        onClick={openGift}
        className="flex cursor-pointer flex-col items-center gap-6 select-none"
      >
        <div className="relative w-40 transition hover:scale-105 hover:-rotate-1">
          <div
            className={`relative flex h-[50px] w-40 origin-top items-center justify-center rounded-t-[10px] bg-linear-to-br from-[#ff4d8d] to-[#c084fc] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              opened ? "-translate-y-16 rotate-[-25deg] opacity-0" : ""
            }`}
          >
            <div className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 bg-white/40" />
            <span className="z-[2] text-[2rem]">🎀</span>
          </div>
          <div className="relative h-[120px] w-40 overflow-hidden rounded-b-[14px] bg-linear-to-br from-[#ff4d8d] to-[#ffd700]">
            <div className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-white/35" />
          </div>
        </div>

        <div
          className={`min-h-0 max-w-[320px] rounded-[18px] px-6 py-5 text-center font-['Dancing_Script',cursive] text-[1.3rem] leading-relaxed text-(--gold) transition-opacity duration-700 ${
            message ? "glass opacity-100" : "opacity-0"
          }`}
        >
          {message}
        </div>
      </div>
    </section>
  );
}
