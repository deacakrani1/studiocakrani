// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Build as a static Single Page Application:
// - SPA mode generates an /_shell.html the host can fall back to for any route.
// - Prerender + autoStaticPathsDiscovery emits a native HTML file for every
//   discoverable route (/, /about, /services, /contact), so the dist/ output
//   is a normal SPA bundle with index.html + assets/ and per-route HTML.
// - cloudflare: false disables the Cloudflare Worker output — we only want
//   static client files.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    spa: {
      enabled: true,
    },
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
    },
  },
});
