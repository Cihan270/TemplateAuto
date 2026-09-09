import { NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/forms/appointment-schema";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ongeldige aanvraag." },
      { status: 400 },
    );
  }

  const parsed = appointmentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Controleer de ingevulde velden.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // Stub: geen e-mailprovider gekoppeld. Architectuur klaar voor later.
  return NextResponse.json({
    ok: true,
    message: "Bedankt. We bevestigen uw afspraakverzoek zo snel mogelijk.",
  });
}
