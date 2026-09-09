import type { GarageConfig } from "@/types/garage";
import type { Vehicle } from "@/types/vehicle";
import type { Service } from "@/types/service";
import { formatMileage, formatPrice, vehicleTitle } from "@/lib/format";

function normalizeWhatsAppNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function buildWhatsAppUrl(phone: string, message?: string): string {
  const number = normalizeWhatsAppNumber(phone);
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppMessage(garage: GarageConfig): string {
  return `Hallo ${garage.shortName}, ik heb een vraag.`;
}

export function buildVehicleWhatsAppMessage(
  garage: GarageConfig,
  vehicle: Vehicle,
): string {
  const title = vehicleTitle(vehicle);
  return [
    `Hallo ${garage.shortName},`,
    "",
    `Ik ben geïnteresseerd in de ${title} (${vehicle.year}, ${formatMileage(vehicle.mileage)}, ${formatPrice(vehicle.price)}).`,
    "",
    "Kunnen jullie mij meer informatie geven of een proefrit plannen?",
  ].join("\n");
}

export function buildAppointmentWhatsAppMessage(
  garage: GarageConfig,
  subject?: string,
): string {
  const topic = subject ?? "een afspraak";
  return `Hallo ${garage.shortName}, ik wil graag ${topic} maken.`;
}

export function buildServiceWhatsAppMessage(
  garage: GarageConfig,
  service: Service,
): string {
  return [
    `Hallo ${garage.shortName},`,
    "",
    `Ik wil graag informatie of een afspraak over ${service.name}.`,
    "",
    "Kunnen jullie mij helpen met een geschikt moment?",
  ].join("\n");
}
