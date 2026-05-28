import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useT } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Studio Ligjore Cakrani | Tirana, Vlorë, Fier" },
      {
        name: "description",
        content:
          "Contact Studio Ligjore Cakrani. Phone +355 69 941 3001 · studiocakrani@gmail.com. Offices in Tirana, Vlorë and Fier, Albania.",
      },
      { property: "og:title", content: "Contact — Studio Ligjore Cakrani" },
      {
        property: "og:description",
        content:
          "Confidential consultations across Albania. Three offices, one trusted firm.",
      },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(2000),
});

function ContactPage() {
  const { t } = useT();
  const [submitting, setSubmitting] = useState(false);

  const offices = [
    {
      city: t("office.tirane"),
      addr: t("office.tirane.addr"),
      map: "https://www.google.com/maps?q=Kompleksi+Kika+2+Tirana&output=embed",
      link: "https://maps.app.goo.gl/DYeqX4LYNmn48ot29",
    },
    {
      city: t("office.vlore"),
      addr: t("office.vlore.addr"),
      map: "https://www.google.com/maps?q=Rruga+Sali+Hali+Kokonodi+Vlore&output=embed",
      link: "https://maps.app.goo.gl/rCrW2tfPkX8bMsPz5",
    },
    {
      city: t("office.fier"),
      addr: t("office.fier.addr"),
      map: "https://www.google.com/maps?q=Gjykata+e+Shkalles+se+Pare+Fier&output=embed",
      link: "https://maps.app.goo.gl/jrn2GHcBiWGqRsxP7",
    },
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/mdajbeoo", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Failed to send");
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof gtag === "function") {
        gtag("event", "conversion", {
          send_to: "AW-18182666462/pAMMCP-c6bEcEN7xld5D",
        });
      }
      toast.success(t("contact.success"));
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-navy py-20 text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl sm:text-5xl">{t("contact.title")}</h1>
          <div className="mx-auto mt-4 h-px w-16 bg-accent" />
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[3fr_2fr] lg:px-8">
          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t("contact.name")} name="name" required />
              <Field label={t("contact.email")} name="email" type="email" required />
              <Field label={t("contact.phone")} name="phone" type="tel" />
              <Field label={t("contact.subject")} name="subject" required />
            </div>
            <div className="mt-4">
              <Label htmlFor="message" className="text-sm">
                {t("contact.message")}
              </Label>
              <Textarea id="message" name="message" rows={6} required className="mt-1.5" />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              {submitting ? "..." : t("contact.send")}
            </Button>
          </form>

          <aside className="space-y-4">
            <a
              href="tel:+355699413001"
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent"
            >
              <Phone className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t("contact.phone")}
                </p>
                <p className="font-serif text-lg">+355 69 941 3001</p>
              </div>
            </a>
            <a
              href="mailto:studiocakrani@gmail.com"
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent"
            >
              <Mail className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Email
                </p>
                <p className="font-serif text-lg">studiocakrani@gmail.com</p>
              </div>
            </a>
          </aside>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-3xl">{t("contact.offices")}</h2>
          <div className="mx-auto mt-3 h-px w-16 bg-accent" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {offices.map((o) => (
              <a
                key={o.city}
                href={o.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-xl"
              >
                <div className="relative">
                  <iframe
                    title={`Map ${o.city}`}
                    src={o.map}
                    className="pointer-events-none h-48 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/10" />
                </div>
                <div className="flex items-start justify-between gap-3 p-5">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-5 w-5 text-accent" />
                    <div>
                      <p className="font-serif text-lg">{o.city}</p>
                      <p className="text-sm text-muted-foreground">{o.addr}</p>
                    </div>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name} className="text-sm">
        {label}
        {required && <span className="text-accent"> *</span>}
      </Label>
      <Input id={name} name={name} type={type} required={required} className="mt-1.5" />
    </div>
  );
}