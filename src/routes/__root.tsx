import { useEffect } from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts, ScriptOnce } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Studio Ligjore Cakrani — Excellence in Legal Representation" },
      {
        name: "description",
        content:
          "Studio Ligjore Cakrani — leading Albanian law firm with offices in Tirana, Vlorë and Fier. SPAK representation, ECHR Strasbourg cases, civil, penal, administrative and corporate law.",
      },
      { name: "author", content: "Studio Ligjore Cakrani" },
      {
        name: "keywords",
        content:
          "Studio Ligjore Tirane, best lawyer in Albania, SPAK legal representation, Strasbourg Human Rights Lawyer, avokat Tirane, avokat Vlore, Kujtim Cakrani",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Studio Ligjore Cakrani" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Studio Ligjore Cakrani — Excellence in Legal Representation" },
      { name: "twitter:title", content: "Studio Ligjore Cakrani — Excellence in Legal Representation" },
      { name: "description", content: "Cakrani Legal Brilliance is a professional, modern one-page website for a law firm." },
      { property: "og:description", content: "Cakrani Legal Brilliance is a professional, modern one-page website for a law firm." },
      { name: "twitter:description", content: "Cakrani Legal Brilliance is a professional, modern one-page website for a law firm." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c70a10e8-9c07-46f9-9d36-26167e4e7c47/id-preview-04e51b1d--2103d326-1669-4e6e-80da-6e02d1796be0.lovable.app-1777921572696.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c70a10e8-9c07-46f9-9d36-26167e4e7c47/id-preview-04e51b1d--2103d326-1669-4e6e-80da-6e02d1796be0.lovable.app-1777921572696.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=AW-18182666462",
        async: true,
      },
      {
        children:
          "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'AW-18182666462');",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <LanguageProvider>
      <ScriptOnce>{`if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; } window.scrollTo(0, 0);`}</ScriptOnce>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster />
    </LanguageProvider>
  );
}

