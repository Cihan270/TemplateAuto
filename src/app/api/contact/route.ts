import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/forms/contact-schema";

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

  const parsed = contactSchema.safeParse(body);

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
    message: "Bedankt. We nemen zo snel mogelijk contact met u op.",
  });
}
