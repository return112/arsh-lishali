import React from "react";
import { useBirthday } from "../context/BirthdayContext";

export default function Toast() {
  const { toast } = useBirthday();

  return (
    <div
      className={`fixed bottom-8 left-1/2 z-[9999] -translate-x-1/2 whitespace-nowrap rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(30,10,50,0.95)] px-7 py-3 text-sm text-white backdrop-blur-xl transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        toast.visible ? "translate-y-0" : "translate-y-20"
      }`}
    >
      {toast.msg}
    </div>
  );
}
