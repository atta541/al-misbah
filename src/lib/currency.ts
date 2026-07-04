const CURRENCY_SYMBOLS: Record<string, string> = {
  PKR: "Rs",
  USD: "$",
  GBP: "£",
  EUR: "€",
};

export function formatMoney(amount: number, currency = "PKR") {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  const formatted = Math.round(amount).toLocaleString("en-PK");

  if (symbol.length === 1) {
    return `${symbol}${formatted}`;
  }

  return `${symbol} ${formatted}`;
}

export function formatMoneyRange(min: number, max: number, currency = "PKR") {
  if (min === max) {
    return formatMoney(min, currency);
  }

  return `${formatMoney(min, currency)} - ${formatMoney(max, currency)}`;
}

export function decimalToNumber(value: { toString(): string } | number | null | undefined) {
  if (value == null) return null;
  const num = typeof value === "number" ? value : Number(value.toString());
  return Number.isFinite(num) ? num : null;
}
