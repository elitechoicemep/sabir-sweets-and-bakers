import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { LocationSection } from "@/components/home/LocationSection";
import { buttonClass } from "@/components/ui/BrandButton";
import { whatsappLink } from "@/utils/whatsapp";

const TITLE = "Contact & Custom Orders | Sabir Sweets & Bakers, Lahore";
const DESCRIPTION =
  "Get in touch with Sabir Sweets & Bakers on Outfall Road, Saint Nagar, Lahore for orders and custom cakes.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const wa = whatsappLink(
    `Enquiry\n\nName: ${name || "—"}\nPhone: ${phone || "—"}\n\n${message || "—"}`,
  );

  const field =
    "mt-2 min-h-11 w-full border border-brand-brown/25 bg-transparent px-4 py-3 font-sans text-sm text-brand-brown outline-none focus:border-brand-orange";

  return (
    <>
      <PageHeader
        label="Contact"
        title="Talk to us"
        intro="Custom cakes, bulk orders and event enquiries — send the details and we will come back to you."
      />

      <section className="bg-brand-cream py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (wa) window.open(wa, "_blank", "noopener");
            }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="c-name" className="label-xs text-brand-brown/60">
                Full Name
              </label>
              <input
                id="c-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="c-phone" className="label-xs text-brand-brown/60">
                Phone Number
              </label>
              <input
                id="c-phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="c-message" className="label-xs text-brand-brown/60">
                Your Message
              </label>
              <textarea
                id="c-message"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={field}
              />
            </div>
            <button type="submit" disabled={!wa} className={buttonClass("primary", "lg", "w-full")}>
              {wa ? "Send via WhatsApp" : "WhatsApp not configured yet"}
            </button>
            {!wa ? (
              <p className="text-xs text-brand-brown/55">
                Enquiries will send once the shop&apos;s WhatsApp number (VITE_WHATSAPP_NUMBER) is
                configured. Until then, please visit us on Outfall Road.
              </p>
            ) : null}
          </form>
        </div>
      </section>

      <LocationSection />
    </>
  );
}