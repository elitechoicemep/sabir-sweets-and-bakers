import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from "@/services/orders";
import { API_BASE_URL } from "@/services/api";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | Sabir Sweets & Bakers" },
      { name: "description", content: "Administration area for Sabir Sweets & Bakers." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const SCOPE = [
  "Products — add, edit, delete, pricing and images",
  "Categories and featured selections",
  "Orders and order status",
  "Customers and inventory",
];

function AdminPage() {
  return (
    <>
      <PageHeader
        label="Admin"
        title="Dashboard"
        intro="Reserved route. The admin area stays disabled until a backend with real, server-side authentication is connected — no client-side gate is used here on purpose."
      />
      <section className="bg-brand-cream py-20">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <p className="label-xs text-brand-deep">
            Backend: {API_BASE_URL ? "connected" : "not configured"}
          </p>
          <div className="mt-10 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-brand-brown">Planned scope</h2>
              <ul className="mt-5 space-y-3 text-sm text-brand-brown/70">
                {SCOPE.map((s) => (
                  <li key={s} className="border-b border-brand-brown/12 pb-3">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl text-brand-brown">Order statuses</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {ORDER_STATUSES.map((s) => (
                  <li
                    key={s}
                    className="label-xs border border-brand-brown/20 px-3 py-2 text-[0.5625rem] text-brand-brown/70"
                  >
                    {ORDER_STATUS_LABELS[s]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}