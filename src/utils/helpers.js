import { ZODIACS } from "../data/constants";

export function calculateAge(dob) {
  if (!dob) return 0;
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return Math.max(age, 0);
}

export function formatDate(dob) {
  if (!dob) return "";
  const d = new Date(dob + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getZodiac(dobStr) {
  if (!dobStr) return ZODIACS[0];
  const d = new Date(dobStr);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  if ((m === 12 && day >= 22) || (m === 1 && day <= 19)) return ZODIACS[0];
  if ((m === 1 && day >= 20) || (m === 2 && day <= 18)) return ZODIACS[1];
  if ((m === 2 && day >= 19) || (m === 3 && day <= 20)) return ZODIACS[2];
  if ((m === 3 && day >= 21) || (m === 4 && day <= 19)) return ZODIACS[3];
  if ((m === 4 && day >= 20) || (m === 5 && day <= 20)) return ZODIACS[4];
  if ((m === 5 && day >= 21) || (m === 6 && day <= 20)) return ZODIACS[5];
  if ((m === 6 && day >= 21) || (m === 7 && day <= 22)) return ZODIACS[6];
  if ((m === 7 && day >= 23) || (m === 8 && day <= 22)) return ZODIACS[7];
  if ((m === 8 && day >= 23) || (m === 9 && day <= 22)) return ZODIACS[8];
  if ((m === 9 && day >= 23) || (m === 10 && day <= 22)) return ZODIACS[9];
  if ((m === 10 && day >= 23) || (m === 11 && day <= 21)) return ZODIACS[10];
  return ZODIACS[11];
}
