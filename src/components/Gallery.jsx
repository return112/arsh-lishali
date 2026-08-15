import React, { useEffect, useRef, useState } from "react";
import { useBirthday } from "../context/BirthdayContext";
import { PLACEHOLDER_GIFS } from "../utils/placeholderImages";

const POSITIONS = [
  "rotate-[-2deg]",
  "rotate-[1.5deg]",
  "rotate-[2deg]",
  "rotate-[-1deg]",
];
const GIFS = PLACEHOLDER_GIFS.map((g, i) => ({ ...g, pos: POSITIONS[i] }));

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function GifCard({ src, caption, pos, delay }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[20px] transition-all duration-350 hover:-translate-y-1.5 hover:scale-[1.04] hover:rotate-0 hover:shadow-[0_20px_60px_rgba(255,77,141,0.35)] ${
        visible
          ? `translate-y-0 opacity-100 ${pos}`
          : "translate-y-10 opacity-0"
      }`}
    >
      <img src={src} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-5 pb-3.5 font-['Dancing_Script',cursive] text-xl font-bold text-(--gold)">
        {caption}
      </div>
    </div>
  );
}

export default function Gallery() {
  const { personName } = useBirthday();
  return (
    <section
      id="gallery"
      className="section flex flex-col items-center px-6 py-20"
    >
      <div className="mb-[60px] text-center">
        <span className="mb-4 inline-block rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(255,215,0,0.12)] px-[18px] py-1.5 text-[0.78rem] font-medium tracking-[0.1em] text-(--gold) uppercase">
          ✨ Moments
        </span>
        <h2 className="mb-3.5 font-['Playfair_Display',serif] text-[clamp(2.2rem,5vw,3.5rem)] font-black leading-[1.1]">
          Birthday{" "}
          <em className="bg-linear-to-br from-(--gold) to-(--rose) bg-clip-text text-transparent not-italic">
            Gallery
          </em>
        </h2>
        <p className="text-base text-(--text-muted)">
          A little world built just for{" "}
          <span className="font-medium text-(--gold)">{personName}</span>
        </p>
      </div>

      <div className="grid w-full max-w-[900px] grid-cols-2 grid-rows-2 gap-6 sm:gap-3">
        {GIFS.map((g, i) => (
          <GifCard key={i} {...g} delay={i * 120} />
        ))}
      </div>
    </section>
  );
}
