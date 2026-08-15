import React, { useEffect, useState } from "react";
import { BirthdayProvider, useBirthday } from "./context/BirthdayContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import LoveNote from "./components/LoveNote";
import Wishes from "./components/Wishes";
import Candles from "./components/Candles";
import Stats from "./components/Stats";
import GiftBox from "./components/GiftBox";
import Fortune from "./components/Fortune";
import Zodiac from "./components/Zodiac";
import GalleryOverlay from "./components/GalleryOverlay";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import { launchConfetti } from "./utils/confetti";

const SPARKLE_COLORS = ["#FFD700", "#FF4D8D", "#00E5FF", "#E040FB", "#39FF14", "#FF8C00"];

// Cursor sparkle trail (replaces the vanilla mousemove listener in script.js)
function useSparkleCursor() {
  useEffect(() => {
    let last = 0;
    function onMove(e) {
      const now = Date.now();
      if (now - last < 40) return;
      last = now;
      const dot = document.createElement("div");
      const size = 6 + Math.random() * 8;
      dot.style.cssText = `
        position:fixed; pointer-events:none; border-radius:50%; z-index:9999;
        width:${size}px; height:${size}px;
        left:${e.clientX}px; top:${e.clientY}px;
        background:${SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)]};
        box-shadow: 0 0 ${size * 2}px ${SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)]};
        animation: sparkleFade 0.7s ease-out forwards;
      `;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 700);
    }
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);
}

function MainPage() {
  const { galleryPhotos } = useBirthday();
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => launchConfetti(50), 500);
    setTimeout(() => launchConfetti(50), 1500);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useSparkleCursor();

  function openGalleryShow() {
    if (galleryPhotos.length === 0) return;
    setGalleryOpen(true);
  }

  return (
    <div className="relative z-10">
      <Navbar />
      <Hero onViewGallery={openGalleryShow} />
      <Gallery />
      <LoveNote />
      <Wishes />
      <Candles />
      <Stats />
      <GiftBox />
      <Fortune />
      <Zodiac />
      <Footer />
      <GalleryOverlay
        open={galleryOpen}
        photos={galleryPhotos}
        onClose={() => setGalleryOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--deep)] text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(135deg,#0a0010_0%,#1a003a_40%,#0d001f_70%,#000_100%)]" />

      <BirthdayProvider>
        <MainPage />
        <Toast />
      </BirthdayProvider>
    </div>
  );
}
