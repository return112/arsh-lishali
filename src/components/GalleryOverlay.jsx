import React, { useEffect, useState, useRef } from "react";

// Controlled via `open`/`onClose` props from App. Cycles through `photos`
// (base64 data URLs from onboarding upload) one at a time.
export default function GalleryOverlay({ open, photos, onClose }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("in"); // "in" | "exit"
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!open) return;

    setIndex(0);
    setPhase("in");

    function schedule(i) {
      if (i >= photos.length) {
        timers.current.push(setTimeout(onClose, 700));
        return;
      }
      setIndex(i);
      setPhase("in");
      const t1 = setTimeout(() => {
        setPhase("exit");
        const t2 = setTimeout(() => schedule(i + 1), 400);
        timers.current.push(t2);
      }, 2400);
      timers.current.push(t1);
    }
    schedule(0);

    return () => timers.current.forEach(clearTimeout);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/92 opacity-100 transition-opacity duration-500">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(155,89,182,0.25)_0%,rgba(0,0,0,0)_70%)]" />
      <div className="relative flex w-[90vw] max-w-[520px] flex-col items-center justify-center">
        <img
          src={photos[index]}
          alt=""
          className={`max-h-[72vh] w-full rounded-[20px] object-contain shadow-[0_0_80px_rgba(255,215,0,0.25),0_0_200px_rgba(255,77,141,0.15)] transition-all duration-350 ${
            phase === "in"
              ? "scale-100 opacity-100 animate-[photoZoomIn_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both]"
              : "scale-[1.08] opacity-0"
          }`}
        />
        <div className="mt-5 font-['Dancing_Script',cursive] text-[1.3rem] tracking-[0.1em] text-(--gold) [text-shadow:0_0_20px_rgba(255,215,0,0.5)]">
          {index + 1} / {photos.length}
        </div>
      </div>
    </div>
  );
}
