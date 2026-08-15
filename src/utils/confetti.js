// Lightweight DOM-based confetti burst.
// Original project loaded an external confetti.js which wasn't provided —
// this is a small self-contained replacement with the same launchConfetti() API.

const COLORS = ["#FFD700", "#FF4D8D", "#c084fc", "#00E5FF", "#39FF14", "#FF8C00"];

export function launchConfetti(count = 60) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    const size = 6 + Math.random() * 8;
    const startX = Math.random() * window.innerWidth;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const duration = 2.5 + Math.random() * 1.5;
    const drift = (Math.random() - 0.5) * 200;
    const rotate = 360 + Math.random() * 360;

    el.style.cssText = `
      position: fixed;
      top: -20px;
      left: ${startX}px;
      width: ${size}px;
      height: ${size * 0.6}px;
      background: ${color};
      border-radius: 2px;
      pointer-events: none;
      z-index: 9997;
      opacity: 0.95;
      transition: transform ${duration}s cubic-bezier(0.2,0.6,0.4,1), opacity ${duration}s ease-in;
    `;
    document.body.appendChild(el);

    requestAnimationFrame(() => {
      el.style.transform = `translate(${drift}px, ${window.innerHeight + 40}px) rotate(${rotate}deg)`;
      el.style.opacity = "0";
    });

    setTimeout(() => el.remove(), duration * 1000 + 100);
  }
}

export function spawnEmojiBurst() {
  const burst = ["🎆", "🎇", "✨", "🎊", "🎉", "💥", "🌟", "🎈"];
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < 18; i++) {
    const el = document.createElement("span");
    el.className = "burst-emoji";
    el.textContent = burst[Math.floor(Math.random() * burst.length)];
    el.style.cssText = `
      position: fixed;
      left: ${cx}px;
      top: ${cy}px;
      font-size: ${1.2 + Math.random() * 1.6}rem;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: none;
    `;
    document.body.appendChild(el);

    const angle = (i / 18) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const dist = 80 + Math.random() * 160;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    requestAnimationFrame(() => {
      el.style.transition = `transform ${0.6 + Math.random() * 0.4}s ease-out, opacity 0.5s ease-in`;
      el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.5)`;
      el.style.opacity = "0";
    });

    setTimeout(() => el.remove(), 1200);
  }
}
