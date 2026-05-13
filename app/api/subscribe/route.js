export async function POST(request) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return Response.json({ error: "Ongeldig e-mailadres" }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [2],
        updateEnabled: true,
      }),
    });

    if (res.ok || res.status === 204) {
      return Response.json({ success: true });
    }

    const data = await res.json();

    if (data.code === "duplicate_parameter") {
      return Response.json({ success: true });
    }

    return Response.json({ error: "Er ging iets mis" }, { status: 500 });
  } catch {
    return Response.json({ error: "Er ging iets mis" }, { status: 500 });
  }
}
