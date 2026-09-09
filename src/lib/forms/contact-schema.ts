import { z } from "zod";

export const contactSchema = z.object({
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
    .max(30, "Telefoonnummer is te lang.")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .max(120, "Onderwerp is te lang.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Schrijf een bericht van minimaal 10 tekens.")
    .max(2000, "Bericht is te lang."),
  privacy: z.boolean().refine((value) => value === true, {
    message: "Ga akkoord met de privacyverklaring om door te gaan.",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;
