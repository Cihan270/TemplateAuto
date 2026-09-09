"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  contactSchema,
  type ContactInput,
} from "@/lib/forms/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/forms/field";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      privacy: false,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        toast.error(data.error ?? "Versturen mislukt. Probeer het opnieuw.");
        return;
      }

      toast.success(
        data.message ?? "Bedankt. We nemen zo snel mogelijk contact op.",
      );
      reset({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        privacy: false,
      });
    } catch {
      toast.error("Er ging iets mis. Controleer uw verbinding en probeer opnieuw.");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field id="contact-name" label="Naam" required error={errors.name?.message}>
        <Input
          autoComplete="name"
          placeholder="Uw naam"
          {...register("name")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-email"
          label="E-mail"
          required
          error={errors.email?.message}
        >
          <Input
            type="email"
            autoComplete="email"
            placeholder="naam@voorbeeld.nl"
            {...register("email")}
          />
        </Field>

        <Field
          id="contact-phone"
          label="Telefoon"
          error={errors.phone?.message}
          hint="Optioneel, handig voor snelle terugbel"
        >
          <Input
            type="tel"
            autoComplete="tel"
            placeholder="06 1234 5678"
            {...register("phone")}
          />
        </Field>
      </div>

      <Field
        id="contact-subject"
        label="Onderwerp"
        error={errors.subject?.message}
      >
        <Input
          placeholder="Bijv. vraag over voorraad"
          {...register("subject")}
        />
      </Field>

      <Field
        id="contact-message"
        label="Bericht"
        required
        error={errors.message?.message}
      >
        <Textarea
          rows={6}
          placeholder="Waarmee kunnen we u helpen?"
          {...register("message")}
        />
      </Field>

      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            className="mt-1 size-4 shrink-0 border border-line accent-accent"
            {...register("privacy")}
          />
          <span>
            Ik ga akkoord met de{" "}
            <Link
              href="/privacy"
              className="font-semibold text-ink underline-offset-2 hover:underline"
            >
              privacyverklaring
            </Link>
            .
          </span>
        </label>
        {errors.privacy?.message ? (
          <p className="text-sm text-accent" role="alert">
            {errors.privacy.message}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full rounded-full sm:w-auto"
      >
        {isSubmitting ? "Versturen…" : "Bericht versturen"}
      </Button>
    </form>
  );
}
