import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { calculateAge } from "../utils/helpers";
import { getDefaultNote } from "../data/constants";
import { PERSON_NAME, PERSON_DOB, PERSON_PHOTOS } from "../data/personConfig";

const BirthdayContext = createContext(null);

export function BirthdayProvider({ children }) {
  // ─── Core person state — now static, sourced from personConfig.js ────────
  const [personName] = useState(PERSON_NAME);
  const [personDOB] = useState(PERSON_DOB);

  // ─── Gallery photos — static, sourced from personConfig.js ───────────────
  const [galleryPhotos] = useState(PERSON_PHOTOS);

  // ─── Custom love note ─────────────────────────────────────────────────
  const [note, setNote] = useState(getDefaultNote(PERSON_NAME));

  // ─── Toast ────────────────────────────────────────────────────────────
  const [toast, setToast] = useState({ msg: "", visible: false });
  const toastTimer = useRef(null);

  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      3000,
    );
  }, []);

  const personAge = calculateAge(personDOB);

  const value = {
    personName,
    personDOB,
    personAge,
    galleryPhotos,
    note,
    setNote,
    toast,
    showToast,
  };

  return (
    <BirthdayContext.Provider value={value}>
      {children}
    </BirthdayContext.Provider>
  );
}

export function useBirthday() {
  const ctx = useContext(BirthdayContext);
  if (!ctx)
    throw new Error("useBirthday must be used within a BirthdayProvider");
  return ctx;
}
