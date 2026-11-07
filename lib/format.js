const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBn = (value) => String(value).replace(/\d/g, (d) => BN[d]);

// Bengali numerals (and commas) -> real number, so sorting is numeric, not string based.
export const bnToNum = (value) => {
  if (typeof value === "number") return value;
  const en = String(value ?? "")
    .replace(/[০-৯]/g, (d) => String(BN.indexOf(d)))
    .replace(/[,\s]/g, "")
    .replace(/[^\d.\-]/g, "");
  const n = parseFloat(en);
  return Number.isNaN(n) ? 0 : n;
};

export const formatPrice = (n) => toBn(Math.round(n).toLocaleString("en-US"));

export const formatPercent = (n) => toBn(Math.abs(n).toFixed(1));

export const formatBanglaDate = (date = new Date()) =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
