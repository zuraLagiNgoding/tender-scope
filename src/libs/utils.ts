export const formatCurrency = (amount: number | string): string => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(num)) return "Invalid amount";

  const absNum = Math.abs(num);

  const formatNumber = (n: number, suffix: string) =>
    `${Math.sign(num) < 0 ? "-" : ""}${n
      .toFixed(1)
      .replace(/\.0$/, "")}${suffix}`;

  if (absNum >= 1_000_000_000_000) {
    return formatNumber(absNum / 1_000_000_000_000, "T");
  } else if (absNum >= 1_000_000_000) {
    return formatNumber(absNum / 1_000_000_000, "B");
  } else if (absNum >= 1_000_000) {
    return formatNumber(absNum / 1_000_000, "M");
  } else if (absNum >= 1_000) {
    return formatNumber(absNum / 1_000, "K");
  } else {
    return num.toString();
  }
};