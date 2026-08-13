import { createServerFn } from "@tanstack/react-start";

type PickupLine = { name: string; quantity: number; price: number | null };

/**
 * Sends the pickup order details to the shop's WhatsApp number.
 * Runs on the server so the destination number is never exposed to the visitor.
 * Silently no-ops (returns ok) if WhatsApp Cloud API credentials aren't configured.
 */
export const sendPickupNotice = createServerFn({ method: "POST" })
  .inputValidator((data: { city: string; branch: string; closing: string; items: PickupLine[]; total: number | null }) => data)
  .handler(async ({ data }) => {
    const to = process.env["SHOP_WHATSAPP_NUMBER"] ?? "923224200602";
    const token = process.env["WHATSAPP_TOKEN"];
    const phoneId = process.env["WHATSAPP_PHONE_NUMBER_ID"];

    const lines = [
      "Pickup Order / پک اپ آرڈر",
      "",
      `City: ${data.city}`,
      `Branch: ${data.branch}`,
      `Pickup Closing Time: ${data.closing}`,
      "",
      "Items:",
      ...data.items.map(
        (i) => `• ${i.name} × ${i.quantity} — ${i.price === null ? "PKR —" : `PKR ${i.price * i.quantity}`}`,
      ),
      "",
      `Total: ${data.total === null ? "PKR —" : `PKR ${data.total}`}`,
    ];
    const body = lines.join("\n");

    if (!token || !phoneId) {
      console.log("[pickup] WhatsApp credentials missing; notice not sent:\n" + body);
      return { ok: true, delivered: false };
    }

    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
      }),
    });

    if (!res.ok) {
      console.error(`[pickup] WhatsApp send failed [${res.status}]: ${await res.text()}`);
      return { ok: true, delivered: false };
    }
    return { ok: true, delivered: true };
  });
