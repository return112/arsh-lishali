import React, { useState, useEffect, useCallback } from "react";
import { useBirthday } from "../context/BirthdayContext";

const SECTIONS = ["home", "gallery", "note", "wishes"];

export default function Navbar() {
  const { personName } = useBirthday();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  const onScroll = useCallback(() => {
    let current = "";
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 200) current = id;
    });
    if (current) setActive(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <>
      <nav className="glass sticky top-0 z-[100] flex items-center justify-between rounded-none border-x-0 border-t-0 border-b border-white/15 px-8 py-3.5 sm:px-5">
        <div className="font-['Dancing_Script',cursive] text-xl font-bold text-(--gold)">
          🎉 <span>{personName}</span>'s Day
        </div>
        <div className="hidden gap-1 md:flex">
          {SECTIONS.map((id) => (
            <a
              key={id}
              onClick={() => goTo(id)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium capitalize transition hover:bg-white/10 hover:text-white ${
                active === id ? "bg-white/10 text-white" : "text-(--text-muted)"
              }`}
            >
              {id === "note" ? "Love Note" : id}
            </a>
          ))}
        </div>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="block cursor-pointer border-none bg-transparent px-2 py-1 text-2xl text-white md:hidden"
        >
          ☰
        </button>
      </nav>

      <div
        className={`glass fixed top-[72px] right-4 left-4 z-[99] flex origin-top flex-col gap-1 rounded-[20px] p-5 transition-all duration-300 ${
          menuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        <a
          onClick={() => goTo("home")}
          className="cursor-pointer rounded-[10px] px-4 py-3 text-base text-(--text-muted) hover:bg-white/10 hover:text-white"
        >
          🏠 Home
        </a>
        <a
          onClick={() => goTo("gallery")}
          className="cursor-pointer rounded-[10px] px-4 py-3 text-base text-(--text-muted) hover:bg-white/10 hover:text-white"
        >
          🖼 Gallery
        </a>
        <a
          onClick={() => goTo("note")}
          className="cursor-pointer rounded-[10px] px-4 py-3 text-base text-(--text-muted) hover:bg-white/10 hover:text-white"
        >
          💌 Love Note
        </a>
        <a
          onClick={() => goTo("wishes")}
          className="cursor-pointer rounded-[10px] px-4 py-3 text-base text-(--text-muted) hover:bg-white/10 hover:text-white"
        >
          🌟 Wishes
        </a>
      </div>
    </>
  );
}
