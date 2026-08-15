import React, { useEffect, useRef, useState } from "react";
import { useBirthday } from "../context/BirthdayContext";
import { wishesData } from "../data/constants";

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

function WishCard({ icon, title, text, delay, name }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`glass rounded-[20px] px-5.5 py-7 text-center transition-all duration-350 hover:-translate-y-1.5 hover:border-[rgba(255,215,0,0.3)] hover:shadow-[0_16px_50px_rgba(255,215,0,0.15)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-7.5 opacity-0"
      }`}
    >
      <span className="mb-3 block text-[2.2rem]">{icon}</span>
      <div className="mb-2 font-['Playfair_Display',serif] text-base font-bold text-(--gold)">
        {title}
      </div>
      <p className="text-[0.875rem] leading-relaxed text-(--text-muted)">
        {text.replace(/you/g, name || "you")}
      </p>
    </div>
  );
}

export default function Wishes() {
  const { personName } = useBirthday();

  return (
    <section
      id="wishes"
      className="section flex flex-col items-center px-6 py-20"
    >
      <div className="mb-15 text-center">
        <span className="mb-4 inline-block rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(255,215,0,0.12)] px-2.5 py-1.5 text-[0.78rem] font-medium tracking-widest text-(--gold) uppercase">
          🌟 For You
        </span>
        <h2 className="mb-3.5 font-['Playfair_Display',serif] text-[clamp(2.2rem,5vw,3.5rem)] font-black leading-[1.1]">
          Birthday{" "}
          <em className="bg-linear-to-br from-(--gold) to-(--rose) bg-clip-text text-transparent not-italic">
            Wishes
          </em>
        </h2>
        <p className="text-base text-(--text-muted)">
          Sending all the love to{" "}
          <span className="font-medium text-(--gold)">{personName}</span>
        </p>
      </div>

      <div className="mb-12.5 grid w-full max-w-250 grid-cols-2 md:grid-cols-3 gap-4.5 sm:grid-cols-2">
        {wishesData.map((w, i) => (
          <WishCard key={i} {...w} delay={i * 60} name={personName} />
        ))}
      </div>
    </section>
  );
}
