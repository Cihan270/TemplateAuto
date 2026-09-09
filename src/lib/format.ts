const eurFormatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("nl-NL");

export function formatPrice(amount: number): string {
  if (!amount || amount <= 0) return "Prijs op aanvraag";
  return eurFormatter.format(amount);
}

export function formatMileage(km: number): string {
  return `${numberFormatter.format(km)} km`;
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("31") && digits.length === 11) {
    const national = digits.slice(2);
    if (national.startsWith("6")) {
      return `0${national.slice(0, 1)} ${national.slice(1, 3)} ${national.slice(3, 6)} ${national.slice(6)}`;
    }
    return `0${national.slice(0, 2)} ${national.slice(2, 5)} ${national.slice(5)}`;
  }
  return phone;
}

export function formatPhoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("31")) {
    return `+${digits}`;
  }
  if (digits.startsWith("0")) {
    return `+31${digits.slice(1)}`;
  }
  return phone.startsWith("+") ? phone : `+${digits}`;
}

export function formatDateNL(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function vehicleTitle(parts: {
  brand: string;
  model: string;
  variant?: string;
}): string {
  return [parts.brand, parts.model, parts.variant].filter(Boolean).join(" ");
}
