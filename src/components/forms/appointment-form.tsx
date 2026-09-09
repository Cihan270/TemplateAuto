"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  appointmentSchema,
  appointmentTypeLabels,
  appointmentTypes,
  type AppointmentInput,
  type AppointmentType,
} from "@/lib/forms/appointment-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/forms/field";

type ServiceOption = {
  slug: string;
  name: string;
};

type VehicleOption = {
  slug: string;
  label: string;
};

type AppointmentFormProps = {
  services: ServiceOption[];
  vehicles: VehicleOption[];
  defaultServiceSlug?: string;
  defaultVehicleSlug?: string;
  defaultType?: AppointmentType;
};

function inferType(
  serviceSlug?: string,
  vehicleSlug?: string,
): AppointmentType {
  if (vehicleSlug) return "proefrit";
  if (serviceSlug?.includes("apk")) return "apk";
  if (serviceSlug) return "onderhoud";
  return "advies";
}

export function AppointmentForm({
  services,
  vehicles,
  defaultServiceSlug = "",
  defaultVehicleSlug = "",
  defaultType,
}: AppointmentFormProps) {
  const initialType =
    defaultType ?? inferType(defaultServiceSlug, defaultVehicleSlug);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      type: initialType,
      preferredDate: "",
      preferredTime: "",
      serviceSlug: defaultServiceSlug,
      vehicleSlug: defaultVehicleSlug,
      licensePlate: "",
      message: "",
      privacy: false,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await fetch("/api/appointment", {
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
        data.message ??
          "Bedankt. We bevestigen uw afspraakverzoek zo snel mogelijk.",
      );
      reset({
        name: "",
        email: "",
        phone: "",
        type: initialType,
        preferredDate: "",
        preferredTime: "",
        serviceSlug: defaultServiceSlug,
        vehicleSlug: defaultVehicleSlug,
        licensePlate: "",
        message: "",
        privacy: false,
      });
    } catch {
      toast.error(
        "Er ging iets mis. Controleer uw verbinding en probeer opnieuw.",
      );
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="appointment-name"
          label="Naam"
          required
          error={errors.name?.message}
        >
          <Input
            autoComplete="name"
            placeholder="Uw naam"
            {...register("name")}
          />
        </Field>

        <Field
          id="appointment-phone"
          label="Telefoon"
          required
          error={errors.phone?.message}
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
        id="appointment-email"
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
        id="appointment-type"
        label="Type afspraak"
        required
        error={errors.type?.message}
      >
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="appointment-type" aria-invalid={Boolean(errors.type)}>
                <SelectValue placeholder="Kies een type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {appointmentTypeLabels[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="appointment-date"
          label="Gewenste datum"
          error={errors.preferredDate?.message}
          hint="Bijv. dinsdag 12 maart"
        >
          <Input placeholder="Datum" {...register("preferredDate")} />
        </Field>

        <Field
          id="appointment-time"
          label="Gewenste tijd"
          error={errors.preferredTime?.message}
          hint="Bijv. ochtend of 14:00"
        >
          <Input placeholder="Tijd" {...register("preferredTime")} />
        </Field>
      </div>

      {services.length > 0 ? (
        <Field
          id="appointment-service"
          label="Dienst"
          error={errors.serviceSlug?.message}
        >
          <Controller
            control={control}
            name="serviceSlug"
            render={({ field }) => (
              <Select
                value={field.value || "none"}
                onValueChange={(value) =>
                  field.onChange(value === "none" ? "" : value)
                }
              >
                <SelectTrigger id="appointment-service">
                  <SelectValue placeholder="Optioneel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Geen specifieke dienst</SelectItem>
                  {services.map((service) => (
                    <SelectItem key={service.slug} value={service.slug}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      ) : null}

      {vehicles.length > 0 ? (
        <Field
          id="appointment-vehicle"
          label="Occasion"
          error={errors.vehicleSlug?.message}
        >
          <Controller
            control={control}
            name="vehicleSlug"
            render={({ field }) => (
              <Select
                value={field.value || "none"}
                onValueChange={(value) =>
                  field.onChange(value === "none" ? "" : value)
                }
              >
                <SelectTrigger id="appointment-vehicle">
                  <SelectValue placeholder="Optioneel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Geen specifieke occasion</SelectItem>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.slug} value={vehicle.slug}>
                      {vehicle.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      ) : null}

      <Field
        id="appointment-plate"
        label="Kenteken"
        error={errors.licensePlate?.message}
        hint="Optioneel, voor onderhoud of APK"
      >
        <Input
          placeholder="XX-123-X"
          autoCapitalize="characters"
          {...register("licensePlate")}
        />
      </Field>

      <Field
        id="appointment-message"
        label="Toelichting"
        error={errors.message?.message}
      >
        <Textarea
          rows={5}
          placeholder="Bijv. klachten, wensen of beschikbaarheid"
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
        className="w-full sm:w-auto"
      >
        {isSubmitting ? "Versturen…" : "Afspraak aanvragen"}
      </Button>
    </form>
  );
}
