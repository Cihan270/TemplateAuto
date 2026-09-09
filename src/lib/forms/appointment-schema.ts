import { z } from "zod";

export const appointmentTypes = [
  "proefrit",
  "onderhoud",
  "apk",
  "advies",
  "overig",
] as const;

export type AppointmentType = (typeof appointmentTypes)[number];

export const appointmentTypeLabels: Record<AppointmentType, string> = {
  proefrit: "Proefrit / occasion",
  onderhoud: "Onderhoud / reparatie",
  apk: "APK-keuring",
  advies: "Advies / oriëntatie",
  overig: "Overig",
};

export const appointmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Vul uw naam in (minimaal 2 tekens).")
    .max(100, "Naam is te lang."),
  email: z
    .string()
    .trim()
    .email("Vul een geldig e-mailadres in.")
    .max(120, "E-mailadres is te lang."),
  phone: z
    .string()
    .trim()
    .min(8, "Vul een geldig telefoonnummer in.")
    .max(30, "Telefoonnummer is te lang."),
  type: z.enum(appointmentTypes, {
    errorMap: () => ({ message: "Kies een type afspraak." }),
  }),
  preferredDate: z
    .string()
    .trim()
    .max(40, "Datum is te lang.")
    .optional()
    .or(z.literal("")),
  preferredTime: z
    .string()
    .trim()
    .max(40, "Tijd is te lang.")
    .optional()
    .or(z.literal("")),
  serviceSlug: z
    .string()
    .trim()
    .max(80)
    .optional()
    .or(z.literal("")),
  vehicleSlug: z
    .string()
    .trim()
    .max(80)
    .optional()
    .or(z.literal("")),
  licensePlate: z
    .string()
    .trim()
    .max(16, "Kenteken is te lang.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(2000, "Bericht is te lang.")
    .optional()
    .or(z.literal("")),
  privacy: z.boolean().refine((value) => value === true, {
    message: "Ga akkoord met de privacyverklaring om door te gaan.",
  }),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
