import React, { useMemo } from "react";

const EMOJIS = ["🎉", "🎊", "✨", "🌟", "💖", "🎂", "🎁", "🌸", "💫", "🥂", "🎈", "💕"];

export default function FloatingEmojis() {
  const emojis = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        char: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 5,
        size: 1 + Math.random() * 1,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {emojis.map((e, i) => (
        <span
          key={i}
          className="absolute opacity-70 [animation:floatUp_6s_ease-in-out_infinite]"
          style={{
            left: `${e.left}%`,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
            fontSize: `${e.size}rem`,
          }}
        >
          {e.char}
        </span>
      ))}
    </div>
  );
}
